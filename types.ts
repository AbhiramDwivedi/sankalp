
export enum ProficiencyLevel {
  NOVICE_LOW = 'Novice Low',
  NOVICE_MID = 'Novice Mid',
  NOVICE_HIGH = 'Novice High',
  INTERMEDIATE_LOW = 'Intermediate Low',
  INTERMEDIATE_MID = 'Intermediate Mid',
  INTERMEDIATE_HIGH = 'Intermediate High'
}

// ---------------------------------------------------------------------------
// Band — user-facing 3-value coarse classification layered on top of the
// 6-value `ProficiencyLevel` enum. The enum stays the STAMP-aligned internal
// representation (drives plan selection, capstone tier matching, rubric
// display). The band is what we show to a student ("where I am"), what we
// tag each pack with ("which bucket does this sit in"), and what the level
// dial on Settings / Teacher / Parent lets a user pick.
//
//   foundations  — NOVICE_LOW / NOVICE_MID / NOVICE_HIGH    — L1 packs
//   intermediate — INTERMEDIATE_LOW / INTERMEDIATE_MID      — L2 packs
//   skilled      — INTERMEDIATE_HIGH                        — L3 stretch
// ---------------------------------------------------------------------------

export type Band = 'foundations' | 'intermediate' | 'skilled';

export const BAND_ORDER: Band[] = ['foundations', 'intermediate', 'skilled'];

export interface BandMeta {
  label: string;
  stampRange: string;
  description: string;
}

export const BAND_META: Record<Band, BandMeta> = {
  foundations: {
    label: 'Foundations',
    stampRange: 'STAMP 3–4',
    description:
      'Words, phrases, simple sentences on familiar topics. Build the vocabulary and structure that intermediate writing rests on.',
  },
  intermediate: {
    label: 'Intermediate',
    stampRange: 'STAMP 5',
    description:
      'Connected sentences, past and future time frames, paragraph writing. This is the target band for the FCPS 3-credit award.',
  },
  skilled: {
    label: 'Skilled',
    stampRange: 'STAMP 6+',
    description:
      'Narrative and opinion register, complex discourse, honors-level stretch. Past the 3-credit gate; polishing for higher benchmarks.',
  },
};

/** Derive the coarse band from a 6-value ProficiencyLevel. */
export function bandFromProficiency(level: ProficiencyLevel): Band {
  switch (level) {
    case ProficiencyLevel.NOVICE_LOW:
    case ProficiencyLevel.NOVICE_MID:
    case ProficiencyLevel.NOVICE_HIGH:
      return 'foundations';
    case ProficiencyLevel.INTERMEDIATE_LOW:
    case ProficiencyLevel.INTERMEDIATE_MID:
      return 'intermediate';
    case ProficiencyLevel.INTERMEDIATE_HIGH:
      return 'skilled';
    default:
      return 'foundations';
  }
}

/** Map a pack's `level: 1 | 2 | 3` to its display band. */
export function bandForPack(level: 1 | 2 | 3): Band {
  if (level === 1) return 'foundations';
  if (level === 2) return 'intermediate';
  return 'skilled';
}

/**
 * When a user picks a band from the level dial we need a concrete
 * ProficiencyLevel to drive plan selection. These are the "entry point" of
 * each band — the plan is the most relevant to someone just stepping into
 * the band rather than finishing it.
 */
