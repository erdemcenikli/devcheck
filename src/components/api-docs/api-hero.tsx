"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ApiHero() {
    return (
        <section className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 px-6 py-16 backdrop-blur sm:px-12 sm:py-20">
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
                    Automate App Store{" "}
                    <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        Compliance
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg"
                >
                    Integrate review checks into your CI/CD pipeline. One API call,
                    instant compliance report.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
                >
                    <Button
                        asChild
                        size="lg"
                        className="h-12 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 text-base font-semibold text-white shadow-lg shadow-emerald-500/20 transition-shadow hover:shadow-emerald-500/30 hover:brightness-110"
                    >
                        <a href="#">
                            <Zap className="size-4" />
                            Get API Key
                        </a>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="h-12 rounded-full border-zinc-700 px-8 text-base"
                    >
                        <a href="#pricing">
                            <ArrowRight className="size-4" />
                            View Pricing
                        </a>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
