import { wordByRu } from '../../content/vocab';
import { SpeakButton } from '../../ui/ui';

export default function VocabStep({ words, showTranslit }: { words: string[]; showTranslit: boolean }) {
  return (
    <div className="space-y-3">
      <p className="text-muted">Tippe auf 🔊 und sprich jedes Wort laut nach. Nach der Lektion landen alle Wörter in deinem Vokabeltrainer.</p>
      <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
        {words.map((ru) => {
          const w = wordByRu(ru);
          return (
            <li key={ru} className="flex items-center gap-3 px-4 py-3">
              <div className="min-w-0 flex-1">
                <div lang="ru" className="font-serif text-xl">
                  {ru}
                </div>
                <div className="text-sm text-muted">
                  {showTranslit && w?.translit && `[${w.translit}] · `}
                  {w?.de}
                  {w?.note && <span className="italic"> – {w.note}</span>}
                </div>
              </div>
              <SpeakButton text={ru} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
