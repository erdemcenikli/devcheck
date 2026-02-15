"use client";

import { motion } from "framer-motion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "Can I try DevCheck before subscribing?",
        answer:
            "Yes! The Free tier gives you 5 API requests per day with core results — overall score, grade, verdict, and issue counts. Use it as long as you like to evaluate.",
    },
    {
        question: "What happens if I exceed my daily API limit?",
        answer:
            "Requests beyond your daily limit return a 429 status code with retry-after headers. Your limit resets at midnight UTC. Upgrade your plan anytime for higher limits.",
    },
    {
        question: "Can I cancel or change plans anytime?",
        answer:
            "Absolutely. All plans are month-to-month with no long-term commitment. Upgrade, downgrade, or cancel from your dashboard at any time.",
    },
    {
        question: "What's included in the free web check at /check?",
        answer:
            "The web check gives you the same overall score, grade, and verdict as the Free API tier. Detailed category breakdowns and fix recommendations require a Pro subscription.",
    },
    {
        question: "How do API keys work?",
        answer:
            "After signing up, you generate API keys from your dashboard. Keys start with dk_live_ and are passed as Bearer tokens in the Authorization header. Each key is tied to your subscription tier.",
    },
    {
        question: "Does DevCheck support CI/CD integration?",
        answer:
            "Yes — the API is designed for CI/CD pipelines. Add a single POST request to your build script to check compliance before every App Store submission.",
    },
];

export function PricingFaq() {
    return (
        <section className="px-4 pb-24 sm:px-6">
            <div className="mx-auto max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 text-center"
                >
                    <h2 className="text-2xl font-bold text-zinc-100 sm:text-3xl">
                        Frequently asked questions
                    </h2>
                    <p className="mt-3 text-zinc-400">
                        Everything you need to know about DevCheck pricing.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="rounded-2xl border border-zinc-800 bg-zinc-900/50 px-6 backdrop-blur"
                >
                    <Accordion type="single" collapsible>
                        {faqs.map((faq, i) => (
                            <AccordionItem
                                key={i}
                                value={`faq-${i}`}
                                className="border-zinc-800"
                            >
                                <AccordionTrigger className="text-zinc-200 hover:no-underline hover:text-zinc-100">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-zinc-400 leading-relaxed">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    );
}
