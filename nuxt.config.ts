import {fileURLToPath} from 'node:url';
import {dirname, resolve} from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://jonsoft.co.kr';
const basePath = process.env.NUXT_APP_BASE_URL || '/ver.2026/';
const canonicalUrl = `${siteUrl.replace(/\/+$/, '')}${basePath === '/' ? '' : basePath}`;

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',

    devtools: {enabled: process.env.NODE_ENV !== 'production'},

    modules: ['@pinia/nuxt'],

    plugins: ['~/plugins/i18n', '~/plugins/locale-hydrate.client', '~/plugins/aos.client'],

    css: ['~/assets/library/aos/aos.min.css', '~/assets/styles/main.scss'],

    components: [
        {path: '~/components/Layout', pathPrefix: false},
        {path: '~/components/Section', pathPrefix: false},
        {path: '~/components', pathPrefix: true, pattern: '*.vue'},
    ],

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
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
            htmlAttrs: {lang: 'ko'},
            title: '조앤소프트(주)',
            meta: [
                {charset: 'utf-8'},
                {name: 'viewport', content: 'width=device-width, initial-scale=1'},
                {
                    name: 'description',
                    content: '우리가 만든 소프트웨어와 서비스가 고객 비즈니스 성장에 기여합니다. - 조앤소프트 -',
                },
                {
                    name: 'robots',
                    content: 'index,follow,max-image-preview:large,max-snippet:-1',
                },
                {property: 'og:type', content: 'website'},
                {property: 'og:site_name', content: '조앤소프트(주)'},
                {property: 'og:title', content: '조앤소프트(주)'},
                {
                    property: 'og:description',
                    content: '우리가 만든 소프트웨어와 서비스가 고객 비즈니스 성장에 기여합니다. - 조앤소프트 -',
                },
                {
                    property: 'og:image',
                    content: `${siteUrl.replace(/\/+$/, '')}/assets/images/banner/page-index.webp`,
                },
                {name: 'twitter:card', content: 'summary_large_image'},
                {name: 'color-scheme', content: 'light only'},
            ],
            link: [
                {rel: 'canonical', href: canonicalUrl},
                {
                    rel: 'apple-touch-icon',
                    sizes: '180x180',
                    href: '/assets/icons/favicon/apple-touch-icon.png',
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '32x32',
                    href: '/assets/icons/favicon/favicon-32x32.png',
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '16x16',
                    href: '/assets/icons/favicon/favicon-16x16.png',
                },
            ],
        },
    },

    nitro: {
        compressPublicAssets: true,

        routeRules: {
            '/assets/**': {
                headers: {
                    'cache-control': 'public, max-age=2592000, immutable',
                },
            },
            '/sitemap': {redirect: '/sitemap.xml'},
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
