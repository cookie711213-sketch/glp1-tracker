"use client";

import PageHeader from "@/components/shared/PageHeader";
import DoseHeaderCard from "@/components/dose/DoseHeaderCard";
import DoseTimeline from "@/components/dose/DoseTimeline";
import PrescriptionCard from "@/components/dose/PrescriptionCard";
import DoseSetupCard from "@/components/dose/DoseSetupCard";
import { useStoredObject } from "@/lib/storage";
import { Profile, STORAGE_KEYS } from "@/lib/types";
import { buildStandardStages, findCurrentStage } from "@/lib/doseStages";
import { useMemo } from "react";

export default function DosePage() {
  const [profile, setProfile] = useStoredObject<Profile>(STORAGE_KEYS.profile);

  const stages = useMemo(() => {
    if (!profile?.drug || !profile.startDate) return [];
    return buildStandardStages(profile.drug, profile.startDate);
  }, [profile?.drug, profile?.startDate]);

  const current = findCurrentStage(stages);
  const next = current
    ? stages.find((s) => s.step === current.step + 1)
    : undefined;

  return (
    <div>
      <PageHeader
        title="용량 단계"
        description="마운자로/위고비 표준 티트레이션 일정과 진행 상황"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 grid gap-4">
          <DoseHeaderCard stages={stages} current={current} next={next} />
          <DoseTimeline stages={stages} />
        </div>
        <div className="grid gap-4">
          <DoseSetupCard
            profile={profile}
            onSave={(p) => setProfile(p)}
          />
          <PrescriptionCard />
        </div>
      </div>
    </div>
  );
}
