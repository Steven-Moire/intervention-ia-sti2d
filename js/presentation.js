/*
 * presentation.js — navigation de la présentation, sans dépendance.
 *
 * Clavier : flèches, Page préc./suiv., Espace, Début/Fin
 *           N = notes de l'orateur, F = plein écran, A ou ? = aide
 * Tactile : balayage gauche/droite
 * URL     : #12 ouvre la diapositive 12 ; ?parcours=1h masque les diapositives « 2h »
 */
(function () {
  "use strict";

  var SEUIL_SWIPE = 50; // px horizontaux minimum pour un balayage
  var diapos = [];
  var courante = 0;

  function lireParcours() {
    var params = new URLSearchParams(window.location.search);
    return params.get("parcours") === "1h" ? "1h" : "2h";
  }

  function preparerParcours(parcours) {
    var toutes = Array.prototype.slice.call(document.querySelectorAll(".diapo"));
    toutes.forEach(function (d) {
      var horsParcours = parcours === "1h" && d.getAttribute("data-parcours") === "2h";
      d.classList.toggle("hors-parcours", horsParcours);
    });
    diapos = toutes.filter(function (d) {
      return !d.classList.contains("hors-parcours");
    });
    var badge = document.getElementById("badge-parcours");
    if (badge) {
      badge.textContent = parcours === "1h" ? "Parcours 1 h" : "Parcours 2 h";
    }
  }

  function lireHash() {
    var n = parseInt(window.location.hash.replace("#", ""), 10);
    if (isNaN(n)) {
      return 0;
    }
    return Math.min(Math.max(n - 1, 0), diapos.length - 1);
  }

  function afficher(index) {
    courante = Math.min(Math.max(index, 0), diapos.length - 1);
    diapos.forEach(function (d, i) {
      var active = i === courante;
      d.classList.toggle("active", active);
      d.setAttribute("aria-hidden", active ? "false" : "true");
    });
    var total = diapos.length;
    var barre = document.getElementById("progression-barre");
    if (barre) {
      barre.style.width = (total > 1 ? (courante / (total - 1)) * 100 : 100) + "%";
    }
    var progression = document.getElementById("progression");
    if (progression) {
      progression.setAttribute("aria-valuenow", String(courante + 1));
      progression.setAttribute("aria-valuemax", String(total));
    }
    var compteur = document.getElementById("compteur");
    if (compteur) {
      compteur.textContent = courante + 1 + " / " + total;
    }
    var hash = "#" + (courante + 1);
    if (window.location.hash !== hash) {
      history.replaceState(null, "", hash);
    }
    diapos[courante].scrollTop = 0;
  }

  function suivante() {
    afficher(courante + 1);
  }

  function precedente() {
    afficher(courante - 1);
  }

  function basculerNotes() {
    var visibles = document.body.classList.toggle("notes-visibles");
    var bouton = document.getElementById("bouton-notes");
    if (bouton) {
      bouton.setAttribute("aria-pressed", visibles ? "true" : "false");
    }
  }

  function basculerAide() {
    var aide = document.getElementById("aide");
    if (aide) {
      aide.hidden = !aide.hidden;
    }
  }

  function basculerPleinEcran() {
    if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(function () {
        /* refusé par le navigateur : on reste en fenêtre */
      });
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  function estChampDeSaisie(cible) {
    return cible && /^(INPUT|TEXTAREA|SELECT)$/.test(cible.tagName);
  }

  var ACTIONS_CLAVIER = {
    ArrowRight: suivante,
    ArrowDown: suivante,
    PageDown: suivante,
    " ": suivante,
    ArrowLeft: precedente,
    ArrowUp: precedente,
    PageUp: precedente,
    Home: function () { afficher(0); },
    End: function () { afficher(diapos.length - 1); },
    n: basculerNotes,
    N: basculerNotes,
    f: basculerPleinEcran,
    F: basculerPleinEcran,
    a: basculerAide,
    A: basculerAide,
    "?": basculerAide,
    Escape: function () {
      var aide = document.getElementById("aide");
      if (aide) {
        aide.hidden = true;
      }
    }
  };

  function surClavier(e) {
    if (e.ctrlKey || e.metaKey || e.altKey || estChampDeSaisie(e.target)) {
      return;
    }
    var action = ACTIONS_CLAVIER[e.key];
    if (action) {
      e.preventDefault();
      action();
    }
  }

  function activerSwipe() {
    var depart = null;
    document.addEventListener("touchstart", function (e) {
      if (e.touches.length === 1) {
        depart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });
    document.addEventListener("touchend", function (e) {
      if (!depart || e.changedTouches.length !== 1) {
        return;
      }
      var dx = e.changedTouches[0].clientX - depart.x;
      var dy = e.changedTouches[0].clientY - depart.y;
      depart = null;
      if (Math.abs(dx) < SEUIL_SWIPE || Math.abs(dx) < Math.abs(dy)) {
        return; // geste trop court ou défilement vertical
      }
      if (dx < 0) {
        suivante();
      } else {
        precedente();
      }
    }, { passive: true });
  }

  function brancherBoutons() {
    var liens = {
      "bouton-precedent": precedente,
      "bouton-suivant": suivante,
      "bouton-notes": basculerNotes,
      "bouton-aide": basculerAide,
      "aide-fermer": basculerAide
    };
    Object.keys(liens).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) {
        el.addEventListener("click", liens[id]);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("js");
    preparerParcours(lireParcours());
    brancherBoutons();
    activerSwipe();
    document.addEventListener("keydown", surClavier);
    // Export PDF : les réponses repliées (<details>) sont dépliées pour l'impression.
    window.addEventListener("beforeprint", function () {
      document.querySelectorAll("details.reponse").forEach(function (d) {
        d.open = true;
      });
    });
    window.addEventListener("hashchange", function () {
      afficher(lireHash());
    });
    afficher(lireHash());
  });
})();
