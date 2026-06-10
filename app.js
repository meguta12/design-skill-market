// ===== Design Skill Market アプリロジック =====
// レビュー・DL数増分・アカウント・投稿デザインは localStorage に保存
//（プロトタイプ段階。本番では API + DB に置き換える）

const ORDER_EMAIL = "keita.1228.kendo@gmail.com";
const MY_ID = "me"; // 自分のアカウントのクリエイターID

// ---------- ストレージ ----------
function loadUserReviews(designId) {
  try {
    return JSON.parse(localStorage.getItem("reviews:" + designId)) || [];
  } catch { return []; }
}
function saveUserReview(designId, review) {
  const list = loadUserReviews(designId);
  list.push(review);
  localStorage.setItem("reviews:" + designId, JSON.stringify(list));
}
function allReviews(design) {
  return [...(design.seedReviews || []), ...loadUserReviews(design.id)];
}
function avgRating(design) {
  const list = allReviews(design);
  if (!list.length) return 0;
  return list.reduce((s, r) => s + r.stars, 0) / list.length;
}
function extraDownloads(designId) {
  return parseInt(localStorage.getItem("dl:" + designId) || "0", 10);
}
function bumpDownloads(designId) {
  localStorage.setItem("dl:" + designId, String(extraDownloads(designId) + 1));
}

// ---------- アカウント ----------
function getAccount() {
  try { return JSON.parse(localStorage.getItem("account")); } catch { return null; }
}
function saveAccount(account) {
  localStorage.setItem("account", JSON.stringify(account));
  renderHeaderAccount();
}

// ---------- 投稿デザイン ----------
function getUserDesigns() {
  try { return JSON.parse(localStorage.getItem("userDesigns")) || []; } catch { return []; }
}
function saveUserDesigns(list) {
  localStorage.setItem("userDesigns", JSON.stringify(list));
}
function allDesigns() {
  return [...DESIGNS, ...getUserDesigns()];
}
function findDesign(id) {
  return allDesigns().find(x => x.id === id);
}

// ---------- クリエイター ----------
function findCreator(id) {
  if (id === MY_ID) {
    const acc = getAccount();
    if (acc) return acc;
    return { id: MY_ID, name: "名無しさん", initial: "?", avatarColor: "#8b90a3", bio: "", links: {} };
  }
  return CREATORS.find(c => c.id === id);
}
function designsByCreator(creatorId) {
  return allDesigns().filter(d => d.creator === creatorId);
}

// ---------- 表示部品 ----------
function starsHtml(rating) {
  let html = "";
  for (let i = 1; i <= 5; i++) {
    html += `<span class="${i <= Math.round(rating) ? "" : "off"}">★</span>`;
  }
  return `<span class="stars">${html}</span>`;
}

function avatarHtml(creator, size) {
  return `<span class="avatar ${size === "lg" ? "avatar-lg" : "avatar-sm"}"
    style="background:${creator.avatarColor}">${escapeHtml(creator.initial)}</span>`;
}

function linkChipsHtml(links) {
  const defs = [
    ["homepage", "🌐 ホームページ"],
    ["x", "𝕏 X (Twitter)"],
    ["instagram", "📷 Instagram"],
    ["youtube", "▶ YouTube"],
  ];
  const chips = defs
    .filter(([key]) => links && links[key])
    .map(([key, label]) =>
      `<a class="link-chip" href="${escapeHtml(links[key])}" target="_blank" rel="noopener">${label}</a>`);
  return chips.length ? `<div class="link-chips">${chips.join("")}</div>` : "";
}

function ratingMetaHtml(d) {
  const rating = avgRating(d);
  const count = allReviews(d).length;
  if (!count) return `<span class="review-count">レビューはまだありません</span>`;
  return `${starsHtml(rating)}<span class="rating-num">${rating.toFixed(1)}</span>
    <span class="review-count">(${count}件)</span>`;
}

