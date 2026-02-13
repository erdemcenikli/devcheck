import type { Issue } from "@/lib/types";
import { GUIDELINES } from "@/lib/data/guidelines";

const PRIVACY_USAGE_KEYS: Record<string, string> = {
  NSCameraUsageDescription: "Camera",
  NSMicrophoneUsageDescription: "Microphone",
  NSLocationWhenInUseUsageDescription: "Location (When In Use)",
  NSLocationAlwaysAndWhenInUseUsageDescription: "Location (Always)",
  NSPhotoLibraryUsageDescription: "Photo Library",
  NSPhotoLibraryAddUsageDescription: "Photo Library (Add)",
  NSContactsUsageDescription: "Contacts",
  NSCalendarsUsageDescription: "Calendars",
  NSRemindersUsageDescription: "Reminders",
  NSBluetoothAlwaysUsageDescription: "Bluetooth",
  NSMotionUsageDescription: "Motion",
  NSFaceIDUsageDescription: "Face ID",
  NSSpeechRecognitionUsageDescription: "Speech Recognition",
  NSHealthShareUsageDescription: "HealthKit",
  NSAppleMusicUsageDescription: "Media Library",
  NSSiriUsageDescription: "Siri",
  NSLocalNetworkUsageDescription: "Local Network",
  NSUserTrackingUsageDescription: "App Tracking Transparency",
};

const ALLOWED_BACKGROUND_MODES = new Set([
  "voip",
  "location",
  "fetch",
  "remote-notification",
  "audio",
  "bluetooth-central",
  "bluetooth-peripheral",
  "processing",
]);

/** Extract the text content of a <string> element following a <key> with the given name. */
function getPlistStringValue(xml: string, key: string): string | null {
  const pattern = new RegExp(
    `<key>\\s*${escapeRegExp(key)}\\s*</key>\\s*<string>([^<]*)</string>`,
    "s",
  );
  const match = xml.match(pattern);
  return match ? match[1].trim() : null;
}

/** Check whether a <key> exists anywhere in the plist. */
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

