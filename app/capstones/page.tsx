"use client"

import { useState } from "react"
import Link from "next/link"
import { Award, Clock, FileText, ChevronRight, BookOpen, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card.shadcn"
import { Badge } from "@/components/ui/badge.shadcn"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LevelBadge } from "@/components/level-badge"
import { useAuth } from "@/lib/context/auth-context"
import { hindiCapstones } from "@/lib/data/capstones"
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

export default function CapstonesPage() {
  const { user } = useAuth()
  const [selectedLevel, setSelectedLevel] = useState<ProficiencyLevel>(
    user?.proficiencyLevel || "novice-low"
  )

  const filteredCapstones = hindiCapstones.filter(c => c.level === selectedLevel)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Award className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Capstone Projects</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Demonstrate your Hindi language skills through creative, real-world projects. 
            Each capstone is designed to cement your understanding at your current level.
          </p>
        </div>

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

        {/* Capstone Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCapstones.map((capstone) => (
            <Card key={capstone.id} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <LevelBadge level={capstone.level} />
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {capstone.estimatedTime}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{capstone.title}</CardTitle>
                <CardDescription>{capstone.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  Requirements
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {capstone.requirements.slice(0, 3).map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                  {capstone.requirements.length > 3 && (
                    <li className="text-primary">
                      +{capstone.requirements.length - 3} more requirements
                    </li>
                  )}
                </ul>
              </CardContent>

              <CardFooter className="pt-0">
                <Link href={`/capstones/${capstone.id}`} className="w-full">
                  <Button className="w-full gap-2">
                    View Project
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredCapstones.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">No capstones at this level yet</h3>
            <p className="text-muted-foreground">
              More capstone projects are being developed for this level.
            </p>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">1</span>
                </div>
                Choose Your Project
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Select a capstone project that matches your current proficiency level and interests.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">2</span>
                </div>
                Complete Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Work through all requirements, using resources provided. Take your time to do quality work.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">3</span>
                </div>
                Submit for Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Upload your completed project. Teachers will review and provide feedback based on the rubric.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
