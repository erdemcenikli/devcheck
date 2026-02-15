import type { Metadata } from "next";
import { PricingHero } from "@/components/pricing/pricing-hero";
import { PricingCards } from "@/components/pricing/pricing-cards";
import { FeatureComparison } from "@/components/pricing/feature-comparison";
import { PricingFaq } from "@/components/pricing/pricing-faq";
import { Footer } from "@/components/landing/footer";

export const metadata: Metadata = {
    title: "Pricing — DevCheck",
    description:
        "Simple, transparent pricing for DevCheck. Start free, upgrade when you need detailed compliance reports and higher API limits.",
};

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-zinc-950">
            <PricingHero />
            <PricingCards />
            <FeatureComparison />
            <PricingFaq />
            <Footer />
        </main>
    );
}
