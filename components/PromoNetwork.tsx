import { NETWORK } from '@/lib/config';
import type { Category } from '@/lib/types';
import { out } from '@/utils/links';
import { Ext } from './Icons';
import Reveal from './Reveal';

type Props = {
  campaign?: string;
  cat?: Category;
  topic?: string; // a technology or subject, used to point the blog link at related guides
};

// Cross-promotion band for ProjectDuniya.com, the blog and the free tools. Shown on every page.
export default function PromoNetwork({ campaign = 'promo', cat, topic }: Props) {
  const cards = [
    {
      k: 'main',
      site: 'ProjectDuniya.com',
      icon: 'PD',
      title: 'Need something built for you?',
      text: cat
        ? `Custom ${cat.serviceLabel.toLowerCase()} and guidance, quoted before work starts.`
        : 'Custom projects, coding help, research and viva support, quoted before work starts.',
      links: [
        [cat ? cat.serviceLabel : 'Project help services', cat ? cat.service : '/services'],
        ['Project ideas (120+)', '/project-ideas'],
        ['Request a custom project', '/contact'],
      ],
      cta: 'Visit ProjectDuniya.com',
      href: out(NETWORK.main, cat ? cat.service : '/services', campaign + '_main'),
      base: NETWORK.main,
    },
    {
      k: 'blogs',
      site: 'blogs.ProjectDuniya.com',
      icon: '✎',
      title: topic ? `Learn ${topic} before you buy` : 'Learn how it is built',
      text: topic
        ? `Tutorials and project guides about ${topic} on the ProjectDuniya blog.`
        : cat
          ? `${cat.blogLabel}, tutorials and project ideas on the ProjectDuniya blog.`
          : 'Project ideas, tutorials and student guides on the ProjectDuniya blog.',
      links: [
        ...(topic ? [[`Guides about ${topic}`, `/?s=${encodeURIComponent(topic)}`]] : []),
        ...(cat ? [[cat.blogLabel, cat.blog]] : []),
        ['All guides and tutorials', '/'],
      ].slice(0, 3),
      cta: 'Read the blog',
      href: out(NETWORK.blogs, topic ? `/?s=${encodeURIComponent(topic)}` : cat ? cat.blog : '/', campaign + '_blogs'),
      base: NETWORK.blogs,
    },
    {
      k: 'tools',
      site: 'tools.ProjectDuniya.com',
      icon: '⚙',
      title: 'Finish your submission',
      text: 'Merge PDFs, compress images, count words and more. 64+ free tools, no signup.',
      links: [
        ['PDF merger', '/tools/pdf-merger'],
        ['All free tools (64+)', '/tools'],
      ],
      cta: 'Open free tools',
      href: out(NETWORK.tools, '/tools', campaign + '_tools'),
      base: NETWORK.tools,
    },
  ];
  return (
    <section className="promo" aria-labelledby="promo-h">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">The ProjectDuniya network</span>
          <h2 id="promo-h">More from ProjectDuniya</h2>
        </Reveal>
        <div className="promo-grid">
          {cards.map((c, n) => (
            <Reveal key={c.k} delay={n * 90} className={'promo-card promo-' + c.k}>
              <span className="promo-icon" aria-hidden="true">{c.icon}</span>
              <small className="promo-site">{c.site}</small>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <ul className="promo-links">
                {c.links.map(([label, path]) => (
                  <li key={label}><a href={out(c.base, path, `${campaign}_${c.k}_link`)}>{label}<Ext /></a></li>
                ))}
              </ul>
              <a className="promo-cta" href={c.href}>{c.cta}<Ext /></a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
