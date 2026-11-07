import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { ALPHABET, letterById } from '../../content/alphabet';
import { db, markLetterSeen } from '../../core/db';
import { PageHeader } from '../../ui/ui';
import LetterInfo from './LetterInfo';
import TracePad, { type TraceMode } from './TracePad';

const MODES: { id: TraceMode; label: string }[] = [
  { id: 'guide', label: 'Mit Vorlage' },
  { id: 'start', label: 'Startpunkte' },
  { id: 'free', label: 'Frei' },
];

export default function LetterDetailPage() {
  const { id = '' } = useParams();
  const letter = letterById(id);
  const [upper, setUpper] = useState(true);
  const [mode, setMode] = useState<TraceMode>('guide');
  const progress = useLiveQuery(() => db.letters.get(id), [id]);

  useEffect(() => {
    if (letter) markLetterSeen(letter.id).catch(() => {});
  }, [letter]);

  if (!letter) return <PageHeader title="Buchstabe nicht gefunden" back="/nachschlagen/alphabet" />;
  const i = ALPHABET.indexOf(letter);
  const prev = ALPHABET[i - 1];
  const next = ALPHABET[i + 1];

  return (
    <div className="space-y-5">
      <PageHeader title={`Buchstabe ${letter.upper}`} back="/nachschlagen/alphabet" />
      <LetterInfo letter={letter} />

      <section className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold">✍️ Schreiben üben</h2>
          {progress && progress.bestTrace > 0 && <span className="text-sm text-muted">Bestwert {progress.bestTrace} %</span>}
        </div>
        <div className="flex gap-2">
          <Segmented options={[{ id: 'u', label: `${letter.upper} groß` }, { id: 'l', label: `${letter.lower} klein` }]} value={upper ? 'u' : 'l'} onChange={(v) => setUpper(v === 'u')} />
        </div>
        <Segmented options={MODES} value={mode} onChange={(v) => setMode(v as TraceMode)} />
        <p className="text-sm text-muted">
          {mode === 'guide' && 'Fahr die graue Vorlage nach. Die Zahlen zeigen, wo jeder Strich beginnt.'}
          {mode === 'start' && 'Nur die Startpunkte sind sichtbar – schreib den Buchstaben aus dem Gedächtnis.'}
          {mode === 'free' && 'Ganz ohne Hilfe. Schreib den Buchstaben auf die Linien.'}
        </p>
        <TracePad glyph={upper ? letter.upper : letter.lower} letterId={letter.id} mode={mode} />
      </section>

      <nav className="flex justify-between pt-2">
        {prev ? (
          <Link to={`/nachschlagen/alphabet/${prev.id}`} className="font-semibold text-accent" lang="ru">
            ← {prev.upper}
            {prev.lower}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link to={`/nachschlagen/alphabet/${next.id}`} className="font-semibold text-accent" lang="ru">
            {next.upper}
            {next.lower} →
          </Link>
        )}
      </nav>
    </div>
  );
}

function Segmented<T extends string>({ options, value, onChange }: { options: { id: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="flex w-full gap-1 rounded-xl bg-surface-2 p-1 text-sm" role="radiogroup">
      {options.map((o) => (
        <button
          key={o.id}
          role="radio"
          aria-checked={value === o.id}
          onClick={() => onChange(o.id)}
          className={`flex-1 rounded-lg px-2 py-1.5 ${value === o.id ? 'bg-surface font-semibold text-accent shadow-sm' : 'text-muted'}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
