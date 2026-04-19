'use client'

import { notFound, useParams, useRouter } from 'next/navigation'
import { DeckRunner } from '@/components/flashcards/DeckRunner'
import { PrintSheet } from '@/components/flashcards/PrintSheet'
import { DECKS_BY_ID } from '@/content/flashcards'
import { useProfile } from '@/lib/profile-context'
import {
  HydratingShell,
  NoProfileShell,
  PageShell,
} from '@/components/route-helpers'
import { appendToday } from '@/lib/streak'
import { nextCardState, type Rating } from '@/lib/srs'

export default function DeckRunnerPage() {
  const router = useRouter()
  const params = useParams<{ deckId: string }>()
  const deckId = params?.deckId
  const { hydrated, profile, setProfile } = useProfile()

  if (!deckId || !DECKS_BY_ID[deckId]) notFound()
  const deck = DECKS_BY_ID[deckId]

  if (!hydrated) return <HydratingShell />
  if (!profile) return <NoProfileShell title={`Open deck: ${deck.title}`} />

  const markCardSeen = (cardId: string) => {
    setProfile((p) => ({
      ...p,
      flashcardsSeen: Array.from(new Set([...(p.flashcardsSeen || []), cardId])),
    }))
  }

  const markCardMastered = (cardId: string) => {
    setProfile((p) => ({
      ...p,
      flashcardsSeen: Array.from(new Set([...(p.flashcardsSeen || []), cardId])),
      flashcardsMastered: Array.from(
        new Set([...(p.flashcardsMastered || []), cardId]),
      ),
      activityDates: appendToday(p.activityDates),
    }))
  }

  const markCardNotYet = (cardId: string) => {
    setProfile((p) => ({
      ...p,
      flashcardsMastered: (p.flashcardsMastered || []).filter((id) => id !== cardId),
    }))
  }

  const markCardRated = (cardId: string, rating: Rating) => {
    setProfile((p) => {
      const prev = p.cardStates?.[cardId]
      const next = nextCardState(prev, rating)
      return {
        ...p,
        cardStates: { ...(p.cardStates || {}), [cardId]: next },
      }
    })
  }

  return (
    <PageShell bare>
      <DeckRunner
        deck={deck}
        seenIds={profile.flashcardsSeen || []}
        masteredIds={profile.flashcardsMastered || []}
        onCardSeen={markCardSeen}
        onCardMastered={markCardMastered}
        onCardNotYet={markCardNotYet}
        onCardRated={markCardRated}
        onBack={() => router.push('/flashcards')}
        onPrint={() => window.print()}
      />
      <PrintSheet deck={deck} />
    </PageShell>
  )
}
