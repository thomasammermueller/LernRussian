import { describe, expect, it } from 'vitest';
import { SOUND_GROUPS } from '../src/content/pronunciation';
import { BUILTIN_WORDS } from '../src/content/vocab';
import { ALPHABET } from '../src/content/alphabet';
import { align, evaluate, stressHint } from '../src/core/pronunciation';
import { normalize } from '../src/core/text';
import { dailyMinutes, dueForecast, hardestCards, vocabGrowth } from '../src/features/progress/stats';
import { newCardRecord } from '../src/core/srs';
import { today } from '../src/core/db';

describe('pronunciation evaluation', () => {
  it('scores a perfect recognition with 100 and maps letters incl. stress marks', () => {
    const e = evaluate('Здра́вствуйте, Ната́лья Серге́евна!', ['Здравствуйте, Наталья Сергеевна!']);
    expect(e.score).toBe(100);
    expect(e.chars.map((c) => c.ch).join('')).toBe('Здра́вствуйте, Ната́лья Серге́евна!');
    expect(e.chars.filter((c) => c.status === 'ok').length).toBe(28);
    expect(e.words.every((w) => w.ok)).toBe(true);
  });
  it('picks the best alternative transcript', () => {
    const e = evaluate('Я живу́ в Берли́не.', ['я живу в берлине', 'я жил в берлине']);
    expect(e.score).toBe(100);
  });
  it('gives targeted tips for ы/и confusion', () => {
    const e = evaluate('сыр', ['сир']);
    expect(e.chars.find((c) => c.ch === 'ы')?.status).toBe('wrong');
    expect(e.tips.join(' ')).toContain('**ы** ist kein „i“');
    expect(e.short).toBe(true);
  });
  it('flags misrecognised words and adds a stress hint', () => {
    const e = evaluate('Извини́те, я не понима́ю.', ['извините я не помню']);
    expect(e.score).toBeLessThan(85);
    expect(e.words.find((w) => w.word.startsWith('понима́ю'))?.ok).toBe(false);
    expect(e.tips.some((t) => t.includes('по-ни-МА-ю'))).toBe(true);
  });
  it('handles silence', () => {
    const e = evaluate('спаси́бо', []);
    expect(e.score).toBe(0);
    expect(e.tips[0]).toContain('nichts verstanden');
    expect(e.tips.some((t) => t.includes('**'))).toBe(false); // no letter tips for silence
  });
  it('aligns strings', () => {
    expect(align('кот', 'кит').map((o) => o.t)).toEqual(['eq', 'sub', 'eq']);
    expect(align('кот', 'кт').map((o) => o.t)).toEqual(['eq', 'del', 'eq']);
  });
  it('builds stress hints', () => {
    expect(stressHint('приве́т')).toBe('при-ВЕТ');
    expect(stressHint('молоко́')).toBe('мо-ло-КО');
    expect(stressHint('сего́дня')).toBe('се-ГО-дня');
    expect(stressHint('кот')).toBeNull();
  });
  it('sound groups only use words that have recordings', () => {
    const known = new Set([...BUILTIN_WORDS.map((w) => w.ru), ...ALPHABET.flatMap((l) => l.examples.map((e) => e.ru))].map(normalize));
    for (const g of SOUND_GROUPS) for (const w of g.items) expect(known.has(normalize(w)), w).toBe(true);
  });
});

describe('statistics', () => {
  const now = new Date(2026, 10, 7, 15);
  it('computes daily minutes for the last n days', () => {
    const d = dailyMinutes([{ date: today(now), seconds: 600, updatedAt: 0 }], 7, now);
    expect(d).toHaveLength(7);
    expect(d.at(-1)).toMatchObject({ minutes: 10 });
    expect(d[0].minutes).toBe(0);
  });
  it('computes cumulative vocabulary growth and due forecast', () => {
    const t = now.getTime();
    const cards = [
      newCardRecord('a', 'ru-de', t - 3 * 86400_000, t - 86400_000),
      newCardRecord('b', 'ru-de', t, t + 2 * 86400_000),
      newCardRecord('b', 'de-ru', t, t + 2 * 86400_000),
    ];
    expect(vocabGrowth(cards, 5, now).map((g) => g.value)).toEqual([0, 1, 1, 1, 2]);
    expect(dueForecast(cards, 4, now).map((f) => f.value)).toEqual([1, 0, 2, 0]);
  });
  it('lists the hardest cards', () => {
    const c = { ...newCardRecord('x', 'ru-de', 0), reps: 5, lapses: 3 };
    expect(hardestCards([c, newCardRecord('y', 'ru-de', 0)])).toEqual([c]);
  });
});
