# Question sources

This build uses one unified question bank. Geography is mixed with all other topics, and placement on the 15-step money ladder is manual based on perceived difficulty rather than a fixed quota.

## Original Millionaire dataset

The original bank is derived from the public `bahadiri/Millionaire` dataset by Bahadir Ismail Aydin, Yavuz Selim Yilmaz, and Murat Demirbas. The source `question.csv` contains the original Turkish question text, four choices, the correct choice, and a `no` field used as game-show level / difficulty metadata.

This build keeps `sourceId` and `sourceLevel` for those questions. The Greek wording is translated/adapted.

- Repository: https://github.com/bahadiri/Millionaire
- Source file: https://github.com/bahadiri/Millionaire/blob/master/csv/data/question.csv
- Paper: Aydin BI, Yilmaz YS, Demirbas M. A crowdsourced “Who wants to be a millionaire?” player. Concurrency and Computation: Practice and Experience. 2017; e4168. DOI: 10.1002/cpe.4168.

## Additional geography material supplied for this revision

The added geography questions were selected and adapted from the source material supplied by the user. Open-ended source questions were converted to four-option Millionaire questions with newly written distractors. Ambiguous, image-dependent, time-sensitive, misleading, or factually problematic candidates were not imported as-is.

- Parade — Geography Trivia Questions: https://parade.com/1246355/marynliles/geography-trivia/
- Mentimeter — 100+ Best Geography Trivia Questions and Answers to Test Your Knowledge: https://www.mentimeter.com/blog/education/best-geography-quizzes-and-trivia-questions
- Nibble — Geography Trivia That Will Blow Your Mind: https://nibble-app.com/blog/geography-trivia
- Reader’s Digest — 115 Geography Trivia Questions to Test Your Global Knowledge: https://www.rd.com/list/geography-quiz-101/
- BuzzFeed — Around The World In Geography Trivia Questions: https://www.buzzfeed.com/kellyrissman/geography-trivia-questions

Each added question contains a source label and source identifier in `app.js`.

## Additional verification used for selected tricky facts

Some geography superlatives and unusual facts are especially easy to phrase ambiguously. Selected items were cross-checked against more authoritative references before inclusion:

- NOAA — Sargasso Sea: https://oceanservice.noaa.gov/facts/sargassosea.html
- South African Government — national capitals: https://www.gov.za/about-sa/south-africa-glance-1
- NASA Earth Observatory — Chimborazo and distance from Earth’s center: https://science.nasa.gov/earth/earth-observatory/chimborazo-and-tungurahua-ecuador-6099/
- Government of Canada — Canada’s coastline: https://www.canada.ca/en/services/environment/our-environment/nature-based-climate-solutions/coastlines.html
- USGS — Lower Congo River depth measurements: https://www.usgs.gov/media/audio/usgs-hydrologic-investigation-west-africas-congo-river-part-3
- Guinness World Records — France and time zones: https://www.guinnessworldrecords.com/world-records/584626-country-with-the-most-time-zones
- Visit Greenland — Scoresby Sund fjord system: https://visitgreenland.com/destinations/ittoqqortoormiit/
- UNESCO World Heritage Centre — Potala Palace: https://whc.unesco.org/en/list/707

## Trivia / host notes

Every question now contains a `trivia` field. For newly added geography questions the note contains a short contextual fact or explanation. Legacy questions receive a concise answer explanation so the host always has something readable on the between-question screen. The source label is displayed directly below the note.

Question-source pages are used as provenance for the quiz material; inclusion does not imply that every statement on those pages was accepted without curation.
