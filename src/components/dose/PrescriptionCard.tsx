"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStoredObject } from "@/lib/storage";
import { Profile, STORAGE_KEYS } from "@/lib/types";

export default function PrescriptionCard() {
  const [profile] = useStoredObject<Profile>(STORAGE_KEYS.profile);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">의사 처방 정보</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2 text-sm">
        <Row label="이름" value={profile?.doctor ?? "—"} />
        <Row label="병원" value={profile?.hospital ?? "—"} />
        <Row label="처방 시작일" value={profile?.startDate ?? "—"} mono />
        <p className="text-[11px] text-muted-foreground mt-2">
          이 정보는 이 기기에만 저장됩니다.
        </p>
      </CardContent>
    </Card>
  );
}

function Row({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5 border-b border-border last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={mono ? "num text-sm" : "text-sm"}>{value}</span>
    </div>
  );
}
