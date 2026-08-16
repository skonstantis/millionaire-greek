# Question sources & verification

The question bank (`questions.js`) holds **712 questions** across **11
categories**, each tagged with a difficulty 1–15 that maps 1:1 onto the 15-step
money ladder.

## Authoring & correctness policy

Every question was written to be:

- **Concise** — short stem, four short options.
- **Time-stable** — no facts that drift (current record holders were used only
  where the record is long-standing and confirmed still current).
- **Unambiguous** — exactly one option is defensibly correct; distractors are
  plausible but clearly wrong.

## Two-pass verification

1. **Authoring pass** — each question was written *with* a web search confirming
   the fact, and a source recorded in its `s` field.
2. **Independent pass** — a separate adversarial fact-check re-verified every new
   question via fresh web searches, marking anything wrong/ambiguous/uncertain
   for removal or correction. A programmatic cross-check then confirmed the
   verified answer matched the keyed answer for all questions.

Anything that could not be confirmed correct **and** the only defensible option
was dropped or rewritten.

Representative authorities per category:

- **Γεωγραφία:** Encyclopaedia Britannica, NOAA, National Geographic, UNESCO, CIA World Factbook, Guinness World Records, national governments.
- **Ελληνική Ιστορία:** Encyclopaedia Britannica, UNESCO, academic history references.
- **Ιστορία:** Encyclopaedia Britannica, UNESCO, NASA (Apollo 11), national archives/museums.
- **Αστρονομία:** NASA, ESA, IAU, Encyclopaedia Britannica.
- **Σεισμολογία:** USGS, NOAA, IRIS/EarthScope, Encyclopaedia Britannica.
- **Επιστήμη:** IUPAC, NIST, BIPM, CERN, Encyclopaedia Britannica.
- **Φύση & Ζωή:** Encyclopaedia Britannica, NOAA, National Human Genome Research Institute, Smithsonian.
- **Μαθηματικά:** direct computation for arithmetic/geometry; Encyclopaedia Britannica for attributions.
- **Gaming:** Encyclopaedia Britannica, Guinness World Records, official publishers, reputable gaming-history references.
- **Αθλητισμός:** IOC / Olympics.com, FIFA, FIBA, World Athletics, UEFA.

Each question also carries a short `s` (source) label in `questions.js`.

## The "Ο Μπαμπάς" (father) category

A personalized, **humorous roast** of the game owner's dad — absurd, exaggerated
family jokes (belly, naps, Lidl runs, tsipouro, snoring, never catching a fish).
These are **not factual** questions, so they are exempt from the verification
above: the "correct" answer is simply the intended punchline, and each is marked
`s: "Καζούρα"`. Nothing here is meant literally.

## Host trivia

Every question has a `t` (trivia) note giving the correct answer and a one-line
explanation, shown between questions.

## User-supplied questions

Questions added through the in-app **"Προσθήκη ερωτήσεων"** form and the
**"Δική σου παρτίδα"** builder are authored by the user; their correctness is the
user's responsibility. They are stored locally in the browser and are not part of
the verified bank above.
