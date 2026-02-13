"use client";

import { motion } from "framer-motion";
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
import { cn } from "@/lib/utils";

interface Category {
  icon: LucideIcon;
  name: string;
  description: string;
  weight: string;
}

const categories: Category[] = [
  {
    icon: CheckCircle2,
    name: "App Completeness",
    weight: "18%",
    description: "Crash-free, no placeholders, working links",
  },
  {
    icon: FileText,
    name: "Accurate Metadata",
    weight: "12%",
    description: "Description, keywords, screenshots validated",
  },
  {
    icon: Shield,
    name: "Privacy Policy",
    weight: "14%",
    description: "Policy URL, data disclosure, permissions",
  },
  {
    icon: Fingerprint,
    name: "Privacy Manifest",
    weight: "10%",
    description: "Required reason APIs, tracking domains",
  },
  {
    icon: CreditCard,
    name: "IAP Compliance",
    weight: "10%",
    description: "Apple IAP, restore button, no external payments",
  },
  {
    icon: Zap,
    name: "Minimum Functionality",
    weight: "8%",
    description: "Not a web wrapper, standalone value",
  },
  {
    icon: Users,
    name: "User Generated Content",
    weight: "7%",
    description: "Report mechanism, moderation, blocking",
  },
  {
    icon: Cpu,
    name: "Software Requirements",
    weight: "8%",
    description: "iOS version, ATS, background modes",
  },
  {
    icon: Scale,
    name: "Intellectual Property",
    weight: "6%",
    description: "Original assets, trademark compliance",
  },
  {
    icon: Palette,
    name: "Design Quality",
    weight: "7%",
    description: "Polished UI, HIG, screen sizes",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export function FeatureGrid() {
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-zinc-100 sm:text-4xl">
            10 categories.{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Zero surprises.
            </span>
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Every check Apple runs, we run first.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3"
        >
          {categories.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CategoryCard({ category }: { category: Category }) {
  const Icon = category.icon;

  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        "group relative rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 backdrop-blur",
        "transition-colors hover:border-emerald-500/50"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex size-10 items-center justify-center rounded-lg bg-zinc-800/80">
          <Icon className="size-5 text-emerald-400" />
        </div>
        <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
          {category.weight}
        </span>
      </div>
      <h3 className="mt-4 text-sm font-semibold text-zinc-100">
        {category.name}
      </h3>
      <p className="mt-1 text-xs leading-relaxed text-zinc-500">
        {category.description}
      </p>
    </motion.div>
  );
}
