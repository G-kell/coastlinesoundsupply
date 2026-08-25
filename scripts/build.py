#!/usr/bin/env python3
"""
Build script — stitches src/partials/*.html into src/pages/*.html and
assembles the final static site in dist/.

No dependencies beyond the Python 3 standard library (already installed
on macOS, Linux, and GitHub Actions runners) — nothing to `pip install`,
no package.json, no npm. Run it with:

    python3 scripts/build.py

Then open dist/index.html directly, or serve it locally:

    python3 -m http.server 8000 --directory dist

See README.md, "Local preview" and "Changing the header or footer".
"""

import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC_PAGES = ROOT / "src" / "pages"
SRC_PARTIALS = ROOT / "src" / "partials"
DIST = ROOT / "dist"

# Static files/folders copied through to dist/ unchanged — these live at
# the repo root because they are not templated and are not duplicated
# anywhere, so there's nothing for this build step to do for them.
PASSTHROUGH = ["assets", "sitemap.xml", "robots.txt", ".nojekyll", "CNAME"]

INCLUDE_PATTERN = re.compile(r"<!--\s*include:(\w+)\s*-->")


def load_partials():
    partials = {}
    for path in SRC_PARTIALS.glob("*.html"):
        partials[path.stem] = path.read_text(encoding="utf-8")
    return partials


def render(content, partials):
    def replace(match):
        name = match.group(1)
        if name not in partials:
            raise SystemExit(
                f"Unknown include '{name}' — no file at src/partials/{name}.html"
            )
        return partials[name]

    return INCLUDE_PATTERN.sub(replace, content)


def main():
    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir(parents=True)

    partials = load_partials()

    page_count = 0
    for path in sorted(SRC_PAGES.glob("*.html")):
        content = path.read_text(encoding="utf-8")
        rendered = render(content, partials)
        (DIST / path.name).write_text(rendered, encoding="utf-8")
        page_count += 1

    passthrough_count = 0
    for name in PASSTHROUGH:
        src = ROOT / name
        if not src.exists():
            continue
        dest = DIST / name
        if src.is_dir():
            shutil.copytree(src, dest)
        else:
            shutil.copy2(src, dest)
        passthrough_count += 1

    print(f"Built {page_count} page(s) into dist/")
    print(f"Copied {passthrough_count} static file(s)/folder(s) into dist/")


if __name__ == "__main__":
    main()
