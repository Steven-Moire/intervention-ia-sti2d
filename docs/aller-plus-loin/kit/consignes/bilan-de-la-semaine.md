# Consigne — Le bilan de la semaine

*Un rituel inventé par l'intervenant pour ses propres projets, simplifié ici.*

**Idée :** une fois par semaine, faire le point sur son projet. Mais la règle est stricte :

> **On mesure et on note. On ne corrige rien pendant le bilan.**

Pourquoi ? Parce que si on corrige au fil de l'eau, on part dans tous les sens, on ne finit rien, et on oublie la moitié des problèmes. Le bilan sert à **voir** ; on choisira quoi faire ensuite, à tête reposée.

## Le déroulé (20 à 30 minutes)

1. **Ce qui s'est passé.**

   ```bash
   git log --oneline --since="1 week ago"   # mes commits de la semaine
   git status                               # du travail pas encore enregistré ?
   ```

2. **L'état des vérifications.** Lance les vérifications automatiques du projet (voir [verifier-avant-de-dire-fini.md](verifier-avant-de-dire-fini.md)) et **note** les résultats, même s'ils sont mauvais.
3. **Une relecture rapide.** Applique [relecture-de-code.md](relecture-de-code.md) aux fichiers modifiés cette semaine. Note les problèmes, sans les corriger.
4. **Les docs.** Le README dit-il encore la vérité ? Une commande a changé, un fichier a été renommé ?
5. **Classer.** Pour chaque problème noté, donne une priorité et une estimation de durée :

   | Priorité | Sens |
   |---|---|
   | P1 | bloque ou dangereux (secret publié, page cassée) : la semaine prochaine, en premier |
   | P2 | gênant : à planifier |
   | P3 | amélioration : si le temps le permet |

## Le résultat

Un fichier daté, par exemple `bilans/2026-10-23.md`, avec la liste classée. La semaine suivante, tu ouvres le dernier bilan et tu choisis 2 ou 3 lignes à traiter. Au fil des semaines, l'historique des bilans montre tes progrès.

Un assistant de code peut t'aider à remplir le bilan. Mais la décision de ce qu'on corrige, et dans quel ordre, c'est **toi** qui la prends.
