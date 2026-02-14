import { PRICING_TIERS } from "@/lib/data/pricing";

const RATE_HEADERS = [
    {
        name: "X-RateLimit-Limit",
        description: "Maximum number of requests allowed per day for your tier.",
    },
    {
        name: "X-RateLimit-Remaining",
        description: "Number of requests remaining in the current window.",
    },
    {
        name: "X-RateLimit-Reset",
        description: "Unix timestamp (seconds) when the rate limit window resets.",
    },
    {
        name: "X-DevCheck-Tier",
        description:
            'Your current subscription tier: "free", "pro", or "team".',
    },
];

export function RateLimitSection() {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-zinc-100">Rate Limits</h3>

            {/* Tier limits table */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur">
                <div className="border-b border-zinc-800 px-4 py-3">
                    <h4 className="text-sm font-semibold text-zinc-100">
                        Limits by Tier
                    </h4>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-zinc-800 text-left text-zinc-500">
                                <th className="px-4 py-2.5 font-medium">Tier</th>
                                <th className="px-4 py-2.5 font-medium">Daily Limit</th>
                                <th className="px-4 py-2.5 font-medium">Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {PRICING_TIERS.map((tier) => (
                                <tr
                                    key={tier.name}
                                    className="border-b border-zinc-800/50 last:border-0"
                                >
                                    <td className="px-4 py-2.5">
                                        <code className="text-emerald-400">{tier.name}</code>
                                    </td>
                                    <td className="px-4 py-2.5">
                                        <code className="text-zinc-300">{tier.limits}</code>
                                    </td>
                                    <td className="px-4 py-2.5 text-zinc-400">
                                        {tier.name === "Free"
                                            ? "No burst limit"
                                            : tier.name === "Pro"
                                                ? "10 req/min"
                                                : "30 req/min"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Response headers table */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur">
                <div className="border-b border-zinc-800 px-4 py-3">
                    <h4 className="text-sm font-semibold text-zinc-100">
                        Rate Limit Response Headers
                    </h4>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-zinc-800 text-left text-zinc-500">
                                <th className="px-4 py-2.5 font-medium">Header</th>
                                <th className="px-4 py-2.5 font-medium">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {RATE_HEADERS.map((header) => (
                                <tr
                                    key={header.name}
                                    className="border-b border-zinc-800/50 last:border-0"
                                >
                                    <td className="px-4 py-2.5">
                                        <code className="text-emerald-400">{header.name}</code>
                                    </td>
                                    <td className="px-4 py-2.5 text-zinc-400">
                                        {header.description}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
