import { useEffect, useMemo, useRef, useState, type PointerEvent } from 'react';
import { STROKES, STROKE_VIEWBOX, splitStrokes } from '../../content/strokes';
import { scoreTrace, type Point, type TraceResult } from '../../core/tracing';
import { recordTrace } from '../../core/db';
import { Button } from '../../ui/ui';

export type TraceMode = 'guide' | 'start' | 'free';

const startPoint = (stroke: string): Point => {
  const [, x, y] = stroke.match(/M\s*([\d.]+)[ ,]+([\d.]+)/) ?? [];
  return { x: Number(x), y: Number(y) };
};

export default function TracePad({ glyph, letterId, mode }: { glyph: string; letterId: string; mode: TraceMode }) {
  const strokes = useMemo(() => splitStrokes(STROKES[glyph] ?? ''), [glyph]);
  const svgRef = useRef<SVGSVGElement>(null);
  const tplRefs = useRef<(SVGPathElement | null)[]>([]);
  const [user, setUser] = useState<Point[][]>([]);
  const drawing = useRef(false);
  const [result, setResult] = useState<TraceResult | null>(null);

  useEffect(() => {
    setUser([]);
    setResult(null);
  }, [glyph, mode]);

  const toSvg = (e: PointerEvent): Point => {
    const svg = svgRef.current!;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM()!.inverse());
    return { x: p.x, y: p.y };
  };

  const down = (e: PointerEvent<SVGSVGElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    setResult(null);
    setUser((u) => [...u, [toSvg(e)]]);
  };
  const move = (e: PointerEvent<SVGSVGElement>) => {
    if (!drawing.current) return;
    const p = toSvg(e);
    setUser((u) => {
      const copy = u.slice();
      copy[copy.length - 1] = [...copy[copy.length - 1], p];
      return copy;
    });
  };
  const up = () => {
    drawing.current = false;
  };

  const check = () => {
    const template = tplRefs.current.map((path) => {
      if (!path) return [];
      const len = path.getTotalLength();
      const pts: Point[] = [];
      for (let l = 0; l <= len; l += 2) {
        const p = path.getPointAtLength(l);
        pts.push({ x: p.x, y: p.y });
      }
      return pts;
    });
    const r = scoreTrace(template, user);
    setResult(r);
    recordTrace(letterId, r.score).catch(() => {});
  };

  const showGuide = mode === 'guide';
  const showStarts = mode !== 'free';

  return (
    <div className="space-y-3">
      <div className="relative mx-auto w-full max-w-xs overflow-hidden rounded-2xl border border-line bg-surface">
        <svg
          ref={svgRef}
          viewBox={STROKE_VIEWBOX}
          className="block w-full touch-none select-none"
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
          role="img"
          aria-label={`Schreibfeld für ${glyph}`}
        >
          {/* writing lines */}
          {[15, 45, 95].map((y) => (
            <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="var(--line)" strokeWidth="0.6" strokeDasharray={y === 95 ? undefined : '2 2'} />
          ))}
          {strokes.map((d, i) => (
            <path
              key={i}
              ref={(el) => {
                tplRefs.current[i] = el;
              }}
              d={d}
              fill="none"
              stroke={showGuide ? 'var(--surface-2)' : 'transparent'}
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
          {showGuide &&
            strokes.map((d, i) => (
              <path key={`g${i}`} d={d} fill="none" stroke="var(--line)" strokeWidth="1" strokeDasharray="2 2" />
            ))}
          {showStarts &&
            strokes.map((d, i) => {
              const p = startPoint(d);
              return (
                <g key={`s${i}`}>
                  <circle cx={p.x} cy={p.y} r="4" fill="var(--gold)" />
                  <text x={p.x} y={p.y + 1.6} fontSize="5" textAnchor="middle" fill="#fff" fontWeight="700">
                    {i + 1}
                  </text>
                </g>
              );
            })}
          {user.map((s, i) => (
            <polyline
              key={i}
              points={s.map((p) => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </svg>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Button variant="secondary" onClick={() => (setUser([]), setResult(null))}>
          Löschen
        </Button>
        <Button onClick={check} disabled={user.length === 0}>
          Prüfen
        </Button>
      </div>
      {result && (
        <p
          role="status"
          className={`rounded-xl p-3 text-center font-medium ${result.score >= 85 ? 'bg-ok-soft text-ok' : result.score >= 60 ? 'bg-warn-soft text-warn' : 'bg-bad-soft text-bad'}`}
        >
          {result.score} % – {result.feedback}
        </p>
      )}
    </div>
  );
}
