import { useEffect, useMemo, useState } from 'react';
import type { Exercise } from '../../content/lessons/types';
import { exerciseSolution } from '../../content/lessons/util';
import { speak } from '../../core/speech';
import { checkAnswer, normalize, type AnswerResult } from '../../core/text';
import RussianInput from '../../ui/RussianInput';
import { Button, SpeakButton } from '../../ui/ui';
import { shuffle } from '../course/Quiz';
import RichText from './RichText';

export type Outcome = { correct: boolean; almost?: boolean };

/** Checks a typed answer against the solution and its alternatives. */
export function gradeTyped(given: string, answer: string, alternatives: string[] = []): AnswerResult {
  const results = [answer, ...alternatives].map((a) => checkAnswer(given, a));
  return results.includes('correct') ? 'correct' : results.includes('almost') ? 'almost' : 'wrong';
}

export const gradeOrder = (built: string[], answer: string) => normalize(built.join(' ')) === normalize(answer);

export default function ExerciseView({ ex, onDone }: { ex: Exercise; onDone: (o: Outcome) => void }) {
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const finish = (o: Outcome) => setOutcome(o);

  useEffect(() => {
    if ((ex.type === 'choice' && ex.audio) || ex.type === 'dictation') speak(ex.audio!);
  }, [ex]);

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium">
        <RichText text={ex.prompt} />
      </p>
      {ex.type === 'choice' && <Choice ex={ex} locked={!!outcome} onAnswer={finish} />}
      {ex.type === 'match' && <Match ex={ex} onAnswer={finish} />}
      {(ex.type === 'gap' || ex.type === 'translate' || ex.type === 'dictation') && <Typed ex={ex} locked={!!outcome} onAnswer={finish} />}
      {ex.type === 'order' && <Order ex={ex} locked={!!outcome} onAnswer={finish} />}

      {outcome && (
        <div className="space-y-3" role="status">
          <p className={`font-semibold ${outcome.correct ? (outcome.almost ? 'text-warn' : 'text-ok') : 'text-bad'}`}>
            {outcome.correct ? (outcome.almost ? 'Fast richtig – achte auf die Schreibweise.' : 'Richtig! ✓') : 'Leider falsch.'}
          </p>
          <Solution ex={ex} />
          {ex.type === 'choice' && ex.explain && (
            <p className="text-sm text-muted">
              <RichText text={ex.explain} />
            </p>
          )}
          <Button className="w-full" onClick={() => onDone(outcome)}>
            Weiter
          </Button>
        </div>
      )}
    </div>
  );
}

function Solution({ ex }: { ex: Exercise }) {
  const sol = exerciseSolution(ex);
  if (!sol) return null;
  return (
    <div className="flex items-center gap-2 rounded-xl bg-surface-2 p-3">
      <span lang="ru" className="flex-1 font-serif text-xl">
        {sol}
      </span>
      <SpeakButton text={sol} />
    </div>
  );
}

