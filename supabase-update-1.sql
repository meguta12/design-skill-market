-- ===== アップデート1: ジャンル・LP情報・使用例画像・アバター画像・管理者 =====
-- 「v1 の supabase-setup.sql をすでに実行済み」の場合だけ、これを SQL Editor で Run する
-- （まだ何も実行していない場合は supabase-setup.sql だけでOK）

-- 新しい列
alter table profiles add column if not exists avatar_url text default '';
alter table profiles add column if not exists is_admin boolean default false;
alter table designs add column if not exists genre text default 'ホームページ';
alter table designs add column if not exists highlights text[] default '{}';
alter table designs add column if not exists long_desc text default '';
alter table designs add column if not exists image_urls text[] default '{}';
alter table designs add column if not exists sample_spec jsonb default null;

-- is_admin 列は本人でも書き換え不可にする
revoke insert, update on table profiles from anon, authenticated;
grant insert (id, name, initial, avatar_color, avatar_url, bio, links) on profiles to authenticated;
-- update側にも id が必要（upsert の ON CONFLICT DO UPDATE が id 列も SET するため）
grant update (id, name, initial, avatar_color, avatar_url, bio, links) on profiles to authenticated;

-- 管理者判定関数
create or replace function is_admin(uid uuid)
returns boolean
language sql stable security definer
set search_path = public
as $$
  select coalesce((select is_admin from profiles where id = uid), false)
$$;

-- 削除ポリシーを「本人または管理者」に更新
drop policy if exists "designs_delete" on designs;
create policy "designs_delete" on designs for delete
  using (auth.uid() = creator or is_admin(auth.uid()));

-- 不適切レビューの削除は管理者のみ
drop policy if exists "reviews_delete" on reviews;
create policy "reviews_delete" on reviews for delete using (is_admin(auth.uid()));

-- ===== 管理者の設定方法 =====
-- サイト上でアカウント登録した後、下の1行のメールアドレスを自分のものに変えて実行する:
-- update profiles set is_admin = true where id = (select id from auth.users where email = 'あなたのメールアドレス');
