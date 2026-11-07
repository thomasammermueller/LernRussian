# LernRussian

Persönliche Russisch-Lern-App (A1–A2) für deutschsprachige Erwachsene ohne Vorkenntnisse.
Ziel: Babbel/Duolingo-Abo ersetzen – **0 € laufende Kosten**, läuft auf dem **iPhone (als installierte Web-App)** und im **Browser**, komplett **offline-fähig**.

## Stand: v0.4 – Alphabet, Vokabeltrainer, Einheit 1, Aussprache & Statistik

**Neu in v0.4:**
- **Spracherkennung mit Auswertung:** „Sprechen & prüfen“ in jeder Lektion und im neuen **Aussprache-Trainer** (Nachschlagen). Ergebnis in Prozent, Buchstaben grün/rot, erkannter Text und konkrete Tipps zu typischen Fehlern Deutschsprachiger (ы, р, х, ж, щ, ц, weiche Konsonanten, Betonung).
- Zwei Erkennungen: **Safari** (eingebaut, online) und **Whisper offline** (läuft komplett auf dem Gerät, einmalig 76 MB). „Automatisch“ wählt passend zur Verbindung.
- Aussprache-Trainer mit 8 Lautgruppen, allen Lektionssätzen und „Deine schwierigsten“.
- **Statistik:** Lernzeit 7/30 Tage mit Tagesziel, Lernkalender (16 Wochen), Wörter im Training, Prognose fälliger Wiederholungen, schwierigste Wörter, Ø-Aussprache.


**Neu in v0.3 – Kurs Einheit 1 „Знако́мство“ (Kennenlernen):**
- 5 Lektionen + Checkpoint: Dialoge, neue Wörter, Grammatik, Übungen, Aussprache, Abschluss mit Kann-Satz
- **Dialog-Player:** Satz für Satz, Satz wiederholen/in Schleife, langsames Tempo, Übersetzung und Lautschrift ein-/ausblendbar, Erklärung pro Satz, Nachsprech-Modus mit Pausen
- **Übungstypen:** Auswahl (auch Hörverstehen), Zuordnen, Lückentext, Satzbau, Übersetzen, Diktat
- **Aussprache:** Vorbild anhören, sich selbst aufnehmen und vergleichen
- Wörter einer Lektion wandern nach dem Abschluss automatisch in den Vokabeltrainer
- **Echte Audiodateien** für alle 422 Wörter und Sätze (Piper TTS, weibliche/männliche Stimme), offline verfügbar (2,6 MB)
- Grammatik-Übersicht unter „Nachschlagen“


**Neu in v0.2 – Vokabeltrainer (Tab „Wörter“):**
- 10 Themen mit 231 Wörtern (Begrüßung, Zahlen, Zeit, Familie, Essen, Stadt, Reisen, Farben, Verben, kleine Wörter) – alle mit Betonung, Lautschrift, teils Beispielsatz
- Wiederholung nach **FSRS** (`ts-fsrs`): Nochmal/Schwer/Gut/Leicht mit Intervall-Vorschau, Tageslimit für neue Wörter
- Abfrage Russisch → Deutsch (aufdecken) und – sobald ein Wort sitzt – Deutsch → Russisch (tippen, automatische Bewertungsempfehlung)
- Hörmodus: das russische Wort wird nur vorgespielt
- Eigene Sets, Wörter hinzufügen/löschen, **CSV-Import** (mit Vorschau, Duplikat- und Fehlerprüfung) und **CSV-Export** mit Lernstatus
- Statistik: Wörter sicher/in Arbeit, Wiederholungen und Trefferquote der letzten 30 Tage; Sicherung enthält jetzt auch den Vokabel-Lernstand

**Aus v0.1:**

- **Kurs → Stufe 0:** 4 Alphabet-Lektionen (je Buchstabe: Laut, Erklärung, Beispielwörter mit Aussprache) + Test, Lesetest 0.T
- **Nachschlagen → Alphabet:** alle 33 Buchstaben, Schreibübung in Druckschrift (mit Vorlage / nur Startpunkte / frei) inkl. Bewertung
- **Tastatur-Trainer:** In-App-Tastatur (phonetisch oder ЙЦУКЕН) bzw. Systemtastatur; am Computer Live-Transliteration (`privet` → `привет`)
- **Heute / Fortschritt:** Tagesziel, Streak, Lernzeit-Tracking, 7-Tage-Diagramm, Einstellungen, Backup-Export/-Import
- Offline-fähig (PWA), Hell/Dunkel-Modus, Aussprache über die russische Systemstimme

## Entwicklung

```bash
npm install
npm run dev      # Entwicklungsserver
npm test         # Unit-Tests
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

**Veröffentlichen:** Einmalig im Repository unter *Settings → Pages → Source* „GitHub Actions“ wählen. Danach baut und veröffentlicht jeder Push auf `main` die App automatisch (`.github/workflows/deploy.yml`).

**Auf dem iPhone:** Seite in Safari öffnen → Teilen → „Zum Home-Bildschirm“. Für die Aussprache in iOS unter *Einstellungen → Bedienungshilfen → Gesprochene Inhalte → Stimmen → Russisch* eine Stimme (z. B. Milena) laden.

## Konzept

| Schritt | Dokument |
|---|---|
| 1 | [Anforderungen & Entscheidungen](docs/01-anforderungen-und-entscheidungen.md) |
| 2 | [Navigation & Wireframes](docs/02-navigation-und-wireframes.md) |
| 3 | [Technik, Frameworks & APIs](docs/03-technik.md) |
| 4a | [Inhaltliche Struktur & Progression A1–A2](docs/04-inhalte-und-progression.md) |
| 4b | [Beispiel-Lektionsreihe: Einheit 1 „Знакомство“](docs/05-beispiel-lektionsreihe.md) |
| 5 | [Zeitplan MVP & Folgeversionen](docs/06-zeitplan.md) |

## Kurzfassung

- **Plattform:** Progressive Web App (React + TypeScript + Vite), auf iOS per „Zum Home-Bildschirm“ installiert. Kein App Store, kein Developer-Account.
- **Hosting:** GitHub Pages (kostenlos).
- **Daten:** lokal im Gerät (IndexedDB), Backup/Sync über JSON-Datei bzw. optional später über einen kostenlosen Cloud-Tarif.
- **Audio:** vorab generiert mit freier Sprachsynthese (Silero / Piper) + freie Muttersprachler-Aufnahmen (Lingua Libre, Tatoeba), alles offline gecacht.
- **Wiederholung:** FSRS-Algorithmus (`ts-fsrs`, Open Source).
- **Aussprache:** Spracherkennung im Browser (Web Speech API) bzw. Whisper lokal im Browser als Fallback.
