import { describe, it, expect } from "vitest";
import { analyzeMetadata } from "../metadata";
import type { MetadataInput } from "@/lib/types";

function makeMetadata(overrides: Partial<MetadataInput> = {}): MetadataInput {
    return {
        appName: "My Test App",
        description:
            "A comprehensive test application that helps users manage their daily tasks and productivity workflows.",
        keywords: "productivity,tasks,planner",
        primaryCategory: "Productivity",
        ageRating: "4+",
        ...overrides,
    };
}

describe("analyzeMetadata", () => {
    it("returns no issues for valid metadata", () => {
        const issues = analyzeMetadata(makeMetadata());
        expect(issues).toEqual([]);
    });

    // --- App name ---
    it("flags empty app name as critical", () => {
        const issues = analyzeMetadata(makeMetadata({ appName: "" }));
        expect(issues.some((i) => i.id === "metadata-accuracy-empty-app-name")).toBe(true);
        expect(issues.find((i) => i.id === "metadata-accuracy-empty-app-name")?.severity).toBe(
            "critical"
        );
    });

    it("flags app name exceeding 30 characters", () => {
        const issues = analyzeMetadata(
            makeMetadata({ appName: "A".repeat(31) })
        );
        expect(issues.some((i) => i.id === "metadata-accuracy-long-app-name")).toBe(true);
        expect(issues.find((i) => i.id === "metadata-accuracy-long-app-name")?.severity).toBe("high");
    });

    it("accepts app name at exactly 30 characters", () => {
        const issues = analyzeMetadata(
            makeMetadata({ appName: "A".repeat(30) })
        );
        expect(issues.some((i) => i.id === "metadata-accuracy-long-app-name")).toBe(false);
    });

    // --- Description ---
    it("flags empty description as critical", () => {
        const issues = analyzeMetadata(makeMetadata({ description: "" }));
        expect(
            issues.some((i) => i.id === "metadata-accuracy-empty-description")
        ).toBe(true);
    });

    it("flags very short description (< 50 chars)", () => {
        const issues = analyzeMetadata(
            makeMetadata({ description: "A short app." })
        );
        expect(
            issues.some(
                (i) => i.id === "metadata-accuracy-very-short-description"
            )
        ).toBe(true);
    });

    it("flags short description (50-99 chars)", () => {
        const issues = analyzeMetadata(
            makeMetadata({
                description: "A reasonably good app that does many things for its users daily.",
            })
        );
        expect(
            issues.some((i) => i.id === "metadata-accuracy-short-description")
        ).toBe(true);
    });

    // --- Keywords ---
    it("flags keywords exceeding 100 characters", () => {
        const longKeywords = Array(30).fill("keyword").join(",");
        const issues = analyzeMetadata(makeMetadata({ keywords: longKeywords }));
        expect(
            issues.some((i) => i.id === "metadata-accuracy-keywords-too-long")
        ).toBe(true);
    });

    it("flags repeated keywords (keyword stuffing)", () => {
        const issues = analyzeMetadata(
            makeMetadata({ keywords: "photo,camera,photo,edit" })
        );
        expect(
            issues.some(
                (i) => i.id === "metadata-accuracy-keyword-stuffing-repeats"
            )
        ).toBe(true);
    });

    it("flags excessive commas in keywords", () => {
        const issues = analyzeMetadata(
            makeMetadata({ keywords: "photo,,," })
        );
        expect(
            issues.some(
                (i) => i.id === "metadata-accuracy-keyword-stuffing-commas"
            )
        ).toBe(true);
    });

    // --- Category ---
    it("flags invalid category", () => {
        const issues = analyzeMetadata(
            makeMetadata({ primaryCategory: "NotACategory" })
        );
        expect(
            issues.some((i) => i.id === "metadata-accuracy-invalid-category")
        ).toBe(true);
    });

    it("accepts valid category", () => {
        const issues = analyzeMetadata(
            makeMetadata({ primaryCategory: "Games" })
        );
        expect(
            issues.some((i) => i.id === "metadata-accuracy-invalid-category")
        ).toBe(false);
    });

    // --- Age rating ---
    it("flags invalid age rating", () => {
        const issues = analyzeMetadata(
            makeMetadata({ ageRating: "18+" })
        );
        expect(
            issues.some((i) => i.id === "metadata-accuracy-invalid-age-rating")
        ).toBe(true);
    });

    it("accepts valid age rating", () => {
        const issues = analyzeMetadata(makeMetadata({ ageRating: "17+" }));
        expect(
            issues.some((i) => i.id === "metadata-accuracy-invalid-age-rating")
        ).toBe(false);
    });
});
