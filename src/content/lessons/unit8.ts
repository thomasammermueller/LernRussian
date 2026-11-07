import type { Lesson, Speaker, Unit } from './types';

const S: Record<string, Speaker> = {
  max: { name: 'Макс', voice: 'dmitri', emoji: '🧑' },
  olja: { name: 'О́ля', voice: 'irina', emoji: '👩' },
  anna: { name: 'А́нна', voice: 'irina', emoji: '👩‍💼' },
  cash: { name: 'Касси́р', voice: 'irina', emoji: '🎫' },
  adm: { name: 'Администра́тор', voice: 'irina', emoji: '🛎' },
  staff: { name: 'Сотру́дник', voice: 'dmitri', emoji: '🧳' },
};

const l81: Lesson = {
  id: '8.1',
  unit: 8,
  title: { ru: 'На вокза́ле', de: 'Am Bahnhof' },
  canDo: 'Ich kann eine Fahrkarte kaufen und nach Abfahrt und Gleis fragen.',
  speakers: { anna: S.anna, cash: S.cash },
  dialogs: [
    {
      title: 'Eine Fahrkarte nach Sankt Petersburg',
      lines: [
        { who: 'anna', ru: 'Здра́вствуйте! Оди́н биле́т до Санкт-Петербу́рга, пожа́луйста.', translit: 'zdrástwujtje! adín biljét da sankt-pitirbúrga, pazhálsta', de: 'Guten Tag! Eine Fahrkarte nach Sankt Petersburg, bitte.', note: '**до** + Genitiv = bis / nach: Петербу́рг → до Петербу́рг**а**.' },
        { who: 'cash', ru: 'На како́е число́?', translit: 'na kakóje tschisló', de: 'Für welches Datum?' },
        { who: 'anna', ru: 'На за́втра.', translit: 'na záftra', de: 'Für morgen.' },
        { who: 'cash', ru: 'Есть по́езд в во́семь три́дцать и в двена́дцать со́рок.', translit: "jest' pójist w wósim' trítsat' i w dwinátsat' sórak", de: 'Es gibt einen Zug um 8:30 und um 12:40.' },
        { who: 'anna', ru: 'В во́семь три́дцать, пожа́луйста. Ско́лько сто́ит биле́т?', translit: "w wósim' trítsat', pazhálsta. skól'ka stóit biljét", de: 'Um 8:30, bitte. Was kostet die Fahrkarte?' },
        { who: 'cash', ru: 'Три ты́сячи пятьсо́т рубле́й. Ваш па́спорт, пожа́луйста.', translit: 'tri týsitschi pitsót rubljéj. wasch páspart, pazhálsta', de: 'Dreitausendfünfhundert Rubel. Ihren Pass, bitte.', note: 'In Russland braucht man für Zugtickets einen Ausweis – der Name steht auf der Fahrkarte.' },
        { who: 'anna', ru: 'Вот. А с како́й платфо́рмы отправля́ется по́езд?', translit: 'wot. a s kakój platfórmy atprawljájitsa pójist', de: 'Hier. Und von welchem Bahnsteig fährt der Zug ab?' },
        { who: 'cash', ru: 'С тре́тьей. Счастли́вого пути́!', translit: "s trjét'jej. schschislíwawa putí", de: 'Vom dritten. Gute Reise!' },
      ],
    },
  ],
  vocab: ['биле́т', 'до', 'Санкт-Петербу́рг', 'на за́втра', 'число́', 'по́езд', 'па́спорт', 'платфо́рма', 'отправля́ться', 'Счастли́вого пути́!', 'касси́р'],
  grammar: [
    {
      title: 'Präpositionen für Reisen',
      blocks: [
        { table: { head: ['Präposition', 'Fall', 'Beispiel'], rows: [
          ['до (bis, nach)', 'Genitiv', 'биле́т до Москвы́, до Петербу́рга'],
          ['из (aus)', 'Genitiv', 'по́езд из Москвы́'],
          ['с (von … herab / ab)', 'Genitiv', 'с платфо́рмы, с вокза́ла'],
          ['на (für einen Zeitpunkt)', 'Akkusativ', 'на за́втра, на пя́тницу'],
          ['в (um, Uhrzeit)', 'Akkusativ', 'в во́семь три́дцать'],
        ] } },
        { tip: 'Achtung: **с** + Genitiv = „von … weg“, **с** + Instrumental = „mit“ (чай с лимо́ном).' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'биле́т до … (Moskau)', options: ['Москва́', 'Москвы́', 'Москве́'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „nach Sankt Petersburg“.', before: 'Оди́н биле́т до', after: ', пожа́луйста.', answer: 'Санкт-Петербу́рга' },
    { type: 'choice', prompt: 'Hör zu: Wann fährt der Zug?', audio: 'По́езд отправля́ется в де́вять пятна́дцать.', options: ['9:50', '9:15', '19:15'], answer: 1 },
    { type: 'choice', prompt: 'Was wünscht man jemandem vor einer Reise?', options: ['Счастли́вого пути́!', 'Прия́тного аппети́та!', 'Споко́йной но́чи!'], answer: 0, ruOptions: true },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['биле́т', 'Fahrkarte'], ['по́езд', 'Zug'], ['платфо́рма', 'Bahnsteig'], ['па́спорт', 'Pass'], ['число́', 'Datum']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Was kostet die Fahrkarte?', answer: 'Ско́лько сто́ит биле́т?' },
    { type: 'choice', prompt: 'Laut Dialog: Von welchem Bahnsteig fährt Annas Zug?', options: ['vom ersten', 'vom zweiten', 'vom dritten'], answer: 2 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Счастли́вого пути́!', answer: 'Счастли́вого пути́!' },
  ],
  speak: ['Оди́н биле́т до Москвы́, пожа́луйста.', 'С како́й платфо́рмы отправля́ется по́езд?', 'Счастли́вого пути́!'],
};

const l82: Lesson = {
  id: '8.2',
  unit: 8,
  title: { ru: 'В гости́нице', de: 'Im Hotel' },
  canDo: 'Ich kann im Hotel einchecken, Fragen stellen und ein Problem melden.',
  speakers: { max: S.max, adm: S.adm },
  dialogs: [
    {
      title: 'Check-in in Sankt Petersburg',
      lines: [
        { who: 'max', ru: 'До́брый ве́чер! У меня́ брони́рование на фами́лию Ве́бер.', translit: "dóbryj wjétschir! u minjá braníruwanije na famíliju wjébir", de: 'Guten Abend! Ich habe eine Reservierung auf den Namen Weber.' },
        { who: 'adm', ru: 'Да, вот. Одноме́стный но́мер на три но́чи.', translit: 'da, wot. adnamjésnyj nómir na tri nótschi', de: 'Ja, hier. Ein Einzelzimmer für drei Nächte.' },
        { who: 'max', ru: 'Пра́вильно. За́втрак включён?', translit: "práwil'na. záftrak fkljutschón", de: 'Richtig. Ist das Frühstück inklusive?' },
        { who: 'adm', ru: 'Да, за́втрак с семи́ до десяти́.', translit: 'da, záftrak s simí da disití', de: 'Ja, Frühstück gibt es von sieben bis zehn.', note: '**с … до …** + Genitiv = von … bis …. Auch Zahlen haben einen Genitiv: семь → семи́, де́сять → десяти́.' },
        { who: 'max', ru: 'А како́й паро́ль от вай-фа́я?', translit: 'a kakój paról\' at waj-fája', de: 'Und wie lautet das WLAN-Passwort?' },
        { who: 'adm', ru: 'Вот, на ка́рточке. Ваш ключ. Лифт напра́во.', translit: 'wot, na kártatschkje. wasch kljutsch. lift napráwa', de: 'Hier, auf dem Kärtchen. Ihr Schlüssel. Der Aufzug ist rechts.' },
        { who: 'max', ru: 'Извини́те, у меня́ в но́мере не рабо́тает душ.', translit: 'izwinítje, u minjá w nómirje ni rabótajit dusch', de: 'Entschuldigung, in meinem Zimmer funktioniert die Dusche nicht.', note: '**не рабо́тает** = funktioniert nicht – der wichtigste Satz für Probleme.' },
        { who: 'adm', ru: 'Извини́те, пожа́луйста! Сейча́с придёт ма́стер.', translit: 'izwinítje, pazhálsta! sejtschás pridjót mástir', de: 'Entschuldigen Sie bitte! Gleich kommt ein Techniker.' },
      ],
    },
  ],
  vocab: ['гости́ница', 'брони́рование', 'одноме́стный но́мер', 'ночь', 'Пра́вильно.', 'включён', 'паро́ль', 'вай-фа́й', 'душ', 'не рабо́тает', 'ма́стер'],
  grammar: [
    {
      title: 'Im Hotel',
      blocks: [
        { table: { head: ['Russisch', 'Deutsch'], rows: [
          ['У меня́ брони́рование.', 'Ich habe eine Reservierung.'],
          ['одноме́стный / двухме́стный но́мер', 'Einzel- / Doppelzimmer'],
          ['на три но́чи', 'für drei Nächte'],
          ['За́втрак включён?', 'Ist das Frühstück inklusive?'],
          ['с семи́ до десяти́', 'von sieben bis zehn'],
          ['В но́мере не рабо́тает …', 'Im Zimmer funktioniert … nicht'],
          ['Мо́жно поменя́ть но́мер?', 'Kann ich das Zimmer wechseln?'],
        ] } },
        { tip: '**Probleme melden:** У меня́ (в но́мере) не рабо́тает душ / свет / вай-фа́й. – Höflich anfangen mit **Извини́те, …**' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Die Dusche funktioniert nicht: Душ …', options: ['не рабо́тает', 'не рабо́таю', 'нет рабо́ты'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: '„für drei Nächte“', options: ['на три но́чи', 'в три но́чи', 'до трёх ноче́й'], answer: 0, ruOptions: true },
    { type: 'gap', prompt: 'Frag, ob das Frühstück inklusive ist.', before: 'За́втрак', after: '?', answer: 'включён', alternatives: ['включен'] },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['гости́ница', 'Hotel'], ['душ', 'Dusche'], ['паро́ль', 'Passwort'], ['ключ', 'Schlüssel'], ['ма́стер', 'Techniker']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Ich habe eine Reservierung.', answer: 'У меня́ брони́рование.' },
    { type: 'choice', prompt: 'Laut Dialog: Wann gibt es Frühstück?', options: ['7–10 Uhr', '8–11 Uhr', '6–9 Uhr'], answer: 0 },
    { type: 'choice', prompt: 'Laut Dialog: Was funktioniert nicht?', options: ['das WLAN', 'die Dusche', 'der Aufzug'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'В но́мере не рабо́тает душ.', answer: 'В но́мере не рабо́тает душ.' },
  ],
  speak: ['У меня́ брони́рование.', 'За́втрак включён?', 'Извини́те, у меня́ в но́мере не рабо́тает душ.'],
};

const l83: Lesson = {
  id: '8.3',
  unit: 8,
  title: { ru: 'Что ты бу́дешь де́лать ле́том?', de: 'Was machst du im Sommer?' },
  canDo: 'Ich kann über Pläne sprechen (Zukunft).',
  speakers: { olja: S.olja, max: S.max },
  dialogs: [
    {
      title: 'Urlaubspläne',
      lines: [
        { who: 'olja', ru: 'Макс, что ты бу́дешь де́лать ле́том?', translit: "maks, schto ty búdisch djélat' ljétam", de: 'Max, was machst du im Sommer?', note: 'Zukunft: **бу́ду, бу́дешь …** + Infinitiv.' },
        { who: 'max', ru: 'Ле́том я бу́ду путеше́ствовать по Росси́и!', translit: "ljétam ja búdu putischéstwawat' pa rassíi", de: 'Im Sommer werde ich durch Russland reisen!' },
        { who: 'olja', ru: 'Здо́рово! А где ты бу́дешь?', translit: 'zdórawa! a gdje ty búdisch', de: 'Toll! Und wo wirst du sein?' },
        { who: 'max', ru: 'Снача́ла в Москве́, пото́м в Петербу́рге, а пото́м на Байка́ле.', translit: 'snatschála w maskwjé, patóm f pitirbúrgje, a patóm na bajkálje', de: 'Zuerst in Moskau, dann in Petersburg und dann am Baikalsee.' },
        { who: 'olja', ru: 'Ты бу́дешь жить в гости́нице?', translit: "ty búdisch zhyt' w gastínitse", de: 'Wirst du im Hotel wohnen?' },
        { who: 'max', ru: 'Нет, в хо́стеле. Э́то деше́вле.', translit: 'njet, f chóstilje. éta dischéwlje', de: 'Nein, im Hostel. Das ist billiger.' },
        { who: 'olja', ru: 'А что ты бу́дешь де́лать на Байка́ле?', translit: "a schto ty búdisch djélat' na bajkálje", de: 'Und was machst du am Baikalsee?' },
        { who: 'max', ru: 'Бу́ду пла́вать, гуля́ть и фотографи́ровать.', translit: "búdu pláwat', guljat' i fatagrafírawat'", de: 'Ich werde schwimmen, spazieren gehen und fotografieren.' },
        { who: 'olja', ru: 'Не забу́дь тёплую ку́ртку! Там хо́лодно.', translit: 'ni zabút\' tjópluju kúrtku! tam chóladna', de: 'Vergiss die warme Jacke nicht! Dort ist es kalt.' },
      ],
    },
  ],
  vocab: ['ле́том', 'зимо́й', 'весно́й', 'о́сенью', 'путеше́ствовать', 'хо́стел', 'пла́вать', 'гуля́ть', 'фотографи́ровать', 'Не забу́дь!', 'тёплый', 'хо́лодно'],
  grammar: [
    {
      title: 'Die Zukunft: бу́ду + Infinitiv',
      blocks: [
        { table: { head: ['Person', 'быть (Zukunft)', '+ Infinitiv'], rows: [
          ['я', 'бу́ду', 'рабо́тать'],
          ['ты', 'бу́дешь', 'отдыха́ть'],
          ['он / она́', 'бу́дет', 'чита́ть'],
          ['мы', 'бу́дем', 'гуля́ть'],
          ['вы', 'бу́дете', 'пла́вать'],
          ['они́', 'бу́дут', 'путеше́ствовать'],
        ] } },
        { p: 'Ohne Infinitiv heißt es einfach „sein“: Я **бу́ду** в Москве́ = Ich werde in Moskau sein.' },
        { tip: 'Verben auf **-овать** verlieren das -ова-: путеше́ствовать → я путеше́ствую, фотографи́ровать → я фотографи́рую.' },
      ],
    },
    {
      title: 'Jahreszeiten',
      blocks: [
        { table: { head: ['Jahreszeit', 'wann?'], rows: [
          ['зима́ (Winter)', 'зимо́й'],
          ['весна́ (Frühling)', 'весно́й'],
          ['ле́то (Sommer)', 'ле́том'],
          ['о́сень (Herbst)', 'о́сенью'],
        ] } },
      ],
    },
  ],
  exercises: [
    { type: 'gap', prompt: 'Ergänze die Zukunft von быть.', before: 'Ле́том я', after: 'путеше́ствовать.', answer: 'бу́ду' },
    { type: 'gap', prompt: 'Ergänze die Zukunft von быть.', before: 'Что вы', after: 'де́лать за́втра?', answer: 'бу́дете' },
    { type: 'choice', prompt: 'Они́ … жить в хо́стеле.', options: ['бу́дем', 'бу́дет', 'бу́дут'], answer: 2, ruOptions: true },
    { type: 'choice', prompt: '„im Winter“', options: ['зима́', 'зимо́й', 'в зиме́'], answer: 1, ruOptions: true },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['ле́том', 'im Sommer'], ['зимо́й', 'im Winter'], ['весно́й', 'im Frühling'], ['о́сенью', 'im Herbst'], ['гуля́ть', 'spazieren gehen']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Was wirst du morgen machen?', answer: 'Что ты бу́дешь де́лать за́втра?', alternatives: ['Что ты за́втра бу́дешь де́лать?'] },
    { type: 'choice', prompt: 'Laut Dialog: Wo wird Max wohnen?', options: ['im Hotel', 'im Hostel', 'bei Olja'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Не забу́дь тёплую ку́ртку!', answer: 'Не забу́дь тёплую ку́ртку!' },
  ],
  speak: ['Ле́том я бу́ду путеше́ствовать.', 'Что ты бу́дешь де́лать за́втра?', 'Не забу́дь тёплую ку́ртку!'],
};

const l84: Lesson = {
  id: '8.4',
  unit: 8,
  title: { ru: 'Мой чемода́н не пришёл', de: 'Mein Koffer ist nicht angekommen' },
  canDo: 'Ich kann um Hilfe bitten und ein Problem auf Reisen beschreiben.',
  speakers: { anna: S.anna, staff: S.staff },
  dialogs: [
    {
      title: 'Am Flughafen',
      lines: [
        { who: 'anna', ru: 'Извини́те, мой чемода́н не пришёл.', translit: 'izwinítje, moj tschimadán ni prischól', de: 'Entschuldigung, mein Koffer ist nicht angekommen.' },
        { who: 'staff', ru: 'Покажи́те, пожа́луйста, ваш биле́т.', translit: 'pakazhýtje, pazhálsta, wasch biljét', de: 'Zeigen Sie mir bitte Ihr Ticket.' },
        { who: 'anna', ru: 'Вот. Я прилете́ла из Берли́на.', translit: 'wot. ja prilitjéla iz birlína', de: 'Hier. Ich bin aus Berlin gekommen.', note: '**прилете́ть** = (mit dem Flugzeug) ankommen.' },
        { who: 'staff', ru: 'Како́й у вас чемода́н?', translit: 'kakój u was tschimadán', de: 'Was für einen Koffer haben Sie?' },
        { who: 'anna', ru: 'Большо́й, чёрный, с кра́сной ле́нтой.', translit: "bal'schój, tschórnyj, s krásnaj ljéntaj", de: 'Groß, schwarz, mit einem roten Band.' },
        { who: 'staff', ru: 'Хорошо́. Мы позвони́м вам, когда́ его́ найдём.', translit: 'charaschó. my pazwaním wam, kagdá jiwó najdjóm', de: 'Gut. Wir rufen Sie an, wenn wir ihn finden.' },
        { who: 'anna', ru: 'Спаси́бо. Вот мой но́мер телефо́на.', translit: 'spasíba. wot moj nómir tilifóna', de: 'Danke. Hier ist meine Telefonnummer.' },
      ],
    },
  ],
  vocab: ['аэропо́рт', 'чемода́н', 'не пришёл', 'прилете́ть', 'пробле́ма', 'потеря́ть', 'Помоги́те!', 'поли́ция', 'найти́'],
  grammar: [
    {
      title: 'Hilfe holen und Probleme beschreiben',
      blocks: [
        { table: { head: ['Russisch', 'Deutsch'], rows: [
          ['Помоги́те, пожа́луйста!', 'Helfen Sie mir bitte!'],
          ['У меня́ пробле́ма.', 'Ich habe ein Problem.'],
          ['Я потеря́л(а) па́спорт / телефо́н.', 'Ich habe meinen Pass / mein Handy verloren.'],
          ['Мой чемода́н не пришёл.', 'Mein Koffer ist nicht angekommen.'],
          ['Вы́зовите врача́ / поли́цию!', 'Rufen Sie einen Arzt / die Polizei!'],
          ['Где нахо́дится посо́льство?', 'Wo ist die Botschaft?'],
        ] } },
        { tip: 'Notruf in Russland: **112**. Merksatz für den Ernstfall: **Помоги́те!** [pamagítje].' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Wie rufst du um Hilfe?', options: ['Помоги́те!', 'Поверни́те!', 'Покажи́те!'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Anna (Frau): Я … па́спорт. (verloren)', options: ['потеря́л', 'потеря́ла'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze.', before: 'Мой чемода́н не', after: '.', answer: 'пришёл', alternatives: ['пришел'] },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['пробле́ма', 'Problem'], ['поли́ция', 'Polizei'], ['потеря́ть', 'verlieren'], ['найти́', 'finden'], ['аэропо́рт', 'Flughafen']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Ich habe ein Problem.', answer: 'У меня́ пробле́ма.' },
    { type: 'choice', prompt: 'Laut Dialog: Wie sieht Annas Koffer aus?', options: ['klein und rot', 'groß, schwarz, mit rotem Band', 'groß und blau'], answer: 1 },
    { type: 'choice', prompt: 'Hör zu: Was ist passiert?', audio: 'Я потеря́л телефо́н.', options: ['Er hat sein Handy verloren.', 'Er hat seinen Pass verloren.', 'Sein Koffer ist weg.'], answer: 0 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Помоги́те, пожа́луйста!', answer: 'Помоги́те, пожа́луйста!' },
  ],
  speak: ['Помоги́те, пожа́луйста!', 'Мой чемода́н не пришёл.', 'Я потеря́л па́спорт.'],
};

const l85: Lesson = {
  id: '8.5',
  unit: 8,
  title: { ru: 'Приве́т из Петербу́рга!', de: 'Grüße aus Petersburg!' },
  canDo: 'Ich kann von einer Reise erzählen: was war, was ist, was kommt.',
  speakers: { olja: S.olja, max: S.max },
  dialogs: [
    {
      title: 'Ein Anruf',
      lines: [
        { who: 'olja', ru: 'Алло́, Макс! Ну, как Петербу́рг?', translit: 'alló, maks! nu, kak pitirbúrk', de: 'Hallo, Max! Na, wie ist Petersburg?' },
        { who: 'max', ru: 'Приве́т! Тут о́чень краси́во! Вчера́ я был в Эрмита́же.', translit: "priwjét! tut ótschin' krasíwa! ftschirá ja byl w ermitázhe", de: 'Hallo! Hier ist es sehr schön! Gestern war ich in der Eremitage.' },
        { who: 'olja', ru: 'И как?', translit: 'i kak', de: 'Und wie war’s?' },
        { who: 'max', ru: 'Потряса́юще! Но там так мно́го люде́й!', translit: 'patrisájuschschi! no tam tak mnóga ljudjéj', de: 'Atemberaubend! Aber da sind so viele Leute!', note: '**мно́го** + Genitiv Plural: лю́ди → люде́й.' },
        { who: 'olja', ru: 'А что ты бу́дешь де́лать сего́дня?', translit: "a schto ty búdisch djélat' siwódnja", de: 'Und was machst du heute?' },
        { who: 'max', ru: 'Сего́дня бу́ду гуля́ть по Не́вскому проспе́кту, а ве́чером бу́ду на конце́рте.', translit: "siwódnja búdu guljat' pa njéfskamu praspjéktu, a wjétschiram búdu na kantsértje", de: 'Heute bummle ich über den Newski-Prospekt, und abends bin ich im Konzert.' },
        { who: 'olja', ru: 'Когда́ ты возвраща́ешься в Москву́?', translit: 'kagdá ty wazwraschschájischsja w maskwú', de: 'Wann kommst du nach Moskau zurück?' },
        { who: 'max', ru: 'В суббо́ту. Я привезу́ тебе́ пода́рок!', translit: 'f subótu. ja priwizú tibjé padárak', de: 'Am Samstag. Ich bringe dir ein Geschenk mit!' },
        { who: 'olja', ru: 'Ура́! Жду!', translit: 'urá! zhdu', de: 'Hurra! Ich warte!' },
      ],
    },
  ],
  vocab: ['Алло́!', 'тут', 'Эрмита́ж', 'Потряса́юще!', 'гуля́ть', 'проспе́кт', 'конце́рт', 'возвраща́ться', 'Ура́!', 'Жду!'],
  grammar: [
    {
      title: 'Die drei Zeiten im Überblick',
      blocks: [
        { table: { head: ['', 'Vergangenheit', 'Gegenwart', 'Zukunft'], rows: [
          ['я (Mann)', 'я гуля́л', 'я гуля́ю', 'я бу́ду гуля́ть'],
          ['я (Frau)', 'я гуля́ла', 'я гуля́ю', 'я бу́ду гуля́ть'],
          ['мы', 'мы гуля́ли', 'мы гуля́ем', 'мы бу́дем гуля́ть'],
          ['sein', 'был / была́ / бы́ли', '– (fällt weg)', 'бу́ду / бу́дешь …'],
        ] } },
        { p: '**гуля́ть по** + Dativ = durch / über … bummeln: по го́роду, по па́рку, по Не́вскому проспе́кту.' },
        { tip: 'Glückwunsch – damit hast du die wichtigsten Strukturen für **A1** zusammen!' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Вчера́ я … в музе́е. (Max)', options: ['был', 'бу́ду', 'есть'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'За́втра мы … в Москве́.', options: ['бы́ли', 'бу́дем', 'бу́дете'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Сейча́с я … по па́рку.', options: ['гуля́л', 'гуля́ю', 'бу́ду гуля́ть'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze den Genitiv Plural von лю́ди.', before: 'Там так мно́го', after: '!', answer: 'люде́й' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['тут', 'hier'], ['Потряса́юще!', 'Atemberaubend!'], ['конце́рт', 'Konzert'], ['Ура́!', 'Hurra!'], ['Жду!', 'Ich warte!']] },
    { type: 'translate', prompt: 'Übersetze ins Russische (als Mann).', de: 'Gestern war ich in der Eremitage.', answer: 'Вчера́ я был в Эрмита́же.' },
    { type: 'choice', prompt: 'Laut Dialog: Wann kommt Max nach Moskau zurück?', options: ['am Freitag', 'am Samstag', 'am Sonntag'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Я привезу́ тебе́ пода́рок!', answer: 'Я привезу́ тебе́ пода́рок!' },
  ],
  speak: ['Тут о́чень краси́во!', 'Вчера́ я был в музе́е.', 'За́втра я бу́ду гуля́ть по го́роду.'],
};

const l8c: Lesson = {
  id: '8.C',
  unit: 8,
  checkpoint: true,
  title: { ru: 'Контро́льная', de: 'Checkpoint Einheit 8' },
  canDo: 'Ich kann auf Reisen zurechtkommen: Tickets, Hotel, Pläne und Probleme.',
  speakers: {},
  dialogs: [],
  vocab: [],
  grammar: [],
  exercises: [
    { type: 'gap', prompt: 'Ergänze „nach Moskau“.', before: 'Оди́н биле́т до', after: ', пожа́луйста.', answer: 'Москвы́' },
    { type: 'choice', prompt: 'Hör zu: Von welchem Bahnsteig?', audio: 'По́езд отправля́ется с пе́рвой платфо́рмы.', options: ['erster', 'zweiter', 'fünfter'], answer: 0 },
    { type: 'choice', prompt: 'Im Zimmer funktioniert das WLAN nicht:', options: ['Вай-фа́й не рабо́тает.', 'Вай-фа́й нет.', 'Вай-фа́й не пришёл.'], answer: 0, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze die Zukunft.', before: 'За́втра я', after: 'отдыха́ть.', answer: 'бу́ду' },
    { type: 'choice', prompt: '„im Herbst“', options: ['о́сень', 'о́сенью', 'в о́сени'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Olja (Frau): Вчера́ я … в теа́тре.', options: ['был', 'была́', 'бу́ду'], answer: 1, ruOptions: true },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Helfen Sie mir bitte!', answer: 'Помоги́те, пожа́луйста!', alternatives: ['Помоги́те мне, пожа́луйста!'] },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['гости́ница', 'Hotel'], ['вокза́л', 'Bahnhof'], ['аэропо́рт', 'Flughafen'], ['биле́т', 'Fahrkarte'], ['па́спорт', 'Pass']] },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'За́втрак включён?', answer: 'За́втрак включён?' },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Was wirst du im Sommer machen?', answer: 'Что ты бу́дешь де́лать ле́том?' },
    { type: 'order', prompt: 'Bilde den Satz „Mein Koffer ist nicht angekommen.“', tokens: ['пришёл.', 'не', 'чемода́н', 'Мой'], answer: 'Мой чемода́н не пришёл.' },
    { type: 'choice', prompt: 'Was wünscht man vor der Reise?', options: ['Счастли́вого пути́!', 'Не́ за что!', 'Ура́!'], answer: 0, ruOptions: true },
  ],
  speak: ['Оди́н биле́т до Петербу́рга, пожа́луйста.', 'У меня́ брони́рование.', 'Ле́том я бу́ду путеше́ствовать.', 'Помоги́те, пожа́луйста!'],
};

export const UNIT8: Unit = {
  n: 8,
  title: { ru: 'Путеше́ствие', de: 'Reisen' },
  lessons: [l81, l82, l83, l84, l85, l8c],
};
