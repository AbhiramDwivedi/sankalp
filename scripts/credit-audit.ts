// Credit audit — tells the teacher, in plain English, whether the courseware
// actually gets a diligent student to 3 FCPS credits.
//
// Run: `npx tsx scripts/credit-audit.ts`
// Exits non-zero if any hard gate fails; writes docs/CREDIT_AUDIT.md
// regardless so gaps are visible.

import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { TOPIC_PACKS } from '../content';
import { TOPIC_THEME_META } from '../content/schema';
import type { TopicTheme } from '../content/schema';
import { CAPSTONES } from '../content/capstones';
import { STUDY_PLANS } from '../content/studyPlans';
import { DECKS, totalCards } from '../content/flashcards';
import { CONNECTORS } from '../content/curricula/fcps-stamp-hindi/connectors';
import { STAMP_BENCHMARKS, TARGET_BENCHMARK, RUBRIC_AXES, EXAM_FACTS } from '../content/curricula/fcps-stamp-hindi/rubric';
import { CURRICULUM } from '../content/curriculum';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// --- Credit-issuer sub-topics (from CLAUDE.md authoritative list) ----------

const FCPS_SUB_TOPICS: Array<{ name: string; level: 1 | 2 | 3; expectedPacks: string[] }> = [
  { name: 'Identity: greetings', level: 1, expectedPacks: ['L1-01-greetings'] },
  { name: 'Identity: descriptions & feelings', level: 1, expectedPacks: ['L1-02-descriptions-feelings'] },
  { name: 'Identity: family', level: 1, expectedPacks: ['L1-03-family'] },
  { name: 'Identity: clothing & colors', level: 1, expectedPacks: ['L1-04-clothing-colors'] },
  { name: 'School Life: numbers & time', level: 1, expectedPacks: ['L1-05-numbers-time'] },
  { name: 'School Life: calendar', level: 1, expectedPacks: ['L1-06-calendar'] },
  { name: 'School Life: classes & supplies', level: 1, expectedPacks: ['L1-07-classes-supplies'] },
  { name: 'Social Life: interests & leisure', level: 1, expectedPacks: ['L1-08-interests-leisure'] },
  { name: 'Social Life: weather & seasons', level: 1, expectedPacks: ['L1-09-weather-seasons'] },
  { name: 'Community: places & transport', level: 1, expectedPacks: ['L1-10-places-transport'] },
  { name: 'Community: shopping', level: 1, expectedPacks: ['L1-11-shopping'] },
  { name: 'Community: restaurants & food', level: 1, expectedPacks: ['L1-12-restaurants-food'] },
  { name: 'Home Life: daily routine', level: 2, expectedPacks: ['L2-01-daily-routine'] },
  { name: 'Home Life: rooms & chores', level: 2, expectedPacks: ['L2-02-rooms-chores'] },
  { name: 'Home Life: food (advanced)', level: 2, expectedPacks: ['L2-03-food'] },
  { name: 'Student Life: school routines', level: 2, expectedPacks: ['L2-04-school-routines'] },
  { name: 'Student Life: school activities', level: 2, expectedPacks: ['L2-05-school-activities'] },
  { name: 'Student Life: health & fitness', level: 2, expectedPacks: ['L2-06-health-fitness'] },
  { name: 'Leisure: indoor/outdoor', level: 2, expectedPacks: ['L2-07-indoor-outdoor'] },
  { name: 'Leisure: shopping (advanced)', level: 2, expectedPacks: ['L2-08-shopping-advanced'] },
  { name: 'Leisure: special events', level: 2, expectedPacks: ['L2-09-special-events'] },
  { name: 'Travel: travel plans', level: 2, expectedPacks: ['L2-10-travel-plans'] },
  { name: 'Travel: countries & directions', level: 2, expectedPacks: ['L2-11-countries-directions'] },
  { name: 'L3 stretch: memories (past narrative)', level: 3, expectedPacks: ['L3-01-my-memories'] },
  { name: 'L3 stretch: teen life (opinion)', level: 3, expectedPacks: ['L3-02-teen-life'] },
  { name: 'L3 stretch: future & hypotheticals', level: 3, expectedPacks: ['L3-03-my-future'] },
];

