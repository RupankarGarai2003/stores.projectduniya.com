import { NETWORK } from '@/lib/config';
import type { Project } from '@/lib/types';
import { askMessage, buyMessage, out, waLink } from '@/utils/links';
import Price from './Price';
import { WaIcon } from './Icons';

export default function BuyBox({ p }: { p: Project }) {
  return (
    <aside className="buybox" aria-label="Buy this project">
      <Price p={p} large />
      <a className="btn btn-buy btn-lg" href={waLink(buyMessage(p))} target="_blank" rel="noopener noreferrer">
        <WaIcon /> Buy on WhatsApp
      </a>
      <a className="btn btn-ghost" href={waLink(askMessage(p))} target="_blank" rel="noopener noreferrer">
        Ask a question first
      </a>
      <p className="fine">
        Details and payment are confirmed with the team on WhatsApp. See the{' '}
        <a href={out(NETWORK.main, '/refund-policy', 'buybox_refund')} target="_blank" rel="noopener noreferrer">refund policy</a>.
      </p>
    </aside>
  );
}
