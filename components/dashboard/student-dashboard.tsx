'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.shadcn'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useAuth } from '@/lib/context/auth-context'
import { LevelBadge } from '@/components/level-badge'
import { ProgressRing } from '@/components/progress-ring'
import { hindiCourse } from '@/lib/data/hindi-course'
import { FLUENCY_LEVELS, type StudentProfile } from '@/lib/types'
import {
  BookOpen,
  Trophy,
  Flame,
  Target,
  ArrowRight,
  Clock,
  CheckCircle,
  PlayCircle,
  Sparkles,
  Calendar
} from 'lucide-react'

export function StudentDashboard() {
  const { user, getStudentProgress } = useAuth()
  const student = user as StudentProfile
  const progress = getStudentProgress()

  const currentLevel = hindiCourse.levels.find(l => l.id === (progress?.currentLevelId || 'lv1'))
  const currentTopic = currentLevel?.topics[0]
  const currentWeek = currentTopic?.weeks.find(w => w.id === (progress?.currentWeekId || 'w1'))

  const levelInfo = FLUENCY_LEVELS[student.fluencyLevel]

  // Calculate stats
  const lessonsCompleted = progress?.lessonsCompleted.length || 0
  const totalLessons = currentWeek?.lessons.length || 5
  const weekProgress = progress?.weekProgress.find(w => w.weekId === currentWeek?.id)
  const overallProgress = progress?.overallProgress || 0

  // Next lesson
  const completedLessonIds = new Set(progress?.lessonsCompleted.map(l => l.lessonId) || [])
  const nextLesson = currentWeek?.lessons.find(l => !completedLessonIds.has(l.id))

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {student.name.split(' ')[0]}!
            </h1>
            <p className="text-muted-foreground mt-1">
              Continue your Hindi learning journey
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10">
              <Flame className="h-5 w-5 text-primary" />
              <span className="font-bold text-primary">{student.streak}</span>
              <span className="text-sm text-muted-foreground">day streak</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10">
              <Sparkles className="h-5 w-5 text-secondary" />
              <span className="font-bold text-secondary">{student.totalXp}</span>
              <span className="text-sm text-muted-foreground">XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Continue Learning */}
        <div className="lg:col-span-2 space-y-6">
          {/* Continue Learning Card */}
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
            <CardHeader>
              <div className="flex items-center gap-2 text-primary text-sm font-medium mb-2">
                <PlayCircle className="h-4 w-4" />
                Continue Learning
              </div>
              <CardTitle className="text-2xl">{currentWeek?.title || 'Start Your Journey'}</CardTitle>
              <CardDescription>
                {currentLevel?.name} - {currentTopic?.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Week Progress</span>
                      <span className="text-sm font-medium">
                        {weekProgress?.lessonsCompleted || 0} / {totalLessons} lessons
                      </span>
                    </div>
                    <Progress value={(weekProgress?.lessonsCompleted || 0) / totalLessons * 100} className="h-2" />
                  </div>

                  {nextLesson && (
                    <div className="p-4 rounded-lg bg-background border border-border">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Next Lesson</p>
                          <h3 className="font-semibold text-foreground">{nextLesson.title}</h3>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {nextLesson.duration} min
                            </span>
                            <span className="capitalize">{nextLesson.type}</span>
                          </div>
                        </div>
                        <Button asChild>
                          <Link href={`/lessons/${nextLesson.id}`}>
                            Start
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center">
                  <ProgressRing 
                    progress={overallProgress} 
                    size={120}
                    label="Overall"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* This Week's Lessons */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                This Week&apos;s Lessons
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentWeek?.lessons.map((lesson, index) => {
                  const isCompleted = completedLessonIds.has(lesson.id)
                  const isNext = lesson.id === nextLesson?.id
                  
                  return (
                    <Link
                      key={lesson.id}
                      href={`/lessons/${lesson.id}`}
                      className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                        isCompleted 
                          ? 'bg-muted/50 border-border' 
                          : isNext 
                            ? 'border-primary bg-primary/5 hover:bg-primary/10' 
                            : 'border-border hover:border-primary/50 hover:bg-muted/30'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isCompleted 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <span className="font-medium">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground truncate">{lesson.title}</h4>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="capitalize">{lesson.type}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {lesson.duration} min
                          </span>
                        </div>
                      </div>
                      {isCompleted && (
                        <span className="text-sm text-primary font-medium">
                          {progress?.lessonsCompleted.find(l => l.lessonId === lesson.id)?.score}%
                        </span>
                      )}
                    </Link>
                  )
                })}
              </div>

              {currentWeek?.capstone && (
                <div className="mt-4 pt-4 border-t border-border">
                  <Link
                    href={`/capstones/${currentWeek.capstone.id}`}
                    className="flex items-center gap-4 p-4 rounded-lg border border-dashed border-primary/50 hover:bg-primary/5 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Trophy className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">Capstone Project</h4>
                      <p className="text-sm text-muted-foreground">{currentWeek.capstone.title}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-primary" />
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Stats & Quick Actions */}
        <div className="space-y-6">
          {/* Current Level Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <LevelBadge level={student.fluencyLevel} size="lg" className="mb-3" />
                <h3 className="font-semibold text-foreground mb-1">{levelInfo.label}</h3>
                <p className="text-sm text-muted-foreground mb-4">{levelInfo.description}</p>
                <div className="space-y-2">
                  {levelInfo.characteristics.slice(0, 2).map((char, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-left">{char}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span className="text-sm">Lessons Completed</span>
                </div>
                <span className="font-semibold text-foreground">{lessonsCompleted}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Grade Level</span>
                </div>
                <span className="font-semibold text-foreground">{student.gradeLevel}th Grade</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Target className="h-4 w-4" />
                  <span className="text-sm">Current Course</span>
                </div>
                <span className="font-semibold text-foreground">Hindi</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/practice/flashcards">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Practice Flashcards
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/exams">
                  <Target className="mr-2 h-4 w-4" />
                  Take Mock Exam
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/courses/hindi">
                  <BookOpen className="mr-2 h-4 w-4" />
                  View Full Curriculum
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
