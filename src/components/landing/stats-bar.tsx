"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function AnimatedCounter({
  value,
  suffix,
  label,
  displayValue,
}: {
  value: number;
  suffix: string;
  label: string;
  displayValue: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(`0${suffix}`);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1500;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * value);

      if (value >= 1000000) {
        setDisplay((current / 1000000).toFixed(2) + suffix);
      } else {
        setDisplay(current.toLocaleString() + suffix);
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplay(displayValue);
      }
    }

    requestAnimationFrame(tick);
  }, [isInView, value, suffix, displayValue]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1 px-6 py-4">
      <motion.span
        className="text-3xl font-bold text-zinc-100 sm:text-4xl"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      >
        {display}
      </motion.span>
      <span className="text-sm text-zinc-500">{label}</span>
    </div>
  );
}

const stats = [
  { value: 1930000, suffix: "M", label: "Apps rejected in 2024", displayValue: "1.93M" },
  { value: 25, suffix: "%", label: "Rejection rate", displayValue: "25%" },
  { value: 10, suffix: "", label: "Categories checked", displayValue: "10" },
];

export function StatsBar() {
  return (
    <section className="px-4 sm:px-6">
      <div className="mx-auto max-w-4xl rounded-2xl border border-zinc-800 bg-zinc-900/50 p-2 backdrop-blur">
        <div className="grid grid-cols-3 divide-x divide-zinc-800">
          {stats.map((stat) => (
            <AnimatedCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              displayValue={stat.displayValue}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
