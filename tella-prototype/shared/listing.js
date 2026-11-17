// Renders the mobile product page. Each prototype calls renderListing() and can
// pass `slots` to inject its own story section without copying the whole page:
//   slots.heroOverlay     → extra buttons/badges on top of the main photo gallery
//   slots.afterTitle      → right under "Made by …"
//   slots.afterFacts      → right under the delivery / shipping / ratings strip
//   slots.story           → story-first layout only: between item details and checkout
//   slots.description     → replaces the item description in "Item details"
//   slots.afterDescription → below the description, before "See full description"
//   slots.beforeSeller    → above "Meet your seller"

const I = {
  back: `<svg width="22" height="22" viewBox="0 0 24 24"><path d="M15 4 7 12l8 8" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  message: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 4.5A1.5 1.5 0 0 1 4.5 3h15A1.5 1.5 0 0 1 21 4.5v11a1.5 1.5 0 0 1-1.5 1.5H9l-5 4v-4h.5H4.5A1.5 1.5 0 0 1 3 15.5z"/><circle cx="8" cy="10" r="1.4" fill="#fff"/><circle cx="12" cy="10" r="1.4" fill="#fff"/><circle cx="16" cy="10" r="1.4" fill="#fff"/></svg>`,
  heart: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path stroke="currentColor" stroke-width="2.2" d="M12 20s-7-4.3-9.3-8.6C1.2 8.4 2.9 5 6.2 4.7c2.1-.2 3.8.9 5.8 3.1 2-2.2 3.7-3.3 5.8-3.1 3.3.3 5 3.7 3.5 6.7C19 15.7 12 20 12 20z"/></svg>`,
  heartSm: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path stroke="currentColor" stroke-width="2.4" d="M12 20s-7-4.3-9.3-8.6C1.2 8.4 2.9 5 6.2 4.7c2.1-.2 3.8.9 5.8 3.1 2-2.2 3.7-3.3 5.8-3.1 3.3.3 5 3.7 3.5 6.7C19 15.7 12 20 12 20z"/></svg>`,
  heartFill: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 21s-7.5-4.6-10-9.3C.4 8.5 2.2 4.5 6 4.1c2.3-.2 4.1 1 6 3.1 1.9-2.1 3.7-3.3 6-3.1 3.8.4 5.6 4.4 4 7.6C19.5 16.4 12 21 12 21z"/></svg>`,
  share: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V3M7.5 7.5 12 3l4.5 4.5"/><path d="M8 10H5v11h14V10h-3"/></svg>`,
  scan: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M3 8V4h4M17 4h4v4M21 16v4h-4M7 20H3v-4"/><circle cx="11" cy="11" r="3"/><path d="m13.5 13.5 2.5 2.5"/></svg>`,
  star: s => `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"/></svg>`,
  arrow: `<svg width="18" height="18" viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  caret: `<svg width="12" height="12" viewBox="0 0 24 24"><path fill="currentColor" d="M4 8h16l-8 9z"/></svg>`,
  chevronUp: `<svg width="20" height="20" viewBox="0 0 24 24"><path d="m5 15 7-7 7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  info: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9.5"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.4 2.3c-.6.3-.9.8-.9 1.4v.3" stroke-linecap="round"/><circle cx="12" cy="17" r=".8" fill="currentColor"/></svg>`,
  apple: `<svg width="18" height="20" viewBox="0 0 17 20"><path fill="#fff" d="M14.1 10.6c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8C4.2 5.1 2.6 6.1 1.8 7.6c-1.7 2.9-.4 7.2 1.2 9.6.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.1-1.2 2.9-2.4.9-1.3 1.3-2.6 1.3-2.7 0 0-2.4-1-2.4-3.9zM11.7 3.5c.7-.8 1.1-1.9 1-3-.9 0-2.1.6-2.8 1.4-.6.7-1.2 1.8-1 2.9 1.1.1 2.1-.5 2.8-1.3z"/></svg>`,
  material: `<svg width="22" height="22" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="2" fill="currentColor"/><path d="M6 13l7-7M6 18l12-12M11 18l7-7" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  order: `<svg width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M8 2h8v3H8z"/><path fill="currentColor" d="M5 4h2v3h10V4h2v18H5z"/><path d="M8 11h8M8 15h8M8 19h5" stroke="#fff" stroke-width="1.8"/></svg>`,
  calendar: `<svg width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M2 5h20v17H2z"/><path fill="currentColor" d="M6 2h2v4H6zM16 2h2v4h-2z"/><path fill="#fff" d="M4 10h16v10H4z"/><path fill="currentColor" d="M14 13h4v4h-4z"/></svg>`,
  truck: `<svg width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M3 4h18v14h-1v2h-3v-2H7v2H4v-2H3z"/><path fill="#fff" d="M5 6h14v5H5z"/><circle cx="7" cy="14.5" r="1.3" fill="#fff"/><circle cx="17" cy="14.5" r="1.3" fill="#fff"/></svg>`,
  returns: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20V10a5 5 0 0 1 10 0v10"/><path d="m14 17 3 3 3-3"/></svg>`,
  shield: `<svg width="40" height="40" viewBox="0 0 24 24"><path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z" fill="#CFE3F7" stroke="#222" stroke-width="1.8" stroke-linejoin="round"/><path d="m8.5 12 2.5 2.5 4.5-5" fill="none" stroke="#222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  etsy: `<svg width="22" height="22" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" fill="currentColor"/><text x="12" y="17.5" text-anchor="middle" font-family="Georgia,serif" font-size="15" fill="#fff">E</text></svg>`,
  medal: `<svg width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M4 2h4l4 6 4-6h4l-5.5 8.5A6.5 6.5 0 1 1 9.5 10.5z"/><circle cx="12" cy="16" r="4" fill="#fff"/><path fill="currentColor" d="m12 13.2.9 1.8 2 .3-1.4 1.4.3 2-1.8-.9-1.8.9.3-2-1.4-1.4 2-.3z"/></svg>`,
  starSeller: `<svg class="star-seller" viewBox="0 0 24 24" aria-label="Star Seller"><path fill="#9560E8" d="M12 1.5l2.4 2.1 3.2-.4 1 3 3 1-.4 3.2 2.1 2.4-2.1 2.4.4 3.2-3 1-1 3-3.2-.4L12 22.5l-2.4-2.1-3.2.4-1-3-3-1 .4-3.2L.7 12l2.1-2.4-.4-3.2 3-1 1-3 3.2.4z"/><path fill="#fff" d="M12 6.8l1.5 3.2 3.4.4-2.5 2.4.6 3.4-3-1.7-3 1.7.6-3.4-2.5-2.4 3.4-.4z"/></svg>`,
  home: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3 2 11h3v10h5v-6h4v6h5V11h3z"/></svg>`,
  search: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" stroke-width="3"/><path d="m15.5 15.5 5 5" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/></svg>`,
  user: `<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="7.5" r="4.5" fill="currentColor"/><path fill="currentColor" d="M3 21c0-4.4 4-7.5 9-7.5s9 3.1 9 7.5z"/></svg>`,
  cart: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M1.5 3h3.3l.7 2.5H22l-2.4 9H7.9l.5 2H19v2H6.9L3.3 5H1.5zM9 20.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm10 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg>`,
  bellOff: `<svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22a2.5 2.5 0 0 0 2.5-2.5h-5A2.5 2.5 0 0 0 12 22zm7-5V11a7 7 0 0 0-5.5-6.8V3.5a1.5 1.5 0 0 0-3 0v.7A7 7 0 0 0 5 11v6l-2 2v.5h18V19z"/><path d="M3 3l18 18" stroke="currentColor" stroke-width="2.4"/></svg>`,
  signal: `<svg width="20" height="13" viewBox="0 0 20 13"><rect x="0" y="9" width="3.5" height="4" rx="1" fill="currentColor"/><rect x="5.3" y="6" width="3.5" height="7" rx="1" fill="currentColor"/><rect x="10.6" y="3" width="3.5" height="10" rx="1" fill="currentColor"/><rect x="15.9" y="0" width="3.5" height="13" rx="1" fill="currentColor" opacity=".3"/></svg>`,
  wifi: `<svg width="18" height="13" viewBox="0 0 18 13"><path fill="currentColor" d="M9 13 6.3 10a3.8 3.8 0 0 1 5.4 0zM3.6 7.2a7.7 7.7 0 0 1 10.8 0l-1.4 1.5a5.6 5.6 0 0 0-8 0zM.8 4.3a11.7 11.7 0 0 1 16.4 0l-1.4 1.5a9.6 9.6 0 0 0-13.6 0z"/></svg>`,
  battery: `<svg width="28" height="13" viewBox="0 0 28 13"><rect x=".5" y=".5" width="24" height="12" rx="3.5" fill="none" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="21" height="9" rx="2" fill="#34C759"/><rect x="25.5" y="4" width="2" height="5" rx="1" fill="currentColor" opacity=".4"/><path d="M13.5 2.5 9.5 7h3l-1 3.5 4-4.5h-3z" fill="#111"/></svg>`,
};

