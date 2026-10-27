import { chromium } from "playwright-core";

const base = process.env.BASE_URL || "http://127.0.0.1:3000";
const browser = await chromium.launch({ executablePath: "/usr/bin/chromium", headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage", "--use-gl=swiftshader"] });
const checks = [];

async function inspect(name, path, viewport, reducedMotion = "no-preference") {
  const context = await browser.newContext({ viewport, reducedMotion });
  const page = await context.newPage();
  const errors = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", (error) => errors.push(error.message));
  const response = await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  const layout = await page.evaluate(() => ({
    width: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    h1: document.querySelector("h1")?.textContent?.trim() || null,
  }));
  await page.screenshot({ path: `/tmp/${name}.png`, fullPage: false });
  checks.push({ name, status: response?.status(), overflow: layout.scrollWidth > layout.width, h1: layout.h1, errors });
  await context.close();
}

await inspect("ai-home-mobile", "/", { width: 390, height: 844 });
await inspect("ai-home-desktop", "/", { width: 1440, height: 1000 });
await inspect("ai-course-mobile", "/training/practical-ai-skills", { width: 390, height: 844 });
await inspect("ai-home-reduced-motion", "/", { width: 390, height: 844 }, "reduce");

const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await context.newPage();
await page.goto(base, { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Open menu" }).click();
const menuOpened = await page.getByRole("navigation", { name: "Mobile navigation" }).isVisible();
await page.keyboard.press("Escape");
const menuClosed = (await page.getByRole("button", { name: "Open menu" }).getAttribute("aria-expanded")) === "false";
await page.goto(`${base}/tools`, { waitUntil: "networkidle" });
await page.getByRole("searchbox").fill("no-such-tool-value");
const emptySearch = await page.getByText(/No tools match/i).isVisible();
await page.goto(`${base}/training/practical-ai-skills`, { waitUntil: "networkidle" });
const accordion = page.locator(".accordion-button").first();
const accordionBefore = await accordion.getAttribute("aria-expanded");
await accordion.click();
const accordionAfter = await accordion.getAttribute("aria-expanded");
const accordionToggled = accordionBefore !== accordionAfter;
await page.locator("#interest-name").fill("");
await page.getByRole("button", { name: "Check my details" }).click();
const formValidation = await page.getByText("Please correct the highlighted fields.").isVisible();
const responsive = [];
await page.goto(base, { waitUntil: "networkidle" });
for (const width of [320, 360, 390, 430, 768, 1024, 1280, 1440, 1920]) {
  await page.setViewportSize({ width, height: 900 });
  responsive.push(await page.evaluate(() => ({ width: innerWidth, overflow: document.documentElement.scrollWidth > innerWidth })));
}
checks.push({ interactions: { menuOpened, menuClosed, emptySearch, accordionToggled, formValidation }, responsive });
await context.close();
await browser.close();
console.log(JSON.stringify(checks, null, 2));
