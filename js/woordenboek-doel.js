// Woordenlijsten voor de doeltaal. De oorspronkelijke lijsten lopen via het Spaans
// (DICTS[taal][woord] = Spaans, REVS[taal][Spaans] = woord). Hier worden ze gekoppeld:
// D[app-taal][woord] = woord in de doeltaal, R[app-taal][woord in de doeltaal] = woord in de app-taal.
// Ze worden alleen gebruikt voor "woord voor woord" als een zin niet als geheel vertaald kan worden.
var DOELDICT = (function () {
  var T = DOELTAAL.code, D = {}, R = {}, P = {};
  // Woordparen per brug: de basislijst plus de extra paren (Collins en expat-woordenlijst); de basislijst wint
  function ALLP(n) {
    var a = n === "NL_EN" ? (typeof NL_EN_PAIRS !== "undefined" ? NL_EN_PAIRS : "") : n === "DE_EN" ? (typeof DE_EN_PAIRS !== "undefined" ? DE_EN_PAIRS : "") : (typeof FR_EN_PAIRS !== "undefined" ? FR_EN_PAIRS : "");
    var b = n === "NL_EN" ? (typeof NL_EN_EXTRA !== "undefined" ? NL_EN_EXTRA : "") : n === "DE_EN" ? (typeof DE_EN_EXTRA !== "undefined" ? DE_EN_EXTRA : "") : (typeof FR_EN_EXTRA !== "undefined" ? FR_EN_EXTRA : "");
    return a && b ? a + "|" + b : a || b;
  }
  if (T === "es") return { D: DICTS, R: REVS, P: PHRASES_BY_LANG };
  // Duits: zelfstandige naamwoorden met een hoofdletter (uit de lidwoorden in de woordenlijst en de PDF-geslachten)
  var NOUN_DE = Object.create(null);
  if (T === "de") {
    Object.keys(DICTS.de).forEach(function (k) { var mm = /^(der|die|das) (\S+)$/.exec(k); if (mm) NOUN_DE[mm[2]] = 1; });
    if (typeof ZIN_GENDER !== "undefined") ZIN_GENDER.de.split("|").forEach(function (p) { var i = p.indexOf("="); if (i > 0) NOUN_DE[p.slice(0, i)] = 1; });
  }
  // Een Spaans werkwoord (comer) geeft een Duits werkwoord (essen), ook als er een zelfstandig naamwoord bestaat (das Essen)
  function caps(w, es) { return (T === "de" && NOUN_DE[w] && !/(ar|er|ir|ír)(se)?$/.test(es || "")) ? w.charAt(0).toUpperCase() + w.slice(1) : w; }
  function bare(w) { return String(w).replace(/^(der|die|das|le|la|les|l'|the|to|de|het|een) /i, "").replace(/^l'/, ""); }
  DOELTAAL.ui.forEach(function (l) {
    var d = Object.create(null), r = Object.create(null), k, es, w;
    if (l === "es") {
      for (es in REVS[T]) { if (/ /.test(es)) continue; d[es] = caps(bare(REVS[T][es]), es); }
      for (k in DICTS[T]) { w = bare(k); if (r[w] === undefined) r[w] = DICTS[T][k]; }
    } else {
      for (k in DICTS[l]) { es = DICTS[l][k]; w = REVS[T][es]; if (w !== undefined) d[k] = caps(bare(w), es); }
      for (k in DICTS[T]) { es = DICTS[T][k]; w = REVS[l][es]; if (w !== undefined && r[bare(k)] === undefined) r[bare(k)] = bare(w); }
    }
    D[l] = d; R[l] = r; P[l] = Object.create(null);
  });
  // Duits en Frans via het Engels: de LanGeek-lijsten geven Engels; de Nederlands-Engelse lijst geeft het Nederlands.
  if (T === "nl" && typeof NL_EN_PAIRS !== "undefined") {
    [["de", ALLP("DE_EN")], ["fr", ALLP("FR_EN")]].forEach(function (x) {
      var lang = x[0], byEn = Object.create(null);
      x[1].split("|").forEach(function (p) {
        var i = p.indexOf("="); if (i < 1) return;
        var w = p.slice(0, i), en = p.slice(i + 1);
        if (byEn[en] === undefined) byEn[en] = w;
      });
      ALLP("NL_EN").split("|").forEach(function (p) {
        var i = p.indexOf("="); if (i < 1) return;
        var nl = p.slice(0, i), en = p.slice(i + 1), w = byEn[en];
        if (w === undefined) return;
        if (R[lang][nl] === undefined) R[lang][nl] = w;
        if (D[lang][w] === undefined) D[lang][w] = nl;
      });
    });
  }
  // Directe woordenlijsten Nederlands-Duits en Nederlands-Frans (PDF): eerst deze, daarna de koppeling via het Engels
  if (T === "nl") {
    [["de", typeof NL_DE_PAIRS !== "undefined" ? NL_DE_PAIRS : ""], ["fr", typeof NL_FR_PAIRS !== "undefined" ? NL_FR_PAIRS : ""]].forEach(function (x) {
      x[1].split("|").forEach(function (p) {
        var i = p.indexOf("="); if (i < 1) return;
        var nl = p.slice(0, i), w = p.slice(i + 1);
        if (R[x[0]][nl] === undefined) R[x[0]][nl] = w;
        if (D[x[0]][w] === undefined) D[x[0]][w] = nl;
      });
    });
  }
  // Directe woordenlijst Nederlands-Engels (PDF): vult de gaten die via het Spaans niet te koppelen zijn
  if (T === "nl" && typeof NL_EN_PAIRS !== "undefined") {
    ALLP("NL_EN").split("|").forEach(function (p) {
      var i = p.indexOf("="); if (i < 1) return;
      var nl = p.slice(0, i), en = p.slice(i + 1);
      if (R.en[nl] === undefined) R.en[nl] = en;
      if (D.en[en] === undefined) D.en[en] = nl;
    });
  }
  return { D: D, R: R, P: P };
})();
