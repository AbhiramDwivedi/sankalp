"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  BookOpen, GraduationCap, FileText, Download, ExternalLink,
  ChevronRight, CheckCircle2, Users, Target, Award
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.shadcn"
import { Badge } from "@/components/ui/badge.shadcn"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LevelBadge } from "@/components/level-badge"
import type { ProficiencyLevel } from "@/lib/types"

const levelDescriptions: Record<ProficiencyLevel, { description: string; canDo: string[] }> = {
  "novice-low": {
    description: "Students can recognize and use isolated words and memorized phrases. Communication is limited to basic greetings and high-frequency expressions.",
    canDo: [
      "Recognize letters of the Devanagari script",
      "Say and respond to basic greetings",
      "Identify numbers 1-20",
      "Name common family members",
      "Use simple courtesy expressions (please, thank you)"
    ]
  },
  "novice-mid": {
    description: "Students can communicate using memorized words and phrases to accomplish basic communicative tasks. They can ask and answer simple questions.",
    canDo: [
      "Introduce themselves and others",
      "Ask and answer simple questions about daily life",
      "Describe people using basic adjectives",
      "Express likes and dislikes",
      "Tell time and use numbers up to 100",
      "Read simple sentences with familiar vocabulary"
    ]
  },
  "novice-high": {
    description: "Students can handle a variety of tasks pertaining to the Intermediate level, but are unable to sustain performance at that level.",
    canDo: [
      "Describe daily routines in detail",
      "Ask for and give directions",
      "Order food and make purchases",
      "Write short paragraphs about familiar topics",
      "Understand main ideas in simple texts",
      "Participate in short conversations"
    ]
  },
  "intermediate-low": {
    description: "Students can handle successfully a variety of uncomplicated communicative tasks in straightforward social situations.",
    canDo: [
      "Narrate events in the past and future",
      "Express opinions and preferences with reasons",
      "Describe people, places, and things in detail",
      "Handle routine social situations",
      "Write connected paragraphs",
      "Understand main ideas in longer texts"
    ]
  },
  "intermediate-mid": {
    description: "Students can handle successfully a variety of uncomplicated communicative tasks in straightforward social situations and can begin to discuss topics of personal interest.",
    canDo: [
      "Discuss topics of personal and community interest",
      "Express and support opinions",
      "Handle complicated social situations",
      "Write organized essays on familiar topics",
      "Understand detailed information in authentic texts",
      "Narrate and describe with detail in all time frames"
    ]
  }
}

const courseStructure = [
  {
    title: "Weekly Lessons",
    description: "Structured lessons delivered weekly, each building on previous knowledge",
    details: [
      "Vocabulary introduction with audio and transliteration",
      "Grammar concepts with examples",
      "Practice exercises (fill-in-blank, matching, multiple choice)",
      "Reading and listening comprehension",
      "Speaking practice with model responses"
    ]
  },
  {
    title: "Capstone Projects",
    description: "Creative projects that cement understanding and demonstrate mastery",
    details: [
      "Level-appropriate real-world tasks",
      "Clear requirements and rubrics",
      "Opportunity for creative expression",
      "Teacher feedback and grading",
      "Portfolio building"
    ]
  },
  {
    title: "Mock Exams",
    description: "Timed practice assessments in STAMP format",
    details: [
      "Reading comprehension sections",
      "Writing prompts at each level",
      "Listening comprehension with audio",
      "Speaking tasks (recorded responses)",
      "Immediate scoring for objective questions"
    ]
  }
]

