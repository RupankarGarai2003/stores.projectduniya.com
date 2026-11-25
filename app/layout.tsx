import type { Metadata, Viewport } from 'next';
import { getTechCatalog } from '@/lib/catalog';
import { SITE } from '@/lib/config';
import Announcement from '@/components/Announcement';
import CompareTray from '@/components/CompareTray';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import type { SearchItem } from '@/components/SearchPalette';
import { inr } from '@/utils/format';
import NetworkBar from '@/components/NetworkBar';
import ScrollProgress from '@/components/ScrollProgress';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Final Year Projects with Source Code, Report & PPT | ProjectDuniya Store',
    template: '%s | ProjectDuniya Store',
  },
  description: 'Explore ready-made final year and mini projects with source code, project reports, PPT presentations and viva notes. Compare features and prices, then enquire on WhatsApp.',
  applicationName: 'ProjectDuniya Store',
  category: 'Education',
  keywords: ['final year projects', 'mini projects', 'project source code', 'engineering projects', 'college projects', 'project report', 'PPT presentation', 'viva questions', 'MERN stack projects', 'Python projects', 'AI and machine learning projects'],
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = {
  themeColor: '#4f46e5',
};

const THEME_SCRIPT = "try{var t=localStorage.getItem('pd-theme');if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){}";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { categories, groups, projects, techs } = getTechCatalog();
  const items: SearchItem[] = [
    ...projects.map((p) => ({ type: 'Project' as const, title: p.title, sub: `${p.code} · ${inr(p.price)}`, href: `/projects/${p.slug}`, hay: [p.title, p.code, p.tagline, ...p.stack].join(' ').toLowerCase() })),
    ...categories.map((c) => ({ type: 'Category' as const, title: c.name, sub: c.blurb, href: `/category/${c.slug}`, hay: `${c.name} ${c.blurb}`.toLowerCase() })),
    ...groups.map((g) => ({ type: 'Tech category' as const, title: g.name, sub: g.techs.slice(0, 4).map((t) => t.name).join(' · '), href: `/tech/${g.slug}`, hay: `${g.name} ${g.blurb} ${g.techs.map((t) => t.name).join(' ')}`.toLowerCase() })),
    ...techs.map((t) => ({ type: 'Technology' as const, title: t.name, sub: `${t.count} ${t.count === 1 ? 'project' : 'projects'}`, href: `/tech/${t.slug}`, hay: t.name.toLowerCase() })),
  ];
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=DM+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <ScrollProgress />
        <Announcement />
        <NetworkBar />
        <Header categories={categories} groups={groups} items={items} />
        <main id="main">{children}</main>
        <Footer categories={categories} groups={groups} />
        <CompareTray items={projects.map((p) => ({ slug: p.slug, title: p.title, code: p.code }))} />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
