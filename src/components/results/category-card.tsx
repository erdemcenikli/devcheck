"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CategoryResult } from "@/lib/types";
import { CATEGORY_MAP } from "@/lib/data";
import { IssueItem } from "./issue-item";

interface CategoryCardProps {
  result: CategoryResult;
  index: number;
}

function getScoreColor(percentage: number): string {
  if (percentage >= 85) return "text-emerald-400";
  if (percentage >= 65) return "text-amber-400";
  return "text-red-400";
}

function getScoreIcon(percentage: number) {
  if (percentage >= 85) return CheckCircle2;
  if (percentage >= 65) return AlertTriangle;
  return XCircle;
}

function getScoreBarColor(percentage: number): string {
  if (percentage >= 85) return "bg-emerald-500";
  if (percentage >= 65) return "bg-amber-500";
  return "bg-red-500";
}

export function CategoryCard({ result, index }: CategoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const category = CATEGORY_MAP[result.categoryId];
  const Icon = getScoreIcon(result.percentage);

  if (!category) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.08 }}
      className={cn(
        "rounded-xl border bg-zinc-900/50 backdrop-blur transition-colors",
        result.issues.length > 0 ? "border-zinc-800" : "border-zinc-800/50"
      )}
    >
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center gap-4 p-5 text-left"
      >
        <Icon className={cn("h-5 w-5 shrink-0", getScoreColor(result.percentage))} />

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate text-sm font-semibold text-zinc-200">
              {category.name}
            </h3>
            <span className={cn("text-sm font-bold", getScoreColor(result.percentage))}>
              {result.percentage}%
            </span>
          </div>

          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${result.percentage}%` }}
              transition={{ duration: 1, delay: 0.3 + index * 0.08, ease: "easeOut" }}
              className={cn("h-full rounded-full", getScoreBarColor(result.percentage))}
            />
          </div>

          <div className="mt-1.5 flex items-center gap-3 text-xs text-zinc-500">
            <span>Guideline {category.guidelineSection}</span>
            {result.issues.length > 0 && (
              <span className="text-amber-400/80">
                {result.issues.length} issue{result.issues.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>

        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-zinc-500 transition-transform",
            isExpanded && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-zinc-800 px-5 py-4">
              <p className="mb-4 text-sm text-zinc-400">
                {category.description}
              </p>

              {result.issues.length > 0 ? (
                <div className="space-y-3">
                  {result.issues.map((issue, idx) => (
                    <IssueItem key={issue.id} issue={issue} index={idx} />
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  No issues found in this category
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
