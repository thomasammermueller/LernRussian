import { NavLink } from 'react-router';

const TABS = [
  { to: '/', label: 'Heute', icon: HomeIcon },
  { to: '/kurs', label: 'Kurs', icon: BookIcon },
  { to: '/woerter', label: 'Wörter', icon: CardsIcon },
  { to: '/nachschlagen', label: 'Nachschlagen', icon: LetterIcon },
  { to: '/fortschritt', label: 'Fortschritt', icon: ChartIcon },
];

export default function TabBar() {
  return (
    <nav
      aria-label="Hauptnavigation"
      className="pb-safe fixed inset-x-0 bottom-0 z-20 border-t border-line bg-surface/95 backdrop-blur md:sticky md:top-0 md:h-dvh md:w-56 md:shrink-0 md:border-t-0 md:border-r md:pt-6"
    >
      <div className="hidden px-5 pb-6 font-serif text-xl font-bold text-accent md:block">LernRussian</div>
      <ul className="mx-auto flex max-w-2xl justify-around md:flex-col md:gap-1 md:px-3">
        {TABS.map(({ to, label, icon: Icon }) => (
          <li key={to} className="flex-1 md:flex-none">
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 py-2 text-[11px] md:flex-row md:gap-3 md:rounded-lg md:px-3 md:py-2.5 md:text-sm ${
                  isActive ? 'font-semibold text-accent md:bg-accent-soft' : 'text-muted'
                }`
              }
            >
              <Icon />
              <span className="truncate">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const svg = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };

function HomeIcon() {
  return (
    <svg {...svg}>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v10h14V10" />
    </svg>
  );
}
function BookIcon() {
  return (
    <svg {...svg}>
      <path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2V5z" />
      <path d="M4 19a2 2 0 012-2h13" />
    </svg>
  );
}
function CardsIcon() {
  return (
    <svg {...svg}>
      <rect x="3" y="7" width="14" height="13" rx="2" />
      <path d="M7 4h12a2 2 0 012 2v11" />
    </svg>
  );
}
function LetterIcon() {
  return (
    <svg {...svg}>
      <path d="M12 4v16M4 4l8 8 8-8M4 20l8-8 8 8" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg {...svg}>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </svg>
  );
}
