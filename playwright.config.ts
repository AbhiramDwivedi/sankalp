import { defineConfig, devices } from '@playwright/test';

/**
 * Smoke test configuration. Boots the Vite dev server on port 3000 and runs
 * the suite in tests/ against http://localhost:3000. Keep this minimal — any
 * meaningful assertions belong in the tests, not config.
 */
export default defineConfig({
  testDir: './tests',
  // The a11y suite (axe-core) runs via `npm run a11y` and is intentionally
  // NOT part of the default smoke run — keeping the main `npm run check`
  // fast. A11y has its own dev-dep (@axe-core/playwright) and ~20s footprint.
  testIgnore: ['**/a11y.spec.ts'],
  timeout: 30_000,
  retries: 0,
  fullyParallel: false,
  // Single worker: the Vite dev server is shared across workers and crashes
  // intermittently under multi-worker compilation load on Windows worktrees,
  // causing ERR_CONNECTION_REFUSED partway through the suite. The whole
  // suite finishes in ~1 minute single-threaded. (Added in 4.3.)
  workers: 1,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'retain-on-failure',
  },
  webServer: {
    // E2E_AUTH_BYPASS=1 disables the Supabase middleware gate so the smoke
    // suite (written before auth shipped) can hit gated routes directly.
    // Non-prod only — see lib/supabase/middleware.ts for the check. Rewriting
    // the suite to exercise the real auth flow is tracked as a follow-up.
    command: 'npm run dev',
    env: {
      E2E_AUTH_BYPASS: '1',
      NEXT_PUBLIC_E2E_AUTH_BYPASS: '1',
    },
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 90_000,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Tall viewport so the 3-step onboarding form and long library
        // pages fit without scroll games during clicks.
        viewport: { width: 1280, height: 1000 },
      },
    },
  ],
});