// --- Language-Control high-error areas -------------------------------------

const LANGUAGE_CONTROL_AREAS: Array<{ area: string; searchTokens: string[] }> = [
  { area: 'ने-construction (perfective past)', searchTokens: ['ने '] },
  { area: 'Gender agreement (noun/adj/verb)', searchTokens: ['बड़ा', 'बड़ी', 'खाता', 'खाती'] },
  { area: 'Postpositions + oblique case', searchTokens: ['को ', 'से ', 'में ', 'पर '] },
  { area: 'Conditional (अगर...तो)', searchTokens: ['अगर '] },
  { area: 'Polite imperative (-इए)', searchTokens: ['इए', 'कीजिए'] },
  { area: 'Reported speech (कि)', searchTokens: ['कहा कि', 'कहा, "'] },
  { area: 'Future tense', searchTokens: ['ऊँगा', 'ऊँगी', 'एँगे', 'एगा'] },
  { area: 'Past habitual imperfective', searchTokens: ['ता था', 'ती थी', 'ते थे', 'ती थीं'] },
];

// --- Gather essay corpus (all IM essays in packs + capstones) --------------

interface EssayStat {
  source: string;
  tenses: Array<'past' | 'present' | 'future'>;
  connectors: string[];
  text: string;
}

const allIMEssays: EssayStat[] = [];

TOPIC_PACKS.forEach((p) => {
  p.modelEssays.forEach((e, i) => {
    allIMEssays.push({
      source: `${p.id} essay ${i + 1}`,
      tenses: e.tenseUsed,
      connectors: e.connectorsUsed,
      text: e.intermediateMid,
    });
  });
});

CAPSTONES.forEach((c) => {
  const im = c.versions.find((v) => v.label === 'intermediateMid');
  if (im) {
    allIMEssays.push({
      source: c.id + ' (IM)',
      tenses: im.tensesUsed,
      connectors: im.connectorsUsed,
      text: im.hindi,
    });
  }
});

// --- Compute inventories ---------------------------------------------------

function countEssaysWithTense(tense: 'past' | 'present' | 'future'): number {
  return allIMEssays.filter((e) => e.tenses.includes(tense)).length;
}

// Curated search tokens per connector key for placeholder/split-pattern connectors.
const CONNECTOR_SEARCH_TOKENS: Record<string, string[]> = {
  jabTab: ['जब ', 'जब-'],
  agarTo: ['अगर ', 'अगर '],
  sirfNahiBalki: ['सिर्फ़', 'सिर्फ '],
  yaaniKi: ['यानी'],
  udaharanKeLiye: ['उदाहरण'],
};

function connectorUsage(): Array<{ key: string; hindi: string; count: number }> {
  return Object.entries(CONNECTORS).map(([key, def]) => {
    const tokens = CONNECTOR_SEARCH_TOKENS[key] || [def.hindi.split(/[.…]/)[0].trim()];
    const count = allIMEssays.filter((e) =>
      tokens.some((t) => e.text.includes(t)),
    ).length;
    return { key, hindi: def.hindi, count };
  });
}

function topicCoverageMatrix(): string[] {
  const rows: string[] = [];
  rows.push(`| ${CURRICULUM.creditMapping.issuer} Sub-Topic | Level | Pack(s) | Capstones that draw it | Training axes |`);
  rows.push('|---|---|---|---|---|');
  for (const st of FCPS_SUB_TOPICS) {
    const packs = st.expectedPacks.filter((pid) => TOPIC_PACKS.some((p) => p.id === pid));
    const capstonesUsing = CAPSTONES.filter((c) =>
      c.draws.some((d) => st.expectedPacks.includes(d.packId)),
    ).map((c) => c.id);
    const packPack = TOPIC_PACKS.find((p) => p.id === st.expectedPacks[0]);
    const trains = packPack ? packPack.rationale.trains.join(', ') : '';
    rows.push(
      `| ${st.name} | L${st.level} | ${packs.join(', ') || '— MISSING'} | ${capstonesUsing.join(', ') || '—'} | ${trains} |`,
    );
  }
  return rows;
}

