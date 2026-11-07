/**
 * Automatic sync between devices via a private GitHub Gist.
 * - The token (scope "gist" only) stays in this device's localStorage – it is never part of the synced data.
 * - Merge: newest record wins (cards, lessons, settings …), reviews are united, learning time per day takes the maximum.
 */
import { useSyncExternalStore } from 'react';
import { exportBackup, importBackup, type Backup } from './db';

const LS = { token: 'lr.sync.token', gist: 'lr.sync.gistId', last: 'lr.sync.last' };
const FILE = 'lernrussian-sync.json';
const DESCRIPTION = 'LernRussian Sync (privat)';
const API = 'https://api.github.com';

const store = {
  get: (k: string) => {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  },
  set: (k: string, v: string | null) => {
    try {
      if (v === null) localStorage.removeItem(k);
      else localStorage.setItem(k, v);
    } catch {
      /* private mode */
    }
  },
};

export type SyncState = { status: 'off' | 'idle' | 'syncing' | 'error'; last: number | null; error?: string };
let state: SyncState = { status: store.get(LS.token) ? 'idle' : 'off', last: Number(store.get(LS.last)) || null };
const listeners = new Set<() => void>();
const setState = (s: Partial<SyncState>) => {
  state = { ...state, ...s };
  listeners.forEach((l) => l());
};
export const useSyncState = () =>
  useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
  );

export const syncEnabled = () => !!store.get(LS.token);

async function gh<T>(token: string, path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { Accept: 'application/vnd.github+json', Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...init.headers },
  });
  if (res.status === 401) throw new Error('Token ungültig oder abgelaufen.');
  if (res.status === 403 || res.status === 404) throw new Error('Kein Zugriff – braucht der Token das Recht „gist“?');
  if (!res.ok) throw new Error(`GitHub antwortet mit ${res.status}.`);
  return res.json() as Promise<T>;
}

type Gist = { id: string; description: string | null; files: Record<string, { content?: string; truncated?: boolean; raw_url: string }> };

async function findOrCreateGist(token: string): Promise<string> {
  const list = await gh<Gist[]>(token, '/gists?per_page=100');
  const found = list.find((g) => g.description === DESCRIPTION && g.files[FILE]);
  if (found) return found.id;
  const created = await gh<Gist>(token, '/gists', {
    method: 'POST',
    body: JSON.stringify({ description: DESCRIPTION, public: false, files: { [FILE]: { content: JSON.stringify(await exportBackup()) } } }),
  });
  return created.id;
}

/** Connects this device: validates the token and finds (or creates) the sync gist. */
export async function connectSync(token: string) {
  token = token.trim();
  const gistId = await findOrCreateGist(token);
  store.set(LS.token, token);
  store.set(LS.gist, gistId);
  setState({ status: 'idle', error: undefined });
  await syncNow();
}

export function disconnectSync() {
  store.set(LS.token, null);
  store.set(LS.gist, null);
  store.set(LS.last, null);
  setState({ status: 'off', last: null, error: undefined });
}

let running: Promise<void> | null = null;

/** Pull → merge → push. Safe to call often; concurrent calls share one run. */
export function syncNow(): Promise<void> {
  const token = store.get(LS.token);
  if (!token) return Promise.resolve();
  if (!navigator.onLine) return Promise.resolve();
  if (running) return running;
  running = (async () => {
    setState({ status: 'syncing' });
    try {
      let gistId = store.get(LS.gist);
      if (!gistId) {
        gistId = await findOrCreateGist(token);
        store.set(LS.gist, gistId);
      }
      const gist = await gh<Gist>(token, `/gists/${gistId}`);
      const file = gist.files[FILE];
      if (file) {
        const text = file.truncated ? await (await fetch(file.raw_url)).text() : (file.content ?? '');
        if (text.trim()) await importBackup(JSON.parse(text) as Backup);
      }
      const merged = await exportBackup();
      await gh(token, `/gists/${gistId}`, { method: 'PATCH', body: JSON.stringify({ files: { [FILE]: { content: JSON.stringify(merged) } } }) });
      const now = Date.now();
      store.set(LS.last, String(now));
      setState({ status: 'idle', last: now, error: undefined });
    } catch (e) {
      setState({ status: 'error', error: (e as Error).message });
    } finally {
      running = null;
    }
  })();
  return running;
}

/** Starts automatic syncing: at start, when coming back online, when the app goes to the background and every 5 minutes. */
export function startAutoSync(): () => void {
  const run = () => void syncNow();
  const onVisibility = () => document.visibilityState === 'hidden' && run();
  run();
  window.addEventListener('online', run);
  document.addEventListener('visibilitychange', onVisibility);
  const id = window.setInterval(() => document.visibilityState === 'visible' && run(), 5 * 60_000);
  return () => {
    window.removeEventListener('online', run);
    document.removeEventListener('visibilitychange', onVisibility);
    window.clearInterval(id);
  };
}
