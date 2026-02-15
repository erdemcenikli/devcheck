"use client";

import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";

interface FeatureRow {
    feature: string;
    free: boolean | string;
    pro: boolean | string;
    team: boolean | string;
}

const features: FeatureRow[] = [
    { feature: "Overall score & grade", free: true, pro: true, team: true },
    { feature: "Pass/fail verdict", free: true, pro: true, team: true },
    { feature: "Critical issue flag", free: true, pro: true, team: true },
    { feature: "Issue count by severity", free: true, pro: true, team: true },
    { feature: "Detailed issues with descriptions", free: false, pro: true, team: true },
    { feature: "Fix recommendations", free: false, pro: true, team: true },
    { feature: "Guideline URLs per issue", free: false, pro: true, team: true },
    { feature: "Full category breakdowns", free: false, pro: true, team: true },
    { feature: "Score per category", free: false, pro: true, team: true },
    { feature: "Webhook notifications", free: false, pro: false, team: true },
    { feature: "Team API key management", free: false, pro: false, team: true },
    { feature: "Priority support", free: false, pro: false, team: true },
    { feature: "Dedicated account manager", free: false, pro: false, team: true },
    { feature: "Daily API requests", free: "5", pro: "500", team: "2,000" },
    { feature: "Rate limit", free: "—", pro: "10 req/min", team: "30 req/min" },
];

function CellValue({ value }: { value: boolean | string }) {
    if (typeof value === "string") {
        return <span className="text-sm text-zinc-300">{value}</span>;
    }
    if (value) {
        return (
            <div className="flex items-center justify-center">
                <Check className="size-4 text-emerald-400" />
            </div>
        );
    }
    return (
        <div className="flex items-center justify-center">
            <Minus className="size-4 text-zinc-600" />
        </div>
    );
}

export function FeatureComparison() {
    return (
        <section className="px-4 pb-20 sm:px-6">
            <div className="mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 text-center"
                >
                    <h2 className="text-2xl font-bold text-zinc-100 sm:text-3xl">
                        Compare plans
                    </h2>
                    <p className="mt-3 text-zinc-400">
                        Everything you need to keep your apps compliant.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-zinc-800">
                                    <th className="px-6 py-4 text-left font-medium text-zinc-400">
                                        Feature
                                    </th>
                                    <th className="px-6 py-4 text-center font-medium text-zinc-400">
                                        Free
                                    </th>
                                    <th className="px-6 py-4 text-center font-semibold text-emerald-400">
                                        Pro
                                    </th>
                                    <th className="px-6 py-4 text-center font-medium text-zinc-400">
                                        Team
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {features.map((row, i) => (
                                    <tr
                                        key={row.feature}
                                        className={`border-b border-zinc-800/50 transition-colors hover:bg-zinc-800/20 ${i === features.length - 1 ? "border-0" : ""
                                            }`}
                                    >
                                        <td className="px-6 py-3.5 text-zinc-300">{row.feature}</td>
                                        <td className="px-6 py-3.5 text-center">
                                            <CellValue value={row.free} />
                                        </td>
                                        <td className="px-6 py-3.5 text-center">
                                            <CellValue value={row.pro} />
                                        </td>
                                        <td className="px-6 py-3.5 text-center">
                                            <CellValue value={row.team} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
