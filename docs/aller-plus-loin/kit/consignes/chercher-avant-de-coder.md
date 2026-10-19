# Consigne — Chercher avant de coder

*Adapté de la démarche « search-first » du projet libre everything-claude-code (licence MIT, voir [LICENCE-ECC.md](../LICENCE-ECC.md)).*

**Idée :** avant d'écrire une fonctionnalité, vérifier si quelqu'un l'a déjà faite, et bien faite. On gagne du temps, et le code déjà utilisé par des milliers de personnes a souvent moins de bugs que le nôtre.

## Les étapes

1. **Dire précisément ce qu'on cherche.** « Générer un QR code en Python, en SVG, sans connexion internet » plutôt que « faire des QR codes ».
2. **Chercher à trois endroits.**
   - La bibliothèque standard du langage : souvent, c'est déjà dedans.
   - Le registre de paquets du langage (pour Python, le site PyPI).
   - Les forges de code (GitHub, GitLab, Codeberg…) et la documentation officielle.
3. **Évaluer chaque candidat.**

   | Question | Bon signe |
   |---|---|
   | Fait-il ce dont j'ai besoin ? | oui, sans tout réécrire autour |
   | Est-il maintenu ? | une mise à jour récente, des problèmes qui reçoivent des réponses |
   | Sa licence me permet-elle de l'utiliser ? | MIT, Apache 2.0, BSD… à lire dans le fichier `LICENSE` |
   | Combien de dépendances tire-t-il ? | peu |
   | La documentation est-elle claire ? | un exemple qui marche du premier coup |

4. **Décider.**

   | Situation | Décision |
   |---|---|
   | Un outil fait exactement ça, bien maintenu | **l'utiliser tel quel** |
   | Un outil fait presque ça | **l'utiliser** et écrire un peu de code autour |
   | Rien de satisfaisant | **écrire le sien**, en s'inspirant de ce qu'on a vu |

5. **Noter son choix** dans le README ou le message de commit : quel outil, quelle version, pourquoi.

## Attention

- Un assistant de code peut **inventer** une bibliothèque qui n'existe pas, ou une fonction qui n'existe pas dans la vraie. Vérifie toujours sur le registre officiel avant d'installer.
- Un nom de paquet presque identique à un paquet connu peut être un piège. Vérifie l'orthographe exacte.
- Ajouter une dépendance pour 3 lignes de code n'est pas toujours une bonne idée : c'est du code de plus à faire confiance.
