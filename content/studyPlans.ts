// Study plans - map a declared ProficiencyLevel to a week-by-week schedule
// of topic packs and capstones. Consumed by Onboarding (to pick a default),
// Dashboard (to surface "this week"), LibraryView ("My Plan" filter), and
// StudyPlanView (printable schedule).
//
// Weekly budget assumption (authored 2026-04): ~2 hours/week total - 1 hr
// study (read the pack or capstone models), 1 hr practice (the pack's own
// writing prompt, or the capstone draft). This is deliberately conservative
// because the student is working outside school. One pack per week is the
// baseline pace; one capstone per week in capstone weeks. The final 4-5
// weeks of every plan are capstone-only so the student rehearses the exam
// format without new content intake.

import type { StudyPlan, StudyPlanLevelKey } from './schema';

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

type WeekInput = {
  focus: string;
  packs?: string[];
  capstones?: string[];
  writingOutput: string;
  checkpoint: string;
};

function buildWeeks(weeks: WeekInput[]): StudyPlan['weeks'] {
  return weeks.map((w, i) => ({
    weekIndex: i + 1,
    focus: w.focus,
    packs: w.packs ?? [],
    capstones: w.capstones,
    writingOutput: w.writingOutput,
    checkpoint: w.checkpoint,
  }));
}

// Reusable week builders for single-pack and single-capstone weeks, since
// that is the dominant rhythm across all plans.
const pack = (packId: string, focus: string, writingOutput: string, checkpoint: string): WeekInput => ({
  focus, packs: [packId], writingOutput, checkpoint,
});
const cap = (capId: string, focus: string, writingOutput: string, checkpoint: string): WeekInput => ({
  focus, packs: [], capstones: [capId], writingOutput, checkpoint,
});

// --- FOUNDATION ----------------------------------------------------------
// Novice Low. Starts at zero. 12 L1 + 11 L2 + 3 L3 packs, 5 core + 5 push
// capstones. At 1 pack or 1 capstone per week that is 36 weeks - roughly
// one school year of after-school study.

