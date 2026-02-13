import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { EndpointSection } from "@/components/api-docs/endpoint-section";
import { RequestFieldsTable } from "@/components/api-docs/request-fields-table";
import { CodeBlock } from "@/components/api-docs/code-block";
import { ResponseSchema } from "@/components/api-docs/response-schema";
import { CategoriesGrid } from "@/components/api-docs/categories-grid";

export const metadata: Metadata = {
  title: "API Documentation — DevCheck",
  description:
    "Integrate App Store review checks into your CI/CD pipeline with the DevCheck API. Analyze Info.plist, privacy manifests, metadata, and more.",
};

const curlExample = `curl -X POST https://devcheck.app/api/analyze \\
  -F "infoPlist=@Info.plist" \\
  -F "privacyManifest=@PrivacyInfo.xcprivacy" \\
  -F 'metadata={"appName":"MyApp","description":"A great app","keywords":"productivity,tools","primaryCategory":"Utilities","ageRating":"4+"}' \\
  -F "screenshots=@screenshot1.png" \\
  -F "screenshots=@screenshot2.png" \\
  -F 'screenshotDimensions=[{"width":1290,"height":2796,"name":"screenshot1.png"},{"width":1290,"height":2796,"name":"screenshot2.png"}]' \\
  -F 'answers={"q1":"yes","q2":"no"}'`;

const successExample = `{
  "success": true,
  "data": {
    "overallScore": 82,
    "grade": "B",
    "verdict": "needs-work",
    "verdictText": "Your app needs some improvements before submission.",
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
        "description": "Keywords field may contain duplicate or irrelevant terms.",
        "guidelineSection": "2.3",
        "guidelineUrl": "https://developer.apple.com/app-store/review/guidelines/#performance",
        "recommendation": "Use unique, relevant keywords separated by commas.",
        "source": "file-analysis"
      }
    ],
    "hasCritical": false,
    "generatedAt": "2026-01-15T10:30:00.000Z"
  }
}`;

const errorExample = `{
  "success": false,
  "error": "Invalid metadata JSON"
}`;

function CurlHighlighted() {
  return (
    <>
      <span className="text-cyan-400">curl</span>
      <span className="text-zinc-300"> -X POST https://devcheck.app/api/analyze \</span>
      {"\n"}
      <span className="text-zinc-300">  -F </span>
      <span className="text-amber-400">{'"infoPlist=@Info.plist"'}</span>
      <span className="text-zinc-300"> \</span>
      {"\n"}
      <span className="text-zinc-300">  -F </span>
      <span className="text-amber-400">{'"privacyManifest=@PrivacyInfo.xcprivacy"'}</span>
      <span className="text-zinc-300"> \</span>
      {"\n"}
      <span className="text-zinc-300">  -F </span>
      <span className="text-amber-400">{"'metadata={\"appName\":\"MyApp\",\"description\":\"A great app\",\"keywords\":\"productivity,tools\",\"primaryCategory\":\"Utilities\",\"ageRating\":\"4+\"}'"}</span>
      <span className="text-zinc-300"> \</span>
      {"\n"}
      <span className="text-zinc-300">  -F </span>
      <span className="text-amber-400">{'"screenshots=@screenshot1.png"'}</span>
      <span className="text-zinc-300"> \</span>
      {"\n"}
      <span className="text-zinc-300">  -F </span>
      <span className="text-amber-400">{'"screenshots=@screenshot2.png"'}</span>
      <span className="text-zinc-300"> \</span>
      {"\n"}
      <span className="text-zinc-300">  -F </span>
      <span className="text-amber-400">{"'screenshotDimensions=[{\"width\":1290,\"height\":2796,\"name\":\"screenshot1.png\"},{\"width\":1290,\"height\":2796,\"name\":\"screenshot2.png\"}]'"}</span>
      <span className="text-zinc-300"> \</span>
      {"\n"}
      <span className="text-zinc-300">  -F </span>
      <span className="text-amber-400">{"'answers={\"q1\":\"yes\",\"q2\":\"no\"}'"}</span>
    </>
  );
}

function JsonHighlighted({ json, variant }: { json: string; variant: "success" | "error" }) {
  return (
    <span className="text-zinc-300">
      {json.split("\n").map((line, i, arr) => {
        const highlighted = line
          .replace(/"([^"]+)":/g, (_, key: string) => `\x01${key}\x02:`)
          .replace(/: "(.*?)"/g, (_, val: string) => `: \x03${val}\x04`)
          .replace(/: (\d+)/g, (_, num: string) => `: \x05${num}\x06`)
          .replace(/: (true|false|null)/g, (_, val: string) => `: \x07${val}\x08`);

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
                    <span
                      key={pi}
                      className={
                        variant === "success" && part.text === "true"
                          ? "text-emerald-400"
                          : variant === "success" && part.text === "false"
                            ? "text-emerald-400"
                            : "text-cyan-400"
                      }
                    >
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

export default function ApiDocsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Title */}
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-zinc-100 sm:text-4xl">
              API Documentation
            </h1>
            <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
              v1
            </Badge>
          </div>
          <p className="mt-3 text-zinc-400">
            Integrate App Store review checks into your CI/CD pipeline.
            Submit files and metadata, get back a detailed compliance report.
          </p>
        </div>

        {/* Endpoint */}
        <EndpointSection />

        {/* Request Fields */}
        <RequestFieldsTable />

        {/* cURL Example */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-zinc-100">Example Request</h3>
          <CodeBlock label="cURL" language="bash" code={curlExample}>
            <CurlHighlighted />
          </CodeBlock>
        </div>

        {/* Response Schema */}
        <ResponseSchema />

        {/* Response Examples */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-zinc-100">
            Response Examples
          </h3>
          <CodeBlock label="Success (200)" language="JSON" code={successExample}>
            <JsonHighlighted json={successExample} variant="success" />
          </CodeBlock>
          <CodeBlock label="Error (400 / 500)" language="JSON" code={errorExample}>
            <JsonHighlighted json={errorExample} variant="error" />
          </CodeBlock>
        </div>

        {/* Categories */}
        <CategoriesGrid />
      </div>
    </main>
  );
}
