import Link from 'next/link';
import { slugify } from '@/lib/tech';

// Technology pills that link to the matching tech page.
export default function TechChips({ stack, limit }: { stack: string[]; limit?: number }) {
  const list = limit ? stack.slice(0, limit) : stack;
  return (
    <ul className="tchips">
      {list.map((s) => (
        <li key={s}><Link href={`/tech/${slugify(s)}`}>{s}</Link></li>
      ))}
      {limit && stack.length > limit && <li className="more">+{stack.length - limit}</li>}
    </ul>
  );
}
