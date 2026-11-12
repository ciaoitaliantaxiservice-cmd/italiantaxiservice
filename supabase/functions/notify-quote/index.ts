/**
 * notify-quote — emails each new website request.
 *
 * Triggered by a Database Webhook on INSERT into public.quote_requests.
 * Sends with Nodemailer through Gmail SMTP: smtp.gmail.com, port 465,
 * implicit TLS, logged in as the business Gmail account with an App
 * Password. booking@ and info@ are that account's verified "Send mail as"
 * addresses. (Supabase blocks outbound 25 and 587, so 465 is the only
 * option, and it is enforced below.)
 *
 * Gmail and forwarding: Gmail keeps a copy of everything it sends in Sent.
 * An alert addressed to booking@ would come back through ImprovMX into the
 * same Gmail inbox and be dropped as a duplicate of that Sent copy. So when
 * ALERT_INBOX is set, the alert is delivered straight to that inbox (the SMTP
 * envelope) while its To header still reads booking@ / info@.
 *
 *   booking (quote/booking forms)  From + To  booking@ciaoitaliantaxiservice.com
 *   enquiry (contact forms)        From + To  info@ciaoitaliantaxiservice.com
 *   Sender name "Ciao Italian Taxi Service"; Reply-To is the customer, so
 *   pressing Reply in Gmail answers them directly.
 *
 * Optionally (SEND_CONFIRMATION, on by default) a short confirmation goes to
 * the customer from the same address, with Reply-To set to that address.
 *
 * Safety:
 *   - The caller must present WEBHOOK_SECRET in the x-webhook-secret header
 *     (or the service-role key as a Bearer token).
 *   - The payload is never trusted: the row is re-read from the database by
 *     id, and claimed atomically (email_status null -> 'sending'), so each
 *     request is emailed at most once even if the webhook fires twice.
 *   - Rows marked 'spam' by the database guard (honeypot) are skipped.
 *   - Every field is validated again here and HTML-escaped in the email.
 *
 * Secrets (supabase secrets set ...), see supabase/README.md:
 *   WEBHOOK_SECRET                          required
 *   SMTP_USER / SMTP_PASS                   the Gmail address and its App Password
 *   ALERT_INBOX                             the Gmail address alerts are delivered to
 *   SMTP_HOST                               optional, default smtp.gmail.com
 *   SMTP_BOOKING_USER / _PASS, SMTP_INFO_USER / _PASS
 *                                           optional per-address logins instead
 *   SEND_CONFIRMATION                       "false" to turn customer emails off
 * SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided by Supabase.
 */
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';
import {
  ADDRESS,
  alertEmail,
  BRAND,
  confirmationEmail,
  type FormType,
  oneLine,
  type QuoteRow,
  validate,
} from './emails.ts';

const SMTP_PORT = 465; // implicit TLS; 25 and 587 are blocked on Supabase

const env = (key: string) => (Deno.env.get(key) ?? '').trim();
const SMTP_HOST = env('SMTP_HOST') || 'smtp.gmail.com';

const db = createClient(env('SUPABASE_URL'), env('SUPABASE_SERVICE_ROLE_KEY'), {
  auth: { persistSession: false },
});

// ---------------------------------------------------------------------------
// Helpers

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

/** Constant-time string comparison, so the secret cannot be guessed by timing. */
function safeEqual(a: string, b: string): boolean {
  const ea = new TextEncoder().encode(a);
  const eb = new TextEncoder().encode(b);
  let diff = ea.length ^ eb.length;
  for (let i = 0; i < Math.max(ea.length, eb.length); i++) diff |= (ea[i] ?? 0) ^ (eb[i] ?? 0);
  return diff === 0;
}

function authorized(req: Request): boolean {
  const secret = env('WEBHOOK_SECRET');
  const header = req.headers.get('x-webhook-secret') ?? '';
  if (secret && header && safeEqual(header, secret)) return true;
  const service = env('SUPABASE_SERVICE_ROLE_KEY');
  const bearer = (req.headers.get('authorization') ?? '').replace(/^Bearer\s+/i, '');
  return !!service && !!bearer && safeEqual(bearer, service);
}

