import type { Voice } from '../../core/audioKey';

export interface Speaker {
  name: string; // Russian, with stress
  voice: Voice;
  emoji: string;
}

export interface DialogLine {
  who: string; // key in Lesson.speakers
  ru: string;
  translit: string;
  de: string;
  note?: string;
}

export interface Dialog {
  title: string;
  lines: DialogLine[];
}

/** Grammar content as small structured blocks. `**bold**` is supported in text. */
export type GrammarBlock =
  | { h: string }
  | { p: string }
  | { table: { head?: string[]; rows: string[][] } }
  | { tip: string };

export type Exercise =
  | { type: 'choice'; prompt: string; show?: string; audio?: string; options: string[]; answer: number; ruOptions?: boolean; explain?: string }
  | { type: 'match'; prompt: string; pairs: [ru: string, de: string][] }
  | { type: 'gap'; prompt: string; before: string; after: string; answer: string; alternatives?: string[]; hint?: string }
  | { type: 'order'; prompt: string; tokens: string[]; answer: string }
  | { type: 'translate'; prompt: string; de: string; answer: string; alternatives?: string[] }
  | { type: 'dictation'; prompt: string; audio: string; answer: string };

export interface Lesson {
  id: string; // "1.1"
  unit: number;
  title: { ru: string; de: string };
  canDo: string;
  checkpoint?: boolean;
  speakers: Record<string, Speaker>;
  dialogs: Dialog[];
  vocab: string[]; // Russian words (as written in the vocab lists) introduced in this lesson
  grammar: { title: string; blocks: GrammarBlock[] }[];
  exercises: Exercise[];
  speak: string[];
}

export interface Unit {
  n: number;
  title: { ru: string; de: string };
  lessons: Lesson[];
}
