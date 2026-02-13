import type { Issue } from "@/lib/types";
import {
  VALID_SCREENSHOT_DIMENSIONS,
  GUIDELINES,
} from "@/lib/data/guidelines";

interface ScreenshotFile {
  width: number;
  height: number;
  name: string;
}

/** Build a flat set of all valid "WxH" dimension strings for quick lookup. */
function buildValidDimensionSet(): Set<string> {
  const set = new Set<string>();
  for (const dims of Object.values(VALID_SCREENSHOT_DIMENSIONS)) {
    for (const d of dims) {
      set.add(`${d.width}x${d.height}`);
    }
  }
  return set;
}

/** Format all accepted dimensions as a human-readable string. */
function formatAcceptedDimensions(): string {
  return Object.entries(VALID_SCREENSHOT_DIMENSIONS)
    .map(
      ([device, dims]) =>
        `${device}: ${dims.map((d) => `${d.width}x${d.height}`).join(", ")}`,
    )
    .join("; ");
}

export function analyzeScreenshots(files: ScreenshotFile[]): Issue[] {
  const issues: Issue[] = [];

  // --- Minimum count check ---
  if (files.length === 0) {
    issues.push({
      id: "screenshots-metadata-no-screenshots",
      categoryId: "accurate-metadata",
      severity: "critical",
      title: "No screenshots provided",
      description:
        "At least one screenshot is required for App Store submission. Screenshots help reviewers and users understand your app.",
      recommendation:
        "Upload at least one screenshot for each required device size. Apple requires screenshots for 6.7\" and 5.5\" iPhones at minimum.",
      guidelineSection: GUIDELINES["2.3"].section,
      guidelineUrl: GUIDELINES["2.3"].url,
      source: "file-analysis",
    });
    return issues;
  }

  // --- Dimension validation ---
  const validSet = buildValidDimensionSet();

  for (const file of files) {
    const key = `${file.width}x${file.height}`;
    if (!validSet.has(key)) {
      issues.push({
        id: `screenshots-metadata-invalid-dimensions-${file.name}`,
        categoryId: "accurate-metadata",
        severity: "high",
        title: `Invalid screenshot dimensions: ${file.name}`,
        description: `Screenshot "${file.name}" has dimensions ${file.width}x${file.height} which does not match any accepted App Store screenshot size.`,
        recommendation: `Resize the screenshot to one of the accepted dimensions. Accepted sizes: ${formatAcceptedDimensions()}.`,
        guidelineSection: GUIDELINES["2.3"].section,
        guidelineUrl: GUIDELINES["2.3"].url,
        source: "file-analysis",
      });
    }
  }

  return issues;
}
