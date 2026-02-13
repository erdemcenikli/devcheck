"use client";

import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <ShieldCheck className="size-6 text-emerald-400" />
      <span className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
        DevCheck
      </span>
    </Link>
  );
}
