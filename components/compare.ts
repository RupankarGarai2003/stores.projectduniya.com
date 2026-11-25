'use client';

import { useCallback, useMemo, useSyncExternalStore } from 'react';

const KEY = 'pd-compare';
const EVT = 'pd-compare-change';
export const MAX_COMPARE = 3;

const subscribe = (cb: () => void) => {
  window.addEventListener(EVT, cb);
  window.addEventListener('storage', cb);
  return () => {
    window.removeEventListener(EVT, cb);
    window.removeEventListener('storage', cb);
  };
};
const raw = () => {
  try { return localStorage.getItem(KEY) ?? ''; } catch { return ''; }
};

function parse(s: string): string[] {
  try {
    const v = JSON.parse(s || '[]');
    return Array.isArray(v) ? v.filter((x) => typeof x === 'string').slice(0, MAX_COMPARE) : [];
  } catch {
    return [];
  }
}

function write(list: string[]) {
  try { localStorage.setItem(KEY, JSON.stringify(list)); } catch {}
  window.dispatchEvent(new Event(EVT));
}

// The compare list lives in localStorage and syncs across cards and tabs.
export function useCompare() {
  const snap = useSyncExternalStore(subscribe, raw, () => '');
  const list = useMemo(() => parse(snap), [snap]);
  const toggle = useCallback((slug: string) => {
    const cur = parse(raw());
    if (cur.includes(slug)) { write(cur.filter((s) => s !== slug)); return true; }
    if (cur.length >= MAX_COMPARE) return false;
    write([...cur, slug]);
    return true;
  }, []);
  const clear = useCallback(() => write([]), []);
  return { list, toggle, clear };
}
