-- ============================================================
--  A Gahwa Log — complete database setup
--  Run this once in: Supabase dashboard -> SQL Editor -> New query -> Run
--  It is safe to run again; nothing here deletes your data.
-- ============================================================

-- ------------------------------------------------------------
-- 1. THE TABLE
--    One row = one gahwa experience that one user saved.
-- ------------------------------------------------------------
create table if not exists public.gahwa_logs (
  -- A unique id for the row. Postgres generates it automatically,
  -- so the app never has to invent one.
  id uuid primary key default gen_random_uuid(),

  -- WHO OWNS THIS ROW.
  -- `auth.users` is the table Supabase Authentication manages for you.
  -- Storing the owner's id here is what makes "my rows" a real thing.
  -- `on delete cascade` = if the account is deleted, its gahwa rows go too.
  user_id uuid not null references auth.users (id) on delete cascade,

  -- Where the gahwa was tried, e.g. 'Qahwa House'.
  -- The check rejects an empty or whitespace-only name.
  place_name text not null check (char_length(btrim(place_name)) between 1 and 120),

  -- The day the user tried the gahwa (no time of day needed).
  date date not null,

  -- 1 to 5 stars. The database itself refuses 0, 6, or -3,
  -- even if a bad request somehow skips the form.
  rating integer not null check (rating between 1 and 5),

  -- Optional personal comment. `null` means the user left it blank.
  notes text check (notes is null or char_length(notes) <= 1000),

  -- When the row was created. Filled in automatically, used for sorting.
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 2. AN INDEX
--    Makes "give me MY rows, newest first" fast as the table grows.
-- ------------------------------------------------------------
create index if not exists gahwa_logs_user_id_created_at_idx
  on public.gahwa_logs (user_id, created_at desc);

-- ------------------------------------------------------------
-- 3. ROW LEVEL SECURITY (RLS)
--
--    WHY THIS IS NECESSARY:
--    The key the browser uses is public. Anyone can read it out of the
--    page source. Without RLS, that key would let ANYONE ask for the whole
--    table and get everybody's private notes back.
--
--    With RLS on, Postgres refuses to return any row unless a policy
--    below says yes. Locking is done by the database, so it applies to
--    the website, to a curl command, to Postman, to everything.
-- ------------------------------------------------------------
alter table public.gahwa_logs enable row level security;

--    WHAT auth.uid() MEANS:
--    When someone logs in, Supabase gives their browser a signed token
--    (a JWT) that contains their user id. That token travels with every
--    request. `auth.uid()` reads the id out of it.
--    The token is signed with a secret only Supabase knows, so a user
--    cannot edit it to claim to be somebody else.

-- READ: you may see a row only if you are its owner.
drop policy if exists "Users can read their own gahwa logs" on public.gahwa_logs;
create policy "Users can read their own gahwa logs"
  on public.gahwa_logs
  for select
  to authenticated                 -- logged-out visitors are excluded here
  using (auth.uid() = user_id);    -- and this hides other people's rows

-- WRITE: you may create a row only if you stamp it with your own id.
drop policy if exists "Users can add their own gahwa logs" on public.gahwa_logs;
create policy "Users can add their own gahwa logs"
  on public.gahwa_logs
  for insert
  to authenticated
  with check (auth.uid() = user_id);   -- blocks writing rows "as" someone else

--    WHY USERS CANNOT REACH EACH OTHER'S ROWS:
--    `using (auth.uid() = user_id)` is added by Postgres to every SELECT
--    on this table, automatically, at the lowest level. If User B asks for
--    "select * from gahwa_logs", the database quietly turns it into
--    "select * from gahwa_logs where user_id = <B's id>". User A's rows are
--    not filtered out after the fact — they are never read in the first place.
--
--    UPDATE and DELETE deliberately have NO policy. With RLS enabled,
--    anything a policy does not explicitly allow is denied, so nobody can
--    edit or delete rows until that feature is built.
