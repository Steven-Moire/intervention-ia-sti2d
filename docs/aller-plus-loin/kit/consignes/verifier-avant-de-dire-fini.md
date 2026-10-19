# Consigne — Vérifier avant de dire « fini »

*Adapté de la boucle de vérification du projet libre everything-claude-code (licence MIT, voir [LICENCE-ECC.md](../LICENCE-ECC.md)).*

**Idée :** « ça marche chez moi » n'est pas une preuve. Une tâche est finie quand on peut dire **comment** on a vérifié qu'elle marche.

## Les étapes, dans l'ordre

Si une étape échoue, on s'arrête, on corrige, puis on recommence depuis le début.

1. **Ça s'ouvre / ça se lance.** La page s'affiche, le script démarre, sans message d'erreur. Sur une page web, ouvre la console du navigateur (`F12`) : elle doit être vide de messages rouges.
2. **Les vérifications automatiques passent.** Lance celles de ton projet, par exemple :

   ```bash
   python scripts/check_links.py     # liens du dépôt
   ruff check .                      # style et erreurs courantes en Python, si l'outil est installé
   ```

3. **Les tests à la main passent.** Fais ce que ferait un utilisateur : clique sur chaque bouton, essaie au clavier, sur téléphone, avec un champ vide, avec une réponse fausse…
4. **Rien ne fuit.** Pas de mot de passe ni de donnée personnelle dans les fichiers modifiés (voir [revue-securite.md](revue-securite.md)).
5. **Relire le diff.** `git diff` : chaque ligne modifiée était-elle voulue ? Rien d'oublié, rien en trop ?

## Le compte rendu

À la fin, écris (ou demande à l'assistant d'écrire) un petit bilan honnête :

```text
Vérifié :
- page ouverte dans Firefox et sur téléphone : OK
- check_links.py : 0 erreur
- quiz fait jusqu'au bout, bouton Recommencer : OK
Pas vérifié :
- impression en PDF (pas d'imprimante configurée)
```

La ligne « Pas vérifié » est **aussi importante** que les autres : elle dit honnêtement ce qui reste à faire. Un assistant qui répond « tout est parfait » sans rien avoir lancé n'a rien vérifié.
