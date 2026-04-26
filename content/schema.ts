// Topic-pack content schema. All static content packs conform to TopicPack.
// This file is the source of truth for the content contract between the
// authored topic files and the rendering components.

export type Level = 1 | 2 | 3;

export type ThemeGroup = 'Identity' | 'ModernSociety' | 'HumanIngenuity';

// ---------------------------------------------------------------------------
// TopicTheme — finer-grained subject tag that sits BELOW `themeGroup`. Where
// `themeGroup` is the coarse 3-value AAPPL-style classification used by hero
// art tokens, `topicTheme` is the 16-value subject family used by the
// Library's theme chips and the "related at other levels" sibling strip on
// pack pages. A pack has exactly one of each; they're independent axes.
// ---------------------------------------------------------------------------

export type TopicTheme =
  | 'greetings'
  | 'family'
  | 'appearance'
  | 'time'
  | 'school'
  | 'leisure'
  | 'weather'
  | 'places'
  | 'shopping'
  | 'food'
  | 'daily-life'
  | 'health'
  | 'travel'
  | 'special-events'
  | 'personal'
  | 'future';

export interface TopicThemeMeta {
  label: string;
  emoji: string;
}

export const TOPIC_THEME_META: Record<TopicTheme, TopicThemeMeta> = {
  greetings: { label: 'Greetings & Introductions', emoji: '🙏' },
  family: { label: 'Family & Home', emoji: '👪' },
  appearance: { label: 'Clothing & Appearance', emoji: '👕' },
  time: { label: 'Numbers & Time', emoji: '🕐' },
  school: { label: 'School Life', emoji: '📚' },
  leisure: { label: 'Interests & Hobbies', emoji: '🏏' },
  weather: { label: 'Weather & Seasons', emoji: '☔' },
  places: { label: 'Places & Transport', emoji: '🛺' },
  shopping: { label: 'Shopping & Markets', emoji: '🛍️' },
  food: { label: 'Food & Meals', emoji: '🍛' },
  'daily-life': { label: 'Daily Routines', emoji: '🌅' },
  health: { label: 'Health & Wellness', emoji: '💪' },
  travel: { label: 'Travel & Directions', emoji: '🧳' },
  'special-events': { label: 'Festivals & Events', emoji: '🪔' },
  personal: { label: 'Personal Stories', emoji: '📓' },
  future: { label: 'Future Plans', emoji: '🌱' },
};

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
  /** Short tab label (2–4 words) - what makes this essay different from its sibling. */
  shortLabel?: string;
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
  /**
   * Finer-grained subject tag used by the Library's per-card theme chip and
   * the pack page's "related at other levels" sibling strip. Independent of
   * `themeGroup` (coarse AAPPL classification). See `TOPIC_THEME_META` for
   * labels and `packsInTopicTheme()` for the sibling lookup. Required — the
   * structural validator refuses any pack missing it.
   */
  topicTheme: TopicTheme;
  order: number;
  titleHindi: string;
  titleEnglish: string;
  hook: string;
  heroPrompt: string;
  /**
   * Key into the SVG motif library (components/art/motifs/). Used by
   * PackHeroArt to pick the illustrated scene. If omitted, PackHeroArt
   * falls back to a theme-generic motif.
   */
  heroMotif?: string;
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
  /**
   * Optional per-pack speaking prompts (5 per pack). Spoken delivery of the
   * same theme as `prompts`. If absent at the pack level, a sensible default
   * is computed in `content/speakingDefaults.ts` from `prompts` + theme.
   * Added in 4.3.
   */
  speakingPrompts?: string[];
  /**
   * Optional per-pack speaking self-check items (5 per pack). Each item is a
   * single short claim the student ticks if true of their recording. If
   * absent at the pack level, a default 5-item rubric is computed in
   * `content/speakingDefaults.ts` from the pack's grammar/vocab/connectors/
   * muhavare. Added in 4.3.
   */
  speakingSelfCheck?: string[];
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

// ---------------------------------------------------------------------------
// Capstone essays - cross-topic, multi-paragraph writing pieces that integrate
// vocabulary and structure from 3–5 topic packs. A student reaches each
// capstone after completing its contributing packs; capstones rehearse the
// exam-style performance (not a sub-skill).
// ---------------------------------------------------------------------------

export type CapstoneTier = 'core' | 'push';

export type EssayVersionLabel = 'novice' | 'intermediateMid' | 'push';

export type CrossTopicContribution =
  | 'vocabulary'
  | 'grammar'
  | 'connectors'
  | 'structure'
  | 'cultural';

