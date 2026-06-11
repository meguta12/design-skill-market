-- ===== Design Skill Market データベース初期設定（v2: ジャンル・画像・管理者対応） =====
-- Supabase ダッシュボードの「SQL Editor」に全文貼り付けて Run する
-- ※すでに v1 を実行済みの場合はこのファイルではなく supabase-update-1.sql を実行すること

-- プロフィール（アカウント）
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  name text not null,
  initial text default '?',
  avatar_color text default '#4f46e5',
  avatar_url text default '',
  bio text default '',
  links jsonb default '{}'::jsonb,
  is_admin boolean default false,
  created_at timestamptz default now()
);
alter table profiles enable row level security;
create policy "profiles_select" on profiles for select using (true);
create policy "profiles_insert" on profiles for insert with check (auth.uid() = id);
create policy "profiles_update" on profiles for update using (auth.uid() = id);

-- is_admin 列は本人でも書き換え不可にする（列単位の権限制御）
revoke insert, update on table profiles from anon, authenticated;
grant insert (id, name, initial, avatar_color, avatar_url, bio, links) on profiles to authenticated;
grant update (name, initial, avatar_color, avatar_url, bio, links) on profiles to authenticated;

-- 管理者判定（RLSポリシー内から使う）
create or replace function is_admin(uid uuid)
returns boolean
language sql stable security definer
set search_path = public
as $$
  select coalesce((select is_admin from profiles where id = uid), false)
$$;

-- 投稿デザイン
create table designs (
  id text primary key,
  creator uuid not null references profiles(id) on delete cascade,
  title text not null,
  tags text[] default '{}',
  description text default '',
  genre text default 'ホームページ',
  category text default 'その他',
  color_tone text default 'その他',
  price int default 0 check (price >= 0),
  features text[] default '{}',
  highlights text[] default '{}',
  long_desc text default '',
  image_urls text[] default '{}',
  sample_spec jsonb default null,
  thumb text default '',
  skill text not null,
  created_at timestamptz default now()
);
alter table designs enable row level security;
create policy "designs_select" on designs for select using (true);
create policy "designs_insert" on designs for insert with check (auth.uid() = creator);
create policy "designs_update" on designs for update using (auth.uid() = creator);
-- 削除は本人 または 管理者
create policy "designs_delete" on designs for delete
  using (auth.uid() = creator or is_admin(auth.uid()));

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
-- 不適切レビューの削除は管理者のみ
create policy "reviews_delete" on reviews for delete using (is_admin(auth.uid()));

-- ダウンロード数
create table design_stats (
  design_id text primary key,
  downloads int default 0
);
alter table design_stats enable row level security;
create policy "stats_select" on design_stats for select using (true);

-- DL数を安全に+1する関数
create or replace function bump_download(d_id text)
returns void
language sql
security definer
set search_path = public
as $$
  insert into design_stats (design_id, downloads) values (d_id, 1)
  on conflict (design_id) do update set downloads = design_stats.downloads + 1;
$$;

-- ===== 管理者の設定方法 =====
-- サイト上でアカウント登録した後、下の1行のメールアドレスを自分のものに変えて実行する:
-- update profiles set is_admin = true where id = (select id from auth.users where email = 'あなたのメールアドレス');
