import type { Lesson, Speaker, Unit } from './types';

const S: Record<string, Speaker> = {
  max: { name: 'Макс', voice: 'dmitri', emoji: '🧑' },
  olja: { name: 'О́ля', voice: 'irina', emoji: '👩' },
  anna: { name: 'А́нна', voice: 'irina', emoji: '👩‍💼' },
  ip: { name: 'Ива́н Петро́вич', voice: 'dmitri', emoji: '👨‍💼' },
  lena: { name: 'Ле́на', voice: 'irina', emoji: '👩‍🎓' },
  ns: { name: 'Ната́лья Серге́евна', voice: 'irina', emoji: '👵' },
  waitress: { name: 'Официа́нтка', voice: 'irina', emoji: '🧑‍🍳' },
  waiter: { name: 'Официа́нт', voice: 'dmitri', emoji: '🤵' },
};

const l41: Lesson = {
  id: '4.1',
  unit: 4,
  title: { ru: 'Я хочу́ ко́фе', de: 'Ich möchte einen Kaffee' },
  canDo: 'Ich kann im Café bestellen und sagen, was ich möchte.',
  speakers: { waitress: S.waitress, olja: S.olja, max: S.max },
  dialogs: [
    {
      title: 'Im Café',
      lines: [
        { who: 'waitress', ru: 'До́брый день! Что вы хоти́те?', translit: 'dóbryj djen\'! schto wy chatítje', de: 'Guten Tag! Was möchten Sie?', note: '**хоте́ть** (wollen, möchten) ist unregelmäßig – siehe Grammatik.' },
        { who: 'olja', ru: 'Я хочу́ ко́фе и пиро́г.', translit: 'ja chatschú kófje i pirók', de: 'Ich möchte einen Kaffee und ein Stück Kuchen.', note: 'Männliche Dinge bleiben nach хочу́ unverändert: ко́фе, пиро́г.' },
        { who: 'waitress', ru: 'А вы?', translit: 'a wy', de: 'Und Sie?' },
        { who: 'max', ru: 'А я хочу́ сок и пи́ццу.', translit: 'a ja chatschú sok i pítsu', de: 'Und ich möchte einen Saft und eine Pizza.', note: 'пи́цца → **пи́ццу**: weibliche Wörter auf -а bekommen im Akkusativ **-у**.' },
        { who: 'waitress', ru: 'Како́й сок? Апельси́новый и́ли я́блочный?', translit: "kakój sok? apil'sínawyj íli jáblatschnyj", de: 'Welchen Saft? Orangen- oder Apfelsaft?' },
        { who: 'max', ru: 'Я́блочный, пожа́луйста.', translit: 'jáblatschnyj, pazhálsta', de: 'Apfelsaft, bitte.' },
        { who: 'waitress', ru: 'Хорошо́. Что́-нибудь ещё?', translit: "charaschó. schtó-nibut' jischschó", de: 'Gut. Sonst noch etwas?' },
        { who: 'olja', ru: 'Нет, спаси́бо. Э́то всё.', translit: 'njet, spasíba. éta fsjo', de: 'Nein, danke. Das ist alles.' },
      ],
    },
  ],
  vocab: ['хоте́ть', 'Что вы хоти́те?', 'ко́фе', 'чай', 'сок', 'пиро́г', 'пи́цца', 'апельси́новый', 'я́блочный', 'Что́-нибудь ещё?', 'Э́то всё.', 'официа́нт', 'официа́нтка'],
  grammar: [
    {
      title: 'хоте́ть – wollen, möchten',
      blocks: [
        { table: { head: ['Person', 'Form', 'Person', 'Form'], rows: [
          ['я', 'хочу́', 'мы', 'хоти́м'],
          ['ты', 'хо́чешь', 'вы', 'хоти́те'],
          ['он / она́', 'хо́чет', 'они́', 'хотя́т'],
        ] } },
        { tip: 'Im Singular wird т zu **ч** (хочу́, хо́чешь, хо́чет), im Plural bleibt **т** (хоти́м, хоти́те, хотя́т). Merken als Paar: „хочу́ – хоти́м“.' },
        { p: '**Höflich bestellen:** Я хочу́ … ist in Ordnung, noch höflicher: **Мо́жно …?** (Kann ich … haben?) – kommt in 4.4.' },
      ],
    },
    {
      title: 'Der Akkusativ (Dinge)',
      blocks: [
        { p: 'Was man will, isst, kauft oder mag, steht im **Akkusativ**. Bei Dingen ändert sich nur das weibliche -а/-я:' },
        { table: { head: ['', 'Nominativ', 'Akkusativ'], rows: [
          ['m', 'сок, чай, пиро́г', '= сок, чай, пиро́г'],
          ['n', 'молоко́, вино́', '= молоко́, вино́'],
          ['f auf -а', 'пи́цца, вода́, ры́ба', 'пи́цц**у**, во́д**у**, ры́б**у**'],
          ['f auf -я', 'ня́ня', 'ня́н**ю**'],
          ['f auf -ь', 'соль', '= соль'],
        ] } },
        { tip: 'Bei Personen und Tieren (belebt) ist der Akkusativ anders – das kommt später.' },
      ],
    },
  ],
  exercises: [
    { type: 'gap', prompt: 'Konjugiere хоте́ть.', before: 'Я', after: 'чай.', answer: 'хочу́' },
    { type: 'gap', prompt: 'Konjugiere хоте́ть.', before: 'Что вы', after: '?', answer: 'хоти́те' },
    { type: 'choice', prompt: 'Ты … ко́фе?', options: ['хочу́', 'хо́чешь', 'хоти́те'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Я хочу́ … (Pizza)', options: ['пи́цца', 'пи́ццу', 'пи́ццы'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Мы хоти́м … (Wasser)', options: ['вода́', 'во́ду', 'воды́'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Она́ хо́чет … (Saft)', options: ['сок', 'со́ку', 'со́ка'], answer: 0, ruOptions: true, explain: 'Männlich, unbelebt → im Akkusativ unverändert.' },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Das ist alles.', answer: 'Э́то всё.' },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Я хочу́ ко́фе и пиро́г.', answer: 'Я хочу́ ко́фе и пиро́г.' },
  ],
  speak: ['Я хочу́ ко́фе.', 'Я хочу́ сок и пи́ццу.', 'Нет, спаси́бо. Э́то всё.'],
};

const l42: Lesson = {
  id: '4.2',
  unit: 4,
  title: { ru: 'Что ты лю́бишь?', de: 'Was magst du?' },
  canDo: 'Ich kann sagen, was ich gern esse und was nicht.',
  speakers: { max: S.max, lena: S.lena },
  dialogs: [
    {
      title: 'Max möchte für Lena kochen',
      lines: [
        { who: 'max', ru: 'Ле́на, ты лю́бишь ры́бу?', translit: 'ljéna, ty ljúbisch rýbu', de: 'Lena, magst du Fisch?', note: '**люби́ть** + Akkusativ: ры́ба → ры́бу.' },
        { who: 'lena', ru: 'Нет, ры́бу я не о́чень люблю́.', translit: "njet, rýbu ja ni ótschin' ljubljú", de: 'Nein, Fisch mag ich nicht so sehr.', note: 'Im я-Form kommt ein **л** dazu: любить → я лю**бл**ю́.' },
        { who: 'max', ru: 'А мя́со?', translit: 'a mjása', de: 'Und Fleisch?' },
        { who: 'lena', ru: 'Мя́со я не ем. Я вегетариа́нка.', translit: 'mjása ja ni jem. ja wigitariánka', de: 'Fleisch esse ich nicht. Ich bin Vegetarierin.' },
        { who: 'max', ru: 'Поня́тно. А что ты лю́бишь?', translit: 'panjátna. a schto ty ljúbisch', de: 'Verstehe. Und was magst du?' },
        { who: 'lena', ru: 'Я о́чень люблю́ о́вощи, сыр и ка́шу.', translit: "ja ótschin' ljubljú ówaschschi, syr i káschu", de: 'Ich mag sehr gern Gemüse, Käse und Brei.' },
        { who: 'max', ru: 'Тогда́ я гото́влю сала́т с сы́ром!', translit: 'tagdá ja gatówlju salát s sýram', de: 'Dann mache ich einen Salat mit Käse!', note: '**с сы́ром** = mit Käse (Instrumental) – mehr dazu in 4.5.' },
        { who: 'lena', ru: 'Отли́чно!', translit: 'atlítschna', de: 'Super!' },
      ],
    },
  ],
  vocab: ['люби́ть', 'ры́ба', 'мя́со', 'сыр', 'о́вощи', 'фру́кты', 'ка́ша', 'вегетариа́нка', 'вегетариа́нец', 'Поня́тно.', 'гото́вить', 'сала́т'],
  grammar: [
    {
      title: 'люби́ть – lieben, mögen',
      blocks: [
        { table: { head: ['Person', 'Form', 'Person', 'Form'], rows: [
          ['я', 'люблю́', 'мы', 'лю́бим'],
          ['ты', 'лю́бишь', 'вы', 'лю́бите'],
          ['он / она́', 'лю́бит', 'они́', 'лю́бят'],
        ] } },
        { tip: 'i-Konjugation mit zwei Besonderheiten: **л** in der я-Form (люблю́, auch гото́влю) und die Betonung springt nach der я-Form auf den Stamm.' },
        { p: '**люби́ть** + Akkusativ: Я люблю́ **ка́шу**. · + Infinitiv: Я люблю́ **гото́вить**.' },
        { p: '**Verneinung:** Я **не** люблю́ ры́бу. · Abgeschwächt: Я не **о́чень** люблю́ ры́бу (nicht so sehr).' },
      ],
    },
  ],
  exercises: [
    { type: 'gap', prompt: 'Konjugiere люби́ть.', before: 'Я', after: 'сыр.', answer: 'люблю́' },
    { type: 'gap', prompt: 'Konjugiere люби́ть.', before: 'Ты', after: 'ры́бу?', answer: 'лю́бишь' },
    { type: 'choice', prompt: 'Мы лю́бим … (Brei)', options: ['ка́ша', 'ка́шу', 'ка́ше'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Eine Frau sagt: „Ich bin Vegetarierin.“', options: ['Я вегетариа́нец.', 'Я вегетариа́нка.'], answer: 1, ruOptions: true },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['мя́со', 'Fleisch'], ['ры́ба', 'Fisch'], ['о́вощи', 'Gemüse'], ['фру́кты', 'Obst'], ['сыр', 'Käse']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Ich mag keinen Fisch.', answer: 'Я не люблю́ ры́бу.' },
    { type: 'choice', prompt: 'Laut Dialog: Was isst Lena nicht?', options: ['Käse', 'Fleisch', 'Gemüse'], answer: 1 },
    { type: 'order', prompt: 'Bilde den Satz „Ich koche gern.“', tokens: ['гото́вить.', 'люблю́', 'Я'], answer: 'Я люблю́ гото́вить.' },
  ],
  speak: ['Я люблю́ о́вощи.', 'Я не люблю́ ры́бу.', 'Ты лю́бишь мя́со?'],
};

const l43: Lesson = {
  id: '4.3',
  unit: 4,
  title: { ru: 'На за́втрак', de: 'Zum Frühstück' },
  canDo: 'Ich kann sagen, was ich esse und trinke, und Essgewohnheiten vergleichen.',
  speakers: { ns: S.ns, anna: S.anna },
  dialogs: [
    {
      title: 'Bei der Nachbarin',
      lines: [
        { who: 'ns', ru: 'А́нна, что вы обы́чно еди́те на за́втрак?', translit: 'ánna, schto wy abýtschna jidítje na záftrak', de: 'Anna, was essen Sie normalerweise zum Frühstück?', note: '**есть** (essen) ist unregelmäßig: я ем, вы еди́те.' },
        { who: 'anna', ru: 'Обы́чно я ем хлеб с ма́слом и сыр.', translit: 'abýtschna ja jem chljep s máslam i syr', de: 'Normalerweise esse ich Brot mit Butter und Käse.' },
        { who: 'ns', ru: 'А что вы пьёте?', translit: 'a schto wy pjótje', de: 'Und was trinken Sie?' },
        { who: 'anna', ru: 'Ко́фе. Я пью ко́фе ка́ждое у́тро.', translit: 'kófje. ja pju kófje kázhdaje útra', de: 'Kaffee. Ich trinke jeden Morgen Kaffee.' },
        { who: 'ns', ru: 'А мы в Росси́и ча́сто еди́м ка́шу и пьём чай.', translit: 'a my w rassíi tschásta jidím káschu i pjom tschaj', de: 'Wir in Russland essen oft Brei und trinken Tee.' },
        { who: 'anna', ru: 'Ка́шу? На за́втрак?', translit: 'káschu? na záftrak', de: 'Brei? Zum Frühstück?' },
        { who: 'ns', ru: 'Да! Овся́нку, гре́чку… Попро́буйте!', translit: 'da! afsjánku, grjétschku… paprópujtje', de: 'Ja! Haferbrei, Buchweizen … Probieren Sie mal!', note: '**гре́чка** (Buchweizen) ist in Russland ein Grundnahrungsmittel – herzhaft, oft mit Butter.' },
      ],
    },
  ],
  vocab: ['есть', 'пить', 'обы́чно', 'на за́втрак', 'за́втрак', 'обе́д', 'у́жин', 'хлеб', 'ма́сло', 'ка́ждый', 'ча́сто', 'гре́чка', 'овся́нка', 'Попро́буйте!'],
  grammar: [
    {
      title: 'есть und пить',
      blocks: [
        { table: { head: ['', 'есть (essen)', 'пить (trinken)'], rows: [
          ['я', 'ем', 'пью'],
          ['ты', 'ешь', 'пьёшь'],
          ['он / она́', 'ест', 'пьёт'],
          ['мы', 'еди́м', 'пьём'],
          ['вы', 'еди́те', 'пьёте'],
          ['они́', 'едя́т', 'пьют'],
        ] } },
        { tip: '**есть** ist eines der wenigen ganz unregelmäßigen Verben – auswendig lernen. **пить** folgt der e-Konjugation mit dem Stamm **пь-**.' },
      ],
    },
    {
      title: 'Mahlzeiten',
      blocks: [
        { table: { head: ['Mahlzeit', 'zum …'], rows: [
          ['за́втрак (Frühstück)', 'на за́втрак'],
          ['обе́д (Mittagessen)', 'на обе́д'],
          ['у́жин (Abendessen)', 'на у́жин'],
        ] } },
        { p: 'Russen essen mittags oft warm und mit Suppe: **пе́рвое** (Suppe), **второ́е** (Hauptgericht), **десе́рт**.' },
      ],
    },
  ],
  exercises: [
    { type: 'gap', prompt: 'Konjugiere есть.', before: 'Я', after: 'хлеб.', answer: 'ем' },
    { type: 'gap', prompt: 'Konjugiere есть.', before: 'Что вы', after: 'на у́жин?', answer: 'еди́те' },
    { type: 'gap', prompt: 'Konjugiere пить.', before: 'Мы', after: 'чай.', answer: 'пьём' },
    { type: 'choice', prompt: 'Он … ко́фе ка́ждое у́тро.', options: ['пью', 'пьёт', 'пьют'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Они́ … ка́шу.', options: ['ем', 'ест', 'едя́т'], answer: 2, ruOptions: true },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['за́втрак', 'Frühstück'], ['обе́д', 'Mittagessen'], ['у́жин', 'Abendessen'], ['ча́сто', 'oft'], ['обы́чно', 'normalerweise']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Was trinkst du?', answer: 'Что ты пьёшь?', alternatives: ['Что ты пьешь?'] },
    { type: 'choice', prompt: 'Laut Dialog: Was isst man in Russland oft zum Frühstück?', options: ['Brot mit Butter', 'Brei', 'Pizza'], answer: 1 },
  ],
  speak: ['Я ем хлеб с ма́слом.', 'Я пью ко́фе ка́ждое у́тро.', 'Что вы еди́те на за́втрак?'],
};

const l44: Lesson = {
  id: '4.4',
  unit: 4,
  title: { ru: 'В рестора́не', de: 'Im Restaurant' },
  canDo: 'Ich kann im Restaurant bestellen, um Empfehlungen bitten und bezahlen.',
  speakers: { waiter: S.waiter, ip: S.ip, anna: S.anna },
  dialogs: [
    {
      title: 'Geschäftsessen',
      lines: [
        { who: 'waiter', ru: 'До́брый ве́чер! Вот меню́.', translit: 'dóbryj wjétschir! wot minjú', de: 'Guten Abend! Hier ist die Speisekarte.' },
        { who: 'ip', ru: 'Спаси́бо. Что вы посове́туете?', translit: 'spasíba. schto wy pasawjétujitje', de: 'Danke. Was empfehlen Sie?' },
        { who: 'waiter', ru: 'Сего́дня у нас о́чень вку́сный борщ.', translit: "siwódnja u nas ótschin' fkúsnyj borschsch", de: 'Heute haben wir einen sehr leckeren Borschtsch.' },
        { who: 'ip', ru: 'Хорошо́, я бу́ду борщ. А вы, А́нна?', translit: 'charaschó, ja búdu borschsch. a wy, ánna', de: 'Gut, ich nehme den Borschtsch. Und Sie, Anna?', note: '**Я бу́ду …** + Akkusativ ist die übliche Art zu bestellen: „Ich nehme …“.' },
        { who: 'anna', ru: 'А я бу́ду сала́т и ры́бу.', translit: 'a ja búdu salát i rýbu', de: 'Ich nehme den Salat und den Fisch.' },
        { who: 'waiter', ru: 'Что вы бу́дете пить?', translit: "schto wy búditje pit'", de: 'Was möchten Sie trinken?' },
        { who: 'ip', ru: 'Во́ду, пожа́луйста.', translit: 'wódu, pazhálsta', de: 'Wasser, bitte.' },
        { who: 'anna', ru: 'И мне то́же.', translit: 'i mnje tózhe', de: 'Für mich auch.' },
        { who: 'anna', ru: 'Счёт, пожа́луйста! Мо́жно карто́й?', translit: 'schschjot, pazhálsta! mózhna kartój', de: 'Die Rechnung, bitte! Kann ich mit Karte zahlen?', note: '**карто́й** = mit Karte (Instrumental von ка́рта).' },
        { who: 'waiter', ru: 'Да, коне́чно.', translit: 'da, kanjéschna', de: 'Ja, natürlich.', note: '**коне́чно** spricht man [kanjéschna] – mit „sch“.' },
      ],
    },
  ],
  vocab: ['меню́', 'Что вы посове́туете?', 'вку́сный', 'борщ', 'суп', 'Я бу́ду …', 'Что вы бу́дете пить?', 'И мне то́же.', 'Счёт, пожа́луйста!', 'Мо́жно карто́й?', 'коне́чно', 'вку́сно'],
  grammar: [
    {
      title: 'Bestellen und bezahlen',
      blocks: [
        { table: { head: ['Russisch', 'Deutsch'], rows: [
          ['Меню́, пожа́луйста.', 'Die Speisekarte, bitte.'],
          ['Что вы посове́туете?', 'Was empfehlen Sie?'],
          ['Я бу́ду борщ / ры́бу.', 'Ich nehme den Borschtsch / den Fisch.'],
          ['Мо́жно ещё во́ду?', 'Kann ich noch ein Wasser bekommen?'],
          ['Счёт, пожа́луйста!', 'Die Rechnung, bitte!'],
          ['Мо́жно карто́й?', 'Kann ich mit Karte zahlen?'],
          ['Сда́чи не на́до.', 'Stimmt so.'],
        ] } },
        { tip: 'Nach **Я бу́ду** und **Мо́жно** steht der Akkusativ – genau wie nach хочу́: ры́бу, во́ду.' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Wie fragst du nach einer Empfehlung?', options: ['Что вы посове́туете?', 'Что вы хоти́те?', 'Что́-нибудь ещё?'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Я бу́ду … (Fisch)', options: ['ры́ба', 'ры́бу', 'ры́бы'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze die Bestellung.', before: 'Я', after: 'суп.', answer: 'бу́ду' },
    { type: 'choice', prompt: 'Hör zu: Was möchte der Gast?', audio: 'Счёт, пожа́луйста!', options: ['die Speisekarte', 'die Rechnung', 'Wasser'], answer: 1 },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Kann ich mit Karte zahlen?', answer: 'Мо́жно карто́й?' },
    { type: 'order', prompt: 'Bilde die Frage „Was möchten Sie trinken?“', tokens: ['пить?', 'бу́дете', 'вы', 'Что'], answer: 'Что вы бу́дете пить?' },
    { type: 'choice', prompt: 'Laut Dialog: Was empfiehlt der Kellner?', options: ['Fisch', 'Salat', 'Borschtsch'], answer: 2 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'И мне то́же.', answer: 'И мне то́же.' },
  ],
  speak: ['Что вы посове́туете?', 'Я бу́ду борщ.', 'Счёт, пожа́луйста!', 'Мо́жно карто́й?'],
};

const l45: Lesson = {
  id: '4.5',
  unit: 4,
  title: { ru: 'Прия́тного аппети́та!', de: 'Guten Appetit!' },
  canDo: 'Ich kann sagen, womit oder ohne was ich etwas möchte, und bei Tisch die üblichen Wendungen benutzen.',
  speakers: { olja: S.olja, max: S.max },
  dialogs: [
    {
      title: 'Abendessen bei Max',
      lines: [
        { who: 'olja', ru: 'Как вку́сно па́хнет! Что ты гото́вишь?', translit: 'kak fkúsna páchnit! schto ty gatówisch', de: 'Wie lecker das riecht! Was kochst du?' },
        { who: 'max', ru: 'Пельме́ни со смета́ной.', translit: "pil'mjéni sa smitánaj", de: 'Pelmeni mit Schmand.', note: '**с** + Instrumental = „mit“: смета́на → со смета́ной. Vor schwierigen Konsonantengruppen wird с zu **со**.' },
        { who: 'olja', ru: 'Ты гото́вишь пельме́ни? Сам?', translit: "ty gatówisch pil'mjéni? sam", de: 'Du machst Pelmeni? Selbst?' },
        { who: 'max', ru: 'Нет, они́ из магази́на. Но с любо́вью!', translit: "njet, aní iz magazína. no s ljubów'ju", de: 'Nein, die sind aus dem Laden. Aber mit Liebe!' },
        { who: 'olja', ru: 'Смешно́! А что мы пьём?', translit: 'smischnó! a schto my pjom', de: 'Witzig! Und was trinken wir?' },
        { who: 'max', ru: 'Чай с лимо́ном и́ли ко́фе с молоко́м?', translit: 'tschaj s limónam íli kófje s malakóm', de: 'Tee mit Zitrone oder Kaffee mit Milch?' },
        { who: 'olja', ru: 'Чай, пожа́луйста. Без са́хара.', translit: 'tschaj, pazhálsta. bis sáchara', de: 'Tee, bitte. Ohne Zucker.', note: '**без** + Genitiv = „ohne“: са́хар → без са́хара.' },
        { who: 'max', ru: 'Прия́тного аппети́та!', translit: 'prijátnawa appitíta', de: 'Guten Appetit!' },
        { who: 'olja', ru: 'Спаси́бо! О́чень вку́сно!', translit: "spasíba! ótschin' fkúsna", de: 'Danke! Sehr lecker!' },
      ],
    },
  ],
  vocab: ['Как вку́сно па́хнет!', 'пельме́ни', 'смета́на', 'сам', 'с', 'без', 'лимо́н', 'молоко́', 'са́хар', 'Прия́тного аппети́та!'],
  grammar: [
    {
      title: '„mit“ und „ohne“',
      blocks: [
        { p: '**с** (mit) + Instrumental – vorerst als feste Ausdrücke:' },
        { table: { head: ['Nominativ', 'mit …', 'Endung'], rows: [
          ['лимо́н', 'с лимо́н**ом**', 'm: + ом'],
          ['сыр', 'с сы́р**ом**', 'm: + ом'],
          ['молоко́', 'с молок**о́м**', 'n: -о → -ом'],
          ['смета́на', 'со смета́н**ой**', 'f: -а → -ой'],
          ['ка́рта', 'карт**о́й** (ohne с: „per Karte“)', 'f: -а → -ой'],
        ] } },
        { p: '**без** (ohne) + Genitiv – dieselben Endungen wie nach нет:' },
        { table: { head: ['Nominativ', 'ohne …'], rows: [
          ['са́хар', 'без са́хар**а**'],
          ['молоко́', 'без молок**а́**'],
          ['мя́со', 'без мя́с**а**'],
          ['смета́на', 'без смета́н**ы**'],
        ] } },
      ],
    },
    {
      title: 'Bei Tisch',
      blocks: [
        { table: { head: ['Russisch', 'Deutsch'], rows: [
          ['Прия́тного аппети́та!', 'Guten Appetit!'],
          ['О́чень вку́сно!', 'Sehr lecker!'],
          ['Ещё, пожа́луйста.', 'Noch etwas, bitte.'],
          ['Спаси́бо, я сыт / сыта́.', 'Danke, ich bin satt (Mann / Frau).'],
          ['За здоро́вье!', 'Auf die Gesundheit! (Trinkspruch)'],
        ] } },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Tee mit Zitrone = чай с …', options: ['лимо́н', 'лимо́ном', 'лимо́на'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Kaffee ohne Zucker = ко́фе без …', options: ['са́хар', 'са́харом', 'са́хара'], answer: 2, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „mit Milch“.', before: 'Ко́фе с', after: ', пожа́луйста.', answer: 'молоко́м' },
    { type: 'choice', prompt: 'Was sagt man vor dem Essen?', options: ['Прия́тного аппети́та!', 'За здоро́вье!', 'Счёт, пожа́луйста!'], answer: 0, ruOptions: true },
    { type: 'gap', prompt: 'Konjugiere гото́вить.', before: 'Что ты', after: '?', answer: 'гото́вишь' },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Sehr lecker!', answer: 'О́чень вку́сно!' },
    { type: 'choice', prompt: 'Laut Dialog: Woher sind die Pelmeni?', options: ['selbst gemacht', 'aus dem Laden', 'von Oljas Mutter'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Чай с лимо́ном, пожа́луйста.', answer: 'Чай с лимо́ном, пожа́луйста.' },
  ],
  speak: ['Чай с лимо́ном, пожа́луйста.', 'Ко́фе без са́хара.', 'Прия́тного аппети́та!'],
};

const l4c: Lesson = {
  id: '4.C',
  unit: 4,
  checkpoint: true,
  title: { ru: 'Контро́льная', de: 'Checkpoint Einheit 4' },
  canDo: 'Ich kann im Café und Restaurant bestellen, über Essen sprechen und bezahlen.',
  speakers: {},
  dialogs: [],
  vocab: [],
  grammar: [],
  exercises: [
    { type: 'gap', prompt: 'Konjugiere хоте́ть.', before: 'Они́', after: 'пи́ццу.', answer: 'хотя́т' },
    { type: 'choice', prompt: 'Я хочу́ … (Suppe)', options: ['суп', 'су́пу', 'су́па'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Ты лю́бишь … (Fisch)?', options: ['ры́ба', 'ры́бу', 'ры́бой'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Konjugiere люби́ть.', before: 'Я', after: 'гото́вить.', answer: 'люблю́' },
    { type: 'gap', prompt: 'Konjugiere есть.', before: 'Что ты', after: 'на обе́д?', answer: 'ешь' },
    { type: 'gap', prompt: 'Konjugiere пить.', before: 'Они́', after: 'чай.', answer: 'пьют' },
    { type: 'choice', prompt: 'Hör zu: Was bestellt die Person?', audio: 'Я бу́ду сала́т и ры́бу.', options: ['Salat und Fisch', 'Suppe und Fleisch', 'Salat und Käse'], answer: 0 },
    { type: 'choice', prompt: 'ко́фе с … (Milch)', options: ['молоко́', 'молоко́м', 'молока́'], answer: 1, ruOptions: true },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Die Rechnung, bitte!', answer: 'Счёт, пожа́луйста!', alternatives: ['Счет, пожа́луйста!'] },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['хлеб', 'Brot'], ['молоко́', 'Milch'], ['са́хар', 'Zucker'], ['мя́со', 'Fleisch'], ['вода́', 'Wasser']] },
    { type: 'dictation', prompt: 'Hör zu und schreib die Frage.', audio: 'Что вы посове́туете?', answer: 'Что вы посове́туете?' },
    { type: 'order', prompt: 'Bilde den Satz „Ich esse kein Fleisch.“', tokens: ['мя́со.', 'не', 'ем', 'Я'], answer: 'Я не ем мя́со.' },
  ],
  speak: ['Я хочу́ ко́фе с молоко́м.', 'Я не ем мя́со.', 'Я бу́ду борщ.', 'Счёт, пожа́луйста!'],
};

export const UNIT4: Unit = {
  n: 4,
  title: { ru: 'Еда́', de: 'Essen & Café' },
  lessons: [l41, l42, l43, l44, l45, l4c],
};
