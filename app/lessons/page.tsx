'use client'

import { useRouter } from 'next/navigation'
import { LibraryView } from '@/components/pages/LibraryView'
import { useProfile } from '@/lib/profile-context'
import { HydratingShell, NoProfileShell, PageShell } from '@/components/route-helpers'
import { bandFromProficiency } from '@/types'

export default function LessonsPage() {
  const router = useRouter()
  const { hydrated, profile } = useProfile()

  if (!hydrated) return <HydratingShell />
  if (!profile) return <NoProfileShell title="Open the lessons catalog" />

  const currentBand = profile.currentBand ?? bandFromProficiency(profile.currentLevel)

  return (
    <PageShell>
      <LibraryView
        completedIds={profile.completedTopicIds || []}
        studentLevel={profile.currentLevel}
        currentBand={currentBand}
        selectedStudyPlanId={profile.selectedStudyPlanId}
        onOpenTopic={(pack) => router.push(`/lessons/${pack.id}`)}
        onOpenHowThisWorks={() => router.push('/overview')}
      />
    </PageShell>
  )
}
