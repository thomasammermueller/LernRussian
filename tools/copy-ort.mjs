// Copies the ONNX runtime (WebAssembly) used by the offline speech recognition into public/ort/,
// so the app does not depend on a CDN. Runs automatically before dev/build.
import { copyFileSync, mkdirSync } from 'node:fs';
const src = new URL('../node_modules/onnxruntime-web/dist/', import.meta.url);
const dst = new URL('../public/ort/', import.meta.url);
mkdirSync(dst, { recursive: true });
for (const f of ['ort-wasm-simd-threaded.asyncify.mjs', 'ort-wasm-simd-threaded.asyncify.wasm']) copyFileSync(new URL(f, src), new URL(f, dst));
console.log('onnxruntime-web → public/ort/');
