import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.FRONT_URL ?? 'https://juniverse-dev.com';
  if (!baseUrl) throw new Error('FRONT_URL is not set');

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}