# 4. Mettre des garde-fous à un assistant de code

**Objectif :** savoir **encadrer** un assistant de code, pour qu'il t'aide sans faire n'importe quoi.
**Durée :** 30 minutes de lecture, plus le temps d'essayer le [kit](kit/README.md).
**Prérequis :** la [fiche 2](02-comment-fonctionne-un-agent.md) (comment marche un agent).

## Pourquoi des garde-fous ?

Un agent, c'est un modèle de langage qui peut **agir** : lire des fichiers, en écrire, lancer des commandes. Il agit vite, avec assurance, et parfois à côté de la plaque.

Un professionnel ne lui fait pas « confiance ». Il lui donne **un cadre**, comme on en donne un à un stagiaire très rapide mais sans expérience :

- des **règles écrites** : comment travailler dans ce projet ;
- des **permissions** : ce qu'il peut faire seul, ce qu'il doit demander, ce qui lui est interdit ;
- des **vérifications automatiques** qui ne dépendent pas de lui.

Les fichiers de ce kit viennent de la configuration réelle de l'intervenant, construite au fil de ses projets : **une règle à chaque erreur qu'il ne voulait plus refaire**. Ils sont simplifiés et rendus indépendants de tout outil.

## Garde-fou n° 1 — Un fichier de règles

La plupart des assistants de code lisent, au démarrage, un fichier texte placé à la racine du projet. Selon l'outil, il s'appelle `AGENTS.md`, ou porte un autre nom (regarde la documentation de ton outil). C'est le « règlement intérieur » du projet.

Le modèle du kit, [AGENTS.md](kit/AGENTS.md), contient par exemple :

> **Annonce avant d'agir.** Avant de modifier quoi que ce soit, dis-moi quels fichiers tu vas toucher et pourquoi.
>
> **Ne touche qu'à ce qui est demandé.** Si tu vois autre chose à améliorer, signale-le sans le faire.
>
> **« Fini » veut dire vérifié.** Dis-moi comment tu l'as vérifié. Si tu n'as pas pu vérifier, dis-le.

Chacune de ces règles répond à un vrai problème :

| Règle | Le problème qu'elle évite |
|---|---|
| Annoncer avant d'agir | l'assistant modifie 12 fichiers alors que tu en attendais 1 |
| Ne toucher qu'à la demande | il « améliore » au passage du code qui marchait, et le casse |
| Lire avant d'affirmer | il parle d'une fonction qui n'existe plus, ou n'a jamais existé |
| Fini = vérifié | il dit « c'est corrigé » sans rien avoir lancé |
| Ne rien laisser tomber | un problème repéré en route est oublié pour toujours |

**Limite :** un fichier de règles est une **consigne**, pas une barrière. Le modèle peut l'oublier ou mal l'interpréter, surtout un petit modèle. D'où les deux garde-fous suivants.

## Garde-fou n° 2 — Des permissions

Les outils d'agent proposent en général trois niveaux, sous des noms variables :

| Niveau | Exemples |
|---|---|
| **Autorisé** sans demander | lire un fichier, chercher un mot, lancer les tests |
| **Demander d'abord** | modifier un fichier, installer un paquet, `git push` |
| **Interdit** | `git push --force` (écrase l'historique), supprimer un dossier entier, lire un fichier de mots de passe |

Le principe s'appelle le **moindre privilège** : on donne à un programme seulement les droits dont il a besoin. Pour un premier essai, le plus sûr est de travailler **dans une copie** du projet (un fork, voir la [fiche 1](01-forker-et-publier.md)) : si l'agent casse tout, tu ne perds rien.

Chaque outil règle ces permissions à sa manière : cherche « permissions », « approbation » ou « sandbox » dans sa documentation.

## Garde-fou n° 3 — Des vérifications automatiques

C'est le seul garde-fou qui ne dépend **pas** du modèle : un programme classique, codé à la main, qui vérifie toujours la même chose (tu te souviens du critère de l'activité ?).

Le kit en contient un : le hook git [pre-commit](kit/hooks/pre-commit). Git le lance **avant chaque commit**, que le commit vienne de toi ou d'un assistant. Il bloque le commit si une ligne ajoutée :

- ressemble à une clé ou à un jeton d'accès ;
- ressemble à un mot de passe écrit en clair ;
- contient un mot de ta liste personnelle (`.termes-interdits.txt`).

L'intervenant utilise le même principe sur ses projets. Le jour où un nom confidentiel s'est retrouvé publié par erreur, il a écrit une règle **automatique** pour que ça ne puisse plus arriver, au lieu de seulement « faire attention la prochaine fois ».

Installation et explications : [kit/README.md](kit/README.md).

## Ce qui se transpose d'un outil à l'autre

Si tu changes d'outil, par exemple pour un modèle ouvert qui tourne sur ton ordinateur ([fiche 5](05-assistant-en-local.md)), tout ne se transporte pas pareil :

| Élément | Se transpose ? | Comment |
|---|---|---|
| Fichier de règles | **oui, tel quel** | c'est du texte : change juste son nom si l'outil l'attend sous un autre nom |
| Consignes (relecture, sécurité…) | **oui** | ce sont des instructions en texte : on les donne à lire à l'assistant, ou on les suit soi-même |
| Hook git `pre-commit` | **oui** | il dépend de git, pas de l'assistant |
| Permissions | **non, à refaire** | chaque outil a son propre système de réglage |
| Automatismes propres à un outil (scripts lancés à chaque action de l'agent…) | **non, à réécrire** | leur format dépend de l'outil ; l'**idée** se garde |

C'est une bonne façon de comprendre un système : distinguer **l'idée** (vérifier avant de publier) de **l'outil** (tel logiciel, tel réglage).

## À toi de jouer

1. Copie [kit/AGENTS.md](kit/AGENTS.md) à la racine de ton fork et remplis la section « Mon projet ».
2. Installe le hook `pre-commit`. Essaie de committer une ligne `password = "abcdefgh"` : le commit doit être bloqué.
3. Ajoute **une règle à toi** dans `AGENTS.md`, née d'une erreur que tu as faite ou vue faire.

---

Précédent : [3. Bonnes pratiques](03-bonnes-pratiques.md) · [Sommaire](README.md) · Suivant : [5. Un assistant en local](05-assistant-en-local.md)
