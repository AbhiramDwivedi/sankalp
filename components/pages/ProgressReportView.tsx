import React from 'react';
import { Printer, X } from 'lucide-react';
import type { StudentProfile } from '../../types';
import { TOPIC_PACKS, getPack } from '../../content';
import { CAPSTONES, getCapstone } from '../../content/capstones';
import { DECKS } from '../../content/flashcards';
import { getStudyPlan, studyPlanForLevel } from '../../content/studyPlans';
import { computeStreak, lastActivityLabel, localIsoDate } from '../../lib/streak';

interface ProgressReportViewProps {
  profile: StudentProfile;
  /** Closes the overlay; callers wire this to the Settings handler. */
  onClose: () => void;
  /** Optional clock injection — defaults to `new Date()`. Tests pin time. */
  now?: Date;
}

/**
 * Teacher/parent-facing progress report. Single-purpose view designed for
 * print-to-PDF (browser "Save as PDF" via window.print). The on-screen chrome
 * (Print button, Close button) is wrapped in a `no-print` shell so the printed
 * PDF contains only the report itself.
 *
 * Sections, in vertical order:
 *   1. Identity strip — name + level + plan + exam date + last active.
 *   2. Headline numbers — packs done / capstones done / streak / readiness.
 *   3. Pack completion grid — 26 packs, completed marked.
 *   4. Capstones with mock-exam scores — only completed or attempted ones.
 *   5. Deck mastery bars — grouped by must-know / core / bonus priority.
 *   6. Activity in last 30 days — calendar grid + count.
 *   7. Recent AI evaluation excerpts — last 3, sanitized (no thoughtProcess).
 *
 * Print styling: the wrapper carries class `progress-report-page`, which
 * `index.html`'s @media-print block maps to a named @page. A page-break
 * sits between major sections so a teacher's printout is predictable.
 */
export const ProgressReportView: React.FC<ProgressReportViewProps> = ({
  profile,
  onClose,
  now = new Date(),
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      data-testid="progress-report-overlay"
      className="fixed inset-0 z-[120] bg-slate-50 overflow-y-auto"
    >
      {/* Toolbar — never printed. */}
      <div className="no-print sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Progress report
          </p>
          <p className="text-sm font-black text-slate-900">{profile.name}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            data-testid="progress-report-print"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-600 text-white font-black text-xs uppercase tracking-widest hover:bg-orange-700"
          >
            <Printer size={14} /> Print / Save as PDF
          </button>
          <button
            data-testid="progress-report-close"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-black text-xs uppercase tracking-widest hover:bg-slate-200"
          >
            <X size={14} /> Close
          </button>
        </div>
      </div>

      <div className="progress-report-page max-w-4xl mx-auto px-8 py-10">
        <ReportHeader profile={profile} now={now} />
        <HeadlineNumbers profile={profile} now={now} />
        <PackCompletionSection profile={profile} />
        <CapstoneSection profile={profile} />
        <DeckMasterySection profile={profile} />
        <ActivitySection profile={profile} now={now} />
        <RecentEvaluationsSection profile={profile} />
        <FooterMeta profile={profile} now={now} />
      </div>
    </div>
  );
};

// ---------- Section components ----------

const ReportHeader: React.FC<{ profile: StudentProfile; now: Date }> = ({ profile, now }) => {
  const plan = getStudyPlan(profile.selectedStudyPlanId) || studyPlanForLevel(profile.currentLevel);
  return (
    <header className="mb-10 pb-8 border-b-2 border-slate-200 print:break-inside-avoid">
      <p className="text-[10px] font-black uppercase tracking-widest text-orange-600 mb-2">
        Sankalp Hindi · FCPS Credit Prep
      </p>
      <h1 className="text-4xl font-black text-slate-900 tracking-tight" data-testid="progress-report-title">
        Progress report — {profile.name}
      </h1>
      <p className="text-sm text-slate-500 mt-2">
        Generated {formatHumanDate(now)}. State source: this device's local storage.
      </p>
      <dl className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <Field label="Level">{profile.currentLevel}</Field>
        <Field label="Plan">{plan.titleEnglish}</Field>
        <Field label="Started">{formatShortDate(profile.startDate)}</Field>
        <Field label="Exam date">{formatShortDate(profile.examDate) || 'not set'}</Field>
      </dl>
    </header>
  );
};

