# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm install` — install dependencies (also installs git hooks via the `prepare` script, worktree-aware)
- `npm run dev` — Next.js dev server (Turbopack) on port 3000
- `npm run build` — production build (`next build`)
- `npm run start` — preview the production build
- `npm run check` — full gate: tsc + validate-packs + build-flashcards + credit-audit + Playwright smoke + visual + a11y
- `npm run smoke` / `npm run visual` / `npm run a11y` — individual Playwright suites
- `npx tsx scripts/validate-packs.ts` — structural validator across packs, capstones, study plans
- `npx tsx scripts/build-flashcards.ts` — regenerate `content/flashcards/generated.ts` (idempotent; commit output)
- `npx tsx scripts/credit-audit.ts` — re-run the 3-credit audit; writes `docs/CREDIT_AUDIT.md` and exits non-zero on hard-gate failure

## Environment

See `.env.example` for the full list; the load-bearing vars are:

- **`NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`** — required. Drive sign-in (email OTP) and cross-device profile sync. RLS on `public.profiles` is the actual security boundary; the publishable key is meant to ship in the browser bundle.
- **`SUPABASE_SERVICE_ROLE_KEY` + `SUPABASE_JWT_SECRET`** — server-only. Reserved for future admin operations.
- **`POSTGRES_*`** — populated by the Vercel + Supabase integration. Used by `scripts/apply-migrations.ts` for schema changes; no runtime code reads them.
- **`GEMINI_API_KEY`** — optional. Only the AI writing / speaking evaluation panels call Gemini; the rest of the app (packs, flashcards, credit audit, capstones) is fully deterministic and works without it.
- **`E2E_AUTH_BYPASS` / `NEXT_PUBLIC_E2E_AUTH_BYPASS`** — test-only. Set by the Playwright configs so the pre-auth-era smoke/visual/a11y suites can hit gated routes directly. Ignored in production (middleware checks `NODE_ENV !== 'production'`).

Middleware (`middleware.ts`) runs on every request to refresh the Supabase session cookie and redirect unauthenticated users off gated routes. Public marketing routes (`/`, `/overview`, `/how-this-works`, `/audit`, `/rubric`) remain reachable without a session — enumerated in `lib/auth-routes.ts`.

## Architecture

Next.js 16 App Router + React 19 + TypeScript app that prepares a student for the **FCPS World Language Credit Exam in Hindi** — specifically the Avant **STAMP 2S/WS** (Writing + Speaking only; no reading or listening sections). Target outcome: **STAMP Benchmark 5 (Intermediate Mid) = 3 FCPS credits**.

Styling uses Tailwind v4 CSS tokens (warm cream + saffron-orange + teal accent) declared in `app/globals.css`, wired through shadcn/ui primitives under `components/ui/`. Icons from `lucide-react`. Fonts: Geist (Latin) + Noto Sans Devanagari (body) + Tiro Devanagari Hindi (display), all loaded via `next/font`.

### Content-first, AI-sparing design

The app is **static content + optional AI evaluation**, not AI-generated content. Four content layers, all typed and validated:

- **26 hand-authored topic packs** (`content/topics/*.tsx`) — FCPS Levels 1, 2, and an L3 stretch. Each pack: vocabulary, grammar, connectors, a reading sample, model texts, cultural insights, muhavare, two annotated model essays (each with a VerdictCard predicting Benchmark 5), writing prompts, self-check rubric.
- **10 cross-topic capstones** (`content/capstones/*.tsx`) — 5 core (220–280 words, B5 target) + 5 push (280–340 words, B6 reach). Each capstone draws from 3–5 packs and ships in three tiers (novice / intermediateMid / push) side-by-side so the student sees growth. Two capstones double as timed Mock Exams. C01/C05/C10 are the quality anchors.
- **5 named study plans** (`content/studyPlans.ts`) — `plan-foundation` (10 weeks), `plan-acceleration` (8 weeks), `plan-intermediate-bridge` (6 weeks), `plan-push` (4 weeks), `plan-polish` (2 weeks). A profile's `currentLevel` maps to one; `planCursor()` drives "next pack" resolution on the dashboard.
- **~1128-card flashcard library** (`content/flashcards/generated.ts`, committed output of `scripts/build-flashcards.ts`) — 26 pack-review + 3 theme-review + 1 connector-drill + 1 muhavara-drill + 1 grammar-essentials + 1 top-150 exam-prep deck. Priority tiers: `must-know` / `core` / `bonus`. Printable 8-up duplex-aligned cut sheets via `PrintSheet`.

