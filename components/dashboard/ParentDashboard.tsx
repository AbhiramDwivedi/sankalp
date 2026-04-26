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
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Flame,
  Sparkles,
  BookOpen,
  ShieldCheck,
  ClipboardList,
  Info,
  CalendarDays,
  Mail,
  UserPlus,
} from 'lucide-react'
import type { StudentLink, StudentProfile, Band, ProficiencyLevel } from '@/types'
import { BAND_META, bandFromProficiency, defaultProficiencyForBand } from '@/types'
import { computeStreak, lastActivityLabel } from '@/lib/streak'
import { useProfile } from '@/lib/profile-context'
import { BandLevelDial } from '@/components/BandLevelDial'
import { computeXp } from '@/lib/xp'
import { TOPIC_PACKS, getPack } from '@/content'
import { CAPSTONES, getCapstone } from '@/content/capstones'
import {
  getStudyPlan,
  studyPlanForLevel,
  planCursor,
} from '@/content/studyPlans'
import { AVANT_RUBRIC_SUMMARY } from '@/constants'
import { describeExamCountdown } from '@/lib/examDate'
import {
  acceptCoParentInvite,
  listAdultLinks,
  listPendingCoParentInvitesForCurrentUser,
  loadAcceptedStudents,
  updateLinkedStudentPath,
} from '@/lib/studentLinks'

// -----------------------------------------------------------------------------
// ParentDashboard — when signed in, reads accepted child links from
// public.student_links. Renders the (first) linked child's progress + the
// path-dial editor (writes through update_linked_student_path). Falls back
// to the seeded demoStudent only when there is no auth session (E2E suite,
// public-route preview).
// -----------------------------------------------------------------------------

type ChildEntry = { link: StudentLink; profile: StudentProfile }

