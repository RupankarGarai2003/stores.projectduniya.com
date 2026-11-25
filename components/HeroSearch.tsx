'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState('');
  return (
    <form
      className="search"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/projects${q ? `?q=${encodeURIComponent(q)}` : ''}`);
      }}
    >
      <label htmlFor="hq" className="sr">Search projects</label>
      <input id="hq" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search: MERN, machine learning, Power BI…" />
      <button className="btn btn-brand" type="submit">Search</button>
    </form>
  );
}
