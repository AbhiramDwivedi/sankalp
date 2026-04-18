import React from 'react';
import { theme, hexToRgba } from '../../theme';

type CardTone = 'plain' | 'warm' | 'cool' | 'cream' | 'dark' | 'accent';

interface CardProps {
  children: React.ReactNode;
  tone?: CardTone;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'lg' | 'xl' | 'xxl';
  className?: string;
  noPrint?: boolean;
}

// Tones: the `warm`, `cool`, and `accent` tones use the saffron / emerald /
// indigo scales from theme.ts, so their colors move to `style` to consume
// tokens. `cream` (amber), `plain` (white + slate), and `dark` (slate) stay
// as Tailwind utilities — those scales are outside the theme.ts token set
// and item 2.2's scope is the orange / saffron / indigo / emerald families.
const toneStructuralClass: Record<CardTone, string> = {
  plain: 'bg-white border border-slate-100',
  warm: 'border',
  cool: 'border',
  cream: 'bg-amber-50/70 border border-amber-100',
  dark: 'bg-slate-900 text-white border border-slate-800',
  accent: 'border',
};

const toneStyle: Partial<Record<CardTone, React.CSSProperties>> = {
  warm: {
    backgroundColor: hexToRgba(theme.colors.saffron[50], 0.6),
    borderColor: theme.colors.saffron[100],
  },
  cool: {
    backgroundColor: hexToRgba(theme.colors.emerald[50], 0.6),
    borderColor: theme.colors.emerald[100],
  },
  accent: {
    backgroundColor: hexToRgba(theme.colors.indigo[50], 0.6),
    borderColor: theme.colors.indigo[100],
  },
};

const paddingClass = {
  sm: 'p-5',
  md: 'p-7',
  lg: 'p-10',
  xl: 'p-14',
};

const roundedClass = {
  lg: 'rounded-[1.5rem]',
  xl: 'rounded-[2rem]',
  xxl: 'rounded-[3rem]',
};

export const Card: React.FC<CardProps> = ({
  children,
  tone = 'plain',
  padding = 'md',
  rounded = 'xl',
  className = '',
  noPrint = false,
}) => {
  return (
    <div
      className={`${toneStructuralClass[tone]} ${paddingClass[padding]} ${roundedClass[rounded]} shadow-sm ${noPrint ? 'no-print' : ''} ${className}`}
      style={toneStyle[tone]}
    >
      {children}
    </div>
  );
};
