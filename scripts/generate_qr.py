"""Génère les QR codes (SVG) de assets/qr/ à partir de js/config.js.

Usage :
    pip install -r scripts/requirements.txt
    python scripts/generate_qr.py

- Une clé avec une vraie adresse → assets/qr/<cle>.svg (QR code scannable).
- Une clé encore en TODO_URL     → assets/qr/<cle>.svg (cadre « QR à générer »),
  pour que la présentation n'affiche jamais d'image cassée.

Tout est calculé en local : aucune adresse n'est envoyée à un service en ligne.
"""

from __future__ import annotations

import sys
from html import escape
from pathlib import Path

from config_liens import RACINE, lire_liens, resoudre

DOSSIER_QR = RACINE / "assets" / "qr"

_GABARIT_A_COMPLETER = """<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200" role="img">
  <title>QR code à générer : {label}</title>
  <rect x="4" y="4" width="192" height="192" rx="12"
        fill="#fef3c7" stroke="#92400e" stroke-width="4" stroke-dasharray="12 8"/>
  <g font-family="system-ui, sans-serif" text-anchor="middle" fill="#92400e">
    <text x="100" y="88" font-size="22" font-weight="700">QR à générer</text>
    <text x="100" y="118" font-size="14">compléter js/config.js</text>
    <text x="100" y="140" font-size="14">puis lancer</text>
    <text x="100" y="160" font-size="13">scripts/generate_qr.py</text>
  </g>
</svg>
"""


def ecrire_qr(url: str, destination: Path) -> None:
    """Écrit le QR code SVG de url dans destination."""
    import qrcode  # noqa: PLC0415 — dépendance facultative, importée seulement si on génère
    import qrcode.image.svg  # noqa: PLC0415 — idem

    qr = qrcode.QRCode(
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=10,
        border=4,
        image_factory=qrcode.image.svg.SvgPathFillImage,
    )
    qr.add_data(url)
    qr.make(fit=True)
    image = qr.make_image()
    with destination.open("wb") as fichier:
        image.save(fichier)


def ecrire_a_completer(label: str, destination: Path) -> None:
    """Écrit un cadre « QR à générer » à la place d'un QR code."""
    destination.write_text(_GABARIT_A_COMPLETER.format(label=escape(label)), encoding="utf-8")


def main() -> int:
    """Point d'entrée : génère un SVG par clé de window.LIENS."""
    try:
        import qrcode  # noqa: F401, PLC0415 — simple vérification de présence
    except ImportError:
        print("La bibliothèque qrcode manque : pip install -r scripts/requirements.txt", file=sys.stderr)
        return 1

    DOSSIER_QR.mkdir(parents=True, exist_ok=True)
    liens = lire_liens()
    a_completer: list[str] = []
    for cle, lien in liens.items():
        destination = DOSSIER_QR / f"{cle}.svg"
        url = resoudre(cle, liens)
        if url is None:
            ecrire_a_completer(lien.label, destination)
            a_completer.append(cle)
            print(f"  [à compléter] {cle}")
        else:
            ecrire_qr(url, destination)
            print(f"  [QR]          {cle} -> {url}")

    print(f"\n{len(liens)} fichiers écrits dans {DOSSIER_QR.relative_to(RACINE)}")
    if a_completer:
        print("Clés encore en TODO_URL : " + ", ".join(a_completer))
    return 0


if __name__ == "__main__":
    sys.exit(main())
