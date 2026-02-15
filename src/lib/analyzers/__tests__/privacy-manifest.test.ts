import { describe, it, expect } from "vitest";
import { analyzePrivacyManifest } from "../privacy-manifest";

function privacyPlist(body: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
${body}
</dict>
</plist>`;
}

describe("analyzePrivacyManifest", () => {
  // --- NSPrivacyAccessedAPITypes ---
  it("flags missing NSPrivacyAccessedAPITypes", () => {
    const content = privacyPlist(`
      <key>NSPrivacyTracking</key>
      <false/>
    `);
    const issues = analyzePrivacyManifest(content);
    expect(
      issues.some((i) => i.id === "privacy-manifest-missing-api-types")
    ).toBe(true);
  });

  it("flags API type declared without reasons", () => {
    const content = privacyPlist(`
      <key>NSPrivacyAccessedAPITypes</key>
      <array>
        <dict>
          <key>NSPrivacyAccessedAPIType</key>
          <string>NSPrivacyAccessedAPICategoryUserDefaults</string>
          <key>NSPrivacyAccessedAPITypeReasons</key>
          <array/>
        </dict>
      </array>
      <key>NSPrivacyTracking</key>
      <false/>
    `);
    const issues = analyzePrivacyManifest(content);
    expect(
      issues.some((i) =>
        i.id.startsWith("privacy-manifest-missing-reason-")
      )
    ).toBe(true);
    expect(
      issues.find((i) => i.id.startsWith("privacy-manifest-missing-reason-"))
        ?.severity
    ).toBe("critical");
  });

  it("does not flag API type with valid reasons", () => {
    const content = privacyPlist(`
      <key>NSPrivacyAccessedAPITypes</key>
      <array>
        <dict>
          <key>NSPrivacyAccessedAPIType</key>
          <string>NSPrivacyAccessedAPICategoryUserDefaults</string>
          <key>NSPrivacyAccessedAPITypeReasons</key>
          <array>
            <string>CA92.1</string>
          </array>
        </dict>
      </array>
      <key>NSPrivacyTracking</key>
      <false/>
      <key>NSPrivacyCollectedDataTypes</key>
      <array/>
    `);
    const issues = analyzePrivacyManifest(content);
    expect(
      issues.some((i) => i.id.startsWith("privacy-manifest-missing-reason-"))
    ).toBe(false);
  });

  // --- Tracking consistency ---
  it("flags tracking enabled without domains", () => {
    const content = privacyPlist(`
      <key>NSPrivacyTracking</key>
      <true/>
      <key>NSPrivacyTrackingDomains</key>
      <array/>
      <key>NSPrivacyAccessedAPITypes</key>
      <array/>
    `);
    const issues = analyzePrivacyManifest(content);
    expect(
      issues.some((i) => i.id === "privacy-manifest-tracking-no-domains")
    ).toBe(true);
  });

  it("flags domains declared without tracking enabled", () => {
    const content = privacyPlist(`
      <key>NSPrivacyTracking</key>
      <false/>
      <key>NSPrivacyTrackingDomains</key>
      <array>
        <string>example.com</string>
      </array>
      <key>NSPrivacyAccessedAPITypes</key>
      <array/>
    `);
    const issues = analyzePrivacyManifest(content);
    expect(
      issues.some((i) => i.id === "privacy-manifest-domains-no-tracking")
    ).toBe(true);
  });

  it("flags missing NSPrivacyTracking key", () => {
    const content = privacyPlist(`
      <key>NSPrivacyAccessedAPITypes</key>
      <array/>
    `);
    const issues = analyzePrivacyManifest(content);
    expect(
      issues.some((i) => i.id === "privacy-manifest-missing-tracking-key")
    ).toBe(true);
  });

  // --- Collected data types ---
  it("flags missing NSPrivacyCollectedDataTypes", () => {
    const content = privacyPlist(`
      <key>NSPrivacyTracking</key>
      <false/>
      <key>NSPrivacyAccessedAPITypes</key>
      <array/>
    `);
    const issues = analyzePrivacyManifest(content);
    expect(
      issues.some(
        (i) => i.id === "privacy-manifest-missing-collected-data"
      )
    ).toBe(true);
  });

  it("flags empty NSPrivacyCollectedDataTypes", () => {
    const content = privacyPlist(`
      <key>NSPrivacyTracking</key>
      <false/>
      <key>NSPrivacyAccessedAPITypes</key>
      <array></array>
      <key>NSPrivacyCollectedDataTypes</key>
      <array></array>
    `);
    const issues = analyzePrivacyManifest(content);
    expect(
      issues.some(
        (i) => i.id === "privacy-manifest-empty-collected-data"
      )
    ).toBe(true);
  });

  // --- Full valid manifest ---
  it("returns minimal issues for a complete valid manifest", () => {
    const content = privacyPlist(`
      <key>NSPrivacyTracking</key>
      <false/>
      <key>NSPrivacyTrackingDomains</key>
      <array/>
      <key>NSPrivacyAccessedAPITypes</key>
      <array>
        <dict>
          <key>NSPrivacyAccessedAPIType</key>
          <string>NSPrivacyAccessedAPICategoryUserDefaults</string>
          <key>NSPrivacyAccessedAPITypeReasons</key>
          <array>
            <string>CA92.1</string>
          </array>
        </dict>
      </array>
      <key>NSPrivacyCollectedDataTypes</key>
      <array>
        <dict>
          <key>NSPrivacyCollectedDataType</key>
          <string>NSPrivacyCollectedDataTypeEmailAddress</string>
        </dict>
      </array>
    `);
    const issues = analyzePrivacyManifest(content);
    // Only critical/high issues should be absent on a valid manifest
    const criticalOrHigh = issues.filter(
      (i) => i.severity === "critical" || i.severity === "high"
    );
    expect(criticalOrHigh).toEqual([]);
  });
});
