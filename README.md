# Lindsey Zhou — link page

A small, fast, dependency-free link-in-bio page for **Lindsey (Xiaoling) Zhou**, hosted on GitHub Pages.

**Live:** https://lindseyzhou.com/

## What's here

| File | Purpose |
| --- | --- |
| `index.html` | Markup, inline brand SVGs, OpenGraph/Twitter meta, `Person` JSON-LD |
| `styles.css` | Palette, layout, animations, light/dark themes |
| `script.js` | Theme toggle, WeChat copy-to-clipboard, Web Share |
| `gallery.html` | Photo gallery page (grid + lightbox) |
| `gallery.js` | Gallery rendering, lightbox, keyboard/swipe nav |
| `assets/gallery/` | `photos/`, `videos/`, generated `thumbs/`, `manifest.json` |
| `tools/build-gallery.py` | Builds thumbnails and the manifest |
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

## Adding photos to the gallery

Drop full-size images into `assets/gallery/photos/` and videos into
`assets/gallery/videos/`, then:

```bash
python3 tools/build-gallery.py --album "Favorites"
```

That writes width-limited thumbnails to `assets/gallery/thumbs/` and regenerates
`assets/gallery/manifest.json` with dimensions, so the grid does not reflow as images
load. Video posters are extracted with `ffmpeg` if it is installed.

`gallery.html` is not linked from `index.html` yet — add a card once it has photos in it.

## After editing CSS or JS

Browsers cache `styles.css` hard, so a CSS-only deploy can leave visitors on the old
file and a broken-looking page. Re-stamp the content hashes before committing:

```bash
python3 tools/bust-cache.py
```

## Local preview

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploying

GitHub Pages serves the `main` branch root. Pushing to `main` publishes.
`.nojekyll` is present so Jekyll doesn't process the files.

## Custom domain and HTTPS

`CNAME` points the site at `lindseyzhou.com`. GitHub Pages issues and renews a
**Let's Encrypt** certificate for that domain automatically — there is no certificate
to commit here, and nothing to renew by hand.

Two things have to be true for it to work:

**1. DNS points at GitHub Pages.** The apex needs four `A` records, and ideally the four
matching `AAAA` records for IPv6:

```
A     @   185.199.108.153
A     @   185.199.109.153
A     @   185.199.110.153
A     @   185.199.111.153
AAAA  @   2606:50c0:8000::153
AAAA  @   2606:50c0:8001::153
AAAA  @   2606:50c0:8002::153
AAAA  @   2606:50c0:8003::153
```

The domain must resolve straight to those addresses. If it is proxied through a CDN
(Cloudflare's orange cloud, say), GitHub cannot complete the ACME challenge and the
certificate never issues.

**2. HTTPS is enforced.** In **Settings → Pages**, tick **Enforce HTTPS**. That is what
serves the Let's Encrypt certificate and 301s `http://` to `https://`.

**Enforce HTTPS** stays greyed out until the certificate exists, so the order is always
DNS check -> certificate -> checkbox. Read the status line under the domain field before
touching anything:

- **DNS Check in Progress** (yellow) — GitHub is still verifying. Issuance has not started
  yet, and the greyed-out checkbox is just a symptom of that. Wait. Removing and re-adding
  the domain here restarts the check and makes it slower, not faster.
- **DNS check successful** (green), but the checkbox is still greyed out an hour later —
  now issuance is genuinely stuck. Clear the custom domain field, save, put
  `lindseyzhou.com` back, and save again to re-trigger it.

The whole sequence usually finishes in a few minutes and can take up to 24 hours.

To check what is actually being served:

```bash
curl -sv https://lindseyzhou.com/ 2>&1 | grep -E 'subject:|issuer:'
```

`subject: CN=lindseyzhou.com` means the certificate is live. `subject: CN=*.github.io`
means it is not — GitHub is still falling back to its default wildcard.
