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

test.describe('Spaced repetition (4.1)', () => {
  test('rated cards are scheduled in the future and persist across reload', async ({ page }) => {
    await gotoClean(page);
    await onboardStudent(page, 'SRS Tester');

    // Dashboard should report no due cards initially.
    await expect(page.getByText(/nothing due today/i)).toBeVisible();

    // Open a deck and rate two cards "Got it" (→ SM-2 'good', interval ~3d).
    await clickSidebarTab(page, 'Flashcards');
    await expect(page.getByRole('heading', { name: 'Drill before the exam' })).toBeVisible();

    const firstDeck = page.getByRole('button').filter({ hasText: /\d+\s*cards/i }).first();
    await firstDeck.scrollIntoViewIfNeeded();
    await firstDeck.click();

    await expect(page.getByRole('button', { name: /back to decks/i })).toBeVisible();
    await expect(page.getByText(/Card 1 of \d+/i)).toBeVisible();

    // Rate card 1 as 'good'.
    await page.keyboard.press('Space');
    const gotIt = page.getByRole('button', { name: /got it/i });
    await expect(gotIt).toBeVisible();
    await gotIt.click();

    // Rate card 2 as 'good' (still in runner, next card is showing).
    await expect(page.getByText(/Card 2 of \d+/i)).toBeVisible();
    await page.keyboard.press('Space');
    await page.getByRole('button', { name: /got it/i }).click();

    // Reload — SRS state must persist in localStorage.
    await page.reload();
    await expect(page.getByRole('heading', { name: /नमस्ते, SRS Tester/ })).toBeVisible();

    // Dashboard Due-today tile: the two cards we just rated were scheduled a
    // few days into the future, so the tile should still say "Nothing due".
    // (If scheduling were broken and the interval came out as 0 or negative,
    // the tile would show "N cards due today" and this assertion would fail.)
    await expect(page.getByText(/nothing due today/i)).toBeVisible();
    await expect(page.getByText(/cards due today/i)).toHaveCount(0);
  });
});

test.describe('Completion celebrations', () => {
  test('pack-complete celebration fires once, then never again', async ({ page }) => {
    await gotoClean(page);
    await onboardStudent(page, 'Celebration Tester');

    await clickSidebarTab(page, 'Library');
    await expect(page.getByRole('heading', { name: /26 reading packs/i })).toBeVisible();

    // Open L1-12 Restaurants & Food (quality anchor pack).
    const packCard = page.getByRole('button', { name: /restaurants.*food/i }).first();
    await packCard.scrollIntoViewIfNeeded();
    await packCard.click();

    await expect(page.getByRole('button', { name: /back to library/i })).toBeVisible();

    // Find and click the "Mark as Complete"-style button. TopicPackViewV2 uses
    // a "Mark pack complete" button; fall back to a broad regex.
    const markComplete = page
      .getByRole('button', { name: /mark.*complete|mark pack complete|complete pack/i })
      .first();
    await markComplete.scrollIntoViewIfNeeded();
    await markComplete.click();

    // The celebration card renders as a status overlay containing "Pack done."
    // We assert on the body text rather than the lead (which is random 1/3).
    const celebration = page.getByTestId('celebration');
    await expect(celebration).toBeVisible({ timeout: 5_000 });
    await expect(celebration).toContainText(/pack done/i);

    // Dismiss via the X button inside the celebration card.
    await celebration.getByRole('button', { name: /dismiss/i }).first().click();
    await expect(celebration).toHaveCount(0);

    // Reload — state comes from localStorage. The pack is marked complete
    // and its celebration id is in `celebrationsShown`, so reopening the
    // library should NOT re-fire the celebration.
    await page.reload();
    await expect(page.getByRole('heading', { name: /नमस्ते, Celebration Tester/ })).toBeVisible();
    // Give the app a beat to render; celebration should not appear.
    await page.waitForTimeout(500);
    await expect(page.getByTestId('celebration')).toHaveCount(0);
  });
});

test.describe('Audit view', () => {
  test('credit audit view renders freshness banner and pack validation grid', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(`console.error: ${msg.text()}`);
    });

    await gotoClean(page);
    await onboardStudent(page, 'Audit Tester');

    // Audit view is reached via Settings → "View 3-credit audit" button.
    await clickSidebarTab(page, 'Settings');
    const auditLink = page.getByRole('button', { name: /view 3-credit audit/i });
    await auditLink.scrollIntoViewIfNeeded();
    await auditLink.click();

    // FreshnessBanner hallmark: verdict pill + the "State read from..." note.
    await expect(page.getByText('GUARANTEED', { exact: true }).first()).toBeVisible();

    // ValidationGrid hallmark: the per-pack validation heading.
    await expect(page.getByRole('heading', { name: /per-pack validation/i })).toBeVisible();

    expect(errors, `Console/page errors: ${errors.join('\n')}`).toEqual([]);
  });
});

