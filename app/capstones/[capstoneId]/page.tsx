'use client'

import { notFound, useParams, useRouter } from 'next/navigation'
import { CapstoneViewV2 } from '@/components/capstone/CapstoneViewV2'
import { CAPSTONES_BY_ID } from '@/content/capstones'
import { useProfile } from '@/lib/profile-context'
import {
  HydratingShell,
  NoProfileShell,
  PageShell,
} from '@/components/route-helpers'
import { appendToday } from '@/lib/streak'
import type { MockExamResult } from '@/types'

export default function CapstoneDeepDivePage() {
  const router = useRouter()
  const params = useParams<{ capstoneId: string }>()
  const capstoneId = params?.capstoneId
  const { hydrated, profile, setProfile } = useProfile()

  if (!capstoneId || !CAPSTONES_BY_ID[capstoneId]) notFound()
  const capstone = CAPSTONES_BY_ID[capstoneId]

  if (!hydrated) return <HydratingShell />
  if (!profile) return <NoProfileShell title={`Open ${capstone.titleEnglish}`} />

  const isCompleted = (profile.completedCapstoneIds || []).includes(capstone.id)

  const handleMarkComplete = () => {
    setProfile((p) => ({
      ...p,
      completedCapstoneIds: Array.from(
        new Set([...(p.completedCapstoneIds || []), capstone.id]),
      ),
      inProgressCapstoneId: undefined,
      activityDates: appendToday(p.activityDates),
    }))
    router.push('/capstones')
  }

  const handleMockExamSubmit = (cid: string, result: MockExamResult) => {
    setProfile((p) => ({
      ...p,
      mockExamResults: { ...(p.mockExamResults || {}), [cid]: result },
      activityDates: appendToday(p.activityDates),
    }))
  }

  return (
    <PageShell bare>
      <CapstoneViewV2
        capstone={capstone}
        isCompleted={isCompleted}
        profile={profile}
        aiEnabled={!!profile.aiAssessmentEnabled}
        onBack={() => router.push('/capstones')}
        onMarkComplete={handleMarkComplete}
        onOpenPack={(packId) => router.push(`/lessons/${packId}`)}
        onMockExamSubmit={handleMockExamSubmit}
      />
    </PageShell>
  )
}
