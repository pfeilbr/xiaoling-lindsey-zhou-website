# Lindsey Zhou — link page

A small, fast, dependency-free link-in-bio page for **Lindsey (Xiaoling) Zhou**, hosted on GitHub Pages.

**Live:** https://pfeilbr.github.io/xiaoling-lindsey-zhou-website/

## What's here

| File | Purpose |
| --- | --- |
| `index.html` | Markup, inline brand SVGs, OpenGraph/Twitter meta, `Person` JSON-LD |
| `styles.css` | Palette, layout, animations, light/dark themes |
| `script.js` | Theme toggle, WeChat copy-to-clipboard, Web Share |
| `assets/avatar.png` | Profile picture |
| `assets/favicon.svg` | Monogram favicon |

No build step, no framework, no external JS. The only network dependency is Google Fonts
(Fraunces + Inter), and the page degrades to system fonts if that fails.

## Links on the page

- LinkedIn — `in/xiaolingzhou`
- X (Twitter) — `@lindsey7926`
- Instagram — `@lindsey.zhou`
- Facebook — `lingling.zhou.96`
- WeChat — `ACL-beauty` (tap to copy; WeChat has no profile URL scheme)

## Features

- Responsive down to ~320px, laid out with fluid `clamp()` type
- Light + dark themes: follows the OS by default, overridable with the toggle, remembered in `localStorage`
- Animated gradient background, spinning avatar ring, staggered entrance
- Fully honours `prefers-reduced-motion`
- Keyboard accessible with visible focus rings; `aria-live` toast for copy feedback
- Clipboard fallback via `execCommand` for older/insecure contexts
- Print stylesheet

## Palette

Colours are pulled from the profile photo — caramel `#d59a55`, dusty rose `#d78e9e`,
olive `#7c8f6b`.

## Editing

Change a link or handle in `index.html` (each is one `<a class="link">` block). To swap the
profile picture, replace `assets/avatar.png` with a square image (400×400 or larger).

## Local preview

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploying

GitHub Pages serves the `main` branch root. Pushing to `main` publishes.
`.nojekyll` is present so Jekyll doesn't process the files.
