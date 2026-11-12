/**
 * Types, validation and the content of both emails sent by notify-quote:
 * the alert to the business and the confirmation to the customer.
 * Plain functions with no I/O, so they can be previewed and tested.
 */

export const BRAND = 'Ciao Italian Taxi Service';
export const SITE = 'https://www.ciaoitaliantaxiservice.com';

/** The tricolore rule, as table cells: email clients drop CSS gradients. */
const TRICOLORE =
  '<tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>' +
  '<td height="4" style="height:4px;font-size:0;line-height:0;background:#008c45">&nbsp;</td>' +
  '<td height="4" style="height:4px;font-size:0;line-height:0;background:#f4f5f0">&nbsp;</td>' +
  '<td height="4" style="height:4px;font-size:0;line-height:0;background:#cd212a">&nbsp;</td>' +
  '</tr></table></td></tr>';

export type FormType = 'booking' | 'enquiry';

export const ADDRESS: Record<FormType, string> = {
  booking: 'booking@ciaoitaliantaxiservice.com',
  enquiry: 'info@ciaoitaliantaxiservice.com',
};

export interface QuoteRow {
  id: number;
  created_at: string;
  status: string;
  form_type: FormType;
  name: string;
  email: string;
  phone: string;
  service: string | null;
  pickup: string;
  dropoff: string;
  travel_date: string;
  travel_time: string | null;
  passengers: number | null;
  luggage: number | null;
  flight: string | null;
  notes: string | null;
  consent: boolean;
  language: 'en' | 'it';
  page: string | null;
}

export const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** One line, no control characters: safe for headers and subjects. */
export const oneLine = (s: string, max = 120) =>
  // deno-lint-ignore no-control-regex -- stripping control characters is the point
  s.replace(/[\u0000-\u001f\u007f]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);

export function formatDate(iso: string, lang: 'en' | 'it'): string {
  const d = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(lang === 'it' ? 'it-IT' : 'en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(d);
}

export function formatReceived(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/Rome',
  }).format(new Date(iso));
}

/** Server-side validation, again: the database checks too, this is defence in depth. */
export function validate(r: QuoteRow): string[] {
  const problems: string[] = [];
  if (!['booking', 'enquiry'].includes(r.form_type)) problems.push('form_type');
  if (!r.name || r.name.length > 200) problems.push('name');
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(r.email ?? '') || r.email.length > 320) {
    problems.push('email');
  }
  if (!/^[0-9+()./ -]+$/.test(r.phone ?? '') || (r.phone.match(/\d/g) ?? []).length < 6) {
    problems.push('phone');
  }
  if (!r.pickup || r.pickup.length > 300) problems.push('pickup');
  if (!r.dropoff || r.dropoff.length > 300) problems.push('dropoff');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(r.travel_date ?? '')) problems.push('travel_date');
  if (r.consent !== true) problems.push('consent');
  return problems;
}

export function fields(r: QuoteRow): [string, string][] {
  const rows: [string, string | null | number][] = [
    ['Name', r.name],
    ['Phone', r.phone],
    ['Email', r.email],
    ['Pickup', r.pickup],
    ['Drop-off', r.dropoff],
    ['Date', formatDate(r.travel_date, 'en')],
    ['Time', r.travel_time ? r.travel_time.slice(0, 5) : 'Not given'],
    ['Passengers', r.passengers ?? 'Not given'],
    ['Large suitcases', r.luggage ?? 'Not given'],
    ['Flight / train number', r.flight ?? 'Not given'],
    ['Service', r.service ?? 'Not given'],
    ['Notes', r.notes ?? 'None'],
    ['Language', r.language === 'it' ? 'Italian' : 'English'],
    ['Sent from', r.page ? `${SITE}${r.page}` : 'Website'],
    ['Received', `${formatReceived(r.created_at)} (Italy)`],
    ['Request', `#${r.id}`],
  ];
  return rows.map(([k, v]) => [k, String(v)]);
}