export default function ParentDashboard({ profile }: { profile: StudentProfile }) {
  const { authUser, setProfile } = useProfile()
  const totalPacks = TOPIC_PACKS.length
  const totalCaps = CAPSTONES.length

  const [children, setChildren] = useState<ChildEntry[] | null>(null)
  const [pendingCount, setPendingCount] = useState(0)
  // Pending co-parent invites addressed to THIS auth user's email. Surfaced
  // as an accept-able banner below the dashboard greeting; clicking Accept
  // calls the SECURITY DEFINER fn which fans out the inviter's accepted
  // children to a fresh set of accepted student_links owned by this profile.
  const [coParentInvites, setCoParentInvites] = useState<StudentLink[]>([])
  const [acceptingCoParent, setAcceptingCoParent] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [updating, setUpdating] = useState(false)

  const refresh = useCallback(async () => {
    if (!authUser) {
      setChildren([])
      setPendingCount(0)
      setCoParentInvites([])
      return
    }
    const [accepted, all, coParent] = await Promise.all([
      loadAcceptedStudents({
        adultUserId: authUser.id,
        adultProfileId: profile.id,
      }),
      listAdultLinks(authUser.id),
      listPendingCoParentInvitesForCurrentUser(),
    ])
    setChildren(accepted)
    setPendingCount(
      all.filter(
        (l) =>
          l.status === 'pending' &&
          l.kind === 'student' &&
          l.adultProfileId === profile.id,
      ).length,
    )
    setCoParentInvites(coParent)
    setSelectedId((prev) => {
      if (prev && accepted.some((c) => c.profile.id === prev)) return prev
      return accepted[0]?.profile.id ?? null
    })
  }, [authUser, profile.id])

  useEffect(() => {
    refresh()
  }, [refresh])

  const isAuthMode = !!authUser
  const isLoading = isAuthMode && children === null

  // Demo-mode fallback (E2E auth bypass / public preview). Same in-place
  // mutation pattern as before.
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

  const handleAcceptCoParent = async (link: StudentLink) => {
    if (profile.role !== 'parent') {
      toast.error(
        'Switch to a parent profile (or create one) before accepting a co-parent invite.',
      )
      return
    }
    setAcceptingCoParent(true)
    const { error, created } = await acceptCoParentInvite({
      linkId: link.id,
      coParentProfileId: profile.id,
    })
    setAcceptingCoParent(false)
    if (error) {
      toast.error(error)
      return
    }
    if (created && created > 0) {
      // `link.invitedEmail` on a co-parent row is the CO-PARENT's own email
      // (i.e. the current user), not the inviter's. Use the
      // inviter-supplied label when available; fall back to a generic
      // phrase. We don't have direct access to the inviter's email from
      // this row (RLS scopes it).
      const inviterLabel = link.adultLabel?.trim() || 'the inviter'
      toast.success(
        `Connected. You can now see ${created} child${created === 1 ? '' : 'ren'} from ${inviterLabel}.`,
      )
    } else {
      // Could legitimately be 0 — inviter has no accepted children yet, or
      // all of them are already linked to this co-parent through some other
      // path. Tell the user it succeeded but there's nothing new to see.
      toast.success(
        'Connected. No new children to show — the inviter has not connected any children yet, or you are already linked to all of them.',
      )
    }
    refresh()
  }

  const handleLinkedBandChange = async (
    studentProfileId: string,
    nextBand: Band,
  ) => {
    const nextLevel = defaultProficiencyForBand(nextBand)
    const nextPlanId = studyPlanForLevel(nextLevel).id
    setUpdating(true)
    setChildren((prev) =>
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
    setUpdating(false)
    if (error) {
      toast.error(error)
      refresh()
      return
    }
    toast.success('Updated.')
    refresh()
  }

  // ---- Demo-mode rendering (no signed-in user) --------------------------
  if (!isAuthMode) {
    const demo = profile.demoStudent
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
    return (
      <ChildView
        parentName={profile.name}
        bannerKind="demo"
        pendingCount={0}
        childName={demo.name}
        currentLevel={demo.currentLevel}
        currentBand={demo.currentBand ?? bandFromProficiency(demo.currentLevel)}
        activityDates={demo.activityDates}
        completedTopicIds={demo.completedTopicIds}
        completedCapstoneIds={demo.completedCapstoneIds}
        flashcardsMastered={demo.flashcardsMastered}
        selectedStudyPlanId={demo.selectedStudyPlanId}
        examDate={profile.examDate}
        totalPacks={totalPacks}
        totalCaps={totalCaps}
        onBandChange={handleDemoBandChange}
        applyLabel="Update child's level"
        editorTitle={`Adjust ${(demo.name.split(/\s+/)[0] || demo.name)}'s level`}
        editorDescription="If your child's real-world level is different from what you picked at onboarding, change it here. Completed lessons stay completed."
        confirmDescription={`Move ${demo.name} to a new band? Upcoming weeks re-sequence; completed packs and capstones are untouched.`}
      />
    )
  }

  // ---- Real-data rendering ---------------------------------------------
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Loading…</CardTitle>
            <CardDescription>Reading your linked children.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  const list = children ?? []
  const parentFirst = profile.name.split(/\s+/)[0] || profile.name

  // Co-parent invite banner — rendered above both the empty state and the
  // populated dashboard so a co-parent who signs in for the first time sees
  // the accept CTA regardless of whether they have any children connected
  // already.
  const coParentBanner = coParentInvites.length > 0 ? (
    <div className="space-y-2">
      {coParentInvites.map((link) => (
        <div
          key={link.id}
          role="note"
          className="flex items-start justify-between gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4 text-foreground"
        >
          <div className="flex items-start gap-3">
            <UserPlus className="h-5 w-5 mt-0.5 shrink-0 text-primary" aria-hidden />
            <div className="text-sm">
              <p className="font-medium">
                Co-parent invite{link.adultLabel ? ` from ${link.adultLabel}` : ''}
              </p>
              <p className="text-muted-foreground">
                Accept to share visibility into the children they have already
                connected. You will see them under your dashboard immediately.
                Children added later will not be auto-shared.
              </p>
            </div>
          </div>
          <Button
            size="sm"
            onClick={() => handleAcceptCoParent(link)}
            disabled={acceptingCoParent}
          >
            {acceptingCoParent ? 'Accepting…' : 'Accept'}
          </Button>
        </div>
      ))}
    </div>
  ) : null

  if (list.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-6">
        {coParentBanner}
        {pendingCount > 0 ? (
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
                  Tell your child to sign in with the email you sent the invite to,
                  then accept it from their Settings.
                </p>
              </div>
            </div>
            <Button asChild size="sm" variant="outline">
              <Link href="/settings">Manage</Link>
            </Button>
          </div>
        ) : null}

        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Welcome, {parentFirst}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Connect a child to see their progress here.
          </p>
        </div>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>No connected children yet</CardTitle>
            <CardDescription>
              Send an invite from Settings — your child accepts on their next sign-in
              and you&rsquo;ll see their progress here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/settings">
                <UserPlus className="mr-2 h-4 w-4" />
                Invite a child
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const selected =
    list.find((c) => c.profile.id === selectedId) ?? list[0]
  const child = selected.profile
  const childBand = child.currentBand ?? bandFromProficiency(child.currentLevel)

  return (
    <div className="space-y-0">
      {coParentBanner ? (
        <div className="container mx-auto px-4 pt-6">{coParentBanner}</div>
      ) : null}
      {list.length > 1 ? (
        <div className="container mx-auto px-4 pt-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Choose a child</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {list.map((c) => {
                const active = c.profile.id === selected.profile.id
                return (
                  <Button
                    key={c.link.id}
                    variant={active ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedId(c.profile.id)}
                  >
                    {c.profile.name || c.link.invitedEmail}
                  </Button>
                )
              })}
            </CardContent>
          </Card>
        </div>
      ) : null}

      <ChildView
        parentName={profile.name}
        bannerKind={pendingCount > 0 ? 'pending' : 'none'}
        pendingCount={pendingCount}
        childName={child.name}
        currentLevel={child.currentLevel}
        currentBand={childBand}
        activityDates={child.activityDates}
        completedTopicIds={child.completedTopicIds}
        completedCapstoneIds={child.completedCapstoneIds || []}
        flashcardsMastered={child.flashcardsMastered}
        selectedStudyPlanId={child.selectedStudyPlanId}
        examDate={child.examDate}
        totalPacks={totalPacks}
        totalCaps={totalCaps}
        editorTitle={`Adjust ${(child.name.split(/\s+/)[0] || child.name)}'s level`}
        editorDescription="If your child's real-world level is different from what's set, change it here. Completed lessons stay completed."
        confirmDescription={`Move ${child.name} to a new band? Upcoming weeks re-sequence; completed packs and capstones are untouched.`}
        applyLabel={updating ? 'Saving…' : "Update child's level"}
        onBandChange={(next) => handleLinkedBandChange(child.id, next)}
      />
    </div>
  )
}

