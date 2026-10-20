# Intervention IA — 1re STI2D et terminale SIN

Support d'une intervention de **1 h à 2 h** sur l'intelligence artificielle, pour des lycéens de 16 à 18 ans.

- **Une présentation** (`index.html`) à projeter. Navigation au clavier ou au doigt, notes de l'orateur, version « tableau » pour chaque diapositive.
- **Une activité sur téléphone** (`activites/ia-ou-pas-ia.html`) : 12 objets du quotidien, « IA ou pas IA ? ».
- **Un support facultatif** (`docs/aller-plus-loin/`) pour les élèves qui veulent continuer seuls.

Tout fonctionne **hors ligne** : HTML, CSS et JavaScript purs, sans framework, sans CDN, sans police externe, sans traceur. Aucune donnée personnelle n'est collectée. Seuls les liens vers des outils tiers (Teachable Machine, etc.) demandent une connexion.

## Arborescence

```text
intervention-ia-sti2d/
├── index.html                  présentation (le cœur du projet)
├── activites/
│   └── ia-ou-pas-ia.html       mini-quiz sur téléphone
├── css/                        commun.css, presentation.css (+ impression), quiz.css
├── js/
│   ├── config.js               TOUS les liens externes (à compléter : TODO_URL)
│   ├── liens.js                applique config.js aux pages
│   ├── presentation.js         navigation de la présentation
│   ├── quiz-donnees.js         les 12 objets du quiz
│   └── quiz.js                 logique du quiz
├── assets/
│   ├── favicon.svg
│   └── qr/                     QR codes SVG générés par scripts/generate_qr.py
├── docs/aller-plus-loin/       support facultatif, en autonomie (fiches 1 à 5)
│   └── kit/                    garde-fous pour assistant de code : AGENTS.md, consignes, hook pre-commit
├── scripts/
│   ├── generate_qr.py          génère assets/qr/*.svg depuis js/config.js
│   ├── check_links.py          vérifie les liens du dépôt
│   ├── config_liens.py         lecture de js/config.js (utilisé par les deux scripts)
│   └── requirements.txt        qrcode (seule dépendance)
├── tests/
│   └── telephones.js           test d'affichage sur écrans de téléphone (Node, facultatif)
├── .gitignore  .nojekyll  LICENSE  README.md
```

## Lancer en local

**Option 1 — double-clic.** Ouvrir `index.html` dans un navigateur. Tout marche, y compris l'activité.

**Option 2 — petit serveur local** (utile pour que les élèves ouvrent le quiz depuis leur téléphone sur le même Wi-Fi) :

```bash
python -m http.server 8000
```

Puis ouvrir <http://localhost:8000>. Depuis un téléphone sur le même réseau : `http://<adresse-IP-du-PC>:8000/activites/ia-ou-pas-ia.html`. Le pare-feu de l'ordinateur peut bloquer : à tester avant la séance.

## Utiliser la présentation

| Action | Clavier | Tactile |
|---|---|---|
| Diapositive suivante | `→` `↓` `Espace` `Page suiv.` | balayer vers la gauche |
| Diapositive précédente | `←` `↑` `Page préc.` | balayer vers la droite |
| Première / dernière | `Début` / `Fin` | — |
| Parcours 1 h / 2 h | — | bouton **2 h** / **1 h** |
| Thème clair / sombre | `S` | bouton lune / soleil |
| Notes de l'orateur (mode intervenant) | `N` | bouton **N** |
| Plein écran | `F` | — |
| Aide | `A` ou `?` | bouton **?** |

- **Deux adresses** : l'adresse normale pour projeter devant la classe, et la même suivie de `?admin` pour l'intervenant. Le bouton et la touche **N** (notes) n'existent qu'avec `?admin` : impossible d'afficher les notes par erreur devant les élèves. Ce n'est pas un secret (les notes sont dans le code de la page), seulement une protection contre le clic malheureux.
- Le bouton **2 h** / **1 h** masque ou réaffiche les diapositives facultatives (marquées `data-parcours="2h"`). L'adresse affiche toujours le parcours (`?parcours=1h` ou `?parcours=2h`) et le garde en cas de rechargement.
- Ajouter un parcours (par exemple 3 h) : ajouter `"3h"` à la liste `PARCOURS` en haut de `js/presentation.js`, puis marquer ses diapositives `data-parcours="3h"`. Une diapositive apparaît dans son parcours et dans tous les plus longs.
- `index.html#12` ouvre directement la diapositive 12.
- Chaque note contient une **« Version tableau »** : quoi dessiner si le projecteur ou le réseau lâche.

### Parcours conseillés

