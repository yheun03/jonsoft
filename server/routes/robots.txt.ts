export default defineEventHandler((event) => {
    const absoluteUrl = getSiteBaseUrl(event);

    setHeader(event, 'content-type', 'text/plain; charset=utf-8');

    return `User-agent: *
Allow: /

Sitemap: ${absoluteUrl}/sitemap.xml
`;
});
