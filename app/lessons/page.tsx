'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.shadcn'
import { LevelBadge } from '@/components/level-badge'
import { hindiCourse } from '@/lib/data/hindi-course'
import { useAuth } from '@/lib/context/auth-context'
import { Clock, BookOpen, CheckCircle, Lock } from 'lucide-react'
import type { StudentProfile } from '@/lib/types'

export default function LessonsPage() {
  const { user, getStudentProgress } = useAuth()
  const progress = getStudentProgress()
  const completedLessonIds = new Set(progress?.lessonsCompleted.map(l => l.lessonId) || [])

  const isStudent = user?.role === 'student'
  const student = user as StudentProfile | null

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/20 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Lessons</h1>
            <p className="text-muted-foreground">
              Interactive lessons covering vocabulary, grammar, listening, and speaking
            </p>
          </div>

          {hindiCourse.levels.map((level, levelIndex) => {
            const isAccessible = !isStudent || level.fluencyLevel === student?.fluencyLevel || levelIndex === 0
            
            return (
              <div key={level.id} className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <LevelBadge level={level.fluencyLevel} />
                  <h2 className="text-xl font-semibold text-foreground">{level.name}</h2>
                  {!isAccessible && <Lock className="h-4 w-4 text-muted-foreground" />}
                </div>

                {level.topics.map((topic) => (
                  <div key={topic.id} className="mb-6">
                    <h3 className="text-lg font-medium text-foreground mb-3">{topic.name}</h3>
                    
                    {topic.weeks.map((week) => (
                      <div key={week.id} className="mb-4">
                        <h4 className="text-sm font-medium text-muted-foreground mb-3">
                          Week {week.number}: {week.title}
                        </h4>
                        
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {week.lessons.map((lesson) => {
                            const isCompleted = completedLessonIds.has(lesson.id)
                            const lessonProgress = progress?.lessonsCompleted.find(l => l.lessonId === lesson.id)
                            
                            return (
                              <Link
                                key={lesson.id}
                                href={isAccessible ? `/lessons/${lesson.id}` : '#'}
                                className={!isAccessible ? 'pointer-events-none opacity-50' : ''}
                              >
                                <Card className={`h-full transition-all hover:border-primary/50 ${
                                  isCompleted ? 'bg-primary/5 border-primary/30' : ''
                                }`}>
                                  <CardHeader className="pb-2">
                                    <div className="flex items-start justify-between gap-2">
                                      <div className="flex-1">
                                        <CardTitle className="text-base">{lesson.title}</CardTitle>
                                        <CardDescription className="capitalize">{lesson.type}</CardDescription>
                                      </div>
                                      {isCompleted && (
                                        <div className="flex items-center gap-1 text-primary">
                                          <CheckCircle className="h-5 w-5" />
                                          <span className="text-sm font-medium">{lessonProgress?.score}%</span>
                                        </div>
                                      )}
                                    </div>
                                  </CardHeader>
                                  <CardContent>
                                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                      {lesson.description}
                                    </p>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                      <span className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        {lesson.duration} min
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <BookOpen className="h-4 w-4" />
                                        {lesson.exercises.length} exercises
                                      </span>
                                    </div>
                                  </CardContent>
                                </Card>
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}

                {level.topics.length === 0 && (
                  <Card className="bg-muted/50">
                    <CardContent className="py-8 text-center">
                      <BookOpen className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Content coming soon</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )
          })}
        </div>
      </main>
      <Footer />
    </div>
  )
}
