import { test, expect } from "@playwright/test";

test.describe("Navigation Flow", () => {
  test("should navigate through all main pages from the navbar", async ({ page }) => {
    // Start at home page
    await page.goto("/");
    await expect(page).toHaveURL("/");
    
    // Check main title on Home page
    const homeTitle = page.locator("h1");
    await expect(homeTitle).toContainText(/掌握/);

    // Go to Courses page
    const coursesLink = page.locator("header nav a").filter({ hasText: "课程" });
    await coursesLink.click();
    await expect(page).toHaveURL("/courses");
    await expect(page.locator("h1")).toContainText("课程目录");

    // Go to Careers page
    const careersLink = page.locator("header nav a").filter({ hasText: "职业" });
    await careersLink.click();
    await expect(page).toHaveURL("/careers");
    await expect(page.locator("h1")).toContainText("加速你的");

    // Go to Lab page
    const practiceLink = page.locator("header nav a").filter({ hasText: "练习" });
    await practiceLink.click();
    await expect(page).toHaveURL("/lab");
    await expect(page.locator("header")).toContainText("DYNAMIC PROGRAMMING");
  });
});
