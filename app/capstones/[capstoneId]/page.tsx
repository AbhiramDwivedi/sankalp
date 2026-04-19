"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { 
  ArrowLeft, Award, Clock, FileText, CheckCircle2, Upload, 
  ExternalLink, AlertCircle, BookOpen
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.shadcn"
import { Badge } from "@/components/ui/badge.shadcn"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LevelBadge } from "@/components/level-badge"
import { useAuth } from "@/lib/context/auth-context"
import { getCapstoneById } from "@/lib/data/capstones"
import type { CapstoneProject } from "@/lib/types"
import { toast } from "sonner"

export default function CapstoneDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [capstone, setCapstone] = useState<CapstoneProject | null>(null)
  const [checkedRequirements, setCheckedRequirements] = useState<Set<number>>(new Set())
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const capstoneId = params.capstoneId as string
    const found = getCapstoneById(capstoneId)
    if (found) {
      setCapstone(found)
    }
  }, [params.capstoneId])

  const toggleRequirement = (index: number) => {
    setCheckedRequirements(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success("Capstone project submitted successfully!", {
        description: "Your teacher will review it and provide feedback soon."
      })
    }, 1500)
  }

  const progress = capstone 
    ? Math.round((checkedRequirements.size / capstone.requirements.length) * 100)
    : 0

  const totalPoints = capstone?.rubric.reduce((sum, r) => sum + r.maxPoints, 0) || 0

  if (!capstone) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading capstone project...</p>
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
          <Link href="/capstones" className="hover:text-foreground transition-colors">
            Capstone Projects
          </Link>
          <span>/</span>
          <span className="text-foreground">{capstone.title}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/capstones")}
              className="mb-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Capstones
            </Button>
            <div className="flex items-center gap-3 mb-2">
              <LevelBadge level={capstone.level} />
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {capstone.estimatedTime}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold text-foreground">{capstone.title}</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">{capstone.description}</p>
          </div>
          
          <Card className="w-full md:w-auto md:min-w-[200px]">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Progress</p>
                <p className="text-3xl font-bold text-primary">{progress}%</p>
                <Progress value={progress} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {checkedRequirements.size} of {capstone.requirements.length} requirements
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Requirements Checklist */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Project Requirements
                </CardTitle>
                <CardDescription>
                  Check off each requirement as you complete it
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {capstone.requirements.map((req, index) => (
                    <li key={index}>
                      <button
                        onClick={() => toggleRequirement(index)}
                        className={`w-full flex items-start gap-3 p-3 rounded-lg border text-left transition-all ${
                          checkedRequirements.has(index)
                            ? "border-success bg-success/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          checkedRequirements.has(index)
                            ? "border-success bg-success"
                            : "border-muted-foreground"
                        }`}>
                          {checkedRequirements.has(index) && (
                            <CheckCircle2 className="h-4 w-4 text-success-foreground" />
                          )}
                        </div>
                        <span className={checkedRequirements.has(index) ? "text-muted-foreground line-through" : ""}>
                          {req}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Rubric */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Grading Rubric
                </CardTitle>
                <CardDescription>
                  Total possible points: {totalPoints}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {capstone.rubric.map((item, index) => (
                    <div key={index} className="flex items-start justify-between gap-4 p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{item.criterion}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <Badge variant="secondary" className="shrink-0">
                        {item.maxPoints} pts
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Work Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Your Notes</CardTitle>
                <CardDescription>
                  Keep track of your ideas, progress, and questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Write your notes here..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[150px]"
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Helpful Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {capstone.resources.map((resource, index) => (
                    <li key={index}>
                      <Link
                        href={resource.url}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors text-sm"
                      >
                        <ExternalLink className="h-4 w-4 text-primary shrink-0" />
                        <span>{resource.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Submission */}
            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="text-lg">Ready to Submit?</CardTitle>
                <CardDescription>
                  Make sure all requirements are complete before submitting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {progress < 100 && (
                  <div className="flex items-start gap-2 p-3 bg-warning/10 rounded-lg text-sm">
                    <AlertCircle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                    <p>
                      Complete all requirements before submitting. You have {capstone.requirements.length - checkedRequirements.size} remaining.
                    </p>
                  </div>
                )}

                <Button
                  className="w-full gap-2"
                  disabled={progress < 100 || isSubmitting}
                  onClick={handleSubmit}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                      Submit Project
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  You can update your submission until graded
                </p>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tips for Success</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    Review vocabulary from related lessons
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    Ask a parent or teacher to proofread
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    Use transliteration to help with pronunciation
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    Be creative - this is your project!
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