Every section, every capstone, and every diagram carries a `TeacherNote` explaining *why it exists* and which rubric axis it trains (Text-Type / Language Control / Topic Coverage). A non-expert teacher can read the page and see the pedagogical logic.

AI is reserved for **optional writing evaluation** and **speaking evaluation** via `evaluateWriting()` / `evaluateSpeaking()` in `geminiService.ts`. Disabled per-profile by default.

### 3-credit audit

`scripts/credit-audit.ts` reads the content and writes `docs/CREDIT_AUDIT.md` — a plain-English evidence report the teacher can trust. Hard gates: every FCPS sub-topic served; every core connector used in ≥1 IM essay; tense coverage floors (past ≥20, present ≥20, future ≥15); every study plan references all 10 capstones. Live copy of the same audit renders at `/audit` (via `CreditAuditView`), linked from Settings.

### SVG art system

Zero external image dependencies. 15 motif components (`components/art/motifs.tsx`) + `PackHeroArt` / `CapstoneHeroArt` composers that mix motifs with theme-colored gradients and rangoli/paisley decoration. Every pack declares a `heroMotif` key. 5 explainer diagrams in `components/art/diagrams.tsx` (tense timeline, rubric ladder, paragraph scaffold, ne construction, gender agreement).

### Three-role system

Sankalp ships three role shells — Student, Teacher, Parent. Sign-in (email OTP via Supabase) is required to reach the app surfaces; role is a UI discriminator stored on the profile (`profile.role`) and can be chosen independently per profile (one signed-in email may own multiple profiles across roles). Onboarding at `/onboarding?role=<role>` collects a name + proficiency level and:

- **Student** → creates a `StudentProfile` with the chosen level and empty progress.
- **Teacher / Parent** → creates a shell profile with `role: 'teacher' | 'parent'` and a seeded `demoStudent` (`lib/seedDemoStudent.ts`) whose `activityDates` / `completedTopicIds` / `flashcardsMastered` reflect a plausible student at the chosen level. The dashboard reads `profile.demoStudent` as the data source; the adult's own `activityDates` stay empty.

`app/dashboard/page.tsx` dispatches on `profile.role` to `StudentDashboard` / `TeacherDashboard` / `ParentDashboard`. The navbar profile switcher is a shadcn dropdown that flips `activeId` via `useProfile().switchProfile()`.

### XP + streak

Gamification numbers are derived on read, not stored:

- **Streak** — `lib/streak.computeStreak(activityDates)`. `activityDates` is an ascending, unique array of `YYYY-MM-DD` strings populated by `appendToday` whenever the student completes a pack, rates a flashcard, or submits a speaking attempt.
- **XP** — `lib/xp.computeXp(profile)`. Packs worth 50 XP; core capstones 100; push capstones 150; mastered flashcards 5 each; AI-graded writing ≥ score 5 worth 30; AI-graded speaking ≥ score 5 worth 20. Pure function; no state.

Navbar pills read the active profile (or its `demoStudent` for teacher/parent) and render live. Both values are zero before hydration to avoid SSR / client markup divergence.

### State model

Profiles live in Supabase (`public.profiles`, one row per `StudentProfile` blob, owned by `auth.users.id` and gated by RLS). `lib/profile-context.tsx` is the single client accessor — it reads from Supabase on auth state change, writes through optimistically (debounced for per-keystroke updates, immediate for onboarding batch saves), and falls back to legacy `localStorage` keys (`sankalpa_hindi_profiles`, `sankalpa_active_id`) when there is no session so the public marketing routes and the pre-auth test suite still work.

The first time a signed-in user arrives with legacy `localStorage` profiles and an empty remote, the onboarding route shows an **adopt vs. start-fresh** prompt. Adopting copies the local profiles into their account and clears the local keys. This is a one-time migration path; new users never see it.

