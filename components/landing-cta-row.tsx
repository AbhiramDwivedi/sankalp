'use client'

// Landing-page CTA rows. Auth-aware: a returning signed-in user with a
// role-matching profile jumps straight to /dashboard; a signed-in user
// without a matching profile lands on /onboarding; a signed-out visitor
// routes through /login?role=... (the login form carries the role forward
// and drops the new account into onboarding).

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
  const { hydrated, authUser, profile, profiles, switchProfile } = useProfile()

  const findRoleProfile = (role: ProfileRole) =>
    profiles.find((p) => (p.role ?? 'student') === role)

  // E2E bypass mode: the auth gate is disabled for the smoke suite; behave
  // like the pre-auth app so existing tests still exercise the onboarding
  // flow via these CTAs. This is the NEXT_PUBLIC_ form because landing-cta
  // is a client component; the value is inlined at build time.
  const e2eBypass = process.env.NEXT_PUBLIC_E2E_AUTH_BYPASS === '1'

  const roleCta = (role: ProfileRole, fallbackLabel: string) => {
    // Before hydration we render the sign-in variant so the server and
    // client markup match; post-hydration the right destination fills in.
    if (!hydrated) {
      const href = e2eBypass ? `/onboarding?role=${role}` : `/login?role=${role}`
      return { href, label: fallbackLabel, onClick: undefined }
    }
    // Signed-out visitor → login flow carries the role forward (except when
    // the E2E bypass is active — in which case we fall through to the same
    // profile-aware branching that used to exist pre-auth).
    if (!authUser && !e2eBypass) {
      return { href: `/login?role=${role}`, label: fallbackLabel, onClick: undefined }
    }
    // Signed in + active profile matches the role → straight to dashboard.
    if (profile && (profile.role ?? 'student') === role) {
      return { href: '/dashboard', label: 'Go to Dashboard', onClick: undefined }
    }
    // Signed in + a profile of this role already exists → switch + dashboard.
    const match = findRoleProfile(role)
    if (match) {
      return {
        href: '/dashboard',
        label: 'Go to Dashboard',
        onClick: () => switchProfile(match.id),
      }
    }
    // No matching profile yet → onboarding.
    return { href: `/onboarding?role=${role}`, label: fallbackLabel, onClick: undefined }
  }

  const studentCta = roleCta('student', 'Enter as Student')
  const parentCta = roleCta('parent', 'Enter as Parent')
  const teacherCta = roleCta('teacher', 'Enter as Teacher')

  if (!withRoleOptions) {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button size={size} variant="secondary" asChild>
          <Link href={studentCta.href} onClick={studentCta.onClick}>
            {studentCta.label}
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
        <Link href={studentCta.href} onClick={studentCta.onClick}>
          {studentCta.label}
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
