import { useLiveQuery } from 'dexie-react-hooks';
import { Link } from 'react-router';
import { db } from '../../core/db';
import { Card, PageHeader } from '../../ui/ui';
import { ALL_LESSONS } from '../../content/lessons';
import { STAGE0, UNITS } from './curriculum';

export default function CoursePage() {
  const lessons = useLiveQuery(() => db.lessons.toArray(), []) ?? [];
  const byId = new Map(lessons.map((l) => [l.id, l]));
  const doneCount = STAGE0.filter((i) => byId.get(i.id)?.done).length;

  return (
    <div className="space-y-6">
      <PageHeader title="Kurs" />
      <section>
        <div className="mb-2 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold">0 · Alphabet</h2>
          <span className="text-sm text-muted">
            {doneCount}/{STAGE0.length}
          </span>
        </div>
        <Card className="divide-y divide-line p-0">
          {STAGE0.map((item) => {
            const p = byId.get(item.id);
            return (
              <Link key={item.id} to={item.to} className="flex items-center gap-3 p-4 hover:bg-surface-2">
                <span
                  aria-label={p?.done ? 'abgeschlossen' : p ? 'begonnen' : 'offen'}
                  className={`flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                    p?.done ? 'bg-ok text-white' : p ? 'bg-warn-soft text-warn' : 'bg-surface-2 text-muted'
                  }`}
                >
                  {p?.done ? '✓' : item.id}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-medium">{item.title}</div>
                  <div className="truncate text-sm text-muted">{item.subtitle}</div>
                </div>
                {p && <span className="text-sm text-muted">{p.bestScore} %</span>}
              </Link>
            );
          })}
        </Card>
      </section>

      {(['A1', 'A2'] as const).map((level) => (
        <section key={level}>
          <h2 className="mb-2 text-lg font-semibold">{level}</h2>
          <Card className="divide-y divide-line p-0">
            {UNITS.filter((u) => u.level === level).map((u) => {
              const lessons = ALL_LESSONS.filter((l) => l.unit === u.n);
              if (lessons.length)
                return (
                  <div key={u.n}>
                    <div className="flex items-center gap-3 bg-surface-2 p-4">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-ink">{u.n}</span>
                      <div className="flex-1">
                        <div lang="ru" className="font-semibold">
                          {u.ru}
                        </div>
                        <div className="text-sm text-muted">{u.de}</div>
                      </div>
                      <span className="text-sm text-muted">
                        {lessons.filter((l) => byId.get(l.id)?.done).length}/{lessons.length}
                      </span>
                    </div>
                    {lessons.map((l) => {
                      const p = byId.get(l.id);
                      return (
                        <Link key={l.id} to={`/kurs/lektion/${l.id}`} className="flex items-center gap-3 border-t border-line p-4 pl-6 hover:bg-surface-2">
                          <span
                            className={`flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                              p?.done ? 'bg-ok text-white' : p ? 'bg-warn-soft text-warn' : 'bg-surface-2 text-muted'
                            }`}
                          >
                            {p?.done ? '✓' : l.checkpoint ? '🏁' : l.id}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div lang="ru" className="font-medium">
                              {l.title.ru}
                            </div>
                            <div className="truncate text-sm text-muted">{l.title.de}</div>
                          </div>
                          {p && p.bestScore > 0 && <span className="text-sm text-muted">{p.bestScore} %</span>}
                        </Link>
                      );
                    })}
                  </div>
                );
              return (
              <div key={u.n} className="flex items-center gap-3 p-4 opacity-60">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface-2 text-sm font-semibold text-muted">{u.n}</span>
                <div className="flex-1">
                  <div lang="ru" className="font-medium">
                    {u.ru}
                  </div>
                  <div className="text-sm text-muted">{u.de}</div>
                </div>
                <span className="text-xs text-muted">bald</span>
              </div>
              );
            })}
          </Card>
        </section>
      ))}
    </div>
  );
}
