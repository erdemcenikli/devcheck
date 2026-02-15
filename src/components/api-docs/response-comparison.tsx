"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const freeResponse = `{
  "success": true,
  "data": {
    "overallScore": 82,
    "grade": "B",
    "verdict": "needs-work",
    "hasCritical": false,
    "issueCount": {
      "critical": 0,
      "warning": 3,
      "info": 2
    }
  }
}`;

const proResponse = `{
  "success": true,
  "data": {
    "overallScore": 82,
    "grade": "B",
    "verdict": "needs-work",
    "verdictText": "Your app needs some improvements...",
    "hasCritical": false,
    "categories": [
      {
        "categoryId": "app-completeness",
        "score": 90,
        "maxScore": 100,
        "percentage": 90,
        "issues": [],
        "checkedItems": 5
      }
    ],
    "issues": [
      {
        "id": "metadata-keywords-stuffing",
        "categoryId": "accurate-metadata",
        "severity": "warning",
        "title": "Possible keyword stuffing",
        "description": "Keywords field may contain...",
        "guidelineSection": "2.3",
        "guidelineUrl": "https://developer.apple...",
        "recommendation": "Use unique, relevant..."
      }
    ],
    "generatedAt": "2026-01-15T10:30:00.000Z"
  }
}`;

function JsonSyntax({ json }: { json: string }) {
    return (
        <span className="text-zinc-300">
            {json.split("\n").map((line, i, arr) => {
                const highlighted = line
                    .replace(/"([^"]+)":/g, (_, key: string) => `\x01${key}\x02:`)
                    .replace(/: "(.*?)"/g, (_, val: string) => `: \x03${val}\x04`)
                    .replace(/: (\d+)/g, (_, num: string) => `: \x05${num}\x06`)
                    .replace(
                        /: (true|false|null)/g,
                        (_, val: string) => `: \x07${val}\x08`
                    );

                const parts: Array<{ type: string; text: string }> = [];
                let buffer = "";

                for (let j = 0; j < highlighted.length; j++) {
                    const ch = highlighted[j];
                    if (ch === "\x01") {
                        if (buffer) parts.push({ type: "plain", text: buffer });
                        buffer = "";
                    } else if (ch === "\x02") {
                        parts.push({ type: "key", text: buffer });
                        buffer = "";
                    } else if (ch === "\x03") {
                        if (buffer) parts.push({ type: "plain", text: buffer });
                        buffer = "";
                    } else if (ch === "\x04") {
                        parts.push({ type: "string", text: buffer });
                        buffer = "";
                    } else if (ch === "\x05") {
                        if (buffer) parts.push({ type: "plain", text: buffer });
                        buffer = "";
                    } else if (ch === "\x06") {
                        parts.push({ type: "number", text: buffer });
                        buffer = "";
                    } else if (ch === "\x07") {
                        if (buffer) parts.push({ type: "plain", text: buffer });
                        buffer = "";
                    } else if (ch === "\x08") {
                        parts.push({ type: "boolean", text: buffer });
                        buffer = "";
                    } else {
                        buffer += ch;
                    }
                }
                if (buffer) parts.push({ type: "plain", text: buffer });

                return (
                    <span key={i}>
                        {parts.map((part, pi) => {
                            switch (part.type) {
                                case "key":
                                    return (
                                        <span key={pi} className="text-zinc-200">
                                            &quot;{part.text}&quot;
                                        </span>
                                    );
                                case "string":
                                    return (
                                        <span key={pi} className="text-amber-400">
                                            &quot;{part.text}&quot;
                                        </span>
                                    );
                                case "number":
                                    return (
                                        <span key={pi} className="text-cyan-400">
                                            {part.text}
                                        </span>
                                    );
                                case "boolean":
                                    return (
                                        <span key={pi} className="text-emerald-400">
                                            {part.text}
                                        </span>
                                    );
                                default:
                                    return (
                                        <span key={pi} className="text-zinc-500">
                                            {part.text}
                                        </span>
                                    );
                            }
                        })}
                        {i < arr.length - 1 ? "\n" : null}
                    </span>
                );
            })}
        </span>
    );
}

export function ResponseComparison() {
    const [activeTab, setActiveTab] = useState<"free" | "pro">("free");

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-zinc-100">
                Response Examples
            </h3>
            <p className="text-sm text-zinc-400">
                Compare what you get with a free key vs. a Pro subscription.
            </p>

            {/* Mobile tab toggle */}
            <div className="flex gap-1 rounded-lg bg-zinc-800/50 p-1 sm:hidden">
                <button
                    onClick={() => setActiveTab("free")}
                    className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${activeTab === "free"
                        ? "bg-zinc-700 text-zinc-100"
                        : "text-zinc-400 hover:text-zinc-300"
                        }`}
                >
                    Free Response
                </button>
                <button
                    onClick={() => setActiveTab("pro")}
                    className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${activeTab === "pro"
                        ? "bg-zinc-700 text-zinc-100"
                        : "text-zinc-400 hover:text-zinc-300"
                        }`}
                >
                    Pro Response
                </button>
            </div>

            {/* Desktop side-by-side / Mobile tab panels */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Free panel */}
                <div
                    className={`rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur ${activeTab !== "free" ? "hidden sm:block" : ""
                        }`}
                >
                    <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-zinc-400">Free</span>
                            <span className="rounded-full bg-zinc-700/50 px-2 py-0.5 text-xs text-zinc-500">
                                JSON
                            </span>
                        </div>
                    </div>
                    <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
                        <code>
                            <JsonSyntax json={freeResponse} />
                        </code>
                    </pre>
                </div>

                {/* Pro panel */}
                <div
                    className={`relative rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur ${activeTab !== "pro" ? "hidden sm:block" : ""
                        }`}
                >
                    <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-zinc-400">Pro</span>
                            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-400">
                                Full Response
                            </span>
                        </div>
                    </div>
                    <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
                        <code>
                            <JsonSyntax json={proResponse} />
                        </code>
                    </pre>

                    {/* Gradient blur overlay */}
                    <div className="absolute inset-x-0 bottom-0 flex h-3/5 flex-col items-center justify-center rounded-b-xl bg-gradient-to-b from-transparent via-zinc-900/80 to-zinc-900 backdrop-blur-sm">
                        <div className="flex flex-col items-center gap-3">
                            <div className="flex size-12 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800">
                                <Lock className="size-5 text-zinc-400" />
                            </div>
                            <p className="text-center text-sm font-medium text-zinc-300">
                                Upgrade to unlock detailed issues
                                <br />& recommendations
                            </p>
                            <Button
                                asChild
                                size="sm"
                                className="bg-gradient-to-r from-emerald-500 to-cyan-500 font-semibold text-white shadow-lg shadow-emerald-500/20 hover:brightness-110"
                            >
                                <a href="/pricing">View Plans</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
