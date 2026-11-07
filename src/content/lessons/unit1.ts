import type { Lesson, Speaker, Unit } from './types';

const S: Record<string, Speaker> = {
  max: { name: 'Макс', voice: 'dmitri', emoji: '🧑' },
  olja: { name: 'О́ля', voice: 'irina', emoji: '👩' },
  anna: { name: 'А́нна', voice: 'irina', emoji: '👩‍💼' },
  ns: { name: 'Ната́лья Серге́евна', voice: 'irina', emoji: '👵' },
  ip: { name: 'Ива́н Петро́вич', voice: 'dmitri', emoji: '👨‍💼' },
  lena: { name: 'Ле́на', voice: 'irina', emoji: '👩‍🎓' },
  man: { name: 'Мужчи́на', voice: 'dmitri', emoji: '👨' },
};

const l11: Lesson = {
  id: '1.1',
  unit: 1,
  title: { ru: 'Приве́т!', de: 'Hallo!' },
  canDo: 'Ich kann jemanden förmlich und informell begrüßen und mich verabschieden.',
  speakers: { max: S.max, olja: S.olja, anna: S.anna, ns: S.ns },
  dialogs: [
    {
      title: 'Unter Freunden',
      lines: [
        { who: 'max', ru: 'Приве́т, О́ля!', translit: 'priwjét, ólja', de: 'Hallo, Olja!' },
        { who: 'olja', ru: 'Приве́т, Макс! Как дела́?', translit: 'priwjét, maks! kak dilá', de: 'Hallo, Max! Wie geht’s?', note: '**Как дела́?** fragt man nur Freunde und Familie.' },
        { who: 'max', ru: 'Норма́льно. А у тебя́?', translit: "narmál'na. a u tibjá", de: 'Ganz gut. Und dir?', note: '**А** am Satzanfang = „und (was ist mit …)?“ – typisch für Gegenfragen.' },
        { who: 'olja', ru: 'Отли́чно! Спаси́бо.', translit: 'atlítschna! spasíba', de: 'Super! Danke.' },
        { who: 'max', ru: 'Ну, пока́!', translit: 'nu, paká', de: 'Na dann, tschüss!' },
        { who: 'olja', ru: 'Пока́!', translit: 'paká', de: 'Tschüss!' },
      ],
    },
    {
      title: 'Mit der Nachbarin',
      lines: [
        { who: 'anna', ru: 'Здра́вствуйте, Ната́лья Серге́евна!', translit: "zdrástwujtje, natál'ja sirgéjewna", de: 'Guten Tag, Natalja Sergejewna!', note: 'Das erste **в** in здра́вствуйте ist stumm: [zdrást-wuj-tje]. Vorname + **Vatersname** ist die höfliche Anrede – statt „Frau …“.' },
        { who: 'ns', ru: 'До́брый ве́чер, А́нна! Как у вас дела́?', translit: 'dóbryj wjétschir, ánna! kak u was dilá', de: 'Guten Abend, Anna! Wie geht es Ihnen?', note: 'Höflich fragt man **Как у вас дела́?**' },
        { who: 'anna', ru: 'Хорошо́, спаси́бо. А у вас?', translit: 'charaschó, spasíba. a u was', de: 'Gut, danke. Und Ihnen?' },
        { who: 'ns', ru: 'То́же хорошо́.', translit: 'tózhe charaschó', de: 'Auch gut.' },
        { who: 'anna', ru: 'До свида́ния!', translit: 'da swidánija', de: 'Auf Wiedersehen!' },
        { who: 'ns', ru: 'До свида́ния!', translit: 'da swidánija', de: 'Auf Wiedersehen!' },
      ],
    },
  ],
  vocab: ['приве́т', 'пока́', 'здра́вствуйте', 'до свида́ния', 'до́брое у́тро', 'до́брый день', 'до́брый ве́чер', 'Как дела́?', 'хорошо́', 'норма́льно', 'отли́чно', 'спаси́бо', 'пожа́луйста', 'то́же', 'а'],
  grammar: [
    {
      title: 'ты oder вы? – Duzen und Siezen',
      blocks: [
        { table: { head: ['', 'ты (du)', 'вы (Sie / ihr)'], rows: [
          ['Wen?', 'Freunde, Familie, Kinder', 'Fremde, Ältere, Kollegen, **mehrere Personen**'],
          ['Begrüßung', 'Приве́т!', 'Здра́вствуйте! / До́брый день!'],
          ['Abschied', 'Пока́!', 'До свида́ния!'],
          ['Wie geht’s?', 'Как дела́? – А у тебя́?', 'Как у вас дела́? – А у вас?'],
        ] } },
        { tip: 'Wie im Deutschen gilt: im Zweifel siezen. **вы** heißt gleichzeitig „Sie“ und „ihr“.' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Hör zu: Was bedeutet das?', audio: 'До́брый ве́чер!', options: ['Guten Morgen', 'Guten Abend', 'Guten Tag', 'Gute Nacht'], answer: 1 },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['приве́т', 'hallo'], ['пока́', 'tschüss'], ['спаси́бо', 'danke'], ['пожа́луйста', 'bitte'], ['хорошо́', 'gut']] },
    { type: 'choice', prompt: 'Du triffst deinen 60-jährigen Vermieter. Wie grüßt du?', options: ['Приве́т!', 'Здра́вствуйте!', 'Пока́!'], answer: 1, ruOptions: true, explain: 'Ältere und Fremde siezt man – also **Здра́вствуйте!**' },
    { type: 'choice', prompt: 'Du verabschiedest dich von deiner Freundin Olja.', options: ['До свида́ния!', 'Пока́!', 'Здра́вствуйте!'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze die Gegenfrage an eine Freundin.', before: '— Как дела́? — Хорошо́, спаси́бо. А у', after: '?', answer: 'тебя́' },
    { type: 'order', prompt: 'Bilde die höfliche Frage „Wie geht es Ihnen?“', tokens: ['дела́', 'у', 'как', 'вас'], answer: 'Как у вас дела́?' },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'danke', answer: 'спаси́бо' },
    { type: 'dictation', prompt: 'Hör zu und schreib, was du hörst.', audio: 'Пока́!', answer: 'Пока́!' },
  ],
  speak: ['Здра́вствуйте!', 'Спаси́бо!', 'Хорошо́!', 'До свида́ния!'],
};

const l12: Lesson = {
  id: '1.2',
  unit: 1,
  title: { ru: 'Как тебя́ зову́т?', de: 'Wie heißt du?' },
  canDo: 'Ich kann mich vorstellen und nach dem Namen fragen.',
  speakers: { max: S.max, lena: S.lena, ip: S.ip, anna: S.anna },
  dialogs: [
    {
      title: 'Auf einer Party',
      lines: [
        { who: 'max', ru: 'Приве́т! Меня́ зову́т Макс. А как тебя́ зову́т?', translit: 'priwjét! minjá zawút maks. a kak tibjá zawút', de: 'Hallo! Ich heiße Max. Und wie heißt du?', note: '**Меня́ зову́т …** heißt wörtlich „mich nennt man …“. Lerne es als festen Ausdruck.' },
        { who: 'lena', ru: 'Приве́т! Меня́ зову́т Ле́на.', translit: 'priwjét! minjá zawút ljéna', de: 'Hallo! Ich heiße Lena.' },
        { who: 'max', ru: 'О́чень прия́тно, Ле́на!', translit: "ótschin' prijátna, ljéna", de: 'Freut mich, Lena!' },
        { who: 'lena', ru: 'Мне то́же.', translit: 'mnje tózhe', de: 'Mich auch.' },
      ],
    },
    {
      title: 'Im Büro',
      lines: [
        { who: 'ip', ru: 'Здра́вствуйте! Как вас зову́т?', translit: 'zdrástwujtje! kak was zawút', de: 'Guten Tag! Wie heißen Sie?' },
        { who: 'anna', ru: 'Меня́ зову́т А́нна Шмидт. А вас?', translit: 'minjá zawút ánna schmit. a was', de: 'Ich heiße Anna Schmidt. Und Sie?', note: '**А вас?** ist die Kurzform von „А как вас зову́т?“' },
        { who: 'ip', ru: 'Ива́н Петро́вич Орло́в.', translit: 'iwán pitrówitsch arlóf', de: 'Iwan Petrowitsch Orlow.', note: '**в** am Wortende klingt wie **f** – genau wie im Deutschen „Hund“ → [hunt] (Auslautverhärtung).' },
        { who: 'anna', ru: 'О́чень прия́тно!', translit: "ótschin' prijátna", de: 'Freut mich!' },
        { who: 'ip', ru: 'Взаи́мно!', translit: 'wzaímna', de: 'Gleichfalls!' },
      ],
    },
  ],
  vocab: ['я', 'ты', 'вы', 'меня́', 'тебя́', 'вас', 'его́', 'её', 'Как тебя́ зову́т?', 'Как вас зову́т?', 'Меня́ зову́т …', 'как', 'о́чень', 'О́чень прия́тно!', 'Мне то́же.', 'Взаи́мно!'],
  grammar: [
    {
      title: 'Fragen stellen',
      blocks: [
        { p: '**1. Fragewörter stehen am Anfang** – wie im Deutschen: *Как вас зову́т?*' },
        { p: '**2. Ja/Nein-Fragen nur durch die Stimme.** Die Wortstellung ändert sich nicht:' },
        { table: { head: ['Aussage ↘', 'Frage ↗'], rows: [
          ['Ты Макс. – Du bist Max.', 'Ты **Макс**? – Bist du Max?'],
          ['Э́то Ле́на. – Das ist Lena.', 'Э́то **Ле́на**? – Ist das Lena?'],
        ] } },
        { tip: 'Bei der Frage steigt die Stimme auf dem erfragten Wort steil an und fällt danach sofort wieder ab.' },
        { p: '**3. „Mich/dich nennt man …“:** меня́ · тебя́ · его́ · её · вас + зову́т' },
        { table: { head: ['Frage', 'Bedeutung'], rows: [
          ['Как тебя́ зову́т?', 'Wie heißt du?'],
          ['Как вас зову́т?', 'Wie heißen Sie?'],
          ['Как его́ зову́т?', 'Wie heißt er?'],
          ['Как её зову́т?', 'Wie heißt sie?'],
        ] } },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Hör zu: Ist das förmlich oder informell?', audio: 'Как вас зову́т?', options: ['förmlich (Sie)', 'informell (du)'], answer: 0 },
    { type: 'gap', prompt: 'Ergänze.', before: 'Меня́', after: 'А́нна.', answer: 'зову́т' },
    { type: 'choice', prompt: '„Wie heißt du?“', options: ['Как тебя́ зову́т?', 'Как вас зову́т?', 'Как меня́ зову́т?'], answer: 0, ruOptions: true },
    { type: 'order', prompt: 'Bilde die Frage „Wie heißt er?“', tokens: ['зову́т', 'его́', 'как'], answer: 'Как его́ зову́т?' },
    { type: 'choice', prompt: 'Jemand sagt: „О́чень прия́тно!“ Was antwortest du?', options: ['Взаи́мно!', 'Пока́!', 'Как дела́?'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Hör genau hin: Aussage oder Frage?', audio: 'Э́то Ле́на?', options: ['Aussage', 'Frage'], answer: 1 },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['меня́', 'mich'], ['тебя́', 'dich'], ['его́', 'ihn'], ['её', 'sie'], ['вас', 'Sie']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Freut mich!', answer: 'О́чень прия́тно!' },
  ],
  speak: ['Меня́ зову́т …', 'О́чень прия́тно!', 'Как вас зову́т?'],
};

const l13: Lesson = {
  id: '1.3',
  unit: 1,
  title: { ru: 'Кто э́то?', de: 'Wer ist das?' },
  canDo: 'Ich kann sagen, wer jemand ist und was er oder sie macht.',
  speakers: { olja: S.olja, max: S.max },
  dialogs: [
    {
      title: 'Max zeigt Olja Fotos',
      lines: [
        { who: 'olja', ru: 'Макс, кто э́то?', translit: 'maks, kto éta', de: 'Max, wer ist das?' },
        { who: 'max', ru: 'Э́то Том. Он мой друг.', translit: 'éta tom. on moj druk', de: 'Das ist Tom. Er ist mein Freund.', note: 'Ein Wort für „ist“ gibt es im Präsens nicht: **Он мой друг** = „Er (ist) mein Freund“. Am Wortende klingt г wie k: [druk].' },
        { who: 'olja', ru: 'Он студе́нт?', translit: 'on studjént', de: 'Ist er Student?', note: 'Eine Frage nur durch die Stimme: Sie steigt auf **студе́нт**.' },
        { who: 'max', ru: 'Нет, он не студе́нт. Он врач.', translit: 'njet, on ni studjént. on wratsch', de: 'Nein, er ist kein Student. Er ist Arzt.', note: '**не** steht vor dem Wort, das verneint wird. Es bedeutet „nicht“ **und** „kein“.' },
        { who: 'olja', ru: 'А э́то кто?', translit: 'a éta kto', de: 'Und wer ist das?' },
        { who: 'max', ru: 'Э́то Ле́на. Она́ студе́нтка.', translit: 'éta ljéna. aná studjéntka', de: 'Das ist Lena. Sie ist Studentin.' },
        { who: 'olja', ru: 'А что э́то?', translit: 'a schto éta', de: 'Und was ist das?', note: '**что** spricht man [schto].' },
        { who: 'max', ru: 'Э́то Москва́. Э́то Кремль.', translit: "éta maskwá. éta krjeml'", de: 'Das ist Moskau. Das ist der Kreml.' },
        { who: 'olja', ru: 'Краси́во!', translit: 'krasíwa', de: 'Schön!' },
      ],
    },
  ],
  vocab: ['кто', 'что', 'э́то', 'он', 'она́', 'оно́', 'мы', 'они́', 'мой', 'друг', 'подру́га', 'студе́нт', 'студе́нтка', 'врач', 'не', 'нет', 'краси́во'],
  grammar: [
    {
      title: 'Ein Satz ohne „sein“ und ohne Artikel',
      blocks: [
        { p: '**1. Kein „sein“ im Präsens**' },
        { table: { head: ['Deutsch', 'Russisch'], rows: [
          ['Ich **bin** Student.', 'Я студе́нт.'],
          ['Das **ist** Lena.', 'Э́то Ле́на.'],
          ['Tom **ist** Arzt.', 'Том — врач.'],
        ] } },
        { tip: 'Zwischen zwei Substantiven schreibt man oft einen Gedankenstrich: Том — врач.' },
        { p: '**2. Keine Artikel:** врач = Arzt / ein Arzt / der Arzt. Der Zusammenhang entscheidet.' },
        { p: '**3. Verneinung:** не steht direkt vor dem verneinten Wort. Он **не** студе́нт = Er ist **kein** Student. нет = „nein“.' },
        { p: '**4. Personalpronomen**' },
        { table: { head: ['', 'Singular', 'Plural'], rows: [
          ['1.', 'я', 'мы'],
          ['2.', 'ты', 'вы'],
          ['3.', 'он / она́ / оно́', 'они́'],
        ] } },
        { tip: '**Кто?** fragt nach Menschen **und Tieren** (Кто э́то? – Э́то кот.), **Что?** nach Dingen.' },
      ],
    },
  ],
  exercises: [
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Das ist Lena.', answer: 'Э́то Ле́на.' },
    { type: 'choice', prompt: 'Том врач. ___ мой друг.', options: ['Он', 'Она́', 'Оно́'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: '___ э́то? — Э́то Москва́.', options: ['Кто', 'Что'], answer: 1, ruOptions: true, explain: 'Moskau ist ein Ding/Ort → **Что?**' },
    { type: 'choice', prompt: '___ э́то? — Э́то Том.', options: ['Кто', 'Что'], answer: 0, ruOptions: true },
    { type: 'gap', prompt: 'Verneine: „Er ist kein Student.“', before: 'Он', after: 'студе́нт.', answer: 'не' },
    { type: 'order', prompt: 'Bilde den Satz „Sie ist keine Ärztin.“', tokens: ['не', 'она́', 'врач'], answer: 'Она́ не врач.' },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Э́то мой друг.', answer: 'Э́то мой друг.' },
    { type: 'choice', prompt: 'Laut Dialog: Was ist Tom von Beruf?', options: ['студе́нт', 'врач', 'студе́нтка'], answer: 1, ruOptions: true },
  ],
  speak: ['Кто э́то?', 'Он студе́нт?', 'Нет, он не студе́нт.'],
};

const l14: Lesson = {
  id: '1.4',
  unit: 1,
  title: { ru: 'Отку́да вы?', de: 'Woher kommen Sie?' },
  canDo: 'Ich kann sagen, woher ich komme und wo ich wohne.',
  speakers: { ip: S.ip, anna: S.anna },
  dialogs: [
    {
      title: 'Kaffeepause im Büro',
      lines: [
        { who: 'ip', ru: 'А́нна, отку́да вы?', translit: 'ánna, atkúda wy', de: 'Anna, woher kommen Sie?' },
        { who: 'anna', ru: 'Я из Герма́нии, из Мю́нхена. А вы?', translit: 'ja iz girmánii, iz mjúnchina. a wy', de: 'Ich bin aus Deutschland, aus München. Und Sie?', note: '**из** + Ort = „aus“. Der Ort bekommt eine andere Endung (Genitiv – kommt später ausführlich).' },
        { who: 'ip', ru: 'Я из Росси́и, из Москвы́. Но сейча́с я живу́ в Берли́не.', translit: 'ja iz rassíi, iz maskwý. no sejtschás ja zhywú w birlínje', de: 'Ich bin aus Russland, aus Moskau. Aber jetzt wohne ich in Berlin.', note: '**в** + Ort = „in“. Endung meist **-е** (Präpositiv).' },
        { who: 'anna', ru: 'Пра́вда? Я то́же живу́ в Берли́не!', translit: 'práwda? ja tózhe zhywú w birlínje', de: 'Wirklich? Ich wohne auch in Berlin!' },
        { who: 'ip', ru: 'А где вы живёте?', translit: 'a gdje wy zhywjótje', de: 'Und wo wohnen Sie?' },
        { who: 'anna', ru: 'В Па́нкове.', translit: 'f pánkawje', de: 'In Pankow.', note: 'Vor einem stimmlosen Laut klingt **в** wie [f].' },
        { who: 'ip', ru: 'Я то́же! Мы сосе́ди!', translit: 'ja tózhe! my sasjédi', de: 'Ich auch! Wir sind Nachbarn!' },
      ],
    },
  ],
  vocab: ['отку́да', 'где', 'из', 'в', 'Герма́ния', 'Росси́я', 'А́встрия', 'Швейца́рия', 'Москва́', 'жить', 'сейча́с', 'но', 'Пра́вда?', 'сосе́д', 'сосе́дка'],
  grammar: [
    {
      title: 'Das Verb жить (wohnen)',
      blocks: [
        { table: { head: ['Person', 'Form', 'Person', 'Form'], rows: [
          ['я', 'живу́', 'мы', 'живём'],
          ['ты', 'живёшь', 'вы', 'живёте'],
          ['он / она́', 'живёт', 'они́', 'живу́т'],
        ] } },
        { tip: 'Unter Betonung wird **е → ё**. Die Endungen **-у, -ёшь, -ёт, -ём, -ёте, -ут** gelten für sehr viele Verben.' },
      ],
    },
    {
      title: 'Woher? Wo? – Endungen als Faustregel',
      blocks: [
        { table: { head: ['Ort', 'Отку́да? (из …)', 'Где? (в …)'], rows: [
          ['Герма́ния', 'из Герма́ни**и**', 'в Герма́ни**и**'],
          ['Росси́я', 'из Росси́**и**', 'в Росси́**и**'],
          ['Москва́', 'из Москв**ы́**', 'в Москв**е́**'],
          ['Ве́на', 'из Ве́н**ы**', 'в Ве́н**е**'],
          ['Берли́н', 'из Берли́н**а**', 'в Берли́н**е**'],
          ['Мю́нхен', 'из Мю́нхен**а**', 'в Мю́нхен**е**'],
        ] } },
        { tip: 'Regel: **-ия → -ии** (beide) · **-а → -ы / -е** · **Konsonant → +а / +е**' },
      ],
    },
  ],
  exercises: [
    { type: 'gap', prompt: 'Konjugiere жить.', before: 'Я', after: 'в Берли́не.', answer: 'живу́' },
    { type: 'gap', prompt: 'Konjugiere жить.', before: 'Они́', after: 'в Москве́.', answer: 'живу́т' },
    { type: 'gap', prompt: 'Konjugiere жить.', before: 'Где ты', after: '?', answer: 'живёшь', alternatives: ['живешь'] },
    { type: 'choice', prompt: 'Я из … (Österreich)', options: ['А́встрия', 'А́встрии', 'А́встрию'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Мы живём в … (Wien)', options: ['Ве́на', 'Ве́ны', 'Ве́не'], answer: 2, ruOptions: true },
    { type: 'order', prompt: 'Bilde den Satz „Ich wohne in Berlin.“', tokens: ['в', 'живу́', 'я', 'Берли́не'], answer: 'Я живу́ в Берли́не.' },
    { type: 'choice', prompt: 'Laut Dialog: Woher kommt Iwan Petrowitsch?', options: ['aus München', 'aus Moskau', 'aus Wien'], answer: 1 },
    { type: 'choice', prompt: 'Finde den Fehler: „Она́ живу́ в Москве́.“ Richtig ist …', options: ['живёт', 'живёшь', 'живу́т'], answer: 0, ruOptions: true },
  ],
  speak: ['Я из Герма́нии.', 'Я живу́ в Берли́не.', 'Отку́да вы?'],
};

const l15: Lesson = {
  id: '1.5',
  unit: 1,
  title: { ru: 'Вы говори́те по-ру́сски?', de: 'Sprechen Sie Russisch?' },
  canDo: 'Ich kann sagen, welche Sprachen ich spreche, um langsameres Sprechen bitten und nach dem Weg fragen.',
  speakers: { anna: S.anna, man: S.man },
  dialogs: [
    {
      title: 'Anna ist zum ersten Mal in Moskau',
      lines: [
        { who: 'anna', ru: 'Извини́те, вы говори́те по-неме́цки?', translit: 'izwinítje, wy gawarítje pa-nimjétski', de: 'Entschuldigung, sprechen Sie Deutsch?', note: '**по-неме́цки** = „auf Deutsch“. Mit говори́ть und понима́ть immer diese Form.' },
        { who: 'man', ru: 'Нет, не говорю́. А вы говори́те по-ру́сски?', translit: 'njet, ni gawarjú. a wy gawarítje pa-rúski', de: 'Nein. Sprechen Sie Russisch?', note: 'Russen antworten gern mit dem Verb statt nur mit „ja/nein“.' },
        { who: 'anna', ru: 'Да, немно́го. Где здесь метро́?', translit: "da, nimnóga. gdje zdjes' mitró", de: 'Ja, ein bisschen. Wo ist hier die Metro?' },
        { who: 'man', ru: 'Метро́? Пря́мо и нале́во.', translit: 'mitró? prjáma i naljéwa', de: 'Die Metro? Geradeaus und links.' },
        { who: 'anna', ru: 'Извини́те, я не понима́ю. Говори́те, пожа́луйста, ме́дленнее.', translit: 'izwinítje, ja ni panimáju. gawarítje, pazhálsta, mjédlinjeje', de: 'Entschuldigung, ich verstehe nicht. Sprechen Sie bitte langsamer.', note: 'Der wichtigste Satz für Anfänger! **Говори́те** ist hier eine Bitte – gleiche Form wie „вы говори́те“.' },
        { who: 'man', ru: 'Пря́мо… и… нале́во.', translit: 'prjáma… i… naljéwa', de: 'Geradeaus … und … links.' },
        { who: 'anna', ru: 'Спаси́бо большо́е!', translit: "spasíba bal'schóje", de: 'Vielen Dank!' },
        { who: 'man', ru: 'Пожа́луйста! Вы хорошо́ говори́те по-ру́сски!', translit: 'pazhálsta! wy charaschó gawarítje pa-rúski', de: 'Gern geschehen! Sie sprechen gut Russisch!' },
      ],
    },
  ],
  vocab: ['говори́ть', 'понима́ть', 'по-ру́сски', 'по-неме́цки', 'по-англи́йски', 'немно́го', 'пло́хо', 'извини́те', 'здесь', 'метро́', 'пря́мо', 'нале́во', 'напра́во', 'ме́дленнее', 'Спаси́бо большо́е!', 'мужчи́на'],
  grammar: [
    {
      title: 'Die zwei Konjugationen',
      blocks: [
        { table: { head: ['', 'понима́ть (e-Konjugation)', 'говори́ть (i-Konjugation)'], rows: [
          ['я', 'понима́**ю**', 'говор**ю́**'],
          ['ты', 'понима́**ешь**', 'говор**и́шь**'],
          ['он / она́', 'понима́**ет**', 'говор**и́т**'],
          ['мы', 'понима́**ем**', 'говор**и́м**'],
          ['вы', 'понима́**ете**', 'говор**и́те**'],
          ['они́', 'понима́**ют**', 'говор**я́т**'],
        ] } },
        { tip: 'Faustregel: Infinitiv auf **-ать** → meist e-Konjugation, auf **-ить** → meist i-Konjugation.' },
        { p: '**по-ру́сски** = „auf Russisch“: Я говорю́ по-ру́сски. Я понима́ю по-неме́цки.' },
      ],
    },
  ],
  exercises: [
    { type: 'gap', prompt: 'Ergänze die Form von говори́ть.', before: 'Мы', after: 'по-неме́цки.', answer: 'говори́м' },
    { type: 'gap', prompt: 'Ergänze die Form von понима́ть.', before: 'Они́ не', after: '.', answer: 'понима́ют' },
    { type: 'gap', prompt: 'Ergänze die Form von говори́ть.', before: 'Ты', after: 'по-англи́йски?', answer: 'говори́шь' },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Ich verstehe nicht.', answer: 'Я не понима́ю.' },
    { type: 'choice', prompt: 'Hör zu: Wo ist die Metro?', audio: 'Пря́мо и нале́во.', options: ['rechts', 'geradeaus und links', 'hier'], answer: 1 },
    { type: 'order', prompt: 'Bitte jemanden, langsamer zu sprechen.', tokens: ['пожа́луйста,', 'ме́дленнее.', 'Говори́те,'], answer: 'Говори́те, пожа́луйста, ме́дленнее.' },
    { type: 'choice', prompt: 'Welche Konjugation hat жить?', options: ['e-Konjugation', 'i-Konjugation'], answer: 0, explain: 'живёшь, живёт … → e-Konjugation (betont: ё).' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['пря́мо', 'geradeaus'], ['нале́во', 'links'], ['напра́во', 'rechts'], ['здесь', 'hier'], ['немно́го', 'ein bisschen']] },
  ],
  speak: ['Извини́те!', 'Я не понима́ю.', 'Говори́те, пожа́луйста, ме́дленнее.', 'Я немно́го говорю́ по-ру́сски.'],
};

const l1c: Lesson = {
  id: '1.C',
  unit: 1,
  checkpoint: true,
  title: { ru: 'Контро́льная', de: 'Checkpoint Einheit 1' },
  canDo: 'Ich kann grüßen, mich vorstellen, sagen, woher ich komme und welche Sprachen ich spreche.',
  speakers: {},
  dialogs: [],
  vocab: [],
  grammar: [],
  exercises: [
    { type: 'choice', prompt: 'Hör zu: Welche Begrüßung ist das?', audio: 'Здра́вствуйте!', options: ['förmlich', 'informell'], answer: 0 },
    { type: 'choice', prompt: '— Как вас зову́т? — …', options: ['Меня́ зову́т А́нна.', 'Я живу́ в Берли́не.', 'Отли́чно!'], answer: 0, ruOptions: true },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Er ist kein Arzt.', answer: 'Он не врач.' },
    { type: 'gap', prompt: 'Ergänze die Endung.', before: 'Я из', after: '. (Russland)', answer: 'Росси́и', alternatives: ['России'] },
    { type: 'gap', prompt: 'Ergänze.', before: 'Я живу́ в', after: '. (Moskau)', answer: 'Москве́' },
    { type: 'gap', prompt: 'Konjugiere жить.', before: 'Вы', after: 'в Ве́не?', answer: 'живёте', alternatives: ['живете'] },
    { type: 'gap', prompt: 'Konjugiere говори́ть.', before: 'Они́', after: 'по-ру́сски.', answer: 'говоря́т' },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'О́чень прия́тно!', answer: 'О́чень прия́тно!' },
    { type: 'order', prompt: 'Bilde den Satz „Woher kommen Sie?“', tokens: ['вы?', 'Отку́да'], answer: 'Отку́да вы?' },
    { type: 'choice', prompt: '___ э́то? — Э́то кот.', options: ['Кто', 'Что'], answer: 0, ruOptions: true, explain: 'Bei Tieren fragt man **Кто?**' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['пока́', 'tschüss'], ['извини́те', 'Entschuldigung'], ['сейча́с', 'jetzt'], ['но', 'aber'], ['где', 'wo']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Ich spreche ein bisschen Russisch.', answer: 'Я немно́го говорю́ по-ру́сски.', alternatives: ['Я говорю́ немно́го по-ру́сски.', 'Я говорю́ по-ру́сски немно́го.'] },
  ],
  speak: ['Здра́вствуйте! Меня́ зову́т …', 'Я из Герма́нии.', 'Я живу́ в Берли́не.', 'Я немно́го говорю́ по-ру́сски.'],
};

export const UNIT1: Unit = {
  n: 1,
  title: { ru: 'Знако́мство', de: 'Kennenlernen' },
  lessons: [l11, l12, l13, l14, l15, l1c],
};
