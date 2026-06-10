-- ===== Design Skill Market データベース初期設定 =====
-- Supabase ダッシュボードの「SQL Editor」に全文貼り付けて Run する

-- プロフィール（アカウント）
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  name text not null,
  initial text default '?',
  avatar_color text default '#4f46e5',
  bio text default '',
  links jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);
alter table profiles enable row level security;
create policy "profiles_select" on profiles for select using (true);
create policy "profiles_insert" on profiles for insert with check (auth.uid() = id);
create policy "profiles_update" on profiles for update using (auth.uid() = id);

-- 投稿デザイン
create table designs (
  id text primary key,
  creator uuid not null references profiles(id) on delete cascade,
  title text not null,
  tags text[] default '{}',
  description text default '',
  category text default 'その他',
  color_tone text default 'その他',
  price int default 0 check (price >= 0),
  features text[] default '{}',
  thumb text default '',
  skill text not null,
  created_at timestamptz default now()
);
alter table designs enable row level security;
create policy "designs_select" on designs for select using (true);
create policy "designs_insert" on designs for insert with check (auth.uid() = creator);
create policy "designs_update" on designs for update using (auth.uid() = creator);
create policy "designs_delete" on designs for delete using (auth.uid() = creator);

-- レビュー（ログイン不要で投稿できる）
create table reviews (
  id uuid primary key default gen_random_uuid(),
  design_id text not null,
  name text not null,
  stars int not null check (stars between 1 and 5),
  body text not null,
  created_at timestamptz default now()
);
alter table reviews enable row level security;
create policy "reviews_select" on reviews for select using (true);
create policy "reviews_insert" on reviews for insert with check (true);

-- ダウンロード数
create table design_stats (
  design_id text primary key,
  downloads int default 0
);
alter table design_stats enable row level security;
create policy "stats_select" on design_stats for select using (true);

-- DL数を安全に+1する関数（匿名ユーザーからも呼べる）
create or replace function bump_download(d_id text)
returns void
language sql
security definer
set search_path = public
as $$
  insert into design_stats (design_id, downloads) values (d_id, 1)
  on conflict (design_id) do update set downloads = design_stats.downloads + 1;
$$;
