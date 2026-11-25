/**
 * contact-message: receives the contact page's form and emails it to info@.
 *
 * Called by the browser (POST, JSON), so Supabase's JWT check is off for this
 * function (supabase/config.toml) and it does its own checks, in this order,
 * before anything is stored or sent:
 *
 *   1. Origin: only the site (and localhost for development) may call it.
 *   2. Honeypot ("website") filled, or the form sent less than 3 seconds
 *      after the page loaded: dropped silently. Bots get a normal "ok", so
 *      they learn nothing; nothing is stored or emailed.
 *   3. Every field cleaned (control characters removed, whitespace
 *      normalised) and validated again, including the 1,500-character limit.
 *   4. Cloudflare Turnstile: the token is verified server-side with
 *      https://challenges.cloudflare.com/turnstile/v0/siteverify using
 *      TURNSTILE_SECRET_KEY. No valid token, no email. Without the secret the
 *      function refuses every message rather than skip the check.
 *   5. Rate limit: at most 5 messages per IP per hour (counted on a one-way
 *      hash of the IP; the IP is never stored).
 *
 * Then the message is stored in public.contact_messages and emailed through
 * the same Gmail SMTP set-up as the quote alerts (port 465, the same
 * secrets): From and To info@, Reply-To the visitor, delivered to
 * ALERT_INBOX, subject "Website contact: {First} {Last}".
 *
 * Secrets (supabase secrets set ...), see supabase/README.md:
 *   TURNSTILE_SECRET_KEY      required: the Turnstile widget's secret key
 *   SMTP_USER / SMTP_PASS     already set for notify-quote (or SMTP_INFO_USER / _PASS)
 *   ALERT_INBOX               already set for notify-quote
 *   CONTACT_ALLOWED_ORIGINS   optional: extra comma-separated origins (e.g. a preview URL)
 *   SMTP_HOST                 optional, default smtp.gmail.com
 * SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided by Supabase.
 */
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';
import { ADDRESS, BRAND, oneLine } from '../notify-quote/emails.ts';
import { contactEmail, parseContact, type ContactRow } from './message.ts';

const SMTP_PORT = 465; // implicit TLS; 25 and 587 are blocked on Supabase
const MIN_FILL_MS = 3_000;
const RATE_LIMIT = 5; // messages per IP per hour
const MAX_BODY = 20_000; // bytes of JSON accepted
const SITEVERIFY = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

const env = (key: string) => (Deno.env.get(key) ?? '').trim();

const ORIGINS = new Set([
  'https://www.ciaoitaliantaxiservice.com',
  'https://ciaoitaliantaxiservice.com',
  'http://localhost:3000',
  'http://localhost:4510',
  ...env('CONTACT_ALLOWED_ORIGINS').split(',').map((o) => o.trim()).filter(Boolean),
]);

const db = createClient(env('SUPABASE_URL'), env('SUPABASE_SERVICE_ROLE_KEY'), {
  auth: { persistSession: false },
});

// ---------------------------------------------------------------------------
// Helpers

function cors(origin: string | null): Record<string, string> {
  const headers: Record<string, string> = { Vary: 'Origin' };
  if (origin && ORIGINS.has(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS';
    headers['Access-Control-Allow-Headers'] = 'content-type';
    headers['Access-Control-Max-Age'] = '86400';
  }
  return headers;
}

function json(status: number, body: unknown, origin: string | null) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors(origin) },
  });
}

function clientIp(req: Request): string {
  const first = (h: string | null) => (h ?? '').split(',')[0].trim();
  return (
    first(req.headers.get('cf-connecting-ip')) ||
    first(req.headers.get('x-real-ip')) ||
    first(req.headers.get('x-forwarded-for'))
  );
}

async function hashIp(ip: string): Promise<string | null> {
  if (!ip) return null;
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`ciao-contact:${ip}`));
  return Array.from(new Uint8Array(bytes), (b) => b.toString(16).padStart(2, '0')).join('');
}

/** Server-side Turnstile check. True only for a valid, unused token. */
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const form = new URLSearchParams({ secret: env('TURNSTILE_SECRET_KEY'), response: token });
  if (ip) form.set('remoteip', ip);
  try {
    const res = await fetch(SITEVERIFY, { method: 'POST', body: form });
    const out = await res.json();
    if (!out?.success) {
      console.warn('turnstile rejected', JSON.stringify(out?.['error-codes'] ?? []));
      return false;
    }
    // The widget is rendered with action "contact"; a token minted for
    // anything else is not accepted here.
    if (out.action && out.action !== 'contact') return false;
    return true;
  } catch (e) {
    console.error('turnstile unreachable', (e as Error).message);
    return false;
  }
}

