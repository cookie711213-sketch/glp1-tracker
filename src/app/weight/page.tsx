"use client";

import { useState } from "react";
import WeightChart from "@/components/WeightChart";
import { useStoredList } from "@/lib/storage";
import { STORAGE_KEYS, WeightEntry } from "@/lib/types";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function WeightPage() {
  const [entries, { add, remove }] = useStoredList<WeightEntry>(
    STORAGE_KEYS.weights,
  );

  const [date, setDate] = useState(todayISO());
  const [weight, setWeight] = useState("");
  const [waist, setWaist] = useState("");
  const [bf, setBf] = useState("");

  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));
  const start = [...entries].sort((a, b) => a.date.localeCompare(b.date))[0];
  const latest = sorted[0];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const w = parseFloat(weight);
    if (!Number.isFinite(w) || w <= 0) return;
    add({
      date,
      weightKg: w,
      waistCm: waist ? parseFloat(waist) : undefined,
      bodyFatPct: bf ? parseFloat(bf) : undefined,
    });
    setWeight("");
    setWaist("");
    setBf("");
  }

  return (
    <div className="grid gap-6">
      <header>
        <h1 className="text-2xl font-bold">체중 / 신체치수</h1>
        <p className="text-sm opacity-70 mt-1">매일 같은 시간에 측정하면 가장 좋습니다.</p>
      </header>

      {start && latest && start.id !== latest.id && (
        <div className="grid grid-cols-3 gap-3 text-sm">
          <Stat label="시작" value={`${start.weightKg} kg`} sub={start.date} />
          <Stat label="현재" value={`${latest.weightKg} kg`} sub={latest.date} />
          <Stat
            label="변화"
            value={`${(latest.weightKg - start.weightKg).toFixed(1)} kg`}
            sub={`${(((latest.weightKg - start.weightKg) / start.weightKg) * 100).toFixed(1)}%`}
            highlight
          />
        </div>
      )}

      <WeightChart entries={entries} />

      <form onSubmit={handleSubmit} className="grid gap-3 p-4 border border-black/10 dark:border-white/10 rounded-lg">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <label className="grid gap-1 text-sm col-span-2 sm:col-span-1">
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
            체중 (kg)
            <input
              type="number"
              inputMode="decimal"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="border border-black/15 dark:border-white/20 rounded px-2 py-1.5 bg-transparent"
              required
            />
          </label>
          <label className="grid gap-1 text-sm">
            허리 (cm)
            <input
              type="number"
              inputMode="decimal"
              step="0.1"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
              className="border border-black/15 dark:border-white/20 rounded px-2 py-1.5 bg-transparent"
            />
          </label>
          <label className="grid gap-1 text-sm">
            체지방률 (%)
            <input
              type="number"
              inputMode="decimal"
              step="0.1"
              value={bf}
              onChange={(e) => setBf(e.target.value)}
              className="border border-black/15 dark:border-white/20 rounded px-2 py-1.5 bg-transparent"
            />
          </label>
        </div>
        <button
          type="submit"
          className="bg-foreground text-background rounded px-3 py-2 text-sm font-medium hover:opacity-90"
        >
          기록 추가
        </button>
      </form>

      <section className="grid gap-2">
        <h2 className="font-semibold">기록</h2>
        {sorted.length === 0 ? (
          <p className="text-sm opacity-70">아직 기록이 없습니다.</p>
        ) : (
          <ul className="grid gap-2">
            {sorted.map((it) => (
              <li
                key={it.id}
                className="flex items-center justify-between p-3 border border-black/10 dark:border-white/10 rounded-lg text-sm"
              >
                <div>
                  <b>{it.date}</b> · {it.weightKg} kg
                  {it.waistCm !== undefined && <> · 허리 {it.waistCm}cm</>}
                  {it.bodyFatPct !== undefined && <> · 체지방 {it.bodyFatPct}%</>}
                </div>
                <button
                  onClick={() => remove(it.id)}
                  className="text-xs opacity-60 hover:opacity-100 hover:text-red-600"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value, sub, highlight }: { label: string; value: string; sub?: string; highlight?: boolean }) {
  return (
    <div
      className={`p-3 rounded-lg border ${
        highlight
          ? "border-foreground/30 bg-foreground/5"
          : "border-black/10 dark:border-white/10"
      }`}
    >
      <div className="text-xs opacity-60">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
      {sub && <div className="text-xs opacity-60 mt-0.5">{sub}</div>}
    </div>
  );
}
