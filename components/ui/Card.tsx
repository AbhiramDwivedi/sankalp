import React from 'react';

type CardTone = 'plain' | 'warm' | 'cool' | 'cream' | 'dark' | 'accent';

interface CardProps {
  children: React.ReactNode;
  tone?: CardTone;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'lg' | 'xl' | 'xxl';
  className?: string;
  noPrint?: boolean;
}

const toneClass: Record<CardTone, string> = {
  plain: 'bg-white border border-slate-100',
  warm: 'bg-orange-50/60 border border-orange-100',
  cool: 'bg-emerald-50/60 border border-emerald-100',
  cream: 'bg-amber-50/70 border border-amber-100',
  dark: 'bg-slate-900 text-white border border-slate-800',
  accent: 'bg-indigo-50/60 border border-indigo-100',
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
      className={`${toneClass[tone]} ${paddingClass[padding]} ${roundedClass[rounded]} shadow-sm ${noPrint ? 'no-print' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
