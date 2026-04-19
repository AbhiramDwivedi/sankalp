'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.shadcn'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useAuth } from '@/lib/context/auth-context'
import { LevelBadge } from '@/components/level-badge'
import { ProgressRing } from '@/components/progress-ring'
import { hindiCourse } from '@/lib/data/hindi-course'
import type { ParentProfile, StudentProfile } from '@/lib/types'
import {
  Users,
  BookOpen,
  Trophy,
  Flame,
  ArrowRight,
  Clock,
  CheckCircle,
  FileText,
  HelpCircle,
  ExternalLink
} from 'lucide-react'

export function ParentDashboard() {
  const { user, getLinkedStudents, getStudentProgress } = useAuth()
  const parent = user as ParentProfile
  const linkedStudents = getLinkedStudents()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome, {parent.name.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground mt-1">
          Monitor your child&apos;s progress and explore the curriculum
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Student Progress */}
        <div className="lg:col-span-2 space-y-6">
          {linkedStudents.length > 0 ? (
            linkedStudents.map((student) => {
              const progress = getStudentProgress(student.id)
              const currentLevel = hindiCourse.levels.find(l => l.id === (progress?.currentLevelId || 'lv1'))
              
              return (
                <Card key={student.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <CardTitle>{student.name}</CardTitle>
                          <CardDescription>
                            {student.gradeLevel}th Grade - {currentLevel?.name || 'Level 1'}
                          </CardDescription>
                        </div>
                      </div>
                      <LevelBadge level={student.fluencyLevel} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-6">
                      <div className="p-4 rounded-lg bg-muted/50 text-center">
                        <div className="flex items-center justify-center gap-1 text-primary mb-1">
                          <Flame className="h-5 w-5" />
                          <span className="text-2xl font-bold">{student.streak}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Day Streak</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50 text-center">
                        <div className="text-2xl font-bold text-foreground mb-1">{student.totalXp}</div>
                        <p className="text-xs text-muted-foreground">Total XP</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50 text-center">
                        <div className="text-2xl font-bold text-foreground mb-1">
                          {progress?.lessonsCompleted.length || 0}
                        </div>
                        <p className="text-xs text-muted-foreground">Lessons Done</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50 text-center">
                        <div className="text-2xl font-bold text-foreground mb-1">
                          {progress?.overallProgress || 0}%
                        </div>
                        <p className="text-xs text-muted-foreground">Course Progress</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-3">Recent Lessons</h4>
                      {progress?.lessonsCompleted.slice(-3).reverse().map((lesson) => {
                        const lessonData = currentLevel?.topics
                          .flatMap(t => t.weeks)
                          .flatMap(w => w.lessons)
                          .find(l => l.id === lesson.lessonId)

                        return (
                          <div key={lesson.lessonId} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                            <div className="flex items-center gap-3">
                              <CheckCircle className="h-4 w-4 text-primary" />
                              <span className="text-foreground">{lessonData?.title || 'Lesson'}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{lesson.score}%</span>
                              <span>{new Date(lesson.lastAttemptDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        )
                      })}
                      {(!progress?.lessonsCompleted || progress.lessonsCompleted.length === 0) && (
                        <p className="text-sm text-muted-foreground py-2">No lessons completed yet</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Linked Students</h3>
                <p className="text-muted-foreground mb-4">
                  Link your child&apos;s account to view their progress
                </p>
                <Button variant="outline">Link Student Account</Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Resources */}
        <div className="space-y-6">
          {/* Course Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Course Overview</CardTitle>
              <CardDescription>Hindi for World Language Credit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                A comprehensive curriculum covering 5 proficiency levels from Novice to Intermediate.
              </p>
              <div className="space-y-2">
                {hindiCourse.levels.slice(0, 3).map((level) => (
                  <div key={level.id} className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{level.name}</span>
                    <LevelBadge level={level.fluencyLevel} size="sm" showNumber={false} />
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/resources/curriculum">
                  View Full Curriculum
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Parent Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Parent Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/resources">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Parent Guide
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/resources/rubrics">
                  <FileText className="mr-2 h-4 w-4" />
                  Assessment Rubrics
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/resources/faq">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  FAQ
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* STAMP Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About STAMP</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                STAMP (Standards-based Measurement of Proficiency) is a widely recognized assessment for world language credit.
              </p>
              <p className="text-sm text-muted-foreground">
                Our curriculum aligns with STAMP proficiency levels to prepare students for official assessments.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
