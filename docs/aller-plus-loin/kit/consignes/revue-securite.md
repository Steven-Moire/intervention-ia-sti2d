# Consigne — Revue de sécurité d'un site simple

*Adapté d'une liste de sécurité du projet libre everything-claude-code (licence MIT, voir [LICENCE-ECC.md](../LICENCE-ECC.md)), réduite à ce qui concerne un site statique publié en ligne.*

**Quand :** avant de rendre un dépôt public, puis à chaque ajout de formulaire, de lien externe ou de script.

## 1. Secrets

- [ ] Aucun mot de passe, aucune clé, aucun jeton dans le code **ni dans l'historique git** (`git log -p` permet de chercher).
- [ ] Les fichiers sensibles (`.env`, fichiers de clés) sont dans le `.gitignore`.
- [ ] Le hook [pre-commit](../hooks/pre-commit) est installé.
- [ ] Si un secret a été publié : il est **changé ou désactivé**. Le supprimer du code ne suffit pas.

## 2. Données personnelles

- [ ] Aucune donnée personnelle dans le dépôt : noms complets, photos, adresses, numéros, notes.
- [ ] Le site ne collecte rien sans le dire. Pas de formulaire qui envoie des données ailleurs, pas de traceur.
- [ ] Si le site stocke quelque chose dans le navigateur (`localStorage`), c'est expliqué, et ce n'est rien de sensible.

## 3. Ce que la page affiche

- [ ] Tout texte qui vient de l'utilisateur ou d'un fichier externe est affiché avec `textContent`, jamais `innerHTML`.
- [ ] Pas d'`eval()`, pas de `new Function()` avec du texte venu de l'extérieur.

## 4. Ce que la page charge

- [ ] Les scripts et les feuilles de style sont dans le dépôt, pas chargés depuis un site extérieur. Sinon : la version exacte est fixée, et tu sais pourquoi tu en as besoin.
- [ ] Les liens qui ouvrent un nouvel onglet ont `rel="noopener noreferrer"`.
- [ ] Les adresses sont en `https://`.

## 5. Les dépendances et les outils

- [ ] Chaque bibliothèque installée a une raison d'être, et sa version est fixée (`qrcode==8.2` plutôt que `qrcode`).
- [ ] Tu as lu tout script que tu exécutes et qui vient d'ailleurs, ce kit compris.
- [ ] Un assistant de code n'a pas plus de droits que nécessaire : il demande avant de supprimer, d'installer ou de publier (voir [AGENTS.md](../AGENTS.md)).

## Résultat

Une liste « OK / à corriger » par section. Si une case de la section 1 ou 2 n'est pas cochée, **on ne publie pas**.
