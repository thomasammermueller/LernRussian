import { useLiveQuery } from 'dexie-react-hooks';
import { db } from './db';
import type { KeyboardLayout } from './keyboard';

export interface Settings {
  dailyGoalMinutes: number;
  theme: 'system' | 'light' | 'dark';
  keyboard: KeyboardLayout | 'system';
  speechRate: number;
  name: string;
  newPerDay: number;
  listenMode: boolean;
  speechEngine: 'auto' | 'webspeech' | 'whisper';
  goal: 'allgemein' | 'reise' | 'familie' | 'beruf';
  reminderTime: string;
  onboarded: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  dailyGoalMinutes: 15,
  theme: 'system',
  keyboard: 'phonetic',
  speechRate: 0.9,
  name: '',
  newPerDay: 10,
  listenMode: false,
  speechEngine: 'auto',
  goal: 'allgemein',
  reminderTime: '19:30',
  onboarded: false,
};

export function useSettings(): Settings & { loaded: boolean } {
  const rows = useLiveQuery(() => db.settings.toArray(), []);
  const s: Settings & { loaded: boolean } = { ...DEFAULT_SETTINGS, loaded: rows !== undefined };
  for (const r of rows ?? []) {
    if (r.key in s) (s as unknown as Record<string, unknown>)[r.key] = r.value;
  }
  return s;
}

export const setSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => db.settings.put({ key, value, updatedAt: Date.now() });
