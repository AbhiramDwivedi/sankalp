'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
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
import type { StudentProfile } from '@/types'
import { migrateProfile } from '@/types'

// -----------------------------------------------------------------------------
// Placeholder dashboard. Phase 2a stub over the v0 dashboard.
//
// This reads the existing localStorage keys the Vite app writes today
// (sankalpa_hindi_profiles + sankalpa_active_id, per CLAUDE.md) so a student
// carrying over an existing profile sees a familiar greeting. Phase 3
// replaces this with the real student / parent / teacher dashboards —
// right now it's just a landing pad that links to the three content
// libraries. Routes like /lessons, /flashcards, /capstones 404 until
// Phase 2b.
// -----------------------------------------------------------------------------

const PROFILES_KEY = 'sankalpa_hindi_profiles'
const ACTIVE_ID_KEY = 'sankalpa_active_id'

export default function DashboardPage() {
  const [hydrated, setHydrated] = useState(false)
  const [profile, setProfile] = useState<StudentProfile | null>(null)

  useEffect(() => {
    try {
      const activeId = localStorage.getItem(ACTIVE_ID_KEY)
      const raw = localStorage.getItem(PROFILES_KEY)
      if (activeId && raw) {
        const parsed = JSON.parse(raw) as unknown
        if (Array.isArray(parsed)) {
          const match = parsed.find((p) => p && typeof p === 'object' && (p as { id?: unknown }).id === activeId)
          if (match) {
            setProfile(migrateProfile(match))
          }
        }
      }
    } catch {
      // Corrupted localStorage shouldn't crash the placeholder — just
      // fall through to the "no profile" path.
    }
    setHydrated(true)
  }, [])

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
                  Your study plan: <span className="font-medium">{profile.selectedStudyPlanId ?? 'not yet selected'}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Phase 2a shell. The real dashboard lands in Phase 3 — for now, jump straight into the content.
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
                <CardTitle className="text-2xl md:text-3xl">No profile yet</CardTitle>
                <CardDescription>
                  Sankalp stores your progress locally. Set up a profile from the landing page to pick a study
                  plan and start.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href="/">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Set up a profile
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
