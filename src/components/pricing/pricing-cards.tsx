"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PRICING_TIERS } from "@/lib/data/pricing";

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.12, ease: [0, 0, 0.2, 1] as const },
    }),
};

export function PricingCards() {
    return (
        <section className="px-4 pb-20 sm:px-6">
            <div className="mx-auto max-w-5xl">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    {PRICING_TIERS.map((tier, i) => (
                        <motion.div
                            key={tier.name}
                            custom={i}
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            className={`group relative flex flex-col rounded-2xl border p-6 backdrop-blur transition-all duration-300 sm:p-8 ${tier.highlighted
                                ? "border-emerald-500/40 bg-zinc-900/70 shadow-[0_0_60px_-12px] shadow-emerald-500/20 hover:shadow-[0_0_80px_-12px] hover:shadow-emerald-500/25"
                                : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
                                }`}
                        >
                            {tier.highlighted && (
                                <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-1 text-xs font-semibold text-white shadow-lg shadow-emerald-500/20">
                                    <Sparkles className="size-3" />
                                    Recommended
                                </span>
                            )}

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-zinc-100">
                                    {tier.name}
                                </h3>
                                <div className="mt-3 flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-zinc-100">
                                        {tier.price}
                                    </span>
                                    {tier.priceNote && (
                                        <span className="text-sm text-zinc-500">
                                            {tier.priceNote}
                                        </span>
                                    )}
                                </div>
                                <p className="mt-2 text-sm text-zinc-500">{tier.limits}</p>
                            </div>

                            <ul className="mb-8 flex-1 space-y-3">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                                        <Check className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                                        <span className="text-zinc-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                asChild
                                className={`w-full transition-all duration-200 ${tier.highlighted
                                    ? "bg-gradient-to-r from-emerald-500 to-cyan-500 font-semibold text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:brightness-110"
                                    : "border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                                    }`}
                            >
                                {tier.ctaHref.startsWith("mailto") ? (
                                    <a href={tier.ctaHref}>{tier.cta}</a>
                                ) : (
                                    <Link href={tier.ctaHref}>{tier.cta}</Link>
                                )}
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
