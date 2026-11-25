import Link from 'next/link';
import type { Metadata } from 'next';
import { getTechCatalog } from '@/lib/catalog';
import { breadcrumbs, pageMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import PromoNetwork from '@/components/PromoNetwork';
import Reveal from '@/components/Reveal';

export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: 'Projects by Technology: React, Python, Flutter, SQL & More | ProjectDuniya Store',
  description: 'Browse ready-made projects by technology and tech category: frontend, backend, databases, AI and ML, data tools, mobile and IoT. Prices shown, buy on WhatsApp.',
  path: '/tech',
});

export default function TechIndex() {
  const { groups, techs, projects } = getTechCatalog();
  return (
    <>
      <JsonLd data={breadcrumbs([['Store', '/'], ['Technologies', '/tech']])} />
      <section className="page-head page-head-fx">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Store</Link><span>/</span><b>Technologies</b></nav>
          <h1>Browse projects by technology</h1>
          <p className="lead">{techs.length} technologies across {groups.length} tech categories and {projects.length} projects. Pick the stack you want to learn or present.</p>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <div className="tg-grid tg-grid-lg">
            {groups.map((g, n) => (
              <Reveal key={g.slug} delay={n * 60}>
                <div className="tg-card" style={{ ['--h' as string]: g.hue }}>
                  <Link href={`/tech/${g.slug}`} className="tg-head">
                    <span className="tg-glyph">{g.glyph}</span>
                    <span><h3>{g.name}</h3><small>{g.blurb}</small></span>
                  </Link>
                  <ul className="tchips">
                    {g.techs.map((t) => <li key={t.slug}><Link href={`/tech/${t.slug}`}>{t.name}<em>{t.count}</em></Link></li>)}
                  </ul>
                  <Link href={`/tech/${g.slug}`} className="tg-more">{g.count} {g.count === 1 ? 'project' : 'projects'} <i>→</i></Link>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <h2>All technologies</h2>
            <ul className="cloud">
              {techs.map((t) => (
                <li key={t.slug}><Link href={`/tech/${t.slug}`}>{t.name}<em>{t.count}</em></Link></li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
      <PromoNetwork campaign="tech" />
    </>
  );
}
