import { defineConfig, devices } from '@playwright/test';

/**
 * Accessibility-suite configuration. Mirrors the smoke config but only picks
 * up `tests/a11y.spec.ts`. Kept separate so the main smoke/check pipeline
 * can `testIgnore` a11y without affecting `npm run a11y`.
 */
export default defineConfig({
  testDir: './tests',
  testMatch: ['**/a11y.spec.ts'],
  timeout: 30_000,
  retries: 0,
  fullyParallel: false,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'retain-on-failure',
  },
  webServer: {
    // E2E_AUTH_BYPASS disables the Supabase auth gate so axe-core can hit
    // gated routes directly. Non-prod only — see lib/supabase/middleware.ts.
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
        viewport: { width: 1280, height: 1000 },
      },
    },
  ],
});
