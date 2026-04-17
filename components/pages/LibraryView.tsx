import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Circle, BookOpen, Info } from 'lucide-react';
import type { Level, TopicPack } from '../../content/schema';
import { TOPIC_PACKS_BY_LEVEL } from '../../content';
import { tokensFor } from '../ui/themeTokens';
import { Badge } from '../ui/Badge';
import { Callout } from '../ui/Callout';
import { PackHeroArt } from '../art/PackHeroArt';

interface LibraryViewProps {
  completedIds: string[];
  onOpenTopic: (pack: TopicPack) => void;
  onOpenHowThisWorks: () => void;
}

const levelMeta: Record<Level, { title: string; subtitle: string; tone: string }> = {
  1: { title: 'Level 1 — Foundations', subtitle: 'FCPS Year 1 topics. Get comfortable producing simple sentences.', tone: 'text-orange-700' },
  2: { title: 'Level 2 — Building Paragraphs', subtitle: 'FCPS Year 2 topics. Shift into connected paragraphs and time frames.', tone: 'text-emerald-700' },
  3: { title: 'Level 3 — Pushing to Intermediate-Mid', subtitle: 'The stretch topics that lift a 2-credit essay to 3 credits.', tone: 'text-indigo-700' },
};

export const LibraryView: React.FC<LibraryViewProps> = ({
  completedIds,
  onOpenTopic,
  onOpenHowThisWorks,
}) => {
  const [filter, setFilter] = useState<'all' | 1 | 2 | 3>('all');

  const levels: Level[] = filter === 'all' ? [1, 2, 3] : [filter];

  const totalPacks = TOPIC_PACKS_BY_LEVEL[1].length + TOPIC_PACKS_BY_LEVEL[2].length + TOPIC_PACKS_BY_LEVEL[3].length;
  const completedCount = completedIds.length;

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">
            The Sankalp Library
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight">
            26 reading packs → 3 FCPS credits
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

      <Callout kind="goal" title="What earns 3 credits">
        <p>
          FCPS awards <strong>3 World Language credits</strong> when a student scores{' '}
          <strong>Intermediate-Mid (STAMP Benchmark 5)</strong> on the Writing and Speaking
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
              {Math.round((completedCount / totalPacks) * 100)}% toward full exam coverage
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
                {f === 'all' ? 'All' : `Level ${f}`}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden mt-6">
          <div
            className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full transition-all duration-1000"
            style={{ width: `${(completedCount / totalPacks) * 100}%` }}
          />
        </div>
      </section>

      {levels.map((lvl) => {
        const meta = levelMeta[lvl];
        const packs = TOPIC_PACKS_BY_LEVEL[lvl];
        return (
          <section key={lvl} className="space-y-6">
            <div>
              <p className={`text-xs font-black uppercase tracking-[0.3em] ${meta.tone} mb-1`}>
                Level {lvl}
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
  onClick: () => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ pack, completed, onClick }) => {
  const tokens = tokensFor(pack.themeGroup);
  return (
    <button
      onClick={onClick}
      className="group text-left bg-white border-2 border-slate-100 hover:border-orange-400 rounded-[1.75rem] overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-0.5"
    >
      <div className="aspect-[2/1] relative overflow-hidden">
        <PackHeroArt pack={pack} />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-transparent" />
        <div className="relative z-10 h-full p-5 flex flex-col justify-between text-white">
          <div className="flex items-center justify-between">
            <Badge tone="amber" size="xs" className="bg-white/20 text-white border-white/30">
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
        <h3 className="font-black text-slate-900 text-lg leading-snug group-hover:text-orange-700 transition-colors">
          {pack.titleEnglish}
        </h3>
        <p className="text-xs text-slate-500 italic leading-relaxed line-clamp-2">{pack.hook}</p>
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 pt-2">
          <BookOpen size={12} />
          <span>{tokens.label}</span>
          <span className="mx-1">·</span>
          <Sparkles size={12} />
          <span>{pack.status === 'shipped' ? 'Ready' : pack.status === 'drafted' ? 'Drafted' : pack.status === 'reviewed' ? 'Reviewed' : 'Stub'}</span>
        </div>
      </div>
    </button>
  );
};
