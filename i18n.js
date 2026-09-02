/* Lindsey Zhou — English / Mandarin
   Detects the visitor's language, allows a manual override, remembers it. */
(() => {
  "use strict";

  const KEY = "lz-lang";

  const DICT = {
    en: {
      "doc.title.index":   "Xiaoling (Lindsey) Zhou — Chengdu, China",
      "doc.title.gallery": "Photos — Xiaoling (Lindsey) Zhou",

      "name":            "Lindsey Zhou",
      "altName":         "Xiaoling Zhou",
      "origin":          "From Chengdu, Sichuan, China",
      "about.lives":     "Lives in Belle Mead, New Jersey",
      "about.ms":        "MS Statistics · Texas Tech University · 2009–2011",
      "about.bs":        "BS Materials Science & Engineering · Chongqing University · 1998–2002",

      "cta.kicker":      "Photo album",
      "cta.title":       "See all 176 photos & videos",
      "cta.sub":         "Hand-picked favorites",

      "link.linkedin":   "LinkedIn",
      "link.x":          "X",
      "link.x.dim":      "(Twitter)",
      "link.facebook":   "Facebook",
      "link.instagram":  "Instagram",
      "link.wechat":     "WeChat",
      "link.wechat.aria":"Copy WeChat ID ACL-beauty",

      "contact.heading": "Reach her directly",
      "contact.email":   "Email",
      "contact.personal":"(personal)",
      "contact.alternate":"(alternate)",
      "contact.phone":   "Phone",
      "contact.main":    "(main)",
      "contact.work":    "(work)",

      "share":           "Share this page",
      "footer":          "Made with ♥ for Lindsey",
      "footer.by":       "by",

      "theme.toLight":   "Switch to light theme",
      "theme.toDark":    "Switch to dark theme",
      "lang.aria":       "切换到中文",
      "lang.label":      "中文",

      "toast.wechatCopied": "WeChat ID copied — ACL-beauty",
      "toast.wechatPlain":  "WeChat ID: ACL-beauty",
      "toast.linkCopied":   "Link copied to clipboard",

      "share.title":     "Lindsey Zhou — Links",
      "share.text":      "Lindsey (Xiaoling) Zhou — all her links in one place.",

      "gallery.back":    "Back to links",
      "gallery.title":   "Photos",
      "gallery.album":   "Favorites",
      "gallery.empty":   "No photos in this gallery yet.",
      "gallery.error":   "Couldn't load the gallery.",
      "lb.viewer":       "Photo viewer",
      "lb.close":        "Close",
      "lb.prev":         "Previous",
      "lb.next":         "Next",
    },

    zh: {
      "doc.title.index":   "周晓玲（Lindsey Zhou）— 中国成都",
      "doc.title.gallery": "照片 — 周晓玲（Lindsey Zhou）",

      "name":            "周晓玲",
      "altName":         "Xiaoling Zhou",
      "origin":          "来自中国四川成都",
      "about.lives":     "现居美国新泽西州贝尔米德",
      "about.ms":        "统计学硕士 · 德州理工大学 · 2009–2011",
      "about.bs":        "材料科学与工程学士 · 重庆大学 · 1998–2002",

      "cta.kicker":      "相册",
      "cta.title":       "查看全部 176 张照片和视频",
      "cta.sub":         "精选收藏",

      "link.linkedin":   "领英",
      "link.x":          "X",
      "link.x.dim":      "（推特）",
      "link.facebook":   "Facebook",
      "link.instagram":  "Instagram",
      "link.wechat":     "微信",
      "link.wechat.aria":"复制微信号 ACL-beauty",

      "contact.heading": "直接联系她",
      "contact.email":   "邮箱",
      "contact.personal":"（个人）",
      "contact.alternate":"（备用）",
      "contact.phone":   "电话",
      "contact.main":    "（主要）",
      "contact.work":    "（工作）",

      "share":           "分享此页面",
      "footer":          "用心为 Lindsey 制作 ♥",
      "footer.by":       "作者",

      "theme.toLight":   "切换到浅色主题",
      "theme.toDark":    "切换到深色主题",
      "lang.aria":       "Switch to English",
      "lang.label":      "EN",

      "toast.wechatCopied": "微信号已复制 — ACL-beauty",
      "toast.wechatPlain":  "微信号：ACL-beauty",
      "toast.linkCopied":   "链接已复制到剪贴板",

      "share.title":     "周晓玲 — 链接",
      "share.text":      "周晓玲（Lindsey Zhou）— 所有链接尽在一处。",

      "gallery.back":    "返回链接",
      "gallery.title":   "照片",
      "gallery.album":   "精选收藏",
      "gallery.empty":   "相册中暂无照片。",
      "gallery.error":   "相册加载失败。",
      "lb.viewer":       "照片查看器",
      "lb.close":        "关闭",
      "lb.prev":         "上一张",
      "lb.next":         "下一张",
    },
  };

  const detect = () => {
    let saved = null;
    try { saved = localStorage.getItem(KEY); } catch { /* private mode */ }
    if (saved === "en" || saved === "zh") return saved;
    const tags = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || "en"];
    return tags.some((t) => /^zh\b/i.test(t)) ? "zh" : "en";
  };

  let lang = detect();

  const t = (key) => (DICT[lang] && DICT[lang][key]) || DICT.en[key] || "";

  const apply = () => {
    const root = document.documentElement;
    root.lang = lang === "zh" ? "zh-Hans" : "en";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = t(el.dataset.i18n);
      if (v) el.textContent = v;
    });

    // attributes: data-i18n-aria="key" / data-i18n-title="key"
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const v = t(el.dataset.i18nAria);
      if (v) el.setAttribute("aria-label", v);
    });

    const titleKey = document.body.dataset.titleKey;
    if (titleKey) document.title = t(titleKey);

    document.dispatchEvent(new CustomEvent("lz:lang", { detail: { lang } }));
  };

  const setLang = (next) => {
    lang = next;
    try { localStorage.setItem(KEY, next); } catch { /* ignore */ }
    apply();
  };

  window.lzI18n = { t, get lang() { return lang; }, setLang };

  const init = () => {
    apply();
    document.getElementById("lang-toggle")?.addEventListener("click", () => {
      setLang(lang === "zh" ? "en" : "zh");
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
