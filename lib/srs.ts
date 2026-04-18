// SM-2-lite spaced-repetition scheduler for flashcards.
//
// This is a deliberately small scheduler. Per-card state carries ease, next
// interval (days), a due timestamp, and a review counter. On each review the
// student rates the card with one of four buttons; ease and interval move
// according to the rating, clamped to sane bounds.
//
//   Rating     Ease delta   Interval behavior
//   -----      ----------   -----------------
//   again      -0.20        reset to 1 day
//   hard       -0.10        prev interval * ease, min 1
//   good        0.00        prev interval * ease, min 1
//   easy       +0.10        prev interval * ease, min 1
//
// Bounds: ease clamped to [1.3, 2.5]. Interval clamped to [1, 365].
//
// New card (prev undefined) starts at ease 2.5, interval 0, reviews 0, and is
// scheduled from the result of the first review like any other card.
//
// Pure functions. No React, no localStorage, no Date.now() at the top level —
// callers pass `now` so tests can pin time.

import type { CardState } from '../types';

export type Rating = 'again' | 'hard' | 'good' | 'easy';

const EASE_MIN = 1.3;
const EASE_MAX = 2.5;
const EASE_DEFAULT = 2.5;
const INTERVAL_MIN = 1;
const INTERVAL_MAX = 365;

const EASE_DELTA: Record<Rating, number> = {
  again: -0.2,
  hard: -0.1,
  good: 0,
  easy: 0.1,
};

function clamp(n: number, lo: number, hi: number): number {
  if (n < lo) return lo;
  if (n > hi) return hi;
  return n;
}

function addDays(from: Date, days: number): Date {
  const d = new Date(from.getTime());
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

/**
 * Compute the next card state from a rating. `prev` may be undefined for a
 * first-time review (treated as ease 2.5, interval 0, reviews 0). `now` lets
 * callers inject a clock for tests; defaults to the current time.
 */
export function nextCardState(
  prev: CardState | undefined,
  rating: Rating,
  now: Date = new Date(),
): CardState {
  const base: CardState = prev ?? {
    ease: EASE_DEFAULT,
    interval: 0,
    due: now.toISOString(),
    reviews: 0,
  };

  const nextEase = clamp(base.ease + EASE_DELTA[rating], EASE_MIN, EASE_MAX);

  let nextInterval: number;
  if (rating === 'again') {
    nextInterval = 1;
  } else {
    // Use the post-delta ease so a 'good' on a fresh card still grows sensibly
    // (seed interval=0 → 0 * ease = 0 → clamped up to 1 on first review; on
    // subsequent reviews prev.interval * prev.ease produces the normal ramp).
    const prevInterval = base.interval > 0 ? base.interval : 1;
    nextInterval = prevInterval * nextEase;
  }
  nextInterval = clamp(Math.round(nextInterval), INTERVAL_MIN, INTERVAL_MAX);

  const nextDue = addDays(now, nextInterval).toISOString();

  return {
    ease: nextEase,
    interval: nextInterval,
    due: nextDue,
    reviews: base.reviews + 1,
  };
}

/**
 * Return the ids of cards that are due now or overdue, sorted most-overdue
 * first, capped at `limit`. Cards without any state are NOT included — new
 * cards surface through normal deck browsing, not the SRS queue. Callers pass
 * the universe of valid card ids (allCardIds) so stale cardStates keys (e.g.
 * from a deleted card) are filtered out.
 */
export function dueCardIds(
  cardStates: Record<string, CardState> | undefined,
  allCardIds: string[],
  now: Date = new Date(),
  limit = 20,
): string[] {
  if (!cardStates) return [];
  const validIds = new Set(allCardIds);
  const nowMs = now.getTime();
  const due: Array<{ id: string; dueMs: number }> = [];
  for (const [id, state] of Object.entries(cardStates)) {
    if (!validIds.has(id)) continue;
    const dueMs = Date.parse(state.due);
    if (Number.isNaN(dueMs)) continue;
    if (dueMs <= nowMs) due.push({ id, dueMs });
  }
  due.sort((a, b) => a.dueMs - b.dueMs);
  return due.slice(0, limit).map((d) => d.id);
}

/** Exposed for tests — identical bounds to the internal clamps. */
export const SRS_BOUNDS = {
  easeMin: EASE_MIN,
  easeMax: EASE_MAX,
  easeDefault: EASE_DEFAULT,
  intervalMin: INTERVAL_MIN,
  intervalMax: INTERVAL_MAX,
} as const;
