"use client";

import { useCallback } from "react";
import type { AnalysisResult, Issue } from "@/lib/types";
import { analyzeInfoPlist } from "@/lib/analyzers/info-plist";
import { analyzePrivacyManifest } from "@/lib/analyzers/privacy-manifest";
import { analyzeMetadata } from "@/lib/analyzers/metadata";
import { runFullAnalysis } from "@/lib/scoring/engine";
import { useCheckState } from "./use-check-state";

export function useScoring() {
  const { state, setResult } = useCheckState();

  const runAnalysis = useCallback((): AnalysisResult => {
    const fileIssues: Issue[] = [];

    if (state.infoPlistContent) {
      fileIssues.push(...analyzeInfoPlist(state.infoPlistContent));
    }

    if (state.privacyManifestContent) {
      fileIssues.push(...analyzePrivacyManifest(state.privacyManifestContent));
    }

    fileIssues.push(...analyzeMetadata(state.metadata));

    const result = runFullAnalysis(state.answers, fileIssues);
    setResult(result);
    return result;
  }, [state.infoPlistContent, state.privacyManifestContent, state.metadata, state.answers, setResult]);

  return { runAnalysis };
}
