import { test, expect } from "@playwright/test";

test.describe("i18n Multi-Language Toggle", () => {
  test("should switch languages correctly on the home page", async ({ page }) => {
    // Go to homepage
    await page.goto("/");

    // Verify default language is Chinese
    await expect(page.locator("h1")).toContainText(/掌握/);
    await expect(page.locator("header nav a").first()).toHaveText("课程");

    // Click EN button
    const enButton = page.locator("header").getByRole("button", { name: "EN" });
    await enButton.click();

    // Verify text switches to English
    await expect(page.locator("h1")).toContainText(/Master the Architecture/);
    await expect(page.locator("header nav a").first()).toHaveText("Courses");

    // Click 中文 button
    const zhButton = page.locator("header").getByRole("button", { name: "中文" });
    await zhButton.click();

    // Verify text switches back to Chinese
    await expect(page.locator("h1")).toContainText(/掌握/);
    await expect(page.locator("header nav a").first()).toHaveText("课程");
  });

  test("should switch languages correctly on the lab page", async ({ page }) => {
    // Go to lab page
    await page.goto("/lab");

    // Default is Chinese (since context starts fresh per test)
    await expect(page.locator("main")).toContainText("任务说明");
    await expect(page.locator("main")).toContainText("控制台为空。");

    // Click EN button on the lab page language switcher
    const enButton = page.locator("header").getByRole("button", { name: "EN" });
    await enButton.click();

    // Verify text switches to English
    await expect(page.locator("main")).toContainText("INSTRUCTIONS");
    await expect(page.locator("main")).toContainText("Console is empty.");

    // Click ZH button on the lab page language switcher
    const zhButton = page.locator("header").getByRole("button", { name: "ZH" });
    await zhButton.click();

    // Verify text switches back to Chinese
    await expect(page.locator("main")).toContainText("任务说明");
  });
});
