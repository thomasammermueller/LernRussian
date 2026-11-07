import type { Exercise } from './types';

/** The full Russian solution sentence of an exercise (spoken and shown after answering). */
export function exerciseSolution(ex: Exercise): string | null {
  if (ex.type === 'gap') return `${ex.before} ${ex.answer} ${ex.after}`.replace(/\s+([?.!,])/g, '$1').trim();
  if (ex.type === 'translate' || ex.type === 'dictation' || ex.type === 'order') return ex.answer;
  return null;
}
