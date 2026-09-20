#!/usr/bin/env python3
"""Läs bildmappen och uppdatera bilder.js. Kräver enbart Python 3."""
import json
import re
from pathlib import Path
from urllib.parse import quote, unquote

ROOT = Path(__file__).resolve().parent
FOLDER = ROOT / 'bilder'
MANIFEST = ROOT / 'bilder.js'
SUPPORTED = {'.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'}


def main():
    FOLDER.mkdir(exist_ok=True)
    previous = {}
    if MANIFEST.exists():
        source = MANIFEST.read_text(encoding='utf-8')
        payload = source.split('window.PORTFOLIO_IMAGES =', 1)[-1].strip().rstrip(';')
        try:
            previous = {unquote(item['src']): item for item in json.loads(payload)}
        except (ValueError, TypeError, KeyError):
            raise SystemExit('Kunde inte läsa bilder.js. Kontrollera att listan använder giltig JSON (dubbla citattecken runt nycklar och texter). Ingen fil har ändrats.')
    found = sorted((file for file in FOLDER.iterdir() if file.is_file() and file.suffix.lower() in SUPPORTED), key=lambda file: file.name.casefold())
    images = []
    for file in found:
        src = file.relative_to(ROOT).as_posix()
        if src in previous:
            images.append({**previous[src], 'src': quote(src, safe='/')})
        else:
            title = re.sub(r'^\d+[-_\s]*', '', file.stem).replace('-', ' ').replace('_', ' ').strip().capitalize() or 'Utan titel'
            images.append({'src': quote(src, safe='/'), 'title': title, 'category': '', 'alt': title, 'example': False})
    output = '// Genererad av uppdatera.py. Bildtexterna kan ändras direkt här.\nwindow.PORTFOLIO_IMAGES = ' + json.dumps(images, ensure_ascii=False, indent=2) + ';\n'
    MANIFEST.write_text(output, encoding='utf-8')
    print(f'Klart! {len(images)} bilder hittades. Öppna eller ladda om index.html.')


if __name__ == '__main__':
    main()
