import { useEffect } from 'react';
import { addActivity } from '../core/db';

const TICK = 15; // seconds
const IDLE_AFTER = 60_000; // ms without interaction → not counted

/** Counts learning time while the app is visible and the user interacted recently. */
export function useActivityTracker() {
  useEffect(() => {
    let last = Date.now();
    const mark = () => {
      last = Date.now();
    };
    const events = ['pointerdown', 'keydown', 'touchstart'] as const;
    events.forEach((e) => window.addEventListener(e, mark, { passive: true }));
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible' && Date.now() - last < IDLE_AFTER) {
        addActivity(TICK).catch(() => {});
      }
    }, TICK * 1000);
    return () => {
      window.clearInterval(id);
      events.forEach((e) => window.removeEventListener(e, mark));
    };
  }, []);
}
