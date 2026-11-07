import { GROUPS, type LetterGroup } from '../../content/alphabet';
import { ALL_LESSONS } from '../../content/lessons';

export interface CourseItem {
  id: string;
  title: string;
  subtitle: string;
  to: string;
}

export const STAGE0: CourseItem[] = [
  ...([1, 2, 3, 4] as LetterGroup[]).map((g) => ({
    id: GROUPS[g].lessonId,
    title: GROUPS[g].title,
    subtitle: GROUPS[g].subtitle,
    to: `/kurs/alphabet/${g}`,
  })),
  { id: '0.T', title: 'Lesetest', subtitle: 'Internationale Wörter lesen', to: '/kurs/lesetest' },
];

export const UNITS: { n: number; ru: string; de: string; level: 'A1' | 'A2' }[] = [
  { n: 1, ru: 'Знако́мство', de: 'Kennenlernen', level: 'A1' },
  { n: 2, ru: 'Семья́', de: 'Familie & Menschen', level: 'A1' },
  { n: 3, ru: 'Чи́сла и вре́мя', de: 'Zahlen & Zeit', level: 'A1' },
  { n: 4, ru: 'Еда́', de: 'Essen & Café', level: 'A1' },
  { n: 5, ru: 'Го́род', de: 'In der Stadt', level: 'A1' },
  { n: 6, ru: 'Поку́пки', de: 'Einkaufen', level: 'A1' },
  { n: 7, ru: 'Мой день', de: 'Mein Tag', level: 'A1' },
  { n: 8, ru: 'Путеше́ствие', de: 'Reisen', level: 'A1' },
  { n: 9, ru: 'Здоро́вье', de: 'Gesundheit', level: 'A2' },
  { n: 10, ru: 'Рабо́та и учёба', de: 'Arbeit & Studium', level: 'A2' },
  { n: 11, ru: 'Дом', de: 'Wohnen', level: 'A2' },
  { n: 12, ru: 'Свобо́дное вре́мя', de: 'Freizeit', level: 'A2' },
  { n: 13, ru: 'Пого́да', de: 'Wetter & Jahreszeiten', level: 'A2' },
  { n: 14, ru: 'Пра́здники', de: 'Feste & Traditionen', level: 'A2' },
  { n: 15, ru: 'Се́рвис', de: 'Dienstleistungen', level: 'A2' },
  { n: 16, ru: 'Расска́з', de: 'Erzählen', level: 'A2' },
];

/** Everything in the course in recommended order (used for "Weiterlernen"). */
export const COURSE_SEQUENCE: CourseItem[] = [
  ...STAGE0,
  ...ALL_LESSONS.map((l) => ({ id: l.id, title: `${l.title.ru} – ${l.title.de}`, subtitle: l.canDo, to: `/kurs/lektion/${l.id}` })),
];
