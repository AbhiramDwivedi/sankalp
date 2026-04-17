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

