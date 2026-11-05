# Chat Handoff — Sarf Mastery

**Last updated:** 2026-11-05  
**Repository:** https://github.com/mahashemi/SarfMastery  
**Current phase:** GitHub Pages is working and the latest TypeScript/Vite build plus deployment succeeded (Actions run 42102939532). Lessons 1–3 have core Persian/Urdu explanations and documented linguistic sources. Device QA and expert review remain pending.

## Read first
1. `PROJECT_STATUS.md` — authoritative checkbox task tracker.
2. `docs/LESSON_01_SOURCES.md` — source map and linguistic verification boundaries for Lesson 1.
3. `docs/LESSON_02_SOURCES.md` — source map and linguistic verification boundaries for Lesson 2.
4. `docs/LESSON_03_SOURCES.md` — source map and linguistic verification boundaries for Lesson 3.
5. `docs/PRODUCT_SPEC.md` — product and UX requirements.
6. `docs/CURRICULUM_PLAN.md` — agreed 60-day course.
7. `docs/DECISIONS.md` — decisions and open questions.

## Agreed requirements
- Product name: Sarf Mastery — صَرْف.
- No personal name or signature in the app.
- Responsive desktop/tablet/mobile web app.
- English primary; Persian and Urdu support planned.
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
- [x] Confirm GitHub Pages deployment (latest Actions run 42102939532).
- [x] Add refresh-safe hash route for Unit 1, Lesson 1.
- [x] Add introductory Sarf/Nahw explanation, كَتَبَ word-family examples, beginner FAQ, interactive root-letter check, and teach-back prompt.
- [x] Add core Lesson 1 explanatory paragraphs in English, Persian, and Urdu (remaining UI labels and dashboard are still English).
- [x] Add Lesson 2 at `#/lesson/02`, with the three word categories, multilingual explanations, six-question scored practice, and explicit audio-unavailable state.
- [x] Add Lesson 3 at `#/lesson/03`, with fiʿl/maṣdar distinctions, three verb forms, multilingual explanations, seven-question scored practice, and explicit audio-unavailable state.
- [x] Add six ك ت ب family examples, vocabulary glossary, root/pattern caveats, and claim-to-source notes.
- [ ] Qualified Arabic/Sarf and fluent Persian/Urdu review of Lesson 1.
- [ ] Verified human audio remains outstanding.
- [ ] Verify textbook editions and source mapping.
- [ ] Build audio/pronunciation pipeline.
- [ ] Implement exercises, progress persistence, and revision.

## GitHub issues
- [ ] [#1 Verify first GitHub Pages build and responsive UI checkpoint](https://github.com/mahashemi/SarfMastery/issues/1)
- [ ] [#2 Implement Unit 1, Lesson 1 as a complete beginner lesson](https://github.com/mahashemi/SarfMastery/issues/2)

## Next session
1. Confirm the latest GitHub Actions build and Pages deployment after the Lesson 1 changes.
2. Run desktop/tablet/mobile QA, including narrow mobile widths and RTL text.
3. Obtain qualified Arabic/Sarf and fluent Persian/Urdu review of Lesson 1.
4. Add the next lesson: word categories (كَلِمَة، اِسْم، فِعْل، حَرْف).
5. Add tests and accessible progress persistence after the lesson structure stabilises.

## Guardrails
Do not mark work complete unless implemented and verified. Do not invent book contents, page refs, narrations, or audio provenance. Do not add personal-name branding. Keep scholarly correctness and beginner usability together.
