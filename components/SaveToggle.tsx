'use client';

import { useSavedProjects } from './saved';

export default function SaveToggle({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const { list, toggle } = useSavedProjects();
  const saved = list.includes(slug);
  return (
    <button
      type="button"
      className={`save-btn${saved ? ' on' : ''}${compact ? ' save-btn-icon' : ''}`}
      aria-pressed={saved}
      aria-label={saved ? 'Remove from saved projects' : 'Save project'}
      title={saved ? 'Saved — click to remove' : 'Save project'}
      onClick={() => toggle(slug)}
    >
      <span aria-hidden="true">{saved ? '♥' : '♡'}</span>{compact ? <span className="sr">{saved ? 'Saved' : 'Save'}</span> : saved ? 'Saved' : 'Save project'}
    </button>
  );
}
