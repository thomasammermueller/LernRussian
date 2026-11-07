import { UNIT1 } from './unit1';
import { UNIT2 } from './unit2';
import { UNIT3 } from './unit3';
import { UNIT4 } from './unit4';
import { UNIT5 } from './unit5';
import { UNIT6 } from './unit6';
import type { Lesson, Unit } from './types';

export const UNITS_CONTENT: Unit[] = [UNIT1, UNIT2, UNIT3, UNIT4, UNIT5, UNIT6];
export const ALL_LESSONS: Lesson[] = UNITS_CONTENT.flatMap((u) => u.lessons);
export const lessonById = (id: string) => ALL_LESSONS.find((l) => l.id === id);
export type { Lesson, Unit } from './types';
