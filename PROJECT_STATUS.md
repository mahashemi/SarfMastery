# Sarf Mastery — Project Status & Task Tracker

**Last updated:** 2026-11-05  
**Overall status:** Latest production TypeScript/Vite build and custom deployment succeeded (Actions run 42108660443); Lessons 1–13 have multilingual core explanations and documented sources. Responsive QA, expert review, and Pages source cleanup remain pending.  
**Repository:** https://github.com/mahashemi/SarfMastery

> Check a task only after implementation and verification. Planning, mockups, and placeholders do not count as completion.

## 0. Current checkpoint
- [x] Product direction and audience agreed.
- [x] Product name: Sarf Mastery — صَرْف.
- [x] Personal name removed from branding and footer.
- [x] Responsive desktop/tablet/mobile requirement.
- [x] Beginner-first pedagogy documented.
- [x] 60-day syllabus drafted.
- [x] Pronunciation/transliteration requirements documented.
- [x] GitHub repository created.
- [x] Initial React + TypeScript + Vite scaffold committed.
- [x] Responsive dashboard shell and course-unit overview committed.
- [x] Product spec, curriculum, decisions, handoff, and task tracker committed.
- [x] Add refresh-safe route for Unit 1, Lesson 1.
- [x] Add first beginner lesson draft, examples, FAQ, interactive check, and teach-back.
- [x] Expand Lesson 1 with objectives, a six-word ك ت ب family, a key-term glossary, and clearer root/pattern caveats.
- [x] Add core explanatory copy in English, Persian, and Urdu (full UI translation remains future work).
- [x] Add claim-to-source notes for Lesson 1 and Lesson 2 linguistic material.
- [x] Add Lesson 2 route, three-category explanations, multilingual examples, classification quiz, and explicit audio-unavailable state.
- [x] Add Lesson 3 route, verb/maṣdar explanations, Form I maṣdar caution, seven-item classification quiz, and explicit audio-unavailable state.
- [x] Add Lesson 4 route, mujarrad/mazīd distinction, root/added-letter examples, mnemonic limitations, seven-item classification quiz, and explicit audio-unavailable state.
- [x] Add Lesson 5 route, Mīzān Ṣarfī concepts, root-to-pattern mapping, six example weights, and scored practice.
- [x] Add Lesson 6 route, 14-slot pronoun overview, and ghāʾib/mukhāṭab/mutakallim group practice.
- [x] Add a home-page lesson library with direct links to all 12 lessons and update unit draft counts.
- [x] Add Lesson 7 route, complete 14-slot past-active table, transliteration, multilingual glosses, and pronoun-identification practice.
- [x] Add Lesson 8 route, complete 14-slot active-muḍāriʿ table, four-prefix explanation, shared-form cautions, and pronoun practice.
- [x] Add Lesson 9 route, 14-slot passive-past table, Form I passive pattern, Qur'anic example, and pronoun practice.
- [x] Add Lesson 10 route, 14-slot passive-muḍāriʿ table, Form I passive pattern, shared-form cautions, and pronoun practice.
- [x] Add Lesson 11 route, six second-person imperative/prohibitive slots, hamzat al-waṣl derivation, jussive nūn deletion, and practice.
- [x] Move the six-Abwāb lesson to Lesson 12 in Unit 4, after the 14 ṣīghahs.
- [x] Add Lesson 13 in Unit 5 covering mujarrad/mazīd, triliteral forms I–X, and quadriliteral patterns.
- [x] Mark unfinished navigation destinations as coming soon rather than presenting fake pages.
- [x] Verify production TypeScript/Vite build and GitHub Pages deployment (Actions run 42101525058).
- [ ] Approve first UI checkpoint across desktop/tablet/mobile.

## 1. Repository and engineering
### Repository
- [x] Create public repository under mahashemi.
- [x] Add README and project documentation.
- [ ] Add issue templates for bugs and lesson-content corrections.
- [ ] Add contribution/content-verification guidance.
- [ ] Establish release tags and checkpoint convention.
### Front-end foundation
- [x] React + TypeScript + Vite baseline.
- [x] Configure repository-aware Vite base path.
- [ ] Add linting and formatting.
- [ ] Add unit/component tests.
- [ ] Add typecheck/build to CI.
- [ ] Add internal-link and citation checks.
- [ ] Add route-safe lesson URLs and 404 fallback.
### GitHub Pages
- [x] Add GitHub Actions deployment workflow.
- [ ] Set Pages source to GitHub Actions in repository settings.
- [x] Verify deployment from main (Actions run 42101525058).
- [ ] Verify direct lesson URL and refresh behaviour.
- [ ] Document rollback/redeployment.

