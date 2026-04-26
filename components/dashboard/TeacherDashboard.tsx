'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.shadcn'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge.shadcn'
import {
  Flame,
  Sparkles,
  Users,
  BookOpen,
  ShieldCheck,
  ClipboardList,
  AlertCircle,
  Info,
  Mail,
  UserPlus,
} from 'lucide-react'
import type { StudentLink, StudentProfile, Band } from '@/types'
import { BAND_META, bandFromProficiency, defaultProficiencyForBand } from '@/types'
import { computeStreak } from '@/lib/streak'
import { computeXp } from '@/lib/xp'
import { TOPIC_PACKS } from '@/content'
import { CAPSTONES } from '@/content/capstones'
import { studyPlanForLevel } from '@/content/studyPlans'
import { useProfile } from '@/lib/profile-context'
import { BandLevelDial } from '@/components/BandLevelDial'
import { describeExamCountdown } from '@/lib/examDate'
import {
  listAdultLinks,
  loadAcceptedStudents,
  updateLinkedStudentPath,
} from '@/lib/studentLinks'

// -----------------------------------------------------------------------------
// TeacherDashboard — when signed in, reads the teacher's accepted student
// links from public.student_links and renders them as a roster. Falls back
// to the seeded demoStudent only when there is no auth session (E2E suite,
// public-route preview). The path-dial editor writes through
// `update_linked_student_path` so the teacher can re-set a student's level /
// study plan without owning the row.
// -----------------------------------------------------------------------------

type RosterEntry = { link: StudentLink; profile: StudentProfile }

