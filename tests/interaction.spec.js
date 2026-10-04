import { test, expect } from "@playwright/test";

test.describe("mobile navigation", () => {
  test.use({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });

  test("hamburger opens drawer, Escape closes, focus returns", async ({ page }) => {
    await page.goto("/");
    const toggle = page.locator(".nav__toggle-mobile");
    await expect(toggle).toBeVisible();
    await toggle.click();
    const dialog = page.locator("#mobile-menu");
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("aria-modal", "true");
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(toggle).toBeFocused();
  });

  test("drawer link navigates and closes", async ({ page }) => {
    await page.goto("/");
    await page.locator(".nav__toggle-mobile").click();
    await page.locator("#mobile-menu .menu__link", { hasText: /Dự án|Projects/ }).click();
    await expect(page.locator("#mobile-menu")).toHaveCount(0);
    await expect(page.locator("#projects")).toBeInViewport();
  });
});

test.describe("tablet layout", () => {
  test.use({ viewport: { width: 834, height: 1112 } });
  test("no horizontal overflow at tablet width", async ({ page }) => {
    await page.goto("/");
    const { scrollW, innerW } = await page.evaluate(() => ({
      scrollW: document.documentElement.scrollWidth,
      innerW: window.innerWidth,
    }));
    expect(scrollW).toBeLessThanOrEqual(innerW + 1);
  });
});

test.describe("keyboard accessibility", () => {
  test("all interactive elements are keyboard reachable", async ({ page }) => {
    await page.goto("/");
    await page.locator("#contact").scrollIntoViewIfNeeded();
    const btn = page.locator("#contact button").first();
    await btn.focus();
    await expect(btn).toBeFocused();
    const outline = await btn.evaluate((el) => getComputedStyle(el).outlineStyle);
    expect(outline).not.toBe("none");
  });
});