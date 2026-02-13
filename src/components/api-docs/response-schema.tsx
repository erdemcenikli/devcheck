import { CodeBlock } from "./code-block";

const analysisResultCode = `interface AnalysisResult {
  overallScore: number;
  grade: "A" | "B" | "C" | "D" | "F";
  verdict: "ready" | "needs-work" | "high-risk";
  verdictText: string;
  categories: CategoryResult[];
  issues: Issue[];
  hasCritical: boolean;
  generatedAt: string;
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

export function ResponseSchema() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-zinc-100">Response Schema</h3>

      <CodeBlock label="AnalysisResult" language="TypeScript" code={analysisResultCode}>
        <Kw>interface</Kw> <Id>AnalysisResult</Id> <Pn>{"{"}</Pn>{"\n"}
        {"  "}<Id>overallScore</Id><Pn>:</Pn> <Ty>number</Ty><Pn>;</Pn>{"\n"}
        {"  "}<Id>grade</Id><Pn>:</Pn> <Str>{'"A"'}</Str> <Pn>|</Pn> <Str>{'"B"'}</Str> <Pn>|</Pn> <Str>{'"C"'}</Str> <Pn>|</Pn> <Str>{'"D"'}</Str> <Pn>|</Pn> <Str>{'"F"'}</Str><Pn>;</Pn>{"\n"}
        {"  "}<Id>verdict</Id><Pn>:</Pn> <Str>{'"ready"'}</Str> <Pn>|</Pn> <Str>{'"needs-work"'}</Str> <Pn>|</Pn> <Str>{'"high-risk"'}</Str><Pn>;</Pn>{"\n"}
        {"  "}<Id>verdictText</Id><Pn>:</Pn> <Ty>string</Ty><Pn>;</Pn>{"\n"}
        {"  "}<Id>categories</Id><Pn>:</Pn> <Ty>CategoryResult</Ty><Pn>[];</Pn>{"\n"}
        {"  "}<Id>issues</Id><Pn>:</Pn> <Ty>Issue</Ty><Pn>[];</Pn>{"\n"}
        {"  "}<Id>hasCritical</Id><Pn>:</Pn> <Ty>boolean</Ty><Pn>;</Pn>{"\n"}
        {"  "}<Id>generatedAt</Id><Pn>:</Pn> <Ty>string</Ty><Pn>;</Pn>{"\n"}
        <Pn>{"}"}</Pn>
      </CodeBlock>

      <CodeBlock label="CategoryResult" language="TypeScript" code={categoryResultCode}>
        <Kw>interface</Kw> <Id>CategoryResult</Id> <Pn>{"{"}</Pn>{"\n"}
        {"  "}<Id>categoryId</Id><Pn>:</Pn> <Ty>string</Ty><Pn>;</Pn>{"\n"}
        {"  "}<Id>score</Id><Pn>:</Pn> <Ty>number</Ty><Pn>;</Pn>{"\n"}
        {"  "}<Id>maxScore</Id><Pn>:</Pn> <Ty>number</Ty><Pn>;</Pn>{"\n"}
        {"  "}<Id>percentage</Id><Pn>:</Pn> <Ty>number</Ty><Pn>;</Pn>{"\n"}
        {"  "}<Id>issues</Id><Pn>:</Pn> <Ty>Issue</Ty><Pn>[];</Pn>{"\n"}
        {"  "}<Id>checkedItems</Id><Pn>:</Pn> <Ty>number</Ty><Pn>;</Pn>{"\n"}
        <Pn>{"}"}</Pn>
      </CodeBlock>

      <CodeBlock label="Issue" language="TypeScript" code={issueCode}>
        <Kw>interface</Kw> <Id>Issue</Id> <Pn>{"{"}</Pn>{"\n"}
        {"  "}<Id>id</Id><Pn>:</Pn> <Ty>string</Ty><Pn>;</Pn>{"\n"}
        {"  "}<Id>categoryId</Id><Pn>:</Pn> <Ty>string</Ty><Pn>;</Pn>{"\n"}
        {"  "}<Id>severity</Id><Pn>:</Pn> <Str>{'"critical"'}</Str> <Pn>|</Pn> <Str>{'"warning"'}</Str> <Pn>|</Pn> <Str>{'"info"'}</Str><Pn>;</Pn>{"\n"}
        {"  "}<Id>title</Id><Pn>:</Pn> <Ty>string</Ty><Pn>;</Pn>{"\n"}
        {"  "}<Id>description</Id><Pn>:</Pn> <Ty>string</Ty><Pn>;</Pn>{"\n"}
        {"  "}<Id>guidelineSection</Id><Pn>:</Pn> <Ty>string</Ty><Pn>;</Pn>{"\n"}
        {"  "}<Id>guidelineUrl</Id><Pn>:</Pn> <Ty>string</Ty><Pn>;</Pn>{"\n"}
        {"  "}<Id>recommendation</Id><Pn>:</Pn> <Ty>string</Ty><Pn>;</Pn>{"\n"}
        {"  "}<Id>source</Id><Pn>:</Pn> <Str>{'"file-analysis"'}</Str> <Pn>|</Pn> <Str>{'"questionnaire"'}</Str><Pn>;</Pn>{"\n"}
        <Pn>{"}"}</Pn>
      </CodeBlock>
    </div>
  );
}
