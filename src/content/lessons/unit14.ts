import type { Lesson, Speaker, Unit } from './types';

const S: Record<string, Speaker> = {
  max: { name: 'Макс', voice: 'dmitri', emoji: '🧑' },
  olja: { name: 'О́ля', voice: 'irina', emoji: '👩' },
  anna: { name: 'А́нна', voice: 'irina', emoji: '👩‍💼' },
  lena: { name: 'Ле́на', voice: 'irina', emoji: '👩‍🎓' },
  ns: { name: 'Ната́лья Серге́евна', voice: 'irina', emoji: '👵' },
};

const l141: Lesson = {
  id: '14.1',
  unit: 14,
  title: { ru: 'Како́е сего́дня число́?', de: 'Welches Datum ist heute?' },
  canDo: 'Ich kann das Datum sagen und fragen, wann etwas ist.',
  speakers: { max: S.max, olja: S.olja },
  dialogs: [
    {
      title: 'Bald ist der 8. März',
      lines: [
        { who: 'max', ru: 'О́ля, како́е сего́дня число́?', translit: 'ólja, kakóje siwódnja tschisló', de: 'Olja, welches Datum ist heute?' },
        { who: 'olja', ru: 'Сего́дня два́дцать восьмо́е февраля́. А что?', translit: "siwódnja dwátsat' wasmóje fiwraljá. a schto", de: 'Heute ist der achtundzwanzigste Februar. Warum?', note: 'Datum: sächliche **Ordnungszahl** + Monat im **Genitiv**: восьмо́е февраля́.' },
        { who: 'max', ru: 'Зна́чит, ско́ро Восьмо́е ма́рта!', translit: 'znátschit, skóra wasmóje márta', de: 'Dann ist ja bald der Achte März!' },
        { who: 'olja', ru: 'Да, Междунаро́дный же́нский день. Ты уже́ купи́л пода́рки?', translit: 'da, mizhdunaródnyj zhénskij djen\'. ty uzhé kupíl padárki', de: 'Ja, der Internationale Frauentag. Hast du schon Geschenke gekauft?' },
        { who: 'max', ru: 'Ещё нет… А когда́ у тебя́ день рожде́ния?', translit: "jischschó njet… a kagdá u tibjá djen' razhdjénija", de: 'Noch nicht … Und wann hast du Geburtstag?' },
        { who: 'olja', ru: 'Пятна́дцатого ию́ля. А у тебя́?', translit: 'pitnátsatawa ijúlja. a u tibjá', de: 'Am fünfzehnten Juli. Und du?', note: '**Wann?** – die Ordnungszahl steht im **Genitiv**: пятна́дцат**ого** ию́ля.' },
        { who: 'max', ru: 'Тре́тьего ноября́.', translit: "trjét'jewa najabrjá", de: 'Am dritten November.' },
        { who: 'olja', ru: 'Хорошо́, я запишу́!', translit: 'charaschó, ja zapischú', de: 'Gut, ich schreibe es mir auf!' },
      ],
    },
  ],
  vocab: ['Како́е сего́дня число́?', 'Восьмо́е ма́рта', 'Междунаро́дный же́нский день', 'ско́ро', 'записа́ть', 'пе́рвый', 'второ́й', 'тре́тий'],
  grammar: [
    {
      title: 'Das Datum',
      blocks: [
        { table: { head: ['Frage', 'Antwort', 'Form'], rows: [
          ['Како́е сего́дня число́?', 'Сего́дня пе́рвое ма́я.', 'Ordnungszahl (n, Nom.) + Monat (Gen.)'],
          ['Когда́? (am …)', 'Пе́рвого ма́я.', 'Ordnungszahl (Gen.) + Monat (Gen.)'],
        ] } },
        { table: { head: ['Datum', 'heute ist …', 'am …'], rows: [
          ['1.', 'пе́рвое', 'пе́рвого'],
          ['2.', 'второ́е', 'второ́го'],
          ['3.', 'тре́тье', 'тре́тьего'],
          ['8.', 'восьмо́е', 'восьмо́го'],
          ['15.', 'пятна́дцатое', 'пятна́дцатого'],
          ['20.', 'двадца́тое', 'двадца́того'],
          ['31.', 'три́дцать пе́рвое', 'три́дцать пе́рвого'],
        ] } },
        { p: '**Monate im Genitiv:** января́, февраля́, ма́рта, апре́ля, ма́я, ию́ня, ию́ля, а́вгуста, сентября́, октября́, ноября́, декабря́.' },
        { tip: 'Bei zusammengesetzten Zahlen wird nur die **letzte** zur Ordnungszahl: два́дцать **пе́рвое**.' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: '„Heute ist der 1. Mai.“', options: ['Сего́дня пе́рвое ма́я.', 'Сего́дня пе́рвого ма́я.', 'Сего́дня оди́н май.'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: '„am 3. Oktober“', options: ['тре́тье октября́', 'тре́тьего октября́', 'три октя́брь'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Hör zu: Welches Datum?', audio: 'Сего́дня деся́тое ию́ня.', options: ['10. Juni', '10. Juli', '1. Juni'], answer: 0 },
    { type: 'gap', prompt: 'Ergänze „am Zweiten“.', before: 'Я прие́ду', after: 'января́.', answer: 'второ́го' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['пе́рвое', '1.'], ['тре́тье', '3.'], ['восьмо́е', '8.'], ['двадца́тое', '20.'], ['пятна́дцатое', '15.']] },
    { type: 'translate', prompt: 'Frag auf Russisch.', de: 'Welches Datum ist heute?', answer: 'Како́е сего́дня число́?' },
    { type: 'choice', prompt: 'Laut Dialog: Wann hat Olja Geburtstag?', options: ['am 3. November', 'am 15. Juli', 'am 8. März'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib das Datum.', audio: 'Восьмо́е ма́рта.', answer: 'Восьмо́е ма́рта.' },
  ],
  speak: ['Како́е сего́дня число́?', 'Сего́дня пе́рвое ма́я.', 'Мой день рожде́ния тре́тьего ноября́.'],
};

const l142: Lesson = {
  id: '14.2',
  unit: 14,
  title: { ru: 'С днём рожде́ния!', de: 'Alles Gute zum Geburtstag!' },
  canDo: 'Ich kann gratulieren, etwas wünschen und einen Trinkspruch ausbringen.',
  speakers: { max: S.max, lena: S.lena, olja: S.olja },
  dialogs: [
    {
      title: 'Lenas Geburtstagsfeier',
      lines: [
        { who: 'max', ru: 'Ле́на, с днём рожде́ния! Э́то тебе́.', translit: 'ljéna, z dnjom razhdjénija! éta tibjé', de: 'Lena, alles Gute zum Geburtstag! Das ist für dich.', note: '**С днём рожде́ния!** = Kurzform von Поздравля́ю тебя́ с днём рожде́ния (с + Instrumental).' },
        { who: 'lena', ru: 'Ой, спаси́бо! Что э́то?', translit: 'oj, spasíba! schto éta', de: 'Oh, danke! Was ist das?' },
        { who: 'max', ru: 'Откро́й!', translit: 'atkrój', de: 'Mach auf!' },
        { who: 'lena', ru: 'Кни́га о Москве́! Как здо́рово! Спаси́бо большо́е!', translit: "kníga a maskwjé! kak zdórawa! spasíba bal'schóje", de: 'Ein Buch über Moskau! Wie toll! Vielen Dank!' },
        { who: 'olja', ru: 'Ле́на, поздравля́ю! Жела́ю тебе́ сча́стья, здоро́вья и любви́!', translit: "ljéna, pazdrawljáju! zhiláju tibjé schschást'ja, zdarów'ja i ljubwí", de: 'Lena, herzlichen Glückwunsch! Ich wünsche dir Glück, Gesundheit und Liebe!', note: '**жела́ть** + Dativ (wem) + **Genitiv** (was): сча́стье → сча́стья, любо́вь → любви́.' },
        { who: 'lena', ru: 'Спаси́бо, О́ля!', translit: 'spasíba, ólja', de: 'Danke, Olja!' },
        { who: 'olja', ru: 'Дава́йте вы́пьем за Ле́ну!', translit: 'dawájtje wýpjem za ljénu', de: 'Lasst uns auf Lena trinken!', note: 'Trinkspruch: **за** + Akkusativ = auf …: За Ле́ну! За тебя́! За дру́жбу!' },
        { who: 'max', ru: 'За Ле́ну!', translit: 'za ljénu', de: 'Auf Lena!' },
        { who: 'lena', ru: 'Спаси́бо, друзья́! Я так ра́да, что вы пришли́!', translit: 'spasíba, druzjá! ja tak ráda, schto wy prischlí', de: 'Danke, Freunde! Ich freue mich so, dass ihr gekommen seid!' },
      ],
    },
  ],
  vocab: ['С днём рожде́ния!', 'Откро́й!', 'жела́ть', 'сча́стье', 'любо́вь', 'успе́х', 'За тебя́!', 'рад'],
  grammar: [
    {
      title: 'Gratulieren und wünschen',
      blocks: [
        { table: { head: ['Struktur', 'Beispiel', 'Deutsch'], rows: [
          ['поздравля́ть кого́ (Akk.) с чем (Instr.)', 'Поздравля́ю тебя́ с днём рожде́ния!', 'Ich gratuliere dir zum Geburtstag!'],
          ['', 'С пра́здником! / С Но́вым го́дом!', 'Schöne Feiertage! / Frohes neues Jahr!'],
          ['жела́ть кому́ (Dat.) чего́ (Gen.)', 'Жела́ю тебе́ сча́стья и здоро́вья!', 'Ich wünsche dir Glück und Gesundheit!'],
          ['', 'Жела́ю вам успе́хов!', 'Ich wünsche Ihnen viel Erfolg!'],
          ['пить за кого́ / что (Akk.)', 'За тебя́! За нас! За дру́жбу!', 'Auf dich! Auf uns! Auf die Freundschaft!'],
        ] } },
        { tip: '**рад / ра́да / ра́ды** = froh (Mann / Frau / Plural): Я ра́да, что вы пришли́.' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Поздравля́ю … ! (zum Geburtstag)', options: ['с днём рожде́ния', 'день рожде́ния', 'дню рожде́ния'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Жела́ю тебе́ … (Glück)', options: ['сча́стье', 'сча́стья', 'сча́стьем'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Trinkspruch „Auf dich!“', options: ['За тебя́!', 'Для тебя́!', 'С тобо́й!'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Lena (Frau): Я так … !', options: ['рад', 'ра́да', 'ра́ды'], answer: 1, ruOptions: true },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['сча́стье', 'Glück'], ['здоро́вье', 'Gesundheit'], ['любо́вь', 'Liebe'], ['успе́х', 'Erfolg'], ['Откро́й!', 'Mach auf!']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Ich wünsche Ihnen viel Erfolg!', answer: 'Жела́ю вам успе́хов!' },
    { type: 'choice', prompt: 'Laut Dialog: Was schenkt Max Lena?', options: ['Blumen', 'ein Buch über Moskau', 'Konzertkarten'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Glückwunsch.', audio: 'С днём рожде́ния!', answer: 'С днём рожде́ния!' },
  ],
  speak: ['С днём рожде́ния!', 'Жела́ю тебе́ сча́стья и здоро́вья!', 'За тебя́!'],
};

const l143: Lesson = {
  id: '14.3',
  unit: 14,
  title: { ru: 'Ру́сские пра́здники', de: 'Russische Feiertage' },
  canDo: 'Ich kann über Feiertage und Traditionen sprechen.',
  speakers: { anna: S.anna, ns: S.ns },
  dialogs: [
    {
      title: 'Die Nachbarin erklärt',
      lines: [
        { who: 'anna', ru: 'Ната́лья Серге́евна, как в Росси́и пра́зднуют Но́вый год?', translit: "natál'ja sirgéjewna, kak w rassíi prázdnujut nówyj got", de: 'Natalja Sergejewna, wie feiert man in Russland Neujahr?' },
        { who: 'ns', ru: 'О, Но́вый год — э́то гла́вный пра́здник! Мы украша́ем ёлку и гото́вим мно́го еды́.', translit: 'o, nówyj got — éta glávnyj prázdnik! my ukrascháim jólku i gatówim mnóga jidý', de: 'Oh, Neujahr ist das wichtigste Fest! Wir schmücken den Tannenbaum und kochen viel Essen.' },
        { who: 'anna', ru: 'А пода́рки?', translit: 'a padárki', de: 'Und Geschenke?' },
        { who: 'ns', ru: 'Пода́рки прино́сит Дед Моро́з. Де́тям он да́рит игру́шки и сла́дости.', translit: 'padárki prinósit djed marós. djétjam on dárit igrúschki i sládasti', de: 'Die Geschenke bringt Väterchen Frost. Den Kindern schenkt er Spielzeug und Süßigkeiten.', note: 'Dativ Plural: де́ти → де́т**ям**.' },
        { who: 'anna', ru: 'А когда́ Рождество́?', translit: 'a kagdá razhdistwó', de: 'Und wann ist Weihnachten?' },
        { who: 'ns', ru: 'Седьмо́го января́. А у вас в Герма́нии — два́дцать пя́того декабря́, пра́вда?', translit: "sid'mówa janwarjá. a u was w girmánii — dwátsat' pjátawa dikabrjá, práwda", de: 'Am siebten Januar. Und bei Ihnen in Deutschland am fünfundzwanzigsten Dezember, nicht wahr?' },
        { who: 'anna', ru: 'Да. А каки́е ещё пра́здники есть в Росси́и?', translit: "da. a kakíje jischschó prázdniki jest' w rassíi", de: 'Ja. Und welche Feiertage gibt es noch in Russland?' },
        { who: 'ns', ru: 'Восьмо́е ма́рта, когда́ мужчи́ны да́рят же́нщинам цветы́, и Девя́тое ма́я — День Побе́ды.', translit: 'wasmóje márta, kagdá muschschíny dárjat zhénschschinam tswitý, i diwjátaje mája — djen\' pabjédy', de: 'Den Achten März, an dem Männer Frauen Blumen schenken, und den Neunten Mai – den Tag des Sieges.' },
      ],
    },
  ],
  vocab: ['пра́здник', 'пра́здновать', 'гла́вный', 'украша́ть', 'ёлка', 'еда́', 'Дед Моро́з', 'дари́ть', 'игру́шка', 'сла́дости', 'Рождество́', 'День Побе́ды'],
  grammar: [
    {
      title: 'Plural in Dativ, Instrumental und Präpositiv',
      blocks: [
        { table: { head: ['Fall', 'hart', 'weich', 'Beispiele'], rows: [
          ['Dativ', '**-ам**', '**-ям**', 'же́нщинам, друзья́м, де́тям'],
          ['Instrumental', '**-ами**', '**-ями**', 'с друзья́ми, с роди́телями'],
          ['Präpositiv', '**-ах**', '**-ях**', 'в магази́нах, о пра́здниках, о друзья́х'],
        ] } },
        { tip: 'Diese drei Plural-Endungen sind für **alle** Geschlechter gleich – eine echte Erleichterung! Ausnahme: де́ти → **с детьми́**, лю́ди → **с людьми́**.' },
        { p: '**пра́здновать** (feiern): я пра́здную, ты пра́зднуешь, мы пра́зднуем – -ова- wird zu -у- (wie путеше́ствовать).' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Дед Моро́з да́рит пода́рки … (den Kindern)', options: ['де́ти', 'де́тям', 'детьми́'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Я был в кино́ с … (mit Freunden)', options: ['друзья́м', 'друзья́ми', 'друзья́х'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Мы говори́ли о … (über die Feiertage)', options: ['пра́здникам', 'пра́здниками', 'пра́здниках'], answer: 2, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze den Dativ Plural von же́нщины.', before: 'Мужчи́ны да́рят', after: 'цветы́.', answer: 'же́нщинам' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['Рождество́', 'Weihnachten'], ['ёлка', 'Tannenbaum'], ['игру́шка', 'Spielzeug'], ['сла́дости', 'Süßigkeiten'], ['пра́здник', 'Feiertag']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Neujahr ist das wichtigste Fest.', answer: 'Но́вый год — э́то гла́вный пра́здник.', alternatives: ['Но́вый год — гла́вный пра́здник.', 'Но́вый год э́то гла́вный пра́здник.'] },
    { type: 'choice', prompt: 'Laut Dialog: Wann ist in Russland Weihnachten?', options: ['am 25. Dezember', 'am 1. Januar', 'am 7. Januar'], answer: 2 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Мы украша́ем ёлку.', answer: 'Мы украша́ем ёлку.' },
  ],
  speak: ['Как вы пра́зднуете Но́вый год?', 'Мы украша́ем ёлку.', 'Рождество́ седьмо́го января́.'],
};

const l144: Lesson = {
  id: '14.4',
  unit: 14,
  title: { ru: 'Что подари́ть?', de: 'Was soll ich schenken?' },
  canDo: 'Ich kann Geschenkideen besprechen (дари́ть кому́ что).',
  speakers: { max: S.max, olja: S.olja },
  dialogs: [
    {
      title: 'Geschenkideen',
      lines: [
        { who: 'max', ru: 'О́ля, помоги́! Что подари́ть мое́й ма́ме на день рожде́ния?', translit: "ólja, pamagí! schto padarít' majéj máme na djen' razhdjénija", de: 'Olja, hilf mir! Was soll ich meiner Mama zum Geburtstag schenken?', note: '**подари́ть** кому́ (Dativ) что (Akkusativ): мое́й ма́ме – Dativ f.' },
        { who: 'olja', ru: 'А что она́ лю́бит?', translit: 'a schto aná ljúbit', de: 'Und was mag sie?' },
        { who: 'max', ru: 'Она́ лю́бит чита́ть и рабо́тать в саду́.', translit: "aná ljúbit tschitát' i rabótat' f sadú", de: 'Sie liest gern und arbeitet gern im Garten.' },
        { who: 'olja', ru: 'Подари́ ей хоро́шую кни́гу и́ли краси́вые перча́тки для са́да.', translit: 'padarí jej charóschuju knígu íli krasíwyje pirtschátki dlja sáda', de: 'Schenk ihr ein gutes Buch oder schöne Gartenhandschuhe.' },
        { who: 'max', ru: 'Хоро́шая иде́я! А па́пе? У него́ всё есть!', translit: "charóschaja idjéja! a pápje? u niwó fsjo jest'", de: 'Gute Idee! Und Papa? Er hat schon alles!' },
        { who: 'olja', ru: 'Подари́ ему́ биле́ты в теа́тр. Пусть они́ пойду́т вме́сте!', translit: 'padarí jimú biljéty f tiátr. pust\' aní pajdút wmjéstje', de: 'Schenk ihm Theaterkarten. Dann können sie zusammen hingehen!', note: '**Пусть** + Verb = soll(en) / mögen: Пусть они́ пойду́т = Sollen sie (doch) gehen.' },
        { who: 'max', ru: 'Отли́чно! А что подари́ть тебе́?', translit: "atlítschna! a schto padarít' tibjé", de: 'Super! Und was soll ich dir schenken?' },
        { who: 'olja', ru: 'Мне? Ничего́ не на́до. Хотя́… я люблю́ цветы́!', translit: 'mnje? nitschiwó ni náda. chatjá… ja ljubljú tswitý', de: 'Mir? Ich brauche nichts. Obwohl … ich liebe Blumen!' },
      ],
    },
  ],
  vocab: ['подари́ть', 'Что подари́ть …?', 'Подари́!', 'У него́ всё есть.', 'пусть', 'хотя́', 'Ничего́ не на́до.'],
  grammar: [
    {
      title: 'Wem? – Dativ mit Possessivpronomen und Adjektiven',
      blocks: [
        { table: { head: ['', 'm', 'f', 'Plural'], rows: [
          ['mein', 'моему́ па́пе / бра́ту', 'мое́й ма́ме', 'мои́м друзья́м'],
          ['dein', 'твоему́', 'твое́й', 'твои́м'],
          ['unser', 'на́шему', 'на́шей', 'на́шим'],
          ['Adjektiv', 'ста́рому дру́гу', 'ста́рой подру́ге', 'ста́рым друзья́м'],
        ] } },
        { tip: 'па́па und де́душка sind männlich, haben im Dativ aber die Endung **-е** wie ма́ма: па́п**е**, де́душк**е** – das Pronomen bleibt männlich: **моему́** па́пе.' },
        { p: '**Imperativ** (du-Form): подари́! помоги́! откро́й! – höflich mit **-те**: подари́те!' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Что подари́ть … ? (meiner Schwester)', options: ['моя́ сестра́', 'мою́ сестру́', 'мое́й сестре́'], answer: 2, ruOptions: true },
    { type: 'choice', prompt: 'Я подарю́ … кни́гу. (meinem Vater)', options: ['моему́ па́пе', 'мое́й па́пе', 'мой па́па'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Подари́ … цветы́! (ihr)', options: ['она́', 'её', 'ей'], answer: 2, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „unseren Freunden“.', before: 'Мы да́рим пода́рки на́шим', after: '.', answer: 'друзья́м' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['пусть', 'soll(en)'], ['хотя́', 'obwohl'], ['подари́ть', 'schenken'], ['У него́ всё есть.', 'Er hat schon alles.'], ['Ничего́ не на́до.', 'Ich brauche nichts.']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Was soll ich meiner Mama schenken?', answer: 'Что подари́ть мое́й ма́ме?', alternatives: ['Что мне подари́ть мое́й ма́ме?', 'Что подари́ть ма́ме?'] },
    { type: 'choice', prompt: 'Laut Dialog: Was soll Max seinem Vater schenken?', options: ['ein Buch', 'Theaterkarten', 'Handschuhe'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Подари́ ей цветы́!', answer: 'Подари́ ей цветы́!' },
  ],
  speak: ['Что подари́ть ма́ме?', 'Подари́ ему́ кни́гу!', 'Мне ничего́ не на́до.'],
};

const l145: Lesson = {
  id: '14.5',
  unit: 14,
  title: { ru: 'С Но́вым го́дом!', de: 'Frohes neues Jahr!' },
  canDo: 'Ich kann Silvester feiern: anstoßen, gratulieren und Wünsche für das neue Jahr äußern.',
  speakers: { olja: S.olja, lena: S.lena, max: S.max },
  dialogs: [
    {
      title: 'Silvester bei Olja',
      lines: [
        { who: 'olja', ru: 'Ско́ро по́лночь! Где шампа́нское?', translit: "skóra pólnatsch'! gdje schampánskaje", de: 'Gleich ist Mitternacht! Wo ist der Sekt?' },
        { who: 'lena', ru: 'Вот! Макс, открыва́й!', translit: 'wot! maks, atkrywáj', de: 'Hier! Max, mach auf!' },
        { who: 'max', ru: 'Пять, четы́ре, три, два, оди́н…', translit: "pjat', tschitýrje, tri, dwa, adín…", de: 'Fünf, vier, drei, zwei, eins …' },
        { who: 'olja', ru: 'С Но́вым го́дом!', translit: 'z nówym gódam', de: 'Frohes neues Jahr!' },
        { who: 'max', ru: 'С но́вым сча́стьем!', translit: "s nówym schschást'jem", de: 'Und viel neues Glück!', note: 'Traditionelle Antwort auf С Но́вым го́дом!' },
        { who: 'lena', ru: 'Макс, ты загада́л жела́ние?', translit: 'maks, ty zagadál zhilánije', de: 'Max, hast du dir etwas gewünscht?', note: 'Russischer Brauch: Während die Glocken zwölf schlagen, wünscht man sich still etwas.' },
        { who: 'max', ru: 'Загада́л! Но не скажу́, а то не сбу́дется.', translit: "zagadál! no ni skazhú, a to ni zbúditsa", de: 'Ja! Aber ich sage es nicht, sonst geht es nicht in Erfüllung.' },
        { who: 'olja', ru: 'А я хочу́ в но́вом году́ мно́го путеше́ствовать!', translit: "a ja chatschú w nówam gadú mnóga putischéstwawat'", de: 'Und ich möchte im neuen Jahr viel reisen!', note: '**в … году́** = im … Jahr: в э́том году́, в но́вом году́ (Präpositiv auf betontes -у́).' },
        { who: 'lena', ru: 'А я — сдать все экза́мены на пятёрки!', translit: "a ja — zdat' fsje ekzáminy na pitjórki", de: 'Und ich alle Prüfungen mit einer Eins bestehen!' },
        { who: 'max', ru: 'А я — говори́ть по-ру́сски ещё лу́чше!', translit: "a ja — gawarít' pa-rúski jischschó lútschsche", de: 'Und ich noch besser Russisch sprechen!' },
      ],
    },
  ],
  vocab: ['по́лночь', 'шампа́нское', 'С Но́вым го́дом!', 'С но́вым сча́стьем!', 'загада́ть жела́ние', 'а то', 'в э́том году́', 'в но́вом году́'],
  grammar: [
    {
      title: 'Wünsche für das neue Jahr',
      blocks: [
        { table: { head: ['Russisch', 'Deutsch'], rows: [
          ['Я хочу́ + Infinitiv', 'Ich möchte …'],
          ['В но́вом году́ я бу́ду …', 'Im neuen Jahr werde ich …'],
          ['Жела́ю тебе́ …', 'Ich wünsche dir …'],
          ['Пусть все мечты́ сбу́дутся!', 'Mögen alle Träume wahr werden!'],
        ] } },
        { p: '**a то** = sonst: Скажи́ сейча́с, а то забу́дешь! (Sag es jetzt, sonst vergisst du es!)' },
        { tip: 'Zeitangaben mit Jahr: **в э́том году́** (dieses Jahr), **в про́шлом году́** (letztes Jahr), **в сле́дующем году́** (nächstes Jahr).' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Was antwortet man auf „С Но́вым го́дом!“?', options: ['С но́вым сча́стьем!', 'Взаи́мно но́вым!', 'Не́ за что!'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: '„dieses Jahr“', options: ['в э́том году́', 'в э́тот год', 'на э́том году́'], answer: 0, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „letztes Jahr“.', before: 'В про́шлом', after: 'я был в Москве́.', answer: 'году́' },
    { type: 'choice', prompt: '„Sag es nicht, sonst geht es nicht in Erfüllung.“ – Не говори́, … не сбу́дется.', options: ['а то', 'потому́ что', 'е́сли'], answer: 0, ruOptions: true },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['по́лночь', 'Mitternacht'], ['шампа́нское', 'Sekt'], ['жела́ние', 'Wunsch'], ['а то', 'sonst'], ['в но́вом году́', 'im neuen Jahr']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Frohes neues Jahr!', answer: 'С Но́вым го́дом!' },
    { type: 'choice', prompt: 'Laut Dialog: Was wünscht sich Max?', options: ['viel reisen', 'noch besser Russisch sprechen', 'Prüfungen bestehen'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'В но́вом году́ я хочу́ мно́го путеше́ствовать.', answer: 'В но́вом году́ я хочу́ мно́го путеше́ствовать.' },
  ],
  speak: ['С Но́вым го́дом!', 'С но́вым сча́стьем!', 'В но́вом году́ я хочу́ говори́ть по-ру́сски ещё лу́чше.'],
};

const l14c: Lesson = {
  id: '14.C',
  unit: 14,
  checkpoint: true,
  title: { ru: 'Контро́льная', de: 'Checkpoint Einheit 14' },
  canDo: 'Ich kann Daten nennen, gratulieren, schenken und über Feste sprechen.',
  speakers: {},
  dialogs: [],
  vocab: [],
  grammar: [],
  exercises: [
    { type: 'choice', prompt: '„Heute ist der 2. Januar.“', options: ['Сего́дня второ́е января́.', 'Сего́дня второ́го января́.', 'Сего́дня два янва́рь.'], answer: 0, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „am Siebten“.', before: 'Рождество́', after: 'января́.', answer: 'седьмо́го' },
    { type: 'choice', prompt: 'Жела́ю вам … (Gesundheit)', options: ['здоро́вье', 'здоро́вья', 'здоро́вьем'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Поздравля́ю тебя́ … (zum Feiertag)', options: ['с пра́здником', 'пра́здник', 'для пра́здника'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Я подарю́ цветы́ … (meiner Mama)', options: ['мое́й ма́ме', 'моему́ ма́ме', 'моя́ ма́ма'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Мы гуля́ли с … (mit den Kindern)', options: ['де́тями', 'детьми́', 'де́тям'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Hör zu: Wann ist der Geburtstag?', audio: 'Мой день рожде́ния два́дцать пе́рвого ию́ня.', options: ['21. Juni', '21. Juli', '12. Juni'], answer: 0 },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['С днём рожде́ния!', 'Alles Gute zum Geburtstag!'], ['С Но́вым го́дом!', 'Frohes neues Jahr!'], ['За тебя́!', 'Auf dich!'], ['Жела́ю успе́хов!', 'Viel Erfolg!'], ['С пра́здником!', 'Schöne Feiertage!']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Ich wünsche dir Glück!', answer: 'Жела́ю тебе́ сча́стья!' },
    { type: 'gap', prompt: 'Ergänze den Präpositiv Plural von магази́ны.', before: 'В', after: 'мно́го пода́рков.', answer: 'магази́нах' },
    { type: 'dictation', prompt: 'Hör zu und schreib die Frage.', audio: 'Како́е сего́дня число́?', answer: 'Како́е сего́дня число́?' },
    { type: 'order', prompt: 'Bilde den Satz „Was soll ich meinem Bruder schenken?“', tokens: ['бра́ту?', 'моему́', 'подари́ть', 'Что'], answer: 'Что подари́ть моему́ бра́ту?' },
  ],
  speak: ['Сего́дня пе́рвое января́.', 'С днём рожде́ния!', 'Жела́ю тебе́ сча́стья и здоро́вья!', 'Что подари́ть дру́гу?'],
};

export const UNIT14: Unit = {
  n: 14,
  title: { ru: 'Пра́здники', de: 'Feste & Traditionen' },
  lessons: [l141, l142, l143, l144, l145, l14c],
};
