import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { ALL_LESSONS, lessonById, type Lesson } from '../../content/lessons';
import { wordByRu } from '../../content/vocab';
import { completeLesson, db, saveLessonStep } from '../../core/db';
import { stopSpeaking } from '../../core/speech';
import { cardId, newCardRecord } from '../../core/srs';
import { Button, PageHeader, ProgressBar } from '../../ui/ui';
import DialogPlayer from './DialogPlayer';
import ExerciseView, { type Outcome } from './ExerciseView';
import GrammarView from './GrammarView';
import SpeakStep from './SpeakStep';
import VocabStep from './VocabStep';

type Step =
  | { kind: 'dialog'; i: number }
  | { kind: 'vocab' }
  | { kind: 'grammar'; i: number }
  | { kind: 'exercises' }
  | { kind: 'speak' }
  | { kind: 'summary' };

const STEP_LABEL: Record<Step['kind'], string> = {
  dialog: '🎧 Dialog',
  vocab: '🗂 Neue Wörter',
  grammar: '📐 Grammatik',
  exercises: '✍️ Übungen',
  speak: '🎙 Aussprache',
  summary: '🏁 Abschluss',
};

export const lessonSteps = (l: Lesson): Step[] => [
  ...l.dialogs.map((_, i) => ({ kind: 'dialog' as const, i })),
  ...(l.vocab.length ? [{ kind: 'vocab' as const }] : []),
  ...l.grammar.map((_, i) => ({ kind: 'grammar' as const, i })),
  ...(l.exercises.length ? [{ kind: 'exercises' as const }] : []),
  ...(l.speak.length ? [{ kind: 'speak' as const }] : []),
  { kind: 'summary' as const },
];

/** Adds the lesson's words to the vocabulary trainer (as new cards, due now). */
async function addLessonWords(l: Lesson) {
  const now = Date.now();
  let added = 0;
  await db.transaction('rw', db.cards, async () => {
    for (const ru of l.vocab) {
      const w = wordByRu(ru);
      if (!w) continue;
      if (await db.cards.get(cardId(w.id, 'ru-de'))) continue;
      await db.cards.put({ ...newCardRecord(w.id, 'ru-de', now), source: 'lesson' });
      added++;
    }
  });
  return added;
}

