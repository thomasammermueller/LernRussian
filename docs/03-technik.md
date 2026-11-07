# 3. Technik, Frameworks & APIs

## 3.1 Grundsatzentscheidung: PWA

| Option | iPhone-Installation | Kosten | Web-Version | Fazit |
|---|---|---|---|---|
| Native Swift-App | Xcode; mit Gratis-Account alle 7 Tage neu signieren | 0 € / 99 $ p. a. | separat | ✗ |
| React Native / Expo | wie nativ (App Store/TestFlight braucht 99 $) | 99 $ p. a. | Expo Web möglich | ✗ zu teuer für Privatnutzung |
| **PWA (React + Vite)** | Safari → Teilen → „Zum Home-Bildschirm“ | **0 €** | identisch | **✓** |

Die PWA läuft auf dem iPhone im Vollbild mit eigenem Icon, startet offline, kann Mikrofon nutzen und (ab iOS 16.4) Push empfangen. Sollte später doch eine App-Store-App gewünscht sein, kann der Code mit **Capacitor** ohne Umbau in eine native Hülle verpackt werden.

## 3.2 Tech-Stack

| Bereich | Wahl | Warum |
|---|---|---|
| Sprache | **TypeScript** | Typsicherheit für Datenmodell & Inhalte |
| UI | **React 19** + **Vite** | Verbreitet, schnell, gute PWA-Tools |
| Styling | **Tailwind CSS** + Radix UI Primitives | Schnell, barrierearm, Dark Mode |
| Routing | React Router | Tabs + Lektionsschritte als URLs |
| State | **Zustand** | Klein, einfach |
| Lokale DB | **Dexie.js** (IndexedDB) | Offline-Speicher für Lernstand, reaktive Queries |
| PWA / Offline | **vite-plugin-pwa** (Workbox) | Service Worker, Precaching, Audio-Cache |
| Wiederholung | **ts-fsrs** | FSRS-Algorithmus, MIT-Lizenz |
| CSV | **Papa Parse** | Robuster CSV-Import/-Export |
| Diagramme | **Chart.js** (react-chartjs-2) | Leicht, gut auf Mobilgeräten |
| Content-Validierung | **Zod** | Inhalte werden beim Build geprüft |
| Tests | Vitest + Playwright | Logik + End-to-End (iPhone-Viewport) |
| Hosting | **Cloudflare Pages** (+ GitHub Actions für Tests) | Kostenlos, automatisches Deploy bei Push |

## 3.3 Architektur

```
src/
├─ app/                 App-Shell, Routing, Tab-Leiste, Theme
├─ core/
│  ├─ db/               Dexie-Schema, Migrationen
│  ├─ srs/              FSRS-Wrapper (Planung, Bewertung)
│  ├─ audio/            Player-Engine (Sätze, Loop, Tempo, Cache)
│  ├─ speech/           Spracherkennung (Adapter: WebSpeech | Whisper)
│  ├─ keyboard/         Kyrillische/phonetische Tastatur, Transliteration
│  ├─ content/          Laden + Typen der Content-Packs
│  ├─ sync/             Backup/Sync-Adapter
│  └─ stats/            Lernzeit-Tracking, Aggregationen
├─ features/            ← jedes Feature eigenständig
│  ├─ today/
│  ├─ course/           Lernpfad, Lektions-Runner, Übungstypen
│  ├─ vocab/            Karteikarten, Sets, CSV
│  ├─ alphabet/         Buchstaben, Schreibübung (Canvas)
│  ├─ grammar/          Referenz + Übungen
│  ├─ pronunciation/    Aussprachetraining
│  └─ progress/         Statistik, Einstellungen
└─ ui/                  Gemeinsame Komponenten (Button, Card, Sheet …)

content/                ← Inhalte als Dateien, versioniert in Git
├─ alphabet.json
├─ vocab/*.json         Wörter nach Themen
├─ lessons/a1/u01/*.json
├─ grammar/*.md
└─ audio/               generierte .m4a-Dateien
tools/
├─ tts/                 Skripte zur Audio-Generierung
└─ validate-content.ts
```

**Modularität:** Jedes Feature registriert sich über ein kleines Manifest (Route, Tab-Eintrag, Übungstypen). Neue Funktionen (z. B. „Lesetexte B1“, „Übersetzungs-API“, „Lernen mit Freund“) sind neue Ordner unter `features/` – der Kern bleibt unverändert. Übungstypen sind ein Plugin-Register:

```ts
registerExercise('gap-fill', { component: GapFill, grade: gradeGapFill });
```

## 3.4 Datenmodell (Auszug)

