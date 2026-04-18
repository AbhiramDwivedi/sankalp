import React from 'react';
import { Info, Lightbulb, AlertTriangle, CheckCircle2, Target } from 'lucide-react';
import { theme, hexToRgba } from '../../theme';

type CalloutKind = 'info' | 'tip' | 'warning' | 'success' | 'goal';

interface CalloutProps {
  kind?: CalloutKind;
  title?: string;
  children: React.ReactNode;
  className?: string;
  compact?: boolean;
}

// The `success` (emerald) and `goal` (indigo) kinds now pull colors from
// theme.ts. The other three kinds — `info` (blue), `tip` (amber),
// `warning` (rose) — stay on Tailwind utilities because those scales are
// outside the token set (item 2.2's scope is the orange/saffron/indigo/
// emerald families only).
const kindTailwind: Record<CalloutKind, { bg: string; border: string; text: string }> = {
  info: { bg: 'bg-blue-50/80', border: 'border-blue-200', text: 'text-blue-900' },
  tip: { bg: 'bg-amber-50/80', border: 'border-amber-200', text: 'text-amber-900' },
  warning: { bg: 'bg-rose-50/80', border: 'border-rose-200', text: 'text-rose-900' },
  success: { bg: '', border: '', text: '' },
  goal: { bg: '', border: '', text: '' },
};

const kindStyle: Partial<Record<CalloutKind, React.CSSProperties>> = {
  success: {
    backgroundColor: hexToRgba(theme.colors.emerald[50], 0.8),
    borderColor: theme.colors.emerald[200],
    color: theme.colors.emerald[900],
  },
  goal: {
    backgroundColor: hexToRgba(theme.colors.indigo[50], 0.8),
    borderColor: theme.colors.indigo[200],
    color: theme.colors.indigo[900],
  },
};

const kindIcon: Record<CalloutKind, React.ReactNode> = {
  info: <Info size={22} strokeWidth={2.5} />,
  tip: <Lightbulb size={22} strokeWidth={2.5} />,
  warning: <AlertTriangle size={22} strokeWidth={2.5} />,
  success: <CheckCircle2 size={22} strokeWidth={2.5} />,
  goal: <Target size={22} strokeWidth={2.5} />,
};

export const Callout: React.FC<CalloutProps> = ({
  kind = 'info',
  title,
  children,
  className = '',
  compact = false,
}) => {
  const tw = kindTailwind[kind];
  return (
    <div
      className={`${tw.bg} border-l-4 ${tw.border} rounded-2xl ${compact ? 'p-4' : 'p-6'} ${tw.text} ${className} print:border-l-2`}
      style={kindStyle[kind]}
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 mt-0.5">{kindIcon[kind]}</div>
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
