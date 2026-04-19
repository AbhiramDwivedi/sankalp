'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { UserProfile, StudentProfile, ParentProfile, TeacherProfile, CourseProgress } from '../types'
import { mockStudents, mockParents, mockTeachers, mockCourseProgress } from '../data/mock-users'

interface AuthContextType {
  user: UserProfile | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (userData: RegisterData) => Promise<boolean>
  updateProgress: (progress: Partial<CourseProgress>) => void
  getStudentProgress: (studentId?: string) => CourseProgress | null
  getLinkedStudents: () => StudentProfile[]
}

interface RegisterData {
  email: string
  password: string
  name: string
  role: 'student' | 'parent' | 'teacher'
  gradeLevel?: number
  fluencyLevel?: string
  linkedStudentEmail?: string
  school?: string
}

const AuthContext = createContext<AuthContextType | null>(null)

const STORAGE_KEY = 'bhasha_user'
const PROGRESS_KEY = 'bhasha_progress'
const USERS_KEY = 'bhasha_users'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize localStorage with mock data
  useEffect(() => {
    const initializeData = () => {
      if (typeof window === 'undefined') return

      // Initialize users if not present
      const existingUsers = localStorage.getItem(USERS_KEY)
      if (!existingUsers) {
        const allUsers = [
          ...mockStudents.map(s => ({ ...s, password: 'demo123' })),
          ...mockParents.map(p => ({ ...p, password: 'demo123' })),
          ...mockTeachers.map(t => ({ ...t, password: 'demo123' }))
        ]
        localStorage.setItem(USERS_KEY, JSON.stringify(allUsers))
      }

      // Initialize progress if not present
      const existingProgress = localStorage.getItem(PROGRESS_KEY)
      if (!existingProgress) {
        const progressMap: Record<string, CourseProgress> = {}
        progressMap['student-1'] = mockCourseProgress[0]
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressMap))
      }

      // Check for existing session
      const savedUser = localStorage.getItem(STORAGE_KEY)
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser))
        } catch {
          localStorage.removeItem(STORAGE_KEY)
        }
      }
      setIsLoading(false)
    }

    initializeData()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    const foundUser = users.find((u: UserProfile & { password: string }) => 
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500))

    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    
    // Check if email already exists
    if (users.some((u: UserProfile) => u.email.toLowerCase() === userData.email.toLowerCase())) {
      return false
    }

    const newId = `${userData.role}-${Date.now()}`
    let newUser: UserProfile & { password: string }

    if (userData.role === 'student') {
      newUser = {
        id: newId,
        email: userData.email,
        password: userData.password,
        name: userData.name,
        role: 'student',
        createdAt: new Date().toISOString(),
        gradeLevel: userData.gradeLevel || 6,
        fluencyLevel: (userData.fluencyLevel as StudentProfile['fluencyLevel']) || 'novice-low',
        enrolledCourses: ['hindi-course'],
        streak: 0,
        totalXp: 0
      } as StudentProfile & { password: string }

      // Initialize progress for new student
      const progressMap = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}')
      progressMap[newId] = {
        courseId: 'hindi-course',
        currentLevelId: 'lv1',
        currentWeekId: 'w1',
        currentLessonId: 'l1',
        lessonsCompleted: [],
        weekProgress: [],
        overallProgress: 0,
        startDate: new Date().toISOString(),
        lastActivityDate: new Date().toISOString()
      }
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressMap))
    } else if (userData.role === 'parent') {
      // Find linked student
      const linkedStudent = users.find((u: UserProfile) => 
        u.email.toLowerCase() === userData.linkedStudentEmail?.toLowerCase() && u.role === 'student'
      )
      
      newUser = {
        id: newId,
        email: userData.email,
        password: userData.password,
        name: userData.name,
        role: 'parent',
        createdAt: new Date().toISOString(),
        linkedStudentIds: linkedStudent ? [linkedStudent.id] : []
      } as ParentProfile & { password: string }
    } else {
      newUser = {
        id: newId,
        email: userData.email,
        password: userData.password,
        name: userData.name,
        role: 'teacher',
        createdAt: new Date().toISOString(),
        managedStudentIds: [],
        assignedCourses: ['hindi-course'],
        school: userData.school
      } as TeacherProfile & { password: string }
    }

    users.push(newUser)
    localStorage.setItem(USERS_KEY, JSON.stringify(users))

    // Auto-login after registration
    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword))

    return true
  }

  const updateProgress = (progress: Partial<CourseProgress>) => {
    if (!user || user.role !== 'student') return

    const progressMap = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}')
    progressMap[user.id] = { ...progressMap[user.id], ...progress, lastActivityDate: new Date().toISOString() }
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressMap))
  }

  const getStudentProgress = (studentId?: string): CourseProgress | null => {
    const id = studentId || (user?.role === 'student' ? user.id : null)
    if (!id) return null

    const progressMap = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}')
    return progressMap[id] || null
  }

  const getLinkedStudents = (): StudentProfile[] => {
    if (!user) return []
    
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    
    if (user.role === 'parent') {
      const parent = user as ParentProfile
      return users.filter((u: UserProfile) => parent.linkedStudentIds.includes(u.id))
    }
    
    if (user.role === 'teacher') {
      const teacher = user as TeacherProfile
      return users.filter((u: UserProfile) => teacher.managedStudentIds.includes(u.id))
    }
    
    return []
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      logout, 
      register, 
      updateProgress,
      getStudentProgress,
      getLinkedStudents
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
