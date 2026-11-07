# LernRussian

Persönliche Russisch-Lern-App von **null bis A2** für deutschsprachige Erwachsene.
Ziel: Babbel/Duolingo-Abo ersetzen – **0 € laufende Kosten**, läuft auf dem **iPhone (als installierte Web-App)** und im **Browser**, komplett **offline-fähig**.

## Was die App kann (v2.0)

| Bereich | Inhalt |
|---|---|
| **Kurs** | Alphabet (Stufe 0) + **16 Einheiten A1–A2 mit 96 Lektionen** (je 5 Lektionen + Checkpoint): Dialog, neue Wörter, Grammatik, Übungen, Aussprache, Abschluss mit Kann-Satz |
| **Dialog-Player** | Satz für Satz, Wiederholen/Schleife, langsames Tempo, Übersetzung, Lautschrift, Erklärungen, Nachsprech-Modus |
| **Übungen** | Auswahl (auch Hörverstehen), Zuordnen, Lückentext, Satzbau, Übersetzen, Diktat – mit In-App-Tastatur (phonetisch / ЙЦУКЕН) |
| **Vokabeltrainer** | ~950 Wörter in 10 Themen + 16 Kursthemen, Wiederholung nach **FSRS**, RU→DE und DE→RU (tippen), Hörmodus, eigene Sets, **CSV-Import/-Export** |
| **Alphabet** | 33 Buchstaben in 4 Lerngruppen, Schreibübung (Druckschrift) mit Bewertung, Tastatur-Trainer |
| **Aussprache** | Spracherkennung (Safari online oder **Whisper offline im Browser**), Bewertung, Tipps zu typischen Fehlern Deutschsprachiger, Aussprache-Trainer mit Lautgruppen |
| **Audio** | **2 144 Aufnahmen** (Piper TTS, Frauen- und Männerstimme, 21 MB) – offline verfügbar |
| **Fortschritt** | Lernzeit, Streak, Lernkalender, Wortschatz-Kurve, fällige Wiederholungen, schwierigste Wörter, Aussprache-Ø |
| **Alltag** | Onboarding (Lernziel, Tagesziel), tägliche Erinnerung als Kalendertermin, **Sync zwischen Geräten** über privates GitHub Gist, Backup-Datei |

### Kursübersicht

| | Einheit | Grammatik-Schwerpunkte |
|---|---|---|
| 0 | Alphabet | Buchstaben, Betonung, Lesen |
| A1 · 1 | Знако́мство – Kennenlernen | ты/вы, kein „sein“, e-/i-Konjugation |
| A1 · 2 | Семья́ – Familie | Genus, мой/моя́, у меня́ есть, Alter, Plural |
| A1 · 3 | Чи́сла и вре́мя – Zahlen & Zeit | Zahlen bis 100, Uhrzeit, в + Wochentag |
| A1 · 4 | Еда́ – Essen & Café | Akkusativ, хоте́ть, люби́ть, есть/пить |
| A1 · 5 | Го́род – Stadt | Präpositiv, где/куда́, идти́/е́хать |
| A1 · 6 | Поку́пки – Einkaufen | Adjektive, Genitiv, Zahlen bis 1000 |
| A1 · 7 | Мой день – Alltag | Reflexivverben, Vergangenheit |
| A1 · 8 | Путеше́ствие – Reisen | Zukunft, Reise-Präpositionen |
| A2 · 9 | Здоро́вье – Gesundheit | Dativ, нра́виться, на́до/нельзя́ |
| A2 · 10 | Рабо́та и учёба – Arbeit & Studium | Instrumental, **Verbaspekte** |
| A2 · 11 | Дом – Wohnen | Ortspräpositionen, Genitiv Plural |
| A2 · 12 | Свобо́дное вре́мя – Freizeit | Bewegungsverben mit Präfixen, ходи́ть/е́здить |
| A2 · 13 | Пого́да – Wetter | Unpersönliche Sätze, Adjektivdeklination |
| A2 · 14 | Пра́здники – Feste | Datum, Glückwünsche, Plural-Fälle |
| A2 · 15 | Се́рвис – Dienstleistungen | Imperativ, Komparativ, höfliche Bitten |
| A2 · 16 | Расска́з – Erzählen | Nebensätze, кото́рый, е́сли, Konjunktiv |

