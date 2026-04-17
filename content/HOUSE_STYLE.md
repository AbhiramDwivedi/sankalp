# Sankalp Topic Pack — House Style

This is the authoring guide for every topic pack under `content/topics/`.
Read this once, then use `L1-12-restaurants-food.tsx` as the reference shape.

## The one rule

Every pack must teach the student to write a **3-paragraph personal essay** on
the topic that would be scored **STAMP Benchmark 5 (Intermediate Mid)** → 3 FCPS
credits. If content in your pack does not contribute to that outcome, cut it.

## Required structure

Every pack is a single `TopicPack` object (see `schema.ts`). All fields are
required. Every section has a `TeacherNote` explaining why the section exists.

### Vocabulary — 20–30 entries
- Each entry: `hindi`, `transliteration`, `english`, one-sentence `exampleHindi`
  with `exampleEnglish` gloss, one `emoji`, `partOfSpeech`, optional `subgroup`.
- Subgroups let you cluster e.g. "Meals", "Tastes", "Restaurant", "Verbs".
- Verbs should appear in the form the student will actually write (होना, खाना,
  पीना, पसंद करना — NOT abstract infinitives with no context).
- Gender of nouns must be correct. When in doubt, verify against a
  Hindi-Hindi dictionary before writing.

### Grammar Cornerstones — 2–4 notes
- Each note targets one rule the student will actually hit on this topic.
- Examples show the rule applied in topic-appropriate sentences.
- Include `pitfall` (common error) and `whyItMatters` (rubric consequence,
  phrased in terms of Text-Type or Language Control).

### Connectors — 6–10 entries
- Use `pickConnectors(...)` from `../connectors` with keys.
- Start pack's selection with STARTER_CONNECTOR_KEYS for L1 packs, widen to
  GROWING for L2, IM_PUSH for L3.

### Anchor Passage — 100–150 Hindi words
- One title (Devanagari + English transliteration), `hindi` Devanagari text,
  `transliteration`, `english` translation.
- 4–6 `highlights` (what the student should notice — connectors, gender,
  cultural markers).
- 5–8 `comprehensionQuestions` with answers.

### Model Texts — 3–5
- Each a different `kind`: email, diary, announcement, menu, schedule, letter,
  review, sign, sms, poster. Pick what fits the topic.
- Short (30–60 Hindi words each). Include transliteration + English.

### Cultural Insight — 3–5
- Concrete, specific, India-rooted. No hand-wavy "India is diverse" filler.
- Each has an `emoji`, a `title`, and a 1–2 sentence body.

### Muhavare — exactly 2
- Curated. Do not invent obscure ones. Prefer muhavare related to the topic.
- Fields: `phrase`, `literal`, `meaning`, `example`, `exampleEnglish`.

### Model Essays — exactly 2
- Each includes the `prompt` it answers, a `novice` 3–5-word version, the
  full `intermediateMid` essay (100–150 Hindi words, 3 paragraphs separated
  by `\n\n`).
- `annotations` attach to each paragraph index (0, 1, 2). Cover every
  paragraph with at least one annotation.
- `tenseUsed` must list what the essay actually uses. For Benchmark 5, at
  least two of past/present/future.
- `connectorsUsed` lists the Hindi connectors present.
- `verdict` mandatory: `predictedBenchmark: 5`, `predictedCredit:
  'IntermediateMid_3cr'`, 4–5 specific `whyItPasses` lines each referencing
  a sentence or feature, plus 2–3 `gotchas` (errors that would drop it).

### Writing Prompts — exactly 3
- FCPS format: 3 cohesive paragraphs, personal experience.
- Each with `hint.connectors`, `hint.vocab`, `hint.tenses`.

### Teacher Notes — every section
- Short (2–4 sentences). State the rubric axis you are training in concrete
  language. Avoid platitudes.

### Rationale
- `fcpsSubTopics`: the FCPS topic bullets served, stated verbatim.
- `trains`: which RubricAxis values this pack primarily drives.
- `afterThisPackStudentCan`: 3–5 specific can-do statements.
- `positionOnArc`: 'foundations' | 'building' | 'pushing-to-IM'.
- `estimatedTime`: e.g., '90 min reading + 30 min essay'.
- `ifSkippedRisk`: what happens if a student skips this pack.

## Hindi conventions

- Use Devanagari only in `hindi` / `exampleHindi` / passage `hindi` etc. No
  transliteration in Devanagari fields.
- Use ASCII transliteration consistently. For long vowels use doubled letters
  (ā → aa, ī → ee, ū → oo). For ड़/ढ़ use "d" / "dh" with a dot or in prose,
  since tests typically don't grade transliteration.
- Use polite/neutral student perspective by default (मैं ... हूँ, करता/करती
  हूँ). Mixing masculine/feminine forms is acceptable; the Language Control
  rubric does NOT penalize either choice — it penalizes inconsistency.
- Prefer authentic Indian Hindi (रसोई not किचन, पानी not वाटर) — cultural
  authenticity lifts Topic Coverage.
- Verify every verb conjugation. When the subject is "मैं" and past transitive,
  use मैंने. When intransitive (आना, जाना), use मैं गया/गयी.

## Page 1: status

Every pack you complete sets `status: 'shipped'`. Leave stubs at `'stub'`.
Drafted-but-not-reviewed packs use `'drafted'`.

## File format

```tsx
import type { TopicPack } from '../schema';
import { composeHeroPrompt } from '../imagePrompts';
import { pickConnectors } from '../connectors';

export const pack: TopicPack = {
  id: '...',
  level: 1 | 2 | 3,
  themeGroup: 'Identity' | 'ModernSociety' | 'HumanIngenuity',
  order: /* existing from stub */,
  titleHindi: '...',
  titleEnglish: '...',
  hook: '...',
  heroPrompt: composeHeroPrompt('specific scene description for this topic'),
  rationale: { ... },
  objectives: [ ... ],
  vocabulary: [ ... ],
  vocabularyNote: { why: '...', trains: [...] },
  // ... all required fields ...
  status: 'shipped',
  version: 1,
};
```

## Forbidden

- AI-generated idioms. Use only real, widely-known muhavare.
- Vocabulary items the student will not actually need for writing (obscure
  synonyms, specialized jargon).
- Cultural statements that are condescending, stereotyping, or generic.
- Essays that read as Novice-High. Push every model essay to Benchmark 5.
- Skipping the verdict card or teacher notes. These are the whole point.
