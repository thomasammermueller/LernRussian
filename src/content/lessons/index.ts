import { UNIT1 } from './unit1';
import type { Lesson, Unit } from './types';

export const UNITS_CONTENT: Unit[] = [UNIT1];
export const ALL_LESSONS: Lesson[] = UNITS_CONTENT.flatMap((u) => u.lessons);
export const lessonById = (id: string) => ALL_LESSONS.find((l) => l.id === id);
export type { Lesson, Unit } from './types';