const faqs = [
  {
    question: "Who can earn world language credit through this program?",
    answer: "Middle school students in grades 6-8 who are heritage speakers or have prior exposure to Hindi can work through our curriculum and take an official STAMP assessment to earn world language credit. Check with your school district for specific requirements."
  },
  {
    question: "How long does it take to complete a level?",
    answer: "Each proficiency level is designed to take approximately 10-12 weeks with consistent weekly study. However, students can progress at their own pace based on their starting proficiency and learning goals."
  },
  {
    question: "What is the STAMP assessment?",
    answer: "STAMP (Standards-based Measurement of Proficiency) is a standardized test that measures language proficiency in reading, writing, listening, and speaking. Our curriculum is designed to prepare students for this official assessment."
  },
  {
    question: "How do I know which level to start at?",
    answer: "During registration, students (or parents) can select their current proficiency level based on the descriptions provided. If unsure, we recommend starting at Novice Mid if the student can already read basic Hindi, or Novice Low if they are just beginning to learn the script."
  },
  {
    question: "Can parents or teachers track student progress?",
    answer: "Yes! Parents and teachers have dedicated dashboards to view student progress, completed lessons, capstone submissions, and mock exam scores. Parents can also access course materials to better support their students."
  },
  {
    question: "Is this curriculum only for Hindi?",
    answer: "We are starting with Hindi, but our platform is designed to be expandable. We plan to add support for other Indian languages including Tamil, Telugu, Gujarati, and more based on community interest."
  },
  {
    question: "What if my student is already fluent but needs official credit?",
    answer: "Students who are already fluent should start at Intermediate Mid and focus on the reading/writing components and formal register. The capstone projects and mock exams will help demonstrate their proficiency for credit."
  }
]

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
            <BookOpen className="h-8 w-8 text-accent" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Course Resources</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything parents, teachers, and students need to understand the Hindi 
            language program and world language credit requirements.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <Link href="/lessons">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Browse Lessons</p>
                  <p className="text-sm text-muted-foreground">View curriculum</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/capstones">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <Award className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="font-medium">Capstone Projects</p>
                  <p className="text-sm text-muted-foreground">Assessment tasks</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/exams">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <GraduationCap className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium">Mock Exams</p>
                  <p className="text-sm text-muted-foreground">Practice tests</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/auth/register">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full border-primary">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <Users className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium">Get Started</p>
                  <p className="text-sm text-muted-foreground">Register now</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview">Program Overview</TabsTrigger>
            <TabsTrigger value="levels">Proficiency Levels</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          {/* Program Overview */}
          <TabsContent value="overview" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Program Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Sankalp is designed to help middle school students develop proficiency in Hindi 
                      and earn world language credit through official STAMP assessments. Our program 
                      is particularly suited for:
                    </p>
                    <ul className="space-y-2">
                      {[
                        "Heritage speakers who want formal recognition of their skills",
                        "Students with home exposure seeking structured learning",
                        "Beginners interested in learning an Indian language",
                        "Students preparing for world language credit requirements"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-6 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-4">Program Benefits</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-primary font-bold text-sm">1</span>
                        </div>
                        <div>
                          <p className="font-medium">Flexible Self-Paced Learning</p>
                          <p className="text-sm text-muted-foreground">Learn at your own speed with structured guidance</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-primary font-bold text-sm">2</span>
                        </div>
                        <div>
                          <p className="font-medium">STAMP-Aligned Preparation</p>
                          <p className="text-sm text-muted-foreground">Curriculum designed for official assessment success</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-primary font-bold text-sm">3</span>
                        </div>
                        <div>
                          <p className="font-medium">Parent & Teacher Support</p>
                          <p className="text-sm text-muted-foreground">Resources and dashboards for supporters</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course Structure</CardTitle>
                <CardDescription>
                  How students progress through the curriculum
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {courseStructure.map((item, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-bold">{index + 1}</span>
                        </div>
                        <h4 className="font-semibold">{item.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <ul className="text-sm space-y-1">
                        {item.details.map((detail, dIndex) => (
                          <li key={dIndex} className="flex items-start gap-2">
                            <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Proficiency Levels */}
          <TabsContent value="levels" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Understanding Proficiency Levels</CardTitle>
                <CardDescription>
                  Based on ACTFL (American Council on the Teaching of Foreign Languages) guidelines
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Our curriculum is organized around five proficiency levels, from Novice Low to 
                  Intermediate Mid. Each level has specific learning objectives and &quot;can-do&quot; 
                  statements that describe what students are able to accomplish.
                </p>
              </CardContent>
            </Card>

            {(Object.keys(levelDescriptions) as ProficiencyLevel[]).map((level) => (
              <Card key={level}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <LevelBadge level={level} />
                      <CardTitle className="text-lg">
                        {level.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {levelDescriptions[level].description}
                  </p>
                  <div>
                    <h4 className="font-medium mb-3">At this level, students can:</h4>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {levelDescriptions[level].canDo.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Curriculum */}
          <TabsContent value="curriculum" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Curriculum Overview</CardTitle>
                <CardDescription>
                  Downloadable resources for teachers and parents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-dashed">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-medium">Curriculum Guide</p>
                          <p className="text-sm text-muted-foreground">Complete overview (PDF)</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className="border-dashed">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-medium">Assessment Rubrics</p>
                          <p className="text-sm text-muted-foreground">Grading criteria (PDF)</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className="border-dashed">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-medium">Parent Guide</p>
                          <p className="text-sm text-muted-foreground">How to support your student</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className="border-dashed">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-medium">STAMP Information</p>
                          <p className="text-sm text-muted-foreground">Assessment details</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="p-6 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-4">Weekly Time Commitment</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-3xl font-bold text-primary">2-3</p>
                      <p className="text-sm text-muted-foreground">Hours per week</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-3xl font-bold text-primary">10-12</p>
                      <p className="text-sm text-muted-foreground">Weeks per level</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-3xl font-bold text-primary">1</p>
                      <p className="text-sm text-muted-foreground">Capstone per level</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQ */}
          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Common questions from parents, teachers, and students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Still Have Questions?</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4">
                <Button className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Contact Support
                </Button>
                <Button variant="outline" className="gap-2">
                  <Users className="h-4 w-4" />
                  Join Parent Community
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
