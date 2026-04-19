'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.shadcn'
import { Badge } from '@/components/ui/badge.shadcn'
import { useProfile } from '@/lib/profile-context'
import { seedDemoStudent, pickDefaultDemoName } from '@/lib/seedDemoStudent'
import { ProficiencyLevel, bandFromProficiency } from '@/types'
import type { ProfileRole, StudentProfile } from '@/types'
import { PROFICIENCY_ORDER, AVANT_RUBRIC_SUMMARY, calculateRecommendedDate } from '@/constants'
import { studyPlanForLevel } from '@/content/studyPlans'
import {
  GraduationCap,
  Users,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  User,
  Trophy,
  Sparkles,
  CheckCircle2,
} from 'lucide-react'

// -----------------------------------------------------------------------------
// Onboarding route — Phase 3 rewrite. Replaces the Vite-era orange hero with
// a shadcn-card flow that lives inside the Navbar + Footer shell so the three
// role paths feel like part of the same product.
//
// Steps: role -> name -> level -> plan preview -> confirm. Query-param `role`
// locks step 1 when present. On submit:
//   - student  → create StudentProfile with the picked level
//   - teacher  → create profile with role:'teacher' + demoStudent seeded
//   - parent   → create profile with role:'parent'  + demoStudent seeded
// After save, switchProfile() + router.push('/dashboard').
//
// If the visitor already has a profile of the chosen role, skip to /dashboard
// with a tiny "already onboarded" note (Phase 3 keeps the UX simple — the
// user can still start a new profile from /settings).
// -----------------------------------------------------------------------------

type Role = ProfileRole

const ROLE_META: Record<Role, { title: string; blurb: string; icon: React.ComponentType<{ className?: string }> }> = {
  student: {
    title: 'Student',
    blurb: 'Work through packs and capstones at your own pace. Your streak, XP, and plan live on this device.',
    icon: GraduationCap,
  },
  parent: {
    title: 'Parent',
    blurb: "See where your child is on the STAMP ladder and what the exam asks of them. We'll seed a demo child to illustrate.",
    icon: Users,
  },
  teacher: {
    title: 'Teacher',
    blurb: 'Preview what a student sees, track a demo roster, and share the credit audit with your department.',
    icon: BookOpen,
  },
}

