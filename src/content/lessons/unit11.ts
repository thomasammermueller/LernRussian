import type { Lesson, Speaker, Unit } from './types';

const S: Record<string, Speaker> = {
  max: { name: 'Макс', voice: 'dmitri', emoji: '🧑' },
  olja: { name: 'О́ля', voice: 'irina', emoji: '👩' },
  anna: { name: 'А́нна', voice: 'irina', emoji: '👩‍💼' },
  lena: { name: 'Ле́на', voice: 'irina', emoji: '👩‍🎓' },
  owner: { name: 'Хозя́ин', voice: 'dmitri', emoji: '🔑' },
};

const l111: Lesson = {
  id: '11.1',
  unit: 11,
  title: { ru: 'На́ша но́вая кварти́ра', de: 'Unsere neue Wohnung' },
  canDo: 'Ich kann eine Wohnung beschreiben: Zimmer, Stockwerk, Ausstattung.',
  speakers: { olja: S.olja, max: S.max },
  dialogs: [
    {
      title: 'Olja zeigt die neue Wohnung',
      lines: [
        { who: 'olja', ru: 'Заходи́! Э́то на́ша но́вая кварти́ра.', translit: 'zachadí! éta náscha nówaja kwartíra', de: 'Komm rein! Das ist unsere neue Wohnung.' },
        { who: 'max', ru: 'Кака́я больша́я! Ско́лько здесь ко́мнат?', translit: "kakája bal'schája! skól'ka zdjes' kómnat", de: 'Wie groß! Wie viele Zimmer gibt es hier?', note: 'ско́лько + Genitiv Plural: ко́мната → ко́мнат (ohne Endung).' },
        { who: 'olja', ru: 'Три ко́мнаты: спа́льня, гости́ная и кабине́т Серге́я.', translit: "tri kómnaty: spál'nja, gastínaja i kabinjét sirgéja", de: 'Drei Zimmer: Schlafzimmer, Wohnzimmer und Sergejs Arbeitszimmer.', note: '**кабине́т Серге́я** = Sergejs Arbeitszimmer – der Besitzer steht im Genitiv, **hinter** dem Wort.' },
        { who: 'max', ru: 'А где ку́хня?', translit: 'a gdje kúchnja', de: 'Und wo ist die Küche?' },
        { who: 'olja', ru: 'Ку́хня здесь, сле́ва. А ва́нная и туале́т — там.', translit: "kúchnja zdjes', sljéwa. a wánnaja i tualjét — tam", de: 'Die Küche ist hier links. Und Bad und Toilette sind dort.' },
        { who: 'max', ru: 'А балко́н есть?', translit: "a balkón jest'", de: 'Und gibt es einen Balkon?' },
        { who: 'olja', ru: 'Есть! С балко́на о́чень краси́вый вид на парк.', translit: "jest'! z balkóna ótschin' krasíwyj wit na park", de: 'Ja! Vom Balkon hat man einen sehr schönen Blick auf den Park.' },
        { who: 'max', ru: 'На како́м этаже́ вы живёте?', translit: 'na kakóm etazhé wy zhywjótje', de: 'In welchem Stock wohnt ihr?' },
        { who: 'olja', ru: 'На пя́том. И лифт рабо́тает!', translit: 'na pjátam. i lift rabótajit', de: 'Im fünften. Und der Aufzug funktioniert!' },
      ],
    },
  ],
  vocab: ['кварти́ра', 'Заходи́!', 'ко́мната', 'спа́льня', 'гости́ная', 'кабине́т', 'ку́хня', 'ва́нная', 'туале́т', 'балко́н', 'вид', 'эта́ж'],
  grammar: [
    {
      title: 'Ordnungszahlen und Stockwerke',
      blocks: [
        { table: { head: ['Zahl', 'der …', 'im … Stock'], rows: [
          ['1', 'пе́рвый', 'на пе́рвом этаже́'],
          ['2', 'второ́й', 'на второ́м этаже́'],
          ['3', 'тре́тий', 'на тре́тьем этаже́'],
          ['4', 'четвёртый', 'на четвёртом этаже́'],
          ['5', 'пя́тый', 'на пя́том этаже́'],
          ['6 / 7 / 8', 'шесто́й / седьмо́й / восьмо́й', 'на шесто́м …'],
          ['9 / 10', 'девя́тый / деся́тый', 'на девя́том …'],
        ] } },
        { tip: 'In Russland zählt man das Erdgeschoss als **пе́рвый эта́ж** – der deutsche 1. Stock ist dort der **второ́й**!' },
      ],
    },
    {
      title: 'Wessen? – Genitiv als Besitzer',
      blocks: [
        { table: { head: ['Deutsch', 'Russisch'], rows: [
          ['Sergejs Arbeitszimmer', 'кабине́т Серге́я'],
          ['Mamas Auto', 'маши́на ма́мы'],
          ['die Wohnung meines Bruders', 'кварти́ра моего́ бра́та'],
          ['das Zentrum der Stadt', 'центр го́рода'],
        ] } },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Ско́лько у вас …? (Zimmer)', options: ['ко́мнаты', 'ко́мнат', 'ко́мната'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'У нас три … (Zimmer)', options: ['ко́мнаты', 'ко́мнат', 'ко́мната'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: '„im zweiten Stock“', options: ['на второ́м этаже́', 'на второ́й эта́ж', 'во второ́м этаже́'], answer: 0, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „Mamas“ (Genitiv).', before: 'Э́то маши́на', after: '.', answer: 'ма́мы' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['спа́льня', 'Schlafzimmer'], ['гости́ная', 'Wohnzimmer'], ['ва́нная', 'Bad'], ['кабине́т', 'Arbeitszimmer'], ['балко́н', 'Balkon']] },
    { type: 'translate', prompt: 'Frag auf Russisch.', de: 'In welchem Stock wohnt ihr?', answer: 'На како́м этаже́ вы живёте?', alternatives: ['На како́м этаже́ вы живете?'] },
    { type: 'choice', prompt: 'Laut Dialog: In welchem Stock wohnen Olja und Sergej?', options: ['im dritten', 'im fünften', 'im zehnten'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Э́то на́ша но́вая кварти́ра.', answer: 'Э́то на́ша но́вая кварти́ра.' },
  ],
  speak: ['Ско́лько здесь ко́мнат?', 'Мы живём на пя́том этаже́.', 'С балко́на краси́вый вид.'],
};

const l112: Lesson = {
  id: '11.2',
  unit: 11,
  title: { ru: 'Куда́ поста́вить дива́н?', de: 'Wohin mit dem Sofa?' },
  canDo: 'Ich kann sagen, wo Dinge stehen, liegen und hängen.',
  speakers: { olja: S.olja, max: S.max },
  dialogs: [
    {
      title: 'Möbel rücken',
      lines: [
        { who: 'olja', ru: 'Макс, помоги́! Куда́ поста́вить дива́н?', translit: "maks, pamagí! kudá pastáwit' diwán", de: 'Max, hilf mir! Wohin stellen wir das Sofa?' },
        { who: 'max', ru: 'Дава́й поста́вим его́ у окна́.', translit: 'dawáj pastáwim jiwó u akná', de: 'Lass es uns ans Fenster stellen.', note: '**у** + Genitiv = bei, an: окно́ → у окн**а́**.' },
        { who: 'olja', ru: 'А стол?', translit: 'a stol', de: 'Und den Tisch?' },
        { who: 'max', ru: 'Стол — ме́жду дива́ном и шка́фом.', translit: 'stol — mjézhdu diwánam i schkáfam', de: 'Den Tisch zwischen Sofa und Schrank.', note: '**ме́жду** + Instrumental = zwischen.' },
        { who: 'olja', ru: 'А ла́мпу?', translit: 'a lámpu', de: 'Und die Lampe?' },
        { who: 'max', ru: 'Над столо́м. А ковёр положи́м пе́ред дива́ном.', translit: 'nad stalóm. a kawjór palazhým pjérit diwánam', de: 'Über den Tisch. Und den Teppich legen wir vor das Sofa.' },
        { who: 'olja', ru: 'Отли́чно! А где мой кот?', translit: 'atlítschna! a gdje moj kot', de: 'Super! Und wo ist mein Kater?' },
        { who: 'max', ru: 'Он лежи́т под крова́тью!', translit: "on lizhýt pad krawát'ju", de: 'Er liegt unter dem Bett!' },
      ],
    },
  ],
  vocab: ['ме́бель', 'дива́н', 'стол', 'стул', 'шкаф', 'крова́ть', 'ла́мпа', 'ковёр', 'окно́', 'поста́вить', 'положи́ть', 'ме́жду', 'над', 'под', 'пе́ред', 'за', 'напро́тив', 'стоя́ть', 'лежа́ть', 'висе́ть'],
  grammar: [
    {
      title: 'Wo? – Ortspräpositionen',
      blocks: [
        { table: { head: ['Präposition', 'Fall', 'Beispiel'], rows: [
          ['в / на (in / auf)', 'Präpositiv', 'в шкафу́, на столе́'],
          ['над (über)', 'Instrumental', 'над столо́м'],
          ['под (unter)', 'Instrumental', 'под крова́тью'],
          ['пе́ред (vor)', 'Instrumental', 'пе́ред дива́ном'],
          ['за (hinter)', 'Instrumental', 'за до́мом'],
          ['ме́жду (zwischen)', 'Instrumental', 'ме́жду дива́ном и шка́фом'],
          ['у (bei, an)', 'Genitiv', 'у окна́'],
          ['напро́тив (gegenüber)', 'Genitiv', 'напро́тив две́ри'],
        ] } },
        { tip: '**шкаф** und einige andere Wörter haben einen eigenen Präpositiv auf betontes **-у́**: в шкаф**у́**, на полу́ (auf dem Boden), в саду́ (im Garten).' },
      ],
    },
    {
      title: 'stehen, liegen, hängen',
      blocks: [
        { table: { head: ['Wo ist es?', 'Wohin tut man es?'], rows: [
          ['стоя́ть (stehen): Стол стои́т у окна́.', 'поста́вить (stellen): Я поста́влю стол у окна́.'],
          ['лежа́ть (liegen): Кни́га лежи́т на столе́.', 'положи́ть (legen): Я положу́ кни́гу на стол.'],
          ['висе́ть (hängen): Ла́мпа виси́т над столо́м.', 'пове́сить (hängen): Я пове́шу ла́мпу.'],
        ] } },
        { tip: 'Wie im Deutschen: Tisch, Schrank, Flasche **stehen**; Buch, Teppich, Katze **liegen**; Bild und Lampe **hängen**.' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Ла́мпа виси́т над … (Tisch)', options: ['стол', 'столо́м', 'стола́'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Дива́н стои́т у … (Fenster)', options: ['окно́', 'окна́', 'окно́м'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Кни́га … на столе́.', options: ['стои́т', 'лежи́т', 'виси́т'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Карти́на … на стене́.', options: ['стои́т', 'лежи́т', 'виси́т'], answer: 2, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „zwischen dem Sofa und dem Schrank“.', before: 'Стол ме́жду дива́ном и', after: '.', answer: 'шка́фом' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['над', 'über'], ['под', 'unter'], ['пе́ред', 'vor'], ['за', 'hinter'], ['напро́тив', 'gegenüber']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Der Kater liegt unter dem Bett.', answer: 'Кот лежи́т под крова́тью.' },
    { type: 'choice', prompt: 'Laut Dialog: Wohin kommt das Sofa?', options: ['ans Fenster', 'zwischen Tisch und Schrank', 'vor den Teppich'], answer: 0 },
  ],
  speak: ['Куда́ поста́вить дива́н?', 'Ла́мпа виси́т над столо́м.', 'Кот лежи́т под крова́тью.'],
};

const l113: Lesson = {
  id: '11.3',
  unit: 11,
  title: { ru: 'Ско́лько госте́й?', de: 'Wie viele Gäste?' },
  canDo: 'Ich kann Mengen von mehreren Dingen angeben (Genitiv Plural).',
  speakers: { lena: S.lena, max: S.max },
  dialogs: [
    {
      title: 'Lena plant eine Party',
      lines: [
        { who: 'lena', ru: 'Макс, в суббо́ту у меня́ вечери́нка. Мне ну́жно мно́го веще́й!', translit: 'maks, f subótu u minjá witschirínka. mnje núzhna mnóga wischschéj', de: 'Max, am Samstag gebe ich eine Party. Ich brauche viele Sachen!' },
        { who: 'max', ru: 'Ско́лько бу́дет госте́й?', translit: "skól'ka búdit gastjéj", de: 'Wie viele Gäste kommen?' },
        { who: 'lena', ru: 'Пятна́дцать челове́к.', translit: "pitnátsat' tschilawjék", de: 'Fünfzehn Leute.', note: 'Nach Zahlen sagt man **челове́к** (nicht люде́й): пять челове́к.' },
        { who: 'max', ru: 'Тогда́ тебе́ ну́жно пятна́дцать таре́лок и пятна́дцать стака́нов.', translit: "tagdá tibjé núzhna pitnátsat' tarjélak i pitnátsat' stakánaf", de: 'Dann brauchst du fünfzehn Teller und fünfzehn Gläser.' },
        { who: 'lena', ru: 'Таре́лок у меня́ мно́го, а стака́нов ма́ло. И сту́льев нет!', translit: "tarjélak u minjá mnóga, a stakánaf mála. i stúl'jef njet", de: 'Teller habe ich viele, aber wenig Gläser. Und keine Stühle!' },
        { who: 'max', ru: 'Я принесу́ шесть сту́льев.', translit: "ja prinisú schest' stúl'jef", de: 'Ich bringe sechs Stühle mit.' },
        { who: 'lena', ru: 'Спаси́бо! И ещё пять буты́лок со́ка и три па́чки пече́нья.', translit: "spasíba! i jischschó pjat' butýlak sóka i tri pátschki pitschén'ja", de: 'Danke! Und noch fünf Flaschen Saft und drei Packungen Kekse.' },
      ],
    },
  ],
  vocab: ['вечери́нка', 'вещь', 'гость', 'таре́лка', 'стака́н', 'принести́', 'пече́нье', 'челове́к'],
  grammar: [
    {
      title: 'Der Genitiv Plural',
      blocks: [
        { table: { head: ['Nominativ Sg.', 'Regel', 'Genitiv Pl.'], rows: [
          ['стака́н, сок', 'm Konsonant → **-ов**', 'стака́н**ов**, со́к**ов**'],
          ['музе́й', 'm -й → **-ев**', 'музе́**ев**'],
          ['гость, рубль, вещь, врач', '-ь, ж, ш, ч, щ → **-ей**', 'гост**е́й**, рубл**е́й**, вещ**е́й**, врач**е́й**'],
          ['ко́мната, ма́ма', 'f -а → **ohne Endung**', 'ко́мнат, мам'],
          ['ме́сто, сло́во', 'n -о → **ohne Endung**', 'мест, слов'],
          ['ле́кция, зда́ние', '-ия / -ие → **-ий**', 'ле́кц**ий**, зда́н**ий**'],
        ] } },
        { tip: '**Flüchtiger Vokal:** Treffen ohne Endung zwei Konsonanten aufeinander, schiebt sich **о / е** ein: таре́лка → таре́л**о**к, буты́лка → буты́л**о**к, де́вушка → де́вуш**е**к.' },
        { p: '**Unregelmäßig:** челове́к → (пять) челове́к, год → лет, де́ньги → де́нег, стул → сту́льев, брат → бра́тьев, друг → друзе́й.' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'пять … (Gläser)', options: ['стака́ны', 'стака́нов', 'стака́на'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'мно́го … (Gäste)', options: ['гости', 'госте́й', 'го́стов'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'де́сять … (Flaschen)', options: ['буты́лок', 'буты́лков', 'буты́лки'], answer: 0, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze den Genitiv Plural von ко́мната.', before: 'В кварти́ре пять', after: '.', answer: 'ко́мнат' },
    { type: 'choice', prompt: 'Нас бы́ло два́дцать … (Leute)', options: ['люде́й', 'челове́к'], answer: 1, ruOptions: true },
    { type: 'match', prompt: 'Ordne Nominativ und Genitiv Plural zu.', pairs: [['таре́лка', 'таре́лок'], ['стул', 'сту́льев'], ['друг', 'друзе́й'], ['музе́й', 'музе́ев'], ['ле́кция', 'ле́кций']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Wie viele Gäste kommen?', answer: 'Ско́лько бу́дет госте́й?' },
    { type: 'choice', prompt: 'Laut Dialog: Was fehlt Lena ganz?', options: ['Teller', 'Gläser', 'Stühle'], answer: 2 },
  ],
  speak: ['Ско́лько бу́дет госте́й?', 'У меня́ нет сту́льев.', 'Пять буты́лок со́ка, пожа́луйста.'],
};

const l114: Lesson = {
  id: '11.4',
  unit: 11,
  title: { ru: 'Кварти́ра ещё свобо́дна?', de: 'Ist die Wohnung noch frei?' },
  canDo: 'Ich kann auf eine Wohnungsanzeige reagieren und eine Adresse verstehen.',
  speakers: { anna: S.anna, owner: S.owner },
  dialogs: [
    {
      title: 'Anna ruft wegen einer Anzeige an',
      lines: [
        { who: 'anna', ru: 'Здра́вствуйте! Я звоню́ по объявле́нию. Кварти́ра ещё свобо́дна?', translit: 'zdrástwujtje! ja zwanjú pa abjawljéniju. kwartíra jischschó swabódna', de: 'Guten Tag! Ich rufe wegen der Anzeige an. Ist die Wohnung noch frei?' },
        { who: 'owner', ru: 'Да, свобо́дна.', translit: 'da, swabódna', de: 'Ja, sie ist frei.' },
        { who: 'anna', ru: 'Ско́лько сто́ит аре́нда в ме́сяц?', translit: "skól'ka stóit arjénda w mjésits", de: 'Wie hoch ist die Miete im Monat?' },
        { who: 'owner', ru: 'Со́рок ты́сяч рубле́й плюс коммуна́льные услу́ги.', translit: 'sórak týsitsch rubljéj pljus kamunál\'nyje uslúgi', de: 'Vierzigtausend Rubel plus Nebenkosten.' },
        { who: 'anna', ru: 'А кварти́ра далеко́ от метро́?', translit: 'a kwartíra dalikó at mitró', de: 'Ist die Wohnung weit von der Metro entfernt?', note: '**далеко́ от** + Genitiv = weit von. **недалеко́ от** = nicht weit von.' },
        { who: 'owner', ru: 'Нет, пять мину́т пешко́м. Ря́дом есть магази́ны и апте́ка.', translit: "njet, pjat' minút pischkóm. rjádam jest' magazíny i aptjéka", de: 'Nein, fünf Minuten zu Fuß. In der Nähe gibt es Geschäfte und eine Apotheke.' },
        { who: 'anna', ru: 'Мо́жно посмотре́ть кварти́ру сего́дня ве́чером?', translit: "mózhna pasmatrjét' kwartíru siwódnja wjétschiram", de: 'Kann ich mir die Wohnung heute Abend ansehen?' },
        { who: 'owner', ru: 'Коне́чно. Приходи́те в семь. А́дрес: у́лица Пу́шкина, дом де́сять, кварти́ра пять.', translit: "kanjéschna. prichadítje f sjem'. ádris: úlitsa púschkina, dom djésit', kwartíra pjat'", de: 'Natürlich. Kommen Sie um sieben. Adresse: Puschkinstraße, Haus 10, Wohnung 5.', note: 'In russischen Adressen steht der Straßenname oft im Genitiv: **у́лица Пу́шкина** = Straße (des) Puschkin.' },
      ],
    },
  ],
  vocab: ['снима́ть кварти́ру', 'объявле́ние', 'свобо́дный', 'аре́нда', 'в ме́сяц', 'хозя́ин', 'далеко́ от', 'а́дрес', 'Приходи́те!'],
  grammar: [
    {
      title: 'Mieten und Adressen',
      blocks: [
        { table: { head: ['Russisch', 'Deutsch'], rows: [
          ['снима́ть / снять кварти́ру', 'eine Wohnung mieten'],
          ['сдава́ть / сдать кварти́ру', 'eine Wohnung vermieten'],
          ['Я звоню́ по объявле́нию.', 'Ich rufe wegen der Anzeige an.'],
          ['аре́нда в ме́сяц', 'Miete pro Monat'],
          ['коммуна́льные услу́ги', 'Nebenkosten'],
        ] } },
        { p: '**Adresse** in Russland: Stadt, **у́лица** (ул.), **дом** (д.), **кварти́ра** (кв.) – z. B. ул. Пу́шкина, д. 10, кв. 5.' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: '„eine Wohnung mieten“', options: ['снима́ть кварти́ру', 'сдава́ть кварти́ру', 'покупа́ть кварти́ру'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Мы живём недалеко́ от … (Park)', options: ['парк', 'па́рка', 'па́рке'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Was bedeutet die Abkürzung **кв.** in einer Adresse?', options: ['Wohnung', 'Haus', 'Straße'], answer: 0, explain: 'ул. = у́лица, д. = дом, кв. = кварти́ра.' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['объявле́ние', 'Anzeige'], ['аре́нда', 'Miete'], ['хозя́ин', 'Vermieter'], ['а́дрес', 'Adresse'], ['в ме́сяц', 'pro Monat']] },
    { type: 'translate', prompt: 'Frag auf Russisch.', de: 'Ist die Wohnung noch frei?', answer: 'Кварти́ра ещё свобо́дна?' },
    { type: 'choice', prompt: 'Hör zu: Wie viel kostet die Miete?', audio: 'Аре́нда — три́дцать пять ты́сяч в ме́сяц.', options: ['25 000 ₽', '35 000 ₽', '53 000 ₽'], answer: 1 },
    { type: 'choice', prompt: 'Laut Dialog: Wann sieht Anna die Wohnung an?', options: ['morgen früh', 'heute um 7 Uhr abends', 'am Wochenende'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Я звоню́ по объявле́нию.', answer: 'Я звоню́ по объявле́нию.' },
  ],
  speak: ['Я звоню́ по объявле́нию.', 'Ско́лько сто́ит аре́нда?', 'Мо́жно посмотре́ть кварти́ру?'],
};

const l115: Lesson = {
  id: '11.5',
  unit: 11,
  title: { ru: 'Новосе́лье', de: 'Die Einweihungsfeier' },
  canDo: 'Ich kann Gäste empfangen, Komplimente machen und gratulieren.',
  speakers: { lena: S.lena, olja: S.olja, max: S.max },
  dialogs: [
    {
      title: 'Zu Besuch bei Olja',
      lines: [
        { who: 'lena', ru: 'Поздравля́ю с новосе́льем! Э́то вам.', translit: "pazdrawljáju s nawasjél'jem! éta wam", de: 'Herzlichen Glückwunsch zur neuen Wohnung! Das ist für euch.', note: '**Поздравля́ю с** + Instrumental = Ich gratuliere zu …' },
        { who: 'olja', ru: 'Ой, каки́е краси́вые цветы́! Спаси́бо! Проходи́те, раздева́йтесь.', translit: 'oj, kakíje krasíwyje tswitý! spasíba! prachadítje, razdiwájtis\'', de: 'Oh, was für schöne Blumen! Danke! Kommt rein und legt ab.' },
        { who: 'lena', ru: 'Кака́я све́тлая кварти́ра! Ско́лько у вас ко́мнат?', translit: "kakája swjétlaja kwartíra! skól'ka u was kómnat", de: 'Was für eine helle Wohnung! Wie viele Zimmer habt ihr?' },
        { who: 'olja', ru: 'Три. Здесь гости́ная, там спа́льня, а э́то кабине́т.', translit: "tri. zdjes' gastínaja, tam spál'nja, a éta kabinjét", de: 'Drei. Hier ist das Wohnzimmer, dort das Schlafzimmer und das ist das Arbeitszimmer.' },
        { who: 'max', ru: 'А где кот?', translit: 'a gdje kot', de: 'Und wo ist der Kater?' },
        { who: 'olja', ru: 'Где же ещё — на дива́не!', translit: 'gdje zhe jischschó — na diwánje', de: 'Wo sonst – auf dem Sofa!' },
        { who: 'lena', ru: 'Мне о́чень нра́вится ваш балко́н. Там так мно́го цвето́в!', translit: "mnje ótschin' nráwitsa wasch balkón. tam tak mnóga tswitóf", de: 'Euer Balkon gefällt mir sehr. Da sind so viele Blumen!' },
        { who: 'olja', ru: 'Да, я о́чень люблю́ цветы́. Сади́тесь, пожа́луйста, бу́дем пить чай!', translit: "da, ja ótschin' ljubljú tswitý. sadítis', pazhálsta, búdim pit' tschaj", de: 'Ja, ich liebe Blumen. Setzt euch bitte, wir trinken Tee!' },
      ],
    },
  ],
  vocab: ['новосе́лье', 'Поздравля́ю с …!', 'Э́то вам.', 'цветы́', 'Проходи́те!', 'Раздева́йтесь!', 'Сади́тесь!', 'све́тлый', 'Чу́вствуйте себя́ как до́ма!'],
  grammar: [
    {
      title: 'Gäste empfangen',
      blocks: [
        { table: { head: ['Gastgeber sagt', 'Deutsch'], rows: [
          ['Проходи́те!', 'Kommen Sie herein!'],
          ['Раздева́йтесь!', 'Legen Sie ab!'],
          ['Сади́тесь, пожа́луйста!', 'Setzen Sie sich bitte!'],
          ['Чу́вствуйте себя́ как до́ма!', 'Fühlen Sie sich wie zu Hause!'],
          ['Угоща́йтесь!', 'Greifen Sie zu!'],
        ] } },
        { table: { head: ['Gast sagt', 'Deutsch'], rows: [
          ['Поздравля́ю с новосе́льем!', 'Glückwunsch zur neuen Wohnung!'],
          ['Э́то вам / тебе́.', 'Das ist für Sie / dich.'],
          ['Кака́я у́ютная кварти́ра!', 'Was für eine gemütliche Wohnung!'],
        ] } },
        { tip: 'In Russland zieht man beim Besuch die Schuhe aus – oft bekommt man **та́почки** (Hausschuhe). Blumen schenkt man in **ungerader** Zahl; gerade Zahlen gibt es nur bei Beerdigungen.' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Was sagt man zur Einweihung?', options: ['Поздравля́ю с новосе́льем!', 'Счастли́вого пути́!', 'Выздора́вливайте!'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Der Gastgeber bittet, Platz zu nehmen:', options: ['Сади́тесь!', 'Раздева́йтесь!', 'Приходи́те!'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Wie viele Blumen schenkt man?', options: ['eine gerade Zahl', 'eine ungerade Zahl', 'egal'], answer: 1 },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['цветы́', 'Blumen'], ['све́тлый', 'hell'], ['новосе́лье', 'Einweihungsfeier'], ['Проходи́те!', 'Kommen Sie rein!'], ['Э́то вам.', 'Das ist für Sie.']] },
    { type: 'gap', prompt: 'Ergänze den Genitiv Plural von цветы́.', before: 'На балко́не мно́го', after: '.', answer: 'цвето́в' },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Fühlen Sie sich wie zu Hause!', answer: 'Чу́вствуйте себя́ как до́ма!' },
    { type: 'choice', prompt: 'Laut Dialog: Wo liegt der Kater?', options: ['auf dem Balkon', 'auf dem Sofa', 'unter dem Bett'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Кака́я све́тлая кварти́ра!', answer: 'Кака́я све́тлая кварти́ра!' },
  ],
  speak: ['Поздравля́ю с новосе́льем!', 'Кака́я све́тлая кварти́ра!', 'Сади́тесь, пожа́луйста!'],
};

const l11c: Lesson = {
  id: '11.C',
  unit: 11,
  checkpoint: true,
  title: { ru: 'Контро́льная', de: 'Checkpoint Einheit 11' },
  canDo: 'Ich kann über meine Wohnung sprechen, Dinge im Raum beschreiben und Mengen angeben.',
  speakers: {},
  dialogs: [],
  vocab: [],
  grammar: [],
  exercises: [
    { type: 'choice', prompt: '„im dritten Stock“', options: ['на тре́тьем этаже́', 'на тре́тий эта́ж', 'в тре́тьем этаже́'], answer: 0, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „meines Bruders“ (Genitiv).', before: 'Э́то кварти́ра моего́', after: '.', answer: 'бра́та' },
    { type: 'choice', prompt: 'Ковёр лежи́т пе́ред … (Sofa)', options: ['дива́н', 'дива́ном', 'дива́на'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Шкаф стои́т напро́тив … (Fenster)', options: ['окна́', 'окно́м', 'окне́'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Ла́мпа … над столо́м.', options: ['стои́т', 'лежи́т', 'виси́т'], answer: 2, ruOptions: true },
    { type: 'choice', prompt: 'де́сять … (Rubel)', options: ['рубле́й', 'рублёв', 'рубля́'], answer: 0, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze den Genitiv Plural von де́вушка.', before: 'На вечери́нке бы́ло мно́го', after: '.', answer: 'де́вушек' },
    { type: 'match', prompt: 'Ordne Nominativ und Genitiv Plural zu.', pairs: [['ко́мната', 'ко́мнат'], ['гость', 'госте́й'], ['стака́н', 'стака́нов'], ['буты́лка', 'буты́лок'], ['вещь', 'веще́й']] },
    { type: 'translate', prompt: 'Frag auf Russisch.', de: 'Wie viele Zimmer habt ihr?', answer: 'Ско́лько у вас ко́мнат?' },
    { type: 'choice', prompt: 'Hör zu: Wo ist die Wohnung?', audio: 'Кварти́ра недалеко́ от метро́.', options: ['weit von der Metro', 'nicht weit von der Metro', 'neben dem Park'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Поздравля́ю с новосе́льем!', answer: 'Поздравля́ю с новосе́льем!' },
    { type: 'order', prompt: 'Bilde den Satz „Das Buch liegt auf dem Tisch.“', tokens: ['столе́.', 'на', 'лежи́т', 'Кни́га'], answer: 'Кни́га лежи́т на столе́.' },
  ],
  speak: ['Мы живём на тре́тьем этаже́.', 'Дива́н стои́т у окна́.', 'У меня́ мно́го книг.', 'Поздравля́ю с новосе́льем!'],
};

export const UNIT11: Unit = {
  n: 11,
  title: { ru: 'Дом', de: 'Wohnen' },
  lessons: [l111, l112, l113, l114, l115, l11c],
};
