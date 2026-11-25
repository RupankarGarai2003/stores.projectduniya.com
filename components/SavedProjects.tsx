'use client';

import Link from 'next/link';
import type { Category, Project } from '@/lib/types';
import { useSavedProjects } from './saved';
import ProjectCard from './ProjectCard';

type Props = { projects: Project[]; categories: Category[] };

export default function SavedProjects({ projects, categories }: Props) {
  const { list, clear } = useSavedProjects();
  const saved = list.map((slug) => projects.find((p) => p.slug === slug)).filter((p): p is Project => !!p);
  return (
    <>
      <div className="saved-toolbar"><p aria-live="polite">{saved.length} saved {saved.length === 1 ? 'project' : 'projects'}</p>{saved.length > 0 && <button type="button" onClick={clear}>Clear saved list</button>}</div>
      {saved.length ? <div className="grid">{saved.map((p, i) => <ProjectCard key={p.slug} p={p} index={i} cat={categories.find((c) => c.slug === p.category)} />)}</div> : (
        <div className="saved-empty"><span aria-hidden="true">♡</span><h2>Your saved projects will appear here</h2><p>Save projects you want to revisit or compare later.</p><Link className="btn btn-brand" href="/projects">Explore projects</Link></div>
      )}
    </>
  );
}
