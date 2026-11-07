# Chat Handoff — Sarf Mastery

**Last updated:** 2026-11-06  
**Repository:** https://github.com/mahashemi/SarfMastery  
**Current phase:** Hybrid beginner-learning redesign PR #21 has been merged to main (merge commit `2409a797079d2adb6a8d37ba8229ae88e7c0e8d0`). Lessons 1–3 now have discovery-first sections bridged to conventional Sarf instruction. Build/deployment status is not independently confirmed; expert review and responsive device QA remain pending.

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
12. `docs/LESSON_11_SOURCES.md` — source map and linguistic verification boundaries for Lesson 11.
13. `docs/LESSON_12_SOURCES.md` — source map and linguistic verification boundaries for Lesson 12.
14. `docs/LESSON_13_SOURCES.md` — source map and linguistic verification boundaries for Lesson 13.
15. `docs/LESSON_14_SOURCES.md` — source map and linguistic verification boundaries for Lesson 14.
16. `docs/LESSON_15_SOURCES.md` — source map and linguistic verification boundaries for Lesson 15.
17. `docs/LESSON_16_SOURCES.md` — source map and linguistic verification boundaries for Lesson 16.
18. `docs/LESSON_17_SOURCES.md` — source map and linguistic verification boundaries for Lesson 17.
19. `docs/LESSON_18_SOURCES.md` — source map and linguistic verification boundaries for Lesson 18.
20. `docs/LESSON_19_SOURCES.md` — source map and linguistic verification boundaries for Lesson 19.
21. `docs/PRODUCT_SPEC.md` — product and UX requirements.
22. `docs/CURRICULUM_PLAN.md` — agreed 60-day course.
23. `docs/DECISIONS.md` — decisions and open questions.

## Agreed requirements
- Product name: Sarf Mastery — صَرْف.
- No personal name or signature in the app.
- Responsive desktop/tablet/mobile web app.
- English primary; core explanations in Lessons 1–12 are available in Persian and Urdu; full UI translation and fluent review remain pending.
- Absolute beginner start, traditional Hawza sequence.
- Arabic with full tashkīl, transliteration, and pronunciation support.
- Lots of examples, anticipated beginner questions, exercises, revision, teach-back.
- 20–30 minutes/day; 60-day foundation, optional advanced consolidation later.
- Learn → Understand → Memorise → Apply → Explain → Teach.
- Verified Qur'an/Hadith references; distinguish morphology from tafsir.
- Qur'an deep-link format: `https://mahashemi.github.io/QuranMemorizer/#/surah/{surah}/ayah/{ayah}`.

## Merged hybrid redesign (PR #21)
- Lesson 1: interactive root discovery → bridge to جِذْرٌ → formal root/pattern comparison → practice and teach-back.
- Lesson 2: discover word functions through كِتَابٌ، كَتَبَ، فِي before naming اِسْمٌ، فِعْلٌ، حَرْفٌ.
- Lesson 3: compare verb forms and maṣdar in context before introducing the formal terminology.
- Responsive styling for discovery, bridge, and pattern panels.
- Plan updated in `docs/HYBRID_LEARNING_PLAN.md`.
- PR #21 is merged. GitHub connector returned no workflow runs/status checks for the merge commit, so verify the live deployment before claiming it is published. Do not describe these three lessons as expert-reviewed until qualified review and device QA are done.

