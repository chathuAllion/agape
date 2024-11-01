import { defineConfig, devices } from '@playwright/test';
import path from 'path';
require('dotenv').config();

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
 //dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */

//export const STORAGE_STATE = path.join(__dirname, './setup/.auth/user.json');

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: 'html',
  reporter: process.env.CI ? [['html'], ['junit', { outputFile: 'results.xml' }]] : 'html',
  //reporter: [['html', { outputFile: 'report.html' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
     baseURL:process.env.APP_URL,
     //baseURL:'https://agapeqa.agapeinaction.org.au',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
  },
  //timeout: 60000,
  timeout: 60 * 1000,
  expect: {
    timeout: 20000,
  },

  /* Configure projects for major browsers */
  projects: [
    // Setup project
    //{ name: 'setup', testMatch: /.*\.setup\.ts/ },

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        video: "on",
        screenshot: 'only-on-failure',
        launchOptions: { args: ['--ignore-certificate-errors'] },
        // Use prepared auth state.
        //storageState: 'playwright/.auth/user.json',
        ignoreHTTPSErrors: true,
      },
      testMatch: '**/*.spec.ts',
      //dependencies: ['setup'],
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  //  webServer: {
  //    command: 'php artisan serv',
  //    url: 'http://127.0.0.1:8000',
  //    reuseExistingServer: !process.env.CI,
  //  },
});
