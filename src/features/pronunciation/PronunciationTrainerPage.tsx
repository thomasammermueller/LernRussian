import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo, useState } from 'react';
import { ALL_LESSONS } from '../../content/lessons';
import { SOUND_GROUPS } from '../../content/pronunciation';
import { db } from '../../core/db';
import { Button, Card, PageHeader, SpeakButton } from '../../ui/ui';
import RichText from '../lesson/RichText';
import PronunciationCheck from './PronunciationCheck';

type Source = { id: string; title: string; hint?: string; items: string[] };

export default function PronunciationTrainerPage() {
  const history = useLiveQuery(() => db.pronunciations.toArray(), []) ?? [];
  const sentences = useMemo(() => [...new Set(ALL_LESSONS.flatMap((l) => l.speak).filter((s) => !s.includes('…')))], []);

  // Lowest average score first (at least one attempt)
  const hardest = useMemo(() => {
    const by = new Map<string, number[]>();
    for (const h of history) by.set(h.text, [...(by.get(h.text) ?? []), h.score]);
    return [...by.entries()]
      .map(([text, s]) => ({ text, avg: s.reduce((a, b) => a + b, 0) / s.length, n: s.length }))
      .filter((x) => x.avg < 85)
      .sort((a, b) => a.avg - b.avg)
      .slice(0, 8);
  }, [history]);

  const sources: Source[] = [
    ...SOUND_GROUPS,
    { id: 'sentences', title: 'Sätze aus den Lektionen', items: sentences },
    ...(hardest.length ? [{ id: 'hard', title: 'Deine schwierigsten', items: hardest.map((h) => h.text) }] : []),
  ];
  const [sel, setSel] = useState<Source | null>(null);
  const [i, setI] = useState(0);

  const avg = history.length ? Math.round(history.reduce((a, h) => a + h.score, 0) / history.length) : null;

  if (sel) {
    const text = sel.items[i % sel.items.length];
    return (
      <div className="space-y-4">
        <PageHeader title={sel.title} back="/nachschlagen/aussprache" right={<button onClick={() => setSel(null)} className="text-sm font-semibold text-accent">Übersicht</button>} />
        {sel.hint && (
          <p className="rounded-xl border-l-4 border-gold bg-warn-soft p-3 text-sm">
            💡 <RichText text={sel.hint} />
          </p>
        )}
        <Card className="flex items-center justify-center gap-3 py-8">
          <span lang="ru" className="font-serif text-4xl">
            {text}
          </span>
          <SpeakButton text={text} />
          <SpeakButton text={text} slow label="Langsam anhören" />
        </Card>
        <PronunciationCheck key={text} text={text} />
        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={() => setI((i - 1 + sel.items.length) % sel.items.length)}>
            ← Zurück
          </Button>
          <Button className="flex-1" onClick={() => setI(i + 1)}>
            Nächstes →
          </Button>
        </div>
        <p className="text-center text-sm text-muted">
          {(i % sel.items.length) + 1} / {sel.items.length}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <PageHeader title="Aussprache-Trainer" back="/nachschlagen" />
      <p className="text-muted">
        Hör dir das Vorbild an, sprich nach und lass dich auswerten. Die Erkennung prüft, ob man dich versteht – grüne Buchstaben wurden erkannt, rote nicht.
      </p>
      {avg !== null && (
        <Card className="flex justify-around text-center">
          <div>
            <div className="text-2xl font-bold">{history.length}</div>
            <div className="text-xs text-muted">Versuche</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{avg} %</div>
            <div className="text-xs text-muted">Durchschnitt</div>
          </div>
        </Card>
      )}
      <ul className="grid gap-3 sm:grid-cols-2">
        {sources.map((s) => (
          <li key={s.id}>
            <button
              onClick={() => {
                setSel(s);
                setI(0);
              }}
              className="h-full w-full rounded-2xl border border-line bg-surface p-4 text-left hover:bg-surface-2"
            >
              <div className="font-semibold">{s.title}</div>
              <div lang="ru" className="truncate font-serif text-muted">
                {s.items.slice(0, 4).join(' · ')}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