export interface CrossTopicRef {
  packId: string;
  contributes: CrossTopicContribution;
  note: string;
}

export interface EssayVersion {
  label: EssayVersionLabel;
  /**
   * Default Hindi text. Used by validators and the credit-audit script
   * (token + word-count searches) and rendered to readers when no gendered
   * override matches their profile. Existing capstones author this in a
   * single voice (often female-coded) — `hindiMale` / `hindiFemale` layer
   * gendered forms on top without disturbing the audit.
   */
  hindi: string;
  /**
   * Optional male-speaker variant. Selected by `pickGenderedHindi()` when
   * the active student profile's `gender` is `'male'` or `undefined`
   * (default-male per spec). Falls back to `hindi` when absent.
   */
  hindiMale?: string;
  /**
   * Optional female-speaker variant. Selected by `pickGenderedHindi()`
   * when the active student profile's `gender` is `'female'`. Falls back
   * to `hindi` when absent.
   */
  hindiFemale?: string;
  transliteration: string;
  /** Optional gendered transliterations, parallel to hindiMale/hindiFemale. */
  transliterationMale?: string;
  transliterationFemale?: string;
  english: string;
  wordCount: number;
  tensesUsed: Tense[];
  connectorsUsed: string[];
  targetBenchmark: StampBenchmark;
}

export interface Capstone {
  id: string;
  order: number;
  tier: CapstoneTier;
  isMockExam: boolean;
  mockExamMinutes?: number;
  titleHindi: string;
  titleEnglish: string;
  hook: string;
  heroMotif: string;
  themeGroup: ThemeGroup;
  promptHindi: string;
  promptEnglish: string;
  whyThisCapstone: string;
  draws: CrossTopicRef[];
  /**
   * Always ordered [novice, intermediateMid, push]. Annotations + verdict
   * attach to the intermediateMid version (the benchmark we care about).
   */
  versions: [EssayVersion, EssayVersion, EssayVersion];
  annotations: EssayAnnotation[];
  verdict: VerdictCard;
  readerQuestions: ComprehensionQA[];
  teacherNote: TeacherNote;
  status: 'stub' | 'drafted' | 'reviewed' | 'shipped';
  version: 1;
}

export interface CapstoneIndexEntry {
  id: string;
  order: number;
  tier: CapstoneTier;
  titleHindi: string;
  titleEnglish: string;
  themeGroup: ThemeGroup;
  isMockExam: boolean;
  status: Capstone['status'];
}

// ---------------------------------------------------------------------------
// Study plans - map a declared ProficiencyLevel to a weekly schedule of packs
// and capstones. Consumed by Onboarding, Dashboard (next-pack resolution),
// and StudyPlanView (printable schedule).
// ---------------------------------------------------------------------------

export type StudyPlanLevelKey =
  | 'Novice Low'
  | 'Novice Mid'
  | 'Novice High'
  | 'Intermediate Low'
  | 'Intermediate Mid'
  | 'Intermediate High';

export interface StudyPlanWeek {
  weekIndex: number;
  focus: string;
  packs: string[];
  capstones?: string[];
  writingOutput: string;
  checkpoint: string;
}

export interface StudyPlan {
  id: string;
  forLevels: StudyPlanLevelKey[];
  titleEnglish: string;
  titleHindi: string;
  durationWeeks: number;
  headline: string;
  weeks: StudyPlanWeek[];
  pacingNote: string;
}

// ---------------------------------------------------------------------------
// Flashcards - generated from pack/capstone content for drill. See
// content/flashcards/* and scripts/build-flashcards.ts.
// ---------------------------------------------------------------------------

export type FlashcardKind =
  | 'vocab'
  | 'connector'
  | 'muhavara'
  | 'grammar'
  | 'tense-frame'
  | 'structure';

export type FlashcardPriority = 'must-know' | 'core' | 'bonus';

export interface FlashcardSourceRef {
  packId?: string;
  capstoneId?: string;
  entryKey?: string;
}

export interface FlashcardFace {
  hindi?: string;
  english?: string;
  prompt?: string;
  example?: string;
  note?: string;
}

export interface Flashcard {
  id: string;
  kind: FlashcardKind;
  sourceRef?: FlashcardSourceRef;
  front: FlashcardFace;
  back: FlashcardFace;
  priority: FlashcardPriority;
  trains: RubricAxis[];
}

export type DeckKind =
  | 'pack-review'
  | 'theme-review'
  | 'exam-prep'
  | 'connector-drill'
  | 'muhavara-drill'
  | 'grammar-essentials';

export interface Deck {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  kind: DeckKind;
  packIds?: string[];
  cards: Flashcard[];
}
