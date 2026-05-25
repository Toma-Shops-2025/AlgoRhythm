
-- Roles
create type public.app_role as enum ('admin', 'creator', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "user_roles selectable by owner or admin" on public.user_roles
  for select to authenticated
  using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));

-- Profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  handle text not null unique,
  display_name text not null,
  bio text,
  avatar_url text,
  links jsonb not null default '{}'::jsonb,
  follower_count integer not null default 0,
  following_count integer not null default 0,
  post_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

create policy "profiles are viewable by everyone" on public.profiles
  for select using (true);
create policy "users can insert own profile" on public.profiles
  for insert to authenticated with check (auth.uid() = id);
create policy "users can update own profile" on public.profiles
  for update to authenticated using (auth.uid() = id);

-- Handle generator
create or replace function public.gen_unique_handle(_base text)
returns text language plpgsql security definer set search_path = public as $$
declare _h text; _i int := 0; _exists boolean;
begin
  _h := lower(regexp_replace(coalesce(_base,'user'), '[^a-zA-Z0-9_]', '', 'g'));
  if length(_h) < 3 then _h := 'user' || substr(replace(gen_random_uuid()::text,'-',''),1,6); end if;
  loop
    select exists(select 1 from public.profiles where handle = _h) into _exists;
    exit when not _exists;
    _i := _i + 1;
    _h := _h || _i::text;
  end loop;
  return _h;
end $$;

-- New user trigger
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare _handle text; _name text;
begin
  _name := coalesce(new.raw_user_meta_data->>'display_name',
                    new.raw_user_meta_data->>'full_name',
                    split_part(new.email,'@',1));
  _handle := public.gen_unique_handle(coalesce(new.raw_user_meta_data->>'handle', split_part(new.email,'@',1)));
  insert into public.profiles (id, handle, display_name, avatar_url)
    values (new.id, _handle, coalesce(_name, _handle), new.raw_user_meta_data->>'avatar_url');
  insert into public.user_roles (user_id, role) values (new.id, 'user');
  return new;
end $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Posts
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references public.profiles(id) on delete cascade,
  type text not null check (type in ('audio','video')),
  media_url text not null,
  cover_url text,
  title text not null,
  description text,
  ai_tools text[] not null default '{}',
  tags text[] not null default '{}',
  duration_seconds integer,
  like_count integer not null default 0,
  comment_count integer not null default 0,
  view_count integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.posts enable row level security;
create index posts_created_at_idx on public.posts (created_at desc);
create index posts_creator_idx on public.posts (creator_id, created_at desc);

create policy "posts viewable by everyone" on public.posts
  for select using (is_published = true or creator_id = auth.uid());
create policy "creators insert own posts" on public.posts
  for insert to authenticated with check (creator_id = auth.uid());
create policy "creators update own posts" on public.posts
  for update to authenticated using (creator_id = auth.uid());
create policy "creators delete own posts" on public.posts
  for delete to authenticated using (creator_id = auth.uid());

-- Likes
create table public.likes (
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);
alter table public.likes enable row level security;
create policy "likes readable by everyone" on public.likes for select using (true);
create policy "users like as themselves" on public.likes
  for insert to authenticated with check (user_id = auth.uid());
create policy "users unlike own" on public.likes
  for delete to authenticated using (user_id = auth.uid());

create or replace function public.likes_count_trg()
returns trigger language plpgsql as $$
begin
  if tg_op = 'INSERT' then
    update public.posts set like_count = like_count + 1 where id = new.post_id;
  elsif tg_op = 'DELETE' then
    update public.posts set like_count = greatest(0, like_count - 1) where id = old.post_id;
  end if;
  return null;
end $$;
create trigger likes_count_aiu after insert or delete on public.likes
  for each row execute function public.likes_count_trg();

-- Comments
create table public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 1000),
  created_at timestamptz not null default now()
);
alter table public.comments enable row level security;
create index comments_post_idx on public.comments (post_id, created_at desc);
create policy "comments readable by everyone" on public.comments for select using (true);
create policy "users comment as themselves" on public.comments
  for insert to authenticated with check (user_id = auth.uid());