## 2. Product design and responsive UX
### Visual system
- [x] Scholarly calm visual direction: ivory, deep green, muted gold.
- [ ] Select Arabic font and test tashkīl placement.
- [ ] Select Latin, Persian, and Urdu typography.
- [ ] Define RTL/LTR mixed-content conventions.
- [ ] Define consistent interaction/focus states.
### Desktop
- [x] Initial sidebar and dashboard layout.
- [ ] Refine reading column and large conjugation tables.
- [ ] Add explanation/practice split layout where useful.
- [ ] Keyboard navigation and focus QA.
### Tablet
- [x] Responsive two-column card layout breakpoint.
- [ ] Collapsible navigation and touch QA.
- [ ] Test portrait and landscape.
### Mobile
- [x] Compact navigation and bottom navigation scaffold.
- [x] Single-column lesson preview.
- [ ] Test narrow widths and eliminate unintended overflow.
- [ ] Test real iOS Safari and Android Chrome.
- [ ] Check safe areas and landscape.
### Accessibility
- [ ] Semantic landmarks and heading hierarchy review.
- [ ] Keyboard-only navigation.
- [ ] Visible focus indicators.
- [ ] Screen-reader labels for all controls.
- [ ] Contrast and zoom checks.
- [ ] Reduced-motion support review.
- [ ] Mixed RTL/LTR and Arabic screen-reader testing.

## 3. Learning architecture
- [ ] Build Learn, Listen, Practice, Explore, Revise, Teach destinations.
- [ ] Dashboard next-lesson/resume behaviour.
- [ ] Course map and unit navigation.
- [ ] Searchable Sarf glossary.
- [ ] Searchable word/example library.
- [ ] Beginner FAQ/question bank.
- [ ] Daily 20–30 minute session flow.
- [ ] Stable lesson URLs, breadcrumbs, previous/next.
- [ ] Distinguish required vs optional content.

## 4. Lesson template and pedagogy
For every lesson:
- [ ] Learning objectives.
- [ ] Arabic term with full tashkīl and transliteration.
- [ ] Plain-English definition and Persian/Urdu support.
- [ ] Explain why the concept matters.
- [ ] Step-by-step explanation from zero.
- [ ] At least five examples for major rules.
- [ ] Transliteration and meanings for examples.
- [ ] Compare/contrast examples.
- [ ] Beginner FAQs and common mistakes.
- [ ] Guided and independent practice.
- [ ] Answer explanations.
- [ ] Verified Qur'an/Hadith application where appropriate.
- [ ] Real audio or explicit unavailable state.
- [ ] Recall exercise and teach-back task.
- [ ] Source metadata verified.

