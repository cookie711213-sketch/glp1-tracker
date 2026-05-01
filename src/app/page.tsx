"use client";

import PageHeader from "@/components/shared/PageHeader";
import NextInjectionCard from "@/components/home/NextInjectionCard";
import CurrentDoseCard from "@/components/home/CurrentDoseCard";
import WeightSummaryCard from "@/components/home/WeightSummaryCard";
import TodayConditionCard from "@/components/home/TodayConditionCard";
import RecentSideEffectsCard from "@/components/home/RecentSideEffectsCard";
import QuickActionsCard from "@/components/home/QuickActionsCard";
import { useStoredObject } from "@/lib/storage";
import { Profile, STORAGE_KEYS } from "@/lib/types";

export default function Home() {
  const [profile] = useStoredObject<Profile>(STORAGE_KEYS.profile);
  const name = profile?.name ?? "사용자";

  return (
    <div>
      <PageHeader
        title={`안녕하세요, ${name}님 👋`}
        description="오늘도 마윤자가 5mg 잘 챙겨드시고 있는지 응원해요"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 grid gap-4">
          <NextInjectionCard />
          <WeightSummaryCard />
          <RecentSideEffectsCard />
        </div>
        <div className="grid gap-4">
          <CurrentDoseCard />
          <TodayConditionCard />
          <QuickActionsCard />
        </div>
      </div>
    </div>
  );
}
