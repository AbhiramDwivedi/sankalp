// SVG motif library - reusable India-contextual illustrations composed into
// pack and capstone hero art. Each motif is a single React component taking
// a `color` prop for theme tinting. No external images; all inline SVG.
//
// Motifs are designed to sit inside a hero banner: full-bleed viewBox,
// flat-fill shapes, readable at 1200×600 down to 320×160.

import React from 'react';

export interface MotifProps {
  color?: string;
  accent?: string;
  className?: string;
}

const DEFAULT = '#ffffff';
const ACCENT = 'rgba(255,255,255,0.6)';

// Utility: all motifs render at 240×240, then PackHeroArt scales.
//
// Accessibility notes:
//   - Motifs ALWAYS nest inside PackHeroArt / CapstoneHeroArt, which set
//     role="img" and aria-label on the OUTER svg. The inner motif <svg>
//     therefore stays aria-hidden so screen readers don't double-announce.
//   - Each motif still embeds a <title> element. Browsers surface this as
//     a hover tooltip and assistive tech can opt-in via aria-describedby
//     if a sibling component needs it. It also documents the motif for
//     future contributors who view the rendered SVG directly.
const box = (title: string, children: React.ReactNode) => (
  <svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <title>{title}</title>
    {children}
  </svg>
);

/** Thali - round platter with four small bowls + flatbread. */
export const MotifThali: React.FC<MotifProps> = ({ color = DEFAULT, accent = ACCENT }) => box('Thali plate with bowls', 
  <>
    <circle cx="120" cy="120" r="96" fill="none" stroke={color} strokeWidth="4" opacity="0.9" />
    <circle cx="120" cy="120" r="80" fill={color} opacity="0.12" />
    <circle cx="86" cy="92" r="20" fill={color} opacity="0.8" />
    <circle cx="154" cy="92" r="20" fill={accent} />
    <circle cx="86" cy="150" r="20" fill={accent} />
    <circle cx="154" cy="150" r="20" fill={color} opacity="0.8" />
    <circle cx="120" cy="120" r="12" fill={color} />
    <path d="M60 200 Q120 230 180 200" fill="none" stroke={color} strokeWidth="3" opacity="0.5" />
  </>,
);

/** Diya - oil lamp with flame. */
export const MotifDiya: React.FC<MotifProps> = ({ color = DEFAULT, accent = ACCENT }) => box('Diya oil lamp with flame', 
  <>
    <path d="M120 80 Q116 70 120 56 Q124 70 120 80 Q130 92 120 108 Q110 92 120 80 Z" fill={accent} />
    <circle cx="120" cy="72" r="3" fill={color} />
    <path d="M60 150 Q120 200 180 150 Q160 130 120 130 Q80 130 60 150 Z" fill={color} opacity="0.85" />
    <ellipse cx="120" cy="135" rx="52" ry="8" fill={color} opacity="0.4" />
    <circle cx="120" cy="100" r="4" fill={color} />
    <path d="M50 175 L190 175" stroke={color} strokeWidth="2" opacity="0.3" />
  </>,
);

/** Rickshaw - three-wheeler silhouette. */
export const MotifRickshaw: React.FC<MotifProps> = ({ color = DEFAULT, accent = ACCENT }) => box('Auto-rickshaw', 
  <>
    <rect x="60" y="90" width="120" height="60" rx="8" fill={color} opacity="0.85" />
    <path d="M60 90 L80 60 L160 60 L180 90 Z" fill={color} />
    <rect x="96" y="74" width="48" height="16" fill={accent} rx="2" />
    <circle cx="84" cy="160" r="18" fill="none" stroke={color} strokeWidth="6" />
    <circle cx="84" cy="160" r="4" fill={color} />
    <circle cx="170" cy="160" r="18" fill="none" stroke={color} strokeWidth="6" />
    <circle cx="170" cy="160" r="4" fill={color} />
    <rect x="42" y="104" width="24" height="10" fill={color} opacity="0.7" />
  </>,
);