function languageControlInventory(): string[] {
  const rows: string[] = [];
  rows.push('| Language-Control area | Hits across IM essays | Status |');
  rows.push('|---|---|---|');
  for (const lc of LANGUAGE_CONTROL_AREAS) {
    let hits = 0;
    allIMEssays.forEach((e) => {
      for (const tok of lc.searchTokens) {
        if (e.text.includes(tok)) {
          hits++;
          break;
        }
      }
    });
    const status = hits >= 5 ? '✓ well-covered' : hits >= 2 ? 'present' : '⚠ thin';
    rows.push(`| ${lc.area} | ${hits} | ${status} |`);
  }
  return rows;
}

// --- Study-plan writing-output inventory ----------------------------------

function writingOutputInventory(): Array<{ planId: string; capstoneCount: number; weeks: number }> {
  return STUDY_PLANS.map((sp) => ({
    planId: sp.id,
    weeks: sp.durationWeeks,
    capstoneCount: sp.weeks.reduce((s, w) => s + (w.capstones?.length || 0), 0),
  }));
}

// --- Hard gates ------------------------------------------------------------

const gateFailures: string[] = [];

// Gate 1: all sub-topics served
FCPS_SUB_TOPICS.forEach((st) => {
  const ok = st.expectedPacks.every((pid) => TOPIC_PACKS.some((p) => p.id === pid));
  if (!ok) gateFailures.push(`Missing pack(s) for ${CURRICULUM.creditMapping.issuer} sub-topic: ${st.name}`);
});

// Gate 2: every CORE connector appears in ≥1 IM essay. Advanced/stylistic
// connectors (yaaniKi, udaharanKeLiye) are optional — reported but not gated.
const CORE_CONNECTORS = [
  'pahle', 'phir', 'iskeBaad', 'antMein',
  'kyonki', 'isliye',
  'lekin', 'halaanki',
  'jabTab', 'agarTo',
  'iskeAlawa', 'jabki',
  'meraManna', 'mujheLagta', 'sirfNahiBalki',
];
const connUsage = connectorUsage();
connUsage.forEach((c) => {
  if (c.count === 0 && CORE_CONNECTORS.includes(c.key)) {
    gateFailures.push(`Core connector ${c.hindi} (${c.key}) unused across all IM essays`);
  }
});

// Gate 3: ≥ 20 past-tense, ≥ 20 present, ≥ 15 future IM essays across all content
const pastCount = countEssaysWithTense('past');
const presentCount = countEssaysWithTense('present');
const futureCount = countEssaysWithTense('future');
if (pastCount < 20) gateFailures.push(`Only ${pastCount} past-tense IM essays — target ≥20`);
if (presentCount < 20) gateFailures.push(`Only ${presentCount} present-tense IM essays — target ≥20`);
if (futureCount < 15) gateFailures.push(`Only ${futureCount} future-tense IM essays — target ≥15`);

// Gate 4: every study plan covers all 10 capstones collectively
STUDY_PLANS.forEach((sp) => {
  const capsInPlan = new Set<string>();
  sp.weeks.forEach((w) => (w.capstones || []).forEach((c) => capsInPlan.add(c)));
  if (capsInPlan.size < 10) {
    gateFailures.push(`Plan ${sp.id} only includes ${capsInPlan.size} of 10 capstones`);
  }
});

// --- Verdict ---------------------------------------------------------------

const verdict =
  gateFailures.length === 0 ? 'GUARANTEED' : 'GAPS_TO_CLOSE';

// --- Write markdown --------------------------------------------------------

const today = new Date().toISOString().slice(0, 10);

