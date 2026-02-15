import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
    test("header Start Check links to /check", async ({ page }) => {
        await page.goto("/");
        await page.getByRole("link", { name: /start check/i }).first().click();
        await expect(page).toHaveURL("/check");
    });

    test("header API Docs links to /api-docs", async ({ page }) => {
        await page.goto("/");
        await page.getByRole("link", { name: /api docs/i }).first().click();
        await expect(page).toHaveURL("/api-docs");
    });

    test("header Pricing links to /pricing", async ({ page }) => {
        await page.goto("/");
        await page.getByRole("link", { name: /pricing/i }).first().click();
        await expect(page).toHaveURL("/pricing");
    });

    test("header How it works link works from /api-docs", async ({ page }) => {
        await page.goto("/api-docs");
        await page.getByRole("link", { name: /how it works/i }).click();
        await expect(page).toHaveURL("/#how-it-works");
    });

    test("footer Product links navigate correctly", async ({ page }) => {
        await page.goto("/");

        // Scroll to footer
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

        const footerCheckLink = page.locator("footer").getByRole("link", { name: /run a check/i });
        await expect(footerCheckLink).toHaveAttribute("href", "/check");

        const footerPricingLink = page.locator("footer").getByRole("link", { name: /pricing/i });
        await expect(footerPricingLink).toHaveAttribute("href", "/pricing");

        const footerApiLink = page.locator("footer").getByRole("link", { name: /api docs/i });
        await expect(footerApiLink).toHaveAttribute("href", "/api-docs");
    });

    test("mobile menu opens and shows nav links", async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 });
        await page.goto("/");

        // Click hamburger
        await page.getByLabel(/toggle menu/i).click();

        // Nav links should be visible
        await expect(page.getByRole("link", { name: /how it works/i })).toBeVisible();
        await expect(page.getByRole("link", { name: /api docs/i })).toBeVisible();
        await expect(page.getByRole("link", { name: /pricing/i })).toBeVisible();
    });
});
