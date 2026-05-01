"use client";

import PageHeader from "@/components/shared/PageHeader";
import WeightHeader from "@/components/weight/WeightHeader";
import WeightBarChart from "@/components/weight/WeightBarChart";
import WeightStats from "@/components/weight/WeightStats";
import TodayWeightInput from "@/components/weight/TodayWeightInput";
import WeightLogTable from "@/components/weight/WeightLogTable";
import { useStoredList, useStoredObject } from "@/lib/storage";
import { Profile, STORAGE_KEYS, WeightEntry } from "@/lib/types";

export default function WeightPage() {
  const [weights, { add, remove }] = useStoredList<WeightEntry>(
    STORAGE_KEYS.weights,
  );
  const [profile] = useStoredObject<Profile>(STORAGE_KEYS.profile);

  return (
    <div>
      <PageHeader
        title="체중 기록"
        description="매일 같은 시간에 측정해 변화를 한눈에 확인해보세요"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 grid gap-4">
          <WeightHeader weights={weights} profile={profile} />
          <WeightBarChart entries={weights} />
          <WeightStats entries={weights} />
          <WeightLogTable entries={weights} onRemove={remove} />
        </div>
        <div className="grid gap-4">
          <TodayWeightInput onAdd={add} />
        </div>
      </div>
    </div>
  );
}
