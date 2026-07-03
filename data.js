// ===== クリエイター（投稿者）=====
// links は空文字なら非表示になる
const CREATORS = [
  {
    id: "keita-official",
    name: "運営",
    initial: "運",
    avatarColor: "#4f46e5",
    bio: "Design Skill Market の運営アカウント。制作代行サービスも担当しています。「選べない・崩れる」をなくすのがミッション。掲載中のサンプルスキルはすべて運営が制作しています。",
    links: {
      homepage: "",
      x: "",
      instagram: "",
      youtube: "",
    },
  },
];

// ===== デザインカタログ =====
// thumb: CSS製サムネイルのHTML（画像不要でデザインの雰囲気を伝える）
// skill: ダウンロードされる .md スキルファイルの中身

const DESIGNS = [
  {
    id: "corporate-clean",
    creator: "keita-official",
    isSample: true,
    imageUrls: ["assets/samples/corporate-clean.jpg"],
    genre: "ホームページ",
    category: "コーポレート",
    colorTone: "ブルー系",
    price: 0,
    createdAt: "2026-03-10",
    sampleSpec: { c1: "#1d4ed8", c2: "#f4f7fb" },
    highlights: [
      "ホームページを初めて作る中小企業・士業の方",
      "奇抜さより「ちゃんとした会社に見える」ことを重視したい方",
      "問い合わせにつながる導線を最初から組み込みたい方",
    ],
    longDesc: "企業サイトの王道をそのまま設計図にしました。ヘッダー・ヒーロー・事業内容・実績・会社概要・お知らせ・問い合わせと、BtoBサイトに必要な要素が正しい順番で並びます。\n配色は信頼感の青×白の2色構成。余白やボタンサイズまで数値で固定してあるので、AIに渡しても「なんか違う」になりにくいのが特徴です。",
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

## ページ構成（完成サンプル画像と同じものを作る）

1. **ヘッダー**: ロゴ左・ナビ右・右端に「お問い合わせ」ボタン（--primary）。\`position: sticky\`、高さ64〜72px
2. **ヒーロー**: 左にキャッチコピー（h1, 36〜44px。例「テクノロジーで、ビジネスに信頼と成長を。」）＋説明文＋ボタン2つ／右にオフィス街の写真（青の半透明オーバーレイ）。高さは60〜70vhまで
3. **事業紹介**: 線アイコン付きカード4枚（例: システム開発/クラウド・インフラ/データ分析/UI・UXデザイン）。各カードに「詳しく見る→」
4. **私たちについて**: 左にオフィス写真2枚／右に強みリスト（チェックアイコン＋見出し＋短文 ×4）
5. **採用情報**: 写真＋テキストの横並びバンド
6. **CTAバンド**: 全幅・濃紺背景「まずはお気軽にご相談ください」＋白抜きボタン
7. **フッター**: 濃紺・4カラム（会社情報/サービス/会社案内/お問い合わせ）＋コピーライト

※実績を強調したい場合は「数字で見る」（大きな数値3〜4個、48px・--primary）やお知らせ一覧を3と4の間に追加してよい

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

## 画像の組み込み指示

- ヒーロー: オフィス外観 or 働く人の写真1枚（横長）。青の半透明オーバーレイを重ねて文字を読みやすく
- 会社概要: 社屋 or 代表者写真1枚（4:3）
- 事業内容カード: 写真ではなく単色アイコン（--primary）を使う
- AI画像生成のプロンプト例: 「明るいオフィスで働くビジネスパーソン、自然光、クリーンで信頼感のある雰囲気、写真風」
- 用意できない画像は --bg-alt のプレースホルダ＋altテキストで代替
`,
  },

  {
    id: "saas-modern",
    creator: "keita-official",
    isSample: true,
    imageUrls: ["assets/samples/saas-modern.jpg"],
    genre: "ホームページ",
    category: "LP・サービス",
    colorTone: "ダーク系",
    price: 0,
    createdAt: "2026-04-02",
    sampleSpec: { c1: "#8b5cf6", c2: "#0f1024", dark: true },
    highlights: [
      "個人開発アプリ・SaaSのLPを今っぽく見せたい方",
      "料金表・FAQまで含めた「売れるLP構成」が欲しい方",
      "ダサいグラデにならない色指定が欲しい方",
    ],
    longDesc: "スタートアップのLPでよく見る「紫→青グラデーション×大きいタイポ」を、崩れない形でルール化した有料スキルです。\nヒーロー・機能・料金・FAQ・CTAのLP黄金構成に加えて、料金カードの「人気プラン」演出やFAQアコーディオンの実装ルールまで含みます。",
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

## ページ構成（完成サンプル画像と同じものを作る）

ページ全体を --bg-dark 基調のダークで統一する（白背景のセクションは作らない）。

1. **ヘッダー**: 透過ダーク＋blur。ロゴ／ナビ／グラデの「無料で始める」ボタン
2. **ヒーロー**: 左に大見出し（例「データを、成長のエンジンに。」）＋サブコピー＋CTA2つ（グラデ＋ゴースト）／右にダッシュボード風モック（KPIカード＋折れ線グラフ、角丸+影）
3. **実績バー**: 数値3つ（導入社数・継続率など）を横並び
4. **機能紹介**: 紫グラデの丸アイコン付きカード 3×2
5. **連携セクション**: 「お気に入りのツールとシームレスに連携」＋ツールロゴのチップ横並び（Google Analytics / Slack / HubSpot / Stripe など）
6. **料金プラン**: 4カード横並び（無料〜エンタープライズ。例: ¥0 / ¥2,980 / ¥9,800 / 要相談）。推しプランを \`transform: scale(1.05)\`＋グラデ枠＋「人気」バッジで強調
7. **最終CTA**: グラデ全幅バンド（例「今すぐ、データドリブンな組織へと進化しませんか？」）＋ボタン2つ
8. **フッター**: ダーク4カラム

※FAQが必要な場合は料金プランの下に details/summary のアコーディオンで追加する

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
    creator: "keita-official",
    isSample: true,
    imageUrls: ["assets/samples/wa-modern.jpg"],
    genre: "ホームページ",
    category: "和風・旅館",
    colorTone: "ベージュ・和色系",
    price: 0,
    createdAt: "2026-03-28",
    sampleSpec: { c1: "#2c3e6b", c2: "#f5f1e8" },
    highlights: [
      "旅館・和食店・和菓子店など「和」の業種の方",
      "縦書きや明朝体をAIで崩さず再現したい方",
      "安っぽくない高級感を出したい方",
    ],
    longDesc: "和風デザインはAIが最も崩しやすいジャンルです。縦書きの正しい実装、明朝体の指定、余白の取り方を厳密にルール化しました。\n生成り×藍色×墨色の限定パレットで、「間」を活かしたゆったりした構成。モバイルでは縦書きを自動解除する指示まで含みます。",
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

## ページ構成（完成サンプル画像と同じものを作る）

屋号例「和心庵」。

1. **ヘッダー**: 円形の家紋風マーク＋屋号。ナビは「コンセプト/お部屋/お料理/ギャラリー/アクセス」程度に絞り、右端に紺の「ご予約・お問い合わせ」ボタン
2. **ヒーロー**: 縁側と庭の写真を全幅で。左上に縦書きで「静けさに、心ほどける。」系のキャッチコピー＋小さな説明文
3. **コンセプト**: 左に坪庭の写真／右に見出し（例「和の美意識を、今の心地よさへ。」）＋短い文章＋「詳しく見る→」。余白をたっぷり取る
4. **お部屋・お料理**: 写真カード2枚横並び（例: くつろぎの設え/旬を味わう会席）。各カードに短文＋リンク
5. **ギャラリー**: 横長写真4枚を1行で
6. **アクセス**: 左に住所・行き方のテキスト／右に地図
7. **ご予約バンド**: --ai 背景。電話番号を大きく＋Web予約ボタン
8. **フッター**: --ai 背景・最小限・中央寄せ

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
    creator: "keita-official",
    isSample: true,
    imageUrls: ["assets/samples/minimal-portfolio.jpg"],
    genre: "ホームページ",
    category: "ポートフォリオ",
    colorTone: "モノクロ系",
    price: 0,
    createdAt: "2026-05-01",
    sampleSpec: { c1: "#111111", c2: "#ffffff" },
    highlights: [
      "デザイナー・写真家・エンジニアの個人サイトを作りたい方",
      "作品を主役にして自分は控えめにしたい方",
      "就活・転職用ポートフォリオが急ぎで必要な方",
    ],
    longDesc: "黒×白×グレーの4色だけで構成するミニマルポートフォリオ。装飾を「足さない」ためのルールを明文化しているのが他にない特徴です。\n崩れやすい作品グリッド（Masonry風）は、ライブラリ不使用のCSSだけで安全に組む実装を指定しています。",
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

## ページ構成（完成サンプル画像と同じものを作る）

1. **ヘッダー**: 左にイニシャルロゴ（例: Y.）／右にナビ（作品 / プロフィール / お問い合わせ）。線なし
2. **ヒーロー**: 左に名前を特大タイポで＋肩書き1文（例「デザインと開発で、伝わる体験をつくる。」）＋ボタン2つ（黒/白）＋SNSアイコン行／右にモノクロの大きな写真
3. **作品グリッド**: 均等3カラムのグリッド。各作品はスクリーンショット＋下に小さくタイトル・種別。写真主体の作品集なら下記のCSS Masonryに置き換えてよい
4. **プロフィール**: 左に見出し＋文章／右にモノクロのポートレート写真
5. **スキル・ツール**: 4カラムのテキストリスト（デザイン/フロントエンド/バックエンド/その他）
6. **お問い合わせ**: メールアドレスを大きく1行＋SNSリンクを小さく
7. **フッター**: © のみ

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
    isSample: true,
    imageUrls: ["assets/samples/clinic-soft.jpg"],
    genre: "ホームページ",
    category: "医療・クリニック",
    colorTone: "グリーン系",
    price: 0,
    createdAt: "2026-04-18",
    sampleSpec: { c1: "#34a06b", c2: "#f2f9f4" },
    highlights: [
      "歯科・内科・整体院などのサイトを作りたい方",
      "高齢の患者さんにも読みやすいサイトにしたい方",
      "診療時間表がスマホで崩れて困ったことがある方",
    ],
    longDesc: "「怖くない・清潔・誠実」を伝えるやわらかいグリーンのクリニックサイト。本文16px以上・行間1.9など、高齢者にも読みやすい基準を最初から組み込んでいます。\n最大の難所である診療時間テーブルは、375pxでも横スクロールせずに収まる実装を指定。スマホでは予約ボタンが画面下に固定されます。",
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

## ページ構成（完成サンプル画像と同じものを作る）

院名例「みどりの森クリニック」。

1. **ヘッダー**: 葉のアイコン＋院名／ナビ／診療時間の小さな表記／緑の「WEB予約」ボタン
2. **ヒーロー**: 「地域の、やさしいかかりつけ医でありたい。」系コピー＋医師と患者のやさしい写真。診療時間・休診日のカードをヒーロー直下に重ねて即表示
3. **診療内容**: 丸アイコンのカード6枚（例: 一般内科/小児科/予防接種/健康診断/皮膚科/生活習慣病）＋下に緑の「お問い合わせ」ボタン
4. **医師のご紹介**: 白衣の写真＋名前＋経歴のカード3枚横並び（医師が1人なら左右2カラムの院長挨拶にする）
5. **診療時間と受付**: 下記の崩れない診療時間テーブル＋右に電話番号を大きく＋受付時間の注意書き
6. **クリニック案内**: 院内写真の横並び（受付/待合室/診察室/外観）
7. **アクセス**: 地図＋住所・最寄り駅＋駐車場情報
8. **フッター**: 診療時間を再掲（重要情報は2回出す）

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
    isSample: true,
    imageUrls: ["assets/samples/cafe-warm.jpg"],
    genre: "ホームページ",
    category: "店舗・飲食",
    colorTone: "ブラウン系",
    price: 0,
    createdAt: "2026-06-05",
    sampleSpec: { c1: "#8a5a36", c2: "#faf5ec" },
    highlights: [
      "カフェ・ベーカリー・レストランのサイトを作りたい方",
      "メニュー表を上品に見せたい方",
      "インスタからの集客につなげたい方",
    ],
    longDesc: "クリーム×ブラウンの温かい配色で「美味しそう」「行ってみたい」を作る飲食店サイト。営業時間と場所が迷わず見つかる情報設計を最優先にしています。\n見せ場はドットリーダーで価格が右端に揃うメニュー表と、Instagram風の正方形フォトグリッド。写真の差し替えだけで自分の店になります。",
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

## ページ構成（完成サンプル画像と同じものを作る）

店名例「Cafe & Restaurant HIKARI」。

1. **ヘッダー**: ロゴ＋ナビ（ホーム/メニュー/コンセプト/ギャラリー/店舗情報/ご予約・お問い合わせ）
2. **ヒーロー**: 店内写真を全幅・暗めに。「暮らしに、やさしいひとときを。」系コピー＋説明2行＋「メニューを見る」ボタン。**下端は波形（曲線SVG）でクリーム色につなぐ**
3. **おすすめメニュー**: 写真付きカード4枚（写真上/名前/説明1行/価格）。1枚目に赤の「人気No.1」リボン。下に「メニュー一覧へ」ボタン。品数の多い全メニューページでは下記のドットリーダー型を使う
4. **ギャラリー**: 正方形写真5枚を1行＋「もっと見る」ボタン
5. **コンセプト・ストーリー／店舗情報**: 左右2分割の濃ブラウンパネル。左は写真＋文章／右は住所・営業時間・定休日・アクセスのリスト＋外観写真
6. **ご予約・お問い合わせ**: クリーム背景の中央寄せ。「Webで予約する」ブラウンボタン＋「電話で問い合わせる」白ボタン（tel:リンク）
7. **フッター**: 濃ブラウン・ロゴ＋ナビ再掲＋SNSアイコン

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

- [ ] 営業時間・定休日が店舗情報パネルに明記されているか
- [ ] メニューの価格が右端で揃っているか（ドットリーダーが効いているか）
- [ ] フォトグリッドが正方形を維持しているか
- [ ] 電話番号が tel: リンクになっているか

## 画像の組み込み指示

- ヒーロー: 店内全景の写真を1枚（横長 16:9）。プレースホルダには「店内写真」と記載
- コンセプト: 看板メニューの寄り写真1枚（正方形）
- フォトグリッド: 正方形写真9枚（料理6・店内2・外観1 の配分を推奨）
- AI画像生成を使う場合のプロンプト例: 「暖色の自然光が入る木目調のカフェ店内、奥行きのある構図、写真風」
- 画像が用意できない箇所は \`background: var(--caramel)\` のプレースホルダにし、alt属性に内容を書いておく
`,
  },

  // ===== スライド資料 =====
  {
    id: "slide-consul",
    creator: "keita-official",
    isSample: true,
    imageUrls: ["assets/samples/slide-consul.jpg"],
    genre: "スライド資料",
    category: "コーポレート",
    colorTone: "ブルー系",
    price: 0,
    createdAt: "2026-06-08",
    sampleSpec: { c1: "#1f3a68", c2: "#f3f6fa" },
    title: "コンサル型・提案スライド",
    tags: ["提案資料", "ビジネス", "ロジカル"],
    desc: "外資コンサル風の提案資料テンプレート。1スライド1メッセージ、キーメッセージ行、整然としたチャートで「通る資料」を作る設計図。",
    features: [
      "全スライド共通のマスターレイアウト定義",
      "キーメッセージ（So what?）を最上部に置く型",
      "棒・円・比較表チャートの配色と使い分けルール",
      "文字あふれ・図形ズレを防ぐ余白とグリッド",
    ],
    downloads: 412,
    seedReviews: [
      { name: "戦略部・齋藤", stars: 5, date: "2026-06-09", text: "社内提案がこの型にするだけで締まりました。キーメッセージ行のルールが秀逸。" },
    ],
    highlights: [
      "社内提案・営業提案の資料をよく作るビジネスパーソン",
      "「スライドがダサい」と言われたことがある方",
      "AIにスライドを作らせると文字があふれて崩れる方",
    ],
    longDesc: "外資コンサルの資料に共通する「1スライド1メッセージ」「上部にSo what?を書く」「チャートは主張を支えるためだけに置く」という型を、AIに渡せるルールに落としました。\nHTMLスライドでもPowerPoint生成でも使えるよう、レイアウトはすべて比率（%）で定義しています。",
    thumb: `<div class="thumb" style="background:#e8edf5;align-items:center;justify-content:center">
      <div style="background:#fff;width:88%;aspect-ratio:16/9;border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,.12);padding:9px 12px;display:flex;flex-direction:column;gap:6px">
        <div class="t-bar" style="background:#1f3a68;width:70%;height:7px"></div>
        <div class="t-bar" style="background:#d7dfeb;width:45%;height:5px"></div>
        <div style="display:flex;gap:6px;flex:1;align-items:flex-end;padding-top:4px">
          <div style="background:#9fb4d4;width:16%;height:40%"></div>
          <div style="background:#5d7cab;width:16%;height:62%"></div>
          <div style="background:#1f3a68;width:16%;height:88%"></div>
          <div style="flex:1"></div>
          <div style="display:flex;flex-direction:column;gap:4px;width:38%">
            <div class="t-bar" style="background:#d7dfeb;height:5px"></div>
            <div class="t-bar" style="background:#d7dfeb;height:5px;width:80%"></div>
            <div class="t-bar" style="background:#d7dfeb;height:5px;width:90%"></div>
          </div>
        </div>
      </div>
    </div>`,
    skill: `---
name: consul-slide-deck
description: 外資コンサル風の提案スライド（16:9）を作るスキル。1スライド1メッセージ、キーメッセージ行、ロジカルなチャート構成。提案資料・営業資料・社内稟議の依頼で使う。Claude/Codex/Antigravityなど任意のAIコーディングツールで利用可。
---

# コンサル型・提案スライド スキル

HTMLスライド（16:9・1枚=1セクション）または PowerPoint 生成コードを出力する。
どちらの場合も以下のルールに厳密に従うこと。

## デザイントークン

\`\`\`css
:root {
  --navy: #1f3a68;      /* メイン */
  --navy-light: #5d7cab;
  --gray-chart: #9fb4d4; /* チャート3色目 */
  --ink: #2a2e35;
  --bg: #ffffff;
  --bg-alt: #f3f6fa;
  --accent-warn: #c0392b; /* 強調は赤1色のみ・1スライド1箇所まで */
}
\`\`\`

- フォント: 游ゴシック / Noto Sans JP。本文 18pt 相当以上、行間1.5
- 文字色は --ink。薄グレー文字を本文に使わない

## マスターレイアウト（全スライド共通）

- 上から: ①キーメッセージ行（高さ18%）→ ②ボディ（70%）→ ③フッター（ページ番号・出所、12%）
- キーメッセージ行: そのスライドの結論を**1文**で書く。体言止め禁止。「〜である」「〜すべき」まで言い切る
- 余白: スライド外周に5%のマージン。ボディ内の要素間は3%以上

## スライド構成（完成サンプル画像と同じものを作る）

1. 表紙: 左60%は白地に小見出し＋大タイトル＋リード文＋社名・提案日／右40%は都市風景写真を斜めの帯でトリミングし、写真上に濃紺の「本提案のキーメッセージ」ボックス（白文字で結論1文）を重ねる
2. 目次: 番号付きリスト5〜7項目
3. 現状分析と課題: 白カード3枚（観点ごとに箇条書き3点）＋下部に結論バー
4. 市場環境と機会: 左に棒グラフ（CAGRラベル付き）／右に主要トレンド3点のリスト
5. 提案するアプローチ: 中央の円＋四隅にラベルと説明（4つの柱）
6. 実行ロードマップ: Phase 1〜3 の矢羽（シェブロン）＋各フェーズの期間・施策の箇条書き＋下部に結論バー
7. まとめ: 結論3点の再掲＋ネクストアクション

※効果試算が必要な場合は5と6の間に棒グラフのスライドを追加する

## チャートのルール

- 色は navy → navy-light → gray-chart の順で使う。4色目が必要な構成にしない
- 棒グラフは太さ均一・並び順は値の降順（時系列を除く）
- 円グラフは5分割まで。それ以上は「その他」に集約
- 凡例よりも直接ラベル（棒の上に数値）を優先

## 画像・アイコンの組み込み指示

- 写真は表紙の右帯のみ可。本文スライドでは使わない
- アイコンを使う場合は単色（--navy）の線画アイコンのみ。絵文字は禁止
- 概念図は四角と矢印だけで構成する。立体・影・グラデーション禁止

## 崩れ防止チェックリスト

- [ ] 全スライドでキーメッセージ行の位置・サイズが揃っているか
- [ ] 1スライドの文字量が7行以内か（超えるならスライドを分割）
- [ ] チャートの色が3色以内か
- [ ] フォントサイズが3種類以内か（タイトル/本文/注釈）
- [ ] 文字が枠からあふれていないか（長文は自動縮小ではなく文章を削る）
`,
  },
  {
    id: "slide-pop-edu",
    creator: "keita-official",
    isSample: true,
    imageUrls: ["assets/samples/slide-pop-edu.jpg"],
    genre: "スライド資料",
    category: "教育・学習",
    colorTone: "カラフル",
    price: 0,
    createdAt: "2026-05-26",
    sampleSpec: { c1: "#f0883c", c2: "#fdf6ec" },
    title: "ポップ教育スライド",
    tags: ["授業", "セミナー", "親しみやすい"],
    desc: "授業・セミナー・YouTube解説向けのポップで見やすいスライド。大きな文字と丸いカードで、遠くからでも内容が伝わる設計。",
    features: [
      "最後列からも読める最小28pt基準",
      "丸カード＋手書き風アンダーラインの親しみ演出",
      "クイズ・まとめ・休憩などの定型スライド付き",
      "色数を抑えて子どもっぽくなりすぎないバランス",
    ],
    downloads: 268,
    seedReviews: [
      { name: "塾講師タカハシ", stars: 5, date: "2026-06-01", text: "オンライン授業用に。生徒から「見やすくなった」と言われました。" },
      { name: "セミナー講師M", stars: 4, date: "2026-06-07", text: "そのままYouTubeのスライド解説にも使えています。" },
    ],
    highlights: [
      "塾講師・学校の先生・セミナー講師の方",
      "YouTubeの解説動画用スライドを量産したい方",
      "「ポップだけど安っぽくない」を狙いたい方",
    ],
    longDesc: "教育系スライドの失敗は「文字が小さい」「色が多すぎる」の2つ。このスキルは最小28ptと3色ルールで、後ろの席からでも読めてうるさくない画面を作ります。\nクイズ・まとめ・休憩スライドの定型も含むので、毎回の授業準備が早くなります。",
    thumb: `<div class="thumb" style="background:#fdf6ec;align-items:center;justify-content:center">
      <div style="background:#fff;width:88%;aspect-ratio:16/9;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,.1);padding:9px 12px;display:flex;flex-direction:column;gap:7px">
        <div class="t-bar" style="background:#f0883c;width:55%;height:9px;border-radius:5px"></div>
        <div style="display:flex;gap:7px;flex:1;padding-top:3px">
          <div style="flex:1;background:#fbe3c8;border-radius:9px"></div>
          <div style="flex:1;background:#cfe7da;border-radius:9px"></div>
          <div style="flex:1;background:#fbd9d3;border-radius:9px"></div>
        </div>
      </div>
    </div>`,
    skill: `---
name: pop-education-slide
description: 授業・セミナー・YouTube解説向けのポップで読みやすいスライド（16:9）を作るスキル。大きな文字・丸カード・3色ルール。教育系スライドの依頼で使う。Claude/Codex/Antigravityなど任意のAIツールで利用可。
---

# ポップ教育スライド スキル

## デザイントークン

\`\`\`css
:root {
  --orange: #f0883c;   /* メイン */
  --green: #4a9e78;    /* サブ */
  --pink: #e8746a;     /* 強調（1スライド1回まで） */
  --cream: #fdf6ec;    /* 背景 */
  --ink: #3f3a33;
  --card: #ffffff;
}
\`\`\`

- フォント: Noto Sans JP / 游ゴシック の太め（Bold基本）
- 最小フォントサイズ **28pt相当**。注釈でも24ptを下回らない
- 角丸は大きめ（16〜24px）。影はごく薄く

## スライド構成（完成サンプル画像と同じものを作る）

背景の四隅にパステルの有機形（ブロブ）と手書き風の点・バツ印を散らすのがこのデザインの特徴（各スライド2〜3個まで）。

1. 表紙: ピンクの吹き出しバッジ（例「ゼロからわかる！」）＋特大タイトル＋サブ（例「〜今日から実践できる5つのステップ〜」）＋角丸アイコンカード3枚＋下端に緑の講師バー（似顔絵アイコン＋講師名）
2. 今日のポイント: 番号丸付きのパステル円カード3枚＋各2行の説明
3. ステップ一覧: 番号付き丸アイコンの横一列タイムライン（点線でつなぐ）
4. 本文スライド: 「見出し＋イラスト＋チェックリスト3点＋下部の例文/ポイントバー」を基本形にする。表が必要な回はパステルの表（ヘッダー行は緑）で
5. ふり返り: チェックリスト＋人物イラスト＋黄色の補足バー
6. まとめ: ステップのアイコン再掲＋締めの一言を緑リボンで
7. （任意）クイズ: 問題→次のスライドで答え。背景色を変えて場面転換する／休憩スライド: 大きく「ちょっと休憩」＋再開時刻

## レイアウトルール（崩れ防止）

- 1スライドの情報は「見出し1＋カード3」まで。4つ目が必要ならスライドを分ける
- カードの幅は均等（flexで等分）。高さは最も長いカードに揃える
- 手書き風の波線アンダーラインは見出しのキーワード1箇所のみ
- 文字の縁取り・ドロップシャドウは使わない（読みにくくなる）

## 画像・アイコンの組み込み指示

- 各カードに絵文字を1つずつ（📚🧠✏など）。サイズは文字の1.5倍
- イラストを入れる場合は「フラットイラスト・線なし・3色以内」で統一
- AI画像生成のプロンプト例: 「フラットデザインのイラスト、オレンジとグリーンの2色、白背景、シンプル、教育」
- 写真は原則使わない（ポップさが消える）

## チェックリスト

- [ ] すべての文字が28pt以上か
- [ ] 使用色が3色＋背景色に収まっているか
- [ ] 1スライドにカードが3つ以内か
- [ ] クイズの問題と答えが別スライドになっているか
`,
  },

  // ===== アプリUI =====
  {
    id: "app-clean-mobile",
    creator: "keita-official",
    isSample: true,
    imageUrls: ["assets/samples/app-clean-mobile.jpg"],
    genre: "アプリUI",
    category: "アプリ・ツール",
    colorTone: "ブルー系",
    price: 0,
    createdAt: "2026-05-20",
    sampleSpec: { c1: "#2f6df6", c2: "#f5f7fb", phone: true },
    title: "クリーン・モバイルUI",
    tags: ["スマホアプリ", "iOS風", "ツール系"],
    desc: "iOS風のクリーンなモバイルアプリUI。ホーム・一覧・詳細・設定の4画面分のコンポーネントとレイアウトルールが揃った設計図。",
    features: [
      "44pxタップ領域・セーフエリアなどモバイルの基本を網羅",
      "カード・リスト・タブバー・ボタンのコンポーネント定義",
      "ライト/ダーク両対応のカラートークン",
      "空状態（データなし画面）のデザインまで指定",
    ],
    downloads: 689,
    seedReviews: [
      { name: "flutter勢", stars: 5, date: "2026-05-24", text: "プロトタイプ作りが爆速になった。タップ領域の指定があるのが実務的。" },
      { name: "uiux見習い", stars: 4, date: "2026-06-02", text: "FigmaなしでここまでできるならもうこれでOKかも。" },
    ],
    highlights: [
      "個人開発でアプリのモックを素早く作りたい方",
      "WebアプリのスマホUIを整えたい方",
      "デザイナーなしでそれっぽいUIにしたいチーム",
    ],
    longDesc: "「ボタンが小さくて押せない」「画面ごとに見た目がバラバラ」というアプリUIの典型的な失敗を、コンポーネント定義で防ぎます。\nホーム・一覧・詳細・設定の4画面のレイアウトが揃っているので、これだけで小さなアプリのUI一式が完成します。HTMLモック・React・Flutterいずれの出力にも使えます。",
    thumb: `<div class="thumb" style="background:#f5f7fb;align-items:center;justify-content:center">
      <div style="background:#fff;width:36%;aspect-ratio:9/16;border-radius:12px;box-shadow:0 3px 10px rgba(0,0,0,.15);padding:7px;display:flex;flex-direction:column;gap:5px;max-height:92%">
        <div class="t-bar" style="background:#dfe6f2;width:50%;height:5px;border-radius:3px"></div>
        <div style="background:linear-gradient(135deg,#2f6df6,#6f9bff);border-radius:8px;height:26%"></div>
        <div style="background:#eef2f9;border-radius:7px;flex:1"></div>
        <div style="background:#eef2f9;border-radius:7px;flex:1"></div>
        <div style="display:flex;gap:4px;height:9%">
          <div style="flex:1;background:#2f6df6;border-radius:5px"></div>
          <div style="flex:1;background:#dfe6f2;border-radius:5px"></div>
          <div style="flex:1;background:#dfe6f2;border-radius:5px"></div>
        </div>
      </div>
    </div>`,
    skill: `---
name: clean-mobile-app-ui
description: iOS風のクリーンなモバイルアプリUI（ホーム・一覧・詳細・設定）を作るスキル。HTMLモック/React/Flutterに対応。アプリのUI・モックアップ・プロトタイプの依頼で使う。Claude/Codex/Antigravityなど任意のAIツールで利用可。
---

# クリーン・モバイルUI スキル

スマホ幅（375〜430px）前提のアプリUIを生成する。HTMLモックの場合は1画面=1ファイル、
フレームワーク指定があればそのコンポーネント形式で出力する。

## デザイントークン

\`\`\`css
:root {
  --primary: #2f6df6;
  --primary-soft: #e8efff;
  --ink: #16181d;
  --ink-2: #6b7280;     /* セカンダリ文字。これより薄い文字を作らない */
  --bg: #f5f7fb;        /* 画面背景 */
  --card: #ffffff;
  --line: #e5e9f0;
  --danger: #e5484d;
  --radius-card: 16px;
  --radius-btn: 12px;
}
/* ダークモード */
[data-theme="dark"] {
  --ink: #f2f3f5; --ink-2: #9aa1ac;
  --bg: #101216; --card: #1a1d23; --line: #2a2e36;
}
\`\`\`

- フォント: system-ui（San Francisco / Roboto に自動で乗る）
- 本文15px、見出し17〜22px、ラージタイトル28px bold

## 4画面の構成（完成サンプル画像と同じものを作る・タスク管理アプリを例に）

1. **ホーム**: 挨拶（例「おはようございます👋」）＋ベルアイコン → --primary の進捗カード（今週のタスク 12/18件・プログレスバー・完了率）→ クイックアクセス4つ（タスク/プロジェクト/カレンダー/レポート）→ 今日の予定（時刻＋色付き縦線のタイムライン）→ 最近のプロジェクト（進捗バー付きカード）
2. **一覧**: 検索・フィルタアイコン → セグメント（すべて/進行中/完了/保留）→ 日付グループ見出し（例「今日・5月20日（月）」）→ タスク行（丸チェックボックス＋名前＋優先度チップ 高=赤/中=黄/低=グレー＋プロジェクト名＋時刻）→ 右下に --primary の＋FAB
3. **詳細**: 戻る矢印＋優先度バッジ → タイトル＋プロジェクト名＋説明文 → 期限/担当者/タグのメタ行（アイコン付き）→ チェックリスト（済みはチェック＋取り消し線）＋「＋項目を追加」→ 添付ファイルカード（PDF等）→ 下部固定の主ボタン（例「タスクを完了にする」）
4. **設定**: プロフィール行（アバター＋名前＋メール）→ グループ化リスト: アカウント／通知設定（トグル）／表示設定（ダークモード・言語・文字サイズ）／サポート。セクション間に24px
- 全画面下部に5タブのタブバー（中央が --primary の丸い＋ボタン）

## コンポーネントルール

- タップ可能要素は最小 **44×44px**
- 主ボタン: 高さ50px・--primary・白文字・角丸12px。1画面に1つだけ
- カード: --card 背景、影は \`0 1px 3px rgba(0,0,0,.06)\` まで
- タブバー: 下部固定・5タブまで・アイコン＋10pxラベル。セーフエリア（env(safe-area-inset-bottom)）を確保
- 空状態: アイコン＋一言＋アクションボタンの3点セットを中央配置

## 画像・アイコンの組み込み指示

- アイコンは絵文字 or 単色SVG（線幅1.5px統一）。混在させない
- ユーザーアバターは円形40px、画像がない場合はイニシャル＋背景色
- サムネイル画像は角丸12px・aspect-ratio 16/10 固定
- AI画像生成のプロンプト例: 「アプリ用のシンプルな抽象グラデーション背景、青系、ノイズなし」

## チェックリスト

- [ ] タップ領域がすべて44px以上あるか
- [ ] 文字色が2段階（--ink / --ink-2）に収まっているか
- [ ] 主ボタンが1画面に1つだけか
- [ ] 下部固定要素がセーフエリアを考慮しているか
- [ ] ダークモードで線とカードの区別がつくか
`,
  },
  {
    id: "app-dashboard-dark",
    creator: "keita-official",
    isSample: true,
    imageUrls: ["assets/samples/app-dashboard-dark.jpg"],
    genre: "アプリUI",
    category: "アプリ・ツール",
    colorTone: "ダーク系",
    price: 0,
    createdAt: "2026-06-02",
    sampleSpec: { c1: "#22d3a7", c2: "#0e1117", dark: true },
    title: "ダーク・ダッシュボードUI",
    tags: ["管理画面", "SaaS", "データ可視化"],
    desc: "SaaSの管理画面・分析ダッシュボード向けのダークUI。サイドバー・KPIカード・チャート・データテーブルの完全な設計図。",
    features: [
      "12カラムグリッドによる崩れないレイアウト",
      "KPIカード・折れ線・棒・テーブルの配色システム",
      "ステータス色（成功/警告/エラー）の体系化",
      "1920px〜1280pxまでのレスポンシブ規則",
    ],
    downloads: 357,
    seedReviews: [
      { name: "受託エンジニアK", stars: 5, date: "2026-06-06", text: "クライアントの管理画面に。チャート配色が揃っているだけで一気にプロっぽくなる。" },
    ],
    highlights: [
      "SaaSの管理画面・社内ツールを作っている方",
      "ダッシュボードが「Excelみたい」と言われた方",
      "データ可視化の配色に自信がない方",
    ],
    longDesc: "ダッシュボードの完成度は配色システムで決まります。このスキルはチャート用5色とステータス3色を最初から定義し、どのグラフを置いても画面が揃うようにしました。\nサイドバー幅・カード余白・テーブル行高まで数値指定済み。Grafana風の本格的な画面が一発で出ます。",
    thumb: `<div class="thumb" style="background:#0e1117;padding:12px 14px">
      <div style="display:flex;gap:7px;height:100%">
        <div style="width:18%;background:#161b24;border-radius:6px"></div>
        <div style="flex:1;display:flex;flex-direction:column;gap:6px">
          <div style="display:flex;gap:6px;height:30%">
            <div style="flex:1;background:#161b24;border-radius:6px;border-bottom:2px solid #22d3a7"></div>
            <div style="flex:1;background:#161b24;border-radius:6px;border-bottom:2px solid #5b8def"></div>
            <div style="flex:1;background:#161b24;border-radius:6px;border-bottom:2px solid #e8b34b"></div>
          </div>
          <div style="flex:1;background:#161b24;border-radius:6px;display:flex;align-items:flex-end;gap:5px;padding:8px">
            <div style="flex:1;height:30%;background:#22d3a7;opacity:.85;border-radius:2px"></div>
            <div style="flex:1;height:55%;background:#22d3a7;opacity:.85;border-radius:2px"></div>
            <div style="flex:1;height:40%;background:#22d3a7;opacity:.85;border-radius:2px"></div>
            <div style="flex:1;height:75%;background:#22d3a7;opacity:.85;border-radius:2px"></div>
            <div style="flex:1;height:60%;background:#22d3a7;opacity:.85;border-radius:2px"></div>
          </div>
        </div>
      </div>
    </div>`,
    skill: `---
name: dark-dashboard-ui
description: SaaS管理画面・分析ダッシュボード向けのダークUIを作るスキル。サイドバー・KPIカード・チャート・テーブルの設計とデータ可視化の配色システム込み。管理画面/ダッシュボードの依頼で使う。Claude/Codex/Antigravityなど任意のAIツールで利用可。
---

# ダーク・ダッシュボードUI スキル

## デザイントークン

\`\`\`css
:root {
  --bg: #0e1117;
  --surface: #161b24;     /* カード・サイドバー */
  --surface-2: #1f2530;   /* ホバー・入力欄 */
  --line: #2a3140;
  --ink: #e6e9ef;
  --ink-2: #8b93a3;
  /* チャート専用5色（この順で使う） */
  --c1: #22d3a7; --c2: #5b8def; --c3: #e8b34b; --c4: #c678dd; --c5: #56b6c2;
  /* ステータス */
  --ok: #22d3a7; --warn: #e8b34b; --error: #ef5b6a;
  --radius: 10px;
}
\`\`\`

- フォント: Inter / system-ui。数値は \`font-variant-numeric: tabular-nums\` で桁を揃える
- 純黒(#000)・純白(#fff)は使わない

## レイアウト（完成サンプル画像と同じものを作る）

- **左サイドバー固定 240px**: ロゴ → メニュー（ダッシュボード/分析/ユーザー管理/プロジェクト/サブスクリプション/請求管理/レポート/アラート/設定）→ 下部に「現在のプラン」カード（プラン名＋契約期間＋使用量バー）→ ログアウト。1280px以下で64pxのアイコンのみに収縮
- **右レール 280px**: フィルター（期間/プロジェクト/プランのセレクト＋適用ボタン）→ リアルタイム状況（●ライブ: オンラインユーザー/アクティブセッション/本日の新規登録/システム正常性）→ クイックアクション（→付きリスト4件）。1440px以下では非表示にしてよい
- **メイン領域**: 12カラムグリッド、ガター16px、外周24px
- 行構成: ①ページタイトル＋説明1行（右上に検索・通知・テーマ切替・アバター）→ ②KPIカード4枚（丸アイコン＋大きな数値＋「↑12.5% 前月比」＋ミニ棒グラフ。下辺にチャート色のアクセントボーダー2px）→ ③折れ線「推移」（8カラム・ホバーでツールチップ・期間セレクト付き）＋ドーナツ「内訳」（4カラム・中央に合計値・凡例は%付き）→ ④最近のアクティビティのテーブル（12カラム・アバター＋名前＋メール/アクション/日時/ステータスバッジ＋「すべて見る→」）

## コンポーネントルール

- KPIカード: ラベル(12px --ink-2) → 数値(28px bold) → 前期比（▲▼＋ステータス色）。下辺にチャート色のアクセントボーダー2px
- 折れ線チャート: 線2px・塗りは同色10%透過・グリッド線は --line の点線
- テーブル: 行高48px・偶数行の背景差なし・ホバーで --surface-2・数値列は右揃え
- ステータスバッジ: ステータス色の15%透過背景＋同色文字

## 画像・アイコンの組み込み指示

- アイコンは線画SVG（線幅1.5px）で統一。サイドバーは20px、ボタン内は16px
- 写真・イラストは使わない。空状態のみ単色の簡易イラスト可
- ロゴはサイドバー上部に高さ28pxで配置（白抜き版を使用）

## チェックリスト

- [ ] チャートの色が --c1〜--c5 の順で使われているか
- [ ] 数値が tabular-nums で揃っているか
- [ ] 1280px幅でサイドバーが収縮し、KPIカードが2×2になるか
- [ ] ステータス色がチャート色と混用されていないか
`,
  },

  // ===== 広告ポスター =====
  {
    id: "poster-cinema-red",
    creator: "keita-official",
    isSample: true,
    imageUrls: ["assets/samples/poster-cinema-red.jpg"],
    genre: "広告ポスター",
    category: "イベント・告知",
    colorTone: "ダーク系",
    price: 0,
    createdAt: "2026-07-01",
    sampleSpec: { c1: "#c1121f", c2: "#0d0b0e", dark: true },
    highlights: [
      "映画・アニメ・舞台など「作品もの」の告知ポスターを作りたい方",
      "黒×深紅の重厚なドラマ性で、一目で世界観を伝えたい方",
      "縦書きの巨大コピーで日本語ポスターらしい迫力を出したい方",
    ],
    longDesc: "劇場アニメの告知ポスターに代表される、黒×深紅の重厚スタイルを設計図にしました。画面を斜めに分断する赤のブロック、縦書き明朝の巨大キャッチコピー、白抜きで詰め込まれた作品情報——「静かなのに叫んでいる」ような緊張感を、レイヤー構成と数値ルールで再現します。\nビジュアル部分はプレースホルダー（グラデーション＋シルエット）で組むので、実写・イラストどちらの差し替えにも対応できます。",
    title: "シネマティック・レッド",
    tags: ["劇場版風", "縦書き", "重厚"],
    desc: "黒×深紅の劇場アニメ告知風ポスター。斜めに走る赤ブロック、縦書き明朝の巨大コピー、白抜き情報組みで「作品の顔」を作る設計図。",
    features: [
      "画面を斜めに分断する赤ブロックのレイヤー構成",
      "縦書き明朝キャッチコピーのサイズ・字間ルール",
      "白抜き小組み（スタッフ・日付・クレジット）の詰め方",
      "ビジュアルはプレースホルダー設計で差し替え自由",
    ],
    downloads: 214,
    seedReviews: [
      { name: "自主制作アニメ勢", stars: 5, date: "2026-07-01", text: "文化祭の上映会ポスターに使用。縦書きコピーの字間指定が効いていて、素人が作ったように見えません。" },
    ],
    thumb: `<div class="thumb" style="background:#0d0b0e">
      <div style="position:absolute;top:-20%;right:8%;width:38%;height:150%;background:linear-gradient(#c1121f,#7a0c14);transform:rotate(14deg)"></div>
      <div style="position:absolute;top:14px;left:18px;width:14px;height:70%;background:#f5f0e6;border-radius:2px"></div>
      <div style="position:absolute;top:14px;left:40px;width:8px;height:46%;background:#f5f0e644;border-radius:2px"></div>
      <div style="position:absolute;bottom:12px;left:18px;right:18px;display:flex;gap:6px"><div class="t-bar" style="background:#f5f0e666;width:30%"></div><div class="t-bar" style="background:#c1121f;width:20%"></div></div>
    </div>`,
    skill: `---
name: poster-cinema-red
description: 黒×深紅の劇場アニメ告知風ポスター（B判縦）をHTML/CSSで作るスキル。縦書き明朝の巨大コピー・斜めの赤ブロック・白抜き情報組みが特徴。「映画風のポスター」「アニメの告知ポスター」「重厚なイベントポスター」の依頼で使う。
---

# シネマティック・レッド デザインスキル

このスキルは「Design Skill Market」で配布されているデザイン定義です。
以下のルールに **厳密に** 従って、HTML/CSSでポスター1枚を生成してください。独自のアレンジは、ユーザーに頼まれない限り加えないこと。

## 出力形式（必ず守る）

- \`<div class="poster">\` 1枚に全要素を入れる。サイズは **幅728px × 高さ1030px 固定**（B判縦 ≒ 1:1.414）
- ポスター内は position:absolute のレイヤー構成で組む（通常のフローで組まない）
- フォントは Google Fonts の **"Shippori Mincho"（明朝）** と **"Noto Sans JP"** を読み込む
- 実在の作品名・人物写真・ロゴは使わない。ビジュアルはグラデーション＋シルエット等のプレースホルダーにして、差し替え位置をコメントで示す
- 画像として使いたい場合の書き出し方（ブラウザのスクリーンショット等）を最後に一言添える

## デザイントークン

\`\`\`css
:root {
  --red: #c1121f;        /* 深紅 */
  --red-dark: #7a0c14;
  --black: #0d0b0e;      /* 墨黒 */
  --paper: #f5f0e6;      /* 生成りの白（文字色） */
  --paper-faint: rgba(245, 240, 230, .55);
}
\`\`\`

## レイヤー構成（下から順に。この順番で重ねる）

1. **背景**: --black 全面。上から --red の放射グラデ（中心は右上・透過15%）をうっすら
2. **赤ブロック**: 画面を斜め（12〜16度）に分断する --red → --red-dark のグラデ帯。幅はポスターの35〜45%
3. **メインビジュアル**: 赤ブロックに重なる位置に配置。プレースホルダーはシルエット（黒〜赤のグラデ）で描き、差し替えコメントを付ける
4. **縦書き巨大コピー**: 後述のタイポルールで最前面に
5. **情報エリア**: 最下部に白抜きの小組み

## タイポグラフィ（このポスターの生命線）

- キャッチコピー: **縦書き**（writing-mode: vertical-rl）・Shippori Mincho・**64〜88px**・font-weight 700・letter-spacing 0.18em・色は --paper。左端 or 右端に配置し、高さの60〜75%を使う
- サブコピー: 縦書き・28px・--paper-faint。メインコピーに寄り添わせる（間隔20px）
- 日付・タイトルロゴ的要素: 横書き・Noto Sans JP・900。日付数字だけ --red にして効かせる
- 文字にはすべて text-shadow: 0 0 24px rgba(0,0,0,.6) を敷いて背景から浮かせる

## 情報エリア（差し替え項目）

最下部 高さ12%に横書きで詰める。すべて --paper-faint・10〜11px・letter-spacing 0.06em:
- 作品/イベント名（正式表記）／日時・場所／主催・制作／クレジット行（スタッフ名の羅列風）
- クレジット行は「役職:名前　役職:名前」を中黒や全角スペースで繋ぎ、2〜3行に

## 禁止事項

- 実在の作品・キャラクター・俳優の名前や似姿を入れない（プレースホルダーは「作品名」「EVENT TITLE」等に）
- 赤・黒・生成り以外の色を追加しない（金 #b8973d のみ1箇所までアクセント可）

## チェックリスト（生成後に必ず確認）

- [ ] 728×1030px固定で、はみ出し・スクロールが発生していないか
- [ ] キャッチコピーが縦書きで、64px以上の迫力があるか
- [ ] 色数が 赤・黒・生成り（＋金1箇所まで）に収まっているか
- [ ] 情報エリアのクレジット行が「それっぽく」詰まっているか
- [ ] 実在の作品名・人物を使っていないか
`,
  },
  {
    id: "poster-aquarelle-fes",
    creator: "keita-official",
    isSample: true,
    imageUrls: ["assets/samples/poster-aquarelle-fes.jpg"],
    genre: "広告ポスター",
    category: "イベント・告知",
    colorTone: "カラフル",
    price: 0,
    createdAt: "2026-07-01",
    sampleSpec: { c1: "#e85a9b", c2: "#ffffff" },
    highlights: [
      "学園祭・文化祭・音楽祭など、若さと勢いを見せたいイベントの方",
      "白地に水彩の色彩が爆ぜる、明るく前向きなポスターにしたい方",
      "タイトルは縦書きで、情報は整理して読みやすくしたい方",
    ],
    longDesc: "学園祭ポスターの王道、「白地×水彩スプラッシュ」を設計図にしました。中央のモチーフから色彩が飛び散るようなにじみ表現をCSSグラデーションの重ねで擬似再現し、左端の縦書き太タイトルと右下の整理された情報ブロックで「勢い」と「読みやすさ」を両立します。\nテーマカラーを差し替えれば、音楽祭・体育祭・地域イベントにも流用できます。",
    title: "水彩スプラッシュ・フェス",
    tags: ["学園祭", "水彩", "青春"],
    desc: "白地に色彩が爆ぜる学園祭風ポスター。水彩にじみのCSS表現、縦書き太タイトル、右下の情報ブロック整理で「若い勢い」を作る設計図。",
    features: [
      "水彩のにじみ・飛沫をCSSグラデ多重で擬似再現",
      "縦書き極太タイトル＋英字サブタイトルの組み方",
      "企画一覧・日時・地図を右下に整理するブロック設計",
      "テーマカラー3色を差し替えるだけで別イベントに転用可",
    ],
    downloads: 187,
    seedReviews: [
      { name: "文化祭実行委員", stars: 5, date: "2026-07-01", text: "高校の文化祭ポスターに。水彩の飛び散り方までCSSで指定されてるのがすごい。印刷しても映えました。" },
    ],
    thumb: `<div class="thumb" style="background:#ffffff">
      <div style="position:absolute;top:8%;left:34%;width:52%;height:70%;background:radial-gradient(closest-side,#e85a9b66,transparent 70%),radial-gradient(closest-side at 70% 30%,#4cc3d966,transparent 60%),radial-gradient(closest-side at 30% 70%,#f6c34566,transparent 60%)"></div>
      <div style="position:absolute;top:12px;left:16px;width:16px;height:72%;background:#2a2d3a;border-radius:2px"></div>
      <div style="position:absolute;bottom:12px;right:16px;width:38%;display:flex;flex-direction:column;gap:5px"><div class="t-bar" style="background:#e85a9b;width:60%"></div><div class="t-bar" style="background:#d8dce6;width:100%"></div><div class="t-bar" style="background:#d8dce6;width:80%"></div></div>
    </div>`,
    skill: `---
name: poster-aquarelle-fes
description: 白地×水彩スプラッシュの学園祭・文化祭風ポスター（B判縦）をHTML/CSSで作るスキル。色彩のにじみ・縦書き太タイトル・整理された情報ブロックが特徴。「学園祭のポスター」「文化祭」「明るいイベントポスター」の依頼で使う。
---

# 水彩スプラッシュ・フェス デザインスキル

このスキルは「Design Skill Market」で配布されているデザイン定義です。
以下のルールに **厳密に** 従って、HTML/CSSでポスター1枚を生成してください。独自のアレンジは、ユーザーに頼まれない限り加えないこと。

## 出力形式（必ず守る）

- \`<div class="poster">\` 1枚、**幅728px × 高さ1030px 固定**。内部は position:absolute レイヤー構成
- フォントは Google Fonts の **"Zen Kaku Gothic New"（900含む）** と **"Kaisei Decol"** を読み込む
- 人物イラスト・写真は使わず、水彩表現＋図形のみで構成。イラストを入れたい場合の差し替え位置はコメントで示す

## デザイントークン

\`\`\`css
:root {
  --pink: #e85a9b;
  --cyan: #4cc3d9;
  --yellow: #f6c345;
  --violet: #9b7ede;
  --ink: #2a2d3a;      /* タイトル・本文のほぼ黒 */
  --bg: #ffffff;       /* 紙の白。ベージュにしない */
}
\`\`\`

## 水彩スプラッシュの作り方（このデザインの核）

中央やや右に「色彩の爆発」を置く。CSSのみで作る:

1. **にじみ層**: radial-gradient を4〜6個重ねた大きめの div（各色30〜45%透過・closest-side・中心をずらす）
2. **飛沫層**: 6〜14pxの小さな円を12〜20個、爆発の外周に散らす（透過60〜85%・大小混ぜる）
3. **線の飛び**: 細長い楕円（transform: rotate）を3〜5本、放射方向に
- すべて blur は使わず透過の重なりだけで「にじみ」を出す（印刷で濁らないため）

## レイアウト

- **左端**: 縦書きタイトル（writing-mode: vertical-rl・Zen Kaku Gothic New 900・72〜92px・--ink）。1〜2文字目だけ --pink にして遊ぶ
- **タイトル右**: 英字サブタイトル（Kaisei Decol・18px・letter-spacing 0.3em・縦書き併走）
- **中央〜右**: 水彩スプラッシュ（上記）
- **右下**: 情報ブロック（後述）
- **最上部**: 回数・主催の小さな帯（例「第26回」を円形バッジで）

## 情報ブロック（差し替え項目）

右下 幅42%に白カード（border: 2px solid --ink・角丸12px・影なし）:
- 開催日時（日付は32px・--pink で最大強調）／会場・アクセス／企画一覧（■付き箇条書き・12px）／注意事項（10px・グレー）
- 見出しには --cyan の下線マーカー（高さ8px・透過50%を文字に重ねる）

## チェックリスト（生成後に必ず確認）

- [ ] 728×1030px固定で崩れがないか
- [ ] 水彩が blur なし・透過の重なりだけで表現されているか
- [ ] 縦書きタイトルが72px以上で、色差しが1〜2文字に留まっているか
- [ ] 情報ブロックだけ見ればイベント概要が全部わかるか
- [ ] 白地の余白が全体の3割以上残っているか（詰め込みすぎ防止）
`,
  },
  {
    id: "poster-impact-sports",
    creator: "keita-official",
    isSample: true,
    imageUrls: ["assets/samples/poster-impact-sports.jpg"],
    genre: "広告ポスター",
    category: "イベント・告知",
    colorTone: "モノクロ系",
    price: 0,
    createdAt: "2026-07-01",
    sampleSpec: { c1: "#d90429", c2: "#141414", dark: true },
    highlights: [
      "格闘技・スポーツ大会・ライブなど「強さ」を打ち出すイベントの方",
      "モノクロ写真×赤ロゴの引き算で、極限の緊張感を出したい方",
      "選手・演者の写真を主役に、文字は最小限で構成したい方",
    ],
    longDesc: "格闘技イベントのポスターに代表される「モノクロ×赤」スタイルの設計図です。粒子の粗いモノクロ写真（プレースホルダー設計）を全面に敷き、対角に巨大な縦書き白文字、中央下に赤の英字ロゴ帯——構図は引き算、質感は足し算という組み立てを数値で定義しています。\n写真を差し替えるだけで、ボクシング・バスケ・ダンスバトル・ライブ告知など「対決・熱量系」の告知に幅広く使えます。",
    title: "モノクロ・インパクト",
    tags: ["スポーツ", "格闘技風", "白黒×赤"],
    desc: "粒子の粗いモノクロ写真×赤ロゴ帯のスポーツイベント風ポスター。対角の巨大縦書き文字と引き算の構図で「強さ」を作る設計図。",
    features: [
      "モノクロ粒子テクスチャのCSS再現（グレイン・ビネット）",
      "対角に配置する巨大縦書き文字のルール",
      "赤ロゴ帯＋日時・会場の白抜き1行の情報設計",
      "写真プレースホルダー差し替えで他競技にも転用可",
    ],
    downloads: 156,
    seedReviews: [
      { name: "キック興行スタッフ", stars: 4, date: "2026-07-01", text: "アマ大会の告知に使いました。ビネットとグレインの数値指定のおかげで、写真がプロっぽく締まります。" },
    ],
    thumb: `<div class="thumb" style="background:linear-gradient(160deg,#3a3a3a,#141414)">
      <div style="position:absolute;top:10px;left:14px;width:13px;height:58%;background:#f2f2f2;border-radius:2px"></div>
      <div style="position:absolute;top:10px;right:14px;width:13px;height:58%;background:#f2f2f2cc;border-radius:2px"></div>
      <div style="position:absolute;bottom:26px;left:20%;right:20%;height:16px;background:#d90429;border-radius:2px"></div>
      <div style="position:absolute;bottom:12px;left:30%;right:30%;height:6px;background:#f2f2f266;border-radius:3px"></div>
    </div>`,
    skill: `---
name: poster-impact-sports
description: モノクロ写真×赤アクセントの格闘技・スポーツイベント風ポスター（B判縦）をHTML/CSSで作るスキル。粒子テクスチャ・巨大縦書き文字・赤ロゴ帯が特徴。「格闘技のポスター」「大会告知」「かっこいいスポーツポスター」の依頼で使う。
---

# モノクロ・インパクト デザインスキル

このスキルは「Design Skill Market」で配布されているデザイン定義です。
以下のルールに **厳密に** 従って、HTML/CSSでポスター1枚を生成してください。独自のアレンジは、ユーザーに頼まれない限り加えないこと。

## 出力形式（必ず守る）

- \`<div class="poster">\` 1枚、**幅728px × 高さ1030px 固定**。position:absolute レイヤー構成
- フォントは Google Fonts の **"Shippori Mincho B1"（800）** と **"Oswald"（英字）** を読み込む
- 実在の選手・団体名は使わない。写真はプレースホルダー（後述）で組み、差し替え位置をコメントで示す

## デザイントークン

\`\`\`css
:root {
  --red: #d90429;
  --white: #f2f2f2;
  --black: #141414;
  --gray: #8a8a8a;
}
\`\`\`

## 背景＝メインビジュアル（プレースホルダー設計）

1. **写真層**: 中央に人物シルエット（radial-gradient で明部を作り、シルエット形を重ねる）。「ここに選手のモノクロ写真。filter: grayscale(1) contrast(1.25) を適用」というコメントを必ず入れる
2. **グレイン層**: 極小 radial-gradient の多重パターンで粒子感を全面に（透過8〜12%）
3. **ビネット層**: 四辺から --black への radial-gradient（外周40%を暗く）
4. **煙・飛沫**: 白の radial-gradient（透過10%前後）を人物の足元・背面に2〜3個

## タイポグラフィ

- **巨大縦書き文字（主役級）**: 左上と右上の対角に2語（2文字の漢字語を推奨）。Shippori Mincho B1・**110〜150px**・--white・writing-mode: vertical-rl。片方は透過85%にして主従を付ける
- **大会ロゴ帯**: 中央下に --red のロゴ風英字（Oswald・700・letter-spacing 0.12em・42〜56px）。上下に細い白罫線（1px）を添える
- **日時・会場**: ロゴ帯の直下に白1行（Oswald・16px・「2.12 MON ／ 16:00 OPEN 17:00 START ／ 会場名」形式）
- 文字総数は極限まで絞る。**キャッチコピーは入れない**（文字で説明しない）

## 構図ルール

- 人物（プレースホルダー）は下から60%の高さで中央〜やや左
- 縦書き文字は人物の「後ろ」に重ねる（z-indexで人物が手前）
- 余白は作らない。四隅まで暗部で埋め、ビネットで視線を中央へ

## チェックリスト（生成後に必ず確認）

- [ ] 728×1030px固定で崩れがないか
- [ ] 色が 白・黒・グレー＋赤1色 に収まっているか
- [ ] 縦書き文字が110px以上で、人物の背面に回っているか
- [ ] グレイン・ビネットの質感が効いているか（のっぺりしていないか）
- [ ] 実在の選手名・団体名を使っていないか
`,
  },
  {
    id: "poster-editorial-film",
    creator: "keita-official",
    isSample: true,
    imageUrls: ["assets/samples/poster-editorial-film.jpg"],
    genre: "広告ポスター",
    category: "イベント・告知",
    colorTone: "ダーク系",
    price: 0,
    createdAt: "2026-07-01",
    sampleSpec: { c1: "#e8c547", c2: "#1c1a17", dark: true },
    highlights: [
      "映画祭・展示会・トークイベントなど、品と格を見せたい主催者の方",
      "写真1枚＋大きな欧文タイポだけで成立する洗練を求める方",
      "スポンサーロゴ帯まで含めた「公式ポスター」の型が欲しい方",
    ],
    longDesc: "国際映画祭のポスターに代表される、エディトリアル（雑誌的）スタイルの設計図です。全面に敷いた1枚写真の上に、セリフ体の超大型英字タイトルを堂々と重ね、下部に会期・会場とスポンサー帯を細かく組む——「大きい文字と小さい文字しかない」構成が、そのまま格になります。\n写真はプレースホルダー設計。ファッション・アート・音楽イベントにもそのまま転用できます。",
    title: "エディトリアル・フィルム",
    tags: ["映画祭風", "タイポグラフィ", "上品"],
    desc: "全面写真×超大型セリフ英字の映画祭風ポスター。大小の文字コントラストとスポンサー帯で「公式の風格」を作る設計図。",
    features: [
      "セリフ体英字タイトルの改行・重なりルール",
      "写真の上に文字を効かせる減光・配色設計",
      "会期表記（10.30 Sat—11.8 Mon 形式）の組み方",
      "最下部スポンサーロゴ帯のグリッド設計",
    ],
    downloads: 132,
    seedReviews: [
      { name: "ミニシアター運営", stars: 5, date: "2026-07-01", text: "特集上映の告知に。文字サイズの対比ルールが明確で、誰が作っても様になると思います。" },
    ],
    thumb: `<div class="thumb" style="background:linear-gradient(150deg,#2e2a24,#1c1a17)">
      <div style="position:absolute;top:16%;left:16px;right:16px;display:flex;flex-direction:column;gap:8px">
        <div class="t-bar" style="background:#e8c547;width:82%;height:20px"></div>
        <div class="t-bar" style="background:#e8c547;width:58%;height:20px"></div>
        <div class="t-bar" style="background:#e8c54788;width:34%;height:9px"></div>
      </div>
      <div style="position:absolute;bottom:12px;left:16px;right:16px;display:flex;gap:5px">${Array(6).fill('<div style="flex:1;height:8px;background:#f0ead855;border-radius:2px"></div>').join("")}</div>
    </div>`,
    skill: `---
name: poster-editorial-film
description: 全面写真×超大型セリフ英字の映画祭・展示会風ポスター（B判縦）をHTML/CSSで作るスキル。品のあるタイポグラフィとスポンサー帯が特徴。「映画祭のポスター」「展示会の告知」「上品なイベントポスター」の依頼で使う。
---

# エディトリアル・フィルム デザインスキル

このスキルは「Design Skill Market」で配布されているデザイン定義です。
以下のルールに **厳密に** 従って、HTML/CSSでポスター1枚を生成してください。独自のアレンジは、ユーザーに頼まれない限り加えないこと。

## 出力形式（必ず守る）

- \`<div class="poster">\` 1枚、**幅728px × 高さ1030px 固定**。position:absolute レイヤー構成
- フォントは Google Fonts の **"Playfair Display"（700/900）** と **"Noto Sans JP"（300/500）** を読み込む
- 写真はプレースホルダー（深い茶〜黒のグラデ＋人物シルエット）で組み、「ここにキービジュアル写真（暗め・被写体は右寄せ）」というコメントを付ける

## デザイントークン

\`\`\`css
:root {
  --gold: #e8c547;       /* タイトルの黄金色 */
  --cream: #f0ead8;      /* 小さい文字の生成り */
  --dark: #1c1a17;       /* 背景の焦げ茶黒 */
  --scrim: rgba(20, 17, 12, .45);  /* 写真の減光 */
}
\`\`\`

## レイヤー構成

1. **写真層**: 全面（inset:0）。プレースホルダーは 150deg の暗いグラデ＋右寄せの人物シルエット
2. **減光層**: 上40%と下25%に --scrim のグラデを敷き、文字の座る場所を暗くする
3. **タイトル**: 上部に超大型英字（後述）
4. **情報**: 中下部に会期・会場、最下部にスポンサー帯

## タイポグラフィ（大小のコントラストがすべて）

- **英字タイトル**: Playfair Display 900・--gold・**96〜130px**・line-height 0.92・2〜3行で改行（単語ごとに改行。例 TOKYO / FILM / 2026）。写真に**重ねる**ことを恐れない
- **開催年・回数**: タイトルに続けて 24px・--gold・イタリック（例 34th International Film Festival）
- **会期**: 「10.30 Sat—11.8 Mon」形式。数字は Playfair 700・36px・--cream。曜日は小さく（18px）
- **会場・説明**: Noto Sans JP 300・13px・--cream・letter-spacing 0.12em。**2行まで**
- タイトル以外の文字量を意図的に少なくし、「大きい／小さい」の2段しか作らない

## スポンサー帯（公式ポスターの記号）

最下部 高さ7%に横一列:
- 5〜8個のダミーロゴ（--cream 55%透過の角丸長方形・高さ14px・幅は40〜80pxでばらつかせる）を等間隔で
- 帯の上に「主催・協賛」の 9pxラベル

## チェックリスト（生成後に必ず確認）

- [ ] 728×1030px固定で崩れがないか
- [ ] 英字タイトルが96px以上・行間0.92で「壁」になっているか
- [ ] 文字サイズが実質2段階（超大＋小）に収まっているか
- [ ] 減光層のおかげで文字がどこでも読めるか
- [ ] スポンサー帯が等間隔・同じ高さで整列しているか
`,
  },
  {
    id: "poster-retro-pop",
    creator: "keita-official",
    isSample: true,
    imageUrls: ["assets/samples/poster-retro-pop.jpg"],
    genre: "広告ポスター",
    category: "イベント・告知",
    colorTone: "カラフル",
    price: 0,
    createdAt: "2026-07-01",
    sampleSpec: { c1: "#e63946", c2: "#ffd60a" },
    highlights: [
      "ドラマ・バラエティ・商店街イベントなど「賑やかで懐かしい」告知の方",
      "昭和レトロ・大衆演劇風のコラージュで目を引きたい方",
      "情報量が多くても破綻しない「詰め込みの作法」が欲しい方",
    ],
    longDesc: "昭和の映画看板やレトロ歌謡のジャケットのような、高彩度×コラージュ×装飾枠の「ジャパニーズ・レトロポップ」を設計図にしました。空色・黄・赤の派手な配色に、後光・虹・雲などの縁起物モチーフをCSSで描き、極太の縦書きタイトルをドンと据える——うるさいのに整っている、その境界線を数値ルールで定義します。\n出演者一覧や日時など情報が多い告知ほど映えるスタイルです。",
    title: "レトロポップ・コラージュ",
    tags: ["昭和レトロ", "コラージュ", "賑やか"],
    desc: "空色×黄×赤の昭和レトロ風コラージュポスター。後光・虹・装飾枠のCSSモチーフと極太縦書きタイトルで「懐かしい賑やかさ」を作る設計図。",
    features: [
      "後光（放射ストライプ）・虹・雲のCSS描画レシピ",
      "極太縦書きタイトル＋座布団（袋文字）の作り方",
      "出演者一覧を右端に縦組みで流し込むルール",
      "うるさくならない彩度・面積配分の数値指定",
    ],
    downloads: 173,
    seedReviews: [
      { name: "商店街青年部", stars: 5, date: "2026-07-01", text: "夏祭りのポスターがまさかの昭和風に。後光ストライプの作り方だけでも元が取れました。" },
    ],
    thumb: `<div class="thumb" style="background:repeating-conic-gradient(#4cc9f0 0 9deg,#eaf6ff 9deg 18deg)">
      <div style="position:absolute;top:8px;left:12px;right:12px;height:14px;background:#ffd60a;border:2px solid #e63946;border-radius:3px"></div>
      <div style="position:absolute;top:30%;left:38%;width:24%;height:52%;background:#e63946;border-radius:4px 4px 0 0"></div>
      <div style="position:absolute;top:38%;left:14px;width:15px;height:48%;background:#1d3557;border-radius:2px"></div>
      <div style="position:absolute;top:38%;right:14px;width:11px;height:42%;background:#1d3557aa;border-radius:2px"></div>
    </div>`,
    skill: `---
name: poster-retro-pop
description: 空色×黄×赤の昭和レトロ・コラージュ風ポスターをHTML/CSSで作るスキル。後光ストライプ・虹・装飾枠・極太縦書きタイトルが特徴。「レトロなポスター」「昭和風」「賑やかなイベント告知」の依頼で使う。
---

# レトロポップ・コラージュ デザインスキル

このスキルは「Design Skill Market」で配布されているデザイン定義です。
以下のルールに **厳密に** 従って、HTML/CSSでポスター1枚を生成してください。独自のアレンジは、ユーザーに頼まれない限り加えないこと。

## 出力形式（必ず守る）

- \`<div class="poster">\` 1枚。縦なら **728×1030px**、横告知（TV番組風）なら **1030×728px**。ユーザー指定がなければ縦
- フォントは Google Fonts の **"Yuji Syuku"**（タイトル）と **"Zen Maru Gothic"（700）** を読み込む
- 人物写真はプレースホルダー（単色シルエット＋白フチ）で組み、差し替えコメントを付ける

## デザイントークン

\`\`\`css
:root {
  --sky: #4cc9f0;      /* 空色 */
  --sky-pale: #eaf6ff;
  --red: #e63946;      /* 祝いの赤 */
  --yellow: #ffd60a;   /* 派手な黄 */
  --navy: #1d3557;     /* 文字の紺 */
  --white: #ffffff;
}
\`\`\`

## モチーフのCSSレシピ（このデザインの飛び道具）

- **後光ストライプ**: 背景に repeating-conic-gradient(from 0deg at 50% 38%, var(--sky) 0 9deg, var(--sky-pale) 9deg 18deg)
- **虹**: 同心円の border を5本重ねる（赤橙黄緑青・各12px幅・下半分は overflow:hidden で隠す）
- **雲**: 白の円（border-radius:50%）を3〜4個くっつけた形
- **装飾枠**: 外周に --yellow の額縁（16px）＋内側に --red の細線（3px）＋四隅に丸飾り
- モチーフは**3種類まで**。全部入れは禁止（うるさくなりすぎる）

## レイアウト

- **中央**: 主役のプレースホルダー（白フチ6px付きシルエット・高さの55%）。足元に「舞台」となる赤い台形
- **タイトル**: 中央上〜左に**縦書き極太**（Yuji Syuku・80〜110px・--navy）。文字ごとに --white の座布団（袋文字: -webkit-text-stroke または8方向 text-shadow）
- **右端**: 出演者・演目一覧を縦書きで流す（Zen Maru Gothic・16px・--navy。名前ごとに改行）
- **左下 or 帯**: 放送日時・開催日を --red 地×--white 文字の帯で（角に切り込み風の三角）
- **最上部**: 「毎週土曜 よる11時30分」のようなリボン帯（--yellow 地・--red 枠）

## 配分ルール（うるさくしない保険）

- 彩度の高い面（赤・黄）は合計で全体の35%以下
- 空色ストライプは必ず背景に敷く（世界観の統一）
- 文字色は --navy と --white の2色のみ。赤文字は使わない（帯の白抜きは可）

## チェックリスト（生成後に必ず確認）

- [ ] 後光ストライプが背景に敷かれているか
- [ ] タイトルが袋文字（座布団付き）で背景に負けていないか
- [ ] モチーフが3種類以内に収まっているか
- [ ] 赤・黄の面積が35%以下か
- [ ] 出演者一覧が縦書きで右端に整列しているか
`,
  },
  {
    id: "poster-swiss-grid",
    creator: "keita-official",
    isSample: true,
    imageUrls: ["assets/samples/poster-swiss-grid.jpg"],
    genre: "広告ポスター",
    category: "イベント・告知",
    colorTone: "モノクロ系",
    price: 0,
    createdAt: "2026-07-01",
    sampleSpec: { c1: "#e10600", c2: "#f5f5f2" },
    highlights: [
      "デザイン展・建築・音楽など、知的でモダンな告知をしたい方",
      "写真なし・文字とグリッドだけで成立するポスターが欲しい方",
      "余白を「怖がらずに」使う型を数値で知りたい方",
    ],
    longDesc: "スイス・スタイル（国際タイポグラフィ様式）のポスターを設計図にしました。オフホワイトの紙にグリッドを引き、Helvetica系の大きな文字を左揃えで積み、アクセントは赤1色の幾何学図形だけ——「何も足さない勇気」を、グリッド定義と余白の数値ルールで支えます。\n展示会・講演会・音楽イベントなど、内容で勝負する告知に向きます。",
    title: "スイス・グリッドタイポ",
    tags: ["ミニマル", "タイポグラフィ", "モダン"],
    desc: "オフホワイト×赤1色のスイススタイル・ポスター。グリッドとHelvetica系タイポ、幾何学図形だけで知的な告知を作る設計図。",
    features: [
      "12分割グリッドとベースライン設計",
      "見出し・本文の2ウェイト構成ルール",
      "赤の幾何学図形（円・斜線・矩形）の置き方",
      "余白を全体の50%以上残す配分指定",
    ],
    downloads: 149,
    seedReviews: [
      { name: "建築学生", stars: 5, date: "2026-07-01", text: "卒業設計展のポスターに使用。グリッドの引き方から書いてあるので、そのまま指導資料にもなりました。" },
    ],
    thumb: `<div class="thumb" style="background:#f5f5f2">
      <div style="position:absolute;top:16px;left:16px;display:flex;flex-direction:column;gap:6px">
        <div class="t-bar" style="background:#111;width:120px;height:16px"></div>
        <div class="t-bar" style="background:#111;width:84px;height:16px"></div>
      </div>
      <div style="position:absolute;bottom:-18px;right:-18px;width:96px;height:96px;border-radius:50%;background:#e10600"></div>
      <div style="position:absolute;bottom:18px;left:16px;display:flex;flex-direction:column;gap:4px"><div class="t-bar" style="background:#999;width:70px"></div><div class="t-bar" style="background:#999;width:54px"></div></div>
    </div>`,
    skill: `---
name: poster-swiss-grid
description: オフホワイト×赤1色のスイススタイル（国際タイポグラフィ様式）ポスターをHTML/CSSで作るスキル。グリッド・左揃えの大型サンセリフ・幾何学図形が特徴。「ミニマルなポスター」「デザイン展の告知」「モダンなポスター」の依頼で使う。
---

# スイス・グリッドタイポ デザインスキル

このスキルは「Design Skill Market」で配布されているデザイン定義です。
以下のルールに **厳密に** 従って、HTML/CSSでポスター1枚を生成してください。独自のアレンジは、ユーザーに頼まれない限り加えないこと。

## 出力形式（必ず守る）

- \`<div class="poster">\` 1枚、**幅728px × 高さ1030px 固定**
- フォントは Google Fonts の **"Inter"（400/800）** を読み込む（日本語は "Noto Sans JP" 400/700）
- 写真・イラスト・グラデーションは使わない。単色の面と文字のみ

## デザイントークン

\`\`\`css
:root {
  --paper: #f5f5f2;   /* オフホワイトの紙 */
  --ink: #111111;
  --gray: #9a9a96;
  --red: #e10600;     /* 唯一のアクセント */
}
\`\`\`

## グリッド（すべての配置の根拠）

- 外周マージン **56px**。内側を **12カラム**（ガター16px）に分割
- 要素の左端は必ずカラム線に吸着させる。中央揃えは使わない（**全要素 左揃え**）
- 縦方向は 8px のベースライングリッドに乗せる

## タイポグラフィ

- **タイトル**: Inter 800・**88〜120px**・line-height 0.95・letter-spacing -0.02em・--ink。単語ごとに改行して2〜4行の「塊」にする。位置は上から1/6あたり
- **サブ情報**（日付・会場・主催）: Inter 400・14px・--gray・行間1.7。左下 or 右下の1カラム分に段組み
- 使うサイズは **タイトル・14px・10px の3段階のみ**。中間サイズを作らない
- 日本語タイトル併記時は Noto Sans JP 700・28px で英字の直下に

## 幾何学図形（アクセントは1種類だけ）

以下から**1つだけ**選んで置く。2つ以上は禁止:
- 大きな円（直径 = 幅の45%）を右下に。ポスター外に1/3はみ出させる
- 斜め45度の帯（幅80px）を左上から右下へ
- 正方形の連なり（5個・等間隔）を下端に
色は --red のみ。図形の上に文字を重ねる場合は --paper 色で

## 余白ルール（このデザインの本体）

- 何も置かれていない紙の面積を**50%以上**残す
- タイトルと図形以外の要素は視界の端に「小さく」まとめる
- 迷ったら要素を減らす（足すのは禁止）

## チェックリスト（生成後に必ず確認）

- [ ] 全要素がグリッド線に吸着し、左揃えになっているか
- [ ] 文字サイズが3段階に収まっているか
- [ ] 赤い図形が1種類だけか
- [ ] 余白が50%以上残っているか
- [ ] グラデーション・影・装飾が混入していないか
`,
  },
  {
    id: "poster-neon-night",
    creator: "keita-official",
    isSample: true,
    imageUrls: ["assets/samples/poster-neon-night.jpg"],
    genre: "広告ポスター",
    category: "イベント・告知",
    colorTone: "ダーク系",
    price: 0,
    createdAt: "2026-07-01",
    sampleSpec: { c1: "#8b5cf6", c2: "#0a0a14", dark: true },
    highlights: [
      "クラブイベント・テック系カンファレンス・ゲーム大会の告知の方",
      "黒地にネオンが光る、夜の高揚感を出したい方",
      "DJ・登壇者のラインナップを格好良く並べたい方",
    ],
    longDesc: "黒地×ネオングラデーションの「ナイトイベント」スタイルの設計図です。紫→シアンのグラデーションで光る英字タイトル、パースで寝かせたグリッド地平線、発光するラインナップ表記——CSSの text-shadow と gradient だけでネオンの光を再現します。\n音楽イベントのほか、eスポーツ大会・テック系ミートアップ・深夜配信の告知にも向きます。",
    title: "ネオン・ナイトイベント",
    tags: ["ネオン", "クラブ", "テック"],
    desc: "黒地×紫シアンのネオングラデが光るナイトイベント風ポスター。発光タイポとグリッド地平線で「夜の高揚感」を作る設計図。",
    features: [
      "text-shadow多重によるネオン発光のレシピ",
      "紫→シアンのグラデ文字と背景の光源設計",
      "ラインナップ（DJ・登壇者）の階層的な並べ方",
      "グリッド地平線・スキャンラインの背景装飾",
    ],
    downloads: 168,
    seedReviews: [
      { name: "学生DJサークル", stars: 4, date: "2026-07-01", text: "新歓パーティーの告知に。発光の作り方が text-shadow の値まで書いてあって助かりました。" },
    ],
    thumb: `<div class="thumb" style="background:#0a0a14">
      <div style="position:absolute;top:22%;left:16px;right:16px;display:flex;flex-direction:column;gap:7px">
        <div class="t-bar" style="background:linear-gradient(90deg,#8b5cf6,#22d3ee);width:78%;height:16px;box-shadow:0 0 14px #8b5cf688"></div>
        <div class="t-bar" style="background:linear-gradient(90deg,#8b5cf6,#22d3ee);width:52%;height:16px;box-shadow:0 0 14px #22d3ee66"></div>
      </div>
      <div style="position:absolute;bottom:0;left:0;right:0;height:34%;background:repeating-linear-gradient(90deg,#8b5cf622 0 1px,transparent 1px 24px),repeating-linear-gradient(0deg,#8b5cf622 0 1px,transparent 1px 12px);transform:perspective(80px) rotateX(38deg);transform-origin:bottom"></div>
    </div>`,
    skill: `---
name: poster-neon-night
description: 黒地×紫シアンのネオン発光ポスター（B判縦）をHTML/CSSで作るスキル。発光タイポ・グリッド地平線・ラインナップ表記が特徴。「クラブイベントのポスター」「eスポーツ大会告知」「ネオン風」の依頼で使う。
---

# ネオン・ナイトイベント デザインスキル

このスキルは「Design Skill Market」で配布されているデザイン定義です。
以下のルールに **厳密に** 従って、HTML/CSSでポスター1枚を生成してください。独自のアレンジは、ユーザーに頼まれない限り加えないこと。

## 出力形式（必ず守る）

- \`<div class="poster">\` 1枚、**幅728px × 高さ1030px 固定**。position:absolute レイヤー構成
- フォントは Google Fonts の **"Orbitron"（700/900）** と **"Noto Sans JP"（400）** を読み込む

## デザイントークン

\`\`\`css
:root {
  --violet: #8b5cf6;
  --cyan: #22d3ee;
  --pink: #f472b6;      /* 差し色。1箇所まで */
  --black: #0a0a14;     /* 夜の黒（青みあり） */
  --white: #eef2ff;
}
\`\`\`

## 背景（夜の空間を作る）

1. **ベース**: --black 全面
2. **光源**: 上1/3に --violet 12%透過の radial-gradient（タイトルの後光になる）
3. **グリッド地平線**: 下30%に repeating-linear-gradient の格子を transform: perspective(300px) rotateX(40deg) で寝かせる（線色は --violet 25%透過）
4. **スキャンライン**: 全面に3px間隔の横線（白2%透過）で画面っぽい質感

## ネオン発光のレシピ（コピペ推奨）

\`\`\`css
.neon {
  background: linear-gradient(90deg, var(--violet), var(--cyan));
  -webkit-background-clip: text; background-clip: text; color: transparent;
  filter: drop-shadow(0 0 6px rgba(139,92,246,.9)) drop-shadow(0 0 22px rgba(34,211,238,.5));
}
\`\`\`
- 白文字の発光は text-shadow: 0 0 4px #fff, 0 0 12px var(--cyan), 0 0 30px var(--violet) の3重で

## レイアウト

- **タイトル**: 上1/3に Orbitron 900・**72〜96px**・.neon適用・全大文字・2行まで。直下に日本語サブ（Noto Sans JP・16px・--white 70%）
- **日付**: タイトル上に「2026.07.26 SAT」形式（Orbitron 700・22px・--cyan・letter-spacing 0.3em）
- **ラインナップ**: 中央帯に階層をつけて並べる——ヘッドライナー（36px・.neon）→ ゲスト2〜4名（22px・--white）→ その他（14px・--white 60%・「/」区切り1行）
- **開場情報・会場・料金**: グリッド地平線の上に 13px・--white 70%・1〜2行
- **チケットQR枠**: 右下に 90pxの白枠（中は「QR」プレースホルダー）

## 禁止事項

- 発光は タイトル・ヘッドライナー・日付 の3箇所まで（全部光らせると安っぽくなる）
- --pink はどれか1要素だけ（差し色）

## チェックリスト（生成後に必ず確認）

- [ ] 728×1030px固定で崩れがないか
- [ ] 発光が3箇所以内に絞られているか
- [ ] グリッド地平線がパースで寝ているか
- [ ] ラインナップの階層（大→中→小）が明確か
- [ ] 黒背景が「真っ黒」でなく青みのある夜色か
`,
  },

  {
    id: "poster-campus-brush",
    creator: "keita-official",
    isSample: true,
    imageUrls: ["assets/samples/poster-campus-brush.jpg"],
    genre: "広告ポスター",
    category: "イベント・告知",
    colorTone: "カラフル",
    price: 0,
    createdAt: "2026-07-03",
    sampleSpec: { c1: "#8b5cf6", c2: "#ffffff" },
    highlights: [
      "専門学校・スクール・講座のオープンキャンパスや募集告知を作りたい方",
      "写真を主役に、明るく爽やかで前向きな印象にしたい方",
      "絵筆ストロークと大型タイポで“今っぽい”動きを出したい方",
    ],
    longDesc: "専門学校やスクールのオープンキャンパス告知に代表される、写真×絵筆ストローク×大型和文タイポの明るいポスターを設計図にしました。紫とライムイエローの筆ブラシが斜めに走り、巨大な明朝の漢字に中サイズの仮名を添えた「大小ミックス」のタイトルが主役。白基調の抜け感と人物写真の爽やかさを両立させる型を、数値ルールで固定しています。\n写真はプレースホルダー設計なので、スクール募集のほか、企業の採用・説明会・ワークショップ告知にも転用できます。",
    title: "スクール告知・ブラッシュスプラッシュ",
    tags: ["スクール", "オープンキャンパス", "筆タイポ"],
    desc: "写真×紫ライムの絵筆×大型明朝タイポの、明るいスクール/オープンキャンパス告知ポスター。大小ミックスのタイトルと白基調の抜け感で「前向きな募集」を作る設計図。",
    features: [
      "紫×ライムの絵筆ストローク（かすれ・奥行き）のCSSレシピ",
      "超特大の漢字＋中サイズ仮名の“大小ミックス”タイトル",
      "写真の左端を白にフェードして文字を乗せる合成",
      "スクリプト装飾・円バッジ・フッター帯の配置ルール",
    ],
    downloads: 246,
    seedReviews: [
      { name: "専門学校 広報", stars: 5, date: "2026-07-03", text: "オープンキャンパスの告知に。筆ストロークの角度や大小ミックスの指定が具体的で、写真を差し替えるだけで“それっぽく”仕上がりました。" },
    ],
    thumb: `<div class="thumb" style="background:linear-gradient(160deg,#ffffff,#eef2fb)">
      <div style="position:absolute;top:8%;left:-10%;width:72%;height:14px;background:linear-gradient(90deg,transparent,#8b5cf6);transform:rotate(-16deg);border-radius:8px"></div>
      <div style="position:absolute;top:42%;left:-6%;width:60%;height:10px;background:linear-gradient(90deg,transparent,#c2e830);transform:rotate(-16deg);border-radius:8px"></div>
      <div style="position:absolute;top:12px;left:16px;display:flex;flex-direction:column;gap:6px">
        <div class="t-bar" style="background:linear-gradient(#a78bfa,#8b5cf6);width:74px;height:24px;border-radius:3px"></div>
        <div class="t-bar" style="background:#c2e830;width:56px;height:24px;border-radius:3px"></div>
      </div>
      <div style="position:absolute;bottom:14px;left:16px;display:flex;flex-direction:column;gap:5px"><div class="t-bar" style="background:#1e2233;width:60%"></div><div class="t-bar" style="background:#1e2233;width:46%"></div></div>
      <div style="position:absolute;bottom:16px;right:14px;width:50px;height:50px;border-radius:50%;border:1.5px solid #8b5cf6"></div>
    </div>`,
    skill: `---
name: poster-campus-brush
description: 写真×絵筆ストローク×大型和文タイポの、明るく爽やかなスクール/オープンキャンパス告知ポスター（B判縦）をHTML/CSSで作るスキル。紫×ライムの筆ブラシ・巨大な明朝＋仮名の大小ミックス・人物写真が特徴。「学校の募集ポスター」「オープンキャンパス告知」「スクールの案内」「爽やかな募集ポスター」の依頼で使う。
---

# スクール告知・ブラッシュスプラッシュ デザインスキル

このスキルは「Design Skill Market」で配布されているデザイン定義です。
以下のルールに **厳密に** 従って、HTML/CSSでポスター1枚を生成してください。独自のアレンジは、ユーザーに頼まれない限り加えないこと。

## 出力形式（必ず守る）

- \`<div class="poster">\` 1枚、**幅728px × 高さ1030px 固定**（B判縦 ≒ 1:1.414）。position:absolute レイヤー構成
- フォントは Google Fonts の **"Shippori Mincho"（明朝・700/800）**、本文用に **"Zen Kaku Gothic New"**、スクリプトに **"Parisienne"** を読み込む
- 人物写真はプレースホルダー（明るいグラデ＋人物シルエット）で組み、差し替えコメントを付ける。実在の人物・学校名・ロゴは使わない

## デザイントークン

\`\`\`css
:root {
  --purple: #8b5cf6;
  --purple-light: #a78bfa;
  --lime: #c2e830;       /* ライムイエロー（差し色） */
  --ink: #1e2233;        /* 文字のほぼ黒 */
  --white: #ffffff;
  --paper: #f4f7fb;      /* うっすら青みの白 */
}
\`\`\`

## レイヤー構成（下から順に）

1. **背景**: --white〜--paper。右半分に人物写真プレースホルダー（明るい都市＋上を見上げる人物のポーズ）。「ここに人物写真。明るく・淡い色調で」コメント必須。写真の左端は白へフェードさせ、左側の文字が乗るようにする
2. **絵筆ストローク**: --purple と --lime の筆ブラシを右上がりの斜めに走らせる（後述）
3. **巨大タイトル**: 左上〜中央に和文の大型タイポ（後述）
4. **メッセージボックス・スクリプト装飾・円バッジ・フッター帯**

## 絵筆ストロークの作り方（このデザインの核）

- 筆ストローク1本 = 細長い要素に \`transform: rotate(-18deg)\`、端を border-radius で丸め、\`filter: blur(.4px)\` で軽くにじませる。片端をグラデで透明にして「かすれ」を出す
- --purple 4〜6本・--lime 2〜3本を、画面の対角線方向にリズムよく配置（太い・細い・短いを混ぜる）
- 不透明度は60〜90%。人物や文字の「上」にも1〜2本重ねる（前後の奥行きが出る）
- 左下と右上に小さなドットパターン（4×4程度の小四角の集合）を --purple で添える

## タイポグラフィ（巨大和文の大小ミックスが主役）

- タイトルは2フレーズを縦に積む。**漢字1文字だけを超特大**にし、送り仮名を中サイズで添える:
  - 1段目の例「**好**きを、」— 「好」は Shippori Mincho 800・**150〜190px**・--purple→--purple-light の縦グラデ、「きを、」は 70〜90px・--ink
  - 2段目の例「**武器**に。」— 「武」を --lime、「器」を --ink（ともに Shippori Mincho 800・150〜190px）、「に。」は 70px・--ink
- 明朝の縦画・ハネを活かし、文字同士を少し重ねて詰める（letter-spacing: -0.02em）
- **スクリプト装飾**: 右側に "Design / Plan / Share" を Parisienne・--purple-light・44px で3行、縦に流す（写真に軽く重ねる）

## メッセージボックス

タイトル下・左寄せ。3行程度の細ゴシック（Zen Kaku Gothic New・22px・--ink・行間2.0）:
- 各行の左に --ink の細い縦線マーカー（幅3px・行の高さ）を付ける
- キーワード（例 "好き"）は “ ” で囲み、少しだけ大きく、または --purple にする

## 円バッジ・フッター

- **円バッジ**: 右下に細い --purple の輪郭円（直径150px・塗りは白60%透過）。中にコール文言（例「OPEN CAMPUS」）を --purple・Zen Kaku 700・26px・2行で
- **フッター帯**: 最下部に白帯。中央にブランド/学校名を --purple・letter-spacing 0.3em の英字大文字で（例 MIRAI DESIGN LAB）。両脇に細いライン＋小さな星（✦）の飾り

## チェックリスト（生成後に必ず確認）

- [ ] 728×1030px固定で崩れ・スクロールが無いか
- [ ] 筆ストロークが紫×ライムで対角に流れ、かすれ感があるか
- [ ] タイトルが「超特大の漢字＋中サイズの仮名」の大小ミックスになっているか
- [ ] 明朝（タイトル）と細ゴシック（本文）が混在し、役割分担できているか
- [ ] 全体が白基調で明るく、余白と抜け感があるか（暗くベタ塗りにしない）
- [ ] 実在の人物・学校名・ロゴを使っていないか
`,
  },

  // ===== サムネイル / その他画像 =====
  {
    id: "img-yt-thumb",
    creator: "keita-official",
    isSample: true,
    imageUrls: ["assets/samples/img-yt-thumb.jpg"],
    genre: "サムネイル",
    category: "SNS・サムネイル",
    colorTone: "カラフル",
    price: 0,
    createdAt: "2026-07-01",
    sampleSpec: { c1: "#ffd400", c2: "#111111", dark: true },
    highlights: [
      "YouTubeのクリック率を上げたい配信者・編集者の方",
      "小さい表示でも読める「サムネ文字」の作法を知りたい方",
      "人物切り抜き＋背景＋大文字の定番構成を量産したい方",
    ],
    longDesc: "「スマホの小さな一覧で勝つ」ことだけを目的にした、強コントラストのYouTubeサムネイル設計図です。黄×黒の高視認配色、白フチ＋黒フチの二重縁取り文字、人物切り抜きの配置ルール——感覚でやりがちなサムネ作りを、サイズと色の数値ルールに落とし込みました。\n1280×720のHTMLで組むので、文字の微調整も一瞬。書き出してそのままアップできます。",
    title: "YouTubeサムネ・強コントラスト",
    tags: ["YouTube", "サムネイル", "高CTR"],
    desc: "黄×黒の強コントラストYouTubeサムネイル（1280×720）。二重縁取り文字と人物配置のルールで「一覧で目立つ」を作る設計図。",
    features: [
      "二重縁取り（白フチ＋黒フチ）文字のレシピ",
      "3語以内・2行まで・最小90pxの文字ルール",
      "人物切り抜きの位置・サイズ・光彩の指定",
      "スマホ縮小表示を想定した視認性チェック付き",
    ],
    downloads: 342,
    seedReviews: [
      { name: "ゲーム実況者", stars: 5, date: "2026-07-01", text: "サムネ外注をやめられました。縁取りの数値がそのまま使えるのが最高。CTRも体感で上がってます。" },
    ],
    thumb: `<div class="thumb" style="background:linear-gradient(135deg,#1a1a1a,#111)">
      <div style="position:absolute;top:18%;left:14px;display:flex;flex-direction:column;gap:7px">
        <div class="t-bar" style="background:#ffd400;width:130px;height:22px;border-radius:4px"></div>
        <div class="t-bar" style="background:#ffffff;width:96px;height:22px;border-radius:4px"></div>
      </div>
      <div style="position:absolute;bottom:-10%;right:6%;width:34%;height:80%;background:linear-gradient(#555,#222);border-radius:50% 50% 0 0"></div>
      <div style="position:absolute;top:10px;right:10px;width:44px;height:16px;background:#e11d2e;border-radius:3px"></div>
    </div>`,
    skill: `---
name: img-yt-thumb
description: 黄×黒の強コントラストYouTubeサムネイル（1280×720）をHTML/CSSで作るスキル。二重縁取りの極太文字・人物切り抜き配置・高視認の配色ルールが特徴。「サムネ作って」「YouTubeのサムネイル」の依頼で使う。
---

# YouTubeサムネ・強コントラスト デザインスキル

このスキルは「Design Skill Market」で配布されているデザイン定義です。
以下のルールに **厳密に** 従って、HTML/CSSでサムネイル1枚を生成してください。独自のアレンジは、ユーザーに頼まれない限り加えないこと。

## 出力形式（必ず守る）

- \`<div class="thumb-canvas">\` 1枚、**幅1280px × 高さ720px 固定**。position:absolute レイヤー構成
- フォントは Google Fonts の **"M PLUS Rounded 1c"（900）** または **"Noto Sans JP"（900）** を読み込む
- 人物はプレースホルダー（シルエット＋差し替えコメント）で組む

## デザイントークン

\`\`\`css
:root {
  --yellow: #ffd400;   /* メイン文字色 */
  --white: #ffffff;
  --black: #111111;
  --red: #e11d2e;      /* 緊急・煽り用。1箇所まで */
}
\`\`\`

## 文字ルール（サムネの生死を分ける）

- ワードは **3語以内・2行まで**。文は書かない（「衝撃の結末」ではなく「衝撃」＋「結末」のような塊）
- サイズ: 1行目 **120〜160px**、2行目 **90〜120px**。90px未満の文字は入れない（チャンネル名等の小物のみ例外で32px可）
- **二重縁取り**が必須:

\`\`\`css
.stroke {
  color: var(--yellow);
  text-shadow:
    -3px -3px 0 #fff, 3px -3px 0 #fff, -3px 3px 0 #fff, 3px 3px 0 #fff,
    0 0 16px rgba(0,0,0,.9),
    6px 6px 0 var(--black), -6px 6px 0 var(--black), 6px -6px 0 var(--black), -6px -6px 0 var(--black);
}
\`\`\`

- 行ごとに色を変える（1行目 --yellow / 2行目 --white など）。3色目は使わない
- 文字は左寄せで上下中央帯に。**右1/3は人物のために空ける**

## 人物・背景

- **人物切り抜き**: 右1/3に高さ90〜105%で配置（頭がわずかに見切れてよい）。輪郭に filter: drop-shadow(0 0 24px rgba(255,212,0,.55)) の光彩。「ここに人物切り抜き画像」コメント必須
- **背景**: 暗めのグラデ（--black 基調）＋対角の集中線 or 放射グラデで中央に視線誘導。背景に文字と同系色を置かない
- **小物**: 右上に「LIVE」「新発見」等の赤バッジ1個まで（--red・白文字・28px）

## スマホ視認チェック（生成後、必ず自問する）

- 320px幅に縮小した想定で、1行目のワードが読めるか
- 顔（プレースホルダー）と文字が重なっていないか
- 3秒で内容が伝わるか（伝わらないなら文字を減らす）

## チェックリスト

- [ ] 1280×720px固定か
- [ ] ワードが3語以内・最小90px以上か
- [ ] 二重縁取りが効いているか
- [ ] 右1/3が人物用に空いているか
- [ ] 色が黄・白・黒＋赤1箇所に収まっているか
`,
  },
  {
    id: "img-sns-square",
    creator: "keita-official",
    isSample: true,
    imageUrls: ["assets/samples/img-sns-square.jpg"],
    genre: "その他画像",
    category: "SNS・サムネイル",
    colorTone: "ベージュ・和色系",
    price: 0,
    createdAt: "2026-07-01",
    sampleSpec: { c1: "#b08968", c2: "#f6f1ea" },
    highlights: [
      "Instagramでお知らせ・キャンペーン告知をするお店・個人の方",
      "ごちゃつかない、上品で統一感のあるスクエア画像が欲しい方",
      "毎回デザインに悩まず「型」で量産したい方",
    ],
    longDesc: "Instagramのフィード告知に最適化した、1080×1080のスクエア告知画像の設計図です。淡いベージュ地にセリフ体の見出し、細罫線のカード枠、下部の小さなアカウント名——「静かなのに目に留まる」上品系の型を数値で定義しました。\n新メニュー告知・営業時間変更・イベント案内・キャンペーンなど、文言を差し替えるだけで統一感のある投稿が量産できます。",
    title: "SNS告知スクエア・上品ベージュ",
    tags: ["Instagram", "告知", "上品"],
    desc: "淡ベージュ×セリフ体の上品なInstagram告知画像（1080×1080）。細罫線カードと余白のルールで「静かに目に留まる」を作る設計図。",
    features: [
      "1080×1080の告知テンプレ（見出し・本文・日付・アカウント名）",
      "セリフ体×細ゴシックのフォントペアリング",
      "細罫線カード枠と角の飾りのレシピ",
      "文言差し替えだけで統一感が続く運用ルール",
    ],
    downloads: 231,
    seedReviews: [
      { name: "カフェ店主", stars: 5, date: "2026-07-01", text: "新メニューのお知らせ用に。フォントの組み合わせまで決まってるので、投稿のたびに悩まなくなりました。" },
    ],
    thumb: `<div class="thumb" style="background:#f6f1ea">
      <div style="position:absolute;inset:14px;border:1px solid #b08968;border-radius:2px"></div>
      <div style="position:absolute;top:30%;left:20%;right:20%;display:flex;flex-direction:column;gap:8px;align-items:center">
        <div class="t-bar" style="background:#5c4a38;width:70%;height:12px"></div>
        <div class="t-bar" style="background:#b08968;width:40%;height:7px"></div>
        <div class="t-bar" style="background:#cbb9a4;width:56%;height:7px"></div>
      </div>
      <div style="position:absolute;bottom:22px;left:35%;right:35%;height:6px;background:#b0896855;border-radius:3px"></div>
    </div>`,
    skill: `---
name: img-sns-square
description: 淡ベージュ×セリフ体の上品なInstagram告知スクエア画像（1080×1080）をHTML/CSSで作るスキル。細罫線カード・余白・フォントペアが特徴。「インスタの告知画像」「お知らせ画像」「キャンペーン画像」の依頼で使う。
---

# SNS告知スクエア・上品ベージュ デザインスキル

このスキルは「Design Skill Market」で配布されているデザイン定義です。
以下のルールに **厳密に** 従って、HTML/CSSで画像1枚を生成してください。独自のアレンジは、ユーザーに頼まれない限り加えないこと。

## 出力形式（必ず守る）

- \`<div class="sq-canvas">\` 1枚、**幅1080px × 高さ1080px 固定**
- フォントは Google Fonts の **"Shippori Mincho"（600）** と **"Zen Kaku Gothic New"（300/500）** を読み込む
- 写真を使う場合は上半分に1枚だけ（プレースホルダー＋差し替えコメント）。使わない構成がデフォルト

## デザイントークン

\`\`\`css
:root {
  --bg: #f6f1ea;        /* 淡ベージュ */
  --brown: #b08968;     /* 罫線・アクセント */
  --ink: #5c4a38;       /* 見出しの焦げ茶 */
  --ink-soft: #8a7a68;  /* 本文 */
}
\`\`\`

## レイアウト（中央揃え・左右対称）

1. **外枠**: 全面 --bg。内側40pxに --brown の細罫線（1px）カード枠。四隅に小さな菱形飾り（8px）
2. **上部ラベル**: 上から140pxに英字ラベル（例 INFORMATION / NEW MENU）——Zen Kaku 300・28px・letter-spacing 0.5em・--brown
3. **見出し**: 中央やや上に Shippori Mincho 600・**64〜80px**・--ink・行間1.4・**2行まで**
4. **区切り**: 見出し下に幅120pxの --brown 罫線（1px）＋中央に菱形
5. **本文**: 3行まで・Zen Kaku 300・26px・--ink-soft・行間2.0
6. **日付・詳細**: 本文下に 32px・Shippori Mincho・--ink（日付は最も伝えたい情報として本文より大きく）
7. **下部**: アカウント名（@xxx）を 22px・--brown で中央に

## 余白ルール

- 上下左右の「詰まり」を作らない。要素間は最低48px空ける
- 文字は画面幅の70%以内に収める（両端15%は常に空白）
- 要素は全部で6個まで。入り切らない情報は「詳しくはプロフィールへ」に逃す

## バリエーション運用（統一感の保ち方）

- 色・フォント・枠は固定。変えてよいのは 文言・英字ラベル・菱形の有無 のみ
- 写真版にする場合: 上半分に写真、下半分に同ルールの文字組み（罫線カードは写真の上にかけない）

## チェックリスト

- [ ] 1080×1080px固定か
- [ ] 要素が6個以内・要素間48px以上か
- [ ] 見出しがセリフ体・本文が細ゴシックのペアになっているか
- [ ] 文字が幅70%以内に収まっているか
- [ ] 色が4色トークンだけで構成されているか
`,
  },
  {
    id: "img-ogp-eyecatch",
    creator: "keita-official",
    isSample: true,
    imageUrls: ["assets/samples/img-ogp-eyecatch.jpg"],
    genre: "サムネイル",
    category: "SNS・サムネイル",
    colorTone: "ブルー系",
    price: 0,
    createdAt: "2026-07-01",
    sampleSpec: { c1: "#2563eb", c2: "#eef4ff" },
    highlights: [
      "ブログ・note・技術記事のアイキャッチを統一したい方",
      "SNSでシェアされたとき（OGP）にきちんと見える画像が欲しい方",
      "記事タイトルを流し込むだけの量産テンプレが欲しい方",
    ],
    longDesc: "記事のOGP画像・アイキャッチに特化した1200×630の設計図です。ブランドカラーの帯とロゴ位置を固定し、記事タイトルを大きく流し込むだけ——X(Twitter)やSlackでシェアされたときの見え方（端の見切れ・縮小時の可読性）まで考慮したセーフエリア設計が特徴です。\nカラーを差し替えれば自分のブログのブランドに合わせられます。",
    title: "OGP・記事アイキャッチ",
    tags: ["OGP", "ブログ", "アイキャッチ"],
    desc: "記事タイトルを流し込むだけのOGP画像テンプレ（1200×630）。セーフエリア設計とブランド帯で「シェアで映える」を作る設計図。",
    features: [
      "1200×630のOGP標準サイズ＋セーフエリア設計",
      "タイトル文字数別のフォントサイズ自動ルール",
      "ブランド帯・ロゴ・著者名の固定レイアウト",
      "カラー差し替えで自ブログ仕様にできるトークン設計",
    ],
    downloads: 268,
    seedReviews: [
      { name: "技術ブログ運営", stars: 5, date: "2026-07-01", text: "記事ごとにタイトルを差し替えるだけになって、公開作業が5分短縮。文字数別のサイズ表が地味に便利です。" },
    ],
    thumb: `<div class="thumb" style="background:#eef4ff">
      <div style="position:absolute;top:0;left:0;right:0;height:12px;background:#2563eb"></div>
      <div style="position:absolute;top:30%;left:18px;right:18px;display:flex;flex-direction:column;gap:8px">
        <div class="t-bar" style="background:#1e2a44;width:88%;height:14px"></div>
        <div class="t-bar" style="background:#1e2a44;width:62%;height:14px"></div>
      </div>
      <div style="position:absolute;bottom:14px;left:18px;display:flex;gap:6px;align-items:center"><div class="t-dot" style="background:#2563eb"></div><div class="t-bar" style="background:#93a6c9;width:60px"></div></div>
    </div>`,
    skill: `---
name: img-ogp-eyecatch
description: ブログ・note記事のOGP画像/アイキャッチ（1200×630）をHTML/CSSで作るスキル。ブランド帯・セーフエリア・タイトル流し込みルールが特徴。「OGP画像」「記事のアイキャッチ」「ブログのサムネ」の依頼で使う。
---

# OGP・記事アイキャッチ デザインスキル

このスキルは「Design Skill Market」で配布されているデザイン定義です。
以下のルールに **厳密に** 従って、HTML/CSSで画像1枚を生成してください。独自のアレンジは、ユーザーに頼まれない限り加えないこと。

## 出力形式（必ず守る）

- \`<div class="ogp-canvas">\` 1枚、**幅1200px × 高さ630px 固定**
- フォントは Google Fonts の **"Noto Sans JP"（500/800）** を読み込む
- 写真は使わない。色面・図形・文字のみで構成する

## デザイントークン（ブランドに合わせて差し替え可）

\`\`\`css
:root {
  --brand: #2563eb;       /* ブランドカラー */
  --brand-pale: #eef4ff;  /* 背景 */
  --ink: #1e2a44;         /* タイトル */
  --sub: #64748b;         /* 著者名など */
}
\`\`\`

## セーフエリア（OGP特有の注意）

- 外周 **60px** はSNSのUIやトリミングで欠ける可能性がある。**文字・ロゴを置かない**
- X(Twitter)の小サムネは中央が正方形に切られる場合がある → タイトルは**上下中央**に置く

## レイアウト

1. **背景**: --brand-pale 全面。右下に --brand 6%透過の大きな円（直径500px・1/3見切れ）で単調さ回避
2. **ブランド帯**: 上端に --brand の帯（高さ20px）
3. **タイトル**: セーフエリア内・上下中央・左揃え。Noto Sans JP 800・--ink・行間1.35
4. **サイト名・著者**: 左下（セーフエリア内）にロゴ丸（40px・--brand）＋サイト名 24px・--sub
5. **カテゴリラベル**: タイトル上に --brand 文字の小ラベル（20px・#TECH 等）

## タイトル文字数別サイズ表（必ず従う）

- 〜15文字: **72px**・1行
- 16〜30文字: **60px**・2行
- 31〜45文字: **48px**・2〜3行
- 46文字以上: タイトルを要約して45文字以内に（そのまま流し込まない）

## バリエーション運用

- 色トークン4つを差し替えるだけで別ブログ仕様になる（レイアウトは固定）
- カテゴリごとに --brand を変える運用も可（TECH=青 / DESIGN=紫 / LIFE=緑 など）

## チェックリスト

- [ ] 1200×630px固定か
- [ ] 文字・ロゴがセーフエリア（外周60px）を侵していないか
- [ ] タイトルサイズが文字数表に従っているか
- [ ] 200px幅に縮小してもタイトルが読めるか
- [ ] 色が4色トークンだけで構成されているか
`,
  },
  {
    id: "img-webinar-thumb",
    creator: "keita-official",
    isSample: true,
    imageUrls: ["assets/samples/img-webinar-thumb.jpg"],
    genre: "サムネイル",
    category: "SNS・サムネイル",
    colorTone: "ブルー系",
    price: 0,
    createdAt: "2026-07-02",
    sampleSpec: { c1: "#1e40af", c2: "#0f172a", dark: true },
    highlights: [
      "ウェビナー・オンラインセミナー・勉強会の告知サムネを作りたい方",
      "登壇者の顔写真枠と日時を、信頼感のある構成で見せたい方",
      "connpass・Peatix・YouTube Liveのカバー画像を量産したい方",
    ],
    longDesc: "ウェビナー・セミナー告知に特化した16:9のサムネイル設計図です。濃紺のビジネス配色をベースに、左に大きな講演タイトルと日時、右に登壇者の丸フレーム、下部に主催ロゴ帯——「ちゃんとしたセミナー」に見える型を数値で固定しました。\n登壇者の枠・日時・タイトルを差し替えるだけで、connpass/Peatix/YouTube Liveのどこに出しても崩れない告知画像が作れます。",
    title: "ウェビナー告知サムネ・信頼ブルー",
    tags: ["ウェビナー", "セミナー", "16:9"],
    desc: "濃紺×青のウェビナー・セミナー告知サムネ（16:9）。タイトル・日時・登壇者枠・主催ロゴ帯の固定レイアウトで「ちゃんとした告知」を作る設計図。",
    features: [
      "16:9の告知テンプレ（タイトル・日時・登壇者・主催）",
      "登壇者の丸フレーム＋肩書の並べ方ルール",
      "日時バッジと『オンライン開催』ラベルの型",
      "connpass/Peatix/YouTube Liveで見切れないセーフエリア",
    ],
    downloads: 176,
    seedReviews: [
      { name: "勉強会主催", stars: 5, date: "2026-07-02", text: "毎月の勉強会サムネがこれで統一できました。登壇者枠の位置が決まっているのが本当に楽です。" },
    ],
    thumb: `<div class="thumb" style="background:linear-gradient(150deg,#1e3a8a,#0f172a)">
      <div style="position:absolute;top:20%;left:14px;display:flex;flex-direction:column;gap:7px">
        <div class="t-bar" style="background:#ffffff;width:120px;height:16px"></div>
        <div class="t-bar" style="background:#60a5fa;width:80px;height:10px"></div>
      </div>
      <div style="position:absolute;top:24%;right:16px;width:64px;height:64px;border-radius:50%;background:#334155;border:2px solid #60a5fa"></div>
      <div style="position:absolute;bottom:12px;left:14px;right:14px;height:8px;background:#ffffff22;border-radius:3px"></div>
    </div>`,
    skill: `---
name: img-webinar-thumb
description: 濃紺×青のウェビナー・セミナー告知サムネイル（16:9）をHTML/CSSで作るスキル。タイトル・日時・登壇者の丸フレーム・主催ロゴ帯の固定レイアウトが特徴。「ウェビナーのサムネ」「セミナー告知画像」「勉強会のカバー画像」の依頼で使う。
---

# ウェビナー告知サムネ・信頼ブルー デザインスキル

このスキルは「Design Skill Market」で配布されているデザイン定義です。
以下のルールに **厳密に** 従って、HTML/CSSでサムネイル1枚を生成してください。独自のアレンジは、ユーザーに頼まれない限り加えないこと。

## 出力形式（必ず守る）

- \`<div class="thumb-canvas">\` 1枚、**幅1280px × 高さ720px 固定**。position:absolute レイヤー構成
- フォントは Google Fonts の **"Noto Sans JP"（500/800）** を読み込む
- 登壇者の顔はプレースホルダー（丸フレーム＋差し替えコメント）で組む

## デザイントークン

\`\`\`css
:root {
  --navy: #0f172a;      /* 背景の濃紺 */
  --navy-2: #1e3a8a;
  --blue: #60a5fa;      /* アクセントの青 */
  --white: #f8fafc;
  --sub: #cbd5e1;       /* 補助テキスト */
}
\`\`\`

## レイアウト

1. **背景**: 150deg の --navy-2 → --navy グラデ。右上に --blue 10%透過の光。左端に --blue の縦帯（幅8px）
2. **上部ラベル**: 左上に「オンライン開催」バッジ（--blue 地・白文字・角丸・22px）
3. **タイトル**: 左半分に Noto Sans JP 800・**52〜72px**・--white・行間1.3・2〜3行。最重要ワードだけ --blue
4. **日時バッジ**: タイトル下に日付＋時間（白角丸カードに --navy 文字・28px。日付を最大強調）
5. **登壇者枠**: 右側に丸フレーム（直径220px・--blue の2px枠）を1〜3個。各フレーム下に氏名（20px・白）＋肩書（14px・--sub）。「ここに登壇者の顔写真」コメント必須
6. **主催帯**: 最下部に主催・ロゴのプレースホルダー行（--white 40%透過の角丸・高さ20px）

## セーフエリア（配信面で見切れない工夫）

- 外周 **48px** には主要素を置かない（YouTube Liveのタイトル帯・再生ボタンで隠れる）
- 中央下の再生ボタン位置（直径120px相当）に顔や文字を重ねない

## チェックリスト

- [ ] 1280×720px固定か
- [ ] タイトルが52px以上で、最重要ワードだけ青になっているか
- [ ] 日時が一目でわかる大きさ・位置にあるか
- [ ] 登壇者枠が丸フレームで、氏名・肩書が揃っているか
- [ ] 中央下と外周48pxに主要素が被っていないか
- [ ] 色が濃紺・青・白＋補助グレーに収まっているか
`,
  },
  {
    id: "img-sns-header",
    creator: "keita-official",
    isSample: true,
    imageUrls: ["assets/samples/img-sns-header.jpg"],
    genre: "その他画像",
    category: "SNS・サムネイル",
    colorTone: "モノクロ系",
    price: 0,
    createdAt: "2026-07-02",
    sampleSpec: { c1: "#111827", c2: "#f3f4f6" },
    highlights: [
      "X(Twitter)・YouTube・noteのヘッダー/バナー画像を作りたい方",
      "プロフィールアイコンやボタンで文字が隠れない設計が欲しい方",
      "肩書・キャッチ・実績を1枚で伝えたい個人・フリーランスの方",
    ],
    longDesc: "X・YouTube・noteのヘッダー画像に特化した横長バナーの設計図です。各SNSでアイコンやボタンに隠れる位置を避ける『セーフエリア』を最優先に設計し、中央にキャッチコピー＋肩書、脇に実績や提供メニューを整理——「何をしている人か」が一目で伝わる型を数値で固定しました。\nプラットフォームごとの推奨比率と、隠れる領域の逃がし方まで指定してあります。",
    title: "SNSヘッダー・セーフエリア設計",
    tags: ["ヘッダー", "バナー", "プロフィール"],
    desc: "X・YouTube・note向けの横長ヘッダー画像。アイコン/ボタンで隠れないセーフエリア設計とキャッチ・肩書の型で「何者か」を1枚で伝える設計図。",
    features: [
      "各SNSの推奨比率と隠れ領域を避けるセーフエリア定義",
      "中央キャッチ＋肩書＋実績3点の並べ方",
      "プロフィールアイコン被りを逃がす左下の空け方",
      "モノトーン基調＋1アクセントの上品な配色ルール",
    ],
    downloads: 198,
    seedReviews: [
      { name: "フリーランスデザイナー", stars: 5, date: "2026-07-02", text: "Xのヘッダーで文字が丸アイコンに隠れる問題がやっと解決。セーフエリアの数値が神です。" },
    ],
    thumb: `<div class="thumb" style="background:#f3f4f6">
      <div style="position:absolute;inset:12px;border:2px dashed #d1d5db;border-radius:4px"></div>
      <div style="position:absolute;top:38%;left:24%;right:24%;display:flex;flex-direction:column;gap:6px;align-items:center">
        <div class="t-bar" style="background:#111827;width:80%;height:12px"></div>
        <div class="t-bar" style="background:#6b7280;width:50%;height:7px"></div>
      </div>
      <div style="position:absolute;bottom:14px;left:14px;width:26px;height:26px;border-radius:50%;background:#111827"></div>
    </div>`,
    skill: `---
name: img-sns-header
description: X(Twitter)・YouTube・note向けの横長ヘッダー/バナー画像をHTML/CSSで作るスキル。各SNSのセーフエリア設計・キャッチ・肩書の型が特徴。「SNSのヘッダー」「プロフィールバナー」「YouTubeのチャンネルアート」の依頼で使う。
---

# SNSヘッダー・セーフエリア設計 デザインスキル

このスキルは「Design Skill Market」で配布されているデザイン定義です。
以下のルールに **厳密に** 従って、HTML/CSSでヘッダー画像1枚を生成してください。独自のアレンジは、ユーザーに頼まれない限り加えないこと。

## 出力形式（必ず守る）

- \`<div class="header-canvas">\` 1枚。用途で比率を選ぶ（ユーザー指定がなければ X 用）:
  - **X(Twitter)**: 1500×500px
  - **YouTube チャンネルアート**: 2560×1440px（PC表示のセーフエリアは中央 1546×423px）
  - **note**: 1600×640px
- フォントは Google Fonts の **"Noto Sans JP"（400/700）** を読み込む

## デザイントークン

\`\`\`css
:root {
  --ink: #111827;       /* 文字・背景の主色 */
  --paper: #f3f4f6;     /* 明るい背景 */
  --gray: #6b7280;      /* 肩書・補助 */
  --accent: #2563eb;    /* アクセント1色（差し替え可） */
}
\`\`\`

## セーフエリア（このスキルの主目的）

**主要な文字・ロゴは必ず中央のセーフエリア内に置く。** 各SNSで隠れる領域を避ける:
- **X**: スマホではヘッダー上下が切れる。上下 各60px と 左下（プロフィールアイコン直径約130px＋余白）に主要素を置かない
- **YouTube**: PC以外では中央帯（1546×423px）以外が見切れる。テキストは必ずこの中央帯に収める
- **note**: 上下の端 各50px を避ける

## レイアウト

1. **背景**: --ink 全面 or --paper 全面（明暗どちらか）。反対色の斜め帯 or 大きな円を1つ置いて単調さ回避
2. **中央キャッチ**: セーフエリア中央に Noto Sans JP 700・比率に応じ 48〜72px・1行。最重要語のみ --accent
3. **肩書・提供価値**: キャッチ下に 24〜28px・--gray・1行（例「Webデザイン / 月10本の制作実績」）
4. **実績・メニュー**: 右側 or 下部に「・」区切りで3点まで（20px）
5. **アイコン被り回避**: X/note はプロフィールアイコンが左下 or 中央下に重なる → その円形領域には何も置かない

## チェックリスト

- [ ] 選んだ比率のサイズで固定されているか
- [ ] 主要な文字が各SNSのセーフエリア内に収まっているか
- [ ] プロフィールアイコンが重なる位置に文字・ロゴが無いか
- [ ] キャッチが1行で「何をしている人か」を伝えているか
- [ ] 色が主色2つ＋アクセント1色に収まっているか
`,
  },
];
