import { describe, it, expect } from "vitest";
import { getGrade, getVerdict } from "../feedback";

describe("getGrade", () => {
    it('returns "A" for score >= 90', () => {
        expect(getGrade(90)).toBe("A");
        expect(getGrade(100)).toBe("A");
        expect(getGrade(95)).toBe("A");
    });

    it('returns "B" for score 80-89', () => {
        expect(getGrade(80)).toBe("B");
        expect(getGrade(89)).toBe("B");
    });

    it('returns "C" for score 65-79', () => {
        expect(getGrade(65)).toBe("C");
        expect(getGrade(79)).toBe("C");
    });

    it('returns "D" for score 50-64', () => {
        expect(getGrade(50)).toBe("D");
        expect(getGrade(64)).toBe("D");
    });

    it('returns "F" for score < 50', () => {
        expect(getGrade(49)).toBe("F");
        expect(getGrade(0)).toBe("F");
        expect(getGrade(25)).toBe("F");
    });
});

describe("getVerdict", () => {
    it('returns "ready" for high score without critical issues', () => {
        const { verdict, text } = getVerdict(85, false);
        expect(verdict).toBe("ready");
        expect(text).toContain("ready");
    });

    it('returns "needs-work" for score 60-84', () => {
        const { verdict } = getVerdict(70, false);
        expect(verdict).toBe("needs-work");
    });

    it('returns "needs-work" for score 85 WITH critical issues', () => {
        const { verdict } = getVerdict(85, true);
        // Score 85 but has critical → still needs-work? Let's check logic:
        // score >= 85 && !hasCritical → ready. 85 && true → not ready → score >= 60 → needs-work
        expect(verdict).toBe("needs-work");
    });

    it('returns "high-risk" for score < 60', () => {
        const { verdict, text } = getVerdict(40, false);
        expect(verdict).toBe("high-risk");
        expect(text).toContain("High risk");
    });

    it('returns "high-risk" for score 0', () => {
        const { verdict } = getVerdict(0, false);
        expect(verdict).toBe("high-risk");
    });
});
