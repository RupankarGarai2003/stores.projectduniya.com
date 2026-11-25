import type { Category, Project } from '@/lib/types';
import { hash } from '@/utils/format';

type CoverStyle = React.CSSProperties & { '--h': number };

// Generated cover: the project's stack listed like lines in a terminal.
export default function Cover({ p, cat, big }: { p: Project; cat?: Category; big?: boolean }) {
  const hue = (cat?.hue ?? 243) + (hash(p.slug) % 24);
  const style: CoverStyle = { '--h': hue };
  return (
    <div className={'cover' + (big ? ' cover-big' : '')} style={style} aria-hidden="true">
      <span className="cover-orb" />
      <span className="cover-code">{p.code}</span>
      <ul>
        {p.stack.slice(0, big ? 5 : 4).map((s, i) => (
          <li key={s} style={{ ['--i' as string]: i }}>{s}</li>
        ))}
      </ul>
      <span className="cover-glyph">{cat?.glyph}</span>
    </div>
  );
}
