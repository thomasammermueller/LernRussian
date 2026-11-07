import { useMemo, useState } from 'react';
import { ALPHABET, READING_WORDS, type Example } from '../../content/alphabet';
import { TRANSLIT_HELP } from '../../core/keyboard';
import { speak } from '../../core/speech';
import { checkAnswer, stripStress, type AnswerResult } from '../../core/text';
import RussianInput from '../../ui/RussianInput';
import { Button, Card, PageHeader, SpeakButton } from '../../ui/ui';
import { shuffle } from '../course/Quiz';

type Level = 'copy' | 'listen' | 'translate';
const LEVELS: { id: Level; label: string; help: string }[] = [
  { id: 'copy', label: 'Abtippen', help: 'Tippe das russische Wort ab.' },
  { id: 'listen', label: 'Hören', help: 'Hör zu und schreib das Wort.' },
  { id: 'translate', label: 'Übersetzen', help: 'Schreib das russische Wort.' },
];

const WORDS: Example[] = [...ALPHABET.flatMap((l) => l.examples), ...READING_WORDS].filter(
  (w, i, arr) => arr.findIndex((x) => x.ru === w.ru) === i,
);

export default function KeyboardTrainerPage() {
  const [level, setLevel] = useState<Level>('copy');
  const [round, setRound] = useState(0);
  const deck = useMemo(() => shuffle(WORDS), []);
  const word = deck[round % deck.length];
  const [value, setValue] = useState('');
  const [result, setResult] = useState<AnswerResult | null>(null);
  const [stats, setStats] = useState({ right: 0, total: 0 });
  const [showHelp, setShowHelp] = useState(false);

  const submit = () => {
    if (result) return next();
    if (!value.trim()) return;
    const r = checkAnswer(value, word.ru);
    setResult(r);
    setStats((s) => ({ right: s.right + (r !== 'wrong' ? 1 : 0), total: s.total + 1 }));
  };
  const next = () => {
    setValue('');
    setResult(null);
    setRound((r) => r + 1);
    if (level === 'listen') setTimeout(() => speak(deck[(round + 1) % deck.length].ru), 50);
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Tastatur-Trainer"
        back="/nachschlagen"
        right={
          <span className="text-sm text-muted">
            {stats.right}/{stats.total}
          </span>
        }
      />
      <div className="flex gap-1 rounded-xl bg-surface-2 p-1 text-sm" role="radiogroup" aria-label="Übungsart">
        {LEVELS.map((l) => (
          <button
            key={l.id}
            role="radio"
            aria-checked={level === l.id}
            onClick={() => {
              setLevel(l.id);
              setValue('');
              setResult(null);
              if (l.id === 'listen') speak(word.ru);
            }}
            className={`flex-1 rounded-lg px-2 py-1.5 ${level === l.id ? 'bg-surface font-semibold text-accent shadow-sm' : 'text-muted'}`}
          >
            {l.label}
          </button>
        ))}
      </div>

      <Card className="flex min-h-28 flex-col items-center justify-center gap-2 text-center">
        <p className="text-sm text-muted">{LEVELS.find((l) => l.id === level)!.help}</p>
        {level === 'copy' && (
          <div lang="ru" className="font-serif text-4xl">
            {stripStress(word.ru)}
          </div>
        )}
        {level === 'listen' && (
          <div className="flex gap-2">
            <SpeakButton text={word.ru} />
            <SpeakButton text={word.ru} slow label="Langsam anhören" />
          </div>
        )}
        {level === 'translate' && <div className="text-3xl font-semibold">{word.de}</div>}
        {(level !== 'copy' || result) && <div className="text-sm text-muted">{result ? `${word.de} · [${word.translit}]` : `[${word.translit}]`}</div>}
      </Card>

      <RussianInput value={value} onChange={setValue} onSubmit={submit} status={result} placeholder="Hier tippen …" disabled={!!result} />

      {result && (
        <p role="status" className={`font-semibold ${result === 'correct' ? 'text-ok' : result === 'almost' ? 'text-warn' : 'text-bad'}`}>
          {result === 'correct' ? 'Richtig! ✓' : result === 'almost' ? 'Fast richtig – ein Buchstabe stimmt nicht: ' : 'Richtig wäre: '}
          {result !== 'correct' && <span lang="ru">{word.ru}</span>}
        </p>
      )}
      <Button className="w-full" onClick={submit}>
        {result ? 'Nächstes Wort' : 'Prüfen'}
      </Button>

      <button className="text-sm font-semibold text-accent" onClick={() => setShowHelp((s) => !s)}>
        {showHelp ? '▾' : '▸'} Am Computer tippen (Transliteration)
      </button>
      {showHelp && (
        <Card>
          <p className="mb-3 text-sm text-muted">
            Mit einer normalen Tastatur werden lateinische Buchstaben automatisch umgewandelt: <code>privet</code> → <span lang="ru">привет</span>.
          </p>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
            {TRANSLIT_HELP.map(([lat, cyr]) => (
              <div key={lat} className="flex justify-between border-b border-line py-1">
                <dt>
                  <code>{lat}</code>
                </dt>
                <dd lang="ru">{cyr}</dd>
              </div>
            ))}
          </dl>
        </Card>
      )}
    </div>
  );
}
