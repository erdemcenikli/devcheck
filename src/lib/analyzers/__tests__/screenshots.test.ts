import { describe, it, expect } from "vitest";
import { analyzeScreenshots } from "../screenshots";

describe("analyzeScreenshots", () => {
    it("flags no screenshots as critical", () => {
        const issues = analyzeScreenshots([]);
        expect(issues.length).toBe(1);
        expect(issues[0].id).toBe("screenshots-metadata-no-screenshots");
        expect(issues[0].severity).toBe("critical");
    });

    it("flags invalid screenshot dimensions", () => {
        const issues = analyzeScreenshots([
            { width: 800, height: 600, name: "bad-shot.png" },
        ]);
        expect(issues.length).toBe(1);
        expect(issues[0].id).toContain("screenshots-metadata-invalid-dimensions");
        expect(issues[0].severity).toBe("high");
    });

    it("accepts valid iPhone 6.7 inch portrait dimensions", () => {
        const issues = analyzeScreenshots([
            { width: 1290, height: 2796, name: "iphone-portrait.png" },
        ]);
        expect(issues).toEqual([]);
    });

    it("accepts valid iPhone 6.7 inch landscape dimensions", () => {
        const issues = analyzeScreenshots([
            { width: 2796, height: 1290, name: "iphone-landscape.png" },
        ]);
        expect(issues).toEqual([]);
    });

    it("accepts valid iPad Pro 12.9 inch dimensions", () => {
        const issues = analyzeScreenshots([
            { width: 2048, height: 2732, name: "ipad-shot.png" },
        ]);
        expect(issues).toEqual([]);
    });

    it("flags mix of valid and invalid dimensions", () => {
        const issues = analyzeScreenshots([
            { width: 1290, height: 2796, name: "valid.png" },
            { width: 500, height: 500, name: "invalid.png" },
        ]);
        expect(issues.length).toBe(1);
        expect(issues[0].id).toContain("invalid.png");
    });
});
