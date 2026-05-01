"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Profile, WeightEntry } from "@/lib/types";

interface Props {
  weights: WeightEntry[];
  profile: Profile | null;
}

export default function WeightHeader({ weights, profile }: Props) {
  const sortedAsc = [...weights].sort((a, b) => a.date.localeCompare(b.date));
  const start = profile?.startWeightKg ?? sortedAsc[0]?.weightKg;
  const goal = profile?.goalWeightKg;
  const latest = sortedAsc[sortedAsc.length - 1];

  const change = start && latest ? latest.weightKg - start : 0;
  const goalProgressPct =
    start && goal && latest && start > goal
      ? Math.max(0, Math.min(100, ((start - latest.weightKg) / (start - goal)) * 100))
      : null;
  const remaining = goal && latest ? latest.weightKg - goal : null;

  return (
    <Card className="p-6 grid gap-5">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <span className="text-xs text-muted-foreground">현재 체중</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="num text-5xl font-bold">
              {latest ? latest.weightKg.toFixed(1) : "—"}
            </span>
            <span className="num text-base text-muted-foreground">kg</span>
          </div>
          <div className="num text-xs text-muted-foreground mt-1">
            시작 {start ? `${start.toFixed(1)} kg` : "—"}
            {change !== 0 && start && (
              <>
                {" · "}
                <span className={change < 0 ? "text-brand" : "text-destructive"}>
                  {change > 0 ? "+" : ""}
                  {change.toFixed(1)} kg
                </span>
              </>
            )}
          </div>
        </div>
        <div className="md:text-right">
          <span className="text-xs text-muted-foreground">남은 거리</span>
          <div className="num text-3xl font-semibold mt-1">
            {remaining !== null ? `${remaining.toFixed(1)}` : "—"}
            <span className="text-sm text-muted-foreground ml-1">kg</span>
          </div>
          {goal && (
            <div className="num text-xs text-muted-foreground mt-1">
              목표 {goal.toFixed(1)} kg
            </div>
          )}
        </div>
      </div>
      {goalProgressPct !== null && (
        <div className="grid gap-1.5">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>목표 진행률</span>
            <span className="num">{Math.round(goalProgressPct)}%</span>
          </div>
          <Progress value={goalProgressPct} className="h-2" />
        </div>
      )}
    </Card>
  );
}
