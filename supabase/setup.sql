-- Run in a dedicated Paperwise project. Server-only quota RPC.
create table if not exists public.paperwise_usage (bucket text primary key, used integer not null default 0);
alter table public.paperwise_usage enable row level security;
revoke all on public.paperwise_usage from anon, authenticated;
grant select,insert,update on public.paperwise_usage to service_role;
create or replace function public.paperwise_reserve(p_user uuid,p_user_limit integer,p_global_limit integer,p_minute_limit integer)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare d text:=to_char(clock_timestamp() at time zone 'UTC','YYYYMMDD');
m text:=to_char(clock_timestamp() at time zone 'UTC','YYYYMMDDHH24MI');
u text:='u:'||p_user::text||':'||d; g text:='g:'||d; t text:='m:'||m; cu integer; cg integer; ct integer;
begin
perform pg_catalog.pg_advisory_xact_lock(98246031);
insert into public.paperwise_usage(bucket) values(u),(g),(t) on conflict do nothing;
select used into cu from public.paperwise_usage where bucket=u;
select used into cg from public.paperwise_usage where bucket=g;
select used into ct from public.paperwise_usage where bucket=t;
if cu>=p_user_limit or cg>=p_global_limit or ct>=p_minute_limit then return jsonb_build_object('allowed',false,'remaining',greatest(0,p_user_limit-cu));end if;
update public.paperwise_usage set used=used+1 where bucket in(u,g,t);
return jsonb_build_object('allowed',true,'remaining',greatest(0,p_user_limit-cu-1));
end $$;
revoke execute on function public.paperwise_reserve(uuid,integer,integer,integer) from public,anon,authenticated;
grant execute on function public.paperwise_reserve(uuid,integer,integer,integer) to service_role;
