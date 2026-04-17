import { test, expect, type Page } from '@playwright/test';

/**
 * Smoke suite — exercises each tab and the core overlay flows end-to-end.
 *
 * Selector strategy: prefer visible text and semantic roles. No data-testid
 * additions to app source. The app is client-only and persists state to
 * localStorage, so each test starts fresh via addInitScript + clear.
 */

const BASE = 'http://localhost:3000';

async function gotoClean(page: Page) {
  // Fresh navigation, then wipe any persisted profile. A subsequent reload
  // re-reads localStorage so we DO NOT use addInitScript here (that would
  // clear on every navigation, including page.reload()).
  await page.goto(BASE);
  await page.evaluate(() => {
    try {
      window.localStorage.clear();
    } catch {}
  });
  await page.reload();
}

/**
 * Click a sidebar tab by exact label. The sidebar button is unique once we
 * use exact match (other buttons on pages sometimes use the same label with
 * accessible-name variants like "Open library").
 */
async function clickSidebarTab(page: Page, label: string) {
  await page.getByRole('button', { name: label, exact: true }).first().click();
}

async function submitOnboardingStep(page: Page) {
  const submit = page.getByRole('button', { name: /continue|start this plan/i });
  await submit.scrollIntoViewIfNeeded();
  await submit.click();
}

async function onboardStudent(page: Page, name = 'Test Student') {
  // Hero CTA on the landing page opens onboarding.
  await page
    .getByRole('button', { name: /start a student|begin|add student/i })
    .first()
    .click();

  // Step 1: name.
  const nameInput = page.getByPlaceholder('e.g. Aarav');
  await expect(nameInput).toBeVisible();
  await nameInput.fill(name);
  await submitOnboardingStep(page);

  // Step 2: level (default Novice Low is pre-selected — just advance).
  await expect(page.getByRole('heading', { name: 'Current Level' })).toBeVisible();
  await submitOnboardingStep(page);

  // Step 3: plan summary. Submit to finish.
  await expect(page.getByRole('heading', { name: 'Your Plan' })).toBeVisible();
  await submitOnboardingStep(page);

  // First-run "How this works" explainer appears after onboarding. Dismiss it.
  await expect(page.getByRole('heading', { name: 'How this works' })).toBeVisible({
    timeout: 10_000,
  });
  const openLibraryBtn = page.getByRole('button', { name: /open the library/i });
  await openLibraryBtn.scrollIntoViewIfNeeded();
  await openLibraryBtn.click();
}

test.describe('App boot', () => {
  test('landing page renders without console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(`console.error: ${msg.text()}`);
    });

    await gotoClean(page);

    // Hero copy from LandingView.
    await expect(
      page.getByRole('heading', { name: /earn.*3 fcps world language credits/i }),
    ).toBeVisible();

    expect(errors, `Console/page errors: ${errors.join('\n')}`).toEqual([]);
  });
});

test.describe('Onboarding + tab navigation', () => {
  test('onboards a new student and lands on the dashboard', async ({ page }) => {
    await gotoClean(page);
    await onboardStudent(page, 'Aarav Test');

    // Dashboard greets the student by name.
    await expect(page.getByRole('heading', { name: /नमस्ते, Aarav Test/ })).toBeVisible();
  });

  test('each sidebar tab renders a recognizable hallmark', async ({ page }) => {
    await gotoClean(page);
    await onboardStudent(page, 'Tab Tester');

    await clickSidebarTab(page, 'Library');
    await expect(page.getByRole('heading', { name: /26 reading packs/i })).toBeVisible();

    await clickSidebarTab(page, 'Capstones');
    await expect(page.getByRole('heading', { name: 'Cross-topic essays' })).toBeVisible();

    await clickSidebarTab(page, 'Flashcards');
    await expect(page.getByRole('heading', { name: 'Drill before the exam' })).toBeVisible();

    await clickSidebarTab(page, 'Plan');
    await expect(page.getByRole('heading', { name: 'How to use this library' })).toBeVisible();

    await clickSidebarTab(page, 'Rubric');
    await expect(page.getByRole('heading', { name: /STAMP Rubric/i })).toBeVisible();

    await clickSidebarTab(page, 'Settings');
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
    await expect(page.getByText('Tab Tester', { exact: true })).toBeVisible();

    await clickSidebarTab(page, 'Dashboard');
    await expect(page.getByRole('heading', { name: /नमस्ते, Tab Tester/ })).toBeVisible();
  });
});

