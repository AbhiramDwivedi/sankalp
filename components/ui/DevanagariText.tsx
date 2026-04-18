import React from 'react';
import { theme } from '../../theme';

type Size = 'sm' | 'md' | 'lg' | 'xl' | 'display';
type Weight = 'regular' | 'medium' | 'bold' | 'black';

interface DevanagariTextProps {
  children: React.ReactNode;
  size?: Size;
  weight?: Weight;
  display?: boolean;      // use Tiro Devanagari Hindi for calligraphic presence
  className?: string;
  as?: React.ElementType;
}

// Size + weight Tailwind classes are STRUCTURAL (responsive breakpoints are
// needed, e.g. `md:text-2xl`) so they stay as utilities. The `.font-hindi` /
// `.font-hindi-display` class is retained because index.html's print
// `@media` block overrides `font-size` on those classes — dropping them
// would break print visual goldens. The `fontFamily` inline style
// redundantly (and pixel-identically) sources the family from theme.ts so
// that the primitive has a live dependency on the token set.
const sizeClass: Record<Size, string> = {
  sm: 'text-lg',
  md: 'text-xl md:text-2xl',
  lg: 'text-2xl md:text-3xl',
  xl: 'text-3xl md:text-5xl',
  display: 'text-5xl md:text-7xl',
};

const weightClass: Record<Weight, string> = {
  regular: 'font-normal',
  medium: 'font-medium',
  bold: 'font-bold',
  black: 'font-black',
};

export const DevanagariText: React.FC<DevanagariTextProps> = ({
  children,
  size = 'md',
  weight = 'bold',
  display = false,
  className = '',
  as: As = 'p',
}) => {
  const fontClass = display ? 'font-hindi-display' : 'font-hindi';
  const fontFamily = display
    ? theme.typography.devanagari.display.family
    : theme.typography.devanagari.body.family;
  return (
    <As
      dir="ltr"
      lang="hi"
      className={`${fontClass} ${sizeClass[size]} ${weightClass[weight]} ${className}`}
      style={{ fontFamily }}
    >
      {children}
    </As>
  );
};
