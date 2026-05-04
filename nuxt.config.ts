import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  dir: {
    plugins: 'core/plugins',
    server: 'core/server',
  },
  modules: ['@pinia/nuxt'],
  alias: {
    core: resolve(__dirname, 'core'),
  },
  pinia: {
    storesDirs: ['./core/stores/**'],
  },
  css: [
    '~/assets/library/slick/slick.min.css',
    '~/assets/library/aos/aos.min.css',
    '~/assets/styles/main.scss',
  ],
  imports: {
    dirs: ['core/composables'],
  },
  runtimeConfig: {
    public: {
      siteUrl: '',
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'ko' },
      title: '조앤소프트(주)',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            '우리가 만든 소프트웨어와 서비스가 고객 비즈니스 성장에 기여합니다. - 조앤소프트 -',
        },
        { name: 'color-scheme', content: 'light only' },
      ],
      link: [
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
    publicAssets: [
      {
        baseURL: 'assets',
        dir: resolve(__dirname, 'assets'),
        maxAge: 60 * 60 * 24 * 7,
      },
    ],
  },
})
