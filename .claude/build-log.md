# Sankalp Build Log — Capstones / Flashcards / SVG Art / Credit Audit

Plan: `C:\Users\abhir\.claude\plans\now-think-through-and-cozy-babbage.md`

## Resume rule

On wake, read this file; start at the first `[ ]` row below.

## Phase A — Spine (main thread)

| # | Artifact | Status | Notes |
|---|---|---|---|
| A1 | Extend `content/schema.ts` with Capstone/EssayVersion/CrossTopicRef/StudyPlan/Flashcard/Deck types + `heroMotif` on TopicPack | [ ] | |
| A2 | Extend `types.ts` StudentProfile + migrateProfile | [ ] | |
| A3 | Write 15 motif SVGs under `components/art/motifs/` | [ ] | |
| A4 | Write `components/art/PackHeroArt.tsx` + `CapstoneHeroArt.tsx` | [ ] | |
| A5 | Write 5 explainer diagrams under `components/art/diagrams/` | [ ] | |
| A6 | Wire `HeroBanner.tsx` to `PackHeroArt` | [ ] | |
| A7 | Backfill `heroMotif` on all 26 topic packs | [ ] | |
| A8 | Author `C01-restaurant-memory.tsx` (reference capstone) | [ ] | |
| A9 | Write `content/capstones/index.ts` + CAPSTONE_STYLE.md | [ ] | |
| A10 | Write `components/capstone/CapstoneView.tsx` + VersionComparison + DrawsFromPanel | [ ] | |
| A11 | Write `components/pages/CapstonesLibraryView.tsx` | [ ] | |
| A12 | Write `content/studyPlans.ts` (5 plans) | [ ] | |
| A13 | Write `components/pages/StudyPlanView.tsx` | [ ] | |
| A14 | Wire Onboarding to persist selectedStudyPlanId | [ ] | |
| A15 | Update DashboardView + LibraryView to honor plan | [ ] | |
| A16 | Update Layout.tsx nav tabs (add Capstones + Plan) | [ ] | |
| A17 | Update App.tsx routes for capstones + plan | [ ] | |
| A18 | Extend validator → validate-content.ts | [ ] | |

## Phase B — Capstones C02..C10

| # | Artifact | Status | Notes |
|---|---|---|---|
| B1 | C05-school-day (main thread) | [ ] | |
| B2 | C10-teen-life-essay (main thread) | [ ] | |
| B3 | C02 + C03 (sub-agents, 2 parallel) | [ ] | |
| B4 | C04 + C06 (sub-agents, 2 parallel) | [ ] | |
| B5 | C07 + C08 (sub-agents, 2 parallel) | [ ] | |
| B6 | C09 (sub-agent) | [ ] | |

## Phase C — Flashcards

| # | Artifact | Status | Notes |
|---|---|---|---|
| C1 | `content/flashcards/mustHaveCards.ts` | [ ] | |
| C2 | `scripts/build-flashcards.ts` + generated.ts | [ ] | |
| C3 | `components/flashcards/{DeckRunner,FlashcardItem,PrintSheet}.tsx` | [ ] | |
| C4 | `components/pages/FlashcardsLibraryView.tsx` + nav | [ ] | |

## Phase D — Credit audit

| # | Artifact | Status | Notes |
|---|---|---|---|
| D1 | `scripts/credit-audit.ts` → `docs/CREDIT_AUDIT.md` | [ ] | |
| D2 | `components/pages/CreditAuditView.tsx` + links | [ ] | |

## Phase E — Polish

| # | Artifact | Status | Notes |
|---|---|---|---|
| E1 | typecheck + validator + audit + build all green | [ ] | |
| E2 | CLAUDE.md updated | [ ] | |
| E3 | Final commit | [ ] | |
