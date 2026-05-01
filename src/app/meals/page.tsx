"use client";

import { useMemo, useState } from "react";
import { useStoredList } from "@/lib/storage";
import { Meal, STORAGE_KEYS } from "@/lib/types";

function nowLocalISO(): string {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

export default function MealsPage() {
  const [meals, { add, remove }] = useStoredList<Meal>(STORAGE_KEYS.meals);

  const [datetime, setDatetime] = useState(nowLocalISO());
  const [name, setName] = useState("");
  const [kcal, setKcal] = useState("");
  const [note, setNote] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    add({
      datetime: new Date(datetime).toISOString(),
      name: name.trim(),
      kcal: kcal ? parseInt(kcal, 10) : undefined,
      note: note.trim() || undefined,
    });
    setName("");
    setKcal("");
    setNote("");
  }

  const grouped = useMemo(() => {
    const map = new Map<string, Meal[]>();
    for (const m of meals) {
      const day = m.datetime.slice(0, 10);
      const arr = map.get(day) ?? [];
      arr.push(m);
      map.set(day, arr);
    }
    const days = Array.from(map.entries())
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([day, list]) => ({
        day,
        list: list.sort((a, b) => b.datetime.localeCompare(a.datetime)),
        total: list.reduce((sum, m) => sum + (m.kcal ?? 0), 0),
      }));
    return days;
  }, [meals]);

  return (
    <div className="grid gap-6">
      <header>
        <h1 className="text-2xl font-bold">식단 / 칼로리</h1>
        <p className="text-sm opacity-70 mt-1">간단하게 기록만. 칼로리는 선택입니다.</p>
      </header>

      <form onSubmit={handleSubmit} className="grid gap-3 p-4 border border-black/10 dark:border-white/10 rounded-lg">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <label className="grid gap-1 text-sm col-span-2 sm:col-span-1">
            일시
            <input
              type="datetime-local"
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
              className="border border-black/15 dark:border-white/20 rounded px-2 py-1.5 bg-transparent"
              required
            />
          </label>
          <label className="grid gap-1 text-sm col-span-2 sm:col-span-1">
            음식 이름
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 닭가슴살 샐러드"
              className="border border-black/15 dark:border-white/20 rounded px-2 py-1.5 bg-transparent"
              required
            />
          </label>
          <label className="grid gap-1 text-sm">
            칼로리 (kcal)
            <input
              type="number"
              inputMode="numeric"
              value={kcal}
              onChange={(e) => setKcal(e.target.value)}
              className="border border-black/15 dark:border-white/20 rounded px-2 py-1.5 bg-transparent"
            />
          </label>
        </div>
        <label className="grid gap-1 text-sm">
          메모 (선택)
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="border border-black/15 dark:border-white/20 rounded px-2 py-1.5 bg-transparent"
          />
        </label>
        <button
          type="submit"
          className="bg-foreground text-background rounded px-3 py-2 text-sm font-medium hover:opacity-90"
        >
          식단 추가
        </button>
      </form>

      <section className="grid gap-4">
        {grouped.length === 0 ? (
          <p className="text-sm opacity-70">아직 기록이 없습니다.</p>
        ) : (
          grouped.map(({ day, list, total }) => (
            <div key={day}>
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold">{day}</h2>
                <span className="text-xs opacity-70">합계 {total} kcal</span>
              </div>
              <ul className="grid gap-2">
                {list.map((m) => (
                  <li
                    key={m.id}
                    className="flex items-center justify-between p-3 border border-black/10 dark:border-white/10 rounded-lg text-sm"
                  >
                    <div>
                      <div>
                        <span className="opacity-60 mr-2">
                          {new Date(m.datetime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        <b>{m.name}</b>
                        {m.kcal !== undefined && <> · {m.kcal} kcal</>}
                      </div>
                      {m.note && <div className="opacity-70 mt-0.5">{m.note}</div>}
                    </div>
                    <button
                      onClick={() => remove(m.id)}
                      className="text-xs opacity-60 hover:opacity-100 hover:text-red-600"
                    >
                      삭제
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
