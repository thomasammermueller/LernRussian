import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { BUILTIN_WORDS, TOPICS, wordId, type Word } from '../../content/vocab';
import { db, type CardRecord, type UserSet } from '../../core/db';
import { wordStatus, type WordStatus } from '../../core/srs';
import { stripStress } from '../../core/text';

export function useUserSets(): UserSet[] {
  return useLiveQuery(() => db.userSets.toArray(), [])?.filter((s) => !s.deleted) ?? [];
}

export function useAllWords(): Word[] {
  const user = useLiveQuery(() => db.userWords.toArray(), []);
  return useMemo(() => [...BUILTIN_WORDS, ...(user ?? []).filter((w) => !w.deleted)], [user]);
}

export function useCards(): CardRecord[] | undefined {
  return useLiveQuery(() => db.cards.toArray(), []);
}

export async function loadAllWords(): Promise<Word[]> {
  const user = await db.userWords.toArray();
  return [...BUILTIN_WORDS, ...user.filter((w) => !w.deleted)];
}

export function statusMap(cards: CardRecord[]): Map<string, WordStatus> {
  const m = new Map<string, WordStatus>();
  for (const c of cards) if (c.dir === 'ru-de') m.set(c.wordId, wordStatus(c));
  return m;
}

export function countStatus(words: Word[], status: Map<string, WordStatus>) {
  const out = { neu: 0, lernend: 0, sicher: 0 };
  for (const w of words) out[status.get(w.id) ?? 'neu']++;
  return out;
}

export const topicTitle = (id: string, sets: UserSet[]) =>
  TOPICS.find((t) => t.id === id)?.title ?? sets.find((s) => s.id === id)?.name ?? id;

export const newSetId = () => `u-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

export async function createSet(name: string, emoji = '📝') {
  const id = newSetId();
  await db.userSets.put({ id, name, emoji, updatedAt: Date.now() });
  return id;
}

export async function addUserWord(setId: string, w: { ru: string; de: string; translit?: string; exRu?: string; exDe?: string }) {
  const id = wordId(setId, w.ru);
  await db.userWords.put({
    id,
    topic: setId,
    ru: w.ru.trim(),
    de: w.de.trim(),
    translit: w.translit?.trim() ?? '',
    exRu: w.exRu?.trim() || undefined,
    exDe: w.exDe?.trim() || undefined,
    updatedAt: Date.now(),
  });
  return id;
}

export const sameWord = (a: string, b: string) => stripStress(a).toLowerCase() === stripStress(b).toLowerCase();
