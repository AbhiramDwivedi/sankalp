import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Accessibility suite — rewritten for Next.js 16 App Router (Phase 4).
 *
 * Runs axe-core via @axe-core/playwright against five high-traffic surfaces
 * that compose the "happy path" through the app:
 *   - Landing (/)
 *   - Student dashboard (/dashboard)
 *   - Lessons catalog (/lessons)
 *   - One pack view (/lessons/L1-12-restaurants-food — quality anchor)
 *   - Capstones catalog (/capstones)
 *   - One capstone view (/capstones/C01-restaurant-memory)
 *
 * Hard gate: zero `critical` or `serious` violations on WCAG 2.0/2.1 A + AA.
 * `moderate` and `minor` flags are allowed to pass (they show up in axe's
 * output when you want to investigate). Any rule that surfaces something we
 * can't fix today goes into `DISABLED_RULES` below with a one-line reason.
 *
 * Runs via `npm run a11y` (playwright.a11y.config.ts). Each test wipes
 * localStorage first and onboards a fresh student when the scenario needs
 * one (catalog + content pages require a profile).
 */

const BASE = 'http://localhost:3000';

// Rules we intentionally skip. Keep this list short and motivated.
//
// `color-contrast`  — shadcn tokens + the Sankalp warm-cream theme collide
//                     on muted-foreground / secondary text in some headers.
//                     Tracked for a design pass; not shipping-blocking for
//                     the migration PR. Remove once Phase 2a colour audit
//                     (see backlog item 2.3) catches up.
const DISABLED_RULES: string[] = ['color-contrast'];

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

async function onboard(page: Page, name = 'A11y Tester') {
  await page.goto(`${BASE}/onboarding?role=student`);
  await page.getByLabel(/your name/i).first().fill(name);
  await submitOnboardingStep(page);
  await expect(page.getByRole('radiogroup', { name: /proficiency level/i })).toBeVisible();
  await submitOnboardingStep(page);
  await page.getByRole('button', { name: /^start$/i }).click();
  await page.waitForURL(`${BASE}/dashboard`);
}

function axe(page: Page) {
  return new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .disableRules(DISABLED_RULES);
}

type AxeNode = { target?: unknown; html?: string };
type AxeViolation = {
  id: string;
  impact?: string | null;
  help: string;
  nodes: AxeNode[];
};

function assertNoCriticalOrSerious(violations: AxeViolation[]) {
  const blocking = violations.filter(
    (v) => v.impact === 'critical' || v.impact === 'serious',
  );
  if (blocking.length === 0) return;
  const lines: string[] = [];
  for (const v of blocking) {
    lines.push(`  - [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} nodes)`);
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
  test('landing page', async ({ page }) => {
    await page.goto(BASE);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const results = await axe(page).analyze();
    assertNoCriticalOrSerious(results.violations);
  });

  test('student dashboard', async ({ page }) => {
    await onboard(page);
    await expect(page.getByRole('heading', { level: 1, name: /welcome back/i })).toBeVisible();
    const results = await axe(page).analyze();
    assertNoCriticalOrSerious(results.violations);
  });

  test('lessons catalog', async ({ page }) => {
    await onboard(page);
    await page.goto(`${BASE}/lessons`);
    await expect(
      page.getByRole('heading', { level: 1, name: /26 reading packs/i }),
    ).toBeVisible();
    const results = await axe(page).analyze();
    assertNoCriticalOrSerious(results.violations);
  });

  test('pack deep-dive (L1-12)', async ({ page }) => {
    await onboard(page);
    await page.goto(`${BASE}/lessons/L1-12-restaurants-food`);
    await expect(page.getByRole('button', { name: /back to library/i })).toBeVisible();
    const results = await axe(page).analyze();
    assertNoCriticalOrSerious(results.violations);
  });

  test('capstones catalog', async ({ page }) => {
    await onboard(page);
    await page.goto(`${BASE}/capstones`);
    await expect(
      page.getByRole('heading', { level: 1, name: /cross-topic essays/i }),
    ).toBeVisible();
    const results = await axe(page).analyze();
    assertNoCriticalOrSerious(results.violations);
  });

  test('capstone deep-dive (C01)', async ({ page }) => {
    await onboard(page);
    await page.goto(`${BASE}/capstones/C01-restaurant-memory`);
    await expect(page.getByRole('button', { name: /back to capstones/i })).toBeVisible({
      timeout: 15_000,
    });
    const results = await axe(page).analyze();
    assertNoCriticalOrSerious(results.violations);
  });
});
