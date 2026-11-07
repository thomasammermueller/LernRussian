export type Voice = 'irina' | 'dmitri';

/** FNV-1a 32-bit hash → stable file name for a (voice, text) pair. Shared by the app and the TTS tools. */
export function audioKey(text: string, voice: Voice = 'irina'): string {
  const s = `${voice}|${text.normalize('NFC').trim()}`;
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return `${voice}-${(h >>> 0).toString(16).padStart(8, '0')}`;
}

/**
 * Pronunciation fixes for the speech synthesizer (espeak-based phonemizer):
 * silent letters and clitics it would otherwise stress.
 */
const TTS_FIXES: [RegExp, string][] = [
  [/здра́?вствуй/gi, 'здра́ствуй'],
  [/до свида́?ния/gi, 'досвида́ния'],
  [/\bсо́?лнце/gi, 'со́нце'],
];

const keepCase = (match: string, rep: string) => (match[0] === match[0].toUpperCase() ? rep[0].toUpperCase() + rep.slice(1) : rep);

export const ttsText = (text: string) =>
  TTS_FIXES.reduce((t, [re, rep]) => t.replace(re, (m) => keepCase(m, rep)), text.normalize('NFC'));
