# ProjectDuniya Store (store.projectduniya.com)

Next.js (App Router, TypeScript, Tailwind) store for completed projects. Visitors read the details and price,
then buy through a pre-filled WhatsApp message (`+91 83918 08784`). No payment gateway or database is needed.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Add or change projects and prices

Edit `lib/data/projects.json`. Pages revalidate every 60 seconds, so changes show up on a running
server without a rebuild.

```json
{
  "code": "PD-701",
  "slug": "my-new-project",
  "title": "My New Project",
  "category": "web-development",
  "level": "Final year",
  "difficulty": "Intermediate",
  "price": 2999,
  "originalPrice": 3999,
  "tagline": "One line shown on cards.",
  "description": "Two or three sentences.",
  "features": ["...", "..."],
  "stack": ["React", "Node.js"],
  "deliverables": ["Source code", "Report"],
  "blogUrl": "https://blogs.projectduniya.com/...",
  "blogLabel": "Title of that blog post",
  "featured": false,
  "published": true,
  "updated": "2026-11-22"
}
```

`slug` must be lowercase with hyphens and unique. `category` must match a slug in `lib/data/categories.json`.
`deliverables`, `blogUrl`, `blogLabel` are optional. **The 13 projects and prices are sample content.**

## Deploy to store.projectduniya.com

Works on Vercel, or any Node host (`npm run build`, then `npm start`). Set
`NEXT_PUBLIC_SITE_URL=https://store.projectduniya.com`, point the `store` DNS record at the host, and add
`https://store.projectduniya.com/sitemap.xml` to Google Search Console.

> If you deploy to a serverless host, edits to `lib/data/*.json` need a redeploy. On a long-running Node server they apply within 60 seconds.

## Structure

| Path | Purpose |
|---|---|
| `app/` | Routes: `/`, `/projects`, `/projects/[slug]`, `/category/[slug]`, `/how-to-buy`, plus `sitemap.ts`, `robots.ts`, `not-found.tsx`, `globals.css` |
| `components/` | Header, Footer, NetworkBar, ProjectCard, BuyBox, PromoNetwork (cross-promotion band), StoreBrowser, etc. |
| `lib/config.ts` | WhatsApp number, site links, "what you get" list, steps, FAQ |
| `lib/catalog.ts` | Reads the JSON data |
| `lib/tech.ts` | Tech categories (Frontend, Backend, Databases, AI, Data, Mobile, Languages), derived automatically from each project's `stack`. To place a new technology in a category, add its name to `members` there. Unlisted ones land in "Other tools". |
| `lib/seo.ts` | Metadata and schema.org helpers |
| `lib/data/` | Your projects and categories |
| `utils/` | `format.ts` (price formatting), `links.ts` (WhatsApp and UTM links) |
| `public/` | favicon and default share image |
| `promo-snippets/` | Code to promote the Store on projectduniya.com, the blog and the tools site (start with `PLACEMENT-CHECKLIST.md`) |

## Tech categories

Project categories (`lib/data/categories.json`) say what a project *is*. Tech categories say what it is *built with*.
They come from each project's `stack` array, so `projects.json` needs no changes: `/tech` lists every category,
`/tech/backend-apis` shows a category, and `/tech/react` shows one technology. `/projects?tech=react` filters too.

## Animations

Pure CSS plus three small client components (`Reveal`, `CountUp`, `ScrollProgress`), with no new dependencies.
All motion is switched off for visitors who prefer reduced motion.
