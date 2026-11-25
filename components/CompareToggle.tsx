'use client';

import { MAX_COMPARE, useCompare } from './compare';

export default function CompareToggle({ slug }: { slug: string }) {
  const { list, toggle } = useCompare();
  const on = list.includes(slug);
  const full = !on && list.length >= MAX_COMPARE;
  return (
    <button
      type="button"
      className={'cmp-btn' + (on ? ' on' : '')}
      aria-pressed={on}
      disabled={full}
      title={full ? `You can compare up to ${MAX_COMPARE} projects` : undefined}
      onClick={() => toggle(slug)}
    >
      <span aria-hidden="true">{on ? '✓' : '+'}</span> Compare
    </button>
  );
}
