import { test, expect, type Page } from '@playwright/test';

/**
 * Visual regression — Next.js 16 App Router rewrite (Phase 4).
 *
 * We capture a small, stable set of screenshots for the screen media (not
 * print) so the golden set is resilient. The Vite-era print goldens were
 * lost to the shell swap: the CSS is still there but the rendering stack
 * (Next.js hydration timing + shadcn primitives) produces enough pixel
 * drift vs. the old Vite output that reusing them would flag as a
 * regression on every run.
 *
 * Captured surfaces — each is a stable, mostly-static catalog page where
 * hydration races don't flip the screenshot:
 *   1. Landing page
 *   2. /lessons (26-pack catalog)
 *   3. /capstones (10-capstone catalog)
 *   4. /rubric (reference page)
 *   5. /plan (study-plan page — requires profile)
 *
 * Interactive pages (DeckRunner, TopicPackView body with its tab state) are
 * out of scope — too much motion to snapshot reliably.
 *
 * Re-baseline with:
 *   npx playwright test --config=playwright.visual.config.ts --update-snapshots
 *
 * Threshold is 2% pixel drift, matching the Vite-era budget. Any larger
 * change needs a conscious --update-snapshots pass.
 */

const BASE = 'http://localhost:3000';
const MAX_DIFF_PIXEL_RATIO = 0.02;

test.beforeEach(async ({ page }) => {
  await page.goto(BASE);
  await page.evaluate(() => {
    try {
      window.localStorage.clear();
      window.sessionStorage.clear();
    } catch {}
  });
});

async function submitOnboardingStep(page: Page) {
  await page.getByRole('button', { name: /^continue$/i }).click();
}

async function onboard(page: Page, name = 'Visual Tester') {
  await page.goto(`${BASE}/onboarding?role=student`);
  await page.getByLabel(/your name/i).first().fill(name);
  await submitOnboardingStep(page);
  await expect(page.getByRole('radiogroup', { name: /proficiency level/i })).toBeVisible();
  await submitOnboardingStep(page);
  await page.getByRole('button', { name: /^start$/i }).click();
  await page.waitForURL(`${BASE}/dashboard`);
}

/**
 * Wait for fonts to settle. Next.js `next/font` inlines the font-face rules
 * into the HTML, but Noto / Tiro Devanagari still need the WOFF roundtrip
 * and an FCP settle tick before pixels are stable.
 */
async function settle(page: Page) {
  await page.evaluate(async () => {
    // @ts-ignore — document.fonts is standard.
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
  });
  await page.waitForTimeout(300);
}

test.describe('Visual regression (screen media)', () => {
  test('landing page', async ({ page }) => {
    await page.goto(BASE);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await settle(page);
    await expect(page).toHaveScreenshot('landing.png', {
      fullPage: true,
      maxDiffPixelRatio: MAX_DIFF_PIXEL_RATIO,
      animations: 'disabled',
      timeout: 30_000,
    });
  });

  test('lessons catalog', async ({ page }) => {
    await onboard(page);
    await page.goto(`${BASE}/lessons`);
    await expect(
      page.getByRole('heading', { level: 1, name: /26 reading packs/i }),
    ).toBeVisible();
    await settle(page);
    await expect(page).toHaveScreenshot('lessons.png', {
      fullPage: true,
      maxDiffPixelRatio: MAX_DIFF_PIXEL_RATIO,
      animations: 'disabled',
      timeout: 30_000,
    });
  });

  test('capstones catalog', async ({ page }) => {
    await onboard(page);
    await page.goto(`${BASE}/capstones`);
    await expect(
      page.getByRole('heading', { level: 1, name: /cross-topic essays/i }),
    ).toBeVisible();
    await settle(page);
    await expect(page).toHaveScreenshot('capstones.png', {
      fullPage: true,
      maxDiffPixelRatio: MAX_DIFF_PIXEL_RATIO,
      animations: 'disabled',
      timeout: 30_000,
    });
  });

  test('rubric', async ({ page }) => {
    await onboard(page);
    await page.goto(`${BASE}/rubric`);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await settle(page);
    await expect(page).toHaveScreenshot('rubric.png', {
      fullPage: true,
      maxDiffPixelRatio: MAX_DIFF_PIXEL_RATIO,
      animations: 'disabled',
      timeout: 30_000,
    });
  });

  test('plan', async ({ page }) => {
    await onboard(page);
    await page.goto(`${BASE}/plan`);
    await expect(
      page.getByRole('heading', { level: 1, name: /how to use this library/i }),
    ).toBeVisible();
    await settle(page);
    await expect(page).toHaveScreenshot('plan.png', {
      fullPage: true,
      maxDiffPixelRatio: MAX_DIFF_PIXEL_RATIO,
      animations: 'disabled',
      timeout: 30_000,
    });
  });
});
