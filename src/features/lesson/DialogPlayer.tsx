import { useEffect, useRef, useState } from 'react';
import type { Dialog, Speaker } from '../../content/lessons/types';
import { play, stopSpeaking } from '../../core/speech';
import RichText from './RichText';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function DialogPlayer({ dialog, speakers, showTranslitDefault }: { dialog: Dialog; speakers: Record<string, Speaker>; showTranslitDefault: boolean }) {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loop, setLoop] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [slow, setSlow] = useState(false);
  const [showDe, setShowDe] = useState(false);
  const [showTr, setShowTr] = useState(showTranslitDefault);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [notes, setNotes] = useState<Set<number>>(new Set());
  const run = useRef(0);
  const loopRef = useRef(loop);
  const shadowRef = useRef(shadow);
  loopRef.current = loop;
  shadowRef.current = shadow;
  const lineRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => () => {
    run.current++;
    stopSpeaking();
  }, []);

  useEffect(() => {
    lineRefs.current[idx]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [idx]);

  const playLine = (i: number) => {
    const line = dialog.lines[i];
    return play(line.ru, { voice: speakers[line.who]?.voice, rate: slow ? 0.75 : 1 });
  };

  const stop = () => {
    run.current++;
    setPlaying(false);
    stopSpeaking();
  };

  const playFrom = async (start: number) => {
    const token = ++run.current;
    setPlaying(true);
    let i = start;
    while (i < dialog.lines.length && run.current === token) {
      setIdx(i);
      const t0 = Date.now();
      await playLine(i);
      if (run.current !== token) return;
      if (shadowRef.current) await sleep((Date.now() - t0) * 1.2 + 600); // time to repeat aloud
      else await sleep(350);
      if (run.current !== token) return;
      if (!loopRef.current) i++;
    }
    if (run.current === token) setPlaying(false);
  };

  const tapLine = (i: number) => {
    stop();
    setIdx(i);
    setRevealed((r) => new Set(r).add(i));
    const token = ++run.current;
    setPlaying(true);
    void playLine(i).then(() => run.current === token && setPlaying(false));
  };

  const go = (d: number) => {
    const n = Math.max(0, Math.min(dialog.lines.length - 1, idx + d));
    if (playing) {
      stop();
      void playFrom(n);
    } else setIdx(n);
  };

  const toggle = (set: Set<number>, i: number) => {
    const n = new Set(set);
    if (n.has(i)) n.delete(i);
    else n.add(i);
    return n;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 text-sm">
        <Chip on={showDe} onClick={() => setShowDe(!showDe)}>
          Übersetzung
        </Chip>
        <Chip on={showTr} onClick={() => setShowTr(!showTr)}>
          Lautschrift
        </Chip>
        <Chip on={shadow} onClick={() => setShadow(!shadow)}>
          Nachsprechen
        </Chip>
      </div>
      {shadow && <p className="text-sm text-muted">Nach jedem Satz gibt es eine Pause – sprich ihn laut nach.</p>}

      <ul className="space-y-2">
        {dialog.lines.map((l, i) => {
          const sp = speakers[l.who];
          const active = i === idx;
          return (
            <li key={i} ref={(el) => {
              lineRefs.current[i] = el;
            }}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => tapLine(i)}
                onKeyDown={(e) => e.key === 'Enter' && tapLine(i)}
                className={`rounded-2xl border p-3 transition ${active ? 'border-accent bg-accent-soft' : 'border-line bg-surface'}`}
              >
                <div className="mb-0.5 flex items-center gap-2 text-xs text-muted">
                  <span aria-hidden>{sp?.emoji}</span>
                  <span lang="ru">{sp?.name}</span>
                  {active && playing && <span className="ml-auto animate-pulse text-accent">▶︎ spielt</span>}
                </div>
                <div lang="ru" className="font-serif text-xl leading-snug">
                  {l.ru}
                </div>
                {showTr && <div className="text-sm text-muted">[{l.translit}]</div>}
                {(showDe || revealed.has(i)) && <div className="mt-1 text-sm">{l.de}</div>}
                {l.note && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setNotes(toggle(notes, i));
                    }}
                    className="mt-1 text-xs font-semibold text-accent"
                  >
                    ⓘ {notes.has(i) ? 'Erklärung ausblenden' : 'Erklärung'}
                  </button>
                )}
                {l.note && notes.has(i) && (
                  <p className="mt-1 rounded-lg bg-surface-2 p-2 text-sm">
                    <RichText text={l.note} />
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <div className="sticky bottom-24 z-10 flex items-center justify-between gap-1 rounded-2xl border border-line bg-surface/95 p-2 shadow-lg backdrop-blur md:bottom-4">
        <CtrlButton label="Vorheriger Satz" onClick={() => go(-1)}>⏮</CtrlButton>
        <CtrlButton label="Satz wiederholen" onClick={() => tapLine(idx)}>↺</CtrlButton>
        <button
          onClick={() => (playing ? stop() : playFrom(idx))}
          aria-label={playing ? 'Pause' : 'Abspielen'}
          className="flex size-14 items-center justify-center rounded-full bg-accent text-2xl text-accent-ink"
        >
          {playing ? '❚❚' : '▶'}
        </button>
        <CtrlButton label="Nächster Satz" onClick={() => go(1)}>⏭</CtrlButton>
        <CtrlButton label="Satz in Schleife" active={loop} onClick={() => setLoop(!loop)}>🔁</CtrlButton>
        <CtrlButton label="Tempo" active={slow} onClick={() => setSlow(!slow)}>
          <span className="text-xs font-bold">{slow ? '0,75×' : '1×'}</span>
        </CtrlButton>
      </div>
    </div>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} aria-pressed={on} className={`rounded-full border px-3 py-1 ${on ? 'border-accent bg-accent text-accent-ink' : 'border-line bg-surface text-muted'}`}>
      {children}
    </button>
  );
}

function CtrlButton({ label, onClick, active, children }: { label: string; onClick: () => void; active?: boolean; children: React.ReactNode }) {
  return (
    <button onClick={onClick} aria-label={label} aria-pressed={active} className={`flex size-11 items-center justify-center rounded-full text-lg ${active ? 'bg-accent-soft text-accent' : 'text-ink hover:bg-surface-2'}`}>
      {children}
    </button>
  );
}
