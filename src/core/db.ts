import Dexie, { type EntityTable } from 'dexie';

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

export interface Setting {
  key: string;
  value: unknown;
}

export class LernDB extends Dexie {
  letters!: EntityTable<LetterProgress, 'id'>;
  lessons!: EntityTable<LessonProgress, 'id'>;
  activity!: EntityTable<DayActivity, 'date'>;
  settings!: EntityTable<Setting, 'key'>;

  constructor() {
    super('lernrussian');
    this.version(1).stores({
      letters: 'id, updatedAt',
      lessons: 'id, updatedAt',
      activity: 'date',
      settings: 'key',
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
  version: 1;
  exportedAt: string;
  letters: LetterProgress[];
  lessons: LessonProgress[];
  activity: DayActivity[];
  settings: Setting[];
}

export async function exportBackup(): Promise<Backup> {
  return {
    app: 'lernrussian',
    version: 1,
    exportedAt: new Date().toISOString(),
    letters: await db.letters.toArray(),
    lessons: await db.lessons.toArray(),
    activity: await db.activity.toArray(),
    settings: await db.settings.toArray(),
  };
}

/** Merges a backup into the local database: the newer record wins. */
export async function importBackup(data: Backup) {
  if (data?.app !== 'lernrussian') throw new Error('Das ist keine LernRussian-Sicherung.');
  await db.transaction('rw', [db.letters, db.lessons, db.activity, db.settings], async () => {
    for (const [table, rows] of [
      [db.letters, data.letters],
      [db.lessons, data.lessons],
      [db.activity, data.activity],
    ] as const) {
      for (const row of rows ?? []) {
        const key = 'id' in row ? row.id : (row as DayActivity).date;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const cur = await (table as any).get(key);
        if (!cur || cur.updatedAt < row.updatedAt) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (table as any).put(row);
        }
      }
    }
    for (const s of data.settings ?? []) await db.settings.put(s);
  });
}
