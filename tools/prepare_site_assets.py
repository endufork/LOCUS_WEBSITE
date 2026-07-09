import shutil
from pathlib import Path


ASSETS = {
    "hero-production-line.png": "presentation-Locus Technology Suzhou Ltd-20250816 English Ver for SBD 20260525/039.png",
    "engineering-layout.png": "presentation-Locus Technology Suzhou Ltd-20250816 English Ver for SBD 20260525/040.png",
    "motor-testing-equipment.png": "presentation-Locus Technology Suzhou Ltd-20250816 English Ver for SBD 20260525/041.png",
    "automation-cell.png": "presentation-Locus Technology Suzhou Ltd-20250816 English Ver for SBD 20260525/044.png",
    "medical-equipment.png": "presentation-Locus Technology Suzhou Ltd-20250816 English Ver for SBD 20260525/067.jpeg",
    "test-equipment.png": "presentation-Locus Technology Suzhou Ltd   -202504/080.png",
}

CUSTOMER_LOGOS = [
    "001.jpeg",
    "002.png",
    "004.png",
    "005.png",
    "006.png",
    "007.png",
    "008.png",
    "009.png",
    "010.png",
    "011.png",
    "012.png",
    "013.png",
    "014.png",
    "015.jpeg",
    "016.png",
    "018.jpeg",
    "019.jpeg",
    "020.png",
    "102.png",
]

CERTIFICATES = [
    "021.png",
    "022.jpeg",
    "023.jpeg",
    "024.jpeg",
    "025.jpeg",
    "026.png",
    "027.png",
    "028.png",
    "029.png",
    "030.png",
]


def main():
    source_root = Path("public/assets/source-ppt")
    target_root = Path("public/assets/site")
    target_root.mkdir(parents=True, exist_ok=True)
    for target_name, source_name in ASSETS.items():
        source = source_root / source_name
        target = target_root / target_name
        if source.exists():
            shutil.copy2(source, target)
            print(f"{source} -> {target}")
        else:
            print(f"missing: {source}")

    zh_source = source_root / "presentation-Locus Technology Suzhou Ltd   -202504"
    for index, source_name in enumerate(CUSTOMER_LOGOS, 1):
        source = zh_source / source_name
        if source.exists():
            target = target_root / "customers" / f"customer-{index:02d}{source.suffix.lower()}"
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(source, target)
            print(f"{source} -> {target}")

    for index, source_name in enumerate(CERTIFICATES, 1):
        source = zh_source / source_name
        if source.exists():
            target = target_root / "certificates" / f"certificate-{index:02d}{source.suffix.lower()}"
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(source, target)
            print(f"{source} -> {target}")


if __name__ == "__main__":
    main()
