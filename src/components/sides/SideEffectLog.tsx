"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Note } from "@/lib/types";
import { fmtDateMD } from "@/lib/format";
import { Trash2 } from "lucide-react";

interface Props {
  notes: Note[];
  onRemove: (id: string) => void;
}

function tone(intensity?: number) {
  if (!intensity) return "bg-muted text-muted-foreground";
  if (intensity <= 3) return "bg-success text-success-foreground";
  if (intensity <= 7) return "bg-warning text-warning-foreground";
  return "bg-destructive/15 text-destructive";
}

export default function SideEffectLog({ notes, onRemove }: Props) {
  const sorted = [...notes].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">최근 기록</CardTitle>
      </CardHeader>
      <CardContent>
        {sorted.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4">
            아직 기록된 부작용이 없습니다.
          </p>
        ) : (
          <ul className="grid gap-2">
            {sorted.map((n) => {
              const main = n.sideEffects?.[0] ?? "메모";
              const others = (n.sideEffects ?? []).slice(1);
              return (
                <li
                  key={n.id}
                  className="flex items-start gap-3 p-3 rounded-lg border border-border"
                >
                  <div className="grid place-items-center w-10 h-10 rounded-full bg-muted text-xs font-semibold shrink-0">
                    <span className="num">{fmtDateMD(n.date)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Badge className={`${tone(n.intensity)} border-0`}>
                        {main}
                      </Badge>
                      {n.intensity != null && (
                        <Badge variant="secondary" className="num">
                          {n.intensity}/10
                        </Badge>
                      )}
                      {others.map((o) => (
                        <Badge key={o} variant="secondary" className="text-[10px]">
                          {o}
                        </Badge>
                      ))}
                    </div>
                    {n.text && (
                      <p className="text-sm mt-1 text-foreground">{n.text}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => onRemove(n.id)}
                    aria-label="삭제"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
