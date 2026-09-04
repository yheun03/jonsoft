const pages = [
    { path: '', priority: '1.0' },
    { path: 'about', priority: '0.8' },
    { path: 'business', priority: '0.8' },
    { path: 'customer', priority: '0.8' },
    { path: 'contact', priority: '0.8' },
];
const lastModified = '2026-09-04';

export default defineEventHandler((event) => {
    const absoluteUrl = getSiteBaseUrl(event);
    const urls = pages
        .map(
            ({ path, priority }) => `  <url>
    <loc>${absoluteUrl}/${path}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`,
        )
        .join('\n');

    setHeader(event, 'content-type', 'application/xml; charset=utf-8');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
});