> **Hinweis:** Alle Inhalte (Dialoge, Grammatik, Übungen, Vokabeln) wurden von Claude erstellt und durch automatische Tests geprüft (Betonungszeichen, Lösbarkeit, Lautschrift), aber **nicht von einem Muttersprachler korrigiert**. Gelegentliche Stichproben mit einem Tandempartner sind empfehlenswert.

## Auf dem iPhone nutzen

1. **Cloudflare Pages** mit dem Repository verbinden (*Workers & Pages → Create → Pages → Connect to Git*) mit:
   - Production branch: `main`
   - Build command: `npm run build`
   - Build output directory: `dist` (steht auch in `wrangler.toml`)
   - Node-Version kommt aus `.nvmrc` (22)
2. Jeder Push auf `main` veröffentlicht die App, jeder PR bekommt eine Vorschau-URL. Die GitHub Action `ci.yml` führt Tests und Build für jeden PR aus.
3. Die Seite in **Safari** öffnen → Teilen → „**Zum Home-Bildschirm**“.
4. Optional: unter *Fortschritt → Einstellungen* Sync (GitHub-Token mit Recht `gist`), Erinnerung und Offline-Spracherkennung einrichten.

## Entwicklung

```bash
npm install
npm run dev      # Entwicklungsserver
npm test         # Unit-Tests (Inhalte, Logik, Sync)
npm run build    # Produktions-Build nach dist/
```

**Audio neu erzeugen** (nach Änderungen an Inhalten; `npm test` meldet fehlende Aufnahmen):

```bash
pip install piper-tts
# Stimmen ru_RU-irina-medium.onnx und ru_RU-dmitri-medium.onnx (+ .onnx.json) von
# https://huggingface.co/rhasspy/piper-voices/tree/main/ru/ru_RU in einen Ordner laden
npx vite-node tools/tts/collect.ts
python3 tools/tts/generate.py --voices <ordner>
```

Die Offline-Spracherkennung lädt transformers.js und die ONNX-Laufzeit beim ersten Einschalten von jsDelivr (und das Whisper-Modell von Hugging Face); der Service Worker cacht beides. So bleibt jede Datei im Build unter dem 25-MiB-Limit von Cloudflare Pages.

Aussprachekorrekturen für die Sprachsynthese (stumme Buchstaben, unbetonte Präpositionen) stehen in `src/core/audioKey.ts`.

**Inhalte erweitern:** Lektionen liegen in `src/content/lessons/unitN.ts`, Vokabeln in `src/content/vocab.ts`. Die Tests prüfen u. a. Betonungszeichen, Lösbarkeit aller Übungen, bekannte Sprecher, Lautschrift und Audio-Vollständigkeit.

## Konzept

| Schritt | Dokument |
|---|---|
| 1 | [Anforderungen & Entscheidungen](docs/01-anforderungen-und-entscheidungen.md) |
| 2 | [Navigation & Wireframes](docs/02-navigation-und-wireframes.md) |
| 3 | [Technik, Frameworks & APIs](docs/03-technik.md) |
| 4a | [Inhaltliche Struktur & Progression A1–A2](docs/04-inhalte-und-progression.md) |
| 4b | [Beispiel-Lektionsreihe: Einheit 1](docs/05-beispiel-lektionsreihe.md) |
| 5 | [Zeitplan & Stand](docs/06-zeitplan.md) |

## Technik in Kürze

React 19 + TypeScript + Vite · Tailwind CSS · PWA (vite-plugin-pwa/Workbox) · Dexie (IndexedDB) · ts-fsrs · Papa Parse · transformers.js (Whisper) · Piper TTS · Vitest + Playwright · Cloudflare Pages
