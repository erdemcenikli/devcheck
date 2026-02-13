import type { ReactNode } from "react";
import { CopyButton } from "./copy-button";

interface CodeBlockProps {
  label: string;
  language: string;
  code: string;
  children: ReactNode;
}

export function CodeBlock({ label, language, code, children }: CodeBlockProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur">
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
        <span className="text-sm text-zinc-400">{label}</span>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-zinc-800 px-2 py-0.5 text-xs text-zinc-500">
            {language}
          </span>
          <CopyButton code={code} />
        </div>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code>{children}</code>
      </pre>
    </div>
  );
}
