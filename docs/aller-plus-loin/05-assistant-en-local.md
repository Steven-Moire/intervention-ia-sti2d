# 5. Faire tourner un assistant en local

**Objectif :** comprendre comment utiliser un **modèle ouvert**, téléchargé et exécuté sur ton propre ordinateur, sans abonnement ni compte chez un fournisseur d'IA.
**Durée :** 1 à 3 heures, selon ton ordinateur et ta connexion pour le téléchargement.
**Niveau :** la fiche la plus avancée. Lis d'abord les fiches [2](02-comment-fonctionne-un-agent.md) et [4](04-garde-fous-assistant.md).

> **Avant de commencer.** Cette fiche ne recommande aucun produit. Les noms cités ne sont que des exemples parmi d'autres, et ils changent vite : vérifie toujours la documentation à jour. Chaque site, chaque logiciel et chaque modèle a **ses propres conditions** (âge minimum, licence, usage autorisé). Lis-les, et parles-en à un adulte si tu es mineur. Ne télécharge jamais un logiciel depuis un site que tu ne connais pas.

## L'idée

Un modèle de langage, c'est un gros fichier de **poids** (les nombres appris pendant l'entraînement, voir la diapositive sur le neurone) et un programme qui fait les calculs. Certains modèles sont publiés avec leurs poids : on parle de modèles **ouverts** (ou « open weight »). On peut les télécharger, par exemple depuis des plateformes de partage de modèles comme Hugging Face, et les faire tourner chez soi.

Avantages :

- pas d'abonnement, pas de compte chez un fournisseur d'IA ;
- tes fichiers ne quittent pas ton ordinateur ;
- tu vois concrètement ce que « faire tourner un modèle » veut dire.

## Ce qu'il te faut

| Élément | Ordre de grandeur |
|---|---|
| Mémoire vive (RAM) | **8 Go** minimum pour un petit modèle, 16 Go c'est plus confortable |
| Espace disque | 4 à 10 Go par modèle |
| Carte graphique | pas obligatoire, mais tout est beaucoup plus rapide avec |
| Connexion | seulement pour le téléchargement, ensuite tout marche hors ligne |

**Petit modèle, petites ambitions.** Un modèle d'environ 7 milliards de paramètres, « quantifié » (ses poids sont arrondis pour prendre moins de place, environ 4 à 5 Go), tourne sur un ordinateur récent. Sans carte graphique, il écrit lentement : quelques mots par seconde.

## Les trois briques

1. **Un modèle ouvert.** Plusieurs familles existent (par exemple chez Mistral AI, Meta, Alibaba, Google, et d'autres). Pour chaque modèle, regarde :
   - sa **licence** : certaines sont très libres (Apache 2.0, MIT), d'autres limitent l'usage. Elle est indiquée sur la page du modèle ;
   - sa **taille** : commence petit (de 1 à 8 milliards de paramètres) ;
   - s'il est entraîné pour le **code** ou pour la **conversation**.
2. **Un logiciel qui fait tourner le modèle.** Il charge les poids et répond aux questions. Il en existe plusieurs, gratuits, en ligne de commande ou avec une interface graphique : par exemple Ollama et llama.cpp, qui sont **libres** (leur code est public), ou LM Studio, **gratuit mais pas libre**. Gratuit ne veut pas dire libre : vérifie la licence du logiciel comme celle du modèle. Beaucoup s'occupent aussi du téléchargement du modèle.
3. **(Facultatif) Un assistant de code** qui se branche sur ce logiciel local. Plusieurs outils libres savent utiliser un modèle local (par exemple Aider, Continue, OpenHands… cherche « assistant de code modèle local » pour une liste à jour). Commence par un outil simple : OpenHands, par exemple, demande d'installer Docker et marche mal avec un petit modèle. C'est lui qui ajoute les **outils** et la **boucle** de la fiche 2.

## Démarche générale

Les commandes exactes dépendent du logiciel choisi : suis **sa** documentation. Les étapes sont toujours les mêmes :

1. Installer le logiciel qui fait tourner le modèle (depuis son site officiel).
2. Télécharger un petit modèle et vérifier sa licence.
3. Lui poser une question simple, **sans assistant de code** : « Explique ce que fait une boucle `for` en Python. » Observe la vitesse et la qualité.
4. Si ça marche, brancher un assistant de code dessus, **dans une copie de ton projet** (un fork), jamais sur des fichiers importants.
5. Copier [kit/AGENTS.md](kit/AGENTS.md) à l'endroit où l'assistant l'attend, et installer le hook [pre-commit](kit/hooks/pre-commit).
6. Lui donner une petite tâche : « Ajoute un objet au quiz dans `js/quiz-donnees.js`. » Puis relis et teste (fiche 2, « La règle d'or »).

## Ce que tu vas constater (et c'est normal)

- **Il suit mal les longues consignes.** Un petit modèle oublie vite une partie de `AGENTS.md`. Garde tes règles courtes.
- **Il utilise mal les outils.** Enchaîner « lire un fichier → le modifier → lancer les tests » est difficile pour un petit modèle : il peut inventer un résultat, ou se tromper de fichier. Les gros modèles des services en ligne le font mieux, et c'est surtout une question de **taille**.
- **Il invente avec assurance.** Comme tous les modèles, en plus fréquent quand il est petit.
- **Il fait chauffer l'ordinateur.** Tu observes directement le coût énergétique d'un modèle (diapositive environnement). Imagine ce que ça donne pour des millions d'utilisateurs, avec des modèles 100 fois plus gros.

Chacune de ces limites montre **pourquoi** les garde-fous de la fiche 4 existent : plus le modèle est fragile, plus le cadre autour compte. Et le hook `pre-commit`, lui, marche aussi bien avec un petit modèle qu'avec un gros.

## Pour aller encore plus loin

- Compare deux tailles de modèle sur la même question : qualité, vitesse, mémoire utilisée.
- Mesure le temps de réponse avec et sans carte graphique, si tu as les deux.
- Réécris une consigne du kit pour qu'un petit modèle la suive mieux : plus courte, plus directe. C'est un vrai métier.

---

Précédent : [4. Garde-fous](04-garde-fous-assistant.md) · [Sommaire](README.md)
