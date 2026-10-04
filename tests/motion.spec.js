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

test("language toggle plays an edition wipe, not a whole-page view transition", async ({ page }) => {
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
  await page.locator(".nav__tools .icon-btn--lang").click();
  // Overlay bat ngay khi bam, roi tu tat sau khi animation ket thuc.
  await expect(page.locator(".lang-wipe")).toHaveClass(/is-active/);
  await expect(page.locator(".nav__brand").first()).toContainText("Tran Huy Khanh");
  await expect(page.locator(".lang-wipe")).not.toHaveClass(/is-active/, { timeout: 4000 });
  const vtCalls = await page.evaluate(() => window.__vtCalls);
  expect(vtCalls).toBe(0);
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

  await page.locator(".nav__tools .icon-btn--lang").click();
  await expect(page.locator(".nav__brand").first()).toContainText("Tran Huy Khanh");
  await expect(page.locator(".lang-wipe")).not.toHaveClass(/is-active/);
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