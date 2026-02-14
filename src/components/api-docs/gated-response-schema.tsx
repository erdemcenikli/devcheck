import { Lock } from "lucide-react";
import { CodeBlock } from "./code-block";
import { Button } from "@/components/ui/button";

const analysisResultCode = `interface AnalysisResult {
  overallScore: number;          // ✓ Free
  grade: "A" | "B" | "C" | "D" | "F";  // ✓ Free
  verdict: "ready" | "needs-work" | "high-risk";  // ✓ Free
  verdictText: string;           // ✓ Free
  hasCritical: boolean;          // ✓ Free
  categories: CategoryResult[];  // 🔒 Pro
  issues: Issue[];               // 🔒 Pro
  generatedAt: string;           // ✓ Free
}`;

const categoryResultCode = `interface CategoryResult {
  categoryId: string;
  score: number;
  maxScore: number;
  percentage: number;
  issues: Issue[];
  checkedItems: number;
}`;

const issueCode = `interface Issue {
  id: string;
  categoryId: string;
  severity: "critical" | "warning" | "info";
  title: string;
  description: string;
  guidelineSection: string;
  guidelineUrl: string;
  recommendation: string;
  source: "file-analysis" | "questionnaire";
}`;

function Kw({ children }: { children: string }) {
    return <span className="text-emerald-400">{children}</span>;
}

function Ty({ children }: { children: string }) {
    return <span className="text-cyan-400">{children}</span>;
}

function Str({ children }: { children: string }) {
    return <span className="text-amber-400">{children}</span>;
}

function Pn({ children }: { children: string }) {
    return <span className="text-zinc-400">{children}</span>;
}

function Id({ children }: { children: string }) {
    return <span className="text-zinc-200">{children}</span>;
}

function Cm({ children }: { children: string }) {
    return <span className="text-zinc-600">{children}</span>;
}

function BlurOverlay() {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-gradient-to-b from-transparent to-zinc-900 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2">
                <div className="flex size-10 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800">
                    <Lock className="size-4 text-zinc-400" />
                </div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-0.5 text-xs font-medium text-emerald-400">
                    Pro plan
                </span>
                <Button
                    asChild
                    size="sm"
                    className="mt-1 bg-gradient-to-r from-emerald-500 to-cyan-500 text-xs font-semibold text-white shadow-lg shadow-emerald-500/20 hover:brightness-110"
                >
                    <a href="#pricing">Upgrade to Pro</a>
                </Button>
            </div>
        </div>
    );
}

