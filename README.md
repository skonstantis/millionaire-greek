# Millionaire Host V19 — 15 Difficulty Levels + Personalized Categories

A host-run "Who Wants to Be a Millionaire" board (Greek). The visuals, sounds,
lifelines and money ladder are unchanged; this build expands the question bank
to 15 difficulty levels, grows it to ~50 questions per level, and adds a
personalized category.

## What changed in this version

- **15 difficulty levels.** Each of the 15 money rungs is now its own difficulty
  tier (1 = €100 … 15 = €100.000). Questions scale smoothly from trivial to
  expert as the money climbs. The amounts and the €500 / €5.000 safe havens are
  unchanged.
- **~50 questions per level.** The bank now holds **713 questions** (~47 per
  level on average) so rounds stay fresh and replayable.
- **A personalized category — "Ο Μπαμπάς" (father).** A tongue-in-cheek **roast**
  of the owner's dad (belly, naps, Lidl runs, tsipouro, snoring, and never
  catching a single fish). These are absurd family jokes, not facts — the
  "correct" answer is simply the funniest punchline, so this category is exempt
  from the factual verification below.
- **Every question web-verified.** Questions were authored and then
  **independently fact-checked via web search** against authoritative sources
  (two separate passes). Anything that couldn't be confirmed correct and
  unambiguous was dropped. See `SOURCES.md`.
- **Add-question form covers all 15 rungs.** The "Προσθήκη ερωτήσεων" price
  dropdown now lists every money rung, so an added question lands on the exact
  level you choose.
- Categories, custom sessions, and all other features from V18 are unchanged.
  Pick one or more category chips on the start screen (none = all). Answer
  positions are re-shuffled at runtime.

No visual theme, layout, or audio asset was changed.

## Categories & counts

| Category (key) | Ελληνικά | Questions |
|---|---|---|
| geography | Γεωγραφία | 61 |
| greek_history | Ελληνική Ιστορία | 74 |
| history | Ιστορία | 56 |
| astronomy | Αστρονομία | 70 |
| seismology | Σεισμολογία | 75 |
| science | Επιστήμη | 55 |
| nature | Φύση & Ζωή | 54 |
| math | Μαθηματικά | 59 |
| gaming | Gaming | 75 |
| sports | Αθλητισμός | 59 |
| father | Ο Μπαμπάς (roast) | 75 |

**Total: 713 questions**, every category covering all 15 difficulty tiers.

## Files

- `index.html` — screen markup (setup / game / end) + reusable modal.
- `styles.css` — theme (unchanged palette) + styles for chips and forms.
- `app.js` — game logic, audio engine, lifelines, category filtering, add-question / custom-session tools. `LEVELS` defines the 15 rungs (difficulty 1-15).
- `questions.js` — the categorized question bank (`QUESTION_DATA` + `CATEGORY_ORDER`).

## Run

```sh
./start.sh        # serves the folder on http://localhost:8080 (python3 http.server)
```

## Data model (`questions.js`)

```
QUESTION_DATA = {
  <categoryKey>: {
    label: "<Greek label>",
    questions: [
      { d: 1..15, q: "…", o: ["…","…","…","…"], c: 0..3, t: "trivia", s: "source" }
    ]
  }
}
```

- `d` difficulty → money rung (1 = €100 … 15 = €100.000)
- `c` index of the correct option **as written** (re-shuffled at play time)
- `t` short host note shown between questions; `s` provenance

User-added questions are stored in `localStorage` (`millionaireUserQuestionsV1`)
and merged on load; the custom-session draft lives in `millionaireCustomDraftV1`.

See `SOURCES.md` and `THIRD_PARTY_LICENSES.txt`.
