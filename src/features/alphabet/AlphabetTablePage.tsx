import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import { Link } from 'react-router';
import { ALPHABET, GROUPS, type LetterGroup } from '../../content/alphabet';
import { db, isLetterLearned } from '../../core/db';
import { PageHeader } from '../../ui/ui';

export default function AlphabetTablePage() {
  const [filter, setFilter] = useState<LetterGroup | 0>(0);
  const progress = useLiveQuery(() => db.letters.toArray(), []) ?? [];
  const byId = new Map(progress.map((p) => [p.id, p]));
  const list = filter ? ALPHABET.filter((l) => l.group === filter) : ALPHABET;
  const learned = ALPHABET.filter((l) => isLetterLearned(byId.get(l.id))).length;

  return (
    <div>
      <PageHeader title="Alphabet" back="/nachschlagen" right={<span className="text-sm text-muted">{learned}/33 gelernt</span>} />
      <div className="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {([0, 1, 2, 3, 4] as const).map((g) => (
          <button
            key={g}
            onClick={() => setFilter(g)}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-sm ${filter === g ? 'border-accent bg-accent text-accent-ink' : 'border-line bg-surface'}`}
          >
            {g === 0 ? 'Alle' : GROUPS[g].title}
          </button>
        ))}
      </div>
      <ul className="grid grid-cols-4 gap-2 sm:grid-cols-6">
        {list.map((l) => {
          const p = byId.get(l.id);
          const state = isLetterLearned(p) ? 'border-ok bg-ok-soft' : p?.seen ? 'border-warn bg-warn-soft' : 'border-line bg-surface';
          return (
            <li key={l.id}>
              <Link to={`/nachschlagen/alphabet/${l.id}`} className={`flex aspect-square flex-col items-center justify-center rounded-xl border ${state}`}>
                <span lang="ru" className="font-serif text-3xl">
                  {l.upper}
                  {l.lower}
                </span>
                <span className="text-xs text-muted">[{l.sound}]</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 flex flex-wrap gap-4 text-xs text-muted">
        <span>🟩 gelernt</span>
        <span>🟧 gesehen</span>
        <span>⬜ neu</span>
      </p>
    </div>
  );
}
