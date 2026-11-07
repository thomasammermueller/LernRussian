import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { Link } from 'react-router';
import { ALPHABET } from '../../content/alphabet';
import { computeStreak, db, isLetterLearned, today } from '../../core/db';
import { useSettings } from '../../core/settings';
import { Card, ProgressBar, Ring, SpeakButton } from '../../ui/ui';
import { COURSE_SEQUENCE } from '../course/curriculum';
import { dueCards, introducedToday } from '../vocab/queue';
import { useAllWords, useCards } from '../vocab/useVocab';
import { syncEnabled } from '../../core/sync';

const greeting = (h: number) => (h < 11 ? 'До́брое у́тро' : h < 18 ? 'До́брый день' : 'До́брый ве́чер');

const wordOfTheDay = () => {
  const all = ALPHABET.flatMap((l) => l.examples);
  const d = new Date();
  const n = d.getFullYear() * 400 + d.getMonth() * 31 + d.getDate();
  return all[n % all.length];
};

export default function TodayPage() {
  const settings = useSettings();
  const activity = useLiveQuery(() => db.activity.toArray(), []) ?? [];
  const lessons = useLiveQuery(() => db.lessons.toArray(), []) ?? [];
  const letters = useLiveQuery(() => db.letters.toArray(), []) ?? [];

  const minutes = Math.floor((activity.find((a) => a.date === today())?.seconds ?? 0) / 60);
  const streak = computeStreak(activity);
  const done = new Set(lessons.filter((l) => l.done).map((l) => l.id));
  const nextLesson = COURSE_SEQUENCE.find((i) => !done.has(i.id));
  const learned = letters.filter(isLetterLearned).length;
  const wod = wordOfTheDay();
  const words = useAllWords();
  const cards = useCards() ?? [];
  const wordsById = useMemo(() => new Map(words.map((w) => [w.id, w])), [words]);
  const due = dueCards(cards, wordsById).length;
  const newToday = introducedToday(cards);
  const lastBackup = useLiveQuery(() => db.settings.get('lastBackup'), [])?.value as number | undefined;
  const learnedDays = activity.filter((a) => a.seconds >= 60).length;
  const backupDue = !syncEnabled() && learnedDays >= 3 && (!lastBackup || Date.now() - lastBackup > 7 * 86400_000);

  return (
    <div className="space-y-4 pt-2">
      <header className="flex items-center justify-between py-3">
        <div>
          <p lang="ru" className="font-serif text-2xl font-bold">
            {greeting(new Date().getHours())}
            {settings.name ? `, ${settings.name}` : ''}!
          </p>
          <p className="text-sm text-muted">Schön, dass du da bist.</p>
        </div>
        <div className="text-right" aria-label={`${streak} Tage in Folge`}>
          <div className="text-2xl font-bold">🔥 {streak}</div>
          <div className="text-xs text-muted">{streak === 1 ? 'Tag' : 'Tage'} in Folge</div>
        </div>
      </header>

      <div className="flex justify-center py-2">
        <Ring value={minutes / settings.dailyGoalMinutes} size={150}>
          <span className="text-3xl font-bold">
            {minutes}
            <span className="text-lg text-muted">/{settings.dailyGoalMinutes}</span>
          </span>
          <span className="text-sm text-muted">Minuten heute</span>
        </Ring>
      </div>

      {nextLesson ? (
        <Link to={nextLesson.to} className="block">
          <Card className="border-accent bg-accent text-accent-ink">
            <div className="text-sm opacity-80">▶ Weiterlernen · Lektion {nextLesson.id}</div>
            <div className="text-xl font-semibold">{nextLesson.title}</div>
            <div className="text-sm opacity-80">{nextLesson.subtitle}</div>
          </Card>
        </Link>
      ) : (
        <Card className="border-ok bg-ok-soft">
          <div className="font-semibold text-ok">🎉 Alle verfügbaren Lektionen geschafft!</div>
          <div className="text-sm">Wiederhole täglich deine Wörter – weitere Einheiten kommen mit den nächsten Updates.</div>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Link to="/nachschlagen/alphabet">
          <Card className="h-full">
            <div className="text-2xl">🔤</div>
            <div className="font-semibold">Alphabet</div>
            <div className="mb-2 text-sm text-muted">{learned}/33 gelernt</div>
            <ProgressBar value={learned / 33} />
          </Card>
        </Link>
        <Link to={due ? '/woerter/lernen' : '/woerter'}>
          <Card className={`h-full ${due ? 'border-gold' : ''}`}>
            <div className="text-2xl">🗂</div>
            <div className="font-semibold">Wörter</div>
            <div className="text-sm text-muted">{due ? `${due} fällig – jetzt wiederholen` : `${newToday}/${settings.newPerDay} neue heute`}</div>
          </Card>
        </Link>
      </div>

      {backupDue && (
        <Link to="/fortschritt" className="block">
          <Card className="border-gold bg-warn-soft text-sm">
            💾 <b>Sichere deinen Lernstand:</b> Er liegt nur auf diesem Gerät. Richte unter Fortschritt die Synchronisation ein oder exportiere eine
            Sicherung.
          </Card>
        </Link>
      )}

      <Card className="flex items-center gap-3">
        <div className="flex-1">
          <div className="text-xs tracking-wide text-muted uppercase">Wort des Tages</div>
          <div lang="ru" className="font-serif text-2xl">
            {wod.ru}
          </div>
          <div className="text-sm text-muted">
            [{wod.translit}] · {wod.de}
          </div>
        </div>
        <SpeakButton text={wod.ru} />
      </Card>
    </div>
  );
}
