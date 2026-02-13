import type { Grade, Issue, Verdict } from "@/lib/types";

export function getGrade(score: number): Grade {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 65) return "C";
  if (score >= 50) return "D";
  return "F";
}

export function getVerdict(
  score: number,
  hasCritical: boolean,
): { verdict: Verdict; text: string } {
  if (score >= 85 && !hasCritical) {
    return {
      verdict: "ready",
      text: "Your app looks ready for submission. Minor improvements suggested.",
    };
  }
  if (score >= 60) {
    return {
      verdict: "needs-work",
      text: "Your app needs attention. Several issues may cause review delays.",
    };
  }
  return {
    verdict: "high-risk",
    text: "High risk of rejection. Critical issues must be resolved before submitting.",
  };
}

export function getRecommendation(issue: Issue): string {
  return issue.recommendation;
}
