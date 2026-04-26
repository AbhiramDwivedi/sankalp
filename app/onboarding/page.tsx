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
import {
  ProficiencyLevel,
  BAND_META,
  BAND_ORDER,
  defaultProficiencyForBand,
} from '@/types'
import type { Band, ProfileRole, StudentProfile } from '@/types'
import { AVANT_RUBRIC_SUMMARY, calculateRecommendedDate } from '@/constants'
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

  const {
    hydrated,
    profiles,
    saveAllProfiles,
    switchProfile,
    hasPendingLocalMigration,
    pendingLocalProfiles,
    adoptLocalProfiles,
    discardLocalProfiles,
  } = useProfile()

  const [step, setStep] = useState<number>(initialRole ? 2 : 1)
  const [role, setRole] = useState<Role | ''>(initialRole)
  // For student / teacher `name` is the user's own name. For parent `name`
  // is the parent's own name and `childName` is the seeded demo-child label
  // (and, post-fix, drives ChildView greetings on the dashboard). See the
  // bug fix in handleStart() — pre-fix we built `"{ChildName}'s family"` and
  // stored it as profile.name, which made the dashboard greet "Welcome,
  // Soham's!". Now profile.name is always the adult's own name.
  const [name, setName] = useState<string>('')
  const [childName, setChildName] = useState<string>('')
  const [band, setBand] = useState<Band>('foundations')
  const [alreadyMessage, setAlreadyMessage] = useState<string>('')
  // Exam date is optional in onboarding: we pre-fill the level-recommended
  // default and let the user nudge it on StepConfirm. Stored as a YYYY-MM-DD
  // string so the native <input type="date"> binds cleanly. Re-derived from
  // the band when the band changes (and the user has not edited it manually).
  const [examDate, setExamDate] = useState<string>('')
  const [examDateTouched, setExamDateTouched] = useState<boolean>(false)

  // Onboarding carries the 3-band picker as the primary proficiency input.
  // The concrete ProficiencyLevel is derived for plan selection + legacy
  // consumers; power users can fine-tune from Settings later.
  const level: ProficiencyLevel = useMemo(
    () => defaultProficiencyForBand(band),
    [band],
  )

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

  // Re-derive the recommended exam date when the band/level changes — but
  // only when the user has not manually edited the field. Once they touch
  // the date input we treat their value as authoritative.
  useEffect(() => {
    if (examDateTouched) return
    setExamDate(calculateRecommendedDate(level))
  }, [level, examDateTouched])

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

  // Legacy-migration prompt. Runs at most once per device per user: a user
  // who was already using Sankalp before auth shipped has profiles in
  // localStorage; after their first sign-in we offer to copy them into the
  // new account. See lib/profile-context.tsx for the state machine.
  if (hydrated && hasPendingLocalMigration) {
    return (
      <Shell>
        <Card className="max-w-xl mx-auto">
          <CardHeader>
            <CardTitle>Bring your progress in?</CardTitle>
            <CardDescription>
              We found {pendingLocalProfiles.length}{' '}
              {pendingLocalProfiles.length === 1 ? 'profile' : 'profiles'} saved on
              this device from before you signed in
              {pendingLocalProfiles[0]?.name
                ? ` (including ${pendingLocalProfiles[0].name}${pendingLocalProfiles.length > 1 ? ' and others' : ''})`
                : ''}
              . Copy them into your account so your streak, XP, and completed
              packs follow you across devices?
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={async () => {
                await adoptLocalProfiles()
                router.push('/dashboard')
              }}
              className="flex-1"
            >
              Copy progress into my account
            </Button>
            <Button
              variant="outline"
              onClick={() => discardLocalProfiles()}
              className="flex-1"
            >
              Start fresh
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
        return role === 'student' ? "What's your name?" : role === 'parent' ? 'Tell us about you and your child' : 'Your name (teacher)'
      case 3:
        return role === 'student' ? 'Where are you on the Hindi ladder?' : "Where is your student on the Hindi ladder?"
      default:
        return 'Ready to start'
    }
  })()

  const canAdvance = (() => {
    if (step === 1) return !!role
    if (step === 2) {
      // Parent flow needs both the parent's own name AND the child's name —
      // they drive `profile.name` (greeting) and `demoStudent.name`
      // respectively. Other roles only need the single self-name.
      if (role === 'parent') {
        return name.trim().length >= 1 && childName.trim().length >= 1
      }
      return name.trim().length >= 1
    }
    if (step === 3) return !!band
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
    const trimmedChildName = childName.trim()
    // Prefer the user's edited exam date; fall back to the level-recommended
    // default if the field is somehow empty. examDate stays a required field
    // on StudentProfile, so we always commit a value.
    const finalExamDate = examDate || calculateRecommendedDate(level)
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
        currentBand: band,
        startDate: new Date().toISOString(),
        examDate: finalExamDate,
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
      // Teacher / Parent — `name` is always the adult's own name. For parent
      // we now also collect a separate `childName` (StepName renders two
      // inputs in the parent flow). The seeded demo student uses that
      // child's name; teacher falls through to a random Hindi first name.
      const demoName =
        role === 'parent'
          ? trimmedChildName || pickDefaultDemoName()
          : pickDefaultDemoName()
      const adultName =
        role === 'parent' ? trimmedName || 'Parent' : trimmedName || 'Teacher'
      const demo = seedDemoStudent(level, demoName)
      newProfile = {
        id,
        name: adultName,
        currentLevel: level,
        currentBand: band,
        startDate: new Date().toISOString(),
        examDate: finalExamDate,
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
                  {step === 2 && role === 'parent' && "Your name shows on your dashboard. The child's name labels the demo student card."}
                  {step === 2 && role === 'teacher' && 'Shows on your navbar; never leaves this device.'}
                  {step === 2 && role === 'student' && 'Shows on your dashboard and navbar.'}
                  {step === 3 && 'Three bands. Pick the one that fits today — you can switch from Settings later.'}
                  {step === 4 && 'Confirm and jump in. No account, nothing uploaded.'}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && <StepRole role={role} onChange={setRole} />}
            {step === 2 && (
              <StepName
                role={role as Role}
                name={name}
                childName={childName}
                onChange={setName}
                onChildChange={setChildName}
              />
            )}
            {step === 3 && <StepBand band={band} onChange={setBand} />}
            {step === 4 && (
              <StepConfirm
                role={role as Role}
                name={name}
                childName={childName}
                band={band}
                level={level}
                planTitle={matchedPlan.titleEnglish}
                planHeadline={matchedPlan.headline}
                examDate={examDate}
                recommendedExamDate={calculateRecommendedDate(level)}
                onExamDateChange={(next) => {
                  setExamDate(next)
                  setExamDateTouched(true)
                }}
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

function StepName({
  role,
  name,
  childName,
  onChange,
  onChildChange,
}: {
  role: Role
  name: string
  childName: string
  onChange: (v: string) => void
  onChildChange: (v: string) => void
}) {
  // Parent flow collects two names in a single step: the parent's own name
  // (drives the dashboard greeting "Welcome, {parentName}!") and the child's
  // name (labels the demo-student card and any future linked-child entry).
  // Pre-fix we only collected the child's name and stored "{Child}'s family"
  // as profile.name, which made the dashboard greet "Welcome, Soham's!".
  if (role === 'parent') {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Your name</Label>
          <Input
            id="name"
            autoFocus
            value={name}
            placeholder="e.g. Mrs. Sharma"
            onChange={(e) => onChange(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Shows in your dashboard greeting and the navbar.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="childName">Your child&rsquo;s name</Label>
          <Input
            id="childName"
            value={childName}
            placeholder="e.g. Aarav"
            onChange={(e) => onChildChange(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Labels the demo child card so the dashboard feels personal.
          </p>
        </div>
      </div>
    )
  }
  const label = role === 'teacher' ? 'Your name' : 'Your name'
  const placeholder = role === 'teacher' ? 'e.g. Ms. Sharma' : 'e.g. Priya'
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
          : 'Shows in the navbar. No email, no password.'}
      </p>
    </div>
  )
}

function StepBand({ band, onChange }: { band: Band; onChange: (v: Band) => void }) {
  return (
    <RadioGroup
      value={band}
      onValueChange={(v) => onChange(v as Band)}
      className="grid gap-3"
      aria-label="Select proficiency level"
    >
      {BAND_ORDER.map((b) => {
        const meta = BAND_META[b]
        const active = band === b
        return (
          <Label
            key={b}
            htmlFor={`band-${b}`}
            className={`flex items-start gap-4 rounded-lg border p-4 cursor-pointer transition-colors ${
              active
                ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <RadioGroupItem value={b} id={`band-${b}`} className="mt-1" />
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-foreground">{meta.label}</span>
                <span className="text-xs text-muted-foreground">{meta.stampRange}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{meta.description}</p>
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
  childName,
  band,
  level,
  planTitle,
  planHeadline,
  examDate,
  recommendedExamDate,
  onExamDateChange,
}: {
  role: Role
  name: string
  childName: string
  band: Band
  level: ProficiencyLevel
  planTitle: string
  planHeadline: string
  examDate: string
  recommendedExamDate: string
  onExamDateChange: (next: string) => void
}) {
  const meta = ROLE_META[role]
  const Icon = meta.icon
  const bandMeta = BAND_META[band]
  const trimmedName = name.trim()
  const trimmedChildName = childName.trim()
  // Parent confirmation card calls out both names so the user can see we
  // captured them correctly. Other roles continue to show a single name.
  const shownName =
    role === 'parent'
      ? `${trimmedName || 'Parent'} · Child: ${trimmedChildName || 'Your child'}`
      : trimmedName ||
        (role === 'teacher' ? 'Teacher' : 'Student')
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border p-4 space-y-3 bg-muted/40">
        <div className="flex items-center gap-2 flex-wrap">
          <Icon className="h-5 w-5 text-primary" />
          <Badge variant="secondary">{meta.title}</Badge>
          <span className="text-sm text-muted-foreground">{shownName}</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Band</p>
            <p className="font-semibold text-foreground">{bandMeta.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{bandMeta.stampRange}</p>
            <p className="text-xs text-muted-foreground/80 mt-1 italic">
              STAMP target: {level} — {AVANT_RUBRIC_SUMMARY[level]}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Study plan</p>
            <p className="font-semibold text-foreground">{planTitle}</p>
            <p className="text-xs text-muted-foreground mt-1 italic">{planHeadline}</p>
          </div>
        </div>
      </div>
      {/* Optional exam-date row. Pre-filled with the level-recommended
          default; the user can shift it without leaving the confirm step.
          We don't add a separate onboarding step for this — it's a single
          line of friction, not its own decision point. */}
      <div className="space-y-2">
        <Label htmlFor="onboarding-exam-date">
          Exam date{' '}
          <span className="text-xs text-muted-foreground font-normal">(optional)</span>
        </Label>
        <Input
          id="onboarding-exam-date"
          type="date"
          value={examDate}
          onChange={(e) => onExamDateChange(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          When do you take the STAMP test? Default:{' '}
          {recommendedExamDate} — change any time from Settings.
        </p>
      </div>
      {role !== 'student' && (
        <p className="text-sm text-muted-foreground">
          We'll seed a demo {role === 'parent' ? 'child' : 'student'} at the{' '}
          {bandMeta.label} band with realistic completions so your dashboard has
          something meaningful to look at.
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
