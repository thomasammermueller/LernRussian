import type { Letter } from '../../content/alphabet';
import { Card, SpeakButton } from '../../ui/ui';

export default function LetterInfo({ letter }: { letter: Letter }) {
  return (
    <Card className="space-y-4">
      <div className="flex items-center gap-4">
        <div lang="ru" className="font-serif text-8xl leading-none">
          {letter.upper}
          <span className="text-muted">{letter.lower}</span>
        </div>
        <div className="flex-1">
          <div className="text-3xl font-semibold">[{letter.sound}]</div>
          <div className="text-sm text-muted">
            Name: <span lang="ru">{letter.name}</span>
          </div>
        </div>
        <SpeakButton text={letter.name} label={`Buchstabe ${letter.upper} anhören`} />
      </div>
      <p>{letter.hint}</p>
      <ul className="divide-y divide-line rounded-xl border border-line">
        {letter.examples.map((ex) => (
          <li key={ex.ru} className="flex items-center gap-3 p-3">
            <div className="flex-1">
              <div lang="ru" className="font-serif text-2xl">
                {ex.ru}
              </div>
              <div className="text-sm text-muted">
                [{ex.translit}] · {ex.de}
              </div>
            </div>
            <SpeakButton text={ex.ru} />
          </li>
        ))}
      </ul>
    </Card>
  );
}
