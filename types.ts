
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
// 6-value `ProficiencyLevel` enum. Every band is credit-relevant; we don't
// surface a post-credit "Skilled" tier because Benchmark 5 caps the FCPS
// award at 3 credits and anything above is decorative.
//
//   starter       — NOVICE_LOW / NOVICE_MID                  — STAMP 1–2  — 0 cr
//                   "Starter" packs (positionOnArc='foundations'): 7 packs.
//   foundations   — NOVICE_HIGH / INTERMEDIATE_LOW           — STAMP 3–4  — 1–2 cr
//                   "Building" packs (positionOnArc='building'): 12 packs.
//   intermediate  — INTERMEDIATE_MID / INTERMEDIATE_HIGH     — STAMP 5+   — 3 cr
//                   "Pushing-to-IM" packs (positionOnArc='pushing-to-IM'): 7 packs.
//
// Note the deliberate name overload: `Band 'foundations'` and the
// `PositionOnArc 'foundations'` literal exist in different namespaces. The
// pack-arc tag is a content-author concept (where in the difficulty arc
// this pack sits); the band is a UI concept (which row it shows under).
// They were aligned 1:1 before this rewrite and are now offset by one —
// `positionOnArc:'foundations'` packs surface under the `starter` band.
// ---------------------------------------------------------------------------

export type Band = 'starter' | 'foundations' | 'intermediate';

export const BAND_ORDER: Band[] = ['starter', 'foundations', 'intermediate'];

export interface BandMeta {
  label: string;
  stampRange: string;
  description: string;
}

export const BAND_META: Record<Band, BandMeta> = {
  starter: {
    label: 'Starter',
    stampRange: 'STAMP 1–2',
    description:
      'Words, memorized phrases, and short lists on the most familiar topics. Build the vocabulary base every later sentence rests on.',
  },
  foundations: {
    label: 'Foundations',
    stampRange: 'STAMP 3–4',
    description:
      'Simple sentences and strings of related ideas. The bridge from memorized chunks to connected paragraph writing — earns 1–2 FCPS credits.',
  },
  intermediate: {
    label: 'Intermediate',
    stampRange: 'STAMP 5',
    description:
      'Connected sentences, past and future time frames, paragraph writing. The target band — earns the full 3 FCPS credits.',
  },
};

/** Derive the coarse band from a 6-value ProficiencyLevel. */
export function bandFromProficiency(level: ProficiencyLevel): Band {
  switch (level) {
    case ProficiencyLevel.NOVICE_LOW:
    case ProficiencyLevel.NOVICE_MID:
      return 'starter';
    case ProficiencyLevel.NOVICE_HIGH:
    case ProficiencyLevel.INTERMEDIATE_LOW:
      return 'foundations';
    case ProficiencyLevel.INTERMEDIATE_MID:
    case ProficiencyLevel.INTERMEDIATE_HIGH:
      return 'intermediate';
    default:
      return 'starter';
  }
}

/**
 * Map a pack's content-author tag to its display band. We read
 * `rationale.positionOnArc` rather than the legacy `level: 1|2|3` because
 * L1 packs span both Starter and Foundations once the arc tag was
 * introduced (e.g. L1-08 Interests is `building`, not `foundations`). The
 * arc tag is the authoritative difficulty signal.
 */
export function bandForPack(pack: {
  rationale: { positionOnArc: 'foundations' | 'building' | 'pushing-to-IM' };
}): Band {
  switch (pack.rationale.positionOnArc) {
    case 'foundations':
      return 'starter';
    case 'building':
      return 'foundations';
    case 'pushing-to-IM':
      return 'intermediate';
    default: {
      // Exhaustiveness sentinel — if a new PositionOnArc value is added to
      // content/schema.ts, this fails loudly at runtime instead of silently
      // returning undefined. The unused `_exhaustive` binding gives TS a
      // chance to flag the switch as non-exhaustive at compile time too.
      const _exhaustive: never = pack.rationale.positionOnArc;
      throw new Error(`Unhandled positionOnArc: ${String(_exhaustive)}`);
    }
  }
}

/**
 * When a user picks a band from the level dial we need a concrete
 * ProficiencyLevel to drive plan selection. These are the "entry point" of
 * each band — the plan most relevant to someone just stepping into the
 * band rather than finishing it.
 *
 *   starter      → Novice Low      → Foundation Plan (36 wk)
 *   foundations  → Novice High     → Intermediate Bridge (24 wk)
 *   intermediate → Intermediate Low → Push Plan (24 wk, climbs to IM)
 */
