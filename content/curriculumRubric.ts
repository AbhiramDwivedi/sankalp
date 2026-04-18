// Companion to content/curriculum.ts. Composes CURRICULUM + the authored
// rubric data (content/curricula/fcps-stamp-hindi/rubric.ts) into a
// curriculum-neutral shape that evaluateWriting() can consume without
// hard-coding rubric prose.
//
// Living here (rather than on CURRICULUM directly) sidesteps an import
// cycle: rubric.ts imports CURRICULUM for display strings, so CURRICULUM
// cannot import rubric.ts in turn.
//
// No values from rubric.ts are mutated here — we only re-expose them.

import { CURRICULUM } from './curriculum';
import {
  RUBRIC_AXES,
  STAMP_BENCHMARKS,
  type BenchmarkDescriptor,
} from './curricula/fcps-stamp-hindi/rubric';

// Dev-only sanity: the axis ids used by the rater prompt MUST exist in
// the authored rubric axis list. If a future curriculum adds or renames an
// axis in rubric.ts, this throws at module load so we can't ship a prompt
// that references a stale axis.
const rubricAxisIds = new Set(RUBRIC_AXES.map((a) => a.id));
for (const axis of CURRICULUM.rubric.axes) {
  if (!rubricAxisIds.has(axis.id)) {
    throw new Error(
      `CURRICULUM.rubric.axes references unknown RubricAxis id "${axis.id}"; valid: ${Array.from(rubricAxisIds).join(', ')}`,
    );
  }
}

// Map a benchmark number to its ACTFL label via the authored descriptors.
function actflLabelFor(benchmark: number): string {
  const row = STAMP_BENCHMARKS.find((b: BenchmarkDescriptor) => b.benchmark === benchmark);
  return row ? row.actflLabel : '';
}

/**
 * Build the rater prompt header for the current curriculum. This is the
 * pre-task preamble passed to Gemini in evaluateWriting().
 *
 * The template structure mirrors the previous hand-written string so that
 * the Hindi+STAMP path produces a byte-identical prompt; the only change
 * is that every piece of prose is sourced from CURRICULUM + rubric data.
 */
export function buildRaterPromptHeader(): string {
  const { examSystem, language, creditMapping, displayStrings, rubric } = CURRICULUM;
  const target = creditMapping.benchmark;
  const b3Label = actflLabelFor(3);
  const b4Label = actflLabelFor(4);
  const targetLabel = creditMapping.creditName; // same as actflLabelFor(target) for FCPS+STAMP

  const textTypeAxis = rubric.axes.find((a) => a.id === 'TextType');
  const languageControlAxis = rubric.axes.find((a) => a.id === 'LanguageControl');
  const topicCoverageAxis = rubric.axes.find((a) => a.id === 'TopicCoverage');
  if (!textTypeAxis || !languageControlAxis || !topicCoverageAxis) {
    throw new Error('CURRICULUM.rubric.axes missing a required axis (TextType/LanguageControl/TopicCoverage).');
  }

  return `You are an ${examSystem.providerShortName}-style ${examSystem.name} rater grading a ${language.name} response for the ${creditMapping.issuer} World Language Credit Exam.

Grade against the ${examSystem.shortName} rubric:
- ${textTypeAxis.label}:
  Benchmark 3 (${b3Label}) = ${rubric.raterDescriptors[3]}
  Benchmark 4 (${b4Label}) = ${rubric.raterDescriptors[4]}
  Benchmark ${target} (${targetLabel}, TARGET for ${displayStrings.creditPhrase}) = ${rubric.raterDescriptors[target as 5]}
  Benchmark 6+ = ${rubric.raterDescriptors['6+']}
- ${languageControlAxis.label}: ${languageControlAxis.summary}
- ${topicCoverageAxis.label}: ${topicCoverageAxis.summary}

${creditMapping.issuer} Writing format expected: ${rubric.writingFormat}

Return a score 1-10 where ${rubric.passingScore}+ maps to ${examSystem.shortName} Benchmark ${target} (${creditMapping.creditName}, ${creditMapping.credits} credits).`;
}

// Re-export so callers that want the authored rubric data directly have a
// single import path adjacent to buildRaterPromptHeader().
export { RUBRIC_AXES, STAMP_BENCHMARKS };
