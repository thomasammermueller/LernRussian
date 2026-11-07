import { normalize } from './text';

export type CharStatus = 'ok' | 'wrong' | 'missing' | 'none';

export interface Evaluation {
  score: number; // 0–100
  heard: string; // best matching transcript
  chars: { ch: string; status: CharStatus }[]; // target text, char by char (incl. stress marks)
  words: { word: string; ok: boolean }[];
  tips: string[];
  short: boolean; // very short targets are recognised unreliably
}

type Op = { t: 'eq' | 'sub' | 'del' | 'ins'; a?: string; b?: string; ai?: number };

/** Levenshtein alignment of a (target) to b (heard). */
export function align(a: string, b: string): Op[] {
  const m = a.length;
  const n = b.length;
  const d: number[][] = Array.from({ length: m + 1 }, (_, i) => Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  const ops: Op[] = [];
  let i = m;
  let j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && d[i][j] === d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)) {
      ops.push({ t: a[i - 1] === b[j - 1] ? 'eq' : 'sub', a: a[i - 1], b: b[j - 1], ai: i - 1 });
      i--;
      j--;
    } else if (i > 0 && d[i][j] === d[i - 1][j] + 1) {
      ops.push({ t: 'del', a: a[i - 1], ai: i - 1 });
      i--;
    } else {
      ops.push({ t: 'ins', b: b[j - 1] });
      j--;
    }
  }
  return ops.reverse();
}

const similarity = (a: string, b: string) => {
  const ops = align(a, b);
  const dist = ops.filter((o) => o.t !== 'eq').length;
  return 1 - dist / Math.max(a.length, b.length, 1);
};

/** Tips for typical problems of German speakers, keyed by expected letter → heard letter(s). */
const TIPS: { exp: string; got?: string; tip: string }[] = [
  { exp: 'ы', got: 'и', tip: '**ы** ist kein „i“: Zunge weit nach hinten ziehen, Lippen breit und locker – ein dumpfes „i“.' },
  { exp: 'и', got: 'ы', tip: '**и** klingt hell wie das deutsche „i“ und macht den Konsonanten davor weich.' },
  { exp: 'щ', tip: '**щ** ist ein langes, weiches „sch“ – Zunge nach vorne, Lippen leicht breit: [schsch].' },
  { exp: 'ш', got: 'щ', tip: '**ш** ist ein kurzes, hartes „sch“ – Zunge weiter hinten als im Deutschen.' },
  { exp: 'ж', tip: '**ж** ist stimmhaft wie „J“ in „Journal“ – die Stimmbänder schwingen mit.' },
  { exp: 'з', got: 'с', tip: '**з** ist ein stimmhaftes „s“ wie in „Sonne“, nicht wie in „Haus“.' },
  { exp: 'р', tip: '**р** wird mit der Zungenspitze gerollt (wie im Bayerischen), nicht im Rachen.' },
  { exp: 'х', tip: '**х** ist ein Reibelaut wie „ch“ in „Bach“ – nicht „k“.' },
  { exp: 'ц', tip: '**ц** klingt wie das deutsche „z“ in „Zeit“: [ts].' },
  { exp: 'л', tip: '**л** ist dunkel: Zungenspitze an die oberen Zähne, Zungenrücken tief.' },
  { exp: 'ч', tip: '**ч** ist ein weiches „tsch“ – Lippen leicht breit.' },
  { exp: 'в', got: 'б', tip: '**в** klingt wie deutsches „w“ – die Lippen berühren sich nicht.' },
  { exp: 'я', tip: '**я** = „ja“: Der Konsonant davor wird weich.' },
  { exp: 'ю', tip: '**ю** = „ju“: Der Konsonant davor wird weich.' },
  { exp: 'е', tip: '**е** = „je“: Der Konsonant davor wird weich (нет = [njet]).' },
];

const VOWELS = /[аеёиоуыэюя]/i;

