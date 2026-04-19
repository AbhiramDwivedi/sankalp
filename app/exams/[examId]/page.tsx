"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { 
  ArrowLeft, Clock, ChevronRight, ChevronLeft, CheckCircle2, 
  AlertCircle, Volume2, Mic, Flag, Trophy
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.shadcn"
import { Badge } from "@/components/ui/badge.shadcn"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LevelBadge } from "@/components/level-badge"
import { getMockExamById } from "@/lib/data/capstones"
import type { MockExam, ExamQuestion } from "@/lib/types"

type ExamState = "intro" | "in-progress" | "review" | "results"

interface Answer {
  questionId: string
  answer: string
  isCorrect?: boolean
}

export default function ExamPage() {
  const params = useParams()
  const router = useRouter()
  const [exam, setExam] = useState<MockExam | null>(null)
  const [examState, setExamState] = useState<ExamState>("intro")
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set())

  useEffect(() => {
    const examId = params.examId as string
    const found = getMockExamById(examId)
    if (found) {
      setExam(found)
      setTimeRemaining(found.duration * 60)
    }
  }, [params.examId])

  // Timer
  useEffect(() => {
    if (examState !== "in-progress") return
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setExamState("results")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [examState])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getCurrentQuestion = useCallback((): ExamQuestion | null => {
    if (!exam) return null
    const section = exam.sections[currentSectionIndex]
    return section?.questions[currentQuestionIndex] || null
  }, [exam, currentSectionIndex, currentQuestionIndex])

  const getAllQuestions = useCallback((): { sectionIndex: number; questionIndex: number; question: ExamQuestion }[] => {
    if (!exam) return []
    const questions: { sectionIndex: number; questionIndex: number; question: ExamQuestion }[] = []
    exam.sections.forEach((section, sIndex) => {
      section.questions.forEach((question, qIndex) => {
        questions.push({ sectionIndex: sIndex, questionIndex: qIndex, question })
      })
    })
    return questions
  }, [exam])

  const currentQuestionGlobalIndex = useCallback(() => {
    if (!exam) return 0
    let index = 0
    for (let i = 0; i < currentSectionIndex; i++) {
      index += exam.sections[i].questions.length
    }
    return index + currentQuestionIndex
  }, [exam, currentSectionIndex, currentQuestionIndex])

  const handleAnswer = (answer: string) => {
    const question = getCurrentQuestion()
    if (!question) return

    setAnswers(prev => {
      const existing = prev.findIndex(a => a.questionId === question.id)
      const newAnswer: Answer = {
        questionId: question.id,
        answer,
        isCorrect: question.correctAnswer ? answer === question.correctAnswer : undefined
      }
      
      if (existing >= 0) {
        const updated = [...prev]
        updated[existing] = newAnswer
        return updated
      }
      return [...prev, newAnswer]
    })
  }

  const getCurrentAnswer = () => {
    const question = getCurrentQuestion()
    if (!question) return ""
    return answers.find(a => a.questionId === question.id)?.answer || ""
  }

  const navigateToQuestion = (sectionIndex: number, questionIndex: number) => {
    setCurrentSectionIndex(sectionIndex)
    setCurrentQuestionIndex(questionIndex)
  }

  const goToNextQuestion = () => {
    if (!exam) return
    
    const currentSection = exam.sections[currentSectionIndex]
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else if (currentSectionIndex < exam.sections.length - 1) {
      setCurrentSectionIndex(prev => prev + 1)
      setCurrentQuestionIndex(0)
    }
  }

  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    } else if (currentSectionIndex > 0 && exam) {
      setCurrentSectionIndex(prev => prev - 1)
      setCurrentQuestionIndex(exam.sections[currentSectionIndex - 1].questions.length - 1)
    }
  }

  const toggleFlag = () => {
    const question = getCurrentQuestion()
    if (!question) return
    
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(question.id)) {
        newSet.delete(question.id)
      } else {
        newSet.add(question.id)
      }
      return newSet
    })
  }

  const calculateScore = () => {
    if (!exam) return { score: 0, total: 0, percentage: 0 }
    
    let score = 0
    let total = 0

    exam.sections.forEach(section => {
      section.questions.forEach(question => {
        total += question.points
        const answer = answers.find(a => a.questionId === question.id)
        if (answer?.isCorrect) {
          score += question.points
        }
      })
    })

    return { score, total, percentage: Math.round((score / total) * 100) }
  }

  const handleSubmit = () => {
    setExamState("results")
  }

  if (!exam) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading exam...</p>
        </div>
      </div>
    )
  }

  // Intro Screen
  if (examState === "intro") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/exams")}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Exams
          </Button>

          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <LevelBadge level={exam.level} />
              </div>
              <CardTitle className="text-2xl">{exam.title}</CardTitle>
              <CardDescription>{exam.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-muted rounded-lg">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-2xl font-bold">{exam.duration}</p>
                  <p className="text-sm text-muted-foreground">Minutes</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <CheckCircle2 className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-2xl font-bold">{exam.totalQuestions}</p>
                  <p className="text-sm text-muted-foreground">Questions</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <Trophy className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-2xl font-bold">{exam.passingScore}%</p>
                  <p className="text-sm text-muted-foreground">To Pass</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Exam Sections:</h3>
                <ul className="space-y-2">
                  {exam.sections.map((section, index) => (
                    <li key={section.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <span>{section.title}</span>
                      </div>
                      <Badge variant="secondary">{section.questions.length} questions</Badge>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-warning/10 rounded-lg flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">Before you begin:</p>
                  <ul className="mt-2 space-y-1 text-muted-foreground">
                    <li>Make sure you have a quiet environment</li>
                    <li>The timer will start when you click Begin</li>
                    <li>You can flag questions to review later</li>
                    <li>You can navigate between questions freely</li>
                  </ul>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full"
                onClick={() => setExamState("in-progress")}
              >
                Begin Exam
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  // Results Screen
  if (examState === "results") {
    const { score, total, percentage } = calculateScore()
    const passed = percentage >= exam.passingScore

    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
          <Card>
            <CardHeader className="text-center">
              <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
                passed ? "bg-success/10" : "bg-warning/10"
              }`}>
                {passed ? (
                  <Trophy className="h-10 w-10 text-success" />
                ) : (
                  <AlertCircle className="h-10 w-10 text-warning" />
                )}
              </div>
              <CardTitle className="text-2xl">
                {passed ? "Congratulations!" : "Keep Practicing!"}
              </CardTitle>
              <CardDescription>
                {passed 
                  ? "You passed the exam. Great job!"
                  : `You need ${exam.passingScore}% to pass. Review the material and try again.`
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-8 bg-muted rounded-lg">
                <p className="text-6xl font-bold text-primary">{percentage}%</p>
                <p className="text-muted-foreground mt-2">
                  {score} out of {total} points
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Section Breakdown:</h3>
                <div className="space-y-3">
                  {exam.sections.map((section) => {
                    let sectionScore = 0
                    let sectionTotal = 0
                    section.questions.forEach(q => {
                      sectionTotal += q.points
                      const answer = answers.find(a => a.questionId === q.id)
                      if (answer?.isCorrect) sectionScore += q.points
                    })
                    const sectionPercentage = Math.round((sectionScore / sectionTotal) * 100) || 0

                    return (
                      <div key={section.id} className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{section.title}</span>
                            <span className="text-sm text-muted-foreground">
                              {sectionScore}/{sectionTotal}
                            </span>
                          </div>
                          <Progress value={sectionPercentage} className="h-2" />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => router.push("/exams")}
                >
                  Back to Exams
                </Button>
                <Button 
                  className="flex-1"
                  onClick={() => {
                    setExamState("intro")
                    setAnswers([])
                    setCurrentSectionIndex(0)
                    setCurrentQuestionIndex(0)
                    setTimeRemaining(exam.duration * 60)
                    setFlaggedQuestions(new Set())
                  }}
                >
                  Retake Exam
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  // In-Progress Screen
  const currentQuestion = getCurrentQuestion()
  const allQuestions = getAllQuestions()
  const totalQuestions = allQuestions.length
  const answeredCount = answers.length
  const currentIndex = currentQuestionGlobalIndex()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Exam Header */}
      <header className="sticky top-0 z-50 bg-background border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="font-semibold">{exam.title}</h1>
              <Badge variant="secondary">
                {exam.sections[currentSectionIndex].title}
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                timeRemaining < 300 ? "bg-destructive/10 text-destructive" : "bg-muted"
              }`}>
                <Clock className="h-4 w-4" />
                <span className="font-mono font-medium">{formatTime(timeRemaining)}</span>
              </div>
              <Button variant="destructive" size="sm" onClick={handleSubmit}>
                Submit Exam
              </Button>
            </div>
          </div>
          <Progress 
            value={(currentIndex / totalQuestions) * 100} 
            className="h-1 mt-3"
          />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Question Content */}
          <div className="lg:col-span-3">
            {currentQuestion && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">
                      Question {currentIndex + 1} of {totalQuestions}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Badge>{currentQuestion.points} pts</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleFlag}
                        className={flaggedQuestions.has(currentQuestion.id) ? "text-warning" : ""}
                      >
                        <Flag className={`h-4 w-4 ${flaggedQuestions.has(currentQuestion.id) ? "fill-warning" : ""}`} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Question Text */}
                  <div>
                    <p className="text-lg font-medium">{currentQuestion.question}</p>
                    {currentQuestion.hindiText && (
                      <p className="text-2xl text-primary mt-2">{currentQuestion.hindiText}</p>
                    )}
                    {currentQuestion.passage && (
                      <div className="mt-4 p-4 bg-muted rounded-lg">
                        <p className="text-lg">{currentQuestion.passage}</p>
                      </div>
                    )}
                  </div>

                  {/* Audio for listening */}
                  {currentQuestion.audioUrl && (
                    <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Volume2 className="h-4 w-4" />
                        Play Audio
                      </Button>
                      <span className="text-sm text-muted-foreground">(Audio simulated)</span>
                    </div>
                  )}

                  {/* Answer Options */}
                  {currentQuestion.type === "multiple-choice" && currentQuestion.options && (
                    <RadioGroup value={getCurrentAnswer()} onValueChange={handleAnswer}>
                      <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => (
                          <div
                            key={index}
                            className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                              getCurrentAnswer() === option
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                            onClick={() => handleAnswer(option)}
                          >
                            <RadioGroupItem value={option} id={`option-${index}`} />
                            <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  )}

                  {currentQuestion.type === "fill-blank" && (
                    <Input
                      placeholder="Type your answer..."
                      value={getCurrentAnswer()}
                      onChange={(e) => handleAnswer(e.target.value)}
                      className="text-lg"
                    />
                  )}

                  {currentQuestion.type === "short-answer" && (
                    <div>
                      <Textarea
                        placeholder="Write your answer..."
                        value={getCurrentAnswer()}
                        onChange={(e) => handleAnswer(e.target.value)}
                        className="min-h-[150px]"
                      />
                      {currentQuestion.rubric && (
                        <p className="text-sm text-muted-foreground mt-2">
                          Grading criteria: {currentQuestion.rubric}
                        </p>
                      )}
                    </div>
                  )}

                  {currentQuestion.type === "speaking" && (
                    <div className="text-center p-8 bg-muted rounded-lg">
                      <Mic className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <Button variant="outline" size="lg" className="gap-2">
                        <Mic className="h-5 w-5" />
                        Start Recording
                      </Button>
                      <p className="text-sm text-muted-foreground mt-4">
                        Recording feature is simulated in this demo
                      </p>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex justify-between pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={goToPrevQuestion}
                      disabled={currentSectionIndex === 0 && currentQuestionIndex === 0}
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                    
                    {currentIndex === totalQuestions - 1 ? (
                      <Button onClick={handleSubmit}>
                        Submit Exam
                        <CheckCircle2 className="h-4 w-4 ml-2" />
                      </Button>
                    ) : (
                      <Button onClick={goToNextQuestion}>
                        Next
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Question Navigator */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Question Navigator</CardTitle>
                <CardDescription>
                  {answeredCount} of {totalQuestions} answered
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {exam.sections.map((section, sIndex) => (
                    <div key={section.id}>
                      <p className="text-xs font-medium text-muted-foreground mb-2">
                        {section.title}
                      </p>
                      <div className="grid grid-cols-5 gap-1">
                        {section.questions.map((q, qIndex) => {
                          const isAnswered = answers.some(a => a.questionId === q.id)
                          const isCurrent = sIndex === currentSectionIndex && qIndex === currentQuestionIndex
                          const isFlagged = flaggedQuestions.has(q.id)
                          
                          return (
                            <button
                              key={q.id}
                              onClick={() => navigateToQuestion(sIndex, qIndex)}
                              className={`w-8 h-8 rounded text-xs font-medium transition-colors relative ${
                                isCurrent
                                  ? "bg-primary text-primary-foreground"
                                  : isAnswered
                                  ? "bg-success/20 text-success"
                                  : "bg-muted hover:bg-muted/80"
                              }`}
                            >
                              {qIndex + 1}
                              {isFlagged && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-warning rounded-full" />
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-primary" />
                    <span>Current</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-success/20" />
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-muted relative">
                      <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-warning rounded-full" />
                    </div>
                    <span>Flagged</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
