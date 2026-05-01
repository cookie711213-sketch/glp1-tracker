"use client";

import { useEffect, useState, useCallback } from "react";

interface HasId {
  id: string;
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function loadAll<T>(key: string): T[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

export function saveAll<T>(key: string, items: T[]): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(key, JSON.stringify(items));
}

export function newId(): string {
  if (isBrowser() && "crypto" in window && "randomUUID" in window.crypto) {
    return window.crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function useStoredList<T extends HasId>(
  key: string,
): [T[], {
  add: (item: Omit<T, "id">) => T;
  update: (id: string, patch: Partial<Omit<T, "id">>) => void;
  remove: (id: string) => void;
  replaceAll: (items: T[]) => void;
}] {
  const [items, setItems] = useState<T[]>([]);

  useEffect(() => {
    setItems(loadAll<T>(key));
  }, [key]);

  const persist = useCallback(
    (next: T[]) => {
      setItems(next);
      saveAll(key, next);
    },
    [key],
  );

  const add = useCallback(
    (item: Omit<T, "id">) => {
      const created = { ...item, id: newId() } as T;
      persist([created, ...items]);
      return created;
    },
    [items, persist],
  );

  const update = useCallback(
    (id: string, patch: Partial<Omit<T, "id">>) => {
      persist(items.map((it) => (it.id === id ? { ...it, ...patch } : it)));
    },
    [items, persist],
  );

  const remove = useCallback(
    (id: string) => {
      persist(items.filter((it) => it.id !== id));
    },
    [items, persist],
  );

  const replaceAll = useCallback(
    (next: T[]) => persist(next),
    [persist],
  );

  return [items, { add, update, remove, replaceAll }];
}
