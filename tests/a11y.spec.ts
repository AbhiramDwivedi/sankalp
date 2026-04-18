import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Accessibility suite (backlog item 2.3).
 *
 * Runs axe-core via @axe-core/playwright against the five highest-traffic
 * surfaces of the app:
 *   - Dashboard
 *   - Library
 *   - One pack view (L1-12 Restaurants & Food, the quality anchor)
 *   - One capstone view (C01)
 *   - One deck runner (the first deck card on the flashcards page)
 *
 * Hard gate: zero violations at WCAG 2.0/2.1 A and AA, restricted to the
 * `critical` and `serious` impact tiers. `moderate` and `minor` flags are
 * surfaced in the report (via toJSON in the failure path) but do not break
 * the build — the brief's "Done when" condition is exactly 0 critical + 0
 * serious on these five surfaces.
 *
 * NOTE: this spec is intentionally NOT wired into `npm run check`. It lives
 * behind `npm run a11y` and is run on demand. Keeping the main check fast.
 */

const BASE = 'http://localhost:3000';

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

async function onboardStudent(page: Page, name = 'A11y Tester') {
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
 * Build an AxeBuilder pre-configured for our criteria. Tag-restricted to
 * WCAG 2.0/2.1 levels A and AA so we don't pull in best-practice noise.
 */
function axe(page: Page) {
  return new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
}

/**
 * The brief mandates 0 critical + 0 serious. Filter the violation list and
 * fail with a readable summary if anything slips through.
 */
type AxeNode = { target?: unknown; failureSummary?: string; html?: string };
type AxeViolation = {
  id: string;
  impact?: string | null;
  help: string;
  nodes: AxeNode[];
};

function assertNoCriticalOrSerious(violations: AxeViolation[]) {
  const blocking = violations.filter((v) => v.impact === 'critical' || v.impact === 'serious');
  if (blocking.length === 0) return;
  const lines: string[] = [];
  for (const v of blocking) {
    lines.push(`  - [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} nodes)`);
    // First few node selectors / html snippets help triage without opening
    // the trace. Cap at 5 per rule to keep the failure message scannable.
    for (const n of v.nodes.slice(0, 5)) {
      const target = Array.isArray(n.target) ? n.target.join(' ') : String(n.target);
      const html = (n.html || '').slice(0, 160).replace(/\s+/g, ' ');
      lines.push(`      • ${target}`);
      if (html) lines.push(`        ${html}`);
    }
  }
  throw new Error(
    `axe-core found ${blocking.length} critical/serious violation(s):\n${lines.join('\n')}`,
  );
}

test.describe('Accessibility (axe-core)', () => {
  test('landing page is clean', async ({ page }) => {
    await gotoClean(page);
    await expect(
      page.getByRole('heading', { name: /earn.*3 fcps world language credits/i }),
    ).toBeVisible();
    const results = await axe(page).analyze();
    assertNoCriticalOrSerious(results.violations);
  });

  test('dashboard is clean', async ({ page }) => {
    await gotoClean(page);
    await onboardStudent(page, 'Dashboard A11y');
    await expect(page.getByRole('heading', { name: /नमस्ते, Dashboard A11y/ })).toBeVisible();
    const results = await axe(page).analyze();
    assertNoCriticalOrSerious(results.violations);
  });

  test('library is clean', async ({ page }) => {
    await gotoClean(page);
    await onboardStudent(page, 'Library A11y');
    await clickSidebarTab(page, 'Library');
    await expect(page.getByRole('heading', { name: /26 reading packs/i })).toBeVisible();
    const results = await axe(page).analyze();
    assertNoCriticalOrSerious(results.violations);
  });

  test('topic pack view is clean', async ({ page }) => {
    await gotoClean(page);
    await onboardStudent(page, 'Pack A11y');
    await clickSidebarTab(page, 'Library');
    await expect(page.getByRole('heading', { name: /26 reading packs/i })).toBeVisible();

    const packCard = page.getByRole('button', { name: /restaurants.*food/i }).first();
    await packCard.scrollIntoViewIfNeeded();
    await packCard.click();

    await expect(page.getByRole('button', { name: /back to library/i })).toBeVisible();
    const results = await axe(page).analyze();
    assertNoCriticalOrSerious(results.violations);
  });

  test('capstone view is clean', async ({ page }) => {
    await gotoClean(page);
    await onboardStudent(page, 'Capstone A11y');
    await clickSidebarTab(page, 'Capstones');
    await expect(page.getByRole('heading', { name: 'Cross-topic essays' })).toBeVisible();

    const c01Card = page.getByRole('button').filter({ hasText: /\bC01\b/ }).first();
    await c01Card.scrollIntoViewIfNeeded();
    await c01Card.click();

    await expect(page.getByRole('button', { name: /back to capstones/i })).toBeVisible({
      timeout: 10_000,
    });
    const results = await axe(page).analyze();
    assertNoCriticalOrSerious(results.violations);
  });

  test('deck runner is clean', async ({ page }) => {
    await gotoClean(page);
    await onboardStudent(page, 'Deck A11y');
    await clickSidebarTab(page, 'Flashcards');
    await expect(page.getByRole('heading', { name: 'Drill before the exam' })).toBeVisible();

    const firstDeck = page.getByRole('button').filter({ hasText: /\d+\s*cards/i }).first();
    await firstDeck.scrollIntoViewIfNeeded();
    await firstDeck.click();

    await expect(page.getByRole('button', { name: /back to decks/i })).toBeVisible();
    await expect(page.getByText(/Card 1 of \d+/i)).toBeVisible();
    const results = await axe(page).analyze();
    assertNoCriticalOrSerious(results.violations);
  });
});
