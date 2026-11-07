import type { Lesson, Speaker, Unit } from './types';

const S: Record<string, Speaker> = {
  max: { name: 'Макс', voice: 'dmitri', emoji: '🧑' },
  olja: { name: 'О́ля', voice: 'irina', emoji: '👩' },
  anna: { name: 'А́нна', voice: 'irina', emoji: '👩‍💼' },
  ip: { name: 'Ива́н Петро́вич', voice: 'dmitri', emoji: '👨‍💼' },
  lena: { name: 'Ле́на', voice: 'irina', emoji: '👩‍🎓' },
};

const l71: Lesson = {
  id: '7.1',
  unit: 7,
  title: { ru: 'Мой день', de: 'Mein Tag' },
  canDo: 'Ich kann meinen Tagesablauf beschreiben.',
  speakers: { max: S.max, lena: S.lena },
  dialogs: [
    {
      title: 'Lenas Tag',
      lines: [
        { who: 'max', ru: 'Ле́на, когда́ ты встаёшь?', translit: 'ljéna, kagdá ty fstajósch', de: 'Lena, wann stehst du auf?', note: '**встава́ть** verliert im Präsens das -ва-: я встаю́, ты встаёшь.' },
        { who: 'lena', ru: 'Обы́чно в семь часо́в. Пото́м я умыва́юсь и за́втракаю.', translit: "abýtschna f sjem' tschisóf. patóm ja umywájus' i záftrakaju", de: 'Normalerweise um sieben. Dann wasche ich mich und frühstücke.', note: '**умыва́ться** = sich waschen. Das **-ся / -сь** am Ende entspricht dem deutschen „sich“.' },
        { who: 'max', ru: 'А когда́ начина́ются ле́кции?', translit: 'a kagdá natschinájutsa ljéktsyi', de: 'Und wann beginnen die Vorlesungen?' },
        { who: 'lena', ru: 'В де́вять. По́сле университе́та я рабо́таю в кафе́.', translit: "w djéwit'. pósli uniwirsitjéta ja rabótaju f kafé", de: 'Um neun. Nach der Uni arbeite ich im Café.', note: '**по́сле** (nach) + Genitiv: университе́т → по́сле университе́т**а**.' },
        { who: 'max', ru: 'А ве́чером?', translit: 'a wjétschiram', de: 'Und abends?' },
        { who: 'lena', ru: 'Ве́чером я занима́юсь спо́ртом и́ли смотрю́ сериа́лы.', translit: "wjétschiram ja zanimájus' spórtam íli smatrjú sirijály", de: 'Abends mache ich Sport oder schaue Serien.' },
        { who: 'max', ru: 'А когда́ ты ложи́шься спать?', translit: "a kagdá ty lazhýschsja spat'", de: 'Und wann gehst du schlafen?' },
        { who: 'lena', ru: 'По́здно, в двена́дцать.', translit: "pózna, w dwinátsat'", de: 'Spät, um zwölf.', note: 'In **по́здно** wird das д nicht gesprochen: [pózna].' },
      ],
    },
  ],
  vocab: ['встава́ть', 'умыва́ться', 'одева́ться', 'за́втракать', 'начина́ться', 'по́сле', 'занима́ться спо́ртом', 'сериа́л', 'ложи́ться спать', 'по́здно', 'ра́но'],
  grammar: [
    {
      title: 'Reflexive Verben: -ся / -сь',
      blocks: [
        { table: { head: ['Person', 'умыва́ться (sich waschen)'], rows: [
          ['я', 'умыва́ю**сь**'],
          ['ты', 'умыва́ешь**ся**'],
          ['он / она́', 'умыва́ет**ся**'],
          ['мы', 'умыва́ем**ся**'],
          ['вы', 'умыва́ете**сь**'],
          ['они́', 'умыва́ют**ся**'],
        ] } },
        { tip: 'Nach Konsonant **-ся**, nach Vokal **-сь**. Viele russische Reflexivverben sind im Deutschen nicht reflexiv: начина́ться (beginnen), занима́ться (sich beschäftigen, üben).' },
      ],
    },
    {
      title: 'встава́ть – aufstehen',
      blocks: [
        { table: { head: ['Person', 'Form', 'Person', 'Form'], rows: [
          ['я', 'встаю́', 'мы', 'встаём'],
          ['ты', 'встаёшь', 'вы', 'встаёте'],
          ['он / она́', 'встаёт', 'они́', 'встаю́т'],
        ] } },
        { tip: 'Genauso: дава́ть → я даю́ (geben), устава́ть → я устаю́ (müde werden).' },
      ],
    },
  ],
  exercises: [
    { type: 'gap', prompt: 'Konjugiere встава́ть.', before: 'Я', after: 'в семь часо́в.', answer: 'встаю́' },
    { type: 'gap', prompt: 'Konjugiere умыва́ться.', before: 'Пото́м я', after: '.', answer: 'умыва́юсь' },
    { type: 'choice', prompt: 'Когда́ ты …? (gehst schlafen)', options: ['ложи́шься спать', 'ложи́шь спать', 'ложу́сь спать'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Ле́кции … в де́вять.', options: ['начина́ют', 'начина́ются', 'начина́емся'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: '„nach der Arbeit“', options: ['по́сле рабо́та', 'по́сле рабо́ты', 'по́сле рабо́ту'], answer: 1, ruOptions: true },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['встава́ть', 'aufstehen'], ['умыва́ться', 'sich waschen'], ['одева́ться', 'sich anziehen'], ['за́втракать', 'frühstücken'], ['по́здно', 'spät']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Wann stehst du auf?', answer: 'Когда́ ты встаёшь?', alternatives: ['Когда ты встаешь?'] },
    { type: 'choice', prompt: 'Laut Dialog: Was macht Lena nach der Uni?', options: ['Sport', 'Sie arbeitet im Café.', 'Sie schläft.'], answer: 1 },
  ],
  speak: ['Я встаю́ в семь часо́в.', 'Пото́м я умыва́юсь и за́втракаю.', 'Я ложу́сь спать в оди́ннадцать.'],
};

const l72: Lesson = {
  id: '7.2',
  unit: 7,
  title: { ru: 'Свобо́дное вре́мя', de: 'Freizeit' },
  canDo: 'Ich kann über Hobbys sprechen: Sport, Musik, Spiele.',
  speakers: { olja: S.olja, max: S.max },
  dialogs: [
    {
      title: 'Hobbys',
      lines: [
        { who: 'olja', ru: 'Макс, что ты де́лаешь в свобо́дное вре́мя?', translit: 'maks, schto ty djélajisch f swabódnaje wrjémja', de: 'Max, was machst du in deiner Freizeit?' },
        { who: 'max', ru: 'Я игра́ю в футбо́л. А ещё я игра́ю на гита́ре.', translit: 'ja igráju f fudból. a jischschó ja igráju na gitárje', de: 'Ich spiele Fußball. Und außerdem spiele ich Gitarre.', note: 'Sport/Spiele: игра́ть **в** + Akkusativ. Instrumente: игра́ть **на** + Präpositiv.' },
        { who: 'olja', ru: 'Пра́вда? Я то́же люблю́ му́зыку! Я игра́ю на пиани́но.', translit: 'práwda? ja tózhe ljubljú múzyku! ja igráju na pianína', de: 'Wirklich? Ich liebe auch Musik! Ich spiele Klavier.' },
        { who: 'max', ru: 'А Серге́й?', translit: 'a sirgéj', de: 'Und Sergej?' },
        { who: 'olja', ru: 'Серге́й занима́ется пла́ванием и о́чень лю́бит чита́ть.', translit: "sirgéj zanimájitsa pláwanijem i ótschin' ljúbit tschitát'", de: 'Sergej schwimmt und liest sehr gern.', note: '**занима́ться** + Instrumental = eine Tätigkeit betreiben: спо́ртом, пла́ванием, му́зыкой.' },
        { who: 'max', ru: 'Дава́й игра́ть вме́сте! Ты на пиани́но, а я на гита́ре!', translit: "dawáj igrát' wmjéstje! ty na pianína, a ja na gitárje", de: 'Lass uns zusammen spielen! Du am Klavier und ich auf der Gitarre!' },
        { who: 'olja', ru: 'Отли́чная иде́я!', translit: 'atlítschnaja idjéja', de: 'Tolle Idee!' },
      ],
    },
  ],
  vocab: ['свобо́дное вре́мя', 'хо́бби', 'игра́ть', 'футбо́л', 'те́ннис', 'гита́ра', 'пиани́но', 'му́зыка', 'пла́вание', 'чита́ть', 'вме́сте', 'иде́я', 'занима́ться'],
  grammar: [
    {
      title: 'игра́ть в … oder игра́ть на …?',
      blocks: [
        { table: { head: ['', 'Konstruktion', 'Beispiele'], rows: [
          ['Sport, Spiele', 'игра́ть **в** + Akkusativ', 'в футбо́л, в те́ннис, в ша́хматы'],
          ['Instrumente', 'игра́ть **на** + Präpositiv', 'на гита́ре, на пиани́но, на скри́пке'],
        ] } },
      ],
    },
    {
      title: 'занима́ться + Instrumental',
      blocks: [
        { table: { head: ['Nominativ', 'занима́ться …'], rows: [
          ['спорт', 'спо́рт**ом**'],
          ['пла́вание', 'пла́вани**ем**'],
          ['му́зыка', 'му́зык**ой**'],
          ['йо́га', 'йо́г**ой**'],
          ['ру́сский язы́к', 'ру́сск**им** язык**о́м**'],
        ] } },
        { tip: 'Instrumental-Endungen: m/n **-ом / -ем**, f **-ой / -ей** – wie bei с лимо́ном, со смета́ной.' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Я игра́ю … футбо́л.', options: ['в', 'на'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Она́ игра́ет … пиани́но.', options: ['в', 'на'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „auf der Gitarre“.', before: 'Он игра́ет на', after: '.', answer: 'гита́ре' },
    { type: 'choice', prompt: 'Я занима́юсь … (Sport)', options: ['спорт', 'спо́ртом', 'спо́рта'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Мы занима́емся … (Musik)', options: ['му́зыка', 'му́зыку', 'му́зыкой'], answer: 2, ruOptions: true },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['вме́сте', 'zusammen'], ['пла́вание', 'Schwimmen'], ['иде́я', 'Idee'], ['чита́ть', 'lesen'], ['свобо́дное вре́мя', 'Freizeit']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Ich spiele Tennis.', answer: 'Я игра́ю в те́ннис.' },
    { type: 'choice', prompt: 'Laut Dialog: Welches Instrument spielt Olja?', options: ['Gitarre', 'Klavier', 'Geige'], answer: 1 },
  ],
  speak: ['Я игра́ю в футбо́л.', 'Я игра́ю на гита́ре.', 'Что ты де́лаешь в свобо́дное вре́мя?'],
};

const l73: Lesson = {
  id: '7.3',
  unit: 7,
  title: { ru: 'Как прошли́ выходны́е?', de: 'Wie war das Wochenende?' },
  canDo: 'Ich kann erzählen, was ich gemacht habe (Vergangenheit).',
  speakers: { ip: S.ip, anna: S.anna },
  dialogs: [
    {
      title: 'Montagmorgen im Büro',
      lines: [
        { who: 'ip', ru: 'До́брое у́тро, А́нна! Как прошли́ выходны́е?', translit: 'dóbraje útra, ánna! kak praschlí wychadnýje', de: 'Guten Morgen, Anna! Wie war das Wochenende?' },
        { who: 'anna', ru: 'Отли́чно! В суббо́ту я была́ в музе́е.', translit: 'atlítschna! f subótu ja bylá w muzjéje', de: 'Super! Am Samstag war ich im Museum.', note: '**была́** – Anna ist eine Frau, deshalb -а. Ein Mann sagt **был**.' },
        { who: 'ip', ru: 'В како́м?', translit: 'f kakóm', de: 'In welchem?' },
        { who: 'anna', ru: 'В Третьяко́вской галере́е. А ве́чером мы с му́жем у́жинали в рестора́не.', translit: 'f tritjakófskaj galirjéje. a wjétschiram my s múzhym úzhynali w ristaránje', de: 'In der Tretjakow-Galerie. Und abends haben mein Mann und ich im Restaurant zu Abend gegessen.', note: '**мы с му́жем** = „wir mit dem Mann“ = mein Mann und ich.' },
        { who: 'ip', ru: 'А в воскресе́нье?', translit: "a w waskrisjén'je", de: 'Und am Sonntag?' },
        { who: 'anna', ru: 'В воскресе́нье я отдыха́ла до́ма: чита́ла и смотре́ла фильм. А вы?', translit: "w waskrisjén'je ja addychála dóma: tschitála i smatrjéla fil'm. a wy", de: 'Am Sonntag habe ich mich zu Hause erholt: gelesen und einen Film geschaut. Und Sie?' },
        { who: 'ip', ru: 'А я весь день рабо́тал.', translit: "a ja wjes' djen' rabótal", de: 'Ich habe den ganzen Tag gearbeitet.' },
      ],
    },
  ],
  vocab: ['Как прошли́ выходны́е?', 'выходны́е', 'вчера́', 'был', 'была́', 'у́жинать', 'весь день', 'галере́я'],
  grammar: [
    {
      title: 'Die Vergangenheit',
      blocks: [
        { p: 'Russisch hat nur **eine** Vergangenheitsform. Man nimmt den Infinitiv ohne **-ть** und hängt **-л** an – die Endung richtet sich nach dem **Geschlecht**, nicht nach der Person:' },
        { table: { head: ['', 'рабо́тать', 'чита́ть', 'быть (sein)'], rows: [
          ['er / ich (Mann)', 'рабо́та**л**', 'чита́**л**', '**был**'],
          ['sie / ich (Frau)', 'рабо́та**ла**', 'чита́**ла**', '**была́**'],
          ['es', 'рабо́та**ло**', 'чита́**ло**', '**бы́ло**'],
          ['wir, ihr, Sie, sie', 'рабо́та**ли**', 'чита́**ли**', '**бы́ли**'],
        ] } },
        { tip: 'я рабо́тал (ein Mann) · я рабо́тала (eine Frau) · вы рабо́тали (immer Plural, auch höflich zu einer Person).' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Anna (Frau): Вчера́ я … в кино́.', options: ['был', 'была́', 'бы́ли'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Мы … в рестора́не.', options: ['у́жинал', 'у́жинала', 'у́жинали'], answer: 2, ruOptions: true },
    { type: 'gap', prompt: 'Max (Mann): Вчера́ я весь день … (рабо́тать)', before: 'Вчера́ я весь день', after: '.', answer: 'рабо́тал' },
    { type: 'gap', prompt: 'Olja (Frau): Я … (чита́ть) кни́гу.', before: 'Я', after: 'кни́гу.', answer: 'чита́ла' },
    { type: 'choice', prompt: 'Где вы … в суббо́ту?', options: ['был', 'была́', 'бы́ли'], answer: 2, ruOptions: true },
    { type: 'translate', prompt: 'Übersetze ins Russische (als Mann).', de: 'Ich war im Museum.', answer: 'Я был в музе́е.' },
    { type: 'choice', prompt: 'Laut Dialog: Was hat Anna am Sonntag gemacht?', options: ['Museum', 'Sie hat sich zu Hause erholt.', 'Sie hat gearbeitet.'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib die Frage.', audio: 'Как прошли́ выходны́е?', answer: 'Как прошли́ выходны́е?' },
  ],
  speak: ['Как прошли́ выходны́е?', 'В суббо́ту я был в музе́е.', 'Вчера́ я весь день рабо́тал.'],
};

const l74: Lesson = {
  id: '7.4',
  unit: 7,
  title: { ru: 'Ты опя́ть опозда́л!', de: 'Du bist schon wieder zu spät!' },
  canDo: 'Ich kann mich entschuldigen und erklären, was passiert ist.',
  speakers: { olja: S.olja, max: S.max },
  dialogs: [
    {
      title: 'Treffen am Café',
      lines: [
        { who: 'olja', ru: 'Макс, ты опя́ть опозда́л!', translit: "maks, ty apját' apazdál", de: 'Max, du bist schon wieder zu spät!' },
        { who: 'max', ru: 'Извини́! Я вчера́ по́здно лёг спать и сего́дня просну́лся в де́вять.', translit: "izwiní! ja ftschirá pózna ljok spat' i siwódnja prasnúlsja w djéwit'", de: 'Entschuldige! Ich bin gestern spät schlafen gegangen und heute um neun aufgewacht.', note: '**лёг** (m) / **легла́** (f) – unregelmäßige Vergangenheit von лечь (sich hinlegen).' },
        { who: 'olja', ru: 'А что ты де́лал вчера́ ве́чером?', translit: 'a schto ty djélal ftschirá wjétschiram', de: 'Und was hast du gestern Abend gemacht?' },
        { who: 'max', ru: 'Я смотре́л футбо́л. Игра́ ко́нчилась в час но́чи!', translit: "ja smatrjél fudból. igrá kóntschilas' f tschas nótschi", de: 'Ich habe Fußball geschaut. Das Spiel war erst um eins in der Nacht zu Ende!', note: 'Reflexivverben in der Vergangenheit: nach л → **-ся** (просну́лся), nach Vokal → **-сь** (ко́нчилась).' },
        { who: 'olja', ru: 'Ну коне́чно… А ты за́втракал?', translit: 'nu kanjéschna… a ty záftrakal', de: 'Na klar … Und hast du gefrühstückt?' },
        { who: 'max', ru: 'Нет, не успе́л.', translit: 'njet, ni uspjél', de: 'Nein, dazu bin ich nicht gekommen.' },
        { who: 'olja', ru: 'Пойдём в кафе́, я то́же голо́дная.', translit: 'pajdjóm f kafé, ja tózhe galódnaja', de: 'Lass uns ins Café gehen, ich habe auch Hunger.' },
      ],
    },
  ],
  vocab: ['опя́ть', 'опозда́ть', 'просну́ться', 'лечь спать', 'ко́нчиться', 'успе́ть', 'Пойдём!', 'голо́дный', 'извини́'],
  grammar: [
    {
      title: 'Reflexive Verben in der Vergangenheit',
      blocks: [
        { table: { head: ['', 'просну́ться (aufwachen)', 'занима́ться'], rows: [
          ['er / ich (Mann)', 'просну́л**ся**', 'занима́л**ся**'],
          ['sie / ich (Frau)', 'просну́ла**сь**', 'занима́ла**сь**'],
          ['es', 'просну́ло**сь**', 'занима́ло**сь**'],
          ['Plural', 'просну́ли**сь**', 'занима́ли**сь**'],
        ] } },
        { tip: 'Die Regel bleibt: nach Konsonant **-ся**, nach Vokal **-сь**.' },
      ],
    },
    {
      title: 'Zeitangaben',
      blocks: [
        { table: { head: ['Russisch', 'Deutsch'], rows: [
          ['вчера́ ве́чером', 'gestern Abend'],
          ['сего́дня у́тром', 'heute Morgen'],
          ['за́втра днём', 'morgen Nachmittag'],
          ['в час но́чи', 'um ein Uhr nachts'],
          ['ра́но / по́здно', 'früh / spät'],
          ['опя́ть', 'schon wieder'],
        ] } },
        { tip: 'Verben wie опозда́ть, просну́ться, успе́ть beschreiben ein **abgeschlossenes Ereignis** (perfektiver Aspekt). Die Aspekte lernst du in Einheit 10 – hier reichen die Formen.' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Olja (Frau): Я … в семь. (aufgewacht)', options: ['просну́лся', 'просну́лась', 'просну́лись'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Max (Mann): Я по́здно … спать.', options: ['лёг', 'легла́', 'легли́'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Фильм … в де́сять. (endete)', options: ['ко́нчился', 'ко́нчилась', 'ко́нчились'], answer: 0, ruOptions: true },
    { type: 'gap', prompt: 'Max: Ich habe Fußball geschaut.', before: 'Я', after: 'футбо́л.', answer: 'смотре́л' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['опя́ть', 'schon wieder'], ['опозда́ть', 'sich verspäten'], ['успе́ть', 'es schaffen'], ['голо́дный', 'hungrig'], ['вчера́ ве́чером', 'gestern Abend']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Entschuldige!', answer: 'Извини́!' },
    { type: 'choice', prompt: 'Laut Dialog: Warum ist Max zu spät?', options: ['Der Bus kam nicht.', 'Er hat lange Fußball geschaut und verschlafen.', 'Er war im Café.'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Ты опя́ть опозда́л!', answer: 'Ты опя́ть опозда́л!' },
  ],
  speak: ['Извини́, я опозда́л.', 'Я просну́лся в де́вять.', 'Пойдём в кафе́!'],
};

const l75: Lesson = {
  id: '7.5',
  unit: 7,
  title: { ru: 'Как ты у́чишь ру́сский?', de: 'Wie lernst du Russisch?' },
  canDo: 'Ich kann über meine Gewohnheiten und Erlebnisse sprechen (Gegenwart und Vergangenheit).',
  speakers: { lena: S.lena, max: S.max },
  dialogs: [
    {
      title: 'Max’ Lernroutine',
      lines: [
        { who: 'lena', ru: 'Макс, ты так хорошо́ говори́шь по-ру́сски! Как ты у́чишь язы́к?', translit: 'maks, ty tak charaschó gawarísch pa-rúski! kak ty útschisch jizýk', de: 'Max, du sprichst so gut Russisch! Wie lernst du die Sprache?' },
        { who: 'max', ru: 'Ка́ждый день я занима́юсь пятна́дцать мину́т.', translit: "kázhdyj djen' ja zanimájus' pitnátsat' minút", de: 'Jeden Tag lerne ich fünfzehn Minuten.', note: '**занима́ться** heißt auch „lernen, üben“ (ohne Objekt).' },
        { who: 'max', ru: 'У́тром в метро́ я слу́шаю диало́ги, а ве́чером повторя́ю слова́.', translit: 'útram w mitró ja slúschaju dialógi, a wjétschiram paftarjáju slawá', de: 'Morgens in der U-Bahn höre ich Dialoge, und abends wiederhole ich Wörter.' },
        { who: 'lena', ru: 'А когда́ ты на́чал учи́ть ру́сский?', translit: "a kagdá ty nátschal utschít' rúskij", de: 'Und wann hast du angefangen, Russisch zu lernen?' },
        { who: 'max', ru: 'Три ме́сяца наза́д.', translit: 'tri mjésitsa nazát', de: 'Vor drei Monaten.', note: '**наза́д** steht nach der Zeitangabe: три ме́сяца наза́д = vor drei Monaten.' },
        { who: 'lena', ru: 'Молоде́ц!', translit: 'maladjéts', de: 'Gut gemacht!' },
        { who: 'max', ru: 'Спаси́бо! А вчера́ я в пе́рвый раз чита́л текст без словаря́!', translit: 'spasíba! a ftschirá ja f pjérwyj ras tschitál tjekst bis slawarjá', de: 'Danke! Und gestern habe ich zum ersten Mal einen Text ohne Wörterbuch gelesen!' },
      ],
    },
  ],
  vocab: ['язы́к', 'учи́ть', 'слу́шать', 'повторя́ть', 'сло́во', 'нача́ть', 'наза́д', 'Молоде́ц!', 'в пе́рвый раз', 'текст', 'слова́рь', 'ка́ждый'],
  grammar: [
    {
      title: 'Gegenwart oder Vergangenheit?',
      blocks: [
        { table: { head: ['Gegenwart (immer, jetzt)', 'Vergangenheit (gestern, früher)'], rows: [
          ['Я слу́шаю диало́ги.', 'Я слу́шал(а) диало́ги.'],
          ['Ка́ждый день я занима́юсь.', 'Вчера́ я занима́лся / занима́лась.'],
          ['Я чита́ю текст.', 'Я чита́л(а) текст.'],
        ] } },
        { p: '**Zeitwörter für Gewohnheiten:** ка́ждый день, обы́чно, всегда́, ча́сто. **Für die Vergangenheit:** вчера́, три дня наза́д, в пе́рвый раз.' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Вчера́ я … (lernte) два часа́. – Max', options: ['занима́юсь', 'занима́лся', 'занима́лась'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „vor“ (zeitlich).', before: 'Я на́чал учи́ть ру́сский год', after: '.', answer: 'наза́д' },
    { type: 'choice', prompt: 'Ка́ждый день я … слова́.', options: ['повторя́ю', 'повторя́л'], answer: 0, ruOptions: true },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['язы́к', 'Sprache'], ['сло́во', 'Wort'], ['слова́рь', 'Wörterbuch'], ['текст', 'Text'], ['Молоде́ц!', 'Gut gemacht!']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'vor drei Monaten', answer: 'три ме́сяца наза́д' },
    { type: 'choice', prompt: 'Laut Dialog: Wann hört Max Dialoge?', options: ['abends', 'morgens in der U-Bahn', 'am Wochenende'], answer: 1 },
    { type: 'order', prompt: 'Bilde den Satz „Jeden Tag lerne ich 15 Minuten.“', tokens: ['мину́т.', 'пятна́дцать', 'занима́юсь', 'я', 'день', 'Ка́ждый'], answer: 'Ка́ждый день я занима́юсь пятна́дцать мину́т.' },
    { type: 'dictation', prompt: 'Hör zu und schreib das Wort.', audio: 'Молоде́ц!', answer: 'Молоде́ц!' },
  ],
  speak: ['Ка́ждый день я занима́юсь пятна́дцать мину́т.', 'Я на́чал учи́ть ру́сский три ме́сяца наза́д.', 'Молоде́ц!'],
};

const l7c: Lesson = {
  id: '7.C',
  unit: 7,
  checkpoint: true,
  title: { ru: 'Контро́льная', de: 'Checkpoint Einheit 7' },
  canDo: 'Ich kann über meinen Alltag, meine Hobbys und Vergangenes sprechen.',
  speakers: {},
  dialogs: [],
  vocab: [],
  grammar: [],
  exercises: [
    { type: 'gap', prompt: 'Konjugiere встава́ть.', before: 'Когда́ вы', after: '?', answer: 'встаёте', alternatives: ['встаете'] },
    { type: 'choice', prompt: 'Я … (wasche mich)', options: ['умыва́ю', 'умыва́юсь', 'умыва́ется'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Он игра́ет … те́ннис.', options: ['в', 'на'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Мы занима́емся … (Sport)', options: ['спорт', 'спо́ртом'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Lena (Frau): Вчера́ я … до́ма.', options: ['был', 'была́', 'бы́ли'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Sie (Plural): Где вы … (рабо́тать)?', before: 'Где вы', after: 'ра́ньше?', answer: 'рабо́тали' },
    { type: 'choice', prompt: 'Max (Mann): Я … в во́семь. (aufgewacht)', options: ['просну́лся', 'просну́лась'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Hör zu: Was hat die Person gemacht?', audio: 'Вчера́ я смотре́л фильм.', options: ['einen Film geschaut', 'ein Buch gelesen', 'Fußball gespielt'], answer: 0 },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Was machst du in deiner Freizeit?', answer: 'Что ты де́лаешь в свобо́дное вре́мя?' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['ра́но', 'früh'], ['по́здно', 'spät'], ['вме́сте', 'zusammen'], ['опя́ть', 'schon wieder'], ['наза́д', 'vor (zeitlich)']] },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Я игра́ю на гита́ре.', answer: 'Я игра́ю на гита́ре.' },
    { type: 'order', prompt: 'Bilde den Satz „Nach der Arbeit mache ich Sport.“', tokens: ['спо́ртом.', 'занима́юсь', 'я', 'рабо́ты', 'По́сле'], answer: 'По́сле рабо́ты я занима́юсь спо́ртом.' },
  ],
  speak: ['Я встаю́ в семь часо́в.', 'В свобо́дное вре́мя я игра́ю в футбо́л.', 'Вчера́ я был в кино́.', 'Ка́ждый день я учу́ ру́сский.'],
};

export const UNIT7: Unit = {
  n: 7,
  title: { ru: 'Мой день', de: 'Mein Tag' },
  lessons: [l71, l72, l73, l74, l75, l7c],
};
