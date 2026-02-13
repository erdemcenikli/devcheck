export function EndpointSection() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur">
      <div className="flex items-center gap-3">
        <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-sm font-semibold text-emerald-400">
          POST
        </span>
        <code className="text-lg font-medium text-zinc-100">/api/analyze</code>
      </div>
      <p className="mt-3 text-sm text-zinc-400">
        Analyze an iOS app for App Store Review compliance. Returns a detailed
        score, grade, and list of issues across 10 review categories.
      </p>
      <div className="mt-4 grid gap-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-zinc-500">Content-Type:</span>
          <code className="rounded-md bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300">
            multipart/form-data
          </code>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-zinc-500">Authentication:</span>
          <span className="text-zinc-300">None (public)</span>
        </div>
      </div>
    </div>
  );
}
