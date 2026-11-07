import type { Lesson, Speaker, Unit } from './types';

const S: Record<string, Speaker> = {
  max: { name: 'Макс', voice: 'dmitri', emoji: '🧑' },
  olja: { name: 'О́ля', voice: 'irina', emoji: '👩' },
  anna: { name: 'А́нна', voice: 'irina', emoji: '👩‍💼' },
  ip: { name: 'Ива́н Петро́вич', voice: 'dmitri', emoji: '👨‍💼' },
  lena: { name: 'Ле́на', voice: 'irina', emoji: '👩‍🎓' },
};

const l161: Lesson = {
  id: '16.1',
  unit: 16,
  title: { ru: 'Почему́ ру́сский?', de: 'Warum Russisch?' },
  canDo: 'Ich kann Gründe nennen und Sätze verbinden (потому́ что, поэ́тому, хотя́).',
  speakers: { lena: S.lena, max: S.max },
  dialogs: [
    {
      title: 'Lena fragt nach',
      lines: [
        { who: 'lena', ru: 'Макс, почему́ ты на́чал учи́ть ру́сский?', translit: "maks, patschimú ty nátschal utschít' rúskij", de: 'Max, warum hast du angefangen, Russisch zu lernen?' },
        { who: 'max', ru: 'Потому́ что у меня́ мно́го ру́сских друзе́й. И потому́ что я люблю́ ру́сскую литерату́ру.', translit: 'patamú schta u minjá mnóga rúskich druzjéj. i patamú schta ja ljubljú rúskuju litiratúru', de: 'Weil ich viele russische Freunde habe. Und weil ich russische Literatur liebe.', note: '**потому́ что** = weil. Achtung: Das Verb wandert **nicht** ans Satzende wie im Deutschen!' },
        { who: 'lena', ru: 'А почему́ ты прие́хал в Москву́?', translit: 'a patschimú ty prijéchal w maskwú', de: 'Und warum bist du nach Moskau gekommen?' },
        { who: 'max', ru: 'Я получи́л здесь рабо́ту, поэ́тому я тут.', translit: 'ja palutschíl zdjes\' rabótu, paétamu ja tut', de: 'Ich habe hier eine Stelle bekommen, deshalb bin ich hier.' },
        { who: 'lena', ru: 'И тебе́ здесь нра́вится?', translit: 'i tibjé zdjes\' nráwitsa', de: 'Und gefällt es dir hier?' },
        { who: 'max', ru: 'О́чень! Хотя́ зимо́й хо́лодно, я сча́стлив, что живу́ здесь.', translit: "ótschin'! chatjá zimój chóladna, ja schschásliw, schto zhywú zdjes'", de: 'Sehr! Obwohl es im Winter kalt ist, bin ich glücklich, dass ich hier lebe.', note: '**что** = dass. In **сча́стлив** wird das т nicht gesprochen: [schschásliw].' },
      ],
    },
  ],
  vocab: ['потому́ что', 'поэ́тому', 'хотя́', 'литерату́ра', 'получи́ть', 'сча́стлив', 'так как'],
  grammar: [
    {
      title: 'Sätze verbinden',
      blocks: [
        { table: { head: ['Konjunktion', 'Bedeutung', 'Beispiel'], rows: [
          ['потому́ что', 'weil', 'Я до́ма, потому́ что я бо́лен.'],
          ['так как', 'da (am Satzanfang)', 'Так как шёл дождь, мы бы́ли до́ма.'],
          ['поэ́тому', 'deshalb', 'Шёл дождь, поэ́тому мы бы́ли до́ма.'],
          ['хотя́', 'obwohl', 'Хотя́ бы́ло хо́лодно, мы гуля́ли.'],
          ['что', 'dass', 'Я зна́ю, что он прие́дет.'],
          ['но / а', 'aber / und (Gegensatz)', 'Я уста́л, но я рад.'],
        ] } },
        { tip: 'Im Russischen bleibt die Wortstellung im Nebensatz **normal**: … потому́ что я **люблю́** кни́ги (nicht: „weil ich Bücher liebe“ mit Verb am Ende). Vor Konjunktionen steht immer ein **Komma**.' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Я учу́ ру́сский, … у меня́ ру́сская жена́.', options: ['потому́ что', 'поэ́тому', 'хотя́'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Шёл дождь, … мы бы́ли до́ма.', options: ['потому́ что', 'поэ́тому', 'что'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: '… бы́ло хо́лодно, мы гуля́ли.', options: ['Хотя́', 'Потому́ что', 'Поэ́тому'], answer: 0, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „dass“.', before: 'Я ра́да,', after: 'ты пришёл.', answer: 'что' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['потому́ что', 'weil'], ['поэ́тому', 'deshalb'], ['хотя́', 'obwohl'], ['что', 'dass'], ['так как', 'da']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Ich lerne Russisch, weil ich russische Freunde habe.', answer: 'Я учу́ ру́сский, потому́ что у меня́ есть ру́сские друзья́.', alternatives: ['Я учу́ ру́сский, потому́ что у меня́ ру́сские друзья́.', 'Я учу́ ру́сский язы́к, потому́ что у меня́ есть ру́сские друзья́.'] },
    { type: 'choice', prompt: 'Laut Dialog: Warum ist Max in Moskau?', options: ['wegen der Literatur', 'Er hat hier eine Stelle bekommen.', 'wegen Olja'], answer: 1 },
    { type: 'order', prompt: 'Bilde den Satz „Ich bin glücklich, dass ich hier lebe.“', tokens: ['здесь.', 'живу́', 'что', 'сча́стлив,', 'Я'], answer: 'Я сча́стлив, что живу́ здесь.' },
  ],
  speak: ['Я учу́ ру́сский, потому́ что мне нра́вится язы́к.', 'Хотя́ бы́ло хо́лодно, мы гуля́ли.', 'Я сча́стлив, что живу́ здесь.'],
};

const l162: Lesson = {
  id: '16.2',
  unit: 16,
  title: { ru: 'Друг, кото́рый живёт в Каза́ни', de: 'Ein Freund, der in Kasan wohnt' },
  canDo: 'Ich kann Personen und Dinge mit Relativsätzen genauer beschreiben (кото́рый).',
  speakers: { olja: S.olja, max: S.max },
  dialogs: [
    {
      title: 'Urlaubsfotos',
      lines: [
        { who: 'olja', ru: 'Смотри́, э́то фотогра́фии из на́шего путеше́ствия.', translit: 'smatrí, éta fatagráfii iz náschiwa putischéstwija', de: 'Schau, das sind die Fotos von unserer Reise.' },
        { who: 'max', ru: 'Кто э́тот челове́к, кото́рый стои́т ря́дом с Серге́ем?', translit: 'kto état tschilawjék, katóryj staít rjádam s sirgéjem', de: 'Wer ist der Mann, der neben Sergej steht?', note: '**кото́рый** = der / die / das (Relativpronomen). Es richtet sich in Geschlecht und Zahl nach dem Bezugswort.' },
        { who: 'olja', ru: 'Э́то наш друг, кото́рый живёт в Каза́ни.', translit: 'éta nasch druk, katóryj zhywjót f kazáni', de: 'Das ist unser Freund, der in Kasan wohnt.' },
        { who: 'max', ru: 'А э́то та де́вушка, о кото́рой ты расска́зывала?', translit: 'a éta ta djéwuschka, a katóraj ty rasskázywala', de: 'Und ist das das Mädchen, von dem du erzählt hast?', note: 'Der **Fall** von кото́рый hängt vom Nebensatz ab: расска́зывать **о** (+ Präpositiv) → о кото́р**ой**.' },
        { who: 'olja', ru: 'Да, э́то Ма́ша. Она́ гид, с кото́рой мы гуля́ли по го́роду.', translit: 'da, éta máscha. aná git, s katóraj my guljáli pa góradu', de: 'Ja, das ist Mascha. Sie ist die Reiseleiterin, mit der wir durch die Stadt gegangen sind.' },
        { who: 'max', ru: 'А э́то кафе́, в кото́ром вы обе́дали?', translit: 'a éta kafé, f katóram wy abjédali', de: 'Und ist das das Café, in dem ihr zu Mittag gegessen habt?' },
        { who: 'olja', ru: 'Да! Там бы́ли са́мые вку́сные пельме́ни, кото́рые я когда́-нибудь е́ла!', translit: "da! tam býli sámyje fkúsnyje pil'mjéni, katóryje ja kagdá-nibut' jéla", de: 'Ja! Dort gab es die leckersten Pelmeni, die ich je gegessen habe!' },
      ],
    },
  ],
  vocab: ['кото́рый', 'фотогра́фия', 'гид', 'расска́зывать', 'когда́-нибудь', 'де́вушка', 'путеше́ствие'],
  grammar: [
    {
      title: 'Relativsätze mit кото́рый',
      blocks: [
        { p: '**Geschlecht und Zahl** von кото́рый kommen vom Bezugswort, der **Fall** aus dem Nebensatz:' },
        { table: { head: ['Hauptsatz', 'Nebensatz', 'Fall'], rows: [
          ['Э́то друг,', 'кото́рый живёт в Каза́ни.', 'Nom. m'],
          ['Э́то кни́га,', 'кото́рую я чита́ю.', 'Akk. f'],
          ['Э́то де́вушка,', 'о кото́рой я расска́зывал.', 'Präp. f'],
          ['Э́то гид,', 'с кото́рой мы гуля́ли.', 'Instr. f'],
          ['Э́то кафе́,', 'в кото́ром мы обе́дали.', 'Präp. n'],
          ['Э́то пельме́ни,', 'кото́рые я люблю́.', 'Akk. Pl.'],
        ] } },
        { tip: 'кото́рый wird wie ein Adjektiv dekliniert (кото́рого, кото́рому, кото́рым …). Vor кото́рый steht immer ein Komma.' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Э́то мой брат, … живёт в Москве́.', options: ['кото́рый', 'кото́рая', 'кото́рое'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Э́то кни́га, … я чита́ю.', options: ['кото́рая', 'кото́рую', 'кото́рой'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Э́то го́род, в … я роди́лся.', options: ['кото́рый', 'кото́ром', 'кото́рого'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Э́то друзья́, с … я рабо́таю.', options: ['кото́рыми', 'кото́рым', 'кото́рые'], answer: 0, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze кото́рый (f, Nominativ).', before: 'Э́то де́вушка,', after: 'рабо́тает гидом.', answer: 'кото́рая' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['фотогра́фия', 'Foto'], ['гид', 'Reiseleiter(in)'], ['расска́зывать', 'erzählen'], ['когда́-нибудь', 'jemals'], ['де́вушка', 'junge Frau']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Das ist der Freund, der in Kasan wohnt.', answer: 'Э́то друг, кото́рый живёт в Каза́ни.', alternatives: ['Э́то друг, кото́рый живет в Каза́ни.'] },
    { type: 'choice', prompt: 'Laut Dialog: Wer ist Mascha?', options: ['Oljas Schwester', 'die Reiseleiterin', 'eine Kellnerin'], answer: 1 },
  ],
  speak: ['Э́то друг, кото́рый живёт в Каза́ни.', 'Э́то кафе́, в кото́ром мы обе́дали.', 'Э́то кни́га, кото́рую я чита́ю.'],
};

const l163: Lesson = {
  id: '16.3',
  unit: 16,
  title: { ru: 'Е́сли бу́дет хоро́шая пого́да…', de: 'Wenn das Wetter schön ist …' },
  canDo: 'Ich kann Bedingungen formulieren (е́сли + Zukunft).',
  speakers: { ip: S.ip, anna: S.anna },
  dialogs: [
    {
      title: 'Eine Einladung',
      lines: [
        { who: 'ip', ru: 'А́нна, е́сли у вас бу́дет вре́мя в суббо́ту, приходи́те к нам в го́сти.', translit: 'ánna, jésli u was búdit wrjémja f subótu, prichadítje k nam w gósti', de: 'Anna, wenn Sie am Samstag Zeit haben, kommen Sie uns doch besuchen.', note: '**е́сли** + Zukunft: Wo das Deutsche Präsens nimmt („wenn Sie Zeit haben“), steht im Russischen das **Futur**.' },
        { who: 'anna', ru: 'С удово́льствием! Е́сли я не бу́ду рабо́тать, обяза́тельно приду́.', translit: "s udawól'stwijem! jésli ja ni búdu rabótat', abjazátil'na pridú", de: 'Sehr gern! Wenn ich nicht arbeiten muss, komme ich auf jeden Fall.' },
        { who: 'ip', ru: 'Е́сли бу́дет хоро́шая пого́да, мы бу́дем у́жинать на балко́не.', translit: 'jésli búdit charóschaja pagóda, my búdim úzhynat\' na balkónje', de: 'Wenn das Wetter schön ist, essen wir auf dem Balkon zu Abend.' },
        { who: 'anna', ru: 'А е́сли бу́дет дождь?', translit: "a jésli búdit dozhd'", de: 'Und wenn es regnet?' },
        { who: 'ip', ru: 'Тогда́ на ку́хне! Е́сли хоти́те, возьми́те с собо́й му́жа.', translit: 'tagdá na kúchnje! jésli chatítje, wazmítje s sabój múzha', de: 'Dann in der Küche! Wenn Sie möchten, bringen Sie Ihren Mann mit.' },
        { who: 'anna', ru: 'Спаси́бо, я спрошу́ его́.', translit: 'spasíba, ja spraschú jiwó', de: 'Danke, ich frage ihn.' },
      ],
    },
  ],
  vocab: ['е́сли', 'в го́сти', 'спроси́ть', 'взять с собо́й', 'оста́ться'],
  grammar: [
    {
      title: 'Bedingungen mit е́сли',
      blocks: [
        { table: { head: ['Deutsch', 'Russisch'], rows: [
          ['Wenn das Wetter schön **ist**, …', 'Е́сли **бу́дет** хоро́шая пого́да, …'],
          ['Wenn es regnet, bleiben wir zu Hause.', 'Е́сли **бу́дет** дождь, мы **оста́немся** до́ма.'],
          ['Wenn du Zeit hast, ruf an.', 'Е́сли у тебя́ **бу́дет** вре́мя, позвони́.'],
        ] } },
        { tip: 'Wenn es um die **Zukunft** geht, steht nach е́сли immer das Futur. Allgemeine Wahrheiten bleiben im Präsens: Е́сли идёт дождь, я беру́ зонт.' },
        { p: '**в го́сти / в гостя́х:** идти́ / приходи́ть **в го́сти** (zu Besuch, wohin) · быть **в гостя́х** (zu Besuch sein, wo).' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Е́сли за́втра … хоро́шая пого́да, мы пое́дем на да́чу.', options: ['есть', 'бу́дет', 'была́'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Е́сли у меня́ … вре́мя, я тебе́ позвоню́.', options: ['бу́дет', 'есть', 'бы́ло'], answer: 0, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „wenn“.', before: '', after: 'хо́чешь, пойдём в кино́.', answer: 'Е́сли' },
    { type: 'choice', prompt: '„Wir gehen zu Besuch.“', options: ['Мы идём в го́сти.', 'Мы идём в гостя́х.'], answer: 0, ruOptions: true },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['е́сли', 'wenn, falls'], ['спроси́ть', 'fragen'], ['взять с собо́й', 'mitnehmen'], ['оста́ться', 'bleiben'], ['в го́сти', 'zu Besuch']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Wenn es regnet, bleiben wir zu Hause.', answer: 'Е́сли бу́дет дождь, мы оста́немся до́ма.', alternatives: ['Е́сли пойдёт дождь, мы оста́немся до́ма.', 'Е́сли бу́дет дождь, мы бу́дем до́ма.'] },
    { type: 'choice', prompt: 'Laut Dialog: Wo essen sie, wenn es regnet?', options: ['auf dem Balkon', 'in der Küche', 'im Restaurant'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Е́сли хоти́те, приходи́те к нам в го́сти.', answer: 'Е́сли хоти́те, приходи́те к нам в го́сти.' },
  ],
  speak: ['Е́сли бу́дет хоро́шая пого́да, мы пое́дем на да́чу.', 'Е́сли у тебя́ бу́дет вре́мя, позвони́.', 'Приходи́те к нам в го́сти!'],
};

const l164: Lesson = {
  id: '16.4',
  unit: 16,
  title: { ru: 'Е́сли бы у меня́ был миллио́н…', de: 'Wenn ich eine Million hätte …' },
  canDo: 'Ich kann Wünsche und Träume ausdrücken (Konjunktiv mit бы) und einen Zweck nennen (что́бы).',
  speakers: { lena: S.lena, max: S.max },
  dialogs: [
    {
      title: 'Träume',
      lines: [
        { who: 'lena', ru: 'Макс, что бы ты сде́лал, е́сли бы у тебя́ был миллио́н?', translit: 'maks, schto by ty zdjélal, jésli by u tibjá byl milión', de: 'Max, was würdest du tun, wenn du eine Million hättest?', note: 'Konjunktiv = **Vergangenheitsform + бы**: сде́лал бы = würde machen, был бы = wäre / hätte.' },
        { who: 'max', ru: 'Е́сли бы у меня́ был миллио́н, я бы купи́л дом на Байка́ле.', translit: 'jésli by u minjá byl milión, ja by kupíl dom na bajkálje', de: 'Wenn ich eine Million hätte, würde ich ein Haus am Baikalsee kaufen.' },
        { who: 'lena', ru: 'А я бы путеше́ствовала по всему́ ми́ру!', translit: 'a ja by putischéstwawala pa fsjimú míru', de: 'Und ich würde um die ganze Welt reisen!' },
        { who: 'max', ru: 'Кста́ти, заче́м ты у́чишь англи́йский?', translit: 'kstáti, zatschém ty útschisch anglíjskij', de: 'Übrigens, wozu lernst du Englisch?' },
        { who: 'lena', ru: 'Что́бы рабо́тать за грани́цей. А ты у́чишь ру́сский, что́бы…?', translit: "schtóby rabótat' za granítsej. a ty útschisch rúskij, schtóby…", de: 'Um im Ausland zu arbeiten. Und du lernst Russisch, um …?', note: '**что́бы** + Infinitiv = um … zu (gleiches Subjekt).' },
        { who: 'max', ru: 'Что́бы понима́ть ру́сские фи́льмы без субти́тров!', translit: "schtóby panimát' rúskije fíl'my bis subtítraf", de: 'Um russische Filme ohne Untertitel zu verstehen!' },
        { who: 'lena', ru: 'И ещё я хоте́ла бы, что́бы ты научи́л меня́ игра́ть на гита́ре.', translit: "i jischschó ja chatjéla by, schtóby ty nautschíl minjá igrát' na gitárje", de: 'Und außerdem möchte ich, dass du mir Gitarre spielen beibringst.', note: '**хоте́л(а) бы** = möchte (höflich). **что́бы** + Vergangenheit = dass / damit (anderes Subjekt).' },
      ],
    },
  ],
  vocab: ['бы', 'миллио́н', 'мир', 'по всему́ ми́ру', 'кста́ти', 'заче́м', 'что́бы', 'за грани́цей', 'субти́тры', 'хоте́л бы', 'научи́ть'],
  grammar: [
    {
      title: 'Der Konjunktiv: Vergangenheit + бы',
      blocks: [
        { table: { head: ['Deutsch', 'Russisch'], rows: [
          ['Ich würde ein Haus kaufen.', 'Я бы купи́л(а) дом.'],
          ['Wenn ich Zeit hätte, …', 'Е́сли бы у меня́ бы́ло вре́мя, …'],
          ['Ich möchte (gern) …', 'Я хоте́л(а) бы …'],
          ['Könnten Sie …?', 'Не могли́ бы вы …?'],
        ] } },
        { tip: 'Der Konjunktiv hat **keine Zeit**: „Я бы пошёл“ kann „ich würde gehen“ oder „ich wäre gegangen“ heißen – der Kontext entscheidet.' },
      ],
    },
    {
      title: 'что́бы – um zu / damit',
      blocks: [
        { table: { head: ['Fall', 'Form', 'Beispiel'], rows: [
          ['gleiche Person', 'что́бы + Infinitiv', 'Я учу́ ру́сский, что́бы понима́ть фи́льмы.'],
          ['andere Person', 'что́бы + Vergangenheit', 'Я хочу́, что́бы ты пришёл.'],
        ] } },
        { p: '**заче́м?** = wozu? (Ziel) · **почему́?** = warum? (Grund).' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Wenn ich Zeit hätte, … – Е́сли бы у меня́ … вре́мя, …', options: ['бу́дет', 'бы́ло', 'есть'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Ich (Mann) würde nach Moskau fahren: Я … в Москву́.', options: ['пое́хал бы', 'пое́ду бы', 'е́ду бы'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Я учу́ язы́к, … говори́ть с друзья́ми.', options: ['что́бы', 'потому́ что', 'е́сли'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Я хочу́, что́бы ты … (kommst)', options: ['придёшь', 'пришёл', 'прийти́'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „möchte“ (Frau, höflich).', before: 'Я', after: 'бы ко́фе.', answer: 'хоте́ла' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['заче́м', 'wozu'], ['почему́', 'warum'], ['кста́ти', 'übrigens'], ['мир', 'Welt'], ['за грани́цей', 'im Ausland']] },
    { type: 'translate', prompt: 'Übersetze ins Russische (als Mann).', de: 'Ich würde ein Haus kaufen.', answer: 'Я бы купи́л дом.', alternatives: ['Я купи́л бы дом.'] },
    { type: 'choice', prompt: 'Laut Dialog: Wozu lernt Lena Englisch?', options: ['um Filme zu verstehen', 'um im Ausland zu arbeiten', 'um zu reisen'], answer: 1 },
  ],
  speak: ['Е́сли бы у меня́ был миллио́н, я бы путеше́ствовал.', 'Я учу́ ру́сский, что́бы понима́ть фи́льмы.', 'Я хоте́л бы ча́шку ча́я.'],
};

const l165: Lesson = {
  id: '16.5',
  unit: 16,
  title: { ru: 'Моя́ исто́рия', de: 'Meine Geschichte' },
  canDo: 'Ich kann zusammenhängend von meinem Lernweg erzählen – mit allen Zeiten und Satzverbindungen.',
  speakers: { olja: S.olja, max: S.max },
  dialogs: [
    {
      title: 'Ein Jahr Russisch',
      lines: [
        { who: 'olja', ru: 'Макс, ты по́мнишь, как ты на́чал учи́ть ру́сский?', translit: "maks, ty pómnisch, kak ty nátschal utschít' rúskij", de: 'Max, erinnerst du dich, wie du angefangen hast, Russisch zu lernen?' },
        { who: 'max', ru: 'Коне́чно! Год наза́д я не знал ни одного́ ру́сского сло́ва.', translit: 'kanjéschna! got nazát ja ni znal ni adnawó rúskawa slówa', de: 'Natürlich! Vor einem Jahr kannte ich kein einziges russisches Wort.', note: '**ни одного́** + Genitiv = kein einziges (doppelte Verneinung mit не).' },
        { who: 'olja', ru: 'А како́е бы́ло пе́рвое сло́во?', translit: 'a kakóje býla pjérwaje slówa', de: 'Und was war das erste Wort?' },
        { who: 'max', ru: '«Приве́т»! Пото́м «спаси́бо» и «пожа́луйста».', translit: 'priwjét! patóm spasíba i pazhálsta', de: '„Priwet“! Dann „spasibo“ und „poschalujsta“.' },
        { who: 'olja', ru: 'А что бы́ло са́мым тру́дным?', translit: 'a schto býla sámym trúdnym', de: 'Und was war am schwierigsten?' },
        { who: 'max', ru: 'Падежи́, коне́чно! И глаго́лы движе́ния…', translit: 'padizhý, kanjéschna! i glagóly dwizhénija…', de: 'Die Fälle natürlich! Und die Bewegungsverben …' },
        { who: 'olja', ru: 'А сейча́с?', translit: 'a sejtschás', de: 'Und jetzt?' },
        { who: 'max', ru: 'Сейча́с я могу́ говори́ть о рабо́те, о пого́де, о пра́здниках… Е́сли бы ты мне год наза́д сказа́ла, что я бу́ду так говори́ть, я бы не пове́рил!', translit: "sejtschás ja magú gawarít' a rabótje, a pagódje, a prázdnikach… jésli by ty mnje got nazát skazála, schto ja búdu tak gawarít', ja by ni pawjéril", de: 'Jetzt kann ich über die Arbeit, das Wetter, Feiertage sprechen … Hättest du mir vor einem Jahr gesagt, dass ich so sprechen werde, hätte ich es nicht geglaubt!' },
        { who: 'olja', ru: 'Молоде́ц! А что ты бу́дешь де́лать да́льше?', translit: "maladjéts! a schto ty búdisch djélat' dál'sche", de: 'Bravo! Und wie geht es weiter?' },
        { who: 'max', ru: 'Бу́ду учи́ть ру́сский да́льше, коне́чно! Сле́дующая цель — сре́дний у́ровень!', translit: "búdu utschít' rúskij dál'sche, kanjéschna! sljédujuschschaja tsel' — srjédnij úrawin'", de: 'Ich lerne natürlich weiter Russisch! Das nächste Ziel ist die Mittelstufe (B1)!' },
      ],
    },
  ],
  vocab: ['по́мнить', 'ни одного́', 'паде́ж', 'глаго́л', 'движе́ние', 'пове́рить', 'цель', 'у́ровень', 'да́льше'],
  grammar: [
    {
      title: 'A2 – das hast du geschafft',
      blocks: [
        { table: { head: ['Thema', 'Beispiel'], rows: [
          ['Alle sechs Fälle', 'Я подари́л дру́гу кни́гу о Москве́.'],
          ['Verbaspekte', 'Я чита́л час и наконе́ц прочита́л.'],
          ['Bewegungsverben', 'Я хожу́ в бассе́йн. Он пришёл в семь.'],
          ['Komparativ / Superlativ', 'Москва́ бо́льше Берли́на. Са́мый краси́вый го́род.'],
          ['Imperativ', 'Сади́тесь, пожа́луйста!'],
          ['Nebensätze', 'Друг, кото́рый живёт в Каза́ни. Е́сли бу́дет вре́мя, …'],
          ['Konjunktiv', 'Я бы пое́хал, е́сли бы у меня́ бы́ло вре́мя.'],
        ] } },
        { tip: 'Поздравля́ю! Mit diesen Strukturen kannst du dich im Alltag gut verständigen. **Weiterlernen:** jeden Tag wiederholen, russische Serien mit Untertiteln schauen, mit Muttersprachlern sprechen (Tandem).' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Я не знал … ру́сского сло́ва.', options: ['ни одного́', 'не оди́н', 'никако́й'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Что бы́ло са́мым … ? (am schwierigsten)', options: ['тру́дный', 'тру́дным', 'тру́дного'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „weiter“.', before: 'Я бу́ду учи́ть ру́сский', after: '.', answer: 'да́льше' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['паде́ж', 'Fall (Grammatik)'], ['глаго́л', 'Verb'], ['цель', 'Ziel'], ['по́мнить', 'sich erinnern'], ['у́ровень', 'Niveau']] },
    { type: 'translate', prompt: 'Übersetze ins Russische (als Mann).', de: 'Ich hätte es nicht geglaubt!', answer: 'Я бы не пове́рил!' },
    { type: 'choice', prompt: 'Laut Dialog: Was war für Max am schwierigsten?', options: ['die Aussprache', 'die Fälle und Bewegungsverben', 'das Alphabet'], answer: 1 },
    { type: 'choice', prompt: 'Laut Dialog: Was ist Max’ nächstes Ziel?', options: ['A1', 'A2', 'B1'], answer: 2 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Год наза́д я не знал ни одного́ ру́сского сло́ва.', answer: 'Год наза́д я не знал ни одного́ ру́сского сло́ва.' },
  ],
  speak: ['Год наза́д я не знал ни одного́ ру́сского сло́ва.', 'Сейча́с я могу́ говори́ть о рабо́те.', 'Сле́дующая цель — сре́дний у́ровень!'],
};

const l16c: Lesson = {
  id: '16.C',
  unit: 16,
  checkpoint: true,
  title: { ru: 'Контро́льная', de: 'Abschluss-Checkpoint A2' },
  canDo: 'Ich beherrsche die wichtigsten Strukturen der Stufe A2.',
  speakers: {},
  dialogs: [],
  vocab: [],
  grammar: [],
  exercises: [
    { type: 'choice', prompt: 'Я опозда́л, … я по́здно просну́лся. (weil)', options: ['потому́ что', 'поэ́тому', 'хотя́'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Э́то же́нщина, … я рабо́таю.', options: ['с кото́рой', 'кото́рая', 'кото́рую'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Е́сли за́втра … дождь, я оста́нусь до́ма.', options: ['идёт', 'бу́дет', 'был'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Е́сли бы я знал, я … пришёл.', options: ['бы', 'бу́ду', 'был'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Я хочу́, что́бы ты … мне. (anrufst)', options: ['позвони́шь', 'позвони́л', 'позвони́ть'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Мне ну́жно … (Arzt, Dativ: zum Arzt) – Мне ну́жно к …', options: ['врач', 'врачу́', 'врачо́м'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Я рабо́таю … (als Ingenieur)', options: ['инжене́р', 'инжене́ром', 'инжене́ра'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Вчера́ я весь ве́чер … (las)', options: ['чита́л', 'прочита́л'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Ка́ждую неде́лю я … в бассе́йн.', options: ['иду́', 'хожу́'], answer: 1, ruOptions: true },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Wenn ich Zeit hätte, würde ich reisen.', answer: 'Е́сли бы у меня́ бы́ло вре́мя, я бы путеше́ствовал.', alternatives: ['Е́сли бы у меня́ бы́ло вре́мя, я бы путеше́ствовала.', 'Е́сли бы у меня́ бы́ло вре́мя, я путеше́ствовал бы.'] },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Я учу́ ру́сский, что́бы говори́ть с друзья́ми.', answer: 'Я учу́ ру́сский, что́бы говори́ть с друзья́ми.' },
    { type: 'order', prompt: 'Bilde den Satz „Das ist das Buch, das ich lese.“', tokens: ['чита́ю.', 'я', 'кото́рую', 'кни́га,', 'Э́то'], answer: 'Э́то кни́га, кото́рую я чита́ю.' },
  ],
  speak: ['Я учу́ ру́сский, потому́ что мне нра́вится язы́к.', 'Е́сли бу́дет вре́мя, я приду́.', 'Е́сли бы у меня́ был миллио́н, я бы путеше́ствовал.', 'Спаси́бо за всё!'],
};

export const UNIT16: Unit = {
  n: 16,
  title: { ru: 'Расска́з', de: 'Erzählen' },
  lessons: [l161, l162, l163, l164, l165, l16c],
};
