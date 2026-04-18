
export enum ProficiencyLevel {
  NOVICE_LOW = 'Novice Low',
  NOVICE_MID = 'Novice Mid',
  NOVICE_HIGH = 'Novice High',
  INTERMEDIATE_LOW = 'Intermediate Low',
  INTERMEDIATE_MID = 'Intermediate Mid',
  INTERMEDIATE_HIGH = 'Intermediate High'
}

// ---------------------------------------------------------------------------
// Legacy material/lesson types - kept for older localStorage profiles only.
// New content flows through content/schema.ts TopicPack. Do not extend these.
// ---------------------------------------------------------------------------

export interface PracticeQuestion {
  question: string;
  hindiQuestion: string;
}

export interface Idiom {
  phrase: string;
  meaning: string;
  example: string;
}

export interface Material {
  title: string;
  hindiText: string;
  transliteration: string;
  englishTranslation: string;
  activity: string;
  vocabulary: { word: string; meaning: string }[];
  thoughtPrompts: string[];
  idioms: Idiom[];
  practiceQuestions: PracticeQuestion[];
}

export interface Lesson {
  id: string;
  title: string;
  topic: string;
  status: 'pending' | 'completed' | 'evaluated';
  difficulty: number;
  description: string;
}

export interface Unit {
  id: string;
  name: string;
  lessons: Lesson[];
  targetProficiency: ProficiencyLevel;
  cognitiveGoal: string;
}

// ---------------------------------------------------------------------------
// Active student profile - static-content era.
// ---------------------------------------------------------------------------

export interface EvaluationResult {
  date: string;
  score: number;
  feedback: string;
  identifiedStrengths: string[];
  areasToImprove: string[];
  suggestedNextStep: string;
  thoughtProcessAnalysis: string;
}

/**
 * SM-2-lite spaced-repetition state for a single flashcard. Persisted per-
 * profile under `cardStates[cardId]`. Separate concept from `flashcardsMastered`
 * (which is binary "got it / not yet"): cardStates carries the scheduling math
 * that picks which cards surface on the Due-today dashboard tile.
 *
 *   ease     — multiplier for interval growth. Clamped to [1.3, 2.5].
 *   interval — days until next review. Clamped to [1, 365]; 'again' resets to 1.
 *   due      — ISO datetime (full ISOString) when the card is next due.
 *   reviews  — count of reviews applied so far.
 *
 * See lib/srs.ts for the math.
 */
export interface CardState {
  ease: number;
  interval: number;
  due: string;
  reviews: number;
}

/**
 * Stored record of a mock-exam sitting. Keyed by capstone id in
 * StudentProfile.mockExamResults. Persists to localStorage so the student can
 * revisit their last timed attempt. `ai` is present only when AI assessment
 * was enabled at submission time. `selfCheck` records the student's yes/no
 * answers to the rubric questions (shown when AI is off).
 */
export interface MockExamResult {
  text: string;
  submittedAt: string;
  durationSeconds: number;
  timedOut: boolean;
  ai?: EvaluationResult;
  selfCheck?: Record<string, boolean>;
}

export interface StudentProfile {
  id: string;
  name: string;
  currentLevel: ProficiencyLevel;
  startDate: string;
  examDate: string;

  // New static-content era:
  completedTopicIds: string[];
  inProgressTopicId?: string;
  evaluations?: Record<string, EvaluationResult[]>;
  aiAssessmentEnabled?: boolean;
  howThisWorksSeen?: boolean;

  // Capstones + study plan + flashcards (second-phase additions):
  selectedStudyPlanId?: string;
  completedCapstoneIds?: string[];
  inProgressCapstoneId?: string;
  flashcardsSeen?: string[];
  flashcardsMastered?: string[];

  // Items the student chose to skip from next-up resolution. Applies across
  // packs, capstones, and decks. Kept per-profile. Added for the in-overlay
  // NextUpCard so "Skip for now" sticks.
  deferredIds?: string[];

  // Stable ids of completion celebrations already shown to this student, so
  // each achievement fires exactly once. See content/celebrations.ts for the
  // id conventions (e.g. `pack-complete:<packId>`, `plan-milestone-50:<planId>`,
  // `stamp-ready`).
  celebrationsShown?: string[];

  // Local-time ISO dates ('YYYY-MM-DD') for every day the student did anything
  // (completed a pack, capstone, or mastered a flashcard). Unique + ascending.
  // Used by the Dashboard Today-strip streak counter. Added in 1.4.
  activityDates?: string[];

  // SM-2-lite spaced-repetition schedule. Keyed by flashcard id. Populated on
  // each review inside DeckRunner. Consumed by the Due-today dashboard tile
  // and the synthetic `due-today` deck. Added in 4.1.
  cardStates?: Record<string, CardState>;

  // Latest mock-exam sitting per capstone id. Written by MockExamMode when the
  // student submits (manually or via timer expiry). Added in 4.2.
  mockExamResults?: Record<string, MockExamResult>;

  // Legacy fields (kept optional so old localStorage records still parse):
  plan?: Unit[];
  completedLessonIds?: string[];
  generatedMaterials?: Record<string, Material>;
}

/**
 * Normalize a profile loaded from localStorage so legacy records work with the
 * new static-content code paths. Idempotent.
 */
export function migrateProfile(raw: any): StudentProfile {
  const profile: StudentProfile = {
    id: raw.id,
    name: raw.name,
    currentLevel: raw.currentLevel,
    startDate: raw.startDate,
    examDate: raw.examDate,
    completedTopicIds: Array.isArray(raw.completedTopicIds) ? raw.completedTopicIds : [],
    inProgressTopicId: raw.inProgressTopicId,
    evaluations: raw.evaluations || {},
    aiAssessmentEnabled: raw.aiAssessmentEnabled ?? false,
    howThisWorksSeen: raw.howThisWorksSeen ?? false,
    selectedStudyPlanId: raw.selectedStudyPlanId,
    completedCapstoneIds: Array.isArray(raw.completedCapstoneIds) ? raw.completedCapstoneIds : [],
    inProgressCapstoneId: raw.inProgressCapstoneId,
    flashcardsSeen: Array.isArray(raw.flashcardsSeen) ? raw.flashcardsSeen : [],
    flashcardsMastered: Array.isArray(raw.flashcardsMastered) ? raw.flashcardsMastered : [],
    deferredIds: Array.isArray(raw.deferredIds) ? raw.deferredIds : [],
    celebrationsShown: Array.isArray(raw.celebrationsShown) ? raw.celebrationsShown : [],
    activityDates: Array.isArray(raw.activityDates)
      ? Array.from(
          new Set(
            (raw.activityDates as unknown[]).filter((d): d is string => typeof d === 'string'),
          ),
        ).sort()
      : [],
    cardStates:
      raw.cardStates && typeof raw.cardStates === 'object' && !Array.isArray(raw.cardStates)
        ? (raw.cardStates as Record<string, CardState>)
        : {},
    mockExamResults:
      raw.mockExamResults && typeof raw.mockExamResults === 'object'
        ? { ...raw.mockExamResults }
        : {},
    plan: raw.plan,
    completedLessonIds: raw.completedLessonIds,
    generatedMaterials: raw.generatedMaterials,
  };
  return profile;
}
