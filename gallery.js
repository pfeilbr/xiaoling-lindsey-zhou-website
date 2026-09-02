/* Lindsey Zhou — photo gallery */
(() => {
  "use strict";

  const root = document.documentElement;
  const STORAGE_KEY = "lz-theme";

  /* ---------- theme (shared behaviour with the links page) ---------- */

  const prefersLight = window.matchMedia("(prefers-color-scheme: light)");

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    const t = document.getElementById("theme-toggle");
    if (t) {
      t.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    }
  };

  let stored = null;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch { /* private mode */ }
  applyTheme(stored || (prefersLight.matches ? "light" : "dark"));

  prefersLight.addEventListener("change", (e) => {
    let picked = null;
    try { picked = localStorage.getItem(STORAGE_KEY); } catch { /* ignore */ }
    if (!picked) applyTheme(e.matches ? "light" : "dark");
  });

  document.getElementById("theme-toggle")?.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* ignore */ }
  });

  /* ---------- render the grid from the manifest ---------- */

  const grid = document.getElementById("grid");
  const empty = document.getElementById("empty");
  const albumName = document.getElementById("album-name");
  const BASE = "assets/gallery/";

  let items = [];

  const play = `<span class="tile__play"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z"/></svg></span>`;

  const render = () => {
    if (!items.length) {
      empty.hidden = false;
      return;
    }
    grid.innerHTML = items.map((it, i) => {
      const thumb = BASE + (it.thumb || it.src);
      const alt = (it.alt || `Photo ${i + 1}`).replace(/"/g, "&quot;");
      // width/height keep the column layout from reflowing as images stream in
      const dims = it.w && it.h ? ` width="${it.w}" height="${it.h}"` : "";
      return `<button class="tile" role="listitem" data-i="${i}" aria-label="Open ${alt}">
          <img src="${thumb}" alt="${alt}" loading="lazy" decoding="async"${dims}>
          ${it.type === "video" ? play : ""}
        </button>`;
    }).join("");
  };

  /* ---------- lightbox ---------- */

  const lb = document.getElementById("lightbox");
  const lbMedia = document.getElementById("lb-media");
  const lbCaption = document.getElementById("lb-caption");
  let index = 0;
  let lastFocus = null;

  const show = (i) => {
    index = (i + items.length) % items.length;
    const it = items[index];
    const src = BASE + it.src;

    if (it.type === "video") {
      const poster = it.poster ? ` poster="${BASE + it.poster}"` : "";
      lbMedia.innerHTML = `<video src="${src}"${poster} controls autoplay playsinline></video>`;
    } else {
      lbMedia.innerHTML = `<img src="${src}" alt="${(it.alt || "").replace(/"/g, "&quot;")}">`;
    }
    lbCaption.textContent = it.caption || it.alt || "";
  };

  const open = (i) => {
    lastFocus = document.activeElement;
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    show(i);
    lb.querySelector(".lb-close").focus();
  };

  const close = () => {
    lb.hidden = true;
    lbMedia.innerHTML = "";           // stops any playing video
    document.body.style.overflow = "";
    lastFocus?.focus();
  };

  grid.addEventListener("click", (e) => {
    const tile = e.target.closest(".tile");
    if (tile) open(Number(tile.dataset.i));
  });

  lb.querySelector(".lb-close").addEventListener("click", close);
  lb.querySelector(".lb-prev").addEventListener("click", () => show(index - 1));
  lb.querySelector(".lb-next").addEventListener("click", () => show(index + 1));

  lb.addEventListener("click", (e) => {
    if (e.target === lb) close();     // click the backdrop
  });

  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(index - 1);
    else if (e.key === "ArrowRight") show(index + 1);
  });

  // swipe between items on touch
  let x0 = null;
  lb.addEventListener("touchstart", (e) => { x0 = e.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 45) show(index + (dx < 0 ? 1 : -1));
    x0 = null;
  }, { passive: true });

  /* ---------- load ---------- */

  fetch(BASE + "manifest.json", { cache: "no-cache" })
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.status))))
    .then((data) => {
      items = Array.isArray(data.items) ? data.items : [];
      if (data.album) albumName.textContent = data.album;
      render();
    })
    .catch(() => {
      empty.hidden = false;
      empty.textContent = "Couldn't load the gallery.";
    });
})();
