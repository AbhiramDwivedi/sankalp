import React from 'react';
import { ArrowRight, SkipForward, CheckCircle2 } from 'lucide-react';
import { DevanagariText } from './DevanagariText';

// -----------------------------------------------------------------------------
// NextUpCard - the bottom-of-overlay "continue the plan" card.
//
// Appears at the bottom of every full-screen overlay (TopicPackView,
// CapstoneView, DeckRunner). Reads the active plan via the caller and
// surfaces the next item in plan order with a one-line contextual blurb.
//
// Keyboard: `N` inside the overlay triggers the Continue CTA. Handlers are
// wired by the parent overlay, not here (so each overlay can scope the
// listener to its own lifecycle).
// -----------------------------------------------------------------------------

export interface NextUpCardProps {
  /** Label describing what the student just finished (e.g. "Finished: Greetings"). */
  finishedLabel: string;
  /** Plan-order next item's title (e.g. "Family" or "Capstone: festival weekend"). */
  nextTitle?: string;
  /** Optional Hindi title rendered above the English. */
  nextTitleHindi?: string;
  /** One-line blurb explaining why this is next (context-aware). */
  nextReason?: string;
  /** Marker tag — e.g. "Pack", "Capstone", "Mock exam". */
  nextKindLabel?: string;
  /** Fires when student clicks Continue or presses `N`. Null = disabled. */
  onContinue: (() => void) | null;
  /** Fires when student clicks "Skip for now". Adds current item to deferredIds. */
  onSkip?: () => void;
  /** Shown when planCursor reports the plan is complete. */
  isAllDone?: boolean;
}

export const NextUpCard: React.FC<NextUpCardProps> = ({
  finishedLabel,
  nextTitle,
  nextTitleHindi,
  nextReason,
  nextKindLabel,
  onContinue,
  onSkip,
  isAllDone,
}) => {
  if (isAllDone) {
    return (
      <section
        className="no-print mt-10 rounded-[2rem] border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-white p-8 md:p-10 shadow-sm"
        aria-label="Plan complete"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-100">
            <CheckCircle2 size={22} strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-700 mb-1">
              {finishedLabel}
            </p>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-tight">
              You have reached the end of your plan.
            </h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Switch to the Rubric or Flashcards tab to polish, or revisit any pack or capstone from the Library.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!onContinue || !nextTitle) {
    return null;
  }

  return (
    <section
      className="no-print mt-10 rounded-[2rem] border-2 border-orange-200 bg-gradient-to-br from-orange-50 via-amber-50/50 to-white p-8 md:p-10 shadow-sm"
      aria-label="Next in your plan"
    >
      <div className="flex flex-col md:flex-row md:items-stretch gap-6">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-orange-100">
            <ArrowRight size={22} strokeWidth={2.5} />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-700">
                {finishedLabel}
              </p>
              {nextKindLabel && (
                <>
                  <span className="text-orange-300">·</span>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                    Next: {nextKindLabel}
                  </p>
                </>
              )}
            </div>
            <div>
              {nextTitleHindi && (
                <DevanagariText
                  as="p"
                  size="sm"
                  weight="bold"
                  className="text-slate-500 leading-tight"
                >
                  {nextTitleHindi}
                </DevanagariText>
              )}
              <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                {nextTitle}
              </h3>
            </div>
            {nextReason && (
              <p className="text-sm text-slate-700 leading-relaxed max-w-2xl">{nextReason}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 md:items-end md:justify-center md:min-w-[200px]">
          <button
            type="button"
            onClick={onContinue}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-orange-600 text-white font-black text-sm uppercase tracking-widest shadow-lg shadow-orange-200 hover:bg-orange-700"
          >
            Continue <ArrowRight size={16} />
          </button>
          {onSkip && (
            <button
              type="button"
              onClick={onSkip}
              className="flex items-center justify-center gap-2 px-6 py-2 rounded-2xl bg-transparent text-slate-500 hover:text-slate-900 font-black text-xs uppercase tracking-widest"
            >
              <SkipForward size={14} /> Skip for now
            </button>
          )}
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
            Press <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700">N</kbd> to continue
          </p>
        </div>
      </div>
    </section>
  );
};
