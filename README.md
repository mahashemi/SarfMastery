# Sarf Mastery — صَرْف

A responsive, beginner-first learning environment for Arabic morphology (علم الصرف), following a traditional Hawza sequence with clear English explanations.

## Status
The initial app is live on GitHub Pages, and the latest production build/deployment succeeded. Lesson 1 is being expanded and reviewed; this is an early learning checkpoint, not a finished course. See [PROJECT_STATUS.md](PROJECT_STATUS.md), [HANDOFF.md](HANDOFF.md), and [Lesson 1 source notes](docs/LESSON_01_SOURCES.md) for status and verification boundaries.

## Live app

[Open Sarf Mastery](https://mahashemi.github.io/SarfMastery/) · [Start Lesson 1](https://mahashemi.github.io/SarfMastery/#/lesson/01)

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
- English primary; Persian and Urdu support planned.
- Qur'an and hadith citations must be verified. Morphology is not tafsir.
- No personal-name branding in the app.
- Original explanations and exercises; do not reproduce copyrighted textbook chapters.
