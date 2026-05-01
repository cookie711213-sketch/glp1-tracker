"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Note, SIDE_EFFECT_OPTIONS } from "@/lib/types";

interface Props {
  notes: Note[];
}

export default function FrequentSideEffects({ notes }: Props) {
  const counts = new Map<string, number>();
  for (const n of notes) {
    for (const s of n.sideEffects ?? []) {
      counts.set(s, (counts.get(s) ?? 0) + 1);
    }
  }
  const entries = SIDE_EFFECT_OPTIONS.map((s) => ({
    name: s,
    count: counts.get(s) ?? 0,
  }))
    .filter((e) => e.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  const max = entries[0]?.count ?? 1;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">자주 발생한 부작용</CardTitle>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4">
            기록된 부작용이 없습니다.
          </p>
        ) : (
          <ul className="grid gap-2.5">
            {entries.map((e) => (
              <li key={e.name} className="grid gap-1">
                <div className="flex items-center justify-between text-sm">
                  <span>{e.name}</span>
                  <span className="num text-xs text-muted-foreground">
                    {e.count}회
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-brand"
                    style={{ width: `${(e.count / max) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
