import React from 'react';
import { Info, Lightbulb, AlertTriangle, CheckCircle2, Target } from 'lucide-react';

type CalloutKind = 'info' | 'tip' | 'warning' | 'success' | 'goal';

interface CalloutProps {
  kind?: CalloutKind;
  title?: string;
  children: React.ReactNode;
  className?: string;
  compact?: boolean;
}

const kindClass: Record<CalloutKind, { bg: string; border: string; text: string; icon: React.ReactNode }> = {
  info: {
    bg: 'bg-blue-50/80',
    border: 'border-blue-200',
    text: 'text-blue-900',
    icon: <Info size={22} strokeWidth={2.5} />,
  },
  tip: {
    bg: 'bg-amber-50/80',
    border: 'border-amber-200',
    text: 'text-amber-900',
    icon: <Lightbulb size={22} strokeWidth={2.5} />,
  },
  warning: {
    bg: 'bg-rose-50/80',
    border: 'border-rose-200',
    text: 'text-rose-900',
    icon: <AlertTriangle size={22} strokeWidth={2.5} />,
  },
  success: {
    bg: 'bg-emerald-50/80',
    border: 'border-emerald-200',
    text: 'text-emerald-900',
    icon: <CheckCircle2 size={22} strokeWidth={2.5} />,
  },
  goal: {
    bg: 'bg-indigo-50/80',
    border: 'border-indigo-200',
    text: 'text-indigo-900',
    icon: <Target size={22} strokeWidth={2.5} />,
  },
};

export const Callout: React.FC<CalloutProps> = ({
  kind = 'info',
  title,
  children,
  className = '',
  compact = false,
}) => {
  const c = kindClass[kind];
  return (
    <div
      className={`${c.bg} border-l-4 ${c.border} rounded-2xl ${compact ? 'p-4' : 'p-6'} ${c.text} ${className} print:border-l-2`}
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 mt-0.5">{c.icon}</div>
        <div className="space-y-1 flex-1">
          {title && <h4 className="font-black text-sm tracking-wide">{title}</h4>}
          <div className={`${compact ? 'text-sm' : 'text-base'} leading-relaxed font-medium`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
