export type LetterGroup = 1 | 2 | 3 | 4;

export interface Example {
  ru: string; // with stress mark (combining acute)
  translit: string;
  de: string;
}

export interface Letter {
  id: string; // lowercase letter
  upper: string;
  lower: string;
  name: string; // Russian letter name (for TTS)
  sound: string; // Lautschrift
  hint: string; // German explanation
  group: LetterGroup;
  examples: Example[];
}

export const GROUPS: Record<LetterGroup, { title: string; subtitle: string; lessonId: string }> = {
  1: { title: 'Wie im Deutschen', subtitle: 'Sehen gleich aus und klingen gleich', lessonId: '0.1' },
  2: { title: 'Falsche Freunde', subtitle: 'Sehen bekannt aus, klingen aber anders', lessonId: '0.2' },
  3: { title: 'Neue Formen', subtitle: 'Neue Zeichen für bekannte Laute', lessonId: '0.3' },
  4: { title: 'Neue Laute & Zeichen', subtitle: 'Laute, die es im Deutschen so nicht gibt', lessonId: '0.4' },
};

const L = (
  upper: string,
  lower: string,
  name: string,
  sound: string,
  hint: string,
  group: LetterGroup,
  examples: [string, string, string][],
): Letter => ({
  id: lower,
  upper,
  lower,
  name,
  sound,
  hint,
  group,
  examples: examples.map(([ru, translit, de]) => ({ ru, translit, de })),
});

// Alphabetical order.
export const ALPHABET: Letter[] = [
  L('А', 'а', 'а', 'a', 'Wie „a“ in „Mann“.', 1, [['ма́ма', 'máma', 'Mama'], ['а́том', 'átam', 'Atom']]),
  L('Б', 'б', 'бэ', 'b', 'Wie „b“. Am Wortende wie „p“.', 3, [['банк', 'bank', 'Bank'], ['ба́бушка', 'bábuschka', 'Oma']]),
  L('В', 'в', 'вэ', 'w', 'Falscher Freund! Klingt wie deutsches „w“, nicht wie „b“.', 2, [['вот', 'wot', 'da ist / hier ist'], ['вода́', 'wadá', 'Wasser']]),
  L('Г', 'г', 'гэ', 'g', 'Wie „g“ in „gut“. Am Wortende wie „k“.', 3, [['го́род', 'górat', 'Stadt'], ['гита́ра', 'gitára', 'Gitarre']]),
  L('Д', 'д', 'дэ', 'd', 'Wie „d“. Am Wortende wie „t“.', 3, [['дом', 'dom', 'Haus'], ['да', 'da', 'ja']]),
  L('Е', 'е', 'е', 'je', 'Falscher Freund! Klingt wie „je“ in „jetzt“. Nach Konsonanten macht es diesen weich: нет [njet].', 2, [['нет', 'njet', 'nein'], ['метро́', 'mitró', 'U-Bahn']]),
  L('Ё', 'ё', 'ё', 'jo', 'Wie „jo“ in „Joghurt“. Ist immer betont.', 3, [['ёлка', 'jólka', 'Tanne'], ['мёд', 'mjot', 'Honig']]),
  L('Ж', 'ж', 'жэ', 'zh', 'Stimmhaftes „sch“ wie „J“ in „Journal“. Immer hart.', 4, [['журна́л', 'zhurnál', 'Zeitschrift'], ['жена́', 'zhyná', 'Ehefrau']]),
  L('З', 'з', 'зэ', 'z', 'Stimmhaftes „s“ wie in „Sonne“ – nicht wie deutsches „z“!', 3, [['ро́за', 'róza', 'Rose'], ['за́втра', 'záftra', 'morgen']]),
  L('И', 'и', 'и', 'i', 'Wie „i“ in „Igel“. Sieht aus wie ein gespiegeltes N.', 3, [['и', 'i', 'und'], ['мир', 'mir', 'Welt, Frieden']]),
  L('Й', 'й', 'и кра́ткое', 'j', 'Kurzes „i“, wie „j“ in „Mai“. Steht fast immer nach Vokalen.', 3, [['мой', 'moj', 'mein'], ['чай', 'tschaj', 'Tee']]),
  L('К', 'к', 'ка', 'k', 'Wie „k“, aber ohne Hauch.', 1, [['кот', 'kot', 'Kater'], ['так', 'tak', 'so']]),
  L('Л', 'л', 'эль', 'l', 'Dunkles „l“: Zunge an die oberen Zähne, Zungenrücken tief.', 3, [['ла́мпа', 'lámpa', 'Lampe'], ['стол', 'stol', 'Tisch']]),
  L('М', 'м', 'эм', 'm', 'Wie „m“.', 1, [['мак', 'mak', 'Mohn'], ['ма́ма', 'máma', 'Mama']]),
  L('Н', 'н', 'эн', 'n', 'Falscher Freund! Sieht aus wie H, klingt aber wie „n“.', 2, [['нос', 'nos', 'Nase'], ['она́', 'aná', 'sie']]),
  L('О', 'о', 'о', 'o / a', 'Betont wie „o“, unbetont wie „a“ (Akanje): окно́ [aknó].', 1, [['кот', 'kot', 'Kater'], ['окно́', 'aknó', 'Fenster']]),
  L('П', 'п', 'пэ', 'p', 'Wie „p“, ohne Hauch.', 3, [['парк', 'park', 'Park'], ['па́па', 'pápa', 'Papa']]),
  L('Р', 'р', 'эр', 'r', 'Falscher Freund! Klingt wie „r“ – mit der Zungenspitze gerollt.', 2, [['рот', 'rot', 'Mund'], ['ру́сский', 'rúskij', 'russisch']]),
  L('С', 'с', 'эс', 's', 'Falscher Freund! Klingt wie „s“, immer stimmlos wie in „Haus“.', 2, [['сок', 'sok', 'Saft'], ['сестра́', 'sistrá', 'Schwester']]),
  L('Т', 'т', 'тэ', 't', 'Wie „t“, ohne Hauch.', 1, [['торт', 'tort', 'Torte'], ['тут', 'tut', 'hier']]),
  L('У', 'у', 'у', 'u', 'Falscher Freund! Klingt wie „u“ in „gut“.', 2, [['суп', 'sup', 'Suppe'], ['у́тро', 'útra', 'Morgen']]),
  L('Ф', 'ф', 'эф', 'f', 'Wie „f“.', 3, [['фо́то', 'fóta', 'Foto'], ['фильм', "fil'm", 'Film']]),
  L('Х', 'х', 'ха', 'ch', 'Falscher Freund! Klingt wie „ch“ in „Bach“.', 2, [['хор', 'chor', 'Chor'], ['хорошо́', 'charaschó', 'gut']]),
  L('Ц', 'ц', 'цэ', 'ts', 'Wie deutsches „z“ in „Zeit“.', 4, [['цирк', 'tsyrk', 'Zirkus'], ['центр', 'tsentr', 'Zentrum']]),
  L('Ч', 'ч', 'че', 'tsch', 'Wie „tsch“ in „Matsch“, aber weich.', 4, [['чай', 'tschaj', 'Tee'], ['ночь', "notsch'", 'Nacht']]),
  L('Ш', 'ш', 'ша', 'sch', 'Hartes „sch“, Zunge weiter hinten als im Deutschen.', 4, [['шко́ла', 'schkóla', 'Schule'], ['ша́пка', 'schápka', 'Mütze']]),
  L('Щ', 'щ', 'ща', 'schsch', 'Langes, weiches „sch“ – wie in „frisch-scheint“.', 4, [['борщ', 'borschsch', 'Borschtsch'], ['щи', 'schschi', 'Kohlsuppe']]),
  L('Ъ', 'ъ', 'твёрдый знак', '–', 'Härtezeichen: kein eigener Laut, trennt mit einer kleinen Pause.', 4, [['объе́кт', 'abjékt', 'Objekt'], ['съесть', "sjest'", 'aufessen']]),
  L('Ы', 'ы', 'ы', 'y', 'Dumpfes „i“: sag „i“ und zieh die Zunge weit nach hinten.', 4, [['мы', 'my', 'wir'], ['сыр', 'syr', 'Käse']]),
  L('Ь', 'ь', 'мя́гкий знак', "'", 'Weichheitszeichen: kein Laut, macht den Konsonanten davor weich.', 4, [['мать', "mat'", 'Mutter'], ['день', "djen'", 'Tag']]),
  L('Э', 'э', 'э', 'e', 'Offenes „e“ wie in „Ende“ – ohne j davor.', 3, [['э́то', 'éta', 'das (ist)'], ['э́хо', 'écha', 'Echo']]),
  L('Ю', 'ю', 'ю', 'ju', 'Wie „ju“ in „Jugend“.', 3, [['юг', 'juk', 'Süden'], ['ю́бка', 'júpka', 'Rock']]),
  L('Я', 'я', 'я', 'ja', 'Wie „ja“. Allein bedeutet я „ich“.', 3, [['я', 'ja', 'ich'], ['Росси́я', 'rassíja', 'Russland']]),
];

