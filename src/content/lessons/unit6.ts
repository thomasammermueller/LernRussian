import type { Lesson, Speaker, Unit } from './types';

const S: Record<string, Speaker> = {
  max: { name: 'Макс', voice: 'dmitri', emoji: '🧑' },
  olja: { name: 'О́ля', voice: 'irina', emoji: '👩' },
  anna: { name: 'А́нна', voice: 'irina', emoji: '👩‍💼' },
  prod: { name: 'Продавщи́ца', voice: 'irina', emoji: '🛍' },
  sell: { name: 'Продаве́ц', voice: 'dmitri', emoji: '🧑‍🌾' },
};

const l61: Lesson = {
  id: '6.1',
  unit: 6,
  title: { ru: 'Кака́я краси́вая ку́ртка!', de: 'Was für eine schöne Jacke!' },
  canDo: 'Ich kann Kleidung beschreiben (Farbe, Größe, Preis) und meine Meinung sagen.',
  speakers: { olja: S.olja, max: S.max },
  dialogs: [
    {
      title: 'Shopping im Kaufhaus',
      lines: [
        { who: 'olja', ru: 'Смотри́, кака́я краси́вая ку́ртка!', translit: 'smatrí, kakája krasíwaja kúrtka', de: 'Schau, was für eine schöne Jacke!', note: 'Adjektive passen sich an: ку́ртка (f) → краси́в**ая**.' },
        { who: 'max', ru: 'Да, но она́ о́чень я́ркая.', translit: "da, no aná ótschin' járkaja", de: 'Ja, aber sie ist sehr grell.' },
        { who: 'olja', ru: 'А э́та? Си́няя.', translit: 'a éta? sínjaja', de: 'Und diese? Die blaue.', note: 'си́ний ist ein „weiches“ Adjektiv: f **си́няя**, n **си́нее**.' },
        { who: 'max', ru: 'Си́няя лу́чше. А како́й э́то разме́р?', translit: "sínjaja lútschsche. a kakój éta razmjér", de: 'Die blaue ist besser. Und welche Größe ist das?' },
        { who: 'olja', ru: 'Со́рок четвёртый. Э́то мой разме́р!', translit: 'sórak tschitwjórtyj. éta moj razmjér', de: 'Vierundvierzig. Das ist meine Größe!' },
        { who: 'max', ru: 'А ско́лько она́ сто́ит?', translit: "a skól'ka aná stóit", de: 'Und was kostet sie?' },
        { who: 'olja', ru: 'Ой… пять ты́сяч рубле́й.', translit: 'oj… pjat\' týsitsch rubljéj', de: 'Oje … fünftausend Rubel.' },
        { who: 'max', ru: 'Э́то до́рого!', translit: 'éta dórawa', de: 'Das ist teuer!' },
      ],
    },
  ],
  vocab: ['оде́жда', 'ку́ртка', 'пла́тье', 'руба́шка', 'брю́ки', 'сви́тер', 'цвет', 'я́ркий', 'си́ний', 'кра́сный', 'лу́чше', 'разме́р', 'до́рого', 'дёшево', 'э́тот'],
  grammar: [
    {
      title: 'Adjektive (Nominativ)',
      blocks: [
        { table: { head: ['', 'm', 'f', 'n', 'Plural'], rows: [
          ['hart', 'кра́сн**ый**', 'кра́сн**ая**', 'кра́сн**ое**', 'кра́сн**ые**'],
          ['betont', 'больш**о́й**', 'больш**а́я**', 'больш**о́е**', 'больш**и́е**'],
          ['weich', 'си́н**ий**', 'си́н**яя**', 'си́н**ее**', 'си́н**ие**'],
          ['nach к, г, х, ж, ш, ч, щ', 'ма́леньк**ий**', 'ма́леньк**ая**', 'ма́леньк**ое**', 'ма́леньк**ие**'],
        ] } },
        { tip: 'Das Adjektiv richtet sich nach dem Substantiv: **кра́сная** ку́ртка, **кра́сный** сви́тер, **кра́сное** пла́тье, **кра́сные** брю́ки (брю́ки gibt es nur im Plural).' },
      ],
    },
    {
      title: 'э́тот – dieser',
      blocks: [
        { table: { head: ['m', 'f', 'n', 'Plural'], rows: [['э́тот сви́тер', 'э́та ку́ртка', 'э́то пла́тье', 'э́ти брю́ки']] } },
        { p: 'Achtung: **Э́то** ку́ртка = „Das ist eine Jacke.“ · **Э́та** ку́ртка = „diese Jacke“.' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: '___ пла́тье (rotes Kleid)', options: ['кра́сный', 'кра́сная', 'кра́сное'], answer: 2, ruOptions: true },
    { type: 'choice', prompt: '___ ку́ртка (blaue Jacke)', options: ['си́ний', 'си́няя', 'си́нее'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: '___ брю́ки (schwarze Hose)', options: ['чёрный', 'чёрная', 'чёрные'], answer: 2, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „dieser“.', before: '', after: 'сви́тер о́чень краси́вый.', answer: 'Э́тот' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['ку́ртка', 'Jacke'], ['пла́тье', 'Kleid'], ['руба́шка', 'Hemd'], ['брю́ки', 'Hose'], ['сви́тер', 'Pullover']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Das ist teuer!', answer: 'Э́то до́рого!' },
    { type: 'choice', prompt: 'Laut Dialog: Welche Jacke findet Max besser?', options: ['die rote', 'die blaue', 'die grelle'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Кака́я краси́вая ку́ртка!', answer: 'Кака́я краси́вая ку́ртка!' },
  ],
  speak: ['Кака́я краси́вая ку́ртка!', 'Си́няя лу́чше.', 'Э́то до́рого!'],
};

const l62: Lesson = {
  id: '6.2',
  unit: 6,
  title: { ru: 'На ры́нке', de: 'Auf dem Markt' },
  canDo: 'Ich kann bis 1000 zählen und auf dem Markt einkaufen.',
  speakers: { anna: S.anna, sell: S.sell },
  dialogs: [
    {
      title: 'Obst und Käse',
      lines: [
        { who: 'anna', ru: 'Ско́лько сто́ят я́блоки?', translit: "skól'ka stójat jábliki", de: 'Was kosten die Äpfel?', note: 'Bei mehreren Dingen: **сто́ят** (Plural) statt сто́ит.' },
        { who: 'sell', ru: 'Две́сти рубле́й килогра́мм.', translit: 'dwjésti rubljéj kilagrám', de: 'Zweihundert Rubel das Kilo.' },
        { who: 'anna', ru: 'Да́йте, пожа́луйста, два килогра́мма.', translit: 'dájtje, pazhálsta, dwa kilagráma', de: 'Geben Sie mir bitte zwei Kilo.', note: '**Да́йте, пожа́луйста, …** = Geben Sie mir bitte … – die Standardformel beim Einkaufen.' },
        { who: 'sell', ru: 'Что́-нибудь ещё?', translit: "schtó-nibut' jischschó", de: 'Sonst noch etwas?' },
        { who: 'anna', ru: 'Да, ещё сыр. Ско́лько он сто́ит?', translit: "da, jischschó syr. skól'ka on stóit", de: 'Ja, noch Käse. Was kostet der?' },
        { who: 'sell', ru: 'Пятьсо́т со́рок рубле́й.', translit: 'pitsót sórak rubljéj', de: 'Fünfhundertvierzig Rubel.' },
        { who: 'anna', ru: 'Хорошо́. Ско́лько всего́?', translit: 'charaschó. skól\'ka fsiwó', de: 'Gut. Wie viel macht das insgesamt?' },
        { who: 'sell', ru: 'Всего́ девятьсо́т со́рок рубле́й.', translit: 'fsiwó diwitsót sórak rubljéj', de: 'Insgesamt neunhundertvierzig Rubel.' },
        { who: 'anna', ru: 'Вот ты́сяча.', translit: 'wot týsitscha', de: 'Hier sind tausend.' },
        { who: 'sell', ru: 'Ва́ша сда́ча — шестьдеся́т рубле́й.', translit: "wáscha sdátscha — schyz'disját rubljéj", de: 'Ihr Wechselgeld: sechzig Rubel.' },
      ],
    },
  ],
  vocab: ['ры́нок', 'я́блоко', 'Ско́лько сто́ят …?', 'килогра́мм', 'Да́йте, пожа́луйста, …', 'всего́', 'две́сти', 'три́ста', 'четы́реста', 'пятьсо́т', 'шестьсо́т', 'семьсо́т', 'восемьсо́т', 'девятьсо́т', 'ты́сяча'],
  grammar: [
    {
      title: 'Hunderter und Tausender',
      blocks: [
        { table: { head: ['', '', ''], rows: [
          ['100 сто', '400 четы́реста', '700 семьсо́т'],
          ['200 две́сти', '500 пятьсо́т', '800 восемьсо́т'],
          ['300 три́ста', '600 шестьсо́т', '900 девятьсо́т'],
        ] } },
        { p: '**1000** ты́сяча · **2000** две ты́сячи · **5000** пять ты́сяч – wieder die bekannte Regel 1 / 2–4 / 5+.' },
        { p: 'Große Zahlen einfach zusammensetzen: 940 = девятьсо́т со́рок, 1 250 = ты́сяча две́сти пятьдеся́т.' },
        { tip: '**ско́лько сто́ит** (eine Sache) · **ско́лько сто́ят** (mehrere Sachen): Ско́лько сто́ят я́блоки?' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Hör zu: Welche Zahl ist das?', audio: 'пятьсо́т', options: ['50', '500', '5000'], answer: 1 },
    { type: 'choice', prompt: '300 = …', options: ['три́ста', 'тристо', 'три сто'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: '3000 = три …', options: ['ты́сяча', 'ты́сячи', 'ты́сяч'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Ско́лько ___ я́блоки?', options: ['сто́ит', 'сто́ят'], answer: 1, ruOptions: true },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['две́сти', '200'], ['четы́реста', '400'], ['шестьсо́т', '600'], ['девятьсо́т', '900'], ['ты́сяча', '1000']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Geben Sie mir bitte zwei Kilo.', answer: 'Да́йте, пожа́луйста, два килогра́мма.' },
    { type: 'choice', prompt: 'Laut Dialog: Wie viel kostet alles zusammen?', options: ['540 ₽', '940 ₽', '1000 ₽'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib die Zahl in Worten.', audio: 'Две́сти рубле́й.', answer: 'Две́сти рубле́й.' },
  ],
  speak: ['Ско́лько сто́ят я́блоки?', 'Да́йте, пожа́луйста, килогра́мм.', 'Ско́лько всего́?'],
};

const l63: Lesson = {
  id: '6.3',
  unit: 6,
  title: { ru: 'Спи́сок поку́пок', de: 'Die Einkaufsliste' },
  canDo: 'Ich kann Mengen angeben und sagen, was fehlt (Genitiv).',
  speakers: { olja: S.olja, max: S.max },
  dialogs: [
    {
      title: 'Was brauchen wir?',
      lines: [
        { who: 'olja', ru: 'Что нам ну́жно купи́ть?', translit: "schto nam núzhna kupít'", de: 'Was müssen wir kaufen?', note: '**ну́жно** = man muss / es ist nötig. Die Person steht im Dativ: нам ну́жно (wir müssen).' },
        { who: 'max', ru: 'Буты́лку молока́, па́чку ма́сла и килогра́мм карто́шки.', translit: 'butýlku malaká, pátschku másla i kilagrám kartóschki', de: 'Eine Flasche Milch, ein Päckchen Butter und ein Kilo Kartoffeln.', note: 'Nach Mengenangaben steht der **Genitiv**: молоко́ → буты́лка молок**а́**.' },
        { who: 'olja', ru: 'А хлеб?', translit: 'a chljep', de: 'Und Brot?' },
        { who: 'max', ru: 'До́ма нет хле́ба. И сы́ра то́же нет.', translit: 'dóma njet chljéba. i sýra tózhe njet', de: 'Zu Hause ist kein Brot. Und Käse auch nicht.' },
        { who: 'olja', ru: 'Тогда́ ещё хлеб и сыр. И мно́го фру́ктов!', translit: "tagdá jischschó chljep i syr. i mnóga frúktaf", de: 'Dann noch Brot und Käse. Und viel Obst!', note: '**мно́го** + Genitiv Plural: фру́кты → мно́го фру́кт**ов**.' },
        { who: 'max', ru: 'Ско́лько у нас де́нег?', translit: "skól'ka u nas djénik", de: 'Wie viel Geld haben wir?' },
        { who: 'olja', ru: 'Две ты́сячи рубле́й. Э́того хва́тит.', translit: 'dwje týsitschi rubljéj. étawa chwátit', de: 'Zweitausend Rubel. Das reicht.' },
      ],
    },
  ],
  vocab: ['Что нам ну́жно купи́ть?', 'купи́ть', 'буты́лка', 'па́чка', 'карто́шка', 'молоко́', 'ма́сло', 'хлеб', 'сыр', 'мно́го', 'ма́ло', 'де́ньги', 'Э́того хва́тит.'],
  grammar: [
    {
      title: 'Der Genitiv Singular',
      blocks: [
        { table: { head: ['', 'Nominativ', 'Genitiv'], rows: [
          ['m (Konsonant)', 'хлеб, сыр', 'хле́б**а**, сы́р**а**'],
          ['m (-й / -ь)', 'чай, рубль', 'ча́**я**, рубл**я́**'],
          ['n (-о)', 'молоко́, ма́сло', 'молок**а́**, ма́сл**а**'],
          ['f (-а)', 'вода́, ры́ба', 'вод**ы́**, ры́б**ы**'],
          ['f nach к, г, х, ж, ш, ч, щ', 'карто́шка', 'карто́шк**и**'],
          ['f (-я / -ь)', 'неде́ля, соль', 'неде́л**и**, со́л**и**'],
        ] } },
      ],
    },
    {
      title: 'Wann steht der Genitiv?',
      blocks: [
        { table: { head: ['nach …', 'Beispiel'], rows: [
          ['нет (es gibt nicht)', 'нет хле́ба'],
          ['без (ohne)', 'без са́хара'],
          ['из (aus)', 'из Москвы́'],
          ['Mengen: буты́лка, па́чка, килогра́мм, стака́н', 'буты́лка воды́, па́чка ма́сла'],
          ['мно́го / ма́ло / ско́лько', 'мно́го фру́ктов, ма́ло вре́мени'],
          ['Zahlen ab 2', 'два рубля́, пять рубле́й'],
        ] } },
        { tip: '**Genitiv Plural** (Vorgeschmack): m meist **-ов** (фру́ктов), auf -ь/-ж/-ш/-ч/-щ **-ей** (рубле́й), f/n oft **ohne Endung** (мину́т). Unregelmäßig: де́ньги → де́нег, год → лет.' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'буты́лка … (Wasser)', options: ['вода́', 'во́ду', 'воды́'], answer: 2, ruOptions: true },
    { type: 'choice', prompt: 'па́чка … (Butter)', options: ['ма́сло', 'ма́сла', 'ма́слу'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze den Genitiv von хлеб.', before: 'До́ма нет', after: '.', answer: 'хле́ба' },
    { type: 'gap', prompt: 'Ergänze den Genitiv von карто́шка.', before: 'Килогра́мм', after: ', пожа́луйста.', answer: 'карто́шки' },
    { type: 'choice', prompt: 'мно́го … (Obst)', options: ['фру́кты', 'фру́ктов', 'фру́кта'], answer: 1, ruOptions: true },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Eine Flasche Milch, bitte.', answer: 'Буты́лку молока́, пожа́луйста.', alternatives: ['Буты́лка молока́, пожа́луйста.'] },
    { type: 'choice', prompt: 'Laut Dialog: Was fehlt zu Hause?', options: ['Milch und Butter', 'Brot und Käse', 'Obst'], answer: 1 },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['буты́лка', 'Flasche'], ['па́чка', 'Päckchen'], ['мно́го', 'viel'], ['ма́ло', 'wenig'], ['купи́ть', 'kaufen']] },
  ],
  speak: ['Что нам ну́жно купи́ть?', 'Буты́лку молока́, пожа́луйста.', 'До́ма нет хле́ба.'],
};

const l64: Lesson = {
  id: '6.4',
  unit: 6,
  title: { ru: 'Пода́рок для му́жа', de: 'Ein Geschenk für den Mann' },
  canDo: 'Ich kann im Geschäft um Hilfe bitten, ein Geschenk aussuchen und bezahlen.',
  speakers: { prod: S.prod, anna: S.anna },
  dialogs: [
    {
      title: 'Im Bekleidungsgeschäft',
      lines: [
        { who: 'prod', ru: 'Здра́вствуйте! Вам помо́чь?', translit: 'zdrástwujtje! wam pamótsch', de: 'Guten Tag! Kann ich Ihnen helfen?' },
        { who: 'anna', ru: 'Да, я ищу́ пода́рок для му́жа.', translit: 'da, ja ischschú padárak dlja múzha', de: 'Ja, ich suche ein Geschenk für meinen Mann.', note: '**для** (für) + Genitiv: муж → для му́ж**а**. **иска́ть** → я ищу́, ты и́щешь.' },
        { who: 'prod', ru: 'Мо́жет быть, шарф? Вот э́тот се́рый и́ли э́тот си́ний.', translit: "mózhit byt', scharf? wot état sjéryj íli état sínij", de: 'Vielleicht einen Schal? Hier, dieser graue oder dieser blaue.' },
        { who: 'anna', ru: 'Си́ний, пожа́луйста. Ско́лько он сто́ит?', translit: "sínij, pazhálsta. skól'ka on stóit", de: 'Den blauen, bitte. Was kostet er?' },
        { who: 'prod', ru: 'Ты́сяча пятьсо́т рубле́й.', translit: 'týsitscha pitsót rubljéj', de: 'Tausendfünfhundert Rubel.' },
        { who: 'anna', ru: 'Хорошо́. Где мо́жно плати́ть?', translit: "charaschó. gdje mózhna platít'", de: 'Gut. Wo kann ich bezahlen?' },
        { who: 'prod', ru: 'На ка́ссе, вон там.', translit: 'na kássje, won tam', de: 'An der Kasse, dort drüben.' },
        { who: 'anna', ru: 'Спаси́бо. И мо́жно ещё паке́т?', translit: 'spasíba. i mózhna jischschó pakjét', de: 'Danke. Und kann ich noch eine Tüte bekommen?' },
        { who: 'prod', ru: 'Коне́чно.', translit: 'kanjéschna', de: 'Natürlich.' },
      ],
    },
  ],
  vocab: ['Вам помо́чь?', 'иска́ть', 'пода́рок', 'для', 'шарф', 'Мо́жет быть', 'се́рый', 'плати́ть', 'ка́сса', 'паке́т'],
  grammar: [
    {
      title: 'для + Genitiv – für',
      blocks: [
        { table: { head: ['für …', 'Genitiv'], rows: [
          ['муж', 'для му́жа'],
          ['друг', 'для дру́га'],
          ['ма́ма', 'для ма́мы'],
          ['сестра́', 'для сестры́'],
          ['де́душка', 'для де́душки'],
        ] } },
        { tip: 'Auch Personen auf -а (ма́ма, де́душка) bilden den Genitiv auf -ы/-и – egal ob Mann oder Frau.' },
      ],
    },
    {
      title: 'иска́ть – suchen',
      blocks: [
        { table: { head: ['Person', 'Form', 'Person', 'Form'], rows: [
          ['я', 'ищу́', 'мы', 'и́щем'],
          ['ты', 'и́щешь', 'вы', 'и́щете'],
          ['он / она́', 'и́щет', 'они́', 'и́щут'],
        ] } },
        { tip: 'ск wird in allen Formen zu **щ**.' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'пода́рок для … (Schwester)', options: ['сестра́', 'сестры́', 'сестру́'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „für den Freund“.', before: 'Э́то пода́рок для', after: '.', answer: 'дру́га' },
    { type: 'gap', prompt: 'Konjugiere иска́ть.', before: 'Я', after: 'пода́рок.', answer: 'ищу́' },
    { type: 'choice', prompt: 'Что ты …?', options: ['ищу́', 'и́щешь', 'и́щут'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Wie bietet eine Verkäuferin Hilfe an?', options: ['Вам помо́чь?', 'Что́-нибудь ещё?', 'Мо́жно карто́й?'], answer: 0, ruOptions: true },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Wo kann ich bezahlen?', answer: 'Где мо́жно плати́ть?', alternatives: ['Где мо́жно заплати́ть?'] },
    { type: 'choice', prompt: 'Laut Dialog: Welchen Schal kauft Anna?', options: ['den grauen', 'den blauen', 'den roten'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Я ищу́ пода́рок для му́жа.', answer: 'Я ищу́ пода́рок для му́жа.' },
  ],
  speak: ['Я ищу́ пода́рок.', 'Где мо́жно плати́ть?', 'Мо́жно ещё паке́т?'],
};

const l65: Lesson = {
  id: '6.5',
  unit: 6,
  title: { ru: 'Я её беру́!', de: 'Ich nehme es!' },
  canDo: 'Ich kann Kleidung zeigen lassen, anprobieren und kaufen.',
  speakers: { max: S.max, prod: S.prod },
  dialogs: [
    {
      title: 'Max kauft ein Hemd',
      lines: [
        { who: 'max', ru: 'Покажи́те, пожа́луйста, бе́лую руба́шку.', translit: 'pakazhýtje, pazhálsta, bjéluju rubáschku', de: 'Zeigen Sie mir bitte das weiße Hemd.', note: 'Im Akkusativ ändert sich auch das Adjektiv: бе́лая руба́шка → бе́л**ую** руба́шк**у**.' },
        { who: 'prod', ru: 'Вот, пожа́луйста. Како́й у вас разме́р?', translit: 'wot, pazhálsta. kakój u was razmjér', de: 'Bitte schön. Welche Größe haben Sie?' },
        { who: 'max', ru: 'Пятьдеся́т.', translit: 'pidisját', de: 'Fünfzig.' },
        { who: 'prod', ru: 'Приме́рочная там.', translit: 'primjératschnaja tam', de: 'Die Umkleidekabine ist dort.' },
        { who: 'max', ru: 'Руба́шка хоро́шая, но немно́го мала́. Есть бо́льше?', translit: "rubáschka charóschaja, no nimnóga malá. jest' ból'sche", de: 'Das Hemd ist gut, aber etwas zu klein. Gibt es ein größeres?', note: '**мал / мала́ / мало́ / малы́** = zu klein (Kurzform). Gegenteil: **вели́к / велика́** = zu groß.' },
        { who: 'prod', ru: 'Да, вот пятьдеся́т два.', translit: 'da, wot pidisját dwa', de: 'Ja, hier ist zweiundfünfzig.' },
        { who: 'max', ru: 'Отли́чно. Я её беру́.', translit: 'atlítschna. ja jijó birú', de: 'Super. Ich nehme es.', note: '**её** = sie/es (руба́шка ist weiblich). **брать**: я беру́, ты берёшь.' },
        { who: 'prod', ru: 'С вас две ты́сячи рубле́й.', translit: 'z was dwje týsitschi rubljéj', de: 'Das macht zweitausend Rubel.' },
      ],
    },
  ],
  vocab: ['Покажи́те, пожа́луйста, …', 'бе́лый', 'приме́рочная', 'мал', 'вели́к', 'бо́льше', 'брать', 'Я беру́.', 'С вас …'],
  grammar: [
    {
      title: 'Akkusativ der Adjektive (Dinge)',
      blocks: [
        { table: { head: ['', 'Nominativ', 'Akkusativ'], rows: [
          ['m', 'бе́лый шарф', '= бе́лый шарф'],
          ['f', 'бе́лая руба́шка', 'бе́л**ую** руба́шк**у**'],
          ['f (weich)', 'си́няя ку́ртка', 'си́н**юю** ку́ртк**у**'],
          ['n', 'бе́лое пла́тье', '= бе́лое пла́тье'],
          ['Plural', 'бе́лые брю́ки', '= бе́лые брю́ки'],
        ] } },
        { tip: 'Wie beim Substantiv ändert sich bei Dingen nur das Weibliche: **-ая → -ую**, **-яя → -юю**.' },
      ],
    },
    {
      title: 'Personalpronomen im Akkusativ',
      blocks: [
        { table: { head: ['я', 'ты', 'он / оно́', 'она́', 'мы', 'вы', 'они́'], rows: [['меня́', 'тебя́', 'его́', 'её', 'нас', 'вас', 'их']] } },
        { p: 'Bekannt aus „Меня́ зову́т …“! Я **её** беру́ (die Jacke) · Я **его́** беру́ (den Schal).' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Покажи́те, пожа́луйста, … (das rote Kleid)', options: ['кра́сное пла́тье', 'кра́сную пла́тье', 'кра́сная пла́тье'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Я хочу́ … (die blaue Jacke)', options: ['си́няя ку́ртка', 'си́нюю ку́ртку', 'си́ний ку́ртку'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „weiße“.', before: 'Я беру́', after: 'руба́шку.', answer: 'бе́лую' },
    { type: 'choice', prompt: 'Der Schal (m) gefällt dir. „Ich nehme ihn.“', options: ['Я его́ беру́.', 'Я её беру́.', 'Я их беру́.'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Die Jacke ist zu groß: Ку́ртка …', options: ['мала́', 'велика́'], answer: 1, ruOptions: true },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Ich nehme es. (das Hemd)', answer: 'Я её беру́.' },
    { type: 'choice', prompt: 'Laut Dialog: Welche Größe kauft Max?', options: ['50', '52', '44'], answer: 1 },
    { type: 'order', prompt: 'Bilde den Satz „Zeigen Sie bitte das weiße Hemd.“', tokens: ['руба́шку.', 'бе́лую', 'пожа́луйста,', 'Покажи́те,'], answer: 'Покажи́те, пожа́луйста, бе́лую руба́шку.' },
  ],
  speak: ['Покажи́те, пожа́луйста, бе́лую руба́шку.', 'Немно́го мала́.', 'Я её беру́.'],
};

const l6c: Lesson = {
  id: '6.C',
  unit: 6,
  checkpoint: true,
  title: { ru: 'Контро́льная', de: 'Checkpoint Einheit 6' },
  canDo: 'Ich kann einkaufen: Preise, Mengen, Kleidung, Farben und Größen.',
  speakers: {},
  dialogs: [],
  vocab: [],
  grammar: [],
  exercises: [
    { type: 'choice', prompt: '___ сви́тер (schwarzer Pullover)', options: ['чёрный', 'чёрная', 'чёрное'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: '700 = …', options: ['семьсо́т', 'се́мьдесят', 'семь ты́сяч'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Hör zu: Wie viel kostet es?', audio: 'Ты́сяча две́сти рубле́й.', options: ['1200 ₽', '2100 ₽', '1020 ₽'], answer: 0 },
    { type: 'gap', prompt: 'Ergänze den Genitiv von вода́.', before: 'Буты́лку', after: ', пожа́луйста.', answer: 'воды́' },
    { type: 'gap', prompt: 'Ergänze den Genitiv von сыр.', before: 'Сего́дня нет', after: '.', answer: 'сы́ра' },
    { type: 'choice', prompt: 'пода́рок для … (Mama)', options: ['ма́ма', 'ма́мы', 'ма́му'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Я беру́ … (die rote Jacke)', options: ['кра́сная ку́ртка', 'кра́сную ку́ртку'], answer: 1, ruOptions: true },
    { type: 'translate', prompt: 'Frag auf Russisch.', de: 'Was kosten die Äpfel?', answer: 'Ско́лько сто́ят я́блоки?' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['до́рого', 'teuer'], ['дёшево', 'billig'], ['мно́го', 'viel'], ['ма́ло', 'wenig'], ['всего́', 'insgesamt']] },
    { type: 'dictation', prompt: 'Hör zu und schreib die Frage.', audio: 'Вам помо́чь?', answer: 'Вам помо́чь?' },
    { type: 'order', prompt: 'Bilde den Satz „Ich suche ein Geschenk.“', tokens: ['пода́рок.', 'ищу́', 'Я'], answer: 'Я ищу́ пода́рок.' },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Das ist teuer!', answer: 'Э́то до́рого!' },
  ],
  speak: ['Ско́лько сто́ит э́та ку́ртка?', 'Да́йте, пожа́луйста, буты́лку воды́.', 'Я ищу́ пода́рок для дру́га.', 'Я её беру́.'],
};

export const UNIT6: Unit = {
  n: 6,
  title: { ru: 'Поку́пки', de: 'Einkaufen' },
  lessons: [l61, l62, l63, l64, l65, l6c],
};
