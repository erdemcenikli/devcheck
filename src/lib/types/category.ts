export type CategoryId =
  | "app-completeness"
  | "accurate-metadata"
  | "privacy-policy"
  | "privacy-manifest"
  | "iap-compliance"
  | "minimum-functionality"
  | "user-generated-content"
  | "software-requirements"
  | "intellectual-property"
  | "design-quality";

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  shortDescription: string;
  guidelineSection: string;
  guidelineUrl: string;
  weight: number;
  icon: string;
}