export default function TeacherDashboard({ profile }: { profile: StudentProfile }) {
  const { authUser, setProfile } = useProfile()
  const totalPacks = TOPIC_PACKS.length
  const totalCaps = CAPSTONES.length

  const [students, setStudents] = useState<RosterEntry[] | null>(null)
  const [pendingCount, setPendingCount] = useState(0)
  const [updating, setUpdating] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    if (!authUser) {
      setStudents([])
      setPendingCount(0)
      return
    }
    const [accepted, all] = await Promise.all([
      loadAcceptedStudents({
        adultUserId: authUser.id,
        adultProfileId: profile.id,
      }),
      listAdultLinks(authUser.id),
    ])
    setStudents(accepted)
    setPendingCount(
      all.filter(
        (l) => l.status === 'pending' && l.adultProfileId === profile.id,
      ).length,
    )
  }, [authUser, profile.id])

  useEffect(() => {
    refresh()
  }, [refresh])

  // Linked-student path-dial writer. Goes through the SECURITY DEFINER
  // function so the teacher can update the student's level even though they
  // don't own that profile row. We optimistically update local state, then
  // refresh from the DB to be sure.
  const handleStudentBandChange = async (studentProfileId: string, nextBand: Band) => {
    const nextLevel = defaultProficiencyForBand(nextBand)
    const nextPlanId = studyPlanForLevel(nextLevel).id
    setUpdating(studentProfileId)
    setStudents((prev) =>
      prev
        ? prev.map((row) =>
            row.profile.id === studentProfileId
              ? {
                  ...row,
                  profile: {
                    ...row.profile,
                    currentBand: nextBand,
                    currentLevel: nextLevel,
                    selectedStudyPlanId: nextPlanId,
                  },
                }
              : row,
          )
        : prev,
    )
    const { error } = await updateLinkedStudentPath({
      studentProfileId,
      currentLevel: nextLevel,
      currentBand: nextBand,
      selectedStudyPlanId: nextPlanId,
      examDate: null,
    })
    setUpdating(null)
    if (error) {
      toast.error(error)
      refresh()
      return
    }
    toast.success('Student level updated.')
    refresh()
  }

  // Demo-mode fallback (no signed-in user — e.g. E2E auth bypass). Mutates
  // the teacher's own profile blob so the navbar pills + dashboard stay in
  // sync. In production this branch never runs because middleware enforces
  // a session before reaching /dashboard.
  const handleDemoBandChange = (nextBand: Band) => {
    const nextLevel = defaultProficiencyForBand(nextBand)
    const nextPlanId = studyPlanForLevel(nextLevel).id
    setProfile((p) => {
      if (!p.demoStudent) return p
      return {
        ...p,
        demoStudent: {
          ...p.demoStudent,
          currentBand: nextBand,
          currentLevel: nextLevel,
          selectedStudyPlanId: nextPlanId,
        },
      }
    })
  }

  // Roster rows — drawn either from real linked students (when signed in) or
  // from the seeded demo student (no-auth fallback). Either way the row
  // shape is the same so the table renders identically.
  type Row = {
    id: string
    name: string
    currentLevel: string
    currentBand: Band
    xp: number
    streak: number
    progressPct: number
    examDateLabel: string // pre-computed countdown string (e.g. "in 87d", "passed", "—")
    profileId?: string // present only for real linked students
  }

  const isDemoMode = !authUser
  const demo = profile.demoStudent
  const demoBand = demo
    ? (demo.currentBand ?? bandFromProficiency(demo.currentLevel))
    : null

  let rows: Row[] = []
  if (isDemoMode && demo) {
    const xp = computeXp({
      completedTopicIds: demo.completedTopicIds,
      completedCapstoneIds: demo.completedCapstoneIds,
      flashcardsMastered: demo.flashcardsMastered,
      evaluations: {},
      speakingRecordings: {},
    })
    const streak = computeStreak(demo.activityDates)
    const totalItems = totalPacks + totalCaps
    const doneItems = demo.completedTopicIds.length + demo.completedCapstoneIds.length
    const progressPct = totalItems ? Math.round((doneItems / totalItems) * 100) : 0
    const demoCountdown = describeExamCountdown(profile.examDate)
    rows = [
      {
        id: 'demo',
        name: demo.name,
        currentLevel: demo.currentLevel,
        currentBand: demoBand!,
        xp,
        streak,
        progressPct,
        examDateLabel: examLabelFor(demoCountdown),
      },
    ]
  } else if (students) {
    rows = students.map(({ link, profile: s }) => {
      const xp = computeXp(s)
      const streak = computeStreak(s.activityDates)
      const totalItems = totalPacks + totalCaps
      const doneItems =
        (s.completedTopicIds || []).length + (s.completedCapstoneIds || []).length
      const progressPct = totalItems ? Math.round((doneItems / totalItems) * 100) : 0
      const band = s.currentBand ?? bandFromProficiency(s.currentLevel)
      const countdown = describeExamCountdown(s.examDate)
      return {
        id: link.id,
        name: s.name || link.invitedEmail,
        currentLevel: s.currentLevel,
        currentBand: band,
        xp,
        streak,
        progressPct,
        examDateLabel: examLabelFor(countdown),
        profileId: s.id,
      }
    })
  }

  const avgStreak = rows.length
    ? Math.round(rows.reduce((a, r) => a + r.streak, 0) / rows.length)
    : 0
  const avgXp = rows.length
    ? Math.round(rows.reduce((a, r) => a + r.xp, 0) / rows.length)
    : 0

  const bandDistribution = rows.reduce<Record<string, number>>((acc, r) => {
    const label = BAND_META[r.currentBand].label
    acc[label] = (acc[label] || 0) + 1
    return acc
  }, {})

  const teacherFirst = profile.name.split(/\s+/)[0] || profile.name
  const isLoading = !isDemoMode && students === null

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Demo / status banner ------------------------------------------------ */}
      {isDemoMode ? (
        <div
          role="note"
          className="flex items-start gap-3 rounded-lg border border-amber-300/50 bg-amber-50 dark:bg-amber-950/30 p-4 text-amber-900 dark:text-amber-100"
        >
          <Info className="h-5 w-5 mt-0.5 shrink-0" aria-hidden />
          <div className="text-sm">
            <p className="font-medium">Demo mode</p>
            <p className="text-amber-900/80 dark:text-amber-100/80">
              Sign in to invite real students. This view shows one seeded demo student
              so you can see what the teacher dashboard looks like.
            </p>
          </div>
        </div>
      ) : pendingCount > 0 ? (
        <div
          role="note"
          className="flex items-start justify-between gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4 text-foreground"
        >
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 mt-0.5 shrink-0 text-primary" aria-hidden />
            <div className="text-sm">
              <p className="font-medium">
                {pendingCount} pending invite{pendingCount === 1 ? '' : 's'}
              </p>
              <p className="text-muted-foreground">
                Tell each invited student to sign in with the email you sent the invite to,
                then accept it from their Settings page.
              </p>
            </div>
          </div>
          <Button asChild size="sm" variant="outline">
            <Link href="/settings">Manage</Link>
          </Button>
        </div>
      ) : null}

      {/* Welcome ------------------------------------------------------------ */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Welcome, {teacherFirst}!
          </h1>
          <p className="text-muted-foreground mt-1">Hindi · FCPS STAMP 2S/WS preparation</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {!isDemoMode ? (
            <Button asChild variant="outline">
              <Link href="/settings">
                <UserPlus className="mr-2 h-4 w-4" />
                Invite a student
              </Link>
            </Button>
          ) : null}
          <Button asChild variant="outline">
            <Link href="/lessons">
              <BookOpen className="mr-2 h-4 w-4" />
              Browse curriculum
            </Link>
          </Button>
        </div>
      </div>

      {/* Overview stats ---------------------------------------------------- */}
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard label="Total students" value={String(rows.length)} icon={Users} />
        <StatCard label="Avg. streak" value={`${avgStreak}d`} icon={Flame} />
        <StatCard label="Avg. XP" value={String(avgXp)} icon={Sparkles} />
        <StatCard label="Active course" value="Hindi" icon={BookOpen} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Roster ----------------------------------------------------------- */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Students</CardTitle>
              <CardDescription>
                {isDemoMode
                  ? 'Demo roster — sign in to connect real students.'
                  : 'Students who have accepted your invite.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-sm text-muted-foreground">Loading roster…</p>
              ) : rows.length === 0 ? (
                <div className="rounded-md border border-dashed p-6 text-sm">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div className="space-y-2">
                      <p className="text-foreground">
                        No connected students yet.
                      </p>
                      <p className="text-muted-foreground">
                        Invite a student from Settings — they accept on their next sign-in
                        and you&rsquo;ll see their progress here.
                      </p>
                      <Button asChild size="sm">
                        <Link href="/settings">
                          <UserPlus className="mr-2 h-4 w-4" />
                          Invite a student
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                        <th className="py-2 pr-4">Name</th>
                        <th className="py-2 pr-4">Level</th>
                        <th className="py-2 pr-4">Streak</th>
                        <th className="py-2 pr-4">XP</th>
                        <th className="py-2 pr-4">Progress</th>
                        <th className="py-2 pr-4">Exam</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row) => (
                        <tr key={row.id} className="border-b border-border last:border-0">
                          <td className="py-3 pr-4 font-medium text-foreground">{row.name}</td>
                          <td className="py-3 pr-4">
                            <Badge variant="secondary" title={`STAMP: ${row.currentLevel}`}>
                              {BAND_META[row.currentBand].label}
                            </Badge>
                          </td>
                          <td className="py-3 pr-4">
                            <span className="inline-flex items-center gap-1">
                              <Flame className="h-3.5 w-3.5 text-primary" />
                              {row.streak}d
                            </span>
                          </td>
                          <td className="py-3 pr-4">
                            <span className="inline-flex items-center gap-1">
                              <Sparkles className="h-3.5 w-3.5 text-primary" />
                              {row.xp}
                            </span>
                          </td>
                          <td className="py-3 pr-4 min-w-[140px]">
                            <div className="flex items-center gap-2">
                              <Progress
                                value={row.progressPct}
                                className="flex-1"
                                aria-label={`${row.name} progress: ${row.progressPct}%`}
                              />
                              <span className="text-xs text-muted-foreground w-9 text-right">
                                {row.progressPct}%
                              </span>
                            </div>
                          </td>
                          <td className="py-3 pr-4 text-xs text-muted-foreground whitespace-nowrap">
                            {row.examDateLabel}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          {rows.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Band distribution</CardTitle>
                <CardDescription>
                  Where your roster sits across Foundations / Intermediate / Skilled.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(bandDistribution).map(([lvl, count]) => {
                  const max = Math.max(1, ...Object.values(bandDistribution))
                  const pct = Math.round((count / max) * 100)
                  return (
                    <div key={lvl}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-foreground">{lvl}</span>
                        <span className="text-muted-foreground">
                          {count} {count === 1 ? 'student' : 'students'}
                        </span>
                      </div>
                      <Progress value={pct} aria-label={`${lvl} band: ${count}`} />
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          ) : null}

          {/* Path-dial editors. One BandLevelDial per linked student in the
              real-data path, or one for the demo student in the fallback. */}
          {!isDemoMode && students && students.length > 0
            ? students.map(({ profile: s }) => {
                const band = s.currentBand ?? bandFromProficiency(s.currentLevel)
                const first = s.name.split(/\s+/)[0] || s.name
                return (
                  <BandLevelDial
                    key={s.id}
                    value={band}
                    title={`Adjust ${first}'s level`}
                    description="Their level + study plan re-sequence on save. Their completed packs and capstones stay; only the upcoming plan shifts."
                    confirmDescription={`Move ${s.name} to a new band? They keep their progress; only the upcoming plan re-sequences.`}
                    applyLabel={updating === s.id ? 'Saving…' : 'Update level'}
                    onConfirm={(next) => handleStudentBandChange(s.id, next)}
                    compact
                  />
                )
              })
            : null}
          {isDemoMode && demo && demoBand ? (
            <BandLevelDial
              value={demoBand}
              title={`Adjust ${demo.name}'s level`}
              description="Demo-student band. The level distribution and the plan preview above update immediately; seeded completions stay as-is."
              confirmDescription={`Move ${demo.name} to a new band? Their completed packs and capstones stay; only the upcoming plan re-sequences.`}
              applyLabel="Update demo student"
              onConfirm={handleDemoBandChange}
            />
          ) : null}
        </div>

        {/* Right column: Quick actions ------------------------------------- */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Button asChild variant="outline">
                <Link href="/lessons">
                  <BookOpen className="mr-2 h-4 w-4" />
                  View curriculum
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/rubric">
                  <ClipboardList className="mr-2 h-4 w-4" />
                  Assessment rubrics
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/audit">
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Credit audit
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Target</CardTitle>
              <CardDescription>FCPS STAMP 2S/WS (Writing + Speaking)</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                <span className="font-semibold text-foreground">Benchmark 5</span> (Intermediate Mid) earns
                3 FCPS world language credits.
              </p>
              <p>
                Every pack carries a teacher note explaining the rubric axis it trains — text-type,
                language control, or topic coverage.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Compact exam-date label for the roster table — full label is too noisy in
// a dense table cell, so we surface a short countdown ("87d", "today",
// "passed") and let the teacher click into Settings if they need to edit.
function examLabelFor(c: ReturnType<typeof describeExamCountdown>): string {
  if (c.kind === 'unset') return '—'
  if (c.kind === 'past') return 'passed'
  if (c.kind === 'today') return 'today'
  if (c.days === null) return '—'
  return `${c.days}d`
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
