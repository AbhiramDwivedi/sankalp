import { defineConfig, devices } from '@playwright/test';

/**
 * Smoke test configuration. Boots the Vite dev server on port 3000 and runs
 * the suite in tests/ against http://localhost:3000. Keep this minimal — any
 * meaningful assertions belong in the tests, not config.
 */
export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: 0,
  fullyParallel: false,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run dev',
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
