# Where to promote store.projectduniya.com

Goal: every page on your three sites points to the Store. All links carry UTM tags
(`utm_source=<site>&utm_medium=...&utm_campaign=<placement>`), so Google Analytics shows
which placement sends buyers.

## projectduniya.com (Next.js)
Copy `StoreBanner.jsx` and `store-banner.css` into your components folder.

| Placement | How |
|---|---|
| Header nav | Add a "Store" link next to Projects: `https://store.projectduniya.com/?utm_source=projectduniya.com&utm_medium=site&utm_campaign=header_nav` |
| Top announcement bar | Replace or extend "First-time users: 40% off" with a Store line, or add `<StoreBanner variant="slim" />` above the header |
| Home page | Add `<StoreBanner />` between "Popular Project Help Services" and "Explore All Our Services" |
| Every service page (`/services/*`) | Add `<StoreBanner category="web-development" campaign="service_page" />` using the matching category |
| `/projects`, `/projects/*`, `/project-ideas` | Add `<StoreBanner />` at the bottom: people reading about projects want to buy one |
| Blog guides (`/blog/*`) | Add `<StoreBanner variant="slim" />` under the article title |
| Footer "Useful Links" | Add "Project Store" |
| Contact page | Add: "Prefer a ready-made project? Browse the Store" |
| Mobile bottom bar / WhatsApp widget | Add a Store shortcut |

## blogs.projectduniya.com (WordPress)
Paste `wordpress-store-promo.php` into a child theme's `functions.php` (or a Code Snippets plugin).
That alone adds the Store box and a nudge to **every post**, plus a menu link.

By hand in your theme (header.php / footer.php or the theme customiser):
- Netbar at the top: add a "Store" link beside "Services / Contact / WhatsApp".
- Home page: add `[pd_store_promo]` above the "Ready to build your project?" section.
- "Ready to build your project?" tiles: add a Store tile.
- Footer "Services" column and the mobile bottom bar: add a Store link.
- Category pages: `[pd_store_promo category="ai-machine-learning"]` at the top of matching categories.

## tools.projectduniya.com (ToolsCenterHub)
Copy `StoreBanner.jsx` and `store-banner.css` into the project.

| Placement | How |
|---|---|
| Every tool page | Put `<StoreBanner source="tools.projectduniya.com" campaign="tool_page" />` in the shared tool-page layout, right under the tool, next to your existing ProjectDuniya promo |
| Tools home | Add a third promo card next to "projectduniya.com" and "ProjectDuniya Blogs" |
| Header | Add a "Store" link beside "Project Help" |
| Footer, "ProjectDuniya" column | Add "Project Store" |
| Blog posts on the tools site | `<StoreBanner variant="slim" source="tools.projectduniya.com" campaign="tools_blog" />` |

## After it is live
1. Add `https://store.projectduniya.com/sitemap.xml` in Google Search Console (add the subdomain as its own property).
2. Add the Store to the sitemaps / link lists of the other three sites.
3. Check GA4 > Acquisition > Traffic by `utm_campaign` after a week to see which placement works best.
