import type { MetadataRoute } from 'next';
import { getTechCatalog } from '@/lib/catalog';
import { SITE } from '@/lib/config';

export const revalidate = 60;

export default function sitemap(): MetadataRoute.Sitemap {
  const { categories, projects, groups, techs } = getTechCatalog();
  const at = (p: string) => SITE.url + p;
  return [
    { url: at('/'), priority: 1.0 },
    { url: at('/projects'), priority: 0.9 },
    { url: at('/tech'), priority: 0.8 },
    { url: at('/how-to-buy'), priority: 0.5 },
    ...groups.map((g) => ({ url: at(`/tech/${g.slug}`), priority: 0.7 })),
    ...techs.map((t) => ({ url: at(`/tech/${t.slug}`), priority: 0.6 })),
    ...categories.map((c) => ({ url: at(`/category/${c.slug}`), priority: 0.8 })),
    ...projects.map((p) => ({ url: at(`/projects/${p.slug}`), lastModified: p.updated, priority: 0.7 })),
  ];
}
