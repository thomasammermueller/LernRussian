import type { Lesson, Speaker, Unit } from './types';

const S: Record<string, Speaker> = {
  max: { name: 'Макс', voice: 'dmitri', emoji: '🧑' },
  olja: { name: 'О́ля', voice: 'irina', emoji: '👩' },
  anna: { name: 'А́нна', voice: 'irina', emoji: '👩‍💼' },
  ip: { name: 'Ива́н Петро́вич', voice: 'dmitri', emoji: '👨‍💼' },
  lena: { name: 'Ле́на', voice: 'irina', emoji: '👩‍🎓' },
  pass: { name: 'Прохо́жий', voice: 'dmitri', emoji: '🚶' },
  passw: { name: 'Прохо́жая', voice: 'irina', emoji: '🚶‍♀️' },
};

const l51: Lesson = {
  id: '5.1',
  unit: 5,
  title: { ru: 'Где нахо́дится музе́й?', de: 'Wo ist das Museum?' },
  canDo: 'Ich kann fragen und sagen, wo sich etwas in der Stadt befindet.',
  speakers: { anna: S.anna, pass: S.pass },
  dialogs: [
    {
      title: 'Anna in Moskau',
      lines: [
        { who: 'anna', ru: 'Извини́те, где нахо́дится Истори́ческий музе́й?', translit: 'izwinítje, gdje nachóditsa istarítschiskij muzjéj', de: 'Entschuldigung, wo ist das Historische Museum?', note: '**нахо́дится** = befindet sich. Man kann auch einfach fragen: Где музе́й?' },
        { who: 'pass', ru: 'На Кра́сной пло́щади.', translit: 'na krásnaj plóschschadi', de: 'Am Roten Platz.', note: 'пло́щадь (f, -ь) → на пло́щад**и**. Plätze und Straßen stehen mit **на**.' },
        { who: 'anna', ru: 'А э́то далеко́?', translit: 'a éta dalikó', de: 'Ist das weit?' },
        { who: 'pass', ru: 'Нет, недалеко́. Пять мину́т пешко́м.', translit: "njet, nidalikó. pjat' minút pischkóm", de: 'Nein, nicht weit. Fünf Minuten zu Fuß.' },
        { who: 'anna', ru: 'Спаси́бо! А где здесь апте́ка?', translit: "spasíba! a gdje zdjes' aptjéka", de: 'Danke! Und wo ist hier eine Apotheke?' },
        { who: 'pass', ru: 'Вон там, ря́дом с ба́нком.', translit: 'won tam, rjádam z bánkam', de: 'Dort drüben, neben der Bank.', note: '**ря́дом с** + Instrumental = neben: банк → с ба́нком.' },
        { who: 'anna', ru: 'А по́чта?', translit: 'a pótschta', de: 'Und die Post?' },
        { who: 'pass', ru: 'По́чта на вокза́ле.', translit: 'pótschta na wagzálje', de: 'Die Post ist am Bahnhof.' },
      ],
    },
  ],
  vocab: ['Где нахо́дится …?', 'музе́й', 'апте́ка', 'по́чта', 'вокза́л', 'пло́щадь', 'Кра́сная пло́щадь', 'далеко́', 'недалеко́', 'пешко́м', 'вон там', 'ря́дом'],
  grammar: [
    {
      title: 'Wo? – в/на + Präpositiv',
      blocks: [
        { table: { head: ['Nominativ', 'Endung', 'Где? (wo?)'], rows: [
          ['парк, банк', 'Konsonant + е', 'в па́рк**е**, в ба́нк**е**'],
          ['музе́й', '-й → -е', 'в музе́**е**'],
          ['шко́ла, апте́ка', '-а → -е', 'в шко́л**е**, в апте́к**е**'],
          ['Росси́я, ле́кция', '-ия → -ии', 'в Росси́**и**, на ле́кци**и**'],
          ['пло́щадь', '-ь (f) → -и', 'на пло́щад**и**'],
          ['окно́', '-о → -е', 'в окн**е́**'],
          ['метро́, кафе́, кино́', 'unverändert', 'в метро́, в кафе́, в кино́'],
        ] } },
        { tip: 'Fast alles endet auf **-е**. Merken muss man nur -ия → -ии und weibliche Wörter auf -ь → -и.' },
      ],
    },
    {
      title: 'в oder на?',
      blocks: [
        { p: '**в** = „in“ (geschlossene Räume, Gebäude, Städte, Länder). **на** = „auf / an“ – offene Orte, Veranstaltungen und einige feste Ausdrücke:' },
        { table: { head: ['на + …', 'Deutsch'], rows: [
          ['на у́лице, на пло́щади', 'auf der Straße, auf dem Platz'],
          ['на по́чте, на вокза́ле', 'auf der Post, am Bahnhof'],
          ['на рабо́те, на ры́нке', 'bei der Arbeit, auf dem Markt'],
          ['на конце́рте, на уро́ке', 'im Konzert, im Unterricht'],
        ] } },
        { tip: 'Für на-Orte gibt es keine perfekte Regel – lerne sie einfach mit **на** zusammen.' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Мы в … (Park)', options: ['парк', 'па́рке', 'па́рку'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Она́ в … (Museum)', options: ['музе́е', 'музе́и', 'музе́й'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Он … по́чте.', options: ['в', 'на'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „auf dem Platz“.', before: 'Музе́й на', after: '.', answer: 'пло́щади' },
    { type: 'gap', prompt: 'Ergänze „in der Apotheke“.', before: 'Я в', after: '.', answer: 'апте́ке' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['далеко́', 'weit'], ['недалеко́', 'nicht weit'], ['пешко́м', 'zu Fuß'], ['ря́дом', 'nebenan'], ['вон там', 'dort drüben']] },
    { type: 'translate', prompt: 'Frag auf Russisch.', de: 'Wo ist hier eine Apotheke?', answer: 'Где здесь апте́ка?' },
    { type: 'choice', prompt: 'Laut Dialog: Wo ist die Post?', options: ['neben der Bank', 'am Bahnhof', 'am Roten Platz'], answer: 1 },
  ],
  speak: ['Где нахо́дится музе́й?', 'Э́то далеко́?', 'Пять мину́т пешко́м.'],
};

const l52: Lesson = {
  id: '5.2',
  unit: 5,
  title: { ru: 'Как пройти́?', de: 'Wie komme ich hin?' },
  canDo: 'Ich kann nach dem Weg fragen und eine einfache Wegbeschreibung verstehen.',
  speakers: { anna: S.anna, passw: S.passw },
  dialogs: [
    {
      title: 'Auf dem Weg zum Bolschoi-Theater',
      lines: [
        { who: 'anna', ru: 'Скажи́те, пожа́луйста, как пройти́ к Большо́му теа́тру?', translit: 'skazhýtje, pazhálsta, kak prajtí k bal\'schómu tiátru', de: 'Sagen Sie bitte, wie komme ich zum Bolschoi-Theater?', note: '**Как пройти́ к …?** = Wie komme ich (zu Fuß) zu …? – fester Ausdruck.' },
        { who: 'passw', ru: 'Иди́те пря́мо до светофо́ра.', translit: 'idítje prjáma da switafóra', de: 'Gehen Sie geradeaus bis zur Ampel.' },
        { who: 'passw', ru: 'Пото́м поверни́те нале́во.', translit: 'patóm pawirnítje naljéwa', de: 'Dann biegen Sie links ab.' },
        { who: 'passw', ru: 'Теа́тр бу́дет спра́ва.', translit: 'tiátr búdit spráwa', de: 'Das Theater ist dann rechts.', note: '**спра́ва** / **сле́ва** = rechts / links (wo). **напра́во** / **нале́во** = nach rechts / nach links (wohin).' },
        { who: 'anna', ru: 'Пря́мо, пото́м нале́во… А э́то далеко́?', translit: 'prjáma, patóm naljéwa… a éta dalikó', de: 'Geradeaus, dann links … Ist das weit?' },
        { who: 'passw', ru: 'Нет, мину́т де́сять.', translit: "njet, minút djésit'", de: 'Nein, so etwa zehn Minuten.', note: 'Steht die Zahl **hinter** dem Wort, bedeutet das „ungefähr“: мину́т де́сять ≈ etwa zehn Minuten.' },
        { who: 'anna', ru: 'Большо́е спаси́бо!', translit: "bal'schóje spasíba", de: 'Vielen Dank!' },
        { who: 'passw', ru: 'Не́ за что!', translit: 'njé za schta', de: 'Keine Ursache!' },
      ],
    },
  ],
  vocab: ['Скажи́те, пожа́луйста, …', 'Как пройти́ к …?', 'Иди́те!', 'пря́мо', 'нале́во', 'напра́во', 'пото́м', 'Поверни́те!', 'спра́ва', 'сле́ва', 'светофо́р', 'Не́ за что!'],
  grammar: [
    {
      title: 'Den Weg beschreiben',
      blocks: [
        { table: { head: ['Russisch', 'Deutsch'], rows: [
          ['Как пройти́ к …?', 'Wie komme ich (zu Fuß) zu …?'],
          ['Иди́те пря́мо.', 'Gehen Sie geradeaus.'],
          ['Поверни́те нале́во / напра́во.', 'Biegen Sie links / rechts ab.'],
          ['до светофо́ра / до угла́', 'bis zur Ampel / bis zur Ecke'],
          ['Пото́м …', 'Dann / danach …'],
          ['… бу́дет спра́ва / сле́ва.', '… ist dann rechts / links.'],
        ] } },
        { tip: '**Иди́те, Поверни́те, Скажи́те** sind höfliche Aufforderungen (Imperativ, Sie-Form). Lerne sie vorerst als Wendungen – der Imperativ kommt systematisch in A2.' },
      ],
    },
    {
      title: 'Wo? oder Wohin? – спра́ва oder напра́во',
      blocks: [
        { table: { head: ['Где? (wo)', 'Куда́? (wohin)'], rows: [
          ['спра́ва – rechts', 'напра́во – nach rechts'],
          ['сле́ва – links', 'нале́во – nach links'],
          ['здесь – hier', 'сюда́ – hierher'],
          ['там – dort', 'туда́ – dorthin'],
        ] } },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Hör zu: Wohin soll man gehen?', audio: 'Поверни́те напра́во.', options: ['nach links', 'nach rechts', 'geradeaus'], answer: 1 },
    { type: 'choice', prompt: '„Das Museum ist links.“ – Музе́й …', options: ['нале́во', 'сле́ва'], answer: 1, ruOptions: true, explain: 'Es geht um den Ort (wo?), nicht die Richtung → **сле́ва**.' },
    { type: 'choice', prompt: 'Was antwortest du auf „Спаси́бо!“?', options: ['Не́ за что!', 'Поверни́те!', 'Пото́м.'], answer: 0, ruOptions: true },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['пря́мо', 'geradeaus'], ['нале́во', 'nach links'], ['спра́ва', 'rechts (wo)'], ['пото́м', 'dann'], ['светофо́р', 'Ampel']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Gehen Sie geradeaus.', answer: 'Иди́те пря́мо.' },
    { type: 'choice', prompt: 'мину́т пять bedeutet …', options: ['genau fünf Minuten', 'etwa fünf Minuten', 'fünfzehn Minuten'], answer: 1 },
    { type: 'order', prompt: 'Bilde den Satz „Dann biegen Sie rechts ab.“', tokens: ['напра́во.', 'поверни́те', 'Пото́м'], answer: 'Пото́м поверни́те напра́во.' },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Теа́тр бу́дет спра́ва.', answer: 'Теа́тр бу́дет спра́ва.' },
  ],
  speak: ['Скажи́те, пожа́луйста, как пройти́ к музе́ю?', 'Иди́те пря́мо.', 'Пото́м поверни́те нале́во.', 'Не́ за что!'],
};

const l53: Lesson = {
  id: '5.3',
  unit: 5,
  title: { ru: 'Куда́ ты идёшь?', de: 'Wohin gehst du?' },
  canDo: 'Ich kann sagen, wohin ich gehe, und zwischen „wo“ und „wohin“ unterscheiden.',
  speakers: { olja: S.olja, max: S.max },
  dialogs: [
    {
      title: 'Zufällig auf der Straße',
      lines: [
        { who: 'olja', ru: 'Макс, приве́т! Куда́ ты идёшь?', translit: 'maks, priwjét! kudá ty idjósch', de: 'Max, hallo! Wohin gehst du?', note: '**идти́** = (zu Fuß) gehen, gerade jetzt, in eine Richtung.' },
        { who: 'max', ru: 'Я иду́ в спортза́л. А ты?', translit: 'ja idú f spardzál. a ty', de: 'Ich gehe ins Fitnessstudio. Und du?', note: 'Wohin? → в + **Akkusativ**: спортза́л bleibt gleich (m).' },
        { who: 'olja', ru: 'А я иду́ на по́чту, а пото́м в магази́н.', translit: 'a ja idú na pótschtu, a patóm w magazín', de: 'Ich gehe zur Post und dann in den Laden.', note: 'по́чта → на **по́чту** (wohin) – aber на **по́чте** (wo).' },
        { who: 'max', ru: 'А где Серге́й?', translit: 'a gdje sirgéj', de: 'Und wo ist Sergej?' },
        { who: 'olja', ru: 'Он на рабо́те. А ве́чером мы идём в теа́тр.', translit: 'on na rabótje. a wjétschiram my idjóm f tiátr', de: 'Er ist bei der Arbeit. Und abends gehen wir ins Theater.' },
        { who: 'max', ru: 'Здо́рово! Ну, пока́!', translit: 'zdórawa! nu, paká', de: 'Toll! Na dann, tschüss!' },
      ],
    },
  ],
  vocab: ['Куда́ ты идёшь?', 'куда́', 'идти́', 'спортза́л', 'магази́н', 'рабо́та', 'теа́тр', 'до́ма', 'домо́й', 'Здо́рово!'],
  grammar: [
    {
      title: 'идти́ – gehen',
      blocks: [
        { table: { head: ['Person', 'Form', 'Person', 'Form'], rows: [
          ['я', 'иду́', 'мы', 'идём'],
          ['ты', 'идёшь', 'вы', 'идёте'],
          ['он / она́', 'идёт', 'они́', 'иду́т'],
        ] } },
        { tip: '**идти́** heißt: zu Fuß, jetzt gerade, in eine Richtung. Für Fahrzeuge gibt es ein eigenes Verb – е́хать (nächste Lektion).' },
      ],
    },
    {
      title: 'Где? (wo) oder Куда́? (wohin)',
      blocks: [
        { table: { head: ['Где? + Präpositiv', 'Куда́? + Akkusativ'], rows: [
          ['в магази́не', 'в магази́н'],
          ['в шко́ле', 'в шко́лу'],
          ['на по́чте', 'на по́чту'],
          ['на рабо́те', 'на рабо́ту'],
          ['в теа́тре', 'в теа́тр'],
          ['до́ма (zu Hause)', 'домо́й (nach Hause)'],
        ] } },
        { tip: 'Das Deutsche macht es genauso: „**in der** Schule“ (wo) – „**in die** Schule“ (wohin).' },
      ],
    },
  ],
  exercises: [
    { type: 'gap', prompt: 'Konjugiere идти́.', before: 'Я', after: 'в магази́н.', answer: 'иду́' },
    { type: 'gap', prompt: 'Konjugiere идти́.', before: 'Куда́ вы', after: '?', answer: 'идёте', alternatives: ['идете'] },
    { type: 'choice', prompt: 'Я иду́ в … (Schule)', options: ['шко́ла', 'шко́лу', 'шко́ле'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Он сейча́с в … (Schule)', options: ['шко́ла', 'шко́лу', 'шко́ле'], answer: 2, ruOptions: true },
    { type: 'choice', prompt: '___ ты идёшь? – В теа́тр.', options: ['Где', 'Куда́', 'Отку́да'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: '„Ich gehe nach Hause.“', options: ['Я иду́ до́ма.', 'Я иду́ домо́й.'], answer: 1, ruOptions: true },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Er ist bei der Arbeit.', answer: 'Он на рабо́те.' },
    { type: 'choice', prompt: 'Laut Dialog: Wohin geht Olja zuerst?', options: ['in den Laden', 'zur Post', 'ins Theater'], answer: 1 },
  ],
  speak: ['Куда́ ты идёшь?', 'Я иду́ на рабо́ту.', 'Ве́чером мы идём в теа́тр.'],
};

const l54: Lesson = {
  id: '5.4',
  unit: 5,
  title: { ru: 'На чём ты е́дешь?', de: 'Womit fährst du?' },
  canDo: 'Ich kann sagen, wie ich irgendwohin komme (Verkehrsmittel).',
  speakers: { max: S.max, lena: S.lena },
  dialogs: [
    {
      title: 'Unterwegs',
      lines: [
        { who: 'max', ru: 'Ле́на, как ты е́дешь в университе́т?', translit: 'ljéna, kak ty jédisch w uniwirsitjét', de: 'Lena, wie fährst du zur Uni?', note: '**е́хать** = fahren (mit einem Fahrzeug).' },
        { who: 'lena', ru: 'Обы́чно на метро́. А ты на рабо́ту?', translit: 'abýtschna na mitró. a ty na rabótu', de: 'Normalerweise mit der U-Bahn. Und du zur Arbeit?', note: 'Verkehrsmittel: **на** + Präpositiv – на метро́ (unverändert).' },
        { who: 'max', ru: 'Сего́дня я е́ду на авто́бусе.', translit: 'siwódnja ja jédu na aftóbusje', de: 'Heute fahre ich mit dem Bus.' },
        { who: 'lena', ru: 'А почему́ не на велосипе́де?', translit: 'a patschimú ni na wilasipjédje', de: 'Und warum nicht mit dem Fahrrad?' },
        { who: 'max', ru: 'Идёт дождь!', translit: "idjót dozhd'", de: 'Es regnet!', note: 'Wörtlich: „Der Regen geht.“ – so sagt man das auf Russisch.' },
        { who: 'lena', ru: 'Поня́тно. А я сего́дня е́ду на такси́: у меня́ большо́й чемода́н.', translit: "panjátna. a ja siwódnja jédu na taksí: u minjá bal'schój tschimadán", de: 'Verstehe. Ich fahre heute mit dem Taxi: Ich habe einen großen Koffer.' },
      ],
    },
  ],
  vocab: ['е́хать', 'авто́бус', 'метро́', 'такси́', 'маши́на', 'по́езд', 'трамва́й', 'велосипе́д', 'пешко́м', 'почему́', 'Идёт дождь.', 'чемода́н'],
  grammar: [
    {
      title: 'е́хать – fahren',
      blocks: [
        { table: { head: ['Person', 'Form', 'Person', 'Form'], rows: [
          ['я', 'е́ду', 'мы', 'е́дем'],
          ['ты', 'е́дешь', 'вы', 'е́дете'],
          ['он / она́', 'е́дет', 'они́', 'е́дут'],
        ] } },
        { p: '**идти́** = zu Fuß gehen · **е́хать** = fahren. Russisch unterscheidet das immer – auch in die Stadt „geht“ man nicht, wenn man fährt!' },
      ],
    },
    {
      title: 'Verkehrsmittel: на + Präpositiv',
      blocks: [
        { table: { head: ['Verkehrsmittel', 'mit dem …'], rows: [
          ['авто́бус', 'на авто́бус**е**'],
          ['трамва́й', 'на трамва́**е**'],
          ['по́езд', 'на по́езд**е**'],
          ['маши́на', 'на маши́н**е**'],
          ['велосипе́д', 'на велосипе́д**е**'],
          ['метро́, такси́', 'на метро́, на такси́ (unverändert)'],
          ['–', '**пешко́м** (zu Fuß)'],
        ] } },
        { tip: 'Frage: **На чём** ты е́дешь? – Womit fährst du? (wörtlich: „Auf was?“)' },
      ],
    },
  ],
  exercises: [
    { type: 'gap', prompt: 'Konjugiere е́хать.', before: 'Я', after: 'на метро́.', answer: 'е́ду' },
    { type: 'gap', prompt: 'Konjugiere е́хать.', before: 'Они́', after: 'на авто́бусе.', answer: 'е́дут' },
    { type: 'choice', prompt: 'Мы е́дем на … (Straßenbahn)', options: ['трамва́й', 'трамва́е', 'трамва́ю'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Ты ___ пешко́м?', options: ['идёшь', 'е́дешь'], answer: 0, ruOptions: true, explain: 'Zu Fuß → **идти́**.' },
    { type: 'choice', prompt: 'Она́ ___ на маши́не.', options: ['идёт', 'е́дет'], answer: 1, ruOptions: true },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['по́езд', 'Zug'], ['трамва́й', 'Straßenbahn'], ['велосипе́д', 'Fahrrad'], ['маши́на', 'Auto'], ['пешко́м', 'zu Fuß']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Es regnet.', answer: 'Идёт дождь.', alternatives: ['Идет дождь.'] },
    { type: 'choice', prompt: 'Laut Dialog: Warum fährt Max heute nicht mit dem Fahrrad?', options: ['Es regnet.', 'Er hat einen Koffer.', 'Das Fahrrad ist kaputt.'], answer: 0 },
  ],
  speak: ['Я е́ду на метро́.', 'Сего́дня я иду́ пешко́м.', 'Идёт дождь!'],
};

const l55: Lesson = {
  id: '5.5',
  unit: 5,
  title: { ru: 'Экску́рсия по Москве́', de: 'Ein Tag in Moskau' },
  canDo: 'Ich kann einen Tagesausflug in der Stadt planen: wohin, wie und in welcher Reihenfolge.',
  speakers: { ip: S.ip, anna: S.anna },
  dialogs: [
    {
      title: 'Iwan Petrowitsch zeigt Anna die Stadt',
      lines: [
        { who: 'ip', ru: 'А́нна, что вы хоти́те посмотре́ть в Москве́?', translit: "ánna, schto wy chatítje pasmatrjét' w maskwjé", de: 'Anna, was möchten Sie sich in Moskau ansehen?' },
        { who: 'anna', ru: 'Коне́чно, Кра́сную пло́щадь и Кремль.', translit: "kanjéschna, krásnuju plóschschat' i krjeml'", de: 'Natürlich den Roten Platz und den Kreml.' },
        { who: 'ip', ru: 'Хорошо́. Снача́ла мы е́дем на метро́ на Кра́сную пло́щадь.', translit: "charaschó. snatschála my jédim na mitró na krásnuju plóschschat'", de: 'Gut. Zuerst fahren wir mit der Metro zum Roten Platz.', note: 'Zweimal **на**: на метро́ (womit, Präpositiv) und на Кра́сную пло́щадь (wohin, Akkusativ).' },
        { who: 'anna', ru: 'А пото́м?', translit: 'a patóm', de: 'Und dann?' },
        { who: 'ip', ru: 'Пото́м идём пешко́м в Кремль. Там о́чень краси́во.', translit: "patóm idjóm pischkóm f krjeml'. tam ótschin' krasíwa", de: 'Dann gehen wir zu Fuß in den Kreml. Dort ist es sehr schön.' },
        { who: 'anna', ru: 'А где мы обе́даем?', translit: 'a gdje my abjédajim', de: 'Und wo essen wir zu Mittag?' },
        { who: 'ip', ru: 'В кафе́ на Арба́те. Э́то ста́рая у́лица в це́нтре.', translit: 'f kafé na arbátje. éta stáraja úlitsa f tséntrje', de: 'In einem Café auf dem Arbat. Das ist eine alte Straße im Zentrum.' },
        { who: 'anna', ru: 'Отли́чно! А ве́чером?', translit: 'atlítschna! a wjétschiram', de: 'Super! Und abends?' },
        { who: 'ip', ru: 'Ве́чером — Большо́й теа́тр!', translit: "wjétschiram — bal'schój tiátr", de: 'Abends – das Bolschoi-Theater!' },
      ],
    },
  ],
  vocab: ['посмотре́ть', 'снача́ла', 'пото́м', 'обе́дать', 'Кремль', 'экску́рсия', 'центр', 'у́лица', 'краси́во'],
  grammar: [
    {
      title: 'Zusammenfassung: wo – wohin – womit',
      blocks: [
        { table: { head: ['Frage', 'Fall', 'Beispiel'], rows: [
          ['Где? (wo)', 'в/на + Präpositiv', 'в Кремле́, на Кра́сной пло́щади'],
          ['Куда́? (wohin)', 'в/на + Akkusativ', 'в Кремль, на Кра́сную пло́щадь'],
          ['На чём? (womit)', 'на + Präpositiv', 'на метро́, на авто́бусе'],
          ['Отку́да? (woher)', 'из + Genitiv', 'из Москвы́, из Герма́нии'],
        ] } },
        { p: '**Reihenfolge:** снача́ла (zuerst) … пото́м (dann) … а ве́чером (und abends) …' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Мы е́дем … (zum Roten Platz)', options: ['на Кра́сную пло́щадь', 'на Кра́сной пло́щади'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Музе́й … (am Roten Platz)', options: ['на Кра́сную пло́щадь', 'на Кра́сной пло́щади'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „zuerst“.', before: '', after: 'мы е́дем в музе́й.', answer: 'Снача́ла' },
    { type: 'choice', prompt: 'Laut Dialog: Wie kommen sie zum Roten Platz?', options: ['zu Fuß', 'mit der Metro', 'mit dem Taxi'], answer: 1 },
    { type: 'choice', prompt: 'Laut Dialog: Wo essen sie zu Mittag?', options: ['im Kreml', 'auf dem Arbat', 'im Theater'], answer: 1 },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Dort ist es sehr schön.', answer: 'Там о́чень краси́во.' },
    { type: 'order', prompt: 'Bilde den Satz „Dann gehen wir zu Fuß.“', tokens: ['пешко́м.', 'идём', 'Пото́м'], answer: 'Пото́м идём пешко́м.' },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Ве́чером — Большо́й теа́тр!', answer: 'Ве́чером — Большо́й теа́тр!' },
  ],
  speak: ['Снача́ла мы е́дем на метро́.', 'Пото́м идём пешко́м.', 'Где мы обе́даем?'],
};

const l5c: Lesson = {
  id: '5.C',
  unit: 5,
  checkpoint: true,
  title: { ru: 'Контро́льная', de: 'Checkpoint Einheit 5' },
  canDo: 'Ich kann mich in einer Stadt orientieren: Orte, Wege und Verkehrsmittel.',
  speakers: {},
  dialogs: [],
  vocab: [],
  grammar: [],
  exercises: [
    { type: 'choice', prompt: 'Я в … (Bank)', options: ['банк', 'ба́нке', 'ба́нку'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Он … вокза́ле.', options: ['в', 'на'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Мы идём в … (Museum, wohin)', options: ['музе́й', 'музе́е'], answer: 0, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „in Russland“.', before: 'Он живёт в', after: '.', answer: 'Росси́и' },
    { type: 'choice', prompt: 'Hör zu: Wohin soll man gehen?', audio: 'Иди́те пря́мо, пото́м нале́во.', options: ['geradeaus, dann links', 'links, dann geradeaus', 'geradeaus, dann rechts'], answer: 0 },
    { type: 'gap', prompt: 'Konjugiere идти́.', before: 'Мы', after: 'домо́й.', answer: 'идём', alternatives: ['идем'] },
    { type: 'gap', prompt: 'Konjugiere е́хать.', before: 'Ты', after: 'на по́езде?', answer: 'е́дешь' },
    { type: 'choice', prompt: '„Ich bin zu Hause.“', options: ['Я до́ма.', 'Я домо́й.'], answer: 0, ruOptions: true },
    { type: 'translate', prompt: 'Frag auf Russisch.', de: 'Wohin gehst du?', answer: 'Куда́ ты идёшь?', alternatives: ['Куда ты идешь?'] },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['спра́ва', 'rechts (wo)'], ['напра́во', 'nach rechts'], ['сле́ва', 'links (wo)'], ['нале́во', 'nach links'], ['пря́мо', 'geradeaus']] },
    { type: 'dictation', prompt: 'Hör zu und schreib die Frage.', audio: 'Где нахо́дится апте́ка?', answer: 'Где нахо́дится апте́ка?' },
    { type: 'order', prompt: 'Bilde den Satz „Ich fahre mit dem Bus.“', tokens: ['авто́бусе.', 'на', 'е́ду', 'Я'], answer: 'Я е́ду на авто́бусе.' },
  ],
  speak: ['Где нахо́дится вокза́л?', 'Как пройти́ к музе́ю?', 'Я е́ду на метро́.', 'Я иду́ домо́й.'],
};

export const UNIT5: Unit = {
  n: 5,
  title: { ru: 'Го́род', de: 'In der Stadt' },
  lessons: [l51, l52, l53, l54, l55, l5c],
};
