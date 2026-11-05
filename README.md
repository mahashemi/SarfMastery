# Sarf Mastery — صَرْف

A responsive, beginner-first learning environment for Arabic morphology (علم الصرف), following a traditional Hawza sequence with clear English explanations.

## Status
The initial app is live on GitHub Pages, and the latest production build/deployment succeeded. Lessons 1–7 are early drafts with core English, Persian, and Urdu explanations; qualified language review, responsive QA, and a GitHub Pages source-setting cleanup remain outstanding. See [PROJECT_STATUS.md](PROJECT_STATUS.md), [HANDOFF.md](HANDOFF.md), and the source notes for [Lesson 1](docs/LESSON_01_SOURCES.md), [Lesson 2](docs/LESSON_02_SOURCES.md), [Lesson 3](docs/LESSON_03_SOURCES.md), [Lesson 4](docs/LESSON_04_SOURCES.md), [Lesson 5](docs/LESSON_05_SOURCES.md), and [Lesson 6](docs/LESSON_06_SOURCES.md).

## Live app

[Open Sarf Mastery](https://mahashemi.github.io/SarfMastery/) · [Start Lesson 1](https://mahashemi.github.io/SarfMastery/#/lesson/01) · [Lesson 2: Word categories](https://mahashemi.github.io/SarfMastery/#/lesson/02) · [Lesson 3: Verb and maṣdar](https://mahashemi.github.io/SarfMastery/#/lesson/03) · [Lesson 4: Original and added letters](https://mahashemi.github.io/SarfMastery/#/lesson/04) · [Lesson 5: Mīzān Ṣarfī](https://mahashemi.github.io/SarfMastery/#/lesson/05) · [Lesson 6: Six Abwāb](https://mahashemi.github.io/SarfMastery/#/lesson/06) · [Lesson 7: Past active 14 forms](https://mahashemi.github.io/SarfMastery/#/lesson/07)

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
- English primary; core explanations in Lessons 1–3 include Persian and Urdu; full UI translation and fluent review remain pending.
- Qur'an and hadith citations must be verified. Morphology is not tafsir.
- No personal-name branding in the app.
- Original explanations and exercises; do not reproduce copyrighted textbook chapters.
