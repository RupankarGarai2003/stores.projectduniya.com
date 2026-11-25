import type { Metadata } from 'next';
import Link from 'next/link';
import { getCatalog } from '@/lib/catalog';
import { pageMetadata } from '@/lib/seo';
import SavedProjects from '@/components/SavedProjects';

export const metadata: Metadata = pageMetadata({ title: 'Saved Projects | ProjectDuniya Store', description: 'Revisit the final year and mini projects you saved on ProjectDuniya Store.', path: '/saved', noindex: true });

export default function SavedPage() {
  const { projects, categories } = getCatalog();
  return <>
    <section className="page-head"><div className="wrap"><nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Store</Link><span>/</span><b>Saved projects</b></nav><h1>Your saved projects</h1><p className="lead">Keep a shortlist of projects you want to revisit or compare.</p></div></section>
    <section className="section tight"><div className="wrap"><SavedProjects projects={projects} categories={categories} /></div></section>
  </>;
}
