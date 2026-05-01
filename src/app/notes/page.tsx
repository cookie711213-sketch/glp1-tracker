"use client";

import { useState } from "react";
import { useStoredList } from "@/lib/storage";
import { Note, SIDE_EFFECT_OPTIONS, STORAGE_KEYS } from "@/lib/types";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

const MOOD_LABELS: Record<number, string> = {
  1: "😞",
  2: "🙁",
  3: "😐",
  4: "🙂",
  5: "😄",
};

export default function NotesPage() {
  const [notes, { add, remove }] = useStoredList<Note>(STORAGE_KEYS.notes);

  const [date, setDate] = useState(todayISO());
  const [mood, setMood] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [effects, setEffects] = useState<string[]>([]);
  const [text, setText] = useState("");

  function toggleEffect(s: string) {
    setEffects((prev) =>
      prev.includes(s) ? prev.filter((p) => p !== s) : [...prev, s],
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    add({
      date,
      mood,
      sideEffects: effects.length ? effects : undefined,
      text: text.trim() || undefined,
    });
    setEffects([]);
    setText("");
  }

  const sorted = [...notes].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="grid gap-6">
      <header>
        <h1 className="text-2xl font-bold">컨디션 / 부작용 메모</h1>
        <p className="text-sm opacity-70 mt-1">하루 한 줄이라도 남기면 패턴이 보입니다.</p>
      </header>

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
          <div className="grid gap-1 text-sm">
            <span>오늘 기분</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMood(m as 1 | 2 | 3 | 4 | 5)}
                  className={`flex-1 py-1.5 rounded border text-lg ${
                    mood === m
                      ? "bg-foreground text-background border-foreground"
                      : "border-black/15 dark:border-white/20"
                  }`}
                >
                  {MOOD_LABELS[m]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-1 text-sm">
          <span>부작용 (다중 선택)</span>
          <div className="flex flex-wrap gap-1.5">
            {SIDE_EFFECT_OPTIONS.map((s) => {
              const active = effects.includes(s);
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleEffect(s)}
                  className={`px-2.5 py-1 rounded-full text-xs border ${
                    active
                      ? "bg-foreground text-background border-foreground"
                      : "border-black/15 dark:border-white/20 opacity-80"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        <label className="grid gap-1 text-sm">
          자유 메모
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder="오늘 컨디션, 식욕, 수면 등 자유롭게"
            className="border border-black/15 dark:border-white/20 rounded px-2 py-1.5 bg-transparent resize-y"
          />
        </label>

        <button
          type="submit"
          className="bg-foreground text-background rounded px-3 py-2 text-sm font-medium hover:opacity-90"
        >
          메모 추가
        </button>
      </form>

      <section className="grid gap-2">
        <h2 className="font-semibold">기록</h2>
        {sorted.length === 0 ? (
          <p className="text-sm opacity-70">아직 메모가 없습니다.</p>
        ) : (
          <ul className="grid gap-2">
            {sorted.map((n) => (
              <li
                key={n.id}
                className="p-3 border border-black/10 dark:border-white/10 rounded-lg text-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <b>{n.date}</b>
                    {n.mood && <span className="ml-2">{MOOD_LABELS[n.mood]}</span>}
                  </div>
                  <button
                    onClick={() => remove(n.id)}
                    className="text-xs opacity-60 hover:opacity-100 hover:text-red-600 shrink-0"
                  >
                    삭제
                  </button>
                </div>
                {n.sideEffects && n.sideEffects.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {n.sideEffects.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded-full text-xs bg-black/5 dark:bg-white/10"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
                {n.text && <p className="mt-1.5 whitespace-pre-wrap opacity-90">{n.text}</p>}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
