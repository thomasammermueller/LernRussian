import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { ALL_TOPICS as TOPICS } from '../../content/vocab';
import { db } from '../../core/db';
import { Button, Card, PageHeader } from '../../ui/ui';
import { dedupe, downloadText, parseCsv, toCsv, type CsvRow } from './csv';
import { addUserWord, createSet, loadAllWords, topicTitle, useUserSets } from './useVocab';

export default function CsvPage() {
  const [params] = useSearchParams();
  const targetSet = params.get('set');
  const sets = useUserSets();
  const navigate = useNavigate();
  const [fileName, setFileName] = useState('');
  const [preview, setPreview] = useState<{ fresh: CsvRow[]; duplicates: CsvRow[]; errors: string[] } | null>(null);
  const [setName, setSetName] = useState('');
  const [busy, setBusy] = useState(false);

  const onFile = async (f: File) => {
    const { rows, errors } = parseCsv(await f.text());
    const { fresh, duplicates } = dedupe(rows, await loadAllWords());
    setFileName(f.name);
    setSetName(f.name.replace(/\.(csv|txt|tsv)$/i, ''));
    setPreview({ fresh, duplicates, errors });
  };

  const doImport = async () => {
    if (!preview) return;
    setBusy(true);
    const id = targetSet ?? (await createSet(setName.trim() || 'Importiert'));
    for (const r of preview.fresh) await addUserWord(id, r);
    navigate(`/woerter/thema/${id}`);
  };

  const exportAll = async () => {
    const words = await loadAllWords();
    downloadText('lernrussian-vokabeln.csv', toCsv(words, await db.cards.toArray(), (t) => topicTitle(t, sets)));
  };

  return (
    <div className="space-y-5">
      <PageHeader title="Import & Export" back="/woerter" />

      <Card className="space-y-3">
        <h2 className="font-semibold">CSV importieren{targetSet && ` in „${topicTitle(targetSet, sets)}“`}</h2>
        <p className="text-sm text-muted">
          Eine Zeile pro Wort, Trennzeichen Semikolon oder Komma. Spalten: <code>russisch;deutsch;lautschrift;beispiel_ru;beispiel_de</code> – nur die
          ersten beiden sind Pflicht. Eine Kopfzeile ist optional. Betonungszeichen (приве́т) werden übernommen.
        </p>
        <label className="inline-flex min-h-11 cursor-pointer items-center rounded-xl bg-accent px-4 font-semibold text-accent-ink">
          Datei wählen …
          <input type="file" accept=".csv,.txt,.tsv,text/csv,text/plain" className="hidden" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
        </label>
        {preview && (
          <div className="space-y-3 border-t border-line pt-3">
            <p className="text-sm">
              <b>{fileName}</b>: {preview.fresh.length} neue Wörter
              {preview.duplicates.length > 0 && `, ${preview.duplicates.length} schon vorhanden (werden übersprungen)`}
              {preview.errors.length > 0 && `, ${preview.errors.length} fehlerhafte Zeilen`}
            </p>
            {preview.fresh.length > 0 && (
              <div className="max-h-56 overflow-auto rounded-lg border border-line text-sm">
                <table className="w-full">
                  <tbody>
                    {preview.fresh.slice(0, 50).map((r) => (
                      <tr key={r.line} className="border-b border-line last:border-0">
                        <td lang="ru" className="px-3 py-1.5 font-serif">
                          {r.ru}
                        </td>
                        <td className="px-3 py-1.5">{r.de}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {preview.fresh.length > 50 && <p className="p-2 text-center text-muted">… und {preview.fresh.length - 50} weitere</p>}
              </div>
            )}
            {preview.errors.length > 0 && (
              <ul className="list-disc space-y-0.5 pl-5 text-sm text-bad">
                {preview.errors.slice(0, 5).map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            )}
            {!targetSet && (
              <label className="block">
                <span className="text-sm text-muted">Name des neuen Sets</span>
                <input value={setName} onChange={(e) => setSetName(e.target.value)} className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2" />
              </label>
            )}
            <Button onClick={doImport} disabled={!preview.fresh.length || busy}>
              {preview.fresh.length} Wörter importieren
            </Button>
          </div>
        )}
      </Card>

      <Card className="space-y-3">
        <h2 className="font-semibold">Exportieren</h2>
        <p className="text-sm text-muted">Alle Wörter mit Lernstatus als CSV (öffnet in Excel und Numbers). Einzelne Themen exportierst du auf der jeweiligen Themenseite.</p>
        <Button variant="secondary" onClick={exportAll}>
          Alle Wörter exportieren
        </Button>
        <p className="text-xs text-muted">
          {TOPICS.length} Themen · Vorlage: <Link to="/woerter/thema/begruessung" className="text-accent underline">Begrüßung</Link> exportieren und als Muster verwenden.
        </p>
      </Card>
    </div>
  );
}
