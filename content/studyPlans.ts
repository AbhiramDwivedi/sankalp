// Study plans — map a declared ProficiencyLevel to a week-by-week schedule
// of topic packs and capstones. Consumed by Onboarding (to pick a default),
// Dashboard (to surface "this week"), LibraryView ("My Plan" filter), and
// StudyPlanView (printable schedule).

import type { StudyPlan, StudyPlanLevelKey } from './schema';

// Week-building helper: given a list of pack ids, bucket them into weeks of
// `size` packs each so we don't spread them across the file.
function weekly(
  packIds: string[],
  size: number,
  focusProvider: (chunk: string[], i: number) => string,
  writingProvider: (chunk: string[], i: number) => string,
  checkpointProvider: (chunk: string[], i: number) => string,
  capstonesByWeek: Record<number, string[]> = {},
  startWeek = 1,
): StudyPlan['weeks'] {
  const weeks: StudyPlan['weeks'] = [];
  for (let i = 0; i < packIds.length; i += size) {
    const chunk = packIds.slice(i, i + size);
    const weekIndex = startWeek + Math.floor(i / size);
    weeks.push({
      weekIndex,
      focus: focusProvider(chunk, weeks.length),
      packs: chunk,
      capstones: capstonesByWeek[weekIndex],
      writingOutput: writingProvider(chunk, weeks.length),
      checkpoint: checkpointProvider(chunk, weeks.length),
    });
  }
  return weeks;
}

const ALL_L1 = [
  'L1-01-greetings', 'L1-02-descriptions-feelings', 'L1-03-family', 'L1-04-clothing-colors',
  'L1-05-numbers-time', 'L1-06-calendar', 'L1-07-classes-supplies', 'L1-08-interests-leisure',
  'L1-09-weather-seasons', 'L1-10-places-transport', 'L1-11-shopping', 'L1-12-restaurants-food',
];
const ALL_L2 = [
  'L2-01-daily-routine', 'L2-02-rooms-chores', 'L2-03-food',
  'L2-04-school-routines', 'L2-05-school-activities', 'L2-06-health-fitness',
  'L2-07-indoor-outdoor', 'L2-08-shopping-advanced', 'L2-09-special-events',
  'L2-10-travel-plans', 'L2-11-countries-directions',
];
const ALL_L3 = ['L3-01-my-memories', 'L3-02-teen-life', 'L3-03-my-future'];

// Capstone cadence: 2 core (C01, C02) after L1 wraps, 3 more (C03, C04, C05)
// across L2, all 5 push (C06-C10) in the final two weeks.

