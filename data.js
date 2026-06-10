// ===== クリエイター（投稿者）=====
// links は空文字なら非表示になる
const CREATORS = [
  {
    id: "keita-official",
    name: "Keita（運営）",
    initial: "K",
    avatarColor: "#4f46e5",
    bio: "Design Skill Market の運営者。制作代行サービスも担当しています。「選べない・崩れる」をなくすのがミッション。",
    links: {
      homepage: "https://example.com",
      x: "",
      instagram: "https://instagram.com/",
      youtube: "",
    },
  },
  {
    id: "studio-hikari",
    name: "スタジオひかり",
    initial: "ひ",
    avatarColor: "#0e7490",
    bio: "京都の小さなデザイン事務所。和風・コーポレート系のデザインが得意です。実案件で使っている設計をスキル化して公開しています。",
    links: {
      homepage: "https://example.com",
      x: "https://x.com/",
      instagram: "",
      youtube: "",
    },
  },
  {
    id: "yuu-dev",
    name: "yuu_dev",
    initial: "Y",
    avatarColor: "#b45309",
    bio: "個人開発者。自分のプロダクトLPを作る過程で生まれたデザインを配布中。モダン系・ミニマル系が中心。",
    links: {
      homepage: "",
      x: "https://x.com/",
      instagram: "",
      youtube: "https://youtube.com/",
    },
  },
];

// ===== デザインカタログ =====
// thumb: CSS製サムネイルのHTML（画像不要でデザインの雰囲気を伝える）
// skill: ダウンロードされる .md スキルファイルの中身

