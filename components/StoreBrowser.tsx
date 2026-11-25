'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { hasTech } from '@/lib/tech';
import type { Tech } from '@/lib/tech';
import type { Category, Project } from '@/lib/types';
import { inr } from '@/utils/format';
import { waLink } from '@/utils/links';
import ProjectCard from './ProjectCard';
import { WaIcon } from './Icons';

const SORTS: Record<string, string> = {
  popular: 'Popular first',
  low: 'Price: low to high',
  high: 'Price: high to low',
  new: 'Newest',
};

type Props = {
  projects: Project[];
  categories: Category[];
  cat?: Category;
  techs?: Tech[]; // technologies offered in the Technology filter
  hideCategoryChips?: boolean;
};

// Search, project-category, technology and level filters, plus sort.
// The state lives in the URL (?q=&tech=&level=&sort=).
export default function StoreBrowser({ projects, categories, cat, techs = [], hideCategoryChips }: Props) {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const q = sp.get('q') || '';
  const level = sp.get('level') || '';
  const tech = sp.get('tech') || '';
  const diff = sp.get('diff') || '';
  const max = Number(sp.get('max')) || 0;
  const sort = sp.get('sort') || 'popular';

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    const filtered = projects.filter(
      (p) =>
        (!cat || p.category === cat.slug) &&
        (!level || p.level === level) &&
        (!tech || hasTech(p, tech)) &&
        (!diff || p.difficulty === diff) &&
        (!max || p.price <= max) &&
        (!term || [p.title, p.tagline, p.code, ...p.stack].join(' ').toLowerCase().includes(term))
    );
    const by: Record<string, (a: Project, b: Project) => number> = {
      low: (a, b) => a.price - b.price,
      high: (a, b) => b.price - a.price,
      new: (a, b) => b.updated.localeCompare(a.updated),
    };
    return [...filtered].sort(by[sort] ?? ((a, b) => Number(!!b.featured) - Number(!!a.featured)));
  }, [projects, cat, q, level, tech, diff, max, sort]);

  const set = (k: string, v: string) => {
    const n = new URLSearchParams(sp.toString());
    if (v) n.set(k, v);
    else n.delete(k);
    const qs = n.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const active = [q && `“${q}”`, tech && techs.find((t) => t.slug === tech)?.name, level, diff, max ? `Up to ${inr(max)}` : ''].filter(Boolean) as string[];
  const clear = () => router.replace(pathname, { scroll: false });
  const filterKey = [q, level, tech, diff, max, sort].join('|');

  return (
    <>
      {!hideCategoryChips && (
        <div className="chips chips-row">
          <Link href="/projects" className={!cat ? 'on' : ''}>All</Link>
          {categories.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className={cat?.slug === c.slug ? 'on' : ''}>{c.name}</Link>
          ))}
        </div>
      )}
      <div className="filters">
        <label className="field grow"><span>Search</span>
          <input type="search" value={q} onChange={(e) => set('q', e.target.value)} placeholder="Title, technology or code like PD-101" />
        </label>
        {techs.length > 0 && (
          <label className="field"><span>Technology</span>
            <select value={tech} onChange={(e) => set('tech', e.target.value)}>
              <option value="">All technologies</option>
              {techs.map((t) => <option key={t.slug} value={t.slug}>{t.name} ({t.count})</option>)}
            </select>
          </label>
        )}
        <label className="field"><span>Level</span>
          <select value={level} onChange={(e) => set('level', e.target.value)}>
            <option value="">All levels</option>
            <option>Final year</option>
            <option>Mini</option>
          </select>
        </label>
        <label className="field"><span>Difficulty</span>
          <select value={diff} onChange={(e) => set('diff', e.target.value)}>
            <option value="">Any difficulty</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </label>
        <label className="field"><span>Budget</span>
          <select value={max ? String(max) : ''} onChange={(e) => set('max', e.target.value)}>
            <option value="">Any price</option>
            <option value="1500">Up to {inr(1500)}</option>
            <option value="2500">Up to {inr(2500)}</option>
            <option value="3500">Up to {inr(3500)}</option>
            <option value="5000">Up to {inr(5000)}</option>
          </select>
        </label>
        <label className="field"><span>Sort by</span>
          <select value={sort} onChange={(e) => set('sort', e.target.value)}>
            {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </label>
      </div>
      <div className="count-row">
        <p className="count" aria-live="polite">{list.length} {list.length === 1 ? 'project' : 'projects'}</p>
        {active.length > 0 && (
          <p className="active-filters">
            {active.map((a) => <span key={a}>{a}</span>)}
            <button type="button" onClick={clear}>Clear all</button>
          </p>
        )}
      </div>

      {list.length ? (
        <div className="grid" key={filterKey}>
          {list.map((p, n) => <ProjectCard key={p.slug} p={p} index={n} cat={categories.find((c) => c.slug === p.category)} />)}
        </div>
      ) : (
        <div className="empty">
          <h2>No projects match that search</h2>
          <p>Clear the filters, or tell us the topic you need and we will tell you if we have it or can build it.</p>
          <a
            className="btn btn-buy"
            href={waLink(`Hi ProjectDuniya, I could not find a project for: ${q || 'my topic'}`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WaIcon /> Ask on WhatsApp
          </a>
        </div>
      )}
    </>
  );
}
