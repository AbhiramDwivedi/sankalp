import type { StudentProfile, ParentProfile, TeacherProfile, CourseProgress } from '../types'

export const mockStudents: StudentProfile[] = [
  {
    id: 'student-1',
    email: 'arjun@example.com',
    name: 'Arjun Patel',
    role: 'student',
    createdAt: '2024-01-15',
    gradeLevel: 7,
    fluencyLevel: 'novice-low',
    enrolledCourses: ['hindi-course'],
    linkedParentId: 'parent-1',
    streak: 5,
    totalXp: 450
  },
  {
    id: 'student-2',
    email: 'priya@example.com',
    name: 'Priya Sharma',
    role: 'student',
    createdAt: '2024-01-20',
    gradeLevel: 8,
    fluencyLevel: 'novice-mid',
    enrolledCourses: ['hindi-course'],
    linkedParentId: 'parent-2',
    streak: 12,
    totalXp: 1250
  },
  {
    id: 'student-3',
    email: 'rahul@example.com',
    name: 'Rahul Gupta',
    role: 'student',
    createdAt: '2024-02-01',
    gradeLevel: 6,
    fluencyLevel: 'novice-low',
    enrolledCourses: ['hindi-course'],
    streak: 3,
    totalXp: 180
  }
]

export const mockParents: ParentProfile[] = [
  {
    id: 'parent-1',
    email: 'vikram.patel@example.com',
    name: 'Vikram Patel',
    role: 'parent',
    createdAt: '2024-01-14',
    linkedStudentIds: ['student-1']
  },
  {
    id: 'parent-2',
    email: 'meera.sharma@example.com',
    name: 'Meera Sharma',
    role: 'parent',
    createdAt: '2024-01-19',
    linkedStudentIds: ['student-2']
  }
]

export const mockTeachers: TeacherProfile[] = [
  {
    id: 'teacher-1',
    email: 'anjali.desai@example.com',
    name: 'Dr. Anjali Desai',
    role: 'teacher',
    createdAt: '2023-08-01',
    managedStudentIds: ['student-1', 'student-2', 'student-3'],
    assignedCourses: ['hindi-course'],
    school: 'Lincoln Middle School'
  }
]

export const mockCourseProgress: CourseProgress[] = [
  {
    courseId: 'hindi-course',
    currentLevelId: 'lv1',
    currentWeekId: 'w1',
    currentLessonId: 'l3',
    lessonsCompleted: [
      {
        lessonId: 'l1',
        completed: true,
        score: 95,
        attempts: 1,
        lastAttemptDate: '2024-03-10',
        exerciseResults: [
          { exerciseId: 'e1', correct: true, answer: 'Hello' },
          { exerciseId: 'e2', correct: true, answer: 'matched' },
          { exerciseId: 'e3', correct: true, answer: 'namaste' }
        ]
      },
      {
        lessonId: 'l2',
        completed: true,
        score: 85,
        attempts: 2,
        lastAttemptDate: '2024-03-12',
        exerciseResults: [
          { exerciseId: 'e6', correct: true, answer: 'माँ' },
          { exerciseId: 'e7', correct: false, answer: 'बहन' }
        ]
      }
    ],
    weekProgress: [
      {
        weekId: 'w1',
        lessonsCompleted: 2,
        totalLessons: 5,
        capstoneSubmitted: false
      }
    ],
    overallProgress: 15,
    startDate: '2024-03-01',
    lastActivityDate: '2024-03-15'
  }
]

// Demo credentials for testing
export const demoCredentials = {
  student: {
    email: 'arjun@example.com',
    password: 'demo123'
  },
  parent: {
    email: 'vikram.patel@example.com',
    password: 'demo123'
  },
  teacher: {
    email: 'anjali.desai@example.com',
    password: 'demo123'
  }
}
