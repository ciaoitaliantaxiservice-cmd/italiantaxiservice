-- Messages from the contact page's form (EN and IT), sent through the
-- contact-message Edge Function. Safe to re-run.
--
-- Unlike quote_requests, the browser never writes here: the function checks
-- the Cloudflare Turnstile token, the honeypot, the 3-second minimum and the
-- rate limit (5 per IP per hour) first, then inserts with the service role.
-- So anon and authenticated get no access at all. Read the messages in the
-- dashboard (Table Editor -> contact_messages).
--
-- client_hash is a one-way hash of the sender's IP, used only for the rate
-- limit; the IP itself is never stored.

create table if not exists public.contact_messages (
  id           bigint generated always as identity primary key,
  created_at   timestamptz not null default now(),
  status       text not null default 'new'
               check (status in ('new', 'replied', 'closed')),

  first_name   text not null check (char_length(first_name) between 1 and 100),
  last_name    text not null check (char_length(last_name) between 1 and 100),
  email        text not null check (char_length(email) between 3 and 320 and email like '%@%'),
  phone        text check (char_length(phone) <= 30),
  message      text not null check (char_length(message) between 1 and 1500),
  consent      boolean not null check (consent),
  language     text not null check (language in ('en', 'it')),
  page         text check (char_length(page) <= 300),

  client_hash  text check (char_length(client_hash) <= 64),
  email_status text check (email_status in ('sending', 'sent', 'failed')),
  emailed_at   timestamptz,
  email_error  text check (char_length(email_error) <= 500)
);

alter table public.contact_messages enable row level security;

-- No policies and no grants: only the service role (the Edge Function and
-- the dashboard) can read or write this table.
revoke all on public.contact_messages from anon, authenticated;

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);
create index if not exists contact_messages_client_hash_idx
  on public.contact_messages (client_hash, created_at desc);
