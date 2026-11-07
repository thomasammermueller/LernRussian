import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo, useState } from 'react';
import { ALPHABET } from '../../content/alphabet';
import { ALL_LESSONS } from '../../content/lessons';
import { computeStreak, db, isLetterLearned } from '../../core/db';
import { useSettings } from '../../core/settings';
import { Card, PageHeader, SpeakButton } from '../../ui/ui';
import { STAGE0 } from '../course/curriculum';
import { countStatus, statusMap, useAllWords, useCards } from '../vocab/useVocab';
import { BarChart, Heatmap, LineChart } from './charts';
import SettingsSection, { Choice } from './SettingsSection';
import { WEEKDAY, dailyMinutes, dueForecast, fmtDay, hardestCards, vocabGrowth } from './stats';

export default function ProgressPage() {
  const settings = useSettings();
  const activity = useLiveQuery(() => db.activity.toArray(), []) ?? [];
  const lessons = useLiveQuery(() => db.lessons.toArray(), []) ?? [];
  const letters = useLiveQuery(() => db.letters.toArray(), []) ?? [];
  const pron = useLiveQuery(() => db.pronunciations.toArray(), []) ?? [];
  const reviews = useLiveQuery(() => db.reviews.where('at').above(Date.now() - 30 * 86400_000).toArray(), []) ?? [];
  const words = useAllWords();
  const cards = useCards() ?? [];
  const [range, setRange] = useState<7 | 30>(7);

  const wordCounts = countStatus(words, statusMap(cards));
  const accuracy = reviews.length ? Math.round((reviews.filter((r) => r.rating >= 3).length / reviews.length) * 100) : null;
  const totalMin = Math.round(activity.reduce((s, a) => s + a.seconds, 0) / 60);
  const learned = letters.filter(isLetterLearned).length;
  const doneIds = new Set(lessons.filter((l) => l.done).map((l) => l.id));
  const courseItems = [...STAGE0.map((s) => s.id), ...ALL_LESSONS.map((l) => l.id)];
  const lessonsDone = courseItems.filter((id) => doneIds.has(id)).length;
  const pronAvg = pron.length ? Math.round(pron.reduce((a, p) => a + p.score, 0) / pron.length) : null;
  const byLetter = new Map(letters.map((l) => [l.id, l]));
  const wordsById = useMemo(() => new Map(words.map((w) => [w.id, w])), [words]);

  const minutes = dailyMinutes(activity, range);
  const heat = dailyMinutes(activity, 7 * 16);
  const growth = vocabGrowth(cards, 30);
  const forecast = dueForecast(cards, 7);
  const hardest = hardestCards(cards).map((c) => ({ c, w: wordsById.get(c.wordId) })).filter((x) => x.w);

  return (
    <div className="space-y-5">
      <PageHeader title="Fortschritt" />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat value={`🔥 ${computeStreak(activity)}`} label="Tage in Folge" />
        <Stat value={totalMin < 60 ? `${totalMin} Min.` : `${(totalMin / 60).toFixed(1)} h`} label="Lernzeit gesamt" />
        <Stat value={`${lessonsDone}/${courseItems.length}`} label="Lektionen" />
        <Stat value={`${learned}/33`} label="Buchstaben" />
        <Stat value={`${wordCounts.sicher}`} label="Wörter sicher" />
        <Stat value={`${wordCounts.lernend}`} label="Wörter in Arbeit" />
        <Stat value={accuracy === null ? '–' : `${accuracy} %`} label="gewusst (30 Tage)" />
        <Stat value={pronAvg === null ? '–' : `${pronAvg} %`} label="Aussprache Ø" />
      </div>

      <Card className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-semibold">Lernzeit (Minuten)</h2>
          <div className="w-32">
            <Choice label="" value={range} options={[{ v: 7 as const, l: '7 T.' }, { v: 30 as const, l: '30 T.' }]} onChange={setRange} />
          </div>
        </div>
        <BarChart
          data={minutes.map((d) => ({ label: range === 7 ? WEEKDAY(d.date) : String(d.date.getDate()), title: fmtDay(d.date), value: d.minutes, ok: d.minutes >= settings.dailyGoalMinutes }))}
          unit="Min."
          goal={settings.dailyGoalMinutes}
          labelEvery={range === 7 ? 1 : 5}
        />
      </Card>

      <Card className="space-y-2">
        <h2 className="font-semibold">Lernkalender</h2>
        <Heatmap days={heat} goal={settings.dailyGoalMinutes} />
      </Card>

      <div className="grid gap-5 sm:grid-cols-2">
        <Card className="space-y-2">
          <h2 className="font-semibold">Wörter im Training</h2>
          <LineChart data={growth.map((g) => ({ label: fmtDay(g.date), title: fmtDay(g.date), value: g.value }))} unit="Wörter" />
        </Card>
        <Card className="space-y-2">
          <h2 className="font-semibold">Fällige Wiederholungen</h2>
          <BarChart data={forecast.map((f, i) => ({ label: i === 0 ? 'heute' : WEEKDAY(f.date), title: i === 0 ? 'Heute (inkl. überfällig)' : fmtDay(f.date), value: f.value }))} unit="Karten" />
        </Card>
      </div>

      {hardest.length > 0 && (
        <Card>
          <h2 className="mb-2 font-semibold">Schwierigste Wörter</h2>
          <ul className="divide-y divide-line">
            {hardest.map(({ c, w }) => (
              <li key={c.id} className="flex items-center gap-3 py-2">
                <div className="flex-1">
                  <span lang="ru" className="font-serif text-lg">
                    {w!.ru}
                  </span>{' '}
                  <span className="text-sm text-muted">· {w!.de}</span>
                </div>
                <span className="text-xs text-muted">{c.lapses}× vergessen</span>
                <SpeakButton text={w!.ru} />
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card>
        <h2 className="mb-3 font-semibold">Alphabet</h2>
        <div className="grid grid-cols-11 gap-1" lang="ru">
          {ALPHABET.map((l) => {
            const p = byLetter.get(l.id);
            return (
              <div
                key={l.id}
                title={`${l.upper}: ${isLetterLearned(p) ? 'gelernt' : p?.seen ? 'gesehen' : 'neu'}`}
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

      <SettingsSection />
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
