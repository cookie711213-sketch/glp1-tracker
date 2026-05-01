"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "대시보드" },
  { href: "/injections", label: "주사" },
  { href: "/weight", label: "체중" },
  { href: "/meals", label: "식단" },
  { href: "/notes", label: "메모" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="border-b border-black/10 dark:border-white/10 bg-background sticky top-0 z-10">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-1 overflow-x-auto">
        <span className="font-semibold mr-3 whitespace-nowrap">GLP-1 Tracker</span>
        {LINKS.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-1.5 rounded-md text-sm whitespace-nowrap ${
                active
                  ? "bg-foreground text-background"
                  : "hover:bg-black/5 dark:hover:bg-white/10"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
