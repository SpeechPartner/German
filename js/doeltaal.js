// Doeltaal van deze app. DOEL (uit doel.js) is de taal die je leert: "de", "fr", "en" of "nl".
// De app-talen zijn de vier andere talen (dus mét Spaans, zonder de doeltaal zelf).
// De inhoud is oorspronkelijk voor Spaans geschreven: overal waar "Spaans" als te leren taal genoemd wordt,
// zet taalNaam() de naam van de doeltaal neer.
var DOELTAAL = (function () {
  var T = (typeof DOEL !== "undefined") ? DOEL : "es";
  var ALL = ["nl", "en", "de", "fr", "es"];
  var CFG = {
    es: { app: "Speech Partner.Spanish", bcp: "es-ES", whisper: "spanish", def: "nl" },
    de: { app: "Speech Partner.German", bcp: "de-DE", whisper: "german", def: "nl" },
    fr: { app: "Speech Partner.French", bcp: "fr-FR", whisper: "french", def: "nl" },
    en: { app: "Speech Partner.English", bcp: "en-GB", whisper: "english", def: "nl" },
    nl: { app: "Speech Partner.Dutch", bcp: "nl-NL", whisper: "dutch", def: "en" }
  };
  // Naam van elke taal, in elke taal
  var NAMES = {
    nl: { es: "Spaans", de: "Duits", fr: "Frans", en: "Engels", nl: "Nederlands" },
    en: { es: "Spanish", de: "German", fr: "French", en: "English", nl: "Dutch" },
    de: { es: "Spanisch", de: "Deutsch", fr: "Französisch", en: "Englisch", nl: "Niederländisch" },
    fr: { es: "espagnol", de: "allemand", fr: "français", en: "anglais", nl: "néerlandais" },
    es: { es: "español", de: "alemán", fr: "francés", en: "inglés", nl: "neerlandés" }
  };
  // Zet in een tekst (geschreven in taal tl) de naam van het Spaans om in de naam van de doeltaal
  function taalNaam(tl, s) {
    if (T === "es" || typeof s !== "string" || !s) return s;
    s = s.replace(/Partner\.Spanish/g, CFG[T].app.replace("Speech ", ""));
    var n = NAMES[tl][T];
    if (tl === "nl") return s.replace(/Spaans/g, n);
    if (tl === "en") return s.replace(/Spanish/g, n);
    if (tl === "de") return s.replace(/Spanisch/g, n).replace(/spanisch/g, n.charAt(0).toLowerCase() + n.slice(1));
    if (tl === "es") return s.replace(/español/g, n);
    if (tl === "fr") {
      var vow = /^[aeiouhéè]/.test(n);
      return s.replace(/l'espagnol/g, vow ? "l'" + n : "le " + n).replace(/d'espagnol/g, vow ? "d'" + n : "de " + n)
        .replace(/espagnoles/g, n + "es").replace(/espagnole/g, n + "e")
        .replace(/espagnols/g, /s$/.test(n) ? n : n + "s").replace(/espagnol/g, n);
    }
    return s;
  }
  // Teksten die in de apps voor andere talen anders luiden (sleutel: de oorspronkelijke Nederlandse tekst): [nl, en, de, fr]
  var OVERRIDE = {
    "Mijn geslacht: man (Estoy cansado) of vrouw (Estoy cansada). Zo krijgen zinnen over jezelf de juiste Spaanse vorm.":
      ["Mijn geslacht: man of vrouw. Zo krijgen zinnen over jezelf de juiste vorm.", "My gender: male or female. This gives sentences about yourself the right form.", "Mein Geschlecht: männlich oder weiblich. So bekommen Sätze über dich die richtige Form.", "Mon genre : masculin ou féminin. Ainsi, les phrases sur toi ont la bonne forme."],
    "Taal: via het logo of het tandwiel (Nederlands, Engels, Duits, Frans).":
      ["Taal: via het logo of het tandwiel.", "Language: via the logo or the gear icon.", "Sprache: über das Logo oder das Zahnrad.", "Langue : via le logo ou la roue crantée."],
    "Na het opnemen vergelijkt de app de klanken met het voorbeeld. Je ziet per woord ✓ of ✗, welke klank afweek (bijvoorbeeld een enkele r waar een getrilde rr hoort) en een tip.":
      ["Na het opnemen vergelijkt de app wat hij verstond met het voorbeeld.", "After recording, the app compares what it understood with the example.", "Nach der Aufnahme vergleicht die App das Verstandene mit dem Beispiel.", "Après l'enregistrement, l'application compare ce qu'elle a compris avec l'exemple."],
    "Na het opnemen zie je per woord en per klank wat afweek van het voorbeeld, met een tip.":
      ["Na het opnemen zie je welke woorden hetzelfde verstaan zijn als in het voorbeeld.", "After recording you see which words were understood the same as in the example.", "Nach der Aufnahme siehst du, welche Wörter genauso verstanden wurden wie im Beispiel.", "Après l'enregistrement, tu vois quels mots ont été compris comme dans l'exemple."],
    "Oefen met minimale paren en shadowing.":
      ["Oefen met shadowing: luister en herhaal direct daarna.", "Practise with shadowing: listen and repeat right after.", "Übe mit Shadowing: zuhören und direkt nachsprechen.", "Entraîne-toi avec le shadowing : écoute et répète juste après."],
    "Oefen je uitspraak met opnemen en vergelijken, met minimale paren en shadowing.":
      ["Oefen je uitspraak met opnemen en vergelijken, met shadowing.", "Practise your pronunciation by recording and comparing, with shadowing.", "Übe deine Aussprache mit Aufnehmen und Vergleichen, mit Shadowing.", "Entraîne ta prononciation en enregistrant et en comparant, avec le shadowing."],
    "Een gratis hulpmiddel om Spaans te spreken, ook als je de taal nog niet goed kent. Je vindt er kant-en-klare zinnen, uitleg over de grammatica en een gesprekstrainer. De app werkt op je telefoon, zonder account en zonder server.":
      ["Een gratis hulpmiddel om Spaans te spreken, ook als je de taal nog niet goed kent. Je vindt er kant-en-klare zinnen en een gesprekstrainer. De app werkt op je telefoon, zonder account en zonder server.",
       "A free tool to speak Spanish, even if you don't know the language well yet. It has ready-made sentences and a conversation trainer. The app runs on your phone, without an account and without a server.",
       "Ein kostenloses Hilfsmittel, um Spanisch zu sprechen, auch wenn du die Sprache noch nicht gut kennst. Es gibt fertige Sätze und einen Gesprächstrainer. Die App läuft auf deinem Telefon, ohne Konto und ohne Server.",
       "Un outil gratuit pour parler espagnol, même si tu ne le maîtrises pas encore. Il contient des phrases toutes prêtes et un entraîneur de conversation. L'application fonctionne sur ton téléphone, sans compte et sans serveur."],
    "Oefenen met kaarten, een quiz en grammatica.":
      ["Oefenen met kaarten en een quiz.", "Practise with flashcards and a quiz.", "Üben mit Karteikarten und einem Quiz.", "S'entraîner avec des cartes et un quiz."],
    "Geen gesprek nog. Tik op de microfoon en zeg bijvoorbeeld ¿Qué tal?": null
  };
  // Uitlegregels en onderdelen die vervallen (over Zin bouwen, Regels en grammatica)
  var DROP = [];
  var ui = ALL.filter(function (l) { return l !== T; });
  if (T === "es") ui = ["nl", "en", "de", "fr"];
  function vervalt(o) { return T !== "es" && o && DROP.indexOf(o.k) >= 0; }
  return { code: T, cfg: CFG[T], ui: ui, all: ALL, names: NAMES, taalNaam: taalNaam, flip: {}, override: T === "es" ? {} : OVERRIDE, vervalt: vervalt };
})();
