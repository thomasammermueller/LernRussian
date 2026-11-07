/** Builds an iCalendar file with a daily learning reminder (opens in iOS Calendar with one tap). */
const pad = (n: number) => String(n).padStart(2, '0');
const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');

export function buildReminderIcs(opts: { time: string; minutes: number; url: string; now?: Date }): string {
  const now = opts.now ?? new Date();
  const [h, m] = opts.time.split(':').map(Number);
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
  if (start <= now) start.setDate(start.getDate() + 1);
  const local = (d: Date) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
  const utc = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//LernRussian//Erinnerung//DE',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:lernrussian-daily-${local(start)}@lernrussian`,
    `DTSTAMP:${utc(now)}`,
    `DTSTART:${local(start)}`, // floating time = always local time, also when travelling
    `DURATION:PT${opts.minutes}M`,
    'RRULE:FREQ=DAILY',
    `SUMMARY:${esc(`Russisch lernen (${opts.minutes} Min.)`)}`,
    `DESCRIPTION:${esc(`Zeit für deine tägliche Russisch-Einheit! Приве́т!\nApp öffnen: ${opts.url}`)}`,
    `URL:${opts.url}`,
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    'DESCRIPTION:Russisch lernen',
    'TRIGGER:PT0M',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ].join('\r\n');
}

/** Shares (iOS share sheet → Calendar) or downloads the reminder. */
export async function addReminderToCalendar(time: string, minutes: number) {
  const url = window.location.href.split('#')[0];
  const ics = buildReminderIcs({ time, minutes, url });
  const file = new File([ics], 'russisch-lernen.ics', { type: 'text/calendar' });
  if (navigator.canShare?.({ files: [file] })) {
    await navigator.share({ files: [file], title: 'Russisch-Erinnerung' }).catch(() => {});
    return;
  }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(file);
  a.download = file.name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
