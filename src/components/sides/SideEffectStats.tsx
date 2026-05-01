"use client";

import { Card } from "@/components/ui/card";
import { Note } from "@/lib/types";
import { differenceInCalendarDays } from "date-fns";
import { Activity, Calendar as CalendarIcon, AlertTriangle } from "lucide-react";

interface Props {
  notes: Note[];
}

export default function SideEffectStats({ notes }: Props) {
  const total = notes.reduce(
    (sum, n) => sum + (n.sideEffects?.length ?? 0),
    0,
  );
  const withIntensity = notes.filter((n) => typeof n.intensity === "number");
  const avg =
    withIntensity.length > 0
      ? withIntensity.reduce((s, n) => s + (n.intensity ?? 0), 0) /
        withIntensity.length
      : 0;
  const days = new Set(notes.map((n) => n.date)).size;
  const sortedAsc = [...notes].sort((a, b) => a.date.localeCompare(b.date));
  const span =
    sortedAsc.length > 0
      ? differenceInCalendarDays(new Date(), new Date(sortedAsc[0].date)) + 1
      : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <StatCard
        icon={<AlertTriangle className="w-4 h-4" />}
        tone="warn"
        label="부작용 총 횟수"
        value={`${total}`}
        unit="회"
        sub={`기록 ${notes.length}건`}
      />
      <StatCard
        icon={<Activity className="w-4 h-4" />}
        tone="info"
        label="평균 강도"
        value={avg ? avg.toFixed(1) : "—"}
        unit="/10"
        sub={`${withIntensity.length}건 측정`}
      />
      <StatCard
        icon={<CalendarIcon className="w-4 h-4" />}
        tone="success"
        label="기록일수"
        value={`${days}`}
        unit="일"
        sub={`전체 ${span}일 중`}
      />
      <StatCard
        icon={<Activity className="w-4 h-4" />}
        tone="muted"
        label="이번 주"
        value={`${notes.filter((n) => {
          const d = differenceInCalendarDays(new Date(), new Date(n.date));
          return d >= 0 && d < 7;
        }).length}`}
        unit="건"
        sub="최근 7일"
      />
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  unit,
  sub,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit?: string;
  sub?: string;
  tone: "warn" | "info" | "success" | "muted";
}) {
  const toneClass =
    tone === "warn"
      ? "bg-warning text-warning-foreground"
      : tone === "info"
        ? "bg-info text-info-foreground"
        : tone === "success"
          ? "bg-success text-success-foreground"
          : "bg-muted text-muted-foreground";
  return (
    <Card className="p-4 grid gap-2">
      <div className="flex items-center justify-between">
        <span
          className={`grid place-items-center w-7 h-7 rounded-full ${toneClass}`}
        >
          {icon}
        </span>
      </div>
      <div className="grid gap-0.5">
        <span className="text-[11px] text-muted-foreground">{label}</span>
        <div className="flex items-baseline gap-1">
          <span className="num text-2xl font-semibold">{value}</span>
          {unit && (
            <span className="num text-xs text-muted-foreground">{unit}</span>
          )}
        </div>
        {sub && <span className="text-[10px] text-muted-foreground">{sub}</span>}
      </div>
    </Card>
  );
}
