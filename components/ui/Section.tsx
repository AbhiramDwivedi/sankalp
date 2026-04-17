import React from 'react';

interface SectionProps {
  title: string;
  eyebrow?: string;
  icon?: React.ReactNode;
  accent?: 'orange' | 'emerald' | 'indigo' | 'slate';
  children: React.ReactNode;
  id?: string;
  pageBreakBefore?: boolean;
}

const accentClass = {
  orange: 'text-orange-600',
  emerald: 'text-emerald-600',
  indigo: 'text-indigo-600',
  slate: 'text-slate-700',
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
      <div className={`flex items-center gap-4 ${accentClass[accent]}`}>
        {icon}
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
          {title}
        </h2>
      </div>
    </header>
    {children}
  </section>
);
