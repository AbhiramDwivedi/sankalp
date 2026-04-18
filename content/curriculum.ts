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
} as const;

export type Curriculum = typeof CURRICULUM;
