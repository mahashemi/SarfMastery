# Sarf Mastery — Project Status & Task Tracker

**Last updated:** 2026-11-05  
**Overall status:** Initial responsive scaffold committed; production build and deployment verification pending.  
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
- [x] Mark unfinished navigation destinations as coming soon rather than presenting fake pages.
- [ ] Verify production build and GitHub Pages deployment.
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
- [ ] Verify deployment from main.
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
- [ ] Explain كَلِمَة and word categories.
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
- [ ] Create per-lesson source notes.
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

## 13. Session log
| Date | Change | Verification |
|---|---|---|
| 2026-11-05 | Initial responsive app scaffold and project documentation committed | Build/deployment not yet verified |
| 2026-11-05 | GitHub Pages workflow adjusted; two priority issues opened | Awaiting GitHub Actions run and Pages settings verification |
| 2026-11-05 | Added refresh-safe Lesson 1 route, beginner explanations, word-family examples, interactive check, and teach-back | Code committed; scholarly/source review and audio still pending |
