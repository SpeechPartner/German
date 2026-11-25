// Uitspraaktrainer voor de apps die Duits, Frans, Engels of Nederlands leren:
// minimale paren, lastige klanken en korte gesprekken per doeltaal (de Spaanse versie staat in uitspraak.js).
// Uitleg in vijf interfacetalen; de Spaanse uitleg gaat via ES_UI (sleutel: de Nederlandse tekst).
(function () {
  if (typeof DOELTAAL === "undefined" || typeof PRON === "undefined") return;
  function mm(nl, en, de, fr, es) {
    if (typeof ES_UI !== "undefined" && ES_UI[nl] === undefined) ES_UI[nl] = es;
    return m(nl, en, de, fr);
  }
  var CAFE = mm("Bij het café", "At the café", "Im Café", "Au café", "En la cafetería");
  var WEG = mm("Een weg vragen", "Asking the way", "Den Weg fragen", "Demander son chemin", "Preguntar el camino");
  var AFSPRAAK = mm("Een afspraak maken", "Making an appointment", "Eine Verabredung treffen", "Fixer un rendez-vous", "Quedar con alguien");

  var D = {
    de: {
      label: mm("ch, ü en ö", "ch, ü and ö", "ch, ü und ö", "ch, ü et ö", "ch, ü y ö"),
      PAIRS: [
        { a: "Mitte", b: "Miete", tip: mm("Korte i (Mitte = midden) tegenover lange ie (Miete = huur).", "Short i (Mitte = middle) versus long ie (Miete = rent).", "Kurzes i (Mitte) gegenüber langem ie (Miete).", "i bref (Mitte = milieu) contre ie long (Miete = loyer).", "i corta (Mitte = medio) frente a ie larga (Miete = alquiler).") },
        { a: "Stadt", b: "Staat", tip: mm("Korte a (Stadt = stad) tegenover lange aa (Staat = staat).", "Short a (Stadt = town) versus long aa (Staat = state).", "Kurzes a (Stadt) gegenüber langem aa (Staat).", "a bref (Stadt = ville) contre aa long (Staat = État).", "a corta (Stadt = ciudad) frente a aa larga (Staat = Estado).") },
        { a: "Bett", b: "Beet", tip: mm("Korte e (Bett = bed) tegenover lange ee (Beet = bloembed).", "Short e (Bett = bed) versus long ee (Beet = flower bed).", "Kurzes e (Bett) gegenüber langem ee (Beet).", "e bref (Bett = lit) contre ee long (Beet = parterre).", "e corta (Bett = cama) frente a ee larga (Beet = parterre).") },
        { a: "Kuchen", b: "Küchen", tip: mm("u tegenover ü. Zeg ü als een Nederlandse uu, met getuite lippen.", "u versus ü. Say ü like 'ee' with rounded lips.", "u gegenüber ü: die Lippen beim ü runden.", "u allemand (comme « ou ») contre ü (comme le « u » français).", "u frente a ü: para la ü, di «i» con los labios redondeados.") },
        { a: "schon", b: "schön", tip: mm("o tegenover ö. Zeg ö als de eu in 'neus'.", "o versus ö. Say ö like 'e' with rounded lips.", "o gegenüber ö: die Lippen beim ö runden.", "o contre ö (comme « eu » dans « peu »).", "o frente a ö: di «e» con los labios redondeados.") },
        { a: "Dach", b: "dich", tip: mm("Na a, o, u klinkt ch als een harde g (Dach). Na i, e, ü klinkt ch zacht, bijna als een gefluisterde j (dich).", "After a, o, u the ch is rough, at the back of the throat (Dach). After i, e, ü it is soft, like a whispered 'h' in 'huge' (dich).", "Ach-Laut nach a, o, u (Dach), Ich-Laut nach i, e, ü (dich).", "Après a, o, u, le ch est raclé au fond de la gorge (Dach). Après i, e, ü, il est doux, comme un « ch » chuchoté (dich).", "Después de a, o, u, la ch suena como la jota (Dach). Después de i, e, ü es suave, como una «j» susurrada (dich).") },
        { a: "Kirche", b: "Kirsche", tip: mm("ch (Kirche = kerk) tegenover sch (Kirsche = kers).", "ch (Kirche = church) versus sch (Kirsche = cherry).", "ch (Kirche) gegenüber sch (Kirsche).", "ch (Kirche = église) contre sch (Kirsche = cerise).", "ch (Kirche = iglesia) frente a sch (Kirsche = cereza).") },
        { a: "Wein", b: "fein", tip: mm("De w klinkt als een Nederlandse v met de tanden op de lip (Wein = wijn); f is stemloos (fein = fijn).", "W sounds like an English v (Wein = wine); f is voiceless (fein = fine).", "w (Wein) ist stimmhaft, f (fein) stimmlos.", "Le w se prononce comme un v (Wein = vin) ; le f est sourd (fein = fin).", "La w suena como una v inglesa, con los dientes sobre el labio (Wein = vino); la f es sorda (fein = fino).") }
      ],
      RR: [
        { t: "ich", note: mm("Ich-klank: houd je tong als bij een j en blaas zacht.", "Ich sound: hold your tongue as for 'y' in 'yes' and blow softly.", "Ich-Laut: Zunge wie beim j, sanft ausatmen.", "Son « ich » : la langue comme pour « y » dans « yeux », et souffle doucement.", "Sonido «ich»: pon la lengua como para «y» y sopla suavemente.") },
        { t: "ach", note: mm("Ach-klank: achter in de keel, als de Nederlandse g.", "Ach sound: at the back of the throat, like Scottish 'loch'.", "Ach-Laut: hinten im Rachen.", "Son « ach » : au fond de la gorge, comme la jota espagnole.", "Sonido «ach»: al fondo de la garganta, como la jota.") },
        { t: "Küche", note: mm("Eerst de ü met getuite lippen, dan de zachte ch.", "First ü with rounded lips, then the soft ch.", "Erst das ü mit runden Lippen, dann das weiche ch.", "D'abord le ü lèvres arrondies, puis le ch doux.", "Primero la ü con los labios redondeados, luego la ch suave.") },
        { t: "schön", note: mm("sch zoals in 'sjaal', dan de ö.", "sch as in 'shoe', then ö.", "sch, dann das runde ö.", "sch comme dans « chat », puis le ö.", "sch como en inglés «shoe», luego la ö.") },
        { t: "Mädchen", note: mm("Lange ä, dan de zachte ch: Mäd-chen.", "Long ä, then the soft ch: Mäd-chen.", "Langes ä, dann weiches ch: Mäd-chen.", "ä long, puis le ch doux : Mäd-chen.", "ä larga, luego la ch suave: Mäd-chen.") },
        { t: "Brötchen", note: mm("ö en zachte ch in één woord.", "ö and soft ch in one word.", "ö und weiches ch in einem Wort.", "ö et ch doux dans le même mot.", "ö y ch suave en una sola palabra.") },
        { t: "Ich möchte zwei Brötchen, bitte.", note: mm("Zin met ich-klanken en ö; spreek eerst langzaam.", "Sentence with ich sounds and ö; speak slowly first.", "Satz mit Ich-Lauten und ö; zuerst langsam sprechen.", "Phrase avec des « ich » et des ö ; parle d'abord lentement.", "Frase con sonidos «ich» y ö; habla primero despacio.") }
      ],
      DIALOGS: [
        { title: CAFE, turns: [
          { say: "Hallo! Was darf es sein?", ok: ["einen kaffee bitte", "ich hätte gern einen kaffee", "einen kaffee mit milch bitte", "ich möchte einen kaffee"], model: "Ich hätte gern einen Kaffee mit Milch, bitte." },
          { say: "Für hier oder zum Mitnehmen?", ok: ["für hier", "zum mitnehmen", "für hier bitte", "zum mitnehmen bitte"], model: "Für hier, bitte." },
          { say: "Gern. Sonst noch etwas?", ok: ["nein danke", "das ist alles", "nein das ist alles", "ein croissant bitte"], model: "Nein, danke. Das ist alles." },
          { say: "Das macht zwei Euro fünfzig.", ok: ["hier bitte", "bitte schön", "danke", "stimmt so"], model: "Hier, bitte. Danke." }] },
        { title: WEG, turns: [
          { say: "Hallo, kann ich Ihnen helfen?", ok: ["wo ist der bahnhof", "entschuldigung wo ist der bahnhof", "ich suche den bahnhof"], model: "Entschuldigung, wo ist der Bahnhof?" },
          { say: "Gehen Sie geradeaus und am Platz rechts.", ok: ["danke", "vielen dank", "ist es weit", "wie lange dauert das"], model: "Vielen Dank." },
          { say: "Gern geschehen. Es sind fünf Minuten zu Fuß.", ok: ["vielen dank", "tschüss", "auf wiedersehen", "danke"], model: "Vielen Dank, tschüss." }] },
        { title: AFSPRAAK, turns: [
          { say: "Hast du am Samstag Zeit?", ok: ["ja um wie viel uhr", "ja klar", "ja gern", "ja wann"], model: "Ja, um wie viel Uhr?" },
          { say: "Um fünf im Park.", ok: ["perfekt", "gut bis dann", "okay bis dann", "fünf uhr passt"], model: "Perfekt, bis dann." },
          { say: "Super. Kommst du mit dem Rad oder zu Fuß?", ok: ["zu fuß", "mit dem rad", "ich komme zu fuß", "ich komme mit dem rad"], model: "Ich komme zu Fuß." }] }
      ]
    },
    fr: {
      label: mm("u, r en neusklanken", "u, r and nasal vowels", "u, r und Nasale", "u, r et voyelles nasales", "u, r y vocales nasales"),
      PAIRS: [
        { a: "roue", b: "rue", tip: mm("ou (roue = wiel) klinkt als oe; u (rue = straat) als uu.", "ou (roue = wheel) sounds like 'oo'; u (rue = street) is 'ee' with rounded lips.", "ou (roue = Rad) wie u; u (rue = Straße) wie ü.", "« ou » (roue) contre « u » (rue) : arrondis bien les lèvres pour le u.", "ou (roue = rueda) suena como «u»; u (rue = calle) es una «i» con los labios redondeados.") },
        { a: "dessous", b: "dessus", tip: mm("dessous (onder) met oe, dessus (boven) met uu.", "dessous (under) with 'oo', dessus (on top) with the French u.", "dessous (unter) mit u, dessus (oben) mit ü.", "« dessous » avec ou, « dessus » avec u.", "dessous (debajo) con «u», dessus (encima) con la u francesa.") },
        { a: "vin", b: "vent", tip: mm("Twee neusklanken: in (vin = wijn) met gespreide lippen, an (vent = wind) met open mond.", "Two nasal vowels: in (vin = wine) with spread lips, an (vent = wind) with an open mouth.", "Zwei Nasale: in (vin = Wein) mit breiten Lippen, an (vent = Wind) mit offenem Mund.", "Deux nasales : « in » (vin) lèvres écartées, « an » (vent) bouche ouverte.", "Dos nasales: in (vin = vino) con los labios estirados, an (vent = viento) con la boca abierta.") },
        { a: "bon", b: "banc", tip: mm("on (bon = goed) met ronde lippen, an (banc = bank) met open mond. Spreek geen n uit.", "on (bon = good) with round lips, an (banc = bench) with an open mouth. Don't pronounce the n.", "on (bon = gut) mit runden Lippen, an (banc = Bank) mit offenem Mund. Kein n sprechen.", "« on » (bon) lèvres arrondies, « an » (banc) bouche ouverte.", "on (bon = bueno) con los labios redondeados, an (banc = banco) con la boca abierta. No pronuncies la n.") },
        { a: "le", b: "les", tip: mm("le (de, enkelvoud) met een doffe e, les (de, meervoud) met een heldere é.", "le (the, singular) with a dull e, les (the, plural) with a clear é.", "le (Singular) mit dumpfem e, les (Plural) mit hellem é.", "« le » avec e muet, « les » avec é fermé.", "le (el, singular) con una e débil, les (los, plural) con una é clara.") },
        { a: "poisson", b: "poison", tip: mm("ss is stemloos (poisson = vis), één s tussen klinkers klinkt als z (poison = gif).", "ss is voiceless (poisson = fish); a single s between vowels sounds like z (poison = poison).", "ss stimmlos (poisson = Fisch), s zwischen Vokalen wie ein weiches s (poison = Gift).", "« ss » sourd (poisson), « s » entre voyelles sonne « z » (poison).", "ss es sorda (poisson = pescado); una s entre vocales suena como z sonora (poison = veneno).") },
        { a: "cheveux", b: "chevaux", tip: mm("eu (cheveux = haren) tegenover au, als o (chevaux = paarden).", "eu (cheveux = hair) versus au, like 'oh' (chevaux = horses).", "eu (cheveux = Haare) gegenüber au wie o (chevaux = Pferde).", "« eu » (cheveux) contre « au » (chevaux).", "eu (cheveux = pelo) frente a au, que suena «o» (chevaux = caballos).") },
        { a: "deux", b: "doux", tip: mm("eu (deux = twee) tegenover ou (doux = zacht).", "eu (deux = two) versus ou (doux = soft).", "eu (deux = zwei) gegenüber ou (doux = sanft).", "« eu » (deux) contre « ou » (doux).", "eu (deux = dos) frente a ou (doux = suave).") }
      ],
      RR: [
        { t: "u", note: mm("Zeg ie en tuit dan je lippen: dat is de Franse u.", "Say 'ee' and round your lips: that is the French u.", "Sag i und runde die Lippen: das ist das französische u.", "Dis « i » puis arrondis les lèvres.", "Di «i» y redondea los labios: esa es la u francesa.") },
        { t: "rue", note: mm("De r komt achter in de keel, zacht en zonder rollen.", "The r is made at the back of the throat, soft and without rolling.", "Das r hinten im Rachen, weich, nicht rollen.", "Le r se fait au fond de la gorge, sans rouler.", "La r se hace al fondo de la garganta, suave y sin vibrar.") },
        { t: "rouge", note: mm("Keel-r, oe en een zachte zj.", "Throat r, 'oo' and a soft zh as in 'measure'.", "Rachen-r, u und ein weiches sch wie in „Garage“.", "r de gorge, « ou » et un « j » doux.", "r de garganta, «u» y una «y» suave como en «yo» argentino.") },
        { t: "un bon vin blanc", note: mm("Vier neusklanken achter elkaar; spreek geen n uit.", "Four nasal vowels in a row; don't pronounce any n.", "Vier Nasale hintereinander; kein n sprechen.", "Quatre nasales à la suite.", "Cuatro vocales nasales seguidas; no pronuncies ninguna n.") },
        { t: "tu as vu", note: mm("Drie keer de u; houd je lippen rond.", "The u three times; keep your lips round.", "Dreimal u; Lippen rund halten.", "Trois fois le « u » ; garde les lèvres arrondies.", "Tres veces la u; mantén los labios redondeados.") },
        { t: "Il y a une rue derrière la gare.", note: mm("Zin met u en r; spreek eerst langzaam.", "Sentence with u and r; speak slowly first.", "Satz mit u und r; zuerst langsam sprechen.", "Phrase avec des « u » et des « r » ; parle d'abord lentement.", "Frase con u y r; habla primero despacio.") }
      ],
      DIALOGS: [
        { title: CAFE, turns: [
          { say: "Bonjour ! Qu'est-ce que je vous sers ?", ok: ["un café s'il vous plaît", "je voudrais un café", "un café au lait s'il vous plaît", "un crème s'il vous plaît"], model: "Un café au lait, s'il vous plaît." },
          { say: "Sur place ou à emporter ?", ok: ["sur place", "à emporter", "sur place s'il vous plaît", "à emporter s'il vous plaît"], model: "Sur place, s'il vous plaît." },
          { say: "Très bien. Et avec ceci ?", ok: ["c'est tout", "c'est tout merci", "rien d'autre merci", "un croissant"], model: "C'est tout, merci." },
          { say: "Ça fait deux euros cinquante.", ok: ["voilà", "voilà merci", "tenez", "merci"], model: "Voilà. Merci." }] },
        { title: WEG, turns: [
          { say: "Bonjour, je peux vous aider ?", ok: ["où est la gare", "excusez-moi où est la gare", "je cherche la gare"], model: "Excusez-moi, où est la gare ?" },
          { say: "Allez tout droit, puis à droite sur la place.", ok: ["merci", "merci beaucoup", "c'est loin", "ça prend combien de temps"], model: "Merci beaucoup." },
          { say: "De rien. C'est à cinq minutes à pied.", ok: ["merci beaucoup", "au revoir", "bonne journée", "merci"], model: "Merci beaucoup, au revoir." }] },
        { title: AFSPRAAK, turns: [
          { say: "Tu es libre samedi ?", ok: ["oui à quelle heure", "oui bien sûr", "oui pourquoi", "oui quand"], model: "Oui, à quelle heure ?" },
          { say: "À cinq heures au parc.", ok: ["parfait", "d'accord à samedi", "ça marche", "parfait à samedi"], model: "Parfait, à samedi." },
          { say: "Super. Tu viens à vélo ou à pied ?", ok: ["à pied", "à vélo", "je viens à pied", "je viens à vélo"], model: "Je viens à pied." }] }
      ]
    },
    en: {
      label: mm("th, w en v", "th, w and v", "th, w und v", "th, w et v", "th, w y v"),
      PAIRS: [
        { a: "ship", b: "sheep", tip: mm("Korte i (ship = schip) tegenover lange ie (sheep = schaap).", "Short i (ship) versus long ee (sheep).", "Kurzes i (ship = Schiff) gegenüber langem ii (sheep = Schaf).", "i bref (ship = bateau) contre i long (sheep = mouton).", "i corta (ship = barco) frente a i larga (sheep = oveja).") },
        { a: "live", b: "leave", tip: mm("Korte i (live = wonen) tegenover lange ie (leave = vertrekken).", "Short i (live) versus long ee (leave).", "Kurzes i (live = leben) gegenüber langem ii (leave = gehen).", "i bref (live = vivre) contre i long (leave = partir).", "i corta (live = vivir) frente a i larga (leave = irse).") },
        { a: "thin", b: "tin", tip: mm("th: tongpunt tussen de tanden en blazen (thin = dun). t: gewone t (tin = blik).", "th: tongue tip between your teeth (thin); t is a normal t (tin).", "th: Zungenspitze zwischen die Zähne (thin = dünn); t normal (tin = Dose).", "th : pointe de la langue entre les dents (thin = mince) ; t normal (tin = boîte).", "th: la punta de la lengua entre los dientes, como la z de España (thin = delgado); t normal (tin = lata).") },
        { a: "three", b: "tree", tip: mm("three (drie) met th, tree (boom) met t.", "three with th, tree with t.", "three (drei) mit th, tree (Baum) mit t.", "three (trois) avec th, tree (arbre) avec t.", "three (tres) con th, tree (árbol) con t.") },
        { a: "they", b: "day", tip: mm("Stemhebbende th (they = zij): tong tussen de tanden en zoemen. d is een gewone d (day = dag).", "Voiced th (they): tongue between your teeth and buzz. d is a normal d (day).", "Stimmhaftes th (they = sie): Zunge zwischen die Zähne und summen. d normal (day = Tag).", "th sonore (they = ils) : langue entre les dents en vibrant ; d normal (day = jour).", "th sonora (they = ellos), como la d de «nada»; d normal (day = día).") },
        { a: "bad", b: "bed", tip: mm("bad (slecht) met een open a, bijna als in 'pet' maar wijder; bed (bed) met een korte e.", "bad with a wide open a; bed with a short e.", "bad (schlecht) mit offenem ä, bed (Bett) mit kurzem e.", "bad (mauvais) avec un a très ouvert, bed (lit) avec un e bref.", "bad (malo) con una a muy abierta, entre a y e; bed (cama) con una e corta.") },
        { a: "van", b: "fan", tip: mm("v is stemhebbend (van = busje), f is stemloos (fan = ventilator).", "v is voiced (van), f is voiceless (fan).", "v stimmhaft (van = Transporter), f stimmlos (fan = Ventilator).", "v sonore (van = camionnette), f sourd (fan = ventilateur).", "v sonora, con los dientes sobre el labio (van = furgoneta); f sorda (fan = ventilador).") },
        { a: "walk", b: "work", tip: mm("walk (lopen) met een lange o, zonder l; work (werken) met een klank als in 'eur'.", "walk with 'aw', the l is silent; work with 'er'.", "walk (gehen) mit langem o, ohne l; work (arbeiten) wie „ö“.", "walk (marcher) avec un « o » long, sans l ; work (travailler) comme « eu ».", "walk (caminar) con una o larga, sin l; work (trabajar) con un sonido entre «e» y «o».") }
      ],
      RR: [
        { t: "thin", note: mm("Leg je tongpunt tussen je tanden en blaas.", "Put your tongue tip between your teeth and blow.", "Zungenspitze zwischen die Zähne und blasen.", "Mets la pointe de la langue entre les dents et souffle.", "Pon la punta de la lengua entre los dientes y sopla.") },
        { t: "think", note: mm("Stemloze th, dan 'ink'.", "Voiceless th, then 'ink'.", "Stimmloses th, dann „ink“.", "th sourd, puis « ink ».", "th sorda, luego «ink».") },
        { t: "this", note: mm("Stemhebbende th: zoem met je tong tussen je tanden.", "Voiced th: buzz with your tongue between your teeth.", "Stimmhaftes th: mit der Zunge zwischen den Zähnen summen.", "th sonore : fais vibrer avec la langue entre les dents.", "th sonora: haz vibrar la voz con la lengua entre los dientes.") },
        { t: "with", note: mm("w met ronde lippen, eindig op th.", "w with round lips, end on th.", "w mit runden Lippen, am Ende th.", "w lèvres arrondies, termine par th.", "w con los labios redondeados, termina con th.") },
        { t: "very well", note: mm("v met tanden op de lip, w met ronde lippen.", "v with teeth on your lip, w with round lips.", "v mit Zähnen auf der Lippe, w mit runden Lippen.", "v avec les dents sur la lèvre, w lèvres arrondies.", "v con los dientes sobre el labio, w con los labios redondeados.") },
        { t: "I think the weather is better this Thursday.", note: mm("Zin met veel th-klanken; spreek eerst langzaam.", "Sentence with many th sounds; speak slowly first.", "Satz mit vielen th; zuerst langsam sprechen.", "Phrase avec beaucoup de th ; parle d'abord lentement.", "Frase con muchas th; habla primero despacio.") }
      ],
      DIALOGS: [
        { title: CAFE, turns: [
          { say: "Hi! What can I get you?", ok: ["a coffee please", "can i have a coffee", "can i have a coffee please", "i'd like a coffee", "a latte please"], model: "Can I have a coffee with milk, please?" },
          { say: "For here or to go?", ok: ["for here", "to go", "for here please", "to go please"], model: "For here, please." },
          { say: "Sure. Anything else?", ok: ["no thanks", "that's all", "that's it thanks", "a croissant please"], model: "No, thanks. That's all." },
          { say: "That's two fifty, please.", ok: ["here you go", "here you are", "thanks", "thank you"], model: "Here you go. Thanks." }] },
        { title: WEG, turns: [
          { say: "Hi, can I help you?", ok: ["where is the station", "excuse me where is the station", "where's the station", "i'm looking for the station"], model: "Excuse me, where's the station?" },
          { say: "Go straight ahead and turn right at the square.", ok: ["thanks", "thank you", "is it far", "how long does it take"], model: "Thank you." },
          { say: "You're welcome. It's a five-minute walk.", ok: ["thanks a lot", "thank you", "bye", "thanks bye"], model: "Thanks a lot. Bye." }] },
        { title: AFSPRAAK, turns: [
          { say: "Are you free on Saturday?", ok: ["yes what time", "yeah sure", "sure what time", "yes why"], model: "Yes, what time?" },
          { say: "Five o'clock in the park.", ok: ["perfect", "great see you then", "okay see you there", "sounds good"], model: "Perfect, see you then." },
          { say: "Great. Are you cycling or walking?", ok: ["walking", "cycling", "i'll walk", "i'll cycle", "by bike"], model: "I'll walk." }] }
      ]
    },
    nl: {
      label: mm("g, ui en ij", "g, ui and ij", "g, ui und ij", "g, ui et ij", "g, ui e ij"),
      PAIRS: [
        { a: "man", b: "maan", tip: mm("Korte a (man) tegenover lange aa (maan).", "Short a (man = man) versus long aa (maan = moon).", "Kurzes a (man = Mann) gegenüber langem aa (maan = Mond).", "a bref (man = homme) contre aa long (maan = lune).", "a corta (man = hombre) frente a aa larga (maan = luna).") },
        { a: "pit", b: "piet", tip: mm("Korte i (pit) tegenover lange ie (piet).", "Short i (pit = pip) versus 'ee' (Piet = a name).", "Kurzes i (pit = Kern) gegenüber ie (Piet = Name).", "i bref (pit = noyau) contre ie (Piet = prénom).", "i corta (pit = hueso de fruta) frente a ie (Piet = nombre).") },
        { a: "bot", b: "boot", tip: mm("Korte o (bot) tegenover lange oo (boot).", "Short o (bot = bone) versus long oo (boot = boat).", "Kurzes o (bot = Knochen) gegenüber langem oo (boot = Boot).", "o bref (bot = os) contre oo long (boot = bateau).", "o corta (bot = hueso) frente a oo larga (boot = barco).") },
        { a: "vel", b: "veel", tip: mm("Korte e (vel) tegenover lange ee (veel).", "Short e (vel = sheet) versus long ee (veel = many).", "Kurzes e (vel = Blatt) gegenüber langem ee (veel = viel).", "e bref (vel = feuille) contre ee long (veel = beaucoup).", "e corta (vel = hoja) frente a ee larga (veel = mucho).") },
        { a: "huis", b: "hoes", tip: mm("ui (huis) tegenover oe (hoes).", "ui (huis = house) is like 'ow' with rounded lips; oe (hoes = cover) is 'oo'.", "ui (huis = Haus) ist ein runder Doppellaut; oe (hoes = Hülle) klingt wie u.", "ui (huis = maison) : diphtongue arrondie ; oe (hoes = housse) se dit « ou ».", "ui (huis = casa) es un diptongo con los labios redondeados; oe (hoes = funda) suena «u».") },
        { a: "deuk", b: "doek", tip: mm("eu (deuk) tegenover oe (doek).", "eu (deuk = dent) like French 'eu'; oe (doek = cloth) like 'oo'.", "eu (deuk = Delle) wie ö; oe (doek = Tuch) wie u.", "eu (deuk = bosse) comme « eu » ; oe (doek = tissu) comme « ou ».", "eu (deuk = abolladura) como una «e» con los labios redondeados; oe (doek = paño) suena «u».") },
        { a: "lijk", b: "leek", tip: mm("ij (lijk) tegenover ee (leek).", "ij (lijk = corpse) like 'ay' in 'day' but more open; ee (leek = layman) is a long 'ay'.", "ij (lijk = Leiche) wie „ei“; ee (leek = Laie) wie langes e.", "ij (lijk = cadavre) proche de « ail » ; ee (leek = profane) est un é long.", "ij (lijk = cadáver) suena casi como «ei»; ee (leek = profano) es una e larga.") },
        { a: "zak", b: "zaak", tip: mm("Korte a (zak) tegenover lange aa (zaak).", "Short a (zak = bag) versus long aa (zaak = shop, matter).", "Kurzes a (zak = Tasche) gegenüber langem aa (zaak = Laden).", "a bref (zak = sac) contre aa long (zaak = magasin).", "a corta (zak = bolsa) frente a aa larga (zaak = tienda).") }
      ],
      RR: [
        { t: "goed", note: mm("De g wordt achter in de keel gemaakt.", "The Dutch g is a rough sound at the back of the throat, like Scottish 'loch'.", "Das g ist ein Reibelaut hinten im Rachen, wie „ach“.", "Le g se fait au fond de la gorge, comme la jota espagnole.", "La g se pronuncia como la jota española.") },
        { t: "huis", note: mm("ui: begin met een korte a en eindig met ronde lippen.", "ui: start with a short 'a' and end with rounded lips.", "ui: kurzes a, dann die Lippen runden.", "ui : commence par un a bref et finis lèvres arrondies.", "ui: empieza con una a corta y termina con los labios redondeados.") },
        { t: "tuin", note: mm("t, dan ui, dan n.", "t, then ui, then n.", "t, dann ui, dann n.", "t, puis ui, puis n.", "t, luego ui, luego n.") },
        { t: "wijn", note: mm("ij, met open mond, bijna als 'ei'.", "ij, with an open mouth, almost like 'ay'.", "ij, mit offenem Mund, fast wie „ei“.", "ij, bouche ouverte, presque comme « ail ».", "ij, con la boca abierta, casi como «ei».") },
        { t: "Scheveningen", note: mm("sch is s plus de keel-g: s-ch.", "sch is s plus the throat g: s-ch.", "sch ist s plus Rachen-g: s-ch.", "sch, c'est s plus le g de gorge : s-ch.", "sch es s más la g de garganta: s-j.") },
        { t: "Ik ga graag naar huis in de regen.", note: mm("Zin met veel g-klanken en ui; spreek eerst langzaam.", "Sentence with many g sounds and ui; speak slowly first.", "Satz mit vielen g und ui; zuerst langsam sprechen.", "Phrase avec beaucoup de g et ui ; parle d'abord lentement.", "Frase con muchas g y ui; habla primero despacio.") }
      ],
      DIALOGS: [
        { title: CAFE, turns: [
          { say: "Hoi! Wat mag het zijn?", ok: ["een koffie graag", "mag ik een koffie", "een cappuccino graag", "ik wil graag een koffie"], model: "Een koffie met melk, graag." },
          { say: "Voor hier of om mee te nemen?", ok: ["voor hier", "voor hier graag", "om mee te nemen", "meenemen"], model: "Voor hier, graag." },
          { say: "Prima. Verder nog iets?", ok: ["nee dank je", "dat was het", "nee dat was het", "een croissant graag"], model: "Nee, dank je. Dat was het." },
          { say: "Dat is dan twee vijftig.", ok: ["alsjeblieft", "alstublieft", "ik pin", "dank je"], model: "Alsjeblieft. Dank je." }] },
        { title: WEG, turns: [
          { say: "Hallo, kan ik u helpen?", ok: ["waar is het station", "sorry waar is het station", "ik zoek het station"], model: "Sorry, waar is het station?" },
          { say: "Loop rechtdoor en ga bij het plein naar rechts.", ok: ["dank u", "dank u wel", "is het ver", "hoe lang duurt het"], model: "Dank u wel." },
          { say: "Graag gedaan. Het is vijf minuten lopen.", ok: ["dank u wel", "dag", "tot ziens", "bedankt"], model: "Dank u wel, dag." }] },
        { title: AFSPRAAK, turns: [
          { say: "Heb je zaterdag tijd?", ok: ["ja hoe laat", "ja hoor", "ja leuk", "ja wanneer"], model: "Ja, hoe laat?" },
          { say: "Om vijf uur in het park.", ok: ["perfect", "prima tot dan", "goed tot dan", "is goed"], model: "Prima, tot dan." },
          { say: "Leuk. Kom je op de fiets of lopend?", ok: ["lopend", "op de fiets", "ik kom lopend", "ik kom op de fiets"], model: "Ik kom op de fiets." }] }
      ]
    }
  };
  var d = D[DOELTAAL.code];
  if (!d) return;
  PRON.PAIRS = d.PAIRS; PRON.RR = d.RR; PRON.DIALOGS = d.DIALOGS; PRON.RR_LABEL = d.label;
})();
