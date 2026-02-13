import { Hero } from "@/components/landing/hero";
import { StatsBar } from "@/components/landing/stats-bar";
import { FeatureGrid } from "@/components/landing/feature-grid";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Hero />
      <StatsBar />
      <FeatureGrid />
      <HowItWorks />
      <Footer />
    </main>
  );
}
