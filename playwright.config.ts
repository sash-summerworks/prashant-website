import { defineConfig, devices } from "@playwright/test";

// The Vercel adapter doesn't support `astro preview`, so E2E runs against the dev server.
// `--ignore-lock` keeps it in the foreground: Astro 7 otherwise auto-backgrounds the dev
// server when it detects an AI agent, and Playwright reads that as the server exiting.
const PORT = 4321;

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `npm run dev -- --port ${PORT} --ignore-lock`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
  },
});
