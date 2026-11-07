import { Rating, State, createEmptyCard, fsrs, type Card, type Grade } from 'ts-fsrs';
import { db, type CardRecord, type Direction } from './db';

export { Rating, State };
export type { Grade };

const scheduler = fsrs({ request_retention: 0.9, maximum_interval: 3650, enable_fuzz: true });

/** A word is "sicher" (secure) once its recognition card is stable for ≥ 21 days. */
export const SECURE_STABILITY = 21;

export const cardId = (wordId: string, dir: Direction) => `${wordId}|${dir}`;

const toFsrs = (r: CardRecord): Card => ({
  due: new Date(r.due),
  stability: r.stability,
  difficulty: r.difficulty,
  elapsed_days: r.elapsed_days,
  scheduled_days: r.scheduled_days,
  learning_steps: r.learning_steps,
  reps: r.reps,
  lapses: r.lapses,
  state: r.state,
  last_review: r.last_review ? new Date(r.last_review) : undefined,
});

const fromFsrs = (c: Card, base: Pick<CardRecord, 'id' | 'wordId' | 'dir' | 'introducedAt'>, now: number): CardRecord => ({
  ...base,
  due: c.due.getTime(),
  stability: c.stability,
  difficulty: c.difficulty,
  elapsed_days: c.elapsed_days,
  scheduled_days: c.scheduled_days,
  learning_steps: c.learning_steps,
  reps: c.reps,
  lapses: c.lapses,
  state: c.state,
  last_review: c.last_review?.getTime(),
  updatedAt: now,
});

export function newCardRecord(wordId: string, dir: Direction, now = Date.now(), dueAt = now): CardRecord {
  const c = createEmptyCard(new Date(dueAt));
  return fromFsrs(c, { id: cardId(wordId, dir), wordId, dir, introducedAt: now }, now);
}

/** Computes the next state without saving it. */
export function schedule(rec: CardRecord, rating: Grade, now = Date.now()): CardRecord {
  const { card } = scheduler.next(toFsrs(rec), new Date(now), rating);
  return fromFsrs(card, rec, now);
}

/** Interval preview per rating, e.g. { 1: '1 Min.', 3: '1 Tag' }. */
export function previewIntervals(rec: CardRecord, now = Date.now()): Record<Grade, string> {
  const out = {} as Record<Grade, string>;
  for (const g of [Rating.Again, Rating.Hard, Rating.Good, Rating.Easy] as Grade[]) {
    out[g] = formatInterval(schedule(rec, g, now).due - now);
  }
  return out;
}

export function formatInterval(ms: number): string {
  const min = ms / 60_000;
  if (min < 1) return '< 1 Min.';
  if (min < 60) return `${Math.round(min)} Min.`;
  const h = min / 60;
  if (h < 24) return `${Math.round(h)} Std.`;
  const d = h / 24;
  if (d < 30) return `${Math.round(d)} ${Math.round(d) === 1 ? 'Tag' : 'Tage'}`;
  if (d < 365) return `${Math.round(d / 30)} Mon.`;
  return `${(d / 365).toFixed(1)} J.`;
}

/**
 * Rates a card and persists the result. When a recognition card (ru→de) first reaches
 * the review state, the production card (de→ru) is created and due the next day.
 */
export async function rateCard(rec: CardRecord, rating: Grade, ms: number, now = Date.now()): Promise<CardRecord> {
  const next = schedule(rec, rating, now);
  await db.transaction('rw', db.cards, db.reviews, async () => {
    await db.cards.put(next);
    await db.reviews.put({ id: `${rec.id}@${now}`, cardId: rec.id, rating, stateBefore: rec.state, at: now, ms });
    if (rec.dir === 'ru-de' && next.state === State.Review) {
      const reverseId = cardId(rec.wordId, 'de-ru');
      if (!(await db.cards.get(reverseId))) {
        await db.cards.put(newCardRecord(rec.wordId, 'de-ru', now, now + 20 * 3600_000));
      }
    }
  });
  return next;
}

/** Introduces a new word: creates its recognition card and rates the first exposure. */
export async function introduceWord(wordId: string, rating: Grade, ms: number, now = Date.now()) {
  const rec = newCardRecord(wordId, 'ru-de', now);
  return rateCard(rec, rating, ms, now);
}

export type WordStatus = 'neu' | 'lernend' | 'sicher';
export const wordStatus = (recognition?: CardRecord): WordStatus =>
  !recognition ? 'neu' : recognition.stability >= SECURE_STABILITY && recognition.state === State.Review ? 'sicher' : 'lernend';

export const startOfDay = (now = new Date()) => new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

/** Answer check result → suggested rating for typed answers. */
export const suggestRating = (r: 'correct' | 'almost' | 'wrong'): Grade =>
  r === 'correct' ? Rating.Good : r === 'almost' ? Rating.Hard : Rating.Again;
