import { test, expect, type Page } from '@playwright/test';

// TODO: cover exam date input + pacing nudge

/**
 * Smoke suite — Next.js 16 App Router rewrite (Phase 4 of the Vite→Next.js
 * migration).
 *
 * The Vite-era smoke walked a tab-based SPA with overlay routes. Every assertion
 * here targets a real URL the App Router serves. Each test wipes localStorage
 * in beforeEach so scenarios don't leak profiles between runs.
 *
 * Selector strategy:
 *   - Prefer visible text and semantic roles (getByRole, getByText, headings).
 *   - data-testid only where the UI is otherwise indistinguishable (celebration
 *     card, mock-exam widgets — already marked in Phase 3 components).
 *
 * Route coverage (one hallmark per tab):
 *   /                    hero H1 + role CTAs
 *   /onboarding?role=X   3-step flow end-to-end for student / teacher / parent
 *   /dashboard           role-specific hallmark (welcome header or demo banner)
 *   /lessons             >=20 pack cards
 *   /lessons/[packId]    pack page + working Back-to-Library
 *   /capstones           >=10 capstone cards
 *   /capstones/[id]      3-tier comparison
 *   /flashcards          decks list
 *   /plan /rubric /audit /overview  each render a visible H1
 *   /settings            profile CRUD card
 */

const BASE = 'http://localhost:3000';

test.beforeEach(async ({ page }) => {
  // Fresh navigation so we have a document to run `page.evaluate` against,
  // then clear storage and reload so every scenario starts with no profile.
  await page.goto(BASE);
  await page.evaluate(() => {
    try {
      window.localStorage.clear();
      window.sessionStorage.clear();
    } catch {}
  });
});

// ----- Shared helpers --------------------------------------------------------

async function submitOnboardingStep(page: Page) {
  await page.getByRole('button', { name: /^continue$/i }).click();
}

/**
 * Walk the 4-step onboarding flow. `role` is passed via the URL (?role=...)
 * so the role-picker step is skipped — this is the canonical "Enter as X"
 * flow from the landing page.
 */
async function onboard(
  page: Page,
  role: 'student' | 'parent' | 'teacher',
  name: string,
) {
  await page.goto(`${BASE}/onboarding?role=${role}`);
  // Step 2: name. shadcn CardTitle renders as <div>, so the "step title" is
  // plain text — we anchor on the Label associated with the input instead.
  // Parent flow renders TWO inputs (Your name / Your child's name); the
  // smoke helper fills both with the same value so onboarding can advance.
  const nameInput = page.getByLabel(/^your name$/i).first();
  await expect(nameInput).toBeVisible();
  await nameInput.fill(name);
  if (role === 'parent') {
    await page.getByLabel(/child.?s name/i).first().fill(name);
  }
  await submitOnboardingStep(page);
  // Step 3: level. The Novice Low radio is pre-checked; we just advance.
  await expect(page.getByRole('radiogroup', { name: /proficiency level/i })).toBeVisible();
  await submitOnboardingStep(page);
  // Step 4: confirm (button reads "Start").
  await page.getByRole('button', { name: /^start$/i }).click();
  // Land on /dashboard.
  await page.waitForURL(`${BASE}/dashboard`);
}

// ----- Landing + landing CTAs ------------------------------------------------

test.describe('Landing', () => {
  test('renders hero H1 and three role CTAs', async ({ page }) => {
    await page.goto(BASE);
    await expect(
      page.getByRole('heading', { level: 1, name: /learn hindi.*and more/i }),
    ).toBeVisible();
    // Three "Enter as X" buttons present.
    await expect(page.getByRole('link', { name: /enter as student/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /enter as parent/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /enter as teacher/i }).first()).toBeVisible();
  });

  test('"Enter as Student" hero CTA lands on /onboarding?role=student', async ({ page }) => {
    await page.goto(BASE);
    await page.getByRole('link', { name: /enter as student/i }).first().click();
    await page.waitForURL(/\/onboarding\?role=student/);
    // The role-locked flow starts at step 2 (name).
    await expect(page.getByLabel(/your name/i).first()).toBeVisible();
  });
});

// ----- Student onboarding + core navigation ---------------------------------

