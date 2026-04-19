import React, { useMemo, useState } from 'react';
import { Sparkles, CheckCircle2, Circle, BookOpen, Info } from 'lucide-react';
import type { Level, TopicPack } from '../../content/schema';
import { TOPIC_PACKS_BY_LEVEL } from '../../content';
import {
  getStudyPlan,
  studyPlanForLevel,
  planItemSequence,
} from '../../content/studyPlans';
import { BAND_META, bandForPack, type Band } from '../../types';
import { tokensFor } from '../ui/themeTokens';
import { Badge } from '../ui/Badge';
import { Callout } from '../ui/Callout';
import { PackHeroArt } from '../art/PackHeroArt';
import { CURRICULUM } from '../../content/curriculum';

interface LibraryViewProps {
  completedIds: string[];
  studentLevel?: string;
  /**
   * Id of the study plan the student is currently on. If present, packs that
   * are NOT in this plan render with a subtle "not in your plan" tag (we
   * don't block them — Library is ungated in Phase A).
   */
  selectedStudyPlanId?: string;
  onOpenTopic: (pack: TopicPack) => void;
  onOpenHowThisWorks: () => void;
}

const bandOrder: Record<Level, number> = { 1: 0, 2: 1, 3: 2 };

const bandMetaByPackLevel: Record<Level, { title: string; subtitle: string; tone: string; band: Band }> = {
  1: {
    title: `${BAND_META.foundations.label} — ${CURRICULUM.creditMapping.issuer} Year 1`,
    subtitle: 'Words, phrases, and simple sentences on familiar topics. The groundwork every intermediate essay rests on.',
    tone: 'text-orange-700',
    band: 'foundations',
  },
  2: {
    title: `${BAND_META.intermediate.label} — ${CURRICULUM.creditMapping.issuer} Year 2`,
    subtitle: 'Connected sentences with past and future time frames. This is the band that earns the 3-credit award.',
    tone: 'text-emerald-700',
    band: 'intermediate',
  },
  3: {
    title: `${BAND_META.skilled.label} — honors stretch`,
    subtitle: 'Narrative and opinion register, complex discourse. Past the 3-credit gate; polishing for higher benchmarks.',
    tone: 'text-indigo-700',
    band: 'skilled',
  },
};

export const LibraryView: React.FC<LibraryViewProps> = ({
  completedIds,
  studentLevel,
  selectedStudyPlanId,
  onOpenTopic,
  onOpenHowThisWorks,
}) => {
  const [filter, setFilter] = useState<'all' | Level>('all');

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

  const levels: Level[] = (filter === 'all' ? ([1, 2, 3] as Level[]) : [filter]).sort(
    (a, b) => bandOrder[a] - bandOrder[b],
  );

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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
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
          <div className="flex gap-2">
            {(['all', 1, 2, 3] as const).map((f) => (
              <button
                key={String(f)}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition ${
                  filter === f
                    ? 'bg-amber-400 text-slate-900'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {f === 'all' ? 'All' : BAND_META[bandMetaByPackLevel[f].band].label}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden mt-6">
          <div
            className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full transition-all duration-1000"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </section>

      {levels.map((lvl) => {
        const meta = bandMetaByPackLevel[lvl];
        const packs = TOPIC_PACKS_BY_LEVEL[lvl];
        if (packs.length === 0) return null;
        return (
          <section key={lvl} className="space-y-6">
            <div>
              <p className={`text-xs font-black uppercase tracking-[0.3em] ${meta.tone} mb-1`}>
                {BAND_META[meta.band].label}
              </p>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{meta.title}</h2>
              <p className="text-slate-500 font-semibold italic">{meta.subtitle}</p>
            </div>
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
          </section>
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
          <div className="flex items-center justify-between">
            <Badge tone="amber" size="xs" className="!bg-white/20 !text-white !border-white/30">
              #{pack.order}
            </Badge>
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
