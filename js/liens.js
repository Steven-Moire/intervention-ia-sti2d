/*
 * liens.js — applique js/config.js à la page.
 *
 *   <a data-lien="cle">...</a>        reçoit l'adresse de la clé (ou est marqué « à compléter »)
 *   <span data-config="intervenant">  reçoit le texte de window.INTERVENTION
 */
(function () {
  "use strict";

  var TODO = "TODO_URL";

  function resoudre(cle) {
    var liens = window.LIENS || {};
    var entree = liens[cle];
    if (!entree) {
      return null;
    }
    if (entree.url) {
      return entree.url === TODO ? null : entree.url;
    }
    if (entree.base && entree.chemin) {
      var base = resoudre(entree.base);
      if (!base) {
        return null;
      }
      return base.replace(/\/+$/, "") + "/" + entree.chemin.replace(/^\/+/, "");
    }
    return null;
  }

  function appliquerLiens() {
    var ancres = document.querySelectorAll("a[data-lien]");
    ancres.forEach(function (a) {
      var cle = a.getAttribute("data-lien");
      var url = resoudre(cle);
      var entree = (window.LIENS || {})[cle];
      if (url) {
        a.href = url;
        a.rel = "noopener noreferrer";
        a.target = "_blank";
        if (entree && entree.credit) {
          a.title = "Projet de : " + entree.credit;
        }
        return;
      }
      // Lien relatif de secours (ex. le quiz, accessible même sans URL du site).
      var secours = a.getAttribute("data-secours");
      if (secours) {
        a.href = secours;
        return;
      }
      a.classList.add("lien-todo");
      a.setAttribute("aria-disabled", "true");
      a.title = "Lien à compléter dans js/config.js (clé « " + cle + " »)";
      a.addEventListener("click", function (e) {
        e.preventDefault();
      });
    });
  }

  function appliquerTextes() {
    var infos = window.INTERVENTION || {};
    document.querySelectorAll("[data-config]").forEach(function (el) {
      var cle = el.getAttribute("data-config");
      if (infos[cle]) {
        el.textContent = infos[cle];
      }
    });
  }

  window.resoudreLien = resoudre;

  document.addEventListener("DOMContentLoaded", function () {
    appliquerLiens();
    appliquerTextes();
  });
})();
