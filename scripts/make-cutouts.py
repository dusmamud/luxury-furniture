"""Transparent cutouts with rembg (u2net) — low-memory edition.

Lesson from the first attempt (OOM-killed): alpha_matting on 1920px images
blows the VM's 6GB memory. So: downscale to max 1000px BEFORE rembg, no
alpha matting, and smooth the alpha edge with PIL instead (radius-1 blur +
tiny threshold to kill halos). Model u2net.onnx is already cached in
~/.rembg/models/u2net/ from the ShopMate cutout work.

Masters: PNG. Delivery: lossy WebP (alpha) + AVIF (alpha) via ffmpeg.

Model: u2netp (4.5MB, ~1/40 of full u2net) — the full u2net session OOM-killed
the VM twice (6GB cgroup) even on downscaled images. u2netp runs in ~9s/image.
"""
import io
import os
import subprocess
from pathlib import Path

os.environ.setdefault("OMP_NUM_THREADS", "2")
os.environ.setdefault("ORT_NUM_THREADS", "2")

from PIL import Image, ImageFilter  # noqa: E402
from rembg import new_session, remove  # noqa: E402

SESSION = new_session("u2netp")

SRC = Path.home() / "workspace/luxury-furniture/static/images"
OUT = SRC / "cutouts"
OUT.mkdir(exist_ok=True)

# (source, output stem, crop box as fractions (l, t, r, b) or None)
JOBS = [
    ("hero-sofa.webp", "sofa", (0.0, 0.22, 1.0, 1.0)),
    ("outdoor-lounge.webp", "outdoor-chairs", None),
    ("modern-couch.webp", "modern-sofa", (0.0, 0.0, 0.82, 1.0)),
    ("modern-chair.jpg", "modern-chair", None),
    ("bamboo-swing.webp", "swing-chair", None),
    ("hanging-light.jpg", "hanging-light", None),
    ("indoor-plants.webp", "plant", (0.18, 0.0, 1.0, 1.0)),
]


def trim(im: Image.Image, pad: int = 8) -> Image.Image:
    alpha = im.split()[3]
    bbox = alpha.getbbox()
    if not bbox:
        return im
    l, t, r, b = bbox
    l = max(0, l - pad)
    t = max(0, t - pad)
    r = min(im.width, r + pad)
    b = min(im.height, b + pad)
    return im.crop((l, t, r, b))


def smooth_alpha(im: Image.Image) -> Image.Image:
    """Feather the cut edge slightly and drop near-transparent halo pixels."""
    r, g, b, a = im.split()
    a = a.filter(ImageFilter.GaussianBlur(1))
    a = a.point(lambda v: 0 if v < 12 else v)
    return Image.merge("RGBA", (r, g, b, a))


def to_avif(png: Path, avif: Path) -> bool:
    """Encode with pillow-avif-plugin (libavif): ffmpeg's libaom-av1 build on
    this VM drops the alpha plane (verified: decoded AVIF was RGB, black
    where transparency was). PIL round-trip keeps alpha 0-255."""
    import pillow_avif  # noqa: F401

    try:
        Image.open(png).convert("RGBA").save(avif, "AVIF", quality=70, speed=6)
        return True
    except Exception as e:  # noqa: BLE001
        print(f"  avif failed for {png.name}: {e}")
        return False


for src_name, stem, crop in JOBS:
    src = SRC / src_name
    im = Image.open(src).convert("RGB")
    if crop:
        w, h = im.size
        im = im.crop((int(w * crop[0]), int(h * crop[1]), int(w * crop[2]), int(h * crop[3])))
    # Downscale BEFORE rembg: displayed at <= ~600px, 1000px is plenty.
    if max(im.size) > 1000:
        im.thumbnail((1000, 1000), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, "PNG")
    out_bytes = remove(buf.getvalue(), session=SESSION)  # u2netp: low memory
    cut = Image.open(io.BytesIO(out_bytes)).convert("RGBA")
    cut = smooth_alpha(cut)
    cut = trim(cut)
    png = OUT / f"{stem}.png"
    cut.save(png, "PNG", optimize=True)
    webp = OUT / f"{stem}.webp"
    cut.save(webp, "WEBP", quality=88, method=6)
    avif = OUT / f"{stem}.avif"
    ok_avif = to_avif(png, avif)
    print(
        f"{stem}: {cut.size} png={png.stat().st_size//1024}KB "
        f"webp={webp.stat().st_size//1024}KB "
        f"avif={'%dKB' % (avif.stat().st_size//1024) if ok_avif else 'FAILED'}",
        flush=True,
    )
print("done")
