import React, { useMemo, useState } from 'react';
import { Sparkles, CheckCircle2, Circle, BookOpen, Info, ChevronDown } from 'lucide-react';
import type { Level, TopicPack } from '../../content/schema';
import { TOPIC_THEME_META } from '../../content/schema';
import { TOPIC_PACKS_BY_LEVEL } from '../../content';
import {
  getStudyPlan,
  studyPlanForLevel,
  planItemSequence,
} from '../../content/studyPlans';
import {
  BAND_META,
  BAND_ORDER,
  bandForPack,
  bandFromProficiency,
  type Band,
  type ProficiencyLevel,
} from '../../types';
import { tokensFor } from '../ui/themeTokens';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { Badge } from '../ui/Badge';
import { Callout } from '../ui/Callout';
import { PackHeroArt } from '../art/PackHeroArt';
import { CURRICULUM } from '../../content/curriculum';

// -----------------------------------------------------------------------------
// LibraryView — 3-band collapsible catalog.
//
// Phase B rebuild. Previously a flat grid with Level filter pills; now three
// stacked sections (Foundations / Intermediate / Skilled). The student's
// current band is pre-expanded and highlighted with a "Your level" pill;
// other bands are collapsed, count visible, one click to expand.
//
// The per-card theme chip (TOPIC_THEME_META) is the Phase B breadcrumb
// between a pack and its cross-level siblings — see ThemeSiblingStrip on
// the pack page for the matching "in this theme" row.
// -----------------------------------------------------------------------------

interface LibraryViewProps {
  completedIds: string[];
  /** Legacy 6-value proficiency. Used as fallback when `currentBand` is
   *  missing from the profile (which it won't be post-onboarding, but
   *  keeping the fallback keeps test storyboards + legacy state running). */
  studentLevel?: string;
  /** Coarse band from the profile. Drives the "Your level" highlight + the
   *  default-open collapsible. Optional so the component still renders in
   *  non-profile contexts (tests, storyboards). */
  currentBand?: Band;
  /**
   * Id of the study plan the student is currently on. If present, packs that
   * are NOT in this plan render with a subtle "not in your plan" tag (we
   * don't block them — Library is ungated in Phase A).
   */
  selectedStudyPlanId?: string;
  onOpenTopic: (pack: TopicPack) => void;
  onOpenHowThisWorks: () => void;
}

interface BandSectionMeta {
  level: Level;
  title: string;
  subtitle: string;
  tone: string;
}

const BAND_SECTIONS: Record<Band, BandSectionMeta> = {
  foundations: {
    level: 1,
    title: `${BAND_META.foundations.label} — ${CURRICULUM.creditMapping.issuer} Year 1`,
    subtitle:
      'Words, phrases, and simple sentences on familiar topics. The groundwork every intermediate essay rests on.',
    tone: 'text-orange-700',
  },
  intermediate: {
    level: 2,
    title: `${BAND_META.intermediate.label} — ${CURRICULUM.creditMapping.issuer} Year 2`,
    subtitle:
      'Connected sentences with past and future time frames. This is the band that earns the 3-credit award.',
    tone: 'text-emerald-700',
  },
  skilled: {
    level: 3,
    title: `${BAND_META.skilled.label} — honors stretch`,
    subtitle:
      'Narrative and opinion register, complex discourse. Past the 3-credit gate; polishing for higher benchmarks.',
    tone: 'text-indigo-700',
  },
};

/** Guess the student's band from their 6-value proficiency string, only used
 *  as a fallback when `currentBand` wasn't passed. */
