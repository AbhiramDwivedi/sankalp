import React from 'react';

type BadgeTone = 'orange' | 'blue' | 'green' | 'indigo' | 'slate' | 'rose' | 'amber';

interface BadgeProps {
  children: React.ReactNode;
  tone?: BadgeTone;
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

const toneClass: Record<BadgeTone, string> = {
  orange: 'bg-orange-50 text-orange-700 border-orange-100',
  blue: 'bg-blue-50 text-blue-700 border-blue-100',
  green: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  indigo: 'bg-indigo-50 text-indigo-700 border-indigo-100',
  slate: 'bg-slate-100 text-slate-700 border-slate-200',
  rose: 'bg-rose-50 text-rose-700 border-rose-100',
  amber: 'bg-amber-50 text-amber-700 border-amber-100',
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
  >
    {children}
  </span>
);