const money = n => `$${n.toFixed(2)}`;
const stars = n => Array.from({ length: n }, () => I.star(18)).join("");

// Exported so other screens (e.g. search results) can reuse the phone chrome and icons.
export const icons = I;
export const statusBar = () => `<div class="status-bar"><span class="time">2:05 ${I.bellOff}</span><span class="sys">${I.signal}${I.wifi}${I.battery}</span></div>`;
export const tabBar = (active = "Home") => `
  <nav class="tab-bar glass">
    ${[["Home", I.home], ["Shop", I.search], ["Favorites", I.heartFill], ["You", I.user], ["Cart", I.cart]]
      .map(([n, ic]) => `<a href="#" class="${n === active ? "on" : ""}">${ic}${n}</a>`).join("")}
  </nav>`;

function chrome() {
  return `
  ${statusBar()}
  <div class="top-actions">
    <button class="circle-btn glass" aria-label="Back">${I.back}</button>
    <span class="spacer"></span>
    <button class="circle-btn glass" aria-label="Message">${I.message}</button>
    <div class="pill-btns glass"><button aria-label="Favorite">${I.heart}</button><button aria-label="Share">${I.share}</button></div>
  </div>`;
}

function hero(l, slots = {}) {
  const dots = l.images.map((_, i) => `<i class="${i === l.videoIndex ? "vid" : ""}${i === 0 ? " on" : ""}"></i>`).join("");
  return `
  <div class="hero">
    <div class="gallery" id="gallery">${l.images.map((src, i) => `<img src="${src}" alt="Product photo ${i + 1}">`).join("")}</div>
    <button class="find-similar glass" aria-label="Find similar">${I.scan}</button>
    <div class="dots" id="dots">${dots}</div>
    ${slots.heroOverlay || ""}
  </div>`;
}

