"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Injection, INJECTION_SITES } from "@/lib/types";

interface Props {
  injections: Injection[];
}

const SUB_SITES = ["좌측", "우측"];

export default function SiteRotationCard({ injections }: Props) {
  // 마지막 주사 부위 → 다음 추천 부위
  const last = [...injections].sort((a, b) => b.date.localeCompare(a.date))[0];
  const lastSite = last?.site ?? INJECTION_SITES[0];
  const nextIdx =
    (INJECTION_SITES.indexOf(lastSite as (typeof INJECTION_SITES)[number]) + 1) %
    INJECTION_SITES.length;
  const nextSite = INJECTION_SITES[nextIdx];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">주사 부위 로테이션</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">
          같은 부위에 연속으로 주사하지 않도록 부위를 번갈아 사용하세요.
        </p>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-2">
        {INJECTION_SITES.map((site) => {
          const isNext = site === nextSite;
          const isLast = site === lastSite;
          return (
            <div
              key={site}
              className={`p-3 rounded-lg border text-center ${
                isNext
                  ? "border-brand bg-brand-soft"
                  : "border-border bg-muted/30"
              }`}
            >
              <div className="text-sm font-medium">{site}</div>
              <div className="mt-1 grid grid-cols-2 gap-1">
                {SUB_SITES.map((s) => (
                  <span
                    key={s}
                    className="text-[10px] text-muted-foreground py-0.5 rounded bg-card border border-border"
                  >
                    {s}
                  </span>
                ))}
              </div>
              {isNext && (
                <Badge className="mt-2 bg-brand text-brand-foreground border-0 text-[10px]">
                  다음 추천
                </Badge>
              )}
              {isLast && !isNext && (
                <Badge variant="secondary" className="mt-2 text-[10px]">
                  최근
                </Badge>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
