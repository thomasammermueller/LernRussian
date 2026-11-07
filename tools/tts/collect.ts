/**
 * Collects every Russian text the app can play and writes tools/tts/texts.json.
 * Run: npx vite-node tools/tts/collect.ts
 */
import { writeFileSync } from 'node:fs';
import { collectAudioTexts } from '../../src/content/audioTexts';

const list = collectAudioTexts();
writeFileSync(new URL('./texts.json', import.meta.url), JSON.stringify(list, null, 1));
console.log(`${list.length} texts → tools/tts/texts.json`);
