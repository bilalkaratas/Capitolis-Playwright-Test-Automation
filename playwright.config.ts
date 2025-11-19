import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: true,
  retries: process.env.CI ? 1 : 0,
  workers: 10,
  timeout: 180000,
  expect: {
    timeout: 15000,
  },
  reporter: [
    ['html'],
    ['list'],
    ['json', { outputFile: 'test-results/test-results.json' }],
    ['junit', { outputFile: 'test-results/test-results.xml' }],
  ],
  use: {
    video: 'on',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: [
            "--window-size=1920,1080",
          ],
        },
        viewport: { width: 1920, height: 1080 }
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        launchOptions: {
          args: [
            "--window-size=1920,1080",
          ],
        },
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
