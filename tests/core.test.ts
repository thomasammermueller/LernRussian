import { describe, expect, it } from 'vitest';
import { ALPHABET, GROUPS, READING_WORDS } from '../src/content/alphabet';
import { STROKES, splitStrokes } from '../src/content/strokes';
import { LAYOUTS, transliterate } from '../src/core/keyboard';
import { checkAnswer, normalize, stripStress } from '../src/core/text';
import { densify, scoreTrace } from '../src/core/tracing';
import { computeStreak, today } from '../src/core/db';

describe('alphabet content', () => {
  it('has 33 unique letters with examples', () => {
    expect(ALPHABET).toHaveLength(33);
    expect(new Set(ALPHABET.map((l) => l.id)).size).toBe(33);
    for (const l of ALPHABET) {
      expect(l.upper.toLowerCase()).toBe(l.lower);
      expect(l.examples.length).toBeGreaterThan(0);
    }
  });
  it('splits into the four groups 5/7/13/8', () => {
    const count = (g: number) => ALPHABET.filter((l) => l.group === g).length;
    expect([count(1), count(2), count(3), count(4)]).toEqual([5, 7, 13, 8]);
    expect(Object.keys(GROUPS)).toHaveLength(4);
  });
  it('marks stress in every multi-syllable example word', () => {
    const vowels = /[аеёиоуыэюя]/g;
    for (const ex of [...ALPHABET.flatMap((l) => l.examples), ...READING_WORDS]) {
      const syllables = (stripStress(ex.ru).toLowerCase().match(vowels) ?? []).length;
      const hasStress = ex.ru.includes('́') || ex.ru.toLowerCase().includes('ё');
      if (syllables > 1) expect(hasStress, ex.ru).toBe(true);
    }
  });
  it('has stroke templates for every upper- and lowercase letter', () => {
    for (const l of ALPHABET) {
      expect(STROKES[l.upper], l.upper).toBeTruthy();
      expect(STROKES[l.lower], l.lower).toBeTruthy();
      expect(splitStrokes(STROKES[l.upper]).every((s) => s.startsWith('M'))).toBe(true);
    }
  });
});

describe('keyboard', () => {
  it('layouts contain all 33 letters exactly once', () => {
    for (const layout of Object.values(LAYOUTS)) {
      const keys = layout.rows.flat();
      expect(keys).toHaveLength(33);
      expect(new Set(keys)).toEqual(new Set(ALPHABET.map((l) => l.id)));
    }
  });
  it('transliterates German-style input', () => {
    expect(transliterate('privet')).toBe('привет');
    expect(transliterate('schkola')).toBe('школа');
    expect(transliterate('borschtsch')).toBe('борщ');
    expect(transliterate('tschaj')).toBe('чай');
    expect(transliterate('zhurnal')).toBe('журнал');
    expect(transliterate('chorosho')).toBe('хорошо');
    expect(transliterate("mat'")).toBe('мать');
    expect(transliterate('Rossija')).toBe('Россия');
    expect(transliterate('my')).toBe('мы');
    expect(transliterate('äto')).toBe('это');
  });
});

describe('answer checking', () => {
  it('ignores stress, ё/е, case and punctuation', () => {
    expect(normalize('Приве́т!')).toBe('привет');
    expect(checkAnswer('ЁЛКА', 'ёлка')).toBe('correct');
    expect(checkAnswer('елка', 'ёлка')).toBe('correct');
    expect(checkAnswer('привет', 'приве́т')).toBe('correct');
  });
  it('accepts one typo as almost', () => {
    expect(checkAnswer('привт', 'привет')).toBe('almost');
    expect(checkAnswer('пока', 'привет')).toBe('wrong');
    expect(checkAnswer('кит', 'кот')).toBe('wrong'); // short words must be exact
  });
});

describe('tracing score', () => {
  const tpl = [densify([{ x: 20, y: 15 }, { x: 20, y: 95 }]), densify([{ x: 20, y: 15 }, { x: 80, y: 15 }])];
  it('scores a faithful trace high', () => {
    const r = scoreTrace(tpl, [
      [{ x: 21, y: 16 }, { x: 22, y: 94 }],
      [{ x: 20, y: 14 }, { x: 79, y: 16 }],
    ]);
    expect(r.score).toBeGreaterThanOrEqual(90);
  });
  it('scores a partial trace low', () => {
    const r = scoreTrace(tpl, [[{ x: 20, y: 15 }, { x: 20, y: 95 }]]);
    expect(r.score).toBeLessThan(85);
    expect(r.coverage).toBeLessThan(0.7);
  });
  it('scores scribbles elsewhere very low', () => {
    const r = scoreTrace(tpl, [[{ x: 60, y: 60 }, { x: 90, y: 100 }]]);
    expect(r.score).toBeLessThan(20);
  });
});

describe('streak', () => {
  const day = (offset: number) => {
    const d = new Date(2026, 10, 7);
    d.setDate(d.getDate() + offset);
    return { date: today(d), seconds: 120, updatedAt: 0 };
  };
  const now = new Date(2026, 10, 7, 12);
  it('counts consecutive days including today', () => {
    expect(computeStreak([day(0), day(-1), day(-2), day(-4)], now)).toBe(3);
  });
  it('keeps the streak if today is not done yet', () => {
    expect(computeStreak([day(-1), day(-2)], now)).toBe(2);
  });
  it('is zero after a missed day', () => {
    expect(computeStreak([day(-2)], now)).toBe(0);
  });
});
