'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DELIVERABLES } from '@/lib/config';
import type { Category, Project } from '@/lib/types';
import { buyMessage, waLink } from '@/utils/links';
import Cover from './Cover';
import Price from './Price';
import { Tick, WaIcon } from './Icons';

const AUTO_MS = 6000;

// Featured-project showcase. Rotates by itself and pauses on hover or focus.
export default function SpecSheet({ projects, cats }: { projects: Project[]; cats: Category[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const p = projects[i];
  const cat = cats.find((c) => c.slug === p.category);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (paused || reduced || projects.length < 2) return;
    const id = setTimeout(() => setI((n) => (n + 1) % projects.length), AUTO_MS);
    return () => clearTimeout(id);
  }, [i, paused, reduced, projects.length]);

  return (
    <div
      className="sheet"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="sheet-tabs" role="tablist" aria-label="Featured projects">
        {projects.map((x, n) => (
          <button key={x.slug} role="tab" aria-selected={n === i} className={n === i ? 'on' : ''} onClick={() => setI(n)}>
            {x.code}
          </button>
        ))}
      </div>
      {!reduced && !paused && projects.length > 1 && <span key={i} className="sheet-timer" style={{ animationDuration: `${AUTO_MS}ms` }} />}
      <div key={p.slug} className="sheet-swap">
        <Cover p={p} cat={cat} big />
        <div className="sheet-body">
          <h2><Link href={`/projects/${p.slug}`}>{p.title}</Link></h2>
          <ul className="ticks">
            {DELIVERABLES.slice(0, 4).map(([t]) => <li key={t}><Tick />{t}</li>)}
          </ul>
          <div className="sheet-foot">
            <Price p={p} />
            <a className="btn btn-buy" href={waLink(buyMessage(p))} target="_blank" rel="noopener noreferrer">
              <WaIcon /> Buy on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
