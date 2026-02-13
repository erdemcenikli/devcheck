import { NextResponse } from "next/server";
import type { MetadataInput, Issue } from "@/lib/types";
import { analyzeInfoPlist } from "@/lib/analyzers/info-plist";
import { analyzePrivacyManifest } from "@/lib/analyzers/privacy-manifest";
import { analyzeMetadata } from "@/lib/analyzers/metadata";
import { analyzeScreenshots } from "@/lib/analyzers/screenshots";
import { runFullAnalysis } from "@/lib/scoring/engine";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const fileIssues: Issue[] = [];

    // Parse Info.plist if provided
    const infoPlistFile = formData.get("infoPlist") as File | null;
    if (infoPlistFile) {
      const content = await infoPlistFile.text();
      fileIssues.push(...analyzeInfoPlist(content));
    }

    // Parse PrivacyInfo.xcprivacy if provided
    const privacyManifestFile = formData.get("privacyManifest") as File | null;
    if (privacyManifestFile) {
      const content = await privacyManifestFile.text();
      fileIssues.push(...analyzePrivacyManifest(content));
    }

    // Parse metadata
    const metadataRaw = formData.get("metadata") as string | null;
    let metadata: MetadataInput = {
      appName: "",
      description: "",
      keywords: "",
      primaryCategory: "",
      ageRating: "4+",
    };
    if (metadataRaw) {
      try {
        metadata = JSON.parse(metadataRaw) as MetadataInput;
      } catch {
        return NextResponse.json<ApiResponse<null>>(
          { success: false, error: "Invalid metadata JSON" },
          { status: 400 }
        );
      }
    }
    fileIssues.push(...analyzeMetadata(metadata));

    // Parse screenshots if provided
    const screenshotFiles = formData.getAll("screenshots") as File[];
    if (screenshotFiles.length > 0) {
      const screenshotInfo: { width: number; height: number; name: string }[] = [];
      for (const file of screenshotFiles) {
        // For API, accept screenshot dimensions as separate metadata
        // since we can't easily read image dimensions server-side without a library
        screenshotInfo.push({ width: 0, height: 0, name: file.name });
      }
      // Only validate if screenshot dimensions are provided
      const screenshotDimsRaw = formData.get("screenshotDimensions") as string | null;
      if (screenshotDimsRaw) {
        try {
          const dims = JSON.parse(screenshotDimsRaw) as { width: number; height: number; name: string }[];
          fileIssues.push(...analyzeScreenshots(dims));
        } catch {
          // Skip screenshot dimension validation if invalid
        }
      }
    }

    // Parse questionnaire answers
    const answersRaw = formData.get("answers") as string | null;
    let answers: Record<string, string> = {};
    if (answersRaw) {
      try {
        answers = JSON.parse(answersRaw) as Record<string, string>;
      } catch {
        return NextResponse.json<ApiResponse<null>>(
          { success: false, error: "Invalid answers JSON" },
          { status: 400 }
        );
      }
    }

    // Run full analysis
    const result = runFullAnalysis(answers, fileIssues);

    return NextResponse.json<ApiResponse<typeof result>>({
      success: true,
      data: result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json<ApiResponse<null>>(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
