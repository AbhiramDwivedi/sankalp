'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.shadcn'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useAuth } from '@/lib/context/auth-context'
import { LevelBadge } from '@/components/level-badge'
import { hindiCourse } from '@/lib/data/hindi-course'
import { mockStudents } from '@/lib/data/mock-users'
import type { TeacherProfile, StudentProfile } from '@/lib/types'
import {
  Users,
  BookOpen,
  Trophy,
  Flame,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle,
  FileText,
  Settings,
  Download,
  BarChart3
} from 'lucide-react'

export function TeacherDashboard() {
  const { user, getStudentProgress } = useAuth()
  const teacher = user as TeacherProfile

  // For demo, show all mock students
  const students = mockStudents

  // Calculate class stats
  const totalStudents = students.length
  const avgStreak = Math.round(students.reduce((acc, s) => acc + s.streak, 0) / totalStudents)
  const avgXp = Math.round(students.reduce((acc, s) => acc + s.totalXp, 0) / totalStudents)

  // Level distribution
  const levelCounts = students.reduce((acc, s) => {
    acc[s.fluencyLevel] = (acc[s.fluencyLevel] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome, {teacher.name}!
            </h1>
            <p className="text-muted-foreground mt-1">
              {teacher.school && `${teacher.school} - `}Manage your students and track progress
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/resources">
                <FileText className="mr-2 h-4 w-4" />
                Resources
              </Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-3xl font-bold text-foreground">{totalStudents}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Streak</p>
                <p className="text-3xl font-bold text-foreground">{avgStreak} days</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Flame className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. XP</p>
                <p className="text-3xl font-bold text-foreground">{avgXp}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Course</p>
                <p className="text-3xl font-bold text-foreground">Hindi</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Student List */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Students</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Student</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Grade</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Level</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Streak</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">XP</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => {
                      const progress = getStudentProgress(student.id)
                      return (
                        <tr key={student.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                                {student.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="font-medium text-foreground">{student.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-2 text-muted-foreground">{student.gradeLevel}th</td>
                          <td className="py-3 px-2">
                            <LevelBadge level={student.fluencyLevel} size="sm" showNumber={false} />
                          </td>
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-1">
                              <Flame className="h-4 w-4 text-primary" />
                              <span className="text-foreground">{student.streak}</span>
                            </div>
                          </td>
                          <td className="py-3 px-2 text-foreground">{student.totalXp}</td>
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-2">
                              <Progress value={progress?.overallProgress || 0} className="h-2 w-20" />
                              <span className="text-sm text-muted-foreground">
                                {progress?.overallProgress || 0}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Analytics & Actions */}
        <div className="space-y-6">
          {/* Level Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Level Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(levelCounts).map(([level, count]) => (
                <div key={level} className="flex items-center justify-between">
                  <LevelBadge level={level as StudentProfile['fluencyLevel']} size="sm" />
                  <span className="text-foreground font-medium">{count} students</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/courses/hindi">
                  <BookOpen className="mr-2 h-4 w-4" />
                  View Curriculum
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/resources/rubrics">
                  <FileText className="mr-2 h-4 w-4" />
                  Assessment Rubrics
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/exams">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Mock Exam Results
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Curriculum Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Curriculum Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {hindiCourse.levels.slice(0, 3).map((level) => (
                  <div key={level.id} className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{level.name}</span>
                    <span className="text-muted-foreground">{level.totalWeeks} weeks</span>
                  </div>
                ))}
              </div>
              <Button variant="link" className="mt-4 p-0 h-auto" asChild>
                <Link href="/resources/curriculum">
                  View full curriculum
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
