const pages = [
    { path: '', priority: '1.0' },
    { path: 'about', priority: '0.8' },
    { path: 'business', priority: '0.8' },
    { path: 'customer', priority: '0.8' },
    { path: 'contact', priority: '0.8' },
];

export default defineEventHandler((event) => {
    const runtimeConfig = useRuntimeConfig(event);
    const siteUrl = runtimeConfig.public.siteUrl.replace(/\/+$/, '');
    const baseURL = runtimeConfig.app.baseURL.replace(/^\/+|\/+$/g, '');
    const absoluteUrl = [siteUrl, baseURL].filter(Boolean).join('/');
    const urls = pages
        .map(
            ({ path, priority }) => `  <url>
    <loc>${absoluteUrl}/${path}</loc>
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
