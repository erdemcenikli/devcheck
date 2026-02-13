"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileCheck, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  label: string;
  description: string;
  accept: string;
  file: File | null;
  onFileChange: (file: File | null, content: string | null) => void;
}

export function FileUpload({
  label,
  description,
  accept,
  file,
  onFileChange,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const readFile = useCallback(
    (f: File) => {
      setError(null);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onFileChange(f, content);
      };
      reader.onerror = () => {
        setError("Failed to read file");
        onFileChange(null, null);
      };
      reader.readAsText(f);
    },
    [onFileChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const f = e.dataTransfer.files[0];
      if (f) readFile(f);
    },
    [readFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) readFile(f);
    },
    [readFile]
  );

  const handleRemove = useCallback(() => {
    setError(null);
    onFileChange(null, null);
  }, [onFileChange]);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-300">{label}</label>
      <motion.div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "relative flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-colors",
          isDragging
            ? "border-emerald-500 bg-emerald-500/10"
            : file
              ? "border-emerald-500/30 bg-emerald-500/5"
              : "border-zinc-700 bg-zinc-900/50 hover:border-zinc-600 hover:bg-zinc-900"
        )}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleFileInput}
          className="absolute inset-0 cursor-pointer opacity-0"
        />

        <AnimatePresence mode="wait">
          {file ? (
            <motion.div
              key="uploaded"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-3"
            >
              <FileCheck className="h-5 w-5 text-emerald-400" />
              <span className="text-sm text-zinc-200">{file.name}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
                className="rounded-full p-1 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-2 text-center"
            >
              <Upload className="h-6 w-6 text-zinc-500" />
              <p className="text-sm text-zinc-400">{description}</p>
              <p className="text-xs text-zinc-600">
                Drag and drop or click to browse
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 text-sm text-red-400"
          >
            <AlertCircle className="h-4 w-4" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