const FOUNDATION_WEEKS: WeekInput[] = [
  pack('L1-01-greetings', 'Greetings and introductions',
    'Write 4 sentences introducing yourself (name, age, where you live).',
    'You can greet, introduce, and say where you are from.'),
  pack('L1-02-descriptions-feelings', 'Describing people and feelings',
    'Describe yourself and one friend in 4-5 sentences.',
    'You use adjectives with correct gender agreement.'),
  pack('L1-03-family', 'Family members',
    'Short paragraph about your family - 5 sentences.',
    'You name 4+ family members and describe one.'),
  pack('L1-04-clothing-colors', 'Clothing and colors',
    'Describe what you wore today and your favorite outfit.',
    'You combine clothing + color with gender-agreeing adjectives.'),
  pack('L1-05-numbers-time', 'Numbers and time',
    'Write 5 sentences giving times (when school starts, lunch, bedtime).',
    'You say numbers 1-100 and read the clock in Hindi.'),
  pack('L1-06-calendar', 'Days, months, dates',
    'Write your weekly schedule - one sentence per day.',
    'You write any date in Hindi and name all 7 days.'),
  pack('L1-07-classes-supplies', 'School subjects and supplies',
    'Paragraph about your favorite subject and what you carry to school.',
    'You can answer "what classes do you take?" in 5+ sentences.'),
  pack('L1-08-interests-leisure', 'Hobbies and free time',
    'Two short paragraphs: what you do after school, and on weekends.',
    'You use -ना to talk about activities (पढ़ना, खेलना).'),
  pack('L1-09-weather-seasons', 'Weather and seasons',
    'Describe today\'s weather and your favorite season.',
    'You compare two seasons using लेकिन.'),
  pack('L1-10-places-transport', 'Places and getting around',
    'Describe your neighborhood and how you get to school.',
    'You use से / तक / में to talk about movement and location.'),
  pack('L1-11-shopping', 'Shopping basics',
    'Write a short dialogue between a shopper and a shopkeeper.',
    'You handle prices, quantities, and simple requests.'),
  pack('L1-12-restaurants-food', 'Restaurants and food',
    'Describe a meal at your favorite restaurant.',
    'You order food, describe taste, and say what you like / do not like.'),
  cap('C01-restaurant-memory', 'Capstone: restaurant memory',
    'Capstone C01, core tier (~220 words). Untimed.',
    'First full 3-paragraph essay. Self-grade against the rubric.'),
  pack('L2-01-daily-routine', 'Daily routine',
    'Describe your morning from waking up to leaving for school.',
    'You sequence 6+ actions using पहले / फिर / उसके बाद.'),
  pack('L2-02-rooms-chores', 'Rooms and chores',
    'Describe your house and one chore you do each week.',
    'You use habitual present (मैं करता हूँ) reliably.'),
  pack('L2-03-food', 'Food at home',
    'Describe what your family eats in a typical week.',
    'You talk about preferences and mild preferences (पसंद है / अच्छा लगता है).'),
  cap('C02-typical-saturday', 'Capstone: typical Saturday',
    'Capstone C02, core tier (~220-240 words). Untimed.',
    'Habitual present sustained across a full essay.'),
  pack('L2-04-school-routines', 'School routines',
    'Describe your school day in sequence.',
    'You manage transitions between classes, lunch, and after-school.'),
  pack('L2-05-school-activities', 'School activities',
    'Paragraph about a club or sport you do at school.',
    'You combine past and present to describe an activity over time.'),
  pack('L2-06-health-fitness', 'Health and fitness',
    'Describe what you do to stay healthy.',
    'You use modal-like constructions (मुझे करना है / चाहिए).'),
  cap('C03-festival-weekend', 'Capstone: festival weekend',
    'Capstone C03, core tier (~240 words). Include one muhavara.',
    'You mix simple past with habitual present in one essay.'),
  pack('L2-07-indoor-outdoor', 'Indoor and outdoor activities',
    'Contrast what you do indoors vs outdoors in 6 sentences.',
    'You use लेकिन / जबकि to contrast two things.'),
  pack('L2-08-shopping-advanced', 'Shopping - comparing, returning',
    'Short dialogue: comparing two items, asking about a return.',
    'You handle comparison (से ज्यादा / कम) and complaints politely.'),
  pack('L2-09-special-events', 'Birthdays and special events',
    'Describe the last birthday or event you attended.',
    'Simple past across a full paragraph.'),
  cap('C04-neighborhood-place', 'Capstone: neighborhood place',
    'Capstone C04, core tier (~240 words). Untimed.',
    'Descriptive paragraph + narrative memory in one essay.'),
  pack('L2-10-travel-plans', 'Travel plans',
    'Write a plan for a trip you want to take.',
    'You use future tense (जाऊँगा / करूँगा) across 5+ sentences.'),
  pack('L2-11-countries-directions', 'Countries and directions',
    'Describe where a country is and how you would get there.',
    'You give directions using north/south/east/west in Hindi.'),
  pack('L3-01-my-memories', 'My memories (L3)',
    'Paragraph about an early childhood memory.',
    'Simple past maintained; ने construction used correctly for 2+ verbs.'),
  cap('C05-school-day', 'Capstone: school day (timed)',
    'Capstone C05, core tier (~260 words). **Timed: 30 minutes, no notes.**',
    'First timed essay. You should be reaching Benchmark 5.'),
  pack('L3-02-teen-life', 'Teen life (L3)',
    'Paragraph about pressures and joys of being a teenager.',
    'Opinion + reason structure using क्योंकि / इसलिए.'),
  pack('L3-03-my-future', 'My future (L3)',
    'Paragraph about what you want to do after high school.',
    'Sustained future tense with reasons.'),
  cap('C06-india-trip', 'Capstone: India trip (push)',
    'Capstone C06, push tier (~280+ words). Untimed.',
    'Three tense frames sustained across one essay.'),
  cap('C07-sick-week', 'Capstone: the sick week (push)',
    'Capstone C07, push tier. Untimed.',
    'Emotional narrative with 2+ muhavare used naturally.'),
  cap('C08-grandmother-story', 'Capstone: grandmother\'s story (push)',
    'Capstone C08, push tier. Untimed.',
    'Reported speech and past-of-past handled cleanly.'),
  cap('C09-ten-years-from-now', 'Capstone: ten years from now (timed)',
    'Capstone C09, push tier. **Timed: 30 minutes.**',
    'Second timed essay at Benchmark 5.'),
  cap('C10-teen-life-essay', 'Capstone: teen life (timed Mock Exam)',
    'Capstone C10 as the final Mock Exam. **Timed: 30 minutes, no notes.**',
    'Ship gate: Benchmark 5 under timed conditions. 3 FCPS credits in reach.'),
];

