// Capture screenshots of the running dev server for visual debugging.
//
// Usage:
//   node scripts/shoot.mjs                         # full-page at /
//   node scripts/shoot.mjs --path /#plan           # hash routes
//   node scripts/shoot.mjs --scroll 800            # scroll before shot
//   node scripts/shoot.mjs --click 'button:has-text("Start a student")'
//   node scripts/shoot.mjs --seed <json>           # inject localStorage
//   node scripts/shoot.mjs --label frozen          # output name prefix
//   node scripts/shoot.mjs --width 1280 --height 900
//   node scripts/shoot.mjs --diagnose              # probe why the page is "frozen"
//
// Output: scripts/dev-shots/<label>-<timestamp>.png + a sibling .json with
// basic page info (url, title, errors, click outcomes).

import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const args = process.argv.slice(2);
const opt = (name, dflt = null) => {
  const i = args.indexOf(`--${name}`);
  if (i < 0) return dflt;
  const v = args[i + 1];
  if (!v || v.startsWith('--')) return true;
  return v;
};

const BASE = opt('base', 'http://localhost:3002');
const PATH = opt('path', '/');
const WIDTH = parseInt(opt('width', '1440'), 10);
const HEIGHT = parseInt(opt('height', '900'), 10);
const SCROLL = parseInt(opt('scroll', '0'), 10);
const CLICK = opt('click', null);
const SEED = opt('seed', null); // JSON string like {"sankalpa_hindi_profiles":"[]"}
const CLEAR = opt('clear', false);
const LABEL = opt('label', 'shot');
const FULL_PAGE = !opt('viewport', false);
const DIAGNOSE = opt('diagnose', false);

const outDir = resolve('scripts/dev-shots');
mkdirSync(outDir, { recursive: true });
const ts = new Date().toISOString().replace(/[:.]/g, '-');
const pngPath = resolve(outDir, `${LABEL}-${ts}.png`);
const metaPath = resolve(outDir, `${LABEL}-${ts}.json`);

const consoleLog = [];
const errors = [];

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: WIDTH, height: HEIGHT } });
const page = await context.newPage();

page.on('console', (msg) => consoleLog.push(`[${msg.type()}] ${msg.text()}`));
page.on('pageerror', (e) => errors.push(String(e)));
page.on('requestfailed', (r) =>
  errors.push(`request failed: ${r.url()} — ${r.failure()?.errorText}`),
);

// 1. Navigate to root so we can seed localStorage before real load.
if (SEED || CLEAR) {
  await page.goto(`${BASE}/`);
  await page.evaluate(
    ({ seed, clear }) => {
      if (clear) localStorage.clear();
      if (seed) {
        const obj = JSON.parse(seed);
        for (const [k, v] of Object.entries(obj)) {
          localStorage.setItem(k, typeof v === 'string' ? v : JSON.stringify(v));
        }
      }
    },
    { seed: SEED, clear: CLEAR },
  );
}

await page.goto(`${BASE}${PATH}`, { waitUntil: 'networkidle' });

if (SCROLL) {
  await page.evaluate((y) => window.scrollTo(0, y), SCROLL);
  await page.waitForTimeout(300);
}

const clickResult = {};
if (CLICK) {
  try {
    await page.locator(CLICK).first().click({ timeout: 3000 });
    clickResult.clicked = CLICK;
    await page.waitForTimeout(500);
  } catch (e) {
    clickResult.clickError = String(e);
  }
}

// Diagnostic probe: for each common interactive element on the landing page,
// does it exist, is it visible, is it actually clickable?
let diagnostics = null;
if (DIAGNOSE) {
  diagnostics = await page.evaluate(() => {
    const probe = (label, selectorFn) => {
      const el = selectorFn();
      if (!el) return { label, found: false };
      const rect = el.getBoundingClientRect();
      const styles = getComputedStyle(el);
      // Hit-test: what element is at the center of this one's bbox?
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const topEl = document.elementFromPoint(cx, cy);
      return {
        label,
        found: true,
        visible: rect.width > 0 && rect.height > 0 && styles.visibility !== 'hidden' && styles.display !== 'none',
        rect: { x: rect.left, y: rect.top, w: rect.width, h: rect.height },
        inViewport: rect.top < innerHeight && rect.bottom > 0,
        pointerEvents: styles.pointerEvents,
        opacity: styles.opacity,
        zIndex: styles.zIndex,
        topElementAtCenter:
          topEl && topEl !== el
            ? `${topEl.tagName}.${topEl.className?.toString().slice(0, 80) || ''}`
            : 'self',
        isBlocked: topEl && topEl !== el && !el.contains(topEl),
      };
    };

    const findBtnByText = (txt) => {
      const lc = txt.toLowerCase();
      return [...document.querySelectorAll('button')].find((b) =>
        (b.textContent || '').toLowerCase().includes(lc),
      );
    };

    return {
      url: location.href,
      title: document.title,
      scrollY: window.scrollY,
      docHeight: document.documentElement.scrollHeight,
      viewport: { w: innerWidth, h: innerHeight },
      bodyPointerEvents: getComputedStyle(document.body).pointerEvents,
      bodyOverflow: getComputedStyle(document.body).overflow,
      htmlOverflow: getComputedStyle(document.documentElement).overflow,
      // Overlay detection — anything with z-index >= 50 covering most of viewport
      topOverlay: (() => {
        const all = [...document.querySelectorAll('*')].filter((el) => {
          const r = el.getBoundingClientRect();
          const cs = getComputedStyle(el);
          const z = parseInt(cs.zIndex, 10);
          return (
            !Number.isNaN(z) &&
            z >= 50 &&
            cs.position === 'fixed' &&
            r.width > innerWidth * 0.5 &&
            r.height > innerHeight * 0.5
          );
        });
        return all.slice(0, 5).map((el) => ({
          tag: el.tagName,
          classes: el.className?.toString().slice(0, 120) || '',
          z: getComputedStyle(el).zIndex,
          rect: el.getBoundingClientRect(),
        }));
      })(),
      probes: [
        probe('Start a student CTA', () => findBtnByText('start a student')),
        probe('Add student CTA (right card)', () => findBtnByText('add student')),
        probe('How this works CTA', () => findBtnByText('how this works')),
        probe('Begin CTA (no profiles)', () => findBtnByText('begin')),
      ],
    };
  });
}

await page.screenshot({ path: pngPath, fullPage: FULL_PAGE });

writeFileSync(
  metaPath,
  JSON.stringify(
    {
      url: `${BASE}${PATH}`,
      viewport: { WIDTH, HEIGHT },
      scroll: SCROLL,
      click: CLICK,
      clickResult,
      console: consoleLog,
      errors,
      diagnostics,
      png: pngPath,
    },
    null,
    2,
  ),
);

await browser.close();
console.log(pngPath);
if (errors.length) {
  console.log(`\n${errors.length} page errors:`);
  errors.slice(0, 5).forEach((e) => console.log('  - ' + e.slice(0, 300)));
}
if (diagnostics) {
  console.log('\nDiagnostics:');
  console.log(JSON.stringify(diagnostics, null, 2));
}
