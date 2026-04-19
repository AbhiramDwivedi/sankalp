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
import {
  Flame,
  Sparkles,
  Users,
  BookOpen,
  ShieldCheck,
  ClipboardList,
  AlertCircle,
  Info,
} from 'lucide-react'
import type { DemoStudent, StudentProfile } from '@/types'
import { computeStreak } from '@/lib/streak'
import { computeXp } from '@/lib/xp'
import { TOPIC_PACKS } from '@/content'
import { CAPSTONES } from '@/content/capstones'

// -----------------------------------------------------------------------------
// TeacherDashboard — Phase 3. Reads profile.demoStudent as the sole "roster
// member" for now; the plumbing is extensible to an array if we later seed
// multiple demo students. Phase 3 banner is explicit so the teacher knows
// they're looking at demo data, not a real class connection.
// -----------------------------------------------------------------------------

export default function TeacherDashboard({ profile }: { profile: StudentProfile }) {
  const roster: DemoStudent[] = profile.demoStudent ? [profile.demoStudent] : []
  const totalPacks = TOPIC_PACKS.length
  const totalCaps = CAPSTONES.length

  // Per-student aggregates (XP + streak).
  const rows = roster.map((s) => {
    const xpSource = {
      completedTopicIds: s.completedTopicIds,
      completedCapstoneIds: s.completedCapstoneIds,
      flashcardsMastered: s.flashcardsMastered,
      evaluations: {} as Record<string, never>,
      speakingRecordings: {} as Record<string, never>,
    }
    const xp = computeXp(xpSource)
    const streak = computeStreak(s.activityDates)
    const totalItems = totalPacks + totalCaps
    const doneItems = s.completedTopicIds.length + s.completedCapstoneIds.length
    const progressPct = totalItems ? Math.round((doneItems / totalItems) * 100) : 0
    return { student: s, xp, streak, progressPct }
  })

  const avgStreak = rows.length ? Math.round(rows.reduce((a, r) => a + r.streak, 0) / rows.length) : 0
  const avgXp = rows.length ? Math.round(rows.reduce((a, r) => a + r.xp, 0) / rows.length) : 0

  // Level distribution (for the roster card). With a single demo student this
  // is basically a one-bucket bar, but the shape scales for an eventual
  // multi-student roster.
  const levelDistribution = rows.reduce<Record<string, number>>((acc, r) => {
    const l = r.student.currentLevel as unknown as string
    acc[l] = (acc[l] || 0) + 1
    return acc
  }, {})

  const teacherFirst = profile.name.split(/\s+/)[0] || profile.name

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
            Sankalp doesn't connect to your real class yet. This roster shows one seeded
            demo student so you can see what a teacher view looks like.
          </p>
        </div>
      </div>

      {/* Welcome */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Welcome, {teacherFirst}!
          </h1>
          <p className="text-muted-foreground mt-1">Hindi · FCPS STAMP 2S/WS preparation</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/lessons">
            <BookOpen className="mr-2 h-4 w-4" />
            Browse curriculum
          </Link>
        </Button>
      </div>

      {/* Overview stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard label="Total students" value={String(roster.length)} icon={Users} />
        <StatCard label="Avg. streak" value={`${avgStreak}d`} icon={Flame} />
        <StatCard label="Avg. XP" value={String(avgXp)} icon={Sparkles} />
        <StatCard label="Active course" value="Hindi" icon={BookOpen} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Roster */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Students</CardTitle>
              <CardDescription>
                Demo roster — real class connection coming later.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {rows.length === 0 ? (
                <div className="flex items-center gap-3 rounded-md border border-dashed p-6 text-sm text-muted-foreground">
                  <AlertCircle className="h-4 w-4" />
                  No demo student was seeded. Re-run onboarding from Settings.
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
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row) => (
                        <tr key={row.student.name} className="border-b border-border last:border-0">
                          <td className="py-3 pr-4 font-medium text-foreground">{row.student.name}</td>
                          <td className="py-3 pr-4">
                            <Badge variant="secondary">{row.student.currentLevel}</Badge>
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
                                aria-label={`${row.student.name} progress: ${row.progressPct}%`}
                              />
                              <span className="text-xs text-muted-foreground w-9 text-right">
                                {row.progressPct}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Level distribution</CardTitle>
              <CardDescription>Where your roster sits on the STAMP ladder.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(levelDistribution).length === 0 ? (
                <p className="text-sm text-muted-foreground">No students on the roster yet.</p>
              ) : (
                Object.entries(levelDistribution).map(([lvl, count]) => {
                  const max = Math.max(1, ...Object.values(levelDistribution))
                  const pct = Math.round((count / max) * 100)
                  return (
                    <div key={lvl}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-foreground">{lvl}</span>
                        <span className="text-muted-foreground">
                          {count} {count === 1 ? 'student' : 'students'}
                        </span>
                      </div>
                      <Progress value={pct} aria-label={`${lvl} level: ${count}`} />
                    </div>
                  )
                })
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right column: Quick actions */}
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
