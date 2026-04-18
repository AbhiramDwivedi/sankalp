// Structural validator for the content library — topic packs, capstones,
// study plans, and (when present) flashcard decks.
// Run: `npx tsx scripts/validate-packs.ts`.
// Exits non-zero on any structural violation.

import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { TOPIC_PACKS, TOPIC_PACKS_BY_ID } from '../content';
import { CAPSTONES } from '../content/capstones';
import { STUDY_PLANS } from '../content/studyPlans';
import type { Capstone, StudyPlan, TopicPack } from '../content/schema';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

  // Reading sample (schema field: `anchor`)
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

function validateCapstone(c: Capstone) {
  const prefix = `capstone:${c.id}`;
  if (!c.promptHindi || !c.promptEnglish) push(prefix, 'error', 'prompt', 'missing');
  if (!c.whyThisCapstone || c.whyThisCapstone.length < 50) {
    push(prefix, 'error', 'whyThisCapstone', 'missing or too short');
  }
  if (c.draws.length < 3) push(prefix, 'error', 'draws', `only ${c.draws.length}, need ≥3`);
  c.draws.forEach((d, i) => {
    if (!TOPIC_PACKS_BY_ID[d.packId]) {
      push(prefix, 'error', `draws[${i}]`, `unknown packId ${d.packId}`);
    }
    if (!d.note || d.note.length < 10) {
      push(prefix, 'warn', `draws[${i}].note`, 'short or missing');
    }
  });

  if (c.status === 'stub') return;

  if (c.versions.length !== 3) {
    push(prefix, 'error', 'versions', `have ${c.versions.length}, need exactly 3`);
  }
  const labels = c.versions.map((v) => v.label);
  if (!labels.includes('novice') || !labels.includes('intermediateMid') || !labels.includes('push')) {
    push(prefix, 'error', 'versions.label', 'need novice + intermediateMid + push');
  }

  c.versions.forEach((v, i) => {
    // Token count (particles included) runs ~20% below English-sense word count.
    // Ranges tuned to validator's countWords heuristic, not the author's wordCount.
    const wc = countWords(v.hindi);
    if (v.label === 'novice' && (wc < 55 || wc > 160)) {
      push(prefix, 'warn', `versions[${i}] novice`, `${wc} Hindi tokens, target 60-150`);
    }
    if (v.label === 'intermediateMid') {
      const min = c.tier === 'core' ? 170 : 180;
      const max = c.tier === 'core' ? 270 : 290;
      if (wc < min || wc > max) {
        push(prefix, 'warn', `versions[${i}] IM`, `${wc} Hindi tokens, target ${min}-${max}`);
      }
    }
    if (v.label === 'push' && wc < 220) {
      push(prefix, 'warn', `versions[${i}] push`, `${wc} Hindi tokens, target 230-320`);
    }
    if (v.tensesUsed.length < 1) push(prefix, 'error', `versions[${i}].tensesUsed`, 'empty');
    if (v.label === 'intermediateMid' && v.tensesUsed.length < 2) {
      push(prefix, 'error', `versions[${i}]`, 'IM version must use ≥2 tenses');
    }
    if (v.label === 'intermediateMid' && v.connectorsUsed.length < 3) {
      push(prefix, 'error', `versions[${i}]`, 'IM version must use ≥3 connectors');
    }
  });

  // Annotations
  const paras = [0, 1, 2];
  paras.forEach((pi) => {
    const hits = c.annotations.filter((a) => a.paragraphIndex === pi);
    if (hits.length < 3) {
      push(prefix, 'warn', `annotations p${pi}`, `only ${hits.length}, aim for ≥3`);
    }
  });

  // Verdict
  if (!c.verdict) push(prefix, 'error', 'verdict', 'missing');
  else {
    if (c.tier === 'core' && c.verdict.predictedBenchmark < 5) {
      push(prefix, 'error', 'verdict.predictedBenchmark', `core capstone must target ≥5 (got ${c.verdict.predictedBenchmark})`);
    }
    if ((c.verdict.whyItPasses?.length || 0) < 3) {
      push(prefix, 'warn', 'verdict.whyItPasses', 'aim for 4-5 reasons');
    }
  }

  if (c.readerQuestions.length < 5) {
    push(prefix, 'warn', 'readerQuestions', `only ${c.readerQuestions.length}, aim for 5`);
  }
  if (!c.teacherNote?.why || c.teacherNote.why.length < 30) {
    push(prefix, 'error', 'teacherNote.why', 'missing or too short');
  }
  if (!c.teacherNote?.trains?.length) {
    push(prefix, 'error', 'teacherNote.trains', 'empty');
  }
}

