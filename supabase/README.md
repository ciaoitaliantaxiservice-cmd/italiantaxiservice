# Quote requests and email alerts (Supabase)

How a request travels:

```
Website form ──insert──▶ public.quote_requests ──webhook trigger (pg_net, AFTER INSERT)──▶ Edge Function notify-quote
 (publishable key,        (guard trigger: validation,                                      (Nodemailer → smtp.gmail.com:465)
  insert only)             honeypot, rate limits)                                             │
                                                                                              ├─▶ alert, To: booking@ / info@ (Reply-To = customer)
                                                                                              └─▶ customer: short confirmation
```

| Form | `form_type` | From and To (headers) | Subject |
|---|---|---|---|
| Quote / booking (contact page, both languages) | `booking` | `booking@ciaoitaliantaxiservice.com` | `New booking: Name, Pickup → Drop-off, Date` |
| A general contact form, if one is added | `enquiry` | `info@ciaoitaliantaxiservice.com` | `New enquiry: …` |

Sender name: **Ciao Italian Taxi Service**. Reply-To: the customer, so
pressing Reply in Gmail answers them directly (pick `booking@` or `info@` in
Gmail's From field when you reply). The alert lists every field: name, phone,
email, pickup, drop-off, date, time, passengers, large suitcases,
flight/train number, service, notes, language, page, time received and the
request number. The customer's confirmation comes from the same address, in
their language.

The site has one form today (the quote form), so website alerts are
`booking`. The `enquiry` route is live and tested; a contact form only has to
send `form_type: 'enquiry'`.

## Live setup (13 Nov 2026)

| Piece | State |
|---|---|
| Migrations `20261112000000`, `20261113000000`, `20261113010000` | applied |
| Edge Function `notify-quote` | deployed, JWT check off (it checks its own secret) |
| Secrets | `WEBHOOK_SECRET`, `SMTP_USER`, `SMTP_PASS`, `ALERT_INBOX` |
| Vault secret `notify_quote_webhook_secret` | set (same value as `WEBHOOK_SECRET`) |
| Webhook trigger `quote_requests_notify` (pg_net) | active |
| Tests | request #1 (enquiry → info@) and #2 (booking → booking@, sent through the real form): both `email_status = sent` |

## Sending: Gmail SMTP

Mail goes out through **smtp.gmail.com, port 465 (TLS)**, logged in as
`ciaoitaliantaxiservice@gmail.com` with a Google **App Password**
(`SMTP_USER` / `SMTP_PASS`). Supabase blocks ports 25 and 587; the function
refuses anything but 465.

- `booking@` and `info@` must stay verified in that Gmail account under
  **Settings → Accounts → Send mail as**, or Gmail rewrites the From to the
  gmail.com address.
- **Why alerts skip the forwarding.** Gmail stores a copy of every message it
  sends in Sent. An alert addressed to booking@ would come back through
  ImprovMX into the same inbox and Gmail would drop it as a duplicate of the
  Sent copy. So the alert's SMTP envelope delivers it straight to
  `ALERT_INBOX` (the Gmail address); its To header still says booking@ or
  info@. The alert therefore appears in the inbox *and* under Sent: that is
  expected.
- **Deliverability.** Gmail signs mail for gmail.com, not for
  ciaoitaliantaxiservice.com, so DMARC for the domain does not align when
  mail goes out this way. With `p=none` it is delivered, and some mail apps
  show "via gmail.com". **Keep DMARC at `p=none` while sending through
  Gmail.** For fully aligned mail later, switch `SMTP_HOST`/`SMTP_USER`/
  `SMTP_PASS` to an SMTP service that signs for the domain (ImprovMX's paid
  SMTP, or Google Workspace); no code change is needed.
- Gmail's own limit is about 500 messages a day; each request uses two (alert
  and confirmation).
- If you change the Google password or revoke the App Password, create a new
  App Password and run `secrets set SMTP_PASS=…` again.

## Files

