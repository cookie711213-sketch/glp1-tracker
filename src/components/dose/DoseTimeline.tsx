"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DoseStage } from "@/lib/types";
import { statusFor } from "@/lib/doseStages";
import { Check } from "lucide-react";

interface Props {
  stages: DoseStage[];
}

export default function DoseTimeline({ stages }: Props) {
  if (stages.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">티트레이션 단계</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground py-6">
          단계 정보가 없습니다.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">티트레이션 단계</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">
          표준 4주 간격으로 자동 생성된 단계입니다.
        </p>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-2.5">
          {stages.map((s) => {
            const status = statusFor(s);
            const isCurrent = status === "current";
            const isDone = status === "done";
            return (
              <li
                key={s.id}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  isCurrent
                    ? "border-brand bg-brand-soft"
                    : "border-border bg-card"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full grid place-items-center text-xs font-semibold shrink-0 ${
                    isDone
                      ? "bg-brand text-brand-foreground"
                      : isCurrent
                        ? "bg-brand text-brand-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isDone ? <Check className="w-4 h-4" /> : s.step}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-sm font-medium">
                      {s.step}단계 · <span className="num">{s.doseMg}mg</span>
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] text-brand">진행 중</span>
                    )}
                  </div>
                  <div className="num text-[11px] text-muted-foreground mt-0.5">
                    {s.startDate} ~ {s.endDate ?? "—"}
                  </div>
                </div>
                <Badge
                  className={`shrink-0 border-0 ${
                    isDone
                      ? "bg-success text-success-foreground"
                      : isCurrent
                        ? "bg-brand text-brand-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isDone ? "완료" : isCurrent ? "진행중" : "예정"}
                </Badge>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
