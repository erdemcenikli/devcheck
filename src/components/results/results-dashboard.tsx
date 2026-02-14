"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, RotateCcw, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AnalysisResult } from "@/lib/types";
import { OverallScore } from "./overall-score";
import { CategoryCard } from "./category-card";
import { ExportButton } from "./export-button";

interface ResultsDashboardProps {
  result: AnalysisResult;
  onReset: () => void;
}

export function ResultsDashboard({ result, onReset }: ResultsDashboardProps) {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-between"
      >
        <Button variant="ghost" asChild className="text-zinc-400">
          <Link href="/check">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Check
          </Link>
        </Button>
        <div className="flex gap-2">
          <ExportButton result={result} />
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            New Check
          </Button>
        </div>
      </motion.div>

      <OverallScore result={result} />

      {/* Gate overlay */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="relative rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur"
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex size-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800">
            <Lock className="size-6 text-zinc-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-zinc-100">
              Unlock Full Report
            </h3>
            <p className="mx-auto mt-1 max-w-md text-sm text-zinc-400">
              Subscribe to see detailed issues, recommendations, and category
              breakdowns for every review guideline.
            </p>
          </div>
          <Button
            asChild
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 font-semibold text-white shadow-lg shadow-emerald-500/20 hover:brightness-110"
          >
            <Link href="/api-docs#pricing">View Plans</Link>
          </Button>
        </div>
      </motion.div>

      {/* Blurred category breakdown */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="pointer-events-none select-none blur-sm"
        aria-hidden
      >
        <h2 className="mb-4 text-lg font-semibold text-zinc-200">
          Category Breakdown
        </h2>
        <div className="space-y-3">
          {result.categories.map((cat, index) => (
            <CategoryCard key={cat.categoryId} result={cat} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
