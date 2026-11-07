import type { Lesson, Speaker, Unit } from './types';

const S: Record<string, Speaker> = {
  max: { name: 'Макс', voice: 'dmitri', emoji: '🧑' },
  olja: { name: 'О́ля', voice: 'irina', emoji: '👩' },
  anna: { name: 'А́нна', voice: 'irina', emoji: '👩‍💼' },
  ip: { name: 'Ива́н Петро́вич', voice: 'dmitri', emoji: '👨‍💼' },
  lena: { name: 'Ле́на', voice: 'irina', emoji: '👩‍🎓' },
};

const l21: Lesson = {
  id: '2.1',
  unit: 2,
  title: { ru: 'Э́то моя́ семья́', de: 'Das ist meine Familie' },
  canDo: 'Ich kann Familienmitglieder vorstellen und sagen, wem etwas gehört.',
  speakers: { olja: S.olja, max: S.max },
  dialogs: [
    {
      title: 'Olja zeigt ein Familienfoto',
      lines: [
        { who: 'olja', ru: 'Смотри́, э́то моя́ семья́.', translit: 'smatrí, éta majá simjá', de: 'Schau, das ist meine Familie.', note: '**моя́**, weil семья́ weiblich ist (Endung -я).' },
        { who: 'max', ru: 'Кто э́то? Твоя́ ма́ма?', translit: 'kto éta? twajá máma', de: 'Wer ist das? Deine Mama?' },
        { who: 'olja', ru: 'Да, э́то моя́ ма́ма, а э́то мой па́па.', translit: 'da, éta majá máma, a éta moj pápa', de: 'Ja, das ist meine Mama, und das ist mein Papa.', note: 'па́па endet auf -а, ist aber ein Mann – also männlich: **мой** па́па.' },
        { who: 'max', ru: 'А э́то твой брат?', translit: 'a éta twoj brat', de: 'Und ist das dein Bruder?' },
        { who: 'olja', ru: 'Нет, э́то мой муж, Серге́й!', translit: 'njet, éta moj musch, sirgéj', de: 'Nein, das ist mein Mann, Sergej!', note: 'муж: ж am Wortende klingt wie [sch].' },
        { who: 'max', ru: 'Ой, извини́! А э́то кто?', translit: 'oj, izwiní! a éta kto', de: 'Oh, Entschuldigung! Und wer ist das?' },
        { who: 'olja', ru: 'Э́то на́ша соба́ка, Бим.', translit: 'éta náscha sabáka, bim', de: 'Das ist unser Hund, Bim.', note: 'Bei Tieren fragt man **кто?** – wie bei Menschen.' },
        { who: 'max', ru: 'Класс! А вот моё фо́то.', translit: 'klass! a wot majó fóta', de: 'Toll! Und hier ist mein Foto.', note: 'фо́то ist sächlich → **моё**.' },
      ],
    },
  ],
  vocab: ['семья́', 'ма́ма', 'па́па', 'брат', 'сестра́', 'муж', 'жена́', 'моя́', 'моё', 'мои́', 'твой', 'наш', 'ваш', 'соба́ка', 'фо́то', 'Смотри́!', 'вот'],
  grammar: [
    {
      title: 'Das Genus der Substantive',
      blocks: [
        { p: 'Russisch hat drei Geschlechter. Meist verrät es die **Endung**:' },
        { table: { head: ['', 'Endung', 'Beispiele'], rows: [
          ['männlich (m)', 'Konsonant, -й', 'брат, дом, муж, музе́й'],
          ['weiblich (f)', '-а, -я', 'ма́ма, сестра́, семья́'],
          ['sächlich (n)', '-о, -е', 'фо́то, окно́, мо́ре'],
        ] } },
        { tip: 'Ausnahmen: Männer auf -а/-я sind **männlich**: па́па, де́душка, мужчи́на. Wörter auf **-ь** können m oder f sein: день (m), мать (f) – mitlernen!' },
      ],
    },
    {
      title: 'mein, dein, unser, euer',
      blocks: [
        { table: { head: ['', 'm', 'f', 'n', 'Plural'], rows: [
          ['mein', 'мой', 'моя́', 'моё', 'мои́'],
          ['dein', 'твой', 'твоя́', 'твоё', 'твои́'],
          ['unser', 'наш', 'на́ша', 'на́ше', 'на́ши'],
          ['euer / Ihr', 'ваш', 'ва́ша', 'ва́ше', 'ва́ши'],
        ] } },
        { p: 'Das Possessivpronomen richtet sich nach dem **Besitz**, nicht nach dem Besitzer: Макс: „**моя́** сестра́“ – О́ля: „**мой** брат“.' },
        { tip: '**его́** (sein), **её** (ihr) und **их** (ihr, Plural) ändern sich nie: его́ сестра́, его́ брат.' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Welches Geschlecht hat **сестра́**?', options: ['männlich', 'weiblich', 'sächlich'], answer: 1 },
    { type: 'choice', prompt: 'Welches Geschlecht hat **па́па**?', options: ['männlich', 'weiblich', 'sächlich'], answer: 0, explain: 'Männer sind männlich – auch mit der Endung -а.' },
    { type: 'gap', prompt: 'Ergänze „meine“.', before: 'Э́то', after: 'сестра́.', answer: 'моя́' },
    { type: 'choice', prompt: '___ фо́то (mein Foto)', options: ['мой', 'моя́', 'моё'], answer: 2, ruOptions: true },
    { type: 'choice', prompt: '___ соба́ка (unser Hund)', options: ['наш', 'на́ша', 'на́ше'], answer: 1, ruOptions: true },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Das ist mein Bruder.', answer: 'Э́то мой брат.' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['муж', 'Ehemann'], ['жена́', 'Ehefrau'], ['семья́', 'Familie'], ['соба́ка', 'Hund'], ['вот', 'hier ist']] },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Э́то моя́ семья́.', answer: 'Э́то моя́ семья́.' },
  ],
  speak: ['Э́то моя́ семья́.', 'Э́то мой брат.', 'А вот моё фо́то.'],
};

const l22: Lesson = {
  id: '2.2',
  unit: 2,
  title: { ru: 'У тебя́ есть брат?', de: 'Hast du einen Bruder?' },
  canDo: 'Ich kann sagen, wen oder was ich habe – und was nicht.',
  speakers: { lena: S.lena, max: S.max },
  dialogs: [
    {
      title: 'Lena und Max unterhalten sich',
      lines: [
        { who: 'lena', ru: 'Макс, у тебя́ есть брат и́ли сестра́?', translit: "maks, u tibjá jest' brat íli sistrá", de: 'Max, hast du einen Bruder oder eine Schwester?', note: '**у тебя́ есть** heißt wörtlich „bei dir ist“ – so drückt man „haben“ aus.' },
        { who: 'max', ru: 'У меня́ есть сестра́. Её зову́т Ю́лия. А у тебя́?', translit: "u minjá jest' sistrá. jijó zawút júlija. a u tibjá", de: 'Ich habe eine Schwester. Sie heißt Julia. Und du?' },
        { who: 'lena', ru: 'У меня́ есть брат. Его́ зову́т Ди́ма.', translit: "u minjá jest' brat. jiwó zawút díma", de: 'Ich habe einen Bruder. Er heißt Dima.' },
        { who: 'max', ru: 'А сестра́?', translit: 'a sistrá', de: 'Und eine Schwester?' },
        { who: 'lena', ru: 'Сестры́ нет. Но у меня́ есть кот!', translit: "sistrý njet. no u minjá jest' kot", de: 'Eine Schwester habe ich nicht. Aber ich habe einen Kater!', note: 'Nach **нет** („es gibt nicht“) ändert sich die Endung: сестра́ → сестры́ (Genitiv).' },
        { who: 'max', ru: 'А у меня́ нет кота́, но у меня́ есть соба́ка.', translit: "a u minjá njet katá, no u minjá jest' sabáka", de: 'Ich habe keinen Kater, aber ich habe einen Hund.', note: 'кот → **кота́**: männliche Wörter bekommen nach нет die Endung **-а**.' },
      ],
    },
  ],
  vocab: ['У меня́ есть …', 'У тебя́ есть …?', 'У меня́ нет …', 'и́ли', 'кот', 'ко́шка', 'соба́ка'],
  grammar: [
    {
      title: '„haben“ auf Russisch: у меня́ есть',
      blocks: [
        { p: 'Russisch sagt nicht „ich habe“, sondern „**bei mir ist**“: **у меня́ есть** + das, was man hat (Nominativ).' },
        { table: { head: ['ich habe', 'du hast', 'er / sie hat', 'wir haben', 'ihr habt / Sie haben', 'sie haben'], rows: [
          ['у меня́ есть', 'у тебя́ есть', 'у него́ / у неё есть', 'у нас есть', 'у вас есть', 'у них есть'],
        ] } },
        { tip: 'Nach **у** bekommen его́, её, их ein **н**: у **н**его́, у **н**её, у **н**их.' },
      ],
    },
    {
      title: '„nicht haben“: у меня́ нет + Genitiv',
      blocks: [
        { p: 'Ohne есть, dafür mit **нет** – und das Wort steht im **Genitiv**:' },
        { table: { head: ['Nominativ', 'у меня́ нет …', 'Regel'], rows: [
          ['брат', 'бра́т**а**', 'm: + а'],
          ['кот', 'кот**а́**', 'm: + а'],
          ['сестра́', 'сестр**ы́**', 'f: -а → -ы'],
          ['соба́ка', 'соба́к**и**', 'nach к, г, х, ж, ш, ч, щ: -и'],
        ] } },
      ],
    },
  ],
  exercises: [
    { type: 'gap', prompt: 'Ergänze „ich habe“.', before: 'У', after: 'есть брат.', answer: 'меня́' },
    { type: 'choice', prompt: '„Ich habe keine Schwester.“', options: ['У меня́ нет сестры́.', 'У меня́ нет сестра́.', 'У меня́ есть сестра́.'], answer: 0, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze die Genitiv-Form von брат.', before: 'У меня́ нет', after: '.', answer: 'бра́та' },
    { type: 'choice', prompt: 'Hör zu: Was hat die Person?', audio: 'У меня́ есть кот.', options: ['einen Hund', 'einen Kater', 'einen Bruder'], answer: 1 },
    { type: 'choice', prompt: '„Hat er eine Schwester?“ – У ___ есть сестра́?', options: ['его́', 'него́', 'он'], answer: 1, ruOptions: true, explain: 'Nach **у** kommt ein н dazu: у **него́**.' },
    { type: 'order', prompt: 'Bilde die Frage „Hast du einen Hund?“', tokens: ['соба́ка?', 'тебя́', 'есть', 'У'], answer: 'У тебя́ есть соба́ка?' },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Ich habe einen Bruder.', answer: 'У меня́ есть брат.' },
    { type: 'choice', prompt: 'Laut Dialog: Wie heißt Lenas Bruder?', options: ['Ди́ма', 'Макс', 'Серге́й'], answer: 0, ruOptions: true },
  ],
  speak: ['У меня́ есть брат.', 'У тебя́ есть сестра́?', 'У меня́ нет кота́.'],
};

const l23: Lesson = {
  id: '2.3',
  unit: 2,
  title: { ru: 'Кто вы по профе́ссии?', de: 'Was sind Sie von Beruf?' },
  canDo: 'Ich kann Berufe nennen und sagen, wo jemand arbeitet.',
  speakers: { ip: S.ip, anna: S.anna },
  dialogs: [
    {
      title: 'Mittagspause',
      lines: [
        { who: 'ip', ru: 'А́нна, кто ваш муж по профе́ссии?', translit: 'ánna, kto wasch musch pa prafjéssii', de: 'Anna, was ist Ihr Mann von Beruf?' },
        { who: 'anna', ru: 'Он учи́тель. Он рабо́тает в шко́ле.', translit: "on utschítil'. on rabótajit f schkólje", de: 'Er ist Lehrer. Er arbeitet in einer Schule.', note: '**в шко́ле**: Ort mit в + Endung **-е**. Vor ш klingt в wie [f].' },
        { who: 'ip', ru: 'А моя́ жена́ — врач. Она́ рабо́тает в больни́це.', translit: "a majá zhyná — wratsch. aná rabótajit w bal'nítse", de: 'Und meine Frau ist Ärztin. Sie arbeitet in einem Krankenhaus.', note: '**врач** gilt für Männer und Frauen.' },
        { who: 'anna', ru: 'Интере́сно! А ваш сын?', translit: 'intirjésna! a wasch syn', de: 'Interessant! Und Ihr Sohn?' },
        { who: 'ip', ru: 'Он студе́нт. Он у́чится в университе́те.', translit: 'on studjént. on útschitsa w uniwirsitjétje', de: 'Er ist Student. Er studiert an der Universität.', note: '**у́чится** = lernt / studiert (an einer Schule oder Uni).' },
        { who: 'anna', ru: 'А дочь?', translit: "a dotsch'", de: 'Und Ihre Tochter?' },
        { who: 'ip', ru: 'Она́ ещё шко́льница.', translit: "aná jischschó schkól'nitsa", de: 'Sie ist noch Schülerin.' },
      ],
    },
  ],
  vocab: ['Кто вы по профе́ссии?', 'рабо́тать', 'учи́тель', 'учи́тельница', 'инжене́р', 'ме́неджер', 'продаве́ц', 'продавщи́ца', 'шко́льник', 'шко́льница', 'шко́ла', 'больни́ца', 'университе́т', 'о́фис', 'фи́рма', 'интере́сно'],
  grammar: [
    {
      title: 'Das Verb рабо́тать (arbeiten)',
      blocks: [
        { table: { head: ['Person', 'Form', 'Person', 'Form'], rows: [
          ['я', 'рабо́та**ю**', 'мы', 'рабо́та**ем**'],
          ['ты', 'рабо́та**ешь**', 'вы', 'рабо́та**ете**'],
          ['он / она́', 'рабо́та**ет**', 'они́', 'рабо́та**ют**'],
        ] } },
        { tip: 'Genau wie понима́ть: e-Konjugation, Betonung bleibt auf dem Stamm.' },
      ],
    },
    {
      title: 'Wo? – в + Ort (Präpositiv)',
      blocks: [
        { table: { head: ['Ort', 'Где? (wo?)'], rows: [
          ['шко́ла', 'в шко́л**е**'],
          ['больни́ца', 'в больни́ц**е**'],
          ['о́фис', 'в о́фис**е**'],
          ['фи́рма', 'в фи́рм**е**'],
          ['университе́т', 'в университе́т**е**'],
          ['магази́н', 'в магази́н**е**'],
        ] } },
        { tip: 'Manche Orte stehen mit **на** statt в: на по́чте (auf der Post), на вокза́ле (am Bahnhof). Lerne sie als feste Ausdrücke.' },
      ],
    },
    {
      title: 'Berufe: männlich und weiblich',
      blocks: [
        { table: { head: ['Mann', 'Frau', 'Deutsch'], rows: [
          ['учи́тель', 'учи́тельница', 'Lehrer / Lehrerin'],
          ['продаве́ц', 'продавщи́ца', 'Verkäufer / Verkäuferin'],
          ['шко́льник', 'шко́льница', 'Schüler / Schülerin'],
          ['студе́нт', 'студе́нтка', 'Student / Studentin'],
          ['врач, инжене́р, ме́неджер', '= gleich', 'Arzt/Ärztin, Ingenieur/-in, Manager/-in'],
        ] } },
      ],
    },
  ],
  exercises: [
    { type: 'gap', prompt: 'Konjugiere рабо́тать.', before: 'Я', after: 'в о́фисе.', answer: 'рабо́таю' },
    { type: 'gap', prompt: 'Konjugiere рабо́тать.', before: 'Где вы', after: '?', answer: 'рабо́таете' },
    { type: 'choice', prompt: 'Он рабо́тает в … (Schule)', options: ['шко́ла', 'шко́ле', 'шко́лы'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Wie heißt „Lehrerin“?', options: ['учи́тель', 'учи́тельница', 'шко́льница'], answer: 1, ruOptions: true },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['продаве́ц', 'Verkäufer'], ['инжене́р', 'Ingenieur'], ['шко́льник', 'Schüler'], ['врач', 'Arzt'], ['учи́тель', 'Lehrer']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Er arbeitet in einem Geschäft.', answer: 'Он рабо́тает в магази́не.' },
    { type: 'choice', prompt: 'Laut Dialog: Wo arbeitet Annas Mann?', options: ['im Krankenhaus', 'in einer Schule', 'an der Universität'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Она́ рабо́тает в больни́це.', answer: 'Она́ рабо́тает в больни́це.' },
  ],
  speak: ['Кто вы по профе́ссии?', 'Я рабо́таю в о́фисе.', 'Он учи́тель.'],
};

const l24: Lesson = {
  id: '2.4',
  unit: 2,
  title: { ru: 'Ско́лько тебе́ лет?', de: 'Wie alt bist du?' },
  canDo: 'Ich kann nach dem Alter fragen und sagen, wie alt jemand ist.',
  speakers: { max: S.max, lena: S.lena },
  dialogs: [
    {
      title: 'Lena und Max',
      lines: [
        { who: 'max', ru: 'Ле́на, ско́лько тебе́ лет?', translit: "ljéna, skól'ka tibjé ljet", de: 'Lena, wie alt bist du?', note: 'Wörtlich: „Wie viele Jahre (sind) dir?“ – das Alter steht mit **мне, тебе́, ему́ …** (Dativ).' },
        { who: 'lena', ru: 'Мне два́дцать два го́да. А тебе́?', translit: "mnje dwátsat' dwa góda. a tibjé", de: 'Ich bin zweiundzwanzig. Und du?', note: 'Nach **2, 3, 4** heißt es **го́да**.' },
        { who: 'max', ru: 'Мне три́дцать оди́н год.', translit: "mnje trítsat' adín got", de: 'Ich bin einunddreißig.', note: 'Nach **1** (auch 21, 31 …) heißt es **год**.' },
        { who: 'lena', ru: 'А твоя́ сестра́? Ско́лько ей лет?', translit: "a twajá sistrá? skól'ka jej ljet", de: 'Und deine Schwester? Wie alt ist sie?' },
        { who: 'max', ru: 'Ей два́дцать пять лет.', translit: "jej dwátsat' pjat' ljet", de: 'Sie ist fünfundzwanzig.', note: 'Nach **5–20** (und 25–30 …) heißt es **лет**.' },
        { who: 'lena', ru: 'А мой брат ещё ма́ленький. Ему́ то́лько де́сять лет.', translit: "a moj brat jischschó málin'kij. jimú tól'ka djésit' ljet", de: 'Mein Bruder ist noch klein. Er ist erst zehn.' },
      ],
    },
  ],
  vocab: ['Ско́лько тебе́ лет?', 'Ско́лько вам лет?', 'Мне … лет.', 'год', 'го́да', 'лет', 'мне', 'тебе́', 'ему́', 'ей', 'ма́ленький', 'то́лько', 'ещё'],
  grammar: [
    {
      title: 'Das Alter: мне … лет',
      blocks: [
        { p: 'Die Person steht im **Dativ** („mir sind 30 Jahre“):' },
        { table: { head: ['я', 'ты', 'он', 'она́', 'мы', 'вы', 'они́'], rows: [['мне', 'тебе́', 'ему́', 'ей', 'нам', 'вам', 'им']] } },
        { p: 'Das Wort für „Jahre“ hängt von der **letzten Zahl** ab:' },
        { table: { head: ['endet auf …', 'Form', 'Beispiele'], rows: [
          ['1 (aber nicht 11)', '**год**', '21 год, 31 год, 41 год'],
          ['2, 3, 4 (aber nicht 12–14)', '**го́да**', '22 го́да, 33 го́да, 44 го́да'],
          ['0, 5–9, 11–14', '**лет**', '10 лет, 12 лет, 25 лет, 30 лет'],
        ] } },
        { tip: 'Diese Regel gilt für alle Zählwörter – du begegnest ihr bei Preisen und Uhrzeiten wieder.' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Мне два́дцать оди́н …', options: ['год', 'го́да', 'лет'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Ему́ три́дцать три …', options: ['год', 'го́да', 'лет'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Ей двена́дцать …', options: ['год', 'го́да', 'лет'], answer: 2, ruOptions: true, explain: '11–14 stehen immer mit **лет**.' },
    { type: 'gap', prompt: 'Ergänze „ihm“.', before: '', after: 'пять лет.', answer: 'Ему́' },
    { type: 'choice', prompt: 'Hör zu: Wie alt ist die Person?', audio: 'Мне со́рок оди́н год.', options: ['14', '41', '45'], answer: 1 },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Ich bin dreißig Jahre alt.', answer: 'Мне три́дцать лет.' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['мне', 'mir'], ['тебе́', 'dir'], ['ему́', 'ihm'], ['ей', 'ihr'], ['вам', 'Ihnen']] },
    { type: 'dictation', prompt: 'Hör zu und schreib die Frage.', audio: 'Ско́лько вам лет?', answer: 'Ско́лько вам лет?' },
  ],
  speak: ['Ско́лько тебе́ лет?', 'Мне три́дцать лет.', 'Ей два́дцать два го́да.'],
};

const l25: Lesson = {
  id: '2.5',
  unit: 2,
  title: { ru: 'Мои́ друзья́', de: 'Meine Freunde' },
  canDo: 'Ich kann ein Foto mit mehreren Personen beschreiben (Plural).',
  speakers: { olja: S.olja, max: S.max },
  dialogs: [
    {
      title: 'Noch ein Foto',
      lines: [
        { who: 'olja', ru: 'Макс, кто э́ти лю́ди на фо́то?', translit: 'maks, kto éti ljúdi na fóta', de: 'Max, wer sind die Leute auf dem Foto?', note: '**э́ти** = diese (Plural). лю́ди ist der Plural von челове́к.' },
        { who: 'max', ru: 'Э́то мои́ друзья́. Вот Том и его́ жена́ Ли́за.', translit: 'éta maí druzjá. wot tom i jiwó zhyná líza', de: 'Das sind meine Freunde. Hier sind Tom und seine Frau Lisa.', note: '**друг → друзья́** ist ein unregelmäßiger Plural. **Э́то** heißt auch „das sind“.' },
        { who: 'olja', ru: 'А де́ти? Э́то их де́ти?', translit: 'a djéti? éta ich djéti', de: 'Und die Kinder? Sind das ihre Kinder?', note: '**их** (ihr/ihre bei mehreren Besitzern) ändert sich nie.' },
        { who: 'max', ru: 'Да, их сыновья́, Пе́тер и Бен. Они́ ещё шко́льники.', translit: 'da, ich synawjá, pjétir i ben. aní jischschó schkól\'niki', de: 'Ja, ihre Söhne, Peter und Ben. Sie sind noch Schüler.' },
        { who: 'olja', ru: 'А э́то кто? Твои́ роди́тели?', translit: 'a éta kto? twaí radítili', de: 'Und wer ist das? Deine Eltern?' },
        { who: 'max', ru: 'Да, мои́ роди́тели. Они́ уже́ на пе́нсии.', translit: 'da, maí radítili. aní uzhé na pjénsii', de: 'Ja, meine Eltern. Sie sind schon in Rente.' },
        { who: 'olja', ru: 'У тебя́ больша́я семья́!', translit: "u tibjá bal'schája simjá", de: 'Du hast eine große Familie!' },
        { who: 'max', ru: 'Да! И все они́ живу́т в Герма́нии.', translit: 'da! i fsje aní zhywút w girmánii', de: 'Ja! Und alle wohnen in Deutschland.' },
      ],
    },
  ],
  vocab: ['друзья́', 'роди́тели', 'сыновья́', 'бра́тья', 'до́чери', 'сёстры', 'де́ти', 'лю́ди', 'э́ти', 'их', 'на пе́нсии', 'все'],
  grammar: [
    {
      title: 'Der Plural (Nominativ)',
      blocks: [
        { table: { head: ['Singular', 'Endung', 'Plural'], rows: [
          ['студе́нт', '+ ы', 'студе́нт**ы**'],
          ['ма́ма', '-а → -ы', 'ма́м**ы**'],
          ['ба́бушка', '-а → -и (nach к, г, х, ж, ш, ч, щ)', 'ба́бушк**и**'],
          ['музе́й', '-й → -и', 'музе́**и**'],
          ['фо́то', 'unveränderlich', 'фо́то'],
        ] } },
        { p: '**Unregelmäßig** – gerade bei der Familie:' },
        { table: { head: ['Singular', 'Plural'], rows: [
          ['друг', 'друзья́'],
          ['брат', 'бра́тья'],
          ['сын', 'сыновья́'],
          ['сестра́', 'сёстры'],
          ['мать / дочь', 'ма́тери / до́чери'],
          ['челове́к', 'лю́ди'],
          ['ребёнок', 'де́ти'],
        ] } },
        { tip: 'Im Plural gibt es nur noch **eine** Form für alle Geschlechter: мои́, твои́, на́ши, ва́ши, э́ти.' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Plural von **студе́нт**:', options: ['студе́нты', 'студе́нта', 'студе́нти'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Plural von **брат**:', options: ['бра́ты', 'бра́тья', 'бра́ти'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „meine“ (Plural).', before: 'Э́то', after: 'роди́тели.', answer: 'мои́' },
    { type: 'match', prompt: 'Ordne Singular und Plural zu.', pairs: [['челове́к', 'лю́ди'], ['ребёнок', 'де́ти'], ['друг', 'друзья́'], ['сын', 'сыновья́'], ['сестра́', 'сёстры']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Das sind meine Freunde.', answer: 'Э́то мои́ друзья́.' },
    { type: 'choice', prompt: 'Laut Dialog: Wo wohnen Max’ Freunde und Eltern?', options: ['in Russland', 'in Deutschland', 'in Österreich'], answer: 1 },
    { type: 'order', prompt: 'Bilde den Satz „Sie sind schon in Rente.“', tokens: ['на', 'уже́', 'Они́', 'пе́нсии.'], answer: 'Они́ уже́ на пе́нсии.' },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Э́то их де́ти.', answer: 'Э́то их де́ти.' },
  ],
  speak: ['Э́то мои́ друзья́.', 'Э́то мои́ роди́тели.', 'У тебя́ больша́я семья́!'],
};

const l2c: Lesson = {
  id: '2.C',
  unit: 2,
  checkpoint: true,
  title: { ru: 'Контро́льная', de: 'Checkpoint Einheit 2' },
  canDo: 'Ich kann meine Familie vorstellen, Berufe und Alter nennen und sagen, was ich habe.',
  speakers: {},
  dialogs: [],
  vocab: [],
  grammar: [],
  exercises: [
    { type: 'choice', prompt: '___ ма́ма (meine Mama)', options: ['мой', 'моя́', 'моё'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: '___ де́душка (unser Opa)', options: ['наш', 'на́ша', 'на́ше'], answer: 0, ruOptions: true, explain: 'де́душка ist ein Mann → männlich.' },
    { type: 'gap', prompt: 'Ergänze.', before: 'У', after: 'есть сестра́? (du)', answer: 'тебя́' },
    { type: 'choice', prompt: '„Ich habe keinen Hund.“', options: ['У меня́ нет соба́ка.', 'У меня́ нет соба́ки.', 'Я нет соба́ки.'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Konjugiere рабо́тать.', before: 'Они́', after: 'в шко́ле.', answer: 'рабо́тают' },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Sie arbeitet in einem Krankenhaus.', answer: 'Она́ рабо́тает в больни́це.' },
    { type: 'choice', prompt: 'Мне со́рок четы́ре …', options: ['год', 'го́да', 'лет'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Ему́ пятна́дцать …', options: ['год', 'го́да', 'лет'], answer: 2, ruOptions: true },
    { type: 'dictation', prompt: 'Hör zu und schreib die Frage.', audio: 'Ско́лько тебе́ лет?', answer: 'Ско́лько тебе́ лет?' },
    { type: 'match', prompt: 'Ordne Singular und Plural zu.', pairs: [['брат', 'бра́тья'], ['дочь', 'до́чери'], ['ма́ма', 'ма́мы'], ['челове́к', 'лю́ди'], ['друг', 'друзья́']] },
    { type: 'order', prompt: 'Bilde die Frage „Was sind Sie von Beruf?“', tokens: ['профе́ссии?', 'вы', 'по', 'Кто'], answer: 'Кто вы по профе́ссии?' },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Das ist meine Familie.', answer: 'Э́то моя́ семья́.' },
  ],
  speak: ['Э́то моя́ семья́.', 'У меня́ есть брат и сестра́.', 'Мне три́дцать лет.', 'Я рабо́таю в о́фисе.'],
};

export const UNIT2: Unit = {
  n: 2,
  title: { ru: 'Семья́', de: 'Familie & Menschen' },
  lessons: [l21, l22, l23, l24, l25, l2c],
};
