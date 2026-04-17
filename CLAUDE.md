# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start Vite dev server on port 3000 (host 0.0.0.0)
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build

No test or lint scripts are configured.

## Environment

`GEMINI_API_KEY` must be set in `.env.local`. `vite.config.ts` injects it into the client bundle as both `process.env.API_KEY` and `process.env.GEMINI_API_KEY` via `define` — there is no server, the key ships to the browser.

## Architecture

Single-page React 19 + TypeScript + Vite app for a teacher managing multiple students preparing for the FCPS Hindi World Language Credit exam (target: Intermediate-Mid per ACTFL scale). Styling uses Tailwind utility classes (loaded via CDN in `index.html` — there is no Tailwind build step or config file). Icons from `lucide-react`.

### State model

All state is client-side in `localStorage` — there is no backend:
- `sankalpa_hindi_profiles` — array of `StudentProfile` (all students)
- `sankalpa_active_id` — currently selected student id

`App.tsx` is the single source of truth: it owns `profiles`, `activeId`, `activeTab`, and `selectedLesson`, and passes callbacks down. `updateActiveProfile` + `saveAllProfiles` is the canonical write path — any mutation should route through these so localStorage stays in sync.

When no profile is active, `App.tsx` renders a student picker / onboarding flow inline (not via `Layout`). When a profile is active, `Layout` wraps tab views (`dashboard`, `curriculum`, `progress`, `settings`) and an overlay `LessonView` takes over when `selectedLesson` is set.

### Gemini integration (`geminiService.ts`)

Three calls, all using `@google/genai` with `responseSchema` for structured JSON output:
1. `generateCoursePlan` — on onboarding, generates up to 18 monthly `Unit`s (capped regardless of months until exam), each with 4 weekly `Lesson`s. Uses `gemini-3-pro-preview`.
2. `generateLessonMaterial` — on demand when a lesson is opened; result is cached into `profile.generatedMaterials[lessonId]` so it isn't regenerated. Uses `gemini-3-pro-preview`.
3. `evaluateHandwriting` — multimodal call with a base64 JPEG of student writing; returns a rubric-based `EvaluationResult` appended to `profile.evaluations[lessonId]` and marks the lesson complete. Uses `gemini-3-flash-preview`.

Prompts encode the "Sankalpa" pedagogy (intentional logic, ACTFL scaling from Devanagari alphabet up to narrative fluency). When editing prompts, keep the `responseSchema` and the TypeScript interfaces in `types.ts` in sync — `safeJsonParse` will throw if the shape drifts.

### Types

`types.ts` is the contract between UI and Gemini responses. `StudentProfile` embeds the full generated `plan` plus per-lesson `generatedMaterials` and `evaluations` maps keyed by `lesson.id`.
