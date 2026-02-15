import Link from "next/link";
import { Logo } from "@/components/shared/logo";

const productLinks = [
  { href: "/check", label: "Run a Check" },
  { href: "/api-docs", label: "API Docs" },
  { href: "/pricing", label: "Pricing" },
];

const resourceLinks = [
  {
    href: "https://github.com",
    label: "GitHub",
    external: true,
  },
  {
    href: "https://developer.apple.com/app-store/review/guidelines/",
    label: "App Store Guidelines",
    external: true,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2">
            <Logo />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-500">
              Prevent App Store rejections before they happen. Scan your iOS app
              across 10 review categories.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-zinc-300">
              Product
            </h4>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-zinc-300">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-800 pt-6 text-center">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} DevCheck. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