/** Umbrella + raindrops (monsoon). */
export const MotifUmbrella: React.FC<MotifProps> = ({ color = DEFAULT, accent = ACCENT }) => box('Umbrella with monsoon raindrops', 
  <>
    <path d="M40 110 Q120 40 200 110 Z" fill={color} opacity="0.9" />
    <path d="M40 110 Q80 100 120 110" fill="none" stroke={accent} strokeWidth="2" />
    <path d="M120 110 Q160 100 200 110" fill="none" stroke={accent} strokeWidth="2" />
    <line x1="120" y1="110" x2="120" y2="180" stroke={color} strokeWidth="4" />
    <path d="M120 180 Q126 186 136 182" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <circle cx="60" cy="160" r="3" fill={accent} />
    <circle cx="80" cy="190" r="3" fill={accent} />
    <circle cx="170" cy="170" r="3" fill={accent} />
    <circle cx="190" cy="200" r="3" fill={accent} />
  </>,
);

/** Books - stack with pencil cup. */
export const MotifBooks: React.FC<MotifProps> = ({ color = DEFAULT, accent = ACCENT }) => box('Stack of books with pencil cup', 
  <>
    <rect x="50" y="150" width="110" height="20" fill={color} />
    <rect x="60" y="130" width="90" height="20" fill={accent} />
    <rect x="55" y="110" width="100" height="20" fill={color} opacity="0.85" />
    <rect x="55" y="154" width="110" height="4" fill={accent} opacity="0.5" />
    <rect x="170" y="100" width="32" height="70" rx="4" fill={color} opacity="0.9" />
    <line x1="176" y1="110" x2="176" y2="90" stroke={accent} strokeWidth="3" />
    <line x1="184" y1="110" x2="184" y2="82" stroke={accent} strokeWidth="3" />
    <line x1="192" y1="110" x2="192" y2="86" stroke={accent} strokeWidth="3" />
  </>,
);

/** Sunrise - sun behind layered hills. */
export const MotifSunrise: React.FC<MotifProps> = ({ color = DEFAULT, accent = ACCENT }) => box('Sunrise behind layered hills', 
  <>
    <circle cx="120" cy="130" r="40" fill={color} opacity="0.9" />
    <path d="M0 170 Q60 140 120 160 Q180 180 240 150 L240 240 L0 240 Z" fill={accent} />
    <path d="M0 200 Q80 170 140 190 Q200 210 240 190 L240 240 L0 240 Z" fill={color} opacity="0.7" />
    <line x1="120" y1="60" x2="120" y2="80" stroke={color} strokeWidth="2" />
    <line x1="80" y1="90" x2="92" y2="100" stroke={color} strokeWidth="2" />
    <line x1="160" y1="90" x2="148" y2="100" stroke={color} strokeWidth="2" />
    <line x1="60" y1="130" x2="80" y2="130" stroke={color} strokeWidth="2" />
    <line x1="180" y1="130" x2="160" y2="130" stroke={color} strokeWidth="2" />
  </>,
);

/** Temple - tiered arch silhouette. */
export const MotifTemple: React.FC<MotifProps> = ({ color = DEFAULT, accent = ACCENT }) => box('Temple silhouette', 
  <>
    <rect x="60" y="160" width="120" height="50" fill={color} opacity="0.9" />
    <path d="M70 160 L120 100 L170 160 Z" fill={color} />
    <path d="M80 140 L120 110 L160 140 Z" fill={accent} />
    <circle cx="120" cy="96" r="6" fill={accent} />
    <line x1="120" y1="90" x2="120" y2="72" stroke={color} strokeWidth="3" />
    <path d="M100 180 Q120 170 140 180 L140 210 L100 210 Z" fill={accent} />
    <rect x="115" y="185" width="10" height="25" fill={color} opacity="0.4" />
    <line x1="60" y1="210" x2="180" y2="210" stroke={color} strokeWidth="2" />
  </>,
);

/** Bazaar - canopy with hanging bulbs. */
export const MotifBazaar: React.FC<MotifProps> = ({ color = DEFAULT, accent = ACCENT }) => box('Bazaar canopy with hanging bulbs', 
  <>
    <path d="M30 90 L210 90 L190 60 L50 60 Z" fill={color} opacity="0.85" />
    <path d="M50 60 L50 90 M90 60 L90 90 M130 60 L130 90 M170 60 L170 90 M210 90 L210 60 M30 90 L30 60" stroke={accent} strokeWidth="2" />
    <line x1="30" y1="100" x2="210" y2="100" stroke={color} strokeWidth="1" opacity="0.5" />
    <circle cx="60" cy="130" r="6" fill={accent} />
    <circle cx="100" cy="145" r="6" fill={accent} />
    <circle cx="140" cy="130" r="6" fill={accent} />
    <circle cx="180" cy="145" r="6" fill={accent} />
    <line x1="60" y1="124" x2="60" y2="100" stroke={color} strokeWidth="1" />
    <line x1="100" y1="139" x2="100" y2="100" stroke={color} strokeWidth="1" />
    <line x1="140" y1="124" x2="140" y2="100" stroke={color} strokeWidth="1" />
    <line x1="180" y1="139" x2="180" y2="100" stroke={color} strokeWidth="1" />
    <rect x="40" y="170" width="40" height="40" fill={color} opacity="0.5" />
    <rect x="90" y="170" width="40" height="40" fill={accent} opacity="0.5" />
    <rect x="140" y="170" width="40" height="40" fill={color} opacity="0.5" />
  </>,
);

