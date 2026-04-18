// Per-theme color tokens. The ThemeGroup a pack belongs to drives the accent
// color used in HeroBanner, section headings, and rubric tags.

import type { ThemeGroup } from '../../content/schema';

export interface ThemeTokens {
  label: string;
  primaryHex: string;       // for SVG motif color
  accentText: string;       // tailwind
  accentBg: string;         // tailwind
  surfaceBg: string;        // tailwind (soft surface)
  ring: string;             // tailwind ring color
  heroGradient: string;     // tailwind gradient
}

export const THEME_TOKENS: Record<ThemeGroup, ThemeTokens> = {
  Identity: {
    label: 'Identity',
    primaryHex: '#E67E22',
    accentText: 'text-orange-700',
    accentBg: 'bg-orange-700',
    surfaceBg: 'bg-orange-50/70',
    ring: 'ring-orange-200',
    heroGradient: 'bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500',
  },
  ModernSociety: {
    label: 'Modern Society',
    primaryHex: '#0F9D58',
    accentText: 'text-emerald-700',
    accentBg: 'bg-emerald-700',
    surfaceBg: 'bg-emerald-50/70',
    ring: 'ring-emerald-200',
    heroGradient: 'bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-500',
  },
  HumanIngenuity: {
    label: 'Human Ingenuity',
    primaryHex: '#4A3AFF',
    accentText: 'text-indigo-700',
    accentBg: 'bg-indigo-600',
    surfaceBg: 'bg-indigo-50/70',
    ring: 'ring-indigo-200',
    heroGradient: 'bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-500',
  },
};

export function tokensFor(theme: ThemeGroup): ThemeTokens {
  return THEME_TOKENS[theme];
}
