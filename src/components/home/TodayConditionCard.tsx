"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStoredList } from "@/lib/storage";
import { Note, STORAGE_KEYS } from "@/lib/types";
import { todayISO } from "@/lib/format";

const ITEMS: Array<{ key: string; label: string }> = [
  { key: "appetite", label: "식욕" },
  { key: "nausea", label: "메스꺼움" },
  { key: "energy", label: "피로감" },
  { key: "hydration", label: "수분 섭취" },
];

function levelDots(intensity?: number) {
  // 1..10 → dot 5개로 표시
  const filled = intensity ? Math.round(intensity / 2) : 0;
  return [0, 1, 2, 3, 4].map((i) => i < filled);
}

function levelLabel(intensity?: number) {
  if (!intensity) return "—";
  if (intensity <= 3) return "약함";
  if (intensity <= 7) return "보통";
  return "강함";
}

export default function TodayConditionCard() {
  const [notes] = useStoredList<Note>(STORAGE_KEYS.notes);
  const today = notes.find((n) => n.date === todayISO());

  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm text-muted-foreground font-normal">오늘의 컨디션</CardTitle>
        <Link
          href="/sides"
          className="text-xs text-brand hover:underline"
        >
          기록하기
        </Link>
      </CardHeader>
      <CardContent>
        {today ? (
          <ul className="grid gap-2">
            {ITEMS.map((it) => (
              <li key={it.key} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{it.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-foreground">{levelLabel(today.intensity)}</span>
                  <div className="flex gap-0.5">
                    {levelDots(today.intensity).map((on, i) => (
                      <span
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full ${
                          on ? "bg-brand" : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground py-2">
            아직 오늘 컨디션을 기록하지 않았어요.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
