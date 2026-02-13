"use client";

import { motion } from "framer-motion";
import { Upload, MessageSquareText, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { label: "Upload & Info", icon: Upload },
  { label: "Questions", icon: MessageSquareText },
  { label: "Results", icon: BarChart3 },
] as const;

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4">
      {STEPS.map((step, index) => {
        const Icon = step.icon;
        const isActive = index === currentStep;
        const isComplete = index < currentStep;

        return (
          <div key={step.label} className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.1 : 1,
                }}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border transition-colors sm:h-10 sm:w-10",
                  isActive &&
                    "border-emerald-500 bg-emerald-500/20 text-emerald-400",
                  isComplete &&
                    "border-emerald-500/50 bg-emerald-500/10 text-emerald-500",
                  !isActive &&
                    !isComplete &&
                    "border-zinc-700 bg-zinc-900 text-zinc-500"
                )}
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.div>
              <span
                className={cn(
                  "hidden text-sm font-medium sm:block",
                  isActive && "text-zinc-100",
                  isComplete && "text-zinc-400",
                  !isActive && !isComplete && "text-zinc-600"
                )}
              >
                {step.label}
              </span>
            </div>

            {index < STEPS.length - 1 && (
              <div
                className={cn(
                  "h-px w-8 sm:w-12",
                  index < currentStep ? "bg-emerald-500/50" : "bg-zinc-800"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
