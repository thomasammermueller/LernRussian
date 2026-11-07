export type KeyboardLayout = 'jcuken' | 'phonetic';

export const LAYOUTS: Record<KeyboardLayout, { label: string; rows: string[][] }> = {
  jcuken: {
    label: 'ЙЦУКЕН',
    rows: [
      ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'],
      ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
      ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'ё'],
    ],
  },
  phonetic: {
    label: 'Phonetisch',
    rows: [
      ['я', 'в', 'е', 'р', 'т', 'ы', 'у', 'и', 'о', 'п', 'ш', 'щ'],
      ['а', 'с', 'д', 'ф', 'г', 'ч', 'й', 'к', 'л', 'ь', 'э', 'ю'],
      ['з', 'х', 'ц', 'ж', 'б', 'н', 'м', 'ё', 'ъ'],
    ],
  },
};

/**
 * Latin → Cyrillic transliteration for typing on a physical keyboard.
 * German-friendly (sch, tsch, ch) with common English alternatives (sh, zh, ts).
 * Longest match wins.
 */
const MAP: [string, string][] = [
  ['schtsch', 'щ'],
  ['shch', 'щ'],
  ['tsch', 'ч'],
  ['sch', 'ш'],
  ["''", 'ъ'],
  ['sh', 'ш'],
  ['zh', 'ж'],
  ['ch', 'х'],
  ['ts', 'ц'],
  ['ja', 'я'],
  ['ya', 'я'],
  ['ju', 'ю'],
  ['yu', 'ю'],
  ['jo', 'ё'],
  ['yo', 'ё'],
  ['je', 'е'],
  ['a', 'а'],
  ['b', 'б'],
  ['w', 'в'],
  ['v', 'в'],
  ['g', 'г'],
  ['d', 'д'],
  ['e', 'е'],
  ['ä', 'э'],
  ['z', 'з'],
  ['i', 'и'],
  ['j', 'й'],
  ['k', 'к'],
  ['l', 'л'],
  ['m', 'м'],
  ['n', 'н'],
  ['o', 'о'],
  ['p', 'п'],
  ['r', 'р'],
  ['s', 'с'],
  ['t', 'т'],
  ['u', 'у'],
  ['f', 'ф'],
  ['h', 'х'],
  ['x', 'х'],
  ['c', 'ц'],
  ['y', 'ы'],
  ["'", 'ь'],
];

export function transliterate(latin: string): string {
  let out = '';
  let i = 0;
  while (i < latin.length) {
    const rest = latin.slice(i);
    const lower = rest.toLowerCase();
    const hit = MAP.find(([lat]) => lower.startsWith(lat));
    if (!hit) {
      out += latin[i];
      i++;
      continue;
    }
    const [lat, cyr] = hit;
    const isUpper = rest[0] !== rest[0].toLowerCase();
    out += isUpper ? cyr.toUpperCase() : cyr;
    i += lat.length;
  }
  return out;
}

/** Characters that start a transliteration sequence. */
export const isTranslitChar = (ch: string) => /^[a-zA-ZäÄ']$/.test(ch);

export const TRANSLIT_HELP: [string, string][] = [
  ['w / v', 'в'],
  ['z', 'з'],
  ['zh', 'ж'],
  ['ch / h', 'х'],
  ['c / ts', 'ц'],
  ['tsch', 'ч'],
  ['sch / sh', 'ш'],
  ['schtsch', 'щ'],
  ['y', 'ы'],
  ['j', 'й'],
  ['ja / ju / jo', 'я / ю / ё'],
  ['ä', 'э'],
  ["'", 'ь'],
  ["''", 'ъ'],
];
