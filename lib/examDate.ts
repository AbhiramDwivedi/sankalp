// -----------------------------------------------------------------------------
// examDate — small pure helpers around `profile.examDate`.
//
// `profile.examDate` is an ISO YYYY-MM-DD string set during onboarding (default
// from `calculateRecommendedDate(level)`) and editable from Settings. These
// helpers wrap the date-math that the dashboard tile + the "exam sooner than
// plan" hint need so callers do not duplicate timezone-careful logic.
//
// All functions are pure and timezone-stable: dates are compared by calendar
// day in the user's local timezone, not by UTC instant. That keeps the
// "exam in N days" copy honest (a Nov 1 exam should read as 0 days remaining
// from the moment Nov 1 starts in the user's locale, not at UTC midnight).
// -----------------------------------------------------------------------------

const MS_PER_DAY = 24 * 60 * 60 * 1000

/**
 * Parse a YYYY-MM-DD string into a local-midnight Date. Returns null when the
 * string is missing or malformed. We deliberately avoid `new Date(string)`
 * because the JS spec parses bare YYYY-MM-DD as UTC, which would shift the
 * displayed date by a day for negative-UTC locales.
 */
export function parseExamDate(iso: string | undefined | null): Date | null {
  if (!iso) return null
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!m) return null
  const y = Number(m[1])
  const mo = Number(m[2])
  const d = Number(m[3])
  if (!y || !mo || !d) return null
  const date = new Date(y, mo - 1, d)
  if (Number.isNaN(date.getTime())) return null
  return date
}

/**
 * Whole calendar days from today (local midnight) to the exam date. Negative
 * when the exam is in the past, 0 on exam day, positive otherwise.
 */
export function daysUntilExam(iso: string | undefined | null, now: Date = new Date()): number | null {
  const exam = parseExamDate(iso)
  if (!exam) return null
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const diffMs = exam.getTime() - todayMidnight.getTime()
  return Math.round(diffMs / MS_PER_DAY)
}

/**
 * Whole weeks (rounded up) from today to the exam date. Returns null when no
 * date is set; 0 when the exam is today or already past. Used by the
 * "exam sooner than plan" nudge on the dashboard.
 */
export function weeksUntilExam(iso: string | undefined | null, now: Date = new Date()): number | null {
  const days = daysUntilExam(iso, now)
  if (days === null) return null
  if (days <= 0) return 0
  return Math.ceil(days / 7)
}

/**
 * Whole calendar weeks elapsed (floored) since `startDateIso`. Returns 0 when
 * the start date is missing, malformed, or in the future. Local-midnight
 * anchored to match the rest of this module — the dashboard pacing nudge uses
 * this to subtract weeks-already-spent from the authored plan length so it
 * compares "weeks of plan content left" against "weeks until exam", not raw
 * `plan.durationWeeks`.
 */
export function weeksSince(startDateIso: string | undefined | null, now: Date = new Date()): number {
  const start = parseExamDate(startDateIso)
  if (!start) return 0
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const diffMs = todayMidnight.getTime() - start.getTime()
  if (diffMs <= 0) return 0
  return Math.floor(diffMs / MS_PER_DAY / 7)
}

/**
 * "Nov 1, 2026" style label suitable for the dashboard tile + Settings hint.
 * Returns null when the date string is invalid.
 */
export function formatExamDate(iso: string | undefined | null): string | null {
  const date = parseExamDate(iso)
  if (!date) return null
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Status descriptor for the dashboard tile. Centralises the "in N days" /
 * "today" / "passed" copy so the StudentDashboard tile and the Parent / Teacher
 * dashboards (when we surface this there) stay consistent.
 */
export function describeExamCountdown(
  iso: string | undefined | null,
  now: Date = new Date(),
): { kind: 'unset' | 'past' | 'today' | 'future'; label: string; date: string | null; days: number | null } {
  const formatted = formatExamDate(iso)
  const days = daysUntilExam(iso, now)
  if (days === null || formatted === null) {
    return { kind: 'unset', label: 'No exam date set', date: null, days: null }
  }
  if (days < 0) {
    return { kind: 'past', label: `Exam date passed (${formatted})`, date: formatted, days }
  }
  if (days === 0) {
    return { kind: 'today', label: `Exam today (${formatted})`, date: formatted, days }
  }
  if (days === 1) {
    return { kind: 'future', label: `Exam tomorrow · ${formatted}`, date: formatted, days }
  }
  return {
    kind: 'future',
    label: `Exam in ${days} days · ${formatted}`,
    date: formatted,
    days,
  }
}
