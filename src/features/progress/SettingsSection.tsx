import { useEffect, useRef, useState } from 'react';
import { db, exportBackup, importBackup, today, type Backup } from '../../core/db';
import { WHISPER_SIZE_MB, loadWhisper, webSpeechAvailable, whisperDownloaded } from '../../core/recognition';
import { setSetting, useSettings, type Settings } from '../../core/settings';
import { hasRussianVoice, speak } from '../../core/speech';
import { Button, Card } from '../../ui/ui';

export default function SettingsSection() {
  const settings = useSettings();
  const [msg, setMsg] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

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
    await db.settings.put({ key: 'lastBackup', value: Date.now() });
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
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">Einstellungen</h2>
      <Card className="space-y-4">
        <label className="block">
          <span className="text-sm text-muted">Dein Name (für die Begrüßung)</span>
          <input value={settings.name} onChange={(e) => setSetting('name', e.target.value)} className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2" />
        </label>
        <Choice
          label="Tagesziel (Minuten pro Tag)"
          value={settings.dailyGoalMinutes}
          options={[5, 10, 15, 20, 30].map((m) => ({ v: m, l: String(m) }))}
          onChange={(v) => setSetting('dailyGoalMinutes', v)}
        />
        <Choice
          label="Neue Wörter pro Tag"
          value={settings.newPerDay}
          options={[5, 10, 15, 20, 30].map((m) => ({ v: m, l: String(m) }))}
          onChange={(v) => setSetting('newPerDay', v)}
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
          <p className="rounded-lg bg-surface-2 p-3 text-sm text-muted">
            Tipp: Für eigene Wörter ohne Aufnahme nutzt die App die Systemstimme. Auf dem iPhone: Einstellungen → Bedienungshilfen → Gesprochene Inhalte →
            Stimmen → Russisch → „Milena“ laden.
          </p>
        )}
      </Card>

      <SpeechSettings settings={settings} />

      <Card className="space-y-3">
        <h3 className="font-semibold">Daten sichern</h3>
        <p className="text-sm text-muted">
          Dein Lernstand liegt nur auf diesem Gerät. Erstelle regelmäßig eine Sicherung (z. B. in iCloud Drive) – damit kannst du ihn auch auf ein anderes
          Gerät übertragen.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button onClick={doExport}>Sicherung exportieren</Button>
          <Button variant="secondary" onClick={() => fileRef.current?.click()}>
            Sicherung importieren
          </Button>
          <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={(e) => e.target.files?.[0] && doImport(e.target.files[0])} />
        </div>
        {msg && (
          <p role="status" className="text-sm font-medium">
            {msg}
          </p>
        )}
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
  );
}

function SpeechSettings({ settings }: { settings: Settings }) {
  const [ready, setReady] = useState<boolean | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    whisperDownloaded().then(setReady);
  }, []);
  const download = async () => {
    setError('');
    setProgress(0);
    try {
      await loadWhisper(setProgress);
      setReady(true);
    } catch (e) {
      setError(`Download fehlgeschlagen: ${(e as Error).message}`);
    } finally {
      setProgress(null);
    }
  };
  return (
    <Card className="space-y-3">
      <h3 className="font-semibold">Spracherkennung</h3>
      <Choice
        label="Erkennung"
        value={settings.speechEngine}
        options={[
          { v: 'auto', l: 'Automatisch' },
          { v: 'webspeech', l: 'Safari (online)' },
          { v: 'whisper', l: 'Offline' },
        ]}
        onChange={(v) => setSetting('speechEngine', v)}
      />
      <ul className="space-y-1 text-sm text-muted">
        <li>
          <b className="text-ink">Safari (online):</b> {webSpeechAvailable() ? 'verfügbar ✓' : 'in diesem Browser nicht verfügbar'} – schnell, braucht Internet.
        </li>
        <li>
          <b className="text-ink">Offline (Whisper):</b> {ready ? 'geladen ✓' : `einmalig ${WHISPER_SIZE_MB} MB laden`} – läuft komplett auf dem Gerät, erkennt ganze Sätze
          sehr gut, einzelne kurze Wörter weniger.
        </li>
        <li>„Automatisch“ nimmt Safari, wenn Internet da ist, sonst Whisper.</li>
      </ul>
      {!ready && (
        <Button variant="secondary" onClick={download} disabled={progress !== null}>
          {progress !== null ? `Lade … ${Math.round(progress * 100)} %` : `Offline-Erkennung laden (${WHISPER_SIZE_MB} MB)`}
        </Button>
      )}
      {error && <p className="text-sm text-bad">{error}</p>}
    </Card>
  );
}

export function Choice<T extends string | number>({ label, value, options, onChange }: { label: string; value: T; options: { v: T; l: string }[]; onChange: (v: T) => void }) {
  return (
    <div>
      {label && <span className="text-sm text-muted">{label}</span>}
      <div className={`${label ? 'mt-1' : ''} flex gap-1 rounded-xl bg-surface-2 p-1 text-sm`} role="radiogroup" aria-label={label || undefined}>
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
