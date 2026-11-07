export type Point = { x: number; y: number };

export interface TraceResult {
  score: number; // 0–100
  coverage: number; // share of template covered by the user's strokes
  precision: number; // share of user's ink that lies on the template
  strokeDiff: number; // user strokes − template strokes
  feedback: string;
}

const dist = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

const nearest = (p: Point, pts: Point[]) => {
  let best = Infinity;
  for (const q of pts) {
    const d = dist(p, q);
    if (d < best) best = d;
  }
  return best;
};

/** Resamples a polyline so that points are at most `step` apart. */
export function densify(stroke: Point[], step = 2): Point[] {
  if (stroke.length < 2) return stroke.slice();
  const out: Point[] = [stroke[0]];
  for (let i = 1; i < stroke.length; i++) {
    const a = stroke[i - 1];
    const b = stroke[i];
    const n = Math.max(1, Math.ceil(dist(a, b) / step));
    for (let k = 1; k <= n; k++) out.push({ x: a.x + ((b.x - a.x) * k) / n, y: a.y + ((b.y - a.y) * k) / n });
  }
  return out;
}

/**
 * Compares the user's strokes with the template strokes (both in template coordinates).
 * `tolerance` is the distance (in viewBox units) that still counts as "on the line".
 */
export function scoreTrace(template: Point[][], user: Point[][], tolerance = 9): TraceResult {
  const userPts = user.flatMap((s) => densify(s));
  const tplPts = template.flatMap((s) => densify(s));
  if (userPts.length < 3) {
    return { score: 0, coverage: 0, precision: 0, strokeDiff: -template.length, feedback: 'Zeichne den Buchstaben nach.' };
  }
  const coverage = tplPts.filter((p) => nearest(p, userPts) <= tolerance).length / tplPts.length;
  const precision = userPts.filter((p) => nearest(p, tplPts) <= tolerance).length / userPts.length;
  const strokeDiff = user.length - template.length;
  let score = 100 * (0.6 * coverage + 0.4 * precision);
  if (Math.abs(strokeDiff) > 1) score -= 10;
  score = Math.max(0, Math.min(100, Math.round(score)));

  let feedback: string;
  if (score >= 85) feedback = 'Sehr gut! 🎉';
  else if (coverage < 0.7) feedback = 'Es fehlen noch Teile des Buchstabens.';
  else if (precision < 0.7) feedback = 'Bleib näher an der Vorlage.';
  else if (strokeDiff > 1) feedback = `Versuch es mit ${template.length} Strichen.`;
  else feedback = 'Gut – noch etwas genauer!';
  return { score, coverage, precision, strokeDiff, feedback };
}
