'use client'

import { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Onboarding } from '@/components/Onboarding'
import { useProfile } from '@/lib/profile-context'
import { PageShell } from '@/components/route-helpers'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.shadcn'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ProficiencyLevel, type StudentProfile } from '@/types'

// -----------------------------------------------------------------------------
// Onboarding route.
//
// The landing page's CTAs hand off here with ?role=student|parent|teacher.
// Phase 2b wires only the student flow (which maps 1:1 to the existing
// Onboarding component). Teacher / parent roles land on a stub card so the
// route resolves cleanly; Phase 3 will fork them into their own setups.
// -----------------------------------------------------------------------------

function OnboardingRouteInner() {
  const router = useRouter()
  const search = useSearchParams()
  const role = (search?.get('role') || 'student').toLowerCase()
  const { profiles, saveAllProfiles, switchProfile } = useProfile()

  if (role === 'teacher' || role === 'parent') {
    return (
      <PageShell>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">
              {role === 'teacher' ? 'Teacher profile setup' : 'Parent profile setup'} coming
              in Phase 3
            </CardTitle>
            <CardDescription>
              Phase 2b ships the student flow only. In the meantime you can browse the
              same content through the student view.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-3">
            <Button asChild>
              <Link href="/onboarding?role=student">Set up a student profile</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Back to landing</Link>
            </Button>
          </CardContent>
        </Card>
      </PageShell>
    )
  }

  const handleComplete = (data: {
    name: string
    level: ProficiencyLevel
    examDate: string
    selectedStudyPlanId: string
  }) => {
    const newProfile: StudentProfile = {
      id:
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `profile-${Date.now()}`,
      name: data.name,
      currentLevel: data.level,
      startDate: new Date().toISOString(),
      examDate: data.examDate,
      completedTopicIds: [],
      completedCapstoneIds: [],
      flashcardsSeen: [],
      flashcardsMastered: [],
      activityDates: [],
      evaluations: {},
      aiAssessmentEnabled: false,
      howThisWorksSeen: false,
      selectedStudyPlanId: data.selectedStudyPlanId,
    }
    saveAllProfiles([...profiles, newProfile])
    switchProfile(newProfile.id)
    router.push('/how-this-works')
  }

  // Onboarding component is a full-screen interstitial with its own chrome
  // (orange hero + stepper), so bypass the Navbar/Footer shell on this route
  // to keep it identical to the legacy SPA experience.
  return <Onboarding onComplete={handleComplete} />
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={null}>
      <OnboardingRouteInner />
    </Suspense>
  )
}
