"use client";

import { useRouter } from "next/navigation";
import { useCheckState } from "@/lib/hooks/use-check-state";
import { ResultsDashboard } from "@/components/results/results-dashboard";

export default function ResultsPage() {
  const router = useRouter();
  const { state, reset } = useCheckState();

  const handleReset = () => {
    reset();
    router.push("/check");
  };

  if (!state.result) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-zinc-200">No results yet</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Run a check first to see your results.
          </p>
          <button
            type="button"
            onClick={() => router.push("/check")}
            className="mt-4 text-sm text-emerald-400 hover:text-emerald-300"
          >
            Start a check &rarr;
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-12 sm:px-6">
      <ResultsDashboard result={state.result} onReset={handleReset} />
    </main>
  );
}
