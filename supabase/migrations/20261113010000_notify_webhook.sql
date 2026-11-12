-- Database Webhook: every new row in public.quote_requests calls the
-- notify-quote Edge Function, which emails it. Run after
-- 20261113000000_email_alerts.sql. Safe to re-run.
--
-- This is the same mechanism as Dashboard -> Database -> Webhooks (pg_net
-- sends the HTTP request after the insert commits, so the website's insert
-- never waits for email). It is written as SQL so the secret header is read
-- from Supabase Vault at run time and never appears in this repository.
--
-- One-off, before the first insert (not stored here):
--   select vault.create_secret('<WEBHOOK_SECRET value>', 'notify_quote_webhook_secret',
--          'x-webhook-secret for the notify-quote Edge Function');
-- It must equal the function's WEBHOOK_SECRET (supabase secrets set ...).

create extension if not exists pg_net with schema extensions;

create or replace function public.quote_requests_notify()
returns trigger
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  secret text;
begin
  select decrypted_secret into secret
    from vault.decrypted_secrets
   where name = 'notify_quote_webhook_secret'
   limit 1;

  if secret is null then
    raise warning 'notify-quote: Vault secret notify_quote_webhook_secret is missing; request % was saved but not emailed', new.id;
    return new;
  end if;

  -- Only the id is sent: the function re-reads the row itself.
  perform net.http_post(
    url := 'https://zuutmiilqhtqgfvowlns.supabase.co/functions/v1/notify-quote',
    body := jsonb_build_object(
      'type', 'INSERT',
      'schema', 'public',
      'table', 'quote_requests',
      'record', jsonb_build_object('id', new.id)
    ),
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-webhook-secret', secret
    ),
    timeout_milliseconds := 20000
  );
  return new;
end;
$$;

revoke all on function public.quote_requests_notify() from public, anon, authenticated;

drop trigger if exists quote_requests_notify on public.quote_requests;
create trigger quote_requests_notify
  after insert on public.quote_requests
  for each row execute function public.quote_requests_notify();
