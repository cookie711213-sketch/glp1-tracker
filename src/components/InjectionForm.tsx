"use client";

import { useState } from "react";
import {
  Drug,
  Injection,
  INJECTION_SITES,
  MOUNJARO_DOSES,
  WEGOVY_DOSES,
} from "@/lib/types";

interface Props {
  defaultDrug?: Drug;
  defaultDose?: number;
  onSubmit: (data: Omit<Injection, "id">) => void;
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function InjectionForm({
  defaultDrug = "wegovy",
  defaultDose,
  onSubmit,
}: Props) {
  const [date, setDate] = useState<string>(todayISO());
  const [drug, setDrug] = useState<Drug>(defaultDrug);
  const [doseMg, setDoseMg] = useState<number>(
    defaultDose ?? (drug === "wegovy" ? WEGOVY_DOSES[0] : MOUNJARO_DOSES[0]),
  );
  const [site, setSite] = useState<string>(INJECTION_SITES[0]);
  const [note, setNote] = useState<string>("");

  const doseOptions = drug === "wegovy" ? WEGOVY_DOSES : MOUNJARO_DOSES;

  function handleDrugChange(next: Drug) {
    setDrug(next);
    const opts = next === "wegovy" ? WEGOVY_DOSES : MOUNJARO_DOSES;
    if (!opts.includes(doseMg as never)) setDoseMg(opts[0]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ date, drug, doseMg, site, note: note.trim() || undefined });
    setNote("");
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 p-4 border border-black/10 dark:border-white/10 rounded-lg">
      <div className="grid grid-cols-2 gap-3">
        <label className="grid gap-1 text-sm">
          날짜
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-black/15 dark:border-white/20 rounded px-2 py-1.5 bg-transparent"
            required
          />
        </label>
        <label className="grid gap-1 text-sm">
          약물
          <select
            value={drug}
            onChange={(e) => handleDrugChange(e.target.value as Drug)}
            className="border border-black/15 dark:border-white/20 rounded px-2 py-1.5 bg-transparent"
          >
            <option value="wegovy">위고비 (Wegovy)</option>
            <option value="mounjaro">마운자로 (Mounjaro)</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          용량 (mg)
          <select
            value={doseMg}
            onChange={(e) => setDoseMg(Number(e.target.value))}
            className="border border-black/15 dark:border-white/20 rounded px-2 py-1.5 bg-transparent"
          >
            {doseOptions.map((d) => (
              <option key={d} value={d}>
                {d} mg
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          주사 부위
          <select
            value={site}
            onChange={(e) => setSite(e.target.value)}
            className="border border-black/15 dark:border-white/20 rounded px-2 py-1.5 bg-transparent"
          >
            {INJECTION_SITES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="grid gap-1 text-sm">
        메모 (선택)
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="예: 저녁 식후, 새 펜 개봉"
          className="border border-black/15 dark:border-white/20 rounded px-2 py-1.5 bg-transparent"
        />
      </label>
      <button
        type="submit"
        className="bg-foreground text-background rounded px-3 py-2 text-sm font-medium hover:opacity-90"
      >
        주사 기록 추가
      </button>
    </form>
  );
}
