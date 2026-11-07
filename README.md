# LernRussian

Persönliche Russisch-Lern-App (A1–A2) für deutschsprachige Erwachsene ohne Vorkenntnisse.
Ziel: Babbel/Duolingo-Abo ersetzen – **0 € laufende Kosten**, läuft auf dem **iPhone (als installierte Web-App)** und im **Browser**, komplett **offline-fähig**.

## Stand: v0.1 – Alphabet

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
