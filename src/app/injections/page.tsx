"use client";

import InjectionForm from "@/components/InjectionForm";
import { useStoredList } from "@/lib/storage";
import { Injection, STORAGE_KEYS } from "@/lib/types";
import { differenceInCalendarDays, format, parseISO } from "date-fns";

export default function InjectionsPage() {
  const [injections, { add, remove }] = useStoredList<Injection>(
    STORAGE_KEYS.injections,
  );

  const sorted = [...injections].sort((a, b) => b.date.localeCompare(a.date));
  const last = sorted[0];
  const nextDate = last ? new Date(parseISO(last.date).getTime() + 7 * 86400000) : null;

  return (
    <div className="grid gap-6">
      <header>
        <h1 className="text-2xl font-bold">주사 로그</h1>
        <p className="text-sm opacity-70 mt-1">
          위고비/마운자로 주사 일정과 용량을 기록합니다.
        </p>
      </header>

      {last && nextDate && (
        <div className="p-4 rounded-lg bg-black/5 dark:bg-white/10 text-sm">
          마지막 주사: <b>{last.date}</b> · {last.drug === "wegovy" ? "위고비" : "마운자로"} {last.doseMg}mg
          <br />
          다음 권장일(7일 뒤): <b>{format(nextDate, "yyyy-MM-dd")}</b>
          {" "}
          <span className="opacity-70">
            ({differenceInCalendarDays(nextDate, new Date())}일 남음)
          </span>
        </div>
      )}

      <InjectionForm
        defaultDrug={last?.drug}
        defaultDose={last?.doseMg}
        onSubmit={(data) => add(data)}
      />

      <section className="grid gap-2">
        <h2 className="font-semibold">기록</h2>
        {sorted.length === 0 ? (
          <p className="text-sm opacity-70">아직 기록이 없습니다.</p>
        ) : (
          <ul className="grid gap-2">
            {sorted.map((it) => (
              <li
                key={it.id}
                className="flex items-center justify-between p-3 border border-black/10 dark:border-white/10 rounded-lg"
              >
                <div className="text-sm">
                  <div>
                    <b>{it.date}</b> · {it.drug === "wegovy" ? "위고비" : "마운자로"} {it.doseMg}mg
                    {it.site && <> · {it.site}</>}
                  </div>
                  {it.note && <div className="opacity-70 mt-0.5">{it.note}</div>}
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