`migrateProfile()` in `types.ts` normalizes records from both sources on read so any schema evolution lives in client code rather than the DB.

### Directory layout

```
app/                       # Next.js App Router
  layout.tsx               # Root layout: font hookup, ProfileProvider, toaster
  page.tsx                 # Landing page (hero + role CTAs + feature grid)
  onboarding/page.tsx      # 4-step onboarding (role · name · level · confirm)
  dashboard/page.tsx       # Role dispatcher → Student/Teacher/Parent view
  lessons/page.tsx         # Pack catalog (LibraryView)
  lessons/[packId]/page.tsx
  capstones/page.tsx
  capstones/[capstoneId]/page.tsx
  flashcards/page.tsx
  flashcards/[deckId]/page.tsx
  plan/page.tsx
  rubric/page.tsx
  audit/page.tsx
  how-this-works/page.tsx
  settings/page.tsx
  globals.css              # Tailwind v4 tokens + print CSS + focus rings

components/
  navbar.tsx               # Sticky top nav with streak + XP pills + profile switcher
  footer.tsx
  landing-cta-row.tsx      # Role-aware landing CTAs (returning user → /dashboard)
  route-helpers.tsx        # PageShell, HydratingShell, NoProfileShell
  theme-provider.tsx
  dashboard/
    StudentDashboard.tsx   # Welcome header + Continue Learning + Quick Stats
    TeacherDashboard.tsx   # Demo-mode banner + demo roster + level distribution
    ParentDashboard.tsx    # Demo-child progress + week schedule
  ui/                      # shadcn primitives (card, button, dialog, tabs, ...)
  art/                     # 15 SVG motifs + hero composers + 5 diagrams
  topic/                   # TopicPackViewV2 + section components + AI panels
  capstone/                # CapstoneViewV2 + MockExamMode
  flashcards/              # DeckRunner + PrintSheet
  pages/                   # Catalog views (LibraryView, Capstones/Flashcards/
                           # StudyPlan/RubricReference/CreditAudit/HowThisWorks)

content/
  schema.ts                # All content types
  rubric.ts                # STAMP benchmarks 1–8, axes, FCPS credit mapping
  connectors.ts
  curriculum.ts            # Curriculum config (exam vendor, credit mapping)
  curricula/               # Per-curriculum data (fcps-stamp-hindi, cbse-marathi stub)
  index.ts                 # TOPIC_PACKS registry
  topics/                  # 26 TopicPack files
  capstones/
    index.ts
    CAPSTONE_STYLE.md
    C01..C10.tsx
  studyPlans.ts            # 5 plans + planCursor()
  flashcards/
    index.ts
    generated.ts           # Committed generator output (do not edit)
    mustHaveCards.ts
  HOUSE_STYLE.md

lib/
  profile-context.tsx      # useProfile() client context
  xp.ts                    # computeXp()
  streak.ts                # computeStreak() + appendToday()
  srs.ts                   # SM-2-lite scheduler
  seedDemoStudent.ts       # Demo-student seeding for teacher/parent onboarding
  exportProgress.ts

scripts/
  check.ts                 # Full gate: tsc + validators + Playwright
  validate-packs.ts
  build-flashcards.ts
  credit-audit.ts
  install-hooks.js         # Worktree-aware pre-commit hook installer

tests/
  smoke.spec.ts            # Playwright smoke (14 tests)
  a11y.spec.ts             # axe-core a11y (6 surfaces)
  srs.spec.ts              # Pure-TS unit tests for the SRS scheduler
  visual/print.visual.ts   # Visual regression (5 screen-media snapshots)

docs/
  CREDIT_AUDIT.md          # Generated audit (commit after content changes)
  VALIDATION_STATE.json
  AUDIT_STATE.json
```

### Routing (Next.js App Router)

- `/` → public landing with three "Enter as Student / Parent / Teacher" CTAs. Returning users are silently routed to `/dashboard` when a matching-role profile already exists.
- `/onboarding?role=<student|parent|teacher>` → 4-step flow. A URL-provided role locks step 1.
- `/dashboard` → role-dispatched dashboard. Redirects to `/` when no profile exists.
- `/lessons` / `/lessons/[packId]` → catalog + deep-dive for topic packs.
- `/capstones` / `/capstones/[capstoneId]` → catalog + deep-dive for capstones.
- `/flashcards` / `/flashcards/[deckId]` → deck catalog + DeckRunner.
- `/plan`, `/rubric`, `/audit`, `/how-this-works`, `/settings` → reference pages.

