import React, { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { ProficiencyLevel } from '../../types';

export type SectionTier = 'foundation' | 'core' | 'stretch';

interface LevelLensProps {
  tier: SectionTier;
  level?: ProficiencyLevel;
  title: string;
  skimSummary?: string;
  children: React.ReactNode;
}

// A foundation section is auto-collapsed once the student is past Novice Mid;
// a stretch section is flagged as "recommended for you" once the student is
// Intermediate Low or higher. Printing always expands everything.
const PAST_NOVICE_MID = new Set<ProficiencyLevel>([
  ProficiencyLevel.NOVICE_HIGH,
  ProficiencyLevel.INTERMEDIATE_LOW,
  ProficiencyLevel.INTERMEDIATE_MID,
  ProficiencyLevel.INTERMEDIATE_HIGH,
]);

const INTERMEDIATE_PLUS = new Set<ProficiencyLevel>([
  ProficiencyLevel.INTERMEDIATE_LOW,
  ProficiencyLevel.INTERMEDIATE_MID,
  ProficiencyLevel.INTERMEDIATE_HIGH,
]);

export const LevelLens: React.FC<LevelLensProps> = ({ tier, level, title, skimSummary, children }) => {
  const shouldCollapse = tier === 'foundation' && level !== undefined && PAST_NOVICE_MID.has(level);
  const stretchHighlight = tier === 'stretch' && level !== undefined && INTERMEDIATE_PLUS.has(level);
  const [expanded, setExpanded] = useState(!shouldCollapse);

  // If the student's level changes, resync collapsed state on next toggle.
  // We deliberately don't reset via effect — the student may have opened it.

  if (shouldCollapse && !expanded) {
    return (
      <div data-section-tier={tier} className="print:block">
        <button
          onClick={() => setExpanded(true)}
          className="no-print w-full text-left group bg-slate-50 hover:bg-white border-2 border-dashed border-slate-200 hover:border-orange-300 rounded-3xl px-6 py-5 transition-all"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-1">
                Review · tap to expand
              </p>
              <p className="text-base font-black text-slate-700 truncate">{title}</p>
              {skimSummary && (
                <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-1">{skimSummary}</p>
              )}
            </div>
            <ChevronDown size={20} className="text-slate-400 group-hover:text-orange-500 shrink-0" />
          </div>
        </button>
        {/* Printable fallback: always render the full body when printing */}
        <div className="hidden print:block">{children}</div>
      </div>
    );
  }

  if (stretchHighlight) {
    return (
      <div data-section-tier={tier} className="relative">
        <div className="no-print absolute -top-3 left-6 z-10">
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-amber-200 shadow-sm">
            <Sparkles size={11} /> Recommended for you
          </span>
        </div>
        {children}
      </div>
    );
  }

  return <div data-section-tier={tier}>{children}</div>;
};