const DESIGNS = [
  {
    id: "corporate-clean",
    creator: "studio-hikari",
    title: "コーポレート・クリーン",
    tags: ["企業サイト", "信頼感", "王道"],
    desc: "中小企業・士業向けの王道レイアウト。青×白の安心感ある配色で、会社案内・事業内容・採用・問い合わせまで一通り揃う構成。",
    features: [
      "ヘッダー固定＋メガメニューなしのシンプル導線",
      "実績・数字を見せる「数字で見る」セクション付き",
      "問い合わせCTAを3箇所に配置する黄金パターン",
      "スマホで崩れないグリッド設計ルール込み",
    ],
    downloads: 1284,
    seedReviews: [
      { name: "factory-web担当", stars: 5, date: "2026-05-12", text: "製造業の自社サイトに使用。Claudeに渡したら一発でそれっぽくなって驚きました。" },
      { name: "ばんない", stars: 4, date: "2026-05-28", text: "余白のルールが数値で書いてあるので、修正指示も出しやすいです。" },
    ],
    thumb: `<div class="thumb" style="background:#f4f7fb">
      <div style="display:flex;gap:8px;align-items:center"><div class="t-dot" style="background:#1d4ed8"></div><div class="t-bar" style="background:#cbd5e8;width:40%"></div></div>
      <div class="t-block" style="background:linear-gradient(135deg,#1d4ed8,#3b82f6);min-height:60px"></div>
      <div class="t-row"><div class="t-col" style="background:#dbe4f5"></div><div class="t-col" style="background:#dbe4f5"></div><div class="t-col" style="background:#dbe4f5"></div></div>
    </div>`,
    skill: `---
name: corporate-clean-homepage
description: 青×白の信頼感あるコーポレートサイト（企業ホームページ）を作るスキル。中小企業・士業・BtoB向け。ユーザーが「会社のホームページ」「コーポレートサイト」を依頼したときに使う。
---

# コーポレート・クリーン デザインスキル

このスキルは「Design Skill Market」で配布されているデザイン定義です。
以下のルールに **厳密に** 従ってHTML/CSSを生成してください。独自のアレンジは、ユーザーに頼まれない限り加えないこと。

## デザイントークン（必ずCSS変数として定義）

\`\`\`css
:root {
  --primary: #1d4ed8;      /* メインの青 */
  --primary-dark: #1e3a8a;
  --ink: #1f2733;          /* 本文色 */
  --ink-soft: #5a6577;
  --bg: #ffffff;
  --bg-alt: #f4f7fb;       /* セクション交互の背景 */
  --line: #dde3ec;
  --max-width: 1080px;
  --section-pad: 88px;     /* セクション上下余白 */
  --radius: 12px;
}
\`\`\`

- フォント: \`"Hiragino Sans", "Yu Gothic", system-ui, sans-serif\`
- 見出し: font-weight 700〜800。h2 は 28〜32px、本文は 15〜16px、行間 1.7〜1.8
- 色は上記トークン以外を使わない（アクセント追加は不可）

## ページ構成（この順番で）

1. **ヘッダー**: ロゴ左・ナビ右。\`position: sticky\` で固定。高さ 64〜72px。右端に「お問い合わせ」ボタン（--primary 背景）
2. **ヒーロー**: キャッチコピー（h1, 36〜44px）＋サブコピー＋CTAボタン。背景は --bg-alt か青の薄いグラデーション。高さは 60〜70vh を超えない
3. **事業内容**: 3カラムのカードグリッド。アイコン＋見出し＋説明文
4. **数字で見る○○**: 実績数値を3〜4個、大きな数字（48px, --primary）で横並び
5. **会社概要**: 2カラム（左:テーブル形式の会社情報 / 右:写真 or 地図プレースホルダ）
6. **お知らせ**: 日付＋タイトルのリスト3件
7. **CTAバンド**: 全幅・--primary 背景・白文字で「お気軽にご相談ください」＋ボタン
8. **フッター**: 3カラム（会社情報/サイトマップ/SNS）＋コピーライト

## レイアウトルール（崩れ防止）

- コンテンツ幅は必ず \`max-width: var(--max-width); margin-inline: auto; padding-inline: 24px\` のコンテナで統一する
- カードグリッドは \`display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px\`
- **860px以下**: グリッドは1カラム、ナビはハンバーガーまたは非表示、ヒーローh1は28px
- 画像は必ず \`max-width: 100%; height: auto\`。固定 width/height をpxで直接指定しない
- セクションの上下paddingは必ず \`var(--section-pad)\` を使い回す（個別指定で揃えようとしない）

## 崩れ防止チェックリスト（生成後に必ず確認）

- [ ] 375px幅で横スクロールが発生しないか
- [ ] すべてのセクションでコンテナ幅が揃っているか
- [ ] ボタンの高さ・角丸がページ内で統一されているか（高さ48px / 角丸 999px）
- [ ] h1→h2→h3 のサイズが逆転していないか
- [ ] CTAが「ヒーロー」「CTAバンド」「ヘッダー」の3箇所にあるか
`,
  },

  {
    id: "saas-modern",
    creator: "yuu-dev",
    title: "モダンSaaS・スタートアップLP",
    tags: ["LP", "SaaS", "グラデーション"],
    desc: "プロダクトを今っぽく見せたいスタートアップ向け。大胆なグラデーションと大きなタイポグラフィ、機能カード、料金表まで揃ったLP構成。",
    features: [
      "紫→青グラデーションのヒーローで一気に今っぽく",
      "機能紹介・料金プラン・FAQのLP黄金構成",
      "ダークセクションとの交互配置でメリハリ",
      "CTAボタンのマイクロインタラクション付き",
    ],
    downloads: 2041,
    seedReviews: [
      { name: "indie_dev_ken", stars: 5, date: "2026-04-30", text: "個人開発アプリのLPに。料金表のレイアウトが秀逸でそのまま使ってます。" },
      { name: "marina", stars: 5, date: "2026-05-15", text: "グラデーションの色指定が具体的で、ありがちな「ダサいグラデ」にならない。" },
      { name: "t.okada", stars: 4, date: "2026-06-01", text: "FAQのアコーディオンもスキル内に書いてあって助かりました。" },
    ],
    thumb: `<div class="thumb" style="background:#0f1024">
      <div style="display:flex;gap:8px;align-items:center"><div class="t-dot" style="background:linear-gradient(135deg,#8b5cf6,#3b82f6)"></div><div class="t-bar" style="background:#2a2c4a;width:35%"></div></div>
      <div class="t-block" style="background:linear-gradient(135deg,#8b5cf6,#3b82f6,#06b6d4);min-height:64px"></div>
      <div class="t-row"><div class="t-col" style="background:#1d1f3d"></div><div class="t-col" style="background:#1d1f3d"></div></div>
    </div>`,
    skill: `---
name: saas-modern-lp
description: 紫→青グラデーションのモダンなSaaS/スタートアップ向けLPを作るスキル。プロダクト紹介・料金表・FAQを含む1ページ構成。「サービスのLP」「アプリの紹介ページ」の依頼で使う。
---

# モダンSaaS LP デザインスキル

以下のルールに **厳密に** 従ってLPを生成すること。

## デザイントークン

\`\`\`css
:root {
  --grad: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 55%, #06b6d4 100%);
  --ink: #0f1024;           /* ダーク背景にも使う */
  --ink-soft: #555a77;
  --bg: #ffffff;
  --bg-dark: #0f1024;       /* ダークセクション */
  --surface-dark: #1d1f3d;
  --accent: #6d5cf6;
  --radius: 16px;
  --max-width: 1120px;
}
\`\`\`

- 見出しは大きく: h1 は clamp(36px, 6vw, 64px)、font-weight 800、letter-spacing -0.02em
- 英語の見出し・ラベルを効果的に混ぜる（例: "FEATURES", "PRICING"）

## ページ構成

1. **ヘッダー**: 透過背景＋blur。ロゴ／ナビ／「無料で始める」ボタン（グラデ背景）
2. **ヒーロー**: 中央寄せ。バッジ（"v2.0 リリース 🎉" 等）→ h1 → サブコピー → CTA2つ（グラデ＋ゴースト）→ プロダクトスクショ風のモック（角丸+影）
3. **ロゴバー**: 「導入企業」グレースケールのダミーロゴ5つ
4. **機能紹介**: 3×2 のカードグリッド。アイコンは絵文字でOK
5. **ダークセクション**: --bg-dark 背景で主要機能を1つ深掘り（左テキスト/右モック）
6. **料金プラン**: 3カラム。中央のプランを \`transform: scale(1.05)\` ＋グラデ枠で「人気」表示
7. **FAQ**: details/summary のアコーディオン5問
8. **最終CTA**: グラデ全幅バンド
9. **フッター**: ダーク背景4カラム

## レイアウトルール（崩れ防止）

- グラデ文字は \`background: var(--grad); -webkit-background-clip: text; color: transparent\` で。本文には使わない（見出しのみ）
- 料金カードの scale(1.05) は **900px以下で解除**（モバイルで重なるため）
- カードグリッドは 900px以下で1カラム
- ヒーローのモックは max-width: 880px、aspect-ratio で高さを確保し中身はプレースホルダでよい

## チェックリスト

- [ ] グラデーションの角度が全箇所 135deg で統一されているか
- [ ] 375px幅で料金カードが重なっていないか
- [ ] ダークセクションの文字色が #fff / rgba(255,255,255,.7) の2段階になっているか
- [ ] CTAボタンのhoverに transform: translateY(-2px) が入っているか
`,
  },

  {
    id: "wa-modern",
    creator: "studio-hikari",
    title: "和モダン（旅館・和食店）",
    tags: ["和風", "店舗", "高級感"],
    desc: "旅館・和食店・茶室など「和」の業種向け。生成り×藍色、縦書きアクセント、ゆったりした余白で高級感を演出するデザイン。",
    features: [
      "縦書き見出し（writing-mode）の正しい実装込み",
      "明朝体ベースのタイポグラフィ設計",
      "「間」を活かした余白ルール（通常の1.5倍）",
      "予約・アクセスへの動線を絞ったシンプル構成",
    ],
    downloads: 763,
    seedReviews: [
      { name: "京都の宿", stars: 5, date: "2026-05-20", text: "縦書きが崩れずに出たのは初めてです。明朝の指定も的確。" },
      { name: "wabisabi", stars: 4, date: "2026-06-03", text: "余白が広めなので情報量の多い店には不向きかも。雰囲気は最高。" },
    ],
    thumb: `<div class="thumb" style="background:#f5f1e8">
      <div style="display:flex;gap:8px;align-items:center"><div class="t-dot" style="background:#2c3e6b"></div><div class="t-bar" style="background:#d9d2c0;width:30%"></div></div>
      <div class="t-row">
        <div class="t-col" style="background:#2c3e6b;max-width:26%"></div>
        <div class="t-col" style="background:#e7e0d0"></div>
        <div class="t-col" style="background:#e7e0d0"></div>
      </div>
      <div class="t-bar" style="background:#c9b98a;width:55%"></div>
    </div>`,
    skill: `---
name: wa-modern-homepage
description: 旅館・和食店・和菓子店など和の業種向けの、生成り×藍色の和モダンなホームページを作るスキル。縦書きアクセントと明朝体、広い余白が特徴。「和風のサイト」「旅館のホームページ」の依頼で使う。
---

# 和モダン デザインスキル

以下のルールに **厳密に** 従うこと。和風デザインは少しの崩れで安っぽくなるため、特にチェックリストを重視する。

## デザイントークン

\`\`\`css
:root {
  --kinari: #f5f1e8;   /* 生成り（ベース背景） */
  --ai: #2c3e6b;       /* 藍色（メイン） */
  --sumi: #2b2a26;     /* 墨色（本文） */
  --karashi: #c9a84c;  /* 辛子色（アクセント、多用禁止） */
  --line: #ddd5c4;
  --max-width: 960px;  /* あえて狭め */
  --section-pad: 120px; /* 余白は通常の1.5倍 */
}
\`\`\`

- フォント: \`"Hiragino Mincho ProN", "Yu Mincho", serif\` を基本とする
- 行間はゆったり 2.0。letter-spacing 0.08em
- 英字は使うなら小さくローマ字併記（例: 御料理 RYORI）

## ページ構成

1. **ヘッダー**: ロゴ中央 or 左。ナビは「お品書き / お部屋 / ご予約 / アクセス」程度に絞る
2. **ヒーロー**: 全画面に近い写真プレースホルダ（背景 --ai の暗め）＋縦書きキャッチコピー
3. **ご挨拶**: 中央寄せ・短い文章のみ。余白をたっぷり取る
4. **お品書き/お部屋紹介**: 写真とテキストを左右交互に（2セクション以上）
5. **ご予約**: --ai 背景の帯。電話番号を大きく＋予約ボタン
6. **アクセス**: 住所・地図プレースホルダ
7. **フッター**: 最小限。中央寄せ

## 縦書きの実装（最重要・崩れやすいポイント）

\`\`\`css
.tategaki {
  writing-mode: vertical-rl;
  text-orientation: upright;
  letter-spacing: 0.3em;
  height: 12em;          /* 必ず高さを指定する。指定しないと崩れる */
}
\`\`\`

- 縦書きはヒーローと見出しアクセントのみ。本文には使わない
- **モバイル（640px以下）では縦書きを横書きに戻す**（writing-mode: horizontal-tb）

## レイアウトルール

- 角丸は使わない（border-radius: 0）。影も最小限（和風に丸と影は合わない）
- 罫線 1px の --line を区切りに使う。二重線・装飾枠は使わない
- --karashi（金色系）はボタンと小さなアクセントのみ。面で使うと安っぽくなる

## チェックリスト

- [ ] 縦書き要素に height が指定されているか
- [ ] モバイルで縦書きが解除されているか
- [ ] 明朝体がすべてのテキストに適用されているか（sans-serifが混ざっていないか）
- [ ] 余白が --section-pad で統一され、詰まって見えないか
- [ ] 色数が4色以内に収まっているか
`,
  },

  {
    id: "minimal-portfolio",
    creator: "yuu-dev",
    title: "ミニマル・ポートフォリオ",
    tags: ["ポートフォリオ", "モノクロ", "個人"],
    desc: "デザイナー・写真家・エンジニアの個人サイト向け。黒×白のモノクロ基調で、作品そのものを主役にするギャラリー構成。",
    features: [
      "作品グリッド（Masonry風）の安全な実装",
      "タイポグラフィだけで魅せるヒーロー",
      "ホバーで作品情報が出るオーバーレイ",
      "About / Works / Contact の3ページ分構成",
    ],
    downloads: 1547,
    seedReviews: [
      { name: "photo_yuki", stars: 5, date: "2026-05-08", text: "写真が主役になるレイアウト。余計な装飾がなくて良い。" },
      { name: "dezagaku", stars: 4, date: "2026-05-25", text: "就活用ポートフォリオに使いました。Masonryが崩れない書き方になってるのが偉い。" },
    ],
    thumb: `<div class="thumb" style="background:#ffffff">
      <div style="display:flex;gap:8px;align-items:center"><div class="t-dot" style="background:#111"></div><div class="t-bar" style="background:#e2e2e2;width:25%"></div></div>
      <div class="t-row">
        <div class="t-col" style="background:#111"></div>
        <div class="t-col" style="background:#d4d4d4"></div>
        <div class="t-col" style="background:#888"></div>
      </div>
      <div class="t-row" style="max-height:24px">
        <div class="t-col" style="background:#d4d4d4"></div>
        <div class="t-col" style="background:#111"></div>
        <div class="t-col" style="background:#e8e8e8"></div>
      </div>
    </div>`,
    skill: `---
name: minimal-portfolio
description: 黒×白モノクロのミニマルな個人ポートフォリオサイトを作るスキル。デザイナー・写真家・エンジニアの作品集向け。「ポートフォリオサイト」「作品集サイト」の依頼で使う。
---

# ミニマル・ポートフォリオ デザインスキル

「何も足さない」のがこのデザインの本質。装飾を追加したくなったら、それは間違い。

## デザイントークン

\`\`\`css
:root {
  --black: #111111;
  --white: #ffffff;
  --gray: #888888;
  --gray-light: #e8e8e8;
  --max-width: 1200px;
  --gap: 16px;
}
\`\`\`

- 色はこの4色 **のみ**。アクセントカラーを追加しない
- フォント: \`"Helvetica Neue", Helvetica, "Hiragino Sans", sans-serif\`
- 見出しは font-weight 700、本文 400。サイズの種類は4つまで（48 / 24 / 16 / 13px）

## ページ構成

1. **ヘッダー**: 名前（左・小さく）とナビ（右: Works / About / Contact）。線なし
2. **ヒーロー**: テキストのみ。名前と肩書きを大きなタイポで（例: 全幅で 8vw のサイズ）
3. **作品グリッド**: 下記の安全なMasonry実装を使う
4. **About**: 1カラム・最大幅 640px の文章＋プロフィール写真1枚
5. **Contact**: メールアドレスを大きく1行。SNSリンクを小さく
6. **フッター**: © のみ

## 作品グリッド（崩れやすい最重要ポイント）

JSのMasonryライブラリは使わず、CSS columns で実装する：

\`\`\`css
.works {
  columns: 3;
  column-gap: var(--gap);
}
.work-item {
  break-inside: avoid;       /* これがないと作品が分断されて崩れる */
  margin-bottom: var(--gap);
}
@media (max-width: 900px) { .works { columns: 2; } }
@media (max-width: 560px) { .works { columns: 1; } }
\`\`\`

- 作品画像のプレースホルダは aspect-ratio をバラけさせる（4/5, 1/1, 16/10 など）
- ホバー時: 黒の半透明オーバーレイ＋作品タイトル（白）をフェードイン

## チェックリスト

- [ ] 使用色が4色以内か（hoverの透明度違いはOK）
- [ ] break-inside: avoid が入っているか
- [ ] 余計な影・角丸・グラデーションが入っていないか（角丸は0、影なしが正）
- [ ] フォントサイズが4種類以内に収まっているか
`,
  },

  {
    id: "clinic-soft",
    creator: "keita-official",
    title: "クリニック・医療",
    tags: ["医療", "安心感", "やわらかい"],
    desc: "歯科・内科・整体院など向け。やわらかいグリーンと丸みのあるUIで「怖くない・清潔・誠実」を伝える。診療時間表と院内紹介を完備。",
    features: [
      "診療時間テーブルの崩れない実装",
      "院長挨拶・院内紹介・アクセスの安心3点セット",
      "Web予約ボタンを常時表示（追従）",
      "やさしい配色のアクセシビリティ確保（コントラスト基準クリア）",
    ],
    downloads: 892,
    seedReviews: [
      { name: "shika-in", stars: 5, date: "2026-04-22", text: "診療時間の表がスマホでもきれいに出ます。患者さんからも見やすいと好評。" },
      { name: "seitai-aoki", stars: 3, date: "2026-05-30", text: "良いけど緑が業種に合わなかったので青に変えてもらった。色変更の指示方法も書いてあると嬉しい。" },
    ],
    thumb: `<div class="thumb" style="background:#f2f9f4">
      <div style="display:flex;gap:8px;align-items:center"><div class="t-dot" style="background:#34a06b"></div><div class="t-bar" style="background:#cfe6d6;width:38%"></div></div>
      <div class="t-block" style="background:#a8d8bc;min-height:54px;border-radius:14px"></div>
      <div class="t-row"><div class="t-col" style="background:#dcefe2;border-radius:10px"></div><div class="t-col" style="background:#dcefe2;border-radius:10px"></div></div>
    </div>`,
    skill: `---
name: clinic-soft-homepage
description: 歯科・内科・整体院などのクリニック向けに、やわらかいグリーン基調で安心感のあるホームページを作るスキル。診療時間表・院内紹介・Web予約導線を含む。「クリニックのホームページ」「医院のサイト」の依頼で使う。
---

# クリニック・医療 デザインスキル

患者さん（高齢者含む）が見るサイト。**読みやすさ > おしゃれさ** を徹底する。

## デザイントークン

\`\`\`css
:root {
  --green: #34a06b;
  --green-dark: #21805a;   /* ボタンhover・文字に使う濃い緑 */
  --green-pale: #f2f9f4;
  --ink: #333d38;
  --ink-soft: #5f6b65;
  --line: #d8e6dc;
  --radius: 16px;          /* 全体に丸み */
  --max-width: 1040px;
}
\`\`\`

- フォント: \`"Hiragino Sans", "Yu Gothic", sans-serif\`。本文は **16px以上**（高齢者対応）
- 行間 1.9。文字の灰色を薄くしすぎない（--ink-soft より薄い文字を作らない）

## ページ構成

1. **ヘッダー**: ロゴ＋ナビ＋電話番号（大きく）＋「Web予約」ボタン
2. **ヒーロー**: やさしい写真プレースホルダ＋「地域のかかりつけ医」系コピー。診療時間・休診日をヒーロー直下にカードで即表示
3. **当院の特徴**: 3カラムカード（丸アイコン付き）
4. **診療案内**: 診療科目をリスト形式で
5. **診療時間テーブル**: 下記の崩れない実装
6. **院長挨拶**: 写真＋名前＋経歴（左右2カラム）
7. **院内紹介**: 写真グリッド 2×2
8. **アクセス**: 地図＋住所＋駐車場情報
9. **フッター**: 診療時間を再掲（重要情報は2回出す）

## 診療時間テーブル（崩れやすい最重要ポイント）

\`\`\`css
.hours-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
.hours-table th, .hours-table td {
  border: 1px solid var(--line);
  padding: 12px 4px;
  text-align: center;
  font-size: 14px;
}
/* スマホでは文字を縮めてでも表を維持する（横スクロールにしない） */
@media (max-width: 560px) {
  .hours-table th, .hours-table td { padding: 10px 2px; font-size: 12px; }
}
\`\`\`

- 列: 時間帯 / 月 / 火 / 水 / 木 / 金 / 土 / 日祝 の8列
- ○は --green、休診は「−」をグレーで

## アクセシビリティ（必須）

- ボタン・リンクの緑文字は --green-dark を使う（--green は白背景でコントラスト不足）
- Web予約ボタンはスマホで画面下部に固定表示（position: fixed; bottom: 0; 全幅）
- 電話番号は \`<a href="tel:...">\` にする

## チェックリスト

- [ ] 本文が16px以上あるか
- [ ] 診療時間テーブルが375px幅で横スクロールせず表示されるか
- [ ] スマホで予約ボタンが下部固定されているか
- [ ] 白背景上の緑文字が --green-dark になっているか
`,
  },

  {
    id: "cafe-warm",
    creator: "keita-official",
    title: "カフェ・レストラン",
    tags: ["飲食店", "あたたかい", "写真映え"],
    desc: "カフェ・ベーカリー・レストラン向け。クリーム×ブラウンの温かい配色で、メニューと店内写真を美味しそうに見せる構成。",
    features: [
      "メニュー表（写真なし・価格揃え）の美しい組み方",
      "Instagram風フォトグリッド",
      "営業時間・定休日が迷わず見つかる配置",
      "Googleマップ・インスタへの外部リンク動線",
    ],
    downloads: 1108,
    seedReviews: [
      { name: "komugi_bakery", stars: 5, date: "2026-05-18", text: "パン屋のサイトに。メニューの価格がドットリーダーで揃うのが上品で気に入ってます。" },
      { name: "cafe-mado", stars: 4, date: "2026-06-05", text: "雰囲気がとても良い。写真を入れ替えるだけで自分の店っぽくなりました。" },
    ],
    thumb: `<div class="thumb" style="background:#faf5ec">
      <div style="display:flex;gap:8px;align-items:center"><div class="t-dot" style="background:#8a5a36"></div><div class="t-bar" style="background:#e6d9c4;width:32%"></div></div>
      <div class="t-block" style="background:linear-gradient(135deg,#b98756,#8a5a36);min-height:56px;border-radius:10px"></div>
      <div class="t-row"><div class="t-col" style="background:#eee1cb;border-radius:8px"></div><div class="t-col" style="background:#e2cfae;border-radius:8px"></div><div class="t-col" style="background:#eee1cb;border-radius:8px"></div></div>
    </div>`,
    skill: `---
name: cafe-warm-homepage
description: カフェ・ベーカリー・レストラン向けに、クリーム×ブラウンの温かみあるホームページを作るスキル。メニュー表・フォトグリッド・営業時間を含む。「カフェのホームページ」「お店のサイト」の依頼で使う。
---

# カフェ・レストラン デザインスキル

「美味しそう」「行ってみたい」と思わせるのがゴール。情報の優先度は 営業時間・場所 > メニュー > こだわり。

## デザイントークン

\`\`\`css
:root {
  --cream: #faf5ec;
  --brown: #8a5a36;
  --brown-deep: #5d3a20;
  --caramel: #b98756;
  --ink: #3a2e24;
  --line: #e6dccb;
  --radius: 12px;
  --max-width: 1000px;
}
\`\`\`

- フォント: 見出し \`"Hiragino Mincho ProN", serif\` ／ 本文 \`"Hiragino Sans", sans-serif\` の組み合わせ
- 全体の背景は --cream。白(#fff)はカードにだけ使う

## ページ構成

1. **ヘッダー**: ロゴ＋ナビ（Menu / Photo / Access）＋インスタアイコン
2. **ヒーロー**: 店内写真プレースホルダ全幅＋店名ロゴ。営業時間と定休日をヒーロー内に小さく表示（最重要情報）
3. **コンセプト**: 短い文章＋写真1枚（左右2カラム）
4. **メニュー**: 下記のドットリーダー実装
5. **フォトグリッド**: 正方形 3×3 のInstagram風グリッド
6. **店舗情報**: 営業時間・定休日・住所・電話のテーブル＋地図
7. **フッター**: インスタ・Googleマップへのリンクボタン

## メニュー表（このデザインの見せ場）

価格をドットリーダーで右端に揃える：

\`\`\`css
.menu-item {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 14px;
}
.menu-item .name { flex-shrink: 0; }
.menu-item .dots {
  flex: 1;
  border-bottom: 1px dotted var(--brown);
  transform: translateY(-4px);
}
.menu-item .price { flex-shrink: 0; font-weight: 700; }
\`\`\`

- カテゴリ（Drink / Food / Dessert）ごとに明朝の見出し＋センター配置
- メニューは2カラム（700px以下で1カラム）

## 写真グリッド

\`\`\`css
.photo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.photo-grid > div { aspect-ratio: 1 / 1; }  /* 正方形を保証。これがないと崩れる */
\`\`\`

## チェックリスト

- [ ] 営業時間がヒーローと店舗情報の2箇所に出ているか
- [ ] メニューの価格が右端で揃っているか（ドットリーダーが効いているか）
- [ ] フォトグリッドが正方形を維持しているか
- [ ] 電話番号が tel: リンクになっているか
`,
  },
];