const PLAN_FOUNDATION: StudyPlan = {
  id: 'plan-foundation',
  forLevels: ['Novice Low'],
  titleEnglish: 'Foundation Plan · 10 weeks',
  titleHindi: 'नींव योजना',
  durationWeeks: 10,
  headline: 'Build from zero. By week 10 you will write your first Benchmark-5 essay.',
  weeks: [
    { weekIndex: 1, focus: 'Identity basics', packs: ALL_L1.slice(0, 2),
      writingOutput: '3–5 sentences introducing yourself and a family member.',
      checkpoint: 'You can greet, introduce, and describe — in present tense only.' },
    { weekIndex: 2, focus: 'Family and clothing', packs: ALL_L1.slice(2, 4),
      writingOutput: 'One short paragraph about your family; one about what you wore today.',
      checkpoint: 'You cover a full topic in 4–6 sentences with 2 connectors.' },
    { weekIndex: 3, focus: 'School life I', packs: ALL_L1.slice(4, 7),
      writingOutput: 'Your daily school schedule in present tense.',
      checkpoint: 'You are at Novice-High (Benchmark 3) — 1 FCPS credit equivalent.' },
    { weekIndex: 4, focus: 'Social and weather', packs: ALL_L1.slice(7, 9),
      writingOutput: 'Two short paragraphs: hobbies, and favorite season.',
      checkpoint: 'You can compare two things using लेकिन.' },
    { weekIndex: 5, focus: 'Community and food', packs: ALL_L1.slice(9, 12),
      capstones: ['C01-restaurant-memory'],
      writingOutput: 'Capstone C01 — restaurant memory. Use the Novice version first, then re-write at IM length.',
      checkpoint: 'First full 3-paragraph essay. Self-grade strictly against the rubric.' },
    { weekIndex: 6, focus: 'Home life', packs: ALL_L2.slice(0, 3),
      capstones: ['C02-typical-saturday'],
      writingOutput: 'Capstone C02 — typical Saturday. Shoot for 220 words.',
      checkpoint: 'Intermediate-Low (Benchmark 4) is realistic here — 2 credits equivalent.' },
    { weekIndex: 7, focus: 'Student life', packs: ALL_L2.slice(3, 6),
      capstones: ['C03-festival-weekend'],
      writingOutput: 'Capstone C03 — festival weekend. Include one muhavara.',
      checkpoint: 'You mix two tenses and reach 240+ words.' },
    { weekIndex: 8, focus: 'Leisure + events', packs: ALL_L2.slice(6, 9),
      capstones: ['C04-neighborhood-place', 'C05-school-day'],
      writingOutput: 'Capstones C04 + C05. Time C05 to 30 minutes (Mock Exam practice).',
      checkpoint: 'You should now be writing Benchmark 5 drafts — 3 credits in reach.' },
    { weekIndex: 9, focus: 'Travel + L3 memories', packs: [...ALL_L2.slice(9, 11), ...ALL_L3.slice(0, 1)],
      capstones: ['C06-india-trip', 'C07-sick-week', 'C08-grandmother-story'],
      writingOutput: 'Three push-tier capstones; one per study session.',
      checkpoint: 'You reliably produce 3 connected paragraphs across 2+ time frames.' },
    { weekIndex: 10, focus: 'L3 stretch + exam rehearsal', packs: ALL_L3.slice(1, 3),
      capstones: ['C09-ten-years-from-now', 'C10-teen-life-essay'],
      writingOutput: 'Capstones C09 and C10 as timed Mock Exams. No notes.',
      checkpoint: 'Final self-score: both essays at Benchmark 5. Ready for the 3-credit bar.' },
  ],
  pacingNote:
    'This plan assumes ~30 minutes per day. Weekends are catch-up days. If you fall behind by a week, skip the non-capstone packs in weeks 9–10 and keep the capstones.',
};

const PLAN_ACCELERATION: StudyPlan = {
  id: 'plan-acceleration',
  forLevels: ['Novice Mid'],
  titleEnglish: 'Acceleration Plan · 8 weeks',
  titleHindi: 'गति योजना',
  durationWeeks: 8,
  headline: 'Skim the first four L1 packs as review; dive in at numbers/time. Mock Exams in weeks 7–8.',
  weeks: [
    { weekIndex: 1, focus: 'Identity review', packs: ALL_L1.slice(0, 4),
      writingOutput: 'Fast review — write one paragraph using vocab from all four packs.',
      checkpoint: 'You confirm gender agreement and can answer "tum kaun ho" in 4 sentences.' },
    { weekIndex: 2, focus: 'School + social', packs: ALL_L1.slice(4, 9),
      writingOutput: 'Two short paragraphs: schedule + hobbies.',
      checkpoint: 'Novice-High landed. You use 3+ connectors.' },
    { weekIndex: 3, focus: 'Community closing', packs: ALL_L1.slice(9, 12),
      capstones: ['C01-restaurant-memory'],
      writingOutput: 'Capstone C01 at IM length.',
      checkpoint: 'First 220-word essay in 3 paragraphs.' },
    { weekIndex: 4, focus: 'Home life', packs: ALL_L2.slice(0, 3),
      capstones: ['C02-typical-saturday'],
      writingOutput: 'Capstone C02.',
      checkpoint: 'You shift between present-habitual and simple past cleanly.' },
    { weekIndex: 5, focus: 'Student life', packs: ALL_L2.slice(3, 6),
      capstones: ['C03-festival-weekend', 'C04-neighborhood-place'],
      writingOutput: 'Two capstones this week — pace them on separate days.',
      checkpoint: 'Benchmark 5 drafts appearing.' },
    { weekIndex: 6, focus: 'Leisure + travel', packs: ALL_L2.slice(6, 11),
      capstones: ['C05-school-day'],
      writingOutput: 'Timed Mock Exam 1 — 30 minutes on C05, no notes.',
      checkpoint: 'First timed sitting. Self-grade, note any dropped connectors.' },
    { weekIndex: 7, focus: 'L3 stretch', packs: ALL_L3,
      capstones: ['C06-india-trip', 'C07-sick-week', 'C08-grandmother-story'],
      writingOutput: 'Three push capstones. Work on ceilings, not the floor.',
      checkpoint: 'At least 2 capstones hit 280+ words with 3 tense frames.' },
    { weekIndex: 8, focus: 'Exam rehearsal', packs: [],
      capstones: ['C09-ten-years-from-now', 'C10-teen-life-essay'],
      writingOutput: 'Both as timed Mock Exams. Compare self-score to printed rubric.',
      checkpoint: 'Final gate: both Mock Exams at Benchmark 5. Ship it.' },
  ],
  pacingNote:
    'Faster pace. If a week slips, drop that week\'s first pack (review) before its last (content). Always keep the capstone.',
};

