import { NETWORK } from '@/lib/config';
import { out } from '@/utils/links';
import { Ext } from './Icons';

export default function NetworkBar() {
  const items: [string, string][] = [
    ['ProjectDuniya.com', out(NETWORK.main, '/', 'netbar')],
    ['Blogs', out(NETWORK.blogs, '/', 'netbar')],
    ['Free tools', out(NETWORK.tools, '/', 'netbar')],
  ];
  return (
    <div className="netbar">
      <div className="wrap netbar-in">
        <span className="netbar-label">ProjectDuniya network</span>
        <nav aria-label="ProjectDuniya sites">
          {items.map(([t, u]) => <a key={t} href={u}>{t}<Ext /></a>)}
          <span className="netbar-here" aria-current="page">Store</span>
        </nav>
      </div>
    </div>
  );
}
