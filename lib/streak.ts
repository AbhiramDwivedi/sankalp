// Streak + activity date helpers for the Dashboard Today-strip.
//
// activityDates are stored on the StudentProfile as an ascending, unique array
// of local-time ISO date strings ('YYYY-MM-DD'). They are appended whenever the
// student completes a pack, capstone, or masters a flashcard. See App.tsx for
// the write sites.

/**
 * Local-time ISO date string ('YYYY-MM-DD'). Uses the user's local calendar
 * date so "today" matches whatever the wall clock shows. Do not swap for
 * toISOString() — that uses UTC and will flip the day for users west of UTC
 * any time after 5 PM local.
 */
export function localIsoDate(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Append today's date to a dates array, keeping it unique + ascending. */
export function appendToday(dates: string[] | undefined, now: Date = new Date()): string[] {
  const today = localIsoDate(now);
  const set = new Set(dates || []);
  set.add(today);
  return Array.from(set).sort();
}

/** Parse a 'YYYY-MM-DD' string back to a local-time Date at midnight. */
function parseLocalIsoDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

/** Day difference between two ISO dates (a - b) in whole days. */
function dayDiff(a: string, b: string): number {
  const MS = 24 * 60 * 60 * 1000;
  return Math.round((parseLocalIsoDate(a).getTime() - parseLocalIsoDate(b).getTime()) / MS);
}

/**
 * Current streak = consecutive-day run ending today OR yesterday. If the most
 * recent activity is older than yesterday, the streak has broken and returns 0.
 * Common courtesy: not having done something yet *today* does not break the
 * streak — only skipping yesterday does.
 *
 *   ['2026-04-15', '2026-04-16', '2026-04-17'] + today=2026-04-17 -> 3
 *   ['2026-04-15', '2026-04-17']               + today=2026-04-17 -> 1
 *   ['2026-04-15', '2026-04-16']               + today=2026-04-17 -> 2  (grace for today)
 *   ['2026-04-15']                             + today=2026-04-17 -> 0  (too old)
 *   []                                         + today=2026-04-17 -> 0
 */
export function computeStreak(dates: string[] | undefined, now: Date = new Date()): number {
  if (!dates || dates.length === 0) return 0;
  // Dedupe + sort descending (most recent first).
  const sorted = Array.from(new Set(dates)).sort().reverse();
  const today = localIsoDate(now);
  const gap = dayDiff(today, sorted[0]);
  if (gap > 1) return 0; // last activity older than yesterday → streak broken
  // Anchor = most recent activity. Walk backwards while consecutive.
  let streak = 1;
  let anchor = sorted[0];
  for (let i = 1; i < sorted.length; i++) {
    const d = sorted[i];
    if (dayDiff(anchor, d) === 1) {
      streak += 1;
      anchor = d;
    } else if (d === anchor) {
      continue; // dedupe safety
    } else {
      break;
    }
  }
  return streak;
}

/** Human-friendly label for the most recent activity date. */
export function lastActivityLabel(
  dates: string[] | undefined,
  now: Date = new Date(),
): string {
  if (!dates || dates.length === 0) return 'Start today';
  const latest = [...new Set(dates)].sort().pop()!;
  const today = localIsoDate(now);
  const diff = dayDiff(today, latest);
  if (diff <= 0) return 'Active today';
  if (diff === 1) return 'Active yesterday';
  if (diff < 7) return `${diff} days ago`;
  return latest;
}
