"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen } from "lucide-react";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/history", label: "History" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800/50 bg-[#080b12]/80 backdrop-blur-md">
      <div className="container mx-auto max-w-4xl px-4 h-16 flex items-center justify-between">
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 font-bold text-white hover:opacity-80 transition-opacity"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-indigo-900/50">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg">
            Streak<span className="text-indigo-400">Tracker</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          {links.map(({ href, label }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                  ${
                    active
                      ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                      : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                  }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
