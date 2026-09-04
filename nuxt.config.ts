import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://jonsoft.co.kr';
const basePath = process.env.NUXT_APP_BASE_URL || '/';
const sitePath = (path = '', absolute = false) => {
    const normalizedBase = basePath.replace(/\/?$/, '/');
    const normalizedPath = path.replace(/^\/+/, '');
    const url = `${normalizedBase}${normalizedPath}`;

    return absolute ? `${siteUrl.replace(/\/+$/, '')}${url}` : url;
};
const assetBasePath = process.env.NODE_ENV === 'development' ? sitePath('/assets/') : sitePath('/assets/', true);

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',

    devtools: { enabled: process.env.NODE_ENV !== 'production' },

    modules: ['@pinia/nuxt'],

    plugins: ['~/plugins/i18n', '~/plugins/aos.client', '~/plugins/slick.client'],

    css: ['~/assets/library/aos/aos.min.css', '~/assets/library/slick/slick.min.css', '~/assets/styles/main.scss'],

    components: [
        { path: '~/components/layout', pathPrefix: false },
        { path: '~/components/section', pathPrefix: false },
        { path: '~/components', pathPrefix: true, pattern: '*.vue' },
    ],

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `$asset-base-url: '${assetBasePath}';`,
                    silenceDeprecations: ['legacy-js-api'],
                },
            },
        },
    },

    runtimeConfig: {
        public: {
            siteUrl,
        },
    },
    app: {
        baseURL: basePath,
        head: {
            htmlAttrs: { lang: 'ko' },
            title: '조앤소프트(주)',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                {
                    name: 'description',
                    content: '우리가 만든 소프트웨어와 서비스가 고객 비즈니스 성장에 기여합니다. - 조앤소프트 -',
                },
                {
                    name: 'robots',
                    content: 'index,follow,max-image-preview:large,max-snippet:-1',
                },
                { property: 'og:type', content: 'website' },
                { property: 'og:site_name', content: '조앤소프트(주)' },
                { property: 'og:title', content: '조앤소프트(주)' },
                {
                    property: 'og:description',
                    content: '우리가 만든 소프트웨어와 서비스가 고객 비즈니스 성장에 기여합니다. - 조앤소프트 -',
                },
                {
                    property: 'og:image',
                    content: sitePath('/assets/images/banner/page-index.webp', true),
                },
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'color-scheme', content: 'light only' },
            ],
            link: [
                { rel: 'canonical', href: sitePath('', true) },
                { rel: 'sitemap', type: 'application/xml', href: sitePath('/sitemap.xml', true) },
                { rel: 'robots', href: sitePath('/robots.txt', true) },
                {
                    rel: 'icon',
                    type: 'image/x-icon',
                    href: sitePath('/assets/icons/favicon/favicon.ico'),
                },
                {
                    rel: 'apple-touch-icon',
                    sizes: '180x180',
                    href: sitePath('/assets/icons/favicon/apple-touch-icon.png'),
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '32x32',
                    href: sitePath('/assets/icons/favicon/favicon-32x32.png'),
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '16x16',
                    href: sitePath('/assets/icons/favicon/favicon-16x16.png'),
                },
            ],
        },
    },

    nitro: {
        compressPublicAssets: true,

        prerender: {
            routes: ['/robots.txt', '/sitemap.xml', '/llms.txt'],
        },

        routeRules: {
            '/assets/**': {
                headers: {
                    'cache-control': 'public, max-age=2592000, immutable',
                },
            },
            '/sitemap': { redirect: '/sitemap.xml' },
        },

        publicAssets: [
            {
                baseURL: 'assets',
                dir: resolve(__dirname, 'assets'),
                maxAge: 60 * 60 * 24 * 7,
            },
        ],
    },
});