export function GatedResponseSchema() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-zinc-100">Response Schema</h3>

            {/* AnalysisResult — fully visible with annotations */}
            <CodeBlock
                label="AnalysisResult"
                language="TypeScript"
                code={analysisResultCode}
            >
                <Kw>interface</Kw> <Id>AnalysisResult</Id> <Pn>{"{"}</Pn>
                {"\n"}
                {"  "}
                <Id>overallScore</Id>
                <Pn>:</Pn> <Ty>number</Ty>
                <Pn>;</Pn> <Cm>{"// ✓ Free"}</Cm>
                {"\n"}
                {"  "}
                <Id>grade</Id>
                <Pn>:</Pn> <Str>{'"A"'}</Str> <Pn>|</Pn> <Str>{'"B"'}</Str>{" "}
                <Pn>|</Pn> <Str>{'"C"'}</Str> <Pn>|</Pn> <Str>{'"D"'}</Str>{" "}
                <Pn>|</Pn> <Str>{'"F"'}</Str>
                <Pn>;</Pn> <Cm>{"// ✓ Free"}</Cm>
                {"\n"}
                {"  "}
                <Id>verdict</Id>
                <Pn>:</Pn> <Str>{'"ready"'}</Str> <Pn>|</Pn>{" "}
                <Str>{'"needs-work"'}</Str> <Pn>|</Pn> <Str>{'"high-risk"'}</Str>
                <Pn>;</Pn> <Cm>{"// ✓ Free"}</Cm>
                {"\n"}
                {"  "}
                <Id>verdictText</Id>
                <Pn>:</Pn> <Ty>string</Ty>
                <Pn>;</Pn> <Cm>{"// ✓ Free"}</Cm>
                {"\n"}
                {"  "}
                <Id>hasCritical</Id>
                <Pn>:</Pn> <Ty>boolean</Ty>
                <Pn>;</Pn> <Cm>{"// ✓ Free"}</Cm>
                {"\n"}
                {"  "}
                <Id>categories</Id>
                <Pn>:</Pn> <Ty>CategoryResult</Ty>
                <Pn>[];</Pn> <Cm>{"// 🔒 Pro"}</Cm>
                {"\n"}
                {"  "}
                <Id>issues</Id>
                <Pn>:</Pn> <Ty>Issue</Ty>
                <Pn>[];</Pn> <Cm>{"// 🔒 Pro"}</Cm>
                {"\n"}
                {"  "}
                <Id>generatedAt</Id>
                <Pn>:</Pn> <Ty>string</Ty>
                <Pn>;</Pn> <Cm>{"// ✓ Free"}</Cm>
                {"\n"}
                <Pn>{"}"}</Pn>
            </CodeBlock>

            {/* CategoryResult — blurred */}
            <div className="relative">
                <CodeBlock
                    label="CategoryResult"
                    language="TypeScript"
                    code={categoryResultCode}
                >
                    <Kw>interface</Kw> <Id>CategoryResult</Id> <Pn>{"{"}</Pn>
                    {"\n"}
                    {"  "}
                    <Id>categoryId</Id>
                    <Pn>:</Pn> <Ty>string</Ty>
                    <Pn>;</Pn>
                    {"\n"}
                    {"  "}
                    <Id>score</Id>
                    <Pn>:</Pn> <Ty>number</Ty>
                    <Pn>;</Pn>
                    {"\n"}
                    {"  "}
                    <Id>maxScore</Id>
                    <Pn>:</Pn> <Ty>number</Ty>
                    <Pn>;</Pn>
                    {"\n"}
                    {"  "}
                    <Id>percentage</Id>
                    <Pn>:</Pn> <Ty>number</Ty>
                    <Pn>;</Pn>
                    {"\n"}
                    {"  "}
                    <Id>issues</Id>
                    <Pn>:</Pn> <Ty>Issue</Ty>
                    <Pn>[];</Pn>
                    {"\n"}
                    {"  "}
                    <Id>checkedItems</Id>
                    <Pn>:</Pn> <Ty>number</Ty>
                    <Pn>;</Pn>
                    {"\n"}
                    <Pn>{"}"}</Pn>
                </CodeBlock>
                <BlurOverlay />
            </div>

            {/* Issue — blurred */}
            <div className="relative">
                <CodeBlock label="Issue" language="TypeScript" code={issueCode}>
                    <Kw>interface</Kw> <Id>Issue</Id> <Pn>{"{"}</Pn>
                    {"\n"}
                    {"  "}
                    <Id>id</Id>
                    <Pn>:</Pn> <Ty>string</Ty>
                    <Pn>;</Pn>
                    {"\n"}
                    {"  "}
                    <Id>categoryId</Id>
                    <Pn>:</Pn> <Ty>string</Ty>
                    <Pn>;</Pn>
                    {"\n"}
                    {"  "}
                    <Id>severity</Id>
                    <Pn>:</Pn> <Str>{'"critical"'}</Str> <Pn>|</Pn>{" "}
                    <Str>{'"warning"'}</Str> <Pn>|</Pn> <Str>{'"info"'}</Str>
                    <Pn>;</Pn>
                    {"\n"}
                    {"  "}
                    <Id>title</Id>
                    <Pn>:</Pn> <Ty>string</Ty>
                    <Pn>;</Pn>
                    {"\n"}
                    {"  "}
                    <Id>description</Id>
                    <Pn>:</Pn> <Ty>string</Ty>
                    <Pn>;</Pn>
                    {"\n"}
                    {"  "}
                    <Id>guidelineSection</Id>
                    <Pn>:</Pn> <Ty>string</Ty>
                    <Pn>;</Pn>
                    {"\n"}
                    {"  "}
                    <Id>guidelineUrl</Id>
                    <Pn>:</Pn> <Ty>string</Ty>
                    <Pn>;</Pn>
                    {"\n"}
                    {"  "}
                    <Id>recommendation</Id>
                    <Pn>:</Pn> <Ty>string</Ty>
                    <Pn>;</Pn>
                    {"\n"}
                    {"  "}
                    <Id>source</Id>
                    <Pn>:</Pn> <Str>{'"file-analysis"'}</Str> <Pn>|</Pn>{" "}
                    <Str>{'"questionnaire"'}</Str>
                    <Pn>;</Pn>
                    {"\n"}
                    <Pn>{"}"}</Pn>
                </CodeBlock>
                <BlurOverlay />
            </div>
        </div>
    );
}
