#!/usr/bin/env python3
"""Stamp styles.css / script.js / gallery.js with a content hash in the HTML.

Browsers cache stylesheets aggressively, so a deploy that only changes CSS can
leave visitors on the old file and a broken-looking page. Run this after editing
any of those assets, before committing:

    python3 tools/bust-cache.py
"""
import hashlib, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent


def digest(name: str) -> str:
    return hashlib.md5((ROOT / name).read_bytes()).hexdigest()[:8]


PAGES = {"index.html": ["styles.css", "i18n.js", "script.js"],
         "gallery.html": ["styles.css", "i18n.js", "gallery.js"]}

for page, assets in PAGES.items():
    p = ROOT / page
    s = original = p.read_text()
    for a in assets:
        attr = "href" if a.endswith(".css") else "src"
        s = re.sub(rf'{attr}="{re.escape(a)}(\?v=[a-f0-9]+)?"',
                   f'{attr}="{a}?v={digest(a)}"', s)
    if s != original:
        p.write_text(s)
        print(f"updated {page}")
    else:
        print(f"{page} already current")
