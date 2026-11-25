import type { Project } from './types';

// Tech categories are DERIVED from each project's existing `stack` array.
// projects.json is not modified. A technology that is not listed below
// falls into "Other tools", so newly added projects always show up.

export type TechGroup = {
  slug: string;
  name: string;
  blurb: string;
  glyph: string;
  hue: number;
  members: string[];
};

export const TECH_GROUPS: TechGroup[] = [
  { slug: 'frontend-ui', name: 'Frontend & UI', blurb: 'Interfaces, state and styling', glyph: '◧', hue: 243,
    members: ['React', 'Redux', 'CSS', 'Tkinter', 'Streamlit'] },
  { slug: 'backend-apis', name: 'Backend & APIs', blurb: 'Servers, REST APIs and authentication', glyph: '{ }', hue: 160,
    members: ['Node.js', 'Express', 'Flask', 'JWT', 'Multer'] },
  { slug: 'databases-cloud', name: 'Databases & Cloud', blurb: 'Where the data lives', glyph: '⛁', hue: 200,
    members: ['MongoDB', 'SQLite', 'SQL', 'Firebase'] },
  { slug: 'ai-vision', name: 'AI, ML & Vision', blurb: 'Models, NLP and computer vision', glyph: 'AI', hue: 275,
    members: ['TensorFlow', 'scikit-learn', 'NLTK', 'OpenCV'] },
  { slug: 'data-bi', name: 'Data & BI Tools', blurb: 'Analysis, charts and dashboards', glyph: '∑', hue: 190,
    members: ['Pandas', 'Matplotlib', 'Power BI', 'DAX', 'Excel'] },
  { slug: 'mobile-iot', name: 'Mobile & IoT', blurb: 'Cross-platform apps and hardware', glyph: '▯', hue: 330,
    members: ['Flutter', 'Arduino'] },
  { slug: 'languages', name: 'Programming Languages', blurb: 'The core language of each project', glyph: '</>', hue: 35,
    members: ['Python', 'JavaScript', 'Dart'] },
];

const OTHER: TechGroup = {
  slug: 'other-tools', name: 'Other tools', blurb: 'More technologies used across projects', glyph: '+', hue: 220, members: [],
};

export function slugify(s: string) {
  return s.toLowerCase().replace(/\+/g, 'plus').replace(/\./g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export function groupOf(tech: string): TechGroup {
  const t = tech.toLowerCase();
  return TECH_GROUPS.find((g) => g.members.some((m) => m.toLowerCase() === t)) ?? OTHER;
}

export type Tech = { slug: string; name: string; group: string; count: number };
export type TechGroupWithTechs = TechGroup & { techs: Tech[]; count: number };
export type TechCatalog = { groups: TechGroupWithTechs[]; techs: Tech[] };

export function buildTech(projects: Project[]): TechCatalog {
  const counts = new Map<string, Tech>();
  for (const p of projects) {
    for (const name of new Set(p.stack)) {
      const slug = slugify(name);
      const hit = counts.get(slug);
      if (hit) hit.count += 1;
      else counts.set(slug, { slug, name, group: groupOf(name).slug, count: 1 });
    }
  }
  const techs = [...counts.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  const groups = [...TECH_GROUPS, OTHER]
    .map((g) => {
      const members = techs.filter((t) => t.group === g.slug);
      const count = projects.filter((p) => p.stack.some((s) => groupOf(s).slug === g.slug)).length;
      return { ...g, techs: members, count };
    })
    .filter((g) => g.techs.length > 0);
  return { groups, techs };
}

export const hasTech = (p: Project, techSlug: string) => p.stack.some((s) => slugify(s) === techSlug);
export const hasGroup = (p: Project, groupSlug: string) => p.stack.some((s) => groupOf(s).slug === groupSlug);
