"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { WeightEntry } from "@/lib/types";
import { todayISO } from "@/lib/format";

interface Props {
  onAdd: (entry: Omit<WeightEntry, "id">) => void;
}

export default function TodayWeightInput({ onAdd }: Props) {
  const [weight, setWeight] = useState("");
  const [waist, setWaist] = useState("");
  const [bf, setBf] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const w = parseFloat(weight);
    if (!Number.isFinite(w) || w <= 0) return;
    onAdd({
      date: todayISO(),
      weightKg: w,
      waistCm: waist ? parseFloat(waist) : undefined,
      bodyFatPct: bf ? parseFloat(bf) : undefined,
    });
    setWeight("");
    setWaist("");
    setBf("");
  }

  return (
    <Card className="bg-brand text-brand-foreground border-0">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">오늘 체중 입력</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-3">
          <div className="bg-white text-foreground rounded-lg p-3 grid grid-cols-[1fr_auto] items-center gap-2">
            <Input
              type="number"
              inputMode="decimal"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="체중"
              required
              className="num text-2xl font-semibold border-0 shadow-none p-0 h-auto focus-visible:ring-0"
            />
            <span className="text-sm text-muted-foreground">kg</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/15 backdrop-blur rounded-lg p-2.5 grid grid-cols-[1fr_auto] items-center gap-2">
              <Input
                type="number"
                inputMode="decimal"
                step="0.1"
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                placeholder="허리"
                className="num text-sm border-0 shadow-none p-0 h-auto bg-transparent text-brand-foreground placeholder:text-white/60 focus-visible:ring-0"
              />
              <span className="text-xs text-white/70">cm</span>
            </div>
            <div className="bg-white/15 backdrop-blur rounded-lg p-2.5 grid grid-cols-[1fr_auto] items-center gap-2">
              <Input
                type="number"
                inputMode="decimal"
                step="0.1"
                value={bf}
                onChange={(e) => setBf(e.target.value)}
                placeholder="체지방"
                className="num text-sm border-0 shadow-none p-0 h-auto bg-transparent text-brand-foreground placeholder:text-white/60 focus-visible:ring-0"
              />
              <span className="text-xs text-white/70">%</span>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-white text-foreground hover:bg-white/90"
          >
            저장하기
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
