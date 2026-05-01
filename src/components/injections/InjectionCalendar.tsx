"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Injection } from "@/lib/types";
import { useMemo } from "react";

interface Props {
  injections: Injection[];
}

export default function InjectionCalendar({ injections }: Props) {
  const injectedDays = useMemo(
    () => injections.map((i) => new Date(i.date)),
    [injections],
  );
  const last = [...injections].sort((a, b) => b.date.localeCompare(a.date))[0];
  const nextDate = last
    ? new Date(new Date(last.date).getTime() + 7 * 86400000)
    : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">월간 캘린더</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          modifiers={{
            injected: injectedDays,
            ...(nextDate ? { upcoming: [nextDate] } : {}),
          }}
          modifiersClassNames={{
            injected: "bg-brand-soft text-brand font-medium rounded-full",
            upcoming: "ring-2 ring-brand text-brand font-semibold rounded-full",
          }}
          className="mx-auto"
        />
        <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-soft border border-brand" />
            주사일
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full ring-2 ring-brand" />
            예정일
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
