import { test, expect } from "@playwright/test";

test.describe("Pricing Page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/pricing");
    });

    test("renders pricing hero headline", async ({ page }) => {
        await expect(
            page.getByRole("heading", { name: /simple.*transparent.*pricing/i })
        ).toBeVisible();
    });

    test("shows 3 pricing tiers with correct prices", async ({ page }) => {
        await expect(page.getByText("$0")).toBeVisible();
        await expect(page.getByText("$29")).toBeVisible();
        await expect(page.getByText("$79")).toBeVisible();
    });

    test("Pro tier has Recommended badge", async ({ page }) => {
        await expect(page.getByText("Recommended")).toBeVisible();
    });

    test("feature comparison table renders", async ({ page }) => {
        await expect(
            page.getByRole("heading", { name: /compare plans/i })
        ).toBeVisible();

        // Check table has headers
        const table = page.locator("table");
        await expect(table).toBeVisible();
        await expect(table.getByText("Free")).toBeVisible();
        await expect(table.getByText("Pro")).toBeVisible();
        await expect(table.getByText("Team")).toBeVisible();
    });

    test("FAQ accordion opens and closes", async ({ page }) => {
        await expect(
            page.getByRole("heading", { name: /frequently asked/i })
        ).toBeVisible();

        // Click first FAQ item
        const firstTrigger = page.locator("[data-slot='accordion-trigger']").first();
        await firstTrigger.click();

        // Content should be visible
        const firstContent = page.locator("[data-slot='accordion-content']").first();
        await expect(firstContent).toBeVisible();

        // Click again to close
        await firstTrigger.click();
        await expect(firstContent).not.toBeVisible();
    });
});
