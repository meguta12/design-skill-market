-- ===== アップデート2: 投稿画像をStorageに保存・レビューの重複投稿対策 =====
-- 「supabase-setup.sql と supabase-update-1.sql をすでに実行済み」の場合に、これを SQL Editor で Run する

-- ---------------------------------------------------------------
-- 1) 投稿画像をSupabase Storageに保存するためのバケットとポリシー
--    （これまでは画像をbase64にしてdesignsテーブルへ直接保存していたが、
--     今後の新規アップロードはStorageの公開バケットに保存し、designs.image_urlsには
--     公開URLだけを入れる。既存の投稿(古いbase64画像)はそのまま動くので触らない）
-- ---------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('design-images', 'design-images', true)
on conflict (id) do nothing;

drop policy if exists "design_images_public_read" on storage.objects;
create policy "design_images_public_read"
on storage.objects for select
using (bucket_id = 'design-images');

-- ログイン済みユーザーは「自分のユーザーID」フォルダの中にだけアップロードできる
drop policy if exists "design_images_auth_insert" on storage.objects;
create policy "design_images_auth_insert"
on storage.objects for insert
to authenticated
with check (bucket_id = 'design-images' and (storage.foldername(name))[1] = auth.uid()::text);

-- 自分がアップロードした画像は自分で削除できる
drop policy if exists "design_images_auth_delete" on storage.objects;
create policy "design_images_auth_delete"
on storage.objects for delete
to authenticated
using (bucket_id = 'design-images' and (storage.foldername(name))[1] = auth.uid()::text);

-- ---------------------------------------------------------------
-- 2) レビューの完全重複（連打・二重タブ送信）を防ぐ
--    ※ design_id への外部キー制約は付けない：運営が用意した最初からのサンプル
--      デザイン（例: corporate-clean 等）はdesignsテーブルに行が無く、
--      外部キーを付けるとサンプルデザインへのレビュー投稿が全て失敗してしまうため。
-- ---------------------------------------------------------------
create unique index if not exists reviews_no_exact_dup
  on reviews (design_id, name, body);
