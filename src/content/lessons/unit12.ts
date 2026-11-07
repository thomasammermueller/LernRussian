import type { Lesson, Speaker, Unit } from './types';

const S: Record<string, Speaker> = {
  max: { name: 'Макс', voice: 'dmitri', emoji: '🧑' },
  olja: { name: 'О́ля', voice: 'irina', emoji: '👩' },
  anna: { name: 'А́нна', voice: 'irina', emoji: '👩‍💼' },
  lena: { name: 'Ле́на', voice: 'irina', emoji: '👩‍🎓' },
  ns: { name: 'Ната́лья Серге́евна', voice: 'irina', emoji: '👵' },
  sec: { name: 'Секрета́рь', voice: 'irina', emoji: '☎️' },
};

const l121: Lesson = {
  id: '12.1',
  unit: 12,
  title: { ru: 'Пойдёте на конце́рт?', de: 'Kommt ihr mit ins Konzert?' },
  canDo: 'Ich kann jemanden einladen, zusagen und höflich absagen.',
  speakers: { olja: S.olja, lena: S.lena, max: S.max },
  dialogs: [
    {
      title: 'Drei Tickets',
      lines: [
        { who: 'olja', ru: 'У меня́ есть три биле́та на конце́рт в пя́тницу. Пойдёте?', translit: "u minjá jest' tri biljéta na kantsért f pjátnitsu. pajdjótje", de: 'Ich habe drei Tickets für ein Konzert am Freitag. Kommt ihr mit?', note: '**пойти́** (perfektiv) = losgehen, hingehen. Seine Präsensform bedeutet Zukunft: пойду́, пойдёшь, пойдёте.' },
        { who: 'lena', ru: 'Пойду́ с удово́льствием! А како́й конце́рт?', translit: "pajdú s udawól'stwijem! a kakój kantsért", de: 'Ich komme sehr gern mit! Was für ein Konzert ist es?' },
        { who: 'olja', ru: 'Джаз. Начина́ется в во́семь.', translit: "dzhas. natschinájitsa w wósim'", de: 'Jazz. Es beginnt um acht.' },
        { who: 'max', ru: 'К сожале́нию, в пя́тницу я не смогу́. Я рабо́таю до девяти́.', translit: 'k sazhaljéniju, f pjátnitsu ja ni smagú. ja rabótaju da diwití', de: 'Leider kann ich am Freitag nicht. Ich arbeite bis neun.', note: '**смочь** (perfektiv zu мочь): я смогу́ = ich werde können.' },
        { who: 'olja', ru: 'Жаль! Тогда́ мы пойдём вдвоём.', translit: "zhal'! tagdá my pajdjóm wdwajóm", de: 'Schade! Dann gehen wir zu zweit.' },
        { who: 'lena', ru: 'Макс, а в суббо́ту пойдёшь с на́ми в кафе́?', translit: 'maks, a f subótu pajdjósch s námi f kafé', de: 'Max, kommst du am Samstag mit uns ins Café?' },
        { who: 'max', ru: 'В суббо́ту — обяза́тельно!', translit: "f subótu — abjazátil'na", de: 'Am Samstag – auf jeden Fall!' },
      ],
    },
  ],
  vocab: ['пойти́', 'с удово́льствием', 'к сожале́нию', 'смочь', 'Жаль!', 'вдвоём', 'обяза́тельно', 'джаз', 'конце́рт'],
  grammar: [
    {
      title: 'Perfektive Zukunft für Pläne',
      blocks: [
        { table: { head: ['Person', 'пойти́ (hingehen)', 'смочь (können)'], rows: [
          ['я', 'пойду́', 'смогу́'],
          ['ты', 'пойдёшь', 'смо́жешь'],
          ['он / она́', 'пойдёт', 'смо́жет'],
          ['мы', 'пойдём', 'смо́жем'],
          ['вы', 'пойдёте', 'смо́жете'],
          ['они́', 'пойду́т', 'смо́гут'],
        ] } },
        { tip: 'Für ein konkretes, einmaliges Vorhaben nimmt man meist die **perfektive** Zukunft: Я пойду́ в кино́. Я позвоню́ тебе́.' },
      ],
    },
    {
      title: 'Einladen, zusagen, absagen',
      blocks: [
        { table: { head: ['', 'Russisch', 'Deutsch'], rows: [
          ['einladen', 'Пойдём в кино́? / Пойдёшь с на́ми?', 'Gehen wir ins Kino? / Kommst du mit?'],
          ['zusagen', 'С удово́льствием! / Обяза́тельно!', 'Gern! / Auf jeden Fall!'],
          ['absagen', 'К сожале́нию, я не смогу́.', 'Leider kann ich nicht.'],
          ['bedauern', 'Жаль! / Очень жаль!', 'Schade! / Sehr schade!'],
          ['verschieben', 'Дава́й в друго́й раз.', 'Lass uns ein andermal.'],
        ] } },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Wie sagst du gern zu?', options: ['С удово́льствием!', 'К сожале́нию.', 'Жаль!'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Leider kann ich nicht: К сожале́нию, я не …', options: ['могу́ть', 'смогу́', 'смо́жешь'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze die Zukunft von пойти́ (мы).', before: 'Тогда́ мы', after: 'вдвоём.', answer: 'пойдём', alternatives: ['пойдем'] },
    { type: 'choice', prompt: 'Ты … с на́ми в кафе́?', options: ['пойду́', 'пойдёшь', 'пойдёт'], answer: 1, ruOptions: true },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['Жаль!', 'Schade!'], ['вдвоём', 'zu zweit'], ['обяза́тельно', 'auf jeden Fall'], ['к сожале́нию', 'leider'], ['с удово́льствием', 'gern']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Lass uns ein andermal.', answer: 'Дава́й в друго́й раз.' },
    { type: 'choice', prompt: 'Laut Dialog: Warum kann Max am Freitag nicht?', options: ['Er ist krank.', 'Er arbeitet bis neun.', 'Er mag keinen Jazz.'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'К сожале́нию, я не смогу́.', answer: 'К сожале́нию, я не смогу́.' },
  ],
  speak: ['Пойдём в кино́?', 'С удово́льствием!', 'К сожале́нию, я не смогу́.'],
};

const l122: Lesson = {
  id: '12.2',
  unit: 12,
  title: { ru: 'Ты придёшь?', de: 'Kommst du?' },
  canDo: 'Ich kann über Ankommen und Weggehen sprechen (при- und у-).',
  speakers: { lena: S.lena, max: S.max },
  dialogs: [
    {
      title: 'Lenas Geburtstag',
      lines: [
        { who: 'lena', ru: 'Макс, ты придёшь ко мне на день рожде́ния?', translit: "maks, ty pridjósch ka mnje na djen' razhdjénija", de: 'Max, kommst du zu meinem Geburtstag?', note: '**при-** = an-, her- (ankommen): прийти́ – я приду́, ты придёшь.' },
        { who: 'max', ru: 'Коне́чно! Когда́?', translit: 'kanjéschna! kagdá', de: 'Natürlich! Wann?' },
        { who: 'lena', ru: 'В суббо́ту. Го́сти приду́т в шесть.', translit: "f subótu. gósti pridút f schest'", de: 'Am Samstag. Die Gäste kommen um sechs.' },
        { who: 'max', ru: 'Я приду́ в шесть, но в де́вять уйду́: у меня́ по́езд.', translit: "ja pridú f schest', no w djéwit' ujdú: u minjá pójist", de: 'Ich komme um sechs, aber um neun gehe ich: Ich habe einen Zug.', note: '**у-** = weg- (weggehen): уйти́ – я уйду́.' },
        { who: 'lena', ru: 'Куда́ ты уезжа́ешь?', translit: 'kudá ty ujizhzhájisch', de: 'Wohin fährst du weg?' },
        { who: 'max', ru: 'В Каза́нь, на неде́лю.', translit: "f kazán', na nidjélju", de: 'Nach Kasan, für eine Woche.' },
        { who: 'lena', ru: 'А когда́ ты прие́дешь обра́тно?', translit: 'a kagdá ty prijédisch abrátna', de: 'Und wann kommst du zurück?', note: 'Mit Fahrzeug: **прие́хать** (ankommen), **уе́хать** (wegfahren).' },
        { who: 'max', ru: 'В сле́дующую суббо́ту.', translit: 'f sljédujuschschuju subótu', de: 'Nächsten Samstag.' },
        { who: 'lena', ru: 'Хорошо́. Тогда́ жду тебя́ в шесть!', translit: "charaschó. tagdá zhdu tibjá f schest'", de: 'Gut. Dann erwarte ich dich um sechs!' },
      ],
    },
  ],
  vocab: ['день рожде́ния', 'прийти́', 'уйти́', 'прие́хать', 'уе́хать', 'уезжа́ть', 'обра́тно', 'сле́дующий', 'ждать'],
  grammar: [
    {
      title: 'Bewegungsverben mit при- und у-',
      blocks: [
        { table: { head: ['', 'zu Fuß', 'mit Fahrzeug'], rows: [
          ['при- (ankommen)', 'прийти́ – приду́, придёшь', 'прие́хать – прие́ду, прие́дешь'],
          ['у- (weggehen)', 'уйти́ – уйду́, уйдёшь', 'уе́хать – уе́ду, уе́дешь'],
        ] } },
        { table: { head: ['Vergangenheit', 'Mann', 'Frau', 'Plural'], rows: [
          ['прийти́', 'пришёл', 'пришла́', 'пришли́'],
          ['уйти́', 'ушёл', 'ушла́', 'ушли́'],
          ['прие́хать', 'прие́хал', 'прие́хала', 'прие́хали'],
        ] } },
        { tip: 'Diese Verben sind **perfektiv**. Ihre imperfektiven Partner (regelmäßig, Vorgang): приходи́ть / уходи́ть, приезжа́ть / уезжа́ть. Я уезжа́ю за́втра = Ich fahre morgen weg (geplant).' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Когда́ ты …? (wirst ankommen, zu Fuß)', options: ['придёшь', 'уйдёшь', 'прие́дешь'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Он уже́ … домо́й. (ist weggegangen)', options: ['пришёл', 'ушёл', 'прие́хал'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Max kommt mit dem Zug aus Kasan zurück:', options: ['Он придёт.', 'Он прие́дет.'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Olja (Frau) ist gekommen.', before: 'О́ля', after: 'в семь.', answer: 'пришла́' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['прийти́', 'ankommen (zu Fuß)'], ['уйти́', 'weggehen'], ['прие́хать', 'ankommen (fahrend)'], ['уе́хать', 'wegfahren'], ['обра́тно', 'zurück']] },
    { type: 'translate', prompt: 'Frag auf Russisch.', de: 'Kommst du zu meinem Geburtstag?', answer: 'Ты придёшь ко мне на день рожде́ния?', alternatives: ['Ты придёшь на мой день рожде́ния?', 'Ты придешь ко мне на день рожде́ния?'] },
    { type: 'choice', prompt: 'Laut Dialog: Wann geht Max von der Feier?', options: ['um sechs', 'um neun', 'um elf'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Го́сти приду́т в шесть.', answer: 'Го́сти приду́т в шесть.' },
  ],
  speak: ['Ты придёшь ко мне?', 'Я приду́ в шесть.', 'За́втра я уезжа́ю.'],
};

const l123: Lesson = {
  id: '12.3',
  unit: 12,
  title: { ru: 'Он вы́шел', de: 'Er ist kurz raus' },
  canDo: 'Ich kann am Telefon nach jemandem fragen, etwas ausrichten lassen und Wege im Gebäude verstehen.',
  speakers: { sec: S.sec, anna: S.anna },
  dialogs: [
    {
      title: 'Ein Anruf in der Firma',
      lines: [
        { who: 'sec', ru: 'Компа́ния «Восто́к», здра́вствуйте!', translit: 'kampánija wastók, zdrástwujtje', de: 'Firma „Wostok“, guten Tag!' },
        { who: 'anna', ru: 'Здра́вствуйте! Мо́жно Ива́на Петро́вича?', translit: 'zdrástwujtje! mózhna iwána pitrówitscha', de: 'Guten Tag! Kann ich Iwan Petrowitsch sprechen?', note: 'Personen im Akkusativ (belebt, männlich) haben die **Genitiv-Endung**: Ива́н → Ива́н**а**.' },
        { who: 'sec', ru: 'Его́ сейча́с нет, он вы́шел. Он придёт че́рез полчаса́.', translit: 'jiwó sejtschás njet, on wýschil. on pridjót tschéris paltschisá', de: 'Er ist gerade nicht da, er ist kurz raus. Er kommt in einer halben Stunde.', note: '**вы́-** = hinaus: вы́йти (hinausgehen). Die Vorsilbe вы́- ist immer betont. **че́рез** + Akkusativ = in (Zeit).' },
        { who: 'anna', ru: 'Поня́тно. Переда́йте ему́, пожа́луйста, что звони́ла А́нна Шмидт.', translit: 'panjátna. piridájtje jimú, pazhálsta, schto zwaníla ánna schmit', de: 'Verstehe. Richten Sie ihm bitte aus, dass Anna Schmidt angerufen hat.' },
        { who: 'sec', ru: 'Хорошо́, переда́м.', translit: 'charaschó, piridám', de: 'Gut, richte ich aus.' },
        { who: 'anna', ru: 'И ещё: я хочу́ зайти́ к вам за́втра. Где у вас вход?', translit: "i jischschó: ja chatschú zajtí k wam záftra. gdje u was fchot", de: 'Und noch etwas: Ich möchte morgen bei Ihnen vorbeikommen. Wo ist bei Ihnen der Eingang?', note: '**за-** = kurz vorbeischauen: зайти́ к + Dativ.' },
        { who: 'sec', ru: 'Вход со двора́. Войди́те в дверь и подними́тесь на тре́тий эта́ж.', translit: "fchot sa dwará. wajdítje w dwjer' i padnimítis' na trjétij etásch", de: 'Der Eingang ist vom Hof. Gehen Sie durch die Tür und gehen Sie hinauf in den dritten Stock.', note: '**в-** = hinein: войти́ (hineingehen).' },
      ],
    },
  ],
  vocab: ['вы́йти', 'войти́', 'зайти́', 'вход', 'вы́ход', 'дверь', 'че́рез', 'полчаса́', 'Переда́йте!', 'подня́ться', 'компа́ния'],
  grammar: [
    {
      title: 'Weitere Vorsilben für Bewegung',
      blocks: [
        { table: { head: ['Vorsilbe', 'Bedeutung', 'zu Fuß', 'mit Fahrzeug'], rows: [
          ['при-', 'ankommen', 'прийти́', 'прие́хать'],
          ['у-', 'weggehen', 'уйти́', 'уе́хать'],
          ['в-', 'hineingehen', 'войти́', 'въе́хать'],
          ['вы́-', 'hinausgehen', 'вы́йти', 'вы́ехать'],
          ['за-', 'kurz vorbeischauen', 'зайти́', 'зае́хать'],
          ['по-', 'losgehen, hingehen', 'пойти́', 'пое́хать'],
        ] } },
        { tip: '**Он вы́шел** (er ist hinausgegangen = gerade nicht da) · **Он ушёл** (er ist gegangen = weg, kommt heute nicht wieder).' },
      ],
    },
    {
      title: 'Personen im Akkusativ',
      blocks: [
        { p: 'Belebte männliche Wörter haben im Akkusativ die Endung des **Genitivs**:' },
        { table: { head: ['Nominativ', 'Akkusativ', 'Beispiel'], rows: [
          ['Ива́н', 'Ива́на', 'Мо́жно Ива́на?'],
          ['брат', 'бра́та', 'Я жду бра́та.'],
          ['врач', 'врача́', 'Вы́зовите врача́!'],
          ['ма́ма (f)', 'ма́му', 'Я люблю́ ма́му. (f wie gewohnt -у)'],
        ] } },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Er ist kurz rausgegangen: Он …', options: ['вы́шел', 'вошёл', 'пришёл'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Мо́жно … ? (Iwan sprechen)', options: ['Ива́н', 'Ива́на', 'Ива́ну'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Он придёт … полчаса́. (in)', options: ['в', 'че́рез', 'по́сле'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „vorbeischauen“ (Infinitiv).', before: 'Я хочу́', after: 'к вам за́втра.', answer: 'зайти́' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['вход', 'Eingang'], ['вы́ход', 'Ausgang'], ['дверь', 'Tür'], ['полчаса́', 'halbe Stunde'], ['войти́', 'hineingehen']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Richten Sie ihm bitte aus, dass ich angerufen habe.', answer: 'Переда́йте ему́, пожа́луйста, что я звони́л.', alternatives: ['Переда́йте ему́, пожа́луйста, что я звони́ла.', 'Переда́йте ему́, что я звони́л.', 'Переда́йте ему́, что я звони́ла.'] },
    { type: 'choice', prompt: 'Laut Dialog: Wo ist der Eingang?', options: ['von der Straße', 'vom Hof', 'im dritten Stock'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Он придёт че́рез полчаса́.', answer: 'Он придёт че́рез полчаса́.' },
  ],
  speak: ['Мо́жно Ива́на Петро́вича?', 'Переда́йте ему́, пожа́луйста, что звони́ла А́нна.', 'Где у вас вход?'],
};

const l124: Lesson = {
  id: '12.4',
  unit: 12,
  title: { ru: 'Я хожу́ в бассе́йн', de: 'Ich gehe ins Schwimmbad' },
  canDo: 'Ich kann über regelmäßige Wege und Ausflüge sprechen (ходи́ть / е́здить).',
  speakers: { ns: S.ns, anna: S.anna },
  dialogs: [
    {
      title: 'Im Treppenhaus',
      lines: [
        { who: 'ns', ru: 'А́нна, куда́ вы идёте?', translit: 'ánna, kudá wy idjótje', de: 'Anna, wohin gehen Sie?', note: '**идти́**: jetzt gerade, in eine Richtung.' },
        { who: 'anna', ru: 'В бассе́йн. Я хожу́ туда́ по вто́рникам и четверга́м.', translit: 'w basséjn. ja chazhú tudá pa ftórnikam i tschitwirgám', de: 'Ins Schwimmbad. Ich gehe dienstags und donnerstags hin.', note: '**ходи́ть**: regelmäßig, hin und zurück. **по** + Dativ Plural = jeden (Tag): по вто́рникам = dienstags.' },
        { who: 'ns', ru: 'Как хорошо́! А я по суббо́там хожу́ на ры́нок.', translit: 'kak charaschó! a ja pa subótam chazhú na rýnak', de: 'Wie schön! Und ich gehe samstags auf den Markt.' },
        { who: 'anna', ru: 'А вы е́здите на да́чу?', translit: 'a wy jéz\'ditje na dátschu', de: 'Und fahren Sie (öfter) zur Datscha?' },
        { who: 'ns', ru: 'Ле́том ка́ждые выходны́е! Вчера́ я то́же е́здила туда́.', translit: "ljétam kázhdyje wychadnýje! ftschirá ja tózhe jéz'dila tudá", de: 'Im Sommer jedes Wochenende! Gestern bin ich auch hingefahren.', note: '**е́здила** = bin hingefahren und wieder zurück (eine Rundfahrt).' },
        { who: 'anna', ru: 'Как здо́рово! Я никогда́ не была́ на да́че.', translit: 'kak zdórawa! ja nikagdá ni bylá na dátsche', de: 'Wie toll! Ich war noch nie auf einer Datscha.' },
        { who: 'ns', ru: 'Так пое́хали со мной в суббо́ту!', translit: 'tak pajéchali sa mnoj f subótu', de: 'Dann fahren Sie doch am Samstag mit mir mit!' },
      ],
    },
  ],
  vocab: ['ходи́ть', 'е́здить', 'бассе́йн', 'по вто́рникам', 'да́ча', 'туда́', 'Пое́хали!'],
  grammar: [
    {
      title: 'идти́ / е́хать oder ходи́ть / е́здить?',
      blocks: [
        { table: { head: ['eine Richtung, jetzt', 'mehrere Richtungen, regelmäßig, hin und zurück'], rows: [
          ['идти́: я иду́, ты идёшь', 'ходи́ть: я хожу́, ты хо́дишь'],
          ['е́хать: я е́ду, ты е́дешь', 'е́здить: я е́зжу, ты е́здишь'],
          ['Я иду́ в бассе́йн. (jetzt)', 'Я хожу́ в бассе́йн. (regelmäßig)'],
          ['Я е́ду на да́чу. (unterwegs)', 'Я е́зжу на да́чу ка́ждое ле́то.'],
        ] } },
        { tip: '**Vergangenheit:** Я **ходи́л** в кино́ / **е́здил** в Москву́ = Ich war (hin und zurück). Das entspricht oft „ich war im Kino / in Moskau“.' },
        { p: '**Regelmäßige Tage:** по понеде́льникам, по вто́рникам, по суббо́там (по + Dativ Plural).' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'Сейча́с я … в магази́н.', options: ['иду́', 'хожу́'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Ка́ждый день я … на рабо́ту пешко́м.', options: ['иду́', 'хожу́'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Ле́том мы ча́сто … на да́чу.', options: ['е́дем', 'е́здим'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: '„Gestern war ich im Theater.“ (Mann)', options: ['Вчера́ я ходи́л в теа́тр.', 'Вчера́ я шёл в теа́тр.'], answer: 0, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „samstags“.', before: 'Я хожу́ на ры́нок по', after: '.', answer: 'суббо́там' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['бассе́йн', 'Schwimmbad'], ['да́ча', 'Datscha'], ['туда́', 'dorthin'], ['ходи́ть', 'gehen (regelmäßig)'], ['е́здить', 'fahren (regelmäßig)']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Ich gehe dienstags ins Schwimmbad.', answer: 'Я хожу́ в бассе́йн по вто́рникам.', alternatives: ['По вто́рникам я хожу́ в бассе́йн.'] },
    { type: 'choice', prompt: 'Laut Dialog: Wann fährt Natalja Sergejewna zur Datscha?', options: ['jeden Tag', 'im Sommer jedes Wochenende', 'nie'], answer: 1 },
  ],
  speak: ['Я хожу́ в бассе́йн по вто́рникам.', 'Мы ча́сто е́здим на да́чу.', 'Пое́хали со мной!'],
};

const l125: Lesson = {
  id: '12.5',
  unit: 12,
  title: { ru: 'Как ты провёл выходны́е?', de: 'Wie hast du das Wochenende verbracht?' },
  canDo: 'Ich kann eine kleine Geschichte in der Vergangenheit erzählen (Aspekte in der Erzählung).',
  speakers: { lena: S.lena, max: S.max },
  dialogs: [
    {
      title: 'Ein Wochenende auf der Datscha',
      lines: [
        { who: 'lena', ru: 'Макс, как ты провёл выходны́е?', translit: 'maks, kak ty prawjól wychadnýje', de: 'Max, wie hast du das Wochenende verbracht?' },
        { who: 'max', ru: 'Отли́чно! В пя́тницу ве́чером мы с О́лей и Серге́ем пое́хали на да́чу.', translit: 'atlítschna! f pjátnitsu wjétschiram my s ólej i sirgéjem pajéchali na dátschu', de: 'Super! Am Freitagabend sind Olja, Sergej und ich zur Datscha gefahren.', note: '**пое́хали** (perfektiv): ein Ereignis in der Erzählung – „wir fuhren los“.' },
        { who: 'lena', ru: 'Далеко́?', translit: 'dalikó', de: 'Ist das weit?' },
        { who: 'max', ru: 'Два часа́ на электри́чке. Когда́ мы прие́хали, уже́ бы́ло темно́.', translit: 'dwa tschisá na eliktrítschkje. kagdá my prijéchali, uzhé býla timnó', de: 'Zwei Stunden mit der Regionalbahn. Als wir ankamen, war es schon dunkel.', note: '**прие́хали** (Ereignis) – **бы́ло темно́** (Hintergrund, Zustand).' },
        { who: 'lena', ru: 'А что вы там де́лали?', translit: 'a schto wy tam djélali', de: 'Und was habt ihr dort gemacht?' },
        { who: 'max', ru: 'В суббо́ту мы весь день рабо́тали в саду́, а ве́чером жа́рили шашлы́к.', translit: 'f subótu my wjes\' djen\' rabótali f sadú, a wjétschiram zhárili schaschlýk', de: 'Am Samstag haben wir den ganzen Tag im Garten gearbeitet und abends Schaschlik gegrillt.', note: '**рабо́тали весь день** (imperfektiv): Dauer.' },
        { who: 'max', ru: 'А в воскресе́нье пошли́ в лес за гриба́ми.', translit: "a w waskrisjén'je paschlí w ljes za gribámi", de: 'Und am Sonntag sind wir in den Wald Pilze sammeln gegangen.', note: '**за** + Instrumental = um etwas zu holen: за гриба́ми (Pilze holen).' },
        { who: 'lena', ru: 'И что, нашли́?', translit: 'i schto, naschlí', de: 'Und, habt ihr welche gefunden?' },
        { who: 'max', ru: 'Да, мно́го! Но я не знал, каки́е мо́жно есть…', translit: 'da, mnóga! no ja ni znal, kakíje mózhna jest\'…', de: 'Ja, viele! Aber ich wusste nicht, welche man essen kann …' },
      ],
    },
  ],
  vocab: ['провести́ выходны́е', 'электри́чка', 'темно́', 'сад', 'жа́рить', 'шашлы́к', 'лес', 'грибы́', 'за гриба́ми'],
  grammar: [
    {
      title: 'Aspekte beim Erzählen',
      blocks: [
        { table: { head: ['perfektiv – die Handlung geht weiter', 'imperfektiv – Hintergrund, Dauer'], rows: [
          ['Мы пое́хали на да́чу.', 'Бы́ло темно́.'],
          ['Мы прие́хали в де́вять.', 'Мы весь день рабо́тали.'],
          ['Мы пошли́ в лес и нашли́ грибы́.', 'Шёл дождь.'],
        ] } },
        { tip: 'Faustregel: Perfektive Verben treiben die **Geschichte voran** (und dann … und dann …). Imperfektive Verben **malen das Bild** (wie es war, was lange dauerte).' },
      ],
    },
  ],
  exercises: [
    { type: 'choice', prompt: 'В суббо́ту мы весь день … в саду́.', options: ['порабо́тали', 'рабо́тали'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Когда́ мы …, бы́ло темно́. (ankamen)', options: ['приезжа́ли', 'прие́хали'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Мы пошли́ в лес и … мно́го грибо́в. (fanden)', options: ['находи́ли', 'нашли́'], answer: 1, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „Pilze holen“ (за + Instrumental).', before: 'Мы пошли́ в лес за', after: '.', answer: 'гриба́ми' },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['электри́чка', 'Regionalbahn'], ['темно́', 'dunkel'], ['сад', 'Garten'], ['лес', 'Wald'], ['грибы́', 'Pilze']] },
    { type: 'translate', prompt: 'Frag auf Russisch (an einen Mann).', de: 'Wie hast du das Wochenende verbracht?', answer: 'Как ты провёл выходны́е?', alternatives: ['Как ты провел выходны́е?'] },
    { type: 'choice', prompt: 'Laut Dialog: Wie lange dauert die Fahrt zur Datscha?', options: ['eine Stunde', 'zwei Stunden', 'einen Tag'], answer: 1 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Когда́ мы прие́хали, уже́ бы́ло темно́.', answer: 'Когда́ мы прие́хали, уже́ бы́ло темно́.' },
  ],
  speak: ['Как ты провёл выходны́е?', 'Мы пое́хали на да́чу.', 'Мы пошли́ в лес за гриба́ми.'],
};

const l12c: Lesson = {
  id: '12.C',
  unit: 12,
  checkpoint: true,
  title: { ru: 'Контро́льная', de: 'Checkpoint Einheit 12' },
  canDo: 'Ich kann mich verabreden, Bewegungen beschreiben und vom Wochenende erzählen.',
  speakers: {},
  dialogs: [],
  vocab: [],
  grammar: [],
  exercises: [
    { type: 'choice', prompt: 'Wie sagst du höflich ab?', options: ['К сожале́нию, я не смогу́.', 'С удово́льствием!', 'Обяза́тельно!'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Го́сти … в семь. (werden ankommen)', options: ['уйду́т', 'приду́т', 'пойду́т'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Его́ нет, он … (ist kurz raus)', options: ['вы́шел', 'вошёл', 'зашёл'], answer: 0, ruOptions: true },
    { type: 'choice', prompt: 'Я ча́сто … в бассе́йн.', options: ['иду́', 'хожу́'], answer: 1, ruOptions: true },
    { type: 'choice', prompt: 'Сейча́с мы … на да́чу. (sind unterwegs)', options: ['е́дем', 'е́здим'], answer: 0, ruOptions: true },
    { type: 'gap', prompt: 'Ergänze „in einer Stunde“.', before: 'Он придёт че́рез', after: '.', answer: 'час' },
    { type: 'choice', prompt: 'Мы весь ве́чер … (sahen fern, Dauer)', options: ['посмотре́ли телеви́зор', 'смотре́ли телеви́зор'], answer: 1, ruOptions: true },
    { type: 'match', prompt: 'Ordne zu.', pairs: [['прийти́', 'ankommen'], ['уйти́', 'weggehen'], ['войти́', 'hineingehen'], ['вы́йти', 'hinausgehen'], ['зайти́', 'vorbeischauen']] },
    { type: 'translate', prompt: 'Übersetze ins Russische.', de: 'Kann ich Iwan sprechen?', answer: 'Мо́жно Ива́на?' },
    { type: 'choice', prompt: 'Hör zu: Was macht die Person regelmäßig?', audio: 'По суббо́там я хожу́ на ры́нок.', options: ['samstags auf den Markt', 'sonntags ins Kino', 'samstags zur Datscha'], answer: 0 },
    { type: 'dictation', prompt: 'Hör zu und schreib den Satz.', audio: 'Я приду́ в шесть.', answer: 'Я приду́ в шесть.' },
    { type: 'order', prompt: 'Bilde den Satz „Am Freitag fuhren wir zur Datscha.“', tokens: ['да́чу.', 'на', 'пое́хали', 'мы', 'пя́тницу', 'В'], answer: 'В пя́тницу мы пое́хали на да́чу.' },
  ],
  speak: ['Пойдёшь с на́ми в кино́?', 'Я приду́ в семь.', 'По суббо́там я хожу́ в бассе́йн.', 'В воскресе́нье мы е́здили на да́чу.'],
};

export const UNIT12: Unit = {
  n: 12,
  title: { ru: 'Свобо́дное вре́мя', de: 'Freizeit' },
  lessons: [l121, l122, l123, l124, l125, l12c],
};
