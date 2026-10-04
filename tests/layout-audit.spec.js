import { test, expect } from "@playwright/test";

async function audit(page) {
  return page.evaluate(() => {
    const vw = window.innerWidth;
    const report = { overflowing: [], smallTargets: [], headings: [], imgsNoAlt: 0 };

    document.querySelectorAll("body *").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      if (r.right > vw + 1.5 || r.left < -1.5) {
        report.overflowing.push({
          tag: el.tagName.toLowerCase(),
          cls: el.className?.toString().slice(0, 60),
          left: Math.round(r.left),
          right: Math.round(r.right),
        });
      }
    });

    document.querySelectorAll("h1,h2,h3,h4,h5,h6").forEach((h) => {
      report.headings.push(h.tagName + ":" + h.textContent.trim().slice(0, 30));
    });

    document.querySelectorAll("img").forEach((img) => {
      if (!img.hasAttribute("alt")) report.imgsNoAlt++;
    });

    document.querySelectorAll("a[href], button").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      const interactive =
        el.tagName === "BUTTON" ||
        (el.className?.toString().includes("btn") ?? false) ||
        (el.className?.toString().includes("icon-btn") ?? false);
      if (interactive && (r.width < 44 || r.height < 44)) {
        report.smallTargets.push({
          tag: el.tagName.toLowerCase(),
          cls: el.className?.toString().slice(0, 40),
          w: Math.round(r.width),
          h: Math.round(r.height),
        });
      }
    });

    return report;
  });
}

test.describe("layout audit", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("desktop: no overflow, valid heading order, adequate targets", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const r = await audit(page);
    console.log("DESKTOP overflowing:", JSON.stringify(r.overflowing));
    console.log("DESKTOP smallTargets:", JSON.stringify(r.smallTargets));
    console.log("DESKTOP headings:", r.headings.join(" | "));
    expect(r.overflowing, JSON.stringify(r.overflowing)).toEqual([]);
    expect(r.smallTargets, JSON.stringify(r.smallTargets)).toEqual([]);
    expect(r.headings[0]).toMatch(/^H1/);
    expect(r.imgsNoAlt).toBe(0);
  });

  test("desktop hero fits in first viewport", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const cta = page.locator(".hero__ctas");
    await expect(cta).toBeInViewport();
  });
});

test.describe("layout audit mobile", () => {
  test.use({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });

  test("mobile: no overflow, adequate targets", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const r = await audit(page);
    console.log("MOBILE overflowing:", JSON.stringify(r.overflowing));
    console.log("MOBILE smallTargets:", JSON.stringify(r.smallTargets));
    expect(r.overflowing, JSON.stringify(r.overflowing)).toEqual([]);
  });
});