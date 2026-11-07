import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import type { Word } from '../../content/vocab';
import { db, type CardRecord } from '../../core/db';
import { setSetting, useSettings } from '../../core/settings';
import { speak } from '../../core/speech';
import { Rating, introduceWord, previewIntervals, rateCard, suggestRating, type Grade } from '../../core/srs';
import { checkAnswer, type AnswerResult } from '../../core/text';
import RussianInput from '../../ui/RussianInput';
import { Button, Card, PageHeader, ProgressBar, SpeakButton } from '../../ui/ui';
import { buildQueue, type QueueItem } from './queue';
import { loadAllWords, topicTitle, useUserSets } from './useVocab';

const REQUEUE_WITHIN = 20 * 60_000; // cards due again within 20 min come back in this session

const LABELS: Record<Grade, string> = { 1: 'Nochmal', 2: 'Schwer', 3: 'Gut', 4: 'Leicht' };
const COLORS: Record<Grade, string> = {
  1: 'border-bad text-bad',
  2: 'border-warn text-warn',
  3: 'border-ok text-ok',
  4: 'border-accent text-accent',
};

export default function StudyPage() {
  const [params] = useSearchParams();
  const topic = params.get('thema') ?? undefined;
  const settings = useSettings();
  const sets = useUserSets();
  const [queue, setQueue] = useState<QueueItem[] | null>(null);
  const [initial, setInitial] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [typed, setTyped] = useState('');
  const [result, setResult] = useState<AnswerResult | null>(null);
  const [stats, setStats] = useState({ done: 0, good: 0 });
  const shownAt = useRef(Date.now());

  useEffect(() => {
    (async () => {
      const [words, cards, newPerDay] = await Promise.all([
        loadAllWords(),
        db.cards.toArray(),
        db.settings.get('newPerDay').then((s) => (s?.value as number) ?? 10),
      ]);
      const q = buildQueue(words, cards, { topic, newLimit: newPerDay });
      setQueue(q);
      setInitial(q.length);
    })();
  }, [topic]);

  const item = queue?.[0];
  const listen = settings.listenMode;

  // Auto-play the Russian word when a card is shown (front of ru→de / new word).
  useEffect(() => {
    shownAt.current = Date.now();
    if (!item) return;
    if (item.kind === 'new' || (item.kind === 'review' && item.card.dir === 'ru-de')) speak(item.word.ru);
  }, [item]);

  const advance = (updated?: { card: CardRecord; word: Word }) => {
    setRevealed(false);
    setTyped('');
    setResult(null);
    setQueue((q) => {
      if (!q) return q;
      const rest = q.slice(1);
      if (updated && updated.card.due - Date.now() < REQUEUE_WITHIN) {
        rest.splice(Math.min(rest.length, 4), 0, { kind: 'review', ...updated });
      }
      return rest;
    });
  };

  const rate = async (g: Grade) => {
    if (!item) return;
    const ms = Date.now() - shownAt.current;
    const card = item.kind === 'new' ? await introduceWord(item.word.id, g, ms) : await rateCard(item.card, g, ms);
    setStats((s) => ({ done: s.done + 1, good: s.good + (g >= Rating.Good ? 1 : 0) }));
    advance({ card, word: item.word });
  };

  const checkTyped = () => {
    if (!item || result) return;
    if (!typed.trim()) return;
    const r = checkAnswer(typed, item.word.ru);
    setResult(r);
    setRevealed(true);
    speak(item.word.ru);
  };

  const title = topic ? topicTitle(topic, sets) : 'Wiederholung';
  const back = topic ? `/woerter/thema/${topic}` : '/woerter';

  if (!queue) return <PageHeader title={title} back={back} />;

  if (!item) {
    return (
      <div>
        <PageHeader title={title} back={back} />
        <div className="space-y-4 py-8 text-center">
          <div className="text-6xl">{stats.done ? '🎉' : '✅'}</div>
          <p className="text-2xl font-bold">{stats.done ? 'Geschafft!' : 'Nichts zu tun'}</p>
          <p className="text-muted">
            {stats.done
              ? `${stats.done} Karten gelernt, davon ${Math.round((stats.good / stats.done) * 100)} % gewusst.`
              : 'Für heute ist alles wiederholt. Neue Wörter findest du in den Themen.'}
          </p>
          <Link to="/woerter" className="inline-block font-semibold text-accent">
            Zurück zu den Wörtern
          </Link>
        </div>
      </div>
    );
  }

  const isNew = item.kind === 'new';
  const dir = item.kind === 'review' ? item.card.dir : 'ru-de';
  const w = item.word;
  const intervals = item.kind === 'review' ? previewIntervals(item.card) : null;
  const suggested = result ? suggestRating(result) : null;

  return (
    <div className="space-y-4">
      <PageHeader
        title={title}
        back={back}
        right={
          <button
            onClick={() => setSetting('listenMode', !listen)}
            aria-pressed={listen}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold ${listen ? 'bg-accent text-accent-ink' : 'bg-surface-2 text-muted'}`}
          >
            🎧 Hörmodus
          </button>
        }
      />
      <div className="flex items-center gap-3 text-sm text-muted">
        <ProgressBar value={stats.done / Math.max(1, stats.done + queue.length)} className="flex-1" />
        <span>{queue.length} offen</span>
      </div>

      <Card className="flex min-h-72 flex-col items-center justify-center gap-3 p-6 text-center">
        {isNew && <span className="rounded-full bg-gold px-3 py-0.5 text-xs font-bold text-white uppercase">Neues Wort</span>}
        {dir === 'ru-de' && !isNew && <span className="text-xs tracking-wide text-muted uppercase">Was bedeutet …?</span>}
        {dir === 'de-ru' && <span className="text-xs tracking-wide text-muted uppercase">Wie heißt das auf Russisch?</span>}

        {/* Front */}
        {dir === 'ru-de' && (listen && !isNew && !revealed ? (
          <div className="flex gap-2">
            <SpeakButton text={w.ru} className="size-16" />
            <SpeakButton text={w.ru} slow label="Langsam anhören" className="size-16" />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span lang="ru" className="font-serif text-4xl">
              {w.ru}
            </span>
            <SpeakButton text={w.ru} />
          </div>
        ))}
        {dir === 'de-ru' && (
          <div className="text-3xl font-semibold">
            {w.de}
          </div>
        )}

        {/* Back */}
        {(revealed || isNew) && (
          <div className="w-full space-y-2 border-t border-line pt-3">
            {dir === 'ru-de' && <div className="text-2xl font-semibold">{w.de}</div>}
            {dir === 'de-ru' && (
              <div className="flex items-center justify-center gap-2">
                <span lang="ru" className="font-serif text-3xl">
                  {w.ru}
                </span>
                <SpeakButton text={w.ru} />
              </div>
            )}
            {w.translit && <div className="text-muted">[{w.translit}]</div>}
            {w.note && <div className="text-sm text-muted italic">{w.note}</div>}
            {w.exRu && (
              <div className="rounded-lg bg-surface-2 p-2 text-sm">
                <span lang="ru" className="font-serif text-base">
                  {w.exRu}
                </span>
                <br />
                <span className="text-muted">{w.exDe}</span>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Controls */}
      {isNew && (
        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" onClick={() => rate(Rating.Easy)}>
            Kenne ich schon
          </Button>
          <Button onClick={() => rate(Rating.Good)}>Gemerkt – weiter</Button>
        </div>
      )}

      {!isNew && dir === 'ru-de' && !revealed && (
        <Button className="w-full" onClick={() => setRevealed(true)}>
          Aufdecken
        </Button>
      )}

      {!isNew && dir === 'de-ru' && !result && (
        <>
          <RussianInput value={typed} onChange={setTyped} onSubmit={checkTyped} placeholder="Auf Russisch …" />
          <div className="flex gap-2">
            <Button variant="secondary" className="flex-1" onClick={() => (setResult('wrong'), setRevealed(true))}>
              Weiß ich nicht
            </Button>
            <Button className="flex-1" onClick={checkTyped} disabled={!typed.trim()}>
              Prüfen
            </Button>
          </div>
        </>
      )}

      {result && (
        <p role="status" className={`text-center font-semibold ${result === 'correct' ? 'text-ok' : result === 'almost' ? 'text-warn' : 'text-bad'}`}>
          {result === 'correct' ? 'Richtig! ✓' : result === 'almost' ? 'Fast richtig – achte auf die Schreibweise.' : typed ? `Deine Antwort: ${typed}` : 'Merk dir die Lösung.'}
        </p>
      )}

      {!isNew && revealed && intervals && (
        <div className="grid grid-cols-4 gap-2">
          {([1, 2, 3, 4] as Grade[]).map((g) => (
            <button
              key={g}
              onClick={() => rate(g)}
              className={`flex flex-col items-center rounded-xl border-2 bg-surface py-2 ${COLORS[g]} ${suggested === g ? 'ring-4 ring-accent-soft' : suggested ? 'opacity-60' : ''}`}
            >
              <span className="text-sm font-semibold">{LABELS[g]}</span>
              <span className="text-xs text-muted">{intervals[g]}</span>
            </button>
          ))}
        </div>
      )}
      {initial > 0 && <p className="text-center text-xs text-muted">Tipp: Bewerte ehrlich – „Nochmal“ ist kein Fehler, sondern hilft dem Algorithmus.</p>}
    </div>
  );
}