function Choice({ ex, locked, onAnswer }: { ex: Extract<Exercise, { type: 'choice' }>; locked: boolean; onAnswer: (o: Outcome) => void }) {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <>
      {(ex.show || ex.audio) && (
        <div className="flex min-h-24 items-center justify-center gap-3 rounded-2xl border border-line bg-surface p-4">
          {ex.show && (
            <span lang="ru" className="font-serif text-3xl">
              {ex.show}
            </span>
          )}
          {ex.audio && (
            <>
              <SpeakButton text={ex.audio} className="size-14" />
              <SpeakButton text={ex.audio} slow label="Langsam anhören" className="size-14" />
            </>
          )}
        </div>
      )}
      <div className={`grid gap-2 ${ex.options.length > 3 ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {ex.options.map((o, i) => {
          const state = picked === null ? '' : i === ex.answer ? 'border-ok bg-ok-soft text-ok' : i === picked ? 'border-bad bg-bad-soft text-bad' : 'opacity-50';
          return (
            <button
              key={i}
              disabled={locked}
              lang={ex.ruOptions ? 'ru' : undefined}
              onClick={() => {
                setPicked(i);
                onAnswer({ correct: i === ex.answer });
              }}
              className={`min-h-12 rounded-xl border-2 border-line bg-surface px-4 py-2 text-left text-lg ${ex.ruOptions ? 'font-serif text-xl' : ''} ${state}`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </>
  );
}

function Match({ ex, onAnswer }: { ex: Extract<Exercise, { type: 'match' }>; onAnswer: (o: Outcome) => void }) {
  const left = useMemo(() => shuffle(ex.pairs.map((p) => p[0])), [ex]);
  const right = useMemo(() => shuffle(ex.pairs.map((p) => p[1])), [ex]);
  const [sel, setSel] = useState<string | null>(null);
  const [done, setDone] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<string | null>(null);
  const [mistakes, setMistakes] = useState(0);

  const pickRight = (de: string) => {
    if (!sel) return;
    const ok = ex.pairs.some(([ru, d]) => ru === sel && d === de);
    if (ok) {
      const n = new Set(done).add(sel);
      setDone(n);
      setSel(null);
      if (n.size === ex.pairs.length) onAnswer({ correct: mistakes === 0, almost: mistakes === 1 });
    } else {
      setMistakes((m) => m + 1);
      setWrong(de);
      setTimeout(() => setWrong(null), 500);
    }
  };
  const doneDe = new Set(ex.pairs.filter(([ru]) => done.has(ru)).map(([, de]) => de));
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="space-y-2">
        {left.map((ru) => (
          <button
            key={ru}
            lang="ru"
            disabled={done.has(ru)}
            onClick={() => {
              setSel(ru);
              speak(ru);
            }}
            className={`w-full rounded-xl border-2 px-3 py-3 font-serif text-lg ${done.has(ru) ? 'border-ok bg-ok-soft text-ok' : sel === ru ? 'border-accent bg-accent-soft' : 'border-line bg-surface'}`}
          >
            {ru}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {right.map((de) => (
          <button
            key={de}
            disabled={doneDe.has(de)}
            onClick={() => pickRight(de)}
            className={`w-full rounded-xl border-2 px-3 py-3 text-base ${doneDe.has(de) ? 'border-ok bg-ok-soft text-ok' : wrong === de ? 'border-bad bg-bad-soft' : 'border-line bg-surface'}`}
          >
            {de}
          </button>
        ))}
      </div>
      {mistakes > 0 && <p className="col-span-2 text-sm text-muted">Fehlversuche: {mistakes}</p>}
    </div>
  );
}

function Typed({ ex, locked, onAnswer }: { ex: Extract<Exercise, { type: 'gap' | 'translate' | 'dictation' }>; locked: boolean; onAnswer: (o: Outcome) => void }) {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState<AnswerResult | null>(null);
  const submit = () => {
    if (locked || !value.trim()) return;
    const r = gradeTyped(value, ex.answer, 'alternatives' in ex ? ex.alternatives : []);
    setStatus(r);
    onAnswer({ correct: r !== 'wrong', almost: r === 'almost' });
  };
  return (
    <div className="space-y-3">
      {ex.type === 'gap' && (
        <div lang="ru" className="rounded-2xl border border-line bg-surface p-4 font-serif text-2xl">
          {ex.before} <span className="inline-block min-w-16 border-b-2 border-accent px-1 text-accent">{value || '…'}</span> {ex.after}
        </div>
      )}
      {ex.type === 'translate' && <div className="rounded-2xl border border-line bg-surface p-4 text-2xl font-semibold">{ex.de}</div>}
      {ex.type === 'dictation' && (
        <div className="flex justify-center gap-3 rounded-2xl border border-line bg-surface p-4">
          <SpeakButton text={ex.audio} className="size-14" />
          <SpeakButton text={ex.audio} slow label="Langsam anhören" className="size-14" />
        </div>
      )}
      <RussianInput value={value} onChange={setValue} onSubmit={submit} status={status} disabled={locked} placeholder="Auf Russisch …" />
      {!locked && (
        <Button className="w-full" onClick={submit} disabled={!value.trim()}>
          Prüfen
        </Button>
      )}
    </div>
  );
}

function Order({ ex, locked, onAnswer }: { ex: Extract<Exercise, { type: 'order' }>; locked: boolean; onAnswer: (o: Outcome) => void }) {
  const pool = useMemo(() => shuffle(ex.tokens.map((t, i) => ({ t, i }))), [ex]);
  const [built, setBuilt] = useState<number[]>([]);
  const [result, setResult] = useState<boolean | null>(null);
  const check = () => {
    const ok = gradeOrder(
      built.map((i) => ex.tokens[i]),
      ex.answer,
    );
    setResult(ok);
    onAnswer({ correct: ok });
  };
  return (
    <div className="space-y-3">
      <div
        lang="ru"
        className={`flex min-h-16 flex-wrap items-center gap-2 rounded-2xl border-2 border-dashed p-3 ${result === null ? 'border-line' : result ? 'border-ok bg-ok-soft' : 'border-bad bg-bad-soft'}`}
      >
        {built.length === 0 && <span className="text-sm text-muted">Tippe die Wörter in der richtigen Reihenfolge an.</span>}
        {built.map((i) => (
          <button key={i} disabled={locked} onClick={() => setBuilt(built.filter((b) => b !== i))} className="rounded-lg bg-accent px-3 py-1.5 font-serif text-lg text-accent-ink">
            {ex.tokens[i]}
          </button>
        ))}
      </div>
      <div lang="ru" className="flex flex-wrap gap-2">
        {pool.map(({ t, i }) => (
          <button
            key={i}
            disabled={locked || built.includes(i)}
            onClick={() => setBuilt([...built, i])}
            className="rounded-lg border border-line bg-surface px-3 py-1.5 font-serif text-lg disabled:opacity-30"
          >
            {t}
          </button>
        ))}
      </div>
      {!locked && (
        <Button className="w-full" onClick={check} disabled={built.length !== ex.tokens.length}>
          Prüfen
        </Button>
      )}
    </div>
  );
}
