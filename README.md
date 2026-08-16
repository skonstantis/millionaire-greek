# Millionaire Host V18 — Categorized, Verified Question Bank

A host-run "Who Wants to Be a Millionaire" board (Greek). The visuals, sounds,
lifelines and money ladder are unchanged from previous builds; this revision
replaces the question pool and adds category selection plus two authoring tools.

## What changed in this version

- **Brand-new question bank.** The old pool was deleted and rewritten from
  scratch. Every question was authored to be concise and factually indisputable,
  then **independently fact-checked via web search** against authoritative
  sources (see `SOURCES.md`). Questions whose answer could not be confirmed as
  correct and unambiguous were not included.
- **Categories.** Questions are organised into **10 categories**. On the start
  screen you can pick **one or more** categories; if you pick **none, all**
  categories are used.
- **Difficulty scaling.** Each question has a difficulty 1–5 that maps onto the
  existing 15-step money ladder, so harder questions appear higher up.
- **Same money ladder.** The 15 amounts and the €500 / €5.000 safe havens are
  exactly as before. Only the questions per category changed (there are now more,
  and they are balanced).
- **Add questions.** A "Προσθήκη ερωτήσεων" button opens a form: pick the price
  range (→ difficulty), a category, type the question, the four choices and mark
  the correct one. Added questions are saved in the browser and join the live
  pool.
- **Build your own session.** A "Δική σου παρτίδα" button lets you assemble a
  full custom game of your own questions and play it immediately — handy for
  personalising a round to the player. Custom sessions climb the normal money
  ladder in the order you add the questions.

No visual theme, layout, or audio asset was changed — only the UI needed for the
features above was added, in the existing style.

## Categories & counts

| Category (key) | Ελληνικά | Questions |
|---|---|---|
| geography | Γεωγραφία | 20 |
| greek_history | Ελληνική Ιστορία | 20 |
| astronomy | Αστρονομία | 20 |
| seismology | Σεισμολογία | 20 |
| gaming | Gaming | 20 |
| history | Ιστορία | 15 |
| science | Επιστήμη | 15 |
| nature | Φύση & Ζωή | 15 |
| math | Μαθηματικά | 15 |
| sports | Αθλητισμός | 15 |

**Total: 175 questions**, every category covering all five difficulty tiers.
Answer positions are re-shuffled at runtime, so the correct choice is never
stuck in the same slot.

## Files

- `index.html` — screen markup (setup / game / end) + reusable modal.
- `styles.css` — theme (unchanged palette) + minimal styles for the new chips and forms.
- `app.js` — game logic, audio engine, lifelines, category filtering, and the add-question / custom-session tools.
- `questions.js` — the categorized question bank (`QUESTION_DATA` + `CATEGORY_ORDER`).

## Run

```sh
./start.sh        # serves the folder on http://localhost:8080 (python3 http.server)
```

Then open `http://localhost:8080`.

## Data model (`questions.js`)

```
QUESTION_DATA = {
  <categoryKey>: {
    label: "<Greek label>",
    questions: [
      { d: 1..5, q: "…", o: ["…","…","…","…"], c: 0..3, t: "trivia", s: "source" }
    ]
  }
}
```

- `d` difficulty → money ladder (1 = €100–200 … 5 = €30.000–100.000)
- `c` index of the correct option **as written** (re-shuffled at play time)
- `t` short host note shown between questions; `s` provenance

User-added questions are stored in `localStorage` (`millionaireUserQuestionsV1`)
and merged on load; the custom-session draft lives in `millionaireCustomDraftV1`.

See `SOURCES.md` and `THIRD_PARTY_LICENSES.txt`.
