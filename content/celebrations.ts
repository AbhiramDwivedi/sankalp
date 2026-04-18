// Completion celebration copy bank.
//
// When a student finishes a meaningful thing (pack, capstone, deck, plan
// milestone, STAMP-ready gate) we fire a warm, specific message - NOT a
// generic "great job!" blurb. Each function returns a stable `id` (used for
// per-profile dedupe via `profile.celebrationsShown`) plus the message body.
//
// Tone rules:
//   - Specific beats generic. "220 words of structured Hindi" not "nice work".
//   - Optional bilingual leader ("शाबाश!") on ~1/3 of messages so it stays
//     meaningful. NEVER put it on every celebration.
//   - No exclamation inflation. One exclamation per message at most.
//   - The body should name the thing the student actually did, not cheer.
//
// Fires-once-per-profile semantics are enforced in App.tsx by checking the
// celebration id against `profile.celebrationsShown` before rendering.

import type { TopicPack, Capstone, Deck } from './schema';
import { STUDY_PLANS_BY_ID } from './studyPlans';

export interface CelebrationMessage {
  /** Stable id used for per-profile dedupe. */
  id: string;
  /** Optional bilingual leader (e.g. "शाबाश!"). Rendered above the body. */
  lead?: string;
  /** The specific, warm message body. */
  body: string;
}

// ---------------------------------------------------------------------------
// Optional leader selection.
// ---------------------------------------------------------------------------

/**
 * Deterministic non-negative hash. Used to pick stable per-id variants (leader
 * on/off, connector choice) so re-rendering never flickers the displayed copy.
 */
function stableHash(seed: string, salt: number): number {
  let h = salt;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

const LEADERS = ['शाबाश!', 'वाह!', 'बहुत खूब!'];

/**
 * Optional bilingual leader. Fires on roughly 1 in 3 celebrations (per-id
 * deterministic) so the leader stays meaningful and doesn't become filler.
 */
function maybeLead(id: string): string | undefined {
  if (stableHash(id, 1) % 3 !== 0) return undefined;
  return LEADERS[stableHash(id, 2) % LEADERS.length];
}

// ---------------------------------------------------------------------------
// Per-trigger copy.
// ---------------------------------------------------------------------------

/**
 * Pack complete. Names one connector from the pack's own connector bank so
 * the student sees their own new tooling reflected back.
 */
export function packCompleteMessage(pack: TopicPack): CelebrationMessage {
  const id = `pack-complete:${pack.id}`;
  const connectors = pack.connectors || [];
  const chosen = connectors.length
    ? connectors[stableHash(pack.id, 3) % connectors.length]
    : null;

  const body = chosen
    ? `Pack done. You used ${chosen.hindi} (${chosen.english}) like a native.`
    : `Pack done. ${pack.titleEnglish} is behind you.`;

  return { id, lead: maybeLead(id), body };
}

/**
 * Capstone complete. Always names the word count - the concrete artifact the
 * student just produced. Push-tier gets a slightly different framing because
 * "Benchmark 5 territory" undersells a push essay.
 */
export function capstoneCompleteMessage(
  capstone: Capstone,
  wordCount: number,
): CelebrationMessage {
  const id = `capstone-complete:${capstone.id}`;
  const words = Math.max(0, Math.round(wordCount));

  let body: string;
  if (capstone.tier === 'push') {
    body = `${words} words across three tenses. That's Benchmark 6 reach.`;
  } else {
    body = `${words} words of structured Hindi. That's Benchmark 5 territory.`;
  }

  return { id, lead: maybeLead(id), body };
}

/**
 * Deck mastered (all cards green). A deliberately quiet celebration - the
 * student just built long-term memory, which is not flashy but is load-bearing.
 */
export function deckMasteredMessage(deck: Deck): CelebrationMessage {
  const id = `deck-mastered:${deck.id}`;
  const body = `Every card green on ${deck.title}. This is long-term memory work.`;
  return { id, lead: maybeLead(id), body };
}

/**
 * Plan milestone at 25/50/75/100%. The 50% and 100% messages are the emotional
 * anchors; 25% and 75% are gentler encouragement.
 */
export function planMilestoneMessage(
  planId: string,
  percent: 25 | 50 | 75 | 100,
): CelebrationMessage {
  const id = `plan-milestone-${percent}:${planId}`;
  const plan = STUDY_PLANS_BY_ID[planId];
  const planName = plan ? plan.titleEnglish.split('·')[0].trim() : 'your plan';

  let body: string;
  switch (percent) {
    case 25:
      body = `A quarter of the way through ${planName}. The rhythm is starting to set.`;
      break;
    case 50:
      body = `Halfway through ${planName}. This is when it starts feeling automatic.`;
      break;
    case 75:
      body = `Three quarters of ${planName} done. The push tier is what the exam actually feels like.`;
      break;
    case 100:
      body = `${planName} complete. Every week of the schedule is behind you.`;
      break;
  }

  return { id, lead: maybeLead(id), body };
}

/**
 * STAMP-ready. The big one. Fires when all 12 L1 + 11 L2 packs and the 5 core
 * capstones are complete. This one ALWAYS gets the leader - it's the single
 * most important celebration in the whole app.
 */
export function stampReadyMessage(): CelebrationMessage {
  return {
    id: 'stamp-ready',
    lead: 'शाबाश!',
    body: "You're ready. 23 packs, 5 core capstones, and the vocabulary to match. Benchmark 5 is yours to claim.",
  };
}

// ---------------------------------------------------------------------------
// Thresholds + helpers used by App.tsx to decide when to fire.
// ---------------------------------------------------------------------------

/** The four plan-milestone percentages we celebrate, in order. */
export const PLAN_MILESTONES: (25 | 50 | 75 | 100)[] = [25, 50, 75, 100];

/**
 * Given a fresh percent and the set of celebrations already shown, return the
 * highest milestone threshold that was just crossed (and hasn't yet been
 * celebrated). Null if no new threshold applies.
 *
 * We return the highest (not every) threshold because a single update can
 * legitimately cross multiple thresholds (e.g. a big plan reset), but we only
 * want one popover per update.
 */
export function planMilestoneJustCrossed(
  percent: number,
  planId: string,
  shown: string[],
): 25 | 50 | 75 | 100 | null {
  const shownSet = new Set(shown);
  for (let i = PLAN_MILESTONES.length - 1; i >= 0; i--) {
    const m = PLAN_MILESTONES[i];
    if (percent >= m && !shownSet.has(`plan-milestone-${m}:${planId}`)) {
      return m;
    }
  }
  return null;
}
