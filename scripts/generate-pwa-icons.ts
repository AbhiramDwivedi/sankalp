// Sankalp brand-icon generator.
// ------------------------------------------------------------------
// Renders every committed PNG favicon / app-icon from a single
// canonical recipe: the Devanagari brand mark "सं" centred on a
// rounded saffron square (#d97706, the app's primary colour). The
// mark mirrors the in-app navbar logo (`components/navbar.tsx`).
//
// Outputs (all in `public/`):
//   - icon-light-32x32.png   (browser tab, light scheme)
//   - icon-dark-32x32.png    (browser tab, dark scheme — same mark,
//                             white-on-orange reads on either theme)
//   - apple-icon.png         (180x180, iOS touch icon)
//   - icon-192.png           (PWA manifest)
//   - icon-512.png           (PWA manifest, maskable)
//
// `public/icon.svg` is hand-authored; this script only writes PNGs.
// Headless Chromium (Playwright, already a devDep) does the raster
// pass so we add zero runtime dependencies and the output is stable
// across machines given the same recipe.
//
// Regenerate with:  `npx tsx scripts/generate-pwa-icons.ts`
// ------------------------------------------------------------------

import { chromium } from 'playwright';
import { writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = resolve(__dirname, '..', 'public');

// Saffron-orange = the app's `--primary` token (`#d97706`). We render
// a flat fill for the small light/dark tab icons (so they stay legible
// at 32px) and the same hue with a soft radial highlight for the
// larger 180/192/512 surfaces where a touch of depth reads well.
const BRAND_ORANGE = '#d97706';
const BRAND_ORANGE_HIGHLIGHT = '#fb923c';
const BRAND_ORANGE_SHADOW = '#9a3412';

// The brand glyph. Using web-safe Devanagari fallbacks because the
// renderer is one-shot headless Chromium without our `next/font`
// loader; Mangal ships with Windows, Noto Sans Devanagari is on most
// Linux/macOS images, and the generic sans-serif fallback still
// produces a recognisable "सं" via system Unicode coverage.
const BRAND_FONT_STACK =
  "'Noto Sans Devanagari', 'Mangal', 'Nirmala UI', 'Arial Unicode MS', sans-serif";

type IconRecipe = {
  /** Output filename inside `public/`. */
  file: string;
  /** Pixel dimension (square). */
  size: number;
  /** Flat fill or gradient. Flat reads better at small sizes. */
  surface: 'flat' | 'gradient';
  /** Corner radius as a fraction of `size`. */
  radiusRatio: number;
  /** Glyph height as a fraction of `size`. */
  glyphRatio: number;
};

const RECIPES: IconRecipe[] = [
  { file: 'icon-light-32x32.png', size: 32, surface: 'flat', radiusRatio: 0.22, glyphRatio: 0.72 },
  { file: 'icon-dark-32x32.png', size: 32, surface: 'flat', radiusRatio: 0.22, glyphRatio: 0.72 },
  { file: 'apple-icon.png', size: 180, surface: 'gradient', radiusRatio: 0.22, glyphRatio: 0.62 },
  { file: 'icon-192.png', size: 192, surface: 'gradient', radiusRatio: 0.2, glyphRatio: 0.62 },
  { file: 'icon-512.png', size: 512, surface: 'gradient', radiusRatio: 0.18, glyphRatio: 0.62 },
];

function background(surface: IconRecipe['surface']): string {
  if (surface === 'flat') return BRAND_ORANGE;
  return `radial-gradient(circle at 30% 25%, ${BRAND_ORANGE_HIGHLIGHT} 0%, ${BRAND_ORANGE} 60%, ${BRAND_ORANGE_SHADOW} 100%)`;
}

function pageHtml(recipe: IconRecipe): string {
  const { size, surface, radiusRatio, glyphRatio } = recipe;
  const radius = Math.round(size * radiusRatio);
  // The visual centre of "सं" sits a touch above the typographic
  // baseline; nudge upward by 4% so the mark looks centred to the eye.
  const fontSize = Math.round(size * glyphRatio);
  const verticalOffset = Math.round(size * -0.04);
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<style>
  html, body { margin: 0; padding: 0; background: transparent; }
  .icon {
    width: ${size}px;
    height: ${size}px;
    background: ${background(surface)};
    border-radius: ${radius}px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }
  .glyph {
    color: #ffffff;
    font-family: ${BRAND_FONT_STACK};
    font-weight: 700;
    font-size: ${fontSize}px;
    line-height: 1;
    transform: translateY(${verticalOffset}px);
    user-select: none;
  }
</style>
</head>
<body>
  <div class="icon"><span class="glyph">&#x0938;&#x0902;</span></div>
</body>
</html>`;
}

async function renderRecipe(recipe: IconRecipe): Promise<void> {
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({
      viewport: { width: recipe.size, height: recipe.size },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    await page.setContent(pageHtml(recipe), { waitUntil: 'load' });
    // Give web-fonts (system Devanagari) a tick to settle. Chromium
    // resolves system fonts synchronously, but a 50ms breath keeps the
    // first run on a cold profile from race-condition glitches.
    await page.waitForTimeout(50);
    const element = page.locator('.icon');
    const buffer = await element.screenshot({ omitBackground: false, type: 'png' });
    const outPath = resolve(PUBLIC_DIR, recipe.file);
    await writeFile(outPath, buffer);
    process.stdout.write(`wrote ${outPath} (${recipe.size}x${recipe.size})\n`);
  } finally {
    await browser.close();
  }
}

async function main(): Promise<void> {
  await mkdir(PUBLIC_DIR, { recursive: true });
  for (const recipe of RECIPES) {
    await renderRecipe(recipe);
  }
}

main().catch((err: unknown) => {
  process.stderr.write(`${err instanceof Error ? err.stack ?? err.message : String(err)}\n`);
  process.exit(1);
});
