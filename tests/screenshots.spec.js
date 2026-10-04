import { test } from "@playwright/test";
import fs from "fs";

const OUT = "screenshots";

test.beforeAll(() => {
  fs.mkdirSync(OUT, { recursive: true });
});

async function shot(page, name) {
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false });
}

test.describe("desktop screenshots", () => {
  test.use({ viewport: { width: 1280, height: 800 } });
  test("capture sections light", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(900);
    await shot(page, "desktop-hero-light");
    for (const id of ["about", "skills", "projects", "contact"]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await page.waitForTimeout(700);
      await shot(page, `desktop-${id}-light`);
    }
  });

  test("capture hero dark", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("portfolio.theme", "dark"));
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(900);
    await shot(page, "desktop-hero-dark");
    await page.locator("#projects").scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    await shot(page, "desktop-projects-dark");
  });

  test("capture hero english", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("portfolio.lang", "en"));
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(900);
    await shot(page, "desktop-hero-en");
  });
});

test.describe("mobile screenshots", () => {
  test.use({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
  test("capture sections", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(900);
    await shot(page, "mobile-hero-light");
    for (const id of ["about", "skills", "projects", "contact"]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await page.waitForTimeout(700);
      await shot(page, `mobile-${id}-light`);
    }
  });

  test("capture mobile menu", async ({ page }) => {
    await page.goto("/");
    await page.locator(".nav__toggle-mobile").click();
    await page.waitForTimeout(300);
    await shot(page, "mobile-menu-light");
  });
});