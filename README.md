# Sarf Mastery — صَرْف

A responsive, beginner-first learning environment for Arabic morphology (علم الصرف), following a traditional Hawza sequence with clear English explanations.

## Status

The app is live on GitHub Pages, and the latest production build/deployment succeeded. Lessons 1–14 are early drafts with core English, Persian, and Urdu explanations; qualified language review, responsive QA, and a GitHub Pages source-setting check remain outstanding.

See [PROJECT_STATUS.md](PROJECT_STATUS.md), [HANDOFF.md](HANDOFF.md), and the source notes for [Lesson 1](docs/LESSON_01_SOURCES.md), [Lesson 2](docs/LESSON_02_SOURCES.md), [Lesson 3](docs/LESSON_03_SOURCES.md), [Lesson 4](docs/LESSON_04_SOURCES.md), [Lesson 5](docs/LESSON_05_SOURCES.md), [Lesson 6](docs/LESSON_06_SOURCES.md), [Lesson 7](docs/LESSON_07_SOURCES.md), [Lesson 8](docs/LESSON_08_SOURCES.md), [Lesson 9](docs/LESSON_09_SOURCES.md), [Lesson 10](docs/LESSON_10_SOURCES.md), [Lesson 11](docs/LESSON_11_SOURCES.md), and [Lesson 12](docs/LESSON_12_SOURCES.md), and [Lesson 13](docs/LESSON_13_SOURCES.md), and [Lesson 14](docs/LESSON_14_SOURCES.md).

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
- Traditional Hawza progression, modern accessible explanations.
- Fully vowelled Arabic examples, transliteration, and pronunciation support.
- English primary; core explanations in Lessons 1–14 include Persian and Urdu. Full UI translation and fluent review remain pending.
- Qur’an and hadith citations must be verified. Morphology is not tafsīr.
- No personal-name branding in the app.
- Original explanations and exercises; do not reproduce copyrighted textbook chapters.