const PLAN_INTERMEDIATE_BRIDGE: StudyPlan = {
  id: 'plan-intermediate-bridge',
  forLevels: ['Novice High'],
  titleEnglish: 'Intermediate Bridge · 6 weeks',
  titleHindi: 'अंतराल योजना',
  durationWeeks: 6,
  headline: 'You already write simple sentences. In 6 weeks you will write connected paragraphs.',
  weeks: [
    { weekIndex: 1, focus: 'L1 skim + community', packs: ['L1-08-interests-leisure', 'L1-09-weather-seasons', 'L1-10-places-transport', 'L1-11-shopping', 'L1-12-restaurants-food'],
      capstones: ['C01-restaurant-memory'],
      writingOutput: 'Capstone C01 after skimming L1-12.',
      checkpoint: 'First IM essay at 220+ words.' },
    { weekIndex: 2, focus: 'Home life', packs: ALL_L2.slice(0, 3),
      capstones: ['C02-typical-saturday'],
      writingOutput: 'C02 with a focus on time-of-day connectors.',
      checkpoint: 'You use पहले / फिर / अंत में across 3 paragraphs.' },
    { weekIndex: 3, focus: 'Student life', packs: ALL_L2.slice(3, 6),
      capstones: ['C03-festival-weekend', 'C04-neighborhood-place', 'C05-school-day'],
      writingOutput: 'Three core capstones. C05 timed.',
      checkpoint: 'Core tier complete. Benchmark 5 threshold crossed.' },
    { weekIndex: 4, focus: 'Leisure + travel', packs: ALL_L2.slice(6, 11),
      capstones: ['C06-india-trip'],
      writingOutput: 'First push-tier capstone.',
      checkpoint: 'Three tense frames sustained across the essay.' },
    { weekIndex: 5, focus: 'L3 stretch', packs: ALL_L3,
      capstones: ['C07-sick-week', 'C08-grandmother-story', 'C09-ten-years-from-now'],
      writingOutput: 'Three push capstones. No timing yet.',
      checkpoint: 'Push-tier essays regularly reach 280+ words.' },
    { weekIndex: 6, focus: 'Exam rehearsal', packs: [],
      capstones: ['C10-teen-life-essay'],
      writingOutput: 'C10 as a timed Mock Exam, and a retry of C01 timed.',
      checkpoint: 'Two timed essays at Benchmark 5. Ready.' },
  ],
  pacingNote:
    'You\'ll feel tempted to skip the L1 skim. Don\'t — that\'s where vocabulary consolidates.',
};

const PLAN_PUSH: StudyPlan = {
  id: 'plan-push',
  forLevels: ['Intermediate Low'],
  titleEnglish: 'Push Plan · 4 weeks',
  titleHindi: 'दबाव योजना',
  durationWeeks: 4,
  headline: 'You already string sentences. This plan is about connecting them and holding tense.',
  weeks: [
    { weekIndex: 1, focus: 'Student life', packs: ALL_L2.slice(3, 6),
      capstones: ['C01-restaurant-memory', 'C02-typical-saturday'],
      writingOutput: 'Two core capstones; untimed.',
      checkpoint: 'Connected paragraphs, two tense frames.' },
    { weekIndex: 2, focus: 'Leisure + events', packs: ALL_L2.slice(6, 9),
      capstones: ['C03-festival-weekend', 'C04-neighborhood-place', 'C05-school-day'],
      writingOutput: 'Core tier done. C05 timed.',
      checkpoint: 'Benchmark 5 holding across untimed writing.' },
    { weekIndex: 3, focus: 'Travel + L3', packs: [...ALL_L2.slice(9, 11), ...ALL_L3],
      capstones: ['C06-india-trip', 'C07-sick-week', 'C08-grandmother-story'],
      writingOutput: 'Three push capstones. C06 timed as Mock Exam 2.',
      checkpoint: 'First timed push essay at Benchmark 5.' },
    { weekIndex: 4, focus: 'Exam rehearsal', packs: [],
      capstones: ['C09-ten-years-from-now', 'C10-teen-life-essay'],
      writingOutput: 'Both as timed Mock Exams.',
      checkpoint: 'Ship gate: two timed essays at Benchmark 5, back to back.' },
  ],
  pacingNote:
    'Skip L1 and early L2 entirely unless vocabulary fails you. Focus on connector density and tense control.',
};

