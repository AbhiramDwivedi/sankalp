import React from 'react';

// -----------------------------------------------------------------------------
// OverlayProgress - the thin progress strip that sits at the top of every
// full-screen overlay (pack / capstone / deck). Gives the student a sense of
// "where am I in the plan" without requiring them to return to the dashboard.
//
// Three labels:
//   - position    : e.g. "Pack 7 of 26"  -or-  "Capstone 2 of 10"  -or-  "Deck"
//   - planName    : plan title for context (e.g. "Foundation plan")
//   - percent     : 0..100 overall plan completion
//
// The component is hidden in print.
// -----------------------------------------------------------------------------

interface OverlayProgressProps {
  /** Human phrase for the counting context, e.g. "Pack 7 of 26". */
  position: string;
  /** Plan title for context, e.g. "Foundation plan". */
  planName?: string;
  /** Percent completion of the plan, rounded integer 0..100. */
  percent: number;
}

export const OverlayProgress: React.FC<OverlayProgressProps> = ({ position, planName, percent }) => {
  const pct = Math.max(0, Math.min(100, Math.round(percent)));

  return (
    <div
      className="no-print flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-100"
      aria-label="Plan progress"
    >
      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-600">
        {position}
      </span>
      {planName && (
        <>
          <span className="text-slate-500" aria-hidden="true">•</span>
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-600">
            {planName}
          </span>
        </>
      )}
      <div className="flex-1 min-w-[120px] flex items-center gap-3">
        <div
          className="flex-1 h-1.5 rounded-full bg-slate-200 overflow-hidden"
          role="progressbar"
          aria-label={`${position}: ${pct}% complete`}
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-600">
          {pct}% complete
        </span>
      </div>
    </div>
  );
};
