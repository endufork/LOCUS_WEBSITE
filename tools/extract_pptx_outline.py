import argparse
import json
import sys
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET


NS = {
    "a": "http://schemas.openxmlformats.org/drawingml/2006/main",
    "p": "http://schemas.openxmlformats.org/presentationml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
}


def slide_paths(zf):
    names = set(zf.namelist())
    presentation = ET.fromstring(zf.read("ppt/presentation.xml"))
    rels = ET.fromstring(zf.read("ppt/_rels/presentation.xml.rels"))
    rel_targets = {}
    for rel in rels:
        rel_id = rel.attrib.get("Id")
        target = rel.attrib.get("Target")
        if rel_id and target:
            rel_targets[rel_id] = "ppt/" + target.lstrip("/")

    paths = []
    for sld_id in presentation.findall(".//p:sldId", NS):
        rel_id = sld_id.attrib.get(f"{{{NS['r']}}}id")
        target = rel_targets.get(rel_id)
        if target in names:
            paths.append(target)
    return paths


def collect_text(shape):
    paragraphs = []
    for paragraph in shape.findall(".//a:p", NS):
        runs = []
        for t in paragraph.findall(".//a:t", NS):
            if t.text:
                runs.append(t.text)
        text = "".join(runs).strip()
        if text:
            paragraphs.append(text)
    return paragraphs


def extract(path):
    data = {"file": str(path), "slides": []}
    with zipfile.ZipFile(path) as zf:
        for idx, slide_path in enumerate(slide_paths(zf), 1):
            root = ET.fromstring(zf.read(slide_path))
            texts = []
            for shape in root.findall(".//p:sp", NS):
                texts.extend(collect_text(shape))
            pictures = len(root.findall(".//p:pic", NS))
            data["slides"].append(
                {
                    "slide": idx,
                    "title": texts[0] if texts else "",
                    "text": texts,
                    "picture_count": pictures,
                }
            )
    return data


def main():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    parser = argparse.ArgumentParser()
    parser.add_argument("pptx", nargs="*")
    args = parser.parse_args()
    pptx_files = [Path(p) for p in args.pptx]
    if not pptx_files:
        pptx_files = sorted(Path("website_input").glob("*.pptx"))
    result = [extract(p) for p in pptx_files]
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
