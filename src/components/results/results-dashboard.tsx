"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
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
