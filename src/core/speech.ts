import { stripStress } from './text';

/**
 * Text-to-speech via the browser (on iOS: on-device voice "Milena"/"Yuri").
 * Used for letters and words until pre-generated audio files arrive (v0.3).
 */
let cachedVoice: SpeechSynthesisVoice | null | undefined;

const pickVoice = (): SpeechSynthesisVoice | null => {
  if (cachedVoice) return cachedVoice;
  if (typeof speechSynthesis === 'undefined') return null;
  const voices = speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith('ru'));
  // Prefer high-quality local voices.
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

export function speak(text: string, opts: { slow?: boolean } = {}) {
  if (!ttsAvailable()) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(stripStress(text));
  u.lang = 'ru-RU';
  const v = pickVoice();
  if (v) u.voice = v;
  u.rate = opts.slow ? rate * 0.6 : rate;
  speechSynthesis.speak(u);
}
