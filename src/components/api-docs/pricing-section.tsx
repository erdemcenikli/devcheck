"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRICING_TIERS } from "@/lib/data/pricing";

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.15 },
    }),
};

export function PricingSection() {
    return (
        <section id="pricing" className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-zinc-100 sm:text-3xl">
                    Simple, transparent pricing
                </h2>
                <p className="mt-3 text-zinc-400">
                    Start free, upgrade when you need more.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {PRICING_TIERS.map((tier, i) => (
                    <motion.div
                        key={tier.name}
                        custom={i}
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className={`relative flex flex-col rounded-2xl border bg-zinc-900/50 p-6 backdrop-blur ${tier.highlighted
                                ? "border-emerald-500/40 shadow-[0_0_40px_-12px] shadow-emerald-500/20"
                                : "border-zinc-800"
                            }`}
                    >
                        {tier.highlighted && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-3 py-0.5 text-xs font-semibold text-white">
                                Recommended
                            </span>
                        )}

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-zinc-100">
                                {tier.name}
                            </h3>
                            <div className="mt-2 flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-zinc-100">
                                    {tier.price}
                                </span>
                                {tier.priceNote && (
                                    <span className="text-sm text-zinc-500">
                                        {tier.priceNote}
                                    </span>
                                )}
                            </div>
                        </div>

                        <ul className="mb-8 flex-1 space-y-3">
                            {tier.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-2 text-sm">
                                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                                    <span className="text-zinc-300">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <Button
                            asChild
                            className={`w-full ${tier.highlighted
                                    ? "bg-gradient-to-r from-emerald-500 to-cyan-500 font-semibold text-white shadow-lg shadow-emerald-500/20 hover:brightness-110"
                                    : "border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                                }`}
                        >
                            <a href={tier.ctaHref}>{tier.cta}</a>
                        </Button>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
