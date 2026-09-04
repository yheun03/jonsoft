export default defineEventHandler((event) => {
    const runtimeConfig = useRuntimeConfig(event);
    const siteUrl = runtimeConfig.public.siteUrl.replace(/\/+$/, '');
    const baseURL = runtimeConfig.app.baseURL.replace(/^\/+|\/+$/g, '');
    const absoluteUrl = [siteUrl, baseURL].filter(Boolean).join('/');

    setHeader(event, 'content-type', 'text/plain; charset=utf-8');

    return `User-agent: *
Allow: /

Sitemap: ${absoluteUrl}/sitemap.xml
`;
});
