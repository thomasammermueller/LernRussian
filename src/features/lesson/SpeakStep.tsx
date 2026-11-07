import { SpeakButton } from '../../ui/ui';
import { useRecorder } from './useRecorder';

export default function SpeakStep({ sentences }: { sentences: string[] }) {
  return (
    <div className="space-y-3">
      <p className="text-muted">Hör dir jeden Satz an, sprich ihn laut nach und vergleiche deine Aufnahme mit dem Vorbild.</p>
      {sentences.map((s) => (
        <SpeakItem key={s} text={s} />
      ))}
    </div>
  );
}

function SpeakItem({ text }: { text: string }) {
  const r = useRecorder();
  return (
    <div className="space-y-2 rounded-2xl border border-line bg-surface p-4">
      <div className="flex items-center gap-2">
        <span lang="ru" className="flex-1 font-serif text-2xl">
          {text}
        </span>
        <SpeakButton text={text} />
        <SpeakButton text={text} slow label="Langsam anhören" />
      </div>
      {r.supported && (
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => (r.recording ? r.stop() : r.start())}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${r.recording ? 'animate-pulse bg-bad text-white' : 'bg-accent-soft text-accent'}`}
          >
            {r.recording ? '■ Aufnahme stoppen' : '🎙 Aufnehmen'}
          </button>
          {r.url && !r.recording && (
            <button onClick={r.playBack} className="rounded-full bg-surface-2 px-4 py-2 text-sm font-semibold">
              ▶ Meine Aufnahme
            </button>
          )}
          {r.error && <span className="text-sm text-bad">{r.error}</span>}
        </div>
      )}
    </div>
  );
}
