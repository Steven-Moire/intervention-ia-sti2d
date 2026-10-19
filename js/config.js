/*
 * config.js — SEUL fichier à modifier pour les liens externes.
 *
 * - Remplace chaque "TODO_URL" par la vraie adresse (https://...).
 * - Les entrées avec "base" + "chemin" sont calculées : adresse de "base" + "/" + chemin.
 * - Après modification, régénère les QR codes :  python scripts/generate_qr.py
 * - Puis vérifie :                                python scripts/check_links.py
 *
 * Format volontairement simple (une entrée par bloc, guillemets doubles) :
 * scripts/generate_qr.py et scripts/check_links.py le lisent aussi.
 */
window.INTERVENTION = {
  intervenant: "Steven-Moire",
  role: "Ingénieur en intelligence artificielle, ancien enseignant"
};

window.LIENS = {
  "site": {
    label: "Cette présentation en ligne (GitHub Pages)",
    url: "https://steven-moire.github.io/intervention-ia-sti2d/",
    credit: ""
  },
  "depot": {
    label: "Le dépôt GitHub du projet",
    url: "https://github.com/Steven-Moire/intervention-ia-sti2d",
    credit: ""
  },
  "quiz": {
    label: "Activité « IA ou pas IA ? »",
    base: "site",
    chemin: "activites/ia-ou-pas-ia.html",
    credit: ""
  },
  "aller-plus-loin": {
    label: "Pour aller plus loin (facultatif)",
    base: "depot",
    chemin: "tree/main/docs/aller-plus-loin",
    credit: ""
  },
  "mentimeter": {
    label: "Sondage Mentimeter",
    url: "https://www.menti.com/al9xum19gsw1",
    credit: "Mentimeter"
  },
  "kahoot": {
    label: "Quiz Kahoot de fin de séance",
    url: "https://kahoot.it/",
    credit: "Kahoot!"
  },
  "teachable-machine": {
    label: "Teachable Machine",
    url: "https://teachablemachine.withgoogle.com/",
    credit: "Google Creative Lab"
  },
  "cnn-explainer": {
    label: "CNN Explainer",
    url: "https://poloclub.github.io/cnn-explainer/",
    credit: "Polo Club of Data Science, Georgia Tech"
  },
  "tensorflow-playground": {
    label: "TensorFlow Playground",
    url: "https://playground.tensorflow.org/",
    credit: "Daniel Smilkov, Shan Carter (projet TensorFlow)"
  },
  "visualisation-3d-mnist": {
    label: "Réseau de neurones en 3D (chiffres MNIST)",
    url: "https://adamharley.com/nn_vis/cnn/3d.html",
    credit: "Adam W. Harley"
  }
};
