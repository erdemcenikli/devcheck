import { Logo } from "@/components/shared/logo";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 px-4 py-12 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <Logo />
        <p className="text-sm text-zinc-500">
          Built to prevent App Store rejections.
        </p>
        <div className="flex gap-6 text-sm text-zinc-500">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-300"
          >
            GitHub
          </a>
          <a href="/api-docs" className="transition-colors hover:text-zinc-300">
            API Docs
          </a>
        </div>
        <p className="text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} DevCheck. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
