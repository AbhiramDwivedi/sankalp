'use client'

// Shared scaffolding for the Phase 2b route wrappers. Centralizes the
// chrome (Navbar + Footer + page shell) and the three boilerplate states
// every content route shares: hydrating, no-profile-yet, and content.

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.shadcn'
import { Button } from '@/components/ui/button'
import { UserPlus, ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

interface PageShellProps {
  children: ReactNode
  /** When true, the <main> body becomes a flush full-width container so the
   *  deep-dive overlay views (TopicPackViewV2, CapstoneViewV2, DeckRunner)
   *  can use their own max-width + padding. Catalog pages use the default
   *  container mx-auto wrapper. */
  bare?: boolean
}

export function PageShell({ children, bare = false }: PageShellProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {bare ? children : <div className="container mx-auto px-4 py-8">{children}</div>}
      </main>
      <Footer />
    </div>
  )
}

export function HydratingShell() {
  return (
    <PageShell>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Loading…</CardTitle>
        </CardHeader>
      </Card>
    </PageShell>
  )
}

export function NoProfileShell({ title }: { title?: string }) {
  return (
    <PageShell>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">
            {title ?? 'Set up your profile'}
          </CardTitle>
          <CardDescription>
            Pick a role and a study plan and you&rsquo;re in. Your progress will
            sync to your account so it follows you across devices.
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
    </PageShell>
  )
}
