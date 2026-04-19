'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.shadcn'
import { BookOpen, Target, Layers, ArrowRight, UserPlus } from 'lucide-react'
import { useProfile } from '@/lib/profile-context'

// -----------------------------------------------------------------------------
// Placeholder dashboard. Phase 2b update over the Phase 2a stub.
//
// Reads the active profile through useProfile() (which reads/writes the same
// localStorage keys the Vite app used). Phase 3 replaces this with the real
// student/parent/teacher dashboards — for now it stays a landing pad linking
// into the three content libraries.
//
// If there is no profile yet (first visit on this device), we push the user
// to /onboarding?role=student so they get the guided setup instead of a
// broken empty dashboard.
// -----------------------------------------------------------------------------

export default function DashboardPage() {
  const { hydrated, profile } = useProfile()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/20">
        <div className="container mx-auto px-4 py-12 md:py-20">
          {!hydrated ? (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Loading…</CardTitle>
              </CardHeader>
            </Card>
          ) : profile ? (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl">Welcome, {profile.name}</CardTitle>
                <CardDescription>
                  Your study plan:{' '}
                  <span className="font-medium">
                    {profile.selectedStudyPlanId ?? 'not yet selected'}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Phase 2b shell. The full student / parent / teacher dashboard lands in
                  Phase 3 — for now, jump straight into the content.
                </p>
                <div className="grid gap-3 sm:grid-cols-3 pt-2">
                  <Button asChild variant="outline">
                    <Link href="/lessons">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Browse Lessons
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/capstones">
                      <Target className="mr-2 h-4 w-4" />
                      Browse Capstones
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/flashcards">
                      <Layers className="mr-2 h-4 w-4" />
                      Browse Flashcards
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl">Set up your profile</CardTitle>
                <CardDescription>
                  Sankalp stores your progress locally — no account, nothing to sign up
                  for. Pick a study plan and you're in.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href="/onboarding?role=student">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Start onboarding
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
