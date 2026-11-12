-- Quote requests from the website form (EN and IT).
-- Run once in Supabase: Dashboard -> SQL Editor -> New query -> paste -> Run.
-- Safe to re-run.
--
-- Access model: the website uses the public anon / publishable key, which may
-- only INSERT rows. Nobody can read, change or delete requests with that key;
-- you read them in the dashboard (Table Editor) or with the secret key.

create table if not exists public.quote_requests (
  id           bigint generated always as identity primary key,
  created_at   timestamptz not null default now(),
  status       text not null default 'new'
               check (status in ('new', 'quoted', 'booked', 'closed')),

  name         text not null check (char_length(name) between 1 and 200),
  email        text not null check (char_length(email) between 3 and 320 and email like '%@%'),
  phone        text not null check (char_length(phone) between 3 and 40),
  service      text check (char_length(service) <= 100),
  pickup       text not null check (char_length(pickup) between 1 and 300),
  dropoff      text not null check (char_length(dropoff) between 1 and 300),
  travel_date  date not null,
  travel_time  time,
  passengers   smallint check (passengers between 1 and 16),
  luggage      smallint check (luggage between 0 and 20),
  flight       text check (char_length(flight) <= 40),
  notes        text check (char_length(notes) <= 4000),
  consent      boolean not null check (consent),
  language     text not null check (language in ('en', 'it')),
  page         text check (char_length(page) <= 300)
);

alter table public.quote_requests enable row level security;

-- Insert only, for visitors using the anon / publishable key.
drop policy if exists "Website can submit quote requests" on public.quote_requests;
create policy "Website can submit quote requests"
  on public.quote_requests
  for insert
  to anon
  with check (status = 'new');

-- Belt and braces: the anon role gets INSERT and nothing else on this table.
revoke all on public.quote_requests from anon;
grant insert (name, email, phone, service, pickup, dropoff, travel_date, travel_time,
              passengers, luggage, flight, notes, consent, language, page)
  on public.quote_requests to anon;

create index if not exists quote_requests_created_at_idx
  on public.quote_requests (created_at desc);
