'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useProfile } from '@/lib/profile-context'
import {
  HydratingShell,
  NoProfileShell,
  PageShell,
} from '@/components/route-helpers'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.shadcn'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge.shadcn'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  ShieldCheck,
  Info,
  ClipboardList,
  Download,
  FileText,
  UserPlus,
  Trash2,
  Check,
  GraduationCap,
  BookOpen,
  Users,
} from 'lucide-react'
import { downloadJsonExport } from '@/lib/exportProgress'
import {
  bandFromProficiency,
  defaultProficiencyForBand,
  type Band,
  type ProfileRole,
  type StudentGender,
  type StudentProfile,
} from '@/types'
import { studyPlanForLevel } from '@/content/studyPlans'
import { BandLevelDial } from '@/components/BandLevelDial'
import { calculateRecommendedDate } from '@/constants'
import { formatExamDate, parseExamDate } from '@/lib/examDate'
import { LinkedStudentsCard } from '@/components/settings/LinkedStudentsCard'
import { LinkedAdultsCard } from '@/components/settings/LinkedAdultsCard'
import { CoParentInviteCard } from '@/components/settings/CoParentInviteCard'

const ROLE_ICON: Record<ProfileRole, React.ComponentType<{ className?: string }>> = {
  student: GraduationCap,
  teacher: BookOpen,
  parent: Users,
}

// -----------------------------------------------------------------------------
// Settings page — Phase 2b minimum.
//
// - Name is editable; commits on blur.
// - Current proficiency level is read-only (Onboarding sets it; Phase 3 may
//   add a re-assess flow).
// - AI assessment toggle writes profile.aiAssessmentEnabled.
// - Links to /audit, /overview, /rubric.
// - Export progress wires lib/exportProgress.downloadJsonExport and stamps
//   profile.lastExportedAt. Print-to-PDF report overlay is deferred to Phase 3
//   (it was an App.tsx-level overlay in the Vite app).
// - No profile-CRUD here — that belongs to the Phase 3 role picker.
// -----------------------------------------------------------------------------

