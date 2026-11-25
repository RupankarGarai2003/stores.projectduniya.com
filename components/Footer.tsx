import Link from 'next/link';
import { NETWORK, SITE } from '@/lib/config';
import type { TechGroup } from '@/lib/tech';
import type { Category } from '@/lib/types';
import { out } from '@/utils/links';

export default function Footer({ categories = [], groups = [] }: { categories?: Category[]; groups?: TechGroup[] }) {
  const L = (base: string, path: string, label: string, c: string) => (
    <li><a href={out(base, path, c)}>{label}</a></li>
  );
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <div className="logo logo-foot"><span className="logo-mark">PD</span><span>ProjectDuniya <b>Store</b></span></div>
          <p>Completed projects with source code, report, PPT and viva notes. Read the details, then buy directly on WhatsApp.</p>
          <p className="fine">
            <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a><br />
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
        </div>
        <div>
          <h4>Project categories</h4>
          <ul>
            <li><Link href="/projects">All projects</Link></li>
            {categories.map((c) => <li key={c.slug}><Link href={`/category/${c.slug}`}>{c.name}</Link></li>)}
            <li><Link href="/how-to-buy">How to buy</Link></li>
          </ul>
        </div>
        <div>
          <h4>Tech categories</h4>
          <ul>
            <li><Link href="/tech">All technologies</Link></li>
            {groups.map((g) => <li key={g.slug}><Link href={`/tech/${g.slug}`}>{g.name}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4>ProjectDuniya</h4>
          <ul>
            {L(NETWORK.main, '/', 'ProjectDuniya.com', 'footer')}
            {L(NETWORK.main, '/services', 'Project help services', 'footer')}
            {L(NETWORK.main, '/project-ideas', 'Project ideas (120+)', 'footer')}
            {L(NETWORK.main, '/contact', 'Get a custom project', 'footer')}
            {L(NETWORK.blogs, '/', 'Blogs', 'footer')}
            {L(NETWORK.tools, '/', 'Free online tools', 'footer')}
          </ul>
        </div>
        <div>
          <h4>Policies</h4>
          <ul>
            {L(NETWORK.main, '/refund-policy', 'Refund & cancellation', 'footer_legal')}
            {L(NETWORK.main, '/academic-integrity', 'Academic integrity', 'footer_legal')}
            {L(NETWORK.main, '/privacy', 'Privacy policy', 'footer_legal')}
            {L(NETWORK.main, '/terms', 'Terms of service', 'footer_legal')}
          </ul>
          <h4>Follow</h4>
          <ul>
            <li><a href={SITE.instagram}>Instagram</a></li>
            <li><a href={SITE.telegram}>Telegram</a></li>
            <li><a href={SITE.facebook}>Facebook</a></li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-base">© 2026 ProjectDuniya. Made in India.</div>
    </footer>
  );
}
