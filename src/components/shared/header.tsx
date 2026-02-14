"use client";

import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <nav className="flex items-center gap-6">
          <a
            href="#how-it-works"
            className="hidden text-sm text-zinc-400 transition-colors hover:text-zinc-100 sm:block"
          >
            How it works
          </a>
          <Link
            href="/api-docs"
            className="hidden text-sm text-zinc-400 transition-colors hover:text-zinc-100 sm:block"
          >
            API &amp; Pricing
          </Link>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden text-sm text-zinc-400 hover:text-zinc-100 sm:flex"
          >
            <a href="#">
              <User className="mr-1 size-3.5" />
              Sign In
            </a>
          </Button>
          <Button asChild size="sm">
            <Link href="/check">Start Check</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
