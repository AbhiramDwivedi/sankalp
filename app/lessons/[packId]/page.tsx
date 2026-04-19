'use client'

import { notFound, useParams, useRouter } from 'next/navigation'
import { TopicPackViewV2 } from '@/components/topic/TopicPackViewV2'
import { TOPIC_PACKS, TOPIC_PACKS_BY_ID } from '@/content'
import { useProfile } from '@/lib/profile-context'
import {
  HydratingShell,
  NoProfileShell,
  PageShell,
} from '@/components/route-helpers'
import { appendToday } from '@/lib/streak'
import type { EvaluationResult, SpeakingAttempt } from '@/types'

export default function PackDeepDivePage() {
  const router = useRouter()
  const params = useParams<{ packId: string }>()
  const packId = params?.packId
  const { hydrated, profile, setProfile } = useProfile()

  // Content lookup happens before profile hydration so obviously-bad ids
  // 404 without needing to wait on localStorage.
  if (!packId || !TOPIC_PACKS_BY_ID[packId]) notFound()
  const pack = TOPIC_PACKS_BY_ID[packId]

  if (!hydrated) return <HydratingShell />
  if (!profile) return <NoProfileShell title={`Open ${pack.titleEnglish}`} />

  const packIndex = TOPIC_PACKS.findIndex((p) => p.id === pack.id)
  const prevPack = packIndex > 0 ? TOPIC_PACKS[packIndex - 1] : null
  const nextPack =
    packIndex >= 0 && packIndex < TOPIC_PACKS.length - 1 ? TOPIC_PACKS[packIndex + 1] : null

  const handleMarkComplete = () => {
    setProfile((p) => ({
      ...p,
      completedTopicIds: Array.from(new Set([...(p.completedTopicIds || []), pack.id])),
      inProgressTopicId: undefined,
      activityDates: appendToday(p.activityDates),
    }))
    router.push('/lessons')
  }

  const handleEvaluation = (result: EvaluationResult) => {
    setProfile((p) => {
      const evals = { ...(p.evaluations || {}) }
      evals[pack.id] = [...(evals[pack.id] || []), result]
      return { ...p, evaluations: evals }
    })
  }

  const handlePersistSpeakingAttempt = (pid: string, attempt: SpeakingAttempt) => {
    setProfile((p) => {
      const all = { ...(p.speakingRecordings || {}) }
      const list = (all[pid] || []).filter((a) => a.promptIndex !== attempt.promptIndex)
      list.push(attempt)
      all[pid] = list
      return {
        ...p,
        speakingRecordings: all,
        activityDates: appendToday(p.activityDates),
      }
    })
  }

  return (
    <PageShell bare>
      <TopicPackViewV2
        pack={pack}
        aiEnabled={!!profile.aiAssessmentEnabled}
        level={profile.currentLevel}
        profile={profile}
        onBack={() => router.push('/lessons')}
        onMarkComplete={handleMarkComplete}
        onEvaluation={handleEvaluation}
        onPersistSpeakingAttempt={handlePersistSpeakingAttempt}
        totalTopics={TOPIC_PACKS.length}
        onPrevPack={prevPack ? () => router.push(`/lessons/${prevPack.id}`) : undefined}
        onNextPack={nextPack ? () => router.push(`/lessons/${nextPack.id}`) : undefined}
        prevPackTitle={prevPack?.titleEnglish}
        nextPackTitle={nextPack?.titleEnglish}
      />
    </PageShell>
  )
}
