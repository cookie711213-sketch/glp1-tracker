"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Injection } from "@/lib/types";
import { dDayLabel, drugLabel, fmtDateKo } from "@/lib/format";

interface Props {
  last: Injection | undefined;
  onAddToday?: () => void;
}

export default function UpcomingInjectionCard({ last, onAddToday }: Props) {
  const nextDate = last
    ? new Date(new Date(last.date).getTime() + 7 * 86400000)
        .toISOString()
        .slice(0, 10)
    : null;

  return (
    <Card className="bg-brand text-brand-foreground border-0 p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <Badge className="bg-white/15 hover:bg-white/15 text-brand-foreground border-0 backdrop-blur">
          {nextDate ? "다가오는 주사" : "주사 기록 없음"}
        </Badge>
        {nextDate && (
          <span className="num text-sm opacity-90">
            {dDayLabel(nextDate)}
          </span>
        )}
      </div>

      {nextDate ? (
        <>
          <div className="num text-3xl md:text-4xl font-bold leading-tight">
            {fmtDateKo(nextDate)} (예정)
          </div>
          <div className="text-sm opacity-80 mt-1">
            {last && `${drugLabel(last.drug)} ${last.doseMg}mg`}
            {last?.site && ` · ${last.site} 부위`}
          </div>
        </>
      ) : (
        <div className="text-lg">첫 주사를 기록해주세요</div>
      )}

      <Button
        className="mt-5 bg-white text-foreground hover:bg-white/90"
        onClick={onAddToday}
      >
        오늘 주사 완료 기록
      </Button>
    </Card>
  );
}
