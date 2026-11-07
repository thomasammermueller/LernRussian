import type { GrammarBlock } from '../../content/lessons/types';
import RichText from './RichText';

export default function GrammarView({ title, blocks }: { title: string; blocks: GrammarBlock[] }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">📐 {title}</h2>
      {blocks.map((b, i) => {
        if ('h' in b) return <h3 key={i} className="font-semibold">{b.h}</h3>;
        if ('p' in b) return <p key={i}><RichText text={b.p} /></p>;
        if ('tip' in b)
          return (
            <p key={i} className="rounded-xl border-l-4 border-gold bg-warn-soft p-3 text-sm">
              💡 <RichText text={b.tip} />
            </p>
          );
        return (
          <div key={i} className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full text-left text-sm">
              {b.table.head && (
                <thead className="bg-surface-2">
                  <tr>
                    {b.table.head.map((h, j) => (
                      <th key={j} className="px-3 py-2 font-semibold">
                        <RichText text={h} />
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {b.table.rows.map((r, j) => (
                  <tr key={j} className="border-t border-line">
                    {r.map((c, k) => (
                      <td key={k} className={`px-3 py-2 ${/[Ѐ-ӿ]/.test(c) ? 'font-serif text-base' : ''}`}>
                        <RichText text={c} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </section>
  );
}
