'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
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
  BookOpen,
  ArrowRight,
  Target,
  CalendarDays,
  Layers,
  ClipboardList,
  Mail,
} from 'lucide-react'
import type { StudentProfile } from '@/types'
import { BAND_META, bandForPack, bandFromProficiency } from '@/types'
import { computeStreak, lastActivityLabel } from '@/lib/streak'
import { computeXp } from '@/lib/xp'
import { TOPIC_PACKS, getPack } from '@/content'
import { CAPSTONES, getCapstone } from '@/content/capstones'
import { DECKS } from '@/content/flashcards'
import {
  getStudyPlan,
  studyPlanForLevel,
  planCursor,
} from '@/content/studyPlans'
import { AVANT_RUBRIC_SUMMARY } from '@/constants'
import { toast } from 'sonner'
import { useProfile } from '@/lib/profile-context'
import {
  acceptPendingInvitesForCurrentUser,
  listStudentInvites,
} from '@/lib/studentLinks'

// -----------------------------------------------------------------------------
// StudentDashboard — Phase 3 dispatch target for role === 'student'.
// Built on the v0 card/progress primitives; cribs the plan-cursor logic from
// components/pages/DashboardView.tsx but renders in the Next.js shell.
// -----------------------------------------------------------------------------

export default function StudentDashboard({ profile }: { profile: StudentProfile }) {
  const { authUser } = useProfile()
  const [pendingInvites, setPendingInvites] = useState(0)

  // The student already proved they own the invited email by signing in,
  // so the manual Accept step on /settings is friction for the common case.
  // We auto-accept any pending invites addressed to their email and attach
  // them to this student profile, then refresh the count for the banner. If
  // auto-accept fails (network blip, RLS edge case), the banner falls back
  // to the manual Accept flow on /settings. Skipped when there's no real
  // auth session (E2E bypass path).
  useEffect(() => {
    if (!authUser) return
    let cancelled = false
    ;(async () => {
      const result = await acceptPendingInvitesForCurrentUser(profile.id)
      if (cancelled) return
      if (result.accepted > 0) {
        toast.success(
          `Connected with ${result.accepted} ${
            result.accepted === 1 ? 'adult' : 'adults'
          } who invited you. Manage from Settings.`,
        )
      }
      const links = await listStudentInvites()
      if (cancelled) return
      setPendingInvites(links.filter((l) => l.status === 'pending').length)
    })()
    return () => {
      cancelled = true
    }
  }, [authUser, profile.id])

  const completedPacks = profile.completedTopicIds || []
  const completedCaps = profile.completedCapstoneIds || []
  const masteredCards = profile.flashcardsMastered || []
  const totalPacks = TOPIC_PACKS.length
  const totalCaps = CAPSTONES.length
  const totalDecks = DECKS.length

  const streak = computeStreak(profile.activityDates)
  const streakLabel = lastActivityLabel(profile.activityDates)
  const xp = computeXp(profile)

  const plan =
    getStudyPlan(profile.selectedStudyPlanId) || studyPlanForLevel(profile.currentLevel)
  const cursor = planCursor(
    plan,
    completedPacks,
    completedCaps,
    profile.currentLevel,
    profile.deferredIds || [],
  )

  const nextPack = cursor.nextPackId ? getPack(cursor.nextPackId) : undefined
  const upcomingCapstone = cursor.upcomingCapstoneIds.length
    ? getCapstone(cursor.upcomingCapstoneIds[0])
    : undefined

  const currentWeek = plan.weeks.find((w) => w.weekIndex === cursor.currentWeekIndex)
  const weekPackDetails = (currentWeek?.packs || []).map((pid) => {
    const pack = getPack(pid)
    return {
      id: pid,
      titleEnglish: pack?.titleEnglish || pid,
      titleHindi: pack?.titleHindi || '',
      done: completedPacks.includes(pid),
    }
  })
  const weekCapstoneDetails = (currentWeek?.capstones || []).map((cid) => {
    const cap = getCapstone(cid)
    return {
      id: cid,
      titleEnglish: cap?.titleEnglish || cid,
      tier: cap?.tier || 'core',
      done: completedCaps.includes(cid),
    }
  })

  const pctPacks = totalPacks ? Math.round((completedPacks.length / totalPacks) * 100) : 0

  // Plan progress: count of finished plan items over total authored items in
  // the plan (packs + capstones). Uses planItemSequence-equivalent math but
  // inline to keep the component self-contained.
  const planTotalItems = plan.weeks.reduce(
    (s, w) => s + w.packs.length + (w.capstones?.length || 0),
    0,
  )
  const planDonePacks = plan.weeks
    .flatMap((w) => w.packs)
    .filter((pid) => completedPacks.includes(pid)).length
  const planDoneCaps = plan.weeks
    .flatMap((w) => w.capstones || [])
    .filter((cid) => completedCaps.includes(cid)).length
  const planDoneItems = planDonePacks + planDoneCaps
  const pctPlan = planTotalItems ? Math.round((planDoneItems / planTotalItems) * 100) : 0

  const firstName = profile.name.split(/\s+/)[0] || profile.name
  const band = profile.currentBand ?? bandFromProficiency(profile.currentLevel)
  const bandMeta = BAND_META[band]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Welcome back, {firstName}!
          </h1>
          <p className="text-muted-foreground mt-1">
            {streakLabel} · {bandMeta.label}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1.5 text-sm font-medium"
            aria-label={`${streak} day streak`}
          >
            <Flame className="h-4 w-4" aria-hidden />
            {streak} day streak
          </span>
          <span
            className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1.5 text-sm font-medium"
            aria-label={`${xp} XP`}
          >
            <Sparkles className="h-4 w-4" aria-hidden />
            {xp} XP
          </span>
        </div>
      </div>

      {pendingInvites > 0 ? (
        <div
          role="note"
          className="mb-6 flex items-start justify-between gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4 text-foreground"
        >
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 mt-0.5 shrink-0 text-primary" aria-hidden />
            <div className="text-sm">
              <p className="font-medium">
                {pendingInvites} pending invite{pendingInvites === 1 ? '' : 's'}
              </p>
              <p className="text-muted-foreground">
                A parent or teacher wants to follow your progress. Accept or decline from Settings.
              </p>
            </div>
          </div>
          <Button asChild size="sm" variant="outline">
            <Link href="/settings">Review</Link>
          </Button>
        </div>
      ) : null}

      {cursor.isAllDone ? (
        <Card className="mb-6 border-primary/50 bg-primary/5">
          <CardHeader>
            <CardTitle>Plan complete — you're exam-ready</CardTitle>
            <CardDescription>
              Every pack and capstone in {plan.titleEnglish} is done. Rehearse with a mock exam or
              review flashcards to keep warm.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-3 flex-wrap">
            <Button asChild>
              <Link href="/capstones">Take a mock exam</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/flashcards">Review flashcards</Link>
            </Button>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column: Continue Learning + This Week */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Continue Learning</CardTitle>
                  <CardDescription>
                    {plan.titleEnglish} · Week {cursor.currentWeekIndex} of {plan.durationWeeks}
                  </CardDescription>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <div className="text-2xl font-bold text-foreground">{pctPlan}%</div>
                  <div>plan done</div>
                </div>
              </div>
              <Progress
                value={pctPlan}
                className="mt-3"
                aria-label={`Study plan progress: ${pctPlan}%`}
              />
            </CardHeader>
            <CardContent className="space-y-4">
              {nextPack ? (
                <div className="rounded-lg border border-border p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Next Lesson</p>
                    <p className="font-semibold text-foreground">{nextPack.titleEnglish}</p>
                    <p className="text-xs text-muted-foreground font-hindi-display" lang="hi">
                      {nextPack.titleHindi}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {BAND_META[bandForPack(nextPack.level)].label} · {currentWeek?.focus}
                    </p>
                  </div>
                  <Button asChild>
                    <Link href={`/lessons/${nextPack.id}`}>
                      Start
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ) : upcomingCapstone ? (
                <div className="rounded-lg border border-border p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Capstone up next</p>
                    <p className="font-semibold text-foreground">{upcomingCapstone.titleEnglish}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {upcomingCapstone.tier === 'push' ? 'Push tier' : 'Core tier'}
                      {upcomingCapstone.isMockExam ? ` · Mock Exam (${upcomingCapstone.mockExamMinutes} min)` : ''}
                    </p>
                  </div>
                  <Button asChild>
                    <Link href={`/capstones/${upcomingCapstone.id}`}>
                      Start
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  You're between weeks — open the Library to pick a refresher.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>This Week's Lessons</CardTitle>
              <CardDescription>{currentWeek?.focus || 'Current week focus'}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {weekPackDetails.length === 0 && weekCapstoneDetails.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  This week is an overview week — jump to the next available pack.
                </p>
              ) : null}
              {weekPackDetails.map((p) => (
                <Link
                  key={p.id}
                  href={`/lessons/${p.id}`}
                  className="flex items-center justify-between rounded-md border border-border p-3 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        p.done ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}
                      aria-hidden
                    >
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{p.titleEnglish}</p>
                      <p className="text-xs text-muted-foreground font-hindi-display" lang="hi">
                        {p.titleHindi}
                      </p>
                    </div>
                  </div>
                  {p.done ? (
                    <Badge variant="secondary">Done</Badge>
                  ) : (
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </Link>
              ))}
              {weekCapstoneDetails.map((c) => (
                <Link
                  key={c.id}
                  href={`/capstones/${c.id}`}
                  className="flex items-center justify-between rounded-md border border-border p-3 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        c.done ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}
                      aria-hidden
                    >
                      <Target className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{c.titleEnglish}</p>
                      <p className="text-xs text-muted-foreground">
                        Capstone · {c.tier === 'push' ? 'Push tier' : 'Core tier'}
                      </p>
                    </div>
                  </div>
                  {c.done ? (
                    <Badge variant="secondary">Done</Badge>
                  ) : (
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right column: Level + Stats + Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge variant="secondary">{bandMeta.label}</Badge>
                <span className="text-xs text-muted-foreground">{bandMeta.stampRange}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {bandMeta.description}
              </p>
              <p className="text-xs text-muted-foreground/80 mt-2 italic">
                STAMP target: {profile.currentLevel}. {AVANT_RUBRIC_SUMMARY[profile.currentLevel]}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <StatRow label="Packs completed" value={`${completedPacks.length} / ${totalPacks}`} />
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Library</span>
                  <span className="font-medium text-foreground">{pctPacks}%</span>
                </div>
                <Progress value={pctPacks} aria-label={`Library completion: ${pctPacks}%`} />
              </div>
              <StatRow
                label="Flashcards mastered"
                value={`${masteredCards.length}`}
                hint={`${totalDecks} decks available`}
              />
              <StatRow label="Capstones" value={`${completedCaps.length} / ${totalCaps}`} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Button asChild variant="outline">
                <Link href="/flashcards">
                  <Layers className="mr-2 h-4 w-4" />
                  Flashcard drills
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/capstones">
                  <Target className="mr-2 h-4 w-4" />
                  Mock exam
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/plan">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  View plan
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/rubric">
                  <ClipboardList className="mr-2 h-4 w-4" />
                  Rubric
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function StatRow({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        {hint ? <p className="text-xs text-muted-foreground/80">{hint}</p> : null}
      </div>
      <p className="text-sm font-semibold text-foreground">{value}</p>
    </div>
  )
}
