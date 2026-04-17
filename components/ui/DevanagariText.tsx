import React from 'react';

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
  return (
    <As
      dir="ltr"
      lang="hi"
      className={`${fontClass} ${sizeClass[size]} ${weightClass[weight]} ${className}`}
    >
      {children}
    </As>
  );
};
