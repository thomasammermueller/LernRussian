import { useState } from 'react';
import { useNavigate } from 'react-router';
import { READING_WORDS } from '../../content/alphabet';
import { completeLesson } from '../../core/db';
import { Button, PageHeader } from '../../ui/ui';
import Quiz, { QuizResult, makeOptions, shuffle, type QuizQuestion } from './Quiz';

const build = (): QuizQuestion[] =>
  shuffle(READING_WORDS)
    .slice(0, 12)
    .map((w) => {
      const { options, answer } = makeOptions(
        w.de,
        READING_WORDS.map((x) => x.de),
      );
      return {
        prompt: 'Lies das Wort laut. Was bedeutet es?',
        display: (
          <span lang="ru" className="font-serif text-5xl">
            {w.ru}
          </span>
        ),
        speak: w.ru,
        options,
        answer,
        explain: `[${w.translit}]`,
      };
    });

export default function ReadingTestPage() {
  const [questions, setQuestions] = useState(build);
  const [score, setScore] = useState<number | null>(null);
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader title="0.T Lesetest" back="/kurs" />
      {score === null ? (
        <>
          <p className="mb-4 rounded-xl bg-accent-soft p-3 text-sm">
            Alle Wörter kennst du schon aus dem Deutschen – du musst sie nur lesen können. Tipp: Lies Buchstabe für Buchstabe und achte auf die
            Betonung (á).
          </p>
          <Quiz
            questions={questions}
            onFinish={(s) => {
              setScore(s);
              completeLesson('0.T', s);
            }}
          />
        </>
      ) : (
        <QuizResult score={score}>
          <Button
            variant="secondary"
            onClick={() => {
              setQuestions(build());
              setScore(null);
            }}
          >
            Nochmal mit neuen Wörtern
          </Button>
          <Button onClick={() => navigate('/kurs')}>Zurück zum Kurs</Button>
        </QuizResult>
      )}
    </div>
  );
}
