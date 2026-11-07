import { Fragment } from 'react';

const CYR = /[Ѐ-ӿ]/;

/** Renders **bold** and *italic*; Cyrillic runs get lang="ru". */
export default function RichText({ text, className = '' }: { text: string; className?: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);
  return (
    <span className={className}>
      {parts.map((p, i) => {
        if (p.startsWith('**')) return <b key={i} lang={CYR.test(p) ? 'ru' : undefined} className="text-accent">{p.slice(2, -2)}</b>;
        if (p.startsWith('*')) return <i key={i} lang={CYR.test(p) ? 'ru' : undefined}>{p.slice(1, -1)}</i>;
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </span>
  );
}
