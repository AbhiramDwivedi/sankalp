# Autonomous Build Backlog

Single source of truth for the autonomous build run. Each cron fire reads this file, picks up to 4 unchecked + ready items, delegates to subagents, verifies with `/ship`, commits, pushes, updates this file, appends to `docs/AGENT_LOG.md`, then exits.

If you (Abhiram) want to course-correct: edit this file directly — add, re-prioritize, or uncheck items. The next fire picks up the new state.

---

## Protocol (every fire, in order)

Each item flows: **implementer → reviewer → (fixer if needed) → merge**. Every item becomes a PR. This is a hard rule — no commits to `main` for item work. Only housekeeping (backlog checkbox updates, AGENT_LOG entries) commits directly to `main`.

### Fire steps

1. `git checkout main && git pull --rebase origin main` — pick up manual edits to backlog, AGENT_LOG, or user's own work.
2. Read this file. Pick up to **4 unchecked items** that satisfy: (a) prereqs met, (b) mutually independent (no shared files — check each brief's files against the others), (c) Tier 0 done before any product tier.
3. **For each item, in parallel** (one message with up to 4 `Agent` tool calls per phase):
   - **Phase A — Implementer subagent**: brief = the item text from this file + the Invariants section. Creates `auto/{item-id}` branch from main (e.g. `auto/0.1-check-script`), implements, runs the full gate, commits, pushes the branch. Returns: `{branch, filesChanged[], gateResults, blockers[]}`. If blockers are logged: stop for this item, log in AGENT_LOG, leave the box unchecked.
   - **Phase B — Reviewer subagent** (fresh context, blind to implementer's reasoning): brief = item text + Invariants + the full diff (`git diff main...auto/{item-id}`). Checks: (1) Done-when criteria objectively met? (2) Do-not-touch boundaries respected? (3) Invariants respected? (4) No dead code, no scope creep, no unjustified deps? (5) If the item required tests/visual goldens, do they exist and are they meaningful? Returns: `{verdict: "approve" | "request_changes", comments: [{file, line, severity: "blocker"|"nit", message}]}`. Nits are advisory only — only `blocker` comments gate the merge.
   - **Phase C — (if request_changes) Fixer subagent**: brief = the review comments + the item brief + the branch. Addresses each blocker, commits on the same branch, pushes. Returns summary of fixes.
   - **Re-review**: go back to Phase B on the updated branch. Max 2 review cycles total. If the second review still has blockers: open the PR in draft state with review comments as the PR body, leave the box unchecked, log "needs human review: {link}" in AGENT_LOG.
4. **Merge**: on approve, `gh pr create` (if not already open) with the item id in the title, then `gh pr merge --squash --delete-branch`. Check the backlog box with commit SHA + PR number. Append an AGENT_LOG entry with `[implementer summary, review verdict, merge SHA]`.
5. On any failure: the failing item's branch stays on remote for human inspection. Log it in AGENT_LOG with the branch name and the failure phase.
6. After all first-batch items finish: if parent context is still light and ≥4 more items are ready, do **one more batch of 4**. Otherwise commit + push any backlog/log updates to main and exit.
7. Max 2 batches per fire. Hard stop.

### Implementer brief template (parent fills in)

```
You are implementing backlog item {item id}. Item brief follows, then invariants.

{full item text}

INVARIANTS:
{invariants section pasted verbatim}

STEPS:
1. git checkout main && git pull
2. git checkout -b auto/{item-id}
3. Implement the item. Only touch files the brief authorizes.
4. Run the gate: npx tsc --noEmit && npx tsx scripts/validate-packs.ts && npx tsx scripts/build-flashcards.ts && npx tsx scripts/credit-audit.ts. After 0.1 ships: npm run check. After 0.2: also npm run smoke. After 0.3: also npm run visual.
5. If gate red: report the exact failure and stop. Do NOT commit.
6. If gate green: git add only your intended files + any regenerated outputs. git commit with a single-line conventional message referencing the item id. git push -u origin auto/{item-id}.
7. Return: branch name, list of files changed, gate results, any blockers encountered.

Do NOT open a PR. Do NOT merge. Do NOT change scope. If the brief seems wrong, report it as a blocker.
```

### Reviewer brief template (parent fills in)

```
You are reviewing backlog item {item id}. You have NOT seen the implementer's work — read the diff fresh. Item brief and invariants follow.

{full item text}

INVARIANTS:
{invariants section pasted verbatim}

DIFF TO REVIEW:
{output of `git diff main...auto/{item-id}`}

GATE RESULTS (from implementer):
{gateResults from Phase A}

REVIEW CHECKLIST:
1. Does the diff objectively meet the item's Done-when criteria? (if no → blocker)
2. Are Do-not-touch files untouched? (if no → blocker)
3. Are the backlog invariants respected? (any violation → blocker)
4. Is there scope creep beyond what the brief authorizes? (yes → blocker)
5. If the brief required tests or visual goldens, do they exist AND are they meaningful (not trivially passing)? (missing or trivial → blocker)
6. Code quality: dead code, unused imports, obvious bugs, unjustified new deps? (yes → blocker)
7. Anything that would surprise a reader but isn't explained? (yes → nit unless critical)

Return JSON: {"verdict": "approve" | "request_changes", "comments": [{"file": "...", "line": n, "severity": "blocker" | "nit", "message": "..."}]}

Only "blocker" comments gate the merge. "nit" comments are recorded but do not block.
```

## Invariants (subagents must not violate)

- **Branch-and-PR only** for item work. Never commit item changes directly to `main`. Branch naming: `auto/{item-id}` (e.g. `auto/0.1-check-script`). Only housekeeping (backlog checkbox updates, AGENT_LOG entries) commits directly to `main`.
- **Never edit** `content/flashcards/generated.ts` by hand — only regenerate via `scripts/build-flashcards.ts` and commit the regenerated output alongside content changes.
- **Never change** STAMP benchmark values, FCPS credit thresholds, or rubric axis definitions in `content/rubric.ts` without the item explicitly authorizing it. These are claims about the exam vendor, not design choices.
- **Never skip** git hooks (`--no-verify`), never force-push to `main` or shared branches, never amend published commits.
- **Never add dependencies** beyond what the item brief explicitly names. No "might be useful later" additions.
- **Always run** the full gate before declaring Phase A complete: `npx tsc --noEmit` + `npx tsx scripts/validate-packs.ts` + `npx tsx scripts/build-flashcards.ts` + `npx tsx scripts/credit-audit.ts`. After Tier 0.1 ships: `npm run check`. After 0.2: also `npm run smoke`. After 0.3: also `npm run visual`.
- **Commit scope**: one item = one branch = one PR = one squash-merge commit on `main`. Conventional prefix: `feat:`, `fix:`, `refactor:`, `chore:`, `test:`, `docs:`, with the item id in the message (e.g. `feat(1.1): next-nav in overlay`).
- **If blocked**: do NOT improvise outside the item's scope. Push the branch in its current state, log the blocker in AGENT_LOG with the branch name, leave the box unchecked, move on.
- **Audit failure is a revert**, not a follow-up. If `credit-audit.ts` fails after a content change, the item is unshipped until the audit passes — even if tsc is green.

---

## Tier 0 — Safeguards & tooling (BLOCKS all product work)

### [ ] 0.1 — Pre-flight gate script (`scripts/check.ts`)
**Brief**: Create a single TypeScript script that runs tsc → validate-packs → build-flashcards (failing if output would change but wasn't committed) → credit-audit, in that order, exiting non-zero on any failure. Add `npm run check` to `package.json` that invokes it via `npx tsx scripts/check.ts`.
**Done when**: `npm run check` exits 0 on clean main; flipping any invariant (e.g. deleting a pack's `heroMotif`) makes it exit non-zero with a clear message naming the failing stage.
**Do not touch**: any content files, any generator outputs.

### [ ] 0.2 — Playwright smoke harness (depends on: 0.1)
**Brief**: Add `@playwright/test` as devDependency. Install chromium only (`npx playwright install chromium`). Write `tests/smoke.spec.ts` covering: app boots on `npm run dev`, onboarding creates a profile, each tab (dashboard/library/capstones/flashcards/plan/rubric/settings) opens, one L1 pack opens + closes via Back, one capstone opens, one deck runner flips a card and marks it mastered, settings toggle persists across reload. Configure `playwright.config.ts` to spawn the dev server. Add `npm run smoke`. Update `scripts/check.ts` to call smoke after credit-audit.
**Done when**: `npm run smoke` passes on clean main in under 90 seconds; deliberately breaking a tab (e.g. renaming `DashboardView` export) makes it fail with useful output.
**Do not touch**: content, components (except import-only if needed).

### [ ] 0.3 — Print visual regression (depends on: 0.2)
**Brief**: Add Playwright PDF-snapshot tests for: one pack print view (use L1-12-restaurants-food), one core capstone print view (C01), one 8-up flashcard duplex sheet (front + back). Store goldens in `tests/visual/__snapshots__/`. Golden comparison via `expect(pdfBytes).toMatchSnapshot()` with a small pixel-diff threshold (PDFs embed fonts so byte-diff is too brittle — render PDF pages to PNG and use pixel-diff at 2% threshold). Add `npm run visual`. Update `scripts/check.ts` to call it.
**Done when**: `npm run visual` passes on clean main; regenerating goldens with `--update-snapshots` is documented in AGENT_LOG.
**Do not touch**: print styles in `index.html` (those are the subject under test; 1.3 will modify them).

### [ ] 0.4 — AGENT_LOG conventions (no dependency)
**Brief**: Ensure `docs/AGENT_LOG.md` exists with the documented format (date, fire id, items attempted, items completed, items deferred, open questions, commits). If missing, seed it. This is a tiny item but needs to be explicit.
**Done when**: file exists with at least the header and first real fire's entry.
**Do not touch**: anything else.

### [ ] 0.5 — Custom commands (`/ship`, `/pick-next`, `/revert-last`) (depends on: 0.1, 0.2, 0.3)
**Brief**: Add three slash commands to `.claude/commands/`:
- `/ship` — stage current changes, run `npm run check`, if green: commit with message inferred from diff (conventional prefix + short summary), push to origin/main. If red: report failures, abort without commit.
- `/pick-next` — read this backlog, identify top unchecked unblocked item, print its brief. (Informational — the cron fire does the actual dispatching.)
- `/revert-last` — soft reset HEAD~1 (preserving working tree), print what was undone so user can decide whether to re-commit or discard.
**Done when**: all three commands exist as markdown files in `.claude/commands/`, each with a clear prompt that any Claude Code session can execute.
**Do not touch**: settings.json (commands are separate).

### [ ] 0.6 — CLAUDE.md invariants section (no dependency)
**Brief**: Append a new section to `CLAUDE.md` titled "Autonomous-run invariants" that lists the invariants from this backlog header (never edit generated.ts, always regenerate flashcards after pack edits, never change rubric constants without explicit authorization, always run the full gate before declaring done, before any UI task runs `/ship`).
**Done when**: section exists and is concise (<40 lines).
**Do not touch**: existing CLAUDE.md content — only append.

---

## Tier 1 — Quick product wins (requires: Tier 0 complete)

### [ ] 1.1 — "Next" navigation in pack / capstone / deck overlays
**Brief**: At the bottom of every full-screen overlay (TopicPackView, CapstoneView, DeckRunner), add a `NextUpCard` that: (a) reads `planCursor(activeProfile)` to determine next item in the active plan; (b) shows "Next: {title}" with a 1-line preview of why it's next (e.g. "Introduces ne-construction, which C03 needs"); (c) primary CTA "Continue" opens it, secondary "Skip for now" marks as deferred in profile (add `deferredIds: string[]` to profile schema, migrate in `types.ts`). Also: mini-progress bar at top of overlay ("Pack 7 of 26 • Foundation plan • 23% complete"). Keyboard shortcut: `N` = next, `Esc` = back (already exists).
**Done when**: opening any pack shows correct next item; clicking "Continue" navigates without returning to library; Skip hides it from the next-up resolver permanently (per profile); smoke test covers this.
**Do not touch**: existing plan data in `content/studyPlans.ts` (plans are authored content). `planCursor()` logic itself is fine to extend. Types in `content/schema.ts` may need `deferredIds: string[]` added.
**Product note**: Next-up respects plan order, not pack-id order. If student is on Foundation plan and just finished L1-12, next is whatever L1-12's successor in Foundation is — could be L1-13, could be a capstone.

### [ ] 1.2 — Completion celebrations
**Brief**: New `components/ui/Celebration.tsx` that fires on: pack complete, capstone complete, deck mastered (all cards green), plan milestone (25/50/75/100%), and the big one — "STAMP-ready" (all L1+L2 packs + 5 core capstones done). Uses CSS-only confetti (no lib dependency; a `@keyframes` burst of 20 particles with randomized rotation/translate). Respects `prefers-reduced-motion` (fallback: static burst + text, no animation). Message is SPECIFIC not generic — see `content/celebrations.ts` (new file) for the copy bank:
- Pack: "Pack done. You used {1 connector from that pack} like a native." (pick any connector from the pack's connectors array)
- Capstone: "{wordCount} words of structured Hindi. That's Benchmark 5 territory."
- Deck mastered: "Every card green. This is long-term memory work."
- 50% plan: "Halfway through your {planName}. This is when it starts feeling automatic."
- STAMP-ready: "You're ready. 26 packs, 10 capstones, 850 cards. Benchmark 5 is yours to claim."
All messages bilingual where natural ("शाबाश!" as optional leader, not every time — overuse kills it).
**Done when**: triggers fire exactly once per achievement per profile (persisted in `profile.celebrationsShown: string[]`). Reduced-motion respected. Smoke test covers at least one trigger.
**Do not touch**: existing completion logic in App.tsx beyond adding the celebration hook.

### [ ] 1.3 — Flashcard print layout fix (depends on: 0.3 for verification)
**Brief**: Fix `components/flashcards/PrintSheet.tsx` so 8-up duplex sheets print correctly. Requirements: (a) each card has fixed dimensions in inches (3.5"×2.5" — standard index card), not rem/flex; (b) `@page { size: letter; margin: 0.4in }` named page; (c) each card cell has `break-inside: avoid`; (d) front-sheet and back-sheet separated by `page-break-after: always`; (e) back-sheet is horizontally mirrored per-row so when duplexed along the long edge, card N front aligns with card N back (row order same, column order reversed); (f) test with 1 must-know deck (large), 1 theme deck (medium), 1 deck with count not divisible by 8 (partial final sheet). Also: separate screen view (single card, flip) from print view (8-up grid) cleanly — they should not share a layout component.
**Done when**: visual regression test 0.3 passes with the new goldens; print preview in Chromium shows 8 cards per page, aligned; numbered test sheet (add a hidden card-index prop for visual verification) confirms back-side mirroring.
**Do not touch**: `FlashcardItem.tsx` flip interaction (that's the screen view), `generated.ts` (content).

### [ ] 1.4 — Dashboard today-glance
**Brief**: Add to `DashboardView.tsx` a compact "Today" strip above the existing content: (a) streak counter — days with any pack/capstone/deck activity in profile's history (add `activityDates: string[]` to profile, push on any completion or deck run, migrate in `types.ts`); (b) one concrete next action — "Spend 20 min on {next pack}" with CTA; (c) cards due today counter (placeholder "—" until Tier 4.1 SRS lands; show it as a disabled tile so the visual space is reserved). Keep it minimal — this is a glance, not another dashboard.
**Done when**: streak increments correctly across reloads; next-action CTA opens the right pack; the due-cards tile shows a disabled placeholder.
**Do not touch**: existing dashboard cards beyond layout.

---

## Tier 2 — Design tokens lite (option b, NO CDN migration)

### [ ] 2.1 — Theme tokens file
**Brief**: Create `theme.ts` at repo root with: color scales (saffron-50..900, indigo-50..900, emerald-50..900 — extract exact hex values currently used across the codebase by grepping for bg-*, text-*, border-* utilities and taking the most-frequent shades); spacing scale (map current Tailwind usage to a 4-step scale: xs, sm, md, lg, xl); radii (sm: 4px, md: 8px, lg: 16px, full: 9999px from current usage); type scale for Devanagari (display: Tiro Devanagari, body: Noto Sans Devanagari — sizes 14/16/18/24/32/48) and Latin (Plus Jakarta). Export as a single `theme` object. Don't wire it up yet — just capture the current vocabulary.
**Done when**: `theme.ts` exists and accurately reflects what's already in the codebase (not aspirational). Add a short README section in `theme.ts` as a top-comment explaining this is for reference + future migration, not currently consumed.
**Do not touch**: any existing component.

### [ ] 2.2 — UI primitives consume tokens (depends on: 2.1)
**Brief**: Refactor `components/ui/*` (Card, Badge, Section, Callout, DevanagariText, PaisleyDivider, RangoliCorner) to consume `theme.ts` via className interpolation — i.e. `${theme.colors.saffron[500]}` inside a `style` prop for color values, keep Tailwind utilities for structural classes. This is surgical: only the ui primitives, not the pages.
**Done when**: all 7 primitives import from theme; visual regression (0.3) shows no pixel difference; tsc passes.
**Do not touch**: pages, views, content.

### [ ] 2.3 — Accessibility pass
**Brief**: Audit the app for: `lang="hi"` on every `DevanagariText` (component-level, so automatic); `<title>` on every SVG motif so screen readers announce them (15 motifs); focus-visible ring on every interactive element (button, link, card-as-button); `prefers-reduced-motion` on Celebration (from 1.2) and any other animation; contrast check on theme-tinted hero art (use a known-good contrast checker library or write a small one — saffron-400 text on saffron-50 bg is the likely offender). Deliverable: a fix PR touching the specific issues found, plus `docs/A11Y_AUDIT.md` with a one-line-per-issue summary.
**Done when**: axe-core run via Playwright (add `@axe-core/playwright` devDep) reports 0 critical, 0 serious on dashboard, library, one pack view, one capstone view, one deck runner.
**Do not touch**: visual design intent (fix contrast by adjusting shade choice, not by rewriting components).

---

## Tier 3 — Multi-Indian-language architecture seam (architecture only, no second language content)

### [ ] 3.1 — CURRICULUM constant (no dependency)
**Brief**: Create `content/curriculum.ts` with a single exported `CURRICULUM` object: `{ id: 'fcps-stamp-hindi', language: { name: 'Hindi', code: 'hi', script: 'Devanagari', fontStack: [...] }, examSystem: { name: 'STAMP 2S/WS', provider: 'Avant', sections: ['Writing', 'Speaking'] }, creditMapping: { benchmark: 5, creditName: 'Intermediate Mid', credits: 3, issuer: 'FCPS' }, displayStrings: { examShortName: 'STAMP', creditPhrase: '3 FCPS credits', targetPhrase: 'Benchmark 5' } }`. Then grep the codebase for every hardcoded "STAMP", "FCPS", "Benchmark 5", "3 credits", "Hindi", "Devanagari" string and route them through `CURRICULUM.*` — mechanical refactor, no behavior change. Audit covers: components, content files (topics, capstones, study plans — but NOT studyPlans.ts since user edits it; defer that one to 3.2), rubric.ts, audit script, credit-audit.md template.
**Done when**: grep for literal "STAMP" or "FCPS" or "Benchmark 5" returns only `content/curriculum.ts` and maybe test fixtures / docs (docs are acceptable). visual regression (0.3) unchanged. tsc + validate-packs green.
**Do not touch**: the plan data arrays in `content/studyPlans.ts` (authored content). Import-only edits are fine if needed.

### [ ] 3.2 — Curriculum-shaped folders (depends on: 3.1)
**Brief**: Move `content/rubric.ts`, `content/connectors.ts`, `content/muhavare` (if any standalone), and the grammar-specific diagrams (NeConstructionDiagram, GenderAgreementDiagram — Hindi-specific) into `content/curricula/fcps-stamp-hindi/`. Keep `content/schema.ts` and `content/topics/*` where they are for now (topics are per-curriculum content but moving 26 files is higher risk — defer). Update all imports. Add `content/curricula/README.md` explaining the layout for when we add e.g. `cbse-marathi` later. Update `content/studyPlans.ts` imports as needed for the moved files — do not change plan data.
**Done when**: imports all resolve; tsc green; validate-packs green; smoke green; visual regression green.
**Do not touch**: plan data arrays in `content/studyPlans.ts`; topic content files.

### [ ] 3.3 — Generic ScriptText + parameterized rubric prompt (depends on: 3.2)
**Brief**: Rename `DevanagariText` to `ScriptText` (keep `DevanagariText` as a thin alias that sets `script="Devanagari"` for backwards compat during transition); drive `lang` attribute and font-stack from `CURRICULUM.language`. Then refactor `geminiService.ts` `evaluateWriting()` to accept a rubric object (`CURRICULUM.examSystem.rubric` — wire rubric into the CURRICULUM shape) instead of the hardcoded STAMP-specific prompt text. The prompt becomes a template that takes benchmark descriptors, credit mapping, and language name as parameters. Behavior for Hindi+STAMP must be byte-identical to today.
**Done when**: tsc green; validate-packs green; smoke green; a manual eval call (via `npm run dev` + AI toggle) produces a response shape identical to pre-change for one test essay (record a before-fixture, run after, diff — expect only non-deterministic fields like score rationale text to differ).
**Do not touch**: the rubric VALUES themselves (benchmark boundaries, credit thresholds). Only the plumbing.

### [ ] 3.4 — Second-curriculum stub (depends on: 3.3)
**Brief**: Create `content/curricula/cbse-marathi/` (chosen because Marathi uses Devanagari too → lowest-risk test of the seam) with: empty `rubric.ts` shell (exports a type-correct but empty object), empty `connectors.ts`, `README.md` with "NOT AUTHORED — this is a seam proof-of-concept." Do NOT wire it into the app UI. Do NOT author any content. Goal is strictly: verify the folder structure + type exports + curriculum object shape work for a second language.
**Done when**: tsc green; the folder exists and is type-correct; running the validator on only the `fcps-stamp-hindi` curriculum still works and is unaffected by cbse-marathi's existence; documented in AGENT_LOG that this is a stub only.
**Do not touch**: anything outside `content/curricula/cbse-marathi/`.

---

## Tier 4 — Larger product bets

### [ ] 4.1 — Spaced repetition on flashcards (depends on: 0.5, 1.4)
**Brief**: Add SM-2-lite scheduler. Per-card state in profile: `cardStates: Record<cardId, { ease: number; interval: number; due: ISOString; reviews: number }>`. On each review in `DeckRunner`, update ease (again/hard/good/easy → -0.2/-0.1/0/+0.1, clamped 1.3–2.5), interval (again → 1 day, else interval * ease, min 1 day, max 365), due (now + interval). Surface a new "Due today" list on dashboard (was placeholder from 1.4) showing the top 20 due cards across all decks, with a "Start 10-minute review" CTA that launches a synthetic deck of due cards.
**Done when**: reviews update state correctly (unit test this — add `tests/srs.spec.ts` with SM-2 math assertions); dashboard shows accurate count; synthetic deck runs; persists across reloads. Smoke covers the flow.
**Do not touch**: deck content.

### [ ] 4.2 — Mock exam mode
**Brief**: Identify which capstones are flagged as mock exams (grep schema + capstones for `isMockExam` or similar; if the flag doesn't exist, add it to C02 and C08 — cross-topic + B5-target). Add `MockExamMode.tsx`: 20-min countdown timer, capstone prompt only (no model essay visible), a single textarea, scroll-disabled past the prompt, auto-submit at 0:00, auto-submit also on manual Done. Submits to `evaluateWriting()` if AI enabled; otherwise stores the essay + student-self-rubric. Shows result + comparison to all three tiers (novice/IM/push) of that capstone.
**Done when**: two capstones have mock-exam mode; timer counts down accurately; auto-submit works; smoke covers the flow.
**Do not touch**: existing capstone view behavior for non-mock access.

### [ ] 4.3 — Speaking practice (free tier via Gemini 2.5 Flash audio)
**Brief**: Ship in two phases within one item:
  **Phase A (always-free)**: every pack gets a `speakingPrompts: string[]` field (5 prompts — add to schema; seed for all 26 packs with sensible defaults derived from the writingPrompts, using the same theme). New `SpeakingPanel.tsx` in topic view: shows prompt, in-browser recorder (MediaRecorder API, webm/opus), self-check rubric checklist (5 items per pack — "Used past tense correctly", "Named at least 3 vocab items", "Connected sentences with one of {pack connectors}", etc.), local audio playback.
  **Phase B (optional AI)**: if `profile.aiAssessmentEnabled`, add "Get AI feedback" button. Sends audio to Gemini 2.5 Flash (model id `gemini-2.5-flash`, free tier supports audio input up to 15 RPM / 1500 RPD) with a speaking-rubric prompt derived from CURRICULUM. Handles rate-limit errors gracefully (queue locally, retry with backoff). Shows feedback in same shape as writing eval.
**Done when**: recorder works in Chromium (smoke test mocks getUserMedia); self-check rubric persists per prompt per profile; AI path works end-to-end with real Gemini call (test manually, document in AGENT_LOG); rate-limit error shows user-friendly message.
**Do not touch**: `evaluateWriting()` — add `evaluateSpeaking()` as a sibling. Don't break the writing flow.
**Product note**: speaking was a credibility gap for "prepares for STAMP 2S/WS" (2S = 2-skill including speaking). This closes it.

### [ ] 4.4 — Teacher/parent progress export (depends on: 1.4, 4.1)
**Brief**: In Settings, add "Export progress" that generates: (a) JSON file with full profile state (sanitized — no AI API responses, just scores); (b) printable PDF report via Playwright or equivalent print-to-PDF of a new `ProgressReportView.tsx` showing packs done, capstones done with scores, deck mastery bars, streak, recent AI eval excerpts. File name: `{profileName}-sankalp-progress-{ISO-date}.pdf/json`.
**Done when**: export produces both formats; PDF renders correctly with print styles; smoke covers the flow.
**Do not touch**: profile schema beyond adding export metadata.

### [ ] 4.5 — PWA / offline
**Brief**: Add a service worker (prefer vite-plugin-pwa to avoid hand-rolling). Precache app shell + SVG motifs + fonts. Runtime-cache content (topics, capstones, flashcards JSON if we ever serialize — for now they're bundled). Add manifest.json with app name, icon (generate 192+512 from existing SVG motif), theme color. Installable on desktop and iPad. Works offline after first load.
**Done when**: Lighthouse PWA score ≥ 90; offline-mode test in Chromium devtools shows app loads + all tabs work + AI eval shows friendly offline message.
**Do not touch**: existing fetch/storage patterns beyond what the plugin needs.

### [ ] 4.6 — Content QA surface
**Brief**: In the existing `CreditAuditView` (route `/audit`), add: a freshness timestamp from `docs/CREDIT_AUDIT.md` file mtime (or a header field in the audit output); a per-pack "Last validated" badge driven by `validate-packs.ts` output (have the validator write `docs/VALIDATION_STATE.json` with per-pack pass/fail + timestamp, read it here); a "Run validators now" button that shells out via... actually no, we're static — instead, link to the git action / instructions to re-run locally, and show the last committed state. Keep it informative, not interactive.
**Done when**: audit view shows a dated banner ("Last validated 2026-04-17 — clean"); pack list shows validation status; smoke covers the view loads.
**Do not touch**: the audit script's core logic (only add timestamp output).

---

## Nice-to-haves (deferred, not part of autonomous run)

- Pronunciation guides with audio per vocab item (needs content authoring, not just code)
- Peer comparison / leaderboards (out of scope for solo student app)
- Gamification beyond celebrations (risk of cheapening the product)

Add these to the backlog only if explicitly requested.