const PLAN_FOUNDATION: StudyPlan = {
  id: 'plan-foundation',
  forLevels: ['Novice Low'],
  titleEnglish: 'Foundation Plan · 36 weeks',
  titleHindi: 'नींव योजना',
  durationWeeks: 36,
  headline: 'Build from zero. One pack a week - about a school year to reach Benchmark 5.',
  weeks: buildWeeks(FOUNDATION_WEEKS),
  pacingNote:
    'Budget ~2 hours per week: one hour reading the pack or capstone models, one hour writing and self-checking. If a week slips, do not double up the next week - shift the whole schedule forward. The final 5 weeks are push-tier capstones only; those are non-negotiable.',
};

// --- ACCELERATION --------------------------------------------------------
// Novice Mid. L1-01 through L1-04 are treated as known (see
// PACKS_KNOWN_AT_LEVEL). 8 remaining L1 + 11 L2 + 3 L3 packs, 10 capstones
// at 1 per week = 32 weeks.

const ACCELERATION_WEEKS: WeekInput[] = [
  pack('L1-05-numbers-time', 'Numbers and time',
    'Write 5 sentences giving times.',
    'Numbers 1-100 and clock reading locked in.'),
  pack('L1-06-calendar', 'Days, months, dates',
    'Your weekly schedule, one sentence per day.',
    'Any date in Hindi.'),
  pack('L1-07-classes-supplies', 'School subjects and supplies',
    'Paragraph about your favorite subject.',
    'Answer "what classes do you take?" in 5+ sentences.'),
  pack('L1-08-interests-leisure', 'Hobbies and free time',
    'After-school + weekend paragraphs.',
    '-ना infinitives used for activities.'),
  pack('L1-09-weather-seasons', 'Weather and seasons',
    'Today\'s weather + favorite season.',
    'Compare two seasons with लेकिन.'),
  pack('L1-10-places-transport', 'Places and getting around',
    'Your neighborhood + commute.',
    'से / तक / में for movement and location.'),
  pack('L1-11-shopping', 'Shopping basics',
    'Short shopper-shopkeeper dialogue.',
    'Prices, quantities, simple requests.'),
  pack('L1-12-restaurants-food', 'Restaurants and food',
    'A meal at your favorite restaurant.',
    'Order food, describe taste, state preferences.'),
  cap('C01-restaurant-memory', 'Capstone: restaurant memory',
    'Capstone C01, core tier (~220 words). Untimed.',
    'First full 3-paragraph essay.'),
  pack('L2-01-daily-routine', 'Daily routine',
    'Your morning routine in sequence.',
    'Sequence 6+ actions using पहले / फिर.'),
  pack('L2-02-rooms-chores', 'Rooms and chores',
    'Describe your house + one chore.',
    'Habitual present reliable.'),
  pack('L2-03-food', 'Food at home',
    'What your family eats weekly.',
    'Preferences using पसंद है / अच्छा लगता है.'),
  cap('C02-typical-saturday', 'Capstone: typical Saturday',
    'Capstone C02, core tier (~240 words). Untimed.',
    'Habitual present sustained.'),
  pack('L2-04-school-routines', 'School routines',
    'Your school day in sequence.',
    'Clean transitions between periods.'),
  pack('L2-05-school-activities', 'School activities',
    'A club or sport you do.',
    'Past + present mixed across one activity.'),
  pack('L2-06-health-fitness', 'Health and fitness',
    'How you stay healthy.',
    'Modal-like मुझे करना है / चाहिए.'),
  cap('C03-festival-weekend', 'Capstone: festival weekend',
    'Capstone C03, core tier (~240 words). Include one muhavara.',
    'Past + habitual present in one essay.'),
  pack('L2-07-indoor-outdoor', 'Indoor vs outdoor activities',
    'Contrast indoor / outdoor in 6 sentences.',
    'लेकिन / जबकि for contrast.'),
  pack('L2-08-shopping-advanced', 'Shopping - comparing, returning',
    'Comparing-items + return dialogue.',
    'Comparison (से ज्यादा / कम); polite complaint.'),
  pack('L2-09-special-events', 'Birthdays and special events',
    'Last event you attended.',
    'Simple past across a paragraph.'),
  cap('C04-neighborhood-place', 'Capstone: neighborhood place',
    'Capstone C04, core tier (~240 words). Untimed.',
    'Description + memory in one essay.'),
  pack('L2-10-travel-plans', 'Travel plans',
    'Plan for a trip you want to take.',
    'Future tense across 5+ sentences.'),
  pack('L2-11-countries-directions', 'Countries and directions',
    'Where a country is + how to get there.',
    'Directions in Hindi.'),
  pack('L3-01-my-memories', 'My memories (L3)',
    'An early childhood memory.',
    'ने construction correct for 2+ verbs.'),
  cap('C05-school-day', 'Capstone: school day (timed)',
    'Capstone C05, core tier. **Timed: 30 minutes.**',
    'First timed essay; Benchmark 5 in reach.'),
  pack('L3-02-teen-life', 'Teen life (L3)',
    'Pressures and joys of being a teenager.',
    'Opinion + क्योंकि / इसलिए reasoning.'),
  pack('L3-03-my-future', 'My future (L3)',
    'What you want to do after high school.',
    'Sustained future with reasons.'),
  cap('C06-india-trip', 'Capstone: India trip (push)',
    'Capstone C06, push tier. Untimed.',
    'Three tense frames in one essay.'),
  cap('C07-sick-week', 'Capstone: the sick week (push)',
    'Capstone C07, push tier. Untimed.',
    '2+ muhavare used naturally.'),
  cap('C08-grandmother-story', 'Capstone: grandmother\'s story (push)',
    'Capstone C08, push tier. Untimed.',
    'Reported speech + past-of-past.'),
  cap('C09-ten-years-from-now', 'Capstone: ten years from now (timed)',
    'Capstone C09, push tier. **Timed: 30 minutes.**',
    'Second timed essay at Benchmark 5.'),
  cap('C10-teen-life-essay', 'Capstone: teen life (Mock Exam)',
    'Capstone C10 as the final Mock Exam. **Timed.**',
    'Ship gate: Benchmark 5 timed.'),
];

