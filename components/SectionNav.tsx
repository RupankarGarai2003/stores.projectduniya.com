'use client';

import { useEffect, useState } from 'react';

// Sticky in-page menu for the project page. Highlights the section being read.
export default function SectionNav({ items }: { items: [string, string][] }) {
  const [on, setOn] = useState(items[0]?.[0] ?? '');
  useEffect(() => {
    const els = items.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (seen) setOn(seen.target.id);
      },
      { rootMargin: '-120px 0px -60% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);
  return (
    <nav className="secnav" aria-label="On this page">
      {items.map(([id, label]) => (
        <a key={id} href={`#${id}`} className={on === id ? 'on' : ''} aria-current={on === id ? 'true' : undefined}>{label}</a>
      ))}
    </nav>
  );
}
