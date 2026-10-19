/*
 * quiz-donnees.js — les 12 objets de l'activité « IA ou pas IA ? ».
 *
 * reponse : "ia" (appris à partir de données) ou "pas-ia" (codé à la main).
 * nuance  : facultatif, pour les cas qui font débat.
 */
window.QUIZ_OBJETS = [
  {
    objet: "Thermostat programmable",
    detail: "Il allume le chauffage quand la température descend sous 19 °C.",
    reponse: "pas-ia",
    explication: "Une règle écrite à la main : « si température < consigne, alors chauffer ». Rien n'est appris.",
    nuance: "Certains thermostats dits « intelligents » apprennent vos horaires : là, il y a une part d'apprentissage."
  },
  {
    objet: "Face ID (déverrouillage par le visage)",
    detail: "Le téléphone reconnaît ton visage, même avec des lunettes ou une nouvelle coupe.",
    reponse: "ia",
    explication: "Un réseau de neurones entraîné sur un très grand nombre de visages a appris quels détails distinguent deux personnes."
  },
  {
    objet: "Régulateur de vitesse",
    detail: "La voiture garde 110 km/h en accélérant un peu plus dans les montées.",
    reponse: "pas-ia",
    explication: "Un asservissement : on mesure l'écart avec la consigne et on corrige avec une loi de commande calculée par des ingénieurs."
  },
  {
    objet: "Filtre anti-spam",
    detail: "Ta messagerie range automatiquement les arnaques dans « Indésirables ».",
    reponse: "ia",
    explication: "Le filtre a appris à partir de millions de messages marqués « spam » ou « normal » par les utilisateurs.",
    nuance: "Les premiers filtres utilisaient des listes de mots écrites à la main. Les filtres actuels combinent souvent les deux."
  },
  {
    objet: "ABS (freinage antiblocage)",
    detail: "Quand tu freines fort, les roues ne se bloquent pas.",
    reponse: "pas-ia",
    explication: "Des capteurs mesurent la vitesse de chaque roue ; un calculateur relâche le frein selon des règles conçues et testées par des ingénieurs."
  },
  {
    objet: "Recommandation de musique",
    detail: "L'appli te propose des morceaux que tu n'as jamais écoutés… et qui te plaisent.",
    reponse: "ia",
    explication: "Le système a appris à partir des écoutes de millions de personnes : « ceux qui aiment ce que tu aimes écoutent aussi… »."
  },
  {
    objet: "GPS : calcul du plus court chemin",
    detail: "L'appli trouve l'itinéraire le plus court entre deux villes.",
    reponse: "pas-ia",
    explication: "Le plus court chemin se calcule avec un algorithme écrit à la main (de la famille de Dijkstra ou A*). Rien n'est appris.",
    nuance: "A* a été inventé par des chercheurs en IA en 1968 : c'est l'« effet IA ». Et l'estimation des bouchons, elle, est souvent apprise à partir de données."
  },
  {
    objet: "Clavier prédictif",
    detail: "Ton clavier propose le mot suivant pendant que tu écris.",
    reponse: "ia",
    explication: "Un modèle de langage a appris, sur de grandes quantités de textes, quels mots ont tendance à se suivre."
  },
  {
    objet: "Deep Blue (échecs, 1997)",
    detail: "L'ordinateur d'IBM qui a battu le champion du monde Garry Kasparov.",
    reponse: "pas-ia",
    explication: "Selon notre critère : principalement codé à la main. Il explore des millions de coups et les évalue avec des règles écrites et réglées par des experts.",
    nuance: "En 1997, tout le monde parlait d'IA ! Au sens large, c'en est (IA symbolique). Au sens « appris à partir de données », presque pas."
  },
  {
    objet: "Assistant vocal",
    detail: "Tu dis « mets un minuteur de 10 minutes » et le téléphone comprend.",
    reponse: "ia",
    explication: "Transformer ta voix en texte est appris à partir de milliers d'heures d'enregistrements avec leur transcription."
  },
  {
    objet: "Détecteur de fumée",
    detail: "Il sonne quand il y a de la fumée dans la pièce.",
    reponse: "pas-ia",
    explication: "Un capteur et un seuil : si la mesure dépasse une valeur fixée à la fabrication, l'alarme sonne."
  },
  {
    objet: "Traduction automatique",
    detail: "Tu colles une phrase en anglais, tu obtiens la phrase en français.",
    reponse: "ia",
    explication: "Le modèle a appris à partir de très nombreux textes déjà traduits par des humains. Personne n'a écrit toutes les règles de grammaire."
  }
];
