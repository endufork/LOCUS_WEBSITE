import argparse
import shutil
import zipfile
from pathlib import Path


def extract_media(pptx_path, output_root):
    target_dir = output_root / pptx_path.stem
    target_dir.mkdir(parents=True, exist_ok=True)
    count = 0
    with zipfile.ZipFile(pptx_path) as zf:
        for name in zf.namelist():
            if not name.startswith("ppt/media/"):
                continue
            suffix = Path(name).suffix.lower()
            if suffix not in {".png", ".jpg", ".jpeg", ".gif", ".emf", ".wmf", ".svg"}:
                continue
            count += 1
            output_name = f"{count:03d}{suffix}"
            with zf.open(name) as source, (target_dir / output_name).open("wb") as dest:
                shutil.copyfileobj(source, dest)
    return target_dir, count


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input-dir", default="website_input")
    parser.add_argument("--output-dir", default="public/assets/source-ppt")
    args = parser.parse_args()

    input_dir = Path(args.input_dir)
    output_root = Path(args.output_dir)
    output_root.mkdir(parents=True, exist_ok=True)
    for pptx_path in sorted(input_dir.glob("*.pptx")):
        target_dir, count = extract_media(pptx_path, output_root)
        print(f"{pptx_path.name}: {count} media files -> {target_dir}")


if __name__ == "__main__":
    main()
