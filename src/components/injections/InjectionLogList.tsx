"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Injection } from "@/lib/types";
import { drugLabel, fmtDateKo } from "@/lib/format";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  injections: Injection[];
  onRemove: (id: string) => void;
}

export default function InjectionLogList({ injections, onRemove }: Props) {
  const sorted = [...injections].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center justify-between">
          주사 기록
          <span className="text-xs text-muted-foreground font-normal">
            총 {sorted.length}회
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sorted.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4">
            아직 기록된 주사가 없습니다.
          </p>
        ) : (
          <ul className="grid divide-y divide-border">
            {sorted.map((it) => (
              <li
                key={it.id}
                className="flex items-center gap-3 py-3"
              >
                <div className="num text-xs text-muted-foreground shrink-0 w-12">
                  {fmtDateKo(it.date)}
                </div>
                <Badge variant="secondary" className="num shrink-0">
                  {it.doseMg}mg
                </Badge>
                <div className="flex-1 min-w-0 text-sm">
                  <span className="text-foreground">{drugLabel(it.drug)}</span>
                  {it.site && (
                    <span className="text-muted-foreground"> · {it.site}</span>
                  )}
                  {it.note && (
                    <span className="text-muted-foreground"> · {it.note}</span>
                  )}
                </div>
                <Badge className="bg-success text-success-foreground border-0 shrink-0">
                  완료
                </Badge>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => onRemove(it.id)}
                  aria-label="삭제"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
