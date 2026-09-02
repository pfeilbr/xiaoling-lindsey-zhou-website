/* Shared theme handling for the About / My Story pages. */
(() => {
  "use strict";
  const root = document.documentElement;
  const KEY = "lz-theme";
  const tr = (k, f) => (window.lzI18n ? window.lzI18n.t(k) : f) || f;

  const prefersLight = window.matchMedia("(prefers-color-scheme: light)");

  const apply = (theme) => {
    root.dataset.theme = theme;
    const t = document.getElementById("theme-toggle");
    if (t) {
      const key = theme === "dark" ? "theme.toLight" : "theme.toDark";
      t.dataset.i18nAria = key;
      t.setAttribute("aria-label", tr(key, ""));
    }
  };

  let stored = null;
  try { stored = localStorage.getItem(KEY); } catch { /* private mode */ }
  apply(stored || (prefersLight.matches ? "light" : "dark"));

  prefersLight.addEventListener("change", (e) => {
    let picked = null;
    try { picked = localStorage.getItem(KEY); } catch { /* ignore */ }
    if (!picked) apply(e.matches ? "light" : "dark");
  });

  document.getElementById("theme-toggle")?.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    apply(next);
    try { localStorage.setItem(KEY, next); } catch { /* ignore */ }
  });
})();
