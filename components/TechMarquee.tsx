import Link from 'next/link';
import type { Tech } from '@/lib/tech';

// Endless, pausable ticker of the technologies used across the store.
export default function TechMarquee({ techs }: { techs: Tech[] }) {
  if (!techs.length) return null;
  const row = (hidden: boolean) => (
    <ul className="marquee-row" aria-hidden={hidden || undefined}>
      {techs.map((t) => (
        <li key={t.slug}>
          <Link href={`/tech/${t.slug}`} tabIndex={hidden ? -1 : undefined}>
            <span>{t.name}</span><em>{t.count}</em>
          </Link>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee" aria-label="Technologies used in our projects">
      <div className="marquee-track">{row(false)}{row(true)}</div>
    </div>
  );
}