function validateStudyPlan(sp: StudyPlan) {
  const prefix = `plan:${sp.id}`;
  if (sp.weeks.length !== sp.durationWeeks) {
    push(prefix, 'warn', 'weeks', `${sp.weeks.length} weeks vs durationWeeks=${sp.durationWeeks}`);
  }
  sp.weeks.forEach((w) => {
    w.packs.forEach((pid) => {
      if (!TOPIC_PACKS_BY_ID[pid]) {
        push(prefix, 'error', `week ${w.weekIndex}.packs`, `unknown packId ${pid}`);
      }
    });
    (w.capstones || []).forEach((cid) => {
      if (!CAPSTONES.find((c) => c.id === cid)) {
        push(prefix, 'warn', `week ${w.weekIndex}.capstones`, `unknown capstone ${cid} (OK during Phase B)`);
      }
    });
  });
}

TOPIC_PACKS.forEach(validatePack);
CAPSTONES.forEach(validateCapstone);
STUDY_PLANS.forEach(validateStudyPlan);

const errors = issues.filter((i) => i.severity === 'error');
const warns = issues.filter((i) => i.severity === 'warn');
const shippedCount = TOPIC_PACKS.filter((p) => p.status === 'shipped').length;
const stubCount = TOPIC_PACKS.filter((p) => p.status === 'stub').length;
const shippedCaps = CAPSTONES.filter((c) => c.status === 'shipped').length;

console.log(`\nContent validation — ${TOPIC_PACKS.length} packs (${shippedCount} shipped, ${stubCount} stubs) · ${CAPSTONES.length} capstones (${shippedCaps} shipped) · ${STUDY_PLANS.length} study plans`);
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

// --- Write machine-readable state JSON (no timestamps; freshness is implied
// by git commit history of this file — see design note in backlog 4.6). The
// shape is stable and committed; `scripts/check.ts` sync-checks it. Only
// real packs (not capstone:/plan: prefixed issues) are listed in the per-pack
// grid so the UI stays focused on the 26 topic cards. -------------------------

type ValidationStatus = 'ok' | 'warning' | 'error';

interface ValidationStatePack {
  id: string;
  status: ValidationStatus;
  message?: string;
}

const packStates: ValidationStatePack[] = TOPIC_PACKS.map((p): ValidationStatePack => {
  const mine = issues.filter((i) => i.pack === p.id);
  if (mine.length === 0) return { id: p.id, status: 'ok' };
  const worst: ValidationStatus = mine.some((i) => i.severity === 'error') ? 'error' : 'warning';
  // Shortest-possible human message: field + message of the worst issue.
  const pick = mine.find((i) => i.severity === (worst === 'error' ? 'error' : 'warn'))!;
  return {
    id: p.id,
    status: worst,
    message: `${pick.field}: ${pick.message}`,
  };
}).sort((a, b) => a.id.localeCompare(b.id));

const validationState = {
  errors: errors.length,
  warnings: warns.length,
  packs: packStates,
};

const validationStatePath = join(__dirname, '..', 'docs', 'VALIDATION_STATE.json');
mkdirSync(dirname(validationStatePath), { recursive: true });
writeFileSync(validationStatePath, JSON.stringify(validationState, null, 2) + '\n', 'utf8');
console.log(`Wrote ${validationStatePath}`);

if (errors.length > 0) process.exit(1);
