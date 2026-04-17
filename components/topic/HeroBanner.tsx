import React, { useState } from 'react';
import type { TopicPack } from '../../content/schema';
import { tokensFor } from '../ui/themeTokens';
import { RangoliCorner } from '../ui/RangoliCorner';
import { Badge } from '../ui/Badge';

interface HeroBannerProps {
  pack: TopicPack;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ pack }) => {
  const tokens = tokensFor(pack.themeGroup);
  const [imageOk, setImageOk] = useState(true);
  const heroSrc = `/topics/hero-${pack.id}.jpg`;

  return (
    <div
      className={`relative overflow-hidden rounded-[2.5rem] text-white shadow-2xl print:shadow-none print:break-after-page ${tokens.heroGradient}`}
    >
      {/* Background image (fades into the gradient) */}
      {imageOk && (
        <img
          src={heroSrc}
          alt=""
          aria-hidden
          onError={() => setImageOk(false)}
          className="absolute inset-0 w-full h-full object-cover object-right opacity-60 mix-blend-luminosity print:opacity-80"
        />
      )}
      <div className={`absolute inset-0 ${tokens.heroGradient} opacity-80 mix-blend-multiply`} />

      {/* Rangoli ornaments */}
      <RangoliCorner corner="tl" color="rgba(255,255,255,0.25)" size={120} className="absolute top-0 left-0" />
      <RangoliCorner corner="br" color="rgba(255,255,255,0.2)" size={160} className="absolute bottom-0 right-0" />

      <div className="relative z-10 p-12 md:p-16 min-h-[360px] flex flex-col justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge tone="amber" size="xs">
            Level {pack.level} · {tokens.label}
          </Badge>
          <Badge tone="slate" size="xs" className="bg-white/15 text-white border-white/20">
            Topic {pack.order} of 26
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

      <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};
