# Chat Handoff — Sarf Mastery

**Last updated:** 2026-11-05  
**Repository:** https://github.com/mahashemi/SarfMastery  
**Current phase:** GitHub Pages is working and the latest TypeScript/Vite build plus custom deployment succeeded (Actions run 42106277003). Lessons 1–10 have core Persian/Urdu explanations and documented linguistic sources. Device QA, expert review, and Pages source cleanup remain pending.

## Read first
1. `PROJECT_STATUS.md` — authoritative checkbox task tracker.
2. `docs/LESSON_01_SOURCES.md` — source map and linguistic verification boundaries for Lesson 1.
3. `docs/LESSON_02_SOURCES.md` — source map and linguistic verification boundaries for Lesson 2.
4. `docs/LESSON_03_SOURCES.md` — source map and linguistic verification boundaries for Lesson 3.
5. `docs/LESSON_04_SOURCES.md` — source map and linguistic verification boundaries for Lesson 4.
6. `docs/LESSON_05_SOURCES.md` — source map and linguistic verification boundaries for Lesson 5.
7. `docs/LESSON_06_SOURCES.md` — source map and linguistic verification boundaries for Lesson 6.
8. `docs/LESSON_07_SOURCES.md` — source map and linguistic verification boundaries for Lesson 7.
9. `docs/LESSON_08_SOURCES.md` — source map and linguistic verification boundaries for Lesson 8.
10. `docs/LESSON_09_SOURCES.md` — source map and linguistic verification boundaries for Lesson 9.
11. `docs/LESSON_10_SOURCES.md` — source map and linguistic verification boundaries for Lesson 10.
12. `docs/PRODUCT_SPEC.md` — product and UX requirements.
13. `docs/CURRICULUM_PLAN.md` — agreed 60-day course.
14. `docs/DECISIONS.md` — decisions and open questions.

## Agreed requirements
- Product name: Sarf Mastery — صَرْف.
- No personal name or signature in the app.
- Responsive desktop/tablet/mobile web app.
- English primary; core explanations in Lessons 1–10 are available in Persian and Urdu; full UI translation and fluent review remain pending.
- Absolute beginner start, traditional Hawza sequence.
- Arabic with full tashkīl, transliteration, and pronunciation support.
- Lots of examples, anticipated beginner questions, exercises, revision, teach-back.
- 20–30 minutes/day; 60-day foundation, optional advanced consolidation later.
- Learn → Understand → Memorise → Apply → Explain → Teach.
- Verified Qur'an/Hadith references; distinguish morphology from tafsir.
- Qur'an deep-link format: `https://mahashemi.github.io/QuranMemorizer/#/surah/{surah}/ayah/{ayah}`.

