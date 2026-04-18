# Accessibility Audit — backlog 2.3

Auditor: axe-core 4.11 via `@axe-core/playwright`
Tag set: `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`
Hard gate: **0 critical + 0 serious** on the surfaces listed below.

Run: `npm run a11y` (kept out of the default `npm run check` to keep that gate fast).

## Result summary

| Surface              | Before (critical / serious) | After (critical / serious) |
| -------------------- | --------------------------- | -------------------------- |
| Landing page         | 0 / 1 (4 nodes)             | 0 / 0                      |
| Dashboard            | 0 / 1 (15 nodes)            | 0 / 0                      |
| Library              | 0 / 1 (45 nodes)            | 0 / 0                      |
| Topic pack view      | 0 / 2 (15 nodes)            | 0 / 0                      |
| Capstone view        | 0 / 2 (14 nodes)            | 0 / 0                      |
| Deck runner          | 0 / 2 (9 nodes)             | 0 / 0                      |
| **Total violations** | **9 violation classes**     | **0**                      |

## Issues found and how they were fixed

### Color contrast (WCAG 1.4.3, Level AA)

The bulk of the audit's findings. Affected the entire set of small uppercase
tracking labels (`text-[10px] font-black tracking-[0.3em]`), the brand
saffron-600 button background with white text, and several emerald-600 affordances.

- **`text-slate-400` on white surfaces** (~63 instances across 20 files) — bumped to `text-slate-500` (#64748b → 4.84:1 vs white). Contrast was 3.36:1 before.
- **`bg-orange-600` button surfaces** with `text-white` — bumped to `bg-orange-700` (the brand "saffron" still reads orange, deeper). Sidebar nav active state, primary CTAs, brand logo box. Contrast was 4.06:1; now 7.21:1.
- **`text-orange-600` small text** — bumped to `text-orange-700` everywhere (text/bg/hover variants). Visual change is minimal; identity preserved.
- **`text-emerald-600` and `bg-emerald-600`** — bumped to `-700` shades. Contrast was 3.55:1; now 5.46:1.
- **`text-slate-300` footers** in `TopicPackViewV2` and `CapstoneViewV2` (the "Student: ___ Date: ___" tear-off line on print) — bumped to `text-slate-500`. Was 2.49:1; now 4.84:1.
- **Dashboard "Cards due" empty state** — was `text-slate-500` with `opacity-80` wrapper; opacity dropped (it was decorative anyway) and text bumped to `text-slate-600` for safety.
- **Landing-page Stat sub-labels** (`L1 · L2 · L3 stretch` etc.) inside `bg-slate-900` hero card — these had become `text-slate-500` after the global slate-400→500 bump and dropped below threshold on dark; restored to `text-slate-400` (5.34:1 on slate-900).
- **Dashboard rubric tile description inside the dark `bg-slate-900` card** — same restoration, `text-slate-300` on dark.
- **Badge tone overrides** (e.g. `<Badge tone="slate" className="bg-white/10 text-white border-white/20" />`) — Tailwind's CSS source order made the `tone` classes win; appended `!` to the override classes so `!bg-white/10 !text-white` actually beats the tone defaults. Affected 6 files.

### `aria-progressbar-name` (WCAG 4.1.2, Level A)

- **`OverlayProgress`** — the thin progress strip rendered at the top of every full-screen overlay (pack/capstone/deck) had `role="progressbar"` without an accessible name. Added `aria-label={`${position}: ${pct}% complete`}` so screen readers announce e.g. "Pack 7 of 26: 27% complete".

### Decorative SVG and screen-reader hygiene

- **15 motif components** (`components/art/motifs.tsx`) — added a `<title>` element to each motif's `<svg>` (per the brief). Motifs remain `aria-hidden` because they always nest inside `PackHeroArt` / `CapstoneHeroArt`, which set `role="img"` + `aria-label` on the OUTER svg; the title element documents the motif and surfaces as a hover tooltip without double-announcing to assistive tech.
- **`OverlayProgress` decorative bullet** (`<span>•</span>`) — marked `aria-hidden="true"` and bumped to `text-slate-500` to keep it visible without screen-reader noise.

### Keyboard focus visibility (WCAG 2.4.7, Level AA)

Not an axe-flagged rule, but listed in the brief. Added focus-visible rings to:

- **`Layout.tsx`** sidebar nav buttons, "Switch student" CTA, mobile-nav nav buttons, and mobile "Switch student" button — `focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2`.
- **`LibraryView.TopicCard`**, **`CapstonesLibraryView.CapstoneCard`**, **`FlashcardsLibraryView.DeckCard`** — these are `<button>` elements styled as cards. Each got the same focus-visible ring + an `aria-label` (e.g. `Open pack: ${pack.titleEnglish}`) since the visible text inside the card is composed across multiple paragraphs.
- **`index.html`** — added a default `:focus-visible { outline: 2px solid #f97316; outline-offset: 2px; }` rule so any future interactive element gets a sane focus indicator out of the box. The rule is suppressed when a Tailwind `focus-visible:ring-*` class is already applied (so component-level styling wins).

### Reduced motion (WCAG 2.3.3, Level AAA — already partially implemented)

- **`Celebration.tsx`** — already scoped `prefers-reduced-motion` for its custom keyframes. Verified no regression.
- **`index.html`** — added a global `@media (prefers-reduced-motion: reduce)` block that drops all CSS transitions and animations to ~0ms. This catches the Tailwind-utility-driven animations (`animate-in`, `transition-all`, `transition-colors`, `hover:-translate-y-*`) sprinkled across the cards and tabs.

### Devanagari language tagging (WCAG 3.1.2, Level AA)

- **`ScriptText` (`components/ui/ScriptText.tsx`)** — already renders `lang="hi"` (resolved from `CURRICULUM.language.code` when the script matches the active curriculum). Verified the attribute lands on the actual DOM element via the `<As>` polymorphic render. No code change needed.

## Files changed

- `components/Layout.tsx` — focus-visible rings on sidebar / switch-student / mobile nav buttons; mobile-nav `aria-label`.
- `components/art/motifs.tsx` — `<title>` per motif.
- `components/ui/OverlayProgress.tsx` — `aria-label` on the progressbar; `aria-hidden` on the bullet; bullet color bump.
- `components/ui/Celebration.tsx`, `components/ui/NextUpCard.tsx`, `components/ui/Section.tsx` — color shade bumps.
- `components/pages/*.tsx` — color shade bumps + focus-visible/aria-label on card-as-button rows.
- `components/topic/*.tsx`, `components/capstone/*.tsx`, `components/flashcards/*.tsx` — color shade bumps; Badge tone override `!` prefixes.
- `index.html` — global `:focus-visible` and `prefers-reduced-motion` rules.
- `tests/a11y.spec.ts` — new axe-core spec.
- `playwright.config.ts` — `testIgnore` keeps a11y out of the default smoke run.
- `package.json` — `npm run a11y`; `@axe-core/playwright` devDep.

## Out of scope

- `moderate` and `minor` axe findings (a few empty `<h2>` heading flags inside SVG diagrams; not blocking).
- Visual-design intent — no components were rewritten; only shade choices were
  shifted to keep brand identity while passing AA contrast.
