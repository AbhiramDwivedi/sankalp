'use client'

import { useRouter } from 'next/navigation'
import { StudyPlanView } from '@/components/pages/StudyPlanView'
import { useProfile } from '@/lib/profile-context'
import { HydratingShell, NoProfileShell, PageShell } from '@/components/route-helpers'
import { studyPlanForLevel } from '@/content/studyPlans'

export default function PlanPage() {
  const router = useRouter()
  const { hydrated, profile, setProfile } = useProfile()

  if (!hydrated) return <HydratingShell />
  if (!profile) return <NoProfileShell title="Open your study plan" />

  // Ensure the view always has a plan id; legacy profiles may predate the
  // plan selector, so we fall back to the level-matched default.
  const ensuredPlanId =
    profile.selectedStudyPlanId || studyPlanForLevel(profile.currentLevel).id

  return (
    <PageShell>
      <StudyPlanView
        profile={{ ...profile, selectedStudyPlanId: ensuredPlanId }}
        onSelectPlan={(planId) =>
          setProfile((p) => ({ ...p, selectedStudyPlanId: planId }))
        }
        onOpenPack={(packId) => router.push(`/lessons/${packId}`)}
        onOpenCapstone={(capstoneId) => router.push(`/capstones/${capstoneId}`)}
      />
    </PageShell>
  )
}
