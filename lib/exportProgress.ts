// Sanitization + download helpers for the teacher/parent progress export
// (4.4). Two output paths share this module:
//
//   1. `sanitizeForExport(profile)` returns a JSON-safe snapshot that strips
//      free-form AI scratch (`thoughtProcessAnalysis`) but keeps everything a
//      parent or grader needs to reconstruct progress (scores, strengths,
//      areas to improve, mastery, scheduling, completion lists). The schema
//      is intentionally a strict subset of `StudentProfile` so legacy fields
//      and any future profile additions stay opt-in.
//
//   2. `downloadJsonExport(profile)` triggers a Blob download named per the
//      backlog brief (`{profileName}-sankalp-progress-{YYYY-MM-DD}.json`).
//      It also stamps `lastExportedAt` on the in-memory profile copy that the
//      caller persists via `updateActiveProfile`.
//
// No new dependencies. Pure browser primitives (Blob + URL.createObjectURL).

import type {
  CardState,
  EvaluationResult,
  MockExamResult,
  StudentProfile,
} from '../types';
import { localIsoDate } from './streak';

/**
 * Per-evaluation export shape. We DROP `thoughtProcessAnalysis` because it
 * is the model's free-form chain-of-thought — opaque, sometimes large, and
 * not useful to a parent or grader. Everything else (numeric score, the
 * teacher-readable feedback, the bulleted strengths/improvements, and the
 * suggested next step) stays.
 */
export interface SanitizedEvaluation {
  date: string;
  score: number;
  feedback: string;
  identifiedStrengths: string[];
  areasToImprove: string[];
  suggestedNextStep: string;
}

/**
 * Per-mock-exam export shape. Same sanitization: keep the submitted text and
 * timing telemetry, keep the AI score block (if present) minus its
 * thoughtProcessAnalysis, keep the self-check answers.
 */
export interface SanitizedMockExamResult {
  text: string;
  submittedAt: string;
  durationSeconds: number;
  timedOut: boolean;
  ai?: SanitizedEvaluation;
  selfCheck?: Record<string, boolean>;
}

export interface SanitizedProfile {
  // Identity + plan.
  id: string;
  name: string;
  currentLevel: string;
  startDate: string;
  examDate: string;
  selectedStudyPlanId?: string;

  // Progress lists. Plain ids — the consumer can join against the public
  // content registries to render names if they want richer reports.
  completedTopicIds: string[];
  completedCapstoneIds: string[];
  flashcardsSeen: string[];
  flashcardsMastered: string[];
  deferredIds: string[];
  activityDates: string[];

  // SRS schedule. Useful for a teacher to see how a student is pacing
  // reviews; small and structured.
  cardStates: Record<string, CardState>;

  // Sanitized AI output.
  evaluations: Record<string, SanitizedEvaluation[]>;
  mockExamResults: Record<string, SanitizedMockExamResult>;

  // Export metadata.
  exportSchemaVersion: 1;
  exportedAt: string;
}

function sanitizeEvaluation(e: EvaluationResult): SanitizedEvaluation {
  return {
    date: e.date,
    score: e.score,
    feedback: e.feedback,
    identifiedStrengths: [...(e.identifiedStrengths || [])],
    areasToImprove: [...(e.areasToImprove || [])],
    suggestedNextStep: e.suggestedNextStep,
  };
}

function sanitizeMockResult(m: MockExamResult): SanitizedMockExamResult {
  return {
    text: m.text,
    submittedAt: m.submittedAt,
    durationSeconds: m.durationSeconds,
    timedOut: m.timedOut,
    ai: m.ai ? sanitizeEvaluation(m.ai) : undefined,
    selfCheck: m.selfCheck ? { ...m.selfCheck } : undefined,
  };
}

/**
 * Produce a JSON-safe export snapshot of the profile. Idempotent. See module
 * comment for the sanitization contract.
 */
export function sanitizeForExport(
  profile: StudentProfile,
  now: Date = new Date(),
): SanitizedProfile {
  const evaluations: Record<string, SanitizedEvaluation[]> = {};
  for (const [packId, list] of Object.entries(profile.evaluations || {})) {
    evaluations[packId] = (list || []).map(sanitizeEvaluation);
  }
  const mockExamResults: Record<string, SanitizedMockExamResult> = {};
  for (const [capId, m] of Object.entries(profile.mockExamResults || {})) {
    if (m) mockExamResults[capId] = sanitizeMockResult(m);
  }

  return {
    id: profile.id,
    name: profile.name,
    currentLevel: String(profile.currentLevel),
    startDate: profile.startDate,
    examDate: profile.examDate,
    selectedStudyPlanId: profile.selectedStudyPlanId,

    completedTopicIds: [...(profile.completedTopicIds || [])],
    completedCapstoneIds: [...(profile.completedCapstoneIds || [])],
    flashcardsSeen: [...(profile.flashcardsSeen || [])],
    flashcardsMastered: [...(profile.flashcardsMastered || [])],
    deferredIds: [...(profile.deferredIds || [])],
    activityDates: [...(profile.activityDates || [])],

    cardStates: { ...(profile.cardStates || {}) },

    evaluations,
    mockExamResults,

    exportSchemaVersion: 1,
    exportedAt: now.toISOString(),
  };
}

/**
 * Slugify a student name into a filesystem-safe filename component. Strips
 * characters that confuse Windows / macOS file pickers, collapses whitespace
 * to a single dash, and falls back to `student` if nothing usable remains.
 */
export function slugifyName(name: string): string {
  const cleaned = (name || '')
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '') // drop punctuation, keep letters/digits/_/whitespace/-
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  return cleaned || 'student';
}

/** Build the export filename for a given format. */
export function exportFilename(
  profileName: string,
  ext: 'json' | 'pdf',
  now: Date = new Date(),
): string {
  return `${slugifyName(profileName)}-sankalp-progress-${localIsoDate(now)}.${ext}`;
}

/**
 * Trigger a JSON download of the sanitized profile. Returns the ISO timestamp
 * stamped onto the export so the caller can persist it as
 * `profile.lastExportedAt`. Browser-only — relies on `Blob`,
 * `URL.createObjectURL`, and a temporary anchor click.
 */
export function downloadJsonExport(profile: StudentProfile, now: Date = new Date()): string {
  const snapshot = sanitizeForExport(profile, now);
  const json = JSON.stringify(snapshot, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = exportFilename(profile.name, 'json', now);
  // Append + remove keeps Firefox happy; some browsers ignore unanchored clicks.
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Defer revoke to the next tick so the click handler sees the URL.
  setTimeout(() => URL.revokeObjectURL(url), 0);
  return snapshot.exportedAt;
}
