// CapstoneHeroArt — hero illustration for a capstone essay. Mirrors
// PackHeroArt's approach but uses a slightly different composition (wider
// scene, push-tier capstones get a gold accent ring) so capstones feel
// visually distinct from topic packs.

import React from 'react';
import type { Capstone } from '../../content/schema';
import { tokensFor } from '../ui/themeTokens';
import { resolveMotif } from './motifs';

interface CapstoneHeroArtProps {
  capstone: Pick<Capstone, 'id' | 'themeGroup' | 'heroMotif' | 'tier'>;
  className?: string;
}

const THEME_GRADIENT_STOPS: Record<
  'Identity' | 'ModernSociety' | 'HumanIngenuity',
  { from: string; via: string; to: string }
> = {
  Identity: { from: '#9A3412', via: '#C2410C', to: '#F97316' },
  ModernSociety: { from: '#064E3B', via: '#047857', to: '#0F9D58' },
  HumanIngenuity: { from: '#312E81', via: '#4338CA', to: '#7C3AED' },
};

export const CapstoneHeroArt: React.FC<CapstoneHeroArtProps> = ({ capstone, className = '' }) => {
  const tokens = tokensFor(capstone.themeGroup);
  const stops = THEME_GRADIENT_STOPS[capstone.themeGroup];
  const Motif = resolveMotif(capstone.heroMotif);
  const isPush = capstone.tier === 'push';

  const gradientId = `capstone-hero-${capstone.id}`;
  const ringId = `capstone-ring-${capstone.id}`;

  return (
    <svg
      viewBox="0 0 1200 600"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      className={`w-full h-full ${className}`}
      role="img"
      aria-label={`Capstone illustration for ${capstone.id}`}
      style={{ colorAdjust: 'exact', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' } as React.CSSProperties}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={stops.from} />
          <stop offset="45%" stopColor={stops.via} />
          <stop offset="100%" stopColor={stops.to} />
        </linearGradient>
        <radialGradient id={ringId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
          <stop offset="70%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      <rect width="1200" height="600" fill={`url(#${gradientId})`} />

      {/* Layered paisley strokes */}
      <g opacity="0.18" stroke="#ffffff" strokeWidth="2" fill="none">
        <path d="M-40 180 Q200 80 440 180 Q680 280 920 180 Q1160 80 1240 180" />
        <path d="M-40 430 Q200 330 440 430 Q680 530 920 430 Q1160 330 1240 430" />
      </g>

      {/* Centered focal glow */}
      <circle cx="900" cy="300" r="320" fill={`url(#${ringId})`} />

      {/* Main motif — large centered-right */}
      <g transform="translate(780, 120) scale(1.8)">
        <g opacity="0.95">
          <Motif color="#ffffff" accent="rgba(255,255,255,0.6)" />
        </g>
      </g>

      {/* Tier indicator: push-tier gets a gold-lined scroll arc */}
      {isPush && (
        <g transform="translate(60, 60)">
          <path
            d="M0 80 Q100 10 240 50 Q380 90 480 40"
            fill="none"
            stroke="rgba(253, 224, 71, 0.85)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="0" cy="80" r="6" fill="rgba(253, 224, 71, 0.85)" />
          <circle cx="480" cy="40" r="6" fill="rgba(253, 224, 71, 0.85)" />
        </g>
      )}

      {/* Crest — left-side */}
      <g transform="translate(70, 420)">
        <circle cx="40" cy="40" r="50" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
        <circle cx="40" cy="40" r="36" fill="rgba(255,255,255,0.12)" />
        <text
          x="40"
          y="50"
          textAnchor="middle"
          fontSize="28"
          fontFamily="'Tiro Devanagari Hindi', 'Noto Serif Devanagari', serif"
          fontWeight="700"
          fill="#ffffff"
        >
          {isPush ? '★' : 'C'}
        </text>
      </g>

      {/* Paisley band bottom */}
      <g transform="translate(0, 540)" opacity="0.4">
        <path d="M0 30 Q150 0 300 30 Q450 60 600 30 Q750 0 900 30 Q1050 60 1200 30 L1200 60 L0 60 Z" fill="rgba(0,0,0,0.22)" />
      </g>

      <title>{`${capstone.id} capstone illustration (${capstone.tier} tier, ${tokens.label})`}</title>
    </svg>
  );
};
