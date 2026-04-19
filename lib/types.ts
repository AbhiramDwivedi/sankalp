// Fluency levels based on STAMP proficiency
export type FluencyLevel = 
  | 'novice-low' 
  | 'novice-mid' 
  | 'novice-high' 
  | 'intermediate-low' 
  | 'intermediate-mid'

export const FLUENCY_LEVELS: Record<FluencyLevel, { 
  label: string
  stampLevel: number
  description: string
  characteristics: string[]
}> = {
  'novice-low': {
    label: 'Novice-Low',
    stampLevel: 1,
    description: 'Words - isolated vocabulary',
    characteristics: [
      'Produces isolated words',
      'Limited vocabulary range',
      'May be difficult to understand even with contextual help',
      'Can produce some high-frequency words or phrases'
    ]
  },
  'novice-mid': {
    label: 'Novice-Mid',
    stampLevel: 2,
    description: 'Phrases - basic connections',
    characteristics: [
      'Communicates with words, lists, and simple phrases',
      'Expresses meaning by combining known elements',
      'Can be understood with effort by sympathetic readers',
      'Shows emerging control of basic vocabulary'
    ]
  },
  'novice-high': {
    label: 'Novice-High',
    stampLevel: 3,
    description: 'Simple Sentences',
    characteristics: [
      'Produces simple sentences on familiar topics',
      'Can express personal meaning in a basic way',
      'Generally understood by sympathetic readers',
      'Shows control of basic sentence structures'
    ]
  },
  'intermediate-low': {
    label: 'Intermediate-Low',
    stampLevel: 4,
    description: 'Strings of Sentences',
    characteristics: [
      'Creates with language by combining elements',
      'Can express personal meaning in original ways',
      'Generally understood by those accustomed to non-native writing',
      'Shows emerging control of connected discourse'
    ]
  },
  'intermediate-mid': {
    label: 'Intermediate-Mid',
    stampLevel: 5,
    description: 'Connected Sentences',
    characteristics: [
      'Handles successfully a variety of communicative tasks',
      'Provides and obtains information',
      'Writes with some detail about familiar topics',
      'Generally understood by those unaccustomed to non-native writing'
    ]
  }
}

// User types
export type UserRole = 'student' | 'parent' | 'teacher'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: string
  avatarUrl?: string
}

export interface StudentProfile extends User {
  role: 'student'
  gradeLevel: number
  fluencyLevel: FluencyLevel
  enrolledCourses: string[]
  linkedParentId?: string
  streak: number
  totalXp: number
}

export interface ParentProfile extends User {
  role: 'parent'
  linkedStudentIds: string[]
}

export interface TeacherProfile extends User {
  role: 'teacher'
  managedStudentIds: string[]
  assignedCourses: string[]
  school?: string
}

export type UserProfile = StudentProfile | ParentProfile | TeacherProfile

// Course & Content types
export interface Language {
  id: string
  name: string
  nativeName: string
  code: string
  script: string
  flag: string
}

export interface Course {
  id: string
  languageId: string
  title: string
  description: string
  levels: Level[]
  imageUrl?: string
}

export interface Level {
  id: string
  courseId: string
  name: string
  fluencyLevel: FluencyLevel
  stampLevel: number
  description: string
  topics: Topic[]
  totalWeeks: number
}

export interface Topic {
  id: string
  levelId: string
  name: string
  description: string
  weeks: Week[]
}

export interface Week {
  id: string
  topicId: string
  number: number
  title: string
  lessons: Lesson[]
  capstone?: Capstone
}

// Lesson types
export type LessonType = 'vocabulary' | 'grammar' | 'listening' | 'speaking' | 'culture'

export interface Lesson {
  id: string
  weekId: string
  title: string
  type: LessonType
  description: string
  duration: number // in minutes
  content: LessonContent
  exercises: Exercise[]
  order: number
}

export interface LessonContent {
  introduction?: string
  culturalNote?: string
  vocabulary?: VocabularyItem[]
  grammarRules?: GrammarRule[]
  audioClips?: AudioClip[]
  dialogues?: Dialogue[]
}

export interface VocabularyItem {
  id: string
  word: string
  transliteration: string
  translation: string
  partOfSpeech: string
  example?: string
  exampleTranslation?: string
  audioUrl?: string
  imageUrl?: string
}

export interface GrammarRule {
  id: string
  title: string
  explanation: string
  examples: {
    hindi: string
    transliteration: string
    english: string
  }[]
}

export interface AudioClip {
  id: string
  title: string
  audioUrl: string
  transcript: string
  transliteration: string
  translation: string
}

export interface Dialogue {
  id: string
  title: string
  context: string
  lines: {
    speaker: string
    text: string
    transliteration: string
    translation: string
    audioUrl?: string
  }[]
}

// Exercise types
export type ExerciseType = 
  | 'multiple-choice'
  | 'fill-in-blank'
  | 'matching'
  | 'drag-drop'
  | 'listening-comprehension'
  | 'speaking'
  | 'writing'
  | 'translation'

export interface Exercise {
  id: string
  lessonId: string
  type: ExerciseType
  question: string
  instructions?: string
  options?: string[]
  correctAnswer: string | string[]
  hint?: string
  audioUrl?: string
  imageUrl?: string
  points: number
}

// Capstone types
export interface Capstone {
  id: string
  weekId: string
  title: string
  description: string
  type: 'written' | 'oral' | 'project'
  requirements: string[]
  rubric: RubricItem[]
  dueDate?: string
}

export interface RubricItem {
  criteria: string
  description: string
  points: number
}

// Mock Exam types
export interface MockExam {
  id: string
  levelId: string
  title: string
  description: string
  duration: number // in minutes
  sections: ExamSection[]
  totalPoints: number
  passingScore: number
}

export interface ExamSection {
  id: string
  name: string
  type: 'reading' | 'writing' | 'listening' | 'speaking'
  instructions: string
  questions: ExamQuestion[]
  timeLimit?: number
  points: number
}

export interface ExamQuestion {
  id: string
  sectionId: string
  type: ExerciseType
  question: string
  options?: string[]
  correctAnswer: string | string[]
  points: number
  audioUrl?: string
  imageUrl?: string
  passage?: string
}

// Progress tracking
export interface LessonProgress {
  lessonId: string
  completed: boolean
  score: number
  attempts: number
  lastAttemptDate: string
  exerciseResults: {
    exerciseId: string
    correct: boolean
    answer: string
  }[]
}

export interface WeekProgress {
  weekId: string
  lessonsCompleted: number
  totalLessons: number
  capstoneSubmitted: boolean
  capstoneScore?: number
}

export interface CourseProgress {
  courseId: string
  currentLevelId: string
  currentWeekId: string
  currentLessonId: string
  lessonsCompleted: LessonProgress[]
  weekProgress: WeekProgress[]
  overallProgress: number // percentage
  startDate: string
  lastActivityDate: string
}

export interface ExamResult {
  examId: string
  studentId: string
  score: number
  totalPoints: number
  percentage: number
  passed: boolean
  sectionScores: {
    sectionId: string
    score: number
    totalPoints: number
  }[]
  completedAt: string
  duration: number // actual time taken
}

// Resource types for parents/teachers
export interface Resource {
  id: string
  title: string
  description: string
  type: 'curriculum' | 'rubric' | 'guide' | 'faq'
  content: string
  downloadUrl?: string
  forRoles: UserRole[]
}
