// Structural validator for the topic pack library.
// Run: `npx tsx scripts/validate-packs.ts` (or via node after build).
// Exits non-zero on any structural violation.

import { TOPIC_PACKS } from '../content';
import type { TopicPack } from '../content/schema';

interface Issue {
  pack: string;
  severity: 'error' | 'warn';
  field: string;
  message: string;
}

const issues: Issue[] = [];

function push(pack: string, severity: Issue['severity'], field: string, message: string) {
  issues.push({ pack, severity, field, message });
}

function countWords(hindi: string): number {
  return hindi
    .split(/[\s।,!?]+/)
    .filter(Boolean)
    .filter((w) => /[\u0900-\u097F]/.test(w))
    .length;
}

function validatePack(p: TopicPack) {
  // Rationale
  if (!p.rationale.fcpsSubTopics?.length) push(p.id, 'error', 'rationale.fcpsSubTopics', 'empty');
  if (!p.rationale.trains?.length) push(p.id, 'error', 'rationale.trains', 'empty');
  if (!p.rationale.afterThisPackStudentCan?.length) push(p.id, 'error', 'rationale.afterThisPackStudentCan', 'empty');
  if (!p.rationale.ifSkippedRisk) push(p.id, 'error', 'rationale.ifSkippedRisk', 'missing');

  if (p.status === 'stub') {
    // Stubs pass a minimal check only.
    return;
  }

  // Objectives
  if (p.objectives.length < 3) push(p.id, 'warn', 'objectives', `only ${p.objectives.length}, expected 4-5`);
  p.objectives.forEach((o, i) => {
    if (!o.trains?.length) push(p.id, 'error', `objectives[${i}].trains`, 'must tag at least one rubric axis');
  });

  // Vocabulary
  if (p.vocabulary.length < 20) push(p.id, 'error', 'vocabulary', `only ${p.vocabulary.length}, need 20-30`);
  if (p.vocabulary.length > 32) push(p.id, 'warn', 'vocabulary', `${p.vocabulary.length} items, > 30`);
  const hindiSet = new Set<string>();
  p.vocabulary.forEach((v, i) => {
    if (!v.emoji) push(p.id, 'error', `vocabulary[${i}].emoji`, 'missing emoji');
    if (!v.exampleHindi) push(p.id, 'error', `vocabulary[${i}].exampleHindi`, 'missing example');
    if (hindiSet.has(v.hindi)) push(p.id, 'warn', `vocabulary[${i}]`, `duplicate word: ${v.hindi}`);
    hindiSet.add(v.hindi);
  });

  // Grammar
  if (p.grammar.length < 2) push(p.id, 'error', 'grammar', `only ${p.grammar.length}, need ≥2`);
  p.grammar.forEach((g, i) => {
    if (g.examples.length < 2) push(p.id, 'error', `grammar[${i}].examples`, 'need ≥2 examples');
    if (!g.whyItMatters) push(p.id, 'error', `grammar[${i}].whyItMatters`, 'missing rubric reason');
  });

  // Connectors
  if (p.connectors.length < 6) push(p.id, 'error', 'connectors', `only ${p.connectors.length}, need ≥6`);

  // Anchor passage
  const aw = countWords(p.anchor.hindi);
  if (aw < 80) push(p.id, 'error', 'anchor', `${aw} Hindi words, need ~100-150`);
  if (aw > 180) push(p.id, 'warn', 'anchor', `${aw} Hindi words, over range`);
  if (p.anchor.comprehensionQuestions.length < 4) {
    push(p.id, 'warn', 'anchor.comprehensionQuestions', `only ${p.anchor.comprehensionQuestions.length}, aim for 5-8`);
  }
  if (p.anchor.highlights.length < 3) {
    push(p.id, 'warn', 'anchor.highlights', `only ${p.anchor.highlights.length}, aim for 4-6`);
  }

  // Model texts
  if (p.modelTexts.length < 3) push(p.id, 'error', 'modelTexts', `only ${p.modelTexts.length}, need ≥3`);
  const kinds = new Set(p.modelTexts.map((m) => m.kind));
  if (kinds.size < 2) push(p.id, 'warn', 'modelTexts.kind', 'variety low — repeat kinds');

  // Cultural
  if (p.cultural.length < 3) push(p.id, 'error', 'cultural', `only ${p.cultural.length}, need ≥3`);

  // Muhavare
  if (p.muhavare.length !== 2) push(p.id, 'error', 'muhavare', `have ${p.muhavare.length}, need exactly 2`);

  // Model essays
  if (p.modelEssays.length !== 2) push(p.id, 'error', 'modelEssays', `have ${p.modelEssays.length}, need exactly 2`);
  p.modelEssays.forEach((e, i) => {
    const wc = countWords(e.intermediateMid);
    if (wc < 90) push(p.id, 'error', `modelEssays[${i}]`, `only ${wc} Hindi words, need ≥100`);
    const paragraphs = e.intermediateMid.split(/\n+/).filter(Boolean);
    if (paragraphs.length < 3) push(p.id, 'error', `modelEssays[${i}].paragraphs`, `${paragraphs.length}, need 3`);
    if (e.tenseUsed.length < 2) push(p.id, 'error', `modelEssays[${i}].tenseUsed`, `${e.tenseUsed.length}, need ≥2`);
    if (e.connectorsUsed.length < 3) push(p.id, 'warn', `modelEssays[${i}].connectorsUsed`, `${e.connectorsUsed.length}, aim for ≥3`);
    if (!e.verdict) push(p.id, 'error', `modelEssays[${i}].verdict`, 'missing');
    else if ((e.verdict.whyItPasses?.length || 0) < 3) {
      push(p.id, 'warn', `modelEssays[${i}].verdict.whyItPasses`, 'aim for 4-5 reasons');
    }
  });

  // Prompts
  if (p.prompts.length !== 3) push(p.id, 'error', 'prompts', `have ${p.prompts.length}, need exactly 3`);

  // Teacher notes — transparency checks
  const noteFields: Array<keyof TopicPack> = [
    'vocabularyNote',
    'grammarNote',
    'connectorsNote',
    'anchorNote',
    'modelTextsNote',
    'culturalNote',
    'muhavareNote',
    'modelEssaysNote',
    'promptsNote',
    'rubricNote',
  ];
  for (const k of noteFields) {
    const n = p[k] as any;
    if (!n?.why || n.why.length < 15) push(p.id, 'error', String(k), 'teacher-note.why missing or too short');
    if (!n?.trains?.length) push(p.id, 'error', String(k), 'teacher-note.trains empty');
  }
}

TOPIC_PACKS.forEach(validatePack);

const errors = issues.filter((i) => i.severity === 'error');
const warns = issues.filter((i) => i.severity === 'warn');
const shippedCount = TOPIC_PACKS.filter((p) => p.status === 'shipped').length;
const stubCount = TOPIC_PACKS.filter((p) => p.status === 'stub').length;

console.log(`\nPack library validation — ${TOPIC_PACKS.length} total (${shippedCount} shipped, ${stubCount} stubs)`);
console.log(`Errors: ${errors.length} · Warnings: ${warns.length}\n`);

const byPack = new Map<string, Issue[]>();
issues.forEach((i) => {
  const arr = byPack.get(i.pack) || [];
  arr.push(i);
  byPack.set(i.pack, arr);
});

for (const [pack, list] of byPack) {
  console.log(`▸ ${pack}`);
  list.forEach((i) => {
    const tag = i.severity === 'error' ? '✗' : '!';
    console.log(`  ${tag} [${i.field}] ${i.message}`);
  });
}

if (errors.length > 0) process.exit(1);