export default function SettingsPage() {
  const {
    hydrated,
    authUser,
    profile,
    profiles,
    activeId,
    setProfile,
    switchProfile,
    saveAllProfiles,
  } = useProfile()
  const [nameDraft, setNameDraft] = useState<string>('')
  const [profileNameDrafts, setProfileNameDrafts] = useState<Record<string, string>>({})

  if (!hydrated) return <HydratingShell />
  if (!profile) return <NoProfileShell title="Settings" />

  // nameDraft is null-initialised; sync when profile loads the first time.
  if (nameDraft === '' && profile.name) {
    // one-shot init; downstream blur handler takes over.
    setNameDraft(profile.name)
  }

  const handleNameCommit = () => {
    const trimmed = nameDraft.trim()
    if (!trimmed || trimmed === profile.name) return
    setProfile((p) => ({ ...p, name: trimmed }))
  }

  // Exam-date editor lives here (not a separate Card) so the active-profile
  // section reads like one panel: name, then exam date. We commit on change
  // because the native date input is already a deliberate "pick + commit"
  // gesture — a separate Save button would feel redundant. Invalid input
  // (browser-rejected dates) is silently ignored; the field stays bound to
  // the existing value.
  const handleExamDateCommit = (next: string) => {
    if (!next) return
    if (!parseExamDate(next)) return
    if (next === profile.examDate) return
    setProfile((p) => ({ ...p, examDate: next }))
  }

  const handleToggleAi = (next: boolean) => {
    setProfile((p) => ({ ...p, aiAssessmentEnabled: next }))
  }

  const handleExport = () => {
    const exportedAt = downloadJsonExport(profile)
    setProfile((p) => ({ ...p, lastExportedAt: exportedAt }))
  }

  const handleGenderChange = (next: StudentGender) => {
    setProfile((p) => ({ ...p, gender: next }))
  }

  const handleBandChange = (nextBand: Band) => {
    // Derive a concrete ProficiencyLevel for the band (the entry-point) and
    // re-select the matching study plan. Completed lessons / capstones /
    // flashcards are left intact — the student keeps their progress as they
    // switch tracks.
    const nextLevel = defaultProficiencyForBand(nextBand)
    const nextPlanId = studyPlanForLevel(nextLevel).id
    setProfile((p) => ({
      ...p,
      currentBand: nextBand,
      currentLevel: nextLevel,
      selectedStudyPlanId: nextPlanId,
    }))
  }

  const updateProfileName = (id: string, name: string) => {
    const trimmed = name.trim()
    if (!trimmed) return
    const next = profiles.map((p) => (p.id === id ? { ...p, name: trimmed } : p))
    saveAllProfiles(next)
  }

  const deleteProfile = (id: string) => {
    if (profiles.length <= 1) return // never delete the last
    if (!confirm('Delete this profile? This cannot be undone.')) return
    const next = profiles.filter((p) => p.id !== id)
    saveAllProfiles(next)
    if (id === activeId) {
      switchProfile(next[0]?.id ?? null)
    }
  }

  const makeActive = (id: string) => {
    switchProfile(id)
  }

  return (
    <PageShell>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Your profile, progress, and connections. Synced to your account.
          </p>
        </div>

        {/* Connections (role-aware) --------------------------------- */}
        {authUser && (profile.role === 'parent' || profile.role === 'teacher') ? (
          <LinkedStudentsCard
            adultProfileId={profile.id}
            adultUserId={authUser.id}
            relationshipWord={profile.role === 'parent' ? 'children' : 'students'}
          />
        ) : null}
        {authUser && profile.role === 'parent' ? (
          <CoParentInviteCard
            adultProfileId={profile.id}
            adultUserId={authUser.id}
          />
        ) : null}
        {authUser && (profile.role ?? 'student') === 'student' ? (
          <LinkedAdultsCard />
        ) : null}

        {/* Your profiles ---------------------------------------------- */}
        <Card>
          <CardHeader>
            <CardTitle>Your profiles</CardTitle>
            <CardDescription>
              One active profile drives the dashboard. Switch to see a different view, or add a new one.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {profiles.map((p) => {
              const role = (p.role ?? 'student') as ProfileRole
              const Icon = ROLE_ICON[role]
              const isActive = p.id === activeId
              const draft = profileNameDrafts[p.id] ?? p.name
              return (
                <div
                  key={p.id}
                  className={`flex flex-col sm:flex-row sm:items-center gap-3 rounded-lg border p-3 ${
                    isActive ? 'border-primary/60 bg-primary/5' : 'border-border'
                  }`}
                >
                  <Icon className="h-5 w-5 text-primary shrink-0" aria-hidden />
                  <div className="flex-1 flex items-center gap-2 min-w-0">
                    <Input
                      value={draft}
                      onChange={(e) =>
                        setProfileNameDrafts((prev) => ({ ...prev, [p.id]: e.target.value }))
                      }
                      onBlur={() => updateProfileName(p.id, draft)}
                      aria-label={`Edit name for profile ${p.name}`}
                    />
                    <Badge variant="secondary" className="capitalize shrink-0">{role}</Badge>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {isActive ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                        <Check className="h-3.5 w-3.5" /> Active
                      </span>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => makeActive(p.id)}>
                        Set active
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteProfile(p.id)}
                      disabled={profiles.length <= 1}
                      aria-label={`Delete profile ${p.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/onboarding">
                <UserPlus className="mr-2 h-4 w-4" />
                Create new profile
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Profile card -------------------------------------------------- */}
        <Card>
          <CardHeader>
            <CardTitle>Active profile</CardTitle>
            <CardDescription>The name and exam date that drive your dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="student-name">Name</Label>
              <Input
                id="student-name"
                value={nameDraft}
                onChange={(e) => setNameDraft(e.target.value)}
                onBlur={handleNameCommit}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="exam-date">Exam date</Label>
              <Input
                id="exam-date"
                type="date"
                value={profile.examDate || ''}
                onChange={(e) => handleExamDateCommit(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                When you take the STAMP test. Drives the dashboard countdown and
                the pacing-options nudge.
                {' '}
                <span className="text-muted-foreground/80">
                  Recommended for your level:{' '}
                  {formatExamDate(calculateRecommendedDate(profile.currentLevel)) ?? '—'}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Gender (student profiles only) -------------------------------- */}
        {(profile.role ?? 'student') === 'student' ? (
          <Card>
            <CardHeader>
              <CardTitle>Gender</CardTitle>
              <CardDescription>
                We use this to render Hindi grammar in the right form (verbs,
                adjectives). Default is male. You can change this any time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={profile.gender ?? 'male'}
                onValueChange={(v) => handleGenderChange(v as StudentGender)}
                className="grid gap-3 sm:grid-cols-2"
                aria-label="Select speaker gender for Hindi grammar"
              >
                {(['male', 'female'] as const).map((g) => {
                  const active = (profile.gender ?? 'male') === g
                  const label = g === 'male' ? 'Male' : 'Female'
                  const example =
                    g === 'male'
                      ? 'मैं गया · मैं खुश हूँ · मैंने देखा'
                      : 'मैं गई · मैं खुश हूँ · मैंने देखा'
                  return (
                    <Label
                      key={g}
                      htmlFor={`gender-${g}`}
                      className={`flex items-start gap-2 rounded-lg border p-3 cursor-pointer transition-colors ${
                        active
                          ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                          : 'border-border hover:border-primary/40'
                      }`}
                    >
                      <RadioGroupItem
                        value={g}
                        id={`gender-${g}`}
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="font-semibold text-foreground">
                          {label}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">
                          {example}
                        </p>
                      </div>
                    </Label>
                  )
                })}
              </RadioGroup>
            </CardContent>
          </Card>
        ) : null}

        {/* Level dial ---------------------------------------------------- */}
        <BandLevelDial
          value={profile.currentBand ?? bandFromProficiency(profile.currentLevel)}
          title="Your level"
          description="Three bands map the curriculum. Pick the one that matches where you are today — your study plan adjusts."
          confirmDescription="Changing your level will re-sequence your study plan. Completed lessons and mastered flashcards stay completed. Continue?"
          onConfirm={handleBandChange}
        />

        {/* AI toggle ----------------------------------------------------- */}
        <Card>
          <CardHeader>
            <CardTitle>AI writing feedback</CardTitle>
            <CardDescription>
              Optional Gemini pass on your essays. When off, prompts stay read-only.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  {profile.aiAssessmentEnabled ? 'Enabled' : 'Disabled'}
                </p>
                <p className="text-xs text-muted-foreground">
                  Requires a GEMINI_API_KEY in your build — the app still works without one.
                </p>
              </div>
              <Switch
                checked={!!profile.aiAssessmentEnabled}
                onCheckedChange={handleToggleAi}
                aria-label="AI assessment toggle"
              />
            </div>
          </CardContent>
        </Card>

        {/* References ---------------------------------------------------- */}
        <Card>
          <CardHeader>
            <CardTitle>References</CardTitle>
            <CardDescription>
              The rubric, the credit audit, and the five-minute "how this works" primer.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2 sm:grid-cols-3">
            <Button variant="outline" asChild>
              <Link href="/rubric">
                <ClipboardList className="mr-2 h-4 w-4" />
                Rubric
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/audit">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Credit audit
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/overview">
                <Info className="mr-2 h-4 w-4" />
                Overview
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Export -------------------------------------------------------- */}
        <Card>
          <CardHeader>
            <CardTitle>Export progress</CardTitle>
            <CardDescription>
              A sanitized JSON snapshot (no free-form AI scratch). Share with a teacher or
              parent.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Download JSON
              </Button>
              {/* Print-to-PDF report overlay was an App.tsx-level overlay in the
               * Vite app; Phase 3 rewires it into /progress-report. */}
              <Button variant="outline" disabled>
                <FileText className="mr-2 h-4 w-4" />
                Print report (Phase 3)
              </Button>
            </div>
            {profile.lastExportedAt && (
              <p className="text-xs text-muted-foreground">
                Last exported {new Date(profile.lastExportedAt).toLocaleString()}.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
