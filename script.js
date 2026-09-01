/* Lindsey Zhou — link page behaviour */
(() => {
  "use strict";

  const root = document.documentElement;
  const STORAGE_KEY = "lz-theme";

  /* ---------- theme ---------- */

  const prefersLight = window.matchMedia("(prefers-color-scheme: light)");

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    const toggle = document.getElementById("theme-toggle");
    if (toggle) {
      toggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
    }
  };

  let stored = null;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch { /* private mode */ }

  applyTheme(stored || (prefersLight.matches ? "light" : "dark"));

  // follow the OS while the visitor hasn't picked a theme themselves
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

  /* ---------- toast ---------- */

  const toastEl = document.getElementById("toast");
  let toastTimer;

  const toast = (message) => {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-visible"), 2400);
  };

  /* ---------- clipboard ---------- */

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Safari/HTTP fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;top:0;left:-9999px";
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch { ok = false; }
      ta.remove();
      return ok;
    }
  };

  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const value = btn.dataset.copy;
      const ok = await copyText(value);
      if (!ok) {
        toast(`WeChat ID: ${value}`);
        return;
      }
      btn.classList.add("is-copied");
      toast(`WeChat ID copied — ${value}`);
      setTimeout(() => btn.classList.remove("is-copied"), 2000);
    });
  });

  /* ---------- share ---------- */

  const shareBtn = document.getElementById("share");

  shareBtn?.addEventListener("click", async () => {
    const url = location.href;
    const data = {
      title: "Lindsey Zhou — Links",
      text: "Lindsey (Xiaoling) Zhou — all her links in one place.",
      url,
    };

    if (navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch (err) {
        if (err && err.name === "AbortError") return; // visitor cancelled
      }
    }

    toast((await copyText(url)) ? "Link copied to clipboard" : url);
  });
})();
