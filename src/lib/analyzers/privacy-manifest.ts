import type { Issue } from "@/lib/types";
import { REQUIRED_REASON_APIS, GUIDELINES } from "@/lib/data/guidelines";

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Check whether a <key> exists anywhere in the XML content. */
function hasPlistKey(xml: string, key: string): boolean {
  const pattern = new RegExp(`<key>\\s*${escapeRegExp(key)}\\s*</key>`);
  return pattern.test(xml);
}

/** Check whether a <true/> element follows the given key. */
function getPlistBoolValue(xml: string, key: string): boolean | null {
  const pattern = new RegExp(
    `<key>\\s*${escapeRegExp(key)}\\s*</key>\\s*<(true|false)\\s*/>`,
    "s",
  );
  const match = xml.match(pattern);
  if (!match) return null;
  return match[1] === "true";
}

/** Extract the content inside an <array> following the given key. */
function getPlistArrayContent(xml: string, key: string): string | null {
  const pattern = new RegExp(
    `<key>\\s*${escapeRegExp(key)}\\s*</key>\\s*<array>(.*?)</array>`,
    "s",
  );
  const match = xml.match(pattern);
  return match ? match[1] : null;
}

/** Extract all <dict> blocks from a string. */
function extractDicts(content: string): string[] {
  const dicts: string[] = [];
  const pattern = /<dict>([\s\S]*?)<\/dict>/g;
  let m: RegExpExecArray | null;
  while ((m = pattern.exec(content)) !== null) {
    dicts.push(m[1]);
  }
  return dicts;
}

/** Extract the text content of a <string> following a <key>. */
function getStringValue(xml: string, key: string): string | null {
  const pattern = new RegExp(
    `<key>\\s*${escapeRegExp(key)}\\s*</key>\\s*<string>([^<]*)</string>`,
    "s",
  );
  const match = xml.match(pattern);
  return match ? match[1].trim() : null;
}

/** Extract all <string> values from the content. */
function getAllStrings(content: string): string[] {
  const strings: string[] = [];
  const pattern = /<string>([^<]*)<\/string>/g;
  let m: RegExpExecArray | null;
  while ((m = pattern.exec(content)) !== null) {
    strings.push(m[1].trim());
  }
  return strings;
}