## 5. 60-day curriculum
### Unit 1 — Foundations (Days 1–6)
- [ ] Define علم الصرف and its purpose.
- [x] Explain كَلِمَة and the three traditional word categories.
- [x] Introduce فِعْلٌ, its basic forms, and مَصْدَرٌ as a verbal noun.
- [x] Introduce original and added letters, and the basic distinction between مُجَرَّدٌ and مَزِيدٌ.
- [x] Introduce the Mīzān Ṣarfī and six common Abwāb of the triliteral mujarrad.
- [x] Introduce the 14-slot ṣīghah order and the active past conjugation.
- [x] Introduce the active muḍāriʿ, its four prefixes, and the 14-slot conjugation table.
- [ ] Introduce فِعْل and مَصْدَر.
- [ ] Root letters vs vowels/pattern.
- [ ] Original vs additional letters.
- [ ] Sarf vs Nahw.
- [ ] Triliteral roots.
- [ ] Diagnostic and unit assessment.
### Unit 2 — Mīzān Ṣarfī (Days 7–12)
- [ ] Explain الميزان الصرفي and why it exists.
- [ ] Introduce ف ع ل as the scale.
- [ ] Match root letters to scale letters.
- [ ] Added letters on the scale.
- [ ] Sound triliteral examples.
- [ ] Doubled/weak examples.
- [ ] Pattern-identification drills.
### Unit 3 — Fourteen forms (Days 13–22)
- [ ] Pronoun order and 14 slots.
- [ ] Gender, number, singular/dual/plural.
- [ ] Why dual appears twice.
- [ ] Māḍī Maʿrūf 14-form table.
- [ ] Māḍī Majhūl 14-form table.
- [ ] Muḍāriʿ Maʿrūf 14-form table.
- [ ] Muḍāriʿ Majhūl 14-form table.
- [ ] Amr and Nahy six-form distinction.
- [ ] Recitation and reverse-identification drills.
- [ ] Verify all forms with trusted references.
### Unit 4 — Six Abwāb (Days 23–30)
- [ ] Explain باب and past/present vowel relationship.
- [ ] نَصَرَ يَنْصُرُ
- [ ] ضَرَبَ يَضْرِبُ
- [ ] فَتَحَ يَفْتَحُ
- [ ] سَمِعَ يَسْمَعُ
- [ ] كَرُمَ يَكْرُمُ
- [ ] حَسِبَ يَحْسِبُ
- [ ] Verify convention against selected textbook.
### Unit 5 — Mujarrad/Mazīd (Days 31–38)
- [ ] Explain المُجَرَّدُ وَالْمَزِيدُ.
- [ ] Triliteral Mujarrad.
- [ ] Common derived forms.
- [ ] Additional letters and semantic effects.
- [ ] Quadriliteral roots and patterns.
- [ ] Root-family comparisons.
### Unit 6 — Derived nouns (Days 39–45)
- [ ] مَصْدَر
- [ ] اِسْمُ الْفَاعِلِ
- [ ] اِسْمُ الْمَفْعُولِ
- [ ] اِسْمُ الزَّمَانِ
- [ ] اِسْمُ الْمَكَانِ
- [ ] اِسْمُ الْآلَةِ
- [ ] Same-root derivation exercises.
### Unit 7 — Sound and weak verbs (Days 46–53)
- [ ] الصَّحِيحُ وَالْمُعْتَلُّ.
- [ ] Ṣaḥīḥ.
- [ ] Mithāl.
- [ ] Ajwaf.
- [ ] Nāqiṣ.
- [ ] Lafīf and subtypes.
- [ ] Hamzated and doubled verbs.
- [ ] Iʿlāl, Ibdāl, Idghām.
- [ ] Verify examples and rules.
### Unit 8 — Apply and teach (Days 54–60)
- [ ] Guided Qur'anic word analysis.
- [ ] Guided hadith word analysis.
- [ ] Root, pattern, form, derived meaning.
- [ ] Morphology vs context/tafsir limits.
- [ ] Unseen-word analysis.
- [ ] Written final assessment.
- [ ] Oral recitation assessment.
- [ ] Teach-a-beginner demonstration.

## 6. Source library and verification
- [ ] Identify exact Mīzān uṣ-Ṣarf edition.
- [ ] Verify terminology and contents.
- [ ] Identify exact Mīzān wa Munshaʿib edition.
- [ ] Verify conjugation tables.
- [ ] Verify Dānesh-e Ṣarf edition (Seyyed Hamid Jazayeri, نصایح).
- [ ] Review Ṣarf-e Bahāʾī as supplement.
- [ ] Review Taṣrīf al-ʿIzzī as supplement.
- [ ] Review Irshād al-Ṣarf as supplement.
- [ ] Record bibliographic metadata.
- [ ] Add page refs only after checking exact edition.
- [x] Create `docs/LESSON_01_SOURCES.md` with claim-to-source mapping and scope limits.
- [ ] Create source notes for subsequent lessons.
- [ ] Ensure explanations/exercises are original.
- [ ] Verify every Qur'an citation.
- [ ] Verify hadith attribution and authenticity carefully.
- [ ] Keep morphology distinct from tafsir.

## 7. Pronunciation and audio
- [ ] Define transliteration standard.
- [ ] Explain ḥ, kh, ʿ, gh, ṣ, ḍ, ṭ, ẓ, q, sh, th, dh.
- [ ] Explain short/long vowels.
- [ ] Explain shaddah, sukūn, tanwīn.
- [ ] Explain hamzat al-qaṭʿ and hamzat al-waṣl.
- [ ] Add transliteration to beginner examples.
- [ ] Select trusted audio source/Arabic speaker.
- [ ] Confirm audio licensing.
- [ ] Word-level recordings.
- [ ] Phrase-level recordings.
- [ ] Conjugation-table recitations.
- [ ] Normal and slow playback.
- [ ] Listen-and-follow and repeat practice.
- [ ] Optional learner recording.
- [ ] Browser TTS clearly labelled fallback.
- [ ] Test voices across browsers.
- [ ] Selective offline audio download.

