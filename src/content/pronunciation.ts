/** Practice groups for sounds that are hard for German speakers. All words exist in the word lists (audio available). */
export interface SoundGroup {
  id: string;
  title: string;
  hint: string;
  items: string[];
}

export const SOUND_GROUPS: SoundGroup[] = [
  { id: 'y', title: 'ы – das dumpfe i', hint: 'Sag „i“ und zieh die Zunge weit nach hinten. Die Lippen bleiben breit und locker.', items: ['мы', 'ты', 'вы', 'сыр', 'сын', 'ры́ба'] },
  { id: 'r', title: 'р – gerolltes r', hint: 'Die Zungenspitze flattert hinter den oberen Zähnen – wie im Bayerischen, nicht im Rachen.', items: ['рот', 'ры́ба', 'брат', 'го́род', 'рестора́н'] },
  { id: 'ch', title: 'х – ch wie in „Bach“', hint: 'Immer der „Bach“-Laut, auch nach e und i – nie wie in „ich“.', items: ['хлеб', 'хорошо́', 'хор', 'са́хар'] },
  { id: 'zh', title: 'ж – stimmhaftes sch', hint: 'Wie „J“ in „Journal“. Leg die Hand an den Hals: Es muss vibrieren.', items: ['жена́', 'журна́л', 'жить'] },
  { id: 'schsch', title: 'щ – langes weiches sch', hint: 'Länger und heller als ш: Zunge nach vorne, Lippen leicht breit.', items: ['борщ', 'щи', 'пло́щадь', 'же́нщина'] },
  { id: 'ts', title: 'ц – wie deutsches z', hint: 'Kurz und hart: [ts] wie in „Zeit“.', items: ['центр', 'цирк', 'у́лица'] },
  { id: 'soft', title: 'ь – weiche Konsonanten', hint: 'Der Konsonant vor ь wird weich: Die Zunge geht zum Gaumen, als wolltest du ein kurzes „j“ sagen.', items: ['мать', 'день', 'соль', 'пять', 'ночь'] },
  { id: 'akanje', title: 'Betonung & unbetontes о', hint: 'Nur die betonte Silbe ist laut und lang. Unbetontes о klingt wie „a“: молоко́ → [malakó].', items: ['молоко́', 'хорошо́', 'Москва́', 'сего́дня', 'вода́'] },
];
