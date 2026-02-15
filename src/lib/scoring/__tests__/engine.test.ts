import { describe, it, expect } from "vitest";
import {
    scoreQuestion,
    scoreCategory,
    calculateOverallScore,
    runFullAnalysis,
} from "../engine";
import type { Issue, CategoryResult } from "@/lib/types";

describe("scoreQuestion", () => {
    it("returns 100 for safe answer", () => {
        // "completeness-crashes" has safeAnswer "yes"
        expect(scoreQuestion("completeness-crashes", "yes")).toBe(100);
    });

    it("returns severity penalty for unsafe answer", () => {
        // "completeness-crashes" is severity "critical" → penalty 0
        expect(scoreQuestion("completeness-crashes", "no")).toBe(0);
    });

    it("returns 50 for undefined answer", () => {
        expect(scoreQuestion("completeness-crashes", undefined)).toBe(50);
    });

    it("returns 50 for empty string answer", () => {
        expect(scoreQuestion("completeness-crashes", "")).toBe(50);
    });

    it("returns 0 for unknown question ID", () => {
        expect(scoreQuestion("nonexistent-question", "yes")).toBe(0);
    });

    it("returns 25 for medium severity unsafe answer", () => {
        // "completeness-clean-install" has severity "medium" → penalty 50
        expect(scoreQuestion("completeness-clean-install", "no")).toBe(50);
    });

    it("returns 25 for high severity unsafe answer", () => {
        // "completeness-placeholders" has severity "high" → penalty 25
        expect(scoreQuestion("completeness-placeholders", "no")).toBe(25);
    });
});

describe("scoreCategory", () => {
    it("returns 100% when all questions answered safely", () => {
        const answers: Record<string, string> = {
            "completeness-crashes": "yes",
            "completeness-placeholders": "yes",
            "completeness-demo-credentials": "yes",
            "completeness-broken-links": "yes",
            "completeness-clean-install": "yes",
        };
        const result = scoreCategory("app-completeness", answers, []);
        expect(result.percentage).toBe(100);
        expect(result.categoryId).toBe("app-completeness");
    });

    it("deducts for file issues", () => {
        const answers: Record<string, string> = {
            "completeness-crashes": "yes",
            "completeness-placeholders": "yes",
            "completeness-demo-credentials": "yes",
            "completeness-broken-links": "yes",
            "completeness-clean-install": "yes",
        };
        const issues: Issue[] = [
            {
                id: "test-issue",
                categoryId: "app-completeness",
                severity: "high",
                title: "Test",
                description: "Test issue",
                guidelineSection: "2.1",
                guidelineUrl: "https://example.com",
                recommendation: "Fix it",
                source: "file-analysis",
            },
        ];
        const result = scoreCategory("app-completeness", answers, issues);
        // 500 (all safe) - 75 (high deduction) = 425. 425/500 = 85%
        expect(result.percentage).toBe(85);
        expect(result.issues.length).toBe(1);
    });

    it("returns 50% for all unanswered questions", () => {
        const result = scoreCategory("app-completeness", {}, []);
        expect(result.percentage).toBe(50);
    });
});

describe("calculateOverallScore", () => {
    it("caps score at 60 when critical issues exist", () => {
        const categoryResults: CategoryResult[] = [
            {
                categoryId: "app-completeness",
                score: 500,
                maxScore: 500,
                percentage: 100,
                issues: [
                    {
                        id: "critical-test",
                        categoryId: "app-completeness",
                        severity: "critical",
                        title: "Critical",
                        description: "Critical issue",
                        guidelineSection: "2.1",
                        guidelineUrl: "https://example.com",
                        recommendation: "Fix it",
                        source: "file-analysis",
                    },
                ],
                checkedItems: 5,
            },
        ];
        const { score, hasCritical } = calculateOverallScore(categoryResults);
        expect(hasCritical).toBe(true);
        expect(score).toBeLessThanOrEqual(60);
    });

    it("returns weighted average when no critical issues", () => {
        const categoryResults: CategoryResult[] = [
            {
                categoryId: "app-completeness",
                score: 500,
                maxScore: 500,
                percentage: 100,
                issues: [],
                checkedItems: 5,
            },
            {
                categoryId: "accurate-metadata",
                score: 0,
                maxScore: 500,
                percentage: 0,
                issues: [],
                checkedItems: 0,
            },
        ];
        const { score, hasCritical } = calculateOverallScore(categoryResults);
        expect(hasCritical).toBe(false);
        // Weighted: 100*0.18 + 0*0.12 = 18 / 0.30 = 60
        expect(score).toBe(60);
    });
});

describe("runFullAnalysis", () => {
    it("returns a valid AnalysisResult", () => {
        const result = runFullAnalysis({}, []);
        expect(result).toHaveProperty("overallScore");
        expect(result).toHaveProperty("grade");
        expect(result).toHaveProperty("verdict");
        expect(result).toHaveProperty("verdictText");
        expect(result).toHaveProperty("categories");
        expect(result).toHaveProperty("issues");
        expect(result).toHaveProperty("hasCritical");
        expect(result).toHaveProperty("generatedAt");
        expect(result.categories.length).toBe(10);
        expect(typeof result.overallScore).toBe("number");
    });

    it("returns high score when all answers are safe", () => {
        const allSafe: Record<string, string> = {
            "completeness-crashes": "yes",
            "completeness-placeholders": "yes",
            "completeness-demo-credentials": "yes",
            "completeness-broken-links": "yes",
            "completeness-clean-install": "yes",
            "privacy-policy-url": "yes",
            "privacy-in-app": "yes",
            "privacy-data-disclosure": "yes",
            "privacy-data-deletion": "yes",
            "iap-sells-digital": "no",
            "min-func-not-web-wrapper": "yes",
            "min-func-standalone": "yes",
            "ugc-has-content": "no",
            "ip-original-assets": "yes",
            "ip-trademark": "yes",
            "design-polished": "yes",
            "design-hig": "yes",
            "design-screen-sizes": "yes",
            "sw-private-apis": "yes",
            "sw-ipv6": "yes",
        };
        const result = runFullAnalysis(allSafe, []);
        expect(result.overallScore).toBeGreaterThanOrEqual(85);
        expect(result.grade).toBe("A");
        expect(result.verdict).toBe("ready");
    });

    it("returns low score with critical file issues", () => {
        const issues: Issue[] = [
            {
                id: "critical-1",
                categoryId: "app-completeness",
                severity: "critical",
                title: "Critical Bug",
                description: "App crashes",
                guidelineSection: "2.1",
                guidelineUrl: "https://example.com",
                recommendation: "Fix crashes",
                source: "file-analysis",
            },
        ];
        const result = runFullAnalysis({}, issues);
        expect(result.hasCritical).toBe(true);
        expect(result.overallScore).toBeLessThanOrEqual(60);
    });
});
