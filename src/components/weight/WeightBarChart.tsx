"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeightEntry } from "@/lib/types";

interface Props {
  entries: WeightEntry[];
  height?: number;
}

export default function WeightBarChart({ entries, height = 240 }: Props) {
  const data = [...entries]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-12)
    .map((e, i, arr) => ({
      date: e.date.slice(5),
      weight: e.weightKg,
      isLast: i === arr.length - 1,
    }));

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">체중 변화 그래프</CardTitle>
        <p className="text-xs text-muted-foreground">최근 12회 기록</p>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div
            className="grid place-items-center text-sm text-muted-foreground border border-dashed border-border rounded-lg"
            style={{ height }}
          >
            데이터가 없습니다.
          </div>
        ) : (
          <div style={{ width: "100%", height }}>
            <ResponsiveContainer>
              <BarChart data={data} margin={{ top: 16, right: 8, bottom: 0, left: -16 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="date" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis
                  domain={["dataMin - 1", "dataMax + 1"]}
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(33,150,243,0.06)" }}
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                  }}
                  formatter={(v) => [`${v} kg`, "체중"]}
                />
                <Bar dataKey="weight" radius={[8, 8, 0, 0]}>
                  {data.map((d, i) => (
                    <Cell
                      key={i}
                      fill={d.isLast ? "var(--brand)" : "var(--chart-3)"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