create policy "users edit own comments" on public.comments
  for update to authenticated using (user_id = auth.uid());
create policy "users delete own comments" on public.comments
  for delete to authenticated using (user_id = auth.uid());

create or replace function public.comments_count_trg()
returns trigger language plpgsql as $$
begin
  if tg_op = 'INSERT' then
    update public.posts set comment_count = comment_count + 1 where id = new.post_id;
  elsif tg_op = 'DELETE' then
    update public.posts set comment_count = greatest(0, comment_count - 1) where id = old.post_id;
  end if;
  return null;
end $$;
create trigger comments_count_aid after insert or delete on public.comments
  for each row execute function public.comments_count_trg();

-- Follows
create table public.follows (
  follower_id uuid not null references auth.users(id) on delete cascade,
  following_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, following_id),
  check (follower_id <> following_id)
);
alter table public.follows enable row level security;
create policy "follows readable by everyone" on public.follows for select using (true);
create policy "users follow as themselves" on public.follows
  for insert to authenticated with check (follower_id = auth.uid());
create policy "users unfollow own" on public.follows
  for delete to authenticated using (follower_id = auth.uid());

create or replace function public.follows_count_trg()
returns trigger language plpgsql as $$
begin
  if tg_op = 'INSERT' then
    update public.profiles set follower_count = follower_count + 1 where id = new.following_id;
    update public.profiles set following_count = following_count + 1 where id = new.follower_id;
  elsif tg_op = 'DELETE' then
    update public.profiles set follower_count = greatest(0, follower_count - 1) where id = old.following_id;
    update public.profiles set following_count = greatest(0, following_count - 1) where id = old.follower_id;
  end if;
  return null;
end $$;
create trigger follows_count_aid after insert or delete on public.follows
  for each row execute function public.follows_count_trg();

-- Tips (placeholder — wired to payments later)
create table public.tips (
  id uuid primary key default gen_random_uuid(),
  from_user uuid not null references auth.users(id) on delete cascade,
  to_user uuid not null references auth.users(id) on delete cascade,
  post_id uuid references public.posts(id) on delete set null,
  amount_cents integer not null check (amount_cents > 0),
  currency text not null default 'usd',
  status text not null default 'pending' check (status in ('pending','succeeded','failed')),
  created_at timestamptz not null default now()
);
alter table public.tips enable row level security;
create policy "tips visible to participants" on public.tips
  for select to authenticated
  using (from_user = auth.uid() or to_user = auth.uid());
create policy "users send tips as themselves" on public.tips
  for insert to authenticated with check (from_user = auth.uid());

-- post_count trigger on posts
create or replace function public.posts_profile_count_trg()
returns trigger language plpgsql as $$
begin
  if tg_op = 'INSERT' then
    update public.profiles set post_count = post_count + 1 where id = new.creator_id;
  elsif tg_op = 'DELETE' then
    update public.profiles set post_count = greatest(0, post_count - 1) where id = old.creator_id;
  end if;
  return null;
end $$;
create trigger posts_profile_count_aid after insert or delete on public.posts
  for each row execute function public.posts_profile_count_trg();

-- Storage buckets
insert into storage.buckets (id, name, public) values
  ('avatars','avatars', true),
  ('media','media', true),
  ('covers','covers', true)
on conflict (id) do nothing;

create policy "avatars public read" on storage.objects
  for select using (bucket_id = 'avatars');
create policy "avatars owner write" on storage.objects
  for insert to authenticated with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "avatars owner update" on storage.objects
  for update to authenticated using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "avatars owner delete" on storage.objects
  for delete to authenticated using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "media public read" on storage.objects
  for select using (bucket_id = 'media');
create policy "media owner write" on storage.objects
  for insert to authenticated with check (bucket_id = 'media' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "media owner delete" on storage.objects
  for delete to authenticated using (bucket_id = 'media' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "covers public read" on storage.objects
  for select using (bucket_id = 'covers');
create policy "covers owner write" on storage.objects
  for insert to authenticated with check (bucket_id = 'covers' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "covers owner delete" on storage.objects
  for delete to authenticated using (bucket_id = 'covers' and (storage.foldername(name))[1] = auth.uid()::text);
