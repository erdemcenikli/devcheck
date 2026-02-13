import type { CategoryId } from "@/lib/types";

export const CATEGORY_WEIGHTS: Record<CategoryId, number> = {
  "app-completeness": 0.18,
  "accurate-metadata": 0.12,
  "privacy-policy": 0.14,
  "privacy-manifest": 0.10,
  "iap-compliance": 0.10,
  "minimum-functionality": 0.08,
  "user-generated-content": 0.07,
  "software-requirements": 0.08,
  "intellectual-property": 0.06,
  "design-quality": 0.07,
};
