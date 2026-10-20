/*
 * presentation.js — navigation de la présentation, sans dépendance.
 *
 * Clavier : flèches, Page préc./suiv., Espace, Début/Fin
 *           F = plein écran, A ou ? = aide, S = thème clair/sombre
 *           N = notes de l'orateur, seulement en mode intervenant (?admin)
 * Boutons : parcours 1 h / 2 h, thème, aide (+ notes en mode intervenant)
 * Tactile : balayage gauche/droite
 * URL     : #12 ouvre la diapositive 12 ; ?admin = mode intervenant (bouton N) ;
 *           ?parcours=1h|2h|complet (toujours présent dans l'adresse) et ?theme=clair|sombre
 *           fixent le réglage au chargement. Le parcours complet (autonomie) s'ouvre par un
 *           lien de la dernière diapositive, pas par le bouton.
 */
(function () {
  "use strict";

  var SEUIL_SWIPE = 50; // px horizontaux minimum pour un balayage
  var diapos = [];
  var courante = 0;
  // Parcours du plus court au plus long. Une diapositive data-parcours="2h" apparaît
  // dans le parcours 2 h et dans tous les plus longs ; sans data-parcours, partout.
  // Pour un nouveau parcours : l'ajouter ici et marquer ses diapositives data-parcours="…".
  var PARCOURS = ["1h", "2h", "complet"];
  // Parcours proposés par le bouton (ceux qu'on présente en classe).
  var PARCOURS_BOUTON = ["1h", "2h"];
  var PARCOURS_PAR_DEFAUT = "2h";
  var parcoursActuel = PARCOURS_PAR_DEFAUT;

  function estAdmin() {
    return new URLSearchParams(window.location.search).has("admin");
  }

  function lireParcours() {
    var demande = new URLSearchParams(window.location.search).get("parcours");
    return PARCOURS.indexOf(demande) === -1 ? PARCOURS_PAR_DEFAUT : demande;
  }

  function libelle(parcours) {
    return parcours.replace(/^(\d+)h$/, "$1 h"); // « 2h » → « 2 h », « complet » inchangé
  }

  // Depuis le parcours complet, le bouton ramène au parcours par défaut.
  function parcoursSuivant(parcours) {
    var position = PARCOURS_BOUTON.indexOf(parcours);
    return position === -1 ? PARCOURS_PAR_DEFAUT : PARCOURS_BOUTON[(position + 1) % PARCOURS_BOUTON.length];
  }

  function estHorsParcours(diapo, parcours) {
    var minimum = diapo.getAttribute("data-parcours");
    return minimum !== null && PARCOURS.indexOf(minimum) > PARCOURS.indexOf(parcours);
  }

  function toutesLesDiapos() {
    return Array.prototype.slice.call(document.querySelectorAll(".diapo"));
  }

  function preparerParcours(parcours) {
    parcoursActuel = parcours;
    var toutes = toutesLesDiapos();
    toutes.forEach(function (d) {
      var horsParcours = estHorsParcours(d, parcours);
      d.classList.toggle("hors-parcours", horsParcours);
      if (horsParcours) {
        d.classList.remove("active");
      }
    });
    diapos = toutes.filter(function (d) {
      return !d.classList.contains("hors-parcours");
    });
    document.body.setAttribute("data-parcours", parcours); // pour .seulement-complet / .sauf-complet
    var duree = document.getElementById("parcours-duree");
    if (duree) {
      duree.textContent = libelle(parcours);
    }
    var bouton = document.getElementById("bouton-parcours");
    if (bouton) {
      bouton.setAttribute("aria-label",
        "Parcours " + libelle(parcours) + " : passer au parcours " + libelle(parcoursSuivant(parcours)));
    }
  }

  // L'adresse affiche toujours le parcours (?parcours=1h, ?parcours=2h…) : on sait ce qu'on
  // projette, et un rechargement reste sur le même parcours.
  function memoriserParcoursDansAdresse(parcours) {
    var params = new URLSearchParams(window.location.search);
    params.set("parcours", parcours);
    var requete = params.toString().replace(/=(?=&|$)/g, ""); // « ?admin » plutôt que « ?admin= »
    history.replaceState(null, "", window.location.pathname + (requete ? "?" + requete : "") + window.location.hash);
  }

  function basculerParcours() {
    var actuelle = diapos[courante];
    preparerParcours(parcoursSuivant(parcoursActuel));
    // Si la diapositive affichée devient facultative, on recule jusqu'à la précédente du parcours.
    var toutes = toutesLesDiapos();
    var position = toutes.indexOf(actuelle);
    while (position > 0 && toutes[position].classList.contains("hors-parcours")) {
      position--;
    }
    memoriserParcoursDansAdresse(parcoursActuel);
    afficher(diapos.indexOf(toutes[position]));
  }

  function lireTheme() {
    var theme = new URLSearchParams(window.location.search).get("theme");
    return theme === "clair" || theme === "sombre" ? theme : null;
  }

  function themeActuel() {
    var force = document.documentElement.getAttribute("data-theme");
    if (force) {
      return force;
    }
    var systemeSombre = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    return systemeSombre ? "sombre" : "clair";
  }

  // theme null = suivre le système ; le bouton affiche le thème vers lequel il bascule.
  function appliquerTheme(theme) {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
    }
    var bouton = document.getElementById("bouton-theme");
    if (bouton) {
      var sombre = themeActuel() === "sombre";
      bouton.setAttribute("data-icone", sombre ? "soleil" : "lune");
      bouton.setAttribute("aria-label", sombre ? "Passer en thème clair" : "Passer en thème sombre");
    }
  }

  function basculerTheme() {
    appliquerTheme(themeActuel() === "sombre" ? "clair" : "sombre");
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
    if (!document.body.classList.contains("admin")) {
      return; // notes réservées au mode intervenant : pas d'affichage par erreur devant la classe
    }
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
    s: basculerTheme,
    S: basculerTheme,
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
      "bouton-parcours": basculerParcours,
      "bouton-theme": basculerTheme,
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
    if (estAdmin()) {
      document.body.classList.add("admin");
      var boutonNotes = document.getElementById("bouton-notes");
      if (boutonNotes) {
        boutonNotes.hidden = false;
      }
    }
    preparerParcours(lireParcours());
    memoriserParcoursDansAdresse(parcoursActuel);
    appliquerTheme(lireTheme());
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
