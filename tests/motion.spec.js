import { test, expect } from "@playwright/test";

test("theme toggle uses a view transition when supported", async ({ page }) => {
  await page.addInitScript(() => {
    window.__vtCalls = 0;
    const orig = document.startViewTransition?.bind(document);
    // Chromium supports it; count invocations if present.
    if (orig) {
      document.startViewTransition = (...args) => {
        window.__vtCalls += 1;
        return orig(...args);
      };
    }
  });
  await page.goto("/");
  await page.locator(".nav__tools .icon-btn--theme").click();
  const theme = await page.evaluate(() => document.documentElement.dataset.theme);
  expect(["light", "dark"]).toContain(theme);
  const supported = await page.evaluate(() => typeof document.startViewTransition === "function");
  const calls = await page.evaluate(() => window.__vtCalls);
  if (supported) expect(calls).toBeGreaterThan(0);
});

test("language toggle uses a reversed view transition", async ({ page }) => {
  await page.addInitScript(() => {
    window.__vtDir = [];
    const orig = document.startViewTransition?.bind(document);
    if (orig) {
      document.startViewTransition = (...args) => {
        window.__vtDir.push(document.documentElement.dataset.vt);
        return orig(...args);
      };
    }
  });
  await page.goto("/");
  await page.locator(".nav__tools .lang__opt", { hasText: "EN" }).click();
  await expect(page.locator(".nav__brand").first()).toContainText("[Display name]");
  const supported = await page.evaluate(() => typeof document.startViewTransition === "function");
  if (supported) {
    const dirs = await page.evaluate(() => window.__vtDir);
    expect(dirs).toContain("reverse");
  }
});

test("reduced motion skips view transitions", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.addInitScript(() => {
    window.__vtCalls = 0;
    const orig = document.startViewTransition?.bind(document);
    if (orig) {
      document.startViewTransition = (...args) => {
        window.__vtCalls += 1;
        return orig(...args);
      };
    }
  });
  await page.goto("/");
  await page.locator(".nav__tools .icon-btn--theme").click();
  const calls = await page.evaluate(() => window.__vtCalls);
  expect(calls).toBe(0);
  await context.close();
});

test("theme icon crossfades between states", async ({ page }) => {
  await page.goto("/");
  const before = await page.locator(".icon-btn--theme svg").count();
  expect(before).toBeGreaterThan(0);
  await page.locator(".nav__tools .icon-btn--theme").click();
  await expect(page.locator(".icon-btn--theme svg")).toHaveCount(1);
});

test("project card lifts and underlines title on hover", async ({ page }) => {
  await page.goto("/");
  await page.locator("#projects").scrollIntoViewIfNeeded();
  const card = page.locator(".project").first();
  const title = card.locator(".project__title");
  await card.hover();
  await expect(title).toBeVisible();
  await page.waitForTimeout(450);
  const size = await title.evaluate((el) => getComputedStyle(el).backgroundSize);
  expect(size).not.toBe("0% 2px");
});