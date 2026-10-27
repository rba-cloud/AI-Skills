import { test, expect } from "@playwright/test";
for (const width of [320, 375, 768, 1024, 1440, 1920]) {
  test(`layout, filters, navigation, and RTL at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page
      .getByRole("button", { name: "Work smarter", exact: true })
      .click();
    await expect(page.locator(".course-card")).toHaveCount(1);
    await expect(page.locator(".course-card")).toContainText("AI Productivity");
    await page.getByRole("button", { name: "All tracks", exact: true }).click();
    await expect(page.locator(".course-card")).toHaveCount(5);
    await page.getByRole("button", { name: "Research", exact: true }).click();
    await expect(page.locator(".tool-card")).toHaveCount(1);
    await expect(page.locator(".tool-card")).toContainText("Perplexity");
    await page.getByRole("button", { name: "All tools", exact: true }).click();
    await expect(page.locator(".tool-card")).toHaveCount(7);
    await page.getByRole("button", { name: "Next step", exact: true }).click();
    await expect(page.locator(".prompt-text")).toContainText(
      "patient biology tutor",
    );
    await page.getByRole("button", { name: "Next step", exact: true }).click();
    await expect(page.locator(".prompt-text")).toContainText(
      "solar-powered kitchen",
    );
    await page.getByRole("button", { name: "Try again", exact: true }).click();
    await expect(page.locator(".prompt-text")).toHaveText("Help me study.");
    const guide = page
      .getByRole("button", { name: "Read the project guide" })
      .first();
    await guide.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.locator(".guide-steps li")).toHaveCount(3);
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(guide).toBeFocused();
    if (width < 768) {
      await page.getByRole("button", { name: "Toggle menu" }).click();
      await page
        .locator("#mobile-nav")
        .getByRole("link", { name: "About", exact: true })
        .click();
      await expect(page.locator("#mobile-nav")).toHaveCount(0);
    }
    await page.getByRole("button", { name: "Switch to Urdu" }).click();
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.locator("html")).toHaveAttribute("lang", "ur");
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.getByRole("button", { name: "Switch to English" }).click();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: `test-results/home-${width}.png`,
      fullPage: true,
    });
  });
}
test("reduced motion fallback, valid local destinations and no runtime errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".static-core")).toBeVisible();
  await expect(page.locator(".knowledge-scene canvas")).toHaveCount(0);
  const invalid = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .map((a) => a.getAttribute("href")!)
        .filter((h) => !document.getElementById(h.slice(1))),
    );
  expect(invalid).toEqual([]);
  await page
    .getByRole("button", { name: "Follow AI Skills Academy", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toContainText("URL pending");
  expect(errors).toEqual([]);
});
test("no WebGL still displays a usable site", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      type: string,
      ...args: unknown[]
    ) {
      if (type === "webgl" || type === "webgl2") return null;
      return original.apply(this, [type, ...args] as never);
    } as typeof original;
  });
  await page.goto("/");
  await expect(page.locator(".static-core")).toBeVisible();
  await page
    .getByRole("button", { name: "An improved prompt", exact: false })
    .click();
  await expect(page.locator(".prompt-text")).toContainText(
    "patient biology tutor",
  );
});
test("WebGL scene mounts and survives scrolling", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.locator(".knowledge-scene canvas")).toBeVisible({
    timeout: 20000,
  });
  await page.locator("#start").scrollIntoViewIfNeeded();
  await expect(
    page.getByRole("heading", { name: "Start Building Your AI Future Today." }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test('tool search exposes and recovers from an empty state', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Search tools', { exact: true }).fill('nonexistent-tool');
  await expect(page.locator('.empty-state')).toBeVisible();
  await expect(page.locator('.tool-card')).toHaveCount(0);
  await page.getByLabel('Search tools', { exact: true }).fill('ChatGPT');
  await expect(page.locator('.tool-card')).toHaveCount(1);
  await expect(page.locator('.empty-state')).toHaveCount(0);
});

import AxeBuilder from '@axe-core/playwright';
for (const width of [375, 1440]) {
  test(`automated accessibility scan in both languages at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    for (const lang of ['en', 'ur']) {
      if (lang === 'ur') await page.getByRole('button', { name: 'Switch to Urdu' }).click();
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(results.violations).toEqual([]);
    }
  });
}
