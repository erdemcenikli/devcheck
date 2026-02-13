import type {
  CategoryId,
  Severity,
  Issue,
  CategoryResult,
  AnalysisResult,
} from "@/lib/types";
import { QUESTIONS, QUESTION_MAP } from "@/lib/data/questions";
import { CATEGORIES } from "@/lib/data/categories";
import { CATEGORY_WEIGHTS } from "./weights";
import { getGrade, getVerdict } from "./feedback";

const SEVERITY_PENALTY: Record<Severity, number> = {
  critical: 0,
  high: 25,
  medium: 50,
  low: 75,
};

const ISSUE_SEVERITY_DEDUCTION: Record<Severity, number> = {
  critical: 100,
  high: 75,
  medium: 50,
  low: 25,
};

/** Trigger questions where "no" means conditional children don't apply */
const TRIGGER_QUESTIONS = new Set(["iap-sells-digital", "ugc-has-content"]);

export function scoreQuestion(
  questionId: string,
  answer: string | undefined,
): number {
  const question = QUESTION_MAP[questionId];
  if (!question) return 0;

  if (answer === undefined || answer === "") return 50;
  if (answer === question.safeAnswer) return 100;

  return SEVERITY_PENALTY[question.severity];
}

export function scoreCategory(
  categoryId: CategoryId,
  answers: Record<string, string>,
  issues: Issue[],
): CategoryResult {
  const categoryQuestions = QUESTIONS.filter(
    (q) => q.categoryId === categoryId,
  );

  const applicableQuestions = categoryQuestions.filter((q) => {
    if (!q.conditionalOn) return true;
    const parentQuestion = QUESTION_MAP[q.conditionalOn];
    if (!parentQuestion) return true;
    // If the parent is a trigger question and answered "no", children don't apply
    if (TRIGGER_QUESTIONS.has(q.conditionalOn) && answers[q.conditionalOn] === "no") {
      return false;
    }
    // Otherwise, conditional questions appear when parent answer is truthy (answered)
    return answers[q.conditionalOn] !== undefined && answers[q.conditionalOn] !== "";
  });

  const checkedItems = applicableQuestions.filter(
    (q) => answers[q.id] !== undefined && answers[q.id] !== "",
  ).length;

  const maxScore = applicableQuestions.length * 100;

  let questionScore = 0;
  for (const q of applicableQuestions) {
    questionScore += scoreQuestion(q.id, answers[q.id]);
  }

  // Factor in file analysis issues
  const categoryIssues = issues.filter((i) => i.categoryId === categoryId);
  let issueDeduction = 0;
  for (const issue of categoryIssues) {
    issueDeduction += ISSUE_SEVERITY_DEDUCTION[issue.severity];
  }

  const rawScore = Math.max(0, questionScore - issueDeduction);
  const percentage = maxScore > 0 ? Math.round((rawScore / maxScore) * 100) : 100;

  return {
    categoryId,
    score: rawScore,
    maxScore,
    percentage: Math.min(100, Math.max(0, percentage)),
    issues: categoryIssues,
    checkedItems,
  };
}

export function calculateOverallScore(
  categoryResults: CategoryResult[],
): { score: number; hasCritical: boolean } {
  let weightedSum = 0;
  let totalWeight = 0;

  for (const result of categoryResults) {
    const weight = CATEGORY_WEIGHTS[result.categoryId] ?? 0;
    weightedSum += result.percentage * weight;
    totalWeight += weight;
  }

  const rawScore = totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;

  const hasCritical = categoryResults.some((r) =>
    r.issues.some((i) => i.severity === "critical"),
  );

  const score = hasCritical ? Math.min(rawScore, 60) : rawScore;

  return { score, hasCritical };
}

export function runFullAnalysis(
  answers: Record<string, string>,
  fileIssues: Issue[],
): AnalysisResult {
  const categoryResults: CategoryResult[] = CATEGORIES.map((cat) =>
    scoreCategory(cat.id, answers, fileIssues),
  );

  const { score, hasCritical } = calculateOverallScore(categoryResults);
  const { verdict, text } = getVerdict(score, hasCritical);
  const grade = getGrade(score);

  const allIssues = categoryResults.flatMap((r) => r.issues);

  return {
    overallScore: score,
    grade,
    verdict,
    verdictText: text,
    categories: categoryResults,
    issues: allIssues,
    hasCritical,
    generatedAt: new Date().toISOString(),
  };
}
