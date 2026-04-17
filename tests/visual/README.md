# Visual regression — print layouts

Tests in `print.visual.ts` capture and diff the three print views the student actually takes to the exam desk:

1. **Pack print** — `L1-12-restaurants-food` (the documented quality anchor)
2. **Capstone print** — `C01-restaurant-memory` (core tier, Mock Exam 1)
3. **Flashcard 8-up duplex sheet** — front + back of the first deck's first sheet

## Approach

**Option B** — Playwright's built-in `toHaveScreenshot` with `page.emulateMedia({ media: 'print' })`. Zero new deps. Pixel-diff threshold is 2% (`maxDiffPixelRatio: 0.02`) to absorb minor font-rendering drift across runs while catching real layout regressions.

## Running

```bash
npm run visual                # run visual tests (assumes goldens exist)
npm run check                 # full gate: tsc → validate → build → audit → smoke → visual
```

## Regenerating goldens

Only do this after an **intentional** print-layout change (e.g. edits to the `@media print` block in `index.html`, or the `PrintSheet` 8-up grid).

```bash
npx playwright test --config=playwright.visual.config.ts --update-snapshots
```

Review the diff in `tests/visual/__snapshots__/print.visual.ts/` before committing — the new goldens replace the previous ones and become the reference for subsequent runs.

## File layout

- `print.visual.ts` — the three specs. Filename uses `.visual.ts` (not `.spec.ts`) so it is NOT picked up by the smoke config's default test pattern; the visual config overrides `testMatch` explicitly.
- `__snapshots__/print.visual.ts/` — golden PNGs. Committed.
- `../../playwright.visual.config.ts` — scoped config (`testDir: ./tests/visual`, custom `testMatch`). Independent from `playwright.config.ts` (the smoke config).
