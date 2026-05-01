"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Syringe, LineChart, AlertTriangle } from "lucide-react";

const ACTIONS = [
  { href: "/injections", icon: Syringe, label: "주사 완료 기록", desc: "오늘 맞은 주사를 기록하세요" },
  { href: "/weight", icon: LineChart, label: "체중 입력", desc: "오늘의 체중을 남겨두세요" },
  { href: "/sides", icon: AlertTriangle, label: "부작용 기록", desc: "느낀 증상을 기록하세요" },
];

export default function QuickActionsCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground font-normal">빠른 액션</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        {ACTIONS.map((a, i) => {
          const Icon = a.icon;
          return (
            <Link
              key={a.href}
              href={a.href}
              className={`flex items-center gap-3 p-3 rounded-lg border ${
                i === 0
                  ? "border-brand bg-brand-soft text-brand"
                  : "border-border hover:bg-muted/50"
              }`}
            >
              <span
                className={`grid place-items-center w-9 h-9 rounded-full ${
                  i === 0 ? "bg-brand text-brand-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
              </span>
              <div className="grid leading-tight flex-1">
                <span className={`text-sm font-medium ${i === 0 ? "text-brand" : "text-foreground"}`}>
                  {a.label}
                </span>
                <span className={`text-[11px] ${i === 0 ? "text-brand/70" : "text-muted-foreground"}`}>
                  {a.desc}
                </span>
              </div>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
