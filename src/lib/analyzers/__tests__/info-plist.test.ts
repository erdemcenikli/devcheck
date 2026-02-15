import { describe, it, expect } from "vitest";
import { analyzeInfoPlist } from "../info-plist";

// Helper to build a minimal Info.plist XML wrapper
function plist(body: string): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
${body}
</dict>
</plist>`;
}

describe("analyzeInfoPlist", () => {
    it("returns no issues for a clean plist", () => {
        const content = plist(`
      <key>CFBundleName</key>
      <string>MyApp</string>
    `);
        const issues = analyzeInfoPlist(content);
        expect(issues).toEqual([]);
    });

    // --- Privacy usage description checks ---
    it("flags short privacy usage description", () => {
        const content = plist(`
      <key>NSCameraUsageDescription</key>
      <string>Camera</string>
    `);
        const issues = analyzeInfoPlist(content);
        expect(issues.length).toBe(1);
        expect(issues[0].id).toContain("infoplist-privacy-short-description");
        expect(issues[0].severity).toBe("high");
    });

    it("does not flag adequate privacy usage description", () => {
        const content = plist(`
      <key>NSCameraUsageDescription</key>
      <string>We need access to your camera to take photos for your profile picture and posts.</string>
    `);
        const issues = analyzeInfoPlist(content);
        expect(issues).toEqual([]);
    });

    // --- MinimumOSVersion ---
    it("flags low MinimumOSVersion", () => {
        const content = plist(`
      <key>MinimumOSVersion</key>
      <string>14.0</string>
    `);
        const issues = analyzeInfoPlist(content);
        expect(issues.length).toBe(1);
        expect(issues[0].id).toBe("infoplist-software-low-min-os");
        expect(issues[0].severity).toBe("medium");
    });

    it("does not flag MinimumOSVersion >= 16", () => {
        const content = plist(`
      <key>MinimumOSVersion</key>
      <string>17.0</string>
    `);
        const issues = analyzeInfoPlist(content);
        expect(issues).toEqual([]);
    });

    // --- ATS disabled ---
    it("flags globally disabled App Transport Security", () => {
        const content = plist(`
      <key>NSAppTransportSecurity</key>
      <dict>
        <key>NSAllowsArbitraryLoads</key>
        <true/>
      </dict>
    `);
        const issues = analyzeInfoPlist(content);
        expect(issues.length).toBe(1);
        expect(issues[0].id).toBe("infoplist-software-ats-disabled");
        expect(issues[0].severity).toBe("critical");
    });

    it("does not flag ATS when NSAllowsArbitraryLoads is false", () => {
        const content = plist(`
      <key>NSAppTransportSecurity</key>
      <dict>
        <key>NSAllowsArbitraryLoads</key>
        <false/>
      </dict>
    `);
        const issues = analyzeInfoPlist(content);
        expect(issues).toEqual([]);
    });

    // --- Background modes ---
    it("flags unusual background modes", () => {
        const content = plist(`
      <key>UIBackgroundModes</key>
      <array>
        <string>audio</string>
        <string>external-accessory</string>
      </array>
    `);
        const issues = analyzeInfoPlist(content);
        expect(issues.length).toBe(1);
        expect(issues[0].id).toBe("infoplist-software-unusual-background-modes");
        expect(issues[0].severity).toBe("high");
    });

    it("does not flag standard background modes", () => {
        const content = plist(`
      <key>UIBackgroundModes</key>
      <array>
        <string>audio</string>
        <string>fetch</string>
        <string>remote-notification</string>
      </array>
    `);
        const issues = analyzeInfoPlist(content);
        expect(issues).toEqual([]);
    });

    // --- iPad orientations ---
    it("flags missing iPad orientations for universal app", () => {
        const content = plist(`
      <key>UIDeviceFamily</key>
      <array>
        <string>1</string>
        <string>2</string>
      </array>
    `);
        const issues = analyzeInfoPlist(content);
        expect(issues.length).toBe(1);
        expect(issues[0].id).toBe("infoplist-design-missing-ipad-orientations");
        expect(issues[0].severity).toBe("medium");
    });

    // --- UIRequiredDeviceCapabilities ---
    it("flags unusual device capabilities", () => {
        const content = plist(`
      <key>UIRequiredDeviceCapabilities</key>
      <array>
        <string>arm64</string>
        <string>lidar</string>
      </array>
    `);
        const issues = analyzeInfoPlist(content);
        expect(issues.length).toBe(1);
        expect(issues[0].id).toBe("infoplist-software-unusual-capabilities");
        expect(issues[0].severity).toBe("medium");
    });

    it("does not flag standard device capabilities", () => {
        const content = plist(`
      <key>UIRequiredDeviceCapabilities</key>
      <array>
        <string>arm64</string>
        <string>metal</string>
      </array>
    `);
        const issues = analyzeInfoPlist(content);
        expect(issues).toEqual([]);
    });
});
