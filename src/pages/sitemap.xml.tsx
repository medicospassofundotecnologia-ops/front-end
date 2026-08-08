import { GetServerSideProps } from 'next';
import { fetchAllDoctors } from '@/services/doctorService';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://medicospassofundo.com.br';

function SitemapXML() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const doctors = await fetchAllDoctors();

  const staticPages = [
    {
      url: SITE_URL,
      changefreq: 'weekly',
      priority: '1.0',
      lastmod: new Date().toISOString().split('T')[0],
    },
  ];

  const doctorPages = doctors
    .filter(d => d.status === 'ativo')
    .map(d => ({
      url: `${SITE_URL}/medicos/${d.slugUrl}`,
      changefreq: 'monthly',
      priority: '0.8',
      lastmod: d.lastUpdated.split('T')[0],
    }));

  const allPages = [...staticPages, ...doctorPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.write(xml);
  res.end();

  return { props: {} };
};

export default SitemapXML;
