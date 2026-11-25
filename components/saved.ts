'use client';

import { useCallback, useMemo, useSyncExternalStore } from 'react';

const KEY = 'pd-saved-projects';
const EVENT = 'pd-saved-projects-change';

const read = () => {
  try { return localStorage.getItem(KEY) ?? ''; } catch { return ''; }
};
const subscribe = (cb: () => void) => {
  window.addEventListener(EVENT, cb);
  window.addEventListener('storage', cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener('storage', cb);
  };
};
const parse = (raw: string): string[] => {
  try {
    const value = JSON.parse(raw || '[]');
    return Array.isArray(value) ? [...new Set(value.filter((x): x is string => typeof x === 'string'))].slice(0, 100) : [];
  } catch { return []; }
};
const write = (items: string[]) => {
  try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
  window.dispatchEvent(new Event(EVENT));
};

export function useSavedProjects() {
  const snapshot = useSyncExternalStore(subscribe, read, () => '');
  const list = useMemo(() => parse(snapshot), [snapshot]);
  const toggle = useCallback((slug: string) => {
    const current = parse(read());
    write(current.includes(slug) ? current.filter((x) => x !== slug) : [slug, ...current]);
  }, []);
  const clear = useCallback(() => write([]), []);
  return { list, toggle, clear };
}
