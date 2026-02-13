"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Question } from "@/lib/types";

interface QuestionCardProps {
  question: Question;
  answer: string | undefined;
  onAnswer: (value: string) => void;
  index: number;
}

const SEVERITY_STYLES: Record<string, string> = {
  critical: "border-red-500/20 text-red-400 bg-red-500/10",
  high: "border-amber-500/20 text-amber-400 bg-amber-500/10",
  medium: "border-yellow-500/20 text-yellow-400 bg-yellow-500/10",
  low: "border-zinc-500/20 text-zinc-400 bg-zinc-500/10",
};

export function QuestionCard({
  question,
  answer,
  onAnswer,
  index,
}: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 backdrop-blur"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-zinc-200">{question.text}</p>
        <span
          className={cn(
            "shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium capitalize",
            SEVERITY_STYLES[question.severity]
          )}
        >
          {question.severity}
        </span>
      </div>

      {question.helpText && (
        <div className="mb-4 flex items-start gap-2 rounded-lg bg-zinc-800/50 px-3 py-2">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-500" />
          <p className="text-xs text-zinc-400">{question.helpText}</p>
        </div>
      )}

      {question.type === "boolean" && (
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => onAnswer("yes")}
            className={cn(
              "flex-1 rounded-lg border px-4 py-2 text-sm font-medium transition-all",
              answer === "yes"
                ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-300"
                : "border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300"
            )}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => onAnswer("no")}
            className={cn(
              "flex-1 rounded-lg border px-4 py-2 text-sm font-medium transition-all",
              answer === "no"
                ? "border-red-500/50 bg-red-500/20 text-red-300"
                : "border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300"
            )}
          >
            No
          </button>
        </div>
      )}

      {question.type === "select" && question.options && (
        <div className="space-y-2">
          {question.options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onAnswer(option.value)}
              className={cn(
                "w-full rounded-lg border px-4 py-2 text-left text-sm transition-all",
                answer === option.value
                  ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-300"
                  : "border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-600"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {answer !== undefined && answer !== question.safeAnswer && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-3 flex items-center gap-2 text-xs text-amber-400"
        >
          <AlertTriangle className="h-3.5 w-3.5" />
          <span>This may trigger a review issue</span>
        </motion.div>
      )}
    </motion.div>
  );
}
