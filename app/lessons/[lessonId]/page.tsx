'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.shadcn'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Flashcard } from '@/components/flashcard'
import { ExerciseRenderer } from '@/components/exercise-renderer'
import { useAuth } from '@/lib/context/auth-context'
import { hindiCourse } from '@/lib/data/hindi-course'
import { toast } from 'sonner'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Clock,
  Trophy,
  Volume2
} from 'lucide-react'
import type { Lesson } from '@/lib/types'

// Helper to find lesson by ID
function findLessonById(id: string): Lesson | null {
  for (const level of hindiCourse.levels) {
    for (const topic of level.topics) {
      for (const week of topic.weeks) {
        const lesson = week.lessons.find(l => l.id === id)
        if (lesson) return lesson
      }
    }
  }
  return null
}

export default function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { user, updateProgress, getStudentProgress } = useAuth()
  const [activeTab, setActiveTab] = useState('learn')
  const [exerciseIndex, setExerciseIndex] = useState(0)
  const [results, setResults] = useState<{ exerciseId: string; correct: boolean; answer: string }[]>([])
  const [isComplete, setIsComplete] = useState(false)

  const lesson = findLessonById(resolvedParams.lessonId)
  const progress = getStudentProgress()
  const existingProgress = progress?.lessonsCompleted.find(l => l.lessonId === resolvedParams.lessonId)

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
    }
  }, [user, router])

  if (!lesson) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="py-12 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Lesson Not Found</h2>
              <p className="text-muted-foreground mb-4">
                This lesson does not exist or has been removed.
              </p>
              <Button asChild>
                <Link href="/lessons">Back to Lessons</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  const currentExercise = lesson.exercises[exerciseIndex]
  const exerciseProgress = ((exerciseIndex + 1) / lesson.exercises.length) * 100

  const handleAnswer = (correct: boolean, answer: string) => {
    setResults([...results, { exerciseId: currentExercise.id, correct, answer }])
  }

  const handleNextExercise = () => {
    if (exerciseIndex < lesson.exercises.length - 1) {
      setExerciseIndex(exerciseIndex + 1)
    } else {
      // Calculate score
      const correctCount = results.filter(r => r.correct).length
      const score = Math.round((correctCount / lesson.exercises.length) * 100)

      // Update progress
      if (user?.role === 'student') {
        updateProgress({
          lessonsCompleted: [
            ...(progress?.lessonsCompleted || []).filter(l => l.lessonId !== lesson.id),
            {
              lessonId: lesson.id,
              completed: true,
              score,
              attempts: (existingProgress?.attempts || 0) + 1,
              lastAttemptDate: new Date().toISOString(),
              exerciseResults: results
            }
          ]
        })
      }

      setIsComplete(true)
      toast.success(`Lesson complete! Score: ${score}%`)
    }
  }

  const handlePlayAudio = () => {
    if ('speechSynthesis' in window && lesson.content.dialogues?.[0]) {
      const text = lesson.content.dialogues[0].lines.map(l => l.text).join(' ')
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'hi-IN'
      speechSynthesis.speak(utterance)
    }
  }

  if (isComplete) {
    const correctCount = results.filter(r => r.correct).length
    const score = Math.round((correctCount / lesson.exercises.length) * 100)

    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 bg-muted/20 flex items-center justify-center py-8">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="py-12 text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Trophy className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Lesson Complete!</h2>
              <p className="text-muted-foreground mb-6">{lesson.title}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-3xl font-bold text-foreground">{score}%</p>
                  <p className="text-sm text-muted-foreground">Score</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-3xl font-bold text-foreground">{correctCount}/{lesson.exercises.length}</p>
                  <p className="text-sm text-muted-foreground">Correct</p>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full" asChild>
                  <Link href="/dashboard">Back to Dashboard</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/lessons">More Lessons</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Lesson Header */}
      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/lessons">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div>
                <h1 className="font-semibold text-foreground">{lesson.title}</h1>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="capitalize">{lesson.type}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {lesson.duration} min
                  </span>
                </div>
              </div>
            </div>
            {existingProgress && (
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Previously: {existingProgress.score}%</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <main className="flex-1 bg-muted/20 py-8">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="learn">Learn</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
            </TabsList>

            <TabsContent value="learn">
              <div className="max-w-3xl mx-auto space-y-6">
                {/* Introduction */}
                {lesson.content.introduction && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Introduction</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {lesson.content.introduction}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Cultural Note */}
                {lesson.content.culturalNote && (
                  <Card className="border-accent/30 bg-accent/5">
                    <CardHeader>
                      <CardTitle className="text-lg text-accent">Cultural Note</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {lesson.content.culturalNote}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Vocabulary Flashcards */}
                {lesson.content.vocabulary && lesson.content.vocabulary.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Vocabulary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Flashcard 
                        vocabulary={lesson.content.vocabulary}
                        onComplete={() => setActiveTab('practice')}
                      />
                    </CardContent>
                  </Card>
                )}

                {/* Grammar Rules */}
                {lesson.content.grammarRules && lesson.content.grammarRules.length > 0 && (
                  <div className="space-y-4">
                    {lesson.content.grammarRules.map((rule) => (
                      <Card key={rule.id}>
                        <CardHeader>
                          <CardTitle className="text-lg">{rule.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-muted-foreground">{rule.explanation}</p>
                          <div className="space-y-3">
                            {rule.examples.map((example, i) => (
                              <div key={i} className="p-4 bg-muted/50 rounded-lg">
                                <p className="text-xl font-medium text-foreground mb-1">{example.hindi}</p>
                                <p className="text-muted-foreground">{example.transliteration}</p>
                                <p className="text-sm text-primary mt-2">{example.english}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Dialogues */}
                {lesson.content.dialogues && lesson.content.dialogues.length > 0 && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{lesson.content.dialogues[0].title}</CardTitle>
                        <Button variant="outline" size="sm" onClick={handlePlayAudio}>
                          <Volume2 className="h-4 w-4 mr-2" />
                          Play Audio
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {lesson.content.dialogues[0].context}
                      </p>
                      <div className="space-y-4">
                        {lesson.content.dialogues[0].lines.map((line, i) => (
                          <div key={i} className="p-4 bg-muted/30 rounded-lg">
                            <p className="text-sm font-medium text-primary mb-1">{line.speaker}:</p>
                            <p className="text-lg text-foreground">{line.text}</p>
                            <p className="text-muted-foreground">{line.transliteration}</p>
                            <p className="text-sm text-muted-foreground mt-1">{line.translation}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Continue to Practice button */}
                <div className="flex justify-center">
                  <Button size="lg" onClick={() => setActiveTab('practice')}>
                    Continue to Practice
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="practice">
              <div className="max-w-2xl mx-auto space-y-6">
                {/* Progress */}
                <div className="flex items-center gap-4">
                  <Progress value={exerciseProgress} className="flex-1" />
                  <span className="text-sm text-muted-foreground">
                    {exerciseIndex + 1} / {lesson.exercises.length}
                  </span>
                </div>

                {/* Current Exercise */}
                <ExerciseRenderer
                  key={currentExercise.id}
                  exercise={currentExercise}
                  onAnswer={handleAnswer}
                />

                {/* Next button (only show after answering) */}
                {results.length > exerciseIndex && (
                  <div className="flex justify-end">
                    <Button onClick={handleNextExercise}>
                      {exerciseIndex < lesson.exercises.length - 1 ? (
                        <>
                          Next Exercise
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Complete Lesson
                          <CheckCircle className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
