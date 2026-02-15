import { describe, it, expect } from "vitest";

// We import the POST handler directly and call it with constructed Request objects
// This tests the route handler as a function, no need for a running server.
import { POST } from "@/app/api/analyze/route";

function makeFormData(fields: Record<string, string | Blob> = {}): FormData {
    const fd = new FormData();
    for (const [key, value] of Object.entries(fields)) {
        fd.append(key, value);
    }
    return fd;
}

function makeRequest(formData: FormData): Request {
    return new Request("http://localhost:3000/api/analyze", {
        method: "POST",
        body: formData,
    });
}

describe("POST /api/analyze", () => {
    it("returns success with empty form data", async () => {
        const fd = makeFormData();
        const response = await POST(makeRequest(fd));
        expect(response.status).toBe(200);

        const body = await response.json();
        expect(body.success).toBe(true);
        expect(body.data).toBeDefined();
        expect(body.data.overallScore).toBeDefined();
        expect(body.data.categories).toBeDefined();
        expect(body.data.categories.length).toBe(10);
    });

    it("returns 400 for invalid metadata JSON", async () => {
        const fd = makeFormData({ metadata: "not-valid-json{" });
        const response = await POST(makeRequest(fd));
        expect(response.status).toBe(400);

        const body = await response.json();
        expect(body.success).toBe(false);
        expect(body.error).toContain("Invalid metadata JSON");
    });

    it("returns 400 for invalid answers JSON", async () => {
        const fd = makeFormData({ answers: "{broken" });
        const response = await POST(makeRequest(fd));
        expect(response.status).toBe(400);

        const body = await response.json();
        expect(body.success).toBe(false);
        expect(body.error).toContain("Invalid answers JSON");
    });

    it("returns valid analysis with metadata", async () => {
        const metadata = JSON.stringify({
            appName: "TestApp",
            description:
                "A comprehensive testing application that helps developers verify their iOS apps against Apple guidelines before submission.",
            keywords: "testing,development,ios",
            primaryCategory: "Developer Tools",
            ageRating: "4+",
        });
        const fd = makeFormData({ metadata });
        const response = await POST(makeRequest(fd));
        expect(response.status).toBe(200);

        const body = await response.json();
        expect(body.success).toBe(true);
        expect(body.data.overallScore).toBeGreaterThan(0);
    });

    it("returns valid analysis with metadata and answers", async () => {
        const metadata = JSON.stringify({
            appName: "TestApp",
            description:
                "A comprehensive testing application that helps developers verify their iOS apps against Apple guidelines before submission.",
            keywords: "testing,development,ios",
            primaryCategory: "Developer Tools",
            ageRating: "4+",
        });
        const answers = JSON.stringify({
            "completeness-crashes": "yes",
            "completeness-placeholders": "yes",
            "completeness-demo-credentials": "yes",
            "completeness-broken-links": "yes",
            "completeness-clean-install": "yes",
            "privacy-policy-url": "yes",
        });
        const fd = makeFormData({ metadata, answers });
        const response = await POST(makeRequest(fd));
        expect(response.status).toBe(200);

        const body = await response.json();
        expect(body.success).toBe(true);
        expect(body.data.overallScore).toBeGreaterThan(0);
        expect(body.data.grade).toBeDefined();
        expect(body.data.verdict).toBeDefined();
    });

    it("includes file issues when Info.plist is provided", async () => {
        const infoPlistContent = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>NSAppTransportSecurity</key>
  <dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
  </dict>
  <key>MinimumOSVersion</key>
  <string>14.0</string>
</dict>
</plist>`;

        const fd = new FormData();
        fd.append(
            "infoPlist",
            new Blob([infoPlistContent], { type: "text/xml" }),
            "Info.plist"
        );
        const response = await POST(makeRequest(fd));
        expect(response.status).toBe(200);

        const body = await response.json();
        expect(body.success).toBe(true);
        // Should detect ATS disabled + low min OS
        expect(body.data.issues.length).toBeGreaterThanOrEqual(2);
        const issueIds = body.data.issues.map((i: { id: string }) => i.id);
        expect(issueIds).toContain("infoplist-software-ats-disabled");
        expect(issueIds).toContain("infoplist-software-low-min-os");
    });

    it("includes issues from privacy manifest", async () => {
        const privacyContent = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>NSPrivacyTracking</key>
  <true/>
  <key>NSPrivacyTrackingDomains</key>
  <array/>
</dict>
</plist>`;

        const fd = new FormData();
        fd.append(
            "privacyManifest",
            new Blob([privacyContent], { type: "text/xml" }),
            "PrivacyInfo.xcprivacy"
        );
        const response = await POST(makeRequest(fd));
        expect(response.status).toBe(200);

        const body = await response.json();
        expect(body.success).toBe(true);
        const issueIds = body.data.issues.map((i: { id: string }) => i.id);
        expect(issueIds).toContain("privacy-manifest-tracking-no-domains");
    });
});
