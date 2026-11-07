import { Link } from 'react-router';
import { Card, PageHeader } from '../../ui/ui';

const RESOURCES = [
  { name: 'Wiktionary (Russisch)', url: 'https://de.wiktionary.org/wiki/Verzeichnis:Russisch', desc: 'Wörterbuch mit Betonung und Deklinationstabellen' },
  { name: 'OpenRussian.org', url: 'https://en.openrussian.org/', desc: 'Freies Wörterbuch mit Aussprache und Beispielsätzen' },
  { name: 'Forvo', url: 'https://de.forvo.com/languages/ru/', desc: 'Aussprache von Muttersprachlern' },
  { name: 'Lingua Libre', url: 'https://lingualibre.org/', desc: 'Freie Wortaufnahmen von Muttersprachlern' },
  { name: 'Tatoeba', url: 'https://tatoeba.org/de/', desc: 'Beispielsätze Russisch–Deutsch, oft mit Audio' },
];

export default function ReferencePage() {
  return (
    <div className="space-y-4">
      <PageHeader title="Nachschlagen" />
      <div className="grid gap-3 sm:grid-cols-2">
        <Link to="/nachschlagen/alphabet">
          <Card className="h-full hover:bg-surface-2">
            <div className="text-2xl">🔤</div>
            <div className="font-semibold">Alphabet</div>
            <div className="text-sm text-muted">Alle 33 Buchstaben mit Aussprache und Schreibübung</div>
          </Card>
        </Link>
        <Link to="/nachschlagen/tastatur">
          <Card className="h-full hover:bg-surface-2">
            <div className="text-2xl">⌨️</div>
            <div className="font-semibold">Tastatur-Trainer</div>
            <div className="text-sm text-muted">Kyrillisch tippen lernen – phonetisch oder ЙЦУКЕН</div>
          </Card>
        </Link>
        <Link to="/nachschlagen/grammatik">
          <Card className="h-full hover:bg-surface-2">
            <div className="text-2xl">📐</div>
            <div className="font-semibold">Grammatik</div>
            <div className="text-sm text-muted">Alle Regeln aus den Lektionen zum Nachlesen</div>
          </Card>
        </Link>
      </div>
      <section>
        <h2 className="mb-2 text-lg font-semibold">Weiterführende Ressourcen</h2>
        <Card className="divide-y divide-line p-0">
          {RESOURCES.map((r) => (
            <a key={r.url} href={r.url} target="_blank" rel="noreferrer" className="block p-4 hover:bg-surface-2">
              <div className="font-medium text-accent">{r.name} ↗</div>
              <div className="text-sm text-muted">{r.desc}</div>
            </a>
          ))}
        </Card>
      </section>
    </div>
  );
}
