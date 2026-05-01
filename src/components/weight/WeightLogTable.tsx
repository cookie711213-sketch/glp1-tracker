"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WeightEntry } from "@/lib/types";
import { Trash2 } from "lucide-react";

interface Props {
  entries: WeightEntry[];
  onRemove: (id: string) => void;
}

export default function WeightLogTable({ entries, onRemove }: Props) {
  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));
  const sortedAsc = [...entries].sort((a, b) => a.date.localeCompare(b.date));
  const start = sortedAsc[0]?.weightKg;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">체중 기록 (최근 10회)</CardTitle>
      </CardHeader>
      <CardContent>
        {sorted.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4">기록이 없습니다.</p>
        ) : (
          <div className="grid">
            <div className="grid grid-cols-[1fr_80px_80px_1fr_auto] gap-2 px-2 py-2 text-[11px] text-muted-foreground border-b border-border">
              <span>일자</span>
              <span className="text-right">체중</span>
              <span className="text-right">변화</span>
              <span>메모</span>
              <span></span>
            </div>
            <ul className="divide-y divide-border">
              {sorted.slice(0, 10).map((e) => {
                const change = start ? e.weightKg - start : 0;
                return (
                  <li
                    key={e.id}
                    className="grid grid-cols-[1fr_80px_80px_1fr_auto] gap-2 px-2 py-2.5 items-center text-sm"
                  >
                    <span className="num text-muted-foreground">{e.date}</span>
                    <span className="num text-right font-medium">
                      {e.weightKg.toFixed(1)} kg
                    </span>
                    <span
                      className={`num text-right text-xs ${
                        change < 0
                          ? "text-brand"
                          : change > 0
                            ? "text-destructive"
                            : "text-muted-foreground"
                      }`}
                    >
                      {change > 0 ? "+" : ""}
                      {change.toFixed(1)}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {e.waistCm ? `허리 ${e.waistCm}cm` : ""}
                      {e.bodyFatPct ? `${e.waistCm ? " · " : ""}체지방 ${e.bodyFatPct}%` : ""}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => onRemove(e.id)}
                      aria-label="삭제"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
