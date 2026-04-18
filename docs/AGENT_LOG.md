# Autonomous Build — Agent Log

Chronological log of the autonomous build run. Each entry = one fire of the scheduled trigger. Read top-down for history, or jump to the latest entry for current state.

## Format

```
## {ISO date} — Fire #{N}
**Items attempted**: {ids}
**Items completed**: {ids with commit sha}
**Items deferred**: {ids with reason}
**Open questions for Abhiram**: {list, or "none"}
**Commits pushed**: {sha list}
**Notes**: {anything noteworthy — architectural decisions, blockers overcome, product decisions made}
```

---

## 2026-04-17 — Fire #6 (scheduled cron 21:35 EDT, hourly)
**Items attempted**: 1.2, 1.4
**Items completed**:
- **1.2** — Completion celebrations — PR #10 → merged as `1c6371d`. New `Celebration.tsx` (CSS-only 20-particle confetti, respects prefers-reduced-motion, auto-dismiss at 6s) + new `content/celebrations.ts` copy bank (specific not generic — pack-complete names a connector from the pack; capstone names word count + tier with B6 for push; plan milestones name the plan; STAMP-ready is the big one). Leader rotation (~1/3 via stableHash) keeps "शाबाश!" meaningful. Idempotent via `celebrationsShown` on profile. App.tsx wiring wraps existing completion flows to fire celebrations; -89 deletions are layout-rewraps to host the overlay. New smoke test covers pack-complete → reload → no re-fire.
- **1.4** — Dashboard today-glance — PR #11 → merged as `133a7ee`. New `lib/streak.ts` (pure helpers, local-time ISO dates not UTC, today-or-yesterday courtesy anchor) + 3-tile TodayStrip above dashboard. Streak tile with flame icon. Next-action tile driven by planCursor. Disabled SRS placeholder with dashed border reserving visual slot for 4.1. Rebased onto 1.2-merged main — trivial conflicts in types.ts (different fields added to StudentProfile) and App.tsx (different lines added to each of 3 completion handlers) resolved by keeping both sides.
**Items deferred**: none remaining in Tier 1. Tier 2 items ready next: 2.1 theme tokens (no deps), 2.2 UI primitives (depends on 2.1), 2.3 accessibility pass (depends on 2.1, 2.2).
**Commits pushed**: `1c6371d` (PR #10), `133a7ee` (PR #11), plus this housekeeping commit.
**Notes**:
- Both implementers ran cleanly in parallel worktrees again. Worktree cleanup with junction-first order worked reliably — main's node_modules/.bin/tsc intact throughout.
- First real merge-conflict resolution this run: types.ts (additive on StudentProfile) and App.tsx (additive on 3 completion handlers). Both trivial — keep both sides' additions. Verified by running full gate on the rebased branch before push.
- Reviewers caught a real copy nit (1.2's "like a native" is performative for an IM target — logged for potential future follow-up), a real style-consistency nit (1.4's em-dash in "— due today" conflicts with recent bb0458e em-dash removal), and code-quality nits (streak's NaN handling, 1.2's last-wins behavior on concurrent celebrations). None were blockers.
- **Tier 1 complete.** Product wins shipped: next-nav, celebrations, flashcard print fix (the original user complaint), today-glance.

---

## 2026-04-17 — Fire #5 (scheduled cron 20:35 EDT, hourly)
**Items attempted**: 1.1, 1.3
**Items completed**:
- **1.1** — Next navigation in overlays — PR #9 → merged as `8a919e9`. NextUpCard + OverlayProgress + nextUpResolver wired into TopicPackViewV2/CapstoneViewV2/DeckRunner. `planCursor()` extended with optional `deferredIds` parameter; new helpers `nextPlanItemAfter`/`planItemSequence`/`planProgressFor` appended below plan data. Plan data arrays byte-identical to main (scope-creep guard verified). `deferredIds` added to StudentProfile with migration. `N` keybind (input-guarded) triggers Continue; Esc unchanged. Continue opens next item without library round-trip.
- **1.3** — Flashcard print layout fix (the original user complaint) — PR #8 → merged as `efd06f6`. New `PrintCard` component (purely presentational, no state/handlers). `PrintSheet` rewritten with CSS grid + explicit 3.5×2.5in card dimensions + `@page flashcard` named page scoped to flashcard printing. Back-sheet columns reversed per row so duplex-flip aligns. Partial final sheet fills with blank placeholder cells, no card shift. Visual goldens regenerated (front + back PNGs), mirroring verified programmatically for all partial sheet sizes. FlashcardItem (screen flip) and DeckRunner untouched.
**Items deferred**: 1.2 (celebrations) and 1.4 (today-glance) — both remain ready. Next fire can pair them if they're file-disjoint (check: 1.2 touches Celebration.tsx + celebrations.ts + App.tsx + profile schema; 1.4 touches DashboardView.tsx + types.ts — shared touch on types.ts/App.tsx; best to do serially OR split so only one touches schema this fire).
**Commits pushed**: `efd06f6` (PR #8), `8a919e9` (PR #9), plus this housekeeping commit.
**Notes — second successful worktree run**:
- Both implementers ran cleanly in parallel worktrees. No contention, no stashes. Total wall-clock for implementer+reviewer+merge of both items: ~75 min (1.1 took ~28 min of implementer time, 1.3 took ~48 min — partly due to parallel port-3000 clash during print-preview test, noted but resolved).
- **Worktree cleanup with corrected junction-first order WORKED**: junctions removed safely (main's `node_modules/.bin/tsc` intact this time). Only follow-on issue: worktree directory shells can't be removed due to lingering Windows file-handle locks (likely vite dev server or playwright process still running). Git metadata is clean, branches deleted, junctions gone — the empty directories are harmless leftovers to sweep later. Documented as a minor follow-up.
- **Scope-creep guard first real test**: 1.1's PR #9 touched content/studyPlans.ts (helper extensions only, plan data byte-identical). Included `CURRICULUM-AUTHORIZED` in the PR body with a clear rationale. The guard workflow from 0.8 would have blocked the PR without the token — this is exactly the intended use case. Reviewer independently verified plan data was byte-identical before approving.
- Implementer for 1.1 flagged an environment issue: worktrees don't inherit the main repo's `.env.local`, and `geminiService.ts` instantiates `new GoogleGenAI({ apiKey: process.env.API_KEY })` at module load — without a key, smoke sees an empty page. They added a gitignored `.env.local` with a placeholder key in the worktree. Worth a future item to scaffold worktrees with a dummy `.env.local` so subagents don't each solve this themselves.

---

## 2026-04-17 — Fire #4 (scheduled cron 19:35 EDT, hourly)
**Items attempted**: 0.5, 0.8
**Items completed**:
- **0.5** — Slash commands — PR #6 → merged as `9bd845e`. 3 markdown files under `.claude/commands/` (ship.md 100 lines, pick-next.md 70 lines, revert-last.md 61 lines). `/ship` is branch-aware (main = housekeeping to origin/main; auto/* = commit + push branch, never main). `/pick-next` parses BACKLOG.md read-only. `/revert-last` uses --soft, warns on pushed commits.
- **0.8** — GitHub Actions CI + scope-creep guard — PR #7 → merged as `f0f9e18`. Two workflows (ci.yml running full 6-stage gate on ubuntu-latest with npm + Playwright caching; guard.yml blocking rubric.ts changes and unauthorized auto/* studyPlans.ts edits). CLAUDE.md gets a "### Recommended branch protection (manual)" subsection explaining the repo admin must wire these as required checks. Validated via actionlint v1.7.12 (0 errors) + PyYAML.
**Items deferred**: none — Tier 0 COMPLETE with this fire.
**Commits pushed**: `9bd845e` (PR #6), `f0f9e18` (PR #7), plus this housekeeping commit.
**Notes — worktree protocol first real test**:
- Two implementers ran cleanly in parallel worktrees with ZERO cross-contamination, ZERO stashes. Protocol works. Total wall-clock ~6 min for implementer+reviewer+merge of both items — roughly 2× faster than the contended fire #2.
- **New failure mode discovered during cleanup**: `rm -rf` on a worktree directory while the `node_modules` junction was still in place recursed through the junction and wiped the main repo's `node_modules/.bin/` symlinks, breaking the next `npm run check` with a cryptic "This is not the tsc command you are looking for" (Windows task scheduler fallback). Recovery: `npm install` restored .bin. Protocol tightened to require junction removal BEFORE worktree dir removal. Committed as part of this fire's housekeeping.
- Pre-commit hook fired on both implementer commits AND during the housekeeping commit — all passed.
- Rebase of 0.8 onto main (after 0.5 merged) worked clean (no package.json touched in either item this fire).

---

## 2026-04-17 — Fire #3 (scheduled cron 18:35 EDT, hourly cadence)
**Items attempted**: 0.3
**Items completed**:
- **0.3** — Print visual regression — PR #5 → merged as `835efdc`. Implementer chose Option B (Playwright built-in `toHaveScreenshot` with `page.emulateMedia({ media: 'print' })`, zero new deps) over Option A (PDF→PNG+pixelmatch). 3 tests (pack L1-12, capstone C01, flashcard 8-up front+back), 4 PNG goldens committed, runs in ~22s. Scope-isolated via `playwright.visual.config.ts` + custom `testMatch: /.*\.visual\.ts$/` (visual spec filename is `.visual.ts`, not `.spec.ts`, so smoke's default match pattern doesn't pick them up). `scripts/check.ts` now runs 6 stages: tsc → validate-packs → build-flashcards → credit-audit → smoke → visual.
**Items deferred**: 0.5 (slash commands, depends on 0.1/0.2/0.3) and 0.8 (CI workflow, depends on 0.1/0.2/0.3) — BOTH now unblocked for the next fire. 0.5 and 0.8 touch different files (`.claude/commands/*` vs `.github/workflows/*`) so they're candidates for parallel execution with worktree isolation.
**Commits pushed**: `835efdc` (PR #5), plus this housekeeping commit.
**Notes**:
- N=1 this fire, so no worktree was needed — used main repo directly.
- Reviewer flagged two worthwhile nits (CSS selector for flashcard sheet could use data-testid; fullPage captures are large and trigger regen on any below-fold content change). Neither blocking. Worth considering as small follow-ups but not on the backlog yet.
- Regenerating goldens: `npx playwright test --config=playwright.visual.config.ts --update-snapshots`. Documented in `tests/visual/README.md` per brief.
- CRLF stat-cache artifacts on `content/flashcards/generated.ts` and `docs/CREDIT_AUDIT.md` appeared again during review (running npm run check leaves them "modified" in git status even though content is identical). Cleaned via `git checkout --` before merge operations. Known issue, not blocking — worth a future item to have the gate normalize or avoid rewriting unchanged outputs.

---

## 2026-04-17 — Fire #2 (scheduled cron 15:35 EDT)
**Items attempted**: 0.2, 0.7
**Items completed**:
- **0.2** — Playwright smoke harness — PR #4 → merged as `78cfd93`. 7 tests covering app boot, onboarding, all 7 sidebar tabs (with content-specific hallmarks), pack/capstone overlay flows, deck runner card-flip-and-mastery, settings persistence across reload. Runs in ~20s. Wired into `scripts/check.ts` gate.
- **0.7** — Pre-commit hook running `npm run check` — PR #3 → merged as `1fd3456`. Hand-rolled (no husky dep). `.githooks/pre-commit` + `scripts/install-hooks.js` + npm `prepare` lifecycle. Happy/failure/idempotency paths all verified in review. Executable bit `100755` in git index.
**Items deferred**: 0.3 (visual, depends on 0.2), 0.5 (slash commands, depends on 0.1/0.2/0.3), 0.8 (CI, depends on 0.1/0.2/0.3). 0.3 is now ready for the next fire.
**Commits pushed**: `1fd3456` (PR #3 0.7), `78cfd93` (PR #4 0.2), plus this housekeeping commit.
**Notes**:
- **Parallel-execution friction**: running two implementers concurrently in the same local working tree caused significant contention. Each agent's branch checkouts wiped the other's untracked files; recovery via repeated `git stash` (4 stashes accumulated on disk). Both items landed successfully but wall-clock time for parallel 0.2+0.7 was ~31 minutes — roughly equal to what serial execution would have taken. **Lesson**: in local CronCreate-driven fires, parallel implementers hurt more than help because they share a filesystem. Future fires should either (a) run items serially within a fire, or (b) use `git worktree add` to give each implementer its own working tree. Deferring a protocol update until 0.3's fire — noting here for continuity.
- **Known nit from fire #1 & #2**: running the gate leaves `content/flashcards/generated.ts` and `docs/CREDIT_AUDIT.md` marked modified in `git status` even though the content is byte-identical (CRLF/mtime stat-cache on Windows). Not a real diff — gate's `git diff --exit-code` confirms clean. But it's friction; `git checkout --` resets cleanly. Potential follow-up: have the gate script refresh the git stat cache or skip rewriting when content is unchanged.
- Pre-commit hook is now active on anyone running `npm install` + `npm run prepare`. When the next fire commits, the hook fires; expected to pass since gate passes on clean main.
- Cleaned up 4 leftover stashes from the parallel-execution recovery — they represented pre-commit working-tree snapshots that are now redundant (both commits are on origin).

---

## 2026-04-17 — Fire #1 (manual "fire, proceed" at ~14:50 EDT)
**Items attempted**: 0.1, 0.4 (housekeeping), 0.6
**Items completed**:
- **0.1** — pre-flight gate script — PR #1 → merged as `09976c7`. Implementer flagged that `tsx` is NOT in devDependencies (contrary to brief assumption), used `npx tsx` in package.json per repo convention. Reviewer approved with 2 nits (tsx-vs-npx-tsx nit, sandbox-blocked end-to-end failure-path test nit). `npm run check` on merged main: all 4 stages pass, credit audit = GUARANTEED.
- **0.4** — AGENT_LOG conventions — satisfied via existing file + this entry; checkbox marked housekeeping.
- **0.6** — CLAUDE.md autonomous-run invariants section — PR #2 → merged as `bc25ce9`. 15-line append, reviewer approved with 2 nits (em-dash on one line clashes with recent em-dash-removal commit bb0458e; one BACKLOG invariant "don't improvise when blocked" not mirrored in the digest).
**Items deferred**: 0.2, 0.3, 0.5, 0.7, 0.8 — all depend on 0.1, now unblocked. Next fire at 15:35 EDT should pick 0.2 (smoke) + 0.7 (husky hook) as independent children of 0.1 (no shared files). 0.3 + 0.5 + 0.8 wait for 0.2/0.3.
**Open questions for Abhiram**: none
**Commits pushed**: `09976c7` (PR #1), `bc25ce9` (PR #2), plus this housekeeping commit
**Notes**:
- First real fire of the autonomous run. Batch size: 2 items (conservative per step 0 self-check — moderate session-context already consumed by setup).
- Two parallel implementers ran cleanly despite sharing the same working directory on Windows (one transient branch-switch observed and recovered; final branches intact and correctly pushed).
- Both reviewers used the blind-review pattern and flagged genuine but non-blocking nits. The em-dash nit on CLAUDE.md is a real style consistency issue per prior commit bb0458e — can be fixed in a one-line follow-up item if Abhiram wants that rigor extended to CLAUDE.md as well (not in backlog yet; flagging here).
- Time: implementer+reviewer parallel phase took ~3.5 minutes each (14 min of wall clock including my orchestration + merges).

---

## 2026-04-17 — Fire #0c (setup finalized, manual)
**Items attempted**: BACKLOG protocol additions + cron recreation
**Items completed**: 
- Branch hygiene added to implementer + pre-merge steps (pull main → cut branch → rebase before push → rebase again before merge).
- Tier 0.7 item added: husky pre-commit hook running `npm run check`.
- Tier 0.8 item added: GitHub Actions CI (`ci.yml` for required checks + `guard.yml` as scope-creep detector for auto/* branches).
- New "Standing authorizations" section at the top of BACKLOG.md, pairing with Invariants.
- New local cron scheduled (id 14907011), prompt rewritten to defer fully to BACKLOG.md protocol (no conflicting directives). Cadence: 04:17, 10:17, 16:17, 22:17 EDT daily. First fire: today 16:17 EDT.
**Items deferred**: none
**Open questions for Abhiram**: none
**Commits pushed**: `825ef53` (backlog protocol additions)
**Notes**:
- Option B (remote triggers) definitively not validated — two attempts, 8-minute waits, no observable remote execution. Reason undetermined; possibly an account-provisioning or environment-config issue outside my visibility. Falling back to Option A (local cron, session-only).
- Local cron limitation: dies if this Claude Code session closes. If that happens, recovery is: user reopens Claude Code in C:\sw\sankalp, asks "resume the autonomous build cron". A new session will read this AGENT_LOG, see the setup state, and recreate the cron using the same prompt template.
- User's recent pushes (`9457941` studyPlans rewrite, followed by manual work) confirmed on main. The stale do-not-touch language has been removed from BACKLOG.
- User's added directives now encoded: branch hygiene (pull-main-first, rebase-before-push), defense-in-depth hooks (pre-commit + CI). Autonomy vs. safety balance: the reviewer agent + PR workflow + CI provides three independent layers of checks before any auto/* branch merges to main.

---

## 2026-04-17 — Fire #0b (setup continued, manual)
**Items attempted**: protocol revision + POC of remote-trigger path
**Items completed**: BACKLOG.md protocol rewrite (branch → implementer → reviewer → fixer → PR merge), invariants updated, stale content/studyPlans.ts do-not-touch references removed (user pushed that work).
**Items deferred**: none
**Open questions for Abhiram**: verdict on remote triggers (see Notes)
**Commits pushed**: TBD (after POC verdict)
**Notes**:
- User directive added: every logical piece of work gets a reviewer agent. Implemented as branch-per-item + PR workflow. Phase A (implementer) → Phase B (reviewer, blind to implementer's reasoning, reads the diff fresh) → Phase C (fixer, only if review requests changes, max 2 cycles) → squash-merge. This applies whether execution is local-subagent or remote-trigger based.
- POC of remote triggers (Option B from prior turn): created two triggers via RemoteTrigger API. First attempt (sankalp-poc) was missing `sources` config — created but never executed. Second attempt (sankalp-poc-v2, trig_01H1vk83Y32W3JtoirASJdYc) had full config (github.com/AbhiramDwivedi/sankalp source, sonnet-4-6 model, prompt to create branch + PR with a marker file). Fired via `run` action twice. After 4+ and 8+ minute waits: no branch, no PR, no commit on origin. `run` returns HTTP 200 but no observable side effect; trigger state's updated_at is unchanged. Remote-trigger API appears to accept work but not execute it — possibly an environment-provisioning issue, possibly undocumented behavior.
- Verdict: Option B is NOT validated. Fallback to Option A — local CronCreate-based cron in this Claude Code session. The earlier session-only cron (e3c8e02a) was cancelled because its prompt predated the PR-workflow revision; a new one will be created with the updated prompt after the POC window closes.
- User's Fri 14:13 push `9457941 Rewrite study plans for realistic 2 hr/week pacing` shipped the studyPlans.ts rewrite. The plan-push missing-10th-capstone audit failure surfaced in the prior turn may be resolved or still pending — to be verified on first real fire.

---

## 2026-04-17 — Fire #0 (setup, manual)
**Items attempted**: N/A — this was the pre-run setup.
**Items completed**: none (the backlog itself is the deliverable)
**Items deferred**: none
**Open questions for Abhiram**: none (all 5 blockers resolved in conversation before this fire)
**Commits pushed**: (this commit — setup)
**Notes**:
- Authorization received: commits ✓, pushes ✓, playwright install ✓, tailwind option (b) tokens-only ✓.
- Parallelism: up to 4 subagents per fire, max 2 batches per fire.
- Cadence: first fire 2 hours from now, subsequent every 5 hours, aligned with Anthropic rate-reset window.
- Rate-limit strategy: stateless scheduled resumption. Per-fire work is bounded; if a fire exhausts the rate window, the next fire resumes cleanly from this file's checkbox state. No in-session sleep (which was the failure mode of the previous autonomous attempt).
- User has in-progress uncommitted edits in `content/studyPlans.ts` and `docs/CREDIT_AUDIT.md`. All items in the backlog that could touch those files are constrained via "Do not touch" clauses.
- Speaking (4.3) scope: Gemini 2.5 Flash supports audio input on free tier (15 RPM, 1500 RPD). Option B-lite becomes free — revised from original Option C-then-A plan.
- Product taste guidance from user: ownership + taste + "keep it free" constraint baked into item briefs.

