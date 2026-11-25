'use client';

import { useSyncExternalStore } from 'react';
import { NETWORK } from '@/lib/config';
import { out } from '@/utils/links';

const KEY = 'pd-announce-v1';
const subscribe = (cb: () => void) => {
  window.addEventListener('pd-announce', cb);
  return () => window.removeEventListener('pd-announce', cb);
};
const read = () => {
  try { return sessionStorage.getItem(KEY) ?? ''; } catch { return ''; }
};

// Slim, dismissible promo for the free tools site.
export default function Announcement() {
  const dismissed = useSyncExternalStore(subscribe, read, () => '');
  if (dismissed) return null;
  return (
    <div className="announce" role="region" aria-label="Free tools announcement">
      <div className="wrap announce-in">
        <p>
          <b>Free for students:</b> merge PDFs, compress images and 60+ more tools for your report.{' '}
          <a href={out(NETWORK.tools, '/tools', 'store_announce')}>Open tools.ProjectDuniya.com →</a>
        </p>
        <button
          type="button"
          aria-label="Dismiss announcement"
          onClick={() => {
            try { sessionStorage.setItem(KEY, '1'); } catch {}
            window.dispatchEvent(new Event('pd-announce'));
          }}
        >×</button>
      </div>
    </div>
  );
}
