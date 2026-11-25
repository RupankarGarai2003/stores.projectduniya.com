import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import type { Catalog, Category, Project } from './types';
import { buildTech, hasGroup, hasTech } from './tech';

const dir = path.join(process.cwd(), 'lib', 'data');

function readJson<T>(name: string): T {
  return JSON.parse(fs.readFileSync(path.join(dir, name), 'utf8')) as T;
}

// Reads projects.json and categories.json. Pages revalidate every 60 seconds,
// so edits to the JSON show up without a rebuild.
export function getCatalog(): Catalog {
  const categories = readJson<Category[]>('categories.json');
  const known = new Set(categories.map((c) => c.slug));
  const projects = readJson<Omit<Project, 'discount'>[]>('projects.json')
    .filter((p) => p.published !== false && known.has(p.category))
    .map((p) => ({
      ...p,
      discount: p.originalPrice > p.price ? Math.round((1 - p.price / p.originalPrice) * 100) : 0,
    }));
  return { categories, projects };
}

export function getProject(slug: string) {
  const { projects, categories } = getCatalog();
  const project = projects.find((p) => p.slug === slug);
  const category = categories.find((c) => c.slug === project?.category);
  return { project, category, projects, categories };
}

export function getCategory(slug: string) {
  const { projects, categories } = getCatalog();
  const category = categories.find((c) => c.slug === slug);
  return { category, projects, categories };
}

// Tech categories (derived from each project's stack, see lib/tech.ts).
export function getTechCatalog() {
  const { projects, categories } = getCatalog();
  return { projects, categories, ...buildTech(projects) };
}

// A slug is either a tech category (e.g. "backend-apis") or one technology (e.g. "react").
export function getTechPage(slug: string) {
  const all = getTechCatalog();
  const group = all.groups.find((g) => g.slug === slug);
  const tech = all.techs.find((t) => t.slug === slug);
  const list: Project[] = group
    ? all.projects.filter((p) => hasGroup(p, group.slug))
    : tech
      ? all.projects.filter((p) => hasTech(p, tech.slug))
      : [];
  return { ...all, group, tech, list };
}
