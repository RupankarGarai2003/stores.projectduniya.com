import type { Metadata } from 'next';
import { SITE } from './config';

const MAIN = 'https://www.projectduniya.com';

export const ORG = {
  '@type': 'Organization',
  name: 'ProjectDuniya',
  url: MAIN,
  logo: `${MAIN}/logo.png`,
  sameAs: [
    'https://blogs.projectduniya.com',
    'https://tools.projectduniya.com',
    'https://www.instagram.com/projectduniya.help',
    'https://t.me/HiringAlertt',
  ],
};

type PageMeta = {
  title: string;
  description: string;
  path: string;
  type?: 'website';
  noindex?: boolean;
  autoImage?: boolean; // let an opengraph-image route supply the share image
};

export function pageMetadata({ title, description, path, noindex = false, autoImage = false }: PageMeta): Metadata {
  const image = { url: '/og-default.png', width: 1200, height: 630 };
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, 'max-image-preview': 'large' },
    openGraph: {
      siteName: SITE.name,
      type: 'website',
      title,
      description,
      url: path,
      ...(autoImage ? {} : { images: [image] }),
    },
    twitter: { card: 'summary_large_image', title, description, ...(autoImage ? {} : { images: [image.url] }) },
  };
}

export function breadcrumbs(items: [string, string][]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, p], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: SITE.url + p,
    })),
  };
}

export function faqSchema(items: [string, string][]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
}

export function itemList(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, url: SITE.url + it.path })),
  };
}