## 8. Practice and assessment
- [ ] Multiple choice.
- [ ] Root-letter identification.
- [ ] وزن matching.
- [ ] Ṣīghah identification.
- [ ] Complete missing conjugation.
- [ ] Active/passive transformation.
- [ ] Mujarrad/Mazīd identification.
- [ ] Derived noun formation.
- [ ] Weak-verb category identification.
- [ ] Unseen word analysis.
- [ ] Explain a rule in own words.
- [ ] Teach-back response.
- [ ] Answer explanations.
- [ ] Spaced-repetition schedule.
- [ ] Daily review queue.
- [ ] Unit mastery summaries.

## 9. Progress and offline
- [ ] Local lesson completion.
- [ ] Local exercise attempts and scores.
- [ ] Revision due dates.
- [ ] Persist language/audio preferences.
- [ ] Progress export/import.
- [ ] Confirmed reset-progress action.
- [ ] Service worker after core app stabilises.
- [ ] Cache lesson content.
- [ ] Cache audio selectively.
- [ ] Test persistence across updates.
- [ ] Document local data handling.

## 10. QA and release
- [ ] Arabic spelling/tashkīl review.
- [ ] Transliteration consistency.
- [ ] English/Persian/Urdu review.
- [ ] Qur'an links verified.
- [ ] Hadith citations verified.
- [ ] All controls functional or clearly disabled.
- [ ] Desktop common laptop widths.
- [ ] Tablet portrait/landscape.
- [ ] iOS Safari.
- [ ] Android Chrome.
- [ ] Firefox and Chromium desktop.
- [ ] Performance and bundle-size review.
- [ ] Console/network error review.
- [ ] Keyboard and screen-reader basics.
- [ ] Clean production build.
- [ ] Publish stable checkpoint and update handoff.

## 11. Future enhancements
- [ ] Optional advanced 30-day consolidation.
- [ ] Advanced patterns and variant conventions.
- [ ] Personal word notebook.
- [ ] Conjugation-table generator.
- [ ] Printable revision sheets.
- [ ] Teacher/classroom mode.
- [ ] Shareable progress report.
- [ ] Additional languages.
- [ ] PWA install experience.
- [ ] Privacy-conscious cloud sync only if justified.

