"use client";

import PageHeader from "@/components/shared/PageHeader";
import SideEffectStats from "@/components/sides/SideEffectStats";
import FrequentSideEffects from "@/components/sides/FrequentSideEffects";
import InsightCard from "@/components/sides/InsightCard";
import SideEffectLog from "@/components/sides/SideEffectLog";
import SideEffectFormDialog from "@/components/sides/SideEffectFormDialog";
import { useStoredList } from "@/lib/storage";
import { Note, STORAGE_KEYS } from "@/lib/types";

export default function SidesPage() {
  const [notes, { add, remove }] = useStoredList<Note>(STORAGE_KEYS.notes);

  return (
    <div>
      <PageHeader
        title="부작용 기록"
        description="몸 상태를 기록해두면 패턴이 보입니다"
        right={<SideEffectFormDialog onSubmit={add} />}
      />

      <div className="md:hidden mb-4 flex justify-end">
        <SideEffectFormDialog onSubmit={add} />
      </div>

      <div className="grid gap-4">
        <SideEffectStats notes={notes} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 grid gap-4">
            <SideEffectLog notes={notes} onRemove={remove} />
          </div>
          <div className="grid gap-4">
            <FrequentSideEffects notes={notes} />
            <InsightCard notes={notes} />
          </div>
        </div>
      </div>
    </div>
  );
}