| Section | 1 h | 2 h |
|---|---|---|
| 1. Titre, question d'ouverture | 5 min | 10 min |
| 2. Origines du mot, intelligence | 5 min | 10 min |
| 3. Activité « IA ou pas IA ? » + mise en commun | 12 min | 20 min |
| 4. IA ⊃ ML ⊃ DL, effet IA, Deep Blue / AlexNet | 8 min | 12 min |
| 5. Chaîne d'information, maintenance prédictive | 7 min | 12 min |
| 6. Modes d'apprentissage | 4 min | 10 min |
| 7. Démo Teachable Machine | 7 min | 12 min |
| 8. Neurones et CNN | 5 min | 15 min |
| 9. Enjeux | 4 min | 10 min |
| 10. Métiers | 2 min | 5 min |
| 11. Conclusion, questions, ressources | 1 min (+ questions) | 10 min |

Chaque section est un bloc `<section class="diapo" data-section="N">` réutilisable : on peut en déplacer, en supprimer ou en dupliquer sans toucher au JavaScript.

## Avant la séance : compléter les liens

1. Ouvrir `js/config.js` et remplacer chaque `TODO_URL` par la vraie adresse (sondage, quiz, adresse du site, adresse du dépôt). Le nom de l'intervenant se règle au même endroit.
2. Régénérer les QR codes :

   ```bash
   python -m venv .venv
   .venv/Scripts/activate        # Windows (Git Bash) ; sous macOS/Linux : source .venv/bin/activate
   pip install -r scripts/requirements.txt
   python scripts/generate_qr.py
   ```

3. Vérifier les liens :

   ```bash
   python scripts/check_links.py            # hors ligne
   python scripts/check_links.py --online   # teste aussi les sites externes
   python scripts/check_links.py --strict   # échoue s'il reste un TODO_URL
   ```

4. Facultatif — vérifier l'affichage sur téléphone (Node.js requis, utilise Edge ou Chrome déjà installé) :

   ```bash
   cd tests
   npm install
   npm test                      # ou : NAVIGATEUR=chrome npm test
   ```

Un lien encore en `TODO_URL` s'affiche barré avec la mention « lien à compléter », et son QR code est remplacé par un cadre « QR à générer » : rien ne casse pendant la séance.

## Publier sur GitHub Pages

1. Créer un dépôt vide sur GitHub (par exemple `intervention-ia-sti2d`).
2. Dans le dossier du projet :

   ```bash
   git init -b main
   git add .
   git commit -m "feat: première version de l'intervention IA"
   git remote add origin https://github.com/<ton-compte>/intervention-ia-sti2d.git
   git push -u origin main
   ```

3. Sur GitHub : **Settings → Pages → Build and deployment → Source : Deploy from a branch**, branche **`main`**, dossier **`/ (root)`**, puis **Save**.
4. Après une ou deux minutes, le site est en ligne à l'adresse `https://<ton-compte>.github.io/intervention-ia-sti2d/`.
5. Reporter cette adresse dans `js/config.js` (clé `site`) et celle du dépôt (clé `depot`), puis régénérer les QR codes et faire un nouveau commit.

Le fichier `.nojekyll` demande à GitHub Pages de servir les fichiers tels quels, sans les transformer.

## Exporter en PDF

1. Ouvrir `index.html` dans Chrome, Edge ou Firefox.
2. Optionnel : ouvrir l'adresse avec `?admin` et appuyer sur `N` pour **inclure les notes de l'orateur** dans le PDF.
3. `Ctrl` + `P` → **Enregistrer au format PDF**, orientation **Paysage**, cocher **Graphiques d'arrière-plan**.

Une diapositive par page. Les boutons et la barre de progression disparaissent, les réponses repliées sont dépliées. En parcours 1 h (bouton **1 h**), seules les diapositives du parcours court sont imprimées.

## Crédits et licences

- **Code** (HTML, CSS, JavaScript, Python) : licence MIT.
- **Contenu pédagogique** (textes, schémas SVG, notes) : licence CC BY 4.0.
- Quatre consignes de `docs/aller-plus-loin/kit/` sont adaptées du projet libre everything-claude-code (Affaan Mustafa, MIT) : voir [kit/LICENCE-ECC.md](docs/aller-plus-loin/kit/LICENCE-ECC.md).
- Voir [LICENSE](LICENSE).

Les outils externes cités appartiennent à leurs auteurs et ne sont pas inclus dans ce dépôt : Teachable Machine (Google Creative Lab), CNN Explainer (Polo Club of Data Science, Georgia Tech), TensorFlow Playground (Daniel Smilkov et Shan Carter), visualisation 3D de réseaux de neurones (Adam W. Harley), Mentimeter, Kahoot!. Chacun a ses propres conditions d'utilisation et d'âge minimum.
