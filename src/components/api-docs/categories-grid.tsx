import {
  CheckCircle2,
  FileText,
  Shield,
  Fingerprint,
  CreditCard,
  Zap,
  Users,
  Cpu,
  Scale,
  Palette,
  type LucideIcon,
} from "lucide-react";
import { CATEGORIES } from "@/lib/data/categories";

const ICON_MAP: Record<string, LucideIcon> = {
  CheckCircle2,
  FileText,
  Shield,
  Fingerprint,
  CreditCard,
  Zap,
  Users,
  Cpu,
  Scale,
  Palette,
};

export function CategoriesGrid() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-zinc-100">
        Analysis Categories
      </h3>
      <p className="text-sm text-zinc-400">
        The API evaluates your app across these 10 App Store Review categories.
        Each category has a weighted contribution to the overall score.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((category) => {
          const Icon = ICON_MAP[category.icon];
          return (
            <div
              key={category.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 backdrop-blur"
            >
              <div className="flex items-start justify-between">
                <div className="flex size-9 items-center justify-center rounded-lg bg-zinc-800/80">
                  {Icon && <Icon className="size-4 text-emerald-400" />}
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
                  {Math.round(category.weight * 100)}%
                </span>
              </div>
              <h4 className="mt-3 text-sm font-semibold text-zinc-100">
                {category.name}
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                {category.shortDescription}
              </p>
              <span className="mt-2 inline-block rounded-md bg-zinc-800 px-2 py-0.5 text-xs text-zinc-500">
                Section {category.guidelineSection}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
