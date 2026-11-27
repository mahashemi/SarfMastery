# Current handoff — language-first implementation (27 November 2026)

**Governing curriculum:** [docs/LANGUAGE_FIRST_CURRICULUM.md](docs/LANGUAGE_FIRST_CURRICULUM.md)

**Current application PR:** [#27 — Build language-first Arabic entry and Week 1](https://github.com/mahashemi/SarfMastery/pull/27)  
**Dependency:** stacked on [#26 — Adopt language-first Arabic learning pathway](https://github.com/mahashemi/SarfMastery/pull/26). Merge #26 first; #27 targets its branch. Neither PR has been merged and the live app has not changed.

## Implemented in PR #27
- Language-first home page and six-stage pathway.
- Self-check for Arabic script, listening, speaking, reading, and writing.
- Optional literacy bridge.
- Initial Week 1 lesson slice: greetings, introductions, classroom instructions, dialogue comprehension, reading, speaking prompts, and writing.
- Browser speech fallback only uses an installed Arabic voice and is explicitly described as computer-generated, not verified human audio.
- Legacy Sarf lesson URLs route to a later-stage grammar preview rather than bypassing the language-first sequence.
- Pull-request validation workflow.

## Validation
- First validation attempt failed because the repository has no npm lockfile and the workflow incorrectly used npm cache.
- Workflow corrected to use `npm install`.
- Second build exposed unused imports/state from the retired dashboard; cleaned up.
- GitHub Actions run 46038031627 passed TypeScript and Vite production build.
- A final audio-voice safeguard was committed after that passing run and needs one more CI run.
- No desktop/tablet/mobile visual QA has been performed yet. Do not claim visual verification or deployment.

## Remaining priorities
1. Confirm the latest commit passes CI.
2. Perform visual QA at desktop, tablet, and mobile widths.
3. Get Arabic content reviewed by a competent speaker; do not label it verified before review.
4. Add phrase-level spaced retrieval and distinguish recognition from active recall.
5. Improve Week 1 with a fuller listening/speaking progression and a real assessment rubric.
6. Build Weeks 2–4 after Week 1 review.
7. Later: add a genuine grammar-readiness assessment and rework Sarf drafts into Arabic-first lessons.

The activity counter records sections explored, not language proficiency. The diagnostic is a self-check, not a certified placement test. Keep the user's response concise and report actual validation and deployment status.
