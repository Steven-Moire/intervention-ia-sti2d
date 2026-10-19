# 2. Comment fonctionne un agent d'IA ?

**Objectif :** comprendre ce qu'il y a derrière les assistants qui ne se contentent pas de répondre, mais qui *agissent* (chercher un fichier, lancer un programme, modifier du code…).
**Durée :** 20 minutes de lecture.

## D'abord : un modèle de langage

Un **modèle de langage** est un réseau de neurones entraîné sur une très grande quantité de textes. Son travail de base est simple à énoncer :

> À partir d'un texte, prédire la suite la plus probable, morceau par morceau.

C'est le même principe que le clavier prédictif de ton téléphone (voir l'activité « IA ou pas IA ? »), mais avec un modèle beaucoup plus gros et entraîné sur beaucoup plus de textes. Il peut ainsi écrire des phrases, résumer, traduire, ou proposer du code.

Ce qu'il **ne fait pas** tout seul :

- il ne « sait » pas ce qui est vrai : il produit ce qui est *plausible* ;
- il n'a pas accès à tes fichiers, à internet ou à l'heure qu'il est ;
- il ne peut rien exécuter.

## Ensuite : des outils

Pour qu'il puisse agir, on lui donne des **outils**. Un outil, c'est une fonction d'un programme classique, décrite au modèle avec son nom et ce qu'elle fait. Par exemple :

| Outil | Ce qu'il fait |
|---|---|
| `lire_fichier(nom)` | renvoie le contenu d'un fichier |
| `chercher(mot)` | renvoie les lignes qui contiennent ce mot |
| `lancer_tests()` | exécute les tests du projet et renvoie le résultat |
| `ecrire_fichier(nom, texte)` | remplace le contenu d'un fichier |

Le modèle ne lance pas l'outil lui-même : il écrit une **demande** (« je veux appeler `lire_fichier` avec `index.html` »). C'est le programme autour de lui qui exécute l'outil et lui renvoie le résultat.

## Enfin : une boucle

Un **agent**, c'est un modèle de langage + des outils + une **boucle** :

```text
          ┌──────────────────────────────────────────┐
          │                                          │
          ▼                                          │
  1. Le modèle lit l'objectif                        │
     et tout ce qui s'est passé jusque-là            │
          │                                          │
          ▼                                          │
  2. Il choisit : appeler un outil, ou répondre ?    │
          │                    │                     │
          │ outil              │ réponse finale      │
          ▼                    ▼                     │
  3. Le programme exécute   FIN : l'agent            │
     l'outil                rend la main             │
          │                                          │
          ▼                                          │
  4. Le résultat est ajouté à l'historique ──────────┘
```

Exemple : « Corrige la faute dans le titre de la présentation. »

1. Le modèle appelle `chercher("<h1>")` → il trouve la ligne dans `index.html`.
2. Il appelle `lire_fichier("index.html")` → il lit le titre.
3. Il appelle `ecrire_fichier(...)` avec le titre corrigé.
4. Il répond : « J'ai corrigé "inteligence" en "intelligence" dans `index.html`. »

C'est la même démarche que la chaîne d'information vue en STI2D : **acquérir** (lire les résultats des outils), **traiter** (le modèle décide), **agir** (appeler un outil), et on recommence.

On trouve ce principe dans plusieurs types d'outils : des assistants conversationnels qui peuvent faire des recherches, des assistants intégrés à des éditeurs de code, des outils en ligne de commande… Ils sont proposés par différents éditeurs, avec des versions gratuites ou payantes et des conditions d'âge à vérifier. Le principe reste le même.

## Les limites

- **Il peut se tromper avec assurance.** Le modèle produit du texte plausible, pas du texte vérifié. Il peut inventer un nom de fonction, une source, un chiffre.
- **Il peut mal comprendre la demande.** Une consigne floue donne un résultat flou… ou une action non voulue.
- **Il agit avec les droits qu'on lui donne.** Un agent qui peut supprimer des fichiers peut supprimer le mauvais. Les bons outils demandent une confirmation avant les actions importantes.
- **Il peut être trompé.** Un texte lu par l'agent (une page web, un fichier) peut contenir des instructions cachées qui le détournent de ton objectif.
- **Il consomme de l'énergie.** Chaque tour de boucle fait tourner un gros modèle sur des serveurs (voir la diapositive sur l'environnement).
- **Ce n'est pas toi qui as appris.** Si l'agent fait tout l'exercice, tu n'as rien appris. Utilise-le plutôt pour comprendre une erreur ou te débloquer, et respecte les consignes de tes professeurs sur son usage.

## La règle d'or : relire et tester

Quel que soit l'outil, **tu restes responsable de ce que tu publies.** Avant d'accepter ce qu'un assistant a produit :

1. **Relis** chaque ligne modifiée. Si tu ne comprends pas une ligne, demande une explication ou ne l'utilise pas.
2. **Teste** : ouvre la page, lance le programme, essaie les cas limites (un champ vide, un très grand nombre…).
3. **Vérifie les faits** : une date, un chiffre, une source citée ? Cherche-les toi-même.
4. **Fais des petits pas** : une modification à la fois, un commit à la fois. Si quelque chose casse, tu sais quoi annuler (voir la fiche 1, historique git).

> Un bon réflexe d'ingénieur : « Comment je sais que c'est juste ? » Si tu n'as pas de réponse, ce n'est pas encore fini.

## Pour réfléchir

- Dans l'activité « IA ou pas IA ? », un agent est-il « codé à la main » ou « appris à partir de données » ? (Indice : les deux. Le modèle est appris ; la boucle et les outils sont codés à la main.)
- Quels outils donnerais-tu à un agent qui surveille une machine en maintenance prédictive ? Lesquels ne lui donnerais-tu surtout pas ?

---

Précédent : [1. Forker et publier](01-forker-et-publier.md) · [Sommaire](README.md) · Suivant : [3. Bonnes pratiques](03-bonnes-pratiques.md)
