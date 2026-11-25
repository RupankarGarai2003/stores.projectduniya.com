'use client';

import Link from 'next/link';
import { MAX_COMPARE, useCompare } from './compare';

type Item = { slug: string; title: string; code: string };

// Floating tray that appears once a project is added to compare.
export default function CompareTray({ items }: { items: Item[] }) {
  const { list, toggle, clear } = useCompare();
  const picked = list.map((s) => items.find((i) => i.slug === s)).filter(Boolean) as Item[];
  if (!picked.length) return null;
  return (
    <div className="tray" role="region" aria-label="Compare projects">
      <ul>
        {picked.map((p) => (
          <li key={p.slug}>
            <span><b>{p.code}</b> {p.title}</span>
            <button type="button" aria-label={`Remove ${p.title}`} onClick={() => toggle(p.slug)}>×</button>
          </li>
        ))}
      </ul>
      <div className="tray-actions">
        <button type="button" className="tray-clear" onClick={clear}>Clear</button>
        {picked.length >= 2 ? (
          <Link className="btn btn-brand btn-sm" href={`/compare?p=${picked.map((p) => p.slug).join(',')}`}>Compare {picked.length}</Link>
        ) : (
          <span className="tray-hint">Add {MAX_COMPARE - picked.length > 1 ? 'one or two more' : 'one more'} to compare</span>
        )}
      </div>
    </div>
  );
}
