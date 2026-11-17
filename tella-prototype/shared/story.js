// One story card used by all three prototypes so the format stays identical:
// eyebrow + heading, a 4:3 media area, three tappable items, and the same maker footer.
// Only the content (and what tapping does to the media) changes per angle.

const photo = (id, w = 800) => `https://images.unsplash.com/photo-${id}?w=${w}&h=${Math.round(w * 0.75)}&fit=crop&q=80&auto=format`;

export const MAKER = {
  name: "Maya Holt",
  shop: "HollowPineClay",
  avatar: "https://images.unsplash.com/photo-1598815272841-4e85a77e0a67?w=120&h=120&q=80&auto=format&fit=crop&crop=faces",
};

// mode: "steps" (swap photo), "closeup" (zoom into one photo at each pin), "story" (swap sketch/photo)
export function storyCard({ mode, eyebrow, heading, items, media }) {
  const pins = mode === "closeup"
    ? items.map((it, i) => `<button class="pin" data-i="${i}" style="left:${it.x}%;top:${it.y}%" aria-label="Detail ${i + 1}: ${it.title}">${i + 1}</button>`).join("")
    : "";
  return `
  <section class="story-card story-${mode}" data-mode="${mode}">
    <div class="story-eyebrow">${eyebrow}</div>
    <h3 class="story-heading">${heading}</h3>
    <div class="story-media">
      <div class="story-stage">${media(0)}</div>
      ${pins}
      <span class="story-chip"></span>
      <button class="story-nav prev" aria-label="Previous"><svg width="16" height="16" viewBox="0 0 24 24"><path d="M15 5 8 12l7 7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      <button class="story-nav next" aria-label="Next"><svg width="16" height="16" viewBox="0 0 24 24"><path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      <div class="story-dots">${items.map(() => "<i></i>").join("")}</div>
    </div>
    <ol class="story-items">
      ${items.map((it, i) => `
        <li><button class="story-item" data-i="${i}">
          <span class="n">${i + 1}</span>
          <span class="txt"><span class="t">${it.title}${it.meta ? `<span class="meta">${it.meta}</span>` : ""}</span><span class="c">${it.caption}</span></span>
        </button></li>`).join("")}
    </ol>
    <div class="story-footer"><img src="${MAKER.avatar}" alt="">Shared by ${MAKER.name} · ${MAKER.shop}</div>
  </section>`;
}

export function wireStory({ mode, items, media, chip }) {
  const card = document.querySelector(".story-card");
  const stage = card.querySelector(".story-stage");
  const chipEl = card.querySelector(".story-chip");
  const rows = [...card.querySelectorAll(".story-item")];
  const pins = [...card.querySelectorAll(".pin")];
  const dots = [...card.querySelectorAll(".story-dots i")];
  const prev = card.querySelector(".story-nav.prev"), next = card.querySelector(".story-nav.next");
  const n = items.length;
  let active = mode === "closeup" ? -1 : 0;

  function show(i) {
    active = i;
    rows.forEach((r, j) => r.classList.toggle("on", j === i));
    pins.forEach((p, j) => p.classList.toggle("on", j === i));
    dots.forEach((d, j) => d.classList.toggle("on", j === i));
    prev.disabled = i <= 0;
    next.disabled = i >= n - 1;
    chipEl.textContent = chip(i);
    if (mode === "closeup") {
      // Scale around the center, then shift so the chosen detail lands in the middle of the frame.
      const img = stage.querySelector("img"), Z = 2.2;
      card.classList.toggle("zoomed", i >= 0);
      img.style.transform = i >= 0 ? `scale(${Z}) translate(${50 - items[i].x}%, ${50 - items[i].y}%)` : "";
      pins.forEach(p => { p.style.left = `${items[+p.dataset.i].x}%`; p.style.top = `${items[+p.dataset.i].y}%`; });
      if (i >= 0) { pins[i].style.left = "50%"; pins[i].style.top = "50%"; }
    } else {
      stage.innerHTML = media(i);
    }
  }

  rows.forEach((r, i) => r.addEventListener("click", () => show(mode === "closeup" && active === i ? -1 : i)));
  pins.forEach((p, i) => p.addEventListener("click", () => show(active === i ? -1 : i)));
  const mediaEl = card.querySelector(".story-media");
  mediaEl.addEventListener("click", e => {
    if (mode === "closeup" && active >= 0 && !e.target.closest(".pin, .story-nav")) show(-1); // tap photo to zoom back out
  });

  // Arrows and swipe step through the three items (in the close-up, they move detail to detail).
  const go = d => show(Math.min(n - 1, Math.max(0, active + d)));
  prev.addEventListener("click", e => { e.stopPropagation(); go(-1); });
  next.addEventListener("click", e => { e.stopPropagation(); go(1); });
  let x0 = null;
  mediaEl.addEventListener("pointerdown", e => { x0 = e.clientX; });
  mediaEl.addEventListener("pointerup", e => {
    if (x0 === null) return;
    const dx = e.clientX - x0; x0 = null;
    if (Math.abs(dx) > 40) { e.preventDefault(); go(dx < 0 ? 1 : -1); }
  });
  show(active);
}

export { photo };
