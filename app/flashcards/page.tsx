'use client'

import { useRouter } from 'next/navigation'
import { FlashcardsLibraryView } from '@/components/pages/FlashcardsLibraryView'
import { useProfile } from '@/lib/profile-context'
import { HydratingShell, NoProfileShell, PageShell } from '@/components/route-helpers'

export default function FlashcardsPage() {
  const router = useRouter()
  const { hydrated, profile } = useProfile()

  if (!hydrated) return <HydratingShell />
  if (!profile) return <NoProfileShell title="Open the flashcards catalog" />

  return (
    <PageShell>
      <FlashcardsLibraryView
        seenIds={profile.flashcardsSeen || []}
        masteredIds={profile.flashcardsMastered || []}
        studentLevel={profile.currentLevel}
        onOpenDeck={(deckId) => router.push(`/flashcards/${deckId}`)}
      />
    </PageShell>
  )
}
