'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/context/auth-context'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { StudentDashboard } from '@/components/dashboard/student-dashboard'
import { ParentDashboard } from '@/components/dashboard/parent-dashboard'
import { TeacherDashboard } from '@/components/dashboard/teacher-dashboard'
import { Loader2 } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/20">
        {user.role === 'student' && <StudentDashboard />}
        {user.role === 'parent' && <ParentDashboard />}
        {user.role === 'teacher' && <TeacherDashboard />}
      </main>
      <Footer />
    </div>
  )
}
