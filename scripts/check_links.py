"""Vérifie les liens du dépôt.

Usage :
    python scripts/check_links.py            # vérification hors ligne
    python scripts/check_links.py --online   # teste aussi les adresses externes
    python scripts/check_links.py --strict   # échoue s'il reste des TODO_URL

Contrôles :
1. Fichiers HTML et Markdown : chaque lien relatif (href, src, [texte](lien))
   pointe vers un fichier existant, et chaque ancre #id existe dans la page cible HTML.
2. Attributs data-lien : chaque clé existe dans js/config.js.
3. js/config.js : liste les adresses encore à compléter (TODO_URL).
4. Avec --online : chaque adresse externe répond (requête HEAD, puis GET si refusée).

Code de sortie : 0 si tout va bien, 1 sinon. Bibliothèque standard uniquement.
"""

from __future__ import annotations

import argparse
import re
import sys
import urllib.error
import urllib.request
from dataclasses import dataclass, field
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

from config_liens import RACINE, TODO, lire_liens, resoudre

# .claude et rules-ref : configuration locale de l'intervenant, non publiée (voir .gitignore).
DOSSIERS_IGNORES = {".git", ".venv", "venv", "node_modules", "__pycache__", ".claude", "rules-ref"}
FICHIERS_IGNORES = {"CLAUDE.md"}
SCHEMAS_EXTERNES = ("http://", "https://")
SCHEMAS_IGNORES = ("mailto:", "tel:", "data:", "javascript:")
DELAI_RESEAU_S = 10
PREMIER_CODE_ERREUR_HTTP = 400

_LIEN_MD_RE = re.compile(r"(?<!!)\[[^\]]*\]\(([^)\s]+)(?:\s+\"[^\"]*\")?\)|!\[[^\]]*\]\(([^)\s]+)\)")
_BLOC_CODE_MD_RE = re.compile(r"```.*?```|`[^`\n]*`", re.DOTALL)


@dataclass
class PageHtml:
    """Liens, ancres et clés data-lien relevés dans une page HTML."""

    liens: list[str] = field(default_factory=list)
    ids: set[str] = field(default_factory=set)
    cles_config: list[str] = field(default_factory=list)


class _Analyseur(HTMLParser):
    """Relève href/src, id et data-lien d'une page HTML."""

    def __init__(self) -> None:
        super().__init__()
        self.page = PageHtml()

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        """Mémorise les attributs utiles de chaque balise ouvrante."""
        valeurs = {nom: valeur for nom, valeur in attrs if valeur is not None}
        for nom in ("href", "src"):
            if nom in valeurs:
                self.page.liens.append(valeurs[nom])
        if "id" in valeurs:
            self.page.ids.add(valeurs["id"])
        if "data-lien" in valeurs:
            self.page.cles_config.append(valeurs["data-lien"])


def analyser_html(chemin: Path) -> PageHtml:
    """Analyse une page HTML."""
    analyseur = _Analyseur()
    analyseur.feed(chemin.read_text(encoding="utf-8"))
    return analyseur.page


def liens_markdown(chemin: Path) -> list[str]:
    """Liens d'un fichier Markdown, hors blocs de code."""
    texte = _BLOC_CODE_MD_RE.sub("", chemin.read_text(encoding="utf-8"))
    return [m.group(1) or m.group(2) for m in _LIEN_MD_RE.finditer(texte)]


def fichiers_a_verifier() -> list[Path]:
    """Tous les .html et .md du dépôt, hors dossiers ignorés."""
    fichiers = []
    for chemin in sorted(RACINE.rglob("*")):
        if any(partie in DOSSIERS_IGNORES for partie in chemin.relative_to(RACINE).parts):
            continue
        if chemin.name in FICHIERS_IGNORES:
            continue
        if chemin.suffix in {".html", ".md"} and chemin.is_file():
            fichiers.append(chemin)
    return fichiers


