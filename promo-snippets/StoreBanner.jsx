// Drop-in promo for store.projectduniya.com.
// Use on projectduniya.com (Next.js) and tools.projectduniya.com (React).
// Plain <a> tags and no router dependency, so it works in any React app.
import './store-banner.css';

const STORE = 'https://store.projectduniya.com';

// category: optional store category slug, e.g. 'web-development',
// 'ai-machine-learning', 'data-analytics', 'python-projects',
// 'mobile-apps', 'mini-projects'
// source: the site this banner is placed on, for UTM tracking
export default function StoreBanner({ variant = 'card', source = 'projectduniya.com', campaign = 'banner', category }) {
  const path = category ? `/category/${category}` : '/projects';
  const href = `${STORE}${path}?utm_source=${source}&utm_medium=site&utm_campaign=${campaign}`;

  if (variant === 'slim') {
    return (
      <a className="pdstore-slim" href={href}>
        <span><b>New:</b> ready-made projects with source code, report and PPT.</span>
        <span className="pdstore-slim-cta">Visit the Store ↗</span>
      </a>
    );
  }

  return (
    <section className="pdstore-card" aria-label="ProjectDuniya Store">
      <div>
        <h2>Need a finished project? Visit the ProjectDuniya Store.</h2>
        <p>
          Ready-made final year and mini projects with source code, report, PPT and viva notes.
          Read the details, see the price and buy directly on WhatsApp.
        </p>
      </div>
      <a className="pdstore-btn" href={href}>Browse projects ↗</a>
    </section>
  );
}
