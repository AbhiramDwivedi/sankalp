'use client'

import { useRouter } from 'next/navigation'
import { CapstonesLibraryView } from '@/components/pages/CapstonesLibraryView'
import { useProfile } from '@/lib/profile-context'
import { HydratingShell, NoProfileShell, PageShell } from '@/components/route-helpers'

export default function CapstonesPage() {
  const router = useRouter()
  const { hydrated, profile } = useProfile()

  if (!hydrated) return <HydratingShell />
  if (!profile) return <NoProfileShell title="Open the capstones catalog" />

  return (
    <PageShell>
      <CapstonesLibraryView
        completedIds={profile.completedCapstoneIds || []}
        studentLevel={profile.currentLevel}
        onOpenCapstone={(capstoneId) => router.push(`/capstones/${capstoneId}`)}
      />
    </PageShell>
  )
}