Every content route renders a `PageShell` with the Navbar + Footer. Routes that need a profile use `HydratingShell` during client hydration and `NoProfileShell` (with a prominent "Start onboarding" CTA) when there's no active profile.

### Gemini integration (`geminiService.ts`)

Two calls: `evaluateWriting(submission, promptContext)` (text or image of handwriting) and `evaluateSpeaking(transcript, promptContext)`. Both are rubric-grounded; the prompt encodes STAMP 2S/WS Benchmarks 1–8, the FCPS credit mapping, and the 3-paragraph personal-essay expectation. Results are stored on the profile (`evaluations[topicId]` or `speakingRecordings[packId]`).

### Authoring

- **New topic packs**: read `content/HOUSE_STYLE.md`; quality anchor is `content/topics/L1-12-restaurants-food.tsx`.
- **New capstones**: read `content/capstones/CAPSTONE_STYLE.md`; quality anchors are C01 (narrative core), C05 (mid-point core), C10 (push ceiling).
- **After content changes**: run `npm run check`. It runs tsc, validate-packs, build-flashcards, credit-audit, smoke, visual, and a11y in order. Commit regenerated `content/flashcards/generated.ts` and `docs/CREDIT_AUDIT.md` alongside your content changes.

### Print design

Every pack, every capstone, every flashcard deck is designed to print cleanly. `app/globals.css` carries named-page rules, break-before/after utilities, a 3-column vocab grid, the duplex-aligned 8-up flashcard layout, and tear-off self-check rubrics. Test print preview on at least one L1 + one L2 + one L3 pack + one core capstone + one flashcard sheet after major changes.

## Autonomous-run invariants

The repository supports a scheduled autonomous build run driven by `docs/BACKLOG.md`. When any subagent is operating in that mode (branch naming: `auto/*`), it must respect these invariants. Human contributors should also follow them in spirit.

- **Never edit `content/flashcards/generated.ts` by hand.** Only regenerate via `npx tsx scripts/build-flashcards.ts`, and commit the regenerated output alongside the content change that triggered it.
- **Always regenerate flashcards after pack edits.** The generator is deterministic; a stale `generated.ts` is a merge hazard.
- **Never change STAMP benchmark boundaries, FCPS credit thresholds, or rubric-axis definitions in `content/rubric.ts`** without explicit authorization. These are claims about the exam vendor, not design choices.
- **Always run the full gate before declaring a task done.** `npm run check`. For UI tasks this already includes smoke + visual + a11y.
- **Always invoke the `reviewer` sub-agent after any code-generation pass, before declaring work done.** See `.claude/agents/reviewer.md`. The reviewer is blind to the implementer's reasoning — treat its verdict as an independent check. `VERDICT: fix-first` or `reject` blocks shipping until addressed. Applies to: new files, edits to existing code, refactors, bug fixes. Does not apply to: pure doc edits, backlog checkbox ticks, agent-log entries.
- **Branch-and-PR only for feature/fix work.** Direct commits to `main` are reserved for housekeeping (backlog checkbox updates, agent log entries). Branch naming for autonomous items: `auto/{item-id}`.
- **Audit failure is a revert, not a follow-up.** If `scripts/credit-audit.ts` fails after a content change, the change is unshipped until the audit passes — even if `tsc` is green.
- **Never skip git hooks** (`--no-verify`), **never force-push** to `main` or shared branches, **never amend published commits**.
- **Never add dependencies** beyond what a specific backlog item's brief authorizes.

### Recommended branch protection (manual)

For full autonomous safety, a repo admin should enable branch protection on `main` with:
- Require pull request before merging.
- Require status checks to pass: `CI / check` and `guard / scope-creep`.
- Disallow force-pushes to main.

Without this, CI failures on an `auto/*` PR don't block the squash-merge path the autonomous build uses. The repo admin step cannot be automated from Actions (admin PAT required).
