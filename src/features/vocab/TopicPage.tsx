import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { topicById } from '../../content/vocab';
import { db } from '../../core/db';
import { useSettings } from '../../core/settings';
import { Button, Card, PageHeader, SpeakButton } from '../../ui/ui';
import { downloadText, toCsv } from './csv';
import { buildQueue } from './queue';
import { addUserWord, statusMap, topicTitle, useAllWords, useCards, useUserSets } from './useVocab';

const DOT = { neu: 'bg-line', lernend: 'bg-warn', sicher: 'bg-ok' } as const;

export default function TopicPage() {
  const { id = '' } = useParams();
  const words = useAllWords();
  const cards = useCards() ?? [];
  const sets = useUserSets();
  const settings = useSettings();
  const navigate = useNavigate();
  const builtin = topicById(id);
  const userSet = sets.find((s) => s.id === id);
  const list = useMemo(() => words.filter((w) => w.topic === id), [words, id]);
  const status = useMemo(() => statusMap(cards), [cards]);
  const queue = buildQueue(words, cards, { topic: id, newLimit: settings.newPerDay });
  const dueN = queue.filter((q) => q.kind === 'review').length;
  const newN = queue.length - dueN;

  if (!builtin && !userSet) return <PageHeader title="Set nicht gefunden" back="/woerter" />;
  const title = builtin?.title ?? userSet!.name;

  const exportCsv = () => downloadText(`${title}.csv`, toCsv(list, cards, (t) => topicTitle(t, sets)));

  const deleteSet = async () => {
    if (!confirm(`Set „${title}“ mit ${list.length} Wörtern löschen?`)) return;
    const now = Date.now();
    await db.transaction('rw', db.userSets, db.userWords, async () => {
      await db.userSets.update(id, { deleted: true, updatedAt: now });
      for (const w of list) await db.userWords.update(w.id, { deleted: true, updatedAt: now });
    });
    navigate('/woerter');
  };

  return (
    <div className="space-y-4">
      <PageHeader title={`${builtin?.emoji ?? userSet!.emoji} ${title}`} back="/woerter" />
      <Card className="flex items-center justify-between gap-3">
        <div className="text-sm">
          <div>
            <b>{dueN}</b> fällig · <b>{newN}</b> neu
          </div>
          {newN === 0 && list.some((w) => !status.has(w.id)) && <div className="text-muted">Tageslimit für neue Wörter erreicht</div>}
        </div>
        <Button disabled={!queue.length} onClick={() => navigate(`/woerter/lernen?thema=${encodeURIComponent(id)}`)}>
          Lernen
        </Button>
      </Card>

      {userSet && <AddWordForm setId={id} />}

      <Card className="divide-y divide-line p-0">
        {list.length === 0 && <p className="p-4 text-sm text-muted">Noch keine Wörter. Füge oben welche hinzu oder importiere eine CSV-Datei.</p>}
        {list.map((w) => (
          <div key={w.id} className="flex items-center gap-3 px-4 py-3">
            <span className={`size-2.5 shrink-0 rounded-full ${DOT[status.get(w.id) ?? 'neu']}`} title={status.get(w.id) ?? 'neu'} />
            <div className="min-w-0 flex-1">
              <div lang="ru" className="font-serif text-lg">
                {w.ru}
              </div>
              <div className="truncate text-sm text-muted">
                {w.translit && `[${w.translit}] · `}
                {w.de}
              </div>
            </div>
            <SpeakButton text={w.ru} />
            {userSet && (
              <button
                aria-label={`${w.ru} löschen`}
                className="rounded-full p-2 text-muted hover:bg-surface-2"
                onClick={() => db.userWords.update(w.id, { deleted: true, updatedAt: Date.now() })}
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </Card>

      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" onClick={exportCsv} disabled={!list.length}>
          Als CSV exportieren
        </Button>
        {userSet && (
          <>
            <Link to={`/woerter/csv?set=${id}`} className="inline-flex min-h-11 items-center rounded-xl border border-line bg-surface px-4 font-semibold">
              CSV importieren
            </Link>
            <Button variant="ghost" className="text-bad" onClick={deleteSet}>
              Set löschen
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

function AddWordForm({ setId }: { setId: string }) {
  const [ru, setRu] = useState('');
  const [de, setDe] = useState('');
  const [translit, setTranslit] = useState('');
  const valid = /[Ѐ-ӿ]/.test(ru) && de.trim();
  const add = async () => {
    if (!valid) return;
    await addUserWord(setId, { ru, de, translit });
    setRu('');
    setDe('');
    setTranslit('');
  };
  return (
    <Card className="space-y-2">
      <div className="font-semibold">Wort hinzufügen</div>
      <div className="grid gap-2 sm:grid-cols-3">
        <input lang="ru" value={ru} onChange={(e) => setRu(e.target.value)} placeholder="Russisch" className="rounded-lg border border-line bg-surface px-3 py-2" />
        <input value={de} onChange={(e) => setDe(e.target.value)} placeholder="Deutsch" className="rounded-lg border border-line bg-surface px-3 py-2" />
        <input value={translit} onChange={(e) => setTranslit(e.target.value)} placeholder="Lautschrift (optional)" className="rounded-lg border border-line bg-surface px-3 py-2" />
      </div>
      <Button onClick={add} disabled={!valid}>
        Hinzufügen
      </Button>
    </Card>
  );
}