```ts
// Inhalte (statisch, aus content/)
interface Word {
  id: string;            // "w_privet"
  ru: string;            // "привет"
  stressed: string;      // "приве́т"
  translit: string;      // "priwjét"
  de: string;            // "hallo (informell)"
  pos: 'noun'|'verb'|'adj'|'adv'|'phrase'|'pron'|'num'|'prep'|'conj';
  gender?: 'm'|'f'|'n';
  topics: string[];      // ["begruessung"]
  example?: { ru: string; de: string };
  audio: string;         // "audio/w/privet.m4a"
  level: 'A1'|'A2';
}

interface Lesson {
  id: string;            // "a1-u01-l03"
  title: { ru: string; de: string };
  canDo: string;         // "Ich kann sagen, wer jemand ist."
  steps: LessonStep[];   // dialog | vocab | grammar | exercise | speak | summary
}

interface DialogLine {
  speaker: string; ru: string; translit: string; de: string;
  note?: string;         // Erklärung (Markdown)
  audio: string; start?: number; end?: number;
}

// Lernstand (lokal, synchronisierbar)
interface CardState {    // pro Wort + Richtung
  id: string;            // "w_privet:ru-de"
  fsrs: import('ts-fsrs').Card;
  updatedAt: number; deleted?: boolean;
}
interface ReviewLog  { id: string; cardId: string; rating: 1|2|3|4; at: number; ms: number; }
interface LessonProgress { lessonId: string; step: number; done: boolean; score?: number; updatedAt: number; }
interface StudySession { id: string; start: number; end: number; activity: string; }
interface UserSet { id: string; name: string; wordIds: string[]; custom: Word[]; updatedAt: number; }
```

## 3.5 Umsetzung der Funktionen

### Alphabet & Schreibübung
- 33 Buchstaben in 4 Lerngruppen (siehe [Inhalte](04-inhalte-und-progression.md)).
- Schreibübung: `<canvas>` mit Pointer Events (Finger & Apple Pencil). Für jeden Buchstaben ist eine **Strich-Vorlage als SVG-Pfad** mit Reihenfolge und Richtung hinterlegt.
- Bewertung: Nutzerstriche werden auf gleiche Punktzahl resampelt und mit der Vorlage verglichen (Abstand, Richtung, Reihenfolge, Abdeckung) → Prozentwert + Hinweis („Strich 2 von oben nach unten“).

### Tastatur
- Eigene On-Screen-Tastatur als React-Komponente mit 2 Layouts (ЙЦУКЕН, phonetisch); `inputmode="none"` unterdrückt die iOS-Tastatur.
- Desktop: Transliterations-Eingabe (`zh→ж`, `sch→ш`, `shch→щ`, `ch→х`, `tsch→ч`, `ja→я` …) mit Live-Umwandlung.
- Antwortvergleich tolerant: ё=е, Betonungszeichen ignoriert, Groß/Klein egal; Tippfehler (Levenshtein 1) → „Fast richtig“.

### Vokabeltrainer
- **FSRS** über `ts-fsrs`: Bewertung Nochmal/Schwer/Gut/Leicht, Wunsch-Behaltensquote 90 %.
- Neue Wörter pro Tag einstellbar (Standard 10), Lektionswörter werden automatisch zu Karten.
- **CSV-Format** (UTF-8, Trennzeichen `;`, Excel-/Numbers-kompatibel):
  ```
  russisch;deutsch;betonung;thema;beispiel_ru;beispiel_de
  привет;hallo;приве́т;Begrüßung;Привет, Макс!;Hallo, Max!
  ```
  Import mit Vorschau, Duplikaterkennung und Fehlerzeilen-Anzeige; Export pro Set oder komplett inkl. Lernstatus.

### Audio-Lektionen (kostenlos produziert)
| Quelle | Einsatz | Lizenz |
|---|---|---|
| **Silero TTS (v4/v5, Russisch)** | Dialoge, Sätze, Wörter – mehrere Stimmen, beachtet Betonung (`+` vor Vokal) | CC BY-NC-SA – für private Nutzung OK |
| **Piper TTS** (`ru_RU` Stimmen) | Alternative/zweite Stimme, läuft lokal | MIT |
| **Lingua Libre / Wikimedia Commons** | Echte Muttersprachler-Aufnahmen einzelner Wörter | CC BY-SA |
| **Tatoeba** | Beispielsätze mit Aufnahmen | CC BY 2.0 FR |
| iOS-Systemstimme (`speechSynthesis`, „Milena“) | Fallback für eigene CSV-Wörter ohne Audio | Gerät |

Pipeline: `tools/tts/generate.py` liest die Lektions-JSONs, erzeugt pro Satz eine Datei (betonte Schreibweise → korrekte Betonung), normalisiert Lautstärke und kodiert nach **AAC (.m4a, 48 kbit/s mono)**. Die Dateien landen in `content/audio/` und werden mitdeployt. Geschätzter Umfang A1+A2: ca. **100–150 MB**.

Player: eigene Engine auf `HTMLAudioElement` (Tempo per `playbackRate` mit `preservesPitch`), Satz-Navigation, A-B-Loop, Shadowing-Pausen, Media-Session-API (Sperrbildschirm-Steuerung).