## 12. GitHub issues
- [ ] [#1 Verify first GitHub Pages build and responsive UI checkpoint](https://github.com/mahashemi/SarfMastery/issues/1)
- [ ] [#2 Implement Unit 1, Lesson 1 as a complete beginner lesson](https://github.com/mahashemi/SarfMastery/issues/2)
- [ ] [#3 Review and complete Unit 1, Lesson 2 — the three kinds of Arabic word](https://github.com/mahashemi/SarfMastery/issues/3)
- [ ] [#4 Review and complete Unit 1, Lesson 3 — verb and maṣdar](https://github.com/mahashemi/SarfMastery/issues/4)
- [ ] [#5 Review and complete Unit 1, Lesson 4 — original and added letters](https://github.com/mahashemi/SarfMastery/issues/5)
- [ ] [#6 Review and complete Unit 2, Lesson 5 — the Mīzān Ṣarfī](https://github.com/mahashemi/SarfMastery/issues/6)
- [ ] [#7 Review and complete Unit 4, Lesson 12 — the six common Abwāb](https://github.com/mahashemi/SarfMastery/issues/7)
- [ ] [#8 Review and complete Unit 3, Lesson 7 — 14 ṣīghahs of the past active](https://github.com/mahashemi/SarfMastery/issues/8)
- [ ] [#9 Review and complete Unit 3, Lesson 8 — 14 ṣīghahs of the active muḍāriʿ](https://github.com/mahashemi/SarfMastery/issues/9)
- [ ] [#10 Review and complete Unit 3, Lesson 9 — 14 ṣīghahs of the passive past](https://github.com/mahashemi/SarfMastery/issues/10)
- [ ] [#11 Review and complete Unit 3, Lesson 10 — 14 ṣīghahs of the passive muḍāriʿ](https://github.com/mahashemi/SarfMastery/issues/11)
- [ ] [#12 Review and complete Unit 3, Lesson 11 — imperative and prohibitive forms](https://github.com/mahashemi/SarfMastery/issues/12)
- [ ] [#13 Review and complete Unit 3, Lesson 6 — introduction to the 14 ṣīghahs](https://github.com/mahashemi/SarfMastery/issues/13)
- [ ] [#14 Review and complete Unit 5, Lesson 13 — mujarrad, mazīd, and verb forms I–X](https://github.com/mahashemi/SarfMastery/issues/14)

## 13. Session log
| Date | Change | Verification |
|---|---|---|
| 2026-11-05 | Initial responsive app scaffold and project documentation committed | Build/deployment not yet verified |
| 2026-11-05 | GitHub Pages workflow adjusted; two priority issues opened | Awaiting GitHub Actions run and Pages settings verification |
| 2026-11-05 | Added refresh-safe Lesson 1 route, beginner explanations, word-family examples, interactive check, and teach-back | Code committed; scholarly/source review and audio still pending |
| 2026-11-05 | Expanded Lesson 1 with English/Persian/Urdu core explanations, six ك ت ب examples, glossary, and claim-to-source notes | TypeScript/Vite build and GitHub Pages deployment succeeded in Actions run 42101525058; responsive device QA and qualified language review pending |
| 2026-11-05 | Added Lesson 2 on اِسْمٌ، فِعْلٌ، حَرْفٌ with multilingual explanations, six classification questions, audio-unavailable state, and source notes | TypeScript/Vite build and GitHub Pages deployment succeeded in Actions run 42102480699; teacher/language review and device QA pending |
| 2026-11-05 | Added Lesson 3 on verbs and maṣdar with multilingual explanations, verb forms, Form I caution, seven classification questions, and source notes | TypeScript/Vite build and GitHub Pages deployment succeeded in Actions run 42102939532; teacher/language review and device QA pending |
| 2026-11-05 | Added Lesson 4 on original/added letters, mujarrad/mazīd, the mnemonic, and seven scored exercises with source notes | TypeScript/Vite build and custom Pages deployment succeeded in Actions run 42103516437; automatic Jekyll branch deployment also runs and Pages source should be switched to GitHub Actions |
| 2026-11-05 | Added Lesson 5 on the Mīzān Ṣarfī and Lesson 6 on the six Abwāb, each with English/Persian/Urdu explanations, interactive practice, audio-unavailable notices, and source notes | TypeScript/Vite build and custom Pages deployment succeeded in Actions run 42104565190; expert review, device QA, and Pages source cleanup pending |
| 2026-11-05 | Added Lesson 7 with the 14-slot past-active ṣīghah table, transliteration, localized glosses, and pronoun practice | TypeScript/Vite build and custom Pages deployment succeeded in Actions run 42105111437; expert review and responsive QA pending |
| 2026-11-05 | Added Lesson 8 with the 14-slot active-muḍāriʿ table, four prefix letters, shared-form cautions, and pronoun practice | TypeScript/Vite build and custom Pages deployment succeeded in Actions run 42105539151; expert review and responsive QA pending |
| 2026-11-05 | Added Lesson 9 with the 14-slot passive-past table, Form I passive pattern, Qur'anic morphology example, and source notes | TypeScript/Vite build and custom Pages deployment succeeded in Actions run 42106277003; expert review and responsive QA pending |
| 2026-11-05 | Added Lesson 10 with the 14-slot passive-muḍāriʿ table, Form I passive pattern, shared-form cautions, and source notes | TypeScript/Vite build and custom Pages deployment succeeded in Actions run 42106277003; expert review and responsive QA pending |
| 2026-11-05 | Added Lesson 11 with six imperative/prohibitive slots, jussive derivation, hamzat al-waṣl, and nūn deletion explanations | TypeScript/Vite build and custom Pages deployment succeeded in Actions run 42106827583; expert review and responsive QA pending |
| 2026-11-05 | Corrected curriculum order: Lesson 6 now introduces the 14 ṣīghahs; the six-Abwāb lesson is Lesson 12 in Unit 4. Added a home-page lesson library with direct links to all 12 lessons. | TypeScript/Vite build and custom Pages deployment succeeded in Actions run 42107792676; expert review and responsive QA pending |
| 2026-11-05 | Added Lesson 13 on mujarrad/mazīd, the ten common triliteral forms I–X, and quadriliteral patterns; added it to the home lesson library. | TypeScript/Vite build and custom Pages deployment succeeded in Actions run 42108660443; expert review and responsive QA pending |
