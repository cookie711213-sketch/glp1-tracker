"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Note, SIDE_EFFECT_OPTIONS } from "@/lib/types";
import { todayISO } from "@/lib/format";
import { Plus } from "lucide-react";

interface Props {
  onSubmit: (data: Omit<Note, "id">) => void;
}

export default function SideEffectFormDialog({ onSubmit }: Props) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(todayISO());
  const [effects, setEffects] = useState<string[]>([]);
  const [intensity, setIntensity] = useState<number>(5);
  const [text, setText] = useState("");

  function toggle(s: string) {
    setEffects((prev) =>
      prev.includes(s) ? prev.filter((p) => p !== s) : [...prev, s],
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      date,
      sideEffects: effects.length ? effects : undefined,
      intensity,
      text: text.trim() || undefined,
    });
    setOpen(false);
    setEffects([]);
    setText("");
    setIntensity(5);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button>
            <Plus className="w-4 h-4" />
            부작용 기록
          </Button>
        }
      />
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>부작용 기록</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 mt-2">
          <div className="grid gap-1.5">
            <Label htmlFor="se-date">날짜</Label>
            <Input
              id="se-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-1.5">
            <Label>증상 (다중 선택)</Label>
            <div className="flex flex-wrap gap-1.5">
              {SIDE_EFFECT_OPTIONS.map((s) => {
                const active = effects.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggle(s)}
                    className={`px-3 py-1 rounded-full text-xs border ${
                      active
                        ? "bg-brand text-brand-foreground border-brand"
                        : "border-border bg-card"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="grid gap-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="se-int">강도</Label>
              <span className="num text-xs text-muted-foreground">
                {intensity}/10
              </span>
            </div>
            <input
              id="se-int"
              type="range"
              min={1}
              max={10}
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full accent-brand"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="se-text">메모</Label>
            <Textarea
              id="se-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              placeholder="언제, 어느 정도였는지 자유롭게"
            />
          </div>
          <Button type="submit">기록 저장</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
