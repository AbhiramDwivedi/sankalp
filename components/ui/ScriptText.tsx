import React from 'react';
import { theme } from '../../theme';
import { CURRICULUM } from '../../content/curriculum';

// Generic script-aware text primitive. Today the app targets Hindi
// (Devanagari); the `script` prop + CURRICULUM-driven font resolution
// is the seam that lets a sibling curriculum (e.g. Mandarin / Hanzi,
// Korean / Hangul) reuse the same primitive without a fork.
//
// For backwards compatibility we keep `DevanagariText` as a thin alias
// that pins `script="Devanagari"` — existing call sites keep rendering
// pixel-identical output.

type Size = 'sm' | 'md' | 'lg' | 'xl' | 'display';
type Weight = 'regular' | 'medium' | 'bold' | 'black';

export type Script = 'Devanagari' | 'Latin';

export interface ScriptTextProps {
  children: React.ReactNode;
  /** Which script the content is in. Defaults to 'Devanagari' to preserve the current behavior. */
  script?: Script;
  size?: Size;
  weight?: Weight;
  /** Use the calligraphic display family (for Devanagari: Tiro Devanagari Hindi). */
  display?: boolean;
  className?: string;
  as?: React.ElementType;
  /** Optional explicit lang override; otherwise derived from CURRICULUM when the script matches. */
  lang?: string;
  style?: React.CSSProperties;
}

// Size + weight Tailwind classes are STRUCTURAL (responsive breakpoints
// are needed, e.g. `md:text-2xl`) so they stay as utilities. The
// `.font-hindi` / `.font-hindi-display` class is retained because
// index.html's print `@media` block overrides `font-size` on those
// classes — dropping them would break print visual goldens. The
// `fontFamily` inline style redundantly (and pixel-identically) sources
// the family from theme.ts so that the primitive has a live dependency
// on the token set.
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

export const ScriptText: React.FC<ScriptTextProps> = ({
  children,
  script = 'Devanagari',
  size = 'md',
  weight = 'bold',
  display = false,
  className = '',
  as: As = 'p',
  lang,
  style,
}) => {
  // When the requested script matches the active curriculum's script,
  // resolve the print-safe class + inline font-family from theme tokens
  // that mirror CURRICULUM.language.fontStack. When it doesn't match,
  // fall back to the generic system stack with no class — this path is
  // unused today but keeps the primitive script-agnostic.
  const curriculumScript = CURRICULUM.language.script;
  const matchesCurriculum = script === curriculumScript;

  let fontClass = '';
  let fontFamily: string | undefined;

  if (script === 'Devanagari') {
    fontClass = display ? 'font-hindi-display' : 'font-hindi';
    fontFamily = display
      ? theme.typography.devanagari.display.family
      : theme.typography.devanagari.body.family;
  } else if (script === 'Latin') {
    fontFamily = display
      ? theme.typography.latin.display.family
      : theme.typography.latin.body.family;
  }

  const resolvedLang = lang ?? (matchesCurriculum ? CURRICULUM.language.code : undefined);

  // Preserve the original className concatenation byte-for-byte (including
  // a trailing space when the caller passes className=''). Visual goldens
  // and print CSS are sensitive to the emitted class string.
  const classes = `${fontClass} ${sizeClass[size]} ${weightClass[weight]} ${className}`;

  return (
    <As
      dir="ltr"
      lang={resolvedLang}
      className={classes}
      style={fontFamily ? { fontFamily, ...style } : style}
    >
      {children}
    </As>
  );
};
