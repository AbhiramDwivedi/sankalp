import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.shadcn'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { LevelBadge } from '@/components/level-badge'
import {
  BookOpen,
  GraduationCap,
  Users,
  Trophy,
  CheckCircle,
  ArrowRight,
  Headphones,
  Mic,
  PenLine,
  Brain,
  Sparkles,
  Target
} from 'lucide-react'
import { availableLanguages } from '@/lib/data/hindi-course'
import type { FluencyLevel } from '@/lib/types'

const features = [
  {
    icon: BookOpen,
    title: 'Weekly Lesson Plans',
    description: 'Structured curriculum with vocabulary, grammar, listening, and speaking practice each week.',
  },
  {
    icon: Brain,
    title: 'Interactive Exercises',
    description: 'Engaging flashcards, quizzes, drag-and-drop activities, and fill-in-the-blank exercises.',
  },
  {
    icon: Headphones,
    title: 'Listening Practice',
    description: 'Audio clips with native speakers to train your ear for authentic pronunciation.',
  },
  {
    icon: Mic,
    title: 'Speaking Practice',
    description: 'Record and compare your pronunciation to build speaking confidence.',
  },
  {
    icon: Trophy,
    title: 'Capstone Projects',
    description: 'End-of-unit projects that demonstrate mastery and cement your learning.',
  },
  {
    icon: Target,
    title: 'Mock Exams',
    description: 'Practice tests aligned with STAMP proficiency levels for exam readiness.',
  },
]

const proficiencyLevels: { level: FluencyLevel; topics: string[] }[] = [
  {
    level: 'novice-low',
    topics: ['Basic greetings', 'Family members', 'Numbers 1-10', 'Colors'],
  },
  {
    level: 'novice-mid',
    topics: ['School vocabulary', 'Weather', 'Time expressions', 'Simple phrases'],
  },
  {
    level: 'novice-high',
    topics: ['Daily routine', 'Food and meals', 'Simple conversations', 'Descriptions'],
  },
  {
    level: 'intermediate-low',
    topics: ['Past tense', 'Future plans', 'Shopping dialogues', 'Health'],
  },
  {
    level: 'intermediate-mid',
    topics: ['Travel and directions', 'Cultural discussions', 'Opinions', 'Storytelling'],
  },
]

const userTypes = [
  {
    icon: GraduationCap,
    title: 'Students',
    description: 'Interactive lessons designed for middle schoolers with gamified progress tracking.',
    href: '/auth/register?role=student',
  },
  {
    icon: Users,
    title: 'Parents',
    description: 'Monitor your child\'s progress and understand the curriculum requirements.',
    href: '/auth/register?role=parent',
  },
  {
    icon: BookOpen,
    title: 'Teachers',
    description: 'Manage multiple students, track class progress, and access teaching resources.',
    href: '/auth/register?role=teacher',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background py-20 md:py-32">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                World Language Credit for Middle School
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
                Learn Hindi and more — interactive lessons, capstones, and{' '}
                <span className="text-primary">STAMP-aligned practice</span>.
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed text-pretty">
                An engaging learning platform designed for middle school students to master Indian world languages and earn academic credit. Interactive lessons, capstone projects, and STAMP-aligned assessments.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" asChild className="w-full sm:w-auto">
                  <Link href="/auth/register">
                    Start Learning Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                  <Link href="/courses">Browse Courses</Link>
                </Button>
              </div>
              
              <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
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

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                Everything You Need to Succeed
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Our comprehensive curriculum covers all aspects of language learning with engaging, interactive content.
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

        {/* Proficiency Levels Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                5 Proficiency Levels
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Start where you are and progress through STAMP-aligned levels from Novice to Intermediate.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Progress line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border md:hidden" />
                
                <div className="space-y-6">
                  {proficiencyLevels.map((item, index) => (
                    <div key={item.level} className="flex gap-4 md:gap-6">
                      <div className="flex-shrink-0 relative z-10">
                        <div className="w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center font-bold text-primary">
                          {index + 1}
                        </div>
                      </div>
                      <Card className="flex-1">
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-3">
                            <LevelBadge level={item.level} size="md" />
                          </div>
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

        {/* Languages Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                Indian Languages
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Starting with Hindi, with more languages coming soon.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
              {availableLanguages.map((lang) => (
                <Card
                  key={lang.id}
                  className={`text-center hover:border-primary/50 transition-colors ${
                    lang.id === 'hindi' ? 'border-primary ring-1 ring-primary/20' : ''
                  }`}
                >
                  <CardContent className="pt-6">
                    <div className="text-4xl mb-2">{lang.nativeName}</div>
                    <p className="font-medium text-foreground">{lang.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{lang.script} script</p>
                    {lang.id !== 'hindi' && (
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

        {/* User Types Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                Built for Everyone
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Whether you are a student, parent, or teacher, Sankalp has tools designed for you.
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

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              Ready to Start Your Language Journey?
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8 text-pretty">
              Join thousands of students learning Indian languages and earning world language credit.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/auth/register">
                  Create Free Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-transparent border-primary-foreground/30 hover:bg-primary-foreground/10">
                <Link href="/resources">View Resources</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
