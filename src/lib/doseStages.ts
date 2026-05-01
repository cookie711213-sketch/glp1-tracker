import { Drug, DoseStage, MOUNJARO_DOSES, WEGOVY_DOSES } from "./types";

const STEP_WEEKS = 4; // 표준 4주 간격 증량

export function buildStandardStages(
  drug: Drug,
  startDate: string,
): DoseStage[] {
  const doses = drug === "wegovy" ? WEGOVY_DOSES : MOUNJARO_DOSES;
  const start = new Date(startDate);
  if (Number.isNaN(start.getTime())) return [];
  return doses.map((dose, idx) => {
    const stageStart = new Date(start);
    stageStart.setDate(start.getDate() + idx * STEP_WEEKS * 7);
    const stageEnd = new Date(stageStart);
    stageEnd.setDate(stageStart.getDate() + STEP_WEEKS * 7);
    return {
      id: `template-${drug}-${idx + 1}`,
      drug,
      step: idx + 1,
      doseMg: dose,
      startDate: stageStart.toISOString().slice(0, 10),
      endDate: stageEnd.toISOString().slice(0, 10),
    };
  });
}

export type StageStatus = "done" | "current" | "upcoming";

export function statusFor(stage: DoseStage, today = new Date()): StageStatus {
  const start = new Date(stage.startDate);
  const end = stage.endDate ? new Date(stage.endDate) : null;
  if (end && today > end) return "done";
  if (today < start) return "upcoming";
  return "current";
}

export function findCurrentStage(stages: DoseStage[]): DoseStage | undefined {
  const today = new Date();
  const sorted = [...stages].sort(
    (a, b) => a.startDate.localeCompare(b.startDate),
  );
  const current = sorted.find((s) => statusFor(s, today) === "current");
  if (current) return current;
  // 모두 끝났으면 마지막, 아직 시작 전이면 첫번째
  const last = sorted[sorted.length - 1];
  if (last && new Date(last.endDate ?? last.startDate) < today) return last;
  return sorted[0];
}

export function daysUntil(iso: string, today = new Date()): number {
  const d = new Date(iso);
  d.setHours(0, 0, 0, 0);
  const t = new Date(today);
  t.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - t.getTime()) / 86400000);
}

export function weeksUntil(iso: string, today = new Date()): number {
  return Math.round(daysUntil(iso, today) / 7);
}
