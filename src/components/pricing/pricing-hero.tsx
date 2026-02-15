"use client";

import { motion } from "framer-motion";

export function PricingHero() {
    return (
        <section className="relative overflow-hidden px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-32">
            {/* Animated background orbs */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 overflow-hidden"
            >
                <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />
                <div className="absolute -right-40 top-20 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />
                <div className="absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-[100px]" />
            </div>

            <div className="relative mx-auto max-w-3xl text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-bold leading-tight tracking-tight text-zinc-100 sm:text-5xl sm:leading-[1.15]"
                >
                    Simple,{" "}
                    <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        transparent
                    </span>{" "}
                    pricing
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg"
                >
                    Start free, upgrade when you need detailed compliance reports and
                    higher API limits. No hidden fees, cancel anytime.
                </motion.p>
            </div>
        </section>
    );
}
