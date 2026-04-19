import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.shadcn'
import { Badge } from '@/components/ui/badge.shadcn'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { LandingCtaRow } from '@/components/landing-cta-row'
import {
  BookOpen,
  GraduationCap,
  Users,
  CheckCircle,
  ArrowRight,
  Mic,
  PenLine,
  Brain,
  Sparkles,
  CalendarDays,
  Target,
  Layers,
} from 'lucide-react'
import { landingLanguages } from '@/lib/data/languages'

// -----------------------------------------------------------------------------
// Sankalp-honest landing page. Phase 2a rewrite over the v0 marketing home.
//
// Framing: "Learn Hindi and more." Today Hindi is the only active language
// (26 topic packs + 10 capstones + 33 flashcard decks all target Hindi
// STAMP 2S/WS). Other languages ship as aspirational tiles. No login, no
// account creation — three role-tagged "Enter as X" CTAs drop the student
// into /dashboard with a ?role= query Phase 3 will read.
// -----------------------------------------------------------------------------

const features: { icon: React.ComponentType<{ className?: string }>; title: string; description: string }[] = [
  {
    icon: BookOpen,
    title: '26 Topic Packs',
    description:
      'Hand-authored Hindi lessons across the Foundations, Intermediate, and Skilled bands. Each pack: vocabulary, grammar, connectors, cultural insight, model essays, and a self-check rubric.',
  },
  {
    icon: Target,
    title: 'Capstone Essays',
    description:
      '10 cross-topic capstones shown side-by-side in novice, intermediate-mid, and push tiers so you can see exactly what growth looks like.',
  },
  {
    icon: Layers,
    title: 'Flashcard Drills',
    description:
      'Roughly 850 cards across 33 decks — pack reviews, connector drills, muhavare, grammar essentials, and a top-150 exam-prep deck. Print-ready 8-up sheets included.',
  },
  {
    icon: PenLine,
    title: 'Writing AI Feedback',
    description:
      'Type a Hindi essay or photograph your handwriting; an optional Gemini pass scores it against the STAMP rubric (Text-Type, Language Control, Topic Coverage).',
  },
  {
    icon: Mic,
    title: 'Speaking AI Feedback',
    description:
      'Record answers to capstone prompts; transcription + rubric grounding give you feedback you can act on rather than a black-box score.',
  },
  {
    icon: CalendarDays,
    title: 'Study Plans',
    description:
      '10-, 8-, 6-, 4-, and 2-week plans picked by profile level. Every plan hits all 10 capstones — no path skips the exam-quality assessments.',
  },
]

const proficiencyLevels: {
  label: string
  stamp: number
  description: string
  topics: string[]
  levelBand: string
}[] = [
  {
    label: 'Novice Low',
    stamp: 1,
    description: 'Isolated words',
    topics: ['Greetings', 'Family', 'Numbers', 'Colors'],
    levelBand: 'Foundations · pre-pack',
  },
  {
    label: 'Novice Mid',
    stamp: 2,
    description: 'Basic phrases',
    topics: ['School', 'Weather', 'Time', 'Simple phrases'],
    levelBand: 'Foundations · entry',
  },
  {
    label: 'Novice High',
    stamp: 3,
    description: 'Simple sentences',
    topics: ['Daily routine', 'Food', 'Simple conversations', 'Descriptions'],
    levelBand: 'Foundations packs',
  },
  {
    label: 'Intermediate Low',
    stamp: 4,
    description: 'Strings of sentences',
    topics: ['Past tense', 'Future plans', 'Shopping', 'Health'],
    levelBand: 'Intermediate packs',
  },
  {
    label: 'Intermediate Mid',
    stamp: 5,
    description: 'Connected paragraphs · 3 FCPS credits',
    topics: ['Travel', 'Opinions', 'Cultural discussions', 'Storytelling'],
    levelBand: 'Skilled stretch + capstones',
  },
]

