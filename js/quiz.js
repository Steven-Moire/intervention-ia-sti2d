/*
 * quiz.js — logique de l'activité « IA ou pas IA ? ».
 * Tout se passe dans le navigateur : aucun serveur, aucun stockage, aucun envoi.
 */
(function () {
  "use strict";

  var CRITERES = {
    "ia": "Appris à partir de données",
    "pas-ia": "Codé à la main"
  };

  var etat = { index: 0, score: 0, reponses: [] };

  function $(id) {
    return document.getElementById(id);
  }

  function objets() {
    return window.QUIZ_OBJETS || [];
  }

  function montrerEcran(id) {
    ["ecran-accueil", "ecran-question", "ecran-fin"].forEach(function (e) {
      $(e).hidden = e !== id;
    });
  }

  function afficherQuestion() {
    var liste = objets();
    var q = liste[etat.index];
    $("question-numero").textContent = etat.index + 1 + " / " + liste.length;
    $("question-score").textContent = "Score : " + etat.score;
    $("barre-quiz").style.width = (etat.index / liste.length) * 100 + "%";
    $("question-titre").textContent = q.objet;
    $("question-detail").textContent = q.detail;
    $("correction").hidden = true;
    document.querySelectorAll("#choix button").forEach(function (b) {
      b.disabled = false;
      b.classList.remove("choisi", "juste", "faux");
    });
    montrerEcran("ecran-question");
    $("question-titre").focus();
  }

  function repondre(bouton) {
    var q = objets()[etat.index];
    var choix = bouton.getAttribute("data-reponse");
    var correct = choix === q.reponse;
    if (correct) {
      etat.score += 1;
    }
    etat.reponses.push({ objet: q.objet, correct: correct, reponse: q.reponse });

    document.querySelectorAll("#choix button").forEach(function (b) {
      b.disabled = true;
      var r = b.getAttribute("data-reponse");
      if (r === q.reponse) {
        b.classList.add("juste");
      } else if (b === bouton) {
        b.classList.add("faux");
      }
    });
    bouton.classList.add("choisi");

    $("question-score").textContent = "Score : " + etat.score;
    var verdict = $("correction-verdict");
    verdict.textContent = correct ? "Bien vu !" : "Pas tout à fait…";
    verdict.className = "verdict " + (correct ? "juste" : "faux");
    $("correction-critere").textContent = CRITERES[q.reponse];
    $("correction-critere").className = "badge " + q.reponse;
    $("correction-explication").textContent = q.explication;
    var nuance = $("correction-nuance");
    nuance.hidden = !q.nuance;
    nuance.textContent = q.nuance ? "Nuance : " + q.nuance : "";
    $("bouton-suivant").textContent =
      etat.index + 1 < objets().length ? "Suivant" : "Voir mon score";
    $("correction").hidden = false;
    $("bouton-suivant").focus();
  }

  function messageFinal(score, total) {
    var ratio = score / total;
    if (ratio === 1) {
      return "Parfait ! Tu sais distinguer ce qui est codé de ce qui est appris.";
    }
    if (ratio >= 0.75) {
      return "Très bien ! Regarde les nuances : certains cas font débat même chez les spécialistes.";
    }
    if (ratio >= 0.5) {
      return "Pas mal ! Le piège : beaucoup d'objets « automatiques » ne font que suivre des règles écrites à la main.";
    }
    return "C'est normal d'hésiter : le mot « IA » est utilisé partout. Relis les corrections, on en parle ensemble.";
  }

  function afficherFin() {
    var total = objets().length;
    $("score-final").textContent = etat.score + " / " + total;
    $("message-final").textContent = messageFinal(etat.score, total);
    var recap = $("recap");
    recap.textContent = "";
    etat.reponses.forEach(function (r) {
      var li = document.createElement("li");
      li.className = r.correct ? "juste" : "faux";
      li.textContent = (r.correct ? "✓ " : "✗ ") + r.objet + " — " + CRITERES[r.reponse];
      recap.appendChild(li);
    });
    $("barre-quiz").style.width = "100%";
    montrerEcran("ecran-fin");
  }

  function suivant() {
    etat.index += 1;
    if (etat.index < objets().length) {
      afficherQuestion();
    } else {
      afficherFin();
    }
  }

  function commencer() {
    etat = { index: 0, score: 0, reponses: [] };
    afficherQuestion();
  }

  document.addEventListener("DOMContentLoaded", function () {
    $("question-titre").setAttribute("tabindex", "-1");
    $("bouton-commencer").addEventListener("click", commencer);
    $("bouton-recommencer").addEventListener("click", commencer);
    $("bouton-suivant").addEventListener("click", suivant);
    document.querySelectorAll("#choix button").forEach(function (b) {
      b.addEventListener("click", function () {
        repondre(b);
      });
    });
    montrerEcran("ecran-accueil");
  });
})();