const PLAN_ACCELERATION: StudyPlan = {
  id: 'plan-acceleration',
  forLevels: ['Novice Mid'],
  titleEnglish: 'Acceleration Plan · 32 weeks',
  titleHindi: 'गति योजना',
  durationWeeks: 32,
  headline: 'You already introduce yourself. Pick up from numbers and time; reach Benchmark 5 by week 32.',
  weeks: buildWeeks(ACCELERATION_WEEKS),
  pacingNote:
    'Budget ~2 hours per week. If a week slips, shift forward - do not double up. The final 5 weeks are push-tier capstones only.',
};

// --- INTERMEDIATE BRIDGE ------------------------------------------------
// Novice High. All L1 treated as known. 11 L2 + 3 L3 packs, 10 capstones
// = 24 weeks.

const BRIDGE_WEEKS: WeekInput[] = [
  pack('L2-01-daily-routine', 'Daily routine',
    'Your morning routine in sequence.',
    'पहले / फिर / उसके बाद across 6+ actions.'),
  pack('L2-02-rooms-chores', 'Rooms and chores',
    'Your house + one weekly chore.',
    'Habitual present reliable across a paragraph.'),
  pack('L2-03-food', 'Food at home',
    'What your family eats weekly.',
    'Preferences with पसंद है / अच्छा लगता है.'),
  cap('C01-restaurant-memory', 'Capstone: restaurant memory',
    'Capstone C01, core tier (~220 words). Untimed.',
    'First 3-paragraph essay of the plan.'),
  pack('L2-04-school-routines', 'School routines',
    'Your school day in sequence.',
    'Clean transitions across the day.'),
  pack('L2-05-school-activities', 'School activities',
    'A club or sport you do.',
    'Past + present mixed in one paragraph.'),
  pack('L2-06-health-fitness', 'Health and fitness',
    'How you stay healthy.',
    'मुझे करना है / चाहिए used naturally.'),
  cap('C02-typical-saturday', 'Capstone: typical Saturday',
    'Capstone C02, core tier. Untimed.',
    'Habitual present sustained.'),
  pack('L2-07-indoor-outdoor', 'Indoor vs outdoor activities',
    'Contrast indoor / outdoor in 6 sentences.',
    'लेकिन / जबकि for contrast.'),
  pack('L2-08-shopping-advanced', 'Shopping - comparing, returning',
    'Comparing-items + return dialogue.',
    'Comparison + polite complaint.'),
  pack('L2-09-special-events', 'Birthdays and special events',
    'Last event you attended.',
    'Simple past across a paragraph.'),
  cap('C03-festival-weekend', 'Capstone: festival weekend',
    'Capstone C03, core tier. Include one muhavara.',
    'Past + habitual present blended.'),
  pack('L2-10-travel-plans', 'Travel plans',
    'Plan for a trip you want to take.',
    'Future tense across 5+ sentences.'),
  pack('L2-11-countries-directions', 'Countries and directions',
    'Where a country is + how to get there.',
    'Directions in Hindi.'),
  cap('C04-neighborhood-place', 'Capstone: neighborhood place',
    'Capstone C04, core tier. Untimed.',
    'Description + memory blended.'),
  pack('L3-01-my-memories', 'My memories (L3)',
    'An early childhood memory.',
    'ने construction correct; past sustained.'),
  pack('L3-02-teen-life', 'Teen life (L3)',
    'Pressures and joys of being a teenager.',
    'Opinion + reasoning with क्योंकि / इसलिए.'),
  pack('L3-03-my-future', 'My future (L3)',
    'What you want to do after high school.',
    'Sustained future with reasons.'),
  cap('C05-school-day', 'Capstone: school day (timed)',
    'Capstone C05, core tier. **Timed: 30 minutes.**',
    'First timed essay; Benchmark 5.'),
  cap('C06-india-trip', 'Capstone: India trip (push)',
    'Capstone C06, push tier. Untimed.',
    'Three tense frames sustained.'),
  cap('C07-sick-week', 'Capstone: the sick week (push)',
    'Capstone C07, push tier. Untimed.',
    '2+ muhavare used naturally.'),
  cap('C08-grandmother-story', 'Capstone: grandmother\'s story (push)',
    'Capstone C08, push tier. Untimed.',
    'Reported speech + past-of-past.'),
  cap('C09-ten-years-from-now', 'Capstone: ten years from now (timed)',
    'Capstone C09, push tier. **Timed: 30 minutes.**',
    'Second timed essay at Benchmark 5.'),
  cap('C10-teen-life-essay', 'Capstone: teen life (Mock Exam)',
    'Capstone C10 as the final Mock Exam. **Timed.**',
    'Ship gate: Benchmark 5 timed.'),
];

