// STAMP rubric descriptors and FCPS credit mapping.
// Sourced from Avant Assessment's STAMP 4S/2S rubric + FCPS World Language
// Credit by Exam passing ranges. Rendered in HowThisWorksView and throughout
// the app so non-expert teachers can see exactly what the rubric measures.
//
// Note: every exam-vendor / credit-issuer string in this file is routed
// through the CURRICULUM constant. See content/curriculum.ts.

import type {
  FcpsCreditLevel,
  RubricAxis,
  StampBenchmark,
} from '../../schema';
import { CURRICULUM } from '../../curriculum';

export interface BenchmarkDescriptor {
  benchmark: StampBenchmark;
  actflLabel: string;
  textType: string;
  languageControl: string;
  credit: FcpsCreditLevel;
  creditCount: 0 | 1 | 2 | 3;
  inOneLine: string;
}

export const STAMP_BENCHMARKS: BenchmarkDescriptor[] = [
  {
    benchmark: 1,
    actflLabel: 'Novice Low',
    textType: 'Isolated words; memorized labels only.',
    languageControl: 'Minimal. Recognizable only with significant context.',
    credit: 'NoneYet',
    creditCount: 0,
    inOneLine: 'Scattered words - no credit yet.',
  },
  {
    benchmark: 2,
    actflLabel: 'Novice Mid',
    textType: 'Memorized phrases and short lists.',
    languageControl: 'Highly formulaic; errors frequent outside memorized chunks.',
    credit: 'NoneYet',
    creditCount: 0,
    inOneLine: 'Memorized chunks - still no credit.',
  },
  {
    benchmark: 3,
    actflLabel: 'Novice High',
    textType: 'Simple sentences built from known patterns.',
    languageControl: 'Emerging sentence construction; heavy reliance on formulaic expressions.',
    credit: 'NoviceHigh_1cr',
    creditCount: 1,
    inOneLine: `Simple sentences - earns 1 ${CURRICULUM.creditMapping.issuer} credit.`,
  },
  {
    benchmark: 4,
    actflLabel: 'Intermediate Low',
    textType: 'Strings of sentences with some detail; ideas remain relatively disconnected.',
    languageControl: 'Control is uneven; preparatory phrases/adverbial enhancements appear but stand independently.',
    credit: 'IntermediateLow_2cr',
    creditCount: 2,
    inOneLine: `Strings of sentences - earns 2 ${CURRICULUM.creditMapping.issuer} credits.`,
  },
  {
    benchmark: 5,
    actflLabel: CURRICULUM.creditMapping.creditName,
    textType: 'Connected sentences with transitions and groupings of ideas; sentences cannot be rearranged without altering meaning.',
    languageControl: 'Comprehensible across the whole response; some control of past, present, and future time frames.',
    credit: 'IntermediateMid_3cr',
    creditCount: 3,
    inOneLine: `Connected sentences with time frames - earns ${CURRICULUM.creditMapping.credits} ${CURRICULUM.creditMapping.issuer} credits. 🎯 TARGET.`,
  },
  {
    benchmark: 6,
    actflLabel: 'Intermediate High',
    textType: 'Paragraph-length narratives; clear cohesion across multiple paragraphs.',
    languageControl: 'Generally accurate across simple time frames; some emerging complex structures.',
    credit: 'IntermediateMid_3cr',
    creditCount: 3,
    inOneLine: 'Cohesive paragraphs - still 3 credits (cap).',
  },
  {
    benchmark: 7,
    actflLabel: 'Advanced Low',
    textType: 'Full paragraphs with narration, description, and explanation.',
    languageControl: 'Good control of major time frames; some circumlocution on complex topics.',
    credit: 'IntermediateMid_3cr',
    creditCount: 3,
    inOneLine: 'Advanced narration - 3 credits (cap).',
  },
  {
    benchmark: 8,
    actflLabel: 'Advanced Mid',
    textType: 'Multi-paragraph discourse with clear organization and supporting detail.',
    languageControl: 'Strong accuracy across major time frames; can handle some abstract topics.',
    credit: 'IntermediateMid_3cr',
    creditCount: 3,
    inOneLine: 'Advanced-mid discourse - 3 credits (cap).',
  },
];

export const TARGET_BENCHMARK: StampBenchmark = CURRICULUM.creditMapping.benchmark;

export interface RubricAxisInfo {
  id: RubricAxis;
  name: string;
  oneLiner: string;
  whatRatersLookFor: string[];
  howToTrain: string[];
}