export function analyzePrivacyManifest(content: string): Issue[] {
  const issues: Issue[] = [];

  const guidelineSection = "5.1.1-5.1.2";
  const guidelineUrl =
    "https://developer.apple.com/documentation/bundleresources/privacy_manifest_files";

  // --- NSPrivacyAccessedAPITypes validation ---
  const apiTypesContent = getPlistArrayContent(
    content,
    "NSPrivacyAccessedAPITypes",
  );

  if (apiTypesContent === null) {
    issues.push({
      id: "privacy-manifest-missing-api-types",
      categoryId: "privacy-manifest",
      severity: "high",
      title: "Missing NSPrivacyAccessedAPITypes",
      description:
        "The privacy manifest does not declare NSPrivacyAccessedAPITypes. If your app or any included SDK uses required reason APIs, you must declare them with valid reasons.",
      recommendation:
        "Add NSPrivacyAccessedAPITypes to your PrivacyInfo.xcprivacy and declare each required reason API your app uses with the appropriate reason codes.",
      guidelineSection,
      guidelineUrl,
      source: "file-analysis",
    });
  } else {
    const apiDicts = extractDicts(apiTypesContent);

    for (const dict of apiDicts) {
      const apiType = getStringValue(dict, "NSPrivacyAccessedAPIType");
      if (!apiType) continue;

      // Check if it has reasons declared
      const reasonsContent = getPlistArrayContent(
        dict,
        "NSPrivacyAccessedAPITypeReasons",
      );
      const reasons = reasonsContent ? getAllStrings(reasonsContent) : [];

      if (reasons.length === 0) {
        const apiLabel =
          REQUIRED_REASON_APIS[apiType] ?? apiType;
        issues.push({
          id: `privacy-manifest-missing-reason-${apiType}`,
          categoryId: "privacy-manifest",
          severity: "critical",
          title: `No reason declared for ${apiLabel}`,
          description: `The API category "${apiType}" is declared in NSPrivacyAccessedAPITypes but has no reasons listed in NSPrivacyAccessedAPITypeReasons. Apple requires at least one valid reason for each declared API.`,
          recommendation: `Add a valid reason code to NSPrivacyAccessedAPITypeReasons for ${apiType}. See Apple's documentation for the list of approved reason codes.`,
          guidelineSection,
          guidelineUrl,
          source: "file-analysis",
        });
      }
    }
  }

  // --- NSPrivacyTracking consistency ---
  const trackingEnabled = getPlistBoolValue(content, "NSPrivacyTracking");
  const trackingDomainsContent = getPlistArrayContent(
    content,
    "NSPrivacyTrackingDomains",
  );
  const trackingDomains = trackingDomainsContent
    ? getAllStrings(trackingDomainsContent)
    : [];

  if (trackingEnabled === true && trackingDomains.length === 0) {
    issues.push({
      id: "privacy-manifest-tracking-no-domains",
      categoryId: "privacy-manifest",
      severity: "high",
      title: "Tracking enabled but no tracking domains declared",
      description:
        "NSPrivacyTracking is set to true but NSPrivacyTrackingDomains is empty or missing. If your app performs tracking, you must declare the domains used.",
      recommendation:
        "Add all tracking domains to NSPrivacyTrackingDomains, or set NSPrivacyTracking to false if no tracking occurs.",
      guidelineSection,
      guidelineUrl,
      source: "file-analysis",
    });
  }

  if (trackingEnabled === false && trackingDomains.length > 0) {
    issues.push({
      id: "privacy-manifest-domains-no-tracking",
      categoryId: "privacy-manifest",
      severity: "medium",
      title: "Tracking domains declared but tracking is disabled",
      description: `NSPrivacyTracking is false but NSPrivacyTrackingDomains contains ${trackingDomains.length} domain(s). This is inconsistent and may cause confusion during review.`,
      recommendation:
        "Either set NSPrivacyTracking to true if your app tracks users, or remove the entries from NSPrivacyTrackingDomains.",
      guidelineSection,
      guidelineUrl,
      source: "file-analysis",
    });
  }

  if (!hasPlistKey(content, "NSPrivacyTracking")) {
    issues.push({
      id: "privacy-manifest-missing-tracking-key",
      categoryId: "privacy-manifest",
      severity: "medium",
      title: "NSPrivacyTracking key not declared",
      description:
        "The privacy manifest does not include the NSPrivacyTracking key. Apple expects this key to be present to indicate whether the app performs user tracking.",
      recommendation:
        "Add NSPrivacyTracking to your PrivacyInfo.xcprivacy and set it to true or false depending on whether your app tracks users as defined by Apple.",
      guidelineSection,
      guidelineUrl,
      source: "file-analysis",
    });
  }

  // --- NSPrivacyCollectedDataTypes check ---
  const collectedDataContent = getPlistArrayContent(
    content,
    "NSPrivacyCollectedDataTypes",
  );

  if (collectedDataContent === null) {
    issues.push({
      id: "privacy-manifest-missing-collected-data",
      categoryId: "privacy-manifest",
      severity: "medium",
      title: "Missing NSPrivacyCollectedDataTypes",
      description:
        "The privacy manifest does not declare NSPrivacyCollectedDataTypes. If your app collects any user data, this section must be present.",
      recommendation:
        "Add NSPrivacyCollectedDataTypes to your PrivacyInfo.xcprivacy and declare all data types your app collects, even if collected by third-party SDKs.",
      guidelineSection,
      guidelineUrl,
      source: "file-analysis",
    });
  } else {
    const dataDicts = extractDicts(collectedDataContent);
    if (dataDicts.length === 0) {
      issues.push({
        id: "privacy-manifest-empty-collected-data",
        categoryId: "privacy-manifest",
        severity: "low",
        title: "NSPrivacyCollectedDataTypes is empty",
        description:
          "NSPrivacyCollectedDataTypes is declared but contains no entries. If your app truly collects no data, this is fine. Otherwise, ensure all collected data types are declared.",
        recommendation:
          "Verify that your app (and all included SDKs) genuinely does not collect any user data. If it does, add the appropriate data type entries.",
        guidelineSection,
        guidelineUrl,
        source: "file-analysis",
      });
    }
  }

  return issues;
}
