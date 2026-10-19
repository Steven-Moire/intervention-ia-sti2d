# Le kit « garde-fous »

> Facultatif, à ton rythme. Ce kit accompagne la [fiche 4](../04-garde-fous-assistant.md). Lis-la d'abord : elle explique pourquoi ces fichiers existent.

Ce dossier contient de quoi **encadrer un assistant de code**, quel qu'il soit : un assistant en ligne, un outil installé sur ton ordinateur, ou un modèle ouvert que tu fais tourner toi-même (voir la [fiche 5](../05-assistant-en-local.md)).

Tout est du **texte simple** (Markdown) ou un petit script lisible. Rien ne s'exécute tout seul. Rien n'est lié à un produit ou à un abonnement.

## Ce qu'il y a dedans

| Fichier | À quoi il sert |
|---|---|
| [AGENTS.md](AGENTS.md) | Un **modèle de fichier de règles** : comment l'assistant doit se comporter dans ton projet. À copier à la racine de ton projet et à compléter. |
| [consignes/relecture-de-code.md](consignes/relecture-de-code.md) | Une liste de points à vérifier sur du code (le tien ou celui de l'assistant). |
| [consignes/revue-securite.md](consignes/revue-securite.md) | Les erreurs de sécurité les plus courantes sur un site web simple. |
| [consignes/chercher-avant-de-coder.md](consignes/chercher-avant-de-coder.md) | Vérifier si une solution existe déjà avant d'écrire du code. |
| [consignes/verifier-avant-de-dire-fini.md](consignes/verifier-avant-de-dire-fini.md) | Les vérifications à faire avant de dire « c'est fini ». |
| [consignes/bilan-de-la-semaine.md](consignes/bilan-de-la-semaine.md) | Un rituel : faire le point sur son projet sans rien corriger dans la foulée. |
| [hooks/pre-commit](hooks/pre-commit) | Un **script git** qui bloque un commit contenant un mot de passe, une clé ou un mot que tu as interdit. Marche sans aucun assistant. |
| [LICENCE-ECC.md](LICENCE-ECC.md) | Les crédits : une partie des consignes est adaptée d'un projet libre. |

## Comment s'en servir

**Avec un assistant de code.** La plupart des assistants lisent un fichier de règles placé à la racine du projet. Selon l'outil, il s'appelle `AGENTS.md`, ou porte un autre nom indiqué dans sa documentation. Copie [AGENTS.md](AGENTS.md) à cet endroit et complète la section « Mon projet ».

Pour une consigne précise, demande-lui par exemple :

> Lis `docs/aller-plus-loin/kit/consignes/relecture-de-code.md` et applique cette relecture à mes dernières modifications. Ne modifie rien : donne-moi seulement la liste des problèmes.

**Sans assistant.** Les consignes sont aussi des listes de vérification pour toi. Et le hook `pre-commit` fonctionne tout seul, avec git.

## Installer le hook `pre-commit`

Depuis la racine de ton dépôt (Git Bash sous Windows, ou un terminal sous macOS/Linux) :

```bash
cp docs/aller-plus-loin/kit/hooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

**Lis le script avant de l'installer** : c'est une bonne habitude pour tout code que tu n'as pas écrit. Il fait environ 80 lignes commentées.

Pour ajouter tes propres mots interdits (ton nom de famille, ton adresse…), crée à la racine un fichier `.termes-interdits.txt`, avec un mot par ligne. Ce fichier est déjà dans le `.gitignore` : il ne sera jamais publié.

## Adapter, pas recopier

Ces fichiers sont un **point de départ**. Un bon fichier de règles est court et parle de **ton** projet. Supprime ce qui ne te sert pas, ajoute ce que tu as appris en te trompant. C'est comme ça que celui de l'intervenant s'est construit : une règle à chaque erreur qu'il ne voulait plus refaire.
