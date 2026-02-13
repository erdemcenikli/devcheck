import type { CategoryId } from "./category";
import type { Severity } from "./question";

export type Grade = "A" | "B" | "C" | "D" | "F";

export type Verdict = "ready" | "needs-work" | "high-risk";

export interface Issue {
  id: string;
  categoryId: CategoryId;
  severity: Severity;
  title: string;
  description: string;
  guidelineSection: string;
  guidelineUrl: string;
  recommendation: string;
  source: "file-analysis" | "questionnaire";
}

export interface CategoryResult {
  categoryId: CategoryId;
  score: number;
  maxScore: number;
  percentage: number;
  issues: Issue[];
  checkedItems: number;
}

export interface AnalysisResult {
  overallScore: number;
  grade: Grade;
  verdict: Verdict;
  verdictText: string;
  categories: CategoryResult[];
  issues: Issue[];
  hasCritical: boolean;
  generatedAt: string;
}

export interface MetadataInput {
  appName: string;
  description: string;
  keywords: string;
  primaryCategory: string;
  ageRating: string;
}

export interface CheckState {
  infoPlist: File | null;
  infoPlistContent: string | null;
  privacyManifest: File | null;
  privacyManifestContent: string | null;
  screenshots: File[];
  metadata: MetadataInput;
  answers: Record<string, string>;
  currentStep: number;
  result: AnalysisResult | null;
}
