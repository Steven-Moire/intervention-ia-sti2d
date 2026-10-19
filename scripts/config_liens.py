"""Lecture de js/config.js, partagée par generate_qr.py et check_links.py.

Le fichier config.js est volontairement écrit dans un format simple
(une entrée par bloc, clés entre guillemets doubles) pour pouvoir être lu
ici sans dépendance JavaScript.
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from pathlib import Path

TODO = "TODO_URL"
RACINE = Path(__file__).resolve().parent.parent
CONFIG_JS = RACINE / "js" / "config.js"

_BLOC_LIENS_RE = re.compile(r"window\.LIENS\s*=\s*\{(?P<corps>.*)\};", re.DOTALL)
_ENTREE_RE = re.compile(r'"(?P<cle>[a-z0-9-]+)"\s*:\s*\{(?P<champs>[^{}]*)\}', re.DOTALL)
_CHAMP_RE = re.compile(r'(?P<nom>[a-z]+)\s*:\s*"(?P<valeur>[^"]*)"')


@dataclass(frozen=True)
class Lien:
    """Une entrée de window.LIENS."""

    cle: str
    label: str
    url: str | None
    base: str | None
    chemin: str | None


def lire_liens(chemin_config: Path = CONFIG_JS) -> dict[str, Lien]:
    """Retourne les entrées de window.LIENS, indexées par clé."""
    texte = chemin_config.read_text(encoding="utf-8")
    bloc = _BLOC_LIENS_RE.search(texte)
    if bloc is None:
        raise ValueError(f"window.LIENS introuvable dans {chemin_config}")
    liens: dict[str, Lien] = {}
    for entree in _ENTREE_RE.finditer(bloc.group("corps")):
        champs = {m.group("nom"): m.group("valeur") for m in _CHAMP_RE.finditer(entree.group("champs"))}
        cle = entree.group("cle")
        liens[cle] = Lien(
            cle=cle,
            label=champs.get("label", cle),
            url=champs.get("url"),
            base=champs.get("base"),
            chemin=champs.get("chemin"),
        )
    return liens


def resoudre(cle: str, liens: dict[str, Lien]) -> str | None:
    """Adresse finale d'une clé, ou None si elle reste à compléter (TODO_URL)."""
    lien = liens.get(cle)
    if lien is None:
        return None
    if lien.url is not None:
        return None if lien.url == TODO else lien.url
    if lien.base and lien.chemin:
        base = resoudre(lien.base, liens)
        if base is None:
            return None
        return base.rstrip("/") + "/" + lien.chemin.lstrip("/")
    return None
