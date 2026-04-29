import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { TopicPack } from '../../content/schema';
import { BAND_META, bandForPack } from '../../types';
import { tokensFor } from '../ui/themeTokens';
import { Badge } from '../ui/Badge';
import { PackHeroArt } from '../art/PackHeroArt';

interface HeroBannerProps {
  pack: TopicPack;
  totalTopics?: number;
  onPrevPack?: () => void;
  onNextPack?: () => void;
  prevTitle?: string;
  nextTitle?: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  pack,
  totalTopics = 26,
  onPrevPack,
  onNextPack,
  prevTitle,
  nextTitle,
}) => {
  const tokens = tokensFor(pack.themeGroup);

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] text-white shadow-2xl print:shadow-none print:break-after-page">
      <div className="absolute inset-0">
        <PackHeroArt pack={pack} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-transparent" />

      <div className="relative z-10 p-12 md:p-16 min-h-[360px] flex flex-col justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge tone="amber" size="xs">
            {BAND_META[bandForPack(pack)].label} · {tokens.label}
          </Badge>
          <div className="inline-flex items-center gap-1 rounded-full bg-white/15 border border-white/20 backdrop-blur-sm no-print">
            <button
              type="button"
              onClick={onPrevPack}
              disabled={!onPrevPack}
              aria-label={prevTitle ? `Previous topic: ${prevTitle}` : 'No previous topic'}
              title={prevTitle ? `← ${prevTitle}` : undefined}
              className="w-7 h-7 flex items-center justify-center rounded-full text-white/90 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={14} strokeWidth={2.5} />
            </button>
            <span className="px-1 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
              Topic {pack.order} of {totalTopics}
            </span>
            <button
              type="button"
              onClick={onNextPack}
              disabled={!onNextPack}
              aria-label={nextTitle ? `Next topic: ${nextTitle}` : 'No next topic'}
              title={nextTitle ? `${nextTitle} →` : undefined}
              className="w-7 h-7 flex items-center justify-center rounded-full text-white/90 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={14} strokeWidth={2.5} />
            </button>
          </div>
          <Badge
            tone="slate"
            size="xs"
            className="!bg-white/15 !text-white !border-white/20 hidden print:inline-flex"
          >
            Topic {pack.order} of {totalTopics}
          </Badge>
          {pack.status !== 'shipped' && (
            <Badge tone="rose" size="xs" className="bg-rose-400/30 text-white border-white/30">
              Draft
            </Badge>
          )}
        </div>

        <div className="space-y-4 mt-10">
          <h1 className="font-hindi-display text-4xl md:text-6xl font-black tracking-tight leading-tight drop-shadow-sm">
            {pack.titleHindi}
          </h1>
          <p className="text-2xl md:text-4xl font-black tracking-tight leading-tight">
            {pack.titleEnglish}
          </p>
          <p className="text-lg md:text-xl font-medium italic text-white/90 max-w-2xl leading-relaxed">
            {pack.hook}
          </p>
        </div>
      </div>
    </div>
  );
};
