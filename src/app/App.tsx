import { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { useSettings } from '../core/settings';
import { setSpeechRate } from '../core/speech';
import { useActivityTracker } from './useActivityTracker';
import TabBar from './TabBar';
import TodayPage from '../features/today/TodayPage';
import CoursePage from '../features/course/CoursePage';
import AlphabetLessonPage from '../features/course/AlphabetLessonPage';
import ReadingTestPage from '../features/course/ReadingTestPage';
import VocabPage from '../features/vocab/VocabPage';
import TopicPage from '../features/vocab/TopicPage';
import StudyPage from '../features/vocab/StudyPage';
import CsvPage from '../features/vocab/CsvPage';
import ReferencePage from '../features/reference/ReferencePage';
import AlphabetTablePage from '../features/alphabet/AlphabetTablePage';
import LetterDetailPage from '../features/alphabet/LetterDetailPage';
import KeyboardTrainerPage from '../features/keyboard/KeyboardTrainerPage';
import ProgressPage from '../features/progress/ProgressPage';
import LessonPage from '../features/lesson/LessonPage';
import GrammarPage from '../features/reference/GrammarPage';

export default function App() {
  const settings = useSettings();
  useActivityTracker();

  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', settings.theme);
  }, [settings.theme]);

  useEffect(() => setSpeechRate(settings.speechRate), [settings.speechRate]);

  return (
    <div className="min-h-dvh md:flex">
      <TabBar />
      <main className="mx-auto w-full max-w-2xl px-4 pt-safe pb-28 md:pb-10">
        <Routes>
          <Route path="/" element={<TodayPage />} />
          <Route path="/kurs" element={<CoursePage />} />
          <Route path="/kurs/alphabet/:group" element={<AlphabetLessonPage />} />
          <Route path="/kurs/lesetest" element={<ReadingTestPage />} />
          <Route path="/kurs/lektion/:id" element={<LessonPage />} />
          <Route path="/nachschlagen/grammatik" element={<GrammarPage />} />
          <Route path="/woerter" element={<VocabPage />} />
          <Route path="/woerter/thema/:id" element={<TopicPage />} />
          <Route path="/woerter/lernen" element={<StudyPage />} />
          <Route path="/woerter/csv" element={<CsvPage />} />
          <Route path="/nachschlagen" element={<ReferencePage />} />
          <Route path="/nachschlagen/alphabet" element={<AlphabetTablePage />} />
          <Route path="/nachschlagen/alphabet/:id" element={<LetterDetailPage />} />
          <Route path="/nachschlagen/tastatur" element={<KeyboardTrainerPage />} />
          <Route path="/fortschritt" element={<ProgressPage />} />
          <Route path="*" element={<TodayPage />} />
        </Routes>
      </main>
    </div>
  );
}
