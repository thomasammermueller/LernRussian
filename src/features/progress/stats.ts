import type { CardRecord, DayActivity } from '../../core/db';
import { today } from '../../core/db';

const DAY = 86400_000;
const startOf = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

/** Minutes per day for the last `n` days (oldest first). */
export function dailyMinutes(activity: DayActivity[], n: number, now = new Date()) {
  const by = new Map(activity.map((a) => [a.date, a.seconds]));
  return Array.from({ length: n }, (_, i) => {
    const date = addDays(startOf(now), i - n + 1);
    return { date, minutes: Math.round((by.get(today(date)) ?? 0) / 60) };
  });
}

/** Cumulative number of words in training (recognition cards) at the end of each of the last `n` days. */
export function vocabGrowth(cards: CardRecord[], n: number, now = new Date()) {
  const times = cards.filter((c) => c.dir === 'ru-de').map((c) => c.introducedAt).sort((a, b) => a - b);
  return Array.from({ length: n }, (_, i) => {
    const date = addDays(startOf(now), i - n + 1);
    const end = date.getTime() + DAY;
    let count = 0;
    while (count < times.length && times[count] < end) count++;
    return { date, value: count };
  });
}

/** Number of cards due on each of the next `n` days (today includes overdue cards). */
export function dueForecast(cards: CardRecord[], n: number, now = new Date()) {
  const start = startOf(now).getTime();
  const out = Array.from({ length: n }, (_, i) => ({ date: addDays(startOf(now), i), value: 0 }));
  for (const c of cards) {
    const idx = Math.max(0, Math.floor((c.due - start) / DAY));
    if (idx < n) out[idx].value++;
  }
  return out;
}

/** Words you forget most often (by lapses, then difficulty). */
export function hardestCards(cards: CardRecord[], limit = 5) {
  return cards
    .filter((c) => c.reps > 0 && (c.lapses > 0 || c.difficulty > 7))
    .sort((a, b) => b.lapses - a.lapses || b.difficulty - a.difficulty)
    .slice(0, limit);
}

export const fmtDay = (d: Date) => d.toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric', month: 'numeric' });
export const WEEKDAY = (d: Date) => ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'][d.getDay()];
