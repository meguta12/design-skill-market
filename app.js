// ===== Design Skill Market アプリロジック（Supabase版） =====
// アカウント・投稿・レビュー・DL数は Supabase に保存され、全ユーザーで共有される。
// data.js のシードデザイン6件はコード内に持ち、クラウドの投稿とマージして表示する。

const ORDER_EMAIL = "megupen.sab@gmail.com";

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const GENRES = ["ホームページ", "スライド資料", "アプリUI"];
const GENRE_ICONS = { "ホームページ": "🌐", "スライド資料": "📊", "アプリUI": "📱" };
const CATEGORIES = ["コーポレート", "LP・サービス", "店舗・飲食", "医療・クリニック", "ポートフォリオ", "和風・旅館", "教育・学習", "アプリ・ツール", "その他"];
const COLOR_TONES = ["ブルー系", "ダーク系", "グリーン系", "ブラウン系", "ベージュ・和色系", "モノクロ系", "カラフル", "その他"];
const NEW_DAYS = 14; // この日数以内なら NEW バッジ

// ---------- クラウドデータのキャッシュ ----------
const cloud = {
  designs: [],   // 投稿デザイン（アプリ内形式に変換済み）
  profiles: {},  // uuid → プロフィール
  reviews: [],   // 全レビュー
  stats: {},     // design_id → DL数
  loaded: false,
};
let session = null;
let myProfile = null;

function designFromRow(r) {
  return {
    id: r.id,
    creator: r.creator,
    title: r.title,
    tags: r.tags || [],
    desc: r.description || "",
    genre: r.genre || "ホームページ",
    category: r.category || "その他",
    colorTone: r.color_tone || "その他",
    price: r.price || 0,
    features: r.features || [],
    highlights: r.highlights || [],
    longDesc: r.long_desc || "",
    imageUrls: r.image_urls || [],
    sampleSpec: r.sample_spec || null,
    thumb: r.thumb || "",
    skill: r.skill,
    createdAt: (r.created_at || "").slice(0, 10),
    downloads: 0,
    seedReviews: [],
  };
}
function profileFromRow(r) {
  return {
    id: r.id,
    name: r.name,
    initial: r.initial || r.name.slice(0, 1),
    avatarColor: r.avatar_color || "#4f46e5",
    avatarUrl: r.avatar_url || "",
    bio: r.bio || "",
    links: r.links || {},
    isAdmin: !!r.is_admin,
  };
}
function isAdminUser() {
  return !!(myProfile && myProfile.isAdmin);
}

async function loadCloudData() {
  try {
    const [designs, profiles, reviews, stats] = await Promise.all([
      sb.from("designs").select("*").order("created_at", { ascending: false }),
      sb.from("profiles").select("*"),
      sb.from("reviews").select("*").order("created_at"),
      sb.from("design_stats").select("*"),
    ]);
    if (designs.error || profiles.error || reviews.error || stats.error) {
      throw designs.error || profiles.error || reviews.error || stats.error;
    }
    cloud.designs = designs.data.map(designFromRow);
    cloud.profiles = Object.fromEntries(profiles.data.map(r => [r.id, profileFromRow(r)]));
    cloud.reviews = reviews.data;
    cloud.stats = Object.fromEntries(stats.data.map(r => [r.design_id, r.downloads]));
    cloud.loaded = true;
  } catch (err) {
    console.warn("クラウドデータの取得に失敗（テーブル未作成の可能性）:", err?.message || err);
  }
}

// ---------- データアクセス ----------
function allDesigns() {
  return [...DESIGNS, ...cloud.designs];
}
function findDesign(id) {
  return allDesigns().find(x => x.id === id);
}
function allReviews(design) {
  const cloudReviews = cloud.reviews
    .filter(r => r.design_id === design.id)
    .map(r => ({ name: r.name, stars: r.stars, date: (r.created_at || "").slice(0, 10), text: r.body }));
  return [...(design.seedReviews || []), ...cloudReviews];
}
function avgRating(design) {
  const list = allReviews(design);
  if (!list.length) return 0;
  return list.reduce((s, r) => s + r.stars, 0) / list.length;
}
function extraDownloads(designId) {
  return cloud.stats[designId] || 0;
}
function totalDownloads(d) {
  return (d.downloads || 0) + extraDownloads(d.id);
}
function findCreator(id) {
  return CREATORS.find(c => c.id === id)
    || cloud.profiles[id]
    || { id, name: "退会したユーザー", initial: "?", avatarColor: "#8b90a3", bio: "", links: {} };
}
function designsByCreator(creatorId) {
  return allDesigns().filter(d => d.creator === creatorId);
}
function isMine(d) {
  return session && d.creator === session.user.id;
}

// ---------- 検索・絞り込み ----------
const filters = { q: "", genre: "", category: "", color: "", price: "", sort: "recommend" };

function isNew(d) {
  if (!d.createdAt) return false;
  return (Date.now() - new Date(d.createdAt).getTime()) / 86400000 <= NEW_DAYS;
}
function isPaid(d) {
  return (d.price || 0) > 0;
}