export function defaultProficiencyForBand(band: Band): ProficiencyLevel {
  switch (band) {
    case 'foundations':
      return ProficiencyLevel.NOVICE_MID;
    case 'intermediate':
      return ProficiencyLevel.INTERMEDIATE_LOW;
    case 'skilled':
      return ProficiencyLevel.INTERMEDIATE_MID;
  }
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

/**
 * Phase 3 onwards the `StudentProfile` holds profiles for all three roles
 * (student / teacher / parent). The name is kept for BC with the 20+ consumers;
 * the `role` field discriminates and drives which dashboard is rendered.
 * For teacher / parent profiles `name` is the teacher/parent's own name and
 * `demoStudent` seeds a read-only "representative student" whose completion
 * state populates the demo dashboards.
 */
export type ProfileRole = 'student' | 'teacher' | 'parent';

/**
 * Read-only seeded roster member for Teacher / Parent demo dashboards. A
 * single demo student is sufficient for Phase 3 — the fields mirror the
 * subset of StudentProfile needed to compute streak, XP, plan progress, and
 * quick stats. Static after onboarding.
 */
export interface DemoStudent {
  name: string;
  currentLevel: ProficiencyLevel;
  /**
   * Coarse user-facing band derived from `currentLevel`. Persisted so a
   * Teacher / Parent can dial the demo student's band without churning the
   * ProficiencyLevel on every change.
   */
  currentBand: Band;
  completedTopicIds: string[];
  flashcardsMastered: string[];
  completedCapstoneIds: string[];
  activityDates: string[];
  selectedStudyPlanId?: string;
}

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

/**
 * One persisted speaking-practice attempt for a single prompt within a pack.
 * The audio Blob itself is NOT serialized to localStorage (Blobs aren't JSON-
 * serializable and would blow the storage quota anyway). Only the metadata
 * + self-check + optional AI evaluation persist. The recording lives in a
 * transient `URL.createObjectURL` while the panel is open. Added in 4.3.
 */
export interface SpeakingAttempt {
  promptIndex: number;
  selfCheck: Record<string, boolean>;
  aiEval?: EvaluationResult;
  recordedAt: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  currentLevel: ProficiencyLevel;
  /**
   * Coarse user-facing band derived from `currentLevel`. Set by onboarding
   * (student picks a band; we pick a default ProficiencyLevel for it) and
   * by the Settings level dial. `currentLevel` stays the precise STAMP-
   * aligned value; `currentBand` is the label we show in UI.
   */
  currentBand: Band;
  startDate: string;
  examDate: string;

  // Phase 3: which dashboard this profile renders. For teacher / parent the
  // `name` is the adult's name and `demoStudent` holds the representative
  // student whose state drives the dashboard.
  role?: ProfileRole;
  demoStudent?: DemoStudent;

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

  // Speaking-practice attempts, keyed by packId. Each entry is an array of
  // attempts (one per prompt index, last write wins). Audio blobs are NOT
  // persisted — only metadata + self-check + optional AI eval. Added in 4.3.
  speakingRecordings?: Record<string, SpeakingAttempt[]>;

  // ISO timestamp of the most recent JSON/PDF progress export. Stamped by
  // lib/exportProgress.downloadJsonExport (and the print-to-PDF flow) so the
  // teacher/parent can see when they last shared a snapshot. Added in 4.4.
  lastExportedAt?: string;

  // Legacy fields (kept optional so old localStorage records still parse):
  plan?: Unit[];
  completedLessonIds?: string[];
  generatedMaterials?: Record<string, Material>;
}

/**
 * Normalize a profile loaded from localStorage so legacy records work with the
 * new static-content code paths. Idempotent.
 */
function isBand(v: unknown): v is Band {
  return v === 'foundations' || v === 'intermediate' || v === 'skilled';
}

function migrateDemoStudent(raw: any): DemoStudent | undefined {
  if (!raw || typeof raw !== 'object') return undefined;
  const currentLevel = raw.currentLevel as ProficiencyLevel;
  const currentBand: Band = isBand(raw.currentBand)
    ? raw.currentBand
    : bandFromProficiency(currentLevel);
  return {
    name: typeof raw.name === 'string' ? raw.name : 'Student',
    currentLevel,
    currentBand,
    completedTopicIds: Array.isArray(raw.completedTopicIds) ? raw.completedTopicIds : [],
    flashcardsMastered: Array.isArray(raw.flashcardsMastered) ? raw.flashcardsMastered : [],
    completedCapstoneIds: Array.isArray(raw.completedCapstoneIds) ? raw.completedCapstoneIds : [],
    activityDates: Array.isArray(raw.activityDates)
      ? Array.from(
          new Set((raw.activityDates as unknown[]).filter((d): d is string => typeof d === 'string')),
        ).sort()
      : [],
    selectedStudyPlanId: typeof raw.selectedStudyPlanId === 'string' ? raw.selectedStudyPlanId : undefined,
  };
}

export function migrateProfile(raw: any): StudentProfile {
  const role: ProfileRole =
    raw.role === 'teacher' || raw.role === 'parent' ? raw.role : 'student';
  const currentLevel = raw.currentLevel as ProficiencyLevel;
  const currentBand: Band = isBand(raw.currentBand)
    ? raw.currentBand
    : bandFromProficiency(currentLevel);
  const profile: StudentProfile = {
    id: raw.id,
    name: raw.name,
    currentLevel,
    currentBand,
    startDate: raw.startDate,
    examDate: raw.examDate,
    role,
    demoStudent: migrateDemoStudent(raw.demoStudent),
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
    speakingRecordings:
      raw.speakingRecordings && typeof raw.speakingRecordings === 'object' && !Array.isArray(raw.speakingRecordings)
        ? (raw.speakingRecordings as Record<string, SpeakingAttempt[]>)
        : {},
    lastExportedAt: typeof raw.lastExportedAt === 'string' ? raw.lastExportedAt : undefined,
    plan: raw.plan,
    completedLessonIds: raw.completedLessonIds,
    generatedMaterials: raw.generatedMaterials,
  };
  return profile;
}