function productHeader(l, s, slots) {
  return `
  <section class="section" style="padding-top:0">
    <span class="tag">${l.badge}</span>
    <div class="price">${money(l.price)}</div>
    <h1 class="title">${l.title}</h1>
    <div class="made-by">Made by <a href="#seller">${s.shopName}</a>${s.starSeller ? I.starSeller : ""}</div>
    ${slots.afterTitle || ""}
    <div class="facts">
      <div><div class="k">Est. delivery</div><div class="v">${l.estDelivery.replace("–", "—")}</div></div>
      <div><div class="k">Shipping</div><div class="v">${l.shipping}</div></div>
      <div><div class="k">Ratings (${l.ratingsCount})</div><div class="v">${I.star(17)} ${l.shopRating} ${I.arrow}</div></div>
    </div>
    ${slots.afterFacts || ""}`;
}

function checkout(l) {
  return `
    ${l.options.map(o => `
      <label class="select"><span class="k">${o.label}</span><span class="v"><span class="chosen">Select an option</span>${I.caret}</span>
        <select aria-label="${o.label}"><option value="">Select an option</option>${o.choices.map(c => `<option>${c}</option>`).join("")}</select>
      </label>`).join("")}
    <div class="klarna">Pay over time with <b>Klarna.</b> ${I.info}</div>
    <div class="btn-row" id="primary-buttons">
      <button class="btn outline">Add to cart</button>
      <button class="btn black">Buy with ${I.apple}Pay</button>
    </div>
    <button class="btn outline">Make an offer</button>
    <p class="fine">By making a purchase, you agree to Etsy's <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.</p>`;
}