function cardHtml(d) {
  const dl = (d.downloads || 0) + extraDownloads(d.id);
  const cr = findCreator(d.creator);
  return `
  <article class="design-card" onclick="showDetail('${d.id}')">
    ${d.thumb}
    <div class="card-body">
      <div class="card-tags">${d.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("")}</div>
      <h3 class="card-title">${escapeHtml(d.title)}</h3>
      <p class="card-desc">${escapeHtml(d.desc)}</p>
      <div class="card-creator" onclick="event.stopPropagation(); showCreator('${d.creator}')">
        ${avatarHtml(cr, "sm")} <span class="creator-name">${escapeHtml(cr.name)}</span>
      </div>
      <div class="card-meta">
        <span>${ratingMetaHtml(d)}</span>
        <span class="dl-count">⬇ ${dl.toLocaleString()}</span>
      </div>
    </div>
  </article>`;
}

function renderGallery() {
  document.getElementById("card-grid").innerHTML = allDesigns().map(cardHtml).join("");
}

function renderOrderSelect() {
  const sel = document.getElementById("order-design");
  sel.querySelectorAll("option:not(:first-child)").forEach(o => o.remove());
  allDesigns().forEach(d => {
    const opt = document.createElement("option");
    opt.value = d.title;
    opt.textContent = d.title;
    sel.appendChild(opt);
  });
}

function renderHeaderAccount() {
  const acc = getAccount();
  const el = document.getElementById("nav-account");
  el.textContent = acc ? `👤 ${acc.name}` : "アカウント作成";
}

// ---------- ビュー切り替え ----------
const VIEWS = ["home", "detail", "creator", "account", "submit"];
function showView(name) {
  VIEWS.forEach(v => document.getElementById("view-" + v).hidden = (v !== name));
  window.scrollTo({ top: 0 });
}

function showHome() {
  renderGallery(); // 投稿・レビュー後の状態を反映
  renderOrderSelect();
  showView("home");
}

// ---------- デザイン詳細 ----------
let pendingStars = 0;

function showDetail(id) {
  const d = findDesign(id);
  if (!d) return;
  showView("detail");
  renderDetail(d);
}

function renderDetail(d) {
  const reviews = allReviews(d);
  const dl = (d.downloads || 0) + extraDownloads(d.id);
  const cr = findCreator(d.creator);
  pendingStars = 0;

  document.getElementById("detail-body").innerHTML = `
  <div class="detail-head">
    <div class="detail-thumb">${d.thumb}</div>
    <div class="detail-info">
      <div class="card-tags">${d.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("")}</div>
      <h1>${escapeHtml(d.title)}</h1>
      <div class="detail-rating">
        ${ratingMetaHtml(d)}
        <span class="dl-count">⬇ ${dl.toLocaleString()} DL</span>
      </div>
      <div class="creator-box" onclick="showCreator('${d.creator}')">
        ${avatarHtml(cr, "sm")}
        <div>
          <div class="creator-box-name">${escapeHtml(cr.name)}</div>
          <div class="creator-box-hint">プロフィールを見る →</div>
        </div>
      </div>
      <p class="detail-desc">${escapeHtml(d.desc)}</p>
      <ul class="feature-list">${(d.features || []).map(f => `<li>${escapeHtml(f)}</li>`).join("")}</ul>
      <div class="detail-actions">
        <button class="btn btn-primary" onclick="downloadSkill('${d.id}')">⬇ スキルファイルをダウンロード（無料）</button>
        <button class="btn btn-ghost" onclick="orderThis('${d.id}')">このデザインで制作代行を頼む</button>
      </div>
    </div>
  </div>

  <div class="reviews">
    <h2>レビュー（${reviews.length}件）</h2>
    <div id="review-list">
      ${reviews.length ? reviews.map(r => `
        <div class="review-item">
          <div class="review-head">
            ${starsHtml(r.stars)}
            <span class="review-name">${escapeHtml(r.name)}</span>
            <span class="review-date">${r.date}</span>
          </div>
          <p class="review-text">${escapeHtml(r.text)}</p>
        </div>`).join("")
      : `<p class="empty-note">まだレビューがありません。最初のレビューを書いてみませんか？</p>`}
    </div>

    <form class="review-form nice-form" id="review-form">
      <h3>レビューを書く</h3>
      <div class="star-input" id="star-input">
        ${[1,2,3,4,5].map(i => `<span data-v="${i}">★</span>`).join("")}
      </div>
      <label>ニックネーム<input type="text" id="rv-name" required maxlength="30" placeholder="ニックネーム"></label>
      <label>コメント<textarea id="rv-text" rows="3" required maxlength="400" placeholder="使ってみた感想を教えてください"></textarea></label>
      <button type="submit" class="btn btn-primary">投稿する</button>
    </form>
  </div>`;

  // 星入力
  const starInput = document.getElementById("star-input");
  starInput.querySelectorAll("span").forEach(s => {
    s.addEventListener("click", () => {
      pendingStars = parseInt(s.dataset.v, 10);
      starInput.querySelectorAll("span").forEach(x =>
        x.classList.toggle("on", parseInt(x.dataset.v, 10) <= pendingStars));
    });
  });

  // レビュー投稿
  document.getElementById("review-form").addEventListener("submit", e => {
    e.preventDefault();
    if (!pendingStars) { toast("★をタップして評価を選んでください"); return; }
    saveUserReview(d.id, {
      name: document.getElementById("rv-name").value.trim(),
      stars: pendingStars,
      date: new Date().toISOString().slice(0, 10),
      text: document.getElementById("rv-text").value.trim(),
    });
    toast("レビューを投稿しました！ありがとうございます");
    renderDetail(d);
  });
}