const PLAN_INTERMEDIATE_BRIDGE: StudyPlan = {
  id: 'plan-intermediate-bridge',
  forLevels: ['Novice High'],
  titleEnglish: 'Intermediate Bridge · 24 weeks',
  titleHindi: 'अंतराल योजना',
  durationWeeks: 24,
  headline: 'You already write simple sentences. In 24 weeks you will write connected paragraphs under time.',
  weeks: buildWeeks(BRIDGE_WEEKS),
  pacingNote:
    'Budget ~2 hours per week. L1 is assumed - pull any L1 pack from the Library if a vocabulary gap bites. The last 5 weeks are push-tier capstones only.',
};

// --- PUSH ----------------------------------------------------------------
// Intermediate Low. All L1 treated as known; C01 marked known via
// CAPSTONES_KNOWN_AT_LEVEL but still scheduled in week 1 as an optional
// baseline (planCursor auto-skips it). 11 L2 + 3 L3 packs + 10 capstones
// = 24 weeks.

const PUSH_WEEKS: WeekInput[] = [
  cap('C01-restaurant-memory', 'Capstone: restaurant memory (baseline)',
    'Capstone C01, core tier. Optional - skip if already written at IM length.',
    'Sanity check against the rubric. Skipped automatically if marked known.'),
  pack('L2-01-daily-routine', 'Daily routine',
    'Your morning routine in sequence.',
    'Clean sequencing and habitual present.'),
  pack('L2-02-rooms-chores', 'Rooms and chores',
    'Your house + weekly chores.',
    'Habitual present across a full paragraph.'),
  pack('L2-03-food', 'Food at home',
    'What your family eats weekly.',
    'Preferences expressed with variety.'),
  cap('C02-typical-saturday', 'Capstone: typical Saturday',
    'Capstone C02, core tier. Untimed.',
    'Habitual present sustained cleanly.'),
  pack('L2-04-school-routines', 'School routines',
    'Your school day in sequence.',
    'Transitions handled without repetition.'),
  pack('L2-05-school-activities', 'School activities',
    'A club or sport you do.',
    'Past + present blended.'),
  pack('L2-06-health-fitness', 'Health and fitness',
    'How you stay healthy.',
    'Modal-like मुझे करना है / चाहिए.'),
  cap('C03-festival-weekend', 'Capstone: festival weekend',
    'Capstone C03, core tier. Include one muhavara.',
    'Past + habitual present blended.'),
  pack('L2-07-indoor-outdoor', 'Indoor vs outdoor activities',
    'Contrast indoor / outdoor in 6 sentences.',
    'लेकिन / जबकि for contrast.'),
  pack('L2-08-shopping-advanced', 'Shopping - comparing, returning',
    'Comparing-items + return dialogue.',
    'Comparison + polite complaint.'),
  pack('L2-09-special-events', 'Birthdays and special events',
    'Last event you attended.',
    'Simple past across a paragraph.'),
  cap('C04-neighborhood-place', 'Capstone: neighborhood place',
    'Capstone C04, core tier. Untimed.',
    'Description + memory blended.'),
  pack('L2-10-travel-plans', 'Travel plans',
    'Plan for a trip you want to take.',
    'Future tense across a full paragraph.'),
  pack('L2-11-countries-directions', 'Countries and directions',
    'Where a country is + how to get there.',
    'Directions in Hindi.'),
  pack('L3-01-my-memories', 'My memories (L3)',
    'An early childhood memory.',
    'ने construction correct; past sustained.'),
  cap('C05-school-day', 'Capstone: school day (timed)',
    'Capstone C05, core tier. **Timed: 30 minutes.**',
    'First timed essay; Benchmark 5.'),
  pack('L3-02-teen-life', 'Teen life (L3)',
    'Pressures and joys of being a teenager.',
    'Opinion + reasoning.'),
  pack('L3-03-my-future', 'My future (L3)',
    'What you want to do after high school.',
    'Sustained future with reasons.'),
  cap('C06-india-trip', 'Capstone: India trip (push)',
    'Capstone C06, push tier. Untimed.',
    'Three tense frames sustained.'),
  cap('C07-sick-week', 'Capstone: the sick week (push)',
    'Capstone C07, push tier. Untimed.',
    '2+ muhavare used naturally.'),
  cap('C08-grandmother-story', 'Capstone: grandmother\'s story (push)',
    'Capstone C08, push tier. Untimed.',
    'Reported speech + past-of-past.'),
  cap('C09-ten-years-from-now', 'Capstone: ten years from now (timed)',
    'Capstone C09, push tier. **Timed: 30 minutes.**',
    'Second timed essay at Benchmark 5.'),
  cap('C10-teen-life-essay', 'Capstone: teen life (Mock Exam)',
    'Capstone C10 as the final Mock Exam. **Timed.**',
    'Ship gate: Benchmark 5 timed.'),
];

