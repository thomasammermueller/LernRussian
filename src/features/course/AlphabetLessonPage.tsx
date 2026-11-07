import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { ALPHABET, GROUPS, lettersOfGroup, type Letter, type LetterGroup } from '../../content/alphabet';
import { completeLesson, markLetterSeen, recordLetterAnswer } from '../../core/db';
import { speak } from '../../core/speech';
import { Button, PageHeader, ProgressBar } from '../../ui/ui';
import LetterInfo from '../alphabet/LetterInfo';
import Quiz, { QuizResult, makeOptions, shuffle, type QuizQuestion } from './Quiz';

export const quizLabel = (l: Letter) =>
  l.id === 'ь' ? 'macht weich' : l.id === 'ъ' ? 'trennt' : `[${l.sound}]`;

function buildQuestions(letters: Letter[]): QuizQuestion[] {
  const labelPool = ALPHABET.map(quizLabel);
  const meaningPool = ALPHABET.flatMap((l) => l.examples.map((e) => e.de));
  const qs: QuizQuestion[] = [];
  for (const l of letters) {
    const { options, answer } = makeOptions(quizLabel(l), [...letters.map(quizLabel), ...shuffle(labelPool).slice(0, 3)]);
    qs.push({
      prompt: l.id === 'ь' || l.id === 'ъ' ? 'Was macht dieses Zeichen?' : 'Wie klingt dieser Buchstabe?',
      display: (
        <span lang="ru" className="font-serif text-7xl">
          {l.upper}
          {l.lower}
        </span>
      ),
      options,
      answer,
      explain: l.hint,
      letterId: l.id,
    });
    const ex = l.examples[0];
    const m = makeOptions(ex.de, meaningPool);
    qs.push({
      prompt: 'Lies das Wort. Was bedeutet es?',
      display: (
        <span lang="ru" className="font-serif text-5xl">
          {ex.ru}
        </span>
      ),
      speak: ex.ru,
      options: m.options,
      answer: m.answer,
      explain: (
        <>
          <span lang="ru">{ex.ru}</span> [{ex.translit}] = {ex.de}
        </>
      ),
      letterId: l.id,
    });
  }
  return shuffle(qs);
}

export default function AlphabetLessonPage() {
  const { group: g } = useParams();
  const group = Number(g) as LetterGroup;
  const meta = GROUPS[group];
  const letters = useMemo(() => (meta ? lettersOfGroup(group) : []), [group, meta]);
  const [phase, setPhase] = useState<'intro' | 'quiz' | 'done'>('intro');
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const navigate = useNavigate();

  const letter = letters[idx];
  useEffect(() => {
    if (phase === 'intro' && letter) {
      markLetterSeen(letter.id).catch(() => {});
      speak(letter.name);
    }
  }, [phase, letter]);

  if (!meta) return <PageHeader title="Lektion nicht gefunden" back="/kurs" />;

  const startQuiz = () => {
    setQuestions(buildQuestions(letters));
    setPhase('quiz');
  };

  return (
    <div>
      <PageHeader title={`${meta.lessonId} ${meta.title}`} back="/kurs" />
      {phase === 'intro' && (
        <div className="space-y-5">
          <div className="flex items-center gap-3 text-sm text-muted">
            <ProgressBar value={(idx + 1) / (letters.length + 1)} className="flex-1" />
            <span>
              {idx + 1} / {letters.length}
            </span>
          </div>
          {idx === 0 && <p className="rounded-xl bg-accent-soft p-3 text-sm">{meta.subtitle}. Hör dir jeden Buchstaben an und sprich ihn laut nach.</p>}
          <LetterInfo letter={letter} />
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" disabled={idx === 0} onClick={() => setIdx(idx - 1)}>
              Zurück
            </Button>
            {idx + 1 < letters.length ? (
              <Button className="flex-1" onClick={() => setIdx(idx + 1)}>
                Weiter
              </Button>
            ) : (
              <Button className="flex-1" onClick={startQuiz}>
                Zum Test
              </Button>
            )}
          </div>
        </div>
      )}
      {phase === 'quiz' && (
        <Quiz
          questions={questions}
          onAnswer={(q, ok) => q.letterId && recordLetterAnswer(q.letterId, ok)}
          onFinish={(s) => {
            setScore(s);
            completeLesson(meta.lessonId, s);
            setPhase('done');
          }}
        />
      )}
      {phase === 'done' && (
        <QuizResult score={score}>
          <Link to={`/nachschlagen/alphabet/${letters[0].id}`} className="font-semibold text-accent">
            ✍️ Buchstaben schreiben üben
          </Link>
          <Button
            variant="secondary"
            onClick={() => {
              setIdx(0);
              setPhase('intro');
            }}
          >
            Lektion wiederholen
          </Button>
          <Button onClick={() => navigate('/kurs')}>Zurück zum Kurs</Button>
        </QuizResult>
      )}
    </div>
  );
}
