import manifest from '../content/audioManifest.json';
import { audioKey, type Voice } from './audioKey';
import { stripStress } from './text';

/**
 * Audio output.
 * 1. Pre-generated recordings (Piper TTS, see tools/tts) – work offline.
 * 2. Fallback: browser speech synthesis (on iOS the on-device voice "Milena").
 */
const available = new Set<string>(manifest as string[]);
const audioUrl = (key: string) => `./audio/${key}.m4a`;

export const hasRecording = (text: string, voice: Voice = 'irina') => available.has(audioKey(text, voice));

let cachedVoice: SpeechSynthesisVoice | null | undefined;
const pickVoice = (): SpeechSynthesisVoice | null => {
  if (cachedVoice) return cachedVoice;
  if (typeof speechSynthesis === 'undefined') return null;
  const voices = speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith('ru'));
  cachedVoice =
    voices.find((v) => /premium|enhanced|milena/i.test(v.name)) ?? voices.find((v) => v.localService) ?? voices[0] ?? null;
  return cachedVoice;
};
if (typeof speechSynthesis !== 'undefined') {
  speechSynthesis.addEventListener?.('voiceschanged', () => {
    cachedVoice = undefined;
  });
}

export const ttsAvailable = () => typeof speechSynthesis !== 'undefined';
export const hasRussianVoice = () => pickVoice() !== null;

let rate = 0.9;
export const setSpeechRate = (r: number) => {
  rate = r;
};

let current: HTMLAudioElement | null = null;
let finish: (() => void) | null = null;

export function stopSpeaking() {
  if (current) {
    current.pause();
    current = null;
  }
  if (ttsAvailable()) speechSynthesis.cancel();
  finish?.();
  finish = null;
}

export interface SpeakOptions {
  voice?: Voice;
  slow?: boolean;
  /** Overrides the user's speech-rate setting (1 = normal). */
  rate?: number;
}

/** Plays a Russian text. Resolves when playback has finished (or was stopped). */
export function play(text: string, opts: SpeakOptions = {}): Promise<void> {
  stopSpeaking();
  const voice = opts.voice ?? 'irina';
  const base = opts.rate ?? (rate >= 1 ? rate : rate + 0.1); // recordings are already calm
  const r = opts.slow ? base * 0.7 : base;
  const key = audioKey(text, voice);
  return new Promise<void>((resolve) => {
    finish = resolve;
    if (available.has(key) || (voice === 'dmitri' && available.has(audioKey(text, 'irina')))) {
      const k = available.has(key) ? key : audioKey(text, 'irina');
      const a = new Audio(audioUrl(k));
      a.preservesPitch = true;
      a.playbackRate = Math.min(1.5, Math.max(0.5, r));
      a.onended = a.onerror = () => {
        if (current === a) current = null;
        resolve();
      };
      current = a;
      a.play().catch(() => resolve());
      return;
    }
    if (!ttsAvailable()) return resolve();
    const u = new SpeechSynthesisUtterance(stripStress(text));
    u.lang = 'ru-RU';
    const v = pickVoice();
    if (v) u.voice = v;
    u.rate = r;
    u.onend = u.onerror = () => resolve();
    speechSynthesis.speak(u);
  });
}

/** Fire-and-forget variant. */
export function speak(text: string, opts: SpeakOptions = {}) {
  void play(text, opts);
}
