import { ImageResponse } from 'next/og';
import { getCatalog, getProject } from '@/lib/catalog';
import { hash } from '@/utils/format';

export const alt = 'ProjectDuniya Store project';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return getCatalog().projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { project: p, category } = getProject(slug);
  const hue = (category?.hue ?? 243) + (p ? hash(p.slug) % 24 : 0);
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          padding: 64, color: '#fff', fontFamily: 'sans-serif',
          background: `linear-gradient(135deg, hsl(${hue}, 60%, 16%), hsl(${hue + 28}, 66%, 36%))`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 30, fontWeight: 700 }}>
          <div style={{ display: 'flex', width: 52, height: 52, borderRadius: 14, background: '#4f46e5', alignItems: 'center', justifyContent: 'center', marginRight: 16, fontSize: 24 }}>PD</div>
          ProjectDuniya Store
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 28, opacity: 0.8, marginBottom: 14 }}>{p ? `${p.code} · ${category?.name ?? ''}` : 'Project not found'}</div>
          <div style={{ display: 'flex', fontSize: 66, fontWeight: 800, lineHeight: 1.1 }}>{p?.title ?? 'ProjectDuniya Store'}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 30 }}>
          <div style={{ display: 'flex' }}>{p ? p.stack.slice(0, 4).join('  ·  ') : ''}</div>
          <div style={{ display: 'flex', fontSize: 44, fontWeight: 800, background: '#15803d', padding: '10px 26px', borderRadius: 16 }}>{p ? `Rs. ${p.price.toLocaleString('en-IN')}` : ''}</div>
        </div>
      </div>
    ),
    size
  );
}
