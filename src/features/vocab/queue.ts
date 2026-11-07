import type { Word } from '../../content/vocab';
import type { CardRecord } from '../../core/db';
import { cardId, startOfDay } from '../../core/srs';

export type QueueItem = { kind: 'review'; card: CardRecord; word: Word } | { kind: 'new'; word: Word };

/** Number of new words introduced today (recognition cards created since midnight). */
export const introducedToday = (cards: CardRecord[], now = Date.now()) =>
  cards.filter((c) => c.dir === 'ru-de' && c.introducedAt >= startOfDay(new Date(now))).length;

export const dueCards = (cards: CardRecord[], wordsById: Map<string, Word>, now = Date.now(), topic?: string) =>
  cards
    .filter((c) => c.due <= now)
    .filter((c) => {
      const w = wordsById.get(c.wordId);
      return !!w && (!topic || w.topic === topic);
    })
    .sort((a, b) => a.due - b.due);

/**
 * Builds a study queue: due reviews (oldest first), interleaved with new words of the
 * chosen topic (one new word after every 3 reviews), respecting the daily new-word limit.
 */
export function buildQueue(words: Word[], cards: CardRecord[], opts: { topic?: string; newLimit: number; now?: number }): QueueItem[] {
  const now = opts.now ?? Date.now();
  const wordsById = new Map(words.map((w) => [w.id, w]));
  const reviews: QueueItem[] = dueCards(cards, wordsById, now, opts.topic).map((card) => ({ kind: 'review', card, word: wordsById.get(card.wordId)! }));
  const known = new Set(cards.map((c) => c.id));
  const remaining = Math.max(0, opts.newLimit - introducedToday(cards, now));
  const fresh: QueueItem[] = opts.topic
    ? words
        .filter((w) => w.topic === opts.topic && !known.has(cardId(w.id, 'ru-de')))
        .slice(0, remaining)
        .map((word) => ({ kind: 'new', word }))
    : [];
  const out: QueueItem[] = [];
  let r = 0;
  let n = 0;
  while (r < reviews.length || n < fresh.length) {
    for (let k = 0; k < 3 && r < reviews.length; k++) out.push(reviews[r++]);
    if (n < fresh.length) out.push(fresh[n++]);
  }
  return out;
}
