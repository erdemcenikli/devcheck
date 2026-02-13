import type { Question } from "@/lib/types";

export const QUESTIONS: Question[] = [
  // ── App Completeness (2.1) ──────────────────────────────────────
  {
    id: "completeness-crashes",
    categoryId: "app-completeness",
    text: "Have you thoroughly tested your app for crashes and bugs?",
    helpText: "Apple will reject apps that crash during review.",
    severity: "critical",
    type: "boolean",
    safeAnswer: "yes",
  },
  {
    id: "completeness-placeholders",
    categoryId: "app-completeness",
    text: "Have you removed all placeholder content (lorem ipsum, test data, sample images)?",
    helpText: "Apps with placeholder content are considered incomplete.",
    severity: "high",
    type: "boolean",
    safeAnswer: "yes",
  },
  {
    id: "completeness-demo-credentials",
    categoryId: "app-completeness",
    text: "If your app requires login, have you provided demo credentials in App Store Connect?",
    helpText:
      "Reviewers need access to test your app. Provide a demo account in the review notes.",
    severity: "critical",
    type: "boolean",
    safeAnswer: "yes",
  },
  {
    id: "completeness-broken-links",
    categoryId: "app-completeness",
    text: "Have you verified all links and buttons in the app are functional?",
    helpText: "Broken links or dead-end screens will cause rejection.",
    severity: "high",
    type: "boolean",
    safeAnswer: "yes",
  },
  {
    id: "completeness-clean-install",
    categoryId: "app-completeness",
    text: "Have you tested the app on a clean install (no prior data)?",
    helpText:
      "Reviewers start with a fresh install. Ensure onboarding works without existing data.",
    severity: "medium",
    type: "boolean",
    safeAnswer: "yes",
  },

  // ── Privacy Policy & Data (5.1.1) ──────────────────────────────
  {
    id: "privacy-policy-url",
    categoryId: "privacy-policy",
    text: "Do you have a publicly accessible privacy policy URL?",
    helpText:
      "A privacy policy is required for all apps. It must be accessible without login.",
    severity: "critical",
    type: "boolean",
    safeAnswer: "yes",
  },
  {
    id: "privacy-in-app",
    categoryId: "privacy-policy",
    text: "Is the privacy policy accessible from within the app?",
    helpText: "Users must be able to view the privacy policy inside the app.",
    severity: "high",
    type: "boolean",
    safeAnswer: "yes",
  },
  {
    id: "privacy-data-disclosure",
    categoryId: "privacy-policy",
    text: "Have you accurately filled out the App Privacy section in App Store Connect?",
    helpText:
      "The nutrition label must reflect actual data collection practices.",
    severity: "high",
    type: "boolean",
    safeAnswer: "yes",
  },
  {
    id: "privacy-data-deletion",
    categoryId: "privacy-policy",
    text: "Do you offer a way for users to request deletion of their data?",
    helpText:
      "Apps that collect user data must provide a data deletion mechanism.",
    severity: "high",
    type: "boolean",
    safeAnswer: "yes",
  },

  // ── IAP Compliance (3.1) ───────────────────────────────────────
  {
    id: "iap-sells-digital",
    categoryId: "iap-compliance",
    text: "Does your app sell digital goods or subscriptions?",
    helpText:
      "Digital goods include premium content, subscriptions, virtual currency, etc.",
    severity: "critical",
    type: "boolean",
    safeAnswer: "no",
  },
  {
    id: "iap-uses-apple",
    categoryId: "iap-compliance",
    text: "Are all digital purchases made through Apple's In-App Purchase system?",
    helpText:
      "Digital goods must use Apple IAP. External payment for digital content is not allowed.",
    severity: "critical",
    type: "boolean",
    conditionalOn: "iap-sells-digital",
    safeAnswer: "yes",
  },
  {
    id: "iap-restore-button",
    categoryId: "iap-compliance",
    text: "Does your app have a 'Restore Purchases' button?",
    helpText:
      "Apps with IAP must include a mechanism to restore previous purchases.",
    severity: "high",
    type: "boolean",
    conditionalOn: "iap-sells-digital",
    safeAnswer: "yes",
  },
  {
    id: "iap-no-external",
    categoryId: "iap-compliance",
    text: "Have you removed all external payment links or prompts for digital goods?",
    helpText:
      "You cannot direct users outside the app to purchase digital content.",
    severity: "critical",
    type: "boolean",
    conditionalOn: "iap-sells-digital",
    safeAnswer: "yes",
  },

  // ── Minimum Functionality (4.2) ────────────────────────────────
  {
    id: "min-func-not-web-wrapper",
    categoryId: "minimum-functionality",
    text: "Is your app more than a simple website wrapped in a native shell?",
    helpText:
      "Apps that are merely web views without native functionality may be rejected.",
    severity: "high",
    type: "boolean",
    safeAnswer: "yes",
  },
  {
    id: "min-func-standalone",
    categoryId: "minimum-functionality",
    text: "Does your app provide standalone value beyond what a website offers?",
    helpText:
      "The app should leverage native capabilities like push notifications, camera, etc.",
    severity: "medium",
    type: "boolean",
    safeAnswer: "yes",
  },

  // ── User Generated Content (1.2) ──────────────────────────────
  {
    id: "ugc-has-content",
    categoryId: "user-generated-content",
    text: "Does your app allow users to post content visible to other users?",
    helpText:
      "This includes comments, photos, videos, messages, or any shared content.",
    severity: "high",
    type: "boolean",
    safeAnswer: "no",
  },
  {
    id: "ugc-report",
    categoryId: "user-generated-content",
    text: "Can users report objectionable content?",
    helpText: "A reporting mechanism is required for apps with UGC.",
    severity: "critical",
    type: "boolean",
    conditionalOn: "ugc-has-content",
    safeAnswer: "yes",
  },
  {
    id: "ugc-moderation",
    categoryId: "user-generated-content",
    text: "Do you have content moderation or filtering in place?",
    helpText:
      "Apps must filter objectionable content to protect users.",
    severity: "high",
    type: "boolean",
    conditionalOn: "ugc-has-content",
    safeAnswer: "yes",
  },
  {
    id: "ugc-block",
    categoryId: "user-generated-content",
    text: "Can users block other users?",
    helpText: "A blocking mechanism is required for social/UGC apps.",
    severity: "medium",
    type: "boolean",
    conditionalOn: "ugc-has-content",
    safeAnswer: "yes",
  },

  // ── Intellectual Property (5.2) ────────────────────────────────
  {
    id: "ip-original-assets",
    categoryId: "intellectual-property",
    text: "Are all assets in your app original or properly licensed?",
    helpText:
      "Using copyrighted images, music, or content without permission will cause rejection.",
    severity: "high",
    type: "boolean",
    safeAnswer: "yes",
  },
  {
    id: "ip-trademark",
    categoryId: "intellectual-property",
    text: "Have you verified your app name and branding don't infringe on existing trademarks?",
    helpText:
      "Apple rejects apps with names or icons too similar to established brands.",
    severity: "high",
    type: "boolean",
    safeAnswer: "yes",
  },

  // ── Design Quality (4.1/4.3) ──────────────────────────────────
  {
    id: "design-polished",
    categoryId: "design-quality",
    text: "Does your app have a polished, professional user interface?",
    helpText:
      "Apple may reject apps that appear unfinished or have poor visual design.",
    severity: "medium",
    type: "boolean",
    safeAnswer: "yes",
  },
  {
    id: "design-hig",
    categoryId: "design-quality",
    text: "Does your app follow Apple's Human Interface Guidelines?",
    helpText:
      "Apps should use standard UI patterns and navigation that iOS users expect.",
    severity: "medium",
    type: "boolean",
    safeAnswer: "yes",
  },
  {
    id: "design-screen-sizes",
    categoryId: "design-quality",
    text: "Does your app support all screen sizes for its target devices?",
    helpText:
      "If you target iPad, the app must work properly on all iPad sizes.",
    severity: "medium",
    type: "boolean",
    safeAnswer: "yes",
  },

  // ── Software Requirements (2.5) ────────────────────────────────
  {
    id: "sw-private-apis",
    categoryId: "software-requirements",
    text: "Have you verified your app doesn't use any private Apple APIs?",
    helpText: "Using undocumented APIs will cause automatic rejection.",
    severity: "critical",
    type: "boolean",
    safeAnswer: "yes",
  },
  {
    id: "sw-ipv6",
    categoryId: "software-requirements",
    text: "Have you tested your app on an IPv6-only network?",
    helpText: "Apps must work on IPv6 networks. Apple's review network is IPv6.",
    severity: "medium",
    type: "boolean",
    safeAnswer: "yes",
  },
];

export const QUESTION_MAP = Object.fromEntries(
  QUESTIONS.map((q) => [q.id, q])
) as Record<string, Question>;
