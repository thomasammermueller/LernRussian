import { useState, type ReactNode } from 'react';
import { Button, ProgressBar, SpeakButton } from '../../ui/ui';

export interface QuizQuestion {
  prompt: string; // German instruction
  display?: ReactNode; // big content (letter/word)
  speak?: string; // TTS text, shown as button
  autoSpeak?: boolean;
  options: string[];
  answer: number;
  optionsLang?: 'ru' | 'de';
  explain?: ReactNode; // shown after answering
  letterId?: string;
}

export function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Builds options: the correct one plus up to `n-1` distinct distractors, shuffled. */
export function makeOptions(correct: string, pool: string[], n = 4): { options: string[]; answer: number } {
  const distractors = shuffle([...new Set(pool.filter((p) => p !== correct))]).slice(0, n - 1);
  const options = shuffle([correct, ...distractors]);
  return { options, answer: options.indexOf(correct) };
}

export default function Quiz({
  questions,
  onAnswer,
  onFinish,
}: {
  questions: QuizQuestion[];
  onAnswer?: (q: QuizQuestion, ok: boolean) => void;
  onFinish: (score: number) => void;
}) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [right, setRight] = useState(0);
  const q = questions[i];

  const pick = (idx: number) => {
    if (picked !== null) return;
    setPicked(idx);
    const ok = idx === q.answer;
    if (ok) setRight((r) => r + 1);
    onAnswer?.(q, ok);
  };

  const next = () => {
    if (i + 1 >= questions.length) {
      onFinish(Math.round((right / questions.length) * 100));
      return;
    }
    setI(i + 1);
    setPicked(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 text-sm text-muted">
        <ProgressBar value={i / questions.length} className="flex-1" />
        <span>
          {i + 1} / {questions.length}
        </span>
      </div>
      <p className="text-lg font-medium">{q.prompt}</p>
      {(q.display || q.speak) && (
        <div className="flex min-h-32 flex-col items-center justify-center gap-3 rounded-2xl border border-line bg-surface p-6">
          {q.display}
          {q.speak && (
            <div className="flex gap-2">
              <SpeakButton text={q.speak} />
              <SpeakButton text={q.speak} slow label="Langsam anhören" />
            </div>
          )}
        </div>
      )}
      <div className="grid grid-cols-2 gap-3">
        {q.options.map((o, idx) => {
          const state =
            picked === null ? '' : idx === q.answer ? 'border-ok bg-ok-soft text-ok' : idx === picked ? 'border-bad bg-bad-soft text-bad' : 'opacity-50';
          return (
            <button
              key={idx}
              lang={q.optionsLang === 'ru' ? 'ru' : undefined}
              onClick={() => pick(idx)}
              className={`min-h-14 rounded-xl border-2 border-line bg-surface px-3 py-3 text-lg transition ${q.optionsLang === 'ru' ? 'font-serif text-2xl' : ''} ${state}`}
            >
              {o}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className="space-y-3" role="status">
          <p className={`font-semibold ${picked === q.answer ? 'text-ok' : 'text-bad'}`}>
            {picked === q.answer ? 'Richtig! ✓' : `Leider falsch – richtig ist: ${q.options[q.answer]}`}
          </p>
          {q.explain && <div className="text-muted">{q.explain}</div>}
          <Button className="w-full" onClick={next}>
            {i + 1 >= questions.length ? 'Ergebnis anzeigen' : 'Weiter'}
          </Button>
        </div>
      )}
    </div>
  );
}

export function QuizResult({ score, children }: { score: number; children?: ReactNode }) {
  const passed = score >= 80;
  return (
    <div className="space-y-4 py-6 text-center">
      <div className="text-6xl">{passed ? '🎉' : '💪'}</div>
      <p className="text-3xl font-bold">{score} %</p>
      <p className="text-muted">
        {passed ? 'Bestanden! Diese Lektion ist abgeschlossen.' : 'Noch nicht ganz – ab 80 % ist die Lektion geschafft. Wiederhole sie einfach.'}
      </p>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}
