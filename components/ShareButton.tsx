'use client';

import { useState } from 'react';

export default function ShareButton({ title, url }: { title: string; url: string }) {
  const [done, setDone] = useState(false);
  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    } catch {}
  };
  return (
    <button type="button" className="btn btn-ghost btn-sm" onClick={share}>
      {done ? 'Link copied ✓' : 'Share this project'}
    </button>
  );
}
