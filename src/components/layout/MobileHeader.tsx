"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useStoredObject } from "@/lib/storage";
import { Profile, STORAGE_KEYS } from "@/lib/types";
import { Bell } from "lucide-react";

export default function MobileHeader() {
  const [profile] = useStoredObject<Profile>(STORAGE_KEYS.profile);
  const name = profile?.name ?? "사용자";
  return (
    <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-background sticky top-0 z-20">
      <div className="grid leading-tight">
        <span className="text-[11px] text-muted-foreground">안녕하세요</span>
        <span className="text-base font-semibold">{name}님</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          aria-label="알림"
          className="w-9 h-9 grid place-items-center rounded-full bg-card border border-border text-muted-foreground"
        >
          <Bell className="w-4 h-4" />
        </button>
        <Avatar className="w-9 h-9">
          <AvatarFallback className="bg-brand text-brand-foreground text-xs">
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
