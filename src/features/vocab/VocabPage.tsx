import { Link } from 'react-router';
import { Card, PageHeader } from '../../ui/ui';

const TOPICS = ['👋 Begrüßung', '🔢 Zahlen', '📅 Wochentage', '🍞 Essen', '✈️ Reisen', '👪 Familie', '🎨 Farben', '🏙 Stadt'];

export default function VocabPage() {
  return (
    <div className="space-y-4">
      <PageHeader title="Wörter" />
      <Card className="bg-accent-soft">
        <div className="font-semibold">Der Vokabeltrainer kommt mit dem nächsten Update (v0.2)</div>
        <p className="mt-1 text-sm">
          Karteikarten mit intelligenter Wiederholung (FSRS), Themen-Sets, eigene Sets und CSV-Import/-Export. Bis dahin kannst du mit dem{' '}
          <Link to="/nachschlagen/tastatur" className="font-semibold text-accent underline">
            Tastatur-Trainer
          </Link>{' '}
          die ersten Wörter tippen.
        </p>
      </Card>
      <div className="grid grid-cols-2 gap-3 opacity-50 sm:grid-cols-4" aria-hidden>
        {TOPICS.map((t) => (
          <Card key={t} className="text-center text-sm">
            {t}
          </Card>
        ))}
      </div>
    </div>
  );
}
