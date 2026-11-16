// Woordenlijsten voor de doeltaal. De oorspronkelijke lijsten lopen via het Spaans
// (DICTS[taal][woord] = Spaans, REVS[taal][Spaans] = woord). Hier worden ze gekoppeld:
// D[app-taal][woord] = woord in de doeltaal, R[app-taal][woord in de doeltaal] = woord in de app-taal.
// Ze worden alleen gebruikt voor "woord voor woord" als een zin niet als geheel vertaald kan worden.
var DOELDICT = (function () {
  var T = DOELTAAL.code, D = {}, R = {}, P = {};
  if (T === "es") return { D: DICTS, R: REVS, P: PHRASES_BY_LANG };
  function bare(w) { return String(w).replace(/^(der|die|das|le|la|les|l'|the|to|de|het|een) /i, "").replace(/^l'/, ""); }
  DOELTAAL.ui.forEach(function (l) {
    var d = Object.create(null), r = Object.create(null), k, es, w;
    if (l === "es") {
      for (es in REVS[T]) { if (/ /.test(es)) continue; d[es] = bare(REVS[T][es]); }
      for (k in DICTS[T]) { w = bare(k); if (r[w] === undefined) r[w] = DICTS[T][k]; }
    } else {
      for (k in DICTS[l]) { es = DICTS[l][k]; w = REVS[T][es]; if (w !== undefined) d[k] = bare(w); }
      for (k in DICTS[T]) { es = DICTS[T][k]; w = REVS[l][es]; if (w !== undefined && r[bare(k)] === undefined) r[bare(k)] = bare(w); }
    }
    D[l] = d; R[l] = r; P[l] = Object.create(null);
  });
  return { D: D, R: R, P: P };
})();
