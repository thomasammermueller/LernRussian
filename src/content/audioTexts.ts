import { ALPHABET, READING_WORDS } from './alphabet';
import { ALL_LESSONS } from './lessons';
import { exerciseSolution } from './lessons/util';
import { BUILTIN_WORDS } from './vocab';
import { audioKey, ttsText, type Voice } from '../core/audioKey';

export interface AudioText {
  key: string;
  voice: Voice;
  text: string;
  tts: string;
}

/** Every Russian text the app can play with a pre-generated recording. */
export function collectAudioTexts(): AudioText[] {
  const out = new Map<string, AudioText>();
  const add = (text: string | undefined | null, voice: Voice = 'irina') => {
    if (!text?.trim()) return;
    const key = audioKey(text, voice);
    out.set(key, { key, voice, text: text.normalize('NFC').trim(), tts: ttsText(text).trim() });
  };

  for (const l of ALPHABET) {
    add(l.name);
    l.examples.forEach((e) => add(e.ru));
  }
  READING_WORDS.forEach((w) => add(w.ru));
  for (const w of BUILTIN_WORDS) {
    add(w.ru);
    add(w.exRu);
  }
  for (const l of ALL_LESSONS) {
    for (const d of l.dialogs) for (const line of d.lines) add(line.ru, l.speakers[line.who]?.voice ?? 'irina');
    l.vocab.forEach((v) => add(v));
    l.speak.forEach((s) => add(s));
    for (const ex of l.exercises) {
      if ('audio' in ex) add(ex.audio);
      add(exerciseSolution(ex));
      if (ex.type === 'match') ex.pairs.forEach(([ru]) => add(ru));
    }
  }
  add('Приве́т! Как дела́?'); // speech-rate preview in settings
  return [...out.values()].sort((a, b) => a.key.localeCompare(b.key));
}
