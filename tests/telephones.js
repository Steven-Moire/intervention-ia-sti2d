/*
 * telephones.js — vérifie l'affichage de la présentation et du quiz sur des écrans de téléphone.
 *
 * Utilisation (depuis le dossier tests/) :
 *   npm install          # installe playwright-core, sans télécharger de navigateur
 *   npm test             # utilise Microsoft Edge déjà installé
 *   NAVIGATEUR=chrome npm test   # ou Google Chrome
 *
 * Pour chaque écran et chaque taille de police, sur chaque diapositive :
 * - rien ne doit dépasser en largeur (contenu coupé sur le côté) ;
 * - le dernier élément doit rester au-dessus de la barre de navigation ;
 * - aucune erreur JavaScript, aucune requête vers Internet.
 * Défiler verticalement dans une diapositive est autorisé (c'est prévu sur téléphone).
 * Code de sortie 1 au moindre problème.
 */
"use strict";

const { chromium } = require("playwright-core");
const path = require("path");

const RACINE = path.resolve(__dirname, "..");
const NAVIGATEUR = process.env.NAVIGATEUR || "msedge";

// [largeur, hauteur, tailles de police testées en %]
const ECRANS = [
  [320, 568, [100, 130, 200]], // petit Android, ancien iPhone SE
  [360, 640, [100, 130, 200]], // Android d'entrée de gamme
  [360, 740, [100, 130, 200]],
  [375, 667, [100, 130, 200]], // iPhone SE récent
  [390, 844, [100, 130, 200]],
  [412, 915, [100, 130, 200]], // grand Android
  [640, 360, [100]], // paysage
  [844, 390, [100]],
  // Chrome Android applique la taille de police du téléphone comme un zoom de page :
  // 360 px à 130 % ou 150 % donnent un écran de 277 px ou 240 px.
  [277, 492, [100, 130]],
  [240, 427, [100, 130]]
];

function adresse(fichier, suite = "") {
  return "file:///" + path.join(RACINE, fichier).split(path.sep).join("/") + suite;
}

function mesurerDiapoActive() {
  const d = document.querySelector(".diapo.active");
  const largeur = document.documentElement.clientWidth;
  const tropLarges = [...d.querySelectorAll("*")]
    .filter((el) => !el.closest("svg *"))
    .filter((el) => {
      const b = el.getBoundingClientRect();
      return b.width > 0 && (b.right > largeur + 1 || b.left < -1);
    })
    .map((el) => el.tagName.toLowerCase());
  d.scrollTop = d.scrollHeight;
  const barre = document.querySelector(".navigation").getBoundingClientRect().top;
  const visibles = [...d.querySelectorAll(".contenu > *")].filter(
    (el) => el.getBoundingClientRect().height > 0 && !el.classList.contains("notes")
  );
  const dernier = visibles[visibles.length - 1];
  const sousLaBarre = dernier ? Math.round(dernier.getBoundingClientRect().bottom - barre) : 0;
  d.scrollTop = 0;
  return { id: d.id, tropLarges: [...new Set(tropLarges)], sousLaBarre };
}

async function nouvellePage(nav, largeur, hauteur, problemes) {
  const ctx = await nav.newContext({
    viewport: { width: largeur, height: hauteur },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => problemes.push("erreur JavaScript : " + e.message));
  page.on("request", (r) => {
    if (!/^(file|data):/.test(r.url())) {
      problemes.push("requête externe : " + r.url());
    }
  });
  return { ctx, page };
}

async function testerPresentation(nav, largeur, hauteur, police) {
  const problemes = [];
  const { ctx, page } = await nouvellePage(nav, largeur, hauteur, problemes);
  await page.goto(adresse("index.html", "?parcours=complet")); // parcours complet = toutes les diapositives
  if (police !== 100) {
    await page.addStyleTag({ content: `html { font-size: ${police}% !important; }` });
  }
  const total = await page.evaluate(() => document.querySelectorAll(".diapo:not(.hors-parcours)").length);
  for (let i = 1; i <= total; i++) {
    await page.evaluate((n) => {
      location.hash = "#" + n;
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }, i);
    const m = await page.evaluate(mesurerDiapoActive);
    if (m.tropLarges.length) {
      problemes.push(`diapo ${i} (${m.id}) trop large : ${m.tropLarges.slice(0, 4).join(", ")}`);
    }
    if (m.sousLaBarre > 1) {
      problemes.push(`diapo ${i} (${m.id}) cachée sous la barre de ${m.sousLaBarre} px`);
    }
  }
  await ctx.close();
  return problemes;
}

async function testerQuiz(nav, largeur, hauteur) {
  const problemes = [];
  const { ctx, page } = await nouvellePage(nav, largeur, hauteur, problemes);
  await page.goto(adresse("activites/ia-ou-pas-ia.html"));
  const depasse = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  if (depasse > 1) {
    problemes.push(`quiz trop large de ${depasse} px`);
  }
  await ctx.close();
  return problemes;
}

(async () => {
  const nav = await chromium.launch({ channel: NAVIGATEUR });
  let echecs = 0;
  for (const [largeur, hauteur, polices] of ECRANS) {
    for (const police of polices) {
      const problemes = await testerPresentation(nav, largeur, hauteur, police);
      if (police === 100) {
        problemes.push(...(await testerQuiz(nav, largeur, hauteur)));
      }
      const nom = `${largeur}×${hauteur}, police ${police} %`;
      console.log(problemes.length ? `ÉCHEC  ${nom}\n  - ${problemes.join("\n  - ")}` : `ok     ${nom}`);
      echecs += problemes.length ? 1 : 0;
    }
  }
  await nav.close();
  console.log(echecs ? `\n${echecs} configuration(s) en échec.` : "\nTout s'affiche correctement.");
  process.exit(echecs ? 1 : 0);
})().catch((e) => {
  console.error(e.message);
  console.error(`Navigateur « ${NAVIGATEUR} » introuvable ? Essayer NAVIGATEUR=chrome ou NAVIGATEUR=msedge.`);
  process.exit(1);
});
