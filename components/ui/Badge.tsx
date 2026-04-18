import React from 'react';
import { theme } from '../../theme';

type BadgeTone = 'orange' | 'blue' | 'green' | 'indigo' | 'slate' | 'rose' | 'amber';

interface BadgeProps {
  children: React.ReactNode;
  tone?: BadgeTone;
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

// Tones mapped to the theme.ts scales (orange = saffron, green = emerald,
// indigo = indigo) move their colors to `style`. Blue, slate, rose, amber
// stay as Tailwind classes — those palettes are outside theme.ts scope.
const toneClass: Record<BadgeTone, string> = {
  orange: '',
  blue: 'bg-blue-50 text-blue-700 border-blue-100',
  green: '',
  indigo: '',
  slate: 'bg-slate-100 text-slate-700 border-slate-200',
  rose: 'bg-rose-50 text-rose-700 border-rose-100',
  amber: 'bg-amber-50 text-amber-700 border-amber-100',
};

const toneStyle: Partial<Record<BadgeTone, React.CSSProperties>> = {
  orange: {
    backgroundColor: theme.colors.saffron[50],
    color: theme.colors.saffron[700],
    borderColor: theme.colors.saffron[100],
  },
  green: {
    backgroundColor: theme.colors.emerald[50],
    color: theme.colors.emerald[700],
    borderColor: theme.colors.emerald[100],
  },
  indigo: {
    backgroundColor: theme.colors.indigo[50],
    color: theme.colors.indigo[700],
    borderColor: theme.colors.indigo[100],
  },
};

const sizeClass = {
  xs: 'text-[10px] px-2 py-0.5 tracking-[0.15em]',
  sm: 'text-xs px-3 py-1 tracking-[0.12em]',
  md: 'text-sm px-4 py-1.5 tracking-[0.08em]',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  tone = 'orange',
  size = 'sm',
  className = '',
}) => (
  <span
    className={`inline-flex items-center gap-1 font-black uppercase border rounded-full ${toneClass[tone]} ${sizeClass[size]} ${className}`}
    style={toneStyle[tone]}
  >
    {children}
  </span>
);
