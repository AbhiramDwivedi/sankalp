
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
    plan: raw.plan,
    completedLessonIds: raw.completedLessonIds,
    generatedMaterials: raw.generatedMaterials,
  };
  return profile;
}
