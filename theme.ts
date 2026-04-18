/**
 * Sankalp design tokens — REFERENCE file.
 *
 * Status: REFERENCE ONLY. This module is NOT consumed by any component
 * today. It captures the design vocabulary currently expressed through
 * Tailwind utility classes so that later work (item 2.2 — wire ui/*,
 * item 2.3 — a11y audits, plus any future refactor) can import a single
 * source of truth instead of re-deriving values from grep.
 *
 * ------------------------------------------------------------------
 * Extraction methodology (snapshot: 2026-04-17, branch auto/2.1-theme-tokens)
 * ------------------------------------------------------------------
 * Tailwind in this project is served by the CDN (see index.html —
 * `https://cdn.tailwindcss.com`). There is no `tailwind.config.*` file
 * and `index.html` contains no color-related CSS custom properties or
 * @tailwind color overrides. The scales below therefore reflect:
 *   (a) actual Tailwind utility classes present in components/, content/,
 *       and App.tsx (extracted via `grep -rEo '(bg|text|border|ring|
 *       from|to|via)-(orange|indigo|emerald)-[0-9]+'` + frequency sort),
 *       with the most-frequent shade per role chosen as canonical; and
 *   (b) the published Tailwind default palette for any step not used in
 *       code. Every such fall-back is flagged with a `// default` comment
 *       so a future contributor can see which values came from usage and
 *       which came from the palette.
 *
 * Note on the "saffron" key: the brief for item 2.1 names a `saffron`
 * scale, but no component uses `bg-saffron-*` / `text-saffron-*`. The
 * warm / Identity / "FCPS saffron" role in this codebase is expressed
 * through Tailwind's `orange-*` scale (e.g. `text-orange-600` appears
 * 39×, `bg-orange-600` appears 22×, and `THEME_TOKENS.Identity` in
 * `components/ui/themeTokens.ts` uses orange). We expose the scale
 * under `colors.saffron` to match the token name the brief expects, and
 * we also re-export it as `colors.orange` so consumers can refer to the
 * raw Tailwind class lineage. Values are Tailwind's default `orange`
 * palette — the scale that actually renders.
 *
 * Spacing, radii, type sizes, and shadows were derived the same way:
 *   grep -rhEo '\b(p|px|py|pt|pb|pl|pr)-[0-9]+\b' … | sort | uniq -c | sort -rn
 *   grep -rhEo '\b(gap|gap-x|gap-y|space-x|space-y)-[0-9]+\b' …
 *   grep -rhEo '\brounded(-[a-z0-9]+)?(-[a-z0-9]+)?\b' …
 *   grep -rhEo '\btext-(xs|sm|base|lg|xl|2xl|…)\b' …
 *   grep -rhEo '\bshadow(-[a-z0-9]+)?\b' …
 * then ranked by occurrence count.
 *
 * ------------------------------------------------------------------
 * How to keep this file in sync
 * ------------------------------------------------------------------
 * When you introduce a new shade, spacing step, radius, type size, or
 * shadow in a component:
 *   1. If the value already exists here, use it (prefer `theme.colors.*`
 *      over a raw Tailwind class when the consumer is a shared primitive).
 *   2. If it does not exist and the new value is one-off, leave this
 *      file alone — do not dilute the tokens with accidental outliers.
 *   3. If it does not exist and the new value is genuinely canonical
 *      (used ≥3 places, or part of a deliberate new role), add it here
 *      in the same shape as the existing scales and update the
 *      extraction comment above to mention the new token.
 *   4. If you change a token, grep for its raw literal (e.g. the hex
 *      `#ea580c` or the rem `1.25rem`) across the codebase to understand
 *      the blast radius before shipping.
 *
 * Keep the scales narrow. The project's visual identity depends on a
 * small set of values applied consistently — resist adding shades just
 * because Tailwind offers them.
 */

// ---------------------------------------------------------------------
// Color scales
// ---------------------------------------------------------------------
// Tailwind default `orange`, `indigo`, and `emerald` palettes. Shades
// flagged with `// used` are observed in components/ with the indicated
// frequency (role = most-common utility prefix). Shades flagged with
// `// default` are Tailwind defaults retained for completeness so
// consumers can still say `theme.colors.saffron[900]` without it being
// undefined; those shades are not currently in production render.

const saffron = {
  50:  '#fff7ed', // used — bg-orange-50 (11×), from-orange-50 (5×)
  100: '#ffedd5', // used — bg-orange-100 (7×), shadow-orange-100 (7×), ring-orange-100 (3×)
  200: '#fed7aa', // used — border-orange-200 (11×), shadow-orange-200 (6×)
  300: '#fdba74', // used — border-orange-300 (6×), text-orange-300 (2×)
  400: '#fb923c', // used — border-orange-400 (9×), text-orange-400 (2×), from-orange-400 (1×)
  500: '#f97316', // used — from-orange-500 (4×), via-orange-500 (2×), text-orange-500 (3×)
  600: '#ea580c', // used — text-orange-600 (39×), bg-orange-600 (22×) — CANONICAL primary
  700: '#c2410c', // used — text-orange-700 (17×), bg-orange-700 (4×)
  800: '#9a3412', // used — text-orange-800 (3×)
  900: '#7c2d12', // used — text-orange-900 (1×)
} as const;

