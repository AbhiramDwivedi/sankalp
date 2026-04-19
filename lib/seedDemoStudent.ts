// -----------------------------------------------------------------------------
// Seed a realistic demo student for Teacher / Parent profiles. Runs once
// during onboarding; the returned DemoStudent is static after that (the
// Teacher / Parent dashboards are read-only views of this state).
//
// Logic (by declared proficiency level):
//   - novice-low         → 1 L1 pack, ~5 mastered flashcards, 0 capstones
//   - novice-mid         → 3 L1 packs, ~30 mastered flashcards, 0 capstones
//   - novice-high        → 5 L1 packs, ~50 mastered flashcards, 0 capstones
//   - intermediate-low   → 3 L1 + 2 L2 packs, ~50 cards, 1 core capstone
//   - intermediate-mid   → all L1 + 3 L2 packs, ~100 cards, 2 core capstones
//   - intermediate-high  → all L1 + 6 L2 packs, ~120 cards, 3 core capstones
//
// The selected packs mirror the first N entries of the TOPIC_PACKS registry
// filtered by level, so the demo view always references real content.
// -----------------------------------------------------------------------------

import { ProficiencyLevel, type DemoStudent } from '@/types';
import { TOPIC_PACKS_BY_LEVEL } from '@/content';
import { DECKS_BY_ID } from '@/content/flashcards';
import { CAPSTONES_BY_TIER } from '@/content/capstones';
import { studyPlanForLevel } from '@/content/studyPlans';
import { localIsoDate } from '@/lib/streak';

interface SeedShape {
  l1: number;
  l2: number;
  capstones: number;
  cardsPerPack: number;
  streakDays: number;
}

const SHAPES: Record<ProficiencyLevel, SeedShape> = {
  [ProficiencyLevel.NOVICE_LOW]: { l1: 1, l2: 0, capstones: 0, cardsPerPack: 5, streakDays: 3 },
  [ProficiencyLevel.NOVICE_MID]: { l1: 3, l2: 0, capstones: 0, cardsPerPack: 10, streakDays: 6 },
  [ProficiencyLevel.NOVICE_HIGH]: { l1: 5, l2: 0, capstones: 0, cardsPerPack: 10, streakDays: 9 },
  [ProficiencyLevel.INTERMEDIATE_LOW]: { l1: 3, l2: 2, capstones: 1, cardsPerPack: 10, streakDays: 10 },
  [ProficiencyLevel.INTERMEDIATE_MID]: { l1: 12, l2: 3, capstones: 2, cardsPerPack: 7, streakDays: 12 },
  [ProficiencyLevel.INTERMEDIATE_HIGH]: { l1: 12, l2: 6, capstones: 3, cardsPerPack: 7, streakDays: 12 },
};

/**
 * Build a set of ISO dates covering the last `streakDays` consecutive
 * calendar days ending today, plus a handful of older dates scattered
 * before the streak to pad total activity without breaking the streak.
 * The streak computation walks backwards from today and stops at the
 * first missing day, so the streak that surfaces on the dashboard will
 * be exactly `streakDays`.
 */
function seedActivityDates(streakDays: number, now: Date = new Date()): string[] {
  if (streakDays <= 0) return [];
  const dates: string[] = [];
  // Consecutive streak ending today.
  for (let i = 0; i < streakDays; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    dates.push(localIsoDate(d));
  }
  // A few older "historical" dates (offset +2, +4 beyond the streak) so the
  // Today strip's "Active X days ago" shows more than a strict streak.
  for (const extra of [streakDays + 2, streakDays + 4]) {
    const d = new Date(now);
    d.setDate(d.getDate() - extra);
    dates.push(localIsoDate(d));
  }
  return Array.from(new Set(dates)).sort();
}

export function seedDemoStudent(level: ProficiencyLevel, name: string): DemoStudent {
  const shape = SHAPES[level] ?? SHAPES[ProficiencyLevel.NOVICE_MID];

  const l1Picks = TOPIC_PACKS_BY_LEVEL[1].slice(0, shape.l1).map((p) => p.id);
  const l2Picks = TOPIC_PACKS_BY_LEVEL[2].slice(0, shape.l2).map((p) => p.id);
  const completedTopicIds = [...l1Picks, ...l2Picks];

  // Flashcards — take the pack-review deck for each completed pack and
  // "master" the first cardsPerPack cards of each. Deck id convention:
  // 'pack-{packId}'. If the deck is missing (defensive) skip silently.
  const mastered = new Set<string>();
  for (const packId of completedTopicIds) {
    const deckId = `deck-pack-${packId}`;
    const deck = DECKS_BY_ID[deckId];
    if (!deck) continue;
    for (const card of deck.cards.slice(0, shape.cardsPerPack)) {
      mastered.add(card.id);
    }
  }

  const coreCaps = CAPSTONES_BY_TIER.core.slice(0, shape.capstones).map((c) => c.id);

  return {
    name,
    currentLevel: level,
    completedTopicIds,
    flashcardsMastered: Array.from(mastered),
    completedCapstoneIds: coreCaps,
    activityDates: seedActivityDates(shape.streakDays),
    selectedStudyPlanId: studyPlanForLevel(level).id,
  };
}

/**
 * Pool of Hindi first names for the auto-seeded demo student. Picked at
 * onboarding when the teacher/parent doesn't have a more specific name in
 * mind. Kept short so the demo dashboards feel peopled but not overwhelming.
 */
export const DEFAULT_DEMO_STUDENT_NAMES: readonly string[] = [
  'Priya',
  'Arjun',
  'Meera',
  'Rohan',
  'Anjali',
  'Vikram',
];

export function pickDefaultDemoName(seedOffset = 0): string {
  const idx = Math.abs(seedOffset + Math.floor(Math.random() * 1000)) % DEFAULT_DEMO_STUDENT_NAMES.length;
  return DEFAULT_DEMO_STUDENT_NAMES[idx];
}
