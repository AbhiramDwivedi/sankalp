# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start Vite dev server on port 3000 (host 0.0.0.0)
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build
- `npx tsx scripts/validate-packs.ts` — structural validator across packs, capstones, study plans (exits non-zero on schema violations)
- `npx tsx scripts/build-flashcards.ts` — regenerate `content/flashcards/generated.ts` from packs + capstones + curated priority list (idempotent; commit output)
- `npx tsx scripts/credit-audit.ts` — re-run the 3-credit audit; writes `docs/CREDIT_AUDIT.md` and exits non-zero on hard-gate failure
- `GEMINI_API_KEY=... npx tsx scripts/generate-heroes.ts` — optional Imagen-based hero JPEGs (SVG heroes ship by default; this path is unused unless upgrading visuals)

No test or lint scripts are configured.

## Environment

`GEMINI_API_KEY` is only needed for the optional AI writing assessment. The app is fully functional without it — hero art is SVG, flashcards are deterministic, and the credit audit uses no external services.

`vite.config.ts` injects the key into the client bundle as `process.env.API_KEY` / `process.env.GEMINI_API_KEY` — there is no server, the key ships to the browser.

## Architecture

Single-page React 19 + TypeScript + Vite app that prepares a student for the **FCPS World Language Credit Exam in Hindi** — specifically the Avant **STAMP 2S/WS** (Writing + Speaking only; no reading or listening sections). The target outcome is **STAMP Benchmark 5 (Intermediate Mid) = 3 FCPS credits**.

Styling uses Tailwind utility classes via CDN (no Tailwind build step or config file). Icons from `lucide-react`. Hindi fonts: Noto Sans Devanagari (body) + Tiro Devanagari Hindi (display) + Plus Jakarta Sans (Latin).

### Content-first, AI-sparing design

The app is **static content + optional AI evaluation**, not AI-generated content. Four content layers, all typed and validated:

- **26 hand-authored topic packs** (`content/topics/*.tsx`) — FCPS Levels 1, 2, and an L3 stretch. Each pack: vocabulary, grammar, connectors, a reading sample, model texts, cultural insights, muhavare, two annotated model essays (each with a VerdictCard predicting Benchmark 5), writing prompts, self-check rubric.
- **10 cross-topic capstones** (`content/capstones/*.tsx`) — 5 core (220–280 words, B5 target) + 5 push (280–340 words, B6 reach). Each capstone draws from 3–5 packs and ships in three tiers (novice / intermediateMid / push) side-by-side so the student sees growth. Two capstones double as timed Mock Exams. C01/C05/C10 are the quality anchors.
- **5 named study plans** (`content/studyPlans.ts`) — `plan-foundation` (10 weeks), `plan-acceleration` (8 weeks), `plan-intermediate-bridge` (6 weeks), `plan-push` (4 weeks), `plan-polish` (2 weeks). A profile's `currentLevel` maps to one; `planCursor()` drives "next pack" resolution on the dashboard and highlights the current week in Library.
- **~850-card flashcard library** (`content/flashcards/generated.ts`, committed output of `scripts/build-flashcards.ts`) — 26 pack-review + 3 theme-review + 1 connector-drill + 1 muhavara-drill + 1 grammar-essentials + 1 top-150 exam-prep deck. Priority tiers: `must-know` / `core` / `bonus`. Printable 8-up duplex-aligned cut sheets via `PrintSheet`.

Every section, every capstone, and every diagram carries a `TeacherNote` explaining *why it exists* and which rubric axis it trains (Text-Type / Language Control / Topic Coverage). A non-expert teacher can read the page and see the pedagogical logic.

AI is reserved for **optional writing evaluation** via `evaluateWriting()` in `geminiService.ts` (accepts typed Devanagari or a handwritten photo). Disabled per-profile by default.

### 3-credit audit

`scripts/credit-audit.ts` reads the content and writes `docs/CREDIT_AUDIT.md` — a plain-English evidence report the teacher can trust. Hard gates: every FCPS sub-topic served; every core connector used in ≥1 IM essay; tense coverage floors (past ≥20, present ≥20, future ≥15); every study plan references all 10 capstones. Live copy of the same audit renders at `/audit` (via `CreditAuditView`), linked from Settings.

### SVG art system

Zero external image dependencies. 15 motif components (`components/art/motifs.tsx` — thali, diya, rickshaw, umbrella, books, sunrise, temple, bazaar, clock, family, kurta, suitcase, notebook, cricket, namaste) + `PackHeroArt` / `CapstoneHeroArt` composers that mix motifs with theme-colored gradients and rangoli/paisley decoration. Every pack declares a `heroMotif` key.

5 explainer diagrams (`components/art/diagrams.tsx`): `TenseTimelineDiagram`, `RubricLadderDiagram`, `ParagraphScaffoldDiagram`, `NeConstructionDiagram`, `GenderAgreementDiagram`. Used in grammar sections, rubric page, and before each capstone body.

The Imagen script (`scripts/generate-heroes.ts`) exists but is not on the critical path. SVG art renders everywhere by default.

### State model

All state is client-side in `localStorage` — no backend:
- `sankalpa_hindi_profiles` — array of `StudentProfile` (all students)
- `sankalpa_active_id` — currently selected student id

`App.tsx` is the single source of truth: it owns `profiles`, `activeId`, `activeTab`, `openPack`, `openCapstone`, `openDeck`, `showHowThisWorks`. `updateActiveProfile` + `saveAllProfiles` is the canonical write path. `migrateProfile()` in `types.ts` normalizes legacy profile records.