// ---------- クリエイタープロフィール ----------
function showCreator(id) {
  const cr = findCreator(id);
  if (!cr) return;
  const works = designsByCreator(id);
  const totalDl = works.reduce((s, d) => s + (d.downloads || 0) + extraDownloads(d.id), 0);

  document.getElementById("creator-body").innerHTML = `
  <div class="creator-head">
    ${avatarHtml(cr, "lg")}
    <div class="creator-head-info">
      <h1>${escapeHtml(cr.name)}</h1>
      <p class="creator-bio">${escapeHtml(cr.bio || "自己紹介はまだありません。")}</p>
      ${linkChipsHtml(cr.links)}
      <div class="creator-stats">
        <span><b>${works.length}</b> 投稿</span>
        <span><b>${totalDl.toLocaleString()}</b> 累計ダウンロード</span>
      </div>
    </div>
  </div>
  <h2 class="works-title">投稿したデザイン</h2>
  ${works.length
    ? `<div class="card-grid">${works.map(cardHtml).join("")}</div>`
    : `<p class="empty-note">まだ投稿がありません。</p>`}
  `;
  showView("creator");
}

// ---------- アカウント ----------
function showAccount() {
  const acc = getAccount();
  const body = document.getElementById("account-body");

  if (!acc) {
    body.innerHTML = `
    <div class="panel">
      <h1 class="panel-title">アカウント作成</h1>
      <p class="panel-lead">アカウントを作ると、デザインを投稿できるようになります。<br>
      ホームページやSNSのリンクはあなたの全作品のページに表示されます。</p>
      ${accountFormHtml({ name: "", bio: "", avatarColor: "#4f46e5", links: {} }, "アカウントを作成する")}
    </div>`;
  } else {
    const works = designsByCreator(MY_ID);
    body.innerHTML = `
    <div class="panel">
      <div class="panel-head-row">
        <h1 class="panel-title">マイページ</h1>
        <button class="btn btn-ghost btn-sm" onclick="showCreator('${MY_ID}')">公開プロフィールを確認</button>
      </div>
      <h2 class="panel-sub">プロフィール編集</h2>
      ${accountFormHtml(acc, "保存する")}
      <h2 class="panel-sub">自分の投稿（${works.length}件)</h2>
      ${works.length
        ? `<ul class="my-works">${works.map(d => `
            <li>
              <a href="#" onclick="showDetail('${d.id}'); return false;">${escapeHtml(d.title)}</a>
              <button class="text-danger" onclick="deleteUserDesign('${d.id}')">削除</button>
            </li>`).join("")}</ul>`
        : `<p class="empty-note">まだ投稿がありません。<a href="#" onclick="showSubmit(); return false;">最初のデザインを投稿してみましょう →</a></p>`}
    </div>`;
  }

  showView("account");

  document.getElementById("account-form").addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("ac-name").value.trim();
    if (!name) return;
    saveAccount({
      id: MY_ID,
      name,
      initial: name.slice(0, 1),
      avatarColor: document.getElementById("ac-color").value,
      bio: document.getElementById("ac-bio").value.trim(),
      links: {
        homepage: document.getElementById("ac-homepage").value.trim(),
        x: document.getElementById("ac-x").value.trim(),
        instagram: document.getElementById("ac-instagram").value.trim(),
        youtube: document.getElementById("ac-youtube").value.trim(),
      },
    });
    toast(acc ? "プロフィールを保存しました" : `ようこそ、${name}さん！これでデザインを投稿できます`);
    showAccount();
  });
}