const PLAN_POLISH: StudyPlan = {
  id: 'plan-polish',
  forLevels: ['Intermediate Mid', 'Intermediate High'],
  titleEnglish: 'Polish Plan · 2 weeks',
  titleHindi: 'परिष्कार योजना',
  durationWeeks: 2,
  headline: 'Capstones only. Cement what you already have.',
  weeks: [
    { weekIndex: 1, focus: 'Core tier', packs: [],
      capstones: ['C01-restaurant-memory', 'C02-typical-saturday', 'C03-festival-weekend', 'C04-neighborhood-place', 'C05-school-day'],
      writingOutput: 'All 5 core capstones. C01 and C05 timed.',
      checkpoint: 'No regressions; every essay at Benchmark 5.' },
    { weekIndex: 2, focus: 'Push tier + rehearsal', packs: [],
      capstones: ['C06-india-trip', 'C07-sick-week', 'C08-grandmother-story', 'C09-ten-years-from-now', 'C10-teen-life-essay'],
      writingOutput: 'All 5 push capstones; C06 and C10 timed as Mock Exams.',
      checkpoint: 'Push essays reach Benchmark 6 language when the prompt permits. Ready to sit the exam.' },
  ],
  pacingNote:
    'Flashcard review the week of the exam: Top-150 must-know deck + connector drill + muhavara drill.',
};

export const STUDY_PLANS: StudyPlan[] = [
  PLAN_FOUNDATION,
  PLAN_ACCELERATION,
  PLAN_INTERMEDIATE_BRIDGE,
  PLAN_PUSH,
  PLAN_POLISH,
];

export const STUDY_PLANS_BY_ID: Record<string, StudyPlan> = Object.fromEntries(
  STUDY_PLANS.map((p) => [p.id, p]),
);

export function studyPlanForLevel(level: string): StudyPlan {
  const hit = STUDY_PLANS.find((p) => p.forLevels.includes(level as StudyPlanLevelKey));
  return hit || PLAN_FOUNDATION;
}

export function getStudyPlan(id: string | undefined): StudyPlan | undefined {
  if (!id) return undefined;
  return STUDY_PLANS_BY_ID[id];
}

/**
 * Given a study plan and the student's completedTopicIds, return:
 *   - currentWeek: the first week with an unfinished pack or any capstone pending
 *   - nextPack: the first unfinished pack on that week, or null
 *   - nextCapstones: any capstones scheduled for the current week
 */
export function planCursor(
  plan: StudyPlan,
  completedTopicIds: string[],
  completedCapstoneIds: string[] = [],
): {
  currentWeekIndex: number;
  nextPackId: string | null;
  upcomingCapstoneIds: string[];
  isAllDone: boolean;
} {
  const completedSet = new Set(completedTopicIds);
  const completedCapSet = new Set(completedCapstoneIds);
  for (const w of plan.weeks) {
    const nextPack = w.packs.find((pid) => !completedSet.has(pid));
    const upcoming = (w.capstones || []).filter((cid) => !completedCapSet.has(cid));
    if (nextPack || upcoming.length) {
      return {
        currentWeekIndex: w.weekIndex,
        nextPackId: nextPack ?? null,
        upcomingCapstoneIds: upcoming,
        isAllDone: false,
      };
    }
  }
  const last = plan.weeks[plan.weeks.length - 1];
  return {
    currentWeekIndex: last.weekIndex,
    nextPackId: null,
    upcomingCapstoneIds: [],
    isAllDone: true,
  };
}
