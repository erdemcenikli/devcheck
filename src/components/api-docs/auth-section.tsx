import type { ReactNode } from "react";
import { Shield } from "lucide-react";
import { CodeBlock } from "./code-block";

const curlAuthExample = `curl -X POST https://devcheck.app/api/analyze \\
  -H "Authorization: Bearer dk_live_your_api_key"`;

const fetchAuthExample = `const res = await fetch("https://devcheck.app/api/analyze", {
  method: "POST",
  headers: {
    "Authorization": "Bearer dk_live_your_api_key",
  },
  body: formData,
});`;

function Kw({ children }: { children: ReactNode }) {
    return <span className="text-emerald-400">{children}</span>;
}

function Str({ children }: { children: ReactNode }) {
    return <span className="text-amber-400">{children}</span>;
}

function Pn({ children }: { children: ReactNode }) {
    return <span className="text-zinc-400">{children}</span>;
}

function Id({ children }: { children: ReactNode }) {
    return <span className="text-zinc-200">{children}</span>;
}

export function AuthSection() {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-zinc-800/80">
                    <Shield className="size-4 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-100">Authentication</h3>
            </div>

            <p className="text-sm text-zinc-400">
                Include your API key in the{" "}
                <code className="rounded-md bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300">
                    Authorization
                </code>{" "}
                header as a Bearer token. Keys start with{" "}
                <code className="rounded-md bg-zinc-800 px-2 py-0.5 text-xs text-emerald-400">
                    dk_live_
                </code>
                .
            </p>

            <CodeBlock label="cURL" language="bash" code={curlAuthExample}>
                <Kw>curl</Kw>
                <Pn> -X POST https://devcheck.app/api/analyze \</Pn>
                {"\n"}
                <Pn>  -H </Pn>
                <Str>{'"Authorization: Bearer dk_live_your_api_key"'}</Str>
            </CodeBlock>

            <CodeBlock label="JavaScript" language="JavaScript" code={fetchAuthExample}>
                <Kw>const</Kw> <Id>res</Id> <Pn>= </Pn><Kw>await</Kw>{" "}
                <Id>fetch</Id>
                <Pn>(</Pn>
                <Str>{'"https://devcheck.app/api/analyze"'}</Str>
                <Pn>, {"{"}</Pn>
                {"\n"}
                {"  "}<Id>method</Id><Pn>:</Pn> <Str>{'"POST"'}</Str><Pn>,</Pn>
                {"\n"}
                {"  "}<Id>headers</Id><Pn>: {"{"}</Pn>
                {"\n"}
                {"    "}<Str>{'"Authorization"'}</Str><Pn>:</Pn>{" "}
                <Str>{'"Bearer dk_live_your_api_key"'}</Str><Pn>,</Pn>
                {"\n"}
                {"  "}<Pn>{"}"}</Pn><Pn>,</Pn>
                {"\n"}
                {"  "}<Id>body</Id><Pn>:</Pn> <Id>formData</Id><Pn>,</Pn>
                {"\n"}
                <Pn>{"}"}</Pn><Pn>)</Pn><Pn>;</Pn>
            </CodeBlock>

            <div className="rounded-lg border border-zinc-800 bg-zinc-800/30 px-4 py-3 text-sm text-zinc-400">
                <strong className="text-zinc-300">Note:</strong> Without a key,
                you&apos;ll receive a summary response (score, grade, verdict). With a
                key, get the full compliance report including detailed issues,
                recommendations, and category breakdowns.
            </div>
        </div>
    );
}
