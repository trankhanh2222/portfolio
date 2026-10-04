import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:4173",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } },
    },
    {
      name: "mobile",
      testIgnore: /screenshots\.spec\.js/,
      use: {
        ...devices["Pixel 7"],
        viewport: { width: 375, height: 812 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
  webServer: {
    command: "npm run preview -- --port 4173",
    port: 4173,
    reuseExistingServer: true,
    timeout: 60000,
  },
});