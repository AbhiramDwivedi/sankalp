# Capstone authoring style guide

Reference pack: `content/capstones/C01-restaurant-memory.tsx`.
Reference topic pack (for tone): `content/topics/L1-12-restaurants-food.tsx`.

## What a capstone is

A capstone is a **cross-topic, 3-paragraph personal essay** at one of three lengths (novice / intermediateMid / push). It **rehearses the exam performance** — not a sub-skill. A student reaches a capstone after finishing its contributing packs.

## Required structure

Every capstone exports one `pack: Capstone` object conforming to `content/schema.ts`:

- `id`, `order`, `tier` ('core' | 'push'), `isMockExam`, `titleHindi`, `titleEnglish`, `hook`, `heroMotif`, `themeGroup`
- `promptHindi`, `promptEnglish`, `whyThisCapstone` — motivation
- `draws: CrossTopicRef[]` — 3–5 refs naming the packs this integrates and what each contributes
- `versions: [novice, intermediateMid, push]` — exactly 3 `EssayVersion` objects, in that order, with wordCount, tensesUsed, connectorsUsed, targetBenchmark
- `annotations: EssayAnnotation[]` — keyed to the `intermediateMid` version; paragraphIndex 0/1/2; cover every paragraph
- `verdict: VerdictCard` — predicts Benchmark 5 for core, Benchmark 5–6 for push; cites rubric lines
- `readerQuestions` — exactly 5 free-response Q&A on the IM version
- `teacherNote` — why this capstone exists, what rubric axes it trains
- `status: 'shipped'`, `version: 1`

## Length envelopes

- **Novice version**: 110–150 Hindi words. Simple sentences, present tense mostly, 1–2 connectors.
- **Intermediate-Mid version**: **220–280 words** (core tier target) or **280–340 words** (push tier target). 3 paragraphs. ≥2 tenses. ≥3 connectors. 1 muhavara or cultural specific.
- **Push version**: 300–360 words. 3 paragraphs. ≥3 tenses. ≥5 connectors. ≥1 muhavara. Hypothetical or reported speech.

## Quality gates

- Every paragraph in the IM version has **at least 3 annotations**.
- Verdict card cites **specific sentence-level rubric mappings**, not vibes.
- Hindi must be teachable — avoid literary or regional idioms not on the IM syllabus.
- Transliteration is rough phonetic, space-separated. Native readers don't need it; learners do.
- English translation stays natural (not word-for-word).

## What to AVOID

- No AI-sounding prose ("In conclusion, my family and I..."). Write like a student.
- No made-up muhavare. Use only ones documented in pack `muhavare` fields.
- No Devanagari typos. Run validator before committing.
- No annotations referencing non-existent paragraphs.

## Gendered first-person variants (optional)

`EssayVersion` accepts optional `hindiMale` / `hindiFemale` overrides
(parallel `transliterationMale` / `transliterationFemale` for the
phonetic line). The renderer picks the right form via
`pickGenderedHindi(version, profile?.gender)` — `undefined` and `'male'`
both resolve to `hindiMale ?? hindi`; `'female'` resolves to
`hindiFemale ?? hindi`. The canonical `hindi` field is the audit fallback
and stays unchanged when authors add gendered overrides.

C01, C05, and C10 ship with `hindiMale` overrides (existing essays were
authored from a female-coded perspective; the male variant only flips the
speaker-as-self verbs and adjectives). When authoring a new capstone:

- Pick a single voice for `hindi`. Stay consistent within the essay.
- Add the matched `hindiMale` (and/or `hindiFemale`) ONLY for words that
  truly change form. Most `मैं` sentences are gender-neutral — see
  `content/HOUSE_STYLE.md` "Gendered first-person content" for the
  checklist.
- Annotations key off the canonical `hindi` text. Don't author annotations
  against an override.

## How to test

1. `npx tsc --noEmit` — clean.
2. `npx tsx scripts/validate-content.ts` — passes capstone checks.
3. Print preview in the CapstoneView — 3 pages max including margin annotations.