## Current implementation
- [x] Public GitHub repository exists.
- [x] Initial React + TypeScript + Vite project committed.
- [x] Responsive dashboard shell and eight-unit course overview.
- [x] Neutral branding; no personal-name footer.
- [x] Product spec, curriculum plan, decisions, tracker, and handoff docs.
- [x] Run and verify production TypeScript/Vite build.
- [x] Confirm custom GitHub Pages deployment (latest code Actions run 42107792676).
- [ ] Verify repository Settings → Pages → Source is GitHub Actions. GitHub also triggers a generated Jekyll Pages workflow; some runs have been cancelled during pushes, so confirm the source setting to keep one deployment path. This setting change is not exposed through the available GitHub connector actions.
- [x] Add refresh-safe hash route for Unit 1, Lesson 1.
- [x] Add introductory Sarf/Nahw explanation, كَتَبَ word-family examples, beginner FAQ, interactive root-letter check, and teach-back prompt.
- [x] Add core Lesson 1 explanatory paragraphs in English, Persian, and Urdu (remaining UI labels and dashboard are still English).
- [x] Add Lesson 2 at `#/lesson/02`, with the three word categories, multilingual explanations, six-question scored practice, and explicit audio-unavailable state.
- [x] Add Lesson 3 at `#/lesson/03`, with fiʿl/maṣdar distinctions, three verb forms, multilingual explanations, seven-question scored practice, and explicit audio-unavailable state.
- [x] Add Lesson 4 at `#/lesson/04`, with root/added-letter distinctions, mujarrad/mazīd examples, mnemonic limitations, seven-question scored practice, and explicit audio-unavailable state.
- [x] Add Lesson 5 at `#/lesson/05`, with Mīzān Ṣarfī, ف ع ل mapping, six verb/noun patterns, and scored practice.
- [x] Add Lesson 6 at `#/lesson/06`, with the 14-slot pronoun overview and ghāʾib/mukhāṭab/mutakallim groups.
- [x] Add Lesson 7 at `#/lesson/07`, with the 14-slot active-past table, transliteration, English/Persian/Urdu glosses, and pronoun practice.
- [x] Add Lesson 8 at `#/lesson/08`, with the 14-slot active-muḍāriʿ table, four prefixes, shared-form cautions, transliteration, and pronoun practice.
- [x] Add Lesson 9 at `#/lesson/09`, with the passive-past table, Form I pattern, and Qur’anic morphology example.
- [x] Add Lesson 10 at `#/lesson/10`, with the passive-muḍāriʿ table and shared-form cautions.
- [x] Add Lesson 11 at `#/lesson/11`, with six second-person imperative/prohibitive slots, hamzat al-waṣl, and jussive nūn deletion.
- [x] Move the six Abwāb to Lesson 12 (`#/lesson/12`) in Unit 4, after the 14 ṣīghahs.
- [x] Add a direct lesson library on the dashboard with stable links to all 13 lessons.
- [x] Add Lesson 13 at `#/lesson/13`, introducing mujarrad/mazīd, forms I–X, and quadriliteral patterns.
- [x] Add Lesson 14 at `#/lesson/14`, introducing the maṣdar and common derived maṣdar patterns.
- [x] Add Lesson 15 at `#/lesson/15`, introducing active and passive participles.
- [x] Add Lesson 16 at `#/lesson/16`, introducing nouns of time, place, and instrument.
- [x] Add Lesson 17 at `#/lesson/17`, introducing the weak-root classes Mithāl, Ajwaf, Nāqiṣ, and Lafīf.
- [x] Add Lesson 18 at `#/lesson/18`, introducing hamzated and doubled roots.
- [x] Add Lesson 19 at `#/lesson/19`, introducing iʿlāl and idghām.
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
- [ ] [#7 Review and complete Unit 4, Lesson 12](https://github.com/mahashemi/SarfMastery/issues/7)
- [ ] [#8 Review and complete Unit 3, Lesson 7](https://github.com/mahashemi/SarfMastery/issues/8)
- [ ] [#9 Review and complete Unit 3, Lesson 8](https://github.com/mahashemi/SarfMastery/issues/9)
- [ ] [#10 Review and complete Unit 3, Lesson 9](https://github.com/mahashemi/SarfMastery/issues/10)
- [ ] [#11 Review and complete Unit 3, Lesson 10](https://github.com/mahashemi/SarfMastery/issues/11)
- [ ] [#12 Review and complete Unit 3, Lesson 11](https://github.com/mahashemi/SarfMastery/issues/12)
- [ ] [#13 Review and complete Unit 3, Lesson 6](https://github.com/mahashemi/SarfMastery/issues/13)

## Next session
1. Verify repository Settings → Pages → Source is GitHub Actions. GitHub also triggers a generated Jekyll Pages workflow; its runs have been cancelled in some pushes, so confirm the source setting to keep one deployment path.
2. Confirm the latest GitHub Actions build and custom Pages deployment after the documentation updates.
3. Run desktop/tablet/mobile QA, including 320px mobile width and RTL/LTR mixed text.
4. Obtain qualified Arabic/Sarf teacher review of Lessons 1–12.
5. Obtain fluent Persian and Urdu review of Lessons 1–12.
6. Add Lesson 20 on Qur'an and Hadith morphology practice, following the agreed curriculum sequence. Current draft coverage is 19/60 lessons (31.7%); overall product readiness remains about 30% pending expert review, audio, learner features, accessibility, and device QA. Current course draft coverage is 18/60 lessons (30%); overall product readiness is approximately 30% pending expert review, audio, learner features, accessibility, and device QA.
7. Add tests, progress persistence, and revision intervals after the lesson structure stabilises.

## Guardrails
Do not mark work complete unless implemented and verified. Do not invent book contents, page refs, narrations, or audio provenance. Do not add personal-name branding. Keep scholarly correctness and beginner usability together.
