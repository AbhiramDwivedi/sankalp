'use client'

// Overview — the parent/teacher/student-legible "what is Sankalp, how is it
// structured" document. Rebuilt in Phase D of the pedagogical-UX refactor to
// replace the old thin HowThisWorksView. Every number on this page is pulled
// from the content registries so it stays accurate as packs, capstones,
// decks, and plans evolve. Aimed at a first-time reader — sixty seconds of
// scrolling should leave them understanding the whole curriculum.

import Link from 'next/link'
import { useMemo } from 'react'
import {
  ArrowRight,
  BookOpen,
  Compass,
  GraduationCap,
  Library,
  Mic,
  PenTool,
  Sparkles,
  Target,
  Users,
  ClipboardList,
  ShieldCheck,
  CalendarDays,
  Layers,
  Timer,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge.shadcn'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.shadcn'
import { Separator } from '@/components/ui/separator'
import { TOPIC_PACKS } from '@/content'
import { CAPSTONES } from '@/content/capstones'
import { DECKS } from '@/content/flashcards'
import { STUDY_PLANS } from '@/content/studyPlans'
import { TOPIC_THEME_META } from '@/content/schema'
import type { TopicTheme } from '@/content/schema'
import { BAND_META, bandForPack } from '@/types'
import type { Band } from '@/types'
import { useProfile } from '@/lib/profile-context'
import { MotifSunrise } from '@/components/art/motifs'

// Dedupe pack themes within a band, preserving registry order so the themes
// list reads in the same order a student will encounter them.
function themesForBand(band: Band): TopicTheme[] {
  const seen = new Set<TopicTheme>()
  const ordered: TopicTheme[] = []
  for (const p of TOPIC_PACKS) {
    if (bandForPack(p) !== band) continue
    if (seen.has(p.topicTheme)) continue
    seen.add(p.topicTheme)
    ordered.push(p.topicTheme)
  }
  return ordered
}

const bandAccent: Record<Band, string> = {
  starter: 'border-orange-300/60 bg-orange-50/50',
  foundations: 'border-amber-300/60 bg-amber-50/50',
  intermediate: 'border-primary/40 bg-primary/5 ring-1 ring-primary/20',
}

const bandCaption: Record<Band, string> = {
  starter: 'First words and phrases · STAMP 1–2',
  foundations: 'Sentences and strings · earns 1–2 credits',
  intermediate: 'The 3-FCPS-credit target · STAMP Benchmark 5',
}

export function OverviewView() {
  const { profile } = useProfile()
  const mockExams = useMemo(() => CAPSTONES.filter((c) => c.isMockExam), [])
  const perLessonDecks = DECKS.filter((d) => d.kind === 'pack-review').length
  const crossCuttingDecks = DECKS.length - perLessonDecks
  const bands: Band[] = ['starter', 'foundations', 'intermediate']

  // Final CTA target: a returning profile goes back to dashboard; a fresh
  // visitor goes home to pick a role.
  const ctaHref = profile ? '/dashboard' : '/'
  const ctaLabel = profile ? 'Back to your dashboard' : 'Get started'

  return (
    <div className="mx-auto max-w-4xl space-y-16 py-4 print:py-0">
      {/* ============================ Section 1 · Hero ============================ */}
      <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-primary/5 via-background to-background px-6 py-14 md:px-12 md:py-20">
        <div
          className="pointer-events-none absolute -right-16 -top-8 hidden h-56 w-56 opacity-30 md:block print:hidden"
          aria-hidden
        >
          <MotifSunrise color="#ea580c" accent="#f59e0b" />
        </div>
        <div className="relative space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Compass className="h-3.5 w-3.5" aria-hidden />
            Orient yourself
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            How Sankalp works
          </h1>
          <p className="max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            {TOPIC_PACKS.length} lessons, {CAPSTONES.length} capstones, 3 levels. Built for US
            middle-schoolers earning FCPS world-language credit through STAMP proficiency exams.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <Badge variant="secondary" className="gap-1.5">
              <ClipboardList className="h-3 w-3" aria-hidden /> STAMP 2S/WS aligned
            </Badge>
            <Badge variant="secondary" className="gap-1.5">
              <CalendarDays className="h-3 w-3" aria-hidden /> Self-paced
            </Badge>
            <Badge variant="secondary" className="gap-1.5">
              <Users className="h-3 w-3" aria-hidden /> Student · Parent · Teacher ready
            </Badge>
          </div>
        </div>
      </section>

      {/* ============================ Section 2 · Three levels of depth =============== */}
      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Curriculum shape
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Three levels of depth
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Every lesson is tagged into one of three bands. A student's plan enters at one
            band — but any lesson stays accessible.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {bands.map((band) => {
            const meta = BAND_META[band]
            const themes = themesForBand(band)
            return (
              <Card key={band} className={`h-full ${bandAccent[band]}`}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-xl">{meta.label}</CardTitle>
                    <Badge variant="outline">{meta.stampRange}</Badge>
                  </div>
                  <CardDescription className="text-xs font-medium text-primary/80">
                    {bandCaption[band]}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-relaxed text-foreground/80">
                    {meta.description}
                  </p>
                  <div>
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                      Themes in this band
                    </p>
                    <ul className="flex flex-wrap gap-1.5">
                      {themes.map((t) => {
                        const tm = TOPIC_THEME_META[t]
                        return (
                          <li
                            key={t}
                            className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-0.5 text-xs text-foreground/80"
                          >
                            <span aria-hidden>{tm.emoji}</span>
                            <span>{tm.label}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
        <p className="text-sm italic text-muted-foreground">
          Your plan starts at one band, but any lesson stays accessible. Dial up for stretch,
          dial down for review.
        </p>
      </section>

      <Separator />

      {/* ============================ Section 3 · What's in a lesson ================= */}
      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Inside each pack
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Every lesson has four parts
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Same shape across all {TOPIC_PACKS.length} lessons, so students and teachers know
            what to expect.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Library,
              title: 'Vocabulary & phrases',
              body: '15–40 words with transliteration and translation. Cultural examples, not dictionary dumps.',
            },
            {
              icon: Sparkles,
              title: 'Grammar & structure',
              body: 'The concept that makes this lesson harder than the last — introduced with a worked example.',
            },
            {
              icon: BookOpen,
              title: 'Read, listen, observe',
              body: 'A real text sample plus a cultural note. Two model essays show what STAMP Benchmark 5 looks like.',
            },
            {
              icon: PenTool,
              title: 'Write & reflect',
              body: 'A writing prompt mapped to the STAMP rubric, and a tear-off self-check the student can grade.',
            },
          ].map((part) => (
            <Card key={part.title} className="h-full">
              <CardHeader>
                <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <part.icon className="h-5 w-5 text-primary" aria-hidden />
                </div>
                <CardTitle className="text-base">{part.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{part.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* ============================ Section 4 · Capstones + Mock Exams ============= */}
      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Cross-topic rehearsal
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            {CAPSTONES.length} capstones — {mockExams.length} are timed mock exams
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Target className="h-5 w-5 text-primary" aria-hidden />
              </div>
              <CardTitle>Capstones</CardTitle>
              <CardDescription>
                {CAPSTONES.length} essay prompts drawing from 3–5 lessons each.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                Each capstone ships in <strong className="text-foreground">three tiers
                side-by-side</strong> — novice, intermediate, push — so students can see
                growth on the same prompt before writing their own.
              </p>
              <p>Graded against the STAMP rubric. Teacher notes explain every rubric axis.</p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/capstones">
                  Browse capstones <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="border-primary/40 bg-primary/5">
            <CardHeader>
              <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Timer className="h-5 w-5" aria-hidden />
              </div>
              <CardTitle>Mock exams</CardTitle>
              <CardDescription>
                {mockExams.length} capstones run under timed, exam-like conditions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                Matches the STAMP 2S/WS writing section format: one prompt, focused time
                window, self-check after.
              </p>
              <ul className="space-y-1 text-foreground/90">
                {mockExams.map((c) => (
                  <li key={c.id} className="flex items-baseline gap-2">
                    <Badge variant="outline" className="shrink-0 text-[10px]">
                      {c.id}
                    </Badge>
                    <span>{c.titleEnglish}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* ============================ Section 5 · Flashcards ========================== */}
      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Daily drill
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Flashcards for vocab drill
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Every lesson ends with a deck of its vocab (one-click drill). On top of that,
            cross-cutting decks cover grammar essentials, connectors, idioms, and the
            top-150 exam-prep words. Total: {DECKS.length} decks.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-stretch">
          <Card>
            <CardHeader>
              <CardDescription>Per-lesson</CardDescription>
              <CardTitle className="text-3xl font-bold">{perLessonDecks}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                One deck per topic pack. Same vocab you just studied, spaced out.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Cross-cutting</CardDescription>
              <CardTitle className="text-3xl font-bold">{crossCuttingDecks}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Theme reviews, connectors, muhavare (idioms), grammar essentials, and
                top-150 exam prep.
              </p>
            </CardContent>
          </Card>
          <div className="flex items-center justify-center md:justify-start">
            <Button variant="outline" asChild>
              <Link href="/flashcards">
                <Layers className="mr-2 h-4 w-4" />
                Browse flashcards
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Separator />

      {/* ============================ Section 6 · STAMP + FCPS credit ================= */}
      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            How credit works
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            How FCPS credit works
          </h2>
        </div>
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>
            Fairfax County Public Schools grants world-language credits based on the STAMP
            2S/WS proficiency exam — a writing + speaking test administered by Avant
            Assessment.
          </p>
          <ul className="space-y-2 border-l-2 border-primary/40 pl-5">
            <li>
              <strong className="text-foreground">Benchmark 3 — Novice High</strong> earns{' '}
              <strong className="text-foreground">1 credit</strong>. Simple sentences on
              familiar topics.
            </li>
            <li>
              <strong className="text-foreground">Benchmark 4 — Intermediate Low</strong>{' '}
              earns <strong className="text-foreground">2 credits</strong>. Strings of
              sentences with some detail.
            </li>
            <li>
              <strong className="text-foreground">
                Benchmark 5 — Intermediate Mid
              </strong>{' '}
              earns <strong className="text-foreground">3 credits</strong> — our main
              target. Connected paragraphs across past, present, and future.
            </li>
            <li>
              <strong className="text-foreground">Benchmark 6+</strong> still caps at 3
              credits, but gives headroom if one section slips. Honors-level narrative and
              opinion register.
            </li>
          </ul>
          <p>
            Sankalp's {TOPIC_PACKS.length} lessons plus {CAPSTONES.length} capstones are
            curriculum-audited to cover every sub-topic, connector bank, and tense floor
            required to hit Benchmark 5. The audit is re-run on every content change.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" asChild>
            <Link href="/rubric">
              <ClipboardList className="mr-2 h-4 w-4" />
              View the full STAMP rubric
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/audit">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Read the credit audit
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/plan">
              <CalendarDays className="mr-2 h-4 w-4" />
              See the {STUDY_PLANS.length} study plans
            </Link>
          </Button>
        </div>
      </section>

      <Separator />

      {/* ============================ Section 7 · Who is this for ==================== */}
      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Audience
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            For students, parents, teachers
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: GraduationCap,
              title: 'Students',
              body: 'Walk your plan, earn XP and streaks, get AI feedback on writing and speaking. Pack, flashcard, capstone — one rhythm.',
            },
            {
              icon: Users,
              title: 'Parents',
              body: 'See what your child is learning, what level they are at, and what the credit audit says. Demo mode shows a seeded Intermediate Mid student.',
            },
            {
              icon: BookOpen,
              title: 'Teachers',
              body: 'Adjust levels, see class stats, reference the rubric and audit. Every pack carries a teacher note explaining which rubric axis it trains.',
            },
          ].map((role) => (
            <Card key={role.title} className="h-full text-center">
              <CardHeader>
                <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <role.icon className="h-7 w-7 text-primary" aria-hidden />
                </div>
                <CardTitle>{role.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{role.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Final CTA */}
        <Card className="border-primary/30 bg-primary/5 print:hidden">
          <CardContent className="flex flex-col items-center gap-4 py-8 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <p className="text-lg font-semibold text-foreground">Ready to start?</p>
              <p className="text-sm text-muted-foreground">
                {profile
                  ? 'Pick up where you left off.'
                  : 'Choose a role, set a level, and the plan is yours.'}
              </p>
            </div>
            <Button asChild size="lg">
              <Link href={ctaHref}>
                {ctaLabel} <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
