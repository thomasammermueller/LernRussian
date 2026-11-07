import type { Lesson, Speaker, Unit } from './types';

const S: Record<string, Speaker> = {
  max: { name: 'Макс', voice: 'dmitri', emoji: '🧑' },
  olja: { name: 'О́ля', voice: 'irina', emoji: '👩' },
  anna: { name: 'А́нна', voice: 'irina', emoji: '👩‍💼' },
  lena: { name: 'Ле́на', voice: 'irina', emoji: '👩‍🎓' },
  ns: { name: 'Ната́лья Серге́евна', voice: 'irina', emoji: '👵' },
  doc: { name: 'Врач', voice: 'dmitri', emoji: '🩺' },
  pharm: { name: 'Фармаце́вт', voice: 'irina', emoji: '💊' },
};

const l91: Lesson = {
  id: '9.1',
  unit: 9,
  title: { ru: 'Что у вас боли́т?', de: 'Was tut Ihnen weh?' },
  canDo: 'Ich kann beim Arzt sagen, was mir wehtut, und Anweisungen verstehen.',
  speakers: { doc: S.doc, anna: S.anna },
  dialogs: [
    {
      title: 'Beim Arzt',
      lines: [
        { who: 'doc', ru: 'Здра́вствуйте! Что у вас боли́т?', translit: 'zdrástwujtje! schto u was balít', de: 'Guten Tag! Was tut Ihnen weh?', note: '**У меня́ боли́т …** = wörtlich „bei mir schmerzt …“ – so beschreibt man Schmerzen.' },
        { who: 'anna', ru: 'У меня́ боли́т голова́ и го́рло.', translit: 'u minjá balít galawá i górla', de: 'Ich habe Kopf- und Halsschmerzen.' },
        { who: 'doc', ru: 'Температу́ра есть?', translit: "timpiratúra jest'", de: 'Haben Sie Fieber?' },
        { who: 'anna', ru: 'Да, три́дцать во́семь.', translit: "da, trítsat' wósim'", de: 'Ja, achtunddreißig.' },
        { who: 'doc', ru: 'А ка́шель?', translit: "a káschyl'", de: 'Und Husten?' },
        { who: 'anna', ru: 'Да, немно́го.', translit: 'da, nimnóga', de: 'Ja, ein bisschen.' },
        { who: 'doc', ru: 'Э́то просту́да. Вам на́до пить мно́го ча́я и лежа́ть.', translit: "éta prastúda. wam náda pit' mnóga tschája i lizhát'", de: 'Das ist eine Erkältung. Sie müssen viel Tee trinken und im Bett bleiben.', note: '**Вам на́до** = Sie müssen (wörtlich „Ihnen ist nötig“) – die Person steht im **Dativ**.' },
        { who: 'anna', ru: 'А лека́рство?', translit: 'a likárstwa', de: 'Und Medikamente?' },
        { who: 'doc', ru: 'Вот реце́пт. Принима́йте э́ти табле́тки три ра́за в день.', translit: "wot ritsépt. prinimájtje éti tabljétki tri ráza w djen'", de: 'Hier ist ein Rezept. Nehmen Sie diese Tabletten dreimal am Tag.' },
        { who: 'anna', ru: 'Спаси́бо, до́ктор.', translit: 'spasíba, dóktar', de: 'Danke, Herr Doktor.' },
        { who: 'doc', ru: 'Выздора́вливайте!', translit: 'wyzdarávliwajtje', de: 'Gute Besserung!' },
      ],
    },
  ],
  vocab: ['Что у вас боли́т?', 'боли́т', 'голова́', 'го́рло', 'живо́т', 'спина́', 'зуб', 'нога́', 'температу́ра', 'ка́шель', 'просту́да', 'лека́рство', 'реце́пт', 'табле́тка', 'три ра́за в день', 'Выздора́вливайте!'],
  grammar: [
    {
      title: 'у меня́ боли́т / боля́т',
      blocks: [
        { table: { head: ['Singular → боли́т', 'Plural → боля́т'], rows: [
          ['голова́ (Kopf)', 'глаза́ (Augen)'],
          ['го́рло (Hals)', 'у́ши (Ohren)'],
          ['живо́т (Bauch)', 'но́ги (Beine, Füße)'],
          ['спина́ (Rücken)', 'ру́ки (Arme, Hände)'],
          ['зуб (Zahn)', 'зу́бы (Zähne)'],
        ] } },
        { tip: 'Das Körperteil ist das Subjekt (Nominativ): У меня́ боли́т **голова́**. Bei mehreren: У меня́ **боля́т** но́ги.' },
        { p: '**Häufigkeit:** раз в день (einmal täglich), два / три ра́за в день, пять раз в неде́лю.' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'У меня́ … голова́.', options: ['боли́т', 'боля́т'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'У него́ … но́ги.', options: ['боли́т', 'боля́т'], answer: 1, ruOptions: true },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['голова́', 'Kopf'], ['го́рло', 'Hals'], ['живо́т', 'Bauch'], ['спина́', 'Rücken'], ['зуб', 'Zahn']] },
    { type: 'choice', prompt: 'Was sagt man zu Kranken?', options: ['Выздора́вливайте!', 'Счастли́вого пути́!', 'Прия́тного аппети́та!'], answer: 0, ruOptions: true },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Ich habe Halsschmerzen.', answer: 'У меня́ боли́т го́рло.' },
    { type: 'choice', prompt: 'Hör zu: Was fehlt der Person?', audio: 'У меня́ боли́т живо́т.', options: ['Bauchschmerzen', 'Kopfschmerzen', 'Rückenschmerzen'], answer: 0 },
    { type: 'choice', prompt: 'Laut Dialog: Wie oft soll Anna die Tabletten nehmen?', options: ['einmal täglich', 'zweimal täglich', 'dreimal täglich'], answer: 2 },
    { type: 'dictation', prompt: 'Hör zu und schreib die Frage.', audio: 'Что у вас боли́т?', answer: 'Что у вас боли́т?' },
  ],
  speak: ['У меня́ боли́т голова́.', 'У меня́ температу́ра.', 'Выздора́вливайте!'],
};

const l92: Lesson = {
  id: '9.2',
  unit: 9,
  title: { ru: 'Тебе́ на́до к врачу́!', de: 'Du musst zum Arzt!' },
  canDo: 'Ich kann sagen, was jemand muss, braucht, darf oder nicht darf (Dativ).',
  speakers: { olja: S.olja, max: S.max },
  dialogs: [
    {
      title: 'Max ist krank',
      lines: [
        { who: 'olja', ru: 'Макс, что с тобо́й? Ты пло́хо вы́глядишь.', translit: 'maks, schto s tabój? ty plócha wýgljadisch', de: 'Max, was ist los mit dir? Du siehst schlecht aus.' },
        { who: 'max', ru: 'Мне пло́хо. У меня́ температу́ра.', translit: 'mnje plócha. u minjá timpiratúra', de: 'Mir geht es schlecht. Ich habe Fieber.', note: '**Мне пло́хо** = mir ist schlecht / mir geht es schlecht. Die Person steht im Dativ.' },
        { who: 'olja', ru: 'Тебе́ на́до к врачу́!', translit: 'tibjé náda k wratschú', de: 'Du musst zum Arzt!', note: '**к** + Dativ = zu (einer Person): врач → к врач**у́**.' },
        { who: 'max', ru: 'Нет, мне не ну́жно к врачу́. Мне ну́жно то́лько спать.', translit: "njet, mnje ni núzhna k wratschú. mnje núzhna tól'ka spat'", de: 'Nein, ich muss nicht zum Arzt. Ich muss nur schlafen.' },
        { who: 'olja', ru: 'Тебе́ нельзя́ сего́дня рабо́тать!', translit: "tibjé nil'zjá siwódnja rabótat'", de: 'Du darfst heute nicht arbeiten!', note: '**нельзя́** = man darf nicht / es ist verboten.' },
        { who: 'max', ru: 'Но мне на́до зако́нчить прое́кт…', translit: "no mnje náda zakóntschit' prajékt…", de: 'Aber ich muss das Projekt fertig machen …' },
        { who: 'olja', ru: 'Нет! Иди́ домо́й. Я позвоню́ тебе́ ве́чером.', translit: 'njet! idí damój. ja pazwanjú tibjé wjétschiram', de: 'Nein! Geh nach Hause. Ich rufe dich heute Abend an.' },
      ],
    },
  ],
  vocab: ['Что с тобо́й?', 'вы́глядеть', 'Мне пло́хо.', 'на́до', 'ну́жно', 'мо́жно', 'нельзя́', 'к врачу́', 'зако́нчить', 'прое́кт', 'Иди́ домо́й!'],
  grammar: [
    {
      title: 'Der Dativ',
      blocks: [
        { table: { head: ['я', 'ты', 'он', 'она́', 'мы', 'вы', 'они́'], rows: [['мне', 'тебе́', 'ему́', 'ей', 'нам', 'вам', 'им']] } },
        { table: { head: ['', 'Nominativ', 'Dativ'], rows: [
          ['m', 'брат, врач', 'бра́т**у**, врач**у́**'],
          ['m (-й / -ь)', 'Серге́й, учи́тель', 'Серге́**ю**, учи́тел**ю**'],
          ['f (-а / -я)', 'ма́ма, сестра́', 'ма́м**е**, сестр**е́**'],
          ['f (-ия / -ь)', 'Ю́лия, мать', 'Ю́ли**и**, ма́тер**и**'],
          ['n', 'окно́', 'окн**у́**'],
        ] } },
      ],
    },
    {
      title: 'Unpersönliche Sätze mit Dativ',
      blocks: [
        { table: { head: ['Russisch', 'Deutsch'], rows: [
          ['Мне на́до / ну́жно рабо́тать.', 'Ich muss arbeiten.'],
          ['Тебе́ мо́жно отдыха́ть.', 'Du darfst dich ausruhen.'],
          ['Ему́ нельзя́ кури́ть.', 'Er darf nicht rauchen.'],
          ['Мне пло́хо / хорошо́.', 'Mir geht es schlecht / gut.'],
          ['Нам хо́лодно.', 'Uns ist kalt.'],
        ] } },
        { tip: '**к** + Dativ für Personen: Я иду́ **к врачу́**, **к ма́ме**, **к дру́гу**. Für Orte bleibt в/на + Akkusativ.' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: '… на́до рабо́тать. (ich)', options: ['Я', 'Мне', 'Меня́'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: '… нельзя́ пить ко́фе. (ihm)', options: ['Он', 'Его́', 'Ему́'], answer: 2, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „zum Arzt“.', before: 'Мне на́до к', after: '.', answer: 'врачу́' },
    { type: 'gap', prompt: 'Ergänze „zur Mama“.', before: 'Я иду́ к', after: '.', answer: 'ма́ме' },
    { type: 'choice', prompt: 'Ей … (schlecht).', options: ['пло́хо', 'плохо́й', 'плоха́я'], answer: 0, ruOptions: true },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['на́до', 'man muss'], ['мо́жно', 'man darf'], ['нельзя́', 'man darf nicht'], ['ну́жно', 'es ist nötig'], ['Мне пло́хо.', 'Mir geht es schlecht.']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Du darfst heute nicht arbeiten.', answer: 'Тебе́ нельзя́ сего́дня рабо́тать.', alternatives: ['Сего́дня тебе́ нельзя́ рабо́тать.', 'Тебе́ сего́дня нельзя́ рабо́тать.'] },
    { type: 'choice', prompt: 'Laut Dialog: Was will Max eigentlich noch tun?', options: ['zum Arzt gehen', 'das Projekt fertig machen', 'ins Kino gehen'], answer: 1 },
  ],
  speak: ['Мне пло́хо.', 'Тебе́ на́до к врачу́!', 'Мне нельзя́ рабо́тать.'],
};

const l93: Lesson = {
  id: '9.3',
  unit: 9,
  title: { ru: 'Мне нра́вится Москва́', de: 'Mir gefällt Moskau' },
  canDo: 'Ich kann sagen, was mir gefällt und was nicht.',
  speakers: { lena: S.lena, max: S.max },
  dialogs: [
    {
      title: 'Was gefällt dir?',
      lines: [
        { who: 'lena', ru: 'Макс, тебе́ нра́вится Москва́?', translit: 'maks, tibjé nráwitsa maskwá', de: 'Max, gefällt dir Moskau?', note: '**нра́виться** funktioniert wie „gefallen“: Wem? (Dativ) gefällt was? (Nominativ).' },
        { who: 'max', ru: 'О́чень нра́вится! Мне нра́вятся ста́рые у́лицы и метро́.', translit: "ótschin' nráwitsa! mnje nráwjatsa stáryje úlitsy i mitró", de: 'Sehr! Mir gefallen die alten Straßen und die Metro.', note: 'Bei mehreren Dingen: **нра́вятся**.' },
        { who: 'lena', ru: 'А что тебе́ не нра́вится?', translit: 'a schto tibjé ni nráwitsa', de: 'Und was gefällt dir nicht?' },
        { who: 'max', ru: 'Мне не нра́вится, что зимо́й так хо́лодно. И про́бки!', translit: 'mnje ni nráwitsa, schto zimój tak chóladna. i própki', de: 'Mir gefällt nicht, dass es im Winter so kalt ist. Und die Staus!' },
        { who: 'lena', ru: 'Да, про́бки — э́то ужа́сно. А ру́сская ку́хня тебе́ нра́вится?', translit: 'da, própki — éta uzhásna. a rúskaja kúchnja tibjé nráwitsa', de: 'Ja, die Staus sind schrecklich. Und gefällt dir die russische Küche?' },
        { who: 'max', ru: 'Да! Мне осо́бенно нра́вятся блины́.', translit: 'da! mnje asóbinna nráwjatsa bliný', de: 'Ja! Besonders mag ich Blini.' },
        { who: 'lena', ru: 'А моему́ бра́ту нра́вится неме́цкое пи́во!', translit: 'a majimú brátu nráwitsa nimjétskaje píwa', de: 'Und meinem Bruder gefällt deutsches Bier!', note: 'Auch das Possessivpronomen steht im Dativ: мой брат → **моему́** бра́ту.' },
      ],
    },
  ],
  vocab: ['нра́виться', 'Мне нра́вится …', 'про́бка', 'ужа́сно', 'ку́хня', 'осо́бенно', 'блины́', 'неме́цкий'],
  grammar: [
    {
      title: 'нра́виться – gefallen',
      blocks: [
        { table: { head: ['Wem? (Dativ)', 'gefällt', 'Was? (Nominativ)'], rows: [
          ['Мне', 'нра́вится', 'Москва́.'],
          ['Тебе́', 'нра́вится', 'э́тот фильм?'],
          ['Ему́', 'нра́вятся', 'блины́.'],
          ['Мое́й сестре́', 'нра́вится', 'гуля́ть. (+ Infinitiv)'],
        ] } },
        { tip: '**люби́ть** = lieben, sehr mögen (dauerhaft) · **нра́виться** = gefallen (oft der erste Eindruck). Мне нра́вится э́та кни́га – Я люблю́ кни́ги.' },
        { p: '**Vergangenheit:** Мне понра́вился фильм / понра́вилась кни́га (hat mir gefallen).' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Мне … блины́.', options: ['нра́вится', 'нра́вятся'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: '… нра́вится Москва́? (dir)', options: ['Ты', 'Тебя́', 'Тебе́'], answer: 2, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „ihr“ (Dativ).', before: '', after: 'нра́вится э́тот фильм.', answer: 'Ей' },
    { type: 'choice', prompt: 'Мое́й … нра́вится ру́сская ку́хня. (Mutter)', options: ['ма́ма', 'ма́ме', 'ма́му'], answer: 1, ruOptions: true },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['про́бка', 'Stau'], ['ужа́сно', 'schrecklich'], ['ку́хня', 'Küche'], ['осо́бенно', 'besonders'], ['неме́цкий', 'deutsch']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Mir gefällt Moskau.', answer: 'Мне нра́вится Москва́.', alternatives: ['Москва́ мне нра́вится.'] },
    { type: 'choice', prompt: 'Laut Dialog: Was gefällt Max nicht?', options: ['die Metro', 'die Kälte im Winter und die Staus', 'die russische Küche'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Мне нра́вятся ста́рые у́лицы.', answer: 'Мне нра́вятся ста́рые у́лицы.' },
  ],
  speak: ['Мне нра́вится Москва́.', 'Мне не нра́вятся про́бки.', 'Тебе́ нра́вится ру́сская ку́хня?'],
};

const l94: Lesson = {
  id: '9.4',
  unit: 9,
  title: { ru: 'В апте́ке', de: 'In der Apotheke' },
  canDo: 'Ich kann in der Apotheke nach einem Mittel fragen und die Einnahme verstehen.',
  speakers: { anna: S.anna, pharm: S.pharm },
  dialogs: [
    {
      title: 'Etwas gegen Husten',
      lines: [
        { who: 'anna', ru: 'Здра́вствуйте! У вас есть что́-нибудь от ка́шля?', translit: "zdrástwujtje! u was jest' schtó-nibut' at káschlja", de: 'Guten Tag! Haben Sie etwas gegen Husten?', note: '**от** + Genitiv = gegen (eine Krankheit): ка́шель → от ка́шля.' },
        { who: 'pharm', ru: 'Да, вот сиро́п. Принима́йте по ло́жке три ра́за в день.', translit: "da, wot sirop. prinimájtje pa lózhkje tri ráza w djen'", de: 'Ja, hier ist ein Sirup. Nehmen Sie dreimal täglich einen Löffel.' },
        { who: 'anna', ru: 'А от головно́й бо́ли?', translit: 'a at galawnój bóli', de: 'Und gegen Kopfschmerzen?' },
        { who: 'pharm', ru: 'Вот э́ти табле́тки. Но не бо́льше четырёх в день.', translit: "wot éti tabljétki. no ni ból'sche tschityrjóch w djen'", de: 'Diese Tabletten hier. Aber nicht mehr als vier am Tag.' },
        { who: 'anna', ru: 'Реце́пт ну́жен?', translit: 'ritsépt núzhyn', de: 'Braucht man ein Rezept?', note: '**ну́жен / нужна́ / ну́жно / нужны́** = wird gebraucht. Mir ist ein Rezept nötig = **Мне ну́жен реце́пт**.' },
        { who: 'pharm', ru: 'Нет, не ну́жен.', translit: 'njet, ni núzhyn', de: 'Nein, nicht nötig.' },
        { who: 'anna', ru: 'Ско́лько с меня́?', translit: "skól'ka s minjá", de: 'Was bekommen Sie von mir?' },
        { who: 'pharm', ru: 'Шестьсо́т пятьдеся́т рубле́й. Выздора́вливайте!', translit: 'schyssót pidisját rubljéj. wyzdarávliwajtje', de: 'Sechshundertfünfzig Rubel. Gute Besserung!' },
      ],
    },
  ],
  vocab: ['апте́ка', 'от', 'сиро́п', 'ло́жка', 'головна́я боль', 'на́сморк', 'ну́жен', 'Ско́лько с меня́?', 'фармаце́вт'],
  grammar: [
    {
      title: 'ну́жен – gebraucht werden',
      blocks: [
        { table: { head: ['', 'Form', 'Beispiel'], rows: [
          ['m', 'ну́жен', 'Мне ну́жен реце́пт.'],
          ['f', 'нужна́', 'Мне нужна́ табле́тка.'],
          ['n', 'ну́жно', 'Мне ну́жно лека́рство.'],
          ['Plural', 'нужны́', 'Мне нужны́ табле́тки.'],
        ] } },
        { tip: 'Wer braucht, steht im **Dativ** (мне, тебе́, ему́ …), was gebraucht wird, im **Nominativ** – wie bei нра́виться.' },
      ],
    },
    {
      title: 'от + Genitiv – gegen',
      blocks: [
        { table: { head: ['Beschwerde', 'Mittel gegen …'], rows: [
          ['ка́шель (Husten)', 'от ка́шля'],
          ['на́сморк (Schnupfen)', 'от на́сморка'],
          ['головна́я боль (Kopfschmerzen)', 'от головно́й бо́ли'],
          ['температу́ра (Fieber)', 'от температу́ры'],
        ] } },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Мне … табле́тка.', options: ['ну́жен', 'нужна́', 'нужны́'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Ему́ … врач.', options: ['ну́жен', 'нужна́', 'ну́жно'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'сиро́п от … (Husten)', options: ['ка́шель', 'ка́шля', 'ка́шлем'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „gegen Schnupfen“.', before: 'У вас есть что́-нибудь от', after: '?', answer: 'на́сморка' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['ло́жка', 'Löffel'], ['на́сморк', 'Schnupfen'], ['ка́шель', 'Husten'], ['лека́рство', 'Medikament'], ['реце́пт', 'Rezept']] },
    { type: 'translate', prompt: 'Frag auf Russisch.', de: 'Was macht das? (Was bekommen Sie von mir?)', answer: 'Ско́лько с меня́?' },
    { type: 'choice', prompt: 'Laut Dialog: Wie viele Tabletten darf Anna höchstens nehmen?', options: ['drei am Tag', 'vier am Tag', 'eine am Tag'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib die Frage.', audio: 'У вас есть что́-нибудь от ка́шля?', answer: 'У вас есть что́-нибудь от ка́шля?' },
  ],
  speak: ['У вас есть что́-нибудь от ка́шля?', 'Мне ну́жен реце́пт?', 'Ско́лько с меня́?'],
};

const l95: Lesson = {
  id: '9.5',
  unit: 9,
  title: { ru: 'Для здоро́вья', de: 'Für die Gesundheit' },
  canDo: 'Ich kann über Gesundheit sprechen, Ratschläge geben und vergleichen (besser, mehr, weniger).',
  speakers: { ns: S.ns, anna: S.anna },
  dialogs: [
    {
      title: 'Die fitte Nachbarin',
      lines: [
        { who: 'ns', ru: 'А́нна, вы уже́ здоро́вы?', translit: 'ánna, wy uzhé zdarówy', de: 'Anna, sind Sie schon wieder gesund?' },
        { who: 'anna', ru: 'Да, спаси́бо, мне уже́ лу́чше.', translit: 'da, spasíba, mnje uzhé lútschsche', de: 'Ja, danke, mir geht es schon besser.' },
        { who: 'ns', ru: 'Вам на́до бо́льше гуля́ть и ме́ньше рабо́тать!', translit: "wam náda ból'sche guljat' i mjén'sche rabótat'", de: 'Sie müssen mehr spazieren gehen und weniger arbeiten!' },
        { who: 'anna', ru: 'Вы пра́вы. А что вы де́лаете для здоро́вья?', translit: "wy práwy. a schto wy djélajitje dlja zdarów'ja", de: 'Sie haben recht. Und was tun Sie für Ihre Gesundheit?' },
        { who: 'ns', ru: 'Ка́ждое у́тро я де́лаю заря́дку, а ле́том пла́ваю в о́зере.', translit: 'kázhdaje útra ja djélaju zarjátku, a ljétam pláwaju w óziri', de: 'Jeden Morgen mache ich Gymnastik, und im Sommer schwimme ich im See.' },
        { who: 'anna', ru: 'В о́зере? Да́же в сентябре́?', translit: 'w óziri? dázhe f sintibrjé', de: 'Im See? Sogar im September?' },
        { who: 'ns', ru: 'Коне́чно! Мне се́мьдесят лет, и я никогда́ не боле́ю!', translit: "kanjéschna! mnje sjém'disit ljet, i ja nikagdá ni baljéju", de: 'Natürlich! Ich bin siebzig und werde nie krank!', note: '**никогда́ не** = nie. Im Russischen steht die Verneinung doppelt: никогда́ **не** боле́ю.' },
      ],
    },
  ],
  vocab: ['здоро́в', 'здоро́вье', 'лу́чше', 'ху́же', 'бо́льше', 'ме́ньше', 'Вы пра́вы.', 'заря́дка', 'о́зеро', 'да́же', 'никогда́', 'боле́ть'],
  grammar: [
    {
      title: 'besser, schlechter, mehr, weniger',
      blocks: [
        { table: { head: ['Grundform', 'Vergleich'], rows: [
          ['хорошо́ (gut)', 'лу́чше (besser)'],
          ['пло́хо (schlecht)', 'ху́же (schlechter)'],
          ['мно́го (viel)', 'бо́льше (mehr)'],
          ['ма́ло (wenig)', 'ме́ньше (weniger)'],
        ] } },
        { p: 'Мне **лу́чше** = Mir geht es besser. На́до **бо́льше** гуля́ть = Man muss mehr spazieren gehen.' },
      ],
    },
    {
      title: 'Doppelte Verneinung',
      blocks: [
        { table: { head: ['Russisch', 'Deutsch'], rows: [
          ['Я никогда́ не боле́ю.', 'Ich bin nie krank.'],
          ['Я ничего́ не зна́ю.', 'Ich weiß nichts.'],
          ['Никто́ не зна́ет.', 'Niemand weiß es.'],
          ['Я нигде́ не был.', 'Ich war nirgends.'],
        ] } },
        { tip: 'Wörter mit **ни-** brauchen immer zusätzlich **не** vor dem Verb.' },
        { p: '**боле́ть** hat zwei Bedeutungen: Я боле́ю = ich bin krank · У меня́ боли́т голова́ = mein Kopf tut weh.' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Mir geht es besser: Мне …', options: ['лу́чше', 'ху́же', 'бо́льше'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'На́до … рабо́тать. (weniger)', options: ['бо́льше', 'ме́ньше', 'лу́чше'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Я … не боле́ю. (nie)', options: ['никогда́', 'всегда́', 'ча́сто'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Welcher Satz ist richtig? („Ich weiß nichts.“)', options: ['Я ничего́ зна́ю.', 'Я ничего́ не зна́ю.', 'Я не зна́ю что.'], answer: 1, ruOptions: true },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['здоро́вье', 'Gesundheit'], ['заря́дка', 'Morgengymnastik'], ['о́зеро', 'See'], ['да́же', 'sogar'], ['никогда́', 'nie']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Sie haben recht.', answer: 'Вы пра́вы.' },
    { type: 'choice', prompt: 'Laut Dialog: Wie alt ist Natalja Sergejewna?', options: ['60', '70', '80'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Мне уже́ лу́чше.', answer: 'Мне уже́ лу́чше.' },
  ],
  speak: ['Мне уже́ лу́чше.', 'Вам на́до бо́льше гуля́ть.', 'Я никогда́ не боле́ю.'],
};

const l9c: Lesson = {
  id: '9.C',
  unit: 9,
  checkpoint: true,
  title: { ru: 'Контро́льная', de: 'Checkpoint Einheit 9' },
  canDo: 'Ich kann über Beschwerden, Vorlieben, Pflichten und Gesundheit sprechen.',
  speakers: {},
  dialogs: [],
  vocab: [],
  grammar: [],
  exercises: [
    { type: 'choice', prompt: 'У меня́ … зу́бы.', options: ['боли́т', 'боля́т'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: '… нра́вится му́зыка. (ihr)', options: ['Она́', 'Её', 'Ей'], answer: 2, ruOptions: true },
    { type: 'choice', prompt: 'Нам … э́ти фи́льмы.', options: ['нра́вится', 'нра́вятся'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „zum Bruder“ (Dativ).', before: 'Я иду́ к', after: '.', answer: 'бра́ту' },
    { type: 'choice', prompt: 'Ему́ … лека́рство.', options: ['ну́жен', 'нужна́', 'ну́жно'], answer: 2, ruOptions: true },
    { type: 'choice', prompt: 'Hier darf man nicht rauchen: Здесь … кури́ть.', options: ['мо́жно', 'нельзя́', 'на́до'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Hör zu: Was ist los?', audio: 'У меня́ боли́т спина́.', options: ['Rückenschmerzen', 'Bauchschmerzen', 'Halsschmerzen'], answer: 0 },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Mir geht es schlecht.', answer: 'Мне пло́хо.' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['лу́чше', 'besser'], ['ху́же', 'schlechter'], ['бо́льше', 'mehr'], ['ме́ньше', 'weniger'], ['да́же', 'sogar']] },
    { type: 'gap', prompt: 'Ergänze „gegen Kopfschmerzen“.', before: 'Табле́тки от головно́й', after: '.', answer: 'бо́ли' },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Тебе́ на́до к врачу́!', answer: 'Тебе́ на́до к врачу́!' },
    { type: 'order', prompt: 'Bilde den Satz „Ich werde nie krank.“', tokens: ['боле́ю.', 'не', 'никогда́', 'Я'], answer: 'Я никогда́ не боле́ю.' },
  ],
  speak: ['У меня́ боли́т го́рло.', 'Мне нра́вится э́тот го́род.', 'Мне на́до к врачу́.', 'Мне уже́ лу́чше.'],
};

export const UNIT9: Unit = {
  n: 9,
  title: { ru: 'Здоро́вье', de: 'Gesundheit' },
  lessons: [l91, l92, l93, l94, l95, l9c],
};
