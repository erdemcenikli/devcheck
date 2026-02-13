"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCheckState } from "@/lib/hooks/use-check-state";
import { useScoring } from "@/lib/hooks/use-scoring";
import { StepIndicator } from "./step-indicator";
import { FileUpload } from "./file-upload";
import { MetadataForm } from "./metadata-form";
import { Questionnaire } from "./questionnaire";

const STEP_VARIANTS = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -50 : 50,
    opacity: 0,
  }),
};

export function CheckWizard() {
  const router = useRouter();
  const {
    state,
    setInfoPlist,
    setPrivacyManifest,
    updateMetadata,
    setAnswer,
    nextStep,
    prevStep,
  } = useCheckState();
  const { runAnalysis } = useScoring();
  const [direction, setDirection] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleNext = () => {
    setDirection(1);
    if (state.currentStep === 1) {
      setIsAnalyzing(true);
      // Small delay for animation
      setTimeout(() => {
        runAnalysis();
        router.push("/results");
      }, 1500);
    } else {
      nextStep();
    }
  };

  const handleBack = () => {
    setDirection(-1);
    prevStep();
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <StepIndicator currentStep={state.currentStep} />

      <AnimatePresence mode="wait" custom={direction}>
        {state.currentStep === 0 && (
          <motion.div
            key="step-0"
            custom={direction}
            variants={STEP_VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-bold text-zinc-100">
                Upload Files & App Info
              </h2>
              <p className="mt-1 text-sm text-zinc-400">
                Upload your app files for automated analysis. All fields are
                optional.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FileUpload
                label="Info.plist"
                description="Drop your Info.plist file"
                accept=".plist,text/xml,application/xml"
                file={state.infoPlist}
                onFileChange={setInfoPlist}
              />
              <FileUpload
                label="PrivacyInfo.xcprivacy"
                description="Drop your privacy manifest"
                accept=".xcprivacy,.plist,text/xml,application/xml"
                file={state.privacyManifest}
                onFileChange={setPrivacyManifest}
              />
            </div>

            <MetadataForm
              metadata={state.metadata}
              onChange={updateMetadata}
            />
          </motion.div>
        )}

        {state.currentStep === 1 && !isAnalyzing && (
          <motion.div
            key="step-1"
            custom={direction}
            variants={STEP_VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Questionnaire
              answers={state.answers}
              onAnswer={setAnswer}
            />
          </motion.div>
        )}

        {isAnalyzing && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="h-10 w-10 text-emerald-400" />
            </motion.div>
            <p className="mt-4 text-lg font-medium text-zinc-200">
              Analyzing your app...
            </p>
            <p className="mt-1 text-sm text-zinc-500">
              Checking 10 review categories
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {!isAnalyzing && (
        <div className="flex justify-between pt-4">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={state.currentStep === 0}
            className="text-zinc-400"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-zinc-950 hover:from-emerald-400 hover:to-cyan-400"
          >
            {state.currentStep === 1 ? "Analyze" : "Next"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
