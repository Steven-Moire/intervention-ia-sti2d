# Consigne — Relecture de code

*Adapté d'une commande de relecture du projet libre everything-claude-code (licence MIT, voir [LICENCE-ECC.md](../LICENCE-ECC.md)).*

**Quand :** avant chaque commit, surtout si un assistant a écrit une partie du code.
**Règle d'or :** la relecture **ne modifie rien**. Elle produit une liste de problèmes, classés par gravité. On corrige ensuite, un problème à la fois.

## 1. Rassembler

```bash
git status          # quels fichiers ont changé ?
git diff            # quelles lignes exactement ?
```

S'il n'y a rien de modifié, la relecture s'arrête là.

## 2. Relire chaque fichier modifié, en entier

Pas seulement les lignes changées : une modification peut casser une autre partie du fichier.

### Grave — bloque le commit

- Un mot de passe, une clé, un jeton écrit dans le code.
- Des données personnelles (nom, photo, adresse, numéro…).
- Du texte venant de l'utilisateur inséré dans la page avec `innerHTML` (risque d'injection) : préférer `textContent`.
- Un lien ou un script chargé depuis un site extérieur sans raison.

### Important — à corriger avant de publier

- Le code ne fait pas ce qui était demandé, ou fait **plus** que ce qui était demandé.
- Une erreur possible n'est pas gérée (fichier absent, champ vide, réseau coupé).
- Une fonction de plus de 50 lignes, ou plus de 4 niveaux d'indentation.
- Un `console.log` ou un `print` de débogage oublié.
- Un nom de variable qui ne dit pas ce qu'elle contient (`x`, `truc`, `data2`).

### À améliorer — si tu as le temps

- Un commentaire qui répète le code au lieu d'expliquer **pourquoi**.
- Le même bloc de code copié-collé à plusieurs endroits.
- Une page difficile à utiliser au clavier, ou un texte trop peu contrasté.
- Un `TODO` sans explication.

## 3. Rendre le résultat

Pour chaque problème : **gravité, fichier, ligne, ce qui ne va pas, une piste de correction.**

> Grave — `js/quiz.js`, ligne 42 : la réponse de l'utilisateur est insérée avec `innerHTML`. Piste : utiliser `textContent`.

S'il reste un problème « grave », on ne fait pas le commit.
