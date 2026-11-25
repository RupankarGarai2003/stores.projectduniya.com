'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export type SearchItem = {
  type: 'Project' | 'Category' | 'Tech category' | 'Technology';
  title: string;
  sub?: string;
  href: string;
  hay: string; // lowercase text that is searched
};

const WEIGHT: Record<SearchItem['type'], number> = { Project: 0, Category: 0.6, 'Tech category': 0.5, Technology: 0.8 };

function rank(items: SearchItem[], q: string) {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  return items
    .map((it) => {
      const title = it.title.toLowerCase();
      if (!terms.every((t) => it.hay.includes(t))) return null;
      const score = terms.reduce((s, t) => s + (title.startsWith(t) ? 3 : title.includes(t) ? 2 : 1), 0) + WEIGHT[it.type];
      return { it, score };
    })
    .filter((x): x is { it: SearchItem; score: number } => !!x)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((x) => x.it);
}

// Instant search over projects, categories and technologies. Opens with Ctrl/Cmd+K or "/".
export default function SearchPalette({ items }: { items: SearchItem[] }) {
  const router = useRouter();
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);

  const results = useMemo(() => {
    if (q.trim()) return rank(items, q);
    return [...items.filter((i) => i.type === 'Category'), ...items.filter((i) => i.type === 'Tech category').slice(0, 3), ...items.filter((i) => i.type === 'Project').slice(0, 3)];
  }, [items, q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = /input|textarea|select/i.test((e.target as HTMLElement)?.tagName ?? '');
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === '/' && !typing) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQ('');
      setActive(0);
      input.current?.focus();
    }
  }, [open]);

  useEffect(() => { setActive(0); }, [q]);
  useEffect(() => {
    document.getElementById(`${id}-${active}`)?.scrollIntoView({ block: 'nearest' });
  }, [active, id]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false);
    else if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(results.length - 1, a + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[active]) go(results[active].href);
      else if (q.trim()) go(`/projects?q=${encodeURIComponent(q.trim())}`);
    }
  };

  return (
    <>
      <button type="button" className="srch-btn" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-label="Search projects">
        <span aria-hidden="true">⌕</span><span className="srch-label">Search</span><kbd aria-hidden="true">Ctrl K</kbd>
      </button>
      {open && (
        <div className="pal" role="dialog" aria-modal="true" aria-label="Search the store" onKeyDown={onKeyDown}>
          <div className="pal-back" onClick={() => setOpen(false)} />
          <div className="pal-box">
            <input
              ref={input}
              className="pal-input"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search projects, technologies or categories…"
              role="combobox"
              aria-expanded="true"
              aria-controls={`${id}-list`}
              aria-activedescendant={results[active] ? `${id}-${active}` : undefined}
              autoComplete="off"
            />
            <ul className="pal-list" id={`${id}-list`} role="listbox">
              {results.map((r, n) => (
                <li
                  key={r.href}
                  id={`${id}-${n}`}
                  role="option"
                  aria-selected={n === active}
                  className={n === active ? 'on' : ''}
                  onMouseEnter={() => setActive(n)}
                  onClick={() => go(r.href)}
                >
                  <span className="pal-type">{r.type}</span>
                  <span className="pal-title"><b>{r.title}</b>{r.sub && <small>{r.sub}</small>}</span>
                  <span aria-hidden="true">↵</span>
                </li>
              ))}
              {!results.length && (
                <li className="pal-empty" role="presentation">
                  No match. Press Enter to search all projects for “{q}”.
                </li>
              )}
            </ul>
            <div className="pal-foot"><span><kbd>↑</kbd><kbd>↓</kbd> move</span><span><kbd>↵</kbd> open</span><span><kbd>Esc</kbd> close</span></div>
          </div>
        </div>
      )}
    </>
  );
}
