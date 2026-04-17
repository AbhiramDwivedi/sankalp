// Drive the full onboarding flow and capture every step, then land on
// /plan and capture that too. Aim: find where the user got stuck.

import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const BASE = 'http://localhost:3002';
const outDir = resolve('scripts/dev-shots');
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));

const shoot = async (label, fullPage = false) => {
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  const p = resolve(outDir, `flow-${label}-${ts}.png`);
  await page.screenshot({ path: p, fullPage });
  console.log(label, '→', p);
  return p;
};

// Start fresh
await page.goto(`${BASE}/`);
await page.evaluate(() => localStorage.clear());
await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });

await shoot('01-landing');

// Click Start a student
await page.locator('button:has-text("Start a student")').first().click();
await page.waitForTimeout(400);
await shoot('02-onboard-step1');

// Step 1: fill name → Continue
await page.locator('input[type="text"]').first().fill('Test');
await page.locator('button:has-text("Continue")').click();
await page.waitForTimeout(400);
await shoot('03-onboard-step2');

// Step 2: pick a level (first radio) → Continue
await page.locator('input[type="radio"]').first().click({ force: true });
await page.waitForTimeout(150);
await page.locator('button:has-text("Continue")').click();
await page.waitForTimeout(400);
await shoot('04-onboard-step3');

// Step 3: click "Start this plan"
try {
  const startBtn = page.locator('button:has-text("Start this plan")');
  const visible = await startBtn.isVisible().catch(() => false);
  console.log('Step 3 submit btn visible:', visible);
  if (visible) {
    await startBtn.click();
  } else {
    // fallback
    await page.locator('button[type="submit"]').click();
  }
  await page.waitForTimeout(700);
} catch (e) {
  console.log('could not complete step 3:', String(e));
}
await shoot('05-after-onboarding', true);

// Try to reach the Plan tab. App uses internal state, not URL routes;
// so click the sidebar nav link.
try {
  const planLink = page.locator('nav button:has-text("Plan"), nav a:has-text("Plan"), button:has-text("My plan")').first();
  const ok = await planLink.isVisible({ timeout: 1500 }).catch(() => false);
  console.log('Plan nav visible:', ok);
  if (ok) {
    await planLink.click();
    await page.waitForTimeout(500);
  }
} catch (e) {
  console.log('plan nav click failed:', String(e));
}
await shoot('06-plan-tab', true);

// Additional diagnostic probe of the plan page:
const diag = await page.evaluate(() => {
  return {
    url: location.href,
    scrollable: document.documentElement.scrollHeight > innerHeight,
    docHeight: document.documentElement.scrollHeight,
    bodyPE: getComputedStyle(document.body).pointerEvents,
    htmlPE: getComputedStyle(document.documentElement).pointerEvents,
    overlays: [...document.querySelectorAll('*')]
      .filter((el) => {
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        const z = parseInt(cs.zIndex, 10);
        return (
          !Number.isNaN(z) &&
          z >= 50 &&
          cs.position === 'fixed' &&
          r.width > innerWidth * 0.4 &&
          r.height > innerHeight * 0.4
        );
      })
      .map((el) => ({
        tag: el.tagName,
        classes: el.className?.toString().slice(0, 120) || '',
        z: getComputedStyle(el).zIndex,
      })),
    visibleButtons: [...document.querySelectorAll('button')]
      .filter((b) => {
        const r = b.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && r.top < innerHeight && r.bottom > 0;
      })
      .map((b) => (b.textContent || '').trim().slice(0, 60))
      .slice(0, 30),
  };
});

console.log('\n=== Plan page diagnostic ===');
console.log(JSON.stringify(diag, null, 2));

if (errors.length) {
  console.log('\n=== Page errors ===');
  errors.slice(0, 10).forEach((e) => console.log('-', e.slice(0, 500)));
}

await browser.close();
