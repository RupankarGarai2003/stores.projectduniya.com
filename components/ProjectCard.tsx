import Link from 'next/link';
import type { Category, Project } from '@/lib/types';
import { buyMessage, waLink } from '@/utils/links';
import CompareToggle from './CompareToggle';
import SaveToggle from './SaveToggle';
import Cover from './Cover';
import Price from './Price';
import TechChips from './TechChips';
import { WaIcon } from './Icons';

export default function ProjectCard({ p, cat, index = 0 }: { p: Project; cat?: Category; index?: number }) {
  return (
    <article className="card" style={{ ['--i' as string]: Math.min(index, 8) }}>
      <Link href={`/projects/${p.slug}`} className="card-cover" tabIndex={-1} aria-hidden="true">
        <Cover p={p} cat={cat} />
        {p.discount > 0 && <span className="ribbon">{p.discount}% off</span>}
      </Link>
      <div className="card-body">
        <div className="meta">
          <span>{cat?.name}</span>
          <span>{p.level} · {p.difficulty}</span>
        </div>
        <h3><Link href={`/projects/${p.slug}`}>{p.title}</Link></h3>
        <p>{p.tagline}</p>
        <TechChips stack={p.stack} limit={4} />
        <div className="card-utility"><CompareToggle slug={p.slug} /><SaveToggle slug={p.slug} /></div>
        <div className="card-foot">
          <Price p={p} />
          <a className="btn btn-buy btn-sm" href={waLink(buyMessage(p))} target="_blank" rel="noopener noreferrer">
            <WaIcon /> Buy
          </a>
        </div>
      </div>
    </article>
  );
}
