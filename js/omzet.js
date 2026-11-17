// Zet de inhoud om naar de doeltaal. Draait na content.js.
// Alles met een Spaanse tekst (es) en vertalingen (m) wordt omgedraaid: es wordt de tekst in de doeltaal,
// m bevat alle vijf de talen. Onderdelen die alleen over het Spaans gaan (woord-voor-woord, grammatica,
// zinsbouwpatronen) worden leeggemaakt; die tabbladen toont de app dan niet.
(function () {
  var D = DOELTAAL, T = D.code, N = D.taalNaam;
  if (T === "es") return;
  function isM(o) { return o && typeof o === "object" && !Array.isArray(o) && typeof o.nl === "string" && typeof o.en === "string"; }
  function flipObj(o) {
    if (o.bron !== undefined) return;                 // al gedaan door p()
    var src = o.es;
    o.m.es = N("es", src);
    o.es = o.m[T];
    o.bron = src;
    D.flip[src] = o.es;
  }
  function walk(o) {
    if (!o || typeof o !== "object") return;
    if (Array.isArray(o)) {
      if (o.length === 3 && typeof o[1] === "string" && isM(o[2])) {      // [stijl, Spaans, vertalingen]
        var src = o[1]; o[2].es = N("es", src); o[1] = o[2][T]; D.flip[src] = o[1];
        return;
      }
      o.forEach(walk); return;
    }
    if (isM(o)) return;
    if (typeof o.es === "string" && isM(o.m)) flipObj(o);
    Object.keys(o).forEach(function (k) { if (k !== "m") walk(o[k]); });
  }
  [PHRASES, OPENERS, OPENER_REPLY, HELP_OPTIONS, STUCK, TOPICS, REACT, TALK, ALT].forEach(walk);

  function key(s) { return String(s || "").toLowerCase().replace(/[¿?¡!.,;:]/g, "").replace(/\s+/g, " ").trim(); }
  // Tabellen met een Spaanse zin als sleutel: opnieuw op de zin in de doeltaal
  function rekey(tab) {
    var out = {};
    Object.keys(tab).forEach(function (k) { var t = D.flip[k]; if (t !== undefined) out[t] = tab[k]; });
    return out;
  }
  var w2 = rekey(WHEN); Object.keys(WHEN).forEach(function (k) { delete WHEN[k]; }); Object.keys(w2).forEach(function (k) { WHEN[k] = w2[k]; });
  // Andere manieren: geen dubbele zinnen en niet de zin zelf
  var a2 = {};
  Object.keys(ALT).forEach(function (k) {
    var t = D.flip[k]; if (t === undefined) return;
    var seen = {}; seen[key(t)] = true;
    var list = ALT[k].filter(function (x) { var kk = key(x.es); if (seen[kk]) return false; seen[kk] = true; return true; });
    if (list.length) a2[t] = (a2[t] || []).concat(list);
  });
  Object.keys(ALT).forEach(function (k) { delete ALT[k]; }); Object.keys(a2).forEach(function (k) { ALT[k] = a2[k]; });
  // Zin bouwen werkt met de Spaanse stammen; die worden eerst bewaard en daarna met de zin vertaald
  globalThis.BOUW_SRC = { stems: {}, cats: BUILDABLE_CATS.slice() };
  Object.keys(BUILD_STEMS).forEach(function (k) { globalThis.BOUW_SRC.stems[k] = BUILD_STEMS[k]; });
  // Alleen voor het Spaans geschreven: leegmaken
  [GLOSS, ALT_NOTE, BUILD_STEMS, VERB_HINT].forEach(function (o) { Object.keys(o).forEach(function (k) { delete o[k]; }); });
  [PATTERNS, GRAMMAR, BUILDABLE_CATS].forEach(function (a) { a.length = 0; });
  // Regels per doeltaal (zelfde opbouw als de Spaanse regels)
  RULES.length = 0;
  (typeof REGELS_DOEL !== "undefined" && REGELS_DOEL[T] || []).forEach(function (r) { RULES.push(r); });
  // Grammatica per doeltaal (tabblad Grammatica), zelfde opbouw als de Spaanse GRAMMAR
  (typeof GRAMMAR_DOEL !== "undefined" && GRAMMAR_DOEL[T] || []).forEach(function (g) { GRAMMAR.push(g); });
  // Uitleg (Help): onderdelen over Zin bouwen, Regels en grammatica vervallen
  for (var hi = HELP_GUIDE.length - 1; hi >= 0; hi--) {
    if (D.vervalt(HELP_GUIDE[hi].t)) { HELP_GUIDE.splice(hi, 1); continue; }
    HELP_GUIDE[hi].s = HELP_GUIDE[hi].s.filter(function (x) { return !D.vervalt(x); });
  }
  // Mijn geslacht: voorbeeld in de doeltaal
  var VB = { de: ["Ich bin Lehrer", "Ich bin Lehrerin"], fr: ["Je suis fatigué", "Je suis fatiguée"], nl: ["Ik ben leraar", "Ik ben lerares"], en: null }[T];
  function gl(names, i) { var o = {}; ["nl", "en", "de", "fr", "es"].forEach(function (l, j) { o[l] = names[j] + (VB ? " (" + VB[i] + ")" : ""); }); return o; }
  UI["Man (Estoy cansado)"] = gl(["Man", "Male", "Männlich", "Masculin", "Hombre"], 0);
  UI["Vrouw (Estoy cansada)"] = gl(["Vrouw", "Female", "Weiblich", "Féminin", "Mujer"], 1);
  var VBZ = { de: "Wie geht's?", fr: "Ça va ?", en: "How are you?", nl: "Hoe gaat het?" }[T];
  UI["Geen gesprek nog. Tik op de microfoon en zeg bijvoorbeeld ¿Qué tal?"] = {
    nl: "Geen gesprek nog. Tik op de microfoon en zeg bijvoorbeeld: " + VBZ, en: "No conversation yet. Tap the microphone and say for example: " + VBZ,
    de: "Noch kein Gespräch. Tippe auf das Mikrofon und sag zum Beispiel: " + VBZ, fr: "Pas encore de conversation. Touche le micro et dis par exemple : " + VBZ,
    es: "Todavía no hay conversación. Toca el micrófono y di por ejemplo: " + VBZ };
  // Herkenning van partnerzinnen met Spaanse patronen vervalt; de zin zelf wordt nog wel herkend
  TALK.forEach(function (t) { t.re = "$^"; });
})();
