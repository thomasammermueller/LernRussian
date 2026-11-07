import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import { db } from '../../core/db';
import { addReminderToCalendar } from '../../core/reminder';
import { setSetting, useSettings, type Settings } from '../../core/settings';
import { speak } from '../../core/speech';
import { Button } from '../../ui/ui';

/** Shows onboarding only on a fresh install (existing learners skip it). */
export function useNeedsOnboarding() {
  const settings = useSettings();
  const hasData = useLiveQuery(async () => (await db.activity.count()) + (await db.cards.count()) + (await db.lessons.count()) > 0, []);
  if (!settings.loaded || hasData === undefined) return false;
  return !settings.onboarded && !hasData;
}

const GOALS: { v: Settings['goal']; emoji: string; l: string; d: string }[] = [
  { v: 'reise', emoji: '✈️', l: 'Reisen', d: 'Unterwegs zurechtkommen' },
  { v: 'familie', emoji: '👪', l: 'Familie & Freunde', d: 'Mit Menschen sprechen, die mir wichtig sind' },
  { v: 'beruf', emoji: '💼', l: 'Beruf', d: 'Kollegen und Kunden verstehen' },
  { v: 'allgemein', emoji: '🌍', l: 'Allgemein', d: 'Einfach Russisch können' },
];

export default function Onboarding() {
  const settings = useSettings();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');

  const finish = async () => {
    if (name.trim()) await setSetting('name', name.trim());
    await setSetting('onboarded', true);
  };

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col px-4 pt-safe pb-safe">
      <div className="flex gap-1 py-6" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-accent' : 'bg-surface-2'}`} />
        ))}
      </div>

      {step === 0 && (
        <div className="flex flex-1 flex-col justify-center gap-6 text-center">
          <div lang="ru" className="font-serif text-6xl text-accent">
            Приве́т!
          </div>
          <div>
            <h1 className="text-2xl font-bold">Willkommen bei LernRussian</h1>
            <p className="mt-2 text-muted">Russisch von null bis A2 – in kurzen Einheiten, offline und ohne Abo.</p>
          </div>
          <label className="text-left">
            <span className="text-sm text-muted">Wie heißt du? (optional)</span>
            <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-xl border border-line bg-surface px-4 py-3 text-lg" />
          </label>
          <Button onClick={() => (speak('Приве́т!'), setStep(1))}>Los geht’s</Button>
        </div>
      )}

      {step === 1 && (
        <div className="flex flex-1 flex-col gap-4">
          <h1 className="text-2xl font-bold">Wofür lernst du Russisch?</h1>
          <p className="text-muted">Danach sortiert die App die Wortschatz-Themen.</p>
          {GOALS.map((g) => (
            <button
              key={g.v}
              onClick={() => setSetting('goal', g.v)}
              aria-pressed={settings.goal === g.v}
              className={`flex items-center gap-4 rounded-2xl border-2 p-4 text-left ${settings.goal === g.v ? 'border-accent bg-accent-soft' : 'border-line bg-surface'}`}
            >
              <span className="text-3xl">{g.emoji}</span>
              <span>
                <span className="block font-semibold">{g.l}</span>
                <span className="text-sm text-muted">{g.d}</span>
              </span>
            </button>
          ))}
          <Button className="mt-auto mb-6" onClick={() => setStep(2)}>
            Weiter
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-1 flex-col gap-4">
          <h1 className="text-2xl font-bold">Wie viel Zeit hast du pro Tag?</h1>
          <p className="text-muted">Lieber jeden Tag ein bisschen als selten viel – so behält man am meisten.</p>
          {[5, 10, 15, 20, 30].map((m) => (
            <button
              key={m}
              onClick={() => setSetting('dailyGoalMinutes', m)}
              aria-pressed={settings.dailyGoalMinutes === m}
              className={`rounded-2xl border-2 p-4 text-left font-semibold ${settings.dailyGoalMinutes === m ? 'border-accent bg-accent-soft' : 'border-line bg-surface'}`}
            >
              {m} Minuten {m === 15 && <span className="text-sm font-normal text-muted">· empfohlen</span>}
            </button>
          ))}
          <Button className="mt-auto mb-6" onClick={() => setStep(3)}>
            Weiter
          </Button>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-1 flex-col gap-4">
          <h1 className="text-2xl font-bold">Tägliche Erinnerung</h1>
          <p className="text-muted">Ein wiederkehrender Termin in deinem Kalender erinnert dich ans Lernen.</p>
          <label className="flex items-center gap-3">
            <span>Uhrzeit</span>
            <input
              type="time"
              value={settings.reminderTime}
              onChange={(e) => e.target.value && setSetting('reminderTime', e.target.value)}
              className="rounded-xl border border-line bg-surface px-4 py-3 text-lg"
            />
          </label>
          <Button variant="secondary" onClick={() => addReminderToCalendar(settings.reminderTime, settings.dailyGoalMinutes)}>
            📅 Zum Kalender hinzufügen
          </Button>
          <div className="rounded-2xl bg-surface-2 p-4 text-sm">
            <b>Tipp fürs iPhone:</b> In Safari auf „Teilen“ → „Zum Home-Bildschirm“. Dann startet LernRussian wie eine App und funktioniert offline.
          </div>
          <Button className="mt-auto mb-6" onClick={finish}>
            Fertig – los geht’s!
          </Button>
        </div>
      )}
    </div>
  );
}
