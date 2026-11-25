import type { Project } from '@/lib/types';
import { inr } from '@/utils/format';

export default function Price({ p, large }: { p: Project; large?: boolean }) {
  return (
    <div className={'price' + (large ? ' price-lg' : '')}>
      <strong>{inr(p.price)}</strong>
      {p.discount > 0 && (
        <>
          <s>{inr(p.originalPrice)}</s>
          <span className="off">{p.discount}% off</span>
        </>
      )}
    </div>
  );
}
