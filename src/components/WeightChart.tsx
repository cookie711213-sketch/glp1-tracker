"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { WeightEntry } from "@/lib/types";

interface Props {
  entries: WeightEntry[];
  height?: number;
}

export default function WeightChart({ entries, height = 240 }: Props) {
  const data = [...entries]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((e) => ({ date: e.date.slice(5), weight: e.weightKg }));

  if (data.length === 0) {
    return (
      <div
        className="grid place-items-center text-sm opacity-60 border border-dashed border-black/15 dark:border-white/20 rounded-lg"
        style={{ height }}
      >
        데이터가 없습니다.
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 10, right: 20, bottom: 0, left: -10 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="date" fontSize={11} />
          <YAxis domain={["dataMin - 1", "dataMax + 1"]} fontSize={11} />
          <Tooltip
            contentStyle={{ fontSize: 12 }}
            formatter={(v) => [`${v} kg`, "체중"]}
          />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="currentColor"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
