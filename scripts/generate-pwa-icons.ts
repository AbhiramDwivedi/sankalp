// PWA icon generator.
// ------------------------------------------------------------------
// Renders `public/icon-512.png` and `public/icon-192.png` by rasterizing
// the namaste motif atop a saffron gradient using headless Chromium
// (Playwright, already a devDep). The output is stable and pixel-exact
// given the same source motif, so the PNGs can be committed.
//
// Regenerate with:  `npx tsx scripts/generate-pwa-icons.ts`
// ------------------------------------------------------------------

import { chromium } from 'playwright';
import { writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = resolve(__dirname, '..', 'public');

// The motif body is copied (not imported) because motifs.tsx is a TSX React
// file that lives in the Vite client graph. Keeping a vendored copy here
// means this generator has no runtime React dependency. If the motif
// changes, update the path strings below and regenerate.
const NAMASTE_SVG = `
<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" aria-hidden>
  <circle cx="120" cy="180" r="50" fill="#ffffff" opacity="0.18" />
  <path d="M100 200 L100 120 Q100 100 112 90 L120 84 L128 90 Q140 100 140 120 L140 200 Z" fill="#ffffff" />
  <line x1="120" y1="90" x2="120" y2="200" stroke="rgba(255,255,255,0.65)" stroke-width="2" />
  <circle cx="112" cy="80" r="5" fill="rgba(255,255,255,0.65)" />
  <circle cx="128" cy="80" r="5" fill="rgba(255,255,255,0.65)" />
  <path d="M70 70 Q120 60 170 70" fill="none" stroke="rgba(255,255,255,0.65)" stroke-width="2" stroke-dasharray="3 3" />
</svg>
`;

function pageHtml(size: number): string {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<style>
  html, body { margin: 0; padding: 0; background: transparent; }
  .icon {
    width: ${size}px;
    height: ${size}px;
    background: radial-gradient(circle at 30% 25%, #fb923c 0%, #ea580c 60%, #9a3412 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${Math.round(size * 0.18)}px;
    box-sizing: border-box;
  }
  .icon svg {
    width: ${Math.round(size * 0.72)}px;
    height: ${Math.round(size * 0.72)}px;
  }
</style>
</head>
<body>
  <div class="icon">${NAMASTE_SVG}</div>
</body>
</html>`;
}

async function renderIcon(size: number, outPath: string): Promise<void> {
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({
      viewport: { width: size, height: size },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    await page.setContent(pageHtml(size), { waitUntil: 'load' });
    const element = page.locator('.icon');
    const buffer = await element.screenshot({ omitBackground: false, type: 'png' });
    await writeFile(outPath, buffer);
    process.stdout.write(`wrote ${outPath} (${size}x${size})\n`);
  } finally {
    await browser.close();
  }
}

async function main(): Promise<void> {
  await mkdir(PUBLIC_DIR, { recursive: true });
  await renderIcon(512, resolve(PUBLIC_DIR, 'icon-512.png'));
  await renderIcon(192, resolve(PUBLIC_DIR, 'icon-192.png'));
}

main().catch((err: unknown) => {
  process.stderr.write(`${err instanceof Error ? err.stack ?? err.message : String(err)}\n`);
  process.exit(1);
});
