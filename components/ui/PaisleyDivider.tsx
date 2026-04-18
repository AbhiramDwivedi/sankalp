import React from 'react';
import { theme } from '../../theme';

interface PaisleyDividerProps {
  className?: string;
  color?: string;
}

// The default stroke/fill color is sourced from `theme.colors.saffron[600]`
// (hex `#ea580c` — the canonical warm primary). Callers can override with
// any CSS color string.
export const PaisleyDivider: React.FC<PaisleyDividerProps> = ({
  className = '',
  color = theme.colors.saffron[600],
}) => (
  <div className={`flex items-center gap-4 my-8 ${className}`} aria-hidden>
    <span className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    <svg
      width="56"
      height="24"
      viewBox="0 0 56 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M8 12 C 8 6, 14 2, 20 6 S 26 18, 18 20 S 4 18, 8 12 Z"
        stroke={color}
        strokeWidth="1.2"
        fill="none"
      />
      <circle cx="28" cy="12" r="2.4" fill={color} />
      <path
        d="M48 12 C 48 6, 42 2, 36 6 S 30 18, 38 20 S 52 18, 48 12 Z"
        stroke={color}
        strokeWidth="1.2"
        fill="none"
      />
    </svg>
    <span className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
  </div>
);
