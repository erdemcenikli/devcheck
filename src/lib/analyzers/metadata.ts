import type { Issue, MetadataInput } from "@/lib/types";
import {
  APP_CATEGORIES,
  AGE_RATINGS,
  GUIDELINES,
} from "@/lib/data/guidelines";

export function analyzeMetadata(metadata: MetadataInput): Issue[] {
  const issues: Issue[] = [];

  // --- App name validation ---
  if (!metadata.appName || metadata.appName.trim().length === 0) {
    issues.push({
      id: "metadata-accuracy-empty-app-name",
      categoryId: "accurate-metadata",
      severity: "critical",
      title: "App name is empty",
      description:
        "No app name has been provided. An app name is required for App Store submission.",
      recommendation:
        "Provide a descriptive app name that clearly represents your app. The name must be 30 characters or fewer.",
      guidelineSection: GUIDELINES["2.3"].section,
      guidelineUrl: GUIDELINES["2.3"].url,
      source: "file-analysis",
    });
  } else if (metadata.appName.trim().length > 30) {
    issues.push({
      id: "metadata-accuracy-long-app-name",
      categoryId: "accurate-metadata",
      severity: "high",
      title: "App name exceeds 30 characters",
      description: `The app name "${metadata.appName.trim()}" is ${metadata.appName.trim().length} characters. Apple limits app names to 30 characters.`,
      recommendation:
        "Shorten your app name to 30 characters or fewer.",
      guidelineSection: GUIDELINES["2.3"].section,
      guidelineUrl: GUIDELINES["2.3"].url,
      source: "file-analysis",
    });
  }

  // --- Description validation ---
  const descLength = metadata.description.trim().length;

  if (descLength === 0) {
    issues.push({
      id: "metadata-accuracy-empty-description",
      categoryId: "accurate-metadata",
      severity: "critical",
      title: "App description is empty",
      description:
        "No app description has been provided. A description is required for App Store submission.",
      recommendation:
        "Write a clear, informative description that explains what your app does and its key features.",
      guidelineSection: GUIDELINES["2.3"].section,
      guidelineUrl: GUIDELINES["2.3"].url,
      source: "file-analysis",
    });
  } else if (descLength < 50) {
    issues.push({
      id: "metadata-accuracy-very-short-description",
      categoryId: "accurate-metadata",
      severity: "high",
      title: "App description is too short",
      description: `The description is only ${descLength} characters. Extremely short descriptions may be flagged by App Review as insufficient.`,
      recommendation:
        "Expand your description to at least 100 characters. Include your app's purpose, key features, and what makes it valuable.",
      guidelineSection: GUIDELINES["2.3"].section,
      guidelineUrl: GUIDELINES["2.3"].url,
      source: "file-analysis",
    });
  } else if (descLength < 100) {
    issues.push({
      id: "metadata-accuracy-short-description",
      categoryId: "accurate-metadata",
      severity: "medium",
      title: "App description could be more detailed",
      description: `The description is ${descLength} characters. While not critically short, a more detailed description improves discoverability and gives reviewers confidence in your app.`,
      recommendation:
        "Consider expanding your description to clearly communicate your app's features, benefits, and target audience.",
      guidelineSection: GUIDELINES["2.3"].section,
      guidelineUrl: GUIDELINES["2.3"].url,
      source: "file-analysis",
    });
  }

  // --- Keywords validation ---
  const keywords = metadata.keywords.trim();

  if (keywords.length > 0) {
    if (keywords.length > 100) {
      issues.push({
        id: "metadata-accuracy-keywords-too-long",
        categoryId: "accurate-metadata",
        severity: "high",
        title: "Keywords exceed 100 character limit",
        description: `Keywords are ${keywords.length} characters. Apple limits the keywords field to 100 characters.`,
        recommendation:
          "Reduce your keywords to 100 characters or fewer. Focus on the most relevant, high-value terms.",
        guidelineSection: GUIDELINES["2.3"].section,
        guidelineUrl: GUIDELINES["2.3"].url,
        source: "file-analysis",
      });
    }

    // Detect keyword stuffing: repeated words
    const words = keywords
      .toLowerCase()
      .split(/[,\s]+/)
      .filter((w) => w.length > 0);
    const wordCounts = new Map<string, number>();
    for (const word of words) {
      wordCounts.set(word, (wordCounts.get(word) ?? 0) + 1);
    }
    const repeatedWords = [...wordCounts.entries()]
      .filter(([, count]) => count > 1)
      .map(([word]) => word);

    if (repeatedWords.length > 0) {
      issues.push({
        id: "metadata-accuracy-keyword-stuffing-repeats",
        categoryId: "accurate-metadata",
        severity: "high",
        title: "Keyword stuffing detected: repeated words",
        description: `The following keywords appear more than once: ${repeatedWords.join(", ")}. Repeating keywords does not improve ranking and may trigger a rejection for keyword stuffing.`,
        recommendation:
          "Remove duplicate keywords. Each keyword should appear only once. Use the space for additional unique, relevant terms.",
        guidelineSection: GUIDELINES["2.3"].section,
        guidelineUrl: GUIDELINES["2.3"].url,
        source: "file-analysis",
      });
    }

    // Detect excessive commas (e.g., "a,,b" or trailing commas)
    const commaCount = (keywords.match(/,/g) ?? []).length;
    const termCount = keywords
      .split(",")
      .filter((t) => t.trim().length > 0).length;
    if (commaCount > 0 && commaCount >= termCount) {
      issues.push({
        id: "metadata-accuracy-keyword-stuffing-commas",
        categoryId: "accurate-metadata",
        severity: "medium",
        title: "Keywords have excessive separators",
        description:
          "The keywords field has more commas than actual terms, suggesting empty entries or formatting issues.",
        recommendation:
          "Clean up your keywords by removing empty entries, trailing commas, and unnecessary separators.",
        guidelineSection: GUIDELINES["2.3"].section,
        guidelineUrl: GUIDELINES["2.3"].url,
        source: "file-analysis",
      });
    }
  }

  // --- Category validation ---
  if (
    metadata.primaryCategory &&
    !(APP_CATEGORIES as readonly string[]).includes(metadata.primaryCategory)
  ) {
    issues.push({
      id: "metadata-accuracy-invalid-category",
      categoryId: "accurate-metadata",
      severity: "high",
      title: "Invalid primary category",
      description: `"${metadata.primaryCategory}" is not a recognized App Store category.`,
      recommendation: `Choose a valid App Store category. Valid categories include: ${APP_CATEGORIES.slice(0, 5).join(", ")}, and more.`,
      guidelineSection: GUIDELINES["2.3"].section,
      guidelineUrl: GUIDELINES["2.3"].url,
      source: "file-analysis",
    });
  }

  // --- Age rating validation ---
  if (
    metadata.ageRating &&
    !(AGE_RATINGS as readonly string[]).includes(metadata.ageRating)
  ) {
    issues.push({
      id: "metadata-accuracy-invalid-age-rating",
      categoryId: "accurate-metadata",
      severity: "high",
      title: "Invalid age rating",
      description: `"${metadata.ageRating}" is not a valid App Store age rating. Valid options are: ${AGE_RATINGS.join(", ")}.`,
      recommendation: `Select a valid age rating: ${AGE_RATINGS.join(", ")}. Ensure it accurately reflects your app's content.`,
      guidelineSection: GUIDELINES["2.3"].section,
      guidelineUrl: GUIDELINES["2.3"].url,
      source: "file-analysis",
    });
  }

  return issues;
}
