# Sarf Mastery — صَرْف

A responsive Arabic-learning environment designed to build usable Arabic first, then teach formal grammar primarily in Arabic, and ultimately prepare learners for traditional Hawza study.

## Learning pathway

**Arabic language first → Arabic-medium grammar → Hawza mastery**

1. Optional Arabic-script literacy bridge.
2. Functional beginner Arabic: listening, speaking, reading, and writing.
3. Connected Arabic: short narratives, descriptions, and explanations.
4. Arabic as the language of learning: understand classroom instructions and simple explanations.
5. Formal النَّحْوُ and الصَّرْفُ taught primarily in Arabic.
6. Traditional Hawza texts and careful analysis of authentic material.

The governing plan is [Language-First Arabic Curriculum](docs/LANGUAGE_FIRST_CURRICULUM.md). The previous 60-day Sarf-first plan is superseded as the learner entry sequence. The existing 19 Sarf lesson drafts are retained as source material for the later grammar stage; they are not the starting path.

## Pedagogy

Learn through meaningful language and pattern discovery before formalising grammar. During the language stages, learners use Arabic in context and notice patterns without being forced to memorise advanced terminology or paradigms prematurely. Once they can understand simple Arabic explanations, grammar instruction progressively switches to Arabic. English, Persian, and Urdu remain optional scaffolds.

## Project status

The React/TypeScript/Vite app shell, responsive foundation, GitHub Pages workflow, and 19 Sarf lesson drafts exist. The Arabic language foundation, four-skill learning sequence, verified human audio, readiness gate, and full learner progress/revision experience remain to be built.

See:
- [Language-First Curriculum](docs/LANGUAGE_FIRST_CURRICULUM.md)
- [Project Status](PROJECT_STATUS.md)
- [Product Specification](docs/PRODUCT_SPEC.md)
- [Hybrid Learning Plan](docs/HYBRID_LEARNING_PLAN.md)
- [Handoff](HANDOFF.md)

## Live app

[Open Sarf Mastery](https://mahashemi.github.io/SarfMastery/)

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Product principles

- Start from the learner's actual Arabic literacy and language ability.
- Teach clear الفصحى, then progressively bridge to classical and Qur'anic Arabic.
- All four skills matter: listening, speaking, reading, and writing.
- Fully vowel early materials; fade transliteration as decoding improves.
- Teach formal grammar in Arabic only after demonstrated readiness.
- Keep the app responsive across desktop, tablet, and mobile.
- No personal-name branding.
- Verify Arabic content, audio, Qur'an/Hadith citations, and textbook references.
- Write original explanations and exercises; do not reproduce copyrighted textbook chapters.
