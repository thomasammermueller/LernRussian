import { describe, expect, it } from 'vitest';
import { BUILTIN_WORDS, TOPICS } from '../src/content/vocab';
import { stripStress, normalize } from '../src/core/text';
import { Rating, State, newCardRecord, schedule, wordStatus, formatInterval, suggestRating } from '../src/core/srs';
import { buildQueue, introducedToday } from '../src/features/vocab/queue';
import { dedupe, parseCsv, toCsv } from '../src/features/vocab/csv';

describe('vocabulary content', () => {
  it('has 10 topics with ≥ 20 words each and unique ids', () => {
    expect(TOPICS).toHaveLength(10);
    for (const t of TOPICS) expect(t.words.length, t.id).toBeGreaterThanOrEqual(20);
    expect(new Set(BUILTIN_WORDS.map((w) => w.id)).size).toBe(BUILTIN_WORDS.length);
  });
  it('has no word twice across topics', () => {
    const seen = new Map<string, string>();
    for (const w of BUILTIN_WORDS) {
      const k = normalize(w.ru);
      expect(seen.has(k), `${w.ru} in ${w.topic} and ${seen.get(k)}`).toBe(false);
      seen.set(k, w.topic);
    }
  });
  it('marks stress on every multi-syllable word and has a transliteration', () => {
    for (const w of BUILTIN_WORDS) {
      expect(w.translit, w.ru).toBeTruthy();
      for (const token of w.ru.split(/[\s,.!?…]+/).filter(Boolean)) {
        const syl = (stripStress(token).toLowerCase().match(/[аеёиоуыэюя]/g) ?? []).length;
        // short function words (до, не, у …) may stay unstressed inside phrases
        if (syl > 1 && !['до', 'не'].includes(token.toLowerCase())) {
          expect(token.includes('́') || token.toLowerCase().includes('ё'), `${token} (${w.ru})`).toBe(true);
        }
      }
    }
  });
});

describe('srs', () => {
  const t0 = new Date(2026, 10, 7, 10).getTime();
  it('schedules a new card into learning, then review', () => {
    let c = newCardRecord('x:слово', 'ru-de', t0);
    expect(c.state).toBe(State.New);
    c = schedule(c, Rating.Good, t0);
    expect(c.state).toBe(State.Learning);
    expect(c.due - t0).toBeLessThan(60 * 60_000);
    c = schedule(c, Rating.Good, c.due);
    expect(c.state).toBe(State.Review);
    expect(c.due - t0).toBeGreaterThan(20 * 3600_000);
  });
  it('derives word status', () => {
    expect(wordStatus(undefined)).toBe('neu');
    const c = schedule(newCardRecord('x:a', 'ru-de', t0), Rating.Good, t0);
    expect(wordStatus(c)).toBe('lernend');
    expect(wordStatus({ ...c, state: State.Review, stability: 30 })).toBe('sicher');
  });
  it('formats intervals and maps typed answers to ratings', () => {
    expect(formatInterval(30_000)).toBe('< 1 Min.');
    expect(formatInterval(10 * 60_000)).toBe('10 Min.');
    expect(formatInterval(86400_000)).toBe('1 Tag');
    expect(formatInterval(4 * 86400_000)).toBe('4 Tage');
    expect(suggestRating('correct')).toBe(Rating.Good);
    expect(suggestRating('almost')).toBe(Rating.Hard);
    expect(suggestRating('wrong')).toBe(Rating.Again);
  });
});

describe('queue', () => {
  const now = new Date(2026, 10, 7, 12).getTime();
  const words = TOPICS[0].words;
  it('offers new words of a topic up to the daily limit', () => {
    const q = buildQueue(words, [], { topic: 'begruessung', newLimit: 5, now });
    expect(q).toHaveLength(5);
    expect(q.every((i) => i.kind === 'new')).toBe(true);
  });
  it('subtracts words already introduced today and interleaves reviews', () => {
    const cards = words.slice(0, 4).map((w) => ({ ...newCardRecord(w.id, 'ru-de', now - 3600_000), due: now - 1000 }));
    expect(introducedToday(cards, now)).toBe(4);
    const q = buildQueue(words, cards, { topic: 'begruessung', newLimit: 6, now });
    expect(q.map((i) => i.kind)).toEqual(['review', 'review', 'review', 'new', 'review', 'new']);
  });
  it('without topic only returns due reviews', () => {
    const cards = [{ ...newCardRecord(words[0].id, 'ru-de', now - 86400_000 * 3), due: now + 1000 }];
    expect(buildQueue(words, cards, { newLimit: 10, now })).toHaveLength(0);
  });
});

describe('csv', () => {
  it('parses semicolon CSV with header', () => {
    const { rows, errors } = parseCsv('﻿russisch;deutsch;lautschrift\nкни́га;Buch;kníga\nstol;Tisch\n;leer\n');
    expect(rows).toEqual([{ ru: 'кни́га', de: 'Buch', translit: 'kníga', exRu: undefined, exDe: undefined, line: 2 }]);
    expect(errors).toHaveLength(2);
  });
  it('parses comma CSV without header and with quotes', () => {
    const { rows } = parseCsv('ко́шка,Katze\n"рад, ра́да","froh, erfreut"\n');
    expect(rows.map((r) => [r.ru, r.de])).toEqual([
      ['ко́шка', 'Katze'],
      ['рад, ра́да', 'froh, erfreut'],
    ]);
  });
  it('finds duplicates against existing words (ignoring stress)', () => {
    const { fresh, duplicates } = dedupe(
      [
        { ru: 'привет', de: 'hallo', line: 1 },
        { ru: 'ко́шка', de: 'Katze', line: 2 },
        { ru: 'кошка', de: 'Katze', line: 3 },
      ],
      BUILTIN_WORDS,
    );
    expect(fresh.map((r) => r.line)).toEqual([2]);
    expect(duplicates.map((r) => r.line)).toEqual([1, 3]);
  });
  it('exports a round-trippable CSV', () => {
    const csv = toCsv(words(), [], () => 'Test');
    expect(csv.startsWith('﻿russisch;deutsch;lautschrift')).toBe(true);
    const back = parseCsv(csv).rows;
    expect(back).toHaveLength(words().length);
    expect(back[0].ru).toBe(words()[0].ru);
    function words() {
      return TOPICS[0].words.slice(0, 5);
    }
  });
});
