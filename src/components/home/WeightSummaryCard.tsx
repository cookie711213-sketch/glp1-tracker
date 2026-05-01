"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useStoredList } from "@/lib/storage";
import { STORAGE_KEYS, WeightEntry, Profile } from "@/lib/types";
import { useStoredObject } from "@/lib/storage";

export default function WeightSummaryCard() {
  const [weights] = useStoredList<WeightEntry>(STORAGE_KEYS.weights);
  const [profile] = useStoredObject<Profile>(STORAGE_KEYS.profile);

  const sortedAsc = [...weights].sort((a, b) => a.date.localeCompare(b.date));
  const start = profile?.startWeightKg ?? sortedAsc[0]?.weightKg;
  const goal = profile?.goalWeightKg;
  const latest = sortedAsc[sortedAsc.length - 1];

  const change = start && latest ? latest.weightKg - start : 0;
  const lossKg = -change;
  const lossPct = start && change ? (change / start) * 100 : 0;
  const goalProgressPct =
    start && goal && latest && start > goal
      ? Math.max(0, Math.min(100, ((start - latest.weightKg) / (start - goal)) * 100))
      : null;

  return (
    <Card className="md:col-span-2">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm text-muted-foreground font-normal">체중 변화</CardTitle>
        {lossKg > 0 && (
          <Badge className="bg-success text-success-foreground border-0">
            누적 -{lossKg.toFixed(1)}kg
          </Badge>
        )}
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-3 gap-3">
          <Stat label="현재" value={latest ? `${latest.weightKg}` : "—"} unit="kg" big />
          <Stat
            label="시작 대비"
            value={start && latest ? change.toFixed(1) : "—"}
            unit="kg"
            tone={change < 0 ? "good" : change > 0 ? "warn" : "muted"}
          />
          <Stat
            label="목표까지"
            value={
              goal && latest
                ? (latest.weightKg - goal).toFixed(1)
                : "—"
            }
            unit="kg"
            tone="muted"
          />
        </div>
        {goalProgressPct !== null && (
          <div className="grid gap-1.5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>목표 진행률 {Math.round(goalProgressPct)}%</span>
              {goal && <span className="num">목표 {goal}kg</span>}
            </div>
            <Progress value={goalProgressPct} />
          </div>
        )}
        {lossPct !== 0 && (
          <p className="text-xs text-muted-foreground">
            시작 대비 {lossPct.toFixed(1)}% {lossPct < 0 ? "감량" : "증가"}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function Stat({
  label,
  value,
  unit,
  tone = "muted",
  big = false,
}: {
  label: string;
  value: string;
  unit?: string;
  tone?: "good" | "warn" | "muted";
  big?: boolean;
}) {
  const color =
    tone === "good"
      ? "text-brand"
      : tone === "warn"
        ? "text-destructive"
        : "text-foreground";
  return (
    <div className="grid gap-0.5">
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <div className="flex items-baseline gap-1">
        <span className={`num font-semibold ${color} ${big ? "text-2xl" : "text-lg"}`}>
          {value}
        </span>
        {unit && <span className="num text-xs text-muted-foreground">{unit}</span>}
      </div>
    </div>
  );
}
