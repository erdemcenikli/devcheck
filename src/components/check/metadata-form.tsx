"use client";

import { motion } from "framer-motion";
import type { MetadataInput } from "@/lib/types";
import { APP_CATEGORIES, AGE_RATINGS } from "@/lib/data";

interface MetadataFormProps {
  metadata: MetadataInput;
  onChange: (partial: Partial<MetadataInput>) => void;
}

export function MetadataForm({ metadata, onChange }: MetadataFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      <h3 className="text-lg font-semibold text-zinc-100">App Metadata</h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="appName"
            className="text-sm font-medium text-zinc-300"
          >
            App Name
          </label>
          <input
            id="appName"
            type="text"
            value={metadata.appName}
            onChange={(e) => onChange({ appName: e.target.value })}
            placeholder="My Awesome App"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-medium text-zinc-300"
          >
            App Description
          </label>
          <textarea
            id="description"
            value={metadata.description}
            onChange={(e) => onChange({ description: e.target.value })}
            placeholder="Describe what your app does..."
            rows={4}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
          />
          <p className="text-xs text-zinc-500">
            {metadata.description.length} characters
            {metadata.description.length > 0 &&
              metadata.description.length < 100 && (
                <span className="text-amber-400">
                  {" "}
                  — Consider adding more detail
                </span>
              )}
          </p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="keywords"
            className="text-sm font-medium text-zinc-300"
          >
            Keywords
          </label>
          <input
            id="keywords"
            type="text"
            value={metadata.keywords}
            onChange={(e) => onChange({ keywords: e.target.value })}
            placeholder="productivity, tasks, organizer"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
          />
          <p className="text-xs text-zinc-500">
            {metadata.keywords.length}/100 characters
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="category"
              className="text-sm font-medium text-zinc-300"
            >
              Primary Category
            </label>
            <select
              id="category"
              value={metadata.primaryCategory}
              onChange={(e) => onChange({ primaryCategory: e.target.value })}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-2.5 text-sm text-zinc-100 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
            >
              <option value="">Select category</option>
              {APP_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="ageRating"
              className="text-sm font-medium text-zinc-300"
            >
              Age Rating
            </label>
            <select
              id="ageRating"
              value={metadata.ageRating}
              onChange={(e) => onChange({ ageRating: e.target.value })}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-2.5 text-sm text-zinc-100 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
            >
              {AGE_RATINGS.map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
