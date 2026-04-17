// Topic-pack content schema. All static content packs conform to TopicPack.
// This file is the source of truth for the content contract between the
// authored topic files and the rendering components.

export type Level = 1 | 2 | 3;

export type ThemeGroup = 'Identity' | 'ModernSociety' | 'HumanIngenuity';

export type RubricAxis = 'TextType' | 'LanguageControl' | 'TopicCoverage';

export type StampBenchmark = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type FcpsCreditLevel =
  | 'NoneYet'
  | 'NoviceHigh_1cr'
  | 'IntermediateLow_2cr'
  | 'IntermediateMid_3cr';

export type PositionOnArc = 'foundations' | 'building' | 'pushing-to-IM';

export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'phrase'
  | 'question'
  | 'number'
  | 'pronoun';

export type ModelTextKind =
  | 'email'
  | 'diary'
  | 'announcement'
  | 'menu'
  | 'schedule'
  | 'letter'
  | 'review'
  | 'sign'
  | 'sms'
  | 'poster';

export type Tense = 'past' | 'present' | 'future';

export interface PackRationale {
  fcpsSubTopics: string[];
  trains: RubricAxis[];
  afterThisPackStudentCan: string[];
  positionOnArc: PositionOnArc;
  estimatedTime: string;
  ifSkippedRisk: string;
}

export interface TeacherNote {
  why: string;
  trains: RubricAxis[];
  examLink?: string;
}

export interface VerdictCard {
  predictedBenchmark: StampBenchmark;
  predictedCredit: FcpsCreditLevel;
  whyItPasses: string[];
  gotchas?: string[];
}

export interface VocabEntry {
  hindi: string;
  transliteration: string;
  english: string;
  exampleHindi: string;
  exampleEnglish: string;
  emoji: string;
  partOfSpeech: PartOfSpeech;
  subgroup?: string;
}

export interface GrammarExample {
  hindi: string;
  transliteration: string;
  english: string;
}

export interface GrammarNote {
  title: string;
  rule: string;
  examples: GrammarExample[];
  pitfall?: string;
  whyItMatters: string;
}

export interface ConnectorEntry {
  hindi: string;
  transliteration: string;
  english: string;
  frame: string;
  sampleHindi: string;
  sampleEnglish: string;
}

export interface PassageHighlight {
  term: string;
  note: string;
}

export interface ComprehensionQA {
  q: string;
  a: string;
}

export interface Passage {
  title: string;
  hindi: string;
  transliteration: string;
  english: string;
  highlights: PassageHighlight[];
  comprehensionQuestions: ComprehensionQA[];
}

export interface ModelText {
  kind: ModelTextKind;
  title: string;
  hindi: string;
  transliteration: string;
  english: string;
}

export interface CulturalInsight {
  title: string;
  body: string;
  emoji: string;
}

export interface Muhavara {
  phrase: string;
  literal: string;
  meaning: string;
  example: string;
  exampleEnglish: string;
}

export type AnnotationKind =
  | 'connector'
  | 'tense-shift'
  | 'idiom'
  | 'vocab'
  | 'cultural'
  | 'structure';

export interface EssayAnnotation {
  paragraphIndex: number;
  kind: AnnotationKind;
  highlight: string;
  note: string;
}

export interface ModelEssay {
  prompt: string;
  novice: string;
  intermediateMid: string;
  annotations: EssayAnnotation[];
  wordCount: number;
  tenseUsed: Tense[];
  connectorsUsed: string[];
  verdict: VerdictCard;
}

export interface PromptHint {
  connectors: string[];
  vocab: string[];
  tenses: Tense[];
}

export interface WritingPrompt {
  hindi: string;
  english: string;
  hint: PromptHint;
}

export interface LearningObjective {
  text: string;
  trains: RubricAxis[];
}

export interface TopicPack {
  id: string;
  level: Level;
  themeGroup: ThemeGroup;
  order: number;
  titleHindi: string;
  titleEnglish: string;
  hook: string;
  heroPrompt: string;
  rationale: PackRationale;
  objectives: LearningObjective[];
  vocabulary: VocabEntry[];
  vocabularyNote: TeacherNote;
  grammar: GrammarNote[];
  grammarNote: TeacherNote;
  connectors: ConnectorEntry[];
  connectorsNote: TeacherNote;
  anchor: Passage;
  anchorNote: TeacherNote;
  modelTexts: ModelText[];
  modelTextsNote: TeacherNote;
  cultural: CulturalInsight[];
  culturalNote: TeacherNote;
  muhavare: Muhavara[];
  muhavareNote: TeacherNote;
  modelEssays: ModelEssay[];
  modelEssaysNote: TeacherNote;
  prompts: WritingPrompt[];
  promptsNote: TeacherNote;
  rubricNote: TeacherNote;
  status: 'stub' | 'drafted' | 'reviewed' | 'shipped';
  version: 1;
}

export interface TopicIndexEntry {
  id: string;
  titleHindi: string;
  titleEnglish: string;
  level: Level;
  themeGroup: ThemeGroup;
  order: number;
  status: TopicPack['status'];
}
