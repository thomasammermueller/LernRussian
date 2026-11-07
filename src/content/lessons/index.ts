import { UNIT1 } from './unit1';
import { UNIT2 } from './unit2';
import { UNIT3 } from './unit3';
import { UNIT4 } from './unit4';
import { UNIT5 } from './unit5';
import { UNIT6 } from './unit6';
import { UNIT7 } from './unit7';
import { UNIT8 } from './unit8';
import { UNIT9 } from './unit9';
import { UNIT10 } from './unit10';
import type { Lesson, Unit } from './types';

export const UNITS_CONTENT: Unit[] = [UNIT1, UNIT2, UNIT3, UNIT4, UNIT5, UNIT6, UNIT7, UNIT8, UNIT9, UNIT10];
export const ALL_LESSONS: Lesson[] = UNITS_CONTENT.flatMap((u) => u.lessons);
export const lessonById = (id: string) => ALL_LESSONS.find((l) => l.id === id);
export type { Lesson, Unit } from './types';
