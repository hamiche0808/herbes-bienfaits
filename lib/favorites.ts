"use client";
import { useCallback, useSyncExternalStore } from "react";

const KEY = "herbes:favoris";
const EMPTY: string[] = [];
const listeners = new Set<() => void>();
let raw: string | null = null;
let parsed: string[] = EMPTY;

function read(): string[] {
  try {
    const s = localStorage.getItem(KEY) ?? "[]";
    if (s !== raw) { raw = s; parsed = JSON.parse(s); }
  } catch { /* stockage indisponible */ }
  return parsed;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => { listeners.delete(cb); window.removeEventListener("storage", cb); };
}

export function useFavorites() {
  const favs = useSyncExternalStore(subscribe, read, () => EMPTY);
  const toggle = useCallback((slug: string) => {
    const cur = read();
    const next = cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug];
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* ignore */ }
    raw = null;
    listeners.forEach((l) => l());
  }, []);
  return { favs, toggle };
}
