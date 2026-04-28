'use client'

// LandingGate — client-side guard around the public landing page.
//
// Purpose: when a signed-in user with at least one profile lands on `/`, push
// them straight to `/dashboard`. The CLAUDE.md design intent reads
// "Returning users are silently routed to /dashboard when a matching-role
// profile already exists" — without this gate they see the marketing hero
// (with three "Enter as X" CTAs) every time, which feels like the app forgot
// who they are.
//
// Behaviour matrix (post-hydration):
//   - signed-out                          → render children (public landing)
//   - signed-in, 0 profiles               → render children (so they can
//                                           pick a role and onboard)
//   - signed-in, has pending local
//     migration prompt                    → render children (they need to
//                                           visit /onboarding to resolve it,
//                                           but we don't want to silently
//                                           bypass that one-time decision)
//   - signed-in, ≥1 profile               → router.replace('/dashboard')
//                                           and render a small "Loading…"
//                                           card to avoid the FOUC of the
//                                           marketing hero flashing first.
//
// Pre-hydration we render a minimal skeleton (Navbar + Footer + a "Loading…"
// card). This costs the brief flash of marketing content for signed-out
// visitors — but signed-out visitors hit the cache fast and the skeleton
// resolves in <100ms in practice. The user-reported bug ("flash of public
// landing then nothing happens") is more painful than a brief skeleton.
//
// Skipped under E2E_AUTH_BYPASS (the smoke/visual/a11y suites pre-date auth
// and rely on landing CTAs being visible on `/`). The bypass keeps authUser
// null anyway, so the redirect would never fire — but rendering the skeleton
// pre-hydration would still hide the hero from tests.

import { useEffect, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.shadcn'
import { useProfile } from '@/lib/profile-context'

const E2E_BYPASS = process.env.NEXT_PUBLIC_E2E_AUTH_BYPASS === '1'

function LoadingShell() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/20">
        <div className="container mx-auto px-4 py-20">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Loading…</CardTitle>
              <CardDescription>One moment.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export function LandingGate({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { hydrated, authUser, profiles, hasPendingLocalMigration } = useProfile()

  // Returning signed-in user with at least one profile and no pending
  // legacy-migration prompt → silently route to the dashboard.
  const shouldRedirect =
    !E2E_BYPASS &&
    hydrated &&
    !!authUser &&
    profiles.length > 0 &&
    !hasPendingLocalMigration

  useEffect(() => {
    if (shouldRedirect) router.replace('/dashboard')
  }, [shouldRedirect, router])

  // E2E bypass: never gate, never skeleton — preserve pre-auth landing
  // behaviour the test suites depend on.
  if (E2E_BYPASS) return <>{children}</>

  // Pre-hydration we don't yet know if this is a returning signed-in user,
  // so we render a Loading shell instead of the hero to avoid the
  // "flash of marketing then redirect" the user reported.
  if (!hydrated) return <LoadingShell />

  // Post-hydration redirect path: render the same Loading shell while the
  // router transitions out.
  if (shouldRedirect) return <LoadingShell />

  return <>{children}</>
}
