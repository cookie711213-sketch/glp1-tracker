export type Drug = "wegovy" | "mounjaro";

export const WEGOVY_DOSES = [0.25, 0.5, 1.0, 1.7, 2.4] as const;
export const MOUNJARO_DOSES = [2.5, 5, 7.5, 10, 12.5, 15] as const;

export const INJECTION_SITES = ["복부", "허벅지", "팔"] as const;

export const SIDE_EFFECT_OPTIONS = [
  "메스꺼움",
  "구토",
  "설사",
  "변비",
  "복통",
  "두통",
  "피로",
  "어지럼증",
  "식욕저하",
  "속쓰림",
] as const;

export interface Injection {
  id: string;
  date: string;
  drug: Drug;
  doseMg: number;
  site?: string;
  note?: string;
}

export interface WeightEntry {
  id: string;
  date: string;
  weightKg: number;
  waistCm?: number;
  bodyFatPct?: number;
}

export interface Meal {
  id: string;
  datetime: string;
  name: string;
  kcal?: number;
  note?: string;
}

export interface Note {
  id: string;
  date: string;
  mood?: 1 | 2 | 3 | 4 | 5;
  sideEffects?: string[];
  text?: string;
  intensity?: number; // 1..10 부작용 강도
}

export interface DoseStage {
  id: string;
  drug: Drug;
  step: number;
  doseMg: number;
  startDate: string;       // ISO yyyy-mm-dd
  endDate?: string;
  note?: string;
}

export interface Profile {
  name: string;
  drug?: Drug;
  startDate?: string;       // 약 시작일
  startWeightKg?: number;
  goalWeightKg?: number;
  doctor?: string;
  hospital?: string;
}

export const STORAGE_KEYS = {
  injections: "glp1.injections",
  weights: "glp1.weights",
  meals: "glp1.meals",
  notes: "glp1.notes",
  doseStages: "glp1.doseStages",
  profile: "glp1.profile",
} as const;
