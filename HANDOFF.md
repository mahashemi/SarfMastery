# Chat Handoff — Sarf Mastery

**Last updated:** 2026-11-05  
**Repository:** https://github.com/mahashemi/SarfMastery  
**Current phase:** First responsive interface checkpoint committed; build/deployment verification pending.

## Read first
1. `PROJECT_STATUS.md` — authoritative checkbox task tracker.
2. `docs/PRODUCT_SPEC.md` — product and UX requirements.
3. `docs/CURRICULUM_PLAN.md` — agreed 60-day course.
4. `docs/DECISIONS.md` — decisions and open questions.

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
- [ ] Run and verify production build.
- [ ] Confirm GitHub Pages deployment.
- [x] Add refresh-safe hash route for Unit 1, Lesson 1.
- [x] Add introductory Sarf/Nahw explanation, كَتَبَ word-family examples, beginner FAQ, interactive root-letter check, and teach-back prompt.
- [ ] Scholarly review and source verification of Lesson 1; Persian/Urdu support and verified audio remain outstanding.
- [ ] Verify textbook editions and source mapping.
- [ ] Build audio/pronunciation pipeline.
- [ ] Implement exercises, progress persistence, and revision.

## GitHub issues
- [ ] [#1 Verify first GitHub Pages build and responsive UI checkpoint](https://github.com/mahashemi/SarfMastery/issues/1)
- [ ] [#2 Implement Unit 1, Lesson 1 as a complete beginner lesson](https://github.com/mahashemi/SarfMastery/issues/2)

## Next session
1. Inspect GitHub Actions run and fix any build issues.
2. Enable Pages with GitHub Actions if not already enabled.
3. Review desktop/tablet/mobile screenshots and refine.
4. Review and refine Unit 1, Lesson 1 for linguistic accuracy and source citations; add Persian/Urdu support.
5. Add route-safe lesson URLs and update the tracker.

## Guardrails
Do not mark work complete unless implemented and verified. Do not invent book contents, page refs, narrations, or audio provenance. Do not add personal-name branding. Keep scholarly correctness and beginner usability together.
