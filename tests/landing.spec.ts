import { test, expect } from "@playwright/test";

test.describe("Landing Page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });

    test("renders hero section with correct headline", async ({ page }) => {
        await expect(
            page.getByRole("heading", { name: /don.t let your app get rejected/i })
        ).toBeVisible();
    });

    test("shows Try Free Check and View API Docs CTAs", async ({ page }) => {
        await expect(page.getByRole("link", { name: /try free check/i })).toBeVisible();
        await expect(page.getByRole("link", { name: /view api docs/i })).toBeVisible();
    });

    test("Try Free Check navigates to /check", async ({ page }) => {
        await page.getByRole("link", { name: /try free check/i }).click();
        await expect(page).toHaveURL("/check");
    });

    test("View API Docs navigates to /api-docs", async ({ page }) => {
        await page.getByRole("link", { name: /view api docs/i }).click();
        await expect(page).toHaveURL("/api-docs");
    });

    test("stats bar shows key numbers", async ({ page }) => {
        await expect(page.getByText(/apps rejected/i)).toBeVisible();
        await expect(page.getByText(/rejection rate/i)).toBeVisible();
        await expect(page.getByText(/categories checked/i)).toBeVisible();
    });

    test("feature grid shows 10 category cards", async ({ page }) => {
        await page.getByText(/what we check/i).scrollIntoViewIfNeeded();
        const cards = page.locator("[data-slot='card']");
        await expect(cards).toHaveCount(10);
    });

    test("how it works section shows 3 steps", async ({ page }) => {
        const section = page.locator("#how-it-works");
        await expect(section).toBeVisible();
        await expect(section.getByText(/upload files/i)).toBeVisible();
        await expect(section.getByText(/answer questions/i)).toBeVisible();
        await expect(section.getByText(/get results/i)).toBeVisible();
    });
});
