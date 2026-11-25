import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ProjectDuniya Store',
    short_name: 'PD Store',
    description: 'Ready-made final year and mini projects with source code, report, PPT and viva notes.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f5f6fb',
    theme_color: '#4f46e5',
    icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
