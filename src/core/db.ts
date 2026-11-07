import Dexie, { type EntityTable } from 'dexie';
import type { Word } from '../content/vocab';

export interface LetterProgress {
  id: string; // lowercase letter
  seen: boolean;
  correct: number;
  wrong: number;
  bestTrace: number; // 0–100
  updatedAt: number;
}

export interface LessonProgress {
  id: string; // e.g. "0.1"
  done: boolean;
  bestScore: number; // 0–100
  updatedAt: number;
}

export interface DayActivity {
  date: string; // YYYY-MM-DD (local)
  seconds: number;
  updatedAt: number;
}

export type Direction = 'ru-de' | 'de-ru';

/** FSRS card state, flattened for IndexedDB (dates as epoch ms). */
export interface CardRecord {
  id: string; // `${wordId}|${dir}`
  wordId: string;
  dir: Direction;
  due: number;
  stability: number;
  difficulty: number;
  elapsed_days: number;
  scheduled_days: number;
  learning_steps: number;
  reps: number;
  lapses: number;
  state: number; // ts-fsrs State
  last_review?: number;
  introducedAt: number;
  updatedAt: number;
}

export interface ReviewRecord {
  id: string; // `${cardId}@${at}`
  cardId: string;
  rating: number;
  stateBefore: number;
  at: number;
  ms: number;
}

export interface UserSet {
  id: string;
  name: string;
  emoji: string;
  updatedAt: number;
  deleted?: boolean;
}

export interface UserWord extends Word {
  updatedAt: number;
  deleted?: boolean;
}

export interface Setting {
  key: string;
  value: unknown;
}

export class LernDB extends Dexie {
  letters!: EntityTable<LetterProgress, 'id'>;
  lessons!: EntityTable<LessonProgress, 'id'>;
  activity!: EntityTable<DayActivity, 'date'>;
  settings!: EntityTable<Setting, 'key'>;
  cards!: EntityTable<CardRecord, 'id'>;
  reviews!: EntityTable<ReviewRecord, 'id'>;
  userSets!: EntityTable<UserSet, 'id'>;
  userWords!: EntityTable<UserWord, 'id'>;

  constructor() {
    super('lernrussian');
    this.version(1).stores({
      letters: 'id, updatedAt',
      lessons: 'id, updatedAt',
      activity: 'date',
      settings: 'key',
    });
    this.version(2).stores({
      cards: 'id, wordId, due, updatedAt',
      reviews: 'id, cardId, at',
      userSets: 'id, updatedAt',
      userWords: 'id, topic, updatedAt',
    });
  }
}

export const db = new LernDB();

export const today = (d = new Date()) => {
  const z = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`;
};

export async function recordLetterAnswer(id: string, ok: boolean) {
  await db.transaction('rw', db.letters, async () => {
    const cur = await db.letters.get(id);
    await db.letters.put({
      id,
      seen: true,
      correct: (cur?.correct ?? 0) + (ok ? 1 : 0),
      wrong: (cur?.wrong ?? 0) + (ok ? 0 : 1),
      bestTrace: cur?.bestTrace ?? 0,
      updatedAt: Date.now(),
    });
  });
}

export async function markLetterSeen(id: string) {
  const cur = await db.letters.get(id);
  if (cur?.seen) return;
  await db.letters.put({ id, seen: true, correct: 0, wrong: 0, bestTrace: 0, ...cur, updatedAt: Date.now() });
}

export async function recordTrace(id: string, score: number) {
  const cur = await db.letters.get(id);
  if (cur && cur.bestTrace >= score) return;
  await db.letters.put({ id, seen: true, correct: 0, wrong: 0, ...cur, bestTrace: score, updatedAt: Date.now() });
}

export async function completeLesson(id: string, score: number) {
  const cur = await db.lessons.get(id);
  await db.lessons.put({
    id,
    done: (cur?.done ?? false) || score >= 80,
    bestScore: Math.max(cur?.bestScore ?? 0, score),
    updatedAt: Date.now(),
  });
}

export async function addActivity(seconds: number) {
  const date = today();
  await db.transaction('rw', db.activity, async () => {
    const cur = await db.activity.get(date);
    await db.activity.put({ date, seconds: (cur?.seconds ?? 0) + seconds, updatedAt: Date.now() });
  });
}

/** A letter counts as learned after 2 correct answers or a good tracing result. */
export const isLetterLearned = (p?: LetterProgress) => !!p && (p.correct >= 2 || p.bestTrace >= 80);

/** Consecutive days (ending today or yesterday) with at least one minute of learning. */
export function computeStreak(days: DayActivity[], now = new Date()): number {
  const active = new Set(days.filter((d) => d.seconds >= 60).map((d) => d.date));
  const cursor = new Date(now);
  if (!active.has(today(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (active.has(today(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

// ---------- Backup ----------
export interface Backup {
  app: 'lernrussian';
  version: 1 | 2;
  exportedAt: string;
  letters: LetterProgress[];
  lessons: LessonProgress[];
  activity: DayActivity[];
  settings: Setting[];
  cards?: CardRecord[];
  reviews?: ReviewRecord[];
  userSets?: UserSet[];
  userWords?: UserWord[];
}

export async function exportBackup(): Promise<Backup> {
  return {
    app: 'lernrussian',
    version: 2,
    exportedAt: new Date().toISOString(),
    letters: await db.letters.toArray(),
    lessons: await db.lessons.toArray(),
    activity: await db.activity.toArray(),
    settings: await db.settings.toArray(),
    cards: await db.cards.toArray(),
    reviews: await db.reviews.toArray(),
    userSets: await db.userSets.toArray(),
    userWords: await db.userWords.toArray(),
  };
}

/** Merges a backup into the local database: the newer record wins. */
export async function importBackup(data: Backup) {
  if (data?.app !== 'lernrussian') throw new Error('Das ist keine LernRussian-Sicherung.');
  const tables = [db.letters, db.lessons, db.activity, db.settings, db.cards, db.reviews, db.userSets, db.userWords];
  await db.transaction('rw', tables, async () => {
    const merge = async <T extends { updatedAt: number }>(table: { get(k: string): Promise<T | undefined>; put(r: T): Promise<unknown> }, rows: T[] | undefined, key: (r: T) => string) => {
      for (const row of rows ?? []) {
        const cur = await table.get(key(row));
        if (!cur || cur.updatedAt < row.updatedAt) await table.put(row);
      }
    };
    await merge<LetterProgress>(db.letters, data.letters, (r) => r.id);
    await merge<LessonProgress>(db.lessons, data.lessons, (r) => r.id);
    await merge<DayActivity>(db.activity, data.activity, (r) => r.date);
    await merge<CardRecord>(db.cards, data.cards, (r) => r.id);
    await merge<UserSet>(db.userSets, data.userSets, (r) => r.id);
    await merge<UserWord>(db.userWords, data.userWords, (r) => r.id);
    if (data.reviews?.length) await db.reviews.bulkPut(data.reviews);
    for (const s of data.settings ?? []) await db.settings.put(s);
  });
}
