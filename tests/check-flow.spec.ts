import { test, expect } from "@playwright/test";

test.describe("Check Flow", () => {
    test("completes full flow: metadata → questionnaire → results", async ({
        page,
    }) => {
        await page.goto("/check");

        // Step 0: Fill metadata form
        await page.getByLabel(/app name/i).fill("TestApp");
        await page.getByLabel(/description/i).fill("A test application for review compliance");
        await page.getByLabel(/keywords/i).fill("test, compliance, app");
        await page.getByLabel(/primary category/i).selectOption({ index: 1 });
        await page.getByLabel(/age rating/i).selectOption("4+");

        // Go to questionnaire
        await page.getByRole("button", { name: /next/i }).click();

        // Step 1: Answer some questions
        const yesButtons = page.getByRole("button", { name: /^yes$/i });
        const count = await yesButtons.count();
        for (let i = 0; i < Math.min(count, 3); i++) {
            await yesButtons.nth(i).click();
        }

        // Submit
        await page.getByRole("button", { name: /analyze/i }).click();

        // Should navigate to results
        await page.waitForURL("/results", { timeout: 10000 });
        await expect(page).toHaveURL("/results");

        // Verify results page content
        await expect(page.getByText(/overall score/i)).toBeVisible();
        await expect(page.getByText(/view plans/i)).toBeVisible();
    });

    test("results page View Plans links to /pricing", async ({ page }) => {
        // Complete the flow first
        await page.goto("/check");
        await page.getByLabel(/app name/i).fill("TestApp");
        await page.getByLabel(/description/i).fill("A test application");
        await page.getByLabel(/primary category/i).selectOption({ index: 1 });
        await page.getByLabel(/age rating/i).selectOption("4+");
        await page.getByRole("button", { name: /next/i }).click();
        await page.getByRole("button", { name: /analyze/i }).click();
        await page.waitForURL("/results", { timeout: 10000 });

        // Click View Plans
        await page.getByRole("link", { name: /view plans/i }).click();
        await expect(page).toHaveURL("/pricing");
    });

    test("results page Export Report triggers download", async ({ page }) => {
        await page.goto("/check");
        await page.getByLabel(/app name/i).fill("TestApp");
        await page.getByLabel(/description/i).fill("A test application");
        await page.getByLabel(/primary category/i).selectOption({ index: 1 });
        await page.getByLabel(/age rating/i).selectOption("4+");
        await page.getByRole("button", { name: /next/i }).click();
        await page.getByRole("button", { name: /analyze/i }).click();
        await page.waitForURL("/results", { timeout: 10000 });

        // Check export button exists
        const exportBtn = page.getByRole("button", { name: /export/i });
        await expect(exportBtn).toBeVisible();
    });

    test("New Check resets and navigates to /check", async ({ page }) => {
        await page.goto("/check");
        await page.getByLabel(/app name/i).fill("TestApp");
        await page.getByLabel(/description/i).fill("A test application");
        await page.getByLabel(/primary category/i).selectOption({ index: 1 });
        await page.getByLabel(/age rating/i).selectOption("4+");
        await page.getByRole("button", { name: /next/i }).click();
        await page.getByRole("button", { name: /analyze/i }).click();
        await page.waitForURL("/results", { timeout: 10000 });

        await page.getByRole("button", { name: /new check/i }).click();
        await expect(page).toHaveURL("/check");
    });
});
