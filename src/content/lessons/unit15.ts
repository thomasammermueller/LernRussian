import type { Lesson, Speaker, Unit } from './types';

const S: Record<string, Speaker> = {
  max: { name: 'Макс', voice: 'dmitri', emoji: '🧑' },
  anna: { name: 'А́нна', voice: 'irina', emoji: '👩‍💼' },
  hair: { name: 'Парикма́хер', voice: 'irina', emoji: '💇' },
  sell: { name: 'Продаве́ц', voice: 'dmitri', emoji: '📱' },
  waiter: { name: 'Официа́нт', voice: 'dmitri', emoji: '🤵' },
  post: { name: 'Сотру́дница', voice: 'irina', emoji: '📦' },
  op: { name: 'Опера́тор', voice: 'irina', emoji: '🎧' },
};

const l151: Lesson = {
  id: '15.1',
  unit: 15,
  title: { ru: 'В парикма́херской', de: 'Beim Friseur' },
  canDo: 'Ich kann Wünsche und Anweisungen formulieren (Imperativ).',
  speakers: { hair: S.hair, max: S.max },
  dialogs: [
    {
      title: 'Ein neuer Haarschnitt',
      lines: [
        { who: 'hair', ru: 'Здра́вствуйте! Сади́тесь, пожа́луйста. Как вас подстри́чь?', translit: "zdrástwujtje! sadítis', pazhálsta. kak was padstrítsch", de: 'Guten Tag! Setzen Sie sich bitte. Wie soll ich Ihnen die Haare schneiden?' },
        { who: 'max', ru: 'Сде́лайте, пожа́луйста, покоро́че сбо́ку, а све́рху оста́вьте так.', translit: 'zdjélajtje, pazhálsta, pakarótsche zbóku, a swjérchu astáwtje tak', de: 'Machen Sie es bitte an den Seiten kürzer, und oben lassen Sie es so.', note: '**Сде́лайте, оста́вьте** – höflicher Imperativ (Sie-Form) mit **-те**.' },
        { who: 'hair', ru: 'Хорошо́. Го́лову помы́ть?', translit: 'charaschó. gólawu pamýt\'', de: 'Gut. Soll ich die Haare waschen?' },
        { who: 'max', ru: 'Да, помо́йте, пожа́луйста.', translit: 'da, pamójtje, pazhálsta', de: 'Ja, bitte waschen.' },
        { who: 'hair', ru: 'Посмотри́те в зе́ркало. Нра́вится?', translit: 'pasmatrítje w zjérkala. nráwitsa', de: 'Schauen Sie in den Spiegel. Gefällt es Ihnen?' },
        { who: 'max', ru: 'Отли́чно! Ско́лько с меня́?', translit: "atlítschna! skól'ka s minjá", de: 'Super! Was macht das?' },
        { who: 'hair', ru: 'Ты́сяча две́сти. Плати́те на ка́ссе.', translit: 'týsitscha dwjésti. platítje na kássje', de: 'Tausendzweihundert. Zahlen Sie bitte an der Kasse.' },
      ],
    },
  ],
  vocab: ['парикма́херская', 'подстри́чь', 'покоро́че', 'сбо́ку', 'све́рху', 'оста́вить', 'помы́ть', 'зе́ркало', 'Сади́тесь!'],
  grammar: [
    {
      title: 'Der Imperativ',
      blocks: [
        { p: 'Man nimmt den Präsensstamm (ты-Form ohne Endung) und hängt an:' },
        { table: { head: ['Stamm endet auf …', 'Endung', 'Beispiele (du / Sie)'], rows: [
          ['Vokal (чита́-ют)', '**-й**', 'чита́й / чита́йте, де́лай / де́лайте'],
          ['Konsonant, Endung betont (говор-ю́)', '**-и́**', 'говори́ / говори́те, пиши́ / пиши́те'],
          ['Konsonant, Stamm betont (оста́в-лю)', '**-ь**', 'оста́вь / оста́вьте, гото́вь / гото́вьте'],
        ] } },
        { table: { head: ['Unregelmäßig', 'du', 'Sie / ihr'], rows: [
          ['есть (essen)', 'ешь', 'е́шьте'],
          ['пить (trinken)', 'пей', 'пе́йте'],
          ['дать (geben)', 'дай', 'да́йте'],
          ['е́хать (fahren)', 'поезжа́й', 'поезжа́йте'],
        ] } },
        { tip: 'Reflexive Verben: сади́сь / сади́тесь, одева́йся / одева́йтесь – nach Vokal -сь, nach Konsonant -ся.' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'чита́ть → (Sie) …', options: ['чита́йте', 'чита́ите', 'читьте'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'говори́ть → (du) …', options: ['говори́й', 'говори́', 'говорь'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'пить → (Sie) …', options: ['пи́те', 'пе́йте', 'пьёте'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Imperativ (Sie) von сесть.', before: '', after: ', пожа́луйста.', answer: 'Сади́тесь' },
    { type: 'gap', prompt: 'Imperativ (du) von писа́ть.', before: '', after: 'мне письмо́!', answer: 'Пиши́' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['зе́ркало', 'Spiegel'], ['сбо́ку', 'an der Seite'], ['све́рху', 'oben'], ['оста́вить', 'lassen'], ['помы́ть', 'waschen']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Schauen Sie in den Spiegel.', answer: 'Посмотри́те в зе́ркало.' },
    { type: 'choice', prompt: 'Laut Dialog: Wo soll Max bezahlen?', options: ['beim Friseur', 'an der Kasse', 'online'], answer: 1 },
  ],
  speak: ['Сади́тесь, пожа́луйста.', 'Сде́лайте, пожа́луйста, покоро́че.', 'Посмотри́те!'],
};

const l152: Lesson = {
  id: '15.2',
  unit: 15,
  title: { ru: 'Како́й лу́чше?', de: 'Welches ist besser?' },
  canDo: 'Ich kann Dinge vergleichen (Komparativ und Superlativ).',
  speakers: { max: S.max, sell: S.sell },
  dialogs: [
    {
      title: 'Ein neues Handy',
      lines: [
        { who: 'max', ru: 'Како́й телефо́н лу́чше: э́тот и́ли тот?', translit: 'kakój tilifón lútschsche: état íli tot', de: 'Welches Handy ist besser: dieses oder jenes?' },
        { who: 'sell', ru: 'Э́тот нове́е и быстре́е, но доро́же.', translit: 'état nawjéje i bystrjéje, no darózhe', de: 'Dieses ist neuer und schneller, aber teurer.', note: 'Komparativ meist mit **-ее**: но́вый → нове́е, бы́стрый → быстре́е. Unregelmäßig: дорого́й → **доро́же**.' },
        { who: 'max', ru: 'А тот?', translit: 'a tot', de: 'Und jenes?' },
        { who: 'sell', ru: 'Тот деше́вле, но у него́ ка́мера ху́же.', translit: 'tot dischéwlje, no u niwó kámira chúzhe', de: 'Jenes ist billiger, aber es hat eine schlechtere Kamera.' },
        { who: 'max', ru: 'А како́й популя́рнее?', translit: 'a kakój papuljárnije', de: 'Und welches ist beliebter?' },
        { who: 'sell', ru: 'Э́тот. Он са́мый популя́рный в э́том году́.', translit: 'état. on sámyj papuljárnyj w étam gadú', de: 'Dieses. Es ist dieses Jahr das beliebteste.', note: 'Superlativ: **са́мый** + Adjektiv = der/die/das …-ste.' },
        { who: 'max', ru: 'Хорошо́, беру́ э́тот. Он доро́же, чем я хоте́л, но лу́чше.', translit: 'charaschó, birú état. on darózhe, schtschem ja chatjél, no lútschsche', de: 'Gut, ich nehme dieses. Es ist teurer, als ich wollte, aber besser.' },
      ],
    },
  ],
  vocab: ['тот', 'быстре́е', 'нове́е', 'доро́же', 'деше́вле', 'ка́мера', 'популя́рный', 'са́мый', 'чем', 'бли́же', 'ста́рше', 'моло́же'],
  grammar: [
    {
      title: 'Der Komparativ',
      blocks: [
        { table: { head: ['Grundform', 'Komparativ', 'Regel'], rows: [
          ['но́вый', 'нове́е', '+ ее'],
          ['бы́стрый', 'быстре́е', '+ ее'],
          ['интере́сный', 'интере́снее', '+ ее'],
          ['хоро́ший / плохо́й', 'лу́чше / ху́же', 'unregelmäßig'],
          ['большо́й / ма́ленький', 'бо́льше / ме́ньше', 'unregelmäßig'],
          ['дорого́й / дешёвый', 'доро́же / деше́вле', 'unregelmäßig'],
          ['бли́зкий / далёкий', 'бли́же / да́льше', 'unregelmäßig'],
          ['ста́рый / молодо́й', 'ста́рше / моло́же', 'bei Personen'],
        ] } },
        { p: '**als** = **чем** (mit Komma) oder Genitiv: Москва́ бо́льше, **чем** Берли́н = Москва́ бо́льше **Берли́на**.' },
        { tip: '**Superlativ:** са́мый + Adjektiv (angepasst): са́мый популя́рный телефо́н, са́мая краси́вая у́лица, са́мое большо́е о́зеро.' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Komparativ von хоро́ший:', options: ['хороше́е', 'лу́чше', 'хоро́ше'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Э́тот телефо́н … (teurer)', options: ['доро́же', 'дороже́е', 'дорогое́'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Москва́ бо́льше, … Берли́н.', options: ['как', 'чем', 'что'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Москва́ бо́льше … (als Berlin, ohne чем)', options: ['Берли́н', 'Берли́на', 'Берли́ну'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze den Superlativ („der schönste Platz“).', before: 'Э́то', after: 'краси́вая пло́щадь.', answer: 'са́мая' },
    { type: 'gap', prompt: 'Komparativ von интере́сный.', before: 'Э́та кни́га', after: ', чем фильм.', answer: 'интере́снее' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['бли́же', 'näher'], ['да́льше', 'weiter'], ['ста́рше', 'älter'], ['моло́же', 'jünger'], ['деше́вле', 'billiger']] },
    { type: 'choice', prompt: 'Laut Dialog: Was ist der Nachteil des billigeren Handys?', options: ['Es ist langsam.', 'Die Kamera ist schlechter.', 'Es ist alt.'], answer: 1 },
  ],
  speak: ['Како́й телефо́н лу́чше?', 'Э́тот деше́вле, но тот быстре́е.', 'Э́то са́мый популя́рный телефо́н.'],
};

const l153: Lesson = {
  id: '15.3',
  unit: 15,
  title: { ru: 'Извини́те, но…', de: 'Entschuldigung, aber …' },
  canDo: 'Ich kann mich höflich beschweren und um etwas bitten.',
  speakers: { anna: S.anna, waiter: S.waiter },
  dialogs: [
    {
      title: 'Ein Problem im Restaurant',
      lines: [
        { who: 'anna', ru: 'Извини́те, мо́жно вас?', translit: 'izwinítje, mózhna was', de: 'Entschuldigung, können Sie bitte kommen?', note: '**Мо́жно вас?** = höfliche Art, eine Bedienung zu rufen.' },
        { who: 'waiter', ru: 'Да, слу́шаю вас.', translit: 'da, slúschaju was', de: 'Ja, bitte?' },
        { who: 'anna', ru: 'Суп холо́дный. И я зака́зывала ры́бу, а вы принесли́ мя́со.', translit: 'sup chalódnyj. i ja zakázywala rýbu, a wy prinislí mjása', de: 'Die Suppe ist kalt. Und ich hatte Fisch bestellt, aber Sie haben Fleisch gebracht.' },
        { who: 'waiter', ru: 'Ой, извини́те, пожа́луйста! Сейча́с всё испра́вим.', translit: 'oj, izwinítje, pazhálsta! sejtschás fsjo isprawim', de: 'Oh, entschuldigen Sie bitte! Wir korrigieren das sofort.' },
        { who: 'anna', ru: 'И ещё: не могли́ бы вы принести́ ещё одну́ ви́лку?', translit: 'i jischschó: ni maglí by wy prinistí jischschó adnú wílku', de: 'Und noch etwas: Könnten Sie mir noch eine Gabel bringen?', note: '**Не могли́ бы вы …?** = Könnten Sie …? – sehr höflich (mit **бы**, Konjunktiv).' },
        { who: 'waiter', ru: 'Коне́чно. Ещё раз извини́те. Десе́рт — за счёт заведе́ния.', translit: 'kanjéschna. jischschó ras izwinítje. disért — za schschjot zawidjénija', de: 'Natürlich. Nochmals Entschuldigung. Das Dessert geht aufs Haus.' },
        { who: 'anna', ru: 'Спаси́бо, э́то о́чень ми́ло.', translit: "spasíba, éta ótschin' míla", de: 'Danke, das ist sehr nett.' },
      ],
    },
  ],
  vocab: ['Мо́жно вас?', 'Слу́шаю вас.', 'зака́зывать', 'испра́вить', 'ви́лка', 'нож', 'десе́рт', 'за счёт заведе́ния', 'Не могли́ бы вы …?', 'ми́ло'],
  grammar: [
    {
      title: 'Höflich bitten und sich beschweren',
      blocks: [
        { table: { head: ['Stufe', 'Russisch', 'Deutsch'], rows: [
          ['direkt', 'Принеси́те ви́лку.', 'Bringen Sie eine Gabel.'],
          ['höflich', 'Принеси́те, пожа́луйста, ви́лку.', 'Bringen Sie bitte eine Gabel.'],
          ['sehr höflich', 'Не могли́ бы вы принести́ ви́лку?', 'Könnten Sie eine Gabel bringen?'],
          ['Beschwerde', 'Извини́те, но суп холо́дный.', 'Entschuldigung, aber die Suppe ist kalt.'],
          ['Beschwerde', 'Я зака́зывал(а) …, а вы принесли́ …', 'Ich hatte … bestellt, aber Sie haben … gebracht.'],
        ] } },
        { tip: 'Russische Bitten klingen mit **пожа́луйста** und dem Imperativ völlig höflich – der Imperativ ist im Russischen nicht unhöflich!' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Wie rufst du höflich die Bedienung?', options: ['Мо́жно вас?', 'Эй, вы!', 'Иди́ сюда́!'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Am höflichsten:', options: ['Принеси́те меню́.', 'Не могли́ бы вы принести́ меню́?', 'Меню́!'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „hatte bestellt“ (Frau).', before: 'Я', after: 'ры́бу.', answer: 'зака́зывала' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['ви́лка', 'Gabel'], ['нож', 'Messer'], ['ло́жка', 'Löffel'], ['десе́рт', 'Dessert'], ['испра́вить', 'korrigieren']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Entschuldigung, aber die Suppe ist kalt.', answer: 'Извини́те, но суп холо́дный.' },
    { type: 'choice', prompt: '„за счёт заведе́ния“ bedeutet …', options: ['auf Rechnung', 'aufs Haus', 'zum Mitnehmen'], answer: 1 },
    { type: 'choice', prompt: 'Laut Dialog: Was hatte Anna bestellt?', options: ['Fleisch', 'Fisch', 'Suppe und Dessert'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib die Frage.', audio: 'Не могли́ бы вы принести́ ви́лку?', answer: 'Не могли́ бы вы принести́ ви́лку?' },
  ],
  speak: ['Извини́те, мо́жно вас?', 'Суп холо́дный.', 'Не могли́ бы вы принести́ ви́лку?'],
};

const l154: Lesson = {
  id: '15.4',
  unit: 15,
  title: { ru: 'На по́чте', de: 'Auf der Post' },
  canDo: 'Ich kann ein Paket verschicken und ein Formular ausfüllen.',
  speakers: { anna: S.anna, post: S.post },
  dialogs: [
    {
      title: 'Ein Paket nach Deutschland',
      lines: [
        { who: 'anna', ru: 'Здра́вствуйте! Я хочу́ отпра́вить посы́лку в Герма́нию.', translit: "zdrástwujtje! ja chatschú atprávit' pasýlku w girmániju", de: 'Guten Tag! Ich möchte ein Paket nach Deutschland schicken.' },
        { who: 'post', ru: 'Положи́те её на весы́. Так, два килогра́мма. Запо́лните, пожа́луйста, бланк.', translit: 'palazhýtje jijó na wisý. tak, dwa kilagráma. zapólnitje, pazhálsta, blank', de: 'Legen Sie es auf die Waage. So, zwei Kilo. Füllen Sie bitte das Formular aus.' },
        { who: 'anna', ru: 'Что писа́ть здесь?', translit: "schto pisát' zdjes'", de: 'Was soll ich hier schreiben?' },
        { who: 'post', ru: 'Здесь а́дрес получа́теля, а здесь ваш а́дрес. Пиши́те лати́нскими бу́квами.', translit: "zdjes' ádris palutschátilja, a zdjes' wasch ádris. pischýtje latínskimi búkwami", de: 'Hier die Adresse des Empfängers und hier Ihre Adresse. Schreiben Sie in lateinischen Buchstaben.', note: 'Allgemeine Anweisung → imperfektiv (**пиши́те**). Einmalige Aufgabe → perfektiv (**запо́лните**).' },
        { who: 'anna', ru: 'Ско́лько вре́мени идёт посы́лка?', translit: "skól'ka wrjémini idjót pasýlka", de: 'Wie lange braucht das Paket?' },
        { who: 'post', ru: 'Приме́рно две неде́ли.', translit: 'primjérna dwje nidjéli', de: 'Ungefähr zwei Wochen.' },
        { who: 'anna', ru: 'А мо́жно быстре́е?', translit: 'a mózhna bystrjéje', de: 'Und geht es auch schneller?' },
        { who: 'post', ru: 'Мо́жно экспре́сс-доста́вкой, но э́то доро́же. И подпиши́те здесь, пожа́луйста.', translit: 'mózhna ekspréss-dastáwkaj, no éta darózhe. i padpischýtje zdjes\', pazhálsta', de: 'Mit Expresszustellung, aber das ist teurer. Und unterschreiben Sie bitte hier.' },
      ],
    },
  ],
  vocab: ['отпра́вить', 'посы́лка', 'весы́', 'запо́лнить', 'бланк', 'получа́тель', 'бу́ква', 'приме́рно', 'доста́вка', 'подписа́ть'],
  grammar: [
    {
      title: 'Aspekt im Imperativ',
      blocks: [
        { table: { head: ['perfektiv: eine konkrete Handlung', 'imperfektiv: allgemein / Aufforderung zu beginnen'], rows: [
          ['Запо́лните бланк.', 'Пиши́те разбо́рчиво. (Schreiben Sie leserlich.)'],
          ['Подпиши́те здесь.', 'Проходи́те! Сади́тесь!'],
          ['Положи́те посы́лку на весы́.', 'Звони́те, е́сли бу́дут вопро́сы.'],
        ] } },
        { tip: 'Verneint steht fast immer der **imperfektive** Imperativ: **Не звони́** мне по́сле десяти́! **Не опа́здывай!**' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Einmalige Aufforderung: „Füllen Sie das Formular aus.“', options: ['Запо́лните бланк.', 'Заполня́йте бланк.'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Verbot: „Ruf mich nicht nach 22 Uhr an!“', options: ['Не позвони́ мне по́сле десяти́!', 'Не звони́ мне по́сле десяти́!'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „unterschreiben Sie“.', before: '', after: 'здесь, пожа́луйста.', answer: 'Подпиши́те' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['посы́лка', 'Paket'], ['весы́', 'Waage'], ['бланк', 'Formular'], ['получа́тель', 'Empfänger'], ['бу́ква', 'Buchstabe']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Ich möchte ein Paket nach Deutschland schicken.', answer: 'Я хочу́ отпра́вить посы́лку в Герма́нию.' },
    { type: 'choice', prompt: 'Laut Dialog: Wie lange braucht das Paket normal?', options: ['zwei Tage', 'eine Woche', 'zwei Wochen'], answer: 2 },
    { type: 'choice', prompt: 'Hör zu: Wie schwer ist das Paket?', audio: 'Посы́лка — три килогра́мма.', options: ['2 kg', '3 kg', '13 kg'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Запо́лните, пожа́луйста, бланк.', answer: 'Запо́лните, пожа́луйста, бланк.' },
  ],
  speak: ['Я хочу́ отпра́вить посы́лку.', 'Ско́лько вре́мени идёт посы́лка?', 'Где подписа́ть?'],
};

const l155: Lesson = {
  id: '15.5',
  unit: 15,
  title: { ru: 'Слу́жба подде́ржки', de: 'Die Hotline' },
  canDo: 'Ich kann am Telefon ein technisches Problem melden und einen Termin vereinbaren.',
  speakers: { op: S.op, max: S.max },
  dialogs: [
    {
      title: 'Das Internet geht nicht',
      lines: [
        { who: 'op', ru: 'Слу́жба подде́ржки, здра́вствуйте! Чем могу́ помо́чь?', translit: 'slúzhba paddjérzhki, zdrástwujtje! tschem magú pamótsch', de: 'Kundendienst, guten Tag! Wie kann ich helfen?' },
        { who: 'max', ru: 'Здра́вствуйте! У меня́ уже́ два дня не рабо́тает интерне́т.', translit: 'zdrástwujtje! u minjá uzhé dwa dnja ni rabótajit intirnét', de: 'Guten Tag! Bei mir funktioniert schon seit zwei Tagen das Internet nicht.' },
        { who: 'op', ru: 'Назови́те, пожа́луйста, ваш а́дрес.', translit: 'nazawítje, pazhálsta, wasch ádris', de: 'Nennen Sie bitte Ihre Adresse.' },
        { who: 'max', ru: 'Ле́нинский проспе́кт, дом пятна́дцать, кварти́ра со́рок.', translit: "ljéninskij praspjékt, dom pitnátsat', kwartíra sórak", de: 'Leninski-Prospekt, Haus 15, Wohnung 40.' },
        { who: 'op', ru: 'Спаси́бо. Вы́ключите ро́утер и включи́те его́ сно́ва.', translit: 'spasíba. wýkljutschitje róutir i fkljutschítje jiwó snówa', de: 'Danke. Schalten Sie den Router aus und wieder ein.' },
        { who: 'max', ru: 'Я уже́ де́лал э́то. Не помога́ет.', translit: 'ja uzhé djélal éta. ni pamagájit', de: 'Das habe ich schon gemacht. Es hilft nicht.' },
        { who: 'op', ru: 'Поня́тно. Тогда́ к вам придёт ма́стер. Когда́ вам удо́бно?', translit: 'panjátna. tagdá k wam pridjót mástir. kagdá wam udóbna', de: 'Verstehe. Dann kommt ein Techniker zu Ihnen. Wann passt es Ihnen?', note: '**удо́бно** + Dativ = es passt jemandem: Вам удо́бно? Мне удо́бно.' },
        { who: 'max', ru: 'За́втра по́сле шести́. Чем ра́ньше, тем лу́чше!', translit: "záftra pósli schystí. tschem rán'sche, tjem lútschsche", de: 'Morgen nach sechs. Je früher, desto besser!', note: '**Чем …, тем …** + Komparativ = je …, desto …' },
        { who: 'op', ru: 'Хорошо́, за́втра с шести́ до восьми́.', translit: "charaschó, záftra s schystí da wasmí", de: 'Gut, morgen zwischen sechs und acht.' },
      ],
    },
  ],
  vocab: ['слу́жба подде́ржки', 'Чем могу́ помо́чь?', 'интерне́т', 'Назови́те!', 'ро́утер', 'вы́ключить', 'включи́ть', 'сно́ва', 'Не помога́ет.', 'удо́бно', 'Чем ра́ньше, тем лу́чше.'],
  grammar: [
    {
      title: 'Am Telefon mit dem Kundendienst',
      blocks: [
        { table: { head: ['Russisch', 'Deutsch'], rows: [
          ['Чем могу́ помо́чь?', 'Wie kann ich helfen?'],
          ['У меня́ не рабо́тает …', 'Bei mir funktioniert … nicht.'],
          ['Назови́те, пожа́луйста, …', 'Nennen Sie bitte …'],
          ['Подожди́те мину́тку.', 'Warten Sie einen Moment.'],
          ['Когда́ вам удо́бно?', 'Wann passt es Ihnen?'],
          ['Повтори́те, пожа́луйста.', 'Wiederholen Sie bitte.'],
        ] } },
        { p: '**Чем …, тем …:** Чем ра́ньше, тем лу́чше. Чем бо́льше занима́ешься, тем лу́чше говори́шь. (Je mehr man lernt, desto besser spricht man.)' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Wie meldet sich der Kundendienst?', options: ['Чем могу́ помо́чь?', 'Что вы хоти́те?', 'Кто вы?'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: '„Je früher, desto besser.“', options: ['Чем ра́ньше, тем лу́чше.', 'Как ра́но, так хорошо́.', 'Ра́ньше — лу́чше.'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Passt es Ihnen? – Вам …?', options: ['удо́бно', 'удо́бный', 'удо́бен'], answer: 0, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „schalten Sie aus“.', before: '', after: 'ро́утер.', answer: 'Вы́ключите' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['вы́ключить', 'ausschalten'], ['включи́ть', 'einschalten'], ['сно́ва', 'wieder'], ['Не помога́ет.', 'Es hilft nicht.'], ['ма́стер', 'Techniker']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Bei mir funktioniert das Internet nicht.', answer: 'У меня́ не рабо́тает интерне́т.' },
    { type: 'choice', prompt: 'Laut Dialog: Wann kommt der Techniker?', options: ['heute Abend', 'morgen zwischen 6 und 8', 'in zwei Tagen'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Чем ра́ньше, тем лу́чше.', answer: 'Чем ра́ньше, тем лу́чше.' },
  ],
  speak: ['У меня́ не рабо́тает интерне́т.', 'Когда́ вам удо́бно?', 'Чем ра́ньше, тем лу́чше!'],
};

const l15c: Lesson = {
  id: '15.C',
  unit: 15,
  checkpoint: true,
  title: { ru: 'Контро́льная', de: 'Checkpoint Einheit 15' },
  canDo: 'Ich kann Dienstleistungen nutzen, vergleichen, bitten und mich beschweren.',
  speakers: {},
  dialogs: [],
  vocab: [],
  grammar: [],
  exercises: [
    { type: 'choice', prompt: 'де́лать → (Sie) …', options: ['де́лайте', 'де́лите', 'де́льте'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'дать → (Sie) …', options: ['да́йте', 'да́те', 'дади́те'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Verbot: „Komm nicht zu spät!“', options: ['Не опозда́й!', 'Не опа́здывай!'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Э́та у́лица … (länger) той.', options: ['длинне́е', 'длинна́я', 'са́мая дли́нная'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Мой брат … меня́. (älter)', options: ['ста́рый', 'ста́рше', 'старе́е'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Superlativ: „das teuerste Restaurant“', before: 'Э́то', after: 'дорого́й рестора́н.', answer: 'са́мый' },
    { type: 'choice', prompt: 'Sehr höflich: „Könnten Sie …?“', options: ['Не могли́ бы вы …?', 'Мо́жете вы …?', 'Вы мо́жете …!'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Hör zu: Was ist das Problem?', audio: 'Извини́те, но мой суп холо́дный.', options: ['Die Suppe ist kalt.', 'Das Essen fehlt.', 'Die Rechnung stimmt nicht.'], answer: 0 },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['лу́чше', 'besser'], ['ху́же', 'schlechter'], ['доро́же', 'teurer'], ['деше́вле', 'billiger'], ['быстре́е', 'schneller']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Wann passt es Ihnen?', answer: 'Когда́ вам удо́бно?' },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Сади́тесь, пожа́луйста.', answer: 'Сади́тесь, пожа́луйста.' },
    { type: 'order', prompt: 'Bilde den Satz „Moskau ist größer als Berlin.“', tokens: ['Берли́н.', 'чем', 'бо́льше,', 'Москва́'], answer: 'Москва́ бо́льше, чем Берли́н.' },
  ],
  speak: ['Сде́лайте, пожа́луйста, покоро́че.', 'Како́й телефо́н лу́чше?', 'Не могли́ бы вы принести́ меню́?', 'Чем ра́ньше, тем лу́чше.'],
};

export const UNIT15: Unit = {
  n: 15,
  title: { ru: 'Се́рвис', de: 'Dienstleistungen' },
  lessons: [l151, l152, l153, l154, l155, l15c],
};
