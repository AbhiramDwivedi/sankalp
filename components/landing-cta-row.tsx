'use client'

// Small client island for the landing-page CTA rows. Reads profiles
// through useProfile() and routes a returning user (of any role) to
// /dashboard instead of re-prompting onboarding. When a role-matching
// profile exists on-device we silently switch to it so the right dashboard
// loads on arrival.

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useProfile } from '@/lib/profile-context'
import type { ProfileRole } from '@/types'

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
  const { hydrated, profile, profiles, switchProfile } = useProfile()

  // Before hydration (SSR / first paint) we render the onboarding variant.
  // A returning user flips to "Go to Dashboard" on mount. This avoids a
  // hydration mismatch and doesn't leave the button dead for a beat.
  const findRoleProfile = (role: ProfileRole) =>
    profiles.find((p) => (p.role ?? 'student') === role)

  const roleCta = (role: ProfileRole, fallbackLabel: string) => {
    if (!hydrated) return { href: `/onboarding?role=${role}`, label: fallbackLabel, onClick: undefined }
    // If the active profile matches the role, go straight to dashboard.
    if (profile && (profile.role ?? 'student') === role) {
      return { href: '/dashboard', label: 'Go to Dashboard', onClick: undefined }
    }
    // If another profile on-device has this role, select it first.
    const match = findRoleProfile(role)
    if (match) {
      return {
        href: '/dashboard',
        label: 'Go to Dashboard',
        onClick: () => switchProfile(match.id),
      }
    }
    return { href: `/onboarding?role=${role}`, label: fallbackLabel, onClick: undefined }
  }

  const studentCta = roleCta('student', 'Enter as Student')
  const parentCta = roleCta('parent', 'Enter as Parent')
  const teacherCta = roleCta('teacher', 'Enter as Teacher')
  const studentHref = studentCta.href
  const studentLabel = studentCta.label

  if (!withRoleOptions) {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button size={size} variant="secondary" asChild>
          <Link href={studentHref} onClick={studentCta.onClick}>
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
        <Link href={parentCta.href} onClick={parentCta.onClick}>
          {parentCta.label}
        </Link>
      </Button>
      <Button size={size} variant="outline" asChild className="w-full sm:w-auto">
        <Link href={teacherCta.href} onClick={teacherCta.onClick}>
          {teacherCta.label}
        </Link>
      </Button>
    </div>
  )
}
