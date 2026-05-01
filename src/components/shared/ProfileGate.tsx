"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useStoredObject } from "@/lib/storage";
import { Drug, Profile, STORAGE_KEYS } from "@/lib/types";

export default function ProfileGate() {
  const [profile, setProfile, loaded] = useStoredObject<Profile>(
    STORAGE_KEYS.profile,
  );
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [drug, setDrug] = useState<Drug>("mounjaro");

  useEffect(() => {
    if (loaded && (!profile || !profile.name)) setOpen(true);
  }, [loaded, profile]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setProfile({ name: name.trim(), drug, startDate: new Date().toISOString().slice(0, 10) });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>마윤자에 오신 걸 환영합니다</DialogTitle>
          <DialogDescription>
            시작 전 간단한 정보를 알려주세요. 모든 데이터는 이 기기에만 저장됩니다.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 mt-2">
          <div className="grid gap-1.5">
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              autoFocus
              placeholder="예: 이승환"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-1.5">
            <Label>현재 사용중인 약</Label>
            <div className="grid grid-cols-2 gap-2">
              {(["wegovy", "mounjaro"] as Drug[]).map((d) => (
                <button
                  type="button"
                  key={d}
                  onClick={() => setDrug(d)}
                  className={`py-2 rounded-md border text-sm ${
                    drug === d
                      ? "border-brand bg-brand-soft text-brand"
                      : "border-border bg-card text-foreground"
                  }`}
                >
                  {d === "wegovy" ? "위고비" : "마운자로"}
                </button>
              ))}
            </div>
          </div>
          <Button type="submit" className="w-full">
            시작하기
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
