// Helpers that produce a minimal TypeScript-valid TopicPack stub. Used by
// stub topic files so they compile and render as "coming soon" cards before
// being authored in full. Real authored packs do NOT use these helpers.

import type {
  Level,
  Passage,
  ThemeGroup,
  TopicPack,
  TopicTheme,
} from './schema';
import { composeHeroPrompt } from './imagePrompts';

export function stubTeacherNote(why: string) {
  return {
    why,
    trains: ['TextType' as const],
  };
}

export function stubAnchor(titleHindi: string): Passage {
  return {
    title: titleHindi,
    hindi: 'यह अध्याय अभी लिखा जा रहा है।',
    transliteration: 'yah adhyaay abhi likha jaa raha hai.',
    english: 'This chapter is being written.',
    highlights: [],
    comprehensionQuestions: [],
  };
}

export interface StubArgs {
  id: string;
  level: Level;
  themeGroup: ThemeGroup;
  topicTheme?: TopicTheme;
  order: number;
  titleHindi: string;
  titleEnglish: string;
  hook: string;
  heroScene: string;
}

export function makeStub(args: StubArgs): TopicPack {
  const note = stubTeacherNote('This section will be filled in during full authoring.');
  return {
    id: args.id,
    level: args.level,
    themeGroup: args.themeGroup,
    topicTheme: args.topicTheme,
    order: args.order,
    titleHindi: args.titleHindi,
    titleEnglish: args.titleEnglish,
    hook: args.hook,
    heroPrompt: composeHeroPrompt(args.heroScene),
    rationale: {
      fcpsSubTopics: [args.titleEnglish],
      trains: ['TextType'],
      afterThisPackStudentCan: ['Recognize the topic vocabulary.'],
      positionOnArc: args.level === 1 ? 'foundations' : args.level === 2 ? 'building' : 'pushing-to-IM',
      estimatedTime: '90 min study + 30 min essay',
      ifSkippedRisk: 'Student may lack vocabulary needed for prompts on this FCPS sub-topic.',
    },
    objectives: [],
    vocabulary: [],
    vocabularyNote: note,
    grammar: [],
    grammarNote: note,
    connectors: [],
    connectorsNote: note,
    anchor: stubAnchor(args.titleHindi),
    anchorNote: note,
    modelTexts: [],
    modelTextsNote: note,
    cultural: [],
    culturalNote: note,
    muhavare: [],
    muhavareNote: note,
    modelEssays: [],
    modelEssaysNote: note,
    prompts: [],
    promptsNote: note,
    rubricNote: note,
    status: 'stub',
    version: 1,
  };
}
