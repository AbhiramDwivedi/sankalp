'use client'

// Small client island for the landing-page CTA rows. Reads the active
// profile through useProfile() and routes a returning student to
// /dashboard instead of re-prompting onboarding. Parent/Teacher CTAs
// still go to /onboarding?role=... — Phase 2b's Onboarding route shows a
// "coming in Phase 3" stub for those; Phase 3 replaces it.

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useProfile } from '@/lib/profile-context'

interface CtaRowProps {
  /** When true, render the outline "Enter as Parent" / "Enter as Teacher"
   *  buttons alongside the student CTA (used on the hero). The final CTA
   *  strip near the footer hides them and doubles up the student button
   *  next to a "View the rubric" link. */
  withRoleOptions?: boolean
  /** Button sizing passed through to shadcn `<Button size>`. */
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export function LandingCtaRow({ withRoleOptions = true, size = 'lg' }: CtaRowProps) {
  const { hydrated, profile } = useProfile()

  // Before hydration (SSR / first paint) we render the onboarding variant.
  // A returning student flips to "Go to Dashboard" on mount. This avoids a
  // hydration mismatch and doesn't leave the button dead for a beat.
  const studentHref = hydrated && profile ? '/dashboard' : '/onboarding?role=student'
  const studentLabel = hydrated && profile ? 'Go to Dashboard' : 'Enter as Student'

  if (!withRoleOptions) {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button size={size} variant="secondary" asChild>
          <Link href={studentHref}>
            {studentLabel}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button
          size={size}
          variant="outline"
          asChild
          className="bg-transparent border-primary-foreground/30 hover:bg-primary-foreground/10"
        >
          <Link href="/rubric">View the rubric</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
      <Button size={size} asChild className="w-full sm:w-auto">
        <Link href={studentHref}>
          {studentLabel}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
      <Button size={size} variant="outline" asChild className="w-full sm:w-auto">
        <Link href="/onboarding?role=parent">Enter as Parent</Link>
      </Button>
      <Button size={size} variant="outline" asChild className="w-full sm:w-auto">
        <Link href="/onboarding?role=teacher">Enter as Teacher</Link>
      </Button>
    </div>
  )
}