export default function LessonPage() {
  const { id = '' } = useParams();
  const lesson = lessonById(id);
  const navigate = useNavigate();
  const steps = useMemo(() => (lesson ? lessonSteps(lesson) : []), [lesson]);
  const [step, setStep] = useState<number | null>(null);
  const [exIdx, setExIdx] = useState(0);
  const [outcomes, setOutcomes] = useState<Outcome[]>([]);
  const [added, setAdded] = useState<number | null>(null);

  useEffect(() => {
    setStep(null);
    setExIdx(0);
    setOutcomes([]);
    setAdded(null);
    db.lessons.get(id).then((p) => {
      const s = p?.step ?? 0;
      setStep(s > 0 && s < steps.length - 1 ? s : 0);
    });
    return () => stopSpeaking();
  }, [id, steps.length]);

  if (!lesson) return <PageHeader title="Lektion nicht gefunden" back="/kurs" />;
  if (step === null) return <PageHeader title={lesson.title.ru} back="/kurs" />;

  const cur = steps[step];
  const score = outcomes.length ? Math.round((outcomes.filter((o) => o.correct).length / outcomes.length) * 100) : 100;
  const passMark = lesson.checkpoint ? 80 : 0;

  const goto = (n: number, outs: Outcome[] = outcomes) => {
    stopSpeaking();
    setStep(n);
    window.scrollTo({ top: 0 });
    const target = steps[n];
    if (target.kind === 'exercises') {
      setExIdx(0);
      setOutcomes([]);
    }
    if (target.kind === 'summary') {
      const final = outs.length ? Math.round((outs.filter((o) => o.correct).length / outs.length) * 100) : 100;
      void completeLesson(lesson.id, final, passMark);
      void addLessonWords(lesson).then(setAdded);
    } else void saveLessonStep(lesson.id, n);
  };

  const next = ALL_LESSONS[ALL_LESSONS.indexOf(lesson) + 1];
  const showTranslit = lesson.unit <= 2;

  return (
    <div className="space-y-4">
      <PageHeader title={`${lesson.id} ${lesson.title.ru}`} back="/kurs" />
      <div className="space-y-1">
        <div className="flex justify-between text-sm text-muted">
          <span>{STEP_LABEL[cur.kind]}{cur.kind === 'dialog' && lesson.dialogs.length > 1 ? ` ${cur.i + 1}/${lesson.dialogs.length}` : ''}</span>
          <span>
            Schritt {step + 1} / {steps.length}
          </span>
        </div>
        <ProgressBar value={(step + (cur.kind === 'exercises' ? exIdx / lesson.exercises.length : 0)) / (steps.length - 1)} />
      </div>

      {step === 0 && (
        <p className="rounded-xl bg-accent-soft p-3 text-sm">
          <b>Ziel:</b> {lesson.canDo}
        </p>
      )}

      {cur.kind === 'dialog' && (
        <>
          <h2 className="text-xl font-semibold">{lesson.dialogs[cur.i].title}</h2>
          <p className="text-sm text-muted">Hör dir den Dialog erst einmal ganz an (▶). Tippe dann auf einzelne Sätze, um sie zu wiederholen und die Übersetzung zu sehen.</p>
          <DialogPlayer key={`${lesson.id}-${cur.i}`} dialog={lesson.dialogs[cur.i]} speakers={lesson.speakers} showTranslitDefault={showTranslit} />
        </>
      )}
      {cur.kind === 'vocab' && <VocabStep words={lesson.vocab} showTranslit={showTranslit} />}
      {cur.kind === 'grammar' && <GrammarView {...lesson.grammar[cur.i]} />}
      {cur.kind === 'exercises' && (
        <ExerciseView
          key={exIdx}
          ex={lesson.exercises[exIdx]}
          onDone={(o) => {
            const all = [...outcomes, o];
            setOutcomes(all);
            if (exIdx + 1 < lesson.exercises.length) {
              setExIdx(exIdx + 1);
              window.scrollTo({ top: 0 });
            } else goto(step + 1, all);
          }}
        />
      )}
      {cur.kind === 'speak' && <SpeakStep sentences={lesson.speak} />}
      {cur.kind === 'summary' && (
        <div className="space-y-4 py-4 text-center">
          <div className="text-6xl">{!lesson.checkpoint || score >= 80 ? '🎉' : '💪'}</div>
          <h2 className="text-2xl font-bold">{lesson.checkpoint ? (score >= 80 ? 'Checkpoint bestanden!' : 'Noch nicht ganz') : 'Lektion geschafft!'}</h2>
          {outcomes.length > 0 && <p className="text-lg">{score} % der Übungen richtig</p>}
          {lesson.checkpoint && score < 80 && <p className="text-muted">Ab 80 % ist die Einheit gemeistert. Wiederhole die Lektionen, bei denen du unsicher warst, und versuch es dann noch einmal.</p>}
          <p className="rounded-xl bg-ok-soft p-3 text-left text-ok">
            ☑ {lesson.canDo}
          </p>
          {added !== null && added > 0 && (
            <p className="text-sm text-muted">
              {added} neue Wörter wurden in deinen <Link to="/woerter" className="font-semibold text-accent underline">Vokabeltrainer</Link> übernommen.
            </p>
          )}
          <div className="flex flex-col gap-2">
            {next && <Button onClick={() => navigate(`/kurs/lektion/${next.id}`)}>Weiter: {next.id} {next.title.de}</Button>}
            <Button variant="secondary" onClick={() => goto(0)}>
              Lektion wiederholen
            </Button>
            <Link to="/kurs" className="py-2 font-semibold text-accent">
              Zur Kursübersicht
            </Link>
          </div>
        </div>
      )}

      {cur.kind !== 'summary' && cur.kind !== 'exercises' && (
        <div className="flex gap-3 pt-2">
          <Button variant="secondary" className="flex-1" disabled={step === 0} onClick={() => goto(step - 1)}>
            Zurück
          </Button>
          <Button className="flex-1" onClick={() => goto(step + 1)}>
            Weiter
          </Button>
        </div>
      )}
    </div>
  );
}
