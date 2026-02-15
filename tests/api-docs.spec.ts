import { test, expect } from "@playwright/test";

test.describe("API Docs Page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/api-docs");
    });

    test("renders hero with correct headline", async ({ page }) => {
        await expect(
            page.getByRole("heading", { name: /automate app store compliance/i })
        ).toBeVisible();
    });

    test("shows endpoint POST /api/analyze", async ({ page }) => {
        await expect(page.getByText("POST")).toBeVisible();
        await expect(page.getByText("/api/analyze")).toBeVisible();
    });

    test("shows authentication section", async ({ page }) => {
        await expect(
            page.getByRole("heading", { name: /authentication/i })
        ).toBeVisible();
    });

    test("shows request fields table", async ({ page }) => {
        await expect(page.getByText("infoPlist")).toBeVisible();
        await expect(page.getByText("privacyManifest")).toBeVisible();
    });

    test("response comparison shows Free and Pro tabs", async ({ page }) => {
        await expect(page.getByText(/free response/i)).toBeVisible();
    });

    test("pricing CTA links to /pricing", async ({ page }) => {
        const pricingLink = page.getByRole("link", {
            name: /see plans.*pricing/i,
        });
        await pricingLink.scrollIntoViewIfNeeded();
        await expect(pricingLink).toHaveAttribute("href", "/pricing");
    });

    test("View Pricing button links to /pricing", async ({ page }) => {
        const viewPricingLink = page.getByRole("link", {
            name: /view pricing/i,
        });
        await expect(viewPricingLink).toHaveAttribute("href", "/pricing");
    });

    test("rate limits section renders", async ({ page }) => {
        await expect(
            page.getByRole("heading", { name: /rate limits/i })
        ).toBeVisible();
    });
});