function transporter() {
  const user = env('SMTP_INFO_USER') || env('SMTP_USER');
  const pass = env('SMTP_INFO_PASS') || env('SMTP_PASS');
  if (!user || !pass) throw new Error('Missing SMTP credentials (SMTP_USER/SMTP_PASS)');
  return nodemailer.createTransport({
    host: env('SMTP_HOST') || 'smtp.gmail.com',
    port: SMTP_PORT,
    secure: true,
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
}

// ---------------------------------------------------------------------------
// Handler

Deno.serve(async (req) => {
  const origin = req.headers.get('origin');

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: origin && ORIGINS.has(origin) ? 204 : 403, headers: cors(origin) });
  }
  if (req.method !== 'POST') return json(405, { error: 'POST only' }, origin);
  if (!origin || !ORIGINS.has(origin)) return json(403, { error: 'origin not allowed' }, origin);

  const raw = await req.text();
  if (raw.length > MAX_BODY) return json(413, { error: 'too large' }, origin);
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
    if (!body || typeof body !== 'object') throw new Error('not an object');
  } catch {
    return json(400, { error: 'invalid json' }, origin);
  }

  // 2. Honeypot and the 3-second minimum: dropped without a trace.
  const elapsed = Number(body.elapsed_ms);
  const honeypot = typeof body.website === 'string' && body.website.trim() !== '';
  if (honeypot || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    console.warn('dropped as spam', honeypot ? 'honeypot' : `too fast (${elapsed} ms)`);
    return json(200, { ok: true }, origin);
  }

  // 3. Clean and validate.
  const { input, errors } = parseContact(body);
  if (errors.length) return json(400, { error: 'invalid', fields: errors }, origin);

  // 4. Turnstile, server-side.
  if (!env('TURNSTILE_SECRET_KEY')) {
    console.error('TURNSTILE_SECRET_KEY is not set: refusing messages until it is');
    return json(500, { error: 'not configured' }, origin);
  }
  const token = typeof body.turnstile_token === 'string' ? body.turnstile_token.slice(0, 2048) : '';
  const ip = clientIp(req);
  if (!token || !(await verifyTurnstile(token, ip))) {
    return json(403, { error: 'verification failed' }, origin);
  }

  // 5. Rate limit: 5 per IP per hour.
  const clientHash = await hashIp(ip);
  if (clientHash) {
    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count, error } = await db
      .from('contact_messages')
      .select('id', { count: 'exact', head: true })
      .eq('client_hash', clientHash)
      .gte('created_at', since);
    if (error) return json(500, { error: 'storage unavailable' }, origin);
    if ((count ?? 0) >= RATE_LIMIT) return json(429, { error: 'too many messages' }, origin);
  }

  // Store, then email.
  const { data: row, error: insertError } = await db
    .from('contact_messages')
    .insert({ ...input, client_hash: clientHash, email_status: 'sending' })
    .select('id, created_at, first_name, last_name, email, phone, message, consent, language, page')
    .single<ContactRow>();
  if (insertError || !row) {
    console.error('insert failed', insertError?.message);
    return json(500, { error: 'storage failed' }, origin);
  }

  const address = ADDRESS.enquiry; // info@
  try {
    const smtp = transporter();
    const mail = contactEmail(row);
    const inbox = env('ALERT_INBOX');
    await smtp.sendMail({
      from: { name: BRAND, address },
      to: { name: BRAND, address },
      replyTo: { name: oneLine(`${row.first_name} ${row.last_name}`, 100), address: row.email },
      // Delivered straight to the Gmail inbox (see notify-quote, "Gmail and forwarding").
      ...(inbox ? { envelope: { from: address, to: inbox } } : {}),
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    });
    smtp.close();
    await db
      .from('contact_messages')
      .update({ email_status: 'sent', emailed_at: new Date().toISOString() })
      .eq('id', row.id);
    return json(200, { ok: true }, origin);
  } catch (e) {
    const message = (e as Error).message.slice(0, 500);
    console.error('send failed', row.id, message);
    await db.from('contact_messages').update({ email_status: 'failed', email_error: message }).eq('id', row.id);
    return json(502, { error: 'send failed' }, origin);
  }
});
