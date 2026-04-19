"use client"

import { useState } from "react"
import Link from "next/link"
import { GraduationCap, Clock, FileQuestion, ChevronRight, AlertTriangle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card.shadcn"
import { Badge } from "@/components/ui/badge.shadcn"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LevelBadge } from "@/components/level-badge"
import { useAuth } from "@/lib/context/auth-context"
import { hindiMockExams } from "@/lib/data/capstones"
import type { ProficiencyLevel } from "@/lib/types"

const levelOrder: ProficiencyLevel[] = [
  "novice-low",
  "novice-mid", 
  "novice-high",
  "intermediate-low",
  "intermediate-mid"
]

const levelNames: Record<ProficiencyLevel, string> = {
  "novice-low": "Novice Low",
  "novice-mid": "Novice Mid",
  "novice-high": "Novice High",
  "intermediate-low": "Intermediate Low",
  "intermediate-mid": "Intermediate Mid"
}

export default function ExamsPage() {
  const { user } = useAuth()
  const [selectedLevel, setSelectedLevel] = useState<ProficiencyLevel>(
    user?.proficiencyLevel || "novice-low"
  )

  const filteredExams = hindiMockExams.filter(e => e.level === selectedLevel)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
            <GraduationCap className="h-8 w-8 text-secondary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Mock Exams</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Practice for your official STAMP assessment with timed mock exams. 
            Each exam tests reading, writing, listening, and speaking skills.
          </p>
        </div>

        {/* Important Notice */}
        <Card className="mb-8 border-warning/50 bg-warning/5">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Practice Makes Perfect</p>
              <p className="text-sm text-muted-foreground">
                These mock exams simulate the format of official assessments. Results are not official 
                but help you prepare. You can retake exams as many times as needed.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Level Filter */}
        <Tabs value={selectedLevel} onValueChange={(v) => setSelectedLevel(v as ProficiencyLevel)} className="mb-8">
          <TabsList className="grid w-full grid-cols-5">
            {levelOrder.map((level) => (
              <TabsTrigger key={level} value={level} className="text-xs sm:text-sm">
                {levelNames[level].split(" ")[0]}
                <span className="hidden sm:inline ml-1">{levelNames[level].split(" ")[1]}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Exam Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <Card key={exam.id} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <LevelBadge level={exam.level} />
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {exam.duration} min
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-xl">{exam.title}</CardTitle>
                <CardDescription>{exam.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Questions</span>
                    <span className="font-medium">{exam.totalQuestions}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Passing Score</span>
                    <span className="font-medium">{exam.passingScore}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Sections</span>
                    <span className="font-medium">{exam.sections.length}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-medium mb-2">Sections Include:</p>
                  <div className="flex flex-wrap gap-1">
                    {exam.sections.map((section) => (
                      <Badge key={section.id} variant="secondary" className="text-xs">
                        {section.title}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <Link href={`/exams/${exam.id}`} className="w-full">
                  <Button className="w-full gap-2">
                    <FileQuestion className="h-4 w-4" />
                    Start Exam
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredExams.length === 0 && (
          <div className="text-center py-12">
            <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">No exams at this level yet</h3>
            <p className="text-muted-foreground">
              Mock exams for this level are being developed.
            </p>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">How Mock Exams Work</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold mb-2">Choose Level</h3>
                <p className="text-sm text-muted-foreground">
                  Select the exam that matches your current proficiency level
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold mb-2">Complete Sections</h3>
                <p className="text-sm text-muted-foreground">
                  Work through reading, writing, listening, and speaking sections
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold mb-2">Get Results</h3>
                <p className="text-sm text-muted-foreground">
                  See your score and review which areas need more practice
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">4</span>
                </div>
                <h3 className="font-semibold mb-2">Retake Anytime</h3>
                <p className="text-sm text-muted-foreground">
                  Practice as many times as you need to improve your score
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* STAMP Info */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              About STAMP Assessments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              STAMP (Standards-based Measurement of Proficiency) is a widely recognized assessment 
              used to measure language proficiency. Our mock exams are designed to prepare students 
              for this format of assessment.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Proficiency Levels Tested</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Novice Low - Basic recognition and memorized phrases</li>
                  <li>Novice Mid - Lists, short sentences, simple questions</li>
                  <li>Novice High - Paragraph-length writing and speaking</li>
                  <li>Intermediate Low - Narration and description</li>
                  <li>Intermediate Mid - Complex sentences and opinions</li>
                </ul>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Skills Assessed</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Reading - Understanding written text</li>
                  <li>Writing - Producing written content</li>
                  <li>Listening - Comprehending spoken language</li>
                  <li>Speaking - Oral communication ability</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
