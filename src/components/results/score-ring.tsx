"use client";

import { motion } from "framer-motion";
import type { Grade } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ScoreRingProps {
  score: number;
  grade: Grade;
  size?: number;
}

const GRADE_COLORS: Record<Grade, { stroke: string; text: string; glow: string }> = {
  A: { stroke: "stroke-emerald-400", text: "text-emerald-400", glow: "drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" },
  B: { stroke: "stroke-emerald-500", text: "text-emerald-500", glow: "drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]" },
  C: { stroke: "stroke-amber-400", text: "text-amber-400", glow: "drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]" },
  D: { stroke: "stroke-orange-400", text: "text-orange-400", glow: "drop-shadow-[0_0_15px_rgba(251,146,60,0.4)]" },
  F: { stroke: "stroke-red-400", text: "text-red-400", glow: "drop-shadow-[0_0_15px_rgba(248,113,113,0.5)]" },
};

export function ScoreRing({ score, grade, size = 200 }: ScoreRingProps) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const colors = GRADE_COLORS[grade];

  return (
    <div className={cn("relative inline-flex items-center justify-center", colors.glow)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-zinc-800"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={colors.stroke}
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        />
      </svg>

      <div className="absolute flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className={cn("text-5xl font-bold", colors.text)}
        >
          {score}
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-sm text-zinc-500"
        >
          / 100
        </motion.span>
      </div>
    </div>
  );
}
