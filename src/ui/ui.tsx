import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router';
import { speak } from '../core/speech';

export function PageHeader({ title, back, right }: { title: string; back?: string; right?: ReactNode }) {
  return (
    <header className="flex items-center gap-2 py-4">
      {back && (
        <Link to={back} aria-label="Zurück" className="-ml-2 rounded-full p-2 text-accent hover:bg-surface-2">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Link>
      )}
      <h1 className="flex-1 text-2xl font-bold tracking-tight">{title}</h1>
      {right}
    </header>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  const bg = /(^|\s)bg-/.test(className) ? '' : 'bg-surface';
  return <div className={`rounded-2xl border border-line p-4 shadow-sm ${bg} ${className}`}>{children}</div>;
}

type Variant = 'primary' | 'secondary' | 'ghost';
export function Button({
  variant = 'primary',
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const styles: Record<Variant, string> = {
    primary: 'bg-accent text-accent-ink hover:opacity-90',
    secondary: 'border border-line bg-surface text-ink hover:bg-surface-2',
    ghost: 'text-accent hover:bg-surface-2',
  };
  return (
    <button
      {...props}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2 font-semibold transition disabled:opacity-40 ${styles[variant]} ${className}`}
    />
  );
}

export function SpeakButton({ text, slow, label, className = '' }: { text: string; slow?: boolean; label?: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        speak(text, { slow });
      }}
      aria-label={label ?? `Anhören: ${text}`}
      className={`inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent hover:opacity-80 ${className}`}
    >
      {slow ? (
        <span aria-hidden className="text-lg">🐢</span>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          <path d="M11 5L6 9H3v6h3l5 4V5z" />
          <path d="M15.5 8.5a5 5 0 010 7M18.5 5.5a9 9 0 010 13" />
        </svg>
      )}
    </button>
  );
}

export function ProgressBar({ value, className = '' }: { value: number; className?: string }) {
  return (
    <div className={`h-2 overflow-hidden rounded-full bg-surface-2 ${className}`} role="progressbar" aria-valuenow={Math.round(value * 100)} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${Math.min(100, value * 100)}%` }} />
    </div>
  );
}

export function Ring({ value, size = 140, children }: { value: number; size?: number; children?: ReactNode }) {
  const r = (size - 14) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-2)" strokeWidth="12" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={value >= 1 ? 'var(--ok)' : 'var(--accent)'}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - Math.min(1, value))}
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  );
}

/** Renders Russian text; stress marks are kept (they are part of the learning content). */
export function Ru({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span lang="ru" className={className}>
      {children}
    </span>
  );
}