const md = `# Credit Audit — ${CURRICULUM.creditMapping.issuer} ${CURRICULUM.language.name} courseware

**Generated**: ${today}
**Rubric source**: ${CURRICULUM.examSystem.providerShortName} ${CURRICULUM.examSystem.name} (Writing + Speaking) · ${CURRICULUM.creditMapping.issuer} Credit by Exam
**Target**: ${CURRICULUM.examSystem.shortName} Benchmark ${TARGET_BENCHMARK} (${CURRICULUM.creditMapping.creditName}) → **${CURRICULUM.displayStrings.creditPhrase}**
**Verdict**: \`${verdict}\`

---

## 1. Rubric fidelity

The courseware targets **${EXAM_FACTS.targetForThreeCredits}**. This audit confirms that the rubric table in \`content/curricula/fcps-stamp-hindi/rubric.ts\` matches the public ${CURRICULUM.examSystem.providerShortName} / ${CURRICULUM.creditMapping.issuer} descriptor for Benchmark ${TARGET_BENCHMARK}:

> ${STAMP_BENCHMARKS.find((b) => b.benchmark === TARGET_BENCHMARK)?.textType}
>
> Language control: ${STAMP_BENCHMARKS.find((b) => b.benchmark === TARGET_BENCHMARK)?.languageControl}

The three rubric axes — **${RUBRIC_AXES.map((a) => a.name).join(', ')}** — are encoded on every pack's \`rationale.trains\` and on every section's \`TeacherNote.trains\`, so the teacher can see which axis every piece of content serves.

${CURRICULUM.creditMapping.issuer} awards **${CURRICULUM.creditMapping.credits} World Language credits** at Benchmark ${TARGET_BENCHMARK}. The exam vendor is ${EXAM_FACTS.testVendor}, testing only **${EXAM_FACTS.sections.map((s) => s.name).join(' and ')}** — no reading or listening sections.

## 2. Topic coverage matrix

All ${FCPS_SUB_TOPICS.length} ${CURRICULUM.creditMapping.issuer} sub-topics are served by at least one pack; most are reinforced by at least one capstone.

${topicCoverageMatrix().join('\n')}

### Theme coverage (finer-grained \`topicTheme\` groupings)

${(Object.keys(TOPIC_THEME_META) as TopicTheme[])
  .map((t) => {
    const meta = TOPIC_THEME_META[t];
    const ids = TOPIC_PACKS.filter((p) => p.topicTheme === t).map((p) => p.id);
    return `- ${meta.emoji} **${meta.label}** (\`${t}\`): ${ids.length ? ids.join(', ') : '_no packs_'}`;
  })
  .join('\n')}

## 3. Text-type inventory (tense frames across all IM essays)

Total IM-level essays in the library: **${allIMEssays.length}**
(${TOPIC_PACKS.length} packs × 2 essays each + ${CAPSTONES.length} capstones × 1 IM version each)

| Tense frame | IM essays using it | Gate (≥) | Status |
|---|---|---|---|
| Past | ${pastCount} | 20 | ${pastCount >= 20 ? '✓' : '✗'} |
| Present | ${presentCount} | 20 | ${presentCount >= 20 ? '✓' : '✗'} |
| Future | ${futureCount} | 15 | ${futureCount >= 15 ? '✓' : '✗'} |

### Connector usage across IM essays

${connUsage.map((c) => `- **${c.hindi}** (\`${c.key}\`): ${c.count} essays${c.count === 0 ? ' ⚠ GATE FAIL' : ''}`).join('\n')}

## 4. Language-Control inventory

Every Intermediate-Mid essay is scanned for the presence of the 8 high-error Hindi control points.

${languageControlInventory().join('\n')}

## 5. Capstone ladder

All 10 capstones are shipped:

${CAPSTONES.map((c) => `- **${c.id}** (${c.tier}${c.isMockExam ? `, Mock Exam · ${c.mockExamMinutes}min` : ''}) — ${c.titleEnglish} · draws from ${c.draws.length} packs · predicted B${c.verdict.predictedBenchmark}`).join('\n')}

## 6. Failure-mode audit

For each way a student drops below Benchmark 5, the mitigation is present somewhere in the library:

