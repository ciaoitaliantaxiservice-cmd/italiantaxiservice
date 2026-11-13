-- Optional "Preferred vehicle" on the quote form, pre-selected by the
-- homepage fleet section's "Book the …" buttons (?vehicle=<id>).
-- Stored as the English vehicle name (src/data/fleet.ts → formValue).
-- Additive and nullable: requests without it keep working. Safe to re-run.

alter table public.quote_requests
  add column if not exists vehicle text;

alter table public.quote_requests
  drop constraint if exists quote_requests_vehicle_check;
alter table public.quote_requests
  add constraint quote_requests_vehicle_check check (char_length(vehicle) <= 100);

-- The website (anon / publishable key) may set it on insert, nothing more.
grant insert (vehicle) on public.quote_requests to anon;
