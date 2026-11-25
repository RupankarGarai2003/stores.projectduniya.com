import Link from 'next/link';
import type { Metadata } from 'next';
import { getTechCatalog } from '@/lib/catalog';

export const metadata: Metadata = {
  title: { absolute: 'Page not found | ProjectDuniya Store' },
  description: 'This page does not exist.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  const { categories, groups } = getTechCatalog();
  return (
    <div className="wrap state">
      <p className="nf-code" aria-hidden="true">404</p>
      <h1>That page does not exist</h1>
      <p>The project may have been renamed or removed. Try a category or a technology instead.</p>
      <div className="chips chips-center">
        {categories.map((c) => <Link key={c.slug} href={`/category/${c.slug}`}>{c.name}</Link>)}
        {groups.map((g) => <Link key={g.slug} href={`/tech/${g.slug}`}>{g.name}</Link>)}
      </div>
      <p><Link className="btn btn-brand" href="/projects">Browse all projects</Link></p>
    </div>
  );
}
