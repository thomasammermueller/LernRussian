import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router';
import { ALL_TOPICS as TOPICS } from '../../content/vocab';
import { useSettings } from '../../core/settings';
import { Button, Card, PageHeader, ProgressBar } from '../../ui/ui';
import { dueCards, introducedToday } from './queue';
import { countStatus, createSet, statusMap, useAllWords, useCards, useUserSets } from './useVocab';

export default function VocabPage() {
  const words = useAllWords();
  const cards = useCards();
  const sets = useUserSets();
  const settings = useSettings();
  const navigate = useNavigate();

  const status = useMemo(() => statusMap(cards ?? []), [cards]);
  const wordsById = useMemo(() => new Map(words.map((w) => [w.id, w])), [words]);
  const due = cards ? dueCards(cards, wordsById).length : 0;
  const newToday = cards ? introducedToday(cards) : 0;
  const total = countStatus(words, status);

  const groups = [
    ...TOPICS.map((t) => ({ id: t.id, emoji: t.emoji, title: t.title, words: t.words })),
    ...sets.map((s) => ({ id: s.id, emoji: s.emoji, title: s.name, words: words.filter((w) => w.topic === s.id) })),
  ];

  const newSet = async () => {
    const name = prompt('Name des neuen Sets:');
    if (name?.trim()) navigate(`/woerter/thema/${await createSet(name.trim())}`);
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Wörter"
        right={
          <Link to="/woerter/csv" className="rounded-lg px-3 py-2 text-sm font-semibold text-accent hover:bg-surface-2">
            CSV ⇅
          </Link>
        }
      />

      <Card className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{due} fällig</div>
            <div className="text-sm text-muted">
              Neue Wörter heute: {newToday}/{settings.newPerDay}
            </div>
          </div>
          <Button disabled={!due} onClick={() => navigate('/woerter/lernen')}>
            Wiederholen
          </Button>
        </div>
        <div className="flex gap-4 text-sm">
          <span>
            <span className="inline-block size-2.5 rounded-full bg-ok" /> {total.sicher} sicher
          </span>
          <span>
            <span className="inline-block size-2.5 rounded-full bg-warn" /> {total.lernend} lernend
          </span>
          <span>
            <span className="inline-block size-2.5 rounded-full bg-line" /> {total.neu} neu
          </span>
        </div>
      </Card>

      <section>
        <h2 className="mb-2 text-lg font-semibold">Themen</h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {groups.map((g) => {
            const c = countStatus(g.words, status);
            const n = g.words.length || 1;
            return (
              <li key={g.id}>
                <Link to={`/woerter/thema/${g.id}`} className="block h-full">
                  <Card className="h-full space-y-1 hover:bg-surface-2">
                    <div className="text-2xl">{g.emoji}</div>
                    <div className="leading-tight font-semibold">{g.title}</div>
                    <div className="text-xs text-muted">
                      {c.sicher + c.lernend}/{g.words.length} begonnen
                    </div>
                    <ProgressBar value={(c.sicher + c.lernend * 0.4) / n} />
                  </Card>
                </Link>
              </li>
            );
          })}
          <li>
            <button onClick={newSet} className="flex h-full min-h-28 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-line text-muted hover:bg-surface-2">
              <span className="text-2xl">＋</span>
              <span className="text-sm font-semibold">Eigenes Set</span>
            </button>
          </li>
        </ul>
      </section>
    </div>
  );
}