function bandFromLegacyLevelString(level: string | undefined): Band {
  if (!level) return 'foundations';
  return bandFromProficiency(level as ProficiencyLevel);
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  completedIds,
  studentLevel,
  currentBand,
  selectedStudyPlanId,
  onOpenTopic,
  onOpenHowThisWorks,
}) => {
  const activeBand: Band = currentBand ?? bandFromLegacyLevelString(studentLevel);

  // Which packs are referenced by the student's current plan? Packs outside
  // this set get a "not in your plan" tag (but stay visible — Library is
  // ungated in Phase A).
  const inPlanPackIds = useMemo(() => {
    const plan =
      getStudyPlan(selectedStudyPlanId) ||
      (studentLevel ? studyPlanForLevel(studentLevel) : undefined);
    if (!plan) return new Set<string>();
    return new Set(
      planItemSequence(plan)
        .filter((it) => it.kind === 'pack')
        .map((it) => it.id),
    );
  }, [selectedStudyPlanId, studentLevel]);

  // Per-band open state. Default: student's band open, others collapsed.
  // Session-only — deliberately not persisted.
  const [openState, setOpenState] = useState<Record<Band, boolean>>(() => ({
    foundations: activeBand === 'foundations',
    intermediate: activeBand === 'intermediate',
    skilled: activeBand === 'skilled',
  }));

  const setBandOpen = (band: Band, open: boolean) =>
    setOpenState((s) => ({ ...s, [band]: open }));

  const totalPacks =
    TOPIC_PACKS_BY_LEVEL[1].length +
    TOPIC_PACKS_BY_LEVEL[2].length +
    TOPIC_PACKS_BY_LEVEL[3].length;
  const completedCount = completedIds.length;
  const progressPct = totalPacks ? Math.round((completedCount / totalPacks) * 100) : 0;

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">
            The Sankalp Library
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight">
            26 reading packs → {CURRICULUM.displayStrings.creditPhrase}
          </h1>
          <p className="text-slate-500 font-semibold text-lg mt-3 max-w-2xl">
            Every pack explains its place in the exam, its rubric alignment, and shows
            model essays at passing level.
          </p>
        </div>
        <button
          onClick={onOpenHowThisWorks}
          className="flex items-center gap-3 px-5 py-3 bg-indigo-50 text-indigo-700 border-2 border-indigo-100 rounded-2xl font-black text-sm hover:bg-indigo-100 transition-colors shrink-0"
        >
          <Info size={18} /> How this works
        </button>
      </header>

      <Callout kind="goal" title={`What earns ${CURRICULUM.creditMapping.credits} credits`}>
        <p>
          {CURRICULUM.creditMapping.issuer} awards <strong>{CURRICULUM.creditMapping.credits} World Language credits</strong> when a student scores{' '}
          <strong>{BAND_META.intermediate.label} ({CURRICULUM.examSystem.shortName} {CURRICULUM.displayStrings.targetPhrase})</strong> on the Writing and Speaking
          sections. Target: connected paragraphs in past, present, and future tenses. Every
          pack in this library is designed against that target.
        </p>
      </Callout>

      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-[2rem] p-8 md:p-10 shadow-2xl">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-amber-300 mb-1">
            Library progress
          </p>
          <p className="text-4xl md:text-5xl font-black">
            {completedCount} of {totalPacks} packs completed
          </p>
          <p className="text-sm text-slate-300 font-semibold italic mt-1">
            {progressPct}% toward full exam coverage · all 26 packs are open to you
          </p>
        </div>
        <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden mt-6">
          <div
            className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full transition-all duration-1000"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </section>

      {BAND_ORDER.map((band) => {
        const meta = BAND_SECTIONS[band];
        const packs = TOPIC_PACKS_BY_LEVEL[meta.level];
        const isActive = band === activeBand;
        const isOpen = openState[band];
        const completedInBand = packs.filter((p) => completedIds.includes(p.id)).length;
        return (
          <Collapsible
            key={band}
            open={isOpen}
            onOpenChange={(next) => setBandOpen(band, next)}
            asChild
          >
            <section
              aria-label={`${BAND_META[band].label} band`}
              className={`rounded-[2rem] border-2 transition-colors ${
                isActive
                  ? 'border-amber-300 bg-amber-50/40 shadow-md'
                  : 'border-slate-100 bg-white'
              }`}
            >
              <CollapsibleTrigger asChild>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  className="w-full text-left p-6 md:p-7 flex items-start gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 rounded-[2rem] group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className={`text-xs font-black uppercase tracking-[0.3em] ${meta.tone}`}>
                        {BAND_META[band].label} · {BAND_META[band].stampRange}
                      </p>
                      {isActive && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400 text-slate-900 text-[10px] font-black uppercase tracking-widest">
                          Your level
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest">
                        {completedInBand}/{packs.length} complete
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                      {meta.title}
                    </h2>
                    <p className="text-slate-500 font-semibold italic text-sm md:text-base">
                      {BAND_META[band].description}
                    </p>
                    <p className="text-slate-400 text-xs md:text-sm mt-1">{meta.subtitle}</p>
                  </div>
                  <ChevronDown
                    aria-hidden
                    size={22}
                    className={`shrink-0 mt-2 text-slate-500 transition-transform duration-200 group-hover:text-slate-900 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="overflow-hidden">
                <div className="px-6 md:px-7 pb-7 pt-1">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {packs.map((pack) => (
                      <TopicCard
                        key={pack.id}
                        pack={pack}
                        completed={completedIds.includes(pack.id)}
                        outOfPlan={inPlanPackIds.size > 0 && !inPlanPackIds.has(pack.id)}
                        onClick={() => onOpenTopic(pack)}
                      />
                    ))}
                  </div>
                </div>
              </CollapsibleContent>
            </section>
          </Collapsible>
        );
      })}
    </div>
  );
};

interface TopicCardProps {
  pack: TopicPack;
  completed: boolean;
  outOfPlan?: boolean;
  onClick: () => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ pack, completed, outOfPlan, onClick }) => {
  const tokens = tokensFor(pack.themeGroup);
  const band = bandForPack(pack.level);
  const themeMeta = TOPIC_THEME_META[pack.topicTheme];
  return (
    <button
      onClick={onClick}
      aria-label={`Open pack: ${pack.titleEnglish}${outOfPlan ? ' (not in your current plan)' : ''}`}
      className={`group text-left bg-white border-2 rounded-[1.75rem] overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 ${
        outOfPlan ? 'border-slate-100 opacity-80 hover:opacity-100' : 'border-slate-100 hover:border-orange-400'
      }`}
    >
      <div className="aspect-[2/1] relative overflow-hidden">
        <PackHeroArt pack={pack} />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-transparent" />
        <div className="relative z-10 h-full p-5 flex flex-col justify-between text-white">
          <div className="flex items-center justify-between gap-2">
            <Badge tone="amber" size="xs" className="!bg-white/20 !text-white !border-white/30">
              #{pack.order}
            </Badge>
            <span
              className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm text-[10px] font-black uppercase tracking-widest"
              title={`Theme: ${themeMeta.label}`}
            >
              <span aria-hidden>{themeMeta.emoji}</span>
              <span className="hidden sm:inline">{themeMeta.label}</span>
            </span>
            {completed ? (
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <CheckCircle2 size={20} className="text-emerald-300" />
              </div>
            ) : (
              <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Circle size={20} className="text-white/60" />
              </div>
            )}
          </div>
          <p className="font-hindi-display text-2xl font-black leading-tight drop-shadow">
            {pack.titleHindi}
          </p>
        </div>
      </div>
      <div className="p-5 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-black text-slate-900 text-lg leading-snug group-hover:text-orange-700 transition-colors">
            {pack.titleEnglish}
          </h3>
          {outOfPlan && (
            <span className="shrink-0 text-[9px] font-black uppercase tracking-widest text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
              Not in plan
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 italic leading-relaxed line-clamp-2">{pack.hook}</p>
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 pt-2">
          <BookOpen size={12} />
          <span>{BAND_META[band].label}</span>
          <span className="mx-1">·</span>
          <span>{tokens.label}</span>
          <span className="mx-1">·</span>
          <Sparkles size={12} />
          <span>{pack.status === 'shipped' ? 'Ready' : pack.status === 'drafted' ? 'Drafted' : pack.status === 'reviewed' ? 'Reviewed' : 'Stub'}</span>
        </div>
      </div>
    </button>
  );
};
