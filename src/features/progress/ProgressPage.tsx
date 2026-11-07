import { useLiveQuery } from 'dexie-react-hooks';
import { useRef, useState } from 'react';
import { ALPHABET } from '../../content/alphabet';
import { computeStreak, db, exportBackup, importBackup, isLetterLearned, today, type Backup } from '../../core/db';
import { setSetting, useSettings } from '../../core/settings';
import { hasRussianVoice, speak } from '../../core/speech';
import { Button, Card, PageHeader } from '../../ui/ui';
import { STAGE0 } from '../course/curriculum';

const WEEKDAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

export default function ProgressPage() {
  const settings = useSettings();
  const activity = useLiveQuery(() => db.activity.toArray(), []) ?? [];
  const lessons = useLiveQuery(() => db.lessons.toArray(), []) ?? [];
  const letters = useLiveQuery(() => db.letters.toArray(), []) ?? [];
  const [msg, setMsg] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const totalMin = Math.round(activity.reduce((s, a) => s + a.seconds, 0) / 60);
  const learned = letters.filter(isLetterLearned).length;
  const lessonsDone = lessons.filter((l) => l.done && STAGE0.some((s) => s.id === l.id)).length;
  const byLetter = new Map(letters.map((l) => [l.id, l]));

  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = today(d);
    return { label: WEEKDAYS[d.getDay()], min: Math.round((activity.find((a) => a.date === key)?.seconds ?? 0) / 60), isToday: i === 6 };
  });
  const maxMin = Math.max(settings.dailyGoalMinutes, ...last7.map((d) => d.min));

  const doExport = async () => {
    const data = await exportBackup();
    const blob = new Blob([JSON.stringify(data, null, 1)], { type: 'application/json' });
    const name = `lernrussian-backup-${today()}.json`;
    const file = new File([blob], name, { type: 'application/json' });
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title: 'LernRussian-Sicherung' }).catch(() => {});
    } else {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = name;
      a.click();
      URL.revokeObjectURL(a.href);
    }
    setMsg('Sicherung erstellt.');
  };

  const doImport = async (f: File) => {
    try {
      await importBackup(JSON.parse(await f.text()) as Backup);
      setMsg('Sicherung eingespielt ✓');
    } catch (e) {
      setMsg(`Fehler: ${(e as Error).message}`);
    }
  };

  return (
    <div className="space-y-5">
      <PageHeader title="Fortschritt" />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat value={`🔥 ${computeStreak(activity)}`} label="Tage in Folge" />
        <Stat value={totalMin < 60 ? `${totalMin} Min.` : `${(totalMin / 60).toFixed(1)} h`} label="Lernzeit gesamt" />
        <Stat value={`${learned}/33`} label="Buchstaben gelernt" />
        <Stat value={`${lessonsDone}/${STAGE0.length}`} label="Lektionen" />
      </div>

      <Card>
        <h2 className="mb-3 font-semibold">Lernzeit der letzten 7 Tage</h2>
        <div className="relative flex h-36 items-end gap-2" role="img" aria-label={last7.map((d) => `${d.label}: ${d.min} Minuten`).join(', ')}>
          <div className="pointer-events-none absolute inset-x-0 border-t border-dashed border-gold" style={{ bottom: `${(settings.dailyGoalMinutes / maxMin) * 100}%` }}>
            <span className="absolute -top-4 right-0 text-[10px] text-gold">Ziel</span>
          </div>
          {last7.map((d, i) => (
            <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
              <span className="text-[10px] text-muted">{d.min || ''}</span>
              <div
                className={`w-full max-w-8 rounded-t-md ${d.min >= settings.dailyGoalMinutes ? 'bg-ok' : 'bg-accent'} ${d.isToday ? '' : 'opacity-80'}`}
                style={{ height: `${(d.min / maxMin) * 100}%`, minHeight: d.min ? 4 : 0 }}
              />
            </div>
          ))}
        </div>
        <div className="mt-1 flex gap-2">
          {last7.map((d, i) => (
            <span key={i} className={`flex-1 text-center text-xs ${d.isToday ? 'font-semibold' : 'text-muted'}`}>
              {d.label}
            </span>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="mb-3 font-semibold">Alphabet</h2>
        <div className="grid grid-cols-11 gap-1" lang="ru">
          {ALPHABET.map((l) => {
            const p = byLetter.get(l.id);
            return (
              <div
                key={l.id}
                title={l.upper}
                className={`flex aspect-square items-center justify-center rounded text-sm ${
                  isLetterLearned(p) ? 'bg-ok text-white' : p?.seen ? 'bg-warn-soft text-warn' : 'bg-surface-2 text-muted'
                }`}
              >
                {l.upper}
              </div>
            );
          })}
        </div>
      </Card>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Einstellungen</h2>
        <Card className="space-y-4">
          <label className="block">
            <span className="text-sm text-muted">Dein Name (für die Begrüßung)</span>
            <input
              value={settings.name}
              onChange={(e) => setSetting('name', e.target.value)}
              className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2"
            />
          </label>
          <Choice
            label="Tagesziel (Minuten pro Tag)"
            value={settings.dailyGoalMinutes}
            options={[5, 10, 15, 20, 30].map((m) => ({ v: m, l: String(m) }))}
            onChange={(v) => setSetting('dailyGoalMinutes', v)}
          />
          <Choice
            label="Darstellung"
            value={settings.theme}
            options={[
              { v: 'system', l: 'System' },
              { v: 'light', l: 'Hell' },
              { v: 'dark', l: 'Dunkel' },
            ]}
            onChange={(v) => setSetting('theme', v)}
          />
          <Choice
            label="Sprechtempo"
            value={settings.speechRate}
            options={[
              { v: 0.7, l: 'Langsam' },
              { v: 0.9, l: 'Normal' },
              { v: 1.05, l: 'Schnell' },
            ]}
            onChange={(v) => {
              setSetting('speechRate', v);
              setTimeout(() => speak('Приве́т! Как дела́?'), 50);
            }}
          />
          {!hasRussianVoice() && (
            <p className="rounded-lg bg-warn-soft p-3 text-sm text-warn">
              Keine russische Stimme gefunden. Auf dem iPhone: Einstellungen → Bedienungshilfen → Gesprochene Inhalte → Stimmen → Russisch → „Milena“ laden.
            </p>
          )}
        </Card>

        <Card className="space-y-3">
          <h3 className="font-semibold">Daten sichern</h3>
          <p className="text-sm text-muted">
            Dein Lernstand liegt nur auf diesem Gerät. Erstelle regelmäßig eine Sicherung (z. B. in iCloud Drive) – damit kannst du ihn auch auf ein
            anderes Gerät übertragen.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button onClick={doExport}>Sicherung exportieren</Button>
            <Button variant="secondary" onClick={() => fileRef.current?.click()}>
              Sicherung importieren
            </Button>
            <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={(e) => e.target.files?.[0] && doImport(e.target.files[0])} />
          </div>
          {msg && <p role="status" className="text-sm font-medium">{msg}</p>}
        </Card>

        <Card className="space-y-2">
          <h3 className="font-semibold">Auf dem iPhone installieren</h3>
          <ol className="list-decimal space-y-1 pl-5 text-sm">
            <li>Diese Seite in Safari öffnen.</li>
            <li>Teilen-Symbol antippen (Quadrat mit Pfeil).</li>
            <li>„Zum Home-Bildschirm“ wählen.</li>
            <li>Die App startet jetzt im Vollbild und funktioniert offline.</li>
          </ol>
        </Card>
        <p className="text-center text-xs text-muted">LernRussian v{__APP_VERSION__}</p>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <Card className="text-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted">{label}</div>
    </Card>
  );
}

function Choice<T extends string | number>({ label, value, options, onChange }: { label: string; value: T; options: { v: T; l: string }[]; onChange: (v: T) => void }) {
  return (
    <div>
      <span className="text-sm text-muted">{label}</span>
      <div className="mt-1 flex gap-1 rounded-xl bg-surface-2 p-1 text-sm" role="radiogroup" aria-label={label}>
        {options.map((o) => (
          <button
            key={String(o.v)}
            role="radio"
            aria-checked={value === o.v}
            onClick={() => onChange(o.v)}
            className={`flex-1 rounded-lg px-2 py-1.5 ${value === o.v ? 'bg-surface font-semibold text-accent shadow-sm' : 'text-muted'}`}
          >
            {o.l}
          </button>
        ))}
      </div>
    </div>
  );
}
