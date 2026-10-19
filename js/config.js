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
  intervenant: "Prénom Nom",
  role: "Ingénieur en intelligence artificielle, ancien enseignant"
};

window.LIENS = {
  "site": {
    label: "Cette présentation en ligne (GitHub Pages)",
    url: "TODO_URL",
    credit: ""
  },
  "depot": {
    label: "Le dépôt GitHub du projet",
    url: "TODO_URL",
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
    url: "TODO_URL",
    credit: "Mentimeter"
  },
  "kahoot": {
    label: "Quiz Kahoot de fin de séance",
    url: "TODO_URL",
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
