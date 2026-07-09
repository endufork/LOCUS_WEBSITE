from pathlib import Path

from PIL import Image


def main():
    root = Path("public/assets/source-ppt")
    for path in sorted(root.rglob("*")):
        if path.suffix.lower() not in {".png", ".jpg", ".jpeg"}:
            continue
        try:
            with Image.open(path) as image:
                width, height = image.size
        except Exception:
            continue
        if width >= 500 or height >= 350:
            print(f"{path.as_posix()} {width}x{height}")


if __name__ == "__main__":
    main()
