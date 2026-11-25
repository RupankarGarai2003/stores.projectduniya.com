'use client';

import Link from 'next/link';
import { useSavedProjects } from './saved';

export default function SavedCount() {
  const { list } = useSavedProjects();
  return <Link href="/saved" className="saved-nav" aria-label={`Saved projects, ${list.length} items`}><span aria-hidden="true">♡</span> Saved{list.length > 0 && <b>{list.length}</b>}</Link>;
}
