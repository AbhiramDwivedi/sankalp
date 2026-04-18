import { test, expect } from '@playwright/test';
import { nextCardState, dueCardIds, SRS_BOUNDS, type Rating } from '../lib/srs';
import type { CardState } from '../types';

/**
 * SRS math unit tests — pure TypeScript, no browser. Runs under the smoke
 * playwright config because all *.spec.ts files in tests/ are picked up.
 * These tests don't touch `page`, so they're effectively fast unit tests
 * inside the same runner.
 *
 * Anchoring notes on the scheduler (see lib/srs.ts for full commentary):
 *   - Ease starts at 2.5 for a new card. Deltas: again -0.2, hard -0.1,
 *     good 0, easy +0.1. Clamped to [1.3, 2.5].
 *   - Interval resets to 1 on 'again'. Otherwise = prev * nextEase, clamped
 *     to [1, 365]. On a first review (prev interval 0) it seeds prev to 1
 *     so the first successful rating produces a real interval.
 *   - Reviews increments by 1 per rating.
 */

const FIXED_NOW = new Date('2026-04-18T12:00:00.000Z');

test.describe('SRS · nextCardState', () => {
  test('new card + good → ease stays at default, reviews=1, interval>=1', () => {
    const next = nextCardState(undefined, 'good', FIXED_NOW);
    expect(next.ease).toBe(SRS_BOUNDS.easeDefault);
    expect(next.reviews).toBe(1);
    expect(next.interval).toBeGreaterThanOrEqual(SRS_BOUNDS.intervalMin);
    expect(next.interval).toBeLessThanOrEqual(SRS_BOUNDS.intervalMax);
  });

  test('ease deltas are applied per rating', () => {
    const seed: CardState = {
      ease: 2.0,
      interval: 10,
      due: FIXED_NOW.toISOString(),
      reviews: 3,
    };
    expect(nextCardState(seed, 'again', FIXED_NOW).ease).toBeCloseTo(1.8, 5);
    expect(nextCardState(seed, 'hard', FIXED_NOW).ease).toBeCloseTo(1.9, 5);
    expect(nextCardState(seed, 'good', FIXED_NOW).ease).toBeCloseTo(2.0, 5);
    expect(nextCardState(seed, 'easy', FIXED_NOW).ease).toBeCloseTo(2.1, 5);
  });

  test('ease clamps to minimum 1.3 even after repeated "again"', () => {
    let state: CardState | undefined;
    for (let i = 0; i < 20; i++) {
      state = nextCardState(state, 'again', FIXED_NOW);
    }
    expect(state!.ease).toBe(SRS_BOUNDS.easeMin);
    // sanity: 20 reviews
    expect(state!.reviews).toBe(20);
  });

  test('ease clamps to maximum 2.5 even after repeated "easy"', () => {
    let state: CardState | undefined;
    for (let i = 0; i < 20; i++) {
      state = nextCardState(state, 'easy', FIXED_NOW);
    }
    expect(state!.ease).toBe(SRS_BOUNDS.easeMax);
  });

  test('"again" resets interval to 1 day regardless of previous interval', () => {
    const seed: CardState = {
      ease: 2.5,
      interval: 120,
      due: FIXED_NOW.toISOString(),
      reviews: 8,
    };
    const next = nextCardState(seed, 'again', FIXED_NOW);
    expect(next.interval).toBe(1);
  });

  test('"good" on an existing card multiplies interval by ease, clamped to 365', () => {
    const seed: CardState = {
      ease: 2.5,
      interval: 10,
      due: FIXED_NOW.toISOString(),
      reviews: 3,
    };
    const next = nextCardState(seed, 'good', FIXED_NOW);
    // 10 * 2.5 = 25, rounded → 25
    expect(next.interval).toBe(25);

    // Very high interval should clamp to 365
    const huge: CardState = {
      ease: 2.5,
      interval: 400,
      due: FIXED_NOW.toISOString(),
      reviews: 10,
    };
    const nextHuge = nextCardState(huge, 'good', FIXED_NOW);
    expect(nextHuge.interval).toBe(SRS_BOUNDS.intervalMax);
  });

  test('due timestamp advances by interval days from `now`', () => {
    const seed: CardState = {
      ease: 2.0,
      interval: 5,
      due: FIXED_NOW.toISOString(),
      reviews: 2,
    };
    const next = nextCardState(seed, 'good', FIXED_NOW);
    const dueMs = Date.parse(next.due);
    const expectedMs = FIXED_NOW.getTime() + next.interval * 24 * 60 * 60 * 1000;
    // Allow 1s of slack for any clock arithmetic nuances.
    expect(Math.abs(dueMs - expectedMs)).toBeLessThan(1000);
  });

  test('new card + again → interval 1, reviews 1, ease down from default', () => {
    const next = nextCardState(undefined, 'again', FIXED_NOW);
    expect(next.interval).toBe(1);
    expect(next.reviews).toBe(1);
    expect(next.ease).toBeCloseTo(SRS_BOUNDS.easeDefault - 0.2, 5);
  });
});

test.describe('SRS · dueCardIds', () => {
  test('empty states → empty result', () => {
    expect(dueCardIds(undefined, ['a', 'b'], FIXED_NOW)).toEqual([]);
    expect(dueCardIds({}, ['a', 'b'], FIXED_NOW)).toEqual([]);
  });

  test('returns overdue cards sorted most-overdue first, capped at limit', () => {
    const oneDayMs = 24 * 60 * 60 * 1000;
    const states: Record<string, CardState> = {
      // Due 3 days ago — most overdue
      'card-a': {
        ease: 2.0,
        interval: 1,
        due: new Date(FIXED_NOW.getTime() - 3 * oneDayMs).toISOString(),
        reviews: 1,
      },
      // Due 1 day ago
      'card-b': {
        ease: 2.0,
        interval: 1,
        due: new Date(FIXED_NOW.getTime() - 1 * oneDayMs).toISOString(),
        reviews: 1,
      },
      // Due 5 days in the future — not due
      'card-c': {
        ease: 2.0,
        interval: 5,
        due: new Date(FIXED_NOW.getTime() + 5 * oneDayMs).toISOString(),
        reviews: 1,
      },
    };
    const result = dueCardIds(states, ['card-a', 'card-b', 'card-c'], FIXED_NOW, 20);
    expect(result).toEqual(['card-a', 'card-b']);
  });

  test('stale ids not present in the universe are filtered out', () => {
    const states: Record<string, CardState> = {
      'card-deleted': {
        ease: 2.0,
        interval: 1,
        due: new Date(FIXED_NOW.getTime() - 1000).toISOString(),
        reviews: 1,
      },
    };
    const result = dueCardIds(states, ['card-still-here'], FIXED_NOW, 20);
    expect(result).toEqual([]);
  });

  test('limit truncates result to top-N overdue', () => {
    const oneDayMs = 24 * 60 * 60 * 1000;
    const states: Record<string, CardState> = {};
    const ids: string[] = [];
    for (let i = 0; i < 30; i++) {
      const id = `c${i}`;
      ids.push(id);
      states[id] = {
        ease: 2.0,
        interval: 1,
        due: new Date(FIXED_NOW.getTime() - (i + 1) * oneDayMs).toISOString(),
        reviews: 1,
      };
    }
    const result = dueCardIds(states, ids, FIXED_NOW, 5);
    expect(result.length).toBe(5);
    // Most-overdue first → c29 (29 days), c28, c27, c26, c25
    expect(result[0]).toBe('c29');
    expect(result[4]).toBe('c25');
  });
});