/** Clock - round face with marks. */
export const MotifClock: React.FC<MotifProps> = ({ color = DEFAULT, accent = ACCENT }) => box('Clock face', 
  <>
    <circle cx="120" cy="120" r="80" fill="none" stroke={color} strokeWidth="5" />
    <circle cx="120" cy="120" r="72" fill={color} opacity="0.08" />
    <line x1="120" y1="50" x2="120" y2="62" stroke={color} strokeWidth="4" />
    <line x1="120" y1="190" x2="120" y2="178" stroke={color} strokeWidth="4" />
    <line x1="50" y1="120" x2="62" y2="120" stroke={color} strokeWidth="4" />
    <line x1="190" y1="120" x2="178" y2="120" stroke={color} strokeWidth="4" />
    <line x1="120" y1="120" x2="120" y2="75" stroke={color} strokeWidth="5" strokeLinecap="round" />
    <line x1="120" y1="120" x2="156" y2="130" stroke={accent} strokeWidth="4" strokeLinecap="round" />
    <circle cx="120" cy="120" r="6" fill={color} />
  </>,
);

/** Family - three-figure silhouette. */
export const MotifFamily: React.FC<MotifProps> = ({ color = DEFAULT, accent = ACCENT }) => box('Family of three figures', 
  <>
    <circle cx="80" cy="100" r="16" fill={color} />
    <path d="M58 200 Q80 132 102 200 Z" fill={color} />
    <circle cx="160" cy="100" r="16" fill={accent} />
    <path d="M138 200 Q160 132 182 200 Z" fill={accent} />
    <circle cx="120" cy="130" r="12" fill={color} opacity="0.85" />
    <path d="M104 200 Q120 160 136 200 Z" fill={color} opacity="0.85" />
    <line x1="50" y1="210" x2="190" y2="210" stroke={color} strokeWidth="2" opacity="0.3" />
  </>,
);

/** Kurta - on hanger. */
export const MotifKurta: React.FC<MotifProps> = ({ color = DEFAULT, accent = ACCENT }) => box('Kurta on a hanger', 
  <>
    <path d="M120 50 Q110 60 120 70 Q130 60 120 50 Z" fill={color} />
    <path d="M90 80 L150 80 L180 100 L170 130 L160 110 L160 200 L80 200 L80 110 L70 130 L60 100 Z" fill={color} opacity="0.9" />
    <line x1="120" y1="70" x2="120" y2="85" stroke={color} strokeWidth="2" />
    <line x1="90" y1="82" x2="150" y2="82" stroke={accent} strokeWidth="2" />
    <circle cx="120" cy="110" r="3" fill={accent} />
    <circle cx="120" cy="130" r="3" fill={accent} />
    <circle cx="120" cy="150" r="3" fill={accent} />
    <path d="M115 90 L125 90 L125 200 L115 200 Z" fill={accent} opacity="0.4" />
  </>,
);

/** Suitcase + plane contrail. */
export const MotifSuitcase: React.FC<MotifProps> = ({ color = DEFAULT, accent = ACCENT }) => box('Suitcase with airplane contrail', 
  <>
    <rect x="50" y="120" width="140" height="90" rx="8" fill={color} opacity="0.9" />
    <rect x="100" y="100" width="40" height="20" rx="4" fill="none" stroke={color} strokeWidth="4" />
    <line x1="50" y1="155" x2="190" y2="155" stroke={accent} strokeWidth="3" />
    <rect x="110" y="180" width="20" height="6" fill={accent} />
    <path d="M30 60 Q80 50 120 70" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
    <path d="M120 70 L140 60 L150 66 L130 82 Z" fill={color} />
    <path d="M140 66 L156 60 L160 66 L146 74 Z" fill={color} opacity="0.7" />
  </>,
);

