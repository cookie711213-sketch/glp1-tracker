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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drug,
  Injection,
  INJECTION_SITES,
  MOUNJARO_DOSES,
  WEGOVY_DOSES,
} from "@/lib/types";
import { todayISO } from "@/lib/format";
import { Plus } from "lucide-react";

interface Props {
  defaultDrug?: Drug;
  defaultDose?: number;
  defaultSite?: string;
  triggerLabel?: string;
  onSubmit: (data: Omit<Injection, "id">) => void;
}

export default function InjectionFormDialog({
  defaultDrug = "mounjaro",
  defaultDose,
  defaultSite,
  triggerLabel = "주사 기록 추가",
  onSubmit,
}: Props) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(todayISO());
  const [drug, setDrug] = useState<Drug>(defaultDrug);
  const [doseMg, setDoseMg] = useState<number>(
    defaultDose ?? (defaultDrug === "wegovy" ? WEGOVY_DOSES[0] : MOUNJARO_DOSES[1]),
  );
  const [site, setSite] = useState<string>(defaultSite ?? INJECTION_SITES[0]);
  const [note, setNote] = useState("");

  const doseOptions = drug === "wegovy" ? WEGOVY_DOSES : MOUNJARO_DOSES;

  function handleDrug(next: Drug) {
    setDrug(next);
    const opts = next === "wegovy" ? WEGOVY_DOSES : MOUNJARO_DOSES;
    if (!opts.includes(doseMg as never)) setDoseMg(opts[0]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      date,
      drug,
      doseMg,
      site,
      note: note.trim() || undefined,
    });
    setOpen(false);
    setNote("");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button>
            <Plus className="w-4 h-4" />
            {triggerLabel}
          </Button>
        }
      />
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>주사 완료 기록</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 mt-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="inj-date">날짜</Label>
              <Input
                id="inj-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-1.5">
              <Label>약물</Label>
              <Select value={drug} onValueChange={(v) => v && handleDrug(v as Drug)}>
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
              <Label>용량</Label>
              <Select
                value={String(doseMg)}
                onValueChange={(v) => v && setDoseMg(Number(v))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {doseOptions.map((d) => (
                    <SelectItem key={d} value={String(d)}>
                      {d} mg
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <Label>주사 부위</Label>
              <Select value={site} onValueChange={(v) => v && setSite(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {INJECTION_SITES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="inj-note">메모</Label>
            <Input
              id="inj-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="예: 저녁 식후, 새 펜 개봉"
            />
          </div>
          <Button type="submit" className="w-full">
            기록 저장
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
