import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { db, exportBackup, importBackup, type Backup } from '../src/core/db';
import { buildReminderIcs } from '../src/core/reminder';
import { newCardRecord } from '../src/core/srs';

// minimal browser globals for the sync module
const mem = new Map<string, string>();
vi.stubGlobal('localStorage', { getItem: (k: string) => mem.get(k) ?? null, setItem: (k: string, v: string) => mem.set(k, v), removeItem: (k: string) => mem.delete(k) });
vi.stubGlobal('navigator', { onLine: true });

const reset = async () => {
  await Promise.all(db.tables.map((t) => t.clear()));
  mem.clear();
};

describe('reminder', () => {
  it('builds a daily iCalendar event with alarm at the next occurrence', () => {
    const ics = buildReminderIcs({ time: '19:30', minutes: 15, url: 'https://example.org/app/', now: new Date(2026, 10, 7, 20, 0) });
    expect(ics).toContain('RRULE:FREQ=DAILY');
    expect(ics).toContain('DTSTART:20261108T193000'); // 19:30 already passed today → tomorrow
    expect(ics).toContain('DURATION:PT15M');
    expect(ics).toContain('BEGIN:VALARM');
    expect(ics).toContain('SUMMARY:Russisch lernen (15 Min.)');
    expect(ics.split('\r\n').length).toBeGreaterThan(15);
  });
});

describe('backup merge', () => {
  beforeEach(reset);
  it('keeps the newer record, unites reviews, takes max learning time and newer settings', async () => {
    const old = { ...newCardRecord('w:a', 'ru-de', 1000), updatedAt: 1000, reps: 1 };
    const newer = { ...old, updatedAt: 5000, reps: 7 };
    await db.cards.put(newer);
    await db.activity.put({ date: '2026-11-07', seconds: 600, updatedAt: 10 });
    await db.settings.put({ key: 'dailyGoalMinutes', value: 20, updatedAt: 200 });
    await db.reviews.put({ id: 'r1', cardId: old.id, rating: 3, stateBefore: 0, at: 1, ms: 1 });

    const remote: Backup = {
      app: 'lernrussian', version: 2, exportedAt: '', letters: [], lessons: [{ id: '1.1', done: true, bestScore: 90, updatedAt: 3 }],
      activity: [{ date: '2026-11-07', seconds: 300, updatedAt: 99 }, { date: '2026-11-06', seconds: 900, updatedAt: 1 }],
      settings: [{ key: 'dailyGoalMinutes', value: 10, updatedAt: 100 }, { key: 'name', value: 'Thomas', updatedAt: 50 }],
      cards: [old], reviews: [{ id: 'r2', cardId: old.id, rating: 1, stateBefore: 2, at: 2, ms: 1 }],
    };
    await importBackup(remote);
    expect((await db.cards.get(old.id))?.reps).toBe(7); // local is newer
    expect(await db.reviews.count()).toBe(2);
    expect((await db.activity.get('2026-11-07'))?.seconds).toBe(600); // max
    expect((await db.activity.get('2026-11-06'))?.seconds).toBe(900);
    expect((await db.settings.get('dailyGoalMinutes'))?.value).toBe(20); // local setting newer
    expect((await db.settings.get('name'))?.value).toBe('Thomas');
    expect((await db.lessons.get('1.1'))?.done).toBe(true);
  });
});

describe('gist sync', () => {
  beforeEach(reset);
  it('creates a private gist, merges remote data and pushes the result', async () => {
    const { connectSync } = await import('../src/core/sync');
    let gistContent = '';
    const calls: string[] = [];
    vi.stubGlobal('fetch', async (url: string, init: RequestInit = {}) => {
      const method = init.method ?? 'GET';
      calls.push(`${method} ${url.replace('https://api.github.com', '')}`);
      expect((init.headers as Record<string, string>).Authorization).toBe('Bearer ghp_test');
      const json = (b: unknown) => ({ ok: true, status: 200, json: async () => b }) as Response;
      if (url.endsWith('/gists?per_page=100')) return json([]);
      if (method === 'POST') {
        const body = JSON.parse(init.body as string);
        expect(body.public).toBe(false);
        // pretend another device already has data in the gist
        const other = await exportBackup();
        other.lessons = [{ id: '2.1', done: true, bestScore: 100, updatedAt: 1 }];
        gistContent = JSON.stringify(other);
        return json({ id: 'g1', description: body.description, files: {} });
      }
      if (method === 'GET' && url.endsWith('/gists/g1')) return json({ id: 'g1', files: { 'lernrussian-sync.json': { content: gistContent, raw_url: '' } } });
      if (method === 'PATCH') {
        gistContent = JSON.parse(init.body as string).files['lernrussian-sync.json'].content;
        return json({ id: 'g1' });
      }
      throw new Error(`unexpected ${method} ${url}`);
    });
    await db.lessons.put({ id: '1.1', done: true, bestScore: 80, updatedAt: 2 });
    await connectSync(' ghp_test ');
    expect(calls).toEqual(['GET /gists?per_page=100', 'POST /gists', 'GET /gists/g1', 'PATCH /gists/g1']);
    expect((await db.lessons.get('2.1'))?.done).toBe(true); // pulled from "other device"
    const pushed = JSON.parse(gistContent) as Backup;
    expect(pushed.lessons.map((l) => l.id).sort()).toEqual(['1.1', '2.1']); // pushed merged state
    expect(JSON.stringify(pushed)).not.toContain('ghp_test'); // token never synced
  });
});
