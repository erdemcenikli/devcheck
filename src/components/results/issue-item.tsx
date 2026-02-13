"use client";

import { motion } from "framer-motion";
import { ExternalLink, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { Issue } from "@/lib/types";

interface IssueItemProps {
  issue: Issue;
  index: number;
}

const SEVERITY_BADGE: Record<string, { className: string; label: string }> = {
  critical: {
    className: "bg-red-500/20 text-red-300 border-red-500/30",
    label: "Critical",
  },
  high: {
    className: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    label: "High",
  },
  medium: {
    className: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    label: "Medium",
  },
  low: {
    className: "bg-zinc-500/20 text-zinc-300 border-zinc-500/30",
    label: "Low",
  },
};

export function IssueItem({ issue, index }: IssueItemProps) {
  const badge = SEVERITY_BADGE[issue.severity];

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="space-y-3 rounded-lg border border-zinc-800 bg-zinc-900/30 p-4"
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-medium text-zinc-200">{issue.title}</h4>
        <Badge variant="outline" className={cn("shrink-0", badge.className)}>
          {badge.label}
        </Badge>
      </div>

      <p className="text-sm text-zinc-400">{issue.description}</p>

      <div className="flex items-start gap-2 rounded-lg bg-emerald-500/5 px-3 py-2">
        <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
        <p className="text-xs text-emerald-300">{issue.recommendation}</p>
      </div>

      <a
        href={issue.guidelineUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-xs text-zinc-500 transition-colors hover:text-zinc-300"
      >
        Guideline {issue.guidelineSection}
        <ExternalLink className="h-3 w-3" />
      </a>
    </motion.div>
  );
}
