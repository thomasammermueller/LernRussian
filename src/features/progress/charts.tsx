import { useState, type ReactNode } from 'react';

export interface BarDatum {
  label: string; // axis label (short)
  title: string; // tooltip title (long)
  value: number;
  ok?: boolean; // goal reached → status color
}

function Tooltip({ children }: { children: ReactNode }) {
  return <div className="pointer-events-none mb-1 h-5 text-center text-xs font-medium text-ink">{children}</div>;
}

/** Single-series bar chart with an optional goal line. Hover/tap a bar for its value. */
export function BarChart({ data, unit, goal, height = 140, labelEvery = 1 }: { data: BarDatum[]; unit: string; goal?: number; height?: number; labelEvery?: number }) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(1, goal ?? 0, ...data.map((d) => d.value)) * 1.1;
  const h = hover !== null ? data[hover] : null;
  return (
    <figure>
      <Tooltip>{h ? `${h.title}: ${h.value} ${unit}${h.ok ? ' · Ziel erreicht ✓' : ''}` : ' '}</Tooltip>
      <div className="relative" style={{ height }} role="img" aria-label={data.map((d) => `${d.title}: ${d.value} ${unit}`).join('; ')}>
        {[0.5, 1].map((f) => (
          <div key={f} className="absolute inset-x-0 border-t border-line/60" style={{ bottom: `${(f * max * 100) / max / 1.1}%` }} />
        ))}
        {goal !== undefined && (
          <div className="absolute inset-x-0 z-10 border-t border-dashed border-gold" style={{ bottom: `${(goal / max) * 100}%` }}>
            <span className="absolute -top-4 right-0 bg-surface px-1 text-[10px] text-muted">Ziel {goal}</span>
          </div>
        )}
        <div className="absolute inset-0 flex items-end gap-[2px]" onPointerLeave={() => setHover(null)}>
          {data.map((d, i) => (
            <div
              key={i}
              className="flex h-full flex-1 cursor-pointer items-end justify-center"
              onPointerEnter={() => setHover(i)}
              onPointerDown={() => setHover(i)}
            >
              <div
                className={`w-full max-w-6 rounded-t-[4px] transition-opacity ${d.ok ? 'bg-ok' : 'bg-accent'} ${hover !== null && hover !== i ? 'opacity-50' : ''}`}
                style={{ height: `${(d.value / max) * 100}%`, minHeight: d.value ? 2 : 0 }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-1 flex gap-[2px] border-t border-line pt-1">
        {data.map((d, i) => (
          <span key={i} className={`flex-1 text-center text-[10px] ${hover === i ? 'font-semibold text-ink' : 'text-muted'}`}>
            {i % labelEvery === 0 || i === data.length - 1 ? d.label : ''}
          </span>
        ))}
      </div>
    </figure>
  );
}

/** Single-series line (2px) with area tint and a crosshair tooltip. */
export function LineChart({ data, unit, height = 140 }: { data: { label: string; title: string; value: number }[]; unit: string; height?: number }) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 300;
  const H = 100;
  const max = Math.max(1, ...data.map((d) => d.value)) * 1.1;
  const x = (i: number) => (data.length < 2 ? W / 2 : (i / (data.length - 1)) * W);
  const y = (v: number) => H - (v / max) * H;
  const path = data.map((d, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join(' ');
  const h = hover !== null ? data[hover] : data[data.length - 1];
  return (
    <figure>
      <Tooltip>{h ? `${h.title}: ${h.value} ${unit}` : ' '}</Tooltip>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="block w-full touch-none overflow-visible"
        style={{ height }}
        role="img"
        aria-label={`${data[0]?.title}: ${data[0]?.value} bis ${data.at(-1)?.title}: ${data.at(-1)?.value} ${unit}`}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setHover(Math.round(((e.clientX - r.left) / r.width) * (data.length - 1)));
        }}
        onPointerLeave={() => setHover(null)}
      >
        <line x1="0" x2={W} y1={y(max / 1.1 / 2)} y2={y(max / 1.1 / 2)} stroke="var(--line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <path d={`${path} L${W},${H} L0,${H} Z`} fill="var(--accent)" opacity="0.12" />
        <path d={path} fill="none" stroke="var(--accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        {hover !== null && (
          <line x1={x(hover)} x2={x(hover)} y1="0" y2={H} stroke="var(--muted)" strokeWidth="1" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
        )}
      </svg>
      <div className="mt-1 flex justify-between border-t border-line pt-1 text-[10px] text-muted">
        <span>{data[0]?.label}</span>
        <span>{data.at(-1)?.label}</span>
      </div>
    </figure>
  );
}

/** Calendar heatmap: one column per week, one row per weekday, sequential shades of the accent. */
export function Heatmap({ days, goal }: { days: { date: Date; minutes: number }[]; goal: number }) {
  const [hover, setHover] = useState<number | null>(null);
  const level = (m: number) => (m <= 0 ? 0 : m < goal / 3 ? 1 : m < (goal * 2) / 3 ? 2 : m < goal ? 3 : 4);
  const OPACITY = [0, 0.25, 0.45, 0.7, 1];
  // pad start so that columns begin on Monday
  const first = (days[0].date.getDay() + 6) % 7;
  const cells: ({ date: Date; minutes: number } | null)[] = [...Array(first).fill(null), ...days];
  const weeks = Math.ceil(cells.length / 7);
  const h = hover !== null ? cells[hover] : null;
  return (
    <figure>
      <Tooltip>{h ? `${h.date.toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric', month: 'short' })}: ${h.minutes} Min.` : ' '}</Tooltip>
      <div className="flex gap-2">
        <div className="grid grid-rows-7 gap-[2px] text-[9px] leading-none text-muted">
          {['Mo', '', 'Mi', '', 'Fr', '', 'So'].map((d, i) => (
            <span key={i} className="flex items-center">
              {d}
            </span>
          ))}
        </div>
        <div
          className="grid flex-1 grid-flow-col grid-rows-7 gap-[2px]"
          style={{ gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))` }}
          onPointerLeave={() => setHover(null)}
          role="img"
          aria-label={`Lernkalender der letzten ${days.length} Tage, ${days.filter((d) => d.minutes > 0).length} Tage mit Lernzeit`}
        >
          {cells.map((c, i) => (
            <div
              key={i}
              onPointerEnter={() => c && setHover(i)}
              onPointerDown={() => c && setHover(i)}
              className="aspect-square rounded-[3px]"
              style={{
                background: c ? (level(c.minutes) ? 'var(--accent)' : 'var(--surface-2)') : 'transparent',
                opacity: c && level(c.minutes) ? OPACITY[level(c.minutes)] : 1,
                outline: hover === i ? '2px solid var(--ink)' : undefined,
              }}
            />
          ))}
        </div>
      </div>
      <div className="mt-2 flex items-center justify-end gap-1 text-[10px] text-muted">
        weniger
        {OPACITY.map((o, i) => (
          <span key={i} className="inline-block size-2.5 rounded-[2px]" style={{ background: i ? 'var(--accent)' : 'var(--surface-2)', opacity: i ? o : 1 }} />
        ))}
        mehr
      </div>
    </figure>
  );
}
