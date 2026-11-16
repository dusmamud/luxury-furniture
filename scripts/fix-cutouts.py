"""Fix the two weak cutouts:
- sofa: tighter crop (arch + lamp out of frame) + full u2net (one image only,
  800px, no alpha matting) — u2netp kept the orange arch as foreground.
- modern-sofa: erase the plant-leaf fragment at the top-right corner.
"""
import io
import os

os.environ.setdefault("OMP_NUM_THREADS", "1")
from PIL import Image, ImageDraw, ImageFilter  # noqa: E402
from rembg import new_session, remove  # noqa: E402

SRC = "static/images"
OUT = "static/images/cutouts"


def smooth_alpha(im):
    r, g, b, a = im.split()
    a = a.filter(ImageFilter.GaussianBlur(1))
    a = a.point(lambda v: 0 if v < 12 else v)
    return Image.merge("RGBA", (r, g, b, a))


def trim(im, pad=8):
    bbox = im.split()[3].getbbox()
    if not bbox:
        return im
    l, t, r, b = bbox
    return im.crop(
        (max(0, l - pad), max(0, t - pad), min(im.width, r + pad), min(im.height, b + pad))
    )


def save_all(im, stem):
    im.save(f"{OUT}/{stem}.png", "PNG", optimize=True)
    im.save(f"{OUT}/{stem}.webp", "WEBP", quality=88, method=6)
    print(stem, im.size, "saved", flush=True)


# --- sofa: tight crop, full u2net ---
im = Image.open(f"{SRC}/hero-sofa.webp").convert("RGB")
w, h = im.size
im = im.crop((0, int(h * 0.42), w, h))
im.thumbnail((800, 800), Image.LANCZOS)
buf = io.BytesIO()
im.save(buf, "PNG")
out = remove(buf.getvalue(), session=new_session("u2net"))
cut = Image.open(io.BytesIO(out)).convert("RGBA")
save_all(trim(smooth_alpha(cut)), "sofa")

# --- modern-sofa: erase top-right plant fragment, re-trim ---
im = Image.open(f"{OUT}/modern-sofa.png").convert("RGBA")
r, g, b, a = im.split()
draw = ImageDraw.Draw(a)
w, h = im.size
draw.rectangle([int(w * 0.88), 0, w, int(h * 0.28)], fill=0)
im = Image.merge("RGBA", (r, g, b, a))
save_all(trim(im), "modern-sofa")
print("done")