def verifier_lien_local(source: Path, lien: str, cache_html: dict[Path, PageHtml]) -> str | None:
    """Retourne un message d'erreur si le lien relatif est cassé, sinon None."""
    morceaux = urlsplit(lien)
    cible = source if not morceaux.path else (source.parent / unquote(morceaux.path)).resolve()
    if morceaux.path.endswith("/") or cible.is_dir():
        cible = cible / "index.html" if (cible / "index.html").exists() else cible / "README.md"
    if not cible.exists():
        return f"fichier introuvable : {lien}"
    if RACINE not in cible.parents and cible != RACINE:
        return f"lien hors du dépôt : {lien}"
    ancre = morceaux.fragment
    if ancre and cible.suffix == ".html":
        page = cache_html.setdefault(cible, analyser_html(cible))
        if ancre not in page.ids and not ancre.isdigit():
            return f"ancre #{ancre} absente de {cible.relative_to(RACINE)}"
    return None


def tester_url(url: str) -> str | None:
    """Retourne un message d'erreur si l'adresse externe ne répond pas, sinon None."""
    entetes = {"User-Agent": "check-links/1.0 (verification de liens)"}
    for methode in ("HEAD", "GET"):
        requete = urllib.request.Request(url, method=methode, headers=entetes)  # noqa: S310 — schéma http(s) vérifié par l'appelant
        try:
            with urllib.request.urlopen(requete, timeout=DELAI_RESEAU_S) as reponse:  # noqa: S310 — idem
                if reponse.status < PREMIER_CODE_ERREUR_HTTP:
                    return None
        except urllib.error.HTTPError as erreur:
            if methode == "GET":
                return f"HTTP {erreur.code}"
        except (urllib.error.URLError, TimeoutError, OSError) as erreur:
            return f"injoignable ({erreur})"
    return "réponse inattendue"


def verifier_fichiers(cles_connues: set[str], externes: set[str]) -> list[str]:
    """Contrôles 1 et 2 ; remplit externes avec les adresses http(s) rencontrées."""
    erreurs: list[str] = []
    cache_html: dict[Path, PageHtml] = {}
    for fichier in fichiers_a_verifier():
        relatif = fichier.relative_to(RACINE)
        if fichier.suffix == ".html":
            page = cache_html.setdefault(fichier.resolve(), analyser_html(fichier))
            liens = page.liens
            erreurs.extend(
                f"{relatif} : clé data-lien inconnue dans js/config.js : {cle}"
                for cle in page.cles_config
                if cle not in cles_connues
            )
        else:
            liens = liens_markdown(fichier)
        for lien in liens:
            if lien.startswith(SCHEMAS_EXTERNES):
                externes.add(lien)
            elif lien in {"", "#"} or lien.startswith(SCHEMAS_IGNORES):
                continue
            else:
                message = verifier_lien_local(fichier.resolve(), lien, cache_html)
                if message:
                    erreurs.append(f"{relatif} : {message}")
    return erreurs


def main(argv: list[str] | None = None) -> int:
    """Point d'entrée de la vérification."""
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--online", action="store_true", help="tester aussi les adresses externes")
    parser.add_argument("--strict", action="store_true", help="échouer s'il reste des TODO_URL")
    args = parser.parse_args(argv)

    liens_config = lire_liens()
    externes: set[str] = set()
    erreurs = verifier_fichiers(set(liens_config), externes)

    a_completer = [cle for cle, lien in liens_config.items() if lien.url == TODO]
    for cle in liens_config:
        url = resoudre(cle, liens_config)
        if url:
            externes.add(url)

    if args.online:
        for url in sorted(externes):
            message = tester_url(url)
            print(f"  {'OK ' if message is None else 'KO '} {url}" + (f" — {message}" if message else ""))
            if message:
                erreurs.append(f"adresse externe : {url} — {message}")
    else:
        print(f"{len(externes)} adresses externes non testées (ajouter --online pour les tester).")

    if a_completer:
        print(f"À compléter dans js/config.js (TODO_URL) : {', '.join(a_completer)}")
        if args.strict:
            erreurs.append(f"{len(a_completer)} adresse(s) TODO_URL restante(s)")

    if erreurs:
        print(f"\n{len(erreurs)} problème(s) :")
        for erreur in erreurs:
            print(f"  - {erreur}")
        return 1
    print(f"\nTous les liens locaux sont valides ({len(fichiers_a_verifier())} fichiers vérifiés).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
