export type Category = {
  slug: string;
  name: string;
  blurb: string;
  glyph: string;
  hue: number;
  service: string;
  serviceLabel: string;
  blog: string;
  blogLabel: string;
};

export type Project = {
  code: string;
  slug: string;
  title: string;
  category: string;
  level: string;
  difficulty: string;
  price: number;
  originalPrice: number;
  tagline: string;
  description: string;
  features: string[];
  stack: string[];
  deliverables?: string[];
  blogUrl?: string;
  blogLabel?: string;
  featured?: boolean;
  published?: boolean;
  updated: string;
  discount: number;
};

export type Catalog = {
  categories: Category[];
  projects: Project[];
};
