"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeightEntry } from "@/lib/types";

interface Props {
  entries: WeightEntry[];
}

export default function WeightStats({ entries }: Props) {
  const sortedAsc = [...entries].sort((a, b) => a.date.localeCompare(b.date));
  const latest = sortedAsc[sortedAsc.length - 1];

  const waist = latest?.waistCm;
  const bf = latest?.bodyFatPct;
  const days = entries.length;

  return (
    <div className="grid grid-cols-3 gap-3">
      <StatCard label="허리" value={waist ? `${waist}` : "—"} unit="cm" />
      <StatCard label="체지방률" value={bf ? `${bf}` : "—"} unit="%" />
      <StatCard label="기록일수" value={`${days}`} unit="일" />
    </div>
  );
}

function StatCard({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit: string;
}) {
  return (
    <Card>
      <CardHeader className="pb-1">
        <CardTitle className="text-xs text-muted-foreground font-normal">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-1">
          <span className="num text-2xl font-semibold">{value}</span>
          <span className="num text-xs text-muted-foreground">{unit}</span>
        </div>
      </CardContent>
    </Card>
  );
}