export const RUBRIC_AXES: RubricAxisInfo[] = [
  {
    id: 'TextType',
    name: 'Text-Type',
    oneLiner: 'How connected and structured the student\'s output is.',
    whatRatersLookFor: [
      'Are sentences connected by transitions, or do they stand alone?',
      'Are ideas grouped into paragraphs with a clear flow?',
      'Can sentences be rearranged without losing meaning? (If yes → Intermediate-Low. If no → Intermediate-Mid.)',
      'Does the response address most of the prompt?',
    ],
    howToTrain: [
      'Practice connectors (पहले, फिर, क्योंकि, लेकिन, इसलिए, अगर...तो).',
      'Write 3 paragraphs per prompt, not a single run-on.',
      'Use time markers to shift between past, present, and future.',
    ],
  },
  {
    id: 'LanguageControl',
    name: 'Language Control',
    oneLiner: 'How accurate, comprehensible, and consistent the Hindi is.',
    whatRatersLookFor: [
      'Is the response comprehensible end-to-end, or only in patches?',
      'Are gender and number agreement errors rare, occasional, or pervasive?',
      'Are tenses used correctly across past, present, and future?',
      'Does the student sustain control or break down under complexity?',
    ],
    howToTrain: [
      'Drill gender/number agreement on nouns + verbs + adjectives.',
      'Learn one verb chart (होना, जाना, करना) in all three tenses.',
      'Use short sentences you control over long ones that fall apart.',
    ],
  },
  {
    id: 'TopicCoverage',
    name: 'Topic Coverage',
    oneLiner: 'Does the vocabulary actually fit the topic the prompt asks about?',
    whatRatersLookFor: [
      'Does the response stay on-topic?',
      'Does the student use vocabulary specific to the theme (family, food, travel)?',
      'Are there concrete details, or only generic words?',
    ],
    howToTrain: [
      `Learn 20–30 high-yield words per ${CURRICULUM.creditMapping.issuer} topic before writing about it.`,
      'Include at least one cultural specific (food name, festival, place).',
      'Prefer precise nouns and verbs over "good," "nice," "do."',
    ],
  },
];

export const FCPS_CREDIT_SUMMARY = [
  {
    level: 'NoneYet' as FcpsCreditLevel,
    credits: 0,
    label: 'Below Novice-High',
    description: 'The student does not yet produce connected simple sentences independently.',
  },
  {
    level: 'NoviceHigh_1cr' as FcpsCreditLevel,
    credits: 1,
    label: 'Novice High = 1 credit',
    description: 'Simple sentences. Earns Level 1 credit only.',
  },
  {
    level: 'IntermediateLow_2cr' as FcpsCreditLevel,
    credits: 2,
    label: 'Intermediate Low = 2 credits',
    description: 'Strings of sentences with detail. Earns Levels 1 and 2 credit.',
  },
  {
    level: 'IntermediateMid_3cr' as FcpsCreditLevel,
    credits: 3,
    label: `${CURRICULUM.creditMapping.creditName} = ${CURRICULUM.creditMapping.credits} credits 🎯`,
    description: 'Connected paragraphs with multiple time frames. Full World Language requirement.',
  },
];

export const EXAM_FACTS = {
  examName: `${CURRICULUM.creditMapping.issuer} World Language Credit by Exam (${CURRICULUM.language.name})`,
  testVendor: `${CURRICULUM.examSystem.provider} - ${CURRICULUM.examSystem.name}`,
  sections: [
    {
      name: 'Writing',
      prompts: 3,
      timeMinutes: 25,
      details: `Two ${CURRICULUM.creditMapping.issuer}-graded essays on personal-experience topics. Each essay ≥3 well-developed cohesive paragraphs. Typed in ${CURRICULUM.language.script} via a virtual keyboard on an ${CURRICULUM.creditMapping.issuer} Chromebook.`,
    },
    {
      name: 'Speaking',
      prompts: 3,
      timeMinutes: 25,
      details: 'Each response up to 3 minutes of recorded audio. Same topic domains as Writing.',
    },
  ],
  noReadingSection: true,
  noListeningSection: true,
  creditWindow: `Scored by ${CURRICULUM.examSystem.providerShortName} Certified Raters; results in ~25 business days.`,
  targetForThreeCredits: `${CURRICULUM.displayStrings.targetFullPhrase} on both Writing and Speaking.`,
};