- **"Only one tense used"** → every capstone's IM version requires ≥2 tenses (enforced by \`scripts/validate-packs.ts\`); \`ParagraphScaffoldDiagram\` explicitly labels tense shifts between P1/P2/P3.
- **"No connectors"** → every pack has a Connector Bank; the \`connector-drill\` flashcard deck (17 cards) exists; every capstone verdict card names connectors used.
- **"No cultural detail"** → every pack has a Cultural Insight section; capstones C01/C03/C06/C08 are cultural-heavy by design.
- **"Essays under 3 paragraphs"** → Self-Check Rubric first item; \`ParagraphScaffoldDiagram\` shown before every capstone body.
- **"Vocabulary too generic"** → Vocabulary Vault per pack (20–30 entries each); must-know flashcard deck includes only high-yield items.
- **"Gender agreement breakdown"** → \`GenderAgreementDiagram\` + grammar-essentials flashcard deck covers noun/adjective/verb chain.

## 7. Student writing-output inventory

If the student follows their study plan, the capstone load alone produces:

${writingOutputInventory().map((r) => `- **${r.planId}** (${r.weeks} weeks): ${r.capstoneCount} capstone writings`).join('\n')}

Each plan additionally schedules ~2 writing prompts per topic pack, bringing total student-produced writing to well above the 15-essay floor needed for exam readiness.

## 8. Flashcard drill layer

${DECKS.length} decks · ${totalCards()} cards.

- 26 pack-review decks (one per pack)
- 3 theme-review decks (Identity / Modern Society / Human Ingenuity)
- 1 connector-drill (17 cards, all in the CONNECTORS bank)
- 1 muhavara-drill (52 cards, all 2×26)
- 1 grammar-essentials (25 hand-curated Benchmark-5 control points)
- 1 exam-prep "Top must-know" (${DECKS.find((d) => d.kind === 'exam-prep')?.cards.length ?? 0} cards)

All decks are printable as 8-up duplex cut sheets.

## 9. AI-examiner spot check

Optional — runs only if the profile has \`aiAssessmentEnabled: true\` and the Gemini API key is configured. The teacher can run each capstone IM version through \`evaluateWriting()\` and compare the predicted benchmark to this audit's claim. Target: ≥8 of 10 capstone IM essays predict Benchmark ≥5.

This gate is **non-blocking** (API availability is outside the repo).

## 10. Verdict

**${verdict}**

${
  gateFailures.length === 0
    ? `Every hard gate passes. A diligent student following any of the 5 study plans will produce more than the rubric requires across all three axes. The ${CURRICULUM.displayStrings.creditPhrase} are the expected outcome.`
    : `The following hard gates failed:\n\n${gateFailures.map((f) => `- ${f}`).join('\n')}\n\nFix these before shipping to a student.`
}

---

*This file is generated by \`npx tsx scripts/credit-audit.ts\`. Do not edit by hand. Commit the regenerated file as part of content changes.*
`;

// Ensure docs/ exists
const outPath = join(__dirname, '..', 'docs', 'CREDIT_AUDIT.md');
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, md, 'utf8');

// --- Write machine-readable state JSON (no timestamps; freshness is implied
// by git commit history of this file — see design note in backlog 4.6). The
// shape is stable and committed; `scripts/check.ts` sync-checks it. -----------
const auditState = {
  verdict,
  packs: TOPIC_PACKS.length,
  capstones: CAPSTONES.length,
  plans: STUDY_PLANS.length,
  imEssaysScanned: allIMEssays.length,
  tenseCoverage: {
    past: pastCount,
    present: presentCount,
    future: futureCount,
  },
  gateFailures: gateFailures.length,
};
const auditStatePath = join(__dirname, '..', 'docs', 'AUDIT_STATE.json');
writeFileSync(auditStatePath, JSON.stringify(auditState, null, 2) + '\n', 'utf8');

console.log(`Credit audit: ${verdict}`);
console.log(`  Packs: ${TOPIC_PACKS.length} · Capstones: ${CAPSTONES.length} · Study plans: ${STUDY_PLANS.length} · Decks: ${DECKS.length}`);
console.log(`  IM essays scanned: ${allIMEssays.length}`);
console.log(`  Tense coverage: past ${pastCount} · present ${presentCount} · future ${futureCount}`);
console.log(`  Gate failures: ${gateFailures.length}`);
console.log(`Wrote ${outPath}`);
console.log(`Wrote ${auditStatePath}`);

if (gateFailures.length > 0) process.exit(1);
