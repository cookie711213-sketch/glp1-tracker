"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useStoredList } from "@/lib/storage";
import { Injection, MOUNJARO_DOSES, STORAGE_KEYS, WEGOVY_DOSES } from "@/lib/types";

export default function CurrentDoseCard() {
  const [injections] = useStoredList<Injection>(STORAGE_KEYS.injections);
  const last = [...injections].sort((a, b) => b.date.localeCompare(a.date))[0];

  const dose = last?.doseMg ?? 0;
  const drug = last?.drug;
  const series =
    drug === "wegovy" ? WEGOVY_DOSES : drug === "mounjaro" ? MOUNJARO_DOSES : MOUNJARO_DOSES;
  const max = series[series.length - 1];
  const pct = max ? (dose / max) * 100 : 0;
  const idx = dose ? series.findIndex((d) => d === dose) : -1;
  const next = idx >= 0 && idx < series.length - 1 ? series[idx + 1] : null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground font-normal">현재 용량</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="flex items-baseline gap-1">
          <span className="num text-3xl font-bold">{dose || "—"}</span>
          <span className="num text-base text-muted-foreground">mg</span>
        </div>
        <div className="text-xs text-muted-foreground">
          {next ? `다음: ${next}mg 증량 예정` : dose ? "최대 용량 단계" : "기록 없음"}
        </div>
        <Progress value={pct} className="h-1.5" />
      </CardContent>
    </Card>
  );
}
