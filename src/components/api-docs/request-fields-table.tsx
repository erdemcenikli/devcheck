interface Field {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

const FIELDS: Field[] = [
  {
    name: "infoPlist",
    type: "File",
    required: false,
    description: "Info.plist XML file",
  },
  {
    name: "privacyManifest",
    type: "File",
    required: false,
    description: "PrivacyInfo.xcprivacy XML file",
  },
  {
    name: "metadata",
    type: "string (JSON)",
    required: false,
    description:
      "{ appName, description, keywords, primaryCategory, ageRating }",
  },
  {
    name: "screenshots",
    type: "File[]",
    required: false,
    description: "App Store screenshot images",
  },
  {
    name: "screenshotDimensions",
    type: "string (JSON)",
    required: false,
    description: "[{ width, height, name }]",
  },
  {
    name: "answers",
    type: "string (JSON)",
    required: false,
    description: "Record<string, string> question answers",
  },
];

export function RequestFieldsTable() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur">
      <div className="border-b border-zinc-800 px-4 py-3">
        <h3 className="text-sm font-semibold text-zinc-100">Request Fields</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 text-left text-zinc-500">
              <th className="px-4 py-2.5 font-medium">Field</th>
              <th className="px-4 py-2.5 font-medium">Type</th>
              <th className="px-4 py-2.5 font-medium">Required</th>
              <th className="px-4 py-2.5 font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {FIELDS.map((field) => (
              <tr
                key={field.name}
                className="border-b border-zinc-800/50 last:border-0"
              >
                <td className="px-4 py-2.5">
                  <code className="text-emerald-400">{field.name}</code>
                </td>
                <td className="px-4 py-2.5">
                  <code className="text-zinc-300">{field.type}</code>
                </td>
                <td className="px-4 py-2.5">
                  {field.required ? (
                    <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-xs text-amber-400">
                      Required
                    </span>
                  ) : (
                    <span className="rounded-full border border-zinc-500/20 bg-zinc-500/10 px-2 py-0.5 text-xs text-zinc-400">
                      Optional
                    </span>
                  )}
                </td>
                <td className="px-4 py-2.5 text-zinc-400">
                  {field.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
