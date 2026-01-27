
export enum ProficiencyLevel {
  NOVICE_LOW = 'Novice Low',
  NOVICE_MID = 'Novice Mid',
  NOVICE_HIGH = 'Novice High',
  INTERMEDIATE_LOW = 'Intermediate Low',
  INTERMEDIATE_MID = 'Intermediate Mid',
  INTERMEDIATE_HIGH = 'Intermediate High'
}

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

export interface StudentProfile {
  id: string;
  name: string;
  currentLevel: ProficiencyLevel;
  startDate: string;
  examDate: string; 
  plan: Unit[];
  completedLessonIds: string[];
  generatedMaterials?: Record<string, Material>;
  evaluations?: Record<string, EvaluationResult[]>;
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
