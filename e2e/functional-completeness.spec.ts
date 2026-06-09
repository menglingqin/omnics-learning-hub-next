import { test, expect } from "@playwright/test";

test.describe("Functional Completeness Features", () => {
  test("should handle Course Catalog real-time search and filter selections", async ({ page }) => {
    await page.goto("/courses");

    // Verify default courses exist in the course catalog main area (in Chinese)
    await expect(page.locator("main.flex-1")).toContainText("高级动态规划");
    await expect(page.locator("main.flex-1")).toContainText("图论基础");

    // Search for "Raft"
    const searchInput = page.locator("input[placeholder='搜索课程...']");
    await searchInput.fill("Raft");
    
    // Should filter down to Raft course card and hide others
    await expect(page.locator("main.flex-1")).toContainText("分布式共识算法");
    await expect(page.locator("main.flex-1")).not.toContainText("图论基础");

    // Clear search and filter by level (Advanced)
    await searchInput.fill("");
    await page.getByRole("checkbox", { name: "高级 Advanced" }).click();

    // Check filtered cards
    await expect(page.locator("main.flex-1")).toContainText("高级动态规划");
    await expect(page.locator("main.flex-1")).toContainText("PostgreSQL 内核原理");
    await expect(page.locator("main.flex-1")).toContainText("应用密码学");
    await expect(page.locator("main.flex-1")).not.toContainText("图论基础"); // Intermediate
  });

  test("should handle Careers Center job board filters and Resume Builder modal operations", async ({ page }) => {
    await page.goto("/careers");

    // Click REMOTE filter
    await page.getByRole("button", { name: "远程" }).click();
    await expect(page.locator("section:has-text('Tech Job Board')")).toContainText("Stripe");
    await expect(page.locator("section:has-text('Tech Job Board')")).toContainText("OpenAI");
    await expect(page.locator("section:has-text('Tech Job Board')")).not.toContainText("Vercel");

    // Click ON-SITE filter
    await page.getByRole("button", { name: "线下" }).click();
    await expect(page.locator("section:has-text('Tech Job Board')")).toContainText("Vercel");
    await expect(page.locator("section:has-text('Tech Job Board')")).toContainText("AWS");
    await expect(page.locator("section:has-text('Tech Job Board')")).not.toContainText("Stripe");

    // Open Resume Builder
    await page.getByRole("button", { name: "编辑简历" }).click();
    const modal = page.locator(".fixed.inset-0");
    await expect(modal).toBeVisible();

    // Type new name in builder form
    const nameInput = modal.locator("label:has-text('姓名') + input");
    await nameInput.fill("王五");

    // Verify preview reflects updated name in real-time
    const previewContainer = modal.locator("#ats-resume-print");
    await expect(previewContainer.locator("h1")).toHaveText("王五");

    // Close Modal
    await modal.getByRole("button").filter({ hasText: "close" }).click();
    await expect(modal).not.toBeVisible();
  });

  test("should load dynamic coding exercise templates from Career mock interviews", async ({ page }) => {
    await page.goto("/careers");

    // Find Mock Interviews section and click "开始会话" on Graph Traversal
    const graphSection = page.locator("section:has-text('Mock Interviews') .group:has-text('图遍历')");
    await graphSection.getByRole("button", { name: "开始会话" }).click();

    // Verify redirection to lab with parameters
    await expect(page).toHaveURL(/\/lab\?problem=graph/);

    // Verify instructions and editor fileName show Graph details
    await expect(page.locator("aside")).toContainText("岛屿数量");
    await expect(page.locator("header")).toContainText("GRAPH TRAVERSAL");
    await expect(page.locator("header")).not.toContainText("DYNAMIC PROGRAMMING");
    await expect(page.locator("body")).toContainText("solution_graph.py");
  });
});