Profile state includes: `completedTopicIds`, `completedCapstoneIds`, `selectedStudyPlanId`, `flashcardsSeen`, `flashcardsMastered`, `aiAssessmentEnabled`, `howThisWorksSeen`.

### Directory layout

```
content/
  schema.ts              # All content types (TopicPack, Capstone, StudyPlan, Flashcard, Deck)
  rubric.ts              # STAMP benchmarks 1–8, rubric axes, FCPS credit mapping
  connectors.ts          # Master Hindi connector bank; pickConnectors(keys)
  imagePrompts.ts        # Legacy Imagen wrapper (unused by default)
  index.ts               # TOPIC_PACKS registry
  topics/                # 26 TopicPack files
  capstones/
    index.ts             # CAPSTONES registry
    CAPSTONE_STYLE.md    # Authoring guide
    C01..C10.tsx         # 10 cross-topic capstones
  studyPlans.ts          # 5 named study plans + planCursor()
  flashcards/
    index.ts             # DECKS consumer API
    generated.ts         # Committed generator output (do not edit)
    mustHaveCards.ts     # Curated grammar essentials + priority rules
  HOUSE_STYLE.md         # Authoring guide for packs

components/
  Layout.tsx             # Shell with sidebar + mobile nav
  Onboarding.tsx         # Profile creation + plan matching
  ui/                    # Card, Badge, Section, Callout, DevanagariText, PaisleyDivider, RangoliCorner
  art/
    motifs.tsx           # 15 SVG motifs + MOTIFS registry
    PackHeroArt.tsx      # Theme-colored scene composer for packs
    CapstoneHeroArt.tsx  # Same for capstones (push tier gets gold accent)
    diagrams.tsx         # 5 explainer diagrams (tense timeline, rubric ladder, etc.)
  topic/                 # TopicPackView + section components + AiAssessmentPanel
  capstone/
    CapstoneView.tsx     # Full-screen capstone reader
    VersionComparison.tsx # 3-tab novice/IM/push; print shows all three
    DrawsFromPanel.tsx   # Links to contributing packs
  flashcards/
    FlashcardItem.tsx    # Flip card
    DeckRunner.tsx       # Keyboard + mastery tracking
    PrintSheet.tsx       # 8-up duplex-aligned print layout
  pages/
    DashboardView.tsx    # Plan-aware next-pack + upcoming capstone + rubric at a glance
    LibraryView.tsx      # 26-pack grid with SVG heroes
    CapstonesLibraryView.tsx  # 10-capstone grid by tier
    FlashcardsLibraryView.tsx # 33-deck grid with priority filter
    StudyPlanView.tsx    # Weekly schedule, printable
    HowThisWorksView.tsx # First-run exam/rubric explainer
    RubricReferenceView.tsx   # Full STAMP rubric
    CreditAuditView.tsx  # Live 3-credit audit

scripts/
  validate-packs.ts      # Structural validator (packs + capstones + plans)
  build-flashcards.ts    # Generator → content/flashcards/generated.ts
  credit-audit.ts        # Writes docs/CREDIT_AUDIT.md + hard gates
  generate-heroes.ts     # Optional Imagen JPEGs (not on critical path)

docs/
  CREDIT_AUDIT.md        # Generated audit (commit after content changes)

public/topics/
  hero-placeholder.svg   # Fallback only; SVG heroes render from PackHeroArt
```

### Routing

- No active profile → student picker + `Onboarding` overlay.
- First-run per profile → `HowThisWorksView` (mandatory exam/rubric explainer).
- Active profile + no overlay → tab-based layout:
  - `dashboard` → `DashboardView` (plan-aware next-pack, upcoming capstone, rubric at a glance)
  - `library` → `LibraryView` (26 packs with SVG heroes)
  - `capstones` → `CapstonesLibraryView` (10 capstones by tier)
  - `flashcards` → `FlashcardsLibraryView` (33 decks, filterable by kind)
  - `plan` → `StudyPlanView` (week-by-week schedule, printable)
  - `rubric` → `RubricReferenceView` (full STAMP rubric)
  - `audit` → `CreditAuditView` (3-credit audit — linked from Settings)
  - `settings` → profile CRUD + AI toggle + audit link
- Overlays: clicking a pack/capstone/deck opens a full-screen overlay with Back + Print.

### Gemini integration (`geminiService.ts`)

One call: `evaluateWriting(submission, promptContext)`. Accepts `{ kind: 'text', text }` (typed essay) or `{ kind: 'image', data }` (base64 JPEG). Rubric prompt encodes STAMP 2S/WS Benchmarks 1–8 + FCPS credit mapping + 3-paragraph personal-essay expectation. Output is an `EvaluationResult` stored in `profile.evaluations[topicId]`.

### Authoring

- **New topic packs**: read `content/HOUSE_STYLE.md`; quality anchor is `content/topics/L1-12-restaurants-food.tsx`.
- **New capstones**: read `content/capstones/CAPSTONE_STYLE.md`; quality anchors are C01 (narrative core), C05 (mid-point core), C10 (push ceiling).
- **After content changes**: run `npx tsc --noEmit`, then `npx tsx scripts/validate-packs.ts`, then `npx tsx scripts/build-flashcards.ts`, then `npx tsx scripts/credit-audit.ts`. Commit regenerated `content/flashcards/generated.ts` and `docs/CREDIT_AUDIT.md` alongside your content changes.

### Print design

Every pack, every capstone, every flashcard deck is designed to print cleanly. `index.html` extends the print CSS with named pages, break-before/after utilities, 3-column vocab grid, duplex-aligned 8-up flashcard layout, and tear-off self-check rubrics. Test print preview on at least one L1 + one L2 + one L3 pack + one core capstone + one flashcard sheet after major changes.