const PLAN_PUSH: StudyPlan = {
  id: 'plan-push',
  forLevels: ['Intermediate Low'],
  titleEnglish: 'Push Plan · 24 weeks',
  titleHindi: 'दबाव योजना',
  durationWeeks: 24,
  headline: 'You already string sentences. 24 weeks to connector density, tense control, and timed Benchmark 5.',
  weeks: buildWeeks(PUSH_WEEKS),
  pacingNote:
    'Budget ~2 hours per week. L1 is assumed known. The final 5 weeks are push-tier capstones only; protect them.',
};

// --- POLISH -------------------------------------------------------------
// Intermediate Mid / High. Capstones only at 1 per week = 10 weeks.
// Int Mid has C01 and C02 marked known; Int High has C01-C04 marked known.
// The plan lists all 10 for clarity - planCursor skips the known ones.

const POLISH_WEEKS: WeekInput[] = [
  cap('C01-restaurant-memory', 'Capstone: restaurant memory',
    'Capstone C01, core tier. Untimed.',
    'Baseline rubric sanity check. (Skip if marked known for your level.)'),
  cap('C02-typical-saturday', 'Capstone: typical Saturday',
    'Capstone C02, core tier. Untimed.',
    'Habitual present sustained. (Skip if marked known.)'),
  cap('C03-festival-weekend', 'Capstone: festival weekend',
    'Capstone C03, core tier. Include one muhavara.',
    'Past + habitual present blended.'),
  cap('C04-neighborhood-place', 'Capstone: neighborhood place',
    'Capstone C04, core tier.',
    'Description + memory blended.'),
  cap('C05-school-day', 'Capstone: school day (timed)',
    'Capstone C05, core tier. **Timed: 30 minutes.**',
    'First timed essay of the polish phase.'),
  cap('C06-india-trip', 'Capstone: India trip (push)',
    'Capstone C06, push tier. Untimed.',
    'Three tense frames sustained.'),
  cap('C07-sick-week', 'Capstone: the sick week (push)',
    'Capstone C07, push tier.',
    '2+ muhavare used naturally.'),
  cap('C08-grandmother-story', 'Capstone: grandmother\'s story (push)',
    'Capstone C08, push tier.',
    'Reported speech + past-of-past.'),
  cap('C09-ten-years-from-now', 'Capstone: ten years from now (timed)',
    'Capstone C09, push tier. **Timed: 30 minutes.**',
    'Second timed essay at Benchmark 5 or higher.'),
  cap('C10-teen-life-essay', 'Capstone: teen life (Mock Exam)',
    'Capstone C10 as the final Mock Exam. **Timed.**',
    'Ready-to-ship timed Benchmark 5.'),
];