const userTypes: { icon: React.ComponentType<{ className?: string }>; title: string; description: string; href: string }[] = [
  {
    icon: GraduationCap,
    title: 'Students',
    description:
      'Work through packs and capstones at your own pace. Flashcards stay warm with spaced repetition; the dashboard shows your next pack.',
    href: '/onboarding?role=student',
  },
  {
    icon: Users,
    title: 'Parents',
    description:
      'See where your child is on the STAMP ladder, what the next week looks like, and what the exam actually asks them to produce.',
    href: '/onboarding?role=parent',
  },
  {
    icon: BookOpen,
    title: 'Teachers',
    description:
      'Every pack and capstone carries a teacher note explaining the rubric axis it trains. Print-ready lessons, flashcard sheets, and a live credit audit.',
    href: '/onboarding?role=teacher',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background py-20 md:py-32">
          <div className="absolute inset-0 overflow-hidden" aria-hidden>
            <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                STAMP-aligned Hindi · FCPS world language credit
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
                Learn Hindi <span className="text-primary">and more</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed text-pretty">
                Interactive lessons, capstone projects, and STAMP-aligned practice for students, parents, and
                teachers.
              </p>

              <LandingCtaRow withRoleOptions size="lg" />

              <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground flex-wrap">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>STAMP Aligned</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Self-Paced</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Interactive</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                What Sankalp Actually Does
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Content-first, AI-sparing. Hand-authored packs and capstones do the heavy lifting; AI helps when
                you want feedback, not when you want a lesson.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <Card key={feature.title} className="border-border hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Proficiency ladder */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                Five STAMP Proficiency Levels
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Intermediate Mid (Benchmark 5) earns 3 FCPS world language credits. Here's what each step up the
                ladder looks like in the Hindi content we ship.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border md:hidden" />

                <div className="space-y-6">
                  {proficiencyLevels.map((item, index) => (
                    <div key={item.label} className="flex gap-4 md:gap-6">
                      <div className="flex-shrink-0 relative z-10">
                        <div className="w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center font-bold text-primary">
                          {index + 1}
                        </div>
                      </div>
                      <Card className="flex-1">
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-3 flex-wrap">
                            <CardTitle className="text-lg">{item.label}</CardTitle>
                            <Badge variant="secondary">Benchmark {item.stamp}</Badge>
                            <span className="text-xs text-muted-foreground">{item.levelBand}</span>
                          </div>
                          <CardDescription>{item.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {item.topics.map((topic) => (
                              <span
                                key={topic}
                                className="text-sm px-3 py-1 rounded-full bg-muted text-muted-foreground"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Languages */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                Indian Languages
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Starting with Hindi. More scripts and languages are on the roadmap — we'll ship them when the
                content clears the same bar.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {landingLanguages.map((lang) => (
                <Card
                  key={lang.id}
                  className={`text-center transition-colors ${
                    lang.available
                      ? 'border-primary ring-1 ring-primary/20 hover:border-primary/70'
                      : 'hover:border-primary/30'
                  }`}
                >
                  <CardContent className="pt-6">
                    <div className="text-4xl mb-2">{lang.nativeName}</div>
                    <p className="font-medium text-foreground">{lang.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{lang.script} script</p>
                    {!lang.available && (
                      <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                        Coming Soon
                      </span>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Built for everyone */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                Built for Everyone
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                The same content reads differently when you're the learner, the parent behind the learner, or
                the teacher running the room.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {userTypes.map((type) => (
                <Card key={type.title} className="text-center hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                      <type.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{type.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-base">{type.description}</CardDescription>
                    <Button variant="outline" asChild className="w-full">
                      <Link href={type.href}>
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Ready to start?</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8 text-pretty">
              Open the dashboard and pick up where you left off. Everything stays on this device — no account,
              nothing to sign up for.
            </p>
            <LandingCtaRow withRoleOptions={false} size="lg" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
