import React, { useState } from 'react';
import { CheckCircle2, Clock, Flag, Star, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { CAPSTONES, CAPSTONES_BY_TIER } from '../../content/capstones';
import { capstonesKnownAtLevel } from '../../content/studyPlans';
import type { Capstone } from '../../content/schema';
import { tokensFor } from '../ui/themeTokens';
import { Badge } from '../ui/Badge';
import { CapstoneHeroArt } from '../art/CapstoneHeroArt';
import { CURRICULUM } from '../../content/curriculum';

interface CapstonesLibraryViewProps {
  completedIds: string[];
  studentLevel?: string;
  onOpenCapstone: (capstoneId: string) => void;
}

export const CapstonesLibraryView: React.FC<CapstonesLibraryViewProps> = ({
  completedIds,
  studentLevel,
  onOpenCapstone,
}) => {
  const [showKnown, setShowKnown] = useState(false);
  const knownSet = new Set(capstonesKnownAtLevel(studentLevel));
  const completedSet = new Set(completedIds);
  const hiddenCount = knownSet.size;
  const total = CAPSTONES.length - hiddenCount;
  const done = CAPSTONES.filter((c) => completedSet.has(c.id) && !knownSet.has(c.id)).length;

  const filterKnown = (list: Capstone[]) =>
    showKnown ? list : list.filter((c) => !knownSet.has(c.id));

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <header className="space-y-3">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
          Capstones
        </p>
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight">
          Cross-topic essays
        </h1>
        <p className="text-slate-600 italic max-w-3xl text-lg leading-relaxed">
          Ten multi-paragraph essays that cement what the topic packs taught. Each capstone draws from 3–5 packs and exists in three length tiers - Novice, Intermediate-Mid, and Push - so you can see your own ceiling rise.
        </p>
      </header>

      <div className="bg-gradient-to-r from-orange-600 to-amber-500 text-white rounded-[2rem] p-6 md:p-8 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Progress</p>
          <p className="text-3xl font-black">
            {done} of {total} capstones complete
          </p>
        </div>
        <div className="w-full md:w-64 bg-white/20 h-3 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-1000"
            style={{ width: `${total ? (done / total) * 100 : 0}%` }}
          />
        </div>
      </div>

      {hiddenCount > 0 && (
        <div className="flex items-center justify-between gap-4 bg-emerald-50 border-2 border-emerald-100 rounded-2xl px-5 py-4">
          <div className="flex items-start gap-3 min-w-0">
            <CheckCircle2 size={20} className="text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-black text-emerald-900">
                {hiddenCount} {hiddenCount === 1 ? 'capstone is' : 'capstones are'} hidden - at or below your level
              </p>
              <p className="text-xs text-emerald-700 font-medium italic">
                Based on {studentLevel || 'your level'}. Push-tier capstones always show.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowKnown((v) => !v)}
            className="shrink-0 flex items-center gap-2 px-4 py-2 bg-white border-2 border-emerald-200 hover:border-emerald-400 rounded-xl font-black text-xs uppercase tracking-widest text-emerald-800 transition-colors"
          >
            {showKnown ? <EyeOff size={14} /> : <Eye size={14} />}
            {showKnown ? 'Hide again' : 'Show anyway'}
          </button>
        </div>
      )}

      <TierGroup
        label="Core tier"
        subtitle={`${CURRICULUM.displayStrings.targetPhrase} target · 220–280 words · earn your ${CURRICULUM.displayStrings.creditPhrase}`}
        icon={<Flag size={20} />}
        capstones={filterKnown(CAPSTONES_BY_TIER.core)}
        completedSet={completedSet}
        knownSet={knownSet}
        onOpenCapstone={onOpenCapstone}
      />

      <TierGroup
        label="Push tier"
        subtitle="Reaching Benchmark 6 · 280–340 words · polish above the pass bar"
        icon={<Star size={20} />}
        capstones={CAPSTONES_BY_TIER.push}
        completedSet={completedSet}
        knownSet={knownSet}
        onOpenCapstone={onOpenCapstone}
      />
    </div>
  );
};

const TierGroup: React.FC<{
  label: string;
  subtitle: string;
  icon: React.ReactNode;
  capstones: Capstone[];
  completedSet: Set<string>;
  knownSet: Set<string>;
  onOpenCapstone: (id: string) => void;
}> = ({ label, subtitle, icon, capstones, completedSet, knownSet, onOpenCapstone }) => (
  <section className="space-y-5">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">{label}</p>
        <p className="text-sm text-slate-500 italic">{subtitle}</p>
      </div>
    </div>

    {capstones.length === 0 ? (
      <p className="text-slate-400 italic text-sm">No capstones authored yet in this tier.</p>
    ) : (
      <div className="grid md:grid-cols-2 gap-5">
        {capstones.map((c) => (
          <CapstoneCard
            key={c.id}
            capstone={c}
            done={completedSet.has(c.id)}
            known={knownSet.has(c.id)}
            onClick={() => onOpenCapstone(c.id)}
          />
        ))}
      </div>
    )}
  </section>
);

const CapstoneCard: React.FC<{ capstone: Capstone; done: boolean; known?: boolean; onClick: () => void }> = ({
  capstone,
  done,
  known,
  onClick,
}) => {
  const tokens = tokensFor(capstone.themeGroup);
  return (
    <button
      onClick={onClick}
      className={`group text-left bg-white rounded-[2rem] border-2 shadow-sm hover:shadow-xl overflow-hidden transition-all hover:-translate-y-1 ${
        known ? 'border-emerald-200 opacity-75 hover:opacity-100' : 'border-slate-100 hover:border-orange-400'
      }`}
    >
      <div className="aspect-[3/1] relative">
        <CapstoneHeroArt capstone={capstone} />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-transparent" />
        <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
          <Badge tone="amber" size="xs" className="bg-white text-orange-700 border-white">
            C{String(capstone.order).padStart(2, '0')}
          </Badge>
          {capstone.isMockExam && (
            <Badge tone="rose" size="xs" className="bg-rose-400/80 text-white border-transparent">
              <Clock size={10} className="inline mr-0.5" /> Mock
            </Badge>
          )}
        </div>
        {done && (
          <div className="absolute top-4 right-4 w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg">
            <CheckCircle2 size={22} strokeWidth={3} />
          </div>
        )}
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <p className="font-hindi-display text-2xl font-black drop-shadow">{capstone.titleHindi}</p>
        </div>
      </div>

      <div className="p-6 space-y-2">
        <Badge tone="orange" size="xs">
          {tokens.label} · {capstone.tier === 'push' ? 'Push' : 'Core'}
        </Badge>
        <h3 className="text-xl font-black text-slate-900 group-hover:text-orange-600 transition-colors">
          {capstone.titleEnglish}
        </h3>
        <p className="text-sm text-slate-500 italic leading-relaxed">{capstone.hook}</p>
        <div className="flex items-center justify-between pt-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Draws from {capstone.draws.length} packs
          </p>
          <ArrowRight size={18} className="text-slate-400 group-hover:text-orange-600" />
        </div>
      </div>
    </button>
  );
};