test.describe('Overlay flows', () => {
  test('opens an L1 pack and returns via Back', async ({ page }) => {
    await gotoClean(page);
    await onboardStudent(page, 'Pack Tester');

    await clickSidebarTab(page, 'Library');
    await expect(page.getByRole('heading', { name: /26 reading packs/i })).toBeVisible();

    // Packs render as <button>s whose text includes the English title.
    // Restaurants & Food is the documented quality anchor pack.
    const packCard = page.getByRole('button', { name: /restaurants.*food/i }).first();
    await packCard.scrollIntoViewIfNeeded();
    await packCard.click();

    // Topic pack view has a "Back to Library" button on the toolbar.
    const backButton = page.getByRole('button', { name: /back to library/i });
    await expect(backButton).toBeVisible();

    await backButton.click();
    await expect(page.getByRole('heading', { name: /26 reading packs/i })).toBeVisible();
  });

  test('opens a capstone and returns via Back', async ({ page }) => {
    await gotoClean(page);
    await onboardStudent(page, 'Capstone Tester');

    await clickSidebarTab(page, 'Capstones');
    await expect(page.getByRole('heading', { name: 'Cross-topic essays' })).toBeVisible();

    // Every capstone card contains a "C0X" badge. Click the C01 card.
    const c01Card = page.getByRole('button').filter({ hasText: /\bC01\b/ }).first();
    await c01Card.scrollIntoViewIfNeeded();
    await c01Card.click();

    const backButton = page.getByRole('button', { name: /back to capstones/i });
    await expect(backButton).toBeVisible({ timeout: 10_000 });

    await backButton.click();
    await expect(page.getByRole('heading', { name: 'Cross-topic essays' })).toBeVisible();
  });

  test('opens a flashcard deck, flips a card, marks mastered', async ({ page }) => {
    await gotoClean(page);
    await onboardStudent(page, 'Deck Tester');

    await clickSidebarTab(page, 'Flashcards');
    await expect(page.getByRole('heading', { name: 'Drill before the exam' })).toBeVisible();

    // Click the first deck card. Every deck card's text contains "X cards".
    const firstDeck = page.getByRole('button').filter({ hasText: /\d+\s*cards/i }).first();
    await firstDeck.scrollIntoViewIfNeeded();
    await firstDeck.click();

    // Deck runner shows "Back to decks" and "Card 1 of N".
    await expect(page.getByRole('button', { name: /back to decks/i })).toBeVisible();
    await expect(page.getByText(/Card 1 of \d+/i)).toBeVisible();

    // Flip via Space (DeckRunner wires this globally).
    await page.keyboard.press('Space');

    // Once flipped, "Got it" and "Review again" buttons appear.
    const gotIt = page.getByRole('button', { name: /got it/i });
    await expect(gotIt).toBeVisible();
    await gotIt.click();

    // "Got it" advances to the next card — still in the deck runner.
    await expect(page.getByRole('button', { name: /back to decks/i })).toBeVisible();
  });
});

test.describe('Settings persistence', () => {
  test('AI assessment toggle persists across reload', async ({ page }) => {
    await gotoClean(page);
    await onboardStudent(page, 'Toggle Tester');

    await clickSidebarTab(page, 'Settings');
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();

    // The toggle button reads "OFF" initially. Click it to turn on.
    const offBtn = page.getByRole('button', { name: 'OFF', exact: true });
    await expect(offBtn).toBeVisible();
    await offBtn.click();
    await expect(page.getByRole('button', { name: 'ON', exact: true })).toBeVisible();

    // Reload — state comes from localStorage, active profile is remembered.
    await page.reload();

    // Navigate to Settings and confirm the toggle is still ON.
    await clickSidebarTab(page, 'Settings');
    await expect(page.getByRole('button', { name: 'ON', exact: true })).toBeVisible();
  });
});
