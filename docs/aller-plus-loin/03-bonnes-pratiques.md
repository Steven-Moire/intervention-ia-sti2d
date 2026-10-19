# 3. Bonnes pratiques

**Objectif :** prendre les habitudes qu'on attend d'un technicien ou d'un ingénieur qui travaille sur du code, seul ou en équipe.
**Durée :** 20 minutes de lecture.

## Git : enregistrer souvent, par petits morceaux

- **Un commit = une idée.** « Ajoute la diapositive sur les métiers » plutôt que « plein de trucs ».
- **Commite souvent.** Un commit, c'est un point de sauvegarde : plus il y en a, plus il est facile de revenir en arrière.
- **Regarde avant d'enregistrer.** `git status` (quels fichiers ont changé ?) et `git diff` (quelles lignes ?) avant chaque `git commit`.
- **Ne travaille pas à deux sur le même fichier en même temps** sans vous prévenir : sinon, git vous demandera de fusionner les deux versions à la main (un « conflit »).

Les commandes de base :

```bash
git status                  # qu'est-ce qui a changé ?
git diff                    # quelles lignes exactement ?
git add index.html          # préparer ce fichier pour le prochain commit
git commit -m "message"     # enregistrer
git log --oneline           # voir l'historique
git push                    # envoyer sur GitHub (ou une autre plateforme)
```

## Écrire un bon message de commit

Le message est destiné à la personne qui lira l'historique dans six mois. Souvent… toi.

| ❌ À éviter | ✅ Mieux |
|---|---|
| `modif` | `Corrige la faute dans le titre de la diapositive 1` |
| `test` | `Ajoute le détecteur de fumée à l'activité` |
| `ça marche enfin` | `Corrige le score qui ne se remettait pas à zéro` |

Règles simples :

- une phrase courte (moins de 70 caractères), qui commence par un verbe : *Ajoute*, *Corrige*, *Supprime*, *Renomme*… ;
- elle dit **ce que** fait le commit ; si besoin, une ligne vide puis un paragraphe qui explique **pourquoi**.

Beaucoup d'équipes ajoutent un préfixe : `feat:` (nouveauté), `fix:` (correction), `docs:` (documentation). Exemple : `fix: le score ne se remettait pas à zéro`.

## Le README : la porte d'entrée du projet

Le fichier `README.md` est la première chose qu'on lit en arrivant sur un dépôt. Un bon README répond à quatre questions :

1. **C'est quoi ?** Une ou deux phrases.
2. **Comment je le lance ?** Les commandes exactes, à copier-coller.
3. **Comment c'est organisé ?** Les dossiers principaux.
4. **Qui peut l'utiliser, et comment ?** La licence.

Regarde le `README.md` à la racine de ce dépôt : il suit ce plan.

Le format `.md` (Markdown) est du texte simple avec quelques symboles : `#` pour un titre, `-` pour une liste, `**gras**`, `` `code` ``. GitHub et la plupart des plateformes l'affichent joliment.

## Ne jamais publier de secrets

Un dépôt public est visible **par tout le monde**, et l'historique git garde **tout**, même ce que tu as supprimé ensuite.

Ne mets jamais dans un dépôt :

- un mot de passe, même « juste pour tester » ;
- une clé d'accès à un service en ligne (souvent appelée *clé d'API* ou *token*) ;
- des données personnelles : nom, adresse, numéro de téléphone, photos de camarades, notes…

Comment faire :

- range les secrets dans un fichier à part, par exemple `.env`, et ajoute ce nom dans le fichier **`.gitignore`** : git ne le suivra jamais (regarde le `.gitignore` de ce dépôt) ;
- vérifie `git status` avant chaque commit : si un fichier inattendu apparaît, ne l'ajoute pas ;
- **si un secret a été publié par erreur** : le supprimer ne suffit pas, il reste dans l'historique. Il faut **changer le mot de passe ou désactiver la clé** tout de suite, puis prévenir la personne responsable.

## Nommer ses fichiers

Des noms clairs et réguliers évitent beaucoup de bugs, surtout sur un serveur web (où `Image.png` et `image.png` sont deux fichiers différents).

| Règle | ❌ | ✅ |
|---|---|---|
| Pas d'espaces | `ma page.html` | `ma-page.html` |
| Pas d'accents ni de caractères spéciaux | `activité_n°1.html` | `activite-1.html` |
| Tout en minuscules | `Quiz.HTML` | `quiz.html` |
| Fichiers web : des tirets (*kebab-case*) | `iaOuPasIa.html` | `ia-ou-pas-ia.html` |
| Fichiers Python : des tirets bas (*snake_case*) | `check-links.py` | `check_links.py` |
| Un nom qui dit ce que contient le fichier | `truc2.js` | `quiz-donnees.js` |

Pourquoi deux conventions ? En Python, un fichier est aussi un nom de module qu'on importe (`import check_links`) : le tiret y est interdit.

## Et avec un assistant d'IA ?

Toutes ces règles restent valables, et sont encore plus importantes :

- un assistant peut proposer de mettre un secret « en dur » dans le code : refuse ;
- relis chaque modification avant de faire le commit (voir la [fiche 2](02-comment-fonctionne-un-agent.md)) ;
- écris toi-même le message de commit, ou vérifie qu'il décrit vraiment ce qui a changé.

## Petite checklist avant chaque commit

- [ ] J'ai testé : la page s'ouvre, l'activité fonctionne.
- [ ] `git status` ne montre que les fichiers que je voulais modifier.
- [ ] Aucun mot de passe, aucune clé, aucune donnée personnelle.
- [ ] Mon message de commit dit clairement ce que j'ai fait.

---

Précédent : [2. Comment fonctionne un agent ?](02-comment-fonctionne-un-agent.md) · [Sommaire](README.md) · Suivant : [4. Garde-fous](04-garde-fous-assistant.md)
