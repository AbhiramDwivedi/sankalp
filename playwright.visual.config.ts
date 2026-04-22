import { defineConfig, devices } from '@playwright/test';

/**
 * Visual regression configuration — separate from smoke so each suite can be
 * run in isolation and `--update-snapshots` never touches smoke tests.
 *
 * Uses Playwright's built-in screenshot diffing (Option B). Zero new deps.
 * Goldens live next to the spec in tests/visual/__snapshots__/ (Playwright's
 * canonical layout when snapshotDir is set below).
 */
export default defineConfig({
  testDir: './tests/visual',
  // Use a non-standard match pattern so these specs are NOT picked up by the
  // smoke config's default testMatch (`**/*.@(spec|test).?(c|m)[jt]s?(x)`).
  // Visual spec files end in `.visual.ts`.
  testMatch: /.*\.visual\.ts$/,
  snapshotDir: './tests/visual/__snapshots__',
  // Snapshot path template: one PNG per test name, no OS/browser suffix so
  // goldens are portable. Regressions in font rendering are caught by the
  // 2% pixel ratio threshold configured per-assertion.
  snapshotPathTemplate: '{snapshotDir}/{testFilePath}/{arg}{ext}',
  timeout: 60_000,
  retries: 0,
  fullyParallel: false,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'retain-on-failure',
  },
  webServer: {
    // E2E_AUTH_BYPASS disables the Supabase auth gate so these screens can
    // render without a real session. Non-prod only — see
    // lib/supabase/middleware.ts and components/landing-cta-row.tsx.
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
