"use client";

import { motion } from "framer-motion";
import { Upload, MessageSquareText, ClipboardCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Upload Files",
    description: "Drop your Info.plist and PrivacyInfo.xcprivacy",
    icon: Upload,
  },
  {
    number: "02",
    title: "Answer Questions",
    description: "Quick targeted questions about your app",
    icon: MessageSquareText,
  },
  {
    number: "03",
    title: "Get Results",
    description: "Detailed report with fix recommendations",
    icon: ClipboardCheck,
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15 },
  }),
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-zinc-100 sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Three steps to a rejection-free submission.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div
            aria-hidden
            className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-emerald-500/50 via-cyan-500/50 to-transparent sm:left-1/2 sm:block"
          />

          <div className="flex flex-col gap-16">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="relative flex items-start gap-6 sm:gap-8"
                >
                  {/* Step number circle */}
                  <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 sm:mx-auto">
                    <span className="text-sm font-bold text-emerald-400">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur">
                    <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-zinc-800/80">
                      <Icon className="size-5 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-100">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-400">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
