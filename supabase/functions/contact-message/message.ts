/**
 * Cleaning, validation and the alert email for contact-message. Plain
 * functions with no I/O, so they can be tested on their own.
 *
 * The brand name, addresses and escaping come from notify-quote's emails.ts,
 * so both functions sign and escape mail the same way.
 */
import { BRAND, escapeHtml, oneLine } from '../notify-quote/emails.ts';

/** Same limit as the textarea's maxlength on the site. */
export const MESSAGE_MAX = 1500;

export interface ContactInput {
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  message: string;
  consent: boolean;
  language: 'en' | 'it';
  page: string | null;
}

export interface ContactRow extends ContactInput {
  id: number;
  created_at: string;
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
const PHONE_RE = /^\+?[0-9 ().\/-]{6,30}$/;
const LINK_RE = /(https?:\/\/|www\.)/i;

const str = (v: unknown) => (typeof v === 'string' ? v : '');

/**
 * The message body: line breaks kept (normalised to \n), every other control
 * character removed, at most one blank line in a row, trimmed.
 */
export function cleanMessage(v: unknown): string {
  return str(v)
    .replace(/\r\n?/g, '\n')
    .replace(/\t/g, ' ')
    // deno-lint-ignore no-control-regex -- removing control characters is the point
    .replace(/[\u0000-\u0008\u000b-\u001f\u007f\u200b-\u200f\u2028\u2029\ufeff]/g, '')
    .replace(/[  ]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** Cleans the raw JSON body and lists the fields that fail validation. */
export function parseContact(body: Record<string, unknown>): { input: ContactInput; errors: string[] } {
  const phone = oneLine(str(body.phone), 30);
  const pageRaw = oneLine(str(body.page), 300);
  const input: ContactInput = {
    first_name: oneLine(str(body.first_name), 100),
    last_name: oneLine(str(body.last_name), 100),
    email: oneLine(str(body.email), 320).toLowerCase(),
    phone: phone || null,
    message: cleanMessage(body.message),
    consent: body.consent === true,
    language: body.language === 'it' ? 'it' : 'en',
    page: pageRaw.startsWith('/') ? pageRaw : null,
  };

  const errors: string[] = [];
  if (!input.first_name || LINK_RE.test(input.first_name)) errors.push('first_name');
  if (!input.last_name || LINK_RE.test(input.last_name)) errors.push('last_name');
  if (!EMAIL_RE.test(input.email)) errors.push('email');
  if (input.phone && (!PHONE_RE.test(input.phone) || input.phone.replace(/\D/g, '').length < 6)) {
    errors.push('phone');
  }
  // Checked on the raw text too, so an over-long message is refused rather
  // than silently cut.
  if (!input.message || str(body.message).length > MESSAGE_MAX + 200 || input.message.length > MESSAGE_MAX) {
    errors.push('message');
  }
  if (!input.consent) errors.push('consent');
  return { input, errors };
}

/** The alert to info@. Subject: "Website contact: {First} {Last}". */
export function contactEmail(row: ContactRow) {
  const name = `${row.first_name} ${row.last_name}`;
  const subject = oneLine(`Website contact: ${name}`, 180);
  const received = new Date(row.created_at).toLocaleString('en-GB', {
    timeZone: 'Europe/Rome',
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const list: [string, string][] = [
    ['Name', name],
    ['Email', row.email],
    ['Contact number', row.phone ?? 'Not given'],
    ['Message', row.message],
    ['Language', row.language === 'it' ? 'Italian' : 'English'],
    ['Page', row.page ?? ''],
    ['Received', `${received} (Rome time)`],
    ['Message no.', String(row.id)],
  ];

  const text = [
    `New message from the website contact form. Press Reply to answer ${name} directly.`,
    '',
    ...list.map(([k, v]) => `${k}: ${v}`),
  ].join('\n');

  const cell = (k: string, v: string) => {
    let value = escapeHtml(v).replace(/\n/g, '<br>');
    if (k === 'Email') value = `<a href="mailto:${escapeHtml(row.email)}">${value}</a>`;
    return `<tr><th align="left" valign="top" style="padding:8px 16px 8px 0;color:#5b625e;font-weight:600;white-space:nowrap">${
      escapeHtml(k)
    }</th><td style="padding:8px 0;color:#1c1f1d">${value}</td></tr>`;
  };

  const html =
    `<!doctype html><html><body style="margin:0;background:#f4f5f0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden">
<tr><td style="background:#0f2a1e;color:#ffffff;padding:16px 24px;font-size:17px;font-weight:700">Website contact · ${
      escapeHtml(BRAND)
    }</td></tr>
<tr><td style="padding:20px 24px 4px;color:#1c1f1d">Press <strong>Reply</strong> to answer ${
      escapeHtml(name)
    } directly.</td></tr>
<tr><td style="padding:8px 24px 24px"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse">${
      list.map(([k, v]) => cell(k, v)).join('')
    }</table></td></tr>
</table></td></tr></table></body></html>`;

  return { subject, text, html };
}
