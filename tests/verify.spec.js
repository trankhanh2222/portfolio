import { test, expect } from "@playwright/test";

const errors = [];
test.beforeEach(async ({ page }) => {
  errors.length = 0;
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(String(err)));
});

test("page loads without console errors", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await expect(page.locator("h1")).toBeVisible();
  expect(errors, errors.join("\n")).toEqual([]);
});

test("no horizontal overflow", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  const overflow = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    innerW: window.innerWidth,
  }));
  expect(overflow.scrollW).toBeLessThanOrEqual(overflow.innerW + 1);
});

test("all nav links target real sections", async ({ page }) => {
  await page.goto("/");
  const hrefs = await page.locator(".nav__link").evaluateAll((els) =>
    els.map((e) => e.getAttribute("href"))
  );
  for (const href of hrefs) {
    const id = href.replace("#", "");
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
});

test("language toggle switches copy and persists", async ({ page }) => {
  await page.goto("/");
  const brand = page.locator(".nav__brand").first();
  await expect(brand).toContainText("Trần Huy Khánh");
  await page.locator(".nav__tools .icon-btn--lang").click();
  await expect(brand).toContainText("Tran Huy Khanh");
  await page.reload();
  await expect(brand).toContainText("Tran Huy Khanh");
  const stored = await page.evaluate(() => localStorage.getItem("portfolio.lang"));
  expect(stored).toBe("en");
});

test("theme toggle switches and persists", async ({ page }) => {
  await page.goto("/");
  const initial = await page.evaluate(() => document.documentElement.dataset.theme);
  await page.locator(".nav__tools .icon-btn--theme").click();
  const after = await page.evaluate(() => document.documentElement.dataset.theme);
  expect(after).not.toBe(initial);
  await page.reload();
  const persisted = await page.evaluate(() => document.documentElement.dataset.theme);
  expect(persisted).toBe(after);
});

test("project image loads with alt text", async ({ page }) => {
  await page.goto("/");
  const img = page.locator(".project__img").first();
  await expect(img).toHaveAttribute("alt", /.+/);
  await expect
    .poll(() => img.evaluate((el) => el.naturalWidth), { timeout: 5000 })
    .toBeGreaterThan(0);
});

test("copy email shows feedback", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.locator("#contact").scrollIntoViewIfNeeded();
  const copyBtn = page.getByRole("button", { name: /sao chép|copy/i }).first();
  await copyBtn.click();
  await expect(page.locator(".copy-note")).toContainText(/đã sao chép|copied/i);
});

test("reduced motion disables particles", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await expect(page.locator("#dust")).toHaveCount(0);
  await context.close();
});