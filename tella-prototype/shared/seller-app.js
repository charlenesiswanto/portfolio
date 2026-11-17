// Etsy Seller app: the bowl's listing overview, as sellers see it today. Base for design decision 3.
// renderSellerListing({ slots }) renders into #app. Slots inject HTML at fixed points:
//   slots.afterTags     → under the Active / Auto-renews tags
//   slots.afterPhotos   → right under the listing's photo row
//   slots.beforeReviews → above "Reviews for this item"
// Also exports the phone chrome and icons so prototype screens can reuse them.

export const sIcons = {
  back: `<svg width="22" height="22" viewBox="0 0 24 24"><path d="M15 4 7 12l8 8" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  close: `<svg width="20" height="20" viewBox="0 0 24 24"><path d="M5 5l14 14M19 5 5 19" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>`,
  eye: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>`,
  more: `<svg width="22" height="22" viewBox="0 0 24 24"><circle cx="5" cy="12" r="2" fill="currentColor"/><circle cx="12" cy="12" r="2" fill="currentColor"/><circle cx="19" cy="12" r="2" fill="currentColor"/></svg>`,
  caret: `<svg width="11" height="11" viewBox="0 0 24 24"><path fill="currentColor" d="M4 8h16l-8 9z"/></svg>`,
  plus: `<svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>`,
  star: s => `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"/></svg>`,
  home: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11 12 4l9 7v9h-6v-6H9v6H3z" stroke-linejoin="round"/></svg>`,
  messages: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`,
  orders: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M4 8 12 4l8 4v9l-8 4-8-4z"/><path d="m4 8 8 4 8-4M12 12v9"/></svg>`,
  listings: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.5" fill="currentColor"/></svg>`,
  menu: `<svg width="24" height="24" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  signal: `<svg width="20" height="13" viewBox="0 0 20 13"><rect x="0" y="9" width="3.5" height="4" rx="1" fill="currentColor"/><rect x="5.3" y="6" width="3.5" height="7" rx="1" fill="currentColor"/><rect x="10.6" y="3" width="3.5" height="10" rx="1" fill="currentColor"/><rect x="15.9" y="0" width="3.5" height="13" rx="1" fill="currentColor" opacity=".3"/></svg>`,
  wifi: `<svg width="18" height="13" viewBox="0 0 18 13"><path fill="currentColor" d="M9 13 6.3 10a3.8 3.8 0 0 1 5.4 0zM3.6 7.2a7.7 7.7 0 0 1 10.8 0l-1.4 1.5a5.6 5.6 0 0 0-8 0zM.8 4.3a11.7 11.7 0 0 1 16.4 0l-1.4 1.5a9.6 9.6 0 0 0-13.6 0z"/></svg>`,
  battery: `<svg width="28" height="13" viewBox="0 0 28 13"><rect x=".5" y=".5" width="24" height="12" rx="3.5" fill="none" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="16" height="9" rx="2" fill="currentColor"/><rect x="25.5" y="4" width="2" height="5" rx="1" fill="currentColor" opacity=".4"/></svg>`,
};

export const sStatus = () => `<div class="s-status"><span class="time">9:41</span><span class="sys">${sIcons.signal}${sIcons.wifi}${sIcons.battery}</span></div>`;

export const sNav = (active = "Listings") => `
  <nav class="s-nav">
    ${[["Home", sIcons.home], ["Messages", sIcons.messages], ["Orders", sIcons.orders, 3], ["Listings", sIcons.listings], ["More", sIcons.menu]]
      .map(([n, ic, badge]) => `<a href="#" class="${n === active ? "on" : ""}">${ic}${badge ? `<span class="badge">${badge}</span>` : ""}${n}</a>`).join("")}
  </nav>`;

export function sToast(msg) {
  let el = document.querySelector(".s-toast");
  if (!el) { el = document.createElement("div"); el.className = "s-toast"; document.body.appendChild(el); }
  el.textContent = msg; el.classList.add("show");
  clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove("show"), 1800);
}

const money = n => `$${n.toFixed(2)}`;

export async function renderSellerListing({ slots = {}, dataPath = "data/product.json" } = {}) {
  const d = await (await fetch(dataPath)).json();
  const l = d.listing, r = d.reviews;
  document.getElementById("app").innerHTML = `
    ${sStatus()}
    <header class="s-header">
      <button class="s-icon" aria-label="Back">${sIcons.back}</button>
      <span class="ttl"></span>
      <button class="s-icon" aria-label="View on Etsy">${sIcons.eye}</button>
      <button class="s-icon" aria-label="More">${sIcons.more}</button>
    </header>
    <div class="s-tags"><span class="s-tag green">Active</span><span class="s-tag">Auto-renews</span><span class="s-tag">Made to order</span></div>
    ${slots.afterTags || ""}
    <h1 class="s-title">${l.title}</h1>
    <p class="s-sub">11 in stock · ${money(l.price)} · ${l.options[0].choices.length} glaze colors</p>
    <div class="s-tabs"><button class="on">Overview</button><button>Listing</button></div>
    <div class="s-photos">
      ${l.images.map(src => `<img src="${src.replace(/w=\d+/, "w=240")}" alt="">`).join("")}
      <span class="add">${sIcons.plus}Add photo<br>or video</span>
    </div>
    ${slots.afterPhotos || ""}
    <section class="s-section">
      <div class="s-section-head"><h2>Performance</h2><span class="s-pill">Last 30 days ${sIcons.caret}</span></div>
      <div class="s-stats">
        <div><div class="k">Views</div><div class="v">1,204</div></div>
        <div><div class="k">Favorites</div><div class="v">318</div></div>
        <div><div class="k">Sales</div><div class="v">41</div></div>
        <div><div class="k">Revenue</div><div class="v">$2,747</div></div>
      </div>
    </section>
    <section class="s-section">
      <div class="s-row"><div class="txt"><b>Feature this listing</b><span>Showcase this listing at the top of your shop's homepage.</span></div><span class="s-switch"></span></div>
    </section>
    ${slots.beforeReviews || ""}
    <section class="s-section">
      <div class="s-section-head"><h2>Reviews for this item</h2><span style="display:flex;align-items:center;gap:3px;font-weight:600">${sIcons.star(15)} ${r.average.toFixed(1)} (${r.count})</span></div>
      <div class="s-review"><div class="stars">${Array.from({ length: 5 }, () => sIcons.star(14)).join("")}</div>${r.items[0].text}<div class="by">${r.items[0].author} · ${r.items[0].when}</div></div>
    </section>
    ${sNav("Listings")}`;
  return d;
}
