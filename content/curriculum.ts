// CURRICULUM - single source of truth for every claim about the exam system,
// credit mapping, language, and script this app targets.
//
// Today it says "FCPS STAMP Hindi". Tomorrow, a sibling constant could say
// "FCPS STAMP Mandarin" or "LOTE Korean" and the rest of the codebase should
// not need to change. That seam is what this constant proves.
//
// Rule: never hand-type any of these strings anywhere else in the source.
// Always import CURRICULUM and reference the field.
//
// Exceptions (deliberately not routed through CURRICULUM):
//   - Authored content in content/topics/*.tsx and content/capstones/*.tsx
//     (explicit teacher prose, not app chrome).
//   - Plan copy in content/studyPlans.ts.
//   - Celebration copy in content/celebrations.ts (authored, tone-specific).
//   - types.ts ProficiencyLevel enum (persisted to localStorage — renaming
//     breaks saved profiles).
//   - Flashcard generated.ts (committed generator output).
//   - Doc strings, tests, READMEs, config.
//
// Rubric data consumed by evaluateWriting() lives in the companion module
// content/curriculumRubric.ts. It imports CURRICULUM here AND the authored
// rubric.ts data to avoid an import cycle (rubric.ts imports CURRICULUM for
// display strings). Treat CURRICULUM_RUBRIC as a field of CURRICULUM from
// the consumer's perspective — it is deliberately split only for module
// load ordering.

// Bespoke rater-facing descriptors used by evaluateWriting(). These are
// SHORTER and slightly differently phrased than the UI-facing descriptors
// in STAMP_BENCHMARKS (which feed HowThisWorksView + RubricReferenceView).
// They live on the CURRICULUM object so the Gemini prompt is fully derived
// from curriculum data. A sibling curriculum would supply its own
// rater-short descriptors for the same benchmark keys.
const RATER_BENCHMARK_DESCRIPTORS = {
  3: 'simple sentences, disconnected',
  4: 'strings of sentences with detail, still independent',
  5: 'connected sentences with transitions and groupings of ideas; sentences cannot be rearranged without altering meaning; some control of past/present/future',
  '6+': 'paragraph cohesion with stronger accuracy',
} as const;

// Rubric-axis display entries used by the rater prompt, in display order.
// The `id` matches RUBRIC_AXES ids in content/curricula/fcps-stamp-hindi/rubric.ts;
// see content/curriculumRubric.ts for the assertion that ties the two.
const RATER_AXES = [
  {
    id: 'TextType' as const,
    label: 'TEXT-TYPE',
  },
  {
    id: 'LanguageControl' as const,
    label: 'LANGUAGE CONTROL',
    summary:
      'High / Average / Low based on comprehensibility and accuracy (gender, number, verb forms).',
  },
  {
    id: 'TopicCoverage' as const,
    label: 'TOPIC COVERAGE',
    summary: 'does the response stay on topic with specific vocabulary?',
  },
] as const;

export const CURRICULUM = {
  id: 'fcps-stamp-hindi',
  language: {
    name: 'Hindi',
    code: 'hi',
    script: 'Devanagari',
    fontStack: {
      display: 'Tiro Devanagari Hindi',
      body: 'Noto Sans Devanagari',
    },
  },
  examSystem: {
    name: 'STAMP 2S/WS',
    shortName: 'STAMP',
    provider: 'Avant Assessment',
    providerShortName: 'Avant',
    sections: ['Writing', 'Speaking'] as const,
  },
  creditMapping: {
    benchmark: 5,
    creditName: 'Intermediate Mid',
    credits: 3,
    issuer: 'FCPS',
    fullIssuerName: 'Fairfax County Public Schools',
  },
  displayStrings: {
    examShortName: 'STAMP',
    creditPhrase: '3 FCPS credits',
    targetPhrase: 'Benchmark 5',
    targetFullPhrase: 'STAMP Benchmark 5 (Intermediate Mid)',
  },
  // Rubric data consumed by evaluateWriting(). Kept inline (primitives + labels
  // only) so curriculum.ts remains a leaf module and the authored rubric file
  // can still import CURRICULUM for display strings without an import cycle.
  // The derivation from STAMP_BENCHMARKS / RUBRIC_AXES lives in
  // content/curriculumRubric.ts; see that file for cross-checks.
  rubric: {
    raterDescriptors: RATER_BENCHMARK_DESCRIPTORS,
    axes: RATER_AXES,
    writingFormat:
      'two essays, each at least 3 cohesive paragraphs, personal experience.',
    passingScore: 7,
  },
} as const;

export type Curriculum = typeof CURRICULUM;