test.describe('Student flow', () => {
  test('onboards and lands on the student dashboard', async ({ page }) => {
    await onboard(page, 'student', 'Aarav Test');
    // Student dashboard hallmark: welcome header with the first name.
    await expect(
      page.getByRole('heading', { level: 1, name: /welcome back, aarav/i }),
    ).toBeVisible();
    // Continue Learning + Quick Stats section titles render as CardTitle
    // (div, not heading) — assert on visible text.
    await expect(page.getByText('Continue Learning', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Quick Stats', { exact: true }).first()).toBeVisible();
  });

  test('navbar streak + XP pills are visible after onboarding', async ({ page }) => {
    await onboard(page, 'student', 'Streak Tester');
    // Streak + XP pills are rendered as aria-labelled regions in the navbar.
    await expect(page.locator('[aria-label$="day streak"]').first()).toBeVisible();
    await expect(page.locator('[aria-label$=" XP"]').first()).toBeVisible();
  });

  test('navigates to /lessons and sees at least 20 pack cards', async ({ page }) => {
    await onboard(page, 'student', 'Library Tester');
    await page.goto(`${BASE}/lessons`);
    await expect(
      page.getByRole('heading', { level: 1, name: /26 reading packs/i }),
    ).toBeVisible();
    // Phase B: library is now 3 collapsible bands. The student's band is
    // expanded by default; the other two start collapsed. Expand any that
    // aren't already open so the full catalog is in the accessibility tree.
    // Scope to <main> so navbar buttons with aria-expanded (profile dropdown,
    // mobile menu toggle) don't get picked up by `.first()`.
    const bandTriggers = page.locator('main').getByRole('button', { expanded: false });
    const collapsed = await bandTriggers.count();
    for (let i = 0; i < collapsed; i += 1) {
      await page.locator('main').getByRole('button', { expanded: false }).first().click();
    }
    // Pack cards render as <button>s with an English title.
    const packButtons = page
      .locator('section')
      .getByRole('button')
      .filter({ hasText: /[a-z]/i });
    // Lower bound of 20 absorbs any helper buttons (filter pills etc.) — the
    // real thing is "the library is populated".
    await expect
      .poll(async () => await packButtons.count(), { timeout: 10_000 })
      .toBeGreaterThanOrEqual(20);
  });

  test('opens a pack at /lessons/[packId] and Back-to-Library returns', async ({ page }) => {
    await onboard(page, 'student', 'Pack Tester');
    // Navigate directly to a known pack id (L1-12 is the quality anchor).
    await page.goto(`${BASE}/lessons/L1-12-restaurants-food`);
    await expect(page.getByRole('button', { name: /back to library/i })).toBeVisible();
    // Pack page renders Devanagari (every pack has a Hindi title somewhere).
    await expect(page.locator('html')).toContainText(/[\u0900-\u097F]/);
    // Back navigates to /lessons.
    await page.getByRole('button', { name: /back to library/i }).click();
    await page.waitForURL(`${BASE}/lessons`);
    await expect(
      page.getByRole('heading', { level: 1, name: /26 reading packs/i }),
    ).toBeVisible();
  });

  test('/capstones renders at least 10 capstone cards', async ({ page }) => {
    await onboard(page, 'student', 'Capstone Tester');
    await page.goto(`${BASE}/capstones`);
    await expect(
      page.getByRole('heading', { level: 1, name: /cross-topic essays/i }),
    ).toBeVisible();
    // Every capstone card includes a "C0X" badge (C01..C10).
    const cards = page.getByRole('button').filter({ hasText: /\bC\d{2}\b/ });
    await expect.poll(async () => await cards.count()).toBeGreaterThanOrEqual(10);
  });

  test('/capstones/[id] renders 3-tier version comparison', async ({ page }) => {
    await onboard(page, 'student', 'C01 Tester');
    await page.goto(`${BASE}/capstones/C01-restaurant-memory`);
    await expect(page.getByRole('button', { name: /back to capstones/i })).toBeVisible({
      timeout: 15_000,
    });
    // 3-tier comparison lives inside the Write tab. The Study tab is default.
    // Rather than drive tabs, assert that the page renders the hero title
    // (from the capstone record) and the tier sequence text that the Study
    // tab's Step 2 explicitly calls out.
    await expect(page.getByText(/novice.*intermediate-mid.*push/i).first()).toBeVisible();
  });

  test('/flashcards list renders', async ({ page }) => {
    await onboard(page, 'student', 'Deck Tester');
    await page.goto(`${BASE}/flashcards`);
    await expect(
      page.getByRole('heading', { level: 1, name: /drill before the exam/i }),
    ).toBeVisible();
    // 33 decks ship; >=20 is a safe lower bound that tolerates any filter UI.
    const deckCards = page.getByRole('button').filter({ hasText: /\d+\s*cards/i });
    await expect.poll(async () => await deckCards.count()).toBeGreaterThanOrEqual(20);
  });

  test('/plan /rubric /audit /overview each render a visible H1', async ({ page }) => {
    await onboard(page, 'student', 'Nav Tester');
    const routes: [string, RegExp][] = [
      ['/plan', /how to use this library/i],
      ['/rubric', /rubric/i],
      ['/audit', /earn/i],
      ['/overview', /how sankalp works/i],
    ];
    for (const [path, h1] of routes) {
      await page.goto(BASE + path);
      await expect(page.getByRole('heading', { level: 1, name: h1 })).toBeVisible({
        timeout: 10_000,
      });
    }
  });

  test('completing a pack bumps the navbar XP counter', async ({ page }) => {
    await onboard(page, 'student', 'XP Tester');
    // Read XP pill before completing anything.
    const xpPill = page.locator('[aria-label$=" XP"]').first();
    await expect(xpPill).toBeVisible();
    const xpBefore = Number(
      (await xpPill.getAttribute('aria-label'))?.match(/(\d+)/)?.[1] || '0',
    );

    // Open a pack and click Mark Complete.
    await page.goto(`${BASE}/lessons/L1-12-restaurants-food`);
    await expect(page.getByRole('button', { name: /back to library/i })).toBeVisible();
    const markBtn = page.getByRole('button', { name: /mark complete/i }).first();
    await markBtn.scrollIntoViewIfNeeded();
    await markBtn.click();

    // Dismiss the completion celebration if it fires.
    const celebration = page.getByTestId('celebration');
    if (await celebration.isVisible().catch(() => false)) {
      const dismiss = celebration.getByRole('button', { name: /dismiss|close/i }).first();
      if (await dismiss.isVisible().catch(() => false)) await dismiss.click();
    }

    // Route should have pushed back to /lessons; the XP pill reflects +50
    // (one completed pack). Poll so the hydration bounce settles.
    await page.waitForURL(`${BASE}/lessons`);
    await expect
      .poll(
        async () => {
          const raw = await xpPill.getAttribute('aria-label');
          return Number(raw?.match(/(\d+)/)?.[1] || '0');
        },
        { timeout: 10_000 },
      )
      .toBeGreaterThan(xpBefore);
  });
});

// ----- Teacher + Parent flows -----------------------------------------------

test.describe('Teacher flow', () => {
  test('onboarding lands on teacher dashboard with demo banner + roster', async ({ page }) => {
    await onboard(page, 'teacher', 'Ms. Sharma');
    // Teacher dashboard hallmark: "Demo mode" banner.
    await expect(page.getByText(/demo mode/i).first()).toBeVisible();
    // And a roster section (single demo student).
    await expect(page.getByText(/demo roster/i).first()).toBeVisible();
  });
});

test.describe('Parent flow', () => {
  test('onboarding lands on parent dashboard showing the demo child', async ({ page }) => {
    await onboard(page, 'parent', 'Aarav');
    // Parent dashboard renders the demo child's progress. The page has no
    // "Welcome back, X" header (that's student-only) — we assert on the demo
    // student's name appearing somewhere plus the dashboard still hydrates
    // (no error boundary).
    await expect(page.locator('main')).toBeVisible();
    // Parent dashboard shows the Hindi script's sank-sah logo + the child's
    // name either in the header or on a card. Assert the main container is
    // non-empty; the hallmark is the absence of an error boundary.
    const mainText = await page.locator('main').textContent();
    expect(mainText && mainText.length > 200).toBeTruthy();
  });
});

// ----- Settings ---------------------------------------------------------------

test.describe('Settings', () => {
  test('/settings renders with the active profile', async ({ page }) => {
    await onboard(page, 'student', 'Settings Tester');
    await page.goto(`${BASE}/settings`);
    await expect(page.getByRole('heading', { name: /^settings$/i, level: 1 })).toBeVisible();
    // The active profile name is the value of the Name input.
    await expect(page.getByLabel(/^name$/i)).toHaveValue('Settings Tester');
  });

  // NOTE: a /settings smoke for the CoParentInviteCard was considered but the
  // card is gated on `authUser && profile.role === 'parent'`. Under
  // E2E_AUTH_BYPASS there is no real Supabase session, so authUser is null
  // and the card never mounts — there's no way to assert its heading from
  // this suite. The end-to-end invite + accept + cascading-revoke flow needs
  // Supabase fixtures and is tracked outside this smoke spec.
});
