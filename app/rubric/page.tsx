'use client'

import { useRouter } from 'next/navigation'
import { RubricReferenceView } from '@/components/pages/RubricReferenceView'
import { PageShell } from '@/components/route-helpers'

// RubricReferenceView is reference content — rendered regardless of profile.
// "Back" points to /dashboard (router.push, not router.back — see the route
// brief: back() is unreliable on first-load).
export default function RubricPage() {
  const router = useRouter()
  return (
    <PageShell>
      <RubricReferenceView onBack={() => router.push('/dashboard')} />
    </PageShell>
  )
}
