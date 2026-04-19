'use client'

import { useRouter } from 'next/navigation'
import { HowThisWorksView } from '@/components/pages/HowThisWorksView'
import { useProfile } from '@/lib/profile-context'
import { PageShell } from '@/components/route-helpers'

// The first-run "How this works" explainer. In the Vite SPA it was a
// mandatory overlay; in the Next.js shell it's a reachable route. Visiting
// it marks the profile as having seen the explainer so the welcome path
// stops prompting.
export default function HowThisWorksPage() {
  const router = useRouter()
  const { profile, setProfile } = useProfile()

  const onContinue = () => {
    if (profile && !profile.howThisWorksSeen) {
      setProfile((p) => ({ ...p, howThisWorksSeen: true }))
    }
    router.push('/dashboard')
  }

  return (
    <PageShell>
      <HowThisWorksView onContinue={onContinue} />
    </PageShell>
  )
}
