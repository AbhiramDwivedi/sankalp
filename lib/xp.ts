// -----------------------------------------------------------------------------
// XP utility — pure, deterministic scoring of a StudentProfile's gamification
// currency. Called by the navbar XP pill, dashboard stats, and teacher demo
// student summaries.
//
// Rules (from the Phase 0 plan the user signed off on):
//   - completedTopicIds       → 50 XP per pack
//   - completedCapstoneIds    → 100 XP (core, C01-C05) or 150 XP (push, C06-C10)
//   - flashcardsMastered      → 5 XP per card
//   - evaluations (all entries across all topicIds) where score >= 5 → 30 XP
//   - speakingRecordings (all attempts across all packs) with aiEval.score >= 5 → 20 XP
//
// The function is pure — no side effects, no state. It accepts the full profile
// (or a DemoStudent-shaped subset for teacher/parent demo dashboards, so long
// as the caller passes the needed fields).
// -----------------------------------------------------------------------------

import type { StudentProfile } from '@/types';
import { CAPSTONES_BY_ID } from '@/content/capstones';

type XpSource = Pick<
  StudentProfile,
  | 'completedTopicIds'
  | 'completedCapstoneIds'
  | 'flashcardsMastered'
  | 'evaluations'
  | 'speakingRecordings'
>;

export function computeXp(profile: XpSource): number {
  let xp = 0;

  // Packs.
  const packs = profile.completedTopicIds || [];
  xp += packs.length * 50;

  // Capstones — tier lookup via CAPSTONES_BY_ID. Unknown ids default to core.
  const caps = profile.completedCapstoneIds || [];
  for (const id of caps) {
    const cap = CAPSTONES_BY_ID[id];
    const tier = cap?.tier ?? 'core';
    xp += tier === 'push' ? 150 : 100;
  }

  // Flashcards mastered.
  const cards = profile.flashcardsMastered || [];
  xp += cards.length * 5;

  // Writing evaluations — every entry across all topic ids with score >= 5.
  const evals = profile.evaluations || {};
  for (const list of Object.values(evals)) {
    if (!Array.isArray(list)) continue;
    for (const ev of list) {
      if (ev && typeof ev.score === 'number' && ev.score >= 5) xp += 30;
    }
  }

  // Speaking attempts — every attempt with an AI eval at score >= 5.
  const speak = profile.speakingRecordings || {};
  for (const list of Object.values(speak)) {
    if (!Array.isArray(list)) continue;
    for (const att of list) {
      if (att?.aiEval && typeof att.aiEval.score === 'number' && att.aiEval.score >= 5) xp += 20;
    }
  }

  return xp;
}
