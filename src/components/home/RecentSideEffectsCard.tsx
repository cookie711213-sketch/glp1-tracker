"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useStoredList } from "@/lib/storage";
import { Note, STORAGE_KEYS } from "@/lib/types";
import { fmtDateKo } from "@/lib/format";

function dot(label: string) {
  // 라벨별 색상 칩
  const palette: Record<string, string> = {
    메스꺼움: "bg-warning text-warning-foreground",
    구토: "bg-destructive/15 text-destructive",
    설사: "bg-info text-info-foreground",
    변비: "bg-info text-info-foreground",
    복통: "bg-warning text-warning-foreground",
    두통: "bg-info text-info-foreground",
    피로: "bg-secondary text-secondary-foreground",
    어지럼증: "bg-warning text-warning-foreground",
    식욕저하: "bg-success text-success-foreground",
    속쓰림: "bg-warning text-warning-foreground",
  };
  return palette[label] ?? "bg-secondary text-secondary-foreground";
}

export default function RecentSideEffectsCard() {
  const [notes] = useStoredList<Note>(STORAGE_KEYS.notes);
  const recent = [...notes]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);

  return (
    <Card className="md:col-span-2">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm text-muted-foreground font-normal">최근 부작용 기록</CardTitle>
        <Link
          href="/sides"
          className="text-xs text-brand hover:underline"
        >
          전체 보기
        </Link>
      </CardHeader>
      <CardContent>
        {recent.length === 0 ? (
          <p className="text-sm text-muted-foreground py-2">기록이 없습니다.</p>
        ) : (
          <ul className="grid gap-2">
            {recent.map((n) => {
              const main = n.sideEffects?.[0] ?? "메모";
              return (
                <li
                  key={n.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/40"
                >
                  <Badge className={`${dot(main)} border-0`}>{main}</Badge>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm truncate">
                      {n.text || n.sideEffects?.join(", ") || "—"}
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">
                      {fmtDateKo(n.date)}
                      {n.intensity ? ` · 강도 ${n.intensity}/10` : ""}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
