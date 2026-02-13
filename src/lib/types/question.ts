import type { CategoryId } from "./category";

export type Severity = "critical" | "high" | "medium" | "low";

export type QuestionType = "boolean" | "select" | "text";

export interface QuestionOption {
  value: string;
  label: string;
  score: number;
}

export interface Question {
  id: string;
  categoryId: CategoryId;
  text: string;
  helpText?: string;
  severity: Severity;
  type: QuestionType;
  options?: QuestionOption[];
  /** ID of another question whose answer must be truthy for this one to appear */
  conditionalOn?: string;
  /** The "safe" answer value that gets full score */
  safeAnswer: string;
}
