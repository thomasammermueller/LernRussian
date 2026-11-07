/**
 * Speech recognition with two interchangeable engines:
 * - "webspeech": the browser's built-in recogniser (Safari/Chrome, online, free)
 * - "whisper":   OpenAI Whisper (base, multilingual) running locally via transformers.js – offline after a one-time download
 */

export type Engine = 'webspeech' | 'whisper';

export interface ListenSession {
  /** Stops listening early (otherwise the engine stops on silence / after `maxMs`). */
  stop(): void;
  /** Resolves with one or more transcripts (best first). */
  result: Promise<string[]>;
}

// ---------- Web Speech API ----------
type SR = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous: boolean;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
};
const SRClass = (): (new () => SR) | undefined =>
  typeof window === 'undefined' ? undefined : ((window as unknown as { SpeechRecognition?: new () => SR }).SpeechRecognition ?? (window as unknown as { webkitSpeechRecognition?: new () => SR }).webkitSpeechRecognition);

export const webSpeechAvailable = () => !!SRClass();

function listenWebSpeech(maxMs: number): ListenSession {
  const Cls = SRClass()!;
  const rec = new Cls();
  rec.lang = 'ru-RU';
  rec.interimResults = false;
  rec.maxAlternatives = 5;
  rec.continuous = false;
  const result = new Promise<string[]>((resolve, reject) => {
    let out: string[] = [];
    rec.onresult = (e) => {
      const first = e.results[0];
      out = Array.from({ length: first.length }, (_, i) => first[i].transcript);
    };
    rec.onerror = (e) => {
      if (e.error === 'no-speech' || e.error === 'aborted') resolve([]);
      else reject(new Error(e.error === 'not-allowed' ? 'Kein Mikrofonzugriff – bitte erlauben.' : e.error === 'network' ? 'Keine Internetverbindung – die Spracherkennung von Safari braucht Internet.' : `Spracherkennung: ${e.error}`));
    };
    rec.onend = () => resolve(out);
  });
  const timer = setTimeout(() => rec.stop(), maxMs);
  rec.start();
  return {
    stop: () => {
      clearTimeout(timer);
      rec.stop();
    },
    result: result.finally(() => clearTimeout(timer)),
  };
}

// ---------- Whisper (local) ----------
export const WHISPER_MODEL = 'onnx-community/whisper-base';
/** Exact version: keep in sync with the devDependency used for the types. */
export const TRANSFORMERS_URL = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.3.2/dist/transformers.min.js';
export const WHISPER_SIZE_MB = 76;

type Asr = (audio: Float32Array, opts: Record<string, unknown>) => Promise<{ text: string }>;
let asrPromise: Promise<Asr> | null = null;

/** Loads (and on first use downloads) the Whisper model. `onProgress` gets 0–1. */
export function loadWhisper(onProgress?: (p: number) => void): Promise<Asr> {
  if (!asrPromise) {
    asrPromise = (async () => {
      // Loaded from the CDN on first use (not bundled): the ONNX runtime it needs is ~27 MB,
      // too large for static hosts with a 25 MiB file limit. The service worker caches both.
      const { pipeline, env } = (await import(/* @vite-ignore */ TRANSFORMERS_URL)) as typeof import('@huggingface/transformers');
      env.allowLocalModels = false;
      const wasm = env.backends.onnx.wasm;
      if (wasm && !window.crossOriginIsolated) wasm.numThreads = 1;
      const files = new Map<string, { loaded: number; total: number }>();
      const asr = await pipeline('automatic-speech-recognition', WHISPER_MODEL, {
        dtype: 'q8',
        device: 'wasm',
        progress_callback: (p: { status: string; file?: string; loaded?: number; total?: number }) => {
          if (p.status === 'progress' && p.file && p.total) {
            files.set(p.file, { loaded: p.loaded ?? 0, total: p.total });
            const sum = [...files.values()].reduce((a, f) => ({ l: a.l + f.loaded, t: a.t + f.total }), { l: 0, t: 0 });
            onProgress?.(sum.l / (WHISPER_SIZE_MB * 1e6 > sum.t ? WHISPER_SIZE_MB * 1e6 : sum.t));
          }
        },
      });
      onProgress?.(1);
      return asr as unknown as Asr;
    })().catch((e) => {
      asrPromise = null;
      throw e;
    });
  }
  return asrPromise;
}

async function toMono16k(blob: Blob): Promise<Float32Array> {
  const buf = await blob.arrayBuffer();
  const ctx = new AudioContext();
  const decoded = await ctx.decodeAudioData(buf);
  void ctx.close();
  const off = new OfflineAudioContext(1, Math.ceil(decoded.duration * 16000), 16000);
  const src = off.createBufferSource();
  src.buffer = decoded;
  src.connect(off.destination);
  src.start();
  const rendered = await off.startRendering();
  return rendered.getChannelData(0);
}

function listenWhisper(maxMs: number): ListenSession {
  let recorder: MediaRecorder | null = null;
  let stopRequested = false;
  const result = (async () => {
    const asr = loadWhisper();
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recorder = new MediaRecorder(stream);
    const chunks: Blob[] = [];
    recorder.ondataavailable = (e) => e.data.size && chunks.push(e.data);
    const stopped = new Promise<void>((r) => (recorder!.onstop = () => r()));
    recorder.start();
    if (stopRequested) recorder.stop();
    const timer = setTimeout(() => recorder?.state === 'recording' && recorder.stop(), maxMs);
    await stopped;
    clearTimeout(timer);
    stream.getTracks().forEach((t) => t.stop());
    const audio = await toMono16k(new Blob(chunks, { type: recorder.mimeType }));
    if (audio.length < 16000 * 0.3) return [];
    const out = await (await asr)(audio, { language: 'russian', task: 'transcribe' });
    return [out.text.trim()];
  })();
  return {
    stop: () => {
      stopRequested = true;
      if (recorder?.state === 'recording') recorder.stop();
    },
    result,
  };
}

export function listen(engine: Engine, maxMs = 8000): ListenSession {
  return engine === 'webspeech' ? listenWebSpeech(maxMs) : listenWhisper(maxMs);
}

/** Has the Whisper model already been downloaded (Cache Storage of transformers.js)? */
export async function whisperDownloaded(): Promise<boolean> {
  try {
    if (!('caches' in window)) return false;
    const cache = await caches.open('transformers-cache');
    const keys = await cache.keys();
    return keys.some((k) => k.url.includes('whisper-base') && k.url.includes('decoder'));
  } catch {
    return false;
  }
}
