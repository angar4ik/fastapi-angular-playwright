import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 10_000 },

  // 🔍 TRACE ON FIRST RETRY — produces trace.zip on failed tests
  // On CI, we also keep traces even on first failure via `--trace on`
  retries: 1,

  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:4200',
    trace: 'on-first-retry',   // <-- generates trace.zip on failed retries
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  // Output dir for test results (traces, screenshots, videos, report)
  outputDir: './test-results/',

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Optional: local dev server startup
  // webServer: [
  //   { command: 'cd ../frontend && npx ng serve --port 4200', port: 4200, reuseExistingServer: true },
  //   { command: 'cd ../backend && uvicorn app.main:app --port 8000', port: 8000, reuseExistingServer: true },
  // ],
});