function filteredDesigns() {
  let list = allDesigns().filter(d => {
    if (filters.genre && (d.genre || "ホームページ") !== filters.genre) return false;
    if (filters.category && (d.category || "その他") !== filters.category) return false;
    if (filters.color && (d.colorTone || "その他") !== filters.color) return false;
    if (filters.price === "free" && isPaid(d)) return false;
    if (filters.price === "paid" && !isPaid(d)) return false;
    if (filters.q) {
      const q = filters.q.toLowerCase();
      const haystack = [d.title, d.desc, d.genre, d.category, d.colorTone, ...(d.tags || []), ...(d.features || [])]
        .join(" ").toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
  if (filters.sort === "new") {
    list.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
  } else if (filters.sort === "popular") {
    list.sort((a, b) => totalDownloads(b) - totalDownloads(a));
  } else if (filters.sort === "rating") {
    list.sort((a, b) => avgRating(b) - avgRating(a));
  }
  return list;
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
  const cls = size === "lg" ? "avatar-lg" : "avatar-sm";
  if (creator.avatarUrl) {
    return `<span class="avatar ${cls}"><img src="${escapeHtml(creator.avatarUrl)}" alt="${escapeHtml(creator.name)}" onerror="this.remove()"></span>`;
  }
  return `<span class="avatar ${cls}" style="background:${creator.avatarColor}">${escapeHtml(creator.initial)}</span>`;
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

function priceBadgeHtml(d) {
  return isPaid(d)
    ? `<span class="badge badge-paid">¥${d.price.toLocaleString()}</span>`
    : `<span class="badge badge-free">無料</span>`;
}

function sampleBadgeHtml(d) {
  return d.isSample ? `<span class="badge badge-sample">運営サンプル</span>` : "";
}

function cardThumbHtml(d) {
  // 実画像があればそれをサムネイルに、なければCSSモック
  if (d.imageUrls && d.imageUrls.length) {
    return `<div class="thumb thumb-photo"><img src="${escapeHtml(d.imageUrls[0])}" alt="${escapeHtml(d.title)}の完成イメージ" loading="lazy"></div>`;
  }
  return d.thumb;
}

function cardHtml(d) {
  const dl = totalDownloads(d);
  const cr = findCreator(d.creator);
  return `
  <article class="design-card" onclick="showDetail('${d.id}')">
    <div class="badge-row">
      ${priceBadgeHtml(d)}
      ${sampleBadgeHtml(d)}
      ${isNew(d) ? `<span class="badge badge-new">NEW</span>` : ""}
    </div>
    ${cardThumbHtml(d)}
    <div class="card-body">
      <div class="card-tags">
        <span class="tag tag-genre">${GENRE_ICONS[d.genre] || "🌐"} ${escapeHtml(d.genre || "ホームページ")}</span>
        ${d.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
      </div>
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
  const list = filteredDesigns();
  const grid = document.getElementById("card-grid");
  grid.innerHTML = list.length
    ? list.map(cardHtml).join("")
    : `<p class="empty-note no-hit">条件に合うデザインが見つかりませんでした。条件をクリアして探し直してみてください。</p>`;
  const hasFilter = filters.q || filters.category || filters.color || filters.price;
  document.getElementById("result-count").textContent =
    hasFilter ? `${list.length}件のデザインが見つかりました` : `全${list.length}件のデザイン`;
}

function renderGenreTabs() {
  const counts = {};
  allDesigns().forEach(d => {
    const g = d.genre || "ホームページ";
    counts[g] = (counts[g] || 0) + 1;
  });
  document.getElementById("genre-tabs").innerHTML =
    [["", `すべて (${allDesigns().length})`],
     ...GENRES.map(g => [g, `${GENRE_ICONS[g]} ${g} (${counts[g] || 0})`])]
    .map(([val, label]) =>
      `<button type="button" class="genre-tab ${filters.genre === val ? "active" : ""}"
        onclick="setGenre('${val}')">${label}</button>`).join("");
}

function setGenre(g) {
  filters.genre = g;
  renderGenreTabs();
  renderGallery();
}

function initFilterBar() {
  renderGenreTabs();
  const cat = document.getElementById("f-category");
  CATEGORIES.forEach(c => cat.add(new Option(c, c)));
  const col = document.getElementById("f-color");
  COLOR_TONES.forEach(c => col.add(new Option(c, c)));

  document.getElementById("f-q").addEventListener("input", e => {
    filters.q = e.target.value.trim();
    renderGallery();
  });
  [["f-category", "category"], ["f-color", "color"], ["f-price", "price"], ["f-sort", "sort"]]
    .forEach(([elId, key]) => {
      document.getElementById(elId).addEventListener("change", e => {
        filters[key] = e.target.value;
        renderGallery();
      });
    });
  document.getElementById("f-clear").addEventListener("click", () => {
    Object.assign(filters, { q: "", genre: "", category: "", color: "", price: "", sort: "recommend" });
    document.getElementById("f-q").value = "";
    ["f-category", "f-color", "f-price"].forEach(id => document.getElementById(id).value = "");
    document.getElementById("f-sort").value = "recommend";
    renderGenreTabs();
    renderGallery();
  });
}

function renderHeaderAccount() {
  const el = document.getElementById("nav-account");
  if (myProfile) el.textContent = `👤 ${myProfile.name}`;
  else if (session) el.textContent = "プロフィール設定";
  else el.textContent = "ログイン / 登録";
  document.getElementById("nav-admin").hidden = !isAdminUser();
}

// ---------- ビュー切り替え ----------
const VIEWS = ["home", "detail", "creator", "account", "submit", "admin"];
function showView(name) {
  VIEWS.forEach(v => document.getElementById("view-" + v).hidden = (v !== name));
  window.scrollTo({ top: 0 });
}

function showHome() {
  renderGallery();
  showView("home");
}

// ---------- 使用例ギャラリー（CSSモックを自動生成 + 投稿画像） ----------
function autoSamples(d) {
  const spec = d.sampleSpec || {};
  const c1 = spec.c1 || "#4f46e5";
  const c2 = spec.c2 || "#f5f5fa";
  const dark = !!spec.dark;
  const ink = dark ? "#ffffff22" : "#00000014";
  const card = dark ? "#ffffff14" : "#ffffff";
  const genre = d.genre || "ホームページ";

  const bar = (w, c, h = 8) => `<div style="background:${c};width:${w};height:${h}px;border-radius:4px"></div>`;

  if (genre === "スライド資料") {
    const slide = inner => `
      <div class="sample-stage" style="background:${c2}">
        <div style="background:#fff;width:82%;aspect-ratio:16/9;border-radius:6px;box-shadow:0 6px 22px rgba(0,0,0,.16);padding:4% 5%;display:flex;flex-direction:column;gap:4%">${inner}</div>
      </div>`;
    return [
      { label: "表紙", html: slide(`
        <div style="flex:1"></div>${bar("62%", c1, 14)}${bar("38%", ink, 9)}<div style="flex:1"></div>
        <div style="display:flex;justify-content:space-between">${bar("18%", ink, 7)}${bar("12%", ink, 7)}</div>`) },
      { label: "本文スライド", html: slide(`
        ${bar("70%", c1, 10)}${bar("45%", ink, 7)}
        <div style="display:flex;gap:5%;flex:1;align-items:flex-end;padding-top:2%">
          <div style="background:${c1}55;width:14%;height:42%"></div>
          <div style="background:${c1}99;width:14%;height:64%"></div>
          <div style="background:${c1};width:14%;height:90%"></div>
          <div style="flex:1"></div>
          <div style="display:flex;flex-direction:column;gap:8%;width:34%;height:80%;justify-content:center">
            ${bar("100%", ink, 7)}${bar("85%", ink, 7)}${bar("92%", ink, 7)}</div>
        </div>`) },
      { label: "まとめ", html: slide(`
        ${bar("40%", c1, 10)}
        <div style="display:flex;gap:4%;flex:1;padding-top:2%">
          <div style="flex:1;background:${c1}22;border-radius:8px"></div>
          <div style="flex:1;background:${c1}22;border-radius:8px"></div>
          <div style="flex:1;background:${c1}22;border-radius:8px"></div>
        </div>`) },
    ];
  }

  if (genre === "アプリUI") {
    const phone = inner => `
      <div class="sample-stage" style="background:${dark ? "#1a1f29" : c2}">
        <div style="background:${dark ? c2 : "#fff"};width:30%;min-width:150px;aspect-ratio:9/17;border-radius:18px;box-shadow:0 8px 26px rgba(0,0,0,.22);padding:4% 3%;display:flex;flex-direction:column;gap:3%">${inner}</div>
      </div>`;
    return [
      { label: "ホーム画面", html: phone(`
        ${bar("44%", ink, 6)}
        <div style="background:linear-gradient(135deg,${c1},${c1}bb);border-radius:10px;height:24%"></div>
        <div style="background:${card};border:1px solid ${ink};border-radius:9px;flex:1"></div>
        <div style="background:${card};border:1px solid ${ink};border-radius:9px;flex:1"></div>
        <div style="display:flex;gap:3%;height:8%">
          <div style="flex:1;background:${c1};border-radius:6px"></div>
          <div style="flex:1;background:${ink};border-radius:6px"></div>
          <div style="flex:1;background:${ink};border-radius:6px"></div>
        </div>`) },
      { label: "一覧画面", html: phone(`
        <div style="background:${ink};border-radius:8px;height:9%"></div>
        ${[1,2,3,4,5].map(() => `<div style="background:${card};border:1px solid ${ink};border-radius:9px;flex:1;display:flex;align-items:center;gap:5%;padding:0 5%">
          <div style="width:18%;aspect-ratio:1;background:${c1}44;border-radius:50%"></div>
          <div style="flex:1;height:7px;background:${ink};border-radius:4px"></div>
        </div>`).join("")}`) },
      { label: "詳細画面", html: phone(`
        <div style="background:linear-gradient(135deg,${c1},${c1}99);border-radius:10px;height:34%"></div>
        ${bar("70%", ink, 8)}${bar("50%", ink, 6)}
        <div style="background:${card};border:1px solid ${ink};border-radius:9px;flex:1"></div>
        <div style="background:${c1};border-radius:8px;height:10%"></div>`) },
    ];
  }

  // ホームページ
  const page = (inner, w = "86%") => `
    <div class="sample-stage" style="background:${dark ? "#1a1f29" : "#e9ebf2"}">
      <div style="background:${c2};width:${w};height:88%;border-radius:8px;box-shadow:0 6px 22px rgba(0,0,0,.16);padding:2.5%;display:flex;flex-direction:column;gap:2.5%;overflow:hidden">${inner}</div>
    </div>`;
  return [
    { label: "トップ画面", html: page(`
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div style="display:flex;gap:6px;align-items:center"><div style="width:14px;height:14px;border-radius:50%;background:${c1}"></div>${bar("60px", ink, 7)}</div>
        <div style="background:${c1};width:14%;height:14px;border-radius:8px"></div>
      </div>
      <div style="background:linear-gradient(135deg,${c1},${c1}bb);border-radius:8px;height:42%;display:flex;flex-direction:column;justify-content:center;gap:6%;padding:0 4%">
        ${bar("46%", "#ffffffcc", 11)}${bar("30%", "#ffffff88", 8)}</div>
      <div style="display:flex;gap:2.5%;flex:1">
        <div style="flex:1;background:${card};border:1px solid ${ink};border-radius:7px"></div>
        <div style="flex:1;background:${card};border:1px solid ${ink};border-radius:7px"></div>
        <div style="flex:1;background:${card};border:1px solid ${ink};border-radius:7px"></div>
      </div>`) },
    { label: "コンテンツ部分", html: page(`
      ${bar("34%", c1, 10)}${bar("52%", ink, 7)}
      <div style="display:flex;gap:2.5%;flex:1;padding-top:1%">
        <div style="flex:1.2;background:${c1}22;border-radius:7px"></div>
        <div style="flex:1;display:flex;flex-direction:column;gap:6%;justify-content:center">
          ${bar("90%", ink, 7)}${bar("75%", ink, 7)}${bar("85%", ink, 7)}
          <div style="background:${c1};width:34%;height:14px;border-radius:8px"></div>
        </div>
      </div>
      <div style="background:${c1};border-radius:7px;height:14%"></div>`) },
    { label: "スマホ表示", html: page(`
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div style="width:12px;height:12px;border-radius:50%;background:${c1}"></div>
        <div style="display:flex;flex-direction:column;gap:3px">${bar("16px", ink, 3)}${bar("16px", ink, 3)}</div>
      </div>
      <div style="background:linear-gradient(135deg,${c1},${c1}bb);border-radius:7px;height:30%"></div>
      <div style="background:${card};border:1px solid ${ink};border-radius:7px;flex:1"></div>
      <div style="background:${card};border:1px solid ${ink};border-radius:7px;flex:1"></div>`, "32%") },
  ];
}

let detailGalleryItems = [];
function galleryItemsFor(d) {
  // 実画像（完成イメージ）を先頭に、CSS自動生成モックを後ろに
  const photos = (d.imageUrls || []).slice(0, 10).map((u, i) => ({
    label: i === 0 ? "完成イメージ" : `画像${i + 1}`,
    img: u,
  }));
  return [...photos, ...autoSamples(d)];
}
function showSampleIdx(i) {
  const item = detailGalleryItems[i];
  if (!item) return;
  document.getElementById("gallery-main").innerHTML = item.img
    ? `<img class="gallery-img" src="${escapeHtml(item.img)}" alt="${escapeHtml(item.label)}"
        onload="this.classList.add(this.naturalHeight > this.naturalWidth * 1.3 ? 'img-tall' : 'img-wide')"
        onclick="this.classList.toggle('expanded')" title="クリックで全体表示/戻る">`
    : item.html;
  document.querySelectorAll(".gallery-thumb").forEach((b, idx) =>
    b.classList.toggle("active", idx === i));
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
  const dl = totalDownloads(d);
  const cr = findCreator(d.creator);
  pendingStars = 0;

  detailGalleryItems = galleryItemsFor(d);
  document.getElementById("detail-body").innerHTML = `
  <div class="detail-head">
    <div class="detail-gallery">
      <div class="gallery-main" id="gallery-main"></div>
      <div class="gallery-thumbs">
        ${detailGalleryItems.map((it, i) =>
          `<button type="button" class="gallery-thumb" onclick="showSampleIdx(${i})">${escapeHtml(it.label)}</button>`).join("")}
      </div>
    </div>
    <div class="detail-info">
      <div class="card-tags">
        <span class="tag tag-genre">${GENRE_ICONS[d.genre] || "🌐"} ${escapeHtml(d.genre || "ホームページ")}</span>
        ${d.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
      </div>
      <h1>${escapeHtml(d.title)}</h1>
      <div class="detail-rating">
        ${priceBadgeHtml(d)}
        ${sampleBadgeHtml(d)}
        ${isNew(d) ? `<span class="badge badge-new">NEW</span>` : ""}
        ${ratingMetaHtml(d)}
        <span class="dl-count">⬇ ${dl.toLocaleString()} DL</span>
        <span class="design-id">ID: ${d.id}</span>
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
        <button class="btn btn-primary" onclick="downloadSkill('${d.id}')">
          ${isPaid(d) ? `🛒 ¥${d.price.toLocaleString()} で購入してダウンロード` : "⬇ 無料ダウンロード（広告が表示されます）"}
        </button>
        <button class="btn btn-ghost" onclick="orderThis('${d.id}')">このデザインで制作代行を頼む</button>
      </div>
      ${isAdminUser() && cloud.designs.some(x => x.id === d.id)
        ? `<p class="admin-row">🛡 管理者: <button class="text-danger" onclick="deleteUserDesign('${d.id}')">この投稿を削除する</button></p>`
        : ""}
    </div>
  </div>

  ${(d.highlights || []).length ? `
  <section class="lp-section lp-highlight">
    <h2>✅ こんな方におすすめ</h2>
    <ul class="highlight-list">${d.highlights.map(h => `<li>${escapeHtml(h)}</li>`).join("")}</ul>
  </section>` : ""}

  ${d.longDesc ? `
  <section class="lp-section">
    <h2>このデザインについて</h2>
    ${d.longDesc.split("\n").filter(Boolean).map(p => `<p>${escapeHtml(p)}</p>`).join("")}
    <p class="lp-tools">対応AIツール: <b>Claude / Codex / Antigravity / Cursor</b> ほか、Markdownの指示を読めるAIならどれでも使えます。</p>
  </section>` : ""}

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

  showSampleIdx(0);

  // 星入力
  const starInput = document.getElementById("star-input");
  starInput.querySelectorAll("span").forEach(s => {
    s.addEventListener("click", () => {
      pendingStars = parseInt(s.dataset.v, 10);
      starInput.querySelectorAll("span").forEach(x =>
        x.classList.toggle("on", parseInt(x.dataset.v, 10) <= pendingStars));
    });
  });

  // レビュー投稿（クラウド保存）
  document.getElementById("review-form").addEventListener("submit", async e => {
    e.preventDefault();
    if (!pendingStars) { toast("★をタップして評価を選んでください"); return; }
    const review = {
      design_id: d.id,
      name: document.getElementById("rv-name").value.trim(),
      stars: pendingStars,
      body: document.getElementById("rv-text").value.trim(),
    };
    const { data, error } = await sb.from("reviews").insert(review).select().single();
    if (error) { toast("投稿に失敗しました: " + error.message); return; }
    cloud.reviews.push(data);
    toast("レビューを投稿しました！ありがとうございます");
    renderDetail(d);
  });
}

// ---------- クリエイタープロフィール ----------
function showCreator(id) {
  const cr = findCreator(id);
  if (!cr) return;
  const works = designsByCreator(id);
  const totalDl = works.reduce((s, d) => s + totalDownloads(d), 0);

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

// ---------- 認証・アカウント ----------
async function initAuth() {
  const { data } = await sb.auth.getSession();
  session = data.session;
  if (session) await loadMyProfile();
  renderHeaderAccount();

  sb.auth.onAuthStateChange(async (_event, newSession) => {
    const wasLoggedIn = !!session;
    session = newSession;
    myProfile = null;
    if (session) await loadMyProfile();
    renderHeaderAccount();
    if (!wasLoggedIn && session && !document.getElementById("view-account").hidden) {
      showAccount(); // ログイン直後にアカウント画面を更新
    }
  });
}

async function loadMyProfile() {
  if (!session) { myProfile = null; return; }
  const { data } = await sb.from("profiles").select("*").eq("id", session.user.id).maybeSingle();
  myProfile = data ? profileFromRow(data) : null;
  if (myProfile) cloud.profiles[myProfile.id] = myProfile;
}

function showAccount() {
  const body = document.getElementById("account-body");

  if (!session) {
    // 未ログイン → ログイン/新規登録フォーム
    body.innerHTML = `
    <div class="panel">
      <h1 class="panel-title">ログイン / 新規登録</h1>
      <p class="panel-lead">メールアドレスとパスワードでアカウントを作成できます。<br>
      登録すると、デザインの投稿とプロフィール公開ができるようになります。</p>
      <button type="button" class="btn btn-google" onclick="loginWithGoogle()">
        <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.5 6.1 29.5 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.5 6.1 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.4 0 10.3-2.1 14-5.4l-6.5-5.5c-2.1 1.6-4.7 2.5-7.5 2.5-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.5 5.5C36.2 40.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z"/></svg>
        Google で続行（ログイン / 新規登録）
      </button>
      <div class="auth-divider"><span>または、メールアドレスで</span></div>
      <form class="nice-form" id="auth-form">
        <label>メールアドレス<input type="email" id="auth-email" required placeholder="you@example.com"></label>
        <label>パスワード（8文字以上）<input type="password" id="auth-pass" required minlength="8" placeholder="パスワード"></label>
        <div class="ad-footer">
          <button type="button" class="btn btn-ghost" id="auth-signup">新規登録</button>
          <button type="submit" class="btn btn-primary" id="auth-login">ログイン</button>
        </div>
      </form>
    </div>`;
    showView("account");

    const email = () => document.getElementById("auth-email").value.trim();
    const pass = () => document.getElementById("auth-pass").value;

    document.getElementById("auth-form").addEventListener("submit", async e => {
      e.preventDefault();
      const { error } = await sb.auth.signInWithPassword({ email: email(), password: pass() });
      if (error) { toast("ログインできませんでした: " + error.message); return; }
      toast("ログインしました");
      showAccount();
    });
    document.getElementById("auth-signup").addEventListener("click", async () => {
      if (!email() || pass().length < 8) { toast("メールアドレスと8文字以上のパスワードを入力してください"); return; }
      const { data, error } = await sb.auth.signUp({ email: email(), password: pass() });
      if (error) { toast("登録できませんでした: " + error.message); return; }
      if (!data.session) {
        toast("確認メールを送りました。メール内のリンクを開いてからログインしてください");
        return;
      }
      toast("登録しました！続けてプロフィールを設定しましょう");
      showAccount();
    });
    return;
  }

  // ログイン済み
  const acc = myProfile || { name: "", bio: "", avatarColor: "#4f46e5", links: {} };
  const works = session ? designsByCreator(session.user.id) : [];
  body.innerHTML = `
  <div class="panel">
    <div class="panel-head-row">
      <h1 class="panel-title">${myProfile ? "マイページ" : "プロフィール設定"}</h1>
      <div>
        ${myProfile ? `<button class="btn btn-ghost btn-sm" onclick="showCreator('${session.user.id}')">公開プロフィールを確認</button>` : ""}
        <button class="btn btn-ghost btn-sm" onclick="logout()">ログアウト</button>
      </div>
    </div>
    ${myProfile ? "" : `<p class="panel-lead">あと一歩！公開用のプロフィールを設定すると投稿できるようになります。</p>`}
    <h2 class="panel-sub">プロフィール${myProfile ? "編集" : "作成"}</h2>
    ${accountFormHtml(acc, myProfile ? "保存する" : "プロフィールを作成する")}
    ${myProfile ? `
      <h2 class="panel-sub">自分の投稿（${works.length}件)</h2>
      ${works.length
        ? `<ul class="my-works">${works.map(d => `
            <li>
              <a href="#" onclick="showDetail('${d.id}'); return false;">${escapeHtml(d.title)}</a>
              <button class="text-danger" onclick="deleteUserDesign('${d.id}')">削除</button>
            </li>`).join("")}</ul>`
        : `<p class="empty-note">まだ投稿がありません。<a href="#" onclick="showSubmit(); return false;">最初のデザインを投稿してみましょう →</a></p>`}
    ` : ""}
  </div>`;
  showView("account");

  document.getElementById("account-form").addEventListener("submit", async e => {
    e.preventDefault();
    const name = document.getElementById("ac-name").value.trim();
    if (!name) return;
    const row = {
      id: session.user.id,
      name,
      initial: name.slice(0, 1),
      avatar_color: document.getElementById("ac-color").value,
      avatar_url: document.getElementById("ac-avatar-url").value.trim(),
      bio: document.getElementById("ac-bio").value.trim(),
      links: {
        homepage: document.getElementById("ac-homepage").value.trim(),
        x: document.getElementById("ac-x").value.trim(),
        instagram: document.getElementById("ac-instagram").value.trim(),
        youtube: document.getElementById("ac-youtube").value.trim(),
      },
    };
    const { error } = await sb.from("profiles").upsert(row);
    if (error) { toast("保存に失敗しました: " + error.message); return; }
    const isFirst = !myProfile;
    myProfile = profileFromRow(row);
    cloud.profiles[myProfile.id] = myProfile;
    renderHeaderAccount();
    toast(isFirst ? `ようこそ、${name}さん！これでデザインを投稿できます` : "プロフィールを保存しました");
    showAccount();
  });

  // アバターのライブプレビュー
  const updatePreview = () => {
    const preview = {
      name: document.getElementById("ac-name").value || "?",
      initial: (document.getElementById("ac-name").value || "?").slice(0, 1),
      avatarColor: document.getElementById("ac-color").value,
      avatarUrl: document.getElementById("ac-avatar-url").value.trim(),
    };
    document.getElementById("ac-avatar-preview").innerHTML = avatarHtml(preview, "lg");
  };
  ["ac-name", "ac-color", "ac-avatar-url"].forEach(id =>
    document.getElementById(id).addEventListener("input", updatePreview));
}

function accountFormHtml(acc, submitLabel) {
  const links = acc.links || {};
  return `
  <form class="nice-form" id="account-form">
    <label>表示名（必須）<input type="text" id="ac-name" required maxlength="30" value="${escapeHtml(acc.name || "")}" placeholder="例：keita design"></label>
    <label>自己紹介<textarea id="ac-bio" rows="3" maxlength="300" placeholder="どんなデザインを作っていますか？">${escapeHtml(acc.bio || "")}</textarea></label>
    <label>プロフィール画像URL
      <div class="avatar-input-row">
        <span id="ac-avatar-preview">${avatarHtml(acc.name ? acc : { ...acc, name: "?", initial: "?" }, "lg")}</span>
        <input type="url" id="ac-avatar-url" value="${escapeHtml(acc.avatarUrl || "")}" placeholder="https://...（XやインスタのアイコンのURLでもOK）">
      </div>
      <span class="form-hint">SNSと同じアイコンにすると、フォロワーがあなただと分かりやすくなります。空欄なら下の色＋頭文字になります。</span>
    </label>
    <label>アバターカラー（画像がない場合に使用）<input type="color" id="ac-color" value="${acc.avatarColor || "#4f46e5"}"></label>
    <label>🌐 ホームページURL<input type="url" id="ac-homepage" value="${escapeHtml(links.homepage || "")}" placeholder="https://..."></label>
    <label>𝕏 X (Twitter) URL<input type="url" id="ac-x" value="${escapeHtml(links.x || "")}" placeholder="https://x.com/..."></label>
    <label>📷 Instagram URL<input type="url" id="ac-instagram" value="${escapeHtml(links.instagram || "")}" placeholder="https://instagram.com/..."></label>
    <label>▶ YouTube URL<input type="url" id="ac-youtube" value="${escapeHtml(links.youtube || "")}" placeholder="https://youtube.com/..."></label>
    <button type="submit" class="btn btn-primary btn-block">${submitLabel}</button>
  </form>`;
}

async function loginWithGoogle() {
  const { error } = await sb.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: location.origin + location.pathname },
  });
  if (error) {
    toast("Googleログインを開始できませんでした: " + error.message);
  }
  // 成功時はGoogleの画面へ遷移し、戻ってきたら onAuthStateChange がログインを検知する
}

async function logout() {
  await sb.auth.signOut();
  session = null;
  myProfile = null;
  renderHeaderAccount();
  toast("ログアウトしました");
  showHome();
}

async function deleteUserDesign(id) {
  if (!confirm("この投稿を削除しますか？")) return;
  const { error } = await sb.from("designs").delete().eq("id", id);
  if (error) { toast("削除に失敗しました: " + error.message); return; }
  cloud.designs = cloud.designs.filter(d => d.id !== id);
  toast("投稿を削除しました");
  if (!document.getElementById("view-admin").hidden) renderAdmin();
  else if (!document.getElementById("view-account").hidden) showAccount();
  else showHome();
}

// ---------- 管理ページ（管理者のみ・全部日本語） ----------
function showAdmin() {
  if (!isAdminUser()) { toast("管理者のみアクセスできます"); return; }
  renderAdmin();
  showView("admin");
}

function renderAdmin() {
  const users = Object.values(cloud.profiles);
  const designs = cloud.designs; // 投稿されたデザイン（シードは除く）
  const reviews = cloud.reviews;
  const totalDl = allDesigns().reduce((s, d) => s + totalDownloads(d), 0);

  const designRows = designs.length ? designs.map(d => {
    const cr = findCreator(d.creator);
    return `<tr>
      <td><a href="#" onclick="showDetail('${d.id}'); return false;">${escapeHtml(d.title)}</a></td>
      <td>${escapeHtml(cr.name)}</td>
      <td>${isPaid(d) ? "¥" + d.price.toLocaleString() : "無料"}</td>
      <td>${d.createdAt}</td>
      <td>${totalDownloads(d).toLocaleString()}</td>
      <td><button class="text-danger" onclick="deleteUserDesign('${d.id}')">削除</button></td>
    </tr>`;
  }).join("") : `<tr><td colspan="6" class="empty-note">ユーザー投稿はまだありません（サンプル6作品は管理対象外）</td></tr>`;

  const reviewRows = reviews.length ? [...reviews].reverse().map(r => {
    const d = findDesign(r.design_id);
    return `<tr>
      <td>${d ? escapeHtml(d.title) : "（削除済みの投稿）"}</td>
      <td>${escapeHtml(r.name)}</td>
      <td>${"★".repeat(r.stars)}</td>
      <td class="review-body-cell">${escapeHtml(r.body)}</td>
      <td>${(r.created_at || "").slice(0, 10)}</td>
      <td><button class="text-danger" onclick="deleteReviewAdmin('${r.id}')">削除</button></td>
    </tr>`;
  }).join("") : `<tr><td colspan="6" class="empty-note">レビューはまだありません</td></tr>`;

  const userRows = users.map(u => {
    const works = designsByCreator(u.id).length;
    return `<tr>
      <td>${avatarHtml(u, "sm")} ${escapeHtml(u.name)}</td>
      <td>${u.isAdmin ? "🛡 管理者" : "一般"}</td>
      <td>${works}</td>
      <td><a href="#" onclick="showCreator('${u.id}'); return false;">プロフィール</a></td>
    </tr>`;
  }).join("");

  document.getElementById("admin-body").innerHTML = `
  <h1 class="panel-title">🛡 管理ページ</h1>
  <p class="panel-lead">サイトの運営状況の確認と、投稿・レビューの管理ができます（このページは管理者にしか表示されません）。</p>

  <div class="stat-grid">
    <div class="stat-card"><div class="stat-num">${users.length.toLocaleString()}</div><div class="stat-label">登録ユーザー</div></div>
    <div class="stat-card"><div class="stat-num">${designs.length.toLocaleString()}</div><div class="stat-label">ユーザー投稿</div></div>
    <div class="stat-card"><div class="stat-num">${reviews.length.toLocaleString()}</div><div class="stat-label">レビュー</div></div>
    <div class="stat-card"><div class="stat-num">${totalDl.toLocaleString()}</div><div class="stat-label">累計ダウンロード</div></div>
  </div>

  <div class="panel admin-section">
    <h2 class="panel-sub-plain">📋 投稿の管理（${designs.length}件）</h2>
    <div class="table-wrap">
      <table class="admin-table">
        <thead><tr><th>デザイン名</th><th>投稿者</th><th>料金</th><th>公開日</th><th>DL数</th><th></th></tr></thead>
        <tbody>${designRows}</tbody>
      </table>
    </div>
  </div>

  <div class="panel admin-section">
    <h2 class="panel-sub-plain">💬 レビューの管理（${reviews.length}件）</h2>
    <div class="table-wrap">
      <table class="admin-table">
        <thead><tr><th>対象デザイン</th><th>名前</th><th>評価</th><th>コメント</th><th>日付</th><th></th></tr></thead>
        <tbody>${reviewRows}</tbody>
      </table>
    </div>
  </div>

  <div class="panel admin-section">
    <h2 class="panel-sub-plain">👥 ユーザー一覧（${users.length}人）</h2>
    <div class="table-wrap">
      <table class="admin-table">
        <thead><tr><th>名前</th><th>権限</th><th>投稿数</th><th></th></tr></thead>
        <tbody>${userRows}</tbody>
      </table>
    </div>
    <p class="form-hint">💡 管理者権限の付与・剥奪は安全のためこの画面からはできません（データベース側でのみ変更可能）。</p>
  </div>`;
}

async function deleteReviewAdmin(id) {
  if (!confirm("このレビューを削除しますか？")) return;
  const { error } = await sb.from("reviews").delete().eq("id", id);
  if (error) { toast("削除に失敗しました: " + error.message); return; }
  cloud.reviews = cloud.reviews.filter(r => r.id !== id);
  toast("レビューを削除しました");
  renderAdmin();
}

// ---------- デザイン投稿 ----------
function showSubmit() {
  const body = document.getElementById("submit-body");

  if (!session || !myProfile) {
    body.innerHTML = `
    <div class="panel center">
      <h1 class="panel-title">デザインを投稿するには</h1>
      <p class="panel-lead">投稿には${!session ? "アカウント登録" : "プロフィール設定"}が必要です。<br>1分で終わります。</p>
      <button class="btn btn-primary" onclick="showAccount()">${!session ? "ログイン / 新規登録へ" : "プロフィールを設定する"}</button>
    </div>`;
    showView("submit");
    return;
  }

  body.innerHTML = `
  <div class="panel">
    <h1 class="panel-title">デザインを投稿</h1>
    <p class="panel-lead">あなたのデザインの「作り方」をスキルとして共有しましょう。投稿者として「${escapeHtml(myProfile.name)}」が表示されます。</p>
    <form class="nice-form" id="submit-form">
      <label>ジャンル（必須）<select id="sb-genre">${GENRES.map(g => `<option>${g}</option>`).join("")}</select></label>
      <label>デザイン名（必須）<input type="text" id="sb-title" required maxlength="40" placeholder="例：ネオン・ダークLP"></label>
      <label>タグ（カンマ区切り・3つまで）<input type="text" id="sb-tags" placeholder="例：LP, ダーク, 個人開発"></label>
      <label>説明文（必須・一覧に表示される短い紹介）<textarea id="sb-desc" rows="3" required maxlength="200" placeholder="どんなサイト/資料/アプリ向けの、どんなデザインですか？"></textarea></label>
      <label>こんな方におすすめ（1行に1つ・3つまで）<textarea id="sb-highlights" rows="3" placeholder="例：&#10;個人開発のLPを今っぽくしたい方&#10;デザイナーなしでUIを整えたいチーム"></textarea></label>
      <label>詳しい説明（商品ページに表示される紹介文）<textarea id="sb-longdesc" rows="5" maxlength="1000" placeholder="このデザインの特徴・どんな場面で使えるか・工夫した点などを自由に。空行で段落を分けられます。"></textarea></label>
      <label>使用例画像のURL（1行に1つ・10枚まで）
        <textarea id="sb-images" rows="3" placeholder="https://...png&#10;https://...jpg"></textarea>
        <span class="form-hint">実際にこのスキルで作った画面のスクリーンショットがあると、ダウンロード率が大きく上がります。</span>
      </label>
      <div class="color-row">
        <label>カテゴリ<select id="sb-category">${CATEGORIES.map(c => `<option>${c}</option>`).join("")}</select></label>
        <label>カラー系統<select id="sb-colortone">${COLOR_TONES.map(c => `<option>${c}</option>`).join("")}</select></label>
      </div>
      <label>料金（円・0で無料）<input type="number" id="sb-price" value="0" min="0" max="50000" step="100"></label>
      <p class="form-hint">💡 有料にした場合、購入時の決済機能は現在準備中です（価格表示と購入フローのみ動きます）。</p>
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

  document.getElementById("submit-form").addEventListener("submit", async e => {
    e.preventDefault();
    const title = document.getElementById("sb-title").value.trim();
    const tags = document.getElementById("sb-tags").value
      .split(/[,、，]/).map(t => t.trim()).filter(Boolean).slice(0, 3);
    const features = document.getElementById("sb-features").value
      .split("\n").map(f => f.trim()).filter(Boolean).slice(0, 4);
    const c1 = document.getElementById("sb-color1").value;
    const c2 = document.getElementById("sb-color2").value;

    const highlights = document.getElementById("sb-highlights").value
      .split("\n").map(h => h.trim()).filter(Boolean).slice(0, 3);
    const imageUrls = document.getElementById("sb-images").value
      .split("\n").map(u => u.trim()).filter(u => /^https?:\/\//.test(u)).slice(0, 10);

    const row = {
      id: "d-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      creator: session.user.id,
      title,
      tags: tags.length ? tags : ["オリジナル"],
      description: document.getElementById("sb-desc").value.trim(),
      genre: document.getElementById("sb-genre").value,
      category: document.getElementById("sb-category").value,
      color_tone: document.getElementById("sb-colortone").value,
      price: Math.max(0, parseInt(document.getElementById("sb-price").value, 10) || 0),
      features,
      highlights,
      long_desc: document.getElementById("sb-longdesc").value.trim(),
      image_urls: imageUrls,
      sample_spec: { c1, c2 },
      thumb: genThumb(c1, c2),
      skill: document.getElementById("sb-skill").value,
    };
    const { data, error } = await sb.from("designs").insert(row).select().single();
    if (error) { toast("公開に失敗しました: " + error.message); return; }
    cloud.designs.unshift(designFromRow(data));
    toast("デザインを公開しました！🎉");
    showDetail(data.id);
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
// 無料 → 広告ポップアップを挟んでDL ／ 有料 → 購入モーダル（決済はデモ）
function downloadSkill(id) {
  const d = findDesign(id);
  if (!d) return;
  if (isAdminUser()) { doDownload(id); return; } // 管理者は広告・購入なしで即DL
  if (isPaid(d)) openPurchaseModal(d);
  else openAdModal(d);
}

async function doDownload(id) {
  const d = findDesign(id);
  if (!d) return;
  const blob = new Blob([d.skill], { type: "text/markdown;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${d.id}-SKILL.md`;
  a.click();
  URL.revokeObjectURL(a.href);
  closeModal();
  toast("スキルファイルをダウンロードしました。Claude に渡して使ってください！");
  // DL数をクラウドでカウント
  const { error } = await sb.rpc("bump_download", { d_id: id });
  if (!error) cloud.stats[id] = (cloud.stats[id] || 0) + 1;
}

// ---------- モーダル ----------
let adTimer;
function openModal(html) {
  closeModal();
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.id = "modal-overlay";
  overlay.innerHTML = `<div class="modal">${html}</div>`;
  overlay.addEventListener("click", e => { if (e.target === overlay) closeModal(); });
  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden";
}
function closeModal() {
  clearInterval(adTimer);
  const el = document.getElementById("modal-overlay");
  if (el) el.remove();
  document.body.style.overflow = "";
}

// 広告ポップアップ（5秒カウントダウン後にDLボタンが有効になる）
const AD_WAIT = 5;
function openAdModal(d) {
  openModal(`
    <div class="ad-label">広告</div>
    <div class="ad-box">
      <p class="ad-eyebrow">🎨 Design Skill Market からのお知らせ</p>
      <h3 class="ad-title">あなたのデザイン、スキルにして出品しませんか？</h3>
      <p class="ad-text">アカウントを作れば誰でもデザインスキルを公開できます。
      有料出品にも今後対応予定。あなたの設計ノウハウが誰かのサイトになります。</p>
      <button class="btn btn-ghost btn-sm" onclick="closeModal(); showSubmit()">投稿について見てみる</button>
    </div>
    <div class="ad-footer">
      <span class="ad-note">広告なしでDLできる有料プランを準備中です</span>
      <button class="btn btn-primary" id="ad-dl-btn" disabled>あと ${AD_WAIT} 秒…</button>
    </div>
  `);
  let remain = AD_WAIT;
  adTimer = setInterval(() => {
    remain--;
    const btn = document.getElementById("ad-dl-btn");
    if (!btn) { clearInterval(adTimer); return; }
    if (remain > 0) {
      btn.textContent = `あと ${remain} 秒…`;
    } else {
      clearInterval(adTimer);
      btn.disabled = false;
      btn.textContent = "⬇ ダウンロードへ進む";
      btn.onclick = () => doDownload(d.id);
    }
  }, 1000);
}

// 購入モーダル（決済は未実装のデモ。Stripe導入で置き換える）
function openPurchaseModal(d) {
  const cr = findCreator(d.creator);
  openModal(`
    <h3 class="modal-title">🛒 スキルを購入</h3>
    <div class="purchase-row">
      <div>
        <div class="purchase-name">${escapeHtml(d.title)}</div>
        <div class="purchase-creator">by ${escapeHtml(cr.name)}</div>
      </div>
      <div class="purchase-price">¥${d.price.toLocaleString()}</div>
    </div>
    <p class="ad-note">⚠️ 決済機能は準備中です。今はデモとして、購入の流れだけ体験できます（実際の請求はありません）。</p>
    <div class="ad-footer">
      <button class="btn btn-ghost btn-sm" onclick="closeModal()">キャンセル</button>
      <button class="btn btn-primary" onclick="doDownload('${d.id}')">（デモ）購入してダウンロード</button>
    </div>
  `);
}

// ---------- 制作代行 ----------
function setOrderDesign(id, title) {
  document.getElementById("order-design-id").value = id || "";
  document.getElementById("order-design-label").value = title || "未定・相談したい";
}

function openDesignPicker() {
  openModal(`
    <h3 class="modal-title">ベースにしたいデザインを選ぶ</h3>
    <input type="search" id="picker-q" class="search-box" placeholder="🔍 デザイン名・タグで検索">
    <div class="picker-list" id="picker-list"></div>
  `);
  const render = (q = "") => {
    const needle = q.trim().toLowerCase();
    const list = allDesigns().filter(d =>
      !needle ||
      [d.title, d.desc, d.genre, d.category, ...(d.tags || [])].join(" ").toLowerCase().includes(needle));
    document.getElementById("picker-list").innerHTML = `
      <button type="button" class="picker-item" onclick="setOrderDesign('', ''); closeModal()">
        <span class="picker-title">未定・相談したい</span>
        <span class="picker-sub">デザインを決めずに相談する</span>
      </button>
      ${list.map(d => {
        const cr = findCreator(d.creator);
        return `
        <button type="button" class="picker-item"
          onclick="setOrderDesign('${d.id}', '${escapeHtml(d.title)}'); closeModal()">
          <span class="picker-title">${escapeHtml(d.title)} ${isPaid(d) ? `<span class="badge badge-paid">¥${d.price.toLocaleString()}</span>` : ""}</span>
          <span class="picker-sub">by ${escapeHtml(cr.name)}　<code>ID: ${d.id}</code></span>
        </button>`;
      }).join("")}
      ${list.length === 0 ? `<p class="empty-note">見つかりませんでした</p>` : ""}`;
  };
  render();
  document.getElementById("picker-q").addEventListener("input", e => render(e.target.value));
}

function orderThis(id) {
  const d = findDesign(id);
  showHome();
  setTimeout(() => {
    if (d) setOrderDesign(d.id, d.title);
    document.getElementById("order").scrollIntoView({ behavior: "smooth" });
  }, 50);
}

function buildOrderMailto() {
  const name = document.getElementById("order-name").value.trim();
  const email = document.getElementById("order-email").value.trim();
  const designId = document.getElementById("order-design-id").value;
  const designTitle = document.getElementById("order-design-label").value;
  const design = designId ? `${designTitle}（ID: ${designId}）` : "未定・相談したい";
  const msg = document.getElementById("order-message").value.trim();
  const subject = encodeURIComponent(`【制作代行のご相談】${name}様より`);
  const body = encodeURIComponent(
`お名前: ${name}
ご連絡先: ${email}
ベースデザイン: ${design}

--- ご相談内容 ---
${msg}

（Design Skill Market の代行フォームから送信）`);
  return `mailto:${ORDER_EMAIL}?subject=${subject}&body=${body}`;
}

document.getElementById("order-form").addEventListener("submit", e => {
  e.preventDefault();
  location.href = buildOrderMailto();
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
(async function init() {
  initFilterBar();
  renderGallery(); // まずシードデザインを即表示
  renderHeaderAccount();
  await Promise.all([initAuth(), loadCloudData()]);
  renderGenreTabs(); // 件数を更新
  renderGallery();   // クラウドの投稿・レビュー・DL数を反映
})();
