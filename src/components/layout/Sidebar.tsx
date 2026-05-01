"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NAV_ITEMS } from "@/lib/nav";
import { useStoredObject } from "@/lib/storage";
import { Profile, STORAGE_KEYS } from "@/lib/types";
import { Pill } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [profile] = useStoredObject<Profile>(STORAGE_KEYS.profile);
  const name = profile?.name ?? "사용자";
  const email = profile?.hospital ?? "GLP-1 트래커";
  const initial = name.charAt(0);

  return (
    <aside className="hidden md:flex md:flex-col w-60 shrink-0 bg-sidebar text-sidebar-foreground border-r border-sidebar-border h-screen sticky top-0">
      <div className="px-5 py-5 flex items-center gap-2">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-brand text-brand-foreground">
          <Pill className="w-4 h-4" />
        </span>
        <span className="font-semibold text-foreground">마윤자</span>
      </div>

      <nav className="px-3 flex-1">
        <ul className="grid gap-1">
          {NAV_ITEMS.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-4 py-4 border-t border-sidebar-border flex items-center gap-2.5">
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-brand text-brand-foreground text-xs">
            {initial}
          </AvatarFallback>
        </Avatar>
        <div className="grid leading-tight overflow-hidden">
          <span className="text-xs font-medium text-foreground truncate">{name}</span>
          <span className="text-[10px] text-muted-foreground truncate">{email}</span>
        </div>
      </div>
    </aside>
  );
}
