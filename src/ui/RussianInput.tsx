import { useRef, useState, type KeyboardEvent } from 'react';
import { LAYOUTS, isTranslitChar, transliterate, type KeyboardLayout } from '../core/keyboard';
import { setSetting, useSettings } from '../core/settings';

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  disabled?: boolean;
  status?: 'correct' | 'almost' | 'wrong' | null;
}

/**
 * Text field for Russian answers.
 * - In-app keyboard (ЙЦУКЕН or phonetic), switchable – suppresses the iOS keyboard.
 * - Latin input from a physical keyboard is transliterated live (privet → привет, sch → ш).
 * - "System" mode uses the device keyboard (e.g. iOS Russian keyboard).
 */
export default function RussianInput({ value, onChange, onSubmit, placeholder, disabled, status }: Props) {
  const settings = useSettings();
  const mode = settings.keyboard;
  const [pending, setPending] = useState('');
  const [shift, setShift] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const typeLatin = (ch: string) => {
    const prefix = value.slice(0, value.length - transliterate(pending).length);
    const next = pending + ch;
    setPending(next);
    onChange(prefix + transliterate(next));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setPending('');
      onSubmit?.();
      return;
    }
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && isTranslitChar(e.key)) {
      e.preventDefault();
      typeLatin(e.key);
      return;
    }
    setPending('');
  };

  const press = (key: string) => {
    if (disabled) return;
    setPending('');
    if (key === '⌫') onChange(value.slice(0, -1));
    else if (key === '␣') onChange(value + ' ');
    else if (key === '⇧') {
      setShift((s) => !s);
      return;
    } else if (key === '↵') onSubmit?.();
    else onChange(value + (shift ? key.toUpperCase() : key));
    setShift(false);
  };

  const border =
    status === 'correct' ? 'border-ok bg-ok-soft' : status === 'almost' ? 'border-warn bg-warn-soft' : status === 'wrong' ? 'border-bad bg-bad-soft' : 'border-line bg-surface';

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        lang="ru"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        inputMode={mode === 'system' ? 'text' : 'none'}
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
        spellCheck={false}
        onChange={(e) => {
          setPending('');
          onChange(e.target.value);
        }}
        onKeyDown={onKeyDown}
        className={`w-full rounded-xl border-2 px-4 py-3 text-2xl outline-none focus:border-accent ${border}`}
      />
      <div className="flex gap-1 rounded-xl bg-surface-2 p-1 text-sm" role="radiogroup" aria-label="Tastatur">
        {(['phonetic', 'jcuken', 'system'] as const).map((m) => (
          <button
            key={m}
            type="button"
            role="radio"
            aria-checked={mode === m}
            onClick={() => setSetting('keyboard', m)}
            className={`flex-1 rounded-lg px-2 py-1.5 ${mode === m ? 'bg-surface font-semibold text-accent shadow-sm' : 'text-muted'}`}
          >
            {m === 'system' ? 'System' : LAYOUTS[m].label}
          </button>
        ))}
      </div>
      {mode !== 'system' && <OnScreenKeyboard layout={mode} shift={shift} onKey={press} />}
    </div>
  );
}

function OnScreenKeyboard({ layout, shift, onKey }: { layout: KeyboardLayout; shift: boolean; onKey: (k: string) => void }) {
  const rows = LAYOUTS[layout].rows;
  const key = (k: string, label = k, extra = '') => (
    <button
      key={k}
      type="button"
      onPointerDown={(e) => {
        e.preventDefault(); // keep focus/caret, avoid iOS double-tap zoom
        onKey(k);
      }}
      aria-label={k === '⌫' ? 'Löschen' : k === '␣' ? 'Leerzeichen' : k === '⇧' ? 'Großbuchstabe' : k === '↵' ? 'Prüfen' : k}
      className={`flex h-11 min-w-0 flex-1 items-center justify-center rounded-md text-lg shadow-sm ${/(^|\s)bg-/.test(extra) ? '' : 'bg-surface active:bg-accent-soft'} ${extra}`}
    >
      {label}
    </button>
  );
  return (
    <div lang="ru" className="space-y-1.5 rounded-xl bg-surface-2 p-1.5 select-none">
      {rows.map((row, i) => (
        <div key={i} className="flex gap-1">
          {i === rows.length - 1 && key('⇧', '⇧', `max-w-12 ${shift ? 'bg-accent text-accent-ink' : ''}`)}
          {row.map((k) => key(k, shift ? k.toUpperCase() : k))}
          {i === rows.length - 1 && key('⌫', '⌫', 'max-w-12')}
        </div>
      ))}
      <div className="flex gap-1">
        {key('␣', 'Leerzeichen', 'flex-[4] text-sm')}
        {key('↵', 'Prüfen', 'flex-[1.5] bg-accent text-sm font-semibold text-accent-ink')}
      </div>
    </div>
  );
}
