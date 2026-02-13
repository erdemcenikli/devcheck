import type { Category } from "@/lib/types";

export const CATEGORIES: Category[] = [
  {
    id: "app-completeness",
    name: "App Completeness",
    description:
      "Your app must be fully functional before submission. No crashes, placeholder content, or broken features.",
    shortDescription: "Crash-free, no placeholders, working links",
    guidelineSection: "2.1",
    guidelineUrl:
      "https://developer.apple.com/app-store/review/guidelines/#performance",
    weight: 0.18,
    icon: "CheckCircle2",
  },
  {
    id: "accurate-metadata",
    name: "Accurate Metadata",
    description:
      "App metadata must accurately reflect the app's functionality. No misleading descriptions, keyword stuffing, or invalid screenshots.",
    shortDescription: "Description, keywords, screenshots validated",
    guidelineSection: "2.3",
    guidelineUrl:
      "https://developer.apple.com/app-store/review/guidelines/#performance",
    weight: 0.12,
    icon: "FileText",
  },
  {
    id: "privacy-policy",
    name: "Privacy Policy & Data",
    description:
      "Apps must have a privacy policy and clearly disclose data collection, storage, and sharing practices.",
    shortDescription: "Policy URL, data disclosure, permissions",
    guidelineSection: "5.1.1",
    guidelineUrl:
      "https://developer.apple.com/app-store/review/guidelines/#legal",
    weight: 0.14,
    icon: "Shield",
  },
  {
    id: "privacy-manifest",
    name: "Privacy Manifest",
    description:
      "Apps must include a valid PrivacyInfo.xcprivacy manifest declaring required reason APIs, tracking domains, and data collection types.",
    shortDescription: "Required reason APIs, tracking domains",
    guidelineSection: "5.1.1-5.1.2",
    guidelineUrl:
      "https://developer.apple.com/documentation/bundleresources/privacy_manifest_files",
    weight: 0.1,
    icon: "Fingerprint",
  },
  {
    id: "iap-compliance",
    name: "IAP Compliance",
    description:
      "Digital goods and subscriptions must use Apple's In-App Purchase system. No external payment links for digital content.",
    shortDescription: "Apple IAP, restore button, no external payments",
    guidelineSection: "3.1",
    guidelineUrl:
      "https://developer.apple.com/app-store/review/guidelines/#business",
    weight: 0.1,
    icon: "CreditCard",
  },
  {
    id: "minimum-functionality",
    name: "Minimum Functionality",
    description:
      "Apps must provide standalone value beyond a simple website wrapper and offer meaningful native functionality.",
    shortDescription: "Not a web wrapper, standalone value",
    guidelineSection: "4.2",
    guidelineUrl:
      "https://developer.apple.com/app-store/review/guidelines/#design",
    weight: 0.08,
    icon: "Zap",
  },
  {
    id: "user-generated-content",
    name: "User Generated Content",
    description:
      "Apps with user-generated content must include reporting, filtering, and user blocking capabilities.",
    shortDescription: "Report mechanism, moderation, blocking",
    guidelineSection: "1.2",
    guidelineUrl:
      "https://developer.apple.com/app-store/review/guidelines/#safety",
    weight: 0.07,
    icon: "Users",
  },
  {
    id: "software-requirements",
    name: "Software Requirements",
    description:
      "Apps must meet technical requirements including minimum OS version, App Transport Security, proper background mode usage, and IPv6 support.",
    shortDescription: "iOS version, ATS, background modes",
    guidelineSection: "2.5",
    guidelineUrl:
      "https://developer.apple.com/app-store/review/guidelines/#performance",
    weight: 0.08,
    icon: "Cpu",
  },
  {
    id: "intellectual-property",
    name: "Intellectual Property",
    description:
      "Apps must use original content or properly licensed assets. No trademark infringement or unauthorized third-party content.",
    shortDescription: "Original assets, trademark compliance",
    guidelineSection: "5.2",
    guidelineUrl:
      "https://developer.apple.com/app-store/review/guidelines/#legal",
    weight: 0.06,
    icon: "Scale",
  },
  {
    id: "design-quality",
    name: "Design Quality",
    description:
      "Apps must have a polished, professional UI that follows Human Interface Guidelines and supports all target screen sizes.",
    shortDescription: "Polished UI, HIG, screen sizes",
    guidelineSection: "4.1/4.3",
    guidelineUrl:
      "https://developer.apple.com/app-store/review/guidelines/#design",
    weight: 0.07,
    icon: "Palette",
  },
];

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c])
) as Record<string, Category>;
