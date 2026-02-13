"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AnalysisResult } from "@/lib/types";
import { ScoreRing } from "./score-ring";

interface OverallScoreProps {
  result: AnalysisResult;
}

const VERDICT_CONFIG = {
  ready: {
    icon: ShieldCheck,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    glow: "shadow-[0_0_30px_rgba(52,211,153,0.1)]",
  },
  "needs-work": {
    icon: ShieldAlert,
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    glow: "shadow-[0_0_30px_rgba(251,191,36,0.1)]",
  },
  "high-risk": {
    icon: ShieldX,
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/20",
    glow: "shadow-[0_0_30px_rgba(248,113,113,0.1)]",
  },
} as const;

export function OverallScore({ result }: OverallScoreProps) {
  const config = VERDICT_CONFIG[result.verdict];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-2xl border p-8 backdrop-blur",
        config.bg,
        config.glow
      )}
    >
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center sm:items-start">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-2 flex items-center gap-2"
          >
            <Icon className={cn("h-6 w-6", config.color)} />
            <span className={cn("text-lg font-bold", config.color)}>
              Grade {result.grade}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="max-w-md text-center text-zinc-300 sm:text-left"
          >
            {result.verdictText}
          </motion.p>

          {result.hasCritical && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ delay: 1.0 }}
              className="mt-3 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400"
            >
              Critical issues detected — score capped at 60
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-4 flex gap-4 text-sm text-zinc-500"
          >
            <span>{result.issues.length} issues found</span>
            <span>&middot;</span>
            <span>{result.categories.length} categories checked</span>
          </motion.div>
        </div>

        <ScoreRing score={result.overallScore} grade={result.grade} />
      </div>
    </motion.div>
  );
}
