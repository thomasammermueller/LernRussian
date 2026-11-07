# 1. Anforderungen & Entscheidungen

## Rahmen

| Thema | Entscheidung |
|---|---|
| Nutzer | Nur ich selbst (deutschsprachig, Erwachsener, keine Vorkenntnisse) |
| Ziel | Babbel/Duolingo-Abo ersetzen, **keine laufenden Kosten** |
| Plattformen | iPhone + Browser (Desktop/iPad). Android nicht geplant, durch Web-Technik aber automatisch möglich |
| Monetarisierung | **Keine.** Kein Premium, keine Werbung, kein Bezahlsystem |
| Ausgangssprache | Deutsch |
| Zielniveau | A1 und A2 (GER) |
| Inhalte | Werden vollständig von Claude erstellt (Vokabeln, Dialoge, Grammatik, Übungen) |

## Antworten aus der Rückfragerunde

| # | Frage | Antwort |
|---|---|---|
| A1 | Ausgangssprache | Deutsch |
| A2 | Zielniveau | A1 + A2 |
| A3 | Lernziel beim Onboarding | Ja (Gewichtung von Themen/Beispielen, tägliches Zeitziel) |
| A4 | Transliteration | Schrittweise ausblenden |
| A5 | Wiederholungsalgorithmus | Claude entscheidet → **FSRS** (siehe unten) |
| B6 | Audio | Gute kostenlose Tools → Sprachsynthese Silero/Piper + freie Aufnahmen (Lingua Libre, Tatoeba) |
| B7 | Inhaltserstellung | Claude erstellt alles |
| B8 | Schreibübungen | Erst Druckschrift, Schreibschrift später |

## Von mir getroffene Entscheidungen (offene Fragen)

| Thema | Entscheidung | Begründung |
|---|---|---|
| **App-Typ** | **Progressive Web App (PWA)** statt nativer iOS-App | Eine native App braucht für dauerhafte Installation einen Apple-Developer-Account (99 $/Jahr) bzw. muss mit Gratis-Account alle 7 Tage neu signiert werden. Eine PWA wird in Safari über „Teilen → Zum Home-Bildschirm“ installiert, läuft im Vollbild, offline, ohne App Store. Gleicher Code läuft im Browser. |
| Account/Login | Keiner | Ein Nutzer, Daten liegen lokal. |
| Backend | Keines im MVP | Inhalte sind statische Dateien; Lernstand lokal (IndexedDB). |
| Sync | Backup-Datei (MVP) → optional automatischer Sync (später) | Siehe [Technik](03-technik.md#7-offline--sync). |
| Wiederholung | FSRS (`ts-fsrs`) | Moderner, nachweislich effizienter als SM-2/Leitner; Open Source; plant Wiederholungen nach individueller Vergessenskurve. |
| Aussprachebewertung | Web Speech API (online, kostenlos) + Whisper im Browser als Fallback | Keine Kosten; Azure Pronunciation Assessment wäre genauer, kostet aber. |
| Lern-Reminder | Kalender-Abo (.ics) im MVP, Web-Push später | iOS-Web-Push braucht einen Server; ein wiederkehrender Kalendertermin mit Alarm ist kostenlos und zuverlässig. |
| Design | Ruhig, erwachsen, wenig Gamification | Erwachsene Lerner wollen Fortschritt sehen, nicht Comic-Figuren. Streak + Tagesziel reichen. |
| Hosting | GitHub Pages | Kostenlos, Deploy per GitHub Action. |
| Erweiterbarkeit | Feature-Module + Content-Packs | Neue Bereiche (z. B. B1, Lesetexte, Übersetzungs-API) können ohne Umbau ergänzt werden. Kein Premium/Multiplayer-Ballast. |

## Besonderheiten erwachsener Anfänger (Designprinzipien)

1. **Verstehen statt Raten** – Grammatik wird kurz *erklärt* (auf Deutsch, mit Vergleich zum Deutschen), nicht nur aus Mustern erraten wie bei Duolingo.
2. **Praxisnähe** – Jede Lektion endet mit einem „Kann-Satz“ („Ich kann mich vorstellen“). Dialoge drehen sich um Alltagssituationen (Reise, Café, Smalltalk).
3. **Kurze Einheiten** – 10–15 Minuten pro Lektion, jederzeit unterbrechbar (Fortschritt wird pro Schritt gespeichert).
4. **Keine Angst vor Fehlern** – Kein „Leben verlieren“, keine Strafen. Fehler landen automatisch in der Wiederholung.
5. **Transparenz** – Man sieht immer: Was kann ich schon? Was kommt als nächstes? Wie viele Wörter sind fällig?
6. **Betonung immer sichtbar** – Russisch hat freie Betonung; alle Wörter werden mit Betonungszeichen angezeigt (приве́т).
7. **Deutsche Stolpersteine gezielt üben** – ы, Weichheitszeichen, Akanje (unbetontes о → a), stimmhaftes з/ж, gerolltes р.

## Kostenaufstellung

| Posten | Kosten |
|---|---|
| Hosting (GitHub Pages) | 0 € |
| Domain | 0 € (`<user>.github.io/LernRussian`) |
| Audio (Silero/Piper/Lingua Libre/Tatoeba) | 0 € |
| Spracherkennung (Web Speech API / Whisper lokal) | 0 € |
| Alle Bibliotheken | 0 € (Open Source) |
| **Summe** | **0 € / Monat** |
