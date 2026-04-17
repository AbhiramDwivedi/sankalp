import { test, expect, type Page } from '@playwright/test';

/**
 * Print visual regression — backlog item 0.3.
 *
 * APPROACH: Option B (Playwright built-in `toHaveScreenshot`). Zero new deps.
 * Rationale: the brief explicitly prefers Option B when feasible. Playwright's
 * native screenshot diffing handles the whole loop — emulate print media,
 * capture, pixel-diff at a configurable threshold, store goldens on disk. The
 * Option A PDF path would add three deps (pdf-to-png-converter, pixelmatch,
 * pngjs) for the same outcome.
 *
 * Goldens: tests/visual/__snapshots__/print.visual.ts/<name>.png
 * Regenerate: npx playwright test --config=playwright.visual.config.ts --update-snapshots
 * (Only after an INTENTIONAL change to print layout in index.html.)
 *
 * The spec filename ends in `.visual.ts` (not `.spec.ts`) so Playwright's
 * default testMatch in the smoke config does NOT pick it up. The visual
 * config overrides testMatch explicitly.
 *
 * The three captured views:
 *   1. Pack print — L1-12 restaurants (documented quality anchor)
 *   2. Capstone print — C01 (core tier, mock-exam-grade anchor)
 *   3. Flashcard 8-up — first deck's front sheet + back sheet
 *
 * Selectors and onboarding flow are copied from tests/smoke.spec.ts rather
 * than extracted into a shared helper — the brief prefers copy-paste here to
 * keep smoke tests untouched.
 */

const BASE = 'http://localhost:3000';

// Allow a 2% pixel ratio difference to absorb minor font-rendering drift.
const MAX_DIFF_PIXEL_RATIO = 0.02;

async function gotoClean(page: Page) {
  await page.goto(BASE);
  await page.evaluate(() => {
    try {
      window.localStorage.clear();
    } catch {}
  });
  await page.reload();
}

async function clickSidebarTab(page: Page, label: string) {
  await page.getByRole('button', { name: label, exact: true }).first().click();
}

async function submitOnboardingStep(page: Page) {
  const submit = page.getByRole('button', { name: /continue|start this plan/i });
  await submit.scrollIntoViewIfNeeded();
  await submit.click();
}

async function onboardStudent(page: Page, name = 'Visual Tester') {
  await page
    .getByRole('button', { name: /start a student|begin|add student/i })
    .first()
    .click();

  const nameInput = page.getByPlaceholder('e.g. Aarav');
  await expect(nameInput).toBeVisible();
  await nameInput.fill(name);
  await submitOnboardingStep(page);

  await expect(page.getByRole('heading', { name: 'Current Level' })).toBeVisible();
  await submitOnboardingStep(page);

  await expect(page.getByRole('heading', { name: 'Your Plan' })).toBeVisible();
  await submitOnboardingStep(page);

  await expect(page.getByRole('heading', { name: 'How this works' })).toBeVisible({
    timeout: 10_000,
  });
  const openLibraryBtn = page.getByRole('button', { name: /open the library/i });
  await openLibraryBtn.scrollIntoViewIfNeeded();
  await openLibraryBtn.click();
}

/**
 * Wait for web fonts to settle before capturing. Print CSS relies on Noto Sans
 * Devanagari and Tiro Devanagari Hindi — without this wait the first screenshot
 * can capture fallback fonts and the second gets the loaded fonts.
 */
async function settlePage(page: Page) {
  await page.evaluate(async () => {
    // @ts-ignore — document.fonts is standard but not always in TS lib for this target.
    if (document.fonts && document.fonts.ready) {
      // @ts-ignore
      await document.fonts.ready;
    }
  });
  // Small settle after any layout shift from font loading.
  await page.waitForTimeout(300);
}

test.describe('Print visual regression', () => {
  test('pack print view — L1-12 restaurants', async ({ page }) => {
    await gotoClean(page);
    await onboardStudent(page, 'Pack Print');

    await clickSidebarTab(page, 'Library');
    await expect(page.getByRole('heading', { name: /26 reading packs/i })).toBeVisible();

    const packCard = page.getByRole('button', { name: /restaurants.*food/i }).first();
    await packCard.scrollIntoViewIfNeeded();
    await packCard.click();

    // Confirm we are inside the pack overlay before switching to print media.
    await expect(page.getByRole('button', { name: /back to library/i })).toBeVisible();

    await page.emulateMedia({ media: 'print' });
    await settlePage(page);

    await expect(page).toHaveScreenshot('pack-L1-12-print.png', {
      fullPage: true,
      maxDiffPixelRatio: MAX_DIFF_PIXEL_RATIO,
      timeout: 30_000,
      animations: 'disabled',
    });
  });

  test('capstone print view — C01', async ({ page }) => {
    await gotoClean(page);
    await onboardStudent(page, 'Capstone Print');

    await clickSidebarTab(page, 'Capstones');
    await expect(page.getByRole('heading', { name: 'Cross-topic essays' })).toBeVisible();

    const c01Card = page.getByRole('button').filter({ hasText: /\bC01\b/ }).first();
    await c01Card.scrollIntoViewIfNeeded();
    await c01Card.click();

    await expect(page.getByRole('button', { name: /back to capstones/i })).toBeVisible({
      timeout: 10_000,
    });

    await page.emulateMedia({ media: 'print' });
    await settlePage(page);

    await expect(page).toHaveScreenshot('capstone-C01-print.png', {
      fullPage: true,
      maxDiffPixelRatio: MAX_DIFF_PIXEL_RATIO,
      timeout: 30_000,
      animations: 'disabled',
    });
  });

  test('flashcard 8-up duplex sheet — front + back', async ({ page }) => {
    await gotoClean(page);
    await onboardStudent(page, 'Deck Print');

    await clickSidebarTab(page, 'Flashcards');
    await expect(page.getByRole('heading', { name: 'Drill before the exam' })).toBeVisible();

    const firstDeck = page.getByRole('button').filter({ hasText: /\d+\s*cards/i }).first();
    await firstDeck.scrollIntoViewIfNeeded();
    await firstDeck.click();

    await expect(page.getByRole('button', { name: /back to decks/i })).toBeVisible();

    // Switch to print media — PrintSheet is gated on `print:block`, so only
    // now does it render the 8-up layout. The DeckRunner itself is hidden by
    // the `no-print` class on its toolbar.
    await page.emulateMedia({ media: 'print' });
    await settlePage(page);

    // Scope to just the first sheet's front (page 1) and back (page 2).
    // Capturing every page would produce a 30k-pixel-tall screenshot that
    // flips on any deck-content change downstream of page 2 — narrower scope
    // keeps the golden focused on the 8-up LAYOUT regression, not content
    // drift. The two captures together represent the duplex-aligned pair.
    const sheetPages = page.locator('.print-only > div');
    await expect(sheetPages.first()).toBeVisible();

    await expect(sheetPages.nth(0)).toHaveScreenshot('flashcard-sheet-front.png', {
      maxDiffPixelRatio: MAX_DIFF_PIXEL_RATIO,
      timeout: 30_000,
      animations: 'disabled',
    });
    await expect(sheetPages.nth(1)).toHaveScreenshot('flashcard-sheet-back.png', {
      maxDiffPixelRatio: MAX_DIFF_PIXEL_RATIO,
      timeout: 30_000,
      animations: 'disabled',
    });
  });
});
