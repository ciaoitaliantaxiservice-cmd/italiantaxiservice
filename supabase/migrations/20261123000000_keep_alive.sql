-- Keep-alive ping for the free plan, which pauses a project after about a
-- week without activity. .github/workflows/supabase-keep-alive.yml calls
-- this twice a week through the REST API (POST /rest/v1/rpc/keep_alive) with
-- the publishable key, so every ping is a real query on the database.
-- It reads no table and returns only the server time. Safe to re-run.

create or replace function public.keep_alive()
returns timestamptz
language sql
stable
security invoker
set search_path = ''
as $$ select now() $$;

revoke all on function public.keep_alive() from public;
grant execute on function public.keep_alive() to anon;