export const lettersOfGroup = (g: LetterGroup) => ALPHABET.filter((l) => l.group === g);
export const letterById = (id: string) => ALPHABET.find((l) => l.id === id);

/** Words for the reading test (0.T) – international words that are easy to recognise. */
export const READING_WORDS: Example[] = [
  ['Берли́н', 'birlín', 'Berlin'],
  ['Москва́', 'maskwá', 'Moskau'],
  ['такси́', 'taksí', 'Taxi'],
  ['футбо́л', 'futból', 'Fußball'],
  ['компью́тер', 'kampjútir', 'Computer'],
  ['рестора́н', 'ristarán', 'Restaurant'],
  ['теа́тр', 'tiátr', 'Theater'],
  ['кафе́', 'kafé', 'Café'],
  ['шокола́д', 'schakalát', 'Schokolade'],
  ['банк', 'bank', 'Bank'],
  ['до́ктор', 'dóktar', 'Doktor'],
  ['трамва́й', 'tramwáj', 'Straßenbahn'],
  ['бале́т', 'baljét', 'Ballett'],
  ['ви́за', 'wíza', 'Visum'],
  ['па́спорт', 'páspart', 'Reisepass'],
  ['аэропо́рт', 'aerapórt', 'Flughafen'],
  ['тури́ст', 'turíst', 'Tourist'],
  ['телефо́н', 'tilifón', 'Telefon'],
  ['университе́т', 'uniwirsitjét', 'Universität'],
  ['му́зыка', 'múzyka', 'Musik'],
  ['фру́кты', 'frúkty', 'Obst'],
  ['ма́ма', 'máma', 'Mama'],
  ['Росси́я', 'rassíja', 'Russland'],
  ['Герма́ния', 'girmánija', 'Deutschland'],
].map(([ru, translit, de]) => ({ ru, translit, de }));