export function defaultProficiencyForBand(band: Band): ProficiencyLevel {
  switch (band) {
    case 'starter':
      return ProficiencyLevel.NOVICE_LOW;
    case 'foundations':
      return ProficiencyLevel.NOVICE_HIGH;
    case 'intermediate':
      return ProficiencyLevel.INTERMEDIATE_LOW;
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

/**
 * Speaker gender used to render Hindi grammar in the right form (verbs,
 * adjectives, gendered participles). Optional — `undefined` is treated as
 * `'male'` everywhere the renderer or `<G>` primitive consumes it. Settable
 * from Settings; not collected during onboarding (avoiding flow churn).
 *
 * Today only the three anchor capstones (C01, C05, C10) carry gendered
 * `hindiMale` overrides; everything else falls back to the authored `hindi`
 * field. See content/HOUSE_STYLE.md "Gendered first-person content".
 */
export type StudentGender = 'male' | 'female';

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
  /**
   * Optional speaker gender. Drives Hindi gendered-form rendering for
   * student-role profiles. `undefined` is treated as `'male'`. Hidden in
   * the Settings UI for parent / teacher profiles (their `demoStudent`
   * doesn't carry a gender in v1).
   */
  gender?: StudentGender;
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

// ---------------------------------------------------------------------------
// Student links — parent/teacher ↔ student relationships.
//
// One row in `public.student_links` per relationship. Lifecycle:
//   pending  — adult has invited the email; student hasn't signed in yet
//              (or has signed in but hasn't accepted)
//   accepted — student approved; cross-profile reads + path-dial writes
//              are now permitted by RLS + the update_linked_student_path fn
//   revoked  — either side canceled. A fresh invite from the same adult
//              to the same email creates a new row; revoked rows stay for
//              audit.
// ---------------------------------------------------------------------------
export type StudentLinkStatus = 'pending' | 'accepted' | 'revoked';

/**
 * Discriminator on `student_links.kind` (added in migration 0004).
 *   'student'   — adult → student invite. The historical default; the row
 *                 attaches an adult to a single student profile.
 *   'co_parent' — parent → parent invite. On acceptance a SECURITY DEFINER
 *                 function fans out one fresh `kind='student'` row per
 *                 child the inviter currently has accepted, addressed
 *                 from the co-parent → that child. The original co_parent
 *                 row stays around as a record of the relationship.
 */
export type StudentLinkKind = 'student' | 'co_parent';

export interface StudentLink {
  id: string;
  adultProfileId: string;
  adultUserId: string;
  studentProfileId: string | null;
  studentUserId: string | null;
  invitedEmail: string;
  status: StudentLinkStatus;
  adultLabel: string | null;
  createdAt: string;
  acceptedAt: string | null;
  revokedAt: string | null;
  revokedBy: 'adult' | 'student' | null;
  /**
   * Defaults to 'student' for legacy rows written before migration 0004
   * (which added the column with a server-side default). Always populated
   * on rows read from the API after that migration is applied.
   */
  kind: StudentLinkKind;
}

/**
 * Normalize a profile loaded from localStorage so legacy records work with the
 * new static-content code paths. Idempotent.
 */
function isBand(v: unknown): v is Band {
  return v === 'starter' || v === 'foundations' || v === 'intermediate';
}

/**
 * Resolve a stored band value into the current Band union. Two legacy
 * cases existed before the credit-relevant rewrite:
 *   - `'skilled'`     — was post-credit honors tier; folds into 'intermediate'.
 *   - `'foundations'` — was the bottom band (NL/NM/NH); semantics shifted to
 *                       NH/IL. We can't reliably know the old vs. new meaning
 *                       from the literal alone, so we recompute from the
 *                       authoritative `currentLevel` value rather than
 *                       trusting the stored band literal.
 */
function resolveBand(rawBand: unknown, currentLevel: ProficiencyLevel): Band {
  if (rawBand === 'skilled') return 'intermediate';
  if (isBand(rawBand)) {
    // For 'foundations' specifically, recompute from currentLevel — a
    // user who picked 'foundations' under the old definition (NL/NM/NH)
    // could now belong in 'starter'. Trust the precise level over the
    // stored band.
    if (rawBand === 'foundations') return bandFromProficiency(currentLevel);
    return rawBand;
  }
  return bandFromProficiency(currentLevel);
}

function migrateDemoStudent(raw: any): DemoStudent | undefined {
  if (!raw || typeof raw !== 'object') return undefined;
  const currentLevel = raw.currentLevel as ProficiencyLevel;
  const currentBand: Band = resolveBand(raw.currentBand, currentLevel);
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

/**
 * Backwards-compat fix for the parent-greeting bug. Pre-fix, the onboarding
 * flow only collected the child's name and stored `"{ChildName}'s family"`
 * as `profile.name`, which made the dashboard greet "Welcome, Soham's!".
 * This rewrites that pattern back to the generic label "Parent" so the
 * greeting becomes "Welcome, Parent!" — not great, but at least correct.
 * The user can fix it from Settings (the Name input there is editable).
 *
 * Idempotent: only triggers when the role is 'parent', the name ends with
 * "'s family", AND the seeded demo student's name is the prefix. Anything
 * else passes through untouched.
 */
function fixParentNameLegacy(
  rawName: any,
  role: ProfileRole,
  demoStudent: DemoStudent | undefined,
): any {
  if (role !== 'parent') return rawName;
  if (typeof rawName !== 'string') return rawName;
  if (!demoStudent?.name) return rawName;
  const expectedBad = `${demoStudent.name}'s family`;
  if (rawName === expectedBad) return 'Parent';
  return rawName;
}

export function migrateProfile(raw: any): StudentProfile {
  const role: ProfileRole =
    raw.role === 'teacher' || raw.role === 'parent' ? raw.role : 'student';
  const currentLevel = raw.currentLevel as ProficiencyLevel;
  const currentBand: Band = resolveBand(raw.currentBand, currentLevel);
  const demoStudent = migrateDemoStudent(raw.demoStudent);
  const gender: StudentGender | undefined =
    raw.gender === 'male' || raw.gender === 'female' ? raw.gender : undefined;
  const profile: StudentProfile = {
    id: raw.id,
    name: fixParentNameLegacy(raw.name, role, demoStudent),
    currentLevel,
    currentBand,
    gender,
    startDate: raw.startDate,
    examDate: raw.examDate,
    role,
    demoStudent,
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