const PLAN_POLISH: StudyPlan = {
  id: 'plan-polish',
  forLevels: ['Intermediate Mid', 'Intermediate High'],
  titleEnglish: 'Polish Plan · 10 weeks',
  titleHindi: 'परिष्कार योजना',
  durationWeeks: 10,
  headline: 'Capstones only, one per week. Consolidate what you have and rehearse under time.',
  weeks: buildWeeks(POLISH_WEEKS),
  pacingNote:
    'Budget ~2 hours per week. Intermediate Mid students skip weeks 1-2 (C01, C02 already known) and start at week 3. Intermediate High students skip weeks 1-4 (C01-C04 known) and start at week 5. Add flashcard review (Top-150 + connector + muhavara decks) during the final two weeks before the exam.',
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

// Packs a student at a given level is assumed to already know - these are
// hidden from Library, skipped by planCursor, and excluded from "next pack"
// surfacing. The student can always opt back in via the Library "show known"
// toggle. Mapping is intentionally conservative: Novice Mid hides only the
// four most-basic identity packs, and it ramps up from there.
export const PACKS_KNOWN_AT_LEVEL: Record<string, string[]> = {
  'Novice Low': [],
  'Novice Mid': ['L1-01-greetings', 'L1-02-descriptions-feelings', 'L1-03-family', 'L1-04-clothing-colors'],
  'Novice High': [...ALL_L1],
  'Intermediate Low': [...ALL_L1],
  'Intermediate Mid': [...ALL_L1, 'L2-01-daily-routine', 'L2-02-rooms-chores', 'L2-03-food'],
  'Intermediate High': [...ALL_L1, ...ALL_L2.slice(0, 6)],
};

export function packsKnownAtLevel(level: string | undefined): string[] {
  if (!level) return [];
  return PACKS_KNOWN_AT_LEVEL[level] || [];
}

export function isPackKnownAtLevel(packId: string, level: string | undefined): boolean {
  return packsKnownAtLevel(level).includes(packId);
}

// Capstones whose core tier sits at or below the student's declared level.
// C01 (restaurant memory) and C02 (typical Saturday) are the gentlest core
// capstones - Intermediate Mid+ students can skip them; Intermediate High
// students can also skip C03/C04. The push tier (C06-C10) is never hidden.
export const CAPSTONES_KNOWN_AT_LEVEL: Record<string, string[]> = {
  'Novice Low': [],
  'Novice Mid': [],
  'Novice High': [],
  'Intermediate Low': ['C01-restaurant-memory'],
  'Intermediate Mid': ['C01-restaurant-memory', 'C02-typical-saturday'],
  'Intermediate High': ['C01-restaurant-memory', 'C02-typical-saturday', 'C03-festival-weekend', 'C04-neighborhood-place'],
};

export function capstonesKnownAtLevel(level: string | undefined): string[] {
  if (!level) return [];
  return CAPSTONES_KNOWN_AT_LEVEL[level] || [];
}

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
  studentLevel?: string,
  deferredIds: string[] = [],
): {
  currentWeekIndex: number;
  nextPackId: string | null;
  upcomingCapstoneIds: string[];
  isAllDone: boolean;
} {
  const knownSet = new Set(packsKnownAtLevel(studentLevel));
  const deferredSet = new Set(deferredIds);
  const completedSet = new Set([...completedTopicIds, ...knownSet, ...deferredSet]);
  const knownCapSet = new Set(capstonesKnownAtLevel(studentLevel));
  const completedCapSet = new Set([...completedCapstoneIds, ...knownCapSet, ...deferredSet]);
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

// ---------------------------------------------------------------------------
// Plan-aware "next after id X" resolution for NextUpCard.
// Walks the plan in authored order, finds the given itemId, then returns the
// first subsequent item (pack or capstone) that is not completed, not deferred,
// and not already-known at the student's level.
// ---------------------------------------------------------------------------

export type PlanItemKind = 'pack' | 'capstone';

export interface PlanItemRef {
  kind: PlanItemKind;
  id: string;
  weekIndex: number;
  /** Position of this item in the flattened plan item sequence (1-based). */
  position: number;
}

/** Flatten a plan's weeks into an in-order sequence of pack/capstone refs. */
export function planItemSequence(plan: StudyPlan): PlanItemRef[] {
  const seq: PlanItemRef[] = [];
  let position = 0;
  for (const w of plan.weeks) {
    for (const pid of w.packs) {
      position += 1;
      seq.push({ kind: 'pack', id: pid, weekIndex: w.weekIndex, position });
    }
    for (const cid of w.capstones || []) {
      position += 1;
      seq.push({ kind: 'capstone', id: cid, weekIndex: w.weekIndex, position });
    }
  }
  return seq;
}

/**
 * Given a plan and an item the student just finished (or is viewing), return
 * the next item in plan order, skipping: completed items, deferred items,
 * and items marked known at the student's level. Returns null if the student
 * is at/after the last plan item.
 *
 * If the given itemId is not found in the plan, falls back to returning the
 * first unfinished item in the plan (essentially planCursor's next step).
 */
export function nextPlanItemAfter(
  plan: StudyPlan,
  currentItemId: string,
  opts: {
    completedTopicIds?: string[];
    completedCapstoneIds?: string[];
    studentLevel?: string;
    deferredIds?: string[];
  } = {},
): PlanItemRef | null {
  const seq = planItemSequence(plan);
  const knownPacks = new Set(packsKnownAtLevel(opts.studentLevel));
  const knownCaps = new Set(capstonesKnownAtLevel(opts.studentLevel));
  const deferred = new Set(opts.deferredIds || []);
  const donePacks = new Set([...(opts.completedTopicIds || []), ...knownPacks]);
  const doneCaps = new Set([...(opts.completedCapstoneIds || []), ...knownCaps]);

  const idx = seq.findIndex((it) => it.id === currentItemId);
  // If current item isn't in this plan, start from the top.
  const start = idx < 0 ? 0 : idx + 1;

  for (let i = start; i < seq.length; i++) {
    const it = seq[i];
    if (deferred.has(it.id)) continue;
    if (it.kind === 'pack' && donePacks.has(it.id)) continue;
    if (it.kind === 'capstone' && doneCaps.has(it.id)) continue;
    return it;
  }
  return null;
}

/**
 * Plan progress summary for the mini progress bar at the top of each overlay.
 * Effective totals exclude items marked known at the student's level so the
 * percent reflects the work the student actually has to do.
 */
export interface PlanProgress {
  totalItems: number;
  completedItems: number;
  percent: number;
  currentPosition: number;
}

export function planProgressFor(
  plan: StudyPlan,
  currentItemId: string | null,
  opts: {
    completedTopicIds?: string[];
    completedCapstoneIds?: string[];
    studentLevel?: string;
  } = {},
): PlanProgress {
  const seq = planItemSequence(plan);
  const knownPacks = new Set(packsKnownAtLevel(opts.studentLevel));
  const knownCaps = new Set(capstonesKnownAtLevel(opts.studentLevel));
  const donePacks = new Set(opts.completedTopicIds || []);
  const doneCaps = new Set(opts.completedCapstoneIds || []);

  const effective = seq.filter((it) =>
    it.kind === 'pack' ? !knownPacks.has(it.id) : !knownCaps.has(it.id),
  );
  const completedItems = effective.filter((it) =>
    it.kind === 'pack' ? donePacks.has(it.id) : doneCaps.has(it.id),
  ).length;
  const totalItems = effective.length;
  const percent = totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100);

  let currentPosition = 0;
  if (currentItemId) {
    const match = effective.findIndex((it) => it.id === currentItemId);
    currentPosition = match < 0 ? 0 : match + 1;
  }

  return { totalItems, completedItems, percent, currentPosition };
}
