// Woordenlijsten voor de doeltaal. De oorspronkelijke lijsten lopen via het Spaans
// (DICTS[taal][woord] = Spaans, REVS[taal][Spaans] = woord). Hier worden ze gekoppeld:
// D[app-taal][woord] = woord in de doeltaal, R[app-taal][woord in de doeltaal] = woord in de app-taal.
// Ze worden alleen gebruikt voor "woord voor woord" als een zin niet als geheel vertaald kan worden.
var DOELDICT = (function () {
  var T = DOELTAAL.code, D = {}, R = {}, P = {};
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
  return { D: D, R: R, P: P };
})();