const HeadlineNumbers: React.FC<{ profile: StudentProfile; now: Date }> = ({ profile, now }) => {
  const completedPacks = (profile.completedTopicIds || []).length;
  const completedCaps = (profile.completedCapstoneIds || []).length;
  const totalPacks = TOPIC_PACKS.length;
  const totalCaps = CAPSTONES.length;
  const streak = computeStreak(profile.activityDates, now);
  const lastActive = lastActivityLabel(profile.activityDates, now);

  // Same readiness heuristic as the dashboard, kept in sync intentionally so
  // the parent reads the same number on screen and on the printout.
  const weights = { 1: 1, 2: 1.5, 3: 2 } as const;
  const earned = (profile.completedTopicIds || []).reduce((s, id) => {
    const p = getPack(id);
    return s + (p ? weights[p.level] : 0);
  }, 0);
  const possible = TOPIC_PACKS.reduce((s, p) => s + weights[p.level], 0);
  const packsReadiness = possible > 0 ? earned / possible : 0;
  const capsReadiness = totalCaps > 0 ? completedCaps / totalCaps : 0;
  const readiness = Math.round((packsReadiness * 0.6 + capsReadiness * 0.4) * 100);

  return (
    <section className="mb-10 print:break-inside-avoid">
      <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">
        At a glance
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat
          label="Packs done"
          value={`${completedPacks} / ${totalPacks}`}
          testId="report-stat-packs"
        />
        <Stat
          label="Capstones done"
          value={`${completedCaps} / ${totalCaps}`}
          testId="report-stat-capstones"
        />
        <Stat label="Current streak" value={`${streak} day${streak === 1 ? '' : 's'}`} />
        <Stat label="Readiness" value={`${readiness}%`} />
      </div>
      <p className="mt-3 text-xs text-slate-500 italic">
        Last active: {lastActive}. Readiness blends pack mix (60%) with capstone count (40%).
      </p>
    </section>
  );
};

