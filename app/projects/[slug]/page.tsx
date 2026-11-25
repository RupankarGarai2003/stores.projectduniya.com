import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCatalog, getProject } from '@/lib/catalog';
import { groupOf, slugify } from '@/lib/tech';
import { DELIVERABLES, NETWORK, SITE, STEPS } from '@/lib/config';
import { breadcrumbs, pageMetadata } from '@/lib/seo';
import { inr } from '@/utils/format';
import { buyMessage, out, waLink } from '@/utils/links';
import BuyBox from '@/components/BuyBox';
import Cover from '@/components/Cover';
import { Ext, Tick, WaIcon } from '@/components/Icons';
import JsonLd from '@/components/JsonLd';
import ProjectCard from '@/components/ProjectCard';
import Reveal from '@/components/Reveal';
import SectionNav from '@/components/SectionNav';
import ShareButton from '@/components/ShareButton';
import PromoNetwork from '@/components/PromoNetwork';
import SaveToggle from '@/components/SaveToggle';

export const revalidate = 60;

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCatalog().projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const { project: p } = getProject(slug);
  if (!p) return { title: 'Page not found | ProjectDuniya Store', robots: { index: false } };
  return pageMetadata({
    title: `${p.title} - Project with Source Code & Report | ProjectDuniya Store`,
    description: `${p.tagline} Includes source code, report, PPT and viva notes. ${inr(p.price)}. Buy on WhatsApp.`,
    path: `/projects/${slug}`,
    autoImage: true,
  });
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const { project: p, category: cat, projects, categories } = getProject(slug);
  if (!p || !cat) notFound();

  const related = [
    ...projects.filter((x) => x.category === p.category && x.slug !== p.slug),
    ...projects.filter((x) => x.category !== p.category && x.featured),
  ].slice(0, 3);

  const layers = [...new Map(p.stack.map((t) => [groupOf(t).slug, groupOf(t)])).values()].map((g) => ({
    g,
    items: p.stack.filter((t) => groupOf(t).slug === g.slug),
  }));
  const fit = [
    p.difficulty === 'Beginner'
      ? 'Want a clear first project that is easy to run and explain'
      : p.difficulty === 'Advanced'
        ? 'Are comfortable with the technology and want a project that stands out'
        : 'Know the basics and want a solid, demo-ready project',
    p.level === 'Mini' ? 'Need something quick for an assignment or internship' : 'Need a complete project for your final year submission',
    `Want to learn ${p.stack.slice(0, 3).join(', ')} by reading working code`,
  ];
  const path = `/projects/${p.slug}`;
  const deliver: [string, string][] = p.deliverables ? p.deliverables.map((d) => [d, '']) : DELIVERABLES;

  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: p.title,
            sku: p.code,
            description: p.description,
            category: cat.name,
            image: `${SITE.url}/og-default.png`,
            brand: { '@type': 'Brand', name: 'ProjectDuniya' },
            offers: {
              '@type': 'Offer',
              url: SITE.url + path,
              price: p.price,
              priceCurrency: 'INR',
              availability: 'https://schema.org/InStock',
              seller: { '@type': 'Organization', name: 'ProjectDuniya' },
            },
          },
          breadcrumbs([['Store', '/'], [cat.name, `/category/${p.category}`], [p.title, path]]),
        ]}
      />

      <section className="page-head">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Store</Link><span>/</span>
            <Link href={`/category/${cat.slug}`}>{cat.name}</Link><span>/</span><b>{p.title}</b>
          </nav>
        </div>
      </section>

      <div className="wrap pdp">
        <div className="pdp-main">
          <Cover p={p} cat={cat} big />
          <div className="meta meta-lg">
            <span>{p.code}</span><Link href={`/category/${cat.slug}`}>{cat.name}</Link><span>{p.level}</span><span>{p.difficulty}</span>
          </div>
          <h1>{p.title}</h1>
          <p className="lead">{p.tagline}</p>
          <div className="pdp-actions"><ShareButton title={p.title} url={SITE.url + path} /><SaveToggle slug={p.slug} /></div>

          <SectionNav items={[['about', 'About'], ['features', 'Features'], ['technology', 'Technology'], ['included', 'What you get'], ['buy', 'How to buy']]} />

          <h2 id="about">About this project</h2>
          <p>{p.description}</p>

          <h2 id="features">Key features</h2>
          <ul className="ticks ticks-lg">
            {p.features.map((f) => <li key={f}><Tick />{f}</li>)}
          </ul>

          <h2 id="technology">Technology</h2>
          <div className="layers">
            {layers.map(({ g, items }, n) => (
              <Reveal key={g.slug} delay={n * 70}>
                <div className="layer" style={{ ['--h' as string]: g.hue }}>
                  <Link href={`/tech/${g.slug}`} className="layer-name"><span>{g.glyph}</span>{g.name}</Link>
                  <ul className="stack">
                    {items.map((t) => <li key={t}><Link href={`/tech/${slugify(t)}`}>{t}</Link></li>)}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="fit">
            <h3>Good fit if you</h3>
            <ul className="ticks">
              {fit.map((t) => <li key={t}><Tick />{t}</li>)}
            </ul>
          </div>

          <h2 id="included">What you get</h2>
          <ul className="deliver">
            {deliver.map(([t, d]) => (
              <li key={t}><Tick /><div><b>{t}</b>{d && <span>{d}</span>}</div></li>
            ))}
          </ul>

          <h2 id="buy">How to buy</h2>
          <ol className="steps steps-compact">
            {STEPS.map(([t, d], n) => <li key={t}><span className="step-n">{n + 1}</span><h3>{t}</h3><p>{d}</p></li>)}
          </ol>

          <div className="learn">
            <h2>Learn more about this project</h2>
            <ul>
              {p.blogUrl && (
                <li><a href={out(p.blogUrl, '', 'project_guide')}>{p.blogLabel}<Ext /></a><span>Read on the ProjectDuniya blog</span></li>
              )}
              <li><a href={out(NETWORK.blogs, cat.blog, 'project_category_blog')}>{cat.blogLabel}<Ext /></a><span>More tutorials and ideas on the blog</span></li>
              <li><a href={out(NETWORK.main, '/contact', 'project_custom')}>Need this customised?<Ext /></a><span>Request a custom version on projectduniya.com</span></li>
              <li><a href={out(NETWORK.tools, '/tools/pdf-merger', 'project_tools')}>Merge your report PDFs for free<Ext /></a><span>Also: image compressor, word counter and 60+ more tools</span></li>
            </ul>
          </div>
        </div>
        <div className="pdp-side">
          <BuyBox p={p} />
          <dl className="facts">
            <div><dt>Project code</dt><dd>{p.code}</dd></div>
            <div><dt>Level</dt><dd>{p.level}</dd></div>
            <div><dt>Difficulty</dt><dd>{p.difficulty}</dd></div>
            <div><dt>Last updated</dt><dd>{p.updated}</dd></div>
          </dl>
          <a className="side-promo" href={out(NETWORK.tools, '/tools', 'project_side_tools')}>
            <b>Free tools for your report</b>
            <span>PDF merger, image compressor and 60+ more on tools.ProjectDuniya.com<Ext /></span>
          </a>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section section-tint">
          <div className="wrap">
            <div className="section-head"><h2>More projects like this</h2><Link href="/projects">All projects</Link></div>
            <div className="grid">
              {related.map((x, n) => <ProjectCard key={x.slug} p={x} index={n} cat={categories.find((c) => c.slug === x.category)} />)}
            </div>
          </div>
        </section>
      )}

      <PromoNetwork campaign="project" cat={cat} />

      <div className="stickybuy">
        <div><b>{inr(p.price)}</b><span>{p.code}</span></div>
        <a className="btn btn-buy" href={waLink(buyMessage(p))} target="_blank" rel="noopener noreferrer"><WaIcon /> Buy on WhatsApp</a>
      </div>
    </>
  );
}
