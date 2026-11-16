-- "Return trip" on the Rome page's booking form (src/components/BookingForm.tsx).
-- The website sends `return_trip: true` only when the box is ticked, so
-- requests without it keep working before and after this runs.
-- Additive and nullable. Safe to re-run.

alter table public.quote_requests
  add column if not exists return_trip boolean;

-- The website (anon / publishable key) may set it on insert, nothing more.
grant insert (return_trip) on public.quote_requests to anon;
