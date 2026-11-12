-- Email alerts, honeypot, server-side validation and rate limiting for
-- public.quote_requests. Run after 20261112000000_quote_requests.sql.
-- Dashboard -> SQL Editor -> New query -> paste -> Run. Safe to re-run.
--
-- What it adds:
--   form_type     'booking' (quote/booking forms -> booking@) or
--                 'enquiry' (contact forms -> info@). The site's form sends
--                 'booking'.
--   honeypot      the hidden "Company" field. People never fill it; when a
--                 bot does, the row is kept as status 'spam' and no email
--                 is sent (the bot still sees a normal success).
--   client_hash   a one-way hash of the sender's IP, used only for rate
--                 limiting. The IP itself is never stored.
--   email_status  null -> 'sending' -> 'sent' | 'failed' | 'skipped',
--                 written by the notify-quote Edge Function. It also stops
--                 the same request being emailed twice.
--
-- Every insert from the website passes through quote_requests_guard()
-- (validation + rate limits) before it is stored.

alter table public.quote_requests
  add column if not exists form_type    text not null default 'booking',
  add column if not exists honeypot     text,
  add column if not exists client_hash  text,
  add column if not exists email_status text,
  add column if not exists emailed_at   timestamptz,
  add column if not exists email_error  text;

alter table public.quote_requests drop constraint if exists quote_requests_form_type_check;
alter table public.quote_requests add constraint quote_requests_form_type_check
  check (form_type in ('booking', 'enquiry'));

alter table public.quote_requests drop constraint if exists quote_requests_honeypot_check;
alter table public.quote_requests add constraint quote_requests_honeypot_check
  check (char_length(honeypot) <= 200);

alter table public.quote_requests drop constraint if exists quote_requests_email_status_check;
alter table public.quote_requests add constraint quote_requests_email_status_check
  check (email_status in ('sending', 'sent', 'failed', 'skipped'));

-- 'spam' joins the workflow statuses.
alter table public.quote_requests drop constraint if exists quote_requests_status_check;
alter table public.quote_requests add constraint quote_requests_status_check
  check (status in ('new', 'quoted', 'booked', 'closed', 'spam'));

-- The website may insert the form's columns, including the two new ones.
grant insert (form_type, honeypot) on public.quote_requests to anon;

-- The guard below may mark a row 'spam' before RLS checks it.
drop policy if exists "Website can submit quote requests" on public.quote_requests;
create policy "Website can submit quote requests"
  on public.quote_requests
  for insert
  to anon
  with check (status in ('new', 'spam'));

create index if not exists quote_requests_client_hash_idx
  on public.quote_requests (client_hash, created_at desc);
create index if not exists quote_requests_email_idx
  on public.quote_requests (email, created_at desc);

-- Validation, honeypot and rate limits, enforced in the database so they
-- hold even for requests that never went through the website.
create or replace function public.quote_requests_guard()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  headers json := nullif(current_setting('request.headers', true), '')::json;
  ip      text;
  recent  int;
begin
  -- Normalise.
  new.name    := btrim(new.name);
  new.email   := lower(btrim(new.email));
  new.phone   := btrim(new.phone);
  new.pickup  := btrim(new.pickup);
  new.dropoff := btrim(new.dropoff);
  new.flight  := nullif(btrim(new.flight), '');
  new.notes   := nullif(btrim(new.notes), '');
  new.service := nullif(btrim(new.service), '');
  -- Columns only the system writes.
  new.email_status := null;
  new.emailed_at   := null;
  new.email_error  := null;

  -- Validation (the table's check constraints cover lengths and consent).
  if new.name = '' or new.pickup = '' or new.dropoff = '' then
    raise exception 'Missing required field' using errcode = '22023';
  end if;
  if new.email !~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]{2,}$' then
    raise exception 'Invalid email address' using errcode = '22023';
  end if;
  if new.phone !~ '^[0-9+()./ -]+$' or length(regexp_replace(new.phone, '[^0-9]', '', 'g')) < 6 then
    raise exception 'Invalid phone number' using errcode = '22023';
  end if;
  -- One day of slack for time zones; no bookings more than two years out.
  if new.travel_date < current_date - 1 or new.travel_date > current_date + 730 then
    raise exception 'Invalid travel date' using errcode = '22023';
  end if;

  -- Honeypot, and links in the name field: kept, marked spam, never emailed.
  if coalesce(btrim(new.honeypot), '') <> '' or new.name ~* '(https?://|www\.)' then
    new.status := 'spam';
  end if;

  -- Rate limits. Supabase passes the visitor's IP in the request headers.
  ip := btrim(split_part(coalesce(headers ->> 'cf-connecting-ip', headers ->> 'x-forwarded-for', ''), ',', 1));
  new.client_hash := case when ip <> '' then md5('ciao-quote:' || ip) end;

  if new.client_hash is not null then
    select count(*) into recent from public.quote_requests
     where client_hash = new.client_hash and created_at > now() - interval '10 minutes';
    if recent >= 5 then
      raise exception 'Too many requests, please try again later' using errcode = 'P0001';
    end if;
  end if;

  select count(*) into recent from public.quote_requests
   where email = new.email and created_at > now() - interval '1 hour';
  if recent >= 5 then
    raise exception 'Too many requests, please try again later' using errcode = 'P0001';
  end if;

  select count(*) into recent from public.quote_requests
   where created_at > now() - interval '1 hour';
  if recent >= 100 then
    raise exception 'Too many requests, please try again later' using errcode = 'P0001';
  end if;

  return new;
end;
$$;

revoke all on function public.quote_requests_guard() from public, anon, authenticated;

drop trigger if exists quote_requests_guard on public.quote_requests;
create trigger quote_requests_guard
  before insert on public.quote_requests
  for each row execute function public.quote_requests_guard();

-- The Database Webhook that calls the notify-quote Edge Function is created
-- in the dashboard (Database -> Webhooks), so its secret header never lands
-- in this repository. See supabase/README.md, step 4.
