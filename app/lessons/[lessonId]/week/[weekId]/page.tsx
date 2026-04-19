"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, BookOpen, CheckCircle2, ChevronRight, Volume2, Mic, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.shadcn"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge.shadcn"
import { Progress } from "@/components/ui/progress"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Flashcard } from "@/components/flashcard"
import { ExerciseRenderer } from "@/components/exercise-renderer"
import { useAuth } from "@/lib/context/auth-context"
import { hindiCourse } from "@/lib/data/hindi-course"
import type { Lesson, Week, VocabularyItem, Exercise } from "@/lib/types"

export default function WeekDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user, updateProgress } = useAuth()
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [week, setWeek] = useState<Week | null>(null)
  const [activeTab, setActiveTab] = useState("vocabulary")
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0)
  const [completedVocab, setCompletedVocab] = useState<Set<string>>(new Set())
  const [exerciseResults, setExerciseResults] = useState<Record<string, boolean>>({})
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const lessonId = params.lessonId as string
    const weekId = params.weekId as string
    
    const foundLesson = hindiCourse.lessons.find(l => l.id === lessonId)
    if (foundLesson) {
      setLesson(foundLesson)
      const foundWeek = foundLesson.weeks.find(w => w.id === weekId)
      if (foundWeek) {
        setWeek(foundWeek)
      }
    }
  }, [params.lessonId, params.weekId])

  const handleFlashcardComplete = (vocabId: string) => {
    setCompletedVocab(prev => new Set([...prev, vocabId]))
    if (currentFlashcardIndex < (week?.vocabulary.length || 0) - 1) {
      setCurrentFlashcardIndex(prev => prev + 1)
    }
  }

  const handleExerciseComplete = (exerciseId: string, isCorrect: boolean) => {
    setExerciseResults(prev => ({ ...prev, [exerciseId]: isCorrect }))
    
    if (user && lesson && week) {
      const totalExercises = week.exercises.length
      const completedExercises = Object.keys(exerciseResults).length + 1
      const progress = Math.round((completedExercises / totalExercises) * 100)
      
      updateProgress(lesson.id, {
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        currentWeek: parseInt(week.id.split('-').pop() || '1'),
        totalWeeks: lesson.weeks.length,
        completedExercises,
        totalExercises,
        lastAccessed: new Date().toISOString(),
        score: Math.round(
          (Object.values({ ...exerciseResults, [exerciseId]: isCorrect }).filter(Boolean).length / completedExercises) * 100
        ),
      })
    }
  }

  const vocabProgress = week ? Math.round((completedVocab.size / week.vocabulary.length) * 100) : 0
  const exerciseProgress = week ? Math.round((Object.keys(exerciseResults).length / week.exercises.length) * 100) : 0
  const overallProgress = Math.round((vocabProgress + exerciseProgress) / 2)

  if (!lesson || !week) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading week content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/lessons" className="hover:text-foreground transition-colors">
            Lessons
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href={`/lessons/${lesson.id}`} className="hover:text-foreground transition-colors">
            {lesson.title}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{week.title}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/lessons/${lesson.id}`)}
              className="mb-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Lesson
            </Button>
            <h1 className="text-3xl font-bold text-foreground">{week.title}</h1>
            <p className="text-muted-foreground mt-1">{week.description}</p>
          </div>
          
          <Card className="w-full md:w-auto">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{overallProgress}%</p>
                  <p className="text-xs text-muted-foreground">Complete</p>
                </div>
                <div className="w-48">
                  <Progress value={overallProgress} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Objectives */}
        <Card className="mb-8 border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Learning Objectives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid md:grid-cols-2 gap-2">
              {week.objectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span className="text-foreground">{objective}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="vocabulary" className="gap-2">
              <span className="hidden sm:inline">Vocabulary</span>
              <span className="sm:hidden">Vocab</span>
              <Badge variant="secondary" className="ml-1">
                {completedVocab.size}/{week.vocabulary.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="grammar">Grammar</TabsTrigger>
            <TabsTrigger value="exercises" className="gap-2">
              Exercises
              <Badge variant="secondary" className="ml-1">
                {Object.keys(exerciseResults).length}/{week.exercises.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="listening">Listening</TabsTrigger>
          </TabsList>

          {/* Vocabulary Tab */}
          <TabsContent value="vocabulary" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Vocabulary Practice</h2>
                <p className="text-muted-foreground">Click cards to flip and reveal meanings</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Card {currentFlashcardIndex + 1} of {week.vocabulary.length}
                </span>
              </div>
            </div>

            {/* Flashcard */}
            <div className="flex justify-center">
              <Flashcard
                vocabulary={week.vocabulary[currentFlashcardIndex]}
                onComplete={() => handleFlashcardComplete(week.vocabulary[currentFlashcardIndex].id)}
                isCompleted={completedVocab.has(week.vocabulary[currentFlashcardIndex].id)}
              />
            </div>

            {/* Flashcard Navigation */}
            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentFlashcardIndex(prev => Math.max(0, prev - 1))}
                disabled={currentFlashcardIndex === 0}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentFlashcardIndex(prev => Math.min(week.vocabulary.length - 1, prev + 1))}
                disabled={currentFlashcardIndex === week.vocabulary.length - 1}
              >
                Next
              </Button>
            </div>

            {/* Vocabulary Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
              {week.vocabulary.map((vocab, index) => (
                <button
                  key={vocab.id}
                  onClick={() => setCurrentFlashcardIndex(index)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    currentFlashcardIndex === index
                      ? "border-primary bg-primary/5"
                      : completedVocab.has(vocab.id)
                      ? "border-success/50 bg-success/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <p className="font-bold text-lg">{vocab.hindi}</p>
                  <p className="text-sm text-muted-foreground">{vocab.transliteration}</p>
                </button>
              ))}
            </div>
          </TabsContent>

          {/* Grammar Tab */}
          <TabsContent value="grammar" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Grammar Concepts</h2>
              <div className="prose prose-slate max-w-none">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3">Key Grammar Points</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-medium mb-2">Sentence Structure</h4>
                        <p className="text-muted-foreground">
                          Hindi follows Subject-Object-Verb (SOV) order, unlike English which uses SVO.
                        </p>
                        <div className="mt-3 p-3 bg-background rounded border">
                          <p className="text-sm">
                            <span className="font-bold">Example:</span>
                          </p>
                          <p className="text-primary font-medium mt-1">
                            मैं पानी पीता हूँ। (Main paani peeta hoon.)
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Literal: I water drink am. = I drink water.
                          </p>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-medium mb-2">Gender in Hindi</h4>
                        <p className="text-muted-foreground">
                          All Hindi nouns have gender - masculine or feminine. Verbs and adjectives agree with the gender of the noun.
                        </p>
                        <div className="mt-3 grid md:grid-cols-2 gap-3">
                          <div className="p-3 bg-background rounded border">
                            <p className="text-sm font-medium text-primary">Masculine (पुल्लिंग)</p>
                            <p className="text-sm mt-1">लड़का (ladka) - boy</p>
                            <p className="text-sm">पानी (paani) - water</p>
                          </div>
                          <div className="p-3 bg-background rounded border">
                            <p className="text-sm font-medium text-accent">Feminine (स्त्रीलिंग)</p>
                            <p className="text-sm mt-1">लड़की (ladki) - girl</p>
                            <p className="text-sm">किताब (kitaab) - book</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Exercises Tab */}
          <TabsContent value="exercises" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Practice Exercises</h2>
              <div className="space-y-4">
                {week.exercises.map((exercise, index) => (
                  <ExerciseRenderer
                    key={exercise.id}
                    exercise={exercise}
                    onComplete={(isCorrect) => handleExerciseComplete(exercise.id, isCorrect)}
                    isCompleted={exercise.id in exerciseResults}
                    wasCorrect={exerciseResults[exercise.id]}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Listening Tab */}
          <TabsContent value="listening" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Listening Comprehension</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <Volume2 className="h-10 w-10 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Audio Dialogue</h3>
                      <p className="text-muted-foreground">
                        Listen to the conversation and answer the questions below
                      </p>
                    </div>
                    <Button
                      size="lg"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="gap-2"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="h-5 w-5" />
                          Pause Audio
                        </>
                      ) : (
                        <>
                          <Play className="h-5 w-5" />
                          Play Audio
                        </>
                      )}
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      (Audio playback is simulated in this demo)
                    </p>
                  </div>

                  <div className="mt-8 p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-3">Dialogue Transcript</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex gap-3">
                        <span className="font-medium text-primary">A:</span>
                        <div>
                          <p>नमस्ते! आप कैसे हैं?</p>
                          <p className="text-muted-foreground italic">(Namaste! Aap kaise hain?)</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="font-medium text-accent">B:</span>
                        <div>
                          <p>नमस्ते! मैं ठीक हूँ, धन्यवाद। आप कैसे हैं?</p>
                          <p className="text-muted-foreground italic">(Namaste! Main theek hoon, dhanyavaad. Aap kaise hain?)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Speaking Practice */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mic className="h-5 w-5 text-primary" />
                    Speaking Practice
                  </CardTitle>
                  <CardDescription>
                    Practice your pronunciation by recording yourself
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="font-medium mb-2">Say this phrase:</p>
                      <p className="text-2xl font-bold text-primary">नमस्ते, मेरा नाम ___ है।</p>
                      <p className="text-muted-foreground italic mt-1">
                        (Namaste, mera naam ___ hai.)
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {"\"Hello, my name is ___.\""}
                      </p>
                    </div>
                    <Button variant="outline" className="w-full gap-2">
                      <Mic className="h-4 w-4" />
                      Start Recording
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      (Recording feature is simulated in this demo)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Week Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t">
          <Button
            variant="outline"
            onClick={() => {
              const currentWeekIndex = lesson.weeks.findIndex(w => w.id === week.id)
              if (currentWeekIndex > 0) {
                router.push(`/lessons/${lesson.id}/week/${lesson.weeks[currentWeekIndex - 1].id}`)
              }
            }}
            disabled={lesson.weeks.findIndex(w => w.id === week.id) === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous Week
          </Button>
          
          {lesson.weeks.findIndex(w => w.id === week.id) === lesson.weeks.length - 1 ? (
            <Button onClick={() => router.push(`/lessons/${lesson.id}`)}>
              Complete Lesson
              <CheckCircle2 className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={() => {
                const currentWeekIndex = lesson.weeks.findIndex(w => w.id === week.id)
                router.push(`/lessons/${lesson.id}/week/${lesson.weeks[currentWeekIndex + 1].id}`)
              }}
            >
              Next Week
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
