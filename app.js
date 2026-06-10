// ===== Design Skill Market アプリロジック（Supabase版） =====
// アカウント・投稿・レビュー・DL数は Supabase に保存され、全ユーザーで共有される。
// data.js のシードデザイン6件はコード内に持ち、クラウドの投稿とマージして表示する。

const ORDER_EMAIL = "megupen.sab@gmail.com";

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const CATEGORIES = ["コーポレート", "LP・サービス", "店舗・飲食", "医療・クリニック", "ポートフォリオ", "和風・旅館", "その他"];
const COLOR_TONES = ["ブルー系", "ダーク系", "グリーン系", "ブラウン系", "ベージュ・和色系", "モノクロ系", "その他"];
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
    category: r.category || "その他",
    colorTone: r.color_tone || "その他",
    price: r.price || 0,
    features: r.features || [],
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
    bio: r.bio || "",
    links: r.links || {},
  };
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
const filters = { q: "", category: "", color: "", price: "", sort: "recommend" };

function isNew(d) {
  if (!d.createdAt) return false;
  return (Date.now() - new Date(d.createdAt).getTime()) / 86400000 <= NEW_DAYS;
}
function isPaid(d) {
  return (d.price || 0) > 0;
}

function filteredDesigns() {
  let list = allDesigns().filter(d => {
    if (filters.category && (d.category || "その他") !== filters.category) return false;
    if (filters.color && (d.colorTone || "その他") !== filters.color) return false;
    if (filters.price === "free" && isPaid(d)) return false;
    if (filters.price === "paid" && !isPaid(d)) return false;
    if (filters.q) {
      const q = filters.q.toLowerCase();
      const haystack = [d.title, d.desc, d.category, d.colorTone, ...(d.tags || []), ...(d.features || [])]
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

function priceBadgeHtml(d) {
  return isPaid(d)
    ? `<span class="badge badge-paid">¥${d.price.toLocaleString()}</span>`
    : `<span class="badge badge-free">無料</span>`;
}

function cardHtml(d) {
  const dl = totalDownloads(d);
  const cr = findCreator(d.creator);
  return `
  <article class="design-card" onclick="showDetail('${d.id}')">
    <div class="badge-row">
      ${priceBadgeHtml(d)}
      ${isNew(d) ? `<span class="badge badge-new">NEW</span>` : ""}
    </div>
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
  const list = filteredDesigns();
  const grid = document.getElementById("card-grid");
  grid.innerHTML = list.length
    ? list.map(cardHtml).join("")
    : `<p class="empty-note no-hit">条件に合うデザインが見つかりませんでした。条件をクリアして探し直してみてください。</p>`;
  const hasFilter = filters.q || filters.category || filters.color || filters.price;
  document.getElementById("result-count").textContent =
    hasFilter ? `${list.length}件のデザインが見つかりました` : `全${list.length}件のデザイン`;
}

function initFilterBar() {
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
    Object.assign(filters, { q: "", category: "", color: "", price: "", sort: "recommend" });
    document.getElementById("f-q").value = "";
    ["f-category", "f-color", "f-price"].forEach(id => document.getElementById(id).value = "");
    document.getElementById("f-sort").value = "recommend";
    renderGallery();
  });
}

function renderHeaderAccount() {
  const el = document.getElementById("nav-account");
  if (myProfile) el.textContent = `👤 ${myProfile.name}`;
  else if (session) el.textContent = "プロフィール設定";
  else el.textContent = "ログイン / 登録";
}

// ---------- ビュー切り替え ----------
const VIEWS = ["home", "detail", "creator", "account", "submit"];
function showView(name) {
  VIEWS.forEach(v => document.getElementById("view-" + v).hidden = (v !== name));
  window.scrollTo({ top: 0 });
}

function showHome() {
  renderGallery();
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
  const dl = totalDownloads(d);
  const cr = findCreator(d.creator);
  pendingStars = 0;

  document.getElementById("detail-body").innerHTML = `
  <div class="detail-head">
    <div class="detail-thumb">${d.thumb}</div>
    <div class="detail-info">
      <div class="card-tags">${d.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("")}</div>
      <h1>${escapeHtml(d.title)}</h1>
      <div class="detail-rating">
        ${priceBadgeHtml(d)}
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
  showAccount();
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
      <label>デザイン名（必須）<input type="text" id="sb-title" required maxlength="40" placeholder="例：ネオン・ダークLP"></label>
      <label>タグ（カンマ区切り・3つまで）<input type="text" id="sb-tags" placeholder="例：LP, ダーク, 個人開発"></label>
      <label>説明文（必須）<textarea id="sb-desc" rows="3" required maxlength="200" placeholder="どんなサイト向けの、どんなデザインですか？"></textarea></label>
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

    const row = {
      id: "d-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      creator: session.user.id,
      title,
      tags: tags.length ? tags : ["オリジナル"],
      description: document.getElementById("sb-desc").value.trim(),
      category: document.getElementById("sb-category").value,
      color_tone: document.getElementById("sb-colortone").value,
      price: Math.max(0, parseInt(document.getElementById("sb-price").value, 10) || 0),
      features,
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
      [d.title, d.desc, d.category, ...(d.tags || [])].join(" ").toLowerCase().includes(needle));
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
  renderGallery(); // クラウドの投稿・レビュー・DL数を反映
})();
