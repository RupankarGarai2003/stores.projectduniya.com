import Link from 'next/link';
import type { Metadata } from 'next';
import { getTechCatalog } from '@/lib/catalog';
import { FAQS, NETWORK, SITE, STEPS } from '@/lib/config';
import { ORG, faqSchema, itemList, pageMetadata } from '@/lib/seo';
import { out, waLink } from '@/utils/links';
import Faq from '@/components/Faq';
import HeroSearch from '@/components/HeroSearch';
import { WaIcon } from '@/components/Icons';
import JsonLd from '@/components/JsonLd';
import ProjectCard from '@/components/ProjectCard';
import PromoNetwork from '@/components/PromoNetwork';
import Reveal from '@/components/Reveal';
import SpecSheet from '@/components/SpecSheet';
import TechMarquee from '@/components/TechMarquee';

export const revalidate = 60;

const TITLE = 'ProjectDuniya Store | Ready-Made Final Year Projects with Source Code';
const DESC =
  'Buy completed final year and mini projects with source code, report, PPT and viva notes. See details and price, then buy directly on WhatsApp.';

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESC, path: '/' });

export default function Home() {
  const { projects, categories, groups, techs } = getTechCatalog();
  const featured = projects.filter((p) => p.featured);
  const pool = featured.length ? featured : projects;
  const hero = pool.slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name, url: SITE.url, publisher: ORG, potentialAction: { '@type': 'SearchAction', target: `${SITE.url}/projects?q={search_term_string}`, 'query-input': 'required name=search_term_string' } },
          { '@context': 'https://schema.org', ...ORG },
          faqSchema(FAQS),
          itemList(pool.slice(0, 12).map((p) => ({ name: `${p.title} - ${p.code}`, path: `/projects/${p.slug}` }))),
        ]}
      />

      <section className="hero">
        <div className="hero-bg" aria-hidden="true"><i /><i /><i /></div>
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow fx-up">Final year &amp; mini projects</span>
            <h1 className="fx-up" style={{ ['--d' as string]: '80ms' }}>
              Finished projects, ready to <span className="grad">run, explain and submit.</span>
            </h1>
            <p className="lead fx-up" style={{ ['--d' as string]: '160ms' }}>
              Every project comes with source code, report, PPT and viva notes. Read what is inside, see the price, and buy straight on WhatsApp.
            </p>
            <div className="fx-up" style={{ ['--d' as string]: '240ms' }}><HeroSearch /></div>
            <p className="trust fx-up" style={{ ['--d' as string]: '320ms' }}>
              Built by the team behind <a href={out(NETWORK.main, '/', 'home_hero')}>ProjectDuniya.com</a>: 1000+ projects, 4+ years.
            </p>
          </div>
          {hero.length > 0 && <div className="fx-in" style={{ ['--d' as string]: '250ms' }}><SpecSheet projects={hero} cats={categories} /></div>}
        </div>
      </section>

      <TechMarquee techs={techs} />

      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <div><span className="eyebrow dark">Project categories</span><h2>Browse by project type</h2></div>
              <Link href="/projects" className="more-link">All projects →</Link>
            </div>
          </Reveal>
          <div className="cat-grid">
            {categories.map((c, n) => {
              const count = projects.filter((p) => p.category === c.slug).length;
              return (
                <Reveal key={c.slug} delay={n * 60}>
                  <Link href={`/category/${c.slug}`} className="cat-card" style={{ ['--h' as string]: c.hue }}>
                    <span className="cat-glyph">{c.glyph}</span>
                    <h3>{c.name}</h3>
                    <p>{c.blurb}</p>
                    <span className="cat-count">{count} {count === 1 ? 'project' : 'projects'} <i>→</i></span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <div><span className="eyebrow dark">Tech categories</span><h2>Browse by technology</h2></div>
              <Link href="/tech" className="more-link">All technologies →</Link>
            </div>
          </Reveal>
          <div className="tg-grid">
            {groups.map((g, n) => (
              <Reveal key={g.slug} delay={n * 60}>
                <div className="tg-card" style={{ ['--h' as string]: g.hue }}>
                  <Link href={`/tech/${g.slug}`} className="tg-head">
                    <span className="tg-glyph">{g.glyph}</span>
                    <span><h3>{g.name}</h3><small>{g.count} {g.count === 1 ? 'project' : 'projects'}</small></span>
                  </Link>
                  <ul className="tchips">
                    {g.techs.map((t) => <li key={t.slug}><Link href={`/tech/${t.slug}`}>{t.name}<em>{t.count}</em></Link></li>)}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <div>
                <span className="eyebrow dark">Best sellers</span>
                <h2>Popular final year projects with source code</h2>
                <p className="section-intro">Explore ready-made engineering and college projects with working source code, project documentation, presentation slides and viva preparation. Open any project to review its features, technology stack and current price.</p>
              </div>
              <Link href="/projects" className="more-link">See all {projects.length} projects →</Link>
            </div>
          </Reveal>
          <div className="grid">
            {pool.slice(0, 6).map((p, n) => (
              <ProjectCard key={p.slug} p={p} index={n} cat={categories.find((c) => c.slug === p.category)} />
            ))}
          </div>
          <div className="project-discovery">
            <div>
              <b>Looking for a specific topic?</b>
              <p>Browse the complete project catalogue or explore projects by technology, difficulty level and academic domain.</p>
            </div>
            <div className="project-discovery-links">
              <Link href="/projects">Explore all projects <span aria-hidden="true">→</span></Link>
              <Link href="/tech">Browse technologies <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-tint project-guide">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow dark">Find the right project</span>
            <h2>Explore student projects by domain and technology</h2>
            <p className="section-intro">Compare final year and mini project ideas by subject, difficulty and tech stack. Open a project to check its features, source-code details, documentation and price before you decide.</p>
          </Reveal>
          <div className="guide-grid">
            <Reveal>
              <Link className="guide-card" href="/projects">
                <span className="guide-icon">01</span>
                <span><b>Browse ready-made projects</b><small>Explore web development, AI and machine learning, data analytics, Python and software projects.</small></span>
                <i aria-hidden="true">→</i>
              </Link>
            </Reveal>
            <Reveal delay={70}>
              <Link className="guide-card" href="/tech">
                <span className="guide-icon">02</span>
                <span><b>Choose by technology</b><small>Find projects built with React, Node.js, Python, Java, PHP, SQL and other popular tools.</small></span>
                <i aria-hidden="true">→</i>
              </Link>
            </Reveal>
            <Reveal delay={140}>
              <Link className="guide-card" href="/how-to-buy">
                <span className="guide-icon">03</span>
                <span><b>Review details before buying</b><small>Understand project files, pricing, WhatsApp ordering and the steps from selection to delivery.</small></span>
                <i aria-hidden="true">→</i>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal><span className="eyebrow dark">Simple process</span><h2>How buying works</h2></Reveal>
          <ol className="steps">
            {STEPS.map(([t, d], n) => (
              <li key={t}><Reveal delay={n * 90}><span className="step-n">{n + 1}</span><h3>{t}</h3><p>{d}</p></Reveal></li>
            ))}
          </ol>
        </div>
      </section>

      <PromoNetwork campaign="home" />

      <section className="section">
        <div className="wrap">
          <Reveal className="custom">
            <div>
              <h2>Cannot find your topic?</h2>
              <p>Tell us what you need. We can customise a listed project or build a new one from scratch, with the quote confirmed before work starts.</p>
            </div>
            <div className="custom-actions">
              <a className="btn btn-buy btn-lg" href={waLink('Hi ProjectDuniya, I could not find my project topic in the store. Here is what I need:')} target="_blank" rel="noopener noreferrer">
                <WaIcon /> Tell us on WhatsApp
              </a>
              <a className="btn btn-ghost" href={out(NETWORK.main, '/contact', 'home_custom')}>Custom project form</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-tint">
        <div className="wrap narrow">
          <Reveal><h2>Questions</h2></Reveal>
          <Faq items={FAQS} />
        </div>
      </section>
    </>
  );
}
