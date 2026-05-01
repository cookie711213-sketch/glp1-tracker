"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DoseStage } from "@/lib/types";
import { drugLabel } from "@/lib/format";
import { weeksUntil, statusFor } from "@/lib/doseStages";

interface Props {
  stages: DoseStage[];
  current?: DoseStage;
  next?: DoseStage;
}

export default function DoseHeaderCard({ stages, current, next }: Props) {
  if (!current) {
    return (
      <Card className="p-6">
        <p className="text-sm text-muted-foreground">
          용량 단계가 설정되지 않았습니다. 약과 시작일을 알려주세요.
        </p>
      </Card>
    );
  }
  const today = new Date();
  const start = new Date(current.startDate);
  const end = current.endDate ? new Date(current.endDate) : null;
  const total = end ? end.getTime() - start.getTime() : 0;
  const elapsed = Math.max(0, today.getTime() - start.getTime());
  const stageProgress = total ? Math.min(100, (elapsed / total) * 100) : 0;

  return (
    <Card className="bg-brand text-brand-foreground border-0 p-6 grid gap-3">
      <Badge className="w-fit bg-white/15 hover:bg-white/15 text-brand-foreground border-0 backdrop-blur">
        현재 진행 중
      </Badge>
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="num text-5xl font-bold leading-none">
          {current.doseMg}<span className="text-2xl ml-1">mg</span>
        </span>
        <span className="text-sm opacity-80">
          {drugLabel(current.drug)} · {current.step}/{stages.length}단계
        </span>
      </div>
      {next && (
        <div className="text-sm opacity-90">
          다음: <span className="num font-medium">{next.doseMg}mg</span> · 약{" "}
          {weeksUntil(next.startDate)}주 후 ({next.startDate})
        </div>
      )}
      <Progress value={stageProgress} className="h-1.5 bg-white/20" />
    </Card>
  );
}
