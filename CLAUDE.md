# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start Vite dev server on port 3000 (host 0.0.0.0)
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build
- `npx tsx scripts/validate-packs.ts` — structural validator across all topic packs (exits non-zero on schema violations)
- `GEMINI_API_KEY=... npx tsx scripts/generate-heroes.ts` — generate hero images via Google Imagen (idempotent; skips existing)

No test or lint scripts are configured.

## Environment

`GEMINI_API_KEY` must be set in `.env.local` for optional AI assessment. `vite.config.ts` injects it into the client bundle as both `process.env.API_KEY` and `process.env.GEMINI_API_KEY` via `define` — there is no server, the key ships to the browser.

## Architecture

Single-page React 19 + TypeScript + Vite app that prepares a student for the **FCPS World Language Credit Exam in Hindi** — specifically the Avant **STAMP 2S/WS** (Writing + Speaking only; no reading or listening sections). The target outcome is **STAMP Benchmark 5 (Intermediate Mid) = 3 FCPS credits**.

Styling uses Tailwind utility classes via CDN (no Tailwind build step or config file). Icons from `lucide-react`. Hindi fonts: Noto Sans Devanagari (body) + Tiro Devanagari Hindi (display) + Plus Jakarta Sans (Latin).

### Content-first, AI-sparing design

The app is **static content + optional AI evaluation**, not AI-generated content:

- **26 hand-authored topic packs** live in `content/topics/*.tsx` covering FCPS Levels 1, 2, and an L3 stretch.
- Each pack conforms to the `TopicPack` schema in `content/schema.ts` and includes: vocabulary, grammar, connectors, an anchor passage, model texts, cultural insights, muhavare, two fully-annotated model essays (each with a VerdictCard predicting Benchmark 5), writing prompts, and a self-check rubric.
- Every section carries a `TeacherNote` explaining *why it exists* and which rubric axis (Text-Type / Language Control / Topic Coverage) it trains — so a teacher unfamiliar with STAMP can see the pedagogical logic.
- AI is reserved for **optional writing evaluation** via `evaluateWriting()` in `geminiService.ts` (accepts typed Devanagari or a handwritten photo). Disabled per-profile by default.

### State model

All state is client-side in `localStorage` — no backend:
- `sankalpa_hindi_profiles` — array of `StudentProfile` (all students)
- `sankalpa_active_id` — currently selected student id

`App.tsx` is the single source of truth: it owns `profiles`, `activeId`, `activeTab`, `openPack`, and `showHowThisWorks`, and passes callbacks down. `updateActiveProfile` + `saveAllProfiles` is the canonical write path — any mutation should route through these so localStorage stays in sync. `migrateProfile()` in `types.ts` normalizes legacy profile records from the old AI-curriculum era.

### Directory layout

```
content/
  schema.ts          # TopicPack types (single source of truth)
  rubric.ts          # STAMP benchmarks 1–8, rubric axes, FCPS credit mapping
  connectors.ts      # Master Hindi connector bank; pickConnectors(keys)
  imagePrompts.ts    # Shared hero-image style wrapper
  index.ts           # Ordered registry: TOPIC_PACKS, TOPIC_PACKS_BY_ID, etc.
  stubHelpers.ts     # Used by stub packs only — shipped packs don't need it
  topics/            # 26 TopicPack files, one per FCPS sub-topic
  HOUSE_STYLE.md     # Authoring guide for new packs
components/
  Layout.tsx         # Shell with sidebar + mobile nav
  Onboarding.tsx     # Profile creation wizard
  ui/                # Card, Badge, Section, Callout, DevanagariText, SVG motifs
  topic/             # TopicPackView + 13 section components + AiAssessmentPanel
  pages/             # LibraryView, DashboardView, HowThisWorksView, RubricReferenceView
public/topics/       # Hero images hero-<id>.jpg (or hero-<id>.svg fallback)
scripts/             # validate-packs.ts, generate-heroes.ts
```

### Routing

- No active profile → student picker + `Onboarding` overlay.
- First-run per profile → `HowThisWorksView` (mandatory exam/rubric explainer).
- Active profile + no open pack → tab-based layout:
  - `dashboard` → `DashboardView` (progress, next pack, rubric at a glance)
  - `library` → `LibraryView` (grouped grid of 26 packs)
  - `rubric` → `RubricReferenceView` (full STAMP rubric + FCPS credit ladder)
  - `settings` → profile CRUD + AI-assessment toggle
- Click a pack → `TopicPackView` full-screen overlay with "Back to Library" + Print.

### Gemini integration (`geminiService.ts`)

A single call: `evaluateWriting(submission, promptContext)`. Accepts either `{ kind: 'text', text }` (typed essay in Devanagari) or `{ kind: 'image', data }` (base64 JPEG of handwriting). Rubric prompt encodes STAMP 2S/WS Benchmarks 1–8, FCPS credit mapping, and the FCPS-specific 3-paragraph personal-essay format. Output is an `EvaluationResult` stored in `profile.evaluations[topicId]`.

Old AI calls (`generateCoursePlan`, `generateLessonMaterial`) were removed when static content landed.

### Authoring new or modified packs

Read `content/HOUSE_STYLE.md`. Use `content/topics/L1-12-restaurants-food.tsx` as the quality anchor — every other pack should match its depth. Run `npx tsc --noEmit` and `npx tsx scripts/validate-packs.ts` before committing.

### Print design

Every pack is designed to print cleanly. `index.html` extends the print CSS with named pages, break-before/after utilities (`print:break-before-page`, `print:break-inside-avoid`), 3-column vocab grid, and a tear-off self-check rubric. Test print preview on at least one L1 + one L2 + one L3 pack after major changes.
