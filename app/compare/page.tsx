import Link from 'next/link';
import type { Metadata } from 'next';
import { getTechCatalog } from '@/lib/catalog';
import { slugify } from '@/lib/tech';
import { pageMetadata } from '@/lib/seo';
import { inr } from '@/utils/format';
import { buyMessage, waLink } from '@/utils/links';
import { WaIcon } from '@/components/Icons';
import PromoNetwork from '@/components/PromoNetwork';

export const metadata: Metadata = pageMetadata({
  title: 'Compare Projects Side by Side | ProjectDuniya Store',
  description: 'Compare price, level, technology and features of up to three projects.',
  path: '/compare',
  noindex: true,
});

type Props = { searchParams: Promise<{ p?: string }> };

export default async function Compare({ searchParams }: Props) {
  const { p = '' } = await searchParams;
  const { projects, categories } = getTechCatalog();
  const picked = p.split(',').map((s) => projects.find((x) => x.slug === s)).filter((x) => !!x).slice(0, 3) as typeof projects;
  const cat = (slug: string) => categories.find((c) => c.slug === slug)?.name ?? '';

  const rows: [string, (x: (typeof projects)[number]) => React.ReactNode][] = [
    ['Price', (x) => <b className="cmp-price">{inr(x.price)}{x.discount > 0 && <s>{inr(x.originalPrice)}</s>}</b>],
    ['Category', (x) => cat(x.category)],
    ['Level', (x) => x.level],
    ['Difficulty', (x) => x.difficulty],
    ['Technology', (x) => (
      <ul className="tchips">{x.stack.map((s) => <li key={s}><Link href={`/tech/${slugify(s)}`}>{s}</Link></li>)}</ul>
    )],
    ['Key features', (x) => (
      <ul className="cmp-list">{x.features.map((f) => <li key={f}>{f}</li>)}</ul>
    )],
  ];

  return (
    <>
      <section className="page-head page-head-fx">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Store</Link><span>/</span><b>Compare</b></nav>
          <h1>Compare projects</h1>
          <p className="lead">See price, technology and features side by side, then buy the one that fits.</p>
        </div>
      </section>
      <section className="section tight">
        <div className="wrap">
          {picked.length >= 2 ? (
            <div className="cmp-wrap">
              <table className="cmp">
                <thead>
                  <tr>
                    <td />
                    {picked.map((x) => (
                      <th key={x.slug} scope="col">
                        <small>{x.code}</small>
                        <Link href={`/projects/${x.slug}`}>{x.title}</Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map(([label, cell]) => (
                    <tr key={label}>
                      <th scope="row">{label}</th>
                      {picked.map((x) => <td key={x.slug}>{cell(x)}</td>)}
                    </tr>
                  ))}
                  <tr>
                    <td />
                    {picked.map((x) => (
                      <td key={x.slug}>
                        <a className="btn btn-buy" href={waLink(buyMessage(x))} target="_blank" rel="noopener noreferrer"><WaIcon /> Buy on WhatsApp</a>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty">
              <h2>Pick at least two projects</h2>
              <p>Tap <b>+ Compare</b> on any project card, then open the compare tray at the bottom of the page.</p>
              <Link className="btn btn-brand" href="/projects">Browse projects</Link>
            </div>
          )}
        </div>
      </section>
      <PromoNetwork campaign="compare" />
    </>
  );
}
