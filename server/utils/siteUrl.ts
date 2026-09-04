import type { H3Event } from 'h3';

export function getSiteBaseUrl(event: H3Event) {
    const runtimeConfig = useRuntimeConfig(event);
    const siteUrl = runtimeConfig.public.siteUrl.replace(/\/+$/, '');
    const baseURL = runtimeConfig.app.baseURL.replace(/^\/+|\/+$/g, '');

    return [siteUrl, baseURL].filter(Boolean).join('/');
}
