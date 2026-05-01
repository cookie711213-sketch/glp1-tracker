"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Drug, Profile } from "@/lib/types";
import { todayISO } from "@/lib/format";

interface Props {
  profile: Profile | null;
  onSave: (profile: Profile) => void;
}

export default function DoseSetupCard({ profile, onSave }: Props) {
  const [drug, setDrug] = useState<Drug>(profile?.drug ?? "mounjaro");
  const [startDate, setStartDate] = useState(profile?.startDate ?? todayISO());

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const base: Profile = profile ?? { name: "사용자" };
    onSave({ ...base, drug, startDate });
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">단계 설정</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">
          시작일을 입력하면 표준 4주 단계가 자동으로 만들어집니다.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-3">
          <div className="grid gap-1.5">
            <Label>약물</Label>
            <Select value={drug} onValueChange={(v) => v && setDrug(v as Drug)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wegovy">위고비</SelectItem>
                <SelectItem value="mounjaro">마운자로</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="dose-start">시작일</Label>
            <Input
              id="dose-start"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <Button type="submit">저장하기</Button>
        </form>
      </CardContent>
    </Card>
  );
}
