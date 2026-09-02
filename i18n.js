/* Lindsey Zhou — English / Mandarin
   Detects the visitor's language, allows a manual override, remembers it. */
(() => {
  "use strict";

  const KEY = "lz-lang";

  const DICT = {
    en: {
      "doc.title.about":   "About — Xiaoling (Lindsey) Zhou",
      "doc.title.story":   "My Story — Xiaoling (Lindsey) Zhou",
      "nav.links":       "Links",
      "nav.about":       "About",
      "nav.story":       "My story",
      "nav.photos":      "Photos",
      "nav.back":        "Back to links",

      "about.title":     "About Lindsey",
      "about.lede":      "Xiaoling to her family, Lindsey to everyone else.",
      "about.h.roots":   "Roots",
      "about.p.roots":   "She grew up in Weiyuan County, in Sichuan \u2014 the eldest of three. Sichuan is the part of China that gave the world numbing peppercorns and a reputation for people who are warm, direct and a little bit fiery. She fits.",
      "about.h.study":   "What she studied",
      "about.p.study":   "A bachelor's in materials science and engineering from Chongqing University, then a master's in statistics from Texas Tech \u2014 a long way from home, in a flat and windy corner of Texas.",
      "about.h.work":    "What she does",
      "about.p.work":    "She works at AT Prep in Great Neck, New York, in marketing for a team that helps high school students get into university \u2014 test prep, application essays, letters of recommendation. It is work at the exact moment a young person's life starts opening up, which is a good place to spend your days.",
      "about.h.loves":   "What she loves",
      "about.p.loves":   "A hot wok and a handful of Sichuan peppercorns. A trail. A blackjack table. A pool. Angel roses, and anything in beige, cream or dry rose. Faye Wong on the speakers. The Shu House when someone else is cooking.",

      "story.title":     "My story",
      "story.lede":      "Weiyuan County to Chongqing to west Texas to here.",
      "story.h1":        "Sichuan",
      "story.p1":        "I was born in Weiyuan County, in Sichuan, the oldest of three. If you have eaten food that made your mouth buzz, you have met my province.",
      "story.h2":        "Chongqing",
      "story.p2":        "I studied materials science and engineering at Chongqing University. It was a serious degree in a serious city, all hills and staircases and fog off the river.",
      "story.h3":        "Texas",
      "story.p3":        "Then a master's in statistics at Texas Tech, in Lubbock. Flat where Chongqing was vertical, dry where home was wet, and so far from anything familiar that I had to build a new version of myself to live there. I am still glad I did.",
      "story.h4":        "East",
      "story.p4":        "Life moved east after that \u2014 New Jersey, then Pennsylvania. Two daughters grew up in that stretch of it. These days I work at AT Prep, helping high school students figure out how to get where they are going. I know something about arriving somewhere new and working out the rules.",
      "story.h5":        "New Year's Day",
      "story.p5":        "Brian and I met on Tinder, which is not the most romantic opening line, and had our first date on New Year's Day, 2025, at UMI. Starting something on the first day of a year turns out to be a good omen. This site is his doing.",
      "doc.title.index":   "Xiaoling (Lindsey) Zhou — Chengdu, China",
      "doc.title.gallery": "Photos — Xiaoling (Lindsey) Zhou",

      "name":            "Lindsey Zhou",
      "altName":         "Xiaoling Zhou",
      "tagline":         "Spicy Sichuan girl",
      "origin":          "From Weiyuan County, Sichuan, China",
      "origin.map":      "Open Weiyuan County in Google Maps",
      "like.cooking":    "Cooking Sichuan food",
      "like.hiking":     "Hiking",
      "like.blackjack":  "Blackjack",
      "like.swimming":   "Swimming",
      "about.work":      "AT Prep · Great Neck, New York",
      "about.birthday":  "Lunar birthday",
      "about.lives":     "Lives in Willow Grove, Pennsylvania",
      "about.lives.map": "Open Willow Grove, Pennsylvania in Google Maps",
      "about.family":    "Divorced mom of 2 wonderful daughters",
      "about.ms":        "MS Statistics · Texas Tech University",
      "about.bs":        "BS Materials Science & Engineering · Chongqing University",

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
      "doc.title.about":   "\u5173\u4e8e \u2014 \u5468\u6653\u73b2",
      "doc.title.story":   "\u6211\u7684\u6545\u4e8b \u2014 \u5468\u6653\u73b2",
      "nav.links":       "\u94fe\u63a5",
      "nav.about":       "\u5173\u4e8e",
      "nav.story":       "\u6211\u7684\u6545\u4e8b",
      "nav.photos":      "\u7167\u7247",
      "nav.back":        "\u8fd4\u56de\u94fe\u63a5",

      "about.title":     "\u5173\u4e8e Lindsey",
      "about.lede":      "\u5bb6\u4eba\u53eb\u5979\u6653\u73b2\uff0c\u5176\u4ed6\u4eba\u53eb\u5979 Lindsey\u3002",
      "about.h.roots":   "\u6839",
      "about.p.roots":   "\u5979\u5728\u56db\u5ddd\u5a01\u8fdc\u53bf\u957f\u5927\uff0c\u662f\u5bb6\u4e2d\u4e09\u4e2a\u5b69\u5b50\u4e2d\u7684\u8001\u5927\u3002\u56db\u5ddd\u76db\u4ea7\u82b1\u6912\uff0c\u4e5f\u76db\u4ea7\u70ed\u60c5\u3001\u76f4\u7387\u3001\u5e26\u70b9\u8fa3\u52b2\u7684\u4eba\u3002\u5979\u6b63\u662f\u5982\u6b64\u3002",
      "about.h.study":   "\u5979\u5b66\u8fc7\u4ec0\u4e48",
      "about.p.study":   "\u91cd\u5e86\u5927\u5b66\u6750\u6599\u79d1\u5b66\u4e0e\u5de5\u7a0b\u5b66\u58eb\uff0c\u4e4b\u540e\u5728\u5fb7\u5dde\u7406\u5de5\u5927\u5b66\u8bfb\u7edf\u8ba1\u5b66\u7855\u58eb \u2014 \u79bb\u5bb6\u5f88\u8fdc\uff0c\u5728\u5fb7\u5dde\u4e00\u7247\u5e73\u5766\u800c\u591a\u98ce\u7684\u5730\u65b9\u3002",
      "about.h.work":    "\u5979\u505a\u4ec0\u4e48",
      "about.p.work":    "\u5979\u5728\u7ebd\u7ea6\u5dde\u5927\u9888\u9547\u7684 AT Prep \u505a\u5e02\u573a\uff0c\u56e2\u961f\u5e2e\u52a9\u9ad8\u4e2d\u751f\u7533\u8bf7\u5927\u5b66 \u2014 \u5907\u8003\u3001\u6587\u4e66\u3001\u63a8\u8350\u4fe1\u3002\u90a3\u6b63\u662f\u5e74\u8f7b\u4eba\u4eba\u751f\u521a\u521a\u6253\u5f00\u7684\u65f6\u523b\uff0c\u662f\u4e2a\u503c\u5f97\u6295\u5165\u7684\u5730\u65b9\u3002",
      "about.h.loves":   "\u5979\u559c\u6b22\u4ec0\u4e48",
      "about.p.loves":   "\u70ed\u9505\u548c\u4e00\u628a\u82b1\u6912\u3002\u5c71\u8def\u3002\u4e8c\u5341\u4e00\u70b9\u724c\u684c\u3002\u6cf3\u6c60\u3002\u5929\u4f7f\u7396\u7470\uff0c\u4ee5\u53ca\u4e00\u5207\u7c73\u8272\u3001\u5976\u8272\u4e0e\u5e72\u7396\u7470\u8272\u3002\u97f3\u7bb1\u91cc\u7684\u738b\u83f2\u3002\u8574\u8bb8\u4eba\u4e0b\u53a8\u65f6\uff0c\u53bb Shu House\u3002",

      "story.title":     "\u6211\u7684\u6545\u4e8b",
      "story.lede":      "\u4ece\u5a01\u8fdc\u53bf\u5230\u91cd\u5e86\uff0c\u5230\u897f\u5fb7\u5dde\uff0c\u518d\u5230\u8fd9\u91cc\u3002",
      "story.h1":        "\u56db\u5ddd",
      "story.p1":        "\u6211\u51fa\u751f\u5728\u56db\u5ddd\u5a01\u8fdc\u53bf\uff0c\u662f\u5bb6\u91cc\u7684\u8001\u5927\u3002\u5982\u679c\u4f60\u5403\u8fc7\u8ba9\u5634\u53d1\u9ebb\u7684\u83dc\uff0c\u4f60\u5c31\u5df2\u7ecf\u8ba4\u8bc6\u6211\u7684\u5bb6\u4e61\u4e86\u3002",
      "story.h2":        "\u91cd\u5e86",
      "story.p2":        "\u6211\u5728\u91cd\u5e86\u5927\u5b66\u5b66\u6750\u6599\u79d1\u5b66\u4e0e\u5de5\u7a0b\u3002\u90a3\u662f\u4e00\u5ea7\u5c71\u57ce\uff0c\u5230\u5904\u662f\u53f0\u9636\uff0c\u6c5f\u4e0a\u5e38\u5e74\u6709\u96fe\u3002",
      "story.h3":        "\u5fb7\u5dde",
      "story.p3":        "\u540e\u6765\u5230\u5fb7\u5dde\u7406\u5de5\u5927\u5b66\u8bfb\u7edf\u8ba1\u5b66\u7855\u58eb\uff0c\u5728\u5362\u5e03\u514b\u3002\u91cd\u5e86\u662f\u7ad6\u7684\uff0c\u90a3\u91cc\u662f\u5e73\u7684\uff1b\u5bb6\u4e61\u6f6e\u6e7f\uff0c\u90a3\u91cc\u5e72\u71e5\u3002\u79bb\u719f\u6089\u7684\u4e00\u5207\u90fd\u5f88\u8fdc\uff0c\u8fdc\u5230\u6211\u5fc5\u987b\u91cd\u65b0\u957f\u51fa\u4e00\u4e2a\u81ea\u5df1\u3002\u6211\u4ecd\u7136\u5e86\u5e78\u6211\u90a3\u4e48\u505a\u4e86\u3002",
      "story.h4":        "\u4e1c\u90e8",
      "story.p4":        "\u4e4b\u540e\u751f\u6d3b\u5f80\u4e1c\u8d70 \u2014 \u65b0\u6cfd\u897f\uff0c\u7136\u540e\u662f\u5bbe\u5915\u6cd5\u5c3c\u4e9a\u3002\u4e24\u4e2a\u5973\u513f\u5728\u90a3\u6bb5\u65e5\u5b50\u91cc\u957f\u5927\u3002\u73b0\u5728\u6211\u5728 AT Prep \u5de5\u4f5c\uff0c\u5e2e\u9ad8\u4e2d\u751f\u60f3\u6e05\u695a\u600e\u4e48\u53bb\u5230\u4ed6\u4eec\u60f3\u53bb\u7684\u5730\u65b9\u3002\u521d\u5230\u964c\u751f\u4e4b\u5730\u3001\u6478\u7d22\u89c4\u5219\u662f\u4ec0\u4e48\u6ecb\u5473\uff0c\u6211\u662f\u77e5\u9053\u7684\u3002",
      "story.h5":        "\u5143\u65e6",
      "story.p5":        "\u6211\u548c Brian \u5728 Tinder \u4e0a\u8ba4\u8bc6 \u2014 \u5f00\u573a\u767d\u4e0d\u7b97\u6d6a\u6f2b \u2014 \u7136\u540e\u5728 2025 \u5e74\u5143\u65e6\u90a3\u5929\u4e8e UMI \u7b2c\u4e00\u6b21\u7ea6\u4f1a\u3002\u5728\u4e00\u5e74\u7684\u7b2c\u4e00\u5929\u5f00\u59cb\u4e00\u4ef6\u4e8b\uff0c\u770b\u6765\u662f\u4e2a\u597d\u5146\u5934\u3002\u8fd9\u4e2a\u7f51\u7ad9\u662f\u4ed6\u505a\u7684\u3002",
      "doc.title.index":   "周晓玲（Lindsey Zhou）— 中国成都",
      "doc.title.gallery": "照片 — 周晓玲（Lindsey Zhou）",

      "name":            "周晓玲",
      "altName":         "Xiaoling Zhou",
      "tagline":         "四川辣妹子",
      "origin":          "来自中国四川威远县",
      "origin.map":      "在谷歌地图中查看威远县",
      "like.cooking":    "做川菜",
      "like.hiking":     "徒步",
      "like.blackjack":  "二十一点",
      "like.swimming":   "游泳",
      "about.work":      "AT Prep · 纽约州大颈镇",
      "about.birthday":  "农历生日",
      "about.lives":     "现居美国宾夕法尼亚州威洛格罗夫",
      "about.lives.map": "在谷歌地图中查看威洛格罗夫",
      "about.family":    "离异，育有两个可爱的女儿",
      "about.ms":        "统计学硕士 · 德州理工大学",
      "about.bs":        "材料科学与工程学士 · 重庆大学",

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
