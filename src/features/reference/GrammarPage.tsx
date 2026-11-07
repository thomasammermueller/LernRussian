import { useState } from 'react';
import { Link } from 'react-router';
import { ALL_LESSONS } from '../../content/lessons';
import { PageHeader } from '../../ui/ui';
import GrammarView from '../lesson/GrammarView';

export default function GrammarPage() {
  const topics = ALL_LESSONS.flatMap((l) => l.grammar.map((g) => ({ lesson: l, g })));
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="space-y-3">
      <PageHeader title="Grammatik" back="/nachschlagen" />
      {topics.map(({ lesson, g }) => {
        const key = `${lesson.id}-${g.title}`;
        const isOpen = open === key;
        return (
          <div key={key} className="rounded-2xl border border-line bg-surface">
            <button onClick={() => setOpen(isOpen ? null : key)} className="flex w-full items-center gap-3 p-4 text-left" aria-expanded={isOpen}>
              <span className="text-xs font-semibold text-muted">{lesson.id}</span>
              <span className="flex-1 font-medium">{g.title}</span>
              <span className="text-muted">{isOpen ? '▾' : '▸'}</span>
            </button>
            {isOpen && (
              <div className="space-y-3 border-t border-line p-4">
                <GrammarView title={g.title} blocks={g.blocks} />
                <Link to={`/kurs/lektion/${lesson.id}`} className="text-sm font-semibold text-accent">
                  → Zur Lektion {lesson.id}
                </Link>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