const PackCompletionSection: React.FC<{ profile: StudentProfile }> = ({ profile }) => {
  const done = new Set(profile.completedTopicIds || []);
  return (
    <section className="mb-10 print:break-inside-avoid">
      <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">
        Topic packs
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {TOPIC_PACKS.map((p) => {
          const completed = done.has(p.id);
          return (
            <div
              key={p.id}
              className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg border ${
                completed ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200'
              }`}
            >
              <div className="min-w-0">
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                  L{p.level} · {p.id}
                </p>
                <p className="text-sm font-bold text-slate-900 truncate">{p.titleEnglish}</p>
              </div>
              <span
                className={`shrink-0 text-[10px] font-black uppercase tracking-widest ${
                  completed ? 'text-emerald-700' : 'text-slate-300'
                }`}
              >
                {completed ? 'Done' : '—'}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const CapstoneSection: React.FC<{ profile: StudentProfile }> = ({ profile }) => {
  const doneSet = new Set(profile.completedCapstoneIds || []);
  const mockResults = profile.mockExamResults || {};

  // Show every capstone the student has touched (either completed or has a
  // mock-exam record). Empty list gets a friendly placeholder.
  const rows = CAPSTONES.filter((c) => doneSet.has(c.id) || mockResults[c.id]);

  return (
    <section className="mb-10 print:break-inside-avoid">
      <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">
        Capstones
      </h2>
      {rows.length === 0 ? (
        <p className="text-sm text-slate-500 italic">No capstones started yet.</p>
      ) : (
        <ul className="space-y-2">
          {rows.map((c) => {
            const completed = doneSet.has(c.id);
            const mock = mockResults[c.id];
            return (
              <li
                key={c.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-3 rounded-lg border border-slate-200 bg-white"
              >
                <div className="min-w-0">
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                    {c.id} · {c.tier}
                  </p>
                  <p className="text-sm font-bold text-slate-900">{c.titleEnglish}</p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  {completed && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-black uppercase tracking-widest text-[10px]">
                      Completed
                    </span>
                  )}
                  {mock && (
                    <span className="text-slate-600">
                      Mock {mock.timedOut ? '(timed out)' : 'submitted'}
                      {mock.ai
                        ? ` · score ${mock.ai.score}/100`
                        : mock.selfCheck
                        ? ` · self-check on ${formatShortDate(mock.submittedAt)}`
                        : ''}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

const DeckMasterySection: React.FC<{ profile: StudentProfile }> = ({ profile }) => {
  const masteredSet = new Set(profile.flashcardsMastered || []);
  // Group every distinct card across DECKS by priority so totals match
  // `totalMustKnow()` and the rest of the app's flashcard surface area.
  const groups: Record<'must-know' | 'core' | 'bonus', { total: number; mastered: number }> = {
    'must-know': { total: 0, mastered: 0 },
    core: { total: 0, mastered: 0 },
    bonus: { total: 0, mastered: 0 },
  };
  const seen = new Set<string>();
  for (const deck of DECKS) {
    for (const card of deck.cards) {
      if (seen.has(card.id)) continue;
      seen.add(card.id);
      const g = groups[card.priority];
      g.total += 1;
      if (masteredSet.has(card.id)) g.mastered += 1;
    }
  }

  return (
    <section className="mb-10 print:break-inside-avoid">
      <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">
        Flashcard mastery
      </h2>
      <div className="space-y-3">
        {(['must-know', 'core', 'bonus'] as const).map((priority) => {
          const { total, mastered } = groups[priority];
          const pct = total === 0 ? 0 : Math.round((mastered / total) * 100);
          const barColor =
            priority === 'must-know'
              ? 'bg-orange-600'
              : priority === 'core'
              ? 'bg-indigo-600'
              : 'bg-slate-400';
          return (
            <div key={priority} data-testid={`deck-bar-${priority}`}>
              <div className="flex items-baseline justify-between text-xs mb-1">
                <span className="font-black uppercase tracking-widest text-slate-700">
                  {priority}
                </span>
                <span className="font-bold text-slate-600">
                  {mastered} / {total} mastered ({pct}%)
                </span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${barColor}`}
                  style={{ width: `${pct}%` }}
                  aria-label={`${priority} mastery ${pct}%`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const ActivitySection: React.FC<{ profile: StudentProfile; now: Date }> = ({ profile, now }) => {
  // Build the trailing-30-day window ending today. We render a 5×7 grid where
  // each cell is one day — saturated when the student had activity, faint
  // otherwise. Concise, prints in <1 inch.
  const dates = new Set(profile.activityDates || []);
  const days: { iso: string; active: boolean }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now.getTime());
    d.setDate(d.getDate() - i);
    const iso = localIsoDate(d);
    days.push({ iso, active: dates.has(iso) });
  }
  const activeCount = days.filter((d) => d.active).length;

  return (
    <section className="mb-10 print:break-inside-avoid">
      <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">
        Activity, last 30 days
      </h2>
      <div className="flex items-center gap-6 flex-wrap">
        <div className="grid grid-cols-15 gap-1" style={{ gridTemplateColumns: 'repeat(15, minmax(0, 1fr))', maxWidth: '20rem' }}>
          {days.map((d) => (
            <div
              key={d.iso}
              title={`${d.iso}${d.active ? ' — active' : ''}`}
              className={`w-4 h-4 rounded-sm border ${
                d.active
                  ? 'bg-orange-500 border-orange-600'
                  : 'bg-slate-100 border-slate-200'
              }`}
            />
          ))}
        </div>
        <div className="text-sm">
          <p className="font-black text-2xl text-slate-900">{activeCount}</p>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-black">
            active days / 30
          </p>
        </div>
      </div>
    </section>
  );
};

const RecentEvaluationsSection: React.FC<{ profile: StudentProfile }> = ({ profile }) => {
  // Flatten every AI evaluation across packs, sort by date desc, take top 3.
  const items: Array<{ packId: string; date: string; score: number; feedback: string; strengths: string[]; improve: string[] }> = [];
  const evals = profile.evaluations || {};
  for (const packId of Object.keys(evals)) {
    const list = evals[packId] || [];
    for (const e of list) {
      items.push({
        packId,
        date: e.date,
        score: e.score,
        feedback: e.feedback,
        strengths: e.identifiedStrengths || [],
        improve: e.areasToImprove || [],
      });
    }
  }
  items.sort((a, b) => (a.date < b.date ? 1 : -1));
  const recent = items.slice(0, 3);

  return (
    <section className="mb-10 print:break-inside-avoid">
      <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">
        Recent AI evaluations
      </h2>
      {recent.length === 0 ? (
        <p className="text-sm text-slate-500 italic">
          No AI evaluations recorded. (AI assessment is opt-in per profile.)
        </p>
      ) : (
        <ul className="space-y-3">
          {recent.map((e, i) => {
            const pack = getPack(e.packId);
            return (
              <li
                key={`${e.packId}-${i}`}
                className="px-4 py-3 rounded-lg border border-slate-200 bg-white print:break-inside-avoid"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-sm font-bold text-slate-900">
                    {pack ? pack.titleEnglish : e.packId}
                  </p>
                  <p className="text-xs text-slate-500">{formatShortDate(e.date)}</p>
                </div>
                <p className="text-xs font-black uppercase tracking-widest text-orange-600 mt-1">
                  Score {e.score}/100
                </p>
                <p className="text-sm text-slate-700 mt-2">{e.feedback}</p>
                {e.strengths.length > 0 && (
                  <p className="text-xs text-slate-600 mt-2">
                    <span className="font-black uppercase tracking-widest text-slate-500">
                      Strengths:
                    </span>{' '}
                    {e.strengths.join('; ')}
                  </p>
                )}
                {e.improve.length > 0 && (
                  <p className="text-xs text-slate-600 mt-1">
                    <span className="font-black uppercase tracking-widest text-slate-500">
                      Areas to improve:
                    </span>{' '}
                    {e.improve.join('; ')}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

const FooterMeta: React.FC<{ profile: StudentProfile; now: Date }> = ({ profile, now }) => {
  return (
    <footer className="pt-6 mt-6 border-t border-slate-200 text-[11px] text-slate-500">
      <p>
        Report generated {formatHumanDate(now)}. AI free-form analysis is omitted from this
        export by design — only numeric scores and short bulleted feedback are shown.
      </p>
      {profile.lastExportedAt && (
        <p>Previous export: {formatHumanDate(new Date(profile.lastExportedAt))}.</p>
      )}
    </footer>
  );
};

// ---------- small helpers ----------

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <dt className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</dt>
    <dd className="text-sm font-bold text-slate-900 mt-0.5">{children}</dd>
  </div>
);

const Stat: React.FC<{ label: string; value: string; testId?: string }> = ({
  label,
  value,
  testId,
}) => (
  <div
    data-testid={testId}
    className="px-4 py-4 rounded-2xl bg-white border border-slate-200 print:break-inside-avoid"
  >
    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
    <p className="text-2xl font-black text-slate-900 mt-1">{value}</p>
  </div>
);

function formatHumanDate(d: Date): string {
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatShortDate(input: string | undefined): string {
  if (!input) return '';
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return input;
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
