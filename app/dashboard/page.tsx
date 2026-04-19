'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.shadcn'
import { useProfile } from '@/lib/profile-context'
import StudentDashboard from '@/components/dashboard/StudentDashboard'
import TeacherDashboard from '@/components/dashboard/TeacherDashboard'
import ParentDashboard from '@/components/dashboard/ParentDashboard'

// -----------------------------------------------------------------------------
// /dashboard — Phase 3 role dispatcher.
//
// Resolves the active profile from ProfileProvider. If there is none, we push
// the visitor to the landing page where they can pick a role and start
// onboarding. While hydration is pending we show a transient "Loading…" card.
//
// Once a profile is in hand we render one of three role-specific dashboards.
// They each embed their own content container; we only supply the Navbar +
// Footer chrome here.
// -----------------------------------------------------------------------------

export default function DashboardPage() {
  const router = useRouter()
  const { hydrated, profile } = useProfile()

  useEffect(() => {
    if (hydrated && !profile) router.replace('/')
  }, [hydrated, profile, router])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/20">
        {!hydrated ? (
          <div className="container mx-auto px-4 py-12">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Loading…</CardTitle>
                <CardDescription>Reading your local profile.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        ) : profile ? (
          profile.role === 'teacher' ? (
            <TeacherDashboard profile={profile} />
          ) : profile.role === 'parent' ? (
            <ParentDashboard profile={profile} />
          ) : (
            <StudentDashboard profile={profile} />
          )
        ) : (
          <div className="container mx-auto px-4 py-12">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Redirecting…</CardTitle>
                <CardDescription>Taking you back to pick a role.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