| File | What it is |
|---|---|
| `migrations/20261112000000_quote_requests.sql` | The table and its insert-only access. |
| `migrations/20261113000000_email_alerts.sql` | Form type, honeypot, server-side validation, rate limits, email status columns. |
| `migrations/20261113010000_notify_webhook.sql` | The webhook: pg_net trigger that calls the function after each insert. |
| `functions/notify-quote/index.ts` | The Edge Function: auth, claim the row, send with Nodemailer. |
| `functions/notify-quote/emails.ts` | Validation and the content of both emails (no I/O). |
| `functions/notify-quote/deno.json` | Pinned `nodemailer@7.0.13` and `@supabase/supabase-js@2.118.0`. |
| `config.toml` | Turns off Supabase's JWT check for this function. |

## Re-deploying or setting up again

With the Supabase CLI logged in (`npx supabase@3.1.0 login`):

```sh
R=zuutmiilqhtqgfvowlns

# 1. Database (each file is safe to re-run)
npx supabase@3.1.0 db query --remote=$R --yes -f supabase/migrations/20261112000000_quote_requests.sql
npx supabase@3.1.0 db query --remote=$R --yes -f supabase/migrations/20261113000000_email_alerts.sql
npx supabase@3.1.0 db query --remote=$R --yes -f supabase/migrations/20261113010000_notify_webhook.sql

# 2. Secrets. WEBHOOK_SECRET must also be stored in Vault as
#    notify_quote_webhook_secret (see the comment in the webhook migration).
npx supabase@3.1.0 secrets set --project-ref $R \
  WEBHOOK_SECRET="<long random value>" \
  SMTP_USER="ciaoitaliantaxiservice@gmail.com" SMTP_PASS="<Gmail App Password>" \
  ALERT_INBOX="ciaoitaliantaxiservice@gmail.com"
# Optional: SEND_CONFIRMATION=false turns the customer confirmation off.

# 3. The function
npx supabase@3.1.0 functions deploy notify-quote --project-ref $R --no-verify-jwt --use-api
```

## Checking and resending

- **Table Editor → `quote_requests`**: `email_status` is `sent`, `failed`
  (reason in `email_error`), `skipped` (spam) or empty (not processed).
- **Edge Functions → notify-quote → Logs** for the detail of a failure.
- To resend one: set its `email_status` back to empty, then
  ```sh
  curl -X POST "https://zuutmiilqhtqgfvowlns.supabase.co/functions/v1/notify-quote" \
    -H "x-webhook-secret: <WEBHOOK_SECRET>" -H "Content-Type: application/json" \
    -d '{"record":{"id":123}}'
  ```

## Spam and abuse protection

- **Honeypot**: the hidden "Company" field. A filled one is stored with
  `status = 'spam'`, never emailed, and the sender still sees "sent".
  A name containing a link is treated the same way.
- **Server-side validation** (database trigger `quote_requests_guard`, and
  again in the function): required fields, email and phone format, travel
  date from yesterday to two years ahead, length limits, consent.
- **Rate limits** (same trigger): 5 requests per IP per 10 minutes, 5 per
  email address per hour, 100 site-wide per hour. Over the limit, the form
  shows its "could not be sent, try again or email us" message. The IP is
  stored only as a one-way hash.
- **Once only**: the function claims each row (`email_status` null →
  `sending`) before sending, so a repeated webhook cannot email twice. It
  re-reads the row from the database instead of trusting the webhook body,
  and refuses callers without the secret.

## DNS (checked 13 Nov 2026 with public resolvers: all in place)

| Record | Value | Status |
|---|---|---|
| MX `@` | `mx1.improvmx.com` (10), `mx2.improvmx.com` (20) | ✅ |
| SPF `@` TXT | `v=spf1 include:spf.improvmx.com ~all` (one record) | ✅ |
| DKIM `dkimprovmx1._domainkey` | CNAME `dkimprovmx1.improvmx.com` (DNS only) | ✅ |
| DKIM `dkimprovmx2._domainkey` | CNAME `dkimprovmx2.improvmx.com` (DNS only) | ✅ |
| DMARC `_dmarc` TXT | `v=DMARC1; p=none; rua=mailto:info@ciaoitaliantaxiservice.com` | ✅ |

Keep DMARC at `p=none` while mail is sent through Gmail (see above). Keep
**one** SPF record; if another service ever needs to send as the domain, add
its `include:` to it. Never proxy (orange-cloud) the DKIM CNAMEs.
