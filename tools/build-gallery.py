#!/usr/bin/env python3
"""Build assets/gallery/manifest.json from the files in assets/gallery/.

Drop full-size images into assets/gallery/photos/ and videos into
assets/gallery/videos/, then run:

    python3 tools/build-gallery.py --album "Belmar Beach, July 2026"

Thumbnails are written to assets/gallery/thumbs/. Video posters are
extracted with ffmpeg when it is available.
"""
import argparse, json, pathlib, shutil, subprocess, sys

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Pillow is required:  python3 -m pip install Pillow")

ROOT   = pathlib.Path(__file__).resolve().parent.parent
GAL    = ROOT / "assets" / "gallery"
PHOTOS = GAL / "photos"
VIDEOS = GAL / "videos"
THUMBS = GAL / "thumbs"

IMG_EXT = {".jpg", ".jpeg", ".png", ".webp", ".heic", ".gif"}
VID_EXT = {".mp4", ".mov", ".m4v", ".webm"}
THUMB_W = 480


def thumb_for(src: pathlib.Path) -> tuple[str, int, int]:
    """Write a width-limited thumbnail; return its relative path and full dimensions."""
    with Image.open(src) as im:
        im = ImageOps.exif_transpose(im)          # honour camera rotation
        w, h = im.size
        out = THUMBS / (src.stem + ".jpg")
        if im.mode not in ("RGB", "L"):
            im = im.convert("RGB")
        if w > THUMB_W:
            im = im.resize((THUMB_W, round(h * THUMB_W / w)), Image.LANCZOS)
        im.save(out, "JPEG", quality=78, optimize=True, progressive=True)
    return f"thumbs/{out.name}", w, h


def poster_for(src: pathlib.Path) -> str | None:
    if not shutil.which("ffmpeg"):
        return None
    out = THUMBS / (src.stem + ".jpg")
    # clips shorter than the seek point yield no frame, so fall back to the first one
    for seek in ("1", "0"):
        cmd = ["ffmpeg", "-y", "-loglevel", "error", "-ss", seek, "-i", str(src),
               "-frames:v", "1", "-vf", f"scale={THUMB_W}:-2", str(out)]
        if subprocess.run(cmd).returncode == 0 and out.exists():
            return f"thumbs/{out.name}"
    return None


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--album", default="", help="album name shown under the title")
    args = ap.parse_args()

    for d in (PHOTOS, VIDEOS, THUMBS):
        d.mkdir(parents=True, exist_ok=True)

    items = []

    for f in sorted(PHOTOS.iterdir()):
        if f.suffix.lower() not in IMG_EXT:
            continue
        thumb, w, h = thumb_for(f)
        items.append({"type": "photo", "src": f"photos/{f.name}",
                      "thumb": thumb, "w": w, "h": h, "alt": f.stem.replace("-", " ")})

    missing_ffmpeg = False
    for f in sorted(VIDEOS.iterdir()):
        if f.suffix.lower() not in VID_EXT:
            continue
        poster = poster_for(f)
        missing_ffmpeg = missing_ffmpeg or poster is None
        item = {"type": "video", "src": f"videos/{f.name}", "alt": f.stem.replace("-", " ")}
        if poster:
            item["poster"] = poster
            item["thumb"] = poster
        items.append(item)

    (GAL / "manifest.json").write_text(
        json.dumps({"album": args.album, "items": items}, indent=2) + "\n")

    photos = sum(1 for i in items if i["type"] == "photo")
    videos = len(items) - photos
    print(f"manifest.json: {photos} photo(s), {videos} video(s)")
    if missing_ffmpeg:
        print("note: ffmpeg not found — videos have no poster frame")


if __name__ == "__main__":
    main()
