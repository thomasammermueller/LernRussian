import Papa from 'papaparse';
import type { Word } from '../../content/vocab';
import type { CardRecord } from '../../core/db';
import { wordStatus } from '../../core/srs';
import { normalize } from '../../core/text';

export interface CsvRow {
  ru: string;
  de: string;
  translit?: string;
  exRu?: string;
  exDe?: string;
  line: number;
}

const HEADERS: Record<keyof Omit<CsvRow, 'line'>, string[]> = {
  ru: ['russisch', 'russian', 'ru', 'wort', 'word'],
  de: ['deutsch', 'german', 'de', 'übersetzung', 'uebersetzung', 'translation'],
  translit: ['lautschrift', 'transliteration', 'translit', 'aussprache'],
  exRu: ['beispiel_ru', 'example_ru', 'beispiel'],
  exDe: ['beispiel_de', 'example_de'],
};

const CYRILLIC = /[Ѐ-ӿ]/;

/** Parses CSV text (delimiter auto-detected: ; , or tab). A header row is optional. */
export function parseCsv(text: string): { rows: CsvRow[]; errors: string[] } {
  const parsed = Papa.parse<string[]>(text.replace(/^﻿/, ''), { skipEmptyLines: 'greedy', delimitersToGuess: [';', ',', '\t'] });
  const data = parsed.data.map((r) => r.map((c) => (c ?? '').trim()));
  if (!data.length) return { rows: [], errors: ['Die Datei ist leer.'] };

  // Column mapping: from header row or default order ru;de;translit;exRu;exDe
  let map: Partial<Record<keyof typeof HEADERS, number>> = { ru: 0, de: 1, translit: 2, exRu: 3, exDe: 4 };
  let start = 0;
  const header = data[0].map((h) => h.toLowerCase());
  if (!header.some((h) => CYRILLIC.test(h)) && header.some((h) => Object.values(HEADERS).flat().includes(h))) {
    map = {};
    for (const [key, names] of Object.entries(HEADERS) as [keyof typeof HEADERS, string[]][]) {
      const i = header.findIndex((h) => names.includes(h));
      if (i >= 0) map[key] = i;
    }
    start = 1;
  }
  const rows: CsvRow[] = [];
  const errors: string[] = [];
  if (map.ru === undefined || map.de === undefined) return { rows, errors: ['Spalten „russisch“ und „deutsch“ nicht gefunden.'] };

  for (let i = start; i < data.length; i++) {
    const r = data[i];
    const get = (k: keyof typeof HEADERS) => (map[k] !== undefined ? r[map[k]!] || undefined : undefined);
    const ru = get('ru');
    const de = get('de');
    if (!ru || !de) {
      errors.push(`Zeile ${i + 1}: russisch oder deutsch fehlt.`);
      continue;
    }
    if (!CYRILLIC.test(ru)) {
      errors.push(`Zeile ${i + 1}: „${ru}“ enthält keine kyrillischen Buchstaben.`);
      continue;
    }
    rows.push({ ru, de, translit: get('translit'), exRu: get('exRu'), exDe: get('exDe'), line: i + 1 });
  }
  return { rows, errors };
}

/** Splits rows into new ones and duplicates (same Russian word already known). */
export function dedupe(rows: CsvRow[], existing: Word[]) {
  const seen = new Set(existing.map((w) => normalize(w.ru)));
  const fresh: CsvRow[] = [];
  const duplicates: CsvRow[] = [];
  for (const r of rows) {
    const key = normalize(r.ru);
    if (seen.has(key)) duplicates.push(r);
    else {
      seen.add(key);
      fresh.push(r);
    }
  }
  return { fresh, duplicates };
}

/** CSV export (semicolon, UTF-8 with BOM → opens correctly in Excel and Numbers). */
export function toCsv(words: Word[], cards: CardRecord[], topicName: (id: string) => string): string {
  const rec = new Map(cards.filter((c) => c.dir === 'ru-de').map((c) => [c.wordId, c]));
  const rows = words.map((w) => {
    const c = rec.get(w.id);
    return {
      russisch: w.ru,
      deutsch: w.de,
      lautschrift: w.translit,
      beispiel_ru: w.exRu ?? '',
      beispiel_de: w.exDe ?? '',
      thema: topicName(w.topic),
      status: wordStatus(c),
      faellig: c ? new Date(c.due).toISOString().slice(0, 10) : '',
    };
  });
  return '﻿' + Papa.unparse(rows, { delimiter: ';' });
}

export function downloadText(name: string, text: string, type = 'text/csv;charset=utf-8') {
  const blob = new Blob([text], { type });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
