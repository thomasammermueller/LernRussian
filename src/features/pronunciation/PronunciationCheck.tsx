import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { db } from '../../core/db';
import { evaluate, type Evaluation } from '../../core/pronunciation';
import { listen, loadWhisper, webSpeechAvailable, whisperDownloaded, type Engine, type ListenSession } from '../../core/recognition';
import { useSettings } from '../../core/settings';
import { stopSpeaking } from '../../core/speech';
import RichText from '../lesson/RichText';

/** Decides which engine to use: the user's choice, else Safari's recogniser when online, else local Whisper if downloaded. */
export function useEngine(): { engine: Engine | null; reason?: string } {
  const { speechEngine } = useSettings();
  const [whisperReady, setWhisperReady] = useState(false);
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    whisperDownloaded().then(setWhisperReady);
    const on = () => setOnline(navigator.onLine);
    window.addEventListener('online', on);
    window.addEventListener('offline', on);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', on);
    };
  }, []);
  if (speechEngine === 'whisper') return { engine: 'whisper' };
  if (speechEngine === 'webspeech') return webSpeechAvailable() ? { engine: 'webspeech' } : { engine: null, reason: 'Dein Browser bietet keine Spracherkennung an.' };
  if (webSpeechAvailable() && online) return { engine: 'webspeech' };
  if (whisperReady) return { engine: 'whisper' };
  return {
    engine: null,
    reason: webSpeechAvailable() ? 'Offline ist die Spracherkennung von Safari nicht verfügbar.' : 'Dein Browser bietet keine eingebaute Spracherkennung an.',
  };
}

type Phase = 'idle' | 'loading' | 'listening' | 'processing' | 'done' | 'error';

export default function PronunciationCheck({ text, onResult }: { text: string; onResult?: (e: Evaluation) => void }) {
  const { engine, reason } = useEngine();
  const [phase, setPhase] = useState<Phase>('idle');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<Evaluation | null>(null);
  const [error, setError] = useState('');
  const session = useRef<ListenSession | null>(null);

  useEffect(() => () => session.current?.stop(), []);
  useEffect(() => {
    setResult(null);
    setPhase('idle');
  }, [text]);

  if (!engine) {
    return (
      <p className="rounded-xl bg-surface-2 p-3 text-sm text-muted">
        🎙 {reason} Unter{' '}
        <Link to="/fortschritt" className="font-semibold text-accent underline">
          Fortschritt → Einstellungen
        </Link>{' '}
        kannst du die Offline-Erkennung (Whisper) laden.
      </p>
    );
  }

  const start = async () => {
    stopSpeaking();
    setError('');
    setResult(null);
    try {
      if (engine === 'whisper') {
        setPhase('loading');
        await loadWhisper(setProgress);
      }
      setPhase('listening');
      const s = listen(engine);
      session.current = s;
      const transcripts = await s.result.finally(() => setPhase('processing'));
      const ev = evaluate(text, transcripts);
      setResult(ev);
      setPhase('done');
      onResult?.(ev);
      const at = Date.now();
      await db.pronunciations.put({ id: `${text}@${at}`, text, heard: ev.heard, score: ev.score, engine, at });
    } catch (e) {
      setError((e as Error).message);
      setPhase('error');
    }
  };

  const listening = phase === 'listening';
  const busy = phase === 'loading' || phase === 'processing';
  const color = (s: number) => (s >= 85 ? 'text-ok' : s >= 60 ? 'text-warn' : 'text-bad');

  return (
    <div className="space-y-3">
      <button
        onClick={() => (listening ? session.current?.stop() : start())}
        disabled={busy}
        className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold transition ${
          listening ? 'animate-pulse bg-bad text-white' : 'bg-accent text-accent-ink'
        } disabled:opacity-60`}
      >
        {phase === 'loading'
          ? `Lade Offline-Erkennung … ${Math.round(progress * 100)} %`
          : phase === 'processing'
            ? 'Werte aus …'
            : listening
              ? '■ Fertig gesprochen'
              : result
                ? '🎙 Nochmal versuchen'
                : '🎙 Sprechen & prüfen'}
      </button>
      {listening && <p className="text-center text-sm text-muted">Sprich jetzt: „{text.replace(/́/g, '')}“</p>}
      {error && <p className="text-sm text-bad">{error}</p>}
      {result && (
        <div className="space-y-2 rounded-xl border border-line bg-surface p-3" role="status">
          <div className="flex items-baseline justify-between">
            <span className={`text-3xl font-bold ${color(result.score)}`}>{result.score} %</span>
            <span className="text-sm text-muted">{result.score >= 85 ? 'Sehr gut verständlich!' : result.score >= 60 ? 'Gut – fast da.' : 'Noch nicht verstanden.'}</span>
          </div>
          <div lang="ru" className="font-serif text-2xl tracking-wide" aria-label="Buchstaben-Auswertung">
            {result.chars.map((c, i) => (
              <span
                key={i}
                className={c.status === 'wrong' ? 'rounded bg-bad-soft text-bad' : c.status === 'missing' ? 'text-bad underline decoration-wavy' : c.status === 'ok' ? 'text-ok' : ''}
              >
                {c.ch}
              </span>
            ))}
          </div>
          <p className="text-sm text-muted">
            Verstanden: <span lang="ru">„{result.heard || '—'}“</span>
          </p>
          {result.tips.length > 0 && (
            <ul className="space-y-1 text-sm">
              {result.tips.map((t) => (
                <li key={t}>
                  💡 <RichText text={t} />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
