'use client'

import Link from 'next/link'
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Flame,
  Sparkles,
  BookOpen,
  ShieldCheck,
  ClipboardList,
  Info,
  CalendarDays,
} from 'lucide-react'
import type { StudentProfile } from '@/types'
import { BAND_META, bandFromProficiency } from '@/types'
import { computeStreak, lastActivityLabel } from '@/lib/streak'
import { computeXp } from '@/lib/xp'
import { TOPIC_PACKS, getPack } from '@/content'
import { CAPSTONES, getCapstone } from '@/content/capstones'
import {
  getStudyPlan,
  studyPlanForLevel,
  planCursor,
} from '@/content/studyPlans'
import { AVANT_RUBRIC_SUMMARY } from '@/constants'

// -----------------------------------------------------------------------------
// ParentDashboard — Phase 3. Single-student view tuned for a parent glancing
// in: where is my child on the ladder, what are they working on this week,
// how do I read the exam output. Demo banner up top is explicit.
// -----------------------------------------------------------------------------

export default function ParentDashboard({ profile }: { profile: StudentProfile }) {
  const demo = profile.demoStudent
  const totalPacks = TOPIC_PACKS.length
  const totalCaps = CAPSTONES.length

  if (!demo) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-xl mx-auto">
          <CardHeader>
            <CardTitle>Parent profile without a child</CardTitle>
            <CardDescription>
              No demo child was seeded. Delete and re-create this profile from Settings to fix.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline">
              <Link href="/settings">Go to settings</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const streak = computeStreak(demo.activityDates)
  const streakLabel = lastActivityLabel(demo.activityDates)
  const xp = computeXp({
    completedTopicIds: demo.completedTopicIds,
    completedCapstoneIds: demo.completedCapstoneIds,
    flashcardsMastered: demo.flashcardsMastered,
    evaluations: {},
    speakingRecordings: {},
  })

  const plan =
    getStudyPlan(demo.selectedStudyPlanId) || studyPlanForLevel(demo.currentLevel)
  const cursor = planCursor(
    plan,
    demo.completedTopicIds,
    demo.completedCapstoneIds,
    demo.currentLevel as unknown as string,
    [],
  )
  const currentWeek = plan.weeks.find((w) => w.weekIndex === cursor.currentWeekIndex)
  const nextPack = cursor.nextPackId ? getPack(cursor.nextPackId) : undefined
  const upcomingCapstone = cursor.upcomingCapstoneIds.length
    ? getCapstone(cursor.upcomingCapstoneIds[0])
    : undefined

  const totalItems = totalPacks + totalCaps
  const doneItems = demo.completedTopicIds.length + demo.completedCapstoneIds.length
  const progressPct = totalItems ? Math.round((doneItems / totalItems) * 100) : 0

  const initials = (demo.name.trim().charAt(0) || 'S').toUpperCase()
  const parentFirst = profile.name.split(/\s+/)[0] || profile.name
  const demoBand = demo.currentBand ?? bandFromProficiency(demo.currentLevel)
  const demoBandMeta = BAND_META[demoBand]

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Demo banner */}
      <div
        role="note"
        className="flex items-start gap-3 rounded-lg border border-amber-300/50 bg-amber-50 dark:bg-amber-950/30 p-4 text-amber-900 dark:text-amber-100"
      >
        <Info className="h-5 w-5 mt-0.5 shrink-0" aria-hidden />
        <div className="text-sm">
          <p className="font-medium">Demo mode</p>
          <p className="text-amber-900/80 dark:text-amber-100/80">
            This shows a seeded demo child at the level you picked during onboarding, so you can
            see what the parent view looks like before your own child starts.
          </p>
        </div>
      </div>

      {/* Welcome */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Welcome, {parentFirst}!
        </h1>
        <p className="text-muted-foreground mt-1">Here's how {demo.name} is doing on Hindi.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Student card + This week */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-2xl">{demo.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1 flex-wrap">
                    <Badge variant="secondary" title={`STAMP: ${demo.currentLevel}`}>
                      {demoBandMeta.label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{demoBandMeta.stampRange}</span>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <MiniStat icon={Flame} label="Day streak" value={`${streak}`} hint={streakLabel} />
                <MiniStat icon={Sparkles} label="Total XP" value={`${xp}`} />
                <MiniStat
                  icon={BookOpen}
                  label="Packs done"
                  value={`${demo.completedTopicIds.length}`}
                  hint={`of ${totalPacks}`}
                />
                <MiniStat
                  icon={CalendarDays}
                  label="Overall"
                  value={`${progressPct}%`}
                  hint="library + capstones"
                />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">{progressPct}%</span>
                </div>
                <Progress value={progressPct} aria-label={`Overall progress: ${progressPct}%`} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>This week</CardTitle>
              <CardDescription>
                {plan.titleEnglish} · Week {cursor.currentWeekIndex} of {plan.durationWeeks}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">{currentWeek?.focus || 'Current focus'}.</span>{' '}
                {currentWeek?.writingOutput}
              </p>
              {nextPack ? (
                <div className="rounded-md border border-border p-3">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Next lesson</p>
                  <p className="font-medium text-foreground">{nextPack.titleEnglish}</p>
                </div>
              ) : null}
              {upcomingCapstone ? (
                <div className="rounded-md border border-border p-3">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Capstone this week</p>
                  <p className="font-medium text-foreground">{upcomingCapstone.titleEnglish}</p>
                  <p className="text-xs text-muted-foreground">
                    {upcomingCapstone.tier === 'push' ? 'Push tier' : 'Core tier'}
                    {upcomingCapstone.isMockExam ? ` · Mock exam (${upcomingCapstone.mockExamMinutes} min)` : ''}
                  </p>
                </div>
              ) : null}
              {cursor.isAllDone ? (
                <p className="text-sm text-muted-foreground italic">
                  {demo.name} has finished the plan — they're ready for a timed mock exam.
                </p>
              ) : null}
            </CardContent>
          </Card>
        </div>

        {/* Level explainer + Links */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Understanding {demo.name.split(/\s+/)[0]}'s level</CardTitle>
              <CardDescription>
                {demoBandMeta.label} · {demoBandMeta.stampRange}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>{demoBandMeta.description}</p>
              <p>
                The three bands — Foundations, Intermediate, and Skilled — map to the STAMP ladder.
                The Intermediate band (Benchmark 5) is what earns 3 FCPS world language credits.
              </p>
              <p className="text-xs text-muted-foreground/80 italic">
                STAMP target: {demo.currentLevel}. {AVANT_RUBRIC_SUMMARY[demo.currentLevel]}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Learn more</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Button asChild variant="outline">
                <Link href="/lessons">
                  <BookOpen className="mr-2 h-4 w-4" />
                  View curriculum
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/audit">
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Credit audit
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/rubric">
                  <ClipboardList className="mr-2 h-4 w-4" />
                  Rubric reference
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function MiniStat({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  hint?: string
}) {
  return (
    <div className="rounded-md border border-border p-3">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground mb-1">
        <Icon className="h-3.5 w-3.5" />
        <span>{label}</span>
      </div>
      <p className="text-xl font-bold text-foreground leading-none">{value}</p>
      {hint ? <p className="text-xs text-muted-foreground mt-1">{hint}</p> : null}
    </div>
  )
}