function smtpAuth(kind: FormType) {
  const prefix = kind === 'booking' ? 'SMTP_BOOKING' : 'SMTP_INFO';
  const user = env(`${prefix}_USER`) || env('SMTP_USER');
  const pass = env(`${prefix}_PASS`) || env('SMTP_PASS');
  if (!user || !pass) {
    throw new Error(`Missing SMTP credentials for ${kind} (${prefix}_USER/_PASS)`);
  }
  return { user, pass };
}

function transporter(kind: FormType) {
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true, // TLS from the first byte, as port 465 requires
    auth: smtpAuth(kind),
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
}

// ---------------------------------------------------------------------------
// Handler

async function mark(id: number, values: Record<string, unknown>) {
  const { error } = await db.from('quote_requests').update(values).eq('id', id);
  if (error) console.error('update failed', id, error.message);
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'POST only' });
  if (!authorized(req)) return json(401, { error: 'unauthorized' });

  const body = await req.json().catch(() => null);
  if (body?.table && body.table !== 'quote_requests') return json(400, { error: 'wrong table' });
  const id = Number(body?.record?.id ?? body?.id);
  if (!Number.isInteger(id) || id <= 0) return json(400, { error: 'missing record id' });

  // Claim the row: only one invocation can move it from null to 'sending'.
  const { data: row, error } = await db
    .from('quote_requests')
    .update({ email_status: 'sending' })
    .eq('id', id)
    .is('email_status', null)
    .select()
    .maybeSingle<QuoteRow>();
  if (error) return json(500, { error: error.message });
  if (!row) return json(200, { skipped: 'already handled or not found', id });

  if (row.status === 'spam') {
    await mark(id, { email_status: 'skipped', email_error: 'spam (honeypot)' });
    return json(200, { skipped: 'spam', id });
  }

  const problems = validate(row);
  if (problems.length) {
    await mark(id, { email_status: 'failed', email_error: `invalid: ${problems.join(', ')}` });
    return json(422, { error: 'invalid request', problems, id });
  }

  const kind = row.form_type;
  const address = ADDRESS[kind];
  const from = { name: BRAND, address };

  try {
    const smtp = transporter(kind);

    const alert = alertEmail(row);
    await smtp.sendMail({
      from,
      to: { name: BRAND, address },
      replyTo: { name: oneLine(row.name, 100), address: row.email },
      // Delivered straight to the Gmail inbox; see "Gmail and forwarding" above.
      ...(env('ALERT_INBOX') ? { envelope: { from: address, to: env('ALERT_INBOX') } } : {}),
      subject: alert.subject,
      text: alert.text,
      html: alert.html,
    });

    let note: string | null = null;
    if (env('SEND_CONFIRMATION').toLowerCase() !== 'false') {
      const confirm = confirmationEmail(row);
      try {
        await smtp.sendMail({
          from,
          to: { name: oneLine(row.name, 100), address: row.email },
          replyTo: from,
          subject: confirm.subject,
          text: confirm.text,
          html: confirm.html,
          // Marks it as automatic, so out-of-office replies are not sent back.
          headers: { 'Auto-Submitted': 'auto-generated' },
        });
      } catch (e) {
        // The alert went out; a failed confirmation must not hide that.
        note = `confirmation failed: ${(e as Error).message}`.slice(0, 500);
        console.error(note);
      }
    }

    smtp.close();
    await mark(id, {
      email_status: 'sent',
      emailed_at: new Date().toISOString(),
      email_error: note,
    });
    return json(200, { sent: true, id, to: address });
  } catch (e) {
    const message = (e as Error).message.slice(0, 500);
    console.error('send failed', id, message);
    await mark(id, { email_status: 'failed', email_error: message });
    return json(502, { error: 'send failed', id });
  }
});