function OnboardingRouteInner() {
  const router = useRouter()
  const search = useSearchParams()
  const initialRole = ((): Role | '' => {
    const raw = (search?.get('role') || '').toLowerCase()
    return raw === 'student' || raw === 'parent' || raw === 'teacher' ? raw : ''
  })()

  const { hydrated, profiles, saveAllProfiles, switchProfile } = useProfile()

  const [step, setStep] = useState<number>(initialRole ? 2 : 1)
  const [role, setRole] = useState<Role | ''>(initialRole)
  const [name, setName] = useState<string>('')
  const [level, setLevel] = useState<ProficiencyLevel>(ProficiencyLevel.NOVICE_LOW)
  const [alreadyMessage, setAlreadyMessage] = useState<string>('')

  // If a profile of the chosen role already exists, bounce to /dashboard with
  // a heads-up message. Runs once hydration finishes and only for role-locked
  // entries (so a visitor landing on /onboarding without ?role= still gets
  // the picker).
  useEffect(() => {
    if (!hydrated) return
    if (!initialRole) return
    const match = profiles.find((p) => (p.role ?? 'student') === initialRole)
    if (match) {
      switchProfile(match.id)
      setAlreadyMessage(
        `You already have a ${initialRole} profile (${match.name}). Switch from Settings if you want a new one.`,
      )
      const t = setTimeout(() => router.replace('/dashboard'), 1200)
      return () => clearTimeout(t)
    }
  }, [hydrated, initialRole, profiles, switchProfile, router])

  const matchedPlan = useMemo(() => studyPlanForLevel(level), [level])

  if (alreadyMessage) {
    return (
      <Shell>
        <Card className="max-w-xl mx-auto">
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>{alreadyMessage}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/dashboard">Open dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </Shell>
    )
  }

  const totalSteps = 4 // 1 role · 2 name · 3 level · 4 confirm
  const stepTitle = (() => {
    switch (step) {
      case 1:
        return 'Choose your role'
      case 2:
        return role === 'student' ? "What's your name?" : role === 'parent' ? "What's your child's name?" : 'Your name (teacher)'
      case 3:
        return role === 'student' ? "What's your current Hindi level?" : "What's your student's Hindi level?"
      default:
        return 'Ready to start'
    }
  })()

  const canAdvance = (() => {
    if (step === 1) return !!role
    if (step === 2) return name.trim().length >= 1
    if (step === 3) return !!level
    return true
  })()

  function goNext() {
    if (!canAdvance) return
    if (step < 4) setStep(step + 1)
    else handleStart()
  }

  function goBack() {
    if (step <= 1) return
    // Don't let the user un-lock a role that came from the query string.
    if (initialRole && step === 2) return
    setStep(step - 1)
  }

  function handleStart() {
    if (!role) return
    const trimmedName = name.trim()
    const examDate = calculateRecommendedDate(level)
    const planId = matchedPlan.id

    const id =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `profile-${Date.now()}`

    let newProfile: StudentProfile

    if (role === 'student') {
      newProfile = {
        id,
        name: trimmedName || 'Student',
        currentLevel: level,
        currentBand: bandFromProficiency(level),
        startDate: new Date().toISOString(),
        examDate,
        role: 'student',
        completedTopicIds: [],
        completedCapstoneIds: [],
        flashcardsSeen: [],
        flashcardsMastered: [],
        activityDates: [],
        evaluations: {},
        aiAssessmentEnabled: false,
        howThisWorksSeen: false,
        selectedStudyPlanId: planId,
      }
    } else {
      // Teacher / Parent — `name` is the adult; seed a demo student. The
      // demo student's own name is what the teacher/parent entered (for a
      // parent "Aarav" feels right; for a teacher we fall back to a Hindi
      // first name if they typed their own name).
      const demoName =
        role === 'parent'
          ? trimmedName || pickDefaultDemoName()
          : pickDefaultDemoName()
      const adultName =
        role === 'parent' ? `${trimmedName || 'Parent'}'s family` : trimmedName || 'Teacher'
      const demo = seedDemoStudent(level, demoName)
      newProfile = {
        id,
        name: adultName,
        currentLevel: level,
        currentBand: bandFromProficiency(level),
        startDate: new Date().toISOString(),
        examDate,
        role,
        demoStudent: demo,
        completedTopicIds: [],
        completedCapstoneIds: [],
        flashcardsSeen: [],
        flashcardsMastered: [],
        activityDates: [],
        evaluations: {},
        aiAssessmentEnabled: false,
        howThisWorksSeen: true, // skip the student-centric intro
        selectedStudyPlanId: planId,
      }
    }

    saveAllProfiles([...profiles, newProfile])
    switchProfile(newProfile.id)
    router.push('/dashboard')
  }

  return (
    <Shell>
      <div className="max-w-2xl mx-auto">
        {/* Stepper */}
        <div className="flex items-center gap-2 mb-6" aria-label={`Step ${step} of ${totalSteps}`}>
          {Array.from({ length: totalSteps }, (_, i) => {
            const s = i + 1
            const active = s <= step
            return (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  active ? 'bg-primary' : 'bg-muted'
                }`}
              />
            )
          })}
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                {step === 1 ? (
                  <Sparkles className="h-5 w-5" />
                ) : step === 2 ? (
                  <User className="h-5 w-5" />
                ) : step === 3 ? (
                  <Trophy className="h-5 w-5" />
                ) : (
                  <CheckCircle2 className="h-5 w-5" />
                )}
              </div>
              <div>
                <CardTitle className="text-2xl md:text-3xl">{stepTitle}</CardTitle>
                <CardDescription>
                  {step === 1 && 'Pick the hat you wear when you open Sankalp.'}
                  {step === 2 && role === 'parent' && "We'll use this to label the demo student's card."}
                  {step === 2 && role === 'teacher' && 'Shows on your navbar; never leaves this device.'}
                  {step === 2 && role === 'student' && 'Shows on your dashboard and navbar.'}
                  {step === 3 && "This picks the study plan. You can change the level from Settings later."}
                  {step === 4 && 'Confirm and jump in. No account, nothing uploaded.'}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && <StepRole role={role} onChange={setRole} />}
            {step === 2 && (
              <StepName role={role as Role} name={name} onChange={setName} />
            )}
            {step === 3 && <StepLevel level={level} onChange={setLevel} />}
            {step === 4 && (
              <StepConfirm
                role={role as Role}
                name={name}
                level={level}
                planTitle={matchedPlan.titleEnglish}
                planHeadline={matchedPlan.headline}
              />
            )}

            <div className="flex items-center justify-between gap-3 pt-2">
              {step > 1 && !(initialRole && step === 2) ? (
                <Button variant="outline" onClick={goBack} type="button">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              ) : (
                <span />
              )}
              <Button onClick={goNext} disabled={!canAdvance} type="button">
                {step === 4 ? 'Start' : 'Continue'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Shell>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/20">
        <div className="container mx-auto px-4 py-12">{children}</div>
      </main>
      <Footer />
    </div>
  )
}

// ---------- Steps ----------------------------------------------------------

function StepRole({ role, onChange }: { role: Role | ''; onChange: (r: Role) => void }) {
  const roles: Role[] = ['student', 'parent', 'teacher']
  return (
    <RadioGroup
      value={role}
      onValueChange={(v) => onChange(v as Role)}
      className="grid gap-3"
      aria-label="Select role"
    >
      {roles.map((r) => {
        const meta = ROLE_META[r]
        const Icon = meta.icon
        const active = role === r
        return (
          <Label
            key={r}
            htmlFor={`role-${r}`}
            className={`flex items-start gap-4 rounded-lg border p-4 cursor-pointer transition-colors ${
              active ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'border-border hover:border-primary/50'
            }`}
          >
            <RadioGroupItem value={r} id={`role-${r}`} className="mt-1" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">{meta.title}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{meta.blurb}</p>
            </div>
          </Label>
        )
      })}
    </RadioGroup>
  )
}

function StepName({ role, name, onChange }: { role: Role; name: string; onChange: (v: string) => void }) {
  const label =
    role === 'parent' ? "Child's name" : role === 'teacher' ? 'Your name' : 'Your name'
  const placeholder = role === 'parent' ? 'e.g. Aarav' : role === 'teacher' ? 'e.g. Ms. Sharma' : 'e.g. Priya'
  return (
    <div className="space-y-2">
      <Label htmlFor="name">{label}</Label>
      <Input
        id="name"
        autoFocus
        value={name}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      <p className="text-xs text-muted-foreground">
        {role === 'student'
          ? "We'll show this on your dashboard."
          : role === 'parent'
            ? "We'll label the demo child card with this name."
            : 'Shows in the navbar. No email, no password.'}
      </p>
    </div>
  )
}

function StepLevel({ level, onChange }: { level: ProficiencyLevel; onChange: (v: ProficiencyLevel) => void }) {
  return (
    <RadioGroup
      value={level}
      onValueChange={(v) => onChange(v as ProficiencyLevel)}
      className="grid gap-2"
      aria-label="Select proficiency level"
    >
      {PROFICIENCY_ORDER.map((lvl) => {
        const active = level === lvl
        return (
          <Label
            key={lvl}
            htmlFor={`lvl-${lvl}`}
            className={`flex items-start gap-3 rounded-md border p-3 cursor-pointer transition-colors ${
              active ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'border-border hover:border-primary/40'
            }`}
          >
            <RadioGroupItem value={lvl} id={`lvl-${lvl}`} className="mt-1" />
            <div className="flex-1">
              <span className="font-medium text-foreground">{lvl}</span>
              <p className="text-xs text-muted-foreground mt-0.5">{AVANT_RUBRIC_SUMMARY[lvl]}</p>
            </div>
          </Label>
        )
      })}
    </RadioGroup>
  )
}

function StepConfirm({
  role,
  name,
  level,
  planTitle,
  planHeadline,
}: {
  role: Role
  name: string
  level: ProficiencyLevel
  planTitle: string
  planHeadline: string
}) {
  const meta = ROLE_META[role]
  const Icon = meta.icon
  const shownName = name.trim() || (role === 'parent' ? 'Your child' : role === 'teacher' ? 'Teacher' : 'Student')
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border p-4 space-y-3 bg-muted/40">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          <Badge variant="secondary">{meta.title}</Badge>
          <span className="text-sm text-muted-foreground">{shownName}</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Level</p>
            <p className="font-semibold text-foreground">{level}</p>
            <p className="text-xs text-muted-foreground mt-1">{AVANT_RUBRIC_SUMMARY[level]}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Study plan</p>
            <p className="font-semibold text-foreground">{planTitle}</p>
            <p className="text-xs text-muted-foreground mt-1 italic">{planHeadline}</p>
          </div>
        </div>
      </div>
      {role !== 'student' && (
        <p className="text-sm text-muted-foreground">
          We'll seed a demo {role === 'parent' ? 'child' : 'student'} with realistic completions at this
          level so your dashboard has something meaningful to look at.
        </p>
      )}
    </div>
  )
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={null}>
      <OnboardingRouteInner />
    </Suspense>
  )
}
