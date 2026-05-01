"use client";

import PageHeader from "@/components/shared/PageHeader";
import UpcomingInjectionCard from "@/components/injections/UpcomingInjectionCard";
import InjectionCalendar from "@/components/injections/InjectionCalendar";
import SiteRotationCard from "@/components/injections/SiteRotationCard";
import InjectionLogList from "@/components/injections/InjectionLogList";
import InjectionFormDialog from "@/components/injections/InjectionFormDialog";
import { useStoredList, useStoredObject } from "@/lib/storage";
import { Injection, Profile, STORAGE_KEYS } from "@/lib/types";

export default function InjectionsPage() {
  const [injections, { add, remove }] = useStoredList<Injection>(
    STORAGE_KEYS.injections,
  );
  const [profile] = useStoredObject<Profile>(STORAGE_KEYS.profile);

  const sortedDesc = [...injections].sort((a, b) => b.date.localeCompare(a.date));
  const last = sortedDesc[0];

  return (
    <div>
      <PageHeader
        title="주사 일정"
        description={`총 ${injections.length}회 기록 · ${profile?.name ?? "사용자"}님의 주사 캘린더`}
        right={
          <InjectionFormDialog
            defaultDrug={last?.drug ?? profile?.drug}
            defaultDose={last?.doseMg}
            defaultSite={last?.site}
            onSubmit={(data) => add(data)}
          />
        }
      />

      <div className="md:hidden mb-4 flex justify-end">
        <InjectionFormDialog
          defaultDrug={last?.drug ?? profile?.drug}
          defaultDose={last?.doseMg}
          defaultSite={last?.site}
          onSubmit={(data) => add(data)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 grid gap-4">
          <UpcomingInjectionCard last={last} />
          <InjectionCalendar injections={injections} />
          <InjectionLogList injections={injections} onRemove={remove} />
        </div>
        <div className="grid gap-4">
          <SiteRotationCard injections={injections} />
        </div>
      </div>
    </div>
  );
}