function reviews(r) {
  return `
  <section class="section">
    <div class="collapse-head"><h2 class="section-title">Item reviews</h2>${I.chevronUp}</div>
    <div class="score">
      <div><div class="big">${r.average.toFixed(1)}${I.star(34)}</div><div class="count">${r.count} item reviews</div></div>
      <div class="bars">${r.breakdown.map(b => `<span>${b.label}</span><span class="bar"><span style="width:${b.value / 5 * 100}%"></span></span><span class="num">${b.value.toFixed(1)}</span>`).join("")}</div>
    </div>
    <div class="subhead">Photos from reviews <a href="#">See all ${I.arrow}</a></div>
    <div class="hscroll review-photos">${r.photos.map(p => `<img src="${p}" alt="Buyer photo">`).join("")}</div>
    <div class="subhead" style="margin-top:28px">Reviews</div>
    <div class="hscroll review-tags" style="margin-top:0">${r.tags.map(t => `<button class="chip">${t}</button>`).join("")}</div>
    <div class="hscroll review-cards">${r.items.map(it => `
      <div class="review-card"><div class="stars">${stars(it.stars)}</div><p>${it.text}</p><div class="by">${it.author} · ${it.when}</div></div>`).join("")}
    </div>
    <div class="verified">All reviews are from verified buyers</div>
    <button class="btn outline">Show all item reviews (${r.count})</button>
  </section>`;
}

function itemDetails(l, slots) {
  return `
  <section class="section">
    <h2 class="section-title">Item details</h2>
    <div class="hscroll detail-cards">${l.itemDetails.map(d => `
      <div class="card">${I[d.icon]}<div class="k">${d.label}</div><div class="v">${d.value}</div></div>`).join("")}
    </div>
    ${slots.description ?? `<div class="description clamped" id="desc">${l.description}</div>`}
    ${slots.afterDescription || ""}
    ${slots.description ? "" : `<button class="btn gray" id="desc-toggle">See full description</button>`}
  </section>`;
}

function policies(l) {
  return `
  <section class="section">
    <h2 class="section-title">Shipping &amp; policies</h2>
    ${l.shippingPolicies.map(p => `<div class="policy">${I[p.icon]}${p.text}</div>`).join("")}
    <button class="btn gray">See shipping &amp; return details</button>
  </section>
  <section class="section">
    <div class="protection"><div><b>Etsy Purchase Protection:</b> Shop confidently on Etsy knowing if something goes wrong with an eligible purchase, we've got your back.<br><a href="#">View terms</a></div>${I.shield}</div>
  </section>`;
}

function seller(s, more, slots) {
  return `
  ${slots.beforeSeller || ""}
  <section class="section" id="seller">
    <h2 class="section-title">Meet your seller</h2>
    <div class="seller-card">
      <img class="avatar" src="${s.avatar}" alt="${s.owner}">
      <div class="shop">${s.shopName}${s.starSeller ? I.starSeller : ""}</div>
      <div class="stats">${s.rating} ${I.star(14)} ${s.sales} sales</div>
      <div class="owner">Owned by ${s.owner}<br>${s.location}</div>
      <div class="seller-facts">${s.facts.map(f => `<div>${I[f.icon]}${f.text}</div>`).join("")}</div>
      <div class="btn-row"><button class="btn outline">Message seller</button><button class="btn outline">${I.heartSm} Follow (${s.followers})</button></div>
    </div>
  </section>
  <section class="section">
    <h2 class="section-title">More items from this shop</h2>
    <div class="more-grid">${more.map(m => `
      <div class="more-item"><div class="img"><img src="${m.image}" alt="${m.title}">${m.viewed ? `<span class="viewed">Viewed</span>` : ""}<span class="fav">${I.heartSm}</span></div>
      <div class="p">${money(m.price)}</div><div class="t">${m.title}</div></div>`).join("")}
    </div>
  </section>`;
}

