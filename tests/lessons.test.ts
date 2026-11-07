import { describe, expect, it } from 'vitest';
import manifest from '../src/content/audioManifest.json';
import { collectAudioTexts } from '../src/content/audioTexts';
import { ALL_LESSONS } from '../src/content/lessons';
import { exerciseSolution } from '../src/content/lessons/util';
import { wordByRu } from '../src/content/vocab';
import { audioKey, ttsText } from '../src/core/audioKey';
import { normalize, stripStress } from '../src/core/text';
import { gradeOrder, gradeTyped } from '../src/features/lesson/ExerciseView';
import { lessonSteps } from '../src/features/lesson/LessonPage';

describe('lessons', () => {
  it('have unique ids and a checkpoint per unit', () => {
    expect(new Set(ALL_LESSONS.map((l) => l.id)).size).toBe(ALL_LESSONS.length);
    expect(ALL_LESSONS.filter((l) => l.checkpoint).map((l) => l.id)).toEqual(['1.C', '2.C', '3.C', '4.C', '5.C']);
  });
  it('only reference vocabulary that exists in the word lists', () => {
    for (const l of ALL_LESSONS) for (const ru of l.vocab) expect(wordByRu(ru), `${l.id}: ${ru}`).toBeDefined();
  });
  it('use only known speakers', () => {
    for (const l of ALL_LESSONS) for (const d of l.dialogs) for (const line of d.lines) expect(l.speakers[line.who], `${l.id} ${line.ru}`).toBeDefined();
  });
  it('have solvable exercises', () => {
    for (const l of ALL_LESSONS) {
      for (const ex of l.exercises) {
        const tag = `${l.id}: ${ex.prompt}`;
        if (ex.type === 'choice') expect(ex.options[ex.answer], tag).toBeDefined();
        if (ex.type === 'order') {
          // tokens in the given order must be a permutation of the answer
          expect([...ex.tokens].map(normalize).sort(), tag).toEqual(normalize(ex.answer).split(' ').sort());
          expect(gradeOrder(normalize(ex.answer).split(' '), ex.answer), tag).toBe(true);
        }
        if (ex.type === 'gap' || ex.type === 'translate' || ex.type === 'dictation') {
          expect(gradeTyped(stripStress(ex.answer), ex.answer, 'alternatives' in ex ? ex.alternatives : []), tag).toBe('correct');
        }
        if (ex.type === 'match') expect(new Set(ex.pairs.map((p) => p[1])).size, tag).toBe(ex.pairs.length);
      }
    }
  });
  it('build a step list ending with the summary', () => {
    for (const l of ALL_LESSONS) {
      const steps = lessonSteps(l);
      expect(steps.at(-1)?.kind).toBe('summary');
      if (!l.checkpoint) expect(steps[0].kind).toBe('dialog');
    }
  });
  it('mark stress in all multi-syllable dialog words', () => {
    for (const l of ALL_LESSONS) {
      for (const d of l.dialogs) {
        for (const line of d.lines) {
          for (const token of line.ru.split(/[\s,.!?…—]+/).filter(Boolean)) {
            const syl = (stripStress(token).toLowerCase().match(/[аеёиоуыэюя]/g) ?? []).length;
            const exempt = ['до', 'не', 'по-ру́сски', 'Шмидт', 'Класс'].includes(token);
            if (syl > 1 && !exempt) expect(token.includes('́') || /ё/i.test(token), `${l.id}: ${token}`).toBe(true);
          }
        }
      }
    }
  });
});

describe('audio', () => {
  it('has a recording for every playable text (run tools/tts if this fails)', () => {
    const have = new Set(manifest as string[]);
    const missing = collectAudioTexts().filter((t) => !have.has(t.key));
    expect(missing.map((m) => m.text)).toEqual([]);
  });
  it('produces stable keys and pronunciation fixes', () => {
    expect(audioKey('приве́т')).toBe(audioKey('приве́т'.normalize('NFC')));
    expect(audioKey('приве́т', 'irina')).not.toBe(audioKey('приве́т', 'dmitri'));
    expect(ttsText('Здра́вствуйте!')).toBe('Здра́ствуйте!');
    expect(ttsText('До свида́ния!')).toBe('Досвида́ния!');
    expect(ttsText('Хорошо́. До воскресе́нья!')).toBe('Хорошо́. Довоскресе́нья!');
    expect(ttsText('Пятьдеся́т и шестьдеся́т')).toBe('Пятьдеся́т и шыздися́т');
    expect(ttsText('дом')).toBe('дом');
    expect(ttsText('Чай. Без са́хара.')).toBe('Чай. Безса́хара.');
    expect(ttsText('Да, коне́чно.')).toBe('Да, коне́шно.');
  });
});

describe('exercise grading', () => {
  it('accepts alternatives and tolerates stress/ё', () => {
    expect(gradeTyped('живете', 'живёте')).toBe('correct');
    expect(gradeTyped('Я говорю немного по-русски', 'Я немно́го говорю́ по-ру́сски.', ['Я говорю́ немно́го по-ру́сски.'])).toBe('correct');
    expect(gradeTyped('Я немного говорю по-руски', 'Я немно́го говорю́ по-ру́сски.')).toBe('almost');
  });
});
