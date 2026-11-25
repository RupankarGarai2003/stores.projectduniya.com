import { Suspense } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getCatalog, getTechCatalog } from '@/lib/catalog';
import { breadcrumbs, itemList, pageMetadata } from '@/lib/seo';
import GridSkeleton from '@/components/GridSkeleton';
import JsonLd from '@/components/JsonLd';
import PromoNetwork from '@/components/PromoNetwork';
import StoreBrowser from '@/components/StoreBrowser';

export const revalidate = 60;

const TITLE = 'All Projects with Source Code, Report & PPT | ProjectDuniya Store';

function description(count: number) {
  return `Browse ${count} completed projects in web development, AI, data analytics, Python and mobile apps. Prices shown, buy on WhatsApp.`;
}

export function generateMetadata(): Metadata {
  return pageMetadata({ title: TITLE, description: description(getCatalog().projects.length), path: '/projects' });
}

export default function AllProjects() {
  const { projects, categories, techs } = getTechCatalog();
  return (
    <>
      <JsonLd data={[breadcrumbs([['Store', '/'], ['All projects', '/projects']]), itemList(projects.map((p) => ({ name: p.title, path: `/projects/${p.slug}` })))]} />
      <section className="page-head">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Store</Link><span>/</span><b>All projects</b></nav>
          <h1>All projects</h1>
          <p className="lead">Pick a project to see what is included and its price. Filter by project category, technology or level.</p>
        </div>
      </section>
      <section className="section tight">
        <div className="wrap">
          <Suspense fallback={<GridSkeleton />}>
            <StoreBrowser projects={projects} categories={categories} techs={techs} />
          </Suspense>
        </div>
      </section>
      <PromoNetwork campaign="store" />
    </>
  );
}
