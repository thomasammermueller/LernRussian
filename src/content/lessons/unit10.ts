import type { Lesson, Speaker, Unit } from './types';

const S: Record<string, Speaker> = {
  max: { name: 'Макс', voice: 'dmitri', emoji: '🧑' },
  olja: { name: 'О́ля', voice: 'irina', emoji: '👩' },
  anna: { name: 'А́нна', voice: 'irina', emoji: '👩‍💼' },
  ip: { name: 'Ива́н Петро́вич', voice: 'dmitri', emoji: '👨‍💼' },
  lena: { name: 'Ле́на', voice: 'irina', emoji: '👩‍🎓' },
};

const l101: Lesson = {
  id: '10.1',
  unit: 10,
  title: { ru: 'Кем ты рабо́таешь?', de: 'Als was arbeitest du?' },
  canDo: 'Ich kann sagen, als was ich arbeite oder was ich werden möchte (Instrumental).',
  speakers: { max: S.max, lena: S.lena },
  dialogs: [
    {
      title: 'Berufswünsche',
      lines: [
        { who: 'max', ru: 'Ле́на, кем ты хо́чешь рабо́тать по́сле университе́та?', translit: "ljéna, kjem ty chótschisch rabótat' pósli uniwirsitjéta", de: 'Lena, was möchtest du nach dem Studium beruflich machen?', note: '**кем?** = als was? – Instrumental von кто.' },
        { who: 'lena', ru: 'Я хочу́ стать врачо́м. А ты кем рабо́таешь?', translit: "ja chatschú stat' wratschóm. a ty kjem rabótajisch", de: 'Ich möchte Ärztin werden. Und als was arbeitest du?', note: '**стать** + Instrumental = werden: врач → врач**о́м**.' },
        { who: 'max', ru: 'Я рабо́таю программи́стом в небольшо́й фи́рме.', translit: "ja rabótaju pragramístam w nibal'schój fírmje", de: 'Ich arbeite als Programmierer in einer kleinen Firma.' },
        { who: 'lena', ru: 'Тебе́ нра́вится твоя́ рабо́та?', translit: 'tibjé nráwitsa twajá rabóta', de: 'Gefällt dir deine Arbeit?' },
        { who: 'max', ru: 'Да, но иногда́ я рабо́таю сли́шком мно́го.', translit: 'da, no inagdá ja rabótaju slíschkam mnóga', de: 'Ja, aber manchmal arbeite ich zu viel.' },
        { who: 'lena', ru: 'А кем ты был ра́ньше?', translit: "a kjem ty byl rán'sche", de: 'Und was warst du früher?' },
        { who: 'max', ru: 'Ра́ньше я был официа́нтом. Э́то бы́ло тру́дно!', translit: "rán'sche ja byl afitsyántam. éta býla trúdna", de: 'Früher war ich Kellner. Das war schwer!', note: 'In Vergangenheit und Zukunft steht der Beruf nach быть im **Instrumental**: я был официа́нт**ом**.' },
      ],
    },
  ],
  vocab: ['Кем вы рабо́таете?', 'стать', 'программи́ст', 'небольшо́й', 'иногда́', 'сли́шком', 'ра́ньше', 'тру́дно', 'медсестра́', 'журнали́ст'],
  grammar: [
    {
      title: 'Der Instrumental (Singular)',
      blocks: [
        { table: { head: ['', 'Nominativ', 'Instrumental'], rows: [
          ['m (Konsonant)', 'программи́ст, врач', 'программи́ст**ом**, врач**о́м**'],
          ['m (-ь / -й)', 'учи́тель, Серге́й', 'учи́тел**ем**, Серге́**ем**'],
          ['f (-а)', 'медсестра́, ма́ма', 'медсестр**о́й**, ма́м**ой**'],
          ['f (-я)', 'Ю́лия', 'Ю́ли**ей**'],
          ['n', 'окно́, мо́ре', 'окн**о́м**, мо́р**ем**'],
        ] } },
        { tip: 'Nach ж, ш, ч, щ, ц steht unbetont **-ем / -ей** (му́ж**ем**, у́лиц**ей**), betont **-о́м / -о́й** (врач**о́м**, свеч**о́й**).' },
      ],
    },
    {
      title: 'Wann steht der Instrumental?',
      blocks: [
        { table: { head: ['Konstruktion', 'Beispiel'], rows: [
          ['рабо́тать кем', 'рабо́тать врачо́м'],
          ['стать кем', 'стать учи́телем'],
          ['быть кем (Vergangenheit / Zukunft)', 'я был официа́нтом, бу́ду инжене́ром'],
          ['занима́ться чем', 'занима́ться спо́ртом'],
          ['с кем / с чем', 'с дру́гом, с лимо́ном'],
        ] } },
        { p: 'Im **Präsens** ohne Verb bleibt der Nominativ: Я врач. – aber: Я рабо́таю врачо́м.' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Он рабо́тает … (Arzt)', options: ['врач', 'врача́', 'врачо́м'], answer: 2, ruOptions: true },
    { type: 'choice', prompt: 'Она́ хо́чет стать … (Lehrerin)', options: ['учи́тельница', 'учи́тельницей', 'учи́тельницу'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze den Instrumental von инжене́р.', before: 'Мой брат рабо́тает', after: '.', answer: 'инжене́ром' },
    { type: 'choice', prompt: 'Ра́ньше я был … (Student)', options: ['студе́нт', 'студе́нтом', 'студе́нта'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Я … (Präsens, ohne Verb: „Ich bin Programmierer.“)', options: ['программи́ст', 'программи́стом'], answer: 0, ruOptions: true },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['иногда́', 'manchmal'], ['сли́шком', 'zu (sehr)'], ['ра́ньше', 'früher'], ['тру́дно', 'schwer'], ['стать', 'werden']] },
    { type: 'translate', prompt: 'Frag auf Russisch.', de: 'Als was arbeiten Sie?', answer: 'Кем вы рабо́таете?' },
    { type: 'choice', prompt: 'Laut Dialog: Was war Max früher?', options: ['Programmierer', 'Kellner', 'Arzt'], answer: 1 },
  ],
  speak: ['Кем вы рабо́таете?', 'Я рабо́таю инжене́ром.', 'Я хочу́ стать врачо́м.'],
};

const l102: Lesson = {
  id: '10.2',
  unit: 10,
  title: { ru: 'С кем?', de: 'Mit wem?' },
  canDo: 'Ich kann sagen, mit wem ich etwas mache (с + Instrumental, Pronomen).',
  speakers: { ip: S.ip, anna: S.anna },
  dialogs: [
    {
      title: 'Ein neues Projekt',
      lines: [
        { who: 'ip', ru: 'А́нна, с кем вы рабо́таете над но́вым прое́ктом?', translit: 'ánna, s kjem wy rabótajitje nad nówym prajéktam', de: 'Anna, mit wem arbeiten Sie am neuen Projekt?', note: '**рабо́тать над** + Instrumental = an etwas arbeiten.' },
        { who: 'anna', ru: 'С на́шими колле́гами из Петербу́рга.', translit: 'z náschymi kaljégami is pitirbúrga', de: 'Mit unseren Kollegen aus Petersburg.' },
        { who: 'ip', ru: 'Вы уже́ говори́ли с ни́ми?', translit: 'wy uzhé gawaríli s nimi', de: 'Haben Sie schon mit ihnen gesprochen?', note: 'Nach Präpositionen bekommen его́, её, их ein **н**: с **н**им, с **н**ей, с **н**и́ми.' },
        { who: 'anna', ru: 'Да, вчера́ я говори́ла с дире́ктором по телефо́ну.', translit: 'da, ftschirá ja gawaríla z dirjéktaram pa tilifónu', de: 'Ja, gestern habe ich mit dem Direktor telefoniert.' },
        { who: 'ip', ru: 'И как он?', translit: 'i kak on', de: 'Und, wie ist er?' },
        { who: 'anna', ru: 'О́чень интере́сный челове́к. За́втра у нас встре́ча с ним.', translit: "ótschin' intirjésnyj tschilawjék. záftra u nas fstrjétscha s nim", de: 'Ein sehr interessanter Mensch. Morgen haben wir ein Treffen mit ihm.' },
        { who: 'ip', ru: 'Мо́жно, я пойду́ с ва́ми?', translit: 'mózhna, ja pajdú s wámi', de: 'Darf ich mit Ihnen gehen?' },
        { who: 'anna', ru: 'Коне́чно! Пойдёмте вме́сте.', translit: 'kanjéschna! pajdjómtje wmjéstje', de: 'Natürlich! Gehen wir zusammen.' },
      ],
    },
  ],
  vocab: ['С кем?', 'колле́га', 'дире́ктор', 'по телефо́ну', 'со мной', 'с тобо́й', 'с ним', 'с ней', 'с ва́ми', 'с ни́ми', 'Пойдёмте!'],
  grammar: [
    {
      title: 'Personalpronomen im Instrumental',
      blocks: [
        { table: { head: ['я', 'ты', 'он', 'она́', 'мы', 'вы', 'они́'], rows: [
          ['(со) мной', '(с) тобо́й', '(с) ним', '(с) ней', '(с) на́ми', '(с) ва́ми', '(с) ни́ми'],
        ] } },
        { tip: 'Vor мной heißt es **со**: Пойдём **со мной**! (Komm mit mir!)' },
        { p: '**Мы с ва́ми / мы с му́жем:** „Wir mit Ihnen / mit meinem Mann“ = Sie und ich / mein Mann und ich.' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Пойдём … ! (mit mir)', options: ['с я', 'со мной', 'с меня́'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Я говори́л … (mit ihr)', options: ['с ей', 'с ней', 'с её'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Мы рабо́таем … (mit ihnen)', options: ['с ни́ми', 'с и́ми', 'с их'], answer: 0, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „mit dem Direktor“.', before: 'Я говори́ла с', after: '.', answer: 'дире́ктором' },
    { type: 'gap', prompt: 'Ergänze „mit Olja“.', before: 'Макс идёт в кино́ с', after: '.', answer: 'О́лей' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['с тобо́й', 'mit dir'], ['с ним', 'mit ihm'], ['с ва́ми', 'mit Ihnen'], ['с на́ми', 'mit uns'], ['колле́га', 'Kollege']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Mit wem arbeitest du?', answer: 'С кем ты рабо́таешь?' },
    { type: 'choice', prompt: 'Laut Dialog: Mit wem hat Anna gestern telefoniert?', options: ['mit Iwan Petrowitsch', 'mit dem Direktor', 'mit ihrem Mann'], answer: 1 },
  ],
  speak: ['С кем ты рабо́таешь?', 'Пойдём со мной!', 'За́втра у нас встре́ча с ним.'],
};

const l103: Lesson = {
  id: '10.3',
  unit: 10,
  title: { ru: 'Ты прочита́л кни́гу?', de: 'Hast du das Buch durchgelesen?' },
  canDo: 'Ich kann zwischen Vorgang und Ergebnis unterscheiden (Verbaspekte).',
  speakers: { olja: S.olja, max: S.max },
  dialogs: [
    {
      title: 'Gestern Abend',
      lines: [
        { who: 'olja', ru: 'Макс, что ты де́лал вчера́ ве́чером?', translit: 'maks, schto ty djélal ftschirá wjétschiram', de: 'Max, was hast du gestern Abend gemacht?' },
        { who: 'max', ru: 'Я писа́л письмо́ и чита́л кни́гу.', translit: 'ja pisál pis\'mó i tschitál knígu', de: 'Ich habe einen Brief geschrieben und ein Buch gelesen.', note: '**писа́л, чита́л** (imperfektiv): Es geht um die Tätigkeit, nicht ums Ergebnis.' },
        { who: 'olja', ru: 'Ты прочита́л кни́гу?', translit: 'ty pratschitál knígu', de: 'Hast du das Buch durchgelesen?', note: '**прочита́л** (perfektiv): Ergebnis – fertig gelesen.' },
        { who: 'max', ru: 'Нет, ещё не прочита́л. Она́ о́чень дли́нная. Но письмо́ я уже́ написа́л!', translit: "njet, jischschó ni pratschitál. aná ótschin' dlínnaja. no pis'mó ja uzhé napisál", de: 'Nein, noch nicht. Es ist sehr lang. Aber den Brief habe ich schon fertig geschrieben!' },
        { who: 'olja', ru: 'Молоде́ц! А ты сде́лал дома́шнее зада́ние по ру́сскому?', translit: 'maladjéts! a ty zdjélal damáschnije zadánije pa rúskamu', de: 'Gut gemacht! Und hast du die Russisch-Hausaufgabe gemacht?' },
        { who: 'max', ru: 'Ой… Я де́лал его́ два часа́, но не сде́лал. Ты мне помо́жешь?', translit: 'oj… ja djélal jiwó dwa tschisá, no ni zdjélal. ty mnje pamózhysch', de: 'Oje … Ich habe zwei Stunden daran gesessen, bin aber nicht fertig geworden. Hilfst du mir?', note: 'Perfekt erklärt: **де́лал два часа́** (Dauer, Vorgang) – **не сде́лал** (kein Ergebnis).' },
        { who: 'olja', ru: 'Коне́чно, помогу́!', translit: 'kanjéschna, pamagú', de: 'Natürlich helfe ich dir!' },
      ],
    },
  ],
  vocab: ['кни́га', 'письмо́', 'сде́лать', 'прочита́ть', 'написа́ть', 'дли́нный', 'дома́шнее зада́ние', 'помо́чь'],
  grammar: [
    {
      title: 'Die Verbaspekte: imperfektiv und perfektiv',
      blocks: [
        { p: 'Fast jedes russische Verb gibt es **zweimal**: einmal für den Vorgang (imperfektiv, **НСВ**) und einmal für das abgeschlossene Ergebnis (perfektiv, **СВ**).' },
        { table: { head: ['imperfektiv (Vorgang)', 'perfektiv (Ergebnis)', 'Deutsch'], rows: [
          ['де́лать', 'сде́лать', 'machen'],
          ['чита́ть', 'прочита́ть', 'lesen'],
          ['писа́ть', 'написа́ть', 'schreiben'],
          ['смотре́ть', 'посмотре́ть', 'schauen'],
          ['учи́ть', 'вы́учить', 'lernen'],
          ['покупа́ть', 'купи́ть', 'kaufen'],
          ['говори́ть', 'сказа́ть', 'sagen'],
        ] } },
        { table: { head: ['imperfektiv bei …', 'perfektiv bei …'], rows: [
          ['Dauer: два часа́, весь день', 'Ergebnis: уже́, наконе́ц'],
          ['Wiederholung: ка́ждый день, ча́сто', 'einmaliger Abschluss: вчера́ я купи́л …'],
          ['Frage nach der Tätigkeit: Что ты де́лал?', 'Frage nach dem Ergebnis: Ты сде́лал?'],
        ] } },
        { tip: 'Viele perfektive Verben entstehen durch eine **Vorsilbe** (с-, про-, на-, по-, вы́-). Lerne die Paare zusammen!' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Вчера́ я весь день … (lesen, Vorgang)', options: ['чита́л', 'прочита́л'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Я уже́ … письмо́. (fertig geschrieben)', options: ['писа́л', 'написа́л'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Ка́ждый день я … фи́льмы по-ру́сски.', options: ['смотрю́', 'посмотрю́'], answer: 0, ruOptions: true, explain: 'Wiederholung (ка́ждый день) → imperfektiv.' },
    { type: 'match', prompt: 'Ordne die Aspektpaare zu.', pairs: [['де́лать', 'сде́лать'], ['чита́ть', 'прочита́ть'], ['писа́ть', 'написа́ть'], ['учи́ть', 'вы́учить'], ['покупа́ть', 'купи́ть']] },
    { type: 'gap', prompt: 'Ergänze das perfektive Verb („Hast du die Hausaufgabe gemacht?“).', before: 'Ты', after: 'дома́шнее зада́ние?', answer: 'сде́лал' },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Hilfst du mir?', answer: 'Ты мне помо́жешь?', alternatives: ['Ты помо́жешь мне?'] },
    { type: 'choice', prompt: 'Laut Dialog: Was hat Max fertig gemacht?', options: ['das Buch', 'den Brief', 'die Hausaufgabe'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Я ещё не прочита́л кни́гу.', answer: 'Я ещё не прочита́л кни́гу.' },
  ],
  speak: ['Что ты де́лал вчера́?', 'Я уже́ написа́л письмо́.', 'Ты мне помо́жешь?'],
};

const l104: Lesson = {
  id: '10.4',
  unit: 10,
  title: { ru: 'Экза́мен', de: 'Die Prüfung' },
  canDo: 'Ich kann über Prüfungen und Lernpläne sprechen (Aspekte in der Zukunft).',
  speakers: { lena: S.lena, max: S.max },
  dialogs: [
    {
      title: 'Vor der Prüfung',
      lines: [
        { who: 'lena', ru: 'За́втра у меня́ экза́мен по исто́рии.', translit: 'záftra u minjá ekzámin pa istórii', de: 'Morgen habe ich eine Prüfung in Geschichte.' },
        { who: 'max', ru: 'Ты гото́ва?', translit: 'ty gatówa', de: 'Bist du vorbereitet?' },
        { who: 'lena', ru: 'Не совсе́м. Сего́дня ве́чером я бу́ду занима́ться.', translit: "ni safsjém. siwódnja wjétschiram ja búdu zanimátsa", de: 'Nicht ganz. Heute Abend werde ich lernen.', note: '**бу́ду занима́ться** – Zukunft des Vorgangs (imperfektiv).' },
        { who: 'max', ru: 'Ско́лько тебе́ ещё ну́жно вы́учить?', translit: "skól'ka tibjé jischschó núzhna wýutschit'", de: 'Wie viel musst du noch lernen?' },
        { who: 'lena', ru: 'Два́дцать вопро́сов. Я вы́учу их за ночь!', translit: "dwátsat' waprósaf. ja wýutschu ich za notsch'", de: 'Zwanzig Fragen. Ich lerne sie in einer Nacht!', note: '**вы́учу** – perfektive Zukunft: Das Ergebnis wird erreicht. Sie wird ohne бу́ду gebildet!' },
        { who: 'max', ru: 'Уда́чи! Позвони́ мне по́сле экза́мена.', translit: 'udátschi! pazwaní mnje pósli ekzámina', de: 'Viel Glück! Ruf mich nach der Prüfung an.' },
        { who: 'max', ru: 'Ну как? Сдала́?', translit: 'nu kak? zdalá', de: 'Na, wie war’s? Bestanden?' },
        { who: 'lena', ru: 'Сдала́! На пятёрку!', translit: 'zdalá! na pitjórku', de: 'Bestanden! Mit einer Eins!', note: 'In Russland ist **5 (пятёрка)** die beste Note, 2 (дво́йка) heißt durchgefallen.' },
      ],
    },
  ],
  vocab: ['экза́мен', 'исто́рия', 'гото́в', 'не совсе́м', 'вы́учить', 'вопро́с', 'Уда́чи!', 'сдать экза́мен', 'пятёрка', 'оце́нка'],
  grammar: [
    {
      title: 'Zukunft: imperfektiv oder perfektiv?',
      blocks: [
        { table: { head: ['', 'imperfektiv: бу́ду + Infinitiv', 'perfektiv: konjugiert'], rows: [
          ['Bedeutung', 'Vorgang, Dauer', 'Ergebnis, Abschluss'],
          ['я', 'бу́ду учи́ть', 'вы́учу'],
          ['ты', 'бу́дешь чита́ть', 'прочита́ешь'],
          ['он / она́', 'бу́дет писа́ть', 'напи́шет'],
          ['мы', 'бу́дем де́лать', 'сде́лаем'],
        ] } },
        { tip: 'Perfektive Verben haben **kein Präsens**: Ihre „Präsensform“ bedeutet Zukunft. Я сде́лаю = Ich werde (es) machen / erledigen.' },
        { p: '**сдава́ть** экза́мен = eine Prüfung ablegen (Vorgang) · **сдать** экза́мен = bestehen (Ergebnis).' },
      ],
    },
    {
      title: 'Russische Noten',
      blocks: [
        { table: { head: ['Note', 'Wort', 'Bedeutung'], rows: [
          ['5', 'пятёрка (отли́чно)', 'sehr gut'],
          ['4', 'четвёрка (хорошо́)', 'gut'],
          ['3', 'тро́йка (удовлетвори́тельно)', 'befriedigend'],
          ['2', 'дво́йка (пло́хо)', 'nicht bestanden'],
        ] } },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Сего́дня ве́чером я … (werde lernen, Vorgang)', options: ['бу́ду учи́ть', 'вы́учу'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Не волну́йся, я всё … (werde erledigen)', options: ['бу́ду де́лать', 'сде́лаю'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Perfektive Zukunft von написа́ть (я).', before: 'За́втра я', after: 'письмо́.', answer: 'напишу́' },
    { type: 'choice', prompt: 'Welches ist die beste Note?', options: ['дво́йка', 'тро́йка', 'пятёрка'], answer: 2, ruOptions: true },
    { type: 'choice', prompt: '„Ich habe die Prüfung bestanden.“ (Frau)', options: ['Я сдава́ла экза́мен.', 'Я сдала́ экза́мен.'], answer: 1, ruOptions: true },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['экза́мен', 'Prüfung'], ['вопро́с', 'Frage'], ['оце́нка', 'Note'], ['Уда́чи!', 'Viel Glück!'], ['не совсе́м', 'nicht ganz']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Viel Glück!', answer: 'Уда́чи!' },
    { type: 'choice', prompt: 'Laut Dialog: Welche Note bekommt Lena?', options: ['3', '4', '5'], answer: 2 },
  ],
  speak: ['За́втра у меня́ экза́мен.', 'Сего́дня я бу́ду занима́ться.', 'Уда́чи!'],
};

const l105: Lesson = {
  id: '10.5',
  unit: 10,
  title: { ru: 'Собесе́дование', de: 'Das Vorstellungsgespräch' },
  canDo: 'Ich kann mich in einem einfachen Vorstellungsgespräch vorstellen.',
  speakers: { ip: S.ip, max: S.max },
  dialogs: [
    {
      title: 'Max bewirbt sich in Moskau',
      lines: [
        { who: 'ip', ru: 'Расскажи́те немно́го о себе́.', translit: 'rasskazhýtje nimnóga a sibjé', de: 'Erzählen Sie ein wenig über sich.', note: '**о** + Präpositiv = über: о себе́ (über sich), о рабо́те.' },
        { who: 'max', ru: 'Меня́ зову́т Макс Ве́бер. Я рабо́таю программи́стом уже́ пять лет.', translit: "minjá zawút maks wjébir. ja rabótaju pragramístam uzhé pjat' ljet", de: 'Ich heiße Max Weber. Ich arbeite schon seit fünf Jahren als Programmierer.', note: '**уже́ пять лет** = schon seit fünf Jahren – mit Präsens!' },
        { who: 'ip', ru: 'Где вы учи́лись?', translit: 'gdje wy utschílis\'', de: 'Wo haben Sie studiert?' },
        { who: 'max', ru: 'Я учи́лся в Мю́нхене, в техни́ческом университе́те.', translit: 'ja utschílsja w mjúnchinje, f tichnítschiskam uniwirsitjétje', de: 'Ich habe in München studiert, an der Technischen Universität.', note: '**учи́ться** (wo?) = studieren / zur Schule gehen · **учи́ть** (was?) = etwas lernen.' },
        { who: 'ip', ru: 'Вы говори́те по-ру́сски?', translit: 'wy gawarítje pa-rúski', de: 'Sprechen Sie Russisch?' },
        { who: 'max', ru: 'Да, но я ещё учу́ язы́к. Я занима́юсь ка́ждый день.', translit: "da, no ja jischschó utschú jizýk. ja zanimájus' kázhdyj djen'", de: 'Ja, aber ich lerne die Sprache noch. Ich übe jeden Tag.' },
        { who: 'ip', ru: 'Почему́ вы хоти́те рабо́тать у нас?', translit: "patschimú wy chatítje rabótat' u nas", de: 'Warum möchten Sie bei uns arbeiten?' },
        { who: 'max', ru: 'Мне о́чень интере́сно рабо́тать с ва́шей кома́ндой.', translit: "mnje ótschin' intirjésna rabótat' s wáschej kamándaj", de: 'Es interessiert mich sehr, mit Ihrem Team zu arbeiten.' },
        { who: 'ip', ru: 'Хорошо́. Мы вам позвони́м.', translit: 'charaschó. my wam pazwaním', de: 'Gut. Wir rufen Sie an.' },
      ],
    },
  ],
  vocab: ['собесе́дование', 'Расскажи́те о себе́.', 'о', 'учи́ться', 'техни́ческий', 'кома́нда', 'у нас', 'о́пыт'],
  grammar: [
    {
      title: 'учи́ть, учи́ться, занима́ться',
      blocks: [
        { table: { head: ['Verb', 'Bedeutung', 'Beispiel'], rows: [
          ['учи́ть + Akkusativ', 'etwas lernen', 'Я учу́ ру́сский язы́к / слова́.'],
          ['учи́ться + где', 'studieren, Schüler sein', 'Я учу́сь в университе́те.'],
          ['занима́ться', 'lernen, üben (Tätigkeit)', 'Я занима́юсь ка́ждый день.'],
        ] } },
      ],
    },
    {
      title: 'Seit wann? – уже́ + Präsens',
      blocks: [
        { p: 'Etwas, das noch andauert, steht im **Präsens**: Я **рабо́таю** здесь уже́ пять лет = Ich arbeite hier seit fünf Jahren.' },
        { tip: 'Typischer Fehler Deutschsprachiger: *Я рабо́тал здесь пять лет* bedeutet „Ich habe hier (früher) fünf Jahre gearbeitet“ – das ist vorbei!' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Я … в университе́те. (studiere)', options: ['учу́', 'учу́сь'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Я … но́вые слова́. (lerne)', options: ['учу́', 'учу́сь'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: '„Ich wohne seit drei Jahren in Berlin.“', options: ['Я жил в Берли́не три го́да.', 'Я живу́ в Берли́не уже́ три го́да.'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „über sich“.', before: 'Расскажи́те о', after: '.', answer: 'себе́' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['собесе́дование', 'Vorstellungsgespräch'], ['кома́нда', 'Team'], ['о́пыт', 'Erfahrung'], ['у нас', 'bei uns'], ['техни́ческий', 'technisch']] },
    { type: 'translate', prompt: 'Frag auf Russisch.', de: 'Wo haben Sie studiert?', answer: 'Где вы учи́лись?' },
    { type: 'choice', prompt: 'Laut Dialog: Wo hat Max studiert?', options: ['in Berlin', 'in München', 'in Moskau'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Расскажи́те немно́го о себе́.', answer: 'Расскажи́те немно́го о себе́.' },
  ],
  speak: ['Расскажи́те о себе́.', 'Я рабо́таю здесь уже́ два го́да.', 'Я учи́лся в Берли́не.'],
};

const l10c: Lesson = {
  id: '10.C',
  unit: 10,
  checkpoint: true,
  title: { ru: 'Контро́льная', de: 'Checkpoint Einheit 10' },
  canDo: 'Ich kann über Beruf, Studium und Pläne sprechen und die Verbaspekte unterscheiden.',
  speakers: {},
  dialogs: [],
  vocab: [],
  grammar: [],
  exercises: [
    { type: 'choice', prompt: 'Моя́ сестра́ рабо́тает … (Ärztin)', options: ['врач', 'врачо́м', 'врача́'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Я хочу́ стать … (Ingenieur)', options: ['инжене́р', 'инжене́ром', 'инжене́ра'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Ты пойдёшь … ? (mit mir)', options: ['со мной', 'с мне', 'с меня́'], answer: 0, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „mit ihm“.', before: 'Я говори́ла с', after: 'вчера́.', answer: 'ним' },
    { type: 'choice', prompt: 'Вчера́ я три часа́ … (las)', options: ['чита́л', 'прочита́л'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Наконе́ц я … кни́гу! (fertig gelesen)', options: ['чита́л', 'прочита́л'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'За́втра я … э́то. (werde erledigen)', options: ['сде́лаю', 'де́лаю', 'сде́лал'], answer: 0, ruOptions: true },
    { type: 'match', prompt: 'Ordne die Aspektpaare zu.', pairs: [['смотре́ть', 'посмотре́ть'], ['говори́ть', 'сказа́ть'], ['писа́ть', 'написа́ть'], ['де́лать', 'сде́лать'], ['учи́ть', 'вы́учить']] },
    { type: 'translate', prompt: 'Frag auf Russisch.', de: 'Als was arbeitest du?', answer: 'Кем ты рабо́таешь?' },
    { type: 'choice', prompt: 'Hör zu: Was hat die Person gemacht?', audio: 'Я сдала́ экза́мен.', options: ['Sie hat die Prüfung bestanden.', 'Sie lernt für die Prüfung.', 'Sie ist durchgefallen.'], answer: 0 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Я учу́сь в университе́те.', answer: 'Я учу́сь в университе́те.' },
    { type: 'order', prompt: 'Bilde den Satz „Ich arbeite schon fünf Jahre hier.“', tokens: ['лет.', 'пять', 'уже́', 'здесь', 'рабо́таю', 'Я'], answer: 'Я рабо́таю здесь уже́ пять лет.' },
  ],
  speak: ['Я рабо́таю программи́стом.', 'Я уже́ сде́лал дома́шнее зада́ние.', 'За́втра я бу́ду занима́ться.', 'Расскажи́те о себе́.'],
};

export const UNIT10: Unit = {
  n: 10,
  title: { ru: 'Рабо́та и учёба', de: 'Arbeit & Studium' },
  lessons: [l101, l102, l103, l104, l105, l10c],
};
