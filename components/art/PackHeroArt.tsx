// PackHeroArt — composes a full hero illustration for a topic pack, built
// from the pack's themeGroup (color palette) + heroMotif (illustrated scene).
// All SVG, no external image files. Safe for print.

import React from 'react';
import type { TopicPack } from '../../content/schema';
import { tokensFor } from '../ui/themeTokens';
import { resolveMotif } from './motifs';

interface PackHeroArtProps {
  pack: Pick<TopicPack, 'id' | 'themeGroup' | 'heroMotif'>;
  className?: string;
}

const THEME_GRADIENT_STOPS: Record<
  'Identity' | 'ModernSociety' | 'HumanIngenuity',
  { from: string; via: string; to: string }
> = {
  Identity: { from: '#C2410C', via: '#EA580C', to: '#F59E0B' },
  ModernSociety: { from: '#065F46', via: '#059669', to: '#14B8A6' },
  HumanIngenuity: { from: '#3730A3', via: '#4F46E5', to: '#8B5CF6' },
};

export const PackHeroArt: React.FC<PackHeroArtProps> = ({ pack, className = '' }) => {
  const tokens = tokensFor(pack.themeGroup);
  const stops = THEME_GRADIENT_STOPS[pack.themeGroup];
  const Motif = resolveMotif(pack.heroMotif);
  const motifFallback: Record<string, string> = {
    Identity: 'namaste',
    ModernSociety: 'bazaar',
    HumanIngenuity: 'notebook',
  };
  const SecondaryMotif = resolveMotif(motifFallback[pack.themeGroup]);

  const gradientId = `pack-hero-${pack.id}`;
  const patternId = `pack-paisley-${pack.id}`;

  return (
    <svg
      viewBox="0 0 1200 600"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      className={`w-full h-full ${className}`}
      role="img"
      aria-label={`Illustrated banner for ${pack.id}`}
      style={{ colorAdjust: 'exact', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' } as React.CSSProperties}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={stops.from} />
          <stop offset="50%" stopColor={stops.via} />
          <stop offset="100%" stopColor={stops.to} />
        </linearGradient>
        <pattern id={patternId} x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          <path d="M20 60 Q40 20 60 60 Q80 100 60 100 Q40 100 20 60 Z" fill="rgba(255,255,255,0.06)" />
          <circle cx="95" cy="40" r="3" fill="rgba(255,255,255,0.08)" />
          <circle cx="85" cy="85" r="2" fill="rgba(255,255,255,0.1)" />
        </pattern>
      </defs>

      <rect width="1200" height="600" fill={`url(#${gradientId})`} />
      <rect width="1200" height="600" fill={`url(#${patternId})`} />

      {/* Soft radial glow top-right */}
      <ellipse cx="1050" cy="-60" rx="420" ry="320" fill="rgba(255,255,255,0.18)" />

      {/* Primary motif — large right-side scene */}
      <g transform="translate(720, 120) scale(1.6)">
        <g opacity="0.9">
          <Motif color="#ffffff" accent="rgba(255,255,255,0.55)" />
        </g>
      </g>

      {/* Secondary motif — small accent top-left */}
      <g transform="translate(70, 60) scale(0.55)" opacity="0.55">
        <SecondaryMotif color="#ffffff" accent="rgba(255,255,255,0.4)" />
      </g>

      {/* Rangoli corner top-left */}
      <g transform="translate(0, 0)">
        <path
          d="M0 0 L160 0 Q100 20 70 60 Q40 100 20 160 L0 160 Z"
          fill="rgba(255,255,255,0.07)"
        />
        <circle cx="40" cy="40" r="6" fill="rgba(255,255,255,0.25)" />
        <circle cx="60" cy="20" r="3" fill="rgba(255,255,255,0.3)" />
        <circle cx="20" cy="60" r="3" fill="rgba(255,255,255,0.3)" />
      </g>

      {/* Paisley band across bottom */}
      <g transform="translate(0, 540)" opacity="0.35">
        <path d="M0 30 Q150 0 300 30 Q450 60 600 30 Q750 0 900 30 Q1050 60 1200 30 L1200 60 L0 60 Z" fill="rgba(0,0,0,0.2)" />
      </g>

      {/* Accent ring bottom-right */}
      <circle cx="1140" cy="560" r="30" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
      <circle cx="1140" cy="560" r="16" fill="rgba(255,255,255,0.15)" />

      <title>{`${pack.id} hero illustration (theme: ${tokens.label})`}</title>
    </svg>
  );
};
