import React from 'react';
import { CheckCircle2, Flame, Target, ArrowRight, BookOpen } from 'lucide-react';
import type { StudentProfile } from '../../types';
import type { TopicPack } from '../../content/schema';
import { TOPIC_PACKS, nextPackAfter, getPack } from '../../content';
import { TARGET_BENCHMARK, FCPS_CREDIT_SUMMARY, RUBRIC_AXES } from '../../content/rubric';
import { tokensFor } from '../ui/themeTokens';
import { Badge } from '../ui/Badge';

interface DashboardViewProps {
  profile: StudentProfile;
  onOpenTopic: (pack: TopicPack) => void;
  onOpenLibrary: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  onOpenTopic,
  onOpenLibrary,
}) => {
  const completed = profile.completedTopicIds || [];
  const total = TOPIC_PACKS.length;
  const pct = total ? Math.round((completed.length / total) * 100) : 0;

  // Pick the next pack to work on: either the in-progress one, or the pack
  // immediately after the last completed one, or the very first.
  let nextPack: TopicPack | undefined;
  if (profile.inProgressTopicId) {
    nextPack = getPack(profile.inProgressTopicId);
  }
  if (!nextPack && completed.length) {
    const last = completed[completed.length - 1];
    nextPack = nextPackAfter(last) || undefined;
  }
  if (!nextPack) nextPack = TOPIC_PACKS[0];

  // Readiness heuristic: weight packs by level.
  const weights = { 1: 1, 2: 1.5, 3: 2 } as const;
  const earned = completed.reduce((s, id) => {
    const p = getPack(id);
    return s + (p ? weights[p.level] : 0);
  }, 0);
  const possible = TOPIC_PACKS.reduce((s, p) => s + weights[p.level], 0);
  const readiness = Math.round((earned / possible) * 100);

  const readinessLabel =
    readiness < 25
      ? 'Early — keep building L1 foundations.'
      : readiness < 50
      ? 'On track — solid Novice High output emerging.'
      : readiness < 75
      ? 'Nearing Intermediate-Low — 2 credits realistic.'
      : 'Approaching Intermediate-Mid — 3 credits within reach.';

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">
            Dashboard
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight">
            नमस्ते, {profile.name}
          </h1>
          <p className="text-slate-500 font-semibold text-lg italic mt-2">
            {profile.currentLevel} · Target: Intermediate-Mid (3 credits)
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white border-2 border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
              <Flame size={18} />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Completed</p>
              <p className="text-xl font-black text-slate-900">{completed.length} / {total}</p>
            </div>
          </div>
          <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl p-4 text-white flex items-center gap-3 shadow-xl">
            <div className="w-10 h-10 bg-white/10 text-amber-300 rounded-xl flex items-center justify-center">
              <Target size={18} />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest opacity-60">Readiness</p>
              <p className="text-xl font-black">{readiness}%</p>
            </div>
          </div>
        </div>
      </header>

      {/* Progress */}
      <section className="bg-white border-2 border-slate-100 rounded-[2rem] p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">
              Library progress
            </p>
            <p className="text-3xl font-black text-slate-900">{pct}% of library read</p>
            <p className="text-sm text-slate-500 italic mt-1">{readinessLabel}</p>
          </div>
          <button
            onClick={onOpenLibrary}
            className="text-sm font-black text-orange-600 hover:text-orange-800 flex items-center gap-2"
          >
            Open library <ArrowRight size={16} />
          </button>
        </div>
        <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full transition-all duration-1000"
            style={{ width: `${pct}%` }}
          />
        </div>
      </section>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Next pack */}
        <div className="lg:col-span-2">
          <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
            Next pack
          </p>
          {nextPack && <NextPackCard pack={nextPack} onClick={() => onOpenTopic(nextPack)} />}
        </div>

        {/* Rubric at a glance */}
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
            Rubric at a glance
          </p>
          <div className="bg-slate-900 text-white rounded-[2rem] p-6 space-y-4 shadow-xl">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-amber-300">
                Target benchmark
              </p>
              <p className="text-3xl font-black">
                {TARGET_BENCHMARK} <span className="text-amber-300 text-lg font-bold">Intermediate Mid</span>
              </p>
              <p className="text-xs text-slate-400 italic mt-1">
                {FCPS_CREDIT_SUMMARY.find((c) => c.credits === 3)?.description}
              </p>
            </div>
            <div className="pt-4 border-t border-slate-700 space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1">
                What gets scored
              </p>
              {RUBRIC_AXES.map((ax) => (
                <div key={ax.id} className="flex items-start gap-2 text-sm">
                  <Badge tone="slate" size="xs" className="bg-white/10 text-white border-white/20 shrink-0">
                    {ax.id.substring(0, 2)}
                  </Badge>
                  <div>
                    <p className="font-black text-white">{ax.name}</p>
                    <p className="text-xs text-slate-300 italic leading-snug">{ax.oneLiner}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NextPackCard: React.FC<{ pack: TopicPack; onClick: () => void }> = ({ pack, onClick }) => {
  const tokens = tokensFor(pack.themeGroup);
  const [imageOk, setImageOk] = React.useState(true);
  return (
    <button
      onClick={onClick}
      className="group w-full text-left bg-white border-2 border-slate-100 hover:border-orange-400 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all"
    >
      <div className={`aspect-[3/1] ${tokens.heroGradient} relative overflow-hidden`}>
        {imageOk && (
          <img
            src={`/topics/hero-${pack.id}.jpg`}
            alt=""
            aria-hidden
            onError={() => setImageOk(false)}
            className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-luminosity"
          />
        )}
        <div className={`absolute inset-0 ${tokens.heroGradient} opacity-80 mix-blend-multiply`} />
        <div className="relative z-10 h-full p-6 flex items-end text-white">
          <p className="font-hindi-display text-3xl font-black drop-shadow">{pack.titleHindi}</p>
        </div>
      </div>
      <div className="p-6 flex items-center justify-between gap-4">
        <div className="flex-1 space-y-1">
          <Badge tone="orange" size="xs">Level {pack.level} · {tokens.label}</Badge>
          <h3 className="text-2xl font-black text-slate-900 group-hover:text-orange-600 transition-colors">
            {pack.titleEnglish}
          </h3>
          <p className="text-sm text-slate-500 italic leading-relaxed">{pack.hook}</p>
        </div>
        <div className="w-14 h-14 bg-slate-100 group-hover:bg-orange-600 group-hover:text-white text-slate-400 rounded-2xl flex items-center justify-center transition-colors shrink-0">
          <ArrowRight size={24} />
        </div>
      </div>
    </button>
  );
};
