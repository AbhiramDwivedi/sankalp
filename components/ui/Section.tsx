import React from 'react';
import { theme } from '../../theme';

type Accent = 'orange' | 'emerald' | 'indigo' | 'slate';

interface SectionProps {
  title: string;
  eyebrow?: string;
  icon?: React.ReactNode;
  accent?: Accent;
  children: React.ReactNode;
  id?: string;
  pageBreakBefore?: boolean;
}

// Accent color moves to `style` for the three theme-tokenised scales
// (orange = saffron, emerald, indigo). The `slate` accent stays as a
// Tailwind utility — slate isn't part of the theme.ts token set.
const accentClass: Record<Accent, string> = {
  orange: '',
  emerald: '',
  indigo: '',
  slate: 'text-slate-700',
};

const accentStyle: Partial<Record<Accent, React.CSSProperties>> = {
  orange: { color: theme.colors.saffron[600] },
  emerald: { color: theme.colors.emerald[600] },
  indigo: { color: theme.colors.indigo[600] },
};

export const Section: React.FC<SectionProps> = ({
  title,
  eyebrow,
  icon,
  accent = 'orange',
  children,
  id,
  pageBreakBefore = false,
}) => (
  <section
    id={id}
    className={`space-y-8 ${pageBreakBefore ? 'print:break-before-page' : ''}`}
  >
    <header className="space-y-2">
      {eyebrow && (
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
          {eyebrow}
        </p>
      )}
      <div
        className={`flex items-center gap-4 ${accentClass[accent]}`}
        style={accentStyle[accent]}
      >
        {icon}
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
          {title}
        </h2>
      </div>
    </header>
    {children}
  </section>
);
