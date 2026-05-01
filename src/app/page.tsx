"use client";

import Link from "next/link";
import WeightChart from "@/components/WeightChart";
import { useStoredList } from "@/lib/storage";
import {
  Injection,
  Meal,
  Note,
  STORAGE_KEYS,
  WeightEntry,
} from "@/lib/types";
import { differenceInCalendarDays, format, parseISO } from "date-fns";

export default function Dashboard() {
  const [injections] = useStoredList<Injection>(STORAGE_KEYS.injections);
  const [weights] = useStoredList<WeightEntry>(STORAGE_KEYS.weights);
  const [meals] = useStoredList<Meal>(STORAGE_KEYS.meals);
  const [notes] = useStoredList<Note>(STORAGE_KEYS.notes);

  const lastInj = [...injections].sort((a, b) => b.date.localeCompare(a.date))[0];
  const nextInjDate = lastInj
    ? new Date(parseISO(lastInj.date).getTime() + 7 * 86400000)
    : null;

  const today = new Date().toISOString().slice(0, 10);
  const todayMeals = meals.filter((m) => m.datetime.slice(0, 10) === today);
  const todayNote = notes.find((n) => n.date === today);

  const recentWeights = [...weights]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-7);

  const startW = [...weights].sort((a, b) => a.date.localeCompare(b.date))[0];
  const latestW = [...weights].sort((a, b) => b.date.localeCompare(a.date))[0];

  return (
    <div className="grid gap-6">
      <header>
        <h1 className="text-2xl font-bold">대시보드</h1>
        <p className="text-sm opacity-70 mt-1">{today}</p>
      </header>

      <section className="grid grid-cols-2 gap-3">
        <Card title="다음 주사">
          {lastInj && nextInjDate ? (
            <>
              <div className="text-lg font-semibold">
                {format(nextInjDate, "MM/dd")}
              </div>
              <div className="text-xs opacity-70">
                {differenceInCalendarDays(nextInjDate, new Date())}일 남음 ·{" "}
                {lastInj.drug === "wegovy" ? "위고비" : "마운자로"} {lastInj.doseMg}mg
              </div>
            </>
          ) : (
            <Empty href="/injections" label="첫 주사 기록하기" />
          )}
        </Card>

        <Card title="현재 체중">
          {latestW ? (
            <>
              <div className="text-lg font-semibold">{latestW.weightKg} kg</div>
              {startW && startW.id !== latestW.id && (
                <div className="text-xs opacity-70">
                  시작 대비 {(latestW.weightKg - startW.weightKg).toFixed(1)} kg
                </div>
              )}
            </>
          ) : (
            <Empty href="/weight" label="첫 체중 기록하기" />
          )}
        </Card>

        <Card title="오늘 식단">
          <div className="text-lg font-semibold">{todayMeals.length}건</div>
          <div className="text-xs opacity-70">
            {todayMeals.reduce((s, m) => s + (m.kcal ?? 0), 0)} kcal
          </div>
        </Card>

        <Card title="오늘 메모">
          {todayNote ? (
            <>
              <div className="text-lg font-semibold">기록 완료</div>
              <div className="text-xs opacity-70 truncate">
                {todayNote.text ?? todayNote.sideEffects?.join(", ") ?? "—"}
              </div>
            </>
          ) : (
            <Empty href="/notes" label="오늘 메모 남기기" />
          )}
        </Card>
      </section>

      <section>
        <h2 className="font-semibold mb-2 text-sm opacity-80">최근 체중</h2>
        <WeightChart entries={recentWeights} height={180} />
      </section>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-lg border border-black/10 dark:border-white/10 grid gap-1">
      <div className="text-xs opacity-60">{title}</div>
      {children}
    </div>
  );
}

function Empty({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="text-sm underline opacity-80 hover:opacity-100">
      {label}
    </Link>
  );
}
