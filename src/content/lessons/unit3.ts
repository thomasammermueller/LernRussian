import type { Lesson, Speaker, Unit } from './types';

const S: Record<string, Speaker> = {
  max: { name: 'Макс', voice: 'dmitri', emoji: '🧑' },
  olja: { name: 'О́ля', voice: 'irina', emoji: '👩' },
  anna: { name: 'А́нна', voice: 'irina', emoji: '👩‍💼' },
  ip: { name: 'Ива́н Петро́вич', voice: 'dmitri', emoji: '👨‍💼' },
  lena: { name: 'Ле́на', voice: 'irina', emoji: '👩‍🎓' },
  adm: { name: 'Администра́тор', voice: 'irina', emoji: '🛎' },
  prod: { name: 'Продавщи́ца', voice: 'irina', emoji: '🧑‍🍳' },
  pass: { name: 'Прохо́жий', voice: 'dmitri', emoji: '🚶' },
};

const l31: Lesson = {
  id: '3.1',
  unit: 3,
  title: { ru: 'Како́й у тебя́ но́мер?', de: 'Welche Nummer hast du?' },
  canDo: 'Ich kann bis 20 zählen und Telefon- oder Zimmernummern verstehen und nennen.',
  speakers: { max: S.max, olja: S.olja, anna: S.anna, adm: S.adm },
  dialogs: [
    {
      title: 'Max fragt nach Oljas Nummer',
      lines: [
        { who: 'max', ru: 'О́ля, како́й у тебя́ но́мер телефо́на?', translit: 'ólja, kakój u tibjá nómir tilifóna', de: 'Olja, was ist deine Telefonnummer?', note: '**како́й** = welcher / was für ein. **но́мер телефо́на** = Nummer des Telefons (Genitiv).' },
        { who: 'olja', ru: 'Пиши́: ноль, оди́н, семь, шесть…', translit: "pischý: nol', adín, sjem', schest'…", de: 'Schreib: null, eins, sieben, sechs …' },
        { who: 'max', ru: 'Ме́дленнее, пожа́луйста! Ноль, оди́н, семь, шесть…', translit: "mjédlinjeje, pazhálsta! nol', adín, sjem', schest'…", de: 'Langsamer, bitte! Null, eins, sieben, sechs …' },
        { who: 'olja', ru: 'Три, во́семь, де́вять, два, пять, четы́ре, ноль.', translit: "tri, wósim', djéwit', dwa, pjat', tschitýrje, nol'", de: 'Drei, acht, neun, zwei, fünf, vier, null.' },
        { who: 'max', ru: 'Спаси́бо! Я тебе́ позвоню́.', translit: 'spasíba! ja tibjé pazwanjú', de: 'Danke! Ich rufe dich an.' },
      ],
    },
    {
      title: 'Anna im Hotel in Moskau',
      lines: [
        { who: 'adm', ru: 'Здра́вствуйте! Ва́ша фами́лия?', translit: 'zdrástwujtje! wáscha famílija', de: 'Guten Tag! Ihr Nachname?', note: '**фами́лия** ist ein falscher Freund: Es heißt „Nachname“, nicht „Familie“ (= семья́).' },
        { who: 'anna', ru: 'Шмидт. А́нна Шмидт.', translit: 'schmit. ánna schmit', de: 'Schmidt. Anna Schmidt.' },
        { who: 'adm', ru: 'Ваш но́мер — двена́дцать. Вот ключ.', translit: 'wasch nómir — dwinátsat\'. wot kljutsch', de: 'Ihr Zimmer ist Nummer zwölf. Hier ist der Schlüssel.' },
        { who: 'anna', ru: 'Двена́дцать? Спаси́бо. А где лифт?', translit: "dwinátsat'? spasíba. a gdje lift", de: 'Zwölf? Danke. Und wo ist der Aufzug?' },
        { who: 'adm', ru: 'Лифт там, напра́во.', translit: 'lift tam, napráwa', de: 'Der Aufzug ist dort rechts.' },
      ],
    },
  ],
  vocab: ['ноль', 'оди́н', 'два', 'три', 'четы́ре', 'пять', 'шесть', 'семь', 'во́семь', 'де́вять', 'де́сять', 'двена́дцать', 'Како́й …?', 'но́мер', 'Пиши́!', 'фами́лия', 'ключ', 'лифт', 'Я тебе́ позвоню́.'],
  grammar: [
    {
      title: 'Die Zahlen 0–20',
      blocks: [
        { table: { head: ['', '', '', ''], rows: [
          ['0 ноль', '5 пять', '10 де́сять', '15 пятна́дцать'],
          ['1 оди́н', '6 шесть', '11 оди́ннадцать', '16 шестна́дцать'],
          ['2 два', '7 семь', '12 двена́дцать', '17 семна́дцать'],
          ['3 три', '8 во́семь', '13 трина́дцать', '18 восемна́дцать'],
          ['4 четы́ре', '9 де́вять', '14 четы́рнадцать', '19 девятна́дцать'],
          ['', '', '', '20 два́дцать'],
        ] } },
        { tip: '11–19 = Zahl + **-надцать** („auf zehn“). Betont wird meist das **на**: двена́дцать, пятна́дцать. Ausnahmen: оди́ннадцать, четы́рнадцать.' },
        { p: '**1 und 2 haben Geschlecht:** оди́н брат, **одна́** сестра́, **одно́** фо́то · два бра́та, **две** сестры́.' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Hör zu: Welche Zahl ist das?', audio: 'семь', options: ['6', '7', '8'], answer: 1 },
    { type: 'choice', prompt: 'Hör zu: Welche Zahl ist das?', audio: 'двена́дцать', options: ['2', '12', '20'], answer: 1 },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['три', '3'], ['во́семь', '8'], ['пятна́дцать', '15'], ['де́вять', '9'], ['два́дцать', '20']] },
    { type: 'choice', prompt: 'Was bedeutet **фами́лия**?', options: ['Familie', 'Nachname', 'Vorname'], answer: 1, explain: 'Falscher Freund! Familie = семья́.' },
    { type: 'translate', prompt: 'Schreib die Zahl als Wort.', de: '4', answer: 'четы́ре' },
    { type: 'dictation', prompt: 'Hör zu und schreib die Zahl als Wort.', audio: 'пятна́дцать', answer: 'пятна́дцать' },
    { type: 'order', prompt: 'Bilde die Frage „Was ist deine Telefonnummer?“', tokens: ['телефо́на?', 'но́мер', 'тебя́', 'у', 'Како́й'], answer: 'Како́й у тебя́ но́мер телефо́на?' },
    { type: 'choice', prompt: 'Laut Dialog: Welche Zimmernummer hat Anna?', options: ['2', '12', '20'], answer: 1 },
  ],
  speak: ['Ноль, оди́н, два, три, четы́ре, пять.', 'Ваш но́мер — двена́дцать.', 'Я тебе́ позвоню́.'],
};

const l32: Lesson = {
  id: '3.2',
  unit: 3,
  title: { ru: 'Ско́лько сто́ит?', de: 'Was kostet das?' },
  canDo: 'Ich kann bis 100 zählen, nach Preisen fragen und Preise verstehen.',
  speakers: { max: S.max, prod: S.prod },
  dialogs: [
    {
      title: 'Am Kiosk',
      lines: [
        { who: 'max', ru: 'Здра́вствуйте! Ско́лько сто́ит ко́фе?', translit: "zdrástwujtje! skól'ka stóit kófje", de: 'Guten Tag! Was kostet ein Kaffee?' },
        { who: 'prod', ru: 'Сто рубле́й.', translit: 'sto rubljéj', de: 'Hundert Rubel.', note: 'Nach **5–20** (und 100) heißt es **рубле́й** – dieselbe Regel wie bei лет.' },
        { who: 'max', ru: 'А чай?', translit: 'a tschaj', de: 'Und ein Tee?' },
        { who: 'prod', ru: 'Чай — пятьдеся́т рубле́й.', translit: 'tschaj — pidisját rubljéj', de: 'Tee kostet fünfzig Rubel.' },
        { who: 'max', ru: 'А ско́лько сто́ит вода́?', translit: "a skól'ka stóit wadá", de: 'Und was kostet das Wasser?' },
        { who: 'prod', ru: 'Вода́ — три́дцать два рубля́.', translit: "wadá — trítsat' dwa rubljá", de: 'Wasser kostet zweiunddreißig Rubel.', note: 'Nach **2, 3, 4** heißt es **рубля́**.' },
        { who: 'max', ru: 'Тогда́ чай и во́ду, пожа́луйста.', translit: 'tagdá tschaj i wódu, pazhálsta', de: 'Dann einen Tee und ein Wasser, bitte.', note: 'вода́ → **во́ду**: Was man bestellt, steht im Akkusativ (-а → -у). Mehr dazu in Einheit 4.' },
        { who: 'prod', ru: 'Во́семьдесят два рубля́.', translit: "wósim'disit dwa rubljá", de: 'Zweiundachtzig Rubel.' },
        { who: 'max', ru: 'Вот сто рубле́й.', translit: 'wot sto rubljéj', de: 'Hier sind hundert Rubel.' },
        { who: 'prod', ru: 'Ва́ша сда́ча — восемна́дцать рубле́й. Спаси́бо!', translit: "wáscha sdátscha — wasimnátsat' rubljéj. spasíba", de: 'Ihr Wechselgeld: achtzehn Rubel. Danke!' },
      ],
    },
  ],
  vocab: ['Ско́лько сто́ит?', 'рубль', 'два́дцать', 'три́дцать', 'со́рок', 'пятьдеся́т', 'шестьдеся́т', 'се́мьдесят', 'во́семьдесят', 'девяно́сто', 'сто', 'тогда́', 'сда́ча'],
  grammar: [
    {
      title: 'Die Zehner bis 100',
      blocks: [
        { table: { head: ['', '', ''], rows: [
          ['20 два́дцать', '50 пятьдеся́т', '80 во́семьдесят'],
          ['30 три́дцать', '60 шестьдеся́т', '90 девяно́сто'],
          ['40 со́рок', '70 се́мьдесят', '100 сто'],
        ] } },
        { p: 'Zusammengesetzte Zahlen wie im Englischen – **Zehner zuerst**: 32 = три́дцать два, 85 = во́семьдесят пять.' },
        { tip: 'Achtung Eselsbrücke: Deutsch sagt „zwei-und-dreißig“, Russisch „dreißig zwei“.' },
      ],
    },
    {
      title: 'рубль – рубля́ – рубле́й',
      blocks: [
        { table: { head: ['endet auf …', 'Form', 'Beispiel'], rows: [
          ['1 (nicht 11)', '**рубль**', '21 рубль'],
          ['2, 3, 4 (nicht 12–14)', '**рубля́**', '32 рубля́, 84 рубля́'],
          ['0, 5–9, 11–14', '**рубле́й**', '50 рубле́й, 100 рубле́й'],
        ] } },
        { tip: 'Das ist dieselbe Regel wie год – го́да – лет aus Einheit 2.' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Hör zu: Welcher Preis ist das?', audio: 'Пятьдеся́т рубле́й.', options: ['15 ₽', '50 ₽', '500 ₽'], answer: 1 },
    { type: 'choice', prompt: '32 = …', options: ['два три́дцать', 'три́дцать два', 'тридва́дцать'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Со́рок оди́н …', options: ['рубль', 'рубля́', 'рубле́й'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Девяно́сто четы́ре …', options: ['рубль', 'рубля́', 'рубле́й'], answer: 1, ruOptions: true },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['со́рок', '40'], ['шестьдеся́т', '60'], ['се́мьдесят', '70'], ['девяно́сто', '90'], ['сто', '100']] },
    { type: 'translate', prompt: 'Frag auf Russisch.', de: 'Was kostet das Wasser?', answer: 'Ско́лько сто́ит вода́?' },
    { type: 'choice', prompt: 'Laut Dialog: Wie viel Wechselgeld bekommt Max?', options: ['8 ₽', '18 ₽', '80 ₽'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Preis in Worten.', audio: 'Во́семьдесят два рубля́.', answer: 'Во́семьдесят два рубля́.' },
  ],
  speak: ['Ско́лько сто́ит ко́фе?', 'Три́дцать два рубля́.', 'Тогда́ чай, пожа́луйста.'],
};

const l33: Lesson = {
  id: '3.3',
  unit: 3,
  title: { ru: 'Кото́рый час?', de: 'Wie spät ist es?' },
  canDo: 'Ich kann nach der Uhrzeit fragen und sie angeben.',
  speakers: { lena: S.lena, max: S.max, anna: S.anna, pass: S.pass },
  dialogs: [
    {
      title: 'Lena hat es eilig',
      lines: [
        { who: 'lena', ru: 'Макс, кото́рый час?', translit: 'maks, katóryj tschas', de: 'Max, wie spät ist es?' },
        { who: 'max', ru: 'Сейча́с час два́дцать.', translit: "sejtschás tschas dwátsat'", de: 'Es ist jetzt zwanzig nach eins.', note: 'Bei 1 Uhr sagt man nur **час** – ohne оди́н. Im Alltag: Stunde + Minuten, wie „eins zwanzig“.' },
        { who: 'lena', ru: 'Ой, у меня́ ле́кция в два часа́!', translit: 'oj, u minjá ljéktsyja w dwa tschisá', de: 'Oh, ich habe um zwei Uhr eine Vorlesung!' },
        { who: 'max', ru: 'Не волну́йся, у тебя́ ещё со́рок мину́т.', translit: 'ni walnújsja, u tibjá jischschó sórak minút', de: 'Keine Sorge, du hast noch vierzig Minuten.' },
        { who: 'lena', ru: 'Хорошо́. Пока́!', translit: 'charaschó. paká', de: 'Gut. Tschüss!' },
      ],
    },
    {
      title: 'Anna fragt einen Passanten',
      lines: [
        { who: 'anna', ru: 'Извини́те, ско́лько сейча́с вре́мени?', translit: "izwinítje, skól'ka sejtschás wrjémini", de: 'Entschuldigung, wie spät ist es jetzt?', note: '**Ско́лько вре́мени?** ist genauso üblich wie Кото́рый час?' },
        { who: 'pass', ru: 'Сейча́с пять часо́в.', translit: 'sejtschás pjat\' tschisóf', de: 'Es ist jetzt fünf Uhr.', note: 'Nach **5–12** heißt es **часо́в**.' },
        { who: 'anna', ru: 'Спаси́бо!', translit: 'spasíba', de: 'Danke!' },
      ],
    },
  ],
  vocab: ['Кото́рый час?', 'Ско́лько вре́мени?', 'час', 'часа́', 'часо́в', 'мину́та', 'мину́ты', 'мину́т', 'сейча́с', 'ле́кция', 'Не волну́йся!'],
  grammar: [
    {
      title: 'Die Uhrzeit',
      blocks: [
        { table: { head: ['Uhr', 'Russisch', 'Regel'], rows: [
          ['1:00', '(оди́н) **час**', '1 → час'],
          ['2:00 – 4:00', 'два / три / четы́ре **часа́**', '2–4 → часа́'],
          ['5:00 – 12:00', 'пять … двена́дцать **часо́в**', '5–20 → часо́в'],
          ['21:00', 'два́дцать оди́н **час**', 'endet auf 1 → час'],
        ] } },
        { p: 'Minuten genauso: одна́ **мину́та**, две **мину́ты**, пять **мину́т**.' },
        { table: { head: ['Uhrzeit', 'ausführlich', 'im Alltag'], rows: [
          ['2:15', 'два часа́ пятна́дцать мину́т', 'два пятна́дцать'],
          ['7:40', 'семь часо́в со́рок мину́т', 'семь со́рок'],
          ['18:30', 'восемна́дцать часо́в три́дцать мину́т', 'шесть три́дцать (ве́чера)'],
        ] } },
        { tip: 'Fahrpläne und Fernsehen benutzen die 24-Stunden-Zählung, im Gespräch nimmt man meist 1–12.' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Сейча́с три …', options: ['час', 'часа́', 'часо́в'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Сейча́с во́семь …', options: ['час', 'часа́', 'часо́в'], answer: 2, ruOptions: true },
    { type: 'choice', prompt: 'Hör zu: Wie spät ist es?', audio: 'Сейча́с де́вять часо́в.', options: ['9:00', '5:00', '10:00'], answer: 0 },
    { type: 'choice', prompt: 'Hör zu: Wie spät ist es?', audio: 'Сейча́с два пятна́дцать.', options: ['2:50', '12:15', '2:15'], answer: 2 },
    { type: 'gap', prompt: 'Ergänze „Minuten“.', before: 'У тебя́ ещё со́рок', after: '.', answer: 'мину́т' },
    { type: 'translate', prompt: 'Frag auf Russisch nach der Uhrzeit.', de: 'Wie spät ist es?', answer: 'Кото́рый час?', alternatives: ['Ско́лько вре́мени?', 'Ско́лько сейча́с вре́мени?', 'Кото́рый сейча́с час?'] },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['час', '1:00'], ['два часа́', '2:00'], ['пять часо́в', '5:00'], ['де́сять часо́в', '10:00'], ['двена́дцать часо́в', '12:00']] },
    { type: 'dictation', prompt: 'Hör zu und schreib die Uhrzeit in Worten.', audio: 'Сейча́с пять часо́в.', answer: 'Сейча́с пять часо́в.' },
  ],
  speak: ['Кото́рый час?', 'Сейча́с два часа́.', 'Ско́лько сейча́с вре́мени?'],
};

const l34: Lesson = {
  id: '3.4',
  unit: 3,
  title: { ru: 'Во ско́лько?', de: 'Um wie viel Uhr?' },
  canDo: 'Ich kann Termine mit Wochentag und Uhrzeit vereinbaren.',
  speakers: { ip: S.ip, anna: S.anna },
  dialogs: [
    {
      title: 'Ein Termin mit einem Kunden',
      lines: [
        { who: 'ip', ru: 'А́нна, когда́ у нас встре́ча с клие́нтом?', translit: 'ánna, kagdá u nas fstrjétscha s kliéntam', de: 'Anna, wann haben wir das Treffen mit dem Kunden?' },
        { who: 'anna', ru: 'В сре́ду.', translit: 'f srjédu', de: 'Am Mittwoch.', note: 'Wochentag mit **в** + Akkusativ: среда́ → в **сре́ду**.' },
        { who: 'ip', ru: 'Во ско́лько?', translit: "wa skól'ka", de: 'Um wie viel Uhr?' },
        { who: 'anna', ru: 'В де́сять часо́в утра́.', translit: "w djésit' tschisóf utrá", de: 'Um zehn Uhr morgens.', note: '**утра́** nach der Uhrzeit = „morgens“.' },
        { who: 'ip', ru: 'В сре́ду я не могу́, я в Ве́не. А в четве́рг?', translit: 'f srjédu ja ni magú, ja w wjénje. a f tschitwjérk', de: 'Am Mittwoch kann ich nicht, ich bin in Wien. Und am Donnerstag?' },
        { who: 'anna', ru: 'В четве́рг мо́жно в два часа́ дня.', translit: 'f tschitwjérk mózhna w dwa tschisá dnja', de: 'Am Donnerstag ginge es um zwei Uhr nachmittags.', note: '**дня** nach der Uhrzeit = „nachmittags“.' },
        { who: 'ip', ru: 'Отли́чно. Зна́чит, в четве́рг в два.', translit: 'atlítschna. znátschit, f tschitwjérk w dwa', de: 'Super. Also am Donnerstag um zwei.' },
      ],
    },
  ],
  vocab: ['Во ско́лько?', 'когда́', 'встре́ча', 'клие́нт', 'в сре́ду', 'в пя́тницу', 'в суббо́ту', 'утра́', 'дня', 'ве́чера', 'мо́жно', 'Я не могу́.', 'зна́чит', 'понеде́льник', 'вто́рник', 'среда́', 'четве́рг', 'пя́тница', 'суббо́та', 'воскресе́нье'],
  grammar: [
    {
      title: 'Am Montag, um 10 Uhr – в + Zeitangabe',
      blocks: [
        { table: { head: ['Wochentag', 'am …'], rows: [
          ['понеде́льник', 'в понеде́льник'],
          ['вто́рник', '**во** вто́рник'],
          ['среда́', 'в сре́д**у**'],
          ['четве́рг', 'в четве́рг'],
          ['пя́тница', 'в пя́тниц**у**'],
          ['суббо́та', 'в суббо́т**у**'],
          ['воскресе́нье', 'в воскресе́нье'],
        ] } },
        { tip: 'Nur die weiblichen Tage auf **-а** ändern sich: -а → -у (Akkusativ). Vor вт sagt man **во**, damit es sich leichter spricht.' },
        { p: '**Uhrzeit:** в + Zahl + час/часа́/часо́в – в семь часо́в, в два часа́, в час.' },
        { table: { head: ['nach der Uhrzeit', 'Bedeutung', 'Beispiel'], rows: [
          ['утра́', 'morgens', 'в во́семь утра́'],
          ['дня', 'nachmittags', 'в три часа́ дня'],
          ['ве́чера', 'abends', 'в семь ве́чера'],
          ['но́чи', 'nachts', 'в два часа́ но́чи'],
        ] } },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Am Freitag = …', options: ['в пя́тница', 'в пя́тницу', 'в пя́тнице'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Am Dienstag = …', options: ['в вто́рник', 'во вто́рник', 'на вто́рник'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „am Samstag“.', before: 'Я рабо́таю в', after: '.', answer: 'суббо́ту' },
    { type: 'choice', prompt: 'Hör zu: Wann ist das Treffen?', audio: 'Встре́ча в сре́ду в де́сять часо́в утра́.', options: ['Mi, 10:00', 'Mo, 10:00', 'Mi, 22:00'], answer: 0 },
    { type: 'choice', prompt: '„um 3 Uhr nachmittags“', options: ['в три часа́ утра́', 'в три часа́ дня', 'в три часа́ но́чи'], answer: 1, ruOptions: true },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Ich kann nicht.', answer: 'Я не могу́.' },
    { type: 'order', prompt: 'Bilde den Satz „Am Donnerstag um zwei.“', tokens: ['два.', 'в', 'четве́рг', 'В'], answer: 'В четве́рг в два.' },
    { type: 'choice', prompt: 'Laut Dialog: Warum kann Iwan Petrowitsch am Mittwoch nicht?', options: ['Er ist krank.', 'Er ist in Wien.', 'Er hat einen Kunden.'], answer: 1 },
  ],
  speak: ['Во ско́лько?', 'В сре́ду в де́сять часо́в.', 'В четве́рг я не могу́.'],
};

const l35: Lesson = {
  id: '3.5',
  unit: 3,
  title: { ru: 'Что ты де́лаешь в суббо́ту?', de: 'Was machst du am Samstag?' },
  canDo: 'Ich kann mich verabreden und sagen, wann ich Zeit habe.',
  speakers: { olja: S.olja, max: S.max },
  dialogs: [
    {
      title: 'Olja lädt Max ins Kino ein',
      lines: [
        { who: 'olja', ru: 'Макс, что ты де́лаешь в суббо́ту?', translit: 'maks, schto ty djélajisch f subótu', de: 'Max, was machst du am Samstag?' },
        { who: 'max', ru: 'В суббо́ту я рабо́таю. А что?', translit: 'f subótu ja rabótaju. a schto', de: 'Am Samstag arbeite ich. Warum?', note: '**А что?** = „Wieso fragst du?“ – sehr umgangssprachlich und häufig.' },
        { who: 'olja', ru: 'В кино́ но́вый фильм.', translit: "f kinó nówyj fil'm", de: 'Im Kino läuft ein neuer Film.', note: '**кино́** wird nicht dekliniert: в кино́, из кино́.' },
        { who: 'max', ru: 'А в воскресе́нье? В воскресе́нье я свобо́ден.', translit: "a w waskrisjén'je? w waskrisjén'je ja swabódin", de: 'Und am Sonntag? Am Sonntag habe ich frei.', note: '**свобо́ден** sagt ein Mann, eine Frau sagt **свобо́дна**.' },
        { who: 'olja', ru: 'Отли́чно! Дава́й в воскресе́нье ве́чером.', translit: "atlítschna! dawáj w waskrisjén'je wjétschiram", de: 'Super! Lass uns am Sonntagabend gehen.', note: '**ве́чером** = am Abend. Ebenso: у́тром, днём, но́чью.' },
        { who: 'max', ru: 'Во ско́лько?', translit: "wa skól'ka", de: 'Um wie viel Uhr?' },
        { who: 'olja', ru: 'Фильм в семь часо́в.', translit: "fil'm f sjem' tschisóf", de: 'Der Film ist um sieben.' },
        { who: 'max', ru: 'Хорошо́. До воскресе́нья!', translit: "charaschó. da waskrisjén'ja", de: 'Gut. Bis Sonntag!' },
      ],
    },
  ],
  vocab: ['Что ты де́лаешь?', 'де́лать', 'кино́', 'фильм', 'свобо́ден', 'Дава́й …!', 'у́тром', 'днём', 'ве́чером', 'но́чью', 'звони́ть', 'отдыха́ть', 'До воскресе́нья!'],
  grammar: [
    {
      title: 'Präsens – Wiederholung der zwei Konjugationen',
      blocks: [
        { table: { head: ['', 'де́лать (e)', 'звони́ть (i)'], rows: [
          ['я', 'де́ла**ю**', 'звон**ю́**'],
          ['ты', 'де́ла**ешь**', 'звон**и́шь**'],
          ['он / она́', 'де́ла**ет**', 'звон**и́т**'],
          ['мы', 'де́ла**ем**', 'звон**и́м**'],
          ['вы', 'де́ла**ете**', 'звон**и́те**'],
          ['они́', 'де́ла**ют**', 'звон**я́т**'],
        ] } },
        { tip: 'Genauso: рабо́тать, отдыха́ть, понима́ть, чита́ть (e) · говори́ть, звони́ть (i).' },
      ],
    },
    {
      title: 'Tageszeiten',
      blocks: [
        { table: { head: ['Substantiv', 'wann? (Adverb)', 'Deutsch'], rows: [
          ['у́тро', 'у́тром', 'morgens, am Morgen'],
          ['день', 'днём', 'tagsüber, mittags'],
          ['ве́чер', 'ве́чером', 'abends'],
          ['ночь', 'но́чью', 'nachts'],
        ] } },
        { p: 'Kombiniert mit dem Tag: **в суббо́ту ве́чером** = am Samstagabend.' },
      ],
    },
  ],
  exercises: [
    { type: 'gap', prompt: 'Konjugiere де́лать.', before: 'Что ты', after: 'в суббо́ту?', answer: 'де́лаешь' },
    { type: 'gap', prompt: 'Konjugiere отдыха́ть.', before: 'В воскресе́нье мы', after: '.', answer: 'отдыха́ем' },
    { type: 'gap', prompt: 'Konjugiere звони́ть.', before: 'Я', after: 'тебе́ ве́чером.', answer: 'звоню́' },
    { type: 'choice', prompt: 'Eine Frau sagt: „Am Sonntag habe ich frei.“', options: ['В воскресе́нье я свобо́ден.', 'В воскресе́нье я свобо́дна.'], answer: 1, ruOptions: true },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['у́тром', 'morgens'], ['днём', 'tagsüber'], ['ве́чером', 'abends'], ['но́чью', 'nachts'], ['сейча́с', 'jetzt']] },
    { type: 'choice', prompt: 'Laut Dialog: Wann gehen Max und Olja ins Kino?', options: ['Samstagabend', 'Sonntagabend', 'Sonntagmorgen'], answer: 1 },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Was machst du am Samstag?', answer: 'Что ты де́лаешь в суббо́ту?' },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Фильм в семь часо́в.', answer: 'Фильм в семь часо́в.' },
  ],
  speak: ['Что ты де́лаешь в суббо́ту?', 'В воскресе́нье я свобо́ден.', 'До воскресе́нья!'],
};

const l3c: Lesson = {
  id: '3.C',
  unit: 3,
  checkpoint: true,
  title: { ru: 'Контро́льная', de: 'Checkpoint Einheit 3' },
  canDo: 'Ich kann mit Zahlen, Preisen, Uhrzeiten und Wochentagen umgehen und mich verabreden.',
  speakers: {},
  dialogs: [],
  vocab: [],
  grammar: [],
  exercises: [
    { type: 'choice', prompt: 'Hör zu: Welche Zahl ist das?', audio: 'семна́дцать', options: ['7', '17', '70'], answer: 1 },
    { type: 'choice', prompt: '45 = …', options: ['со́рок пять', 'пять со́рок', 'пятьдеся́т четы́ре'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Два́дцать три …', options: ['рубль', 'рубля́', 'рубле́й'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Сейча́с оди́ннадцать …', options: ['час', 'часа́', 'часо́в'], answer: 2, ruOptions: true },
    { type: 'translate', prompt: 'Frag auf Russisch.', de: 'Was kostet das?', answer: 'Ско́лько сто́ит?' },
    { type: 'gap', prompt: 'Ergänze „am Mittwoch“.', before: 'Встре́ча в', after: '.', answer: 'сре́ду' },
    { type: 'choice', prompt: '„um 7 Uhr abends“', options: ['в семь утра́', 'в семь ве́чера', 'в семь дня'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Konjugiere рабо́тать.', before: 'В суббо́ту я', after: '.', answer: 'рабо́таю' },
    { type: 'dictation', prompt: 'Hör zu und schreib die Frage.', audio: 'Во ско́лько?', answer: 'Во ско́лько?' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['вто́рник', 'Dienstag'], ['четве́рг', 'Donnerstag'], ['пя́тница', 'Freitag'], ['суббо́та', 'Samstag'], ['воскресе́нье', 'Sonntag']] },
    { type: 'order', prompt: 'Bilde die Frage „Wie spät ist es?“', tokens: ['час?', 'Кото́рый'], answer: 'Кото́рый час?' },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Am Sonntag habe ich frei. (als Mann)', answer: 'В воскресе́нье я свобо́ден.' },
  ],
  speak: ['Ско́лько сто́ит чай?', 'Сейча́с три часа́.', 'В пя́тницу ве́чером я свобо́ден.', 'Что ты де́лаешь в воскресе́нье?'],
};

export const UNIT3: Unit = {
  n: 3,
  title: { ru: 'Чи́сла и вре́мя', de: 'Zahlen & Zeit' },
  lessons: [l31, l32, l33, l34, l35, l3c],
};