test.describe('Mock exam mode', () => {
  test('start mock exam on C01, write text, click Done, see result', async ({ page }) => {
    await gotoClean(page);
    await onboardStudent(page, 'Mock Tester');

    await clickSidebarTab(page, 'Capstones');
    await expect(page.getByRole('heading', { name: 'Cross-topic essays' })).toBeVisible();

    // C01 is flagged isMockExam. Open it.
    const c01Card = page.getByRole('button').filter({ hasText: /\bC01\b/ }).first();
    await c01Card.scrollIntoViewIfNeeded();
    await c01Card.click();

    await expect(page.getByRole('button', { name: /back to capstones/i })).toBeVisible({
      timeout: 10_000,
    });

    // The "Start mock exam" button is only shown on mock-flagged capstones.
    const startBtn = page.getByTestId('start-mock-exam');
    await expect(startBtn).toBeVisible();
    await startBtn.click();

    // Mock exam overlay is open — timer, textarea, Done button.
    await expect(page.getByTestId('mock-exam-mode')).toBeVisible();
    await expect(page.getByTestId('mock-exam-timer')).toBeVisible();
    const textarea = page.getByTestId('mock-exam-textarea');
    await expect(textarea).toBeVisible();

    // Type a short response. AI is OFF by default on new profiles, so Done
    // should skip the grading phase and go straight to the result panel.
    await textarea.fill('मेरा एक सामान्य शनिवार बहुत अच्छा होता है।');

    await page.getByTestId('mock-exam-done').click();

    // Result panel renders, self-check (non-AI path) is shown, tier comparison too.
    await expect(page.getByTestId('mock-exam-result')).toBeVisible({ timeout: 10_000 });
    await expect(page.getByTestId('mock-exam-self-check')).toBeVisible();
    await expect(page.getByTestId('mock-exam-tier-comparison')).toBeVisible();

    // Exit back to the capstone view.
    await page.getByTestId('mock-exam-finish').click();
    await expect(page.getByRole('button', { name: /back to capstones/i })).toBeVisible();
  });
});

test.describe('PWA', () => {
  // The service worker is only wired in the production bundle (see
  // vite.config.ts `devOptions.enabled: false`) — enabling it in dev made
  // Playwright's webServer lane flaky. The SW surface itself is verified
  // manually against `npm run build && npm run preview`. Here we assert on
  // the parts of the PWA surface that are present in dev too: the manifest
  // link, the theme-color meta, and the apple-touch-icon link.
  test('manifest link and PWA meta are present on the landing page', async ({ page }) => {
    await gotoClean(page);

    const manifestHref = await page.locator('link[rel="manifest"]').getAttribute('href');
    expect(manifestHref).toBe('/manifest.webmanifest');

    const themeColor = await page
      .locator('meta[name="theme-color"]')
      .getAttribute('content');
    expect(themeColor).toBe('#ea580c');

    const appleIcon = await page
      .locator('link[rel="apple-touch-icon"]')
      .getAttribute('href');
    expect(appleIcon).toBe('/icon-192.png');

    // The manifest must be served successfully and parse as JSON with the
    // expected app identity.
    const res = await page.request.get(`${BASE}/manifest.webmanifest`);
    expect(res.status()).toBe(200);
    const manifest = await res.json();
    expect(manifest.name).toBe('Sankalp Hindi');
    expect(manifest.short_name).toBe('Sankalp');
    expect(manifest.display).toBe('standalone');
    expect(Array.isArray(manifest.icons)).toBe(true);
    expect(manifest.icons.length).toBeGreaterThanOrEqual(2);

    // Both icon assets must resolve.
    const icon192 = await page.request.get(`${BASE}/icon-192.png`);
    expect(icon192.status()).toBe(200);
    const icon512 = await page.request.get(`${BASE}/icon-512.png`);
    expect(icon512.status()).toBe(200);
  });
});

test.describe('Progress export (4.4)', () => {
  test('exports JSON and opens the printable progress report', async ({ page }) => {
    await gotoClean(page);
    await onboardStudent(page, 'Export Tester');

    // Complete one pack so the report has a non-zero number to assert on.
    await clickSidebarTab(page, 'Library');
    await expect(page.getByRole('heading', { name: /26 reading packs/i })).toBeVisible();
    const packCard = page.getByRole('button', { name: /restaurants.*food/i }).first();
    await packCard.scrollIntoViewIfNeeded();
    await packCard.click();
    const markComplete = page
      .getByRole('button', { name: /mark.*complete|mark pack complete|complete pack/i })
      .first();
    await markComplete.scrollIntoViewIfNeeded();
    await markComplete.click();
    // Dismiss the celebration if it appears.
    const celebration = page.getByTestId('celebration');
    if (await celebration.isVisible().catch(() => false)) {
      await celebration.getByRole('button', { name: /dismiss/i }).first().click();
    }

    // Settings → Export progress as JSON. Assert the download fires and the
    // filename matches the documented pattern.
    await clickSidebarTab(page, 'Settings');
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();

    const jsonButton = page.getByTestId('export-progress-json');
    await jsonButton.scrollIntoViewIfNeeded();
    const downloadPromise = page.waitForEvent('download');
    await jsonButton.click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(
      /^Export-Tester-sankalp-progress-\d{4}-\d{2}-\d{2}\.json$/,
    );

    // Settings → Open progress report. Assert the overlay renders with the
    // student name and the packs-done stat reflects the one pack we completed.
    const reportButton = page.getByTestId('open-progress-report');
    await reportButton.scrollIntoViewIfNeeded();
    await reportButton.click();

    await expect(page.getByTestId('progress-report-overlay')).toBeVisible();
    await expect(page.getByTestId('progress-report-title')).toContainText('Export Tester');
    await expect(page.getByTestId('report-stat-packs')).toContainText('1 / 26');

    // Close the overlay; we should be back on the Settings page.
    await page.getByTestId('progress-report-close').click();
    await expect(page.getByTestId('progress-report-overlay')).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
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
