// Herstel van verkeerd verstane losse woorden ("De bus verdraakt" -> "De bus vertrekt").
// Alleen voor Nederlands en Duits: gemeten op echte video's en 1400 opnames verbetert het daar woorden zonder goede
// woorden kapot te maken. Voor Spaans, Frans en Engels leverde het niets op of maakte het de tekst slechter.
// Werkwijze per woord dat de herkenning gaf:
//  1. Blijft staan als het een bekend woord is (app-woordenboek, zinnen van de app, vervoegde vormen, of een woord uit
//     gesproken taal), of een gewone vorm daarvan (meervoud, verbuiging, vervoeging), of een naam (hoofdletter midden in de zin).
//  2. Nederlands: bestaat het uit twee woorden van de app die aan elkaar geplakt zijn, dan wordt het gesplitst.
//  3. Anders: het woord dat er in klank het dichtst bij ligt (hooguit 20% verschil), met voorrang voor woorden van de app
//     en daarna voor vaker gebruikte woorden. Is er geen duidelijke beste kandidaat, dan blijft het woord staan.
var WOORD_HERSTEL = (function () {
  var P = 0.20, M = 0.05, TALEN = { nl: 1, de: 1 };

  function strip(s) {
    return String(s || "").toLowerCase().replace(/ß/g, "ss").replace(/œ/g, "oe").normalize("NFD").replace(/[̀-ͯ]/g, "");
  }
  function lev(a, b) {
    var d = [], i, j;
    for (j = 0; j <= b.length; j++) d[j] = j;
    for (i = 1; i <= a.length; i++) {
      var p = d[0]; d[0] = i;
      for (j = 1; j <= b.length; j++) { var c = d[j]; d[j] = Math.min(d[j] + 1, d[j - 1] + 1, p + (a.charAt(i - 1) !== b.charAt(j - 1) ? 1 : 0)); p = c; }
    }
    return d[b.length];
  }
  function dedup(s) { return s.replace(/(.)\1+/g, "$1"); }
  // Klanken: letters die in de taal (bijna) gelijk klinken vallen samen
  function klank(w, t) {
    var s = strip(w);
    if (t === "nl") {
      s = s.replace(/dt/g, "t").replace(/ch/g, "g").replace(/ij/g, "ei").replace(/ou/g, "au").replace(/ck/g, "k").replace(/ph/g, "f");
      s = s.replace(/c(?=[aou])/g, "k").replace(/d/g, "t").replace(/v/g, "f").replace(/z/g, "s").replace(/y/g, "i");
      return dedup(s);
    }
    if (t === "de") {
      s = s.replace(/sch/g, "S").replace(/ch/g, "x").replace(/ck/g, "k").replace(/ph/g, "f").replace(/th/g, "t").replace(/ie/g, "i");
      s = s.replace(/ei/g, "ai").replace(/eu/g, "oi").replace(/v/g, "f").replace(/z/g, "ts").replace(/qu/g, "kw");
      s = s.replace(/([aeiou])h/g, "$1").replace(/d$/, "t").replace(/b$/, "p").replace(/g$/, "k");
      return dedup(s);
    }
    return s;
  }
  var SUF = {
    nl: ["ste", "ten", "den", "ere", "en", "er", "st", "te", "de", "je", "tje", "jes", "tjes", "e", "s", "n", "t", "d"],
    de: ["sten", "ten", "ste", "est", "en", "er", "es", "em", "st", "te", "et", "e", "n", "s", "t"]
  };
  // Mogelijke grondvormen van een woord (meervoud, verbuiging, vervoeging)
  function stammen(n, t) {
    var out = [n];
    if (n.indexOf("ge") === 0 && n.length > 6) out.push(n.slice(2));
    (SUF[t] || []).forEach(function (s) {
      if (n.length - s.length < 3 || n.slice(-s.length) !== s) return;
      var st = n.slice(0, -s.length), extra = [st];
      if (t === "nl") {
        if (/z$/.test(st)) extra.push(st.slice(0, -1) + "s");
        if (/v$/.test(st)) extra.push(st.slice(0, -1) + "f");
        if (st.length >= 2 && st.charAt(st.length - 1) === st.charAt(st.length - 2)) extra.push(st.slice(0, -1));
        var m = /^(.*[^aeiou])([aeou])([^aeiou])$/.exec(st);
        if (m) extra.push(m[1] + m[2] + m[2] + m[3]);
        extra.slice().forEach(function (x) { extra.push(x + "en"); });
      }
      if (t === "de") [st + "e", st + "en", st + "n"].forEach(function (x) { extra.push(x); });
      Array.prototype.push.apply(out, extra);
    });
    return out;
  }

  var cache = {};
  // bron: { app: [woorden van de app], rang: [woorden uit gesproken taal, vaak eerst], vormen: [...] }
  function maak(t, bron) {
    var known = Object.create(null), app = Object.create(null), rang = Object.create(null), byLen = {}, k = Object.create(null);
    function voeg(w, isApp) {
      var n = strip(w);
      if (!/^[a-z]+$/.test(n)) return;
      if (isApp) app[n] = 1;
      if (known[n]) return;
      known[n] = 1;
      if (n.length >= 4) { (byLen[n.length] = byLen[n.length] || []).push(n); k[n] = klank(n, t); }
    }
    (bron.app || []).forEach(function (w) { voeg(w, true); });
    (bron.vormen || []).forEach(function (w) { voeg(w, true); });
    (bron.rang || []).forEach(function (w, i) { var n = strip(w); if (rang[n] === undefined) rang[n] = i + 1; voeg(w, false); });
    return { t: t, known: known, app: app, rang: rang, byLen: byLen, k: k };
  }
  function bekend(v, n) {
    if (v.known[n]) return true;
    var st = stammen(n, v.t);
    for (var i = 0; i < st.length; i++) if (v.known[st[i]]) return true;
    return false;
  }
  function splits(v, n) {
    if (v.t !== "nl") return null;   // in het Duits zijn samengestelde woorden gewoon
    var best = null, bs = -Infinity;
    for (var i = 2; i < n.length - 1; i++) {
      var a = n.slice(0, i), b = n.slice(i);
      if (v.app[a] && v.app[b]) {
        var sc = -Math.max(v.rang[a] || 1e6, v.rang[b] || 1e6);
        if (sc > bs) { bs = sc; best = a + " " + b; }
      }
    }
    return best;
  }
  function woord(v, w) {
    var n = strip(w);
    if (n.length < 4 || !/^[a-z]+$/.test(n) || bekend(v, n)) return null;
    var sp = splits(v, n);
    if (sp) return sp;
    var kn = klank(n, v.t), sc = [];
    for (var L = n.length - 3; L <= n.length + 3; L++) {
      (v.byLen[L] || []).forEach(function (c) {
        var kc = v.k[c], pd = lev(kn, kc) / Math.max(kn.length, kc.length, 1);
        if (pd <= P) sc.push({ pd: pd, nietApp: v.app[c] ? 0 : 1, rang: v.rang[c] || 1e6, c: c });
      });
    }
    if (!sc.length) return null;
    sc.sort(function (x, y) { return (x.pd - y.pd) || (x.nietApp - y.nietApp) || (x.rang - y.rang) || (x.c < y.c ? -1 : 1); });
    var best = sc[0];
    // Een even goed klinkende rivaal: alleen doorgaan als de beste duidelijk vaker gebruikt wordt (rang 5x lager)
    for (var i = 1; i < sc.length; i++) {
      var r = sc[i];
      if (r.pd - best.pd >= M || r.nietApp !== best.nietApp) continue;
      if (best.rang * 5 > r.rang) return null;
    }
    return best.c;
  }
  // Herstel een hele herkende tekst. taal: nl of de; andere talen blijven ongewijzigd.
  function herstel(tekst, taal, bron) {
    if (!TALEN[taal] || !bron) return tekst;
    var v = cache[taal] || (cache[taal] = maak(taal, bron));
    var begin = true;
    return String(tekst).replace(/[A-Za-zÀ-ÿœß']+|[^A-Za-zÀ-ÿœß']+/g, function (tok) {
      if (!/^[A-Za-zÀ-ÿœß']/.test(tok)) { if (/[.!?]/.test(tok)) begin = true; return tok; }
      var eerste = begin; begin = false;
      if (!eerste && tok.charAt(0) !== tok.charAt(0).toLowerCase()) return tok;   // naam midden in de zin
      var r = woord(v, tok);
      if (!r) return tok;
      return tok.charAt(0) !== tok.charAt(0).toLowerCase() ? r.charAt(0).toUpperCase() + r.slice(1) : r;
    });
  }
  return { herstel: herstel, klank: klank, stammen: stammen, talen: TALEN, _leeg: function () { cache = {}; } };
})();
if (typeof window !== "undefined") window.WOORD_HERSTEL = WOORD_HERSTEL;
if (typeof module !== "undefined") module.exports = WOORD_HERSTEL;