/** Notebook - open with pen. */
export const MotifNotebook: React.FC<MotifProps> = ({ color = DEFAULT, accent = ACCENT }) => box('Open notebook with pen', 
  <>
    <path d="M50 80 L120 70 L120 200 L50 210 Z" fill={color} opacity="0.9" />
    <path d="M190 80 L120 70 L120 200 L190 210 Z" fill={color} opacity="0.75" />
    <line x1="60" y1="100" x2="110" y2="94" stroke={accent} strokeWidth="2" />
    <line x1="60" y1="120" x2="110" y2="114" stroke={accent} strokeWidth="2" />
    <line x1="60" y1="140" x2="110" y2="134" stroke={accent} strokeWidth="2" />
    <line x1="60" y1="160" x2="110" y2="154" stroke={accent} strokeWidth="2" />
    <line x1="130" y1="94" x2="180" y2="100" stroke={accent} strokeWidth="2" />
    <line x1="130" y1="114" x2="180" y2="120" stroke={accent} strokeWidth="2" />
    <line x1="130" y1="134" x2="180" y2="140" stroke={accent} strokeWidth="2" />
    <rect x="160" y="50" width="8" height="80" fill={accent} transform="rotate(25 164 90)" />
    <path d="M156 52 L172 52 L168 44 Z" fill={color} transform="rotate(25 164 48)" />
  </>,
);

/** Cricket - bat + stumps. */
export const MotifCricket: React.FC<MotifProps> = ({ color = DEFAULT, accent = ACCENT }) => box('Cricket bat and stumps', 
  <>
    <rect x="70" y="170" width="4" height="50" fill={color} />
    <rect x="90" y="170" width="4" height="50" fill={color} />
    <rect x="110" y="170" width="4" height="50" fill={color} />
    <line x1="64" y1="170" x2="120" y2="170" stroke={color} strokeWidth="2" />
    <rect x="144" y="46" width="14" height="12" fill={accent} rx="2" />
    <rect x="140" y="58" width="22" height="80" fill={color} rx="4" transform="rotate(30 150 98)" />
    <line x1="144" y1="70" x2="162" y2="84" stroke={accent} strokeWidth="2" opacity="0.4" />
    <line x1="138" y1="90" x2="156" y2="104" stroke={accent} strokeWidth="2" opacity="0.4" />
    <circle cx="70" cy="150" r="8" fill={accent} />
  </>,
);

/** Namaste - two hands in greeting. */
export const MotifNamaste: React.FC<MotifProps> = ({ color = DEFAULT, accent = ACCENT }) => box('Namaste hands in greeting', 
  <>
    <circle cx="120" cy="180" r="50" fill={color} opacity="0.15" />
    <path d="M100 200 L100 120 Q100 100 112 90 L120 84 L128 90 Q140 100 140 120 L140 200 Z" fill={color} />
    <line x1="120" y1="90" x2="120" y2="200" stroke={accent} strokeWidth="2" />
    <circle cx="112" cy="80" r="5" fill={accent} />
    <circle cx="128" cy="80" r="5" fill={accent} />
    <path d="M70 70 Q120 60 170 70" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="3 3" />
  </>,
);

// ---------------------------------------------------------------------------
// Motif registry - used by PackHeroArt / CapstoneHeroArt to resolve a motif
// key declared on the pack/capstone into a renderable component.
// ---------------------------------------------------------------------------

export const MOTIFS: Record<string, React.FC<MotifProps>> = {
  thali: MotifThali,
  diya: MotifDiya,
  rickshaw: MotifRickshaw,
  umbrella: MotifUmbrella,
  books: MotifBooks,
  sunrise: MotifSunrise,
  temple: MotifTemple,
  bazaar: MotifBazaar,
  clock: MotifClock,
  family: MotifFamily,
  kurta: MotifKurta,
  suitcase: MotifSuitcase,
  notebook: MotifNotebook,
  cricket: MotifCricket,
  namaste: MotifNamaste,
};

export type MotifKey = keyof typeof MOTIFS;

export function resolveMotif(key: string | undefined, fallback: MotifKey = 'notebook'): React.FC<MotifProps> {
  if (!key) return MOTIFS[fallback];
  return MOTIFS[key] || MOTIFS[fallback];
}