function bottomBar() {
  return `
  <button class="btn dark sticky-cart" id="sticky-cart">Add to cart</button>
  ${tabBar()}`;
}

function wireUp(layout) {
  // Gallery dots follow swipe position
  const g = document.getElementById("gallery"), dots = [...document.querySelectorAll("#dots i")];
  g.addEventListener("scroll", () => {
    const i = Math.round(g.scrollLeft / g.clientWidth);
    dots.forEach((d, j) => d.classList.toggle("on", i === j));
  }, { passive: true });

  // Option selects show the chosen value
  document.querySelectorAll(".select select").forEach(sel => sel.addEventListener("change", () => {
    sel.parentElement.querySelector(".chosen").textContent = sel.value || "Select an option";
  }));

  // Expand / collapse description
  const toggle = document.getElementById("desc-toggle"), desc = document.getElementById("desc");
  toggle?.addEventListener("click", () => {
    const open = desc.classList.toggle("clamped");
    toggle.textContent = open ? "See full description" : "Show less";
  });

  // Tab bar hides when scrolling down, returns when scrolling up (like the iOS app).
  // Sticky "Add to cart" appears once the main buttons have scrolled off screen.
  const sticky = document.getElementById("sticky-cart"), primary = document.getElementById("primary-buttons");
  let lastY = window.scrollY;
  document.body.classList.add("tabs-visible");
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    if (Math.abs(y - lastY) > 6) {
      document.body.classList.toggle("tabs-visible", y < lastY || y < 40);
      lastY = y;
    }
    // Story-first pages put checkout further down, so once the buyer scrolls past the
    // photos, keep Add to cart reachable whenever the main buttons are off screen.
    const r = primary.getBoundingClientRect();
    const offscreen = r.bottom < 60 || (layout === "story-first" && y > 300 && r.top > window.innerHeight);
    sticky.classList.toggle("show", offscreen);
  }, { passive: true });
}

export async function renderListing({ slots = {}, layout = "base", dataPath = "data/product.json" } = {}) {
  const app = document.getElementById("app");
  try {
    const d = await (await fetch(dataPath)).json();
    const l = d.listing;
    // "base": today's Etsy order (checkout → reviews → item details).
    // "story-first": delivery/shipping/ratings strip, item details, then the story
    // (slots.story), then checkout, then reviews, so the story comes before the reviews.
    const body = layout === "story-first"
      ? `${productHeader(l, d.seller, slots)}</section>
         ${itemDetails(l, slots)}
         ${slots.story ? `<section class="section story-section">${slots.story}</section>` : ""}
         <section class="section">${checkout(l)}</section>
         ${reviews(d.reviews)}`
      : `${productHeader(l, d.seller, slots)}${checkout(l)}</section>
         ${reviews(d.reviews)}
         ${itemDetails(l, slots)}`;
    app.innerHTML = `
      ${chrome()}
      ${hero(l, slots)}
      <main>
        ${body}
        ${policies(l)}
        ${seller(d.seller, d.moreFromShop, slots)}
      </main>
      ${bottomBar()}`;
    wireUp(layout);
    return d;
  } catch (e) {
    console.error(e);
    app.innerHTML = `<p style="padding:40px">Couldn't load the mock data. Open this page through a local server
      (<code>python3 serve.py</code> in the <code>etsy-redesign</code> folder), not by double-clicking the file.</p>`;
  }
}