interface ChildViewProps {
  parentName: string
  bannerKind: 'demo' | 'pending' | 'none'
  pendingCount: number
  childName: string
  currentLevel: ProficiencyLevel
  currentBand: Band
  activityDates: string[] | undefined
  completedTopicIds: string[]
  completedCapstoneIds: string[]
  flashcardsMastered: string[] | undefined
  selectedStudyPlanId: string | undefined
  examDate: string | undefined
  totalPacks: number
  totalCaps: number
  editorTitle: string
  editorDescription: string
  confirmDescription: string
  applyLabel: string
  onBandChange: (next: Band) => void
}

function ChildView({
  parentName,
  bannerKind,
  pendingCount,
  childName,
  currentLevel,
  currentBand,
  activityDates,
  completedTopicIds,
  completedCapstoneIds,
  flashcardsMastered,
  selectedStudyPlanId,
  examDate,
  totalPacks,
  totalCaps,
  editorTitle,
  editorDescription,
  confirmDescription,
  applyLabel,
  onBandChange,
}: ChildViewProps) {
  const examCountdown = describeExamCountdown(examDate)
  const streak = computeStreak(activityDates)
  const streakLabel = lastActivityLabel(activityDates)
  const xp = computeXp({
    completedTopicIds,
    completedCapstoneIds,
    flashcardsMastered: flashcardsMastered || [],
    evaluations: {},
    speakingRecordings: {},
  })

  const plan =
    getStudyPlan(selectedStudyPlanId) || studyPlanForLevel(currentLevel)
  const cursor = planCursor(
    plan,
    completedTopicIds,
    completedCapstoneIds,
    currentLevel as unknown as string,
    [],
  )
  const currentWeek = plan.weeks.find((w) => w.weekIndex === cursor.currentWeekIndex)
  const nextPack = cursor.nextPackId ? getPack(cursor.nextPackId) : undefined
  const upcomingCapstone = cursor.upcomingCapstoneIds.length
    ? getCapstone(cursor.upcomingCapstoneIds[0])
    : undefined

  const totalItems = totalPacks + totalCaps
  const doneItems = completedTopicIds.length + completedCapstoneIds.length
  const progressPct = totalItems ? Math.round((doneItems / totalItems) * 100) : 0

  const initials = (childName.trim().charAt(0) || 'S').toUpperCase()
  const parentFirst = parentName.split(/\s+/)[0] || parentName
  const childBandMeta = BAND_META[currentBand]

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {bannerKind === 'demo' ? (
        <div
          role="note"
          className="flex items-start gap-3 rounded-lg border border-amber-300/50 bg-amber-50 dark:bg-amber-950/30 p-4 text-amber-900 dark:text-amber-100"
        >
          <Info className="h-5 w-5 mt-0.5 shrink-0" aria-hidden />
          <div className="text-sm">
            <p className="font-medium">Demo mode</p>
            <p className="text-amber-900/80 dark:text-amber-100/80">
              This shows a seeded demo child at the level you picked during onboarding, so you can
              see what the parent view looks like before your own child connects.
            </p>
          </div>
        </div>
      ) : bannerKind === 'pending' ? (
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
                Tell each invited child to sign in with the email you sent the invite to,
                then accept it from their Settings.
              </p>
            </div>
          </div>
          <Button asChild size="sm" variant="outline">
            <Link href="/settings">Manage</Link>
          </Button>
        </div>
      ) : null}

      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Welcome, {parentFirst}!
        </h1>
        <p className="text-muted-foreground mt-1">
          Here&rsquo;s how {childName} is doing on Hindi.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
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
                  <CardTitle className="text-2xl">{childName}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1 flex-wrap">
                    <Badge variant="secondary" title={`STAMP: ${currentLevel}`}>
                      {childBandMeta.label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{childBandMeta.stampRange}</span>
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
                  value={`${completedTopicIds.length}`}
                  hint={`of ${totalPacks}`}
                />
                {examCountdown.kind !== 'unset' ? (
                  <MiniStat
                    icon={CalendarDays}
                    label="Exam date"
                    value={
                      examCountdown.kind === 'past'
                        ? 'Passed'
                        : examCountdown.kind === 'today'
                          ? 'Today'
                          : `${examCountdown.days}d`
                    }
                    hint={examCountdown.date ?? undefined}
                  />
                ) : (
                  <MiniStat
                    icon={CalendarDays}
                    label="Overall"
                    value={`${progressPct}%`}
                    hint="library + capstones"
                  />
                )}
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
                  {childName} has finished the plan — they&rsquo;re ready for a timed mock exam.
                </p>
              ) : null}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Understanding {childName.split(/\s+/)[0]}&rsquo;s level</CardTitle>
              <CardDescription>
                {childBandMeta.label} · {childBandMeta.stampRange}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>{childBandMeta.description}</p>
              <p>
                The three bands — Foundations, Intermediate, and Skilled — map to the STAMP ladder.
                The Intermediate band (Benchmark 5) is what earns 3 FCPS world language credits.
              </p>
              <p className="text-xs text-muted-foreground/80 italic">
                STAMP target: {currentLevel}. {AVANT_RUBRIC_SUMMARY[currentLevel]}
              </p>
            </CardContent>
          </Card>

          <BandLevelDial
            value={currentBand}
            title={editorTitle}
            description={editorDescription}
            confirmDescription={confirmDescription}
            applyLabel={applyLabel}
            onConfirm={onBandChange}
            compact
          />

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
