import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCatalog, getCategory, getTechCatalog } from '@/lib/catalog';
import { hasTech } from '@/lib/tech';
import { breadcrumbs, pageMetadata } from '@/lib/seo';
import GridSkeleton from '@/components/GridSkeleton';
import JsonLd from '@/components/JsonLd';
import PromoNetwork from '@/components/PromoNetwork';
import StoreBrowser from '@/components/StoreBrowser';

export const revalidate = 60;

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCatalog().categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const { category, projects } = getCategory(slug);
  if (!category) return { title: 'Page not found | ProjectDuniya Store', robots: { index: false } };
  const count = projects.filter((p) => p.category === slug).length;
  return pageMetadata({
    title: `${category.name} Projects with Source Code | ProjectDuniya Store`,
    description: `${category.name} projects: ${category.blurb}. ${count} ready-made projects with report, PPT and viva notes. Buy on WhatsApp.`,
    path: `/category/${slug}`,
  });
}

export default async function CategoryPage({ params }: Params) {
  const { slug } = await params;
  const { category, projects, categories } = getCategory(slug);
  if (!category) notFound();
  const { techs } = getTechCatalog();
  const here = projects.filter((p) => p.category === slug);
  const catTechs = techs.filter((t) => here.some((p) => hasTech(p, t.slug))).map((t) => ({ ...t, count: here.filter((p) => hasTech(p, t.slug)).length }));

  return (
    <>
      <JsonLd data={breadcrumbs([['Store', '/'], [category.name, `/category/${slug}`]])} />
      <section className="page-head">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Store</Link><span>/</span>
            <Link href="/projects">Projects</Link><span>/</span><b>{category.name}</b>
          </nav>
          <h1>{category.name} projects</h1>
          <p className="lead">{category.blurb}</p>
        </div>
      </section>
      <section className="section tight">
        <div className="wrap">
          <Suspense fallback={<GridSkeleton />}>
            <StoreBrowser projects={projects} categories={categories} cat={category} techs={catTechs} />
          </Suspense>
        </div>
      </section>
      <PromoNetwork campaign="category" cat={category} />
    </>
  );
}
