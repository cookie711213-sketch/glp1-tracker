"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStoredList } from "@/lib/storage";
import { Injection, STORAGE_KEYS } from "@/lib/types";
import { dDayLabel, drugLabel, fmtDateKo } from "@/lib/format";
import { CalendarDays, Syringe } from "lucide-react";

export default function NextInjectionCard() {
  const [injections] = useStoredList<Injection>(STORAGE_KEYS.injections);
  const last = [...injections].sort((a, b) => b.date.localeCompare(a.date))[0];
  const nextDate = last
    ? new Date(new Date(last.date).getTime() + 7 * 86400000)
        .toISOString()
        .slice(0, 10)
    : null;

  return (
    <Card className="bg-brand text-brand-foreground border-0 p-6 md:p-7 overflow-hidden relative">
      <div className="flex items-center justify-between mb-4">
        <Badge className="bg-white/15 hover:bg-white/15 text-brand-foreground border-0 backdrop-blur">
          {nextDate ? "다음 주사" : "주사 기록 없음"}
        </Badge>
      </div>

      {nextDate ? (
        <>
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="num text-5xl md:text-6xl font-bold leading-none">
              {dDayLabel(nextDate)}
            </span>
            <span className="num text-xl md:text-2xl font-medium opacity-90">
              {last && `${drugLabel(last.drug)} ${last.doseMg}mg`}
            </span>
          </div>
          <div className="mt-1.5 text-sm opacity-80">
            {fmtDateKo(nextDate)} · 마지막 {fmtDateKo(last!.date)}
          </div>
        </>
      ) : (
        <div className="text-lg font-medium">첫 주사를 기록해보세요</div>
      )}

      <div className="mt-5 grid grid-cols-2 gap-2">
        <Link
          href="/injections"
          className={buttonVariants({ variant: "secondary", size: "lg" }) + " bg-white text-foreground hover:bg-white/90"}
        >
          <Syringe className="w-4 h-4" />
          주사 완료 기록
        </Link>
        <Link
          href="/injections"
          className={buttonVariants({ variant: "secondary", size: "lg" }) + " bg-white/15 text-brand-foreground hover:bg-white/25"}
        >
          <CalendarDays className="w-4 h-4" />
          일정 보기
        </Link>
      </div>
    </Card>
  );
}