/** Shows the stressed syllable in capitals, e.g. "приве́т" → "при-ВЕТ". */
export function stressHint(word: string): string | null {
  const i = word.indexOf('́');
  if (i < 1) return null;
  const plain = word.replace(/́/g, '');
  const vowelPos = i - 1;
  // split into syllables after each vowel (simple, good enough for display)
  const parts: string[] = [];
  let cur = '';
  let stressedPart = -1;
  for (let k = 0; k < plain.length; k++) {
    cur += plain[k];
    if (k === vowelPos) stressedPart = parts.length;
    if (VOWELS.test(plain[k])) {
      parts.push(cur);
      cur = '';
    }
  }
  if (cur) {
    if (parts.length) parts[parts.length - 1] += cur;
    else parts.push(cur);
  }
  if (parts.length < 2) return null;
  return parts.map((p, k) => (k === stressedPart ? p.toUpperCase() : p)).join('-');
}

/**
 * Evaluates a recognised utterance against the target text.
 * Recognition returns spelling, not sounds – so the score measures how well the
 * recogniser understood you (intelligibility), with tips for likely causes.
 */
export function evaluate(target: string, transcripts: string[]): Evaluation {
  const tNorm = normalize(target);
  const candidates = transcripts.map((t) => normalize(t)).filter(Boolean);
  const heardNorm = candidates.length ? candidates.reduce((best, c) => (similarity(tNorm, c) > similarity(tNorm, best) ? c : best)) : '';
  const heard = transcripts[candidates.indexOf(heardNorm)] ?? '';
  const ops = align(tNorm, heardNorm);
  const status = new Map<number, CharStatus>();
  for (const o of ops) if (o.ai !== undefined) status.set(o.ai, o.t === 'eq' ? 'ok' : o.t === 'sub' ? 'wrong' : 'missing');
  const dist = ops.filter((o) => o.t !== 'eq').length;
  const letters = tNorm.replace(/\s/g, '').length;
  const short = letters <= 3;
  const charSim = Math.max(0, 1 - dist / Math.max(tNorm.length, 1));

  // Map normalised indices back onto the original text (which has stress marks, ё and punctuation).
  const chars: Evaluation['chars'] = [];
  let ni = 0;
  const tLower = target.normalize('NFC');
  for (const ch of tLower) {
    if (ch === '́') {
      if (chars.length) chars[chars.length - 1].ch += ch;
      continue;
    }
    const n = normalize(ch);
    if (!n) {
      // punctuation or space
      if (ch === ' ' && tNorm[ni] === ' ') ni++;
      chars.push({ ch, status: 'none' });
      continue;
    }
    chars.push({ ch, status: status.get(ni) ?? 'none' });
    ni++;
  }

  const heardWords = heardNorm.split(' ');
  const words = target
    .split(/\s+/)
    .map((w) => ({ word: w, n: normalize(w) }))
    .filter((w) => w.n)
    .map(({ word, n }) => ({ word, ok: heardWords.some((h) => h === n || (n.length >= 4 && similarity(n, h) >= 0.75)) }));
  // Half letters, half whole words – a completely wrong word must cost more than its letters.
  const wordRatio = words.length ? words.filter((w) => w.ok).length / words.length : 0;
  let score = heardNorm ? Math.round(100 * (0.5 * charSim + 0.5 * wordRatio)) : 0;
  if (short && score > 0 && score < 100) score = Math.max(score, 50); // be lenient with tiny words

  const tips = new Set<string>();
  for (const o of heardNorm ? ops : []) {
    if (o.t === 'eq' || !o.a) continue;
    for (const t of TIPS) if (t.exp === o.a && (!t.got || t.got === o.b)) tips.add(t.tip);
  }
  if (!heardNorm) tips.add('Ich habe nichts verstanden. Halte das Mikrofon näher und sprich nach dem Signal.');
  else if (score < 60) tips.add('Sprich langsam und deutlich. Hör dir das Vorbild mit 🐢 an und sprich dann Silbe für Silbe nach.');
  const wrongWord = words.find((w) => !w.ok && w.word.includes('́'));
  const hint = heardNorm && wrongWord && stressHint(wrongWord.word.replace(/[.,!?…]/g, ''));
  if (hint) tips.add(`Achte auf die Betonung: **${hint}** – unbetontes **о** klingt wie „a“.`);
  if (short && score < 100) tips.add('Sehr kurze Wörter erkennt die Spracherkennung schlecht. Vergleiche lieber deine Aufnahme mit dem Vorbild oder sprich das Wort in einem Satz.');

  return { score, heard, chars, words, tips: [...tips].slice(0, 3), short };
}
