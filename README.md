# Sarf Mastery — صَرْف

A responsive, beginner-first learning environment for Arabic morphology (علم الصرف), following a traditional Hawza sequence with clear English explanations.

## Learning approach

The course is being redesigned around a **hybrid learning method**: first encounter meaningful Arabic, listen and observe examples, notice patterns, make predictions, and use the language; then connect those discoveries to conventional Sarf terminology, rules, conjugation paradigms, and systematic practice. The aim is intuition **and** formal mastery—not memorisation without understanding, and not discovery without rigorous instruction.

Read the detailed [Hybrid Learning & Course Rebuild Plan](docs/HYBRID_LEARNING_PLAN.md) for the teaching philosophy, lesson architecture, 60-day syllabus, mastery criteria, content standards, responsive requirements, and release phases.

## Status

The application has a responsive React/TypeScript foundation, GitHub Pages deployment, and 19 lesson drafts. These drafts are not yet 19 complete self-study lessons. The hybrid redesign, expanded practice, verified audio, qualified language/content review, progress/revision features, accessibility checks, and real-device QA remain in progress.

See [PROJECT_STATUS.md](PROJECT_STATUS.md), [HANDOFF.md](HANDOFF.md), the [Hybrid Learning Plan](docs/HYBRID_LEARNING_PLAN.md), and source notes for [Lessons 1–19](docs/).

## Live app

[Open Sarf Mastery](https://mahashemi.github.io/SarfMastery/)

- [Lesson 1: Introduction to Sarf](https://mahashemi.github.io/SarfMastery/#/lesson/01)
- [Lesson 2: Word categories](https://mahashemi.github.io/SarfMastery/#/lesson/02)
- [Lesson 3: Verb and maṣdar](https://mahashemi.github.io/SarfMastery/#/lesson/03)
- [Lesson 4: Original and added letters](https://mahashemi.github.io/SarfMastery/#/lesson/04)
- [Lesson 5: Mīzān Ṣarfī](https://mahashemi.github.io/SarfMastery/#/lesson/05)
- [Lesson 6: 14 ṣīghahs overview](https://mahashemi.github.io/SarfMastery/#/lesson/06)
- [Lesson 7: Past active — 14 forms](https://mahashemi.github.io/SarfMastery/#/lesson/07)
- [Lesson 8: Present active — 14 forms](https://mahashemi.github.io/SarfMastery/#/lesson/08)
- [Lesson 9: Past passive — 14 forms](https://mahashemi.github.io/SarfMastery/#/lesson/09)
- [Lesson 10: Present passive — 14 forms](https://mahashemi.github.io/SarfMastery/#/lesson/10)
- [Lesson 11: Imperative and prohibitive](https://mahashemi.github.io/SarfMastery/#/lesson/11)
- [Lesson 12: Six Abwāb](https://mahashemi.github.io/SarfMastery/#/lesson/12)
- [Lesson 13: Mujarrad, Mazīd, and forms I–X](https://mahashemi.github.io/SarfMastery/#/lesson/13)
- [Lesson 14: The maṣdar](https://mahashemi.github.io/SarfMastery/#/lesson/14)
- [Lesson 15: Active and passive participles](https://mahashemi.github.io/SarfMastery/#/lesson/15)
- [Lesson 16: Time, place, and instrument nouns](https://mahashemi.github.io/SarfMastery/#/lesson/16)
- [Lesson 17: Weak verb root classes](https://mahashemi.github.io/SarfMastery/#/lesson/17)
- [Lesson 18: Hamzated and doubled roots](https://mahashemi.github.io/SarfMastery/#/lesson/18)
- [Lesson 19: Iʿlāl and idghām](https://mahashemi.github.io/SarfMastery/#/lesson/19)

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages

The repository is configured to deploy through GitHub Actions. In Settings → Pages, select **GitHub Actions** as the source. The Vite base path is configured for `/SarfMastery/`.

## Product principles

- Absolute beginner entry point; no assumed Sarf knowledge.
- Hybrid pedagogy: natural discovery and meaningful exposure, explicitly bridged to conventional Sarf instruction.
- Traditional Hawza progression, modern accessible explanations.
- Fully vowelled Arabic examples, transliteration, and pronunciation support.
- English primary; core explanations in Lessons 1–19 include Persian and Urdu. Full UI translation and fluent review remain pending.
- Qur’an and hadith citations must be verified. Morphology is not tafsīr.
- No personal-name branding in the app.
- Original explanations and exercises; do not reproduce copyrighted textbook chapters.