export function alertEmail(r: QuoteRow) {
  const kind = r.form_type;
  const label = kind === 'booking' ? 'New booking' : 'New enquiry';
  const route = `${r.pickup} → ${r.dropoff}`;
  const subject = oneLine(`${label}: ${r.name}, ${route}, ${formatDate(r.travel_date, 'en')}`, 180);
  const list = fields(r);

  const text = [
    `${label} from the website. Press Reply to answer ${r.name} directly.`,
    '',
    ...list.map(([k, v]) => `${k}: ${v}`),
  ].join('\n');

  const cell = (k: string, v: string) => {
    let value = escapeHtml(v).replace(/\n/g, '<br>');
    if (k === 'Email') value = `<a href="mailto:${escapeHtml(r.email)}">${value}</a>`;
    if (k === 'Phone') {
      value = `<a href="tel:${escapeHtml(r.phone.replace(/[^0-9+]/g, ''))}">${value}</a>`;
    }
    return `<tr><th align="left" valign="top" style="padding:8px 16px 8px 0;color:#5b625e;font-weight:600;white-space:nowrap">${
      escapeHtml(k)
    }</th><td style="padding:8px 0;color:#1c1f1d">${value}</td></tr>`;
  };

  const html =
    `<!doctype html><html><body style="margin:0;background:#f4f5f0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden">
<tr><td style="background:#0f2a1e;color:#ffffff;padding:16px 24px;font-size:17px;font-weight:700">${
      escapeHtml(label)
    } · ${escapeHtml(BRAND)}</td></tr>
${TRICOLORE}
<tr><td style="padding:20px 24px 4px;color:#1c1f1d">Press <strong>Reply</strong> to answer ${
      escapeHtml(r.name)
    } directly.</td></tr>
<tr><td style="padding:8px 24px 24px"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse">${
      list.map(([k, v]) => cell(k, v)).join('')
    }</table></td></tr>
</table></td></tr></table></body></html>`;

  return { subject, text, html };
}

export function confirmationEmail(r: QuoteRow) {
  const it = r.language === 'it';
  const address = ADDRESS[r.form_type];
  const date = formatDate(r.travel_date, r.language);
  const subject = it
    ? `Abbiamo ricevuto la vostra richiesta · ${BRAND}`
    : `We have your request · ${BRAND}`;
  const lines = it
    ? [
      `Gentile ${r.name},`,
      `grazie per averci scritto. Abbiamo ricevuto la vostra richiesta per ${r.pickup} → ${r.dropoff}, ${date}.`,
      'Vi risponderemo con un preventivo a tariffa fissa. Nulla è confermato finché non ricevete il nostro preventivo scritto.',
      `Per aggiungere o correggere qualcosa, rispondete a questa email o scriveteci a ${address}.`,
    ]
    : [
      `Dear ${r.name},`,
      `Thank you for getting in touch. We have your request for ${r.pickup} → ${r.dropoff}, ${date}.`,
      'We will reply with a fixed quote. Nothing is confirmed until you have our written quote.',
      `To add or change anything, reply to this email or write to ${address}.`,
    ];
  const sign = it ? `Il team di ${BRAND}` : `The ${BRAND} team`;
  const text = [...lines, `${sign}\n${SITE}`].join('\n\n');

  const html =
    `<!doctype html><html lang="${r.language}"><body style="margin:0;background:#f4f5f0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1c1f1d">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:8px;overflow:hidden">
<tr><td style="background:#0f2a1e;color:#ffffff;padding:18px 24px;font-family:Georgia,'Times New Roman',serif;font-size:20px">${
      escapeHtml(BRAND)
    }</td></tr>
${TRICOLORE}
<tr><td style="padding:24px">${
      lines.map((l) => `<p style="margin:0 0 14px">${escapeHtml(l)}</p>`).join('')
    }
<p style="margin:20px 0 0">${
      escapeHtml(sign)
    }<br><a href="${SITE}/${r.language}/" style="color:#008c45">ciaoitaliantaxiservice.com</a></p></td></tr>
</table></td></tr></table></body></html>`;

  return { subject, text, html };
}
