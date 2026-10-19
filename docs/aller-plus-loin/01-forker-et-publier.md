# 1. Forker et publier la présentation

**Objectif :** avoir ta propre copie de la présentation, en ligne, et y changer une diapositive.
**Durée :** 30 à 45 minutes.
**Il te faut :** un navigateur et un compte GitHub.

> GitHub est un service en ligne qui héberge du code. Il a des conditions d'utilisation et un âge minimum : vérifie-les avant de t'inscrire, et parles-en à un adulte si tu es mineur. D'autres plateformes du même type existent (par exemple GitLab, Codeberg) ; les étapes ci-dessous sont celles de GitHub, mais les idées sont les mêmes partout.

## Le vocabulaire en 30 secondes

| Mot | Ce que ça veut dire |
|---|---|
| **Dépôt** (*repository*) | Un dossier de projet suivi par git, avec tout son historique. |
| **Fork** | Une copie d'un dépôt de quelqu'un d'autre, dans ton propre compte. Tu peux la modifier sans toucher à l'original. |
| **Commit** | Un enregistrement d'une modification, avec un message qui explique ce que tu as changé. |
| **Branche `main`** | La version principale du projet. |
| **GitHub Pages** | Un service de GitHub qui transforme les fichiers HTML d'un dépôt en site web. |

## Étape 1 — Forker le dépôt

1. Ouvre la page du dépôt (l'adresse est sur la dernière diapositive de la présentation).
2. En haut à droite, clique sur **Fork**.
3. Laisse le nom proposé, clique sur **Create fork**.

Tu as maintenant l'adresse `https://github.com/<ton-pseudo>/intervention-ia-sti2d`. C'est **ta** copie.

## Étape 2 — Activer GitHub Pages

1. Dans ton fork, clique sur **Settings** (l'onglet avec un engrenage).
2. Dans le menu de gauche, clique sur **Pages**.
3. Sous **Build and deployment**, choisis **Source : Deploy from a branch**.
4. Choisis la branche **main** et le dossier **/ (root)**, puis **Save**.
5. Attends une à deux minutes, puis recharge la page : l'adresse de ton site s'affiche, du type `https://<ton-pseudo>.github.io/intervention-ia-sti2d/`.

Ouvre-la : c'est la présentation, en ligne, à ton nom.

## Étape 3 — Modifier une diapositive

On va changer le titre de la première diapositive, directement dans le navigateur.

1. Dans ton fork, clique sur le fichier **`index.html`**.
2. Clique sur l'icône **crayon** (*Edit this file*).
3. Cherche la ligne qui contient `<h1>` (avec `Ctrl` + `F`).
4. Remplace le texte entre `<h1>` et `</h1>` par ton propre titre. **Ne supprime pas les balises** `<h1>` et `</h1>`.

Autres idées faciles :

- Change le nom de l'intervenant dans `js/config.js` (ligne `intervenant:`).
- Ajoute un objet à l'activité dans `js/quiz-donnees.js` en copiant un bloc `{ ... }` existant. Attention aux virgules entre les blocs !

## Étape 4 — Faire un commit

1. Clique sur **Commit changes…** (en haut à droite de l'éditeur).
2. Dans **Commit message**, écris une phrase courte qui dit ce que tu as fait, par exemple : `Change le titre de la première diapositive`.
3. Laisse **Commit directly to the main branch** coché, puis clique sur **Commit changes**.

Attends une minute et recharge ton site : ta modification est en ligne. Dans l'onglet **Actions** de ton dépôt, tu peux voir la mise en ligne se faire.

## Étape 5 — Voir l'historique

Clique sur **Commits** (ou sur l'horloge au-dessus de la liste des fichiers). Tu vois chaque modification, qui l'a faite, quand, et avec quel message. Clique sur un commit pour voir les lignes ajoutées (en vert) et supprimées (en rouge).

C'est l'intérêt de git : **on peut toujours revenir en arrière.** Tu ne peux rien casser définitivement.

## Si ça ne marche pas

| Problème | Piste |
|---|---|
| Le site affiche une erreur 404 | Attends deux minutes. Vérifie que Pages est réglé sur `main` et `/ (root)`. |
| La page s'affiche sans couleurs ni mise en forme | Tu as peut-être renommé ou déplacé un fichier du dossier `css/`. Regarde le dernier commit. |
| L'activité ne démarre plus après ta modification | Une virgule ou un guillemet manque sans doute dans `quiz-donnees.js`. Ouvre la console du navigateur (`F12`) : l'erreur indique la ligne. |
| Les QR codes renvoient vers le site d'origine | Normal : ils sont générés depuis `js/config.js`. Voir le `README.md` à la racine pour les régénérer. |

## Pour aller encore plus loin (sur ton ordinateur)

Tu peux aussi travailler sur ton ordinateur, avec un éditeur de code (il en existe plusieurs, gratuits) et git installé :

```bash
git clone https://github.com/<ton-pseudo>/intervention-ia-sti2d.git
cd intervention-ia-sti2d
# modifie un fichier, puis :
git add index.html
git commit -m "Change le titre de la première diapositive"
git push
```

Le `README.md` à la racine du dépôt explique aussi comment lancer la présentation en local.

---

[Sommaire](README.md) · Suivant : [2. Comment fonctionne un agent ?](02-comment-fonctionne-un-agent.md)
