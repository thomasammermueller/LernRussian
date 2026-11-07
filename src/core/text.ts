const STRESS = /́/g;

/** Removes stress marks (combining acute accent). */
export const stripStress = (s: string) => s.replace(STRESS, '');

/** Normalises an answer for tolerant comparison: no stress, ё→е, lowercase, no punctuation. */
export const normalize = (s: string) =>
  stripStress(s)
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[.,!?;:«»"„“()\-–—]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[n];
}

export type AnswerResult = 'correct' | 'almost' | 'wrong';

/** Compares a typed answer with the expected one. One typo in words ≥ 4 letters counts as "almost". */
export function checkAnswer(given: string, expected: string): AnswerResult {
  const g = normalize(given);
  const e = normalize(expected);
  if (g === e) return 'correct';
  if (e.length >= 4 && levenshtein(g, e) === 1) return 'almost';
  return 'wrong';
}
