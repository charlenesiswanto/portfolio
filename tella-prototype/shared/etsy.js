// Shared header + search-card rendering. Alternative frames can import these and
// override renderCard (or add to it) without touching the baseline.

export const icons = {
  menu: `<svg width="20" height="20" viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`,
  search: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="10.5" cy="10.5" r="6.5" stroke="#fff" stroke-width="2.6"/><path d="M15.5 15.5 20 20" stroke="#fff" stroke-width="2.8" stroke-linecap="round"/></svg>`,
  close: `<svg width="18" height="18" viewBox="0 0 24 24"><path d="M5 5l14 14M19 5 5 19" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>`,
  heart: `<svg width="26" height="26" viewBox="0 0 24 24"><path fill="currentColor" d="M12 21s-7.5-4.6-10-9.3C.4 8.5 2.2 4.5 6 4.1c2.3-.2 4.1 1 6 3.1 1.9-2.1 3.7-3.3 6-3.1 3.8.4 5.6 4.4 4 7.6C19.5 16.4 12 21 12 21z"/></svg>`,
  heartOutline: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path stroke="currentColor" stroke-width="2" d="M12 20s-7-4.3-9.3-8.6C1.2 8.4 2.9 5 6.2 4.7c2.1-.2 3.8.9 5.8 3.1 2-2.2 3.7-3.3 5.8-3.1 3.3.3 5 3.7 3.5 6.7C19 15.7 12 20 12 20z"/></svg>`,
  bell: `<svg width="26" height="26" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22a2.5 2.5 0 0 0 2.5-2.5h-5A2.5 2.5 0 0 0 12 22zm7-5V11a7 7 0 0 0-5.5-6.8V3.5a1.5 1.5 0 0 0-3 0v.7A7 7 0 0 0 5 11v6l-2 2v.5h18V19l-2-2z"/></svg>`,
  help: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9.5" stroke="currentColor" stroke-width="2"/><path d="M9.3 9.3a2.8 2.8 0 1 1 3.9 2.6c-.8.4-1.2 1-1.2 1.8v.6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="17.2" r="1.2" fill="currentColor"/></svg>`,
  caret: `<svg width="12" height="12" viewBox="0 0 24 24"><path fill="currentColor" d="M5 8h14l-7 8z"/></svg>`,
  cart: `<svg width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M1.5 3h3.3l.7 2.5H22l-2.4 9H7.9l.5 2H19v2H6.9L3.3 5H1.5zM9 20.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm10 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg>`,
  gift: `<svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M3 9h18v4H3zm1 5h7v8H4zm9 0h7v8h-7zM11 9h2v13h-2zM12 8.5c-1-2.7-3.5-5-5.2-3.8-1.6 1.2.6 3.8 5.2 3.8zm0 0c1-2.7 3.5-5 5.2-3.8 1.6 1.2-.6 3.8-5.2 3.8z"/></svg>`,
  sliders: `<svg width="20" height="20" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2.2" stroke-linecap="round" d="M3 6h7M14 6h7M3 12h3M10 12h11M3 18h11M18 18h3"/><circle cx="12" cy="6" r="2" fill="currentColor"/><circle cx="8" cy="12" r="2" fill="currentColor"/><circle cx="16" cy="18" r="2" fill="currentColor"/></svg>`,
  chevronRight: `<svg width="20" height="20" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  plus: `<svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 4v16M4 12h16" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>`,
  arrowRight: `<svg width="18" height="18" viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  star: `<svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"/></svg>`,
  play: `<svg width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="M7 4.5v15l12-7.5z"/></svg>`,
  starSeller: `<svg class="star-seller" viewBox="0 0 24 24" aria-label="Star Seller"><path fill="#9560E8" d="M12 1.5l2.4 2.1 3.2-.4 1 3 3 1-.4 3.2 2.1 2.4-2.1 2.4.4 3.2-3 1-1 3-3.2-.4L12 22.5l-2.4-2.1-3.2.4-1-3-3-1 .4-3.2L.7 12l2.1-2.4-.4-3.2 3-1 1-3 3.2.4z"/><path fill="#fff" d="M12 6.8l1.5 3.2 3.4.4-2.5 2.4.6 3.4-3-1.7-3 1.7.6-3.4-2.5-2.4 3.4-.4z"/></svg>`,
};