function accountFormHtml(acc, submitLabel) {
  const links = acc.links || {};
  return `
  <form class="nice-form" id="account-form">
    <label>表示名（必須）<input type="text" id="ac-name" required maxlength="30" value="${escapeHtml(acc.name || "")}" placeholder="例：keita design"></label>
    <label>自己紹介<textarea id="ac-bio" rows="3" maxlength="300" placeholder="どんなデザインを作っていますか？">${escapeHtml(acc.bio || "")}</textarea></label>
    <label>アバターカラー<input type="color" id="ac-color" value="${acc.avatarColor || "#4f46e5"}"></label>
    <label>🌐 ホームページURL<input type="url" id="ac-homepage" value="${escapeHtml(links.homepage || "")}" placeholder="https://..."></label>
    <label>𝕏 X (Twitter) URL<input type="url" id="ac-x" value="${escapeHtml(links.x || "")}" placeholder="https://x.com/..."></label>
    <label>📷 Instagram URL<input type="url" id="ac-instagram" value="${escapeHtml(links.instagram || "")}" placeholder="https://instagram.com/..."></label>
    <label>▶ YouTube URL<input type="url" id="ac-youtube" value="${escapeHtml(links.youtube || "")}" placeholder="https://youtube.com/..."></label>
    <button type="submit" class="btn btn-primary btn-block">${submitLabel}</button>
  </form>`;
}

function deleteUserDesign(id) {
  if (!confirm("この投稿を削除しますか？")) return;
  saveUserDesigns(getUserDesigns().filter(d => d.id !== id));
  toast("投稿を削除しました");
  showAccount();
}

// ---------- デザイン投稿 ----------
function showSubmit() {
  const acc = getAccount();
  const body = document.getElementById("submit-body");

  if (!acc) {
    body.innerHTML = `
    <div class="panel center">
      <h1 class="panel-title">デザインを投稿するには</h1>
      <p class="panel-lead">投稿にはアカウントが必要です。<br>30秒で作れます（メールアドレス不要）。</p>
      <button class="btn btn-primary" onclick="showAccount()">アカウントを作成する</button>
    </div>`;
    showView("submit");
    return;
  }

  body.innerHTML = `
  <div class="panel">
    <h1 class="panel-title">デザインを投稿</h1>
    <p class="panel-lead">あなたのデザインの「作り方」をスキルとして共有しましょう。投稿者として「${escapeHtml(acc.name)}」が表示されます。</p>
    <form class="nice-form" id="submit-form">
      <label>デザイン名（必須）<input type="text" id="sb-title" required maxlength="40" placeholder="例：ネオン・ダークLP"></label>
      <label>タグ（カンマ区切り・3つまで）<input type="text" id="sb-tags" placeholder="例：LP, ダーク, 個人開発"></label>
      <label>説明文（必須）<textarea id="sb-desc" rows="3" required maxlength="200" placeholder="どんなサイト向けの、どんなデザインですか？"></textarea></label>
      <label>特徴（1行に1つ・4つまで）<textarea id="sb-features" rows="4" placeholder="例：&#10;ダークモード前提の配色設計&#10;スクロールアニメーション付き"></textarea></label>
      <div class="color-row">
        <label>メインカラー<input type="color" id="sb-color1" value="#4f46e5"></label>
        <label>背景カラー<input type="color" id="sb-color2" value="#f5f5fa"></label>
      </div>
      <label>スキル本文（.mdの中身）
        <textarea id="sb-skill" rows="14" required spellcheck="false"></textarea>
      </label>
      <p class="form-hint">💡 テンプレートを用意してあります。デザイントークン・構成・チェックリストを埋めると、Claude が再現しやすい良いスキルになります。</p>
      <button type="submit" class="btn btn-primary btn-block">このデザインを公開する</button>
    </form>
  </div>`;
  showView("submit");

  document.getElementById("sb-skill").value = skillTemplate();

  document.getElementById("submit-form").addEventListener("submit", e => {
    e.preventDefault();
    const title = document.getElementById("sb-title").value.trim();
    const tags = document.getElementById("sb-tags").value
      .split(/[,、，]/).map(t => t.trim()).filter(Boolean).slice(0, 3);
    const features = document.getElementById("sb-features").value
      .split("\n").map(f => f.trim()).filter(Boolean).slice(0, 4);
    const c1 = document.getElementById("sb-color1").value;
    const c2 = document.getElementById("sb-color2").value;

    const design = {
      id: "user-" + Date.now(),
      creator: MY_ID,
      title,
      tags: tags.length ? tags : ["オリジナル"],
      desc: document.getElementById("sb-desc").value.trim(),
      features,
      downloads: 0,
      seedReviews: [],
      thumb: genThumb(c1, c2),
      skill: document.getElementById("sb-skill").value,
    };
    saveUserDesigns([...getUserDesigns(), design]);
    toast("デザインを公開しました！🎉");
    showDetail(design.id);
  });
}

