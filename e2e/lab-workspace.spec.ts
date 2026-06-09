import { test, expect } from "@playwright/test";

test.describe("Lab Workspace", () => {
  test("should handle case switching and code running/submitting successfully", async ({ page }) => {
    // Go to lab workspace
    await page.goto("/lab");

    // Case 1 active by default
    const inputField = page.locator("label:has-text('Input: n =') + input");
    await expect(inputField).toHaveValue("2");
    
    const expectedOutputDiv = page.locator("label:has-text('Expected Output =') + div");
    await expect(expectedOutputDiv).toHaveText("2");

    // Switch to Case 2
    await page.getByRole("button", { name: "Case 2" }).click();
    await expect(inputField).toHaveValue("3");
    await expect(expectedOutputDiv).toHaveText("3");

    // Switch to Case 3
    await page.getByRole("button", { name: "Case 3" }).click();
    await expect(inputField).toHaveValue("45");
    await expect(expectedOutputDiv).toHaveText("1836311903");

    // Switch back to Case 1
    await page.getByRole("button", { name: "Case 1" }).click();
    await expect(inputField).toHaveValue("2");

    // Edit the input value
    await inputField.fill("10");
    await expect(inputField).toHaveValue("10");

    // Click Run Code (运行代码) button.
    // The button has text containing "运行代码" and an icon
    const runButton = page.getByRole("button").filter({ hasText: "运行代码" });
    await runButton.click();

    // Verify it transitions to "运行中..."
    const runningButton = page.getByRole("button").filter({ hasText: "运行中..." });
    await expect(runningButton).toBeDisabled();

    // Verify console displays running message
    const consoleOutput = page.locator("pre");
    await expect(consoleOutput).toContainText("运行测试中...");

    // Wait for the mock runtime simulation to complete (1.2s + buffer)
    await expect(consoleOutput).toContainText("✔ 测试用例 1 通过！", { timeout: 3000 });

    // Set up a listener for the page dialog/alert
    let dialogMessage = "";
    page.on("dialog", async (dialog) => {
      dialogMessage = dialog.message();
      await dialog.accept();
    });

    // Click Submit (提交) button
    const submitButton = page.getByRole("button").filter({ hasText: "提交" });
    await submitButton.click();

    // Verify it transitions to "提交中..."
    const submittingButton = page.getByRole("button").filter({ hasText: "提交中..." });
    await expect(submittingButton).toBeDisabled();

    // Wait for dialog alert message (1.5s + buffer)
    await page.waitForTimeout(2000);
    expect(dialogMessage).toContain("所有测试用例均已通过！");
  });
});