export function header(query = "ceramics") {
  const nav = ["Gifts", "100 Halloween Essentials", "Home Favorites", "Fashion Finds", "Vintage", "Wedding Guide", "Gift Cards"];
  return `
  <header class="site-header">
    <div class="header-top">
      <a class="logo" href="#">Etsy</a>
      <button class="categories">${icons.menu}Categories</button>
      <form class="search" onsubmit="return false">
        <input value="${query}" aria-label="Search">
        <button type="button" class="clear" aria-label="Clear">${icons.close}</button>
        <button class="go" aria-label="Search">${icons.search}</button>
      </form>
      <div class="header-icons">
        <button class="icon-btn" aria-label="Favorites">${icons.heart}</button>
        <button class="icon-btn" aria-label="Notifications">${icons.bell}${icons.caret}</button>
        <button class="icon-btn" aria-label="Help">${icons.help}${icons.caret}</button>
        <button class="icon-btn" aria-label="Account"><span class="avatar">C</span>${icons.caret}</button>
        <button class="icon-btn" aria-label="Cart">${icons.cart}</button>
      </div>
    </div>
    <nav class="header-nav">
      ${nav.map((n, i) => `<a href="#">${i === 0 ? icons.gift : ""}${n}</a>`).join("")}
    </nav>
  </header>`;
}

export function chipsRow(chips) {
  return `
  <div class="chips-row">
    <div class="chips">
      <button class="chip">${icons.sliders}Show filters</button>
      ${chips.map(c => `<button class="chip">${c}</button>`).join("")}
    </div>
    <button class="chips-next" aria-label="More filters">${icons.chevronRight}</button>
    <button class="sort">Most relevant ${icons.caret}</button>
  </div>`;
}

export const fmtCount = n => n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : `${n}`;
export const fmtPrice = n => `$${n.toFixed(2)}`;
export const thumb = (url, w = 700) => url.replace(/w=\d+/, `w=${w}`);

export function swatches(l) {
  if (!l.colors.length) return "";
  return `<div class="swatches">${l.colors.map(c => `<span class="swatch" style="background:${c}"></span>`).join("")}${l.moreColors ? `+${l.moreColors}` : ""}</div>`;
}

export function cardMedia(l) {
  return `
    <div class="card-media">
      <img src="${thumb(l.images[0])}" alt="${l.title}" loading="lazy">
      ${l.badge ? `<span class="badge">${l.badge}</span>` : ""}
      <button class="fav" aria-label="Add to favorites">${icons.heartOutline}</button>
      ${l.imageOverlayText ? `<span class="overlay-text">${l.imageOverlayText}</span>` : ""}
      ${l.hasVideo ? `<span class="play">${icons.play}</span>` : ""}
    </div>`;
}

export function cardInfo(l) {
  const onSale = l.originalPrice && l.originalPrice > l.price;
  const pct = onSale ? Math.round((1 - l.price / l.originalPrice) * 100) : 0;
  return `
      ${swatches(l)}
      <div class="title">${l.title}</div>
      <div class="meta">
        <span class="rating">${l.rating.toFixed(1)}</span>${icons.star}
        <span class="muted">(${fmtCount(l.reviewCount)})</span>
        ${l.isAd ? `<span class="muted">Ad</span><span class="dot">•</span>` : ""}
        <span class="muted">By ${l.shop.name}</span>
        ${l.shop.starSeller ? icons.starSeller : ""}
      </div>
      <div class="price-row">
        <span class="price ${onSale ? "sale" : ""}">${fmtPrice(l.price)}</span>
        ${onSale ? `<span class="original">${fmtPrice(l.originalPrice)}</span><span class="off">(${pct}% off)</span>` : ""}
      </div>
      ${l.freeShipping ? `<div class="shipping">Free shipping</div>` : ""}`;
}

export function cardActions() {
  return `
    <div class="card-actions">
      <button class="btn-outline">${icons.plus}Add to cart</button>
      <a class="link-arrow" href="#">More like this ${icons.arrowRight}</a>
    </div>`;
}

export function renderCard(l) {
  return `
  <article class="card" data-id="${l.id}">
    ${cardMedia(l)}
    <div class="card-body">${cardInfo(l)}</div>
    ${cardActions()}
  </article>`;
}

export async function loadData(path = "data/listings.json") {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Could not load ${path}`);
  return res.json();
}
