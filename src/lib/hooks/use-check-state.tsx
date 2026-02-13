"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AnalysisResult, CheckState, MetadataInput } from "@/lib/types";

const DEFAULT_METADATA: MetadataInput = {
  appName: "",
  description: "",
  keywords: "",
  primaryCategory: "",
  ageRating: "4+",
};

const DEFAULT_STATE: CheckState = {
  infoPlist: null,
  infoPlistContent: null,
  privacyManifest: null,
  privacyManifestContent: null,
  screenshots: [],
  metadata: DEFAULT_METADATA,
  answers: {},
  currentStep: 0,
  result: null,
};

interface CheckStateContextValue {
  state: CheckState;
  setInfoPlist: (file: File | null, content: string | null) => void;
  setPrivacyManifest: (file: File | null, content: string | null) => void;
  setScreenshots: (files: File[]) => void;
  updateMetadata: (partial: Partial<MetadataInput>) => void;
  setAnswer: (questionId: string, value: string) => void;
  setAnswers: (answers: Record<string, string>) => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setResult: (result: AnalysisResult) => void;
  reset: () => void;
}

const CheckStateContext = createContext<CheckStateContextValue | null>(null);

export function CheckStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CheckState>(DEFAULT_STATE);

  const setInfoPlist = useCallback(
    (file: File | null, content: string | null) => {
      setState((prev) => ({ ...prev, infoPlist: file, infoPlistContent: content }));
    },
    []
  );

  const setPrivacyManifest = useCallback(
    (file: File | null, content: string | null) => {
      setState((prev) => ({
        ...prev,
        privacyManifest: file,
        privacyManifestContent: content,
      }));
    },
    []
  );

  const setScreenshots = useCallback((files: File[]) => {
    setState((prev) => ({ ...prev, screenshots: files }));
  }, []);

  const updateMetadata = useCallback((partial: Partial<MetadataInput>) => {
    setState((prev) => ({
      ...prev,
      metadata: { ...prev.metadata, ...partial },
    }));
  }, []);

  const setAnswer = useCallback((questionId: string, value: string) => {
    setState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: value },
    }));
  }, []);

  const setAnswers = useCallback((answers: Record<string, string>) => {
    setState((prev) => ({ ...prev, answers }));
  }, []);

  const setCurrentStep = useCallback((step: number) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  }, []);

  const nextStep = useCallback(() => {
    setState((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }));
  }, []);

  const prevStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(0, prev.currentStep - 1),
    }));
  }, []);

  const setResult = useCallback((result: AnalysisResult) => {
    setState((prev) => ({ ...prev, result }));
  }, []);

  const reset = useCallback(() => {
    setState(DEFAULT_STATE);
  }, []);

  const value = useMemo(
    () => ({
      state,
      setInfoPlist,
      setPrivacyManifest,
      setScreenshots,
      updateMetadata,
      setAnswer,
      setAnswers,
      setCurrentStep,
      nextStep,
      prevStep,
      setResult,
      reset,
    }),
    [
      state,
      setInfoPlist,
      setPrivacyManifest,
      setScreenshots,
      updateMetadata,
      setAnswer,
      setAnswers,
      setCurrentStep,
      nextStep,
      prevStep,
      setResult,
      reset,
    ]
  );

  return (
    <CheckStateContext.Provider value={value}>
      {children}
    </CheckStateContext.Provider>
  );
}

export function useCheckState(): CheckStateContextValue {
  const context = useContext(CheckStateContext);
  if (!context) {
    throw new Error("useCheckState must be used within a CheckStateProvider");
  }
  return context;
}
