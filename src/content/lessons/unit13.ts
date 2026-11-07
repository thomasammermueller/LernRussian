import type { Lesson, Speaker, Unit } from './types';

const S: Record<string, Speaker> = {
  max: { name: 'Макс', voice: 'dmitri', emoji: '🧑' },
  olja: { name: 'О́ля', voice: 'irina', emoji: '👩' },
  anna: { name: 'А́нна', voice: 'irina', emoji: '👩‍💼' },
  ip: { name: 'Ива́н Петро́вич', voice: 'dmitri', emoji: '👨‍💼' },
  lena: { name: 'Ле́на', voice: 'irina', emoji: '👩‍🎓' },
  radio: { name: 'Дикто́р', voice: 'dmitri', emoji: '📻' },
};

const l131: Lesson = {
  id: '13.1',
  unit: 13,
  title: { ru: 'Кака́я пого́да?', de: 'Wie ist das Wetter?' },
  canDo: 'Ich kann das Wetter beschreiben und Temperaturen nennen.',
  speakers: { max: S.max, anna: S.anna },
  dialogs: [
    {
      title: 'Ein Anruf aus Moskau',
      lines: [
        { who: 'max', ru: 'А́нна, приве́т! Кака́я пого́да в Москве́?', translit: 'ánna, priwjét! kakája pagóda w maskwjé', de: 'Anna, hallo! Wie ist das Wetter in Moskau?' },
        { who: 'anna', ru: 'Ужа́сная! Хо́лодно, ми́нус пятна́дцать, и идёт снег.', translit: "uzhásnaja! chóladna, mínus pitnátsat', i idjót snjek", de: 'Furchtbar! Kalt, minus fünfzehn, und es schneit.', note: 'Wetter oft **ohne Subjekt**: Хо́лодно. (Es ist kalt.) Und wie beim Regen: идёт снег = es schneit.' },
        { who: 'max', ru: 'Ми́нус пятна́дцать? А у нас в Берли́не плюс пять и идёт дождь.', translit: "mínus pitnátsat'? a u nas w birlínje pljus pjat' i idjót dozhd'", de: 'Minus fünfzehn? Bei uns in Berlin sind es plus fünf und es regnet.' },
        { who: 'anna', ru: 'Да, но зато́ здесь све́тит со́лнце! Всё бе́лое, о́чень краси́во.', translit: "da, no zató zdjes' swjétit sóntse! fsjo bjélaje, ótschin' krasíwa", de: 'Ja, aber dafür scheint hier die Sonne! Alles ist weiß, sehr schön.', note: 'In **со́лнце** wird das л nicht gesprochen: [sóntse].' },
        { who: 'max', ru: 'А ве́тер есть?', translit: "a wjétir jest'", de: 'Und ist es windig?' },
        { who: 'anna', ru: 'Нет, ве́тра нет. Поэ́тому не так хо́лодно.', translit: 'njet, wjétra njet. paétamu ni tak chóladna', de: 'Nein, es gibt keinen Wind. Deshalb ist es nicht so kalt.' },
        { who: 'max', ru: 'Не забу́дь ша́пку и перча́тки!', translit: "ni zabút' schápku i pirtschátki", de: 'Vergiss Mütze und Handschuhe nicht!' },
      ],
    },
  ],
  vocab: ['пого́да', 'Кака́я пого́да?', 'хо́лодно', 'тепло́', 'жа́рко', 'снег', 'дождь', 'со́лнце', 'ве́тер', 'о́блачно', 'гра́дус', 'плюс', 'ми́нус', 'зато́', 'поэ́тому', 'ша́пка', 'перча́тки'],
  grammar: [
    {
      title: 'Über das Wetter sprechen',
      blocks: [
        { table: { head: ['Russisch', 'Deutsch'], rows: [
          ['Хо́лодно / тепло́ / жа́рко.', 'Es ist kalt / warm / heiß.'],
          ['Со́лнечно / о́блачно.', 'Es ist sonnig / bewölkt.'],
          ['Идёт дождь / снег.', 'Es regnet / schneit.'],
          ['Све́тит со́лнце.', 'Die Sonne scheint.'],
          ['Ду́ет ве́тер.', 'Der Wind weht.'],
          ['Сего́дня ми́нус пять гра́дусов.', 'Heute sind es minus fünf Grad.'],
        ] } },
        { tip: '**гра́дус** folgt der Zahlenregel: оди́н гра́дус, два гра́дуса, пять гра́дусов. Oft lässt man das Wort weg: «плюс пять».' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Es schneit:', options: ['Идёт снег.', 'Идёт дождь.', 'Све́тит со́лнце.'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Hör zu: Wie ist das Wetter?', audio: 'Сего́дня тепло́ и со́лнечно.', options: ['warm und sonnig', 'kalt und bewölkt', 'heiß und windig'], answer: 0 },
    { type: 'choice', prompt: 'ми́нус два …', options: ['гра́дус', 'гра́дуса', 'гра́дусов'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze den Genitiv von ве́тер („Es gibt keinen Wind“).', before: 'Сего́дня нет', after: '.', answer: 'ве́тра' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['хо́лодно', 'kalt'], ['жа́рко', 'heiß'], ['о́блачно', 'bewölkt'], ['ве́тер', 'Wind'], ['снег', 'Schnee']] },
    { type: 'translate', prompt: 'Frag auf Russisch.', de: 'Wie ist das Wetter in Moskau?', answer: 'Кака́я пого́да в Москве́?' },
    { type: 'choice', prompt: 'Laut Dialog: Wie ist das Wetter in Berlin?', options: ['minus 15 und Schnee', 'plus 5 und Regen', 'Sonne'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Хо́лодно, и идёт снег.', answer: 'Хо́лодно, и идёт снег.' },
  ],
  speak: ['Кака́я сего́дня пого́да?', 'Сего́дня хо́лодно, ми́нус де́сять.', 'Идёт дождь.'],
};

const l132: Lesson = {
  id: '13.2',
  unit: 13,
  title: { ru: 'Времена́ го́да', de: 'Die Jahreszeiten' },
  canDo: 'Ich kann über Jahreszeiten und Monate sprechen.',
  speakers: { lena: S.lena, max: S.max },
  dialogs: [
    {
      title: 'Lieblingsjahreszeit',
      lines: [
        { who: 'lena', ru: 'Макс, како́е твоё люби́мое вре́мя го́да?', translit: 'maks, kakóje twajó ljubímaje wrjémja góda', de: 'Max, was ist deine Lieblingsjahreszeit?', note: '**вре́мя** ist sächlich (wie и́мя): твоё люби́мое вре́мя.' },
        { who: 'max', ru: 'Ле́то, коне́чно! А твоё?', translit: 'ljéta, kanjéschna! a twajó', de: 'Der Sommer natürlich! Und deine?' },
        { who: 'lena', ru: 'А я люблю́ зи́му. Осо́бенно дека́брь и янва́рь: снег, Но́вый год…', translit: "a ja ljubljú zímu. asóbinna dikábr' i janwár': snjek, nówyj got…", de: 'Ich mag den Winter. Besonders Dezember und Januar: Schnee, Neujahr …' },
        { who: 'max', ru: 'А когда́ в Москве́ начина́ется зима́?', translit: 'a kagdá w maskwjé natschinájitsa zimá', de: 'Und wann beginnt in Moskau der Winter?' },
        { who: 'lena', ru: 'Обы́чно в ноябре́. А в ма́рте уже́ весна́, но ещё хо́лодно.', translit: 'abýtschna w najabrjé. a w mártje uzhé wisná, no jischschó chóladna', de: 'Normalerweise im November. Im März ist schon Frühling, aber es ist noch kalt.', note: 'Monat mit **в** + Präpositiv: ноя́брь → в ноябр**е́**.' },
        { who: 'max', ru: 'А ле́том в Москве́ жа́рко?', translit: 'a ljétam w maskwjé zhárka', de: 'Und ist es im Sommer heiß in Moskau?' },
        { who: 'lena', ru: 'В ию́ле быва́ет о́чень жа́рко, до тридцати́ гра́дусов!', translit: "w ijúlje bywájit ótschin' zhárka, da tritsatí grádusaf", de: 'Im Juli kann es sehr heiß werden, bis zu dreißig Grad!', note: '**быва́ет** = kommt vor, kann sein.' },
        { who: 'max', ru: 'Как в Берли́не!', translit: 'kak w birlínje', de: 'Wie in Berlin!' },
      ],
    },
  ],
  vocab: ['вре́мя го́да', 'люби́мый', 'зима́', 'весна́', 'ле́то', 'о́сень', 'янва́рь', 'февра́ль', 'март', 'апре́ль', 'май', 'ию́нь', 'ию́ль', 'а́вгуст', 'сентя́брь', 'октя́брь', 'ноя́брь', 'дека́брь', 'Но́вый год', 'быва́ет'],
  grammar: [
    {
      title: 'Die Monate',
      blocks: [
        { table: { head: ['Monat', 'im …', 'Monat', 'im …'], rows: [
          ['янва́рь', 'в январе́', 'ию́ль', 'в ию́ле'],
          ['февра́ль', 'в феврале́', 'а́вгуст', 'в а́вгусте'],
          ['март', 'в ма́рте', 'сентя́брь', 'в сентябре́'],
          ['апре́ль', 'в апре́ле', 'октя́брь', 'в октябре́'],
          ['май', 'в ма́е', 'ноя́брь', 'в ноябре́'],
          ['ию́нь', 'в ию́не', 'дека́брь', 'в декабре́'],
        ] } },
        { tip: 'Monate werden **kleingeschrieben**. Bei den Monaten auf **-брь** springt die Betonung im Präpositiv ans Ende: в сентябр**е́**.' },
        { p: '**Jahreszeiten:** зима́ → зимо́й, весна́ → весно́й, ле́то → ле́том, о́сень → о́сенью (aus Einheit 8).' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: '„im Januar“', options: ['в янва́рь', 'в январе́', 'в январю́'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: '„im Mai“', options: ['в ма́е', 'в ма́йе', 'в май'], answer: 0, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „im Oktober“.', before: 'Мой день рожде́ния в', after: '.', answer: 'октябре́' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['март', 'März'], ['ию́нь', 'Juni'], ['ию́ль', 'Juli'], ['а́вгуст', 'August'], ['дека́брь', 'Dezember']] },
    { type: 'choice', prompt: 'Како́е … вре́мя го́да?', options: ['твой люби́мый', 'твоя́ люби́мая', 'твоё люби́мое'], answer: 2, ruOptions: true },
    { type: 'translate', prompt: 'Frag auf Russisch.', de: 'Was ist deine Lieblingsjahreszeit?', answer: 'Како́е твоё люби́мое вре́мя го́да?' },
    { type: 'choice', prompt: 'Laut Dialog: Wann beginnt in Moskau normalerweise der Winter?', options: ['im Oktober', 'im November', 'im Dezember'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'В ма́рте ещё хо́лодно.', answer: 'В ма́рте ещё хо́лодно.' },
  ],
  speak: ['Моё люби́мое вре́мя го́да — ле́то.', 'В ию́ле о́чень жа́рко.', 'Мой день рожде́ния в ма́е.'],
};

const l133: Lesson = {
  id: '13.3',
  unit: 13,
  title: { ru: 'Мне ску́чно', de: 'Mir ist langweilig' },
  canDo: 'Ich kann sagen, wie ich mich fühle (Dativ + Zustandswort).',
  speakers: { olja: S.olja, max: S.max },
  dialogs: [
    {
      title: 'Im Kino',
      lines: [
        { who: 'olja', ru: 'Ну что, тебе́ нра́вится фильм?', translit: 'nu schto, tibjé nráwitsa fil\'m', de: 'Na, gefällt dir der Film?' },
        { who: 'max', ru: 'Че́стно? Мне ску́чно. И в за́ле так жа́рко!', translit: 'tschésna? mnje skúschna. i w zálje tak zhárka', de: 'Ehrlich? Mir ist langweilig. Und im Saal ist es so heiß!', note: 'Gefühle ohne „ich bin“: **Мне ску́чно** = mir ist langweilig. In ску́чно spricht man чн wie [schn].' },
        { who: 'olja', ru: 'А мне интере́сно. Но жа́рко, да.', translit: 'a mnje intirjésna. no zhárka, da', de: 'Ich finde ihn interessant. Aber heiß ist es, ja.' },
        { who: 'max', ru: 'Дава́й вы́йдем на мину́ту. Мне ну́жен во́здух.', translit: 'dawáj wýjdim na minútu. mnje núzhyn wózduch', de: 'Lass uns kurz rausgehen. Ich brauche Luft.' },
        { who: 'olja', ru: 'Ла́дно. Ой, на у́лице так хорошо́! Не жа́рко и не хо́лодно.', translit: 'ládna. oj, na úlitse tak charaschó! ni zhárka i ni chóladna', de: 'Okay. Oh, draußen ist es so schön! Nicht heiß und nicht kalt.' },
        { who: 'max', ru: 'Тебе́ не хо́лодно? Возьми́ мою́ ку́ртку.', translit: 'tibjé ni chóladna? wazmí majú kúrtku', de: 'Ist dir nicht kalt? Nimm meine Jacke.' },
        { who: 'olja', ru: 'Спаси́бо, ты о́чень ми́лый!', translit: "spasíba, ty ótschin' mílyj", de: 'Danke, du bist sehr lieb!' },
      ],
    },
  ],
  vocab: ['ску́чно', 'ве́село', 'гру́стно', 'стра́шно', 'интере́сно', 'че́стно', 'зал', 'во́здух', 'Ла́дно.', 'Возьми́!', 'ми́лый'],
  grammar: [
    {
      title: 'Wie geht es dir? – Dativ + Zustandswort',
      blocks: [
        { table: { head: ['Russisch', 'Deutsch'], rows: [
          ['Мне ску́чно.', 'Mir ist langweilig.'],
          ['Мне ве́село.', 'Ich habe Spaß.'],
          ['Мне гру́стно.', 'Ich bin traurig.'],
          ['Мне стра́шно.', 'Ich habe Angst.'],
          ['Мне хо́лодно / жа́рко.', 'Mir ist kalt / heiß.'],
          ['Мне интере́сно.', 'Ich finde es interessant.'],
        ] } },
        { table: { head: ['Zeit', 'Form'], rows: [
          ['Gegenwart', 'Мне ску́чно.'],
          ['Vergangenheit', 'Мне **бы́ло** ску́чно.'],
          ['Zukunft', 'Мне **бу́дет** ску́чно.'],
        ] } },
        { tip: 'Ohne Person ist es eine allgemeine Aussage: **Здесь ску́чно.** = Hier ist es langweilig.' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Mir ist kalt:', options: ['Я хо́лодный.', 'Мне хо́лодно.', 'Меня́ хо́лодно.'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: '… бы́ло ве́село на вечери́нке. (uns)', options: ['Мы', 'Нас', 'Нам'], answer: 2, ruOptions: true },
    { type: 'choice', prompt: 'Gestern war mir langweilig: Вчера́ мне … ску́чно.', options: ['был', 'бы́ло', 'бу́дет'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „ihr ist heiß“.', before: '', after: 'жа́рко.', answer: 'Ей' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['ску́чно', 'langweilig'], ['ве́село', 'lustig'], ['гру́стно', 'traurig'], ['стра́шно', 'beängstigend'], ['во́здух', 'Luft']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Ist dir nicht kalt?', answer: 'Тебе́ не хо́лодно?' },
    { type: 'choice', prompt: 'Laut Dialog: Wie findet Olja den Film?', options: ['langweilig', 'interessant', 'traurig'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Мне ску́чно.', answer: 'Мне ску́чно.' },
  ],
  speak: ['Мне ску́чно.', 'Тебе́ не хо́лодно?', 'Нам бы́ло о́чень ве́село!'],
};

const l134: Lesson = {
  id: '13.4',
  unit: 13,
  title: { ru: 'Тёплая оде́жда', de: 'Warme Kleidung' },
  canDo: 'Ich kann Adjektive in allen Fällen benutzen.',
  speakers: { ip: S.ip, anna: S.anna },
  dialogs: [
    {
      title: 'Dienstreise nach Sibirien',
      lines: [
        { who: 'ip', ru: 'А́нна, в феврале́ вы е́дете в Новосиби́рск. Там о́чень холо́дная зима́.', translit: 'ánna, f fiwraljé wy jéditje w nawasibírsk. tam ótschin\' chalódnaja zimá', de: 'Anna, im Februar fahren Sie nach Nowosibirsk. Dort ist der Winter sehr kalt.' },
        { who: 'anna', ru: 'Да, я зна́ю. Мне нужна́ тёплая оде́жда.', translit: 'da, ja znáju. mnje nuzhná tjóplaja adjézhda', de: 'Ja, ich weiß. Ich brauche warme Kleidung.' },
        { who: 'ip', ru: 'Обяза́тельно возьми́те тёплую ку́ртку, ша́пку и хоро́шие сапоги́.', translit: "abjazátil'na wazmítje tjópluju kúrtku, schápku i charóschyje sapagí", de: 'Nehmen Sie unbedingt eine warme Jacke, eine Mütze und gute Stiefel mit.', note: 'Akkusativ f: тёпл**ая** → тёпл**ую** ку́ртк**у**.' },
        { who: 'anna', ru: 'У меня́ нет тёплой ку́ртки. Где мо́жно купи́ть?', translit: "u minjá njet tjóplaj kúrtki. gdje mózhna kupít'", de: 'Ich habe keine warme Jacke. Wo kann man eine kaufen?', note: 'Genitiv f: тёпл**ой** ку́ртк**и**.' },
        { who: 'ip', ru: 'В большо́м торго́вом це́нтре на Тверско́й. Там мно́го хоро́ших магази́нов.', translit: "w bal'schóm targówam tséntrje na twirskój. tam mnóga charóschych magazínaf", de: 'Im großen Einkaufszentrum in der Twerskaja. Dort gibt es viele gute Geschäfte.', note: 'Präpositiv m: в больш**о́м** торго́в**ом** це́нтр**е**. Genitiv Plural: хоро́ш**их** магази́н**ов**.' },
        { who: 'anna', ru: 'Спаси́бо! А как вы е́здите на рабо́ту в холо́дную пого́ду?', translit: 'spasíba! a kak wy jéz\'ditje na rabótu f chalódnuju pagódu', de: 'Danke! Und wie fahren Sie bei kaltem Wetter zur Arbeit?' },
        { who: 'ip', ru: 'На метро́. В метро́ всегда́ тепло́!', translit: 'na mitró. w mitró fsigdá tipló', de: 'Mit der Metro. In der Metro ist es immer warm!' },
      ],
    },
  ],
  vocab: ['холо́дный', 'тёплый', 'хоро́ший', 'большо́й', 'оде́жда', 'сапоги́', 'торго́вый центр', 'Новосиби́рск', 'Возьми́те!'],
  grammar: [
    {
      title: 'Adjektive in allen Fällen (harte Endungen)',
      blocks: [
        { table: { head: ['Fall', 'm / n', 'f', 'Plural'], rows: [
          ['Nominativ', 'тёпл**ый** / тёпл**ое**', 'тёпл**ая**', 'тёпл**ые**'],
          ['Genitiv', 'тёпл**ого**', 'тёпл**ой**', 'тёпл**ых**'],
          ['Dativ', 'тёпл**ому**', 'тёпл**ой**', 'тёпл**ым**'],
          ['Akkusativ', '= Nom. (Ding) / = Gen. (Person)', 'тёпл**ую**', '= Nom. / = Gen.'],
          ['Instrumental', 'тёпл**ым**', 'тёпл**ой**', 'тёпл**ыми**'],
          ['Präpositiv', 'тёпл**ом**', 'тёпл**ой**', 'тёпл**ых**'],
        ] } },
        { tip: '**-ого / -его** spricht man [-awa / -iwa] – das г klingt wie в: тёплого [tjóplawa].' },
        { p: 'Nach к, г, х, ж, ш, ч, щ steht **и** statt ы: хоро́ш**ие**, хоро́ш**их**, хоро́ш**им**. Weiche Adjektive (си́ний) haben я/е/ю/и statt а/о/у/ы: си́н**его**, си́н**ей**.' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Мне нужна́ … (warme Kleidung)', options: ['тёплая оде́жда', 'тёплую оде́жду', 'тёплой оде́жды'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'У меня́ нет … (warmen Mütze)', options: ['тёплая ша́пка', 'тёплую ша́пку', 'тёплой ша́пки'], answer: 2, ruOptions: true },
    { type: 'choice', prompt: 'Мы живём в … (großen Haus)', options: ['большо́й дом', 'большо́м до́ме', 'большо́го до́ма'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Я пишу́ … (meinem guten Freund)', options: ['хоро́шему дру́гу', 'хоро́шим дру́гом', 'хоро́шего дру́га'], answer: 0, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „warme“ (Akkusativ f).', before: 'Возьми́те', after: 'ку́ртку!', answer: 'тёплую', alternatives: ['теплую'] },
    { type: 'match', prompt: 'Ordne Fall und Endung zu (тёплый).', pairs: [['Genitiv m', 'тёплого'], ['Dativ m', 'тёплому'], ['Instrumental m', 'тёплым'], ['Präpositiv m', 'тёплом'], ['Akkusativ f', 'тёплую']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Ich habe keine warme Jacke.', answer: 'У меня́ нет тёплой ку́ртки.', alternatives: ['У меня нет теплой куртки.'] },
    { type: 'choice', prompt: 'Laut Dialog: Wie fährt Iwan Petrowitsch bei Kälte zur Arbeit?', options: ['mit dem Auto', 'mit der Metro', 'zu Fuß'], answer: 1 },
  ],
  speak: ['Мне нужна́ тёплая оде́жда.', 'У меня́ нет тёплой ку́ртки.', 'В холо́дную пого́ду я е́зжу на метро́.'],
};

const l135: Lesson = {
  id: '13.5',
  unit: 13,
  title: { ru: 'Прогно́з пого́ды', de: 'Die Wettervorhersage' },
  canDo: 'Ich kann eine einfache Wettervorhersage verstehen und Pläne danach richten.',
  speakers: { radio: S.radio, olja: S.olja, max: S.max },
  dialogs: [
    {
      title: 'Im Radio',
      lines: [
        { who: 'radio', ru: 'Прогно́з пого́ды на за́втра.', translit: 'pragnós pagódy na záftra', de: 'Die Wettervorhersage für morgen.' },
        { who: 'radio', ru: 'В Москве́ бу́дет о́блачно, во второ́й полови́не дня — дождь.', translit: "w maskwjé búdit óblatschna, wa ftarój palawínje dnja — dozhd'", de: 'In Moskau wird es bewölkt sein, in der zweiten Tageshälfte Regen.' },
        { who: 'radio', ru: 'Температу́ра днём плюс двена́дцать, но́чью плюс пять. Ве́тер се́верный, сла́бый.', translit: "timpiratúra dnjom pljus dwinátsat', nótschju pljus pjat'. wjétir sjéwirnyj, slábyj", de: 'Die Temperatur tagsüber plus zwölf, nachts plus fünf. Schwacher Nordwind.' },
        { who: 'olja', ru: 'Слы́шал? За́втра бу́дет дождь.', translit: "slýschal? záftra búdit dozhd'", de: 'Hast du gehört? Morgen regnet es.' },
        { who: 'max', ru: 'Жаль! А мы хоте́ли е́хать на да́чу.', translit: "zhal'! a my chatjéli jéchat' na dátschu", de: 'Schade! Dabei wollten wir zur Datscha fahren.' },
        { who: 'olja', ru: 'Ничего́, возьмём зонт!', translit: 'nitschiwó, wazmjóm zont', de: 'Macht nichts, wir nehmen einen Schirm mit!' },
        { who: 'max', ru: 'Нет, в дождь на да́че ску́чно. Пое́дем в воскресе́нье: бу́дет со́лнечно.', translit: "njet, w dozhd' na dátsche skúschna. pajédim w waskrisjén'je: búdit sólnitschna", de: 'Nein, bei Regen ist es auf der Datscha langweilig. Fahren wir am Sonntag: Da wird es sonnig.' },
        { who: 'olja', ru: 'Хорошо́, договори́лись!', translit: 'charaschó, dagawarílis\'', de: 'Gut, abgemacht!' },
      ],
    },
  ],
  vocab: ['прогно́з пого́ды', 'бу́дет', 'сла́бый', 'си́льный', 'се́верный', 'ю́жный', 'зонт', 'со́лнечно', 'Договори́лись!', 'Ничего́.'],
  grammar: [
    {
      title: 'Wetter in Vergangenheit und Zukunft',
      blocks: [
        { table: { head: ['Gegenwart', 'Vergangenheit', 'Zukunft'], rows: [
          ['Хо́лодно.', 'Бы́ло хо́лодно.', 'Бу́дет хо́лодно.'],
          ['Идёт дождь.', 'Шёл дождь.', 'Бу́дет дождь.'],
          ['Идёт снег.', 'Шёл снег.', 'Бу́дет снег.'],
          ['Со́лнечно.', 'Бы́ло со́лнечно.', 'Бу́дет со́лнечно.'],
        ] } },
        { table: { head: ['Himmelsrichtung', 'Wind'], rows: [
          ['се́вер (Norden)', 'се́верный ве́тер'],
          ['юг (Süden)', 'ю́жный ве́тер'],
          ['за́пад (Westen)', 'за́падный ве́тер'],
          ['восто́к (Osten)', 'восто́чный ве́тер'],
        ] } },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Gestern hat es geregnet:', options: ['Вчера́ шёл дождь.', 'Вчера́ идёт дождь.', 'Вчера́ бу́дет дождь.'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Morgen wird es kalt:', options: ['За́втра бы́ло хо́лодно.', 'За́втра бу́дет хо́лодно.'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Hör zu: Wie wird das Wetter morgen?', audio: 'За́втра бу́дет со́лнечно, плюс два́дцать.', options: ['sonnig, +20', 'Regen, +12', 'bewölkt, +2'], answer: 0 },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['се́вер', 'Norden'], ['юг', 'Süden'], ['за́пад', 'Westen'], ['восто́к', 'Osten'], ['зонт', 'Regenschirm']] },
    { type: 'gap', prompt: 'Ergänze „wird sein“.', before: 'За́втра', after: 'дождь.', answer: 'бу́дет' },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Abgemacht!', answer: 'Договори́лись!' },
    { type: 'choice', prompt: 'Laut Dialog: Wann fahren Max und Olja zur Datscha?', options: ['morgen', 'am Sonntag', 'gar nicht'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Прогно́з пого́ды на за́втра.', answer: 'Прогно́з пого́ды на за́втра.' },
  ],
  speak: ['За́втра бу́дет дождь.', 'Вчера́ бы́ло со́лнечно.', 'Договори́лись!'],
};

const l13c: Lesson = {
  id: '13.C',
  unit: 13,
  checkpoint: true,
  title: { ru: 'Контро́льная', de: 'Checkpoint Einheit 13' },
  canDo: 'Ich kann über Wetter, Jahreszeiten und Gefühle sprechen und Adjektive deklinieren.',
  speakers: {},
  dialogs: [],
  vocab: [],
  grammar: [],
  exercises: [
    { type: 'choice', prompt: 'Es regnet:', options: ['Идёт дождь.', 'Есть дождь.', 'Дождь де́лает.'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'ми́нус пять …', options: ['гра́дус', 'гра́дуса', 'гра́дусов'], answer: 2, ruOptions: true },
    { type: 'choice', prompt: '„im August“', options: ['в а́вгусте', 'в а́вгуст', 'в а́вгуста'], answer: 0, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „im Dezember“.', before: 'Но́вый год в', after: '.', answer: 'декабре́' },
    { type: 'choice', prompt: '… ве́село! (uns)', options: ['Мы', 'Нам', 'Нас'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Вчера́ мне … гру́стно.', options: ['бы́ло', 'был', 'бу́дет'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Я живу́ в … (großen Stadt)', options: ['большо́й го́род', 'большо́м го́роде', 'большо́го го́рода'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Hör zu: Wie ist das Wetter?', audio: 'Сего́дня о́блачно и ду́ет си́льный ве́тер.', options: ['bewölkt und starker Wind', 'sonnig und windstill', 'Schnee'], answer: 0 },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Mir ist langweilig.', answer: 'Мне ску́чно.' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['зима́', 'Winter'], ['весна́', 'Frühling'], ['ле́то', 'Sommer'], ['о́сень', 'Herbst'], ['пого́да', 'Wetter']] },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'За́втра бу́дет хо́лодно.', answer: 'За́втра бу́дет хо́лодно.' },
    { type: 'order', prompt: 'Bilde den Satz „Ich habe keinen warmen Pullover.“', tokens: ['сви́тера.', 'тёплого', 'нет', 'меня́', 'У'], answer: 'У меня́ нет тёплого сви́тера.' },
  ],
  speak: ['Кака́я сего́дня пого́да?', 'В январе́ о́чень хо́лодно.', 'Мне ве́село.', 'За́втра бу́дет со́лнечно.'],
};

export const UNIT13: Unit = {
  n: 13,
  title: { ru: 'Пого́да', de: 'Wetter & Jahreszeiten' },
  lessons: [l131, l132, l133, l134, l135, l13c],
};