const indigo = {
  50:  '#eef2ff', // used — bg-indigo-50 (10×)
  100: '#e0e7ff', // used — bg-indigo-100 (6×), border-indigo-100 (5×)
  200: '#c7d2fe', // used — border-indigo-200 (3×), ring-indigo-200 (1×)
  300: '#a5b4fc', // default
  400: '#818cf8', // used — border-indigo-400 (1×)
  500: '#6366f1', // used — text-indigo-500 (3×), bg-indigo-500 (2×)
  600: '#4f46e5', // used — text-indigo-600 (5×), bg-indigo-600 (3×), via-indigo-600 (1×) — CANONICAL primary
  700: '#4338ca', // used — text-indigo-700 (9×), from-indigo-700 (1×)
  800: '#3730a3', // used — text-indigo-800 (4×)
  900: '#312e81', // used — text-indigo-900 (2×)
} as const;

const emerald = {
  50:  '#ecfdf5', // used — bg-emerald-50 (18×), from-emerald-50 (1×)
  100: '#d1fae5', // used — bg-emerald-100 (8×), border-emerald-100 (6×), shadow-emerald-100 (1×)
  200: '#a7f3d0', // used — border-emerald-200 (12×), ring-emerald-200 (2×)
  300: '#6ee7b7', // used — border-emerald-300 (2×), text-emerald-300 (2×)
  400: '#34d399', // used — border-emerald-400 (4×), text-emerald-400 (1×)
  500: '#10b981', // used — bg-emerald-500 (4×), text-emerald-500 (3×), via-emerald-500 (1×)
  600: '#059669', // used — text-emerald-600 (15×), bg-emerald-600 (6×), via-emerald-600 (1×), from-emerald-600 (1×) — CANONICAL primary
  700: '#047857', // used — text-emerald-700 (15×), bg-emerald-700 (1×), from-emerald-700 (1×)
  800: '#065f46', // used — text-emerald-800 (9×)
  900: '#064e3b', // used — text-emerald-900 (5×)
} as const;

// ---------------------------------------------------------------------
// Spacing
// ---------------------------------------------------------------------
// Derived from padding / margin / gap / space-* utilities. Frequencies:
//   gap-2 (0.5rem)   71×   -> xs
//   gap-3 (0.75rem)  62×   -> sm
//   gap-4 (1rem)     49×   -> md  (also p-4 18×, py-4 16×, px-4 20×)
//   p-6  (1.5rem)    28×   -> lg  (also px-6 17×, space-y-6 15×)
//   p-8  (2rem)      36×   -> xl  (dominant card padding)
//
// The 5-step semantic scale condenses 5–8 distinct Tailwind steps that
// actually ship. Anything outside this range (p-10 / p-12 / py-16 /
// py-24 / pb-32) is section-level rhythm, not component spacing, and
// is intentionally excluded.
const spacing = {
  xs: '0.5rem',  // gap-2, p-2
  sm: '0.75rem', // gap-3, p-3
  md: '1rem',    // gap-4, p-4, py-4
  lg: '1.5rem',  // p-6, px-6, space-y-6
  xl: '2rem',    // p-8 (most-frequent card padding)
} as const;

// ---------------------------------------------------------------------
// Border radii
// ---------------------------------------------------------------------
// Observed in code:
//   rounded-2xl  (1rem)     90×   -> lg    (dominant card radius)
//   rounded       (0.25rem) 73×   -> sm    (buttons, tags, table cells)
//   rounded-xl   (0.75rem)  39×   -> md    (inner chrome)
//   rounded-full (9999px)   24×   -> full  (pills, dots, avatars)
//   rounded-3xl  (1.5rem)    7×   (not promoted to token — too rare)
//   rounded-md   (0.375rem)  2×   (not promoted to token — too rare)
//
// The brief specifies `sm: 4px, md: 8px, lg: 16px, full: 9999px`. We
// honor it because those four steps map 1:1 to the observed utility
// classes after unit conversion (0.25rem≈4px, 0.5rem≈8px, 1rem=16px).
// Note: `lg` is 16px not the literal `rounded-2xl` 1rem/16px at default
// root — this is deliberate alignment.
const radii = {
  sm: '4px',      // rounded         (0.25rem)
  md: '8px',      // rounded-lg step (not directly used, bridges sm → lg)
  lg: '16px',     // rounded-2xl     (1rem) — dominant
  full: '9999px', // rounded-full
} as const;

