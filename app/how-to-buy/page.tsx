import Link from 'next/link';
import type { Metadata } from 'next';
import { FAQS, NETWORK, STEPS } from '@/lib/config';
import { breadcrumbs, faqSchema, pageMetadata } from '@/lib/seo';
import { out } from '@/utils/links';
import Faq from '@/components/Faq';
import JsonLd from '@/components/JsonLd';
import PromoNetwork from '@/components/PromoNetwork';

export const metadata: Metadata = pageMetadata({
  title: 'How to Buy a Project on WhatsApp | ProjectDuniya Store',
  description: 'Pick a project, tap Buy on WhatsApp, confirm details and payment with the team, then receive your files and setup help.',
  path: '/how-to-buy',
});

export default function HowToBuy() {
  return (
    <>
      <JsonLd data={[breadcrumbs([['Store', '/'], ['How to buy', '/how-to-buy']]), faqSchema(FAQS)]} />
      <section className="page-head">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Store</Link><span>/</span><b>How to buy</b></nav>
          <h1>How to buy a project</h1>
          <p className="lead">There is no cart or checkout. You talk to the team on WhatsApp, the same way as on projectduniya.com.</p>
        </div>
      </section>
      <section className="section tight">
        <div className="wrap">
          <ol className="steps">
            {STEPS.map(([t, d], n) => <li key={t}><span className="step-n">{n + 1}</span><h3>{t}</h3><p>{d}</p></li>)}
          </ol>
          <p className="fine">Before you submit anything, read our <a href={out(NETWORK.main, '/academic-integrity', 'howto_integrity')}>academic integrity</a> page and your institution’s rules.</p>
          <div className="narrow"><h2>Questions</h2><Faq items={FAQS} /></div>
        </div>
      </section>
      <PromoNetwork campaign="howto" />
    </>
  );
}
