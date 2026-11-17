// "Your story is ready": the shared last step of every design decision 3 prototype.
// All three seller tools (process log, guided story builder, maker's journal) end here with the
// same neutral story, so testers compare the seller's effort, not the result. The story isn't
// styled as any decision 1 angle, and the seller only chooses WHERE it appears (decision 2's
// three places), so it works whichever decision 1 / 2 option wins.
//
//   mountStoryReview(root, {
//     title, lead, maker: { name, shop, avatar }, listingTitle,
//     moments: [{ id, img, label, caption, suggested, video }],   // in story order; suggested = written by Etsy AI
//     places: { listing: true, feed: true, gallery: true },
//     placeIds: ["listing", "feed"],                           // optional: only show some places
//     placeLabels: { feed: "Tella in search" },                 // optional: rename a place
//     onBack(), onApprove(model)
//   })

import { sStatus, sIcons } from "./seller-app.js";

const IC = {
  up: `<svg width="16" height="16" viewBox="0 0 24 24"><path d="m6 15 6-6 6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  down: `<svg width="16" height="16" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  spark: `<svg width="11" height="11" viewBox="0 0 24 24" style="display:inline"><path fill="currentColor" d="M12 2l2.2 6.3L20 10l-5.8 1.7L12 18l-2.2-6.3L4 10l5.8-1.7z"/></svg>`,
  play: `<svg width="9" height="9" viewBox="0 0 24 24"><path fill="currentColor" d="M6 4v16l14-8z"/></svg>`,
  listing: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>`,
  feed: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="m10.5 9 4 3-4 3z" fill="currentColor"/></svg>`,
  gallery: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><circle cx="12" cy="8" r="3.5"/><path d="M5 21c.8-3.6 3.6-6 7-6s6.2 2.4 7 6"/></svg>`,
};

const PLACES = [
  ["listing", IC.listing, "On your listing", l => `A story card on “${l}”`],
  ["feed", IC.feed, "Story feed", () => "As a short video when buyers search ceramics"],
  ["gallery", IC.gallery, "Maker's gallery", () => "Added to the story timeline on your maker page"],
];

function html(m) {
  const cover = m.moments[0];
  return `
    ${sStatus()}
    <header class="s-header"><button class="s-icon" data-r="back" aria-label="Back">${sIcons.back}</button><span class="ttl">Review your story</span></header>
    <h1 class="sr-h1">Your story is ready</h1>
    <p class="sr-lead">${m.lead || `Etsy AI put your ${m.moments.length} moments in order and filled in missing captions.`} Change anything you like.</p>

    <section class="sr-story">
      <div class="sr-cover"><img src="${cover.img}" alt="">${cover.video ? `<span class="sr-dur">${IC.play} Video</span>` : ""}</div>
      <div class="sr-in">
        <div class="sr-eb">The making of</div>
        <input class="sr-title" data-r="title" value="${m.title.replace(/"/g, "&quot;")}" aria-label="Story title">
        <div class="sr-by"><img src="${m.maker.avatar}" alt="">${m.maker.name} · ${m.maker.shop}</div>
        <ol class="sr-moments">
          ${m.moments.map((x, i) => `
            <li>
              <img src="${x.img}" alt="">
              <div class="mid">
                <div class="lab">${i + 1} · ${x.label}${x.suggested ? `<em>${IC.spark} Etsy AI</em>` : ""}</div>
                <textarea rows="2" data-r="cap" data-i="${i}" aria-label="Caption ${i + 1}">${x.caption}</textarea>
              </div>
              <div class="ctrl">
                <button data-r="move" data-i="${i}" data-d="-1" ${i === 0 ? "disabled" : ""} aria-label="Move up">${IC.up}</button>
                <button data-r="move" data-i="${i}" data-d="1" ${i === m.moments.length - 1 ? "disabled" : ""} aria-label="Move down">${IC.down}</button>
              </div>
            </li>`).join("")}
        </ol>
      </div>
    </section>

    <h2 class="sr-h2">Where buyers will see it</h2>
    <div class="sr-places">
      ${PLACES.filter(([id]) => !m.placeIds || m.placeIds.includes(id)).map(([id, ic, name, desc]) => `
        <button class="sr-place" data-r="place" data-id="${id}" aria-pressed="${m.places[id]}">
          <span class="ic">${ic}</span>
          <span class="txt"><b>${m.placeLabels?.[id] || name}</b><span>${desc(m.listingTitle)}</span></span>
          <span class="sr-toggle ${m.places[id] ? "on" : ""}"></span>
        </button>`).join("")}
    </div>
    <div class="pl-footer sr-footer">
      <button class="s-btn dark" data-r="approve" ${Object.values(m.places).some(Boolean) ? "" : "disabled"}>Approve &amp; publish</button>
    </div>`;
}

export function mountStoryReview(root, model) {
  const render = () => {
    const y = root.scrollTop;
    root.innerHTML = html(model);
    root.scrollTop = y;
    root.querySelector('[data-r="back"]').addEventListener("click", () => model.onBack?.());
    root.querySelector('[data-r="title"]').addEventListener("input", e => { model.title = e.target.value; });
    // Caption boxes grow to fit their text
    const fit = t => { t.style.height = "auto"; t.style.height = `${t.scrollHeight + 2}px`; };
    root.querySelectorAll('[data-r="cap"]').forEach(t => {
      fit(t);
      t.addEventListener("input", () => {
        const x = model.moments[+t.dataset.i];
        x.caption = t.value; x.suggested = false; fit(t);
      });
    });
    root.querySelectorAll('[data-r="move"]').forEach(b => b.addEventListener("click", () => {
      const i = +b.dataset.i, j = i + +b.dataset.d, a = model.moments;
      [a[i], a[j]] = [a[j], a[i]]; render();
    }));
    root.querySelectorAll('[data-r="place"]').forEach(b => b.addEventListener("click", () => {
      model.places[b.dataset.id] = !model.places[b.dataset.id]; render();
    }));
    root.querySelector('[data-r="approve"]').addEventListener("click", () => model.onApprove?.(model));
  };
  render();
}

// The same "Etsy AI is drafting your story…" overlay for every d3 tool (4 steps, same timing),
// so the AI step looks identical across prototypes and only the seller's input differs.
export function showDrafting(gen, steps, onDone) {
  const check = `<svg width="12" height="12" viewBox="0 0 24 24"><path d="m5 12 5 5 9-10" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  gen.innerHTML = `<div class="spark"><i></i></div><h2>Etsy AI is drafting your story…</h2><ul>${steps.map(s => `<li><i>${check}</i>${s}</li>`).join("")}</ul>`;
  gen.classList.add("open");
  [...gen.querySelectorAll("li")].forEach((li, i) => setTimeout(() => li.classList.add("done"), 450 * (i + 1)));
  setTimeout(() => { gen.classList.remove("open"); onDone(); }, 450 * steps.length + 450);
}