/** Extract all <string> values from an <array> following the given key. */
function getPlistStringArray(xml: string, key: string): string[] {
  const pattern = new RegExp(
    `<key>\\s*${escapeRegExp(key)}\\s*</key>\\s*<array>(.*?)</array>`,
    "s",
  );
  const match = xml.match(pattern);
  if (!match) return [];
  const arrayContent = match[1];
  const strings: string[] = [];
  const stringPattern = /<string>([^<]*)<\/string>/g;
  let m: RegExpExecArray | null;
  while ((m = stringPattern.exec(arrayContent)) !== null) {
    strings.push(m[1].trim());
  }
  return strings;
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function analyzeInfoPlist(content: string): Issue[] {
  const issues: Issue[] = [];

  // --- Privacy usage description checks ---
  const declaredUsageKeys = Object.keys(PRIVACY_USAGE_KEYS).filter((key) =>
    hasPlistKey(content, key),
  );

  for (const key of declaredUsageKeys) {
    const value = getPlistStringValue(content, key);
    if (value !== null && value.length < 10) {
      issues.push({
        id: `infoplist-privacy-short-description-${key}`,
        categoryId: "privacy-policy",
        severity: "high",
        title: `${PRIVACY_USAGE_KEYS[key]} usage description is too short`,
        description: `The value for ${key} is "${value}" which may be considered insufficient by App Review. Apple requires meaningful descriptions explaining why the app needs this permission.`,
        recommendation: `Provide a clear, user-facing explanation for ${PRIVACY_USAGE_KEYS[key]} access that describes why your app needs it and how it will be used.`,
        guidelineSection: GUIDELINES["5.1.1"].section,
        guidelineUrl: GUIDELINES["5.1.1"].url,
        source: "file-analysis",
      });
    }
  }

  // --- MinimumOSVersion check ---
  const minOS = getPlistStringValue(content, "MinimumOSVersion");
  if (minOS !== null) {
    const majorVersion = parseFloat(minOS);
    if (!isNaN(majorVersion) && majorVersion < 16) {
      issues.push({
        id: "infoplist-software-low-min-os",
        categoryId: "software-requirements",
        severity: "medium",
        title: `Minimum OS version is ${minOS}`,
        description: `The app targets iOS ${minOS}. Supporting very old iOS versions may indicate outdated APIs and can lead to review issues. Apple encourages targeting recent OS versions.`,
        recommendation:
          "Consider raising your minimum deployment target to iOS 16 or later to use modern APIs and ensure compatibility with current devices.",
        guidelineSection: GUIDELINES["2.5"].section,
        guidelineUrl: GUIDELINES["2.5"].url,
        source: "file-analysis",
      });
    }
  }

  // --- UIBackgroundModes check ---
  const backgroundModes = getPlistStringArray(content, "UIBackgroundModes");
  if (backgroundModes.length > 0) {
    const flaggedModes = backgroundModes.filter(
      (mode) => !ALLOWED_BACKGROUND_MODES.has(mode),
    );
    if (flaggedModes.length > 0) {
      issues.push({
        id: "infoplist-software-unusual-background-modes",
        categoryId: "software-requirements",
        severity: "high",
        title: "Unusual background modes declared",
        description: `The app declares background modes that may trigger additional review scrutiny: ${flaggedModes.join(", ")}. Apple closely reviews background mode usage.`,
        recommendation:
          "Remove any background modes your app does not actively use. Be prepared to justify each declared background mode during review.",
        guidelineSection: GUIDELINES["2.5"].section,
        guidelineUrl: GUIDELINES["2.5"].url,
        source: "file-analysis",
      });
    }
  }

  // --- App Transport Security check ---
  if (hasPlistKey(content, "NSAppTransportSecurity")) {
    const atsDisabled = getPlistBoolValue(content, "NSAllowsArbitraryLoads");
    if (atsDisabled === true) {
      issues.push({
        id: "infoplist-software-ats-disabled",
        categoryId: "software-requirements",
        severity: "critical",
        title: "App Transport Security is globally disabled",
        description:
          "NSAllowsArbitraryLoads is set to true, which disables ATS for all network connections. Apple requires a justification for this and may reject apps that disable ATS without a valid reason.",
        recommendation:
          "Enable ATS and use NSExceptionDomains for specific domains that require exceptions, rather than disabling ATS globally. Provide a justification in the App Review notes if needed.",
        guidelineSection: GUIDELINES["2.5"].section,
        guidelineUrl: GUIDELINES["2.5"].url,
        source: "file-analysis",
      });
    }
  }

  // --- iPad orientation support check ---
  const ipadOrientations = getPlistStringArray(
    content,
    "UISupportedInterfaceOrientations~ipad",
  );
  const deviceFamily = getPlistStringArray(content, "UIDeviceFamily");
  const isUniversal =
    deviceFamily.includes("1") && deviceFamily.includes("2");

  if (isUniversal && ipadOrientations.length === 0) {
    issues.push({
      id: "infoplist-design-missing-ipad-orientations",
      categoryId: "design-quality",
      severity: "medium",
      title: "Missing iPad orientation support",
      description:
        "The app appears to be universal (supports both iPhone and iPad) but does not declare UISupportedInterfaceOrientations~ipad. iPad apps are expected to support multiple orientations.",
      recommendation:
        "Add UISupportedInterfaceOrientations~ipad to your Info.plist with appropriate orientations, or ensure your iPad layout supports both portrait and landscape.",
      guidelineSection: GUIDELINES["2.1"].section,
      guidelineUrl: GUIDELINES["2.1"].url,
      source: "file-analysis",
    });
  }

  // --- UIRequiredDeviceCapabilities check ---
  const requiredCapabilities = getPlistStringArray(
    content,
    "UIRequiredDeviceCapabilities",
  );
  const unusualCapabilities = requiredCapabilities.filter(
    (cap) =>
      ![
        "armv7",
        "arm64",
        "gamekit",
        "accelerometer",
        "gyroscope",
        "magnetometer",
        "gps",
        "metal",
        "nfc",
        "opengles-1",
        "opengles-2",
        "opengles-3",
        "camera-flash",
        "healthkit",
        "arkit",
        "bluetooth-le",
        "wifi",
        "telephony",
      ].includes(cap),
  );
  if (unusualCapabilities.length > 0) {
    issues.push({
      id: "infoplist-software-unusual-capabilities",
      categoryId: "software-requirements",
      severity: "medium",
      title: "Unusual required device capabilities",
      description: `The app requires device capabilities that may limit compatibility: ${unusualCapabilities.join(", ")}. This can restrict which devices can download your app.`,
      recommendation:
        "Review UIRequiredDeviceCapabilities and ensure each listed capability is truly required for your app to function. Unnecessary restrictions limit your potential audience.",
      guidelineSection: GUIDELINES["2.5"].section,
      guidelineUrl: GUIDELINES["2.5"].url,
      source: "file-analysis",
    });
  }

  return issues;
}
