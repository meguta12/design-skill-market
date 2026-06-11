# Googleログイン＆日本語メールの設定ガイド

サイト側のコードは実装済み。このガイドの設定が終わると「Google で続行」ボタンが動くようになる。
全部無料・所要15〜20分。

---

## パート1: Google Cloud でOAuthクライアントを作る

1. https://console.cloud.google.com を開き、Googleアカウントでログイン
2. 上部のプロジェクト選択 →「新しいプロジェクト」→ 名前 `design-skill-market` で作成
3. 左メニュー「APIとサービス」→「OAuth同意画面」
   - User Type: **外部** を選んで作成
   - アプリ名: `Design Skill Market`
   - ユーザーサポートメール / デベロッパー連絡先: 自分のGmail
   - それ以外は空欄のまま保存して進む（スコープ・テストユーザーもそのまま）
   - 最後に「アプリを公開」(本番環境へプッシュ) を押す
4. 「APIとサービス」→「認証情報」→「認証情報を作成」→「OAuthクライアントID」
   - アプリケーションの種類: **ウェブアプリケーション**
   - 名前: `design-skill-market-web`
   - **承認済みのリダイレクトURI** に以下を1行で追加:
     ```
     https://hzyqrrjxzwwqznqxejwl.supabase.co/auth/v1/callback
     ```
   - 作成すると **クライアントID** と **クライアントシークレット** が表示される → 両方コピーしておく

## パート2: Supabase にクライアントIDを登録

1. Supabase ダッシュボード → **Authentication** → **Sign In / Up**（または Providers）
2. プロバイダー一覧から **Google** を開く
3. **Enable** をオンにして、パート1でコピーした **Client ID** と **Client Secret** を貼り付けて保存

## パート3: リダイレクトURLの許可リスト（重要）

ログイン後にサイトへ戻るためのURLを登録する。

1. Supabase → **Authentication** → **URL Configuration**
2. **Site URL**: `https://meguta12.github.io/design-skill-market/`
3. **Redirect URLs** に以下を両方追加:
   ```
   https://meguta12.github.io/design-skill-market/
   http://localhost:4173/
   ```
   （localhostは開発確認用）

これで完了。サイトの「ログイン / 登録」→「Google で続行」が動くようになる。

---

## おまけ: 登録メールを日本語にする

Supabase → **Authentication** → **Email Templates** で各メールの件名・本文を編集できる。
「Confirm email」をオンに戻した場合に送られる確認メールの日本語例:

- **件名**: 【Design Skill Market】メールアドレスの確認
- **本文**:
  ```html
  <h2>Design Skill Market へようこそ！</h2>
  <p>以下のボタンをクリックして、メールアドレスの確認を完了してください。</p>
  <p><a href="{{ .ConfirmationURL }}">メールアドレスを確認する</a></p>
  <p>このメールに心当たりがない場合は、お手数ですが破棄してください。</p>
  ```

※ 無料プランの標準メールは送信数制限が厳しい（1時間あたり数通）。
本格運用時は Resend（無料枠 100通/日）を SMTP として接続するのがおすすめ。
独自ドメイン取得後（フェーズ2）にセットで設定するのが効率的。

## 購入時のメール・領収書について

フェーズ2で Stripe を導入すると、以下が **自動で** 日本語送信される（追加開発不要）:
- 購入完了メール＋領収書（Stripe管理画面 → Settings → Emails → 「Successful payments」をオン）
- 返金時の通知メール