## Current implementation
- [x] Public GitHub repository exists.
- [x] Initial React + TypeScript + Vite project committed.
- [x] Responsive dashboard shell and eight-unit course overview.
- [x] Neutral branding; no personal-name footer.
- [x] Product spec, curriculum plan, decisions, tracker, and handoff docs.
- [x] Run and verify production TypeScript/Vite build.
- [x] Confirm custom GitHub Pages deployment (latest code Actions run 42105539151).
- [ ] Change repository Settings → Pages → Source to GitHub Actions to stop the competing automatic Jekyll branch deployment. This setting change is not exposed through the available GitHub connector actions.
- [x] Add refresh-safe hash route for Unit 1, Lesson 1.
- [x] Add introductory Sarf/Nahw explanation, كَتَبَ word-family examples, beginner FAQ, interactive root-letter check, and teach-back prompt.
- [x] Add core Lesson 1 explanatory paragraphs in English, Persian, and Urdu (remaining UI labels and dashboard are still English).
- [x] Add Lesson 2 at `#/lesson/02`, with the three word categories, multilingual explanations, six-question scored practice, and explicit audio-unavailable state.
- [x] Add Lesson 3 at `#/lesson/03`, with fiʿl/maṣdar distinctions, three verb forms, multilingual explanations, seven-question scored practice, and explicit audio-unavailable state.
- [x] Add Lesson 4 at `#/lesson/04`, with root/added-letter distinctions, mujarrad/mazīd examples, mnemonic limitations, seven-question scored practice, and explicit audio-unavailable state.
- [x] Add Lesson 5 at `#/lesson/05`, with Mīzān Ṣarfī, ف ع ل mapping, six verb/noun patterns, and scored practice.
- [x] Add Lesson 6 at `#/lesson/06`, with six Abwāb, māḍī/muḍāriʿ pairs, middle-radical vowel comparisons, and scored practice.
- [x] Add Lesson 7 at `#/lesson/07`, with the 14-slot active-past table, transliteration, English/Persian/Urdu glosses, and pronoun practice.
- [x] Add Lesson 8 at `#/lesson/08`, with the 14-slot active-muḍāriʿ table, four prefixes, shared-form cautions, transliteration, and pronoun practice.
- [x] Add six ك ت ب family examples, vocabulary glossary, root/pattern caveats, and claim-to-source notes.
- [ ] Qualified Arabic/Sarf teacher review of Lessons 1–3.
- [ ] Fluent Persian and Urdu review of Lessons 1–3.
- [ ] Verified human audio remains outstanding for all lessons.
- [ ] Verify textbook editions and source mapping for the full curriculum.
- [ ] Build audio/pronunciation pipeline.
- [x] Add interactive scored classification practice in Lessons 2 and 3.
- [ ] Expand practice types, progress persistence, and revision.

## GitHub issues
- [ ] [#1 Verify first GitHub Pages build and responsive UI checkpoint](https://github.com/mahashemi/SarfMastery/issues/1)
- [ ] [#2 Review and complete Unit 1, Lesson 1](https://github.com/mahashemi/SarfMastery/issues/2)
- [ ] [#3 Review and complete Unit 1, Lesson 2](https://github.com/mahashemi/SarfMastery/issues/3)
- [ ] [#4 Review and complete Unit 1, Lesson 3](https://github.com/mahashemi/SarfMastery/issues/4)
- [ ] [#5 Review and complete Unit 1, Lesson 4](https://github.com/mahashemi/SarfMastery/issues/5)
- [ ] [#6 Review and complete Unit 2, Lesson 5](https://github.com/mahashemi/SarfMastery/issues/6)
- [ ] [#7 Review and complete Unit 2, Lesson 6](https://github.com/mahashemi/SarfMastery/issues/7)
- [ ] [#8 Review and complete Unit 3, Lesson 7](https://github.com/mahashemi/SarfMastery/issues/8)
- [ ] [#9 Review and complete Unit 3, Lesson 8](https://github.com/mahashemi/SarfMastery/issues/9)
- [ ] [#10 Review and complete Unit 3, Lesson 9](https://github.com/mahashemi/SarfMastery/issues/10)
- [ ] [#11 Review and complete Unit 3, Lesson 10](https://github.com/mahashemi/SarfMastery/issues/11)

## Next session
1. Switch repository Settings → Pages → Source to GitHub Actions so the generated Jekyll branch deployment no longer competes with the React/Vite workflow.
2. Confirm the latest GitHub Actions build and custom Pages deployment after the documentation updates.
3. Run desktop/tablet/mobile QA, including 320px mobile width and RTL/LTR mixed text.
4. Obtain qualified Arabic/Sarf teacher review of Lessons 1–10.
5. Obtain fluent Persian and Urdu review of Lessons 1–10.
6. Add Lesson 11 on imperative (أَمْرٌ) and prohibitive (نَهْيٌ) forms; remember these use six second-person forms, not 14.
7. Add tests, progress persistence, and revision intervals after the lesson structure stabilises.

## Guardrails
Do not mark work complete unless implemented and verified. Do not invent book contents, page refs, narrations, or audio provenance. Do not add personal-name branding. Keep scholarly correctness and beginner usability together.
