import { Drug } from "./types";

export function drugLabel(d: Drug | undefined): string {
  if (d === "wegovy") return "위고비";
  if (d === "mounjaro") return "마운자로";
  return "";
}

export function fmtKg(n: number, digits = 1): string {
  return `${n.toFixed(digits)} kg`;
}

export function fmtMg(n: number): string {
  return `${n} mg`;
}

export function fmtDateMD(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

export function fmtDateKo(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getMonth() + 1}월 ${d.getDate()}일`;
}

export function dDayLabel(targetISO: string, todayISO?: string): string {
  const target = new Date(targetISO);
  const today = todayISO ? new Date(todayISO) : new Date();
  target.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  const diff = Math.round((target.getTime() - today.getTime()) / 86400000);
  if (diff === 0) return "D-Day";
  if (diff > 0) return `D-${diff}`;
  return `D+${Math.abs(diff)}`;
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}
