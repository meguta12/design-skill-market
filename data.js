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
];
