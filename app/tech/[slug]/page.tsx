import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTechCatalog, getTechPage } from '@/lib/catalog';
import { breadcrumbs, pageMetadata } from '@/lib/seo';
import GridSkeleton from '@/components/GridSkeleton';
import JsonLd from '@/components/JsonLd';
import PromoNetwork from '@/components/PromoNetwork';
import StoreBrowser from '@/components/StoreBrowser';

export const revalidate = 60;

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const { groups, techs } = getTechCatalog();
  return [...groups.map((g) => ({ slug: g.slug })), ...techs.map((t) => ({ slug: t.slug }))];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const { group, tech, list } = getTechPage(slug);
  const name = group?.name ?? tech?.name;
  if (!name) return { title: 'Page not found | ProjectDuniya Store', robots: { index: false } };
  return pageMetadata({
    title: `${name} Projects with Source Code | ProjectDuniya Store`,
    description: `${list.length} ready-made ${name} ${list.length === 1 ? 'project' : 'projects'} with source code, report, PPT and viva notes. Prices shown, buy on WhatsApp.`,
    path: `/tech/${slug}`,
  });
}

export default async function TechPage({ params }: Params) {
  const { slug } = await params;
  const { group, tech, list, categories, groups, techs } = getTechPage(slug);
  const name = group?.name ?? tech?.name;
  if (!name) notFound();

  const parent = tech ? groups.find((g) => g.slug === tech.group) : undefined;
  const hue = group?.hue ?? parent?.hue ?? 243;
  // Technologies offered in the filter: the members of this category, or tools used together with this one.
  const filterTechs = group
    ? group.techs
    : techs.filter((t) => t.slug !== slug && list.some((p) => p.stack.some((s) => techs.find((x) => x.name === s)?.slug === t.slug)));

  return (
    <>
      <JsonLd data={breadcrumbs([['Store', '/'], ['Technologies', '/tech'], [name, `/tech/${slug}`]])} />
      <section className="page-head page-head-fx tech-head" style={{ ['--h' as string]: hue }}>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Store</Link><span>/</span>
            <Link href="/tech">Technologies</Link><span>/</span>
            {parent && <><Link href={`/tech/${parent.slug}`}>{parent.name}</Link><span>/</span></>}
            <b>{name}</b>
          </nav>
          <span className="eyebrow dark">{group ? 'Tech category' : 'Technology'}</span>
          <h1>{name} projects</h1>
          <p className="lead">
            {group
              ? `${group.blurb}. ${list.length} ${list.length === 1 ? 'project uses' : 'projects use'} tools from this category.`
              : `${list.length} ready-made ${list.length === 1 ? 'project uses' : 'projects use'} ${name}${parent ? `, part of ${parent.name}` : ''}.`}
          </p>
          {group && (
            <ul className="tchips tchips-lg">
              {group.techs.map((t) => <li key={t.slug}><Link href={`/tech/${t.slug}`}>{t.name}<em>{t.count}</em></Link></li>)}
            </ul>
          )}
        </div>
      </section>
      <section className="section tight">
        <div className="wrap">
          <Suspense fallback={<GridSkeleton />}>
            <StoreBrowser projects={list} categories={categories} techs={filterTechs} />
          </Suspense>
        </div>
      </section>
      <PromoNetwork campaign="tech_page" topic={tech?.name} />
    </>
  );
}