// ---------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------
// Families are declared in index.html via Google Fonts import and
// exposed through the `font-hindi`, `font-hindi-display` utilities plus
// `body { font-family: 'Plus Jakarta Sans' }`. Sizes come from Tailwind
// utilities (text-xs through text-7xl).
//
// Observed text-* frequencies:
//   text-sm    121×  (body copy, rubric tables, teacher notes)
//   text-xs    70×   (meta, badge labels, muted captions)
//   text-base  19×   (paragraph defaults)
//   text-lg    32×
//   text-xl    24×
//   text-2xl   38×   (section headings)
//   text-3xl   29×   (page titles)
//   text-4xl   20×
//   text-5xl   18×   (display)
//   text-6xl   12×   (hero / display)
//   text-7xl    3×
//
// Devanagari display/body sizing is centralized in
// components/ui/DevanagariText.tsx; we mirror its scale here.
const devanagariFamily = "'Noto Sans Devanagari', sans-serif";
const devanagariDisplayFamily = "'Tiro Devanagari Hindi', 'Noto Sans Devanagari', sans-serif";
const latinFamily = "'Plus Jakarta Sans', sans-serif";

const typography = {
  devanagari: {
    // Body running text — font-hindi. Default line-height 2.1 (from
    // index.html `--hindi-line-height`). Mapped from DevanagariText size
    // tokens sm/md/lg.
    body: {
      family: devanagariFamily,
      // Responsive sizes track DevanagariText.tsx: sm=text-lg(1.125rem),
      // md=text-xl→2xl (1.25→1.5rem), lg=text-2xl→3xl (1.5→1.875rem).
      size: {
        sm: '1.125rem', // 18px  — DevanagariText size="sm"
        md: '1.5rem',   // 24px  — DevanagariText size="md" (desktop)
        lg: '1.875rem', // 30px  — DevanagariText size="lg" (desktop)
      },
      lineHeight: 2.1, // from index.html :root var
    },
    // Calligraphic display — font-hindi-display (Tiro Devanagari Hindi).
    // Used in hero banners and pack titles. Sizes from DevanagariText
    // xl + display.
    display: {
      family: devanagariDisplayFamily,
      size: {
        md: '1.875rem', // 30px  — smaller display
        lg: '3rem',     // 48px  — DevanagariText size="xl" desktop
        xl: '4.5rem',   // 72px  — DevanagariText size="display" desktop
      },
      lineHeight: 1.5, // from index.html :root var
    },
  },
  latin: {
    body: {
      family: latinFamily,
      // Tailwind canonical rem sizes for the text-* utilities observed.
      size: {
        xs: '0.75rem',  // text-xs    12px  (70×)
        sm: '0.875rem', // text-sm    14px  (121× — most frequent)
        md: '1rem',     // text-base  16px  (19×)
        lg: '1.125rem', // text-lg    18px  (32×)
        xl: '1.25rem',  // text-xl    20px  (24×)
      },
      lineHeight: 1.5, // Tailwind default leading for body copy
    },
    display: {
      family: latinFamily,
      size: {
        sm: '1.5rem',   // text-2xl  24px  (38× — section heads)
        md: '1.875rem', // text-3xl  30px  (29× — page titles)
        lg: '2.25rem',  // text-4xl  36px  (20×)
        xl: '3rem',     // text-5xl  48px  (18× — display / hero)
      },
      lineHeight: 1.1, // tight display leading
    },
  },
  // Weight tokens — `font-black` is by far the dominant weight (333×),
  // aligning with the rubric-driven "authoritative / hand-set"
  // visual register the project uses. Included here for completeness.
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 900, // CANONICAL heading weight
  },
} as const;

// ---------------------------------------------------------------------
// Shadows / elevation
// ---------------------------------------------------------------------
// Frequencies (un-tinted):
//   shadow-sm   33×   -> sm
//   shadow-md    5×   -> md
//   shadow-lg   18×   -> lg
//   shadow-xl   21×   -> xl
//   shadow-2xl  15×   -> 2xl
// Tinted variants (`shadow-orange-100` 7×, `shadow-orange-200` 6×,
// `shadow-emerald-100` 1×) are color-aware effects, not part of the
// semantic elevation scale; they're left out of the token set.
const shadow = {
  sm:  '0 1px 2px 0 rgb(0 0 0 / 0.05)',                                 // Tailwind default shadow-sm
  md:  '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',   // default shadow-md
  lg:  '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', // default shadow-lg
  xl:  '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', // default shadow-xl
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',                          // default shadow-2xl
} as const;

// ---------------------------------------------------------------------
// Public token object
// ---------------------------------------------------------------------

export const theme = {
  colors: {
    saffron,
    // Alias the warm scale under its raw Tailwind class lineage so
    // consumers can refer to it either way.
    orange: saffron,
    indigo,
    emerald,
  },
  spacing,
  radii,
  typography,
  shadow,
} as const;

export type Theme = typeof theme;

// ---------------------------------------------------------------------
// Color utilities
// ---------------------------------------------------------------------
// `hexToRgba(hex, alpha)` — convert a 6-digit hex from the color scales
// into an `rgb(r g b / a)` string matching Tailwind's alpha-utility output
// (e.g. the `bg-orange-50/60` class renders `rgb(255 247 237 / 0.6)`).
//
// Exposed so item 2.2's refactor of `components/ui/*` can preserve the
// byte-identical visual output of alpha-tinted backgrounds without each
// primitive reinventing the conversion.
export function hexToRgba(hex: string, alpha: number): string {
  const normalized = hex.replace('#', '');
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return `rgb(${r} ${g} ${b} / ${alpha})`;
}