function genThumb(c1, c2) {
  return `<div class="thumb" style="background:${c2}">
    <div style="display:flex;gap:8px;align-items:center"><div class="t-dot" style="background:${c1}"></div><div class="t-bar" style="background:${c1}33;width:36%"></div></div>
    <div class="t-block" style="background:linear-gradient(135deg,${c1},${c1}cc);min-height:58px"></div>
    <div class="t-row"><div class="t-col" style="background:${c1}22"></div><div class="t-col" style="background:${c1}22"></div><div class="t-col" style="background:${c1}22"></div></div>
  </div>`;
}

function skillTemplate() {
  return `---
name: my-design-skill
description: （どんなサイト向けの、どんなデザインかを1〜2文で。Claudeはこの説明を見て使うかどうか判断します）
---

# デザイン名

以下のルールに厳密に従ってHTML/CSSを生成してください。

## デザイントークン

\`\`\`css
:root {
  --primary: #4f46e5;
  --ink: #1a1d29;
  --bg: #ffffff;
  --max-width: 1080px;
  --section-pad: 88px;
}
\`\`\`

- フォント:
- 見出しサイズ:

## ページ構成（この順番で）

1. ヘッダー:
2. ヒーロー:
3. （セクションを追加）

## レイアウトルール（崩れ防止）

- コンテンツ幅は max-width のコンテナで統一する
- 画像は max-width: 100%
- ○px以下では1カラムにする

## チェックリスト（生成後に必ず確認）

- [ ] 375px幅で横スクロールが発生しないか
- [ ] セクションの余白が統一されているか
`;
}

// ---------- スキルダウンロード ----------
function downloadSkill(id) {
  const d = findDesign(id);
  if (!d) return;
  const blob = new Blob([d.skill], { type: "text/markdown;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${d.id}-SKILL.md`;
  a.click();
  URL.revokeObjectURL(a.href);
  bumpDownloads(id);
  toast("スキルファイルをダウンロードしました。Claude に渡して使ってください！");
}

// ---------- 制作代行 ----------
function orderThis(id) {
  const d = findDesign(id);
  showHome();
  setTimeout(() => {
    if (d) document.getElementById("order-design").value = d.title;
    document.getElementById("order").scrollIntoView({ behavior: "smooth" });
  }, 50);
}

document.getElementById("order-form").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("order-name").value.trim();
  const email = document.getElementById("order-email").value.trim();
  const design = document.getElementById("order-design").value || "未定";
  const msg = document.getElementById("order-message").value.trim();
  const subject = encodeURIComponent(`【制作代行のご相談】${name}様より`);
  const body = encodeURIComponent(
`お名前: ${name}
ご連絡先: ${email}
ベースデザイン: ${design}

--- ご相談内容 ---
${msg}

（Design Skill Market の代行フォームから送信）`);
  location.href = `mailto:${ORDER_EMAIL}?subject=${subject}&body=${body}`;
});

// ---------- ユーティリティ ----------
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

let toastTimer;
function toast(msg) {
  let el = document.querySelector(".toast");
  if (!el) {
    el = document.createElement("div");
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  requestAnimationFrame(() => el.classList.add("show"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 3200);
}

// ---------- 初期化 ----------
renderGallery();
renderOrderSelect();
renderHeaderAccount();
