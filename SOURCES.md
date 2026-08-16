# Question sources & verification

This build ships a **new** question bank (`questions.js`). The previous pool was
removed entirely. Questions are grouped into 10 categories, each with a
difficulty (1–5) that maps onto the 15-step money ladder.

## Authoring & correctness policy

Every question was written to be:

- **Concise** — short stem, four short options.
- **Time-stable** — no facts that drift (e.g. current record holders were only
  used where the record is long-standing and confirmed still current).
- **Unambiguous** — exactly one option is defensibly correct; distractors are
  plausible but clearly wrong.

## Independent verification

After authoring, **each question was independently fact-checked with web
searches** against authoritative references. A question was kept only when the
marked answer was confirmed correct **and** the only defensible option; anything
uncertain, disputed, or time-sensitive was rewritten or dropped. Every one of
the 175 questions passed this check with a cited source.

Representative authorities used (per category):

- **Γεωγραφία:** Encyclopaedia Britannica, NOAA, National Geographic, UNESCO, CIA World Factbook, Guinness World Records, national governments (e.g. Canada, South Africa), NASA Earth Observatory.
  - https://oceanservice.noaa.gov/facts/biggestocean.html
  - https://www.guinnessworldrecords.com/world-records/584626-country-with-the-most-time-zones
  - https://oceanservice.noaa.gov/facts/sargassosea.html
- **Ελληνική Ιστορία:** Encyclopaedia Britannica (ancient/Byzantine/modern Greek history).
  - https://www.britannica.com/sports/ancient-Olympic-Games
  - https://www.britannica.com/event/Battle-of-Gaugamela
- **Αστρονομία:** NASA, ESA, IAU, Encyclopaedia Britannica.
  - https://science.nasa.gov/mars/facts/
  - https://www.britannica.com/science/How-Big-Is-Jupiter
- **Σεισμολογία:** USGS Earthquake Hazards, NOAA, Encyclopaedia Britannica, IRIS/EarthScope.
  - https://www.usgs.gov/programs/earthquake-hazards/seismograms-seismographs-seismometers
  - https://www.britannica.com/science/epicentre
- **Gaming:** Encyclopaedia Britannica, Guinness World Records, official publishers (Nintendo, Sega, Sony, Microsoft, Mojang, Valve).
  - https://www.guinnessworldrecords.com/world-records/best-selling-video-game
- **Ιστορία:** Encyclopaedia Britannica, UNESCO, NASA (Apollo 11), National WWII Museum.
  - https://whc.unesco.org/en/list/438
  - https://www.nationalww2museum.org/war/topics/end-world-war-ii-1945
- **Επιστήμη:** IUPAC / RSC periodic table, NIST, BIPM, CERN, PubChem, Encyclopaedia Britannica.
  - https://pubchem.ncbi.nlm.nih.gov/compound/Water
  - https://periodic-table.rsc.org/element/79/gold
- **Φύση & Ζωή:** Encyclopaedia Britannica, NOAA Fisheries, National Human Genome Research Institute, Cleveland Clinic.
  - https://www.britannica.com/science/What-Is-the-Largest-Animal-on-Earth
- **Μαθηματικά:** direct computation for arithmetic/geometry; Encyclopaedia Britannica for attributions (Euclid, Leibniz, Pythagoras).
  - https://www.britannica.com/science/Pythagorean-theorem
- **Αθλητισμός:** IOC / Olympics.com, FIFA, FIBA, World Athletics, UEFA.
  - https://olympics.com/ioc/olympic-games
  - https://www.fifa.com/en/tournaments/mens/worldcup

Each question also carries a short `s` (source) label in `questions.js` naming
the authority behind the fact.

## Host trivia

Every question has a `t` (trivia) note giving the correct answer and a one-line
explanation, shown on the between-question screen.

## User-supplied questions

Questions added through the in-app **"Προσθήκη ερωτήσεων"** form and the
**"Δική σου παρτίδα"** builder are authored by the user; their correctness is the
user's responsibility. They are stored locally in the browser and are not part of
the verified bank above.
