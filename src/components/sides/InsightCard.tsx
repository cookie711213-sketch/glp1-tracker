"use client";

import { Card } from "@/components/ui/card";
import { Note } from "@/lib/types";
import { Lightbulb } from "lucide-react";

interface Props {
  notes: Note[];
}

export default function InsightCard({ notes }: Props) {
  if (notes.length === 0) return null;

  const counts = new Map<string, number>();
  for (const n of notes) {
    for (const s of n.sideEffects ?? []) {
      counts.set(s, (counts.get(s) ?? 0) + 1);
    }
  }
  const top = Array.from(counts.entries()).sort((a, b) => b[1] - a[1])[0];
  if (!top) return null;

  return (
    <Card className="bg-brand text-brand-foreground border-0 p-5 grid gap-2">
      <div className="flex items-center gap-2">
        <Lightbulb className="w-4 h-4" />
        <span className="text-xs font-medium opacity-90">이번 주 인사이트</span>
      </div>
      <p className="text-base font-semibold leading-snug">
        “{top[0]}”이 가장 많이 보여요
      </p>
      <p className="text-xs opacity-80">
        총 {top[1]}회 기록되었어요. 식사 30분 전 따뜻한 물을 드셔보는 것도 도움이 될 수 있어요.
      </p>
    </Card>
  );
}