### Grammatik
- Erklärungen als Markdown mit eigenen Komponenten (Tabellen, farbige Endungen, „Vergleich zum Deutschen“-Kästen).
- Übungstypen: Lückentext, Endung wählen, Satzbau (Wörter ordnen), Konjugationstabelle ausfüllen, Fehler finden, Umformen.
- Links zu kostenlosen Ressourcen: Wiktionary (Deklinationstabellen), Russian Wikibooks, Lingust, RussianLessons.net, OpenRussian.org, Forvo (Aussprache).

### Spracherkennung & Aussprache-Feedback
```
SpeechAdapter
├─ WebSpeechAdapter   webkitSpeechRecognition, lang="ru-RU" (online, Apple-Server)
└─ WhisperAdapter     transformers.js + Whisper (tiny/base) im Browser, WebGPU/WASM (offline nach Download)
```
1. Aufnahme (MediaRecorder) + Erkennung → Text.
2. Vergleich Erkannt ↔ Soll auf Buchstabenebene (normalisiert, Levenshtein-Alignment).
3. **Regelbasiertes Feedback** für typische Fehler Deutschsprachiger, z. B.:
   - ы ↔ и verwechselt → Tipp „Zunge zurück, Lippen breit, wie ‚i‘ mit Zahnarzt-‚üh‘“
   - fehlendes ь / harte Aussprache → Tipp zur Weichheit
   - unbetontes о → muss wie „a“ klingen (Akanje)
   - Auslautverhärtung (друг → [druk]) – hier ist das Deutsche ein Vorteil
4. A/B-Vergleich eigene Aufnahme ↔ Vorbild, optional Tonhöhen-Kurve (Intonation von Fragen).

Ehrlicher Hinweis: Eine Erkennung bewertet *Verständlichkeit*, nicht Phonetik im Detail. Für eine Privat-App ohne Kosten ist das der beste Kompromiss. Die Web Speech API in installierten iOS-Web-Apps muss früh auf dem Gerät getestet werden – deshalb der Whisper-Fallback.

### Lern-Reminder
- **MVP:** Button „Tägliche Erinnerung einrichten“ erzeugt eine `.ics`-Datei (täglicher Termin, z. B. 19:30, mit Alarm, Link zurück in die App). Ein Tap → iOS-Kalender. 0 € und kein Server.
- **Später optional:** Web Push (iOS ≥ 16.4, installierte PWA) über einen **Cloudflare Worker** (kostenloser Tarif, Cron-Trigger) – erinnert nur, wenn heute noch nicht gelernt wurde.

### Fortschrittstracking
- `StudySession` wird automatisch erfasst (Start bei Aktivität, Ende nach 60 s Inaktivität / App im Hintergrund).
- Kennzahlen: Lernzeit/Tag, Streak, Wörter je Status (neu/lernend/sicher = Stabilität > 21 Tage), Genauigkeit, Lektionen, Aussprache-Score, Prognose „fällige Karten nächste 7 Tage“.
- Diagramme: Balken (Lernzeit), Linie (Wortschatz), Heatmap (Kalender), Fortschrittsbalken (A1/A2).

## 3.6 Offline & Sync

**Offline (alles außer Spracherkennung via Web Speech):**
- Service Worker precacht App-Shell + alle Texte/JSON (wenige MB).
- Audio: Cache „runtime-first“, pro Einheit automatisch beim Öffnen + Button „Alle Audios laden“.
- `navigator.storage.persist()` anfragen, damit iOS die Daten nicht löscht. (Installierte Home-Screen-Apps sind von Safaris 7-Tage-Löschregel ausgenommen – trotzdem regelmäßiges Backup empfehlen.)

**Sync (iPhone ↔ Rechner):** Alle Lernstand-Datensätze haben `updatedAt` + `deleted` → einfacher Merge „neuester gewinnt“. Austauschbar über einen Adapter:

| Stufe | Adapter | Kosten | Automatik |
|---|---|---|---|
| MVP | **Backup-Datei** (JSON) exportieren/importieren, z. B. über iCloud Drive | 0 € | manuell, Erinnerung nach 7 Tagen |
| v0.4 | **Privates GitHub Gist** (Personal Access Token, nur Gist-Recht) | 0 € | automatisch beim Start, bei Online-Wechsel (`online`-Event) und alle 5 Min. |
| Alternative | Supabase Free Tier | 0 € | automatisch |

Eine Sync-Warteschlange in IndexedDB sammelt Änderungen offline und überträgt sie, sobald wieder Internet da ist.

## 3.7 Qualitätssicherung der Inhalte

Weil alle Inhalte KI-generiert sind:
- Zod-Schema + Validierungsskript (Pflichtfelder, jedes Wort hat Betonung, jede Audio-Datei existiert).
- Automatischer Check: Betonungszeichen genau einmal pro mehrsilbigem Wort; ё immer geschrieben.
- Abgleich mit Wiktionary-Daten (Genus, Betonung) per Skript.
- **Empfehlung:** Gelegentlich einen Muttersprachler (Tandem-Partner, z. B. über Tandem/HelloTalk, kostenlos) Stichproben prüfen lassen. In der App gibt es einen „Fehler melden“-Button, der eine Notiz speichert, die ich später korrigiere.
