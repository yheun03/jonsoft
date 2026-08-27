import { useI18n } from 'vue-i18n';

type SeoPage = 'home' | 'about' | 'business' | 'customer' | 'contact';

const pagePaths: Record<SeoPage, string> = {
    home: '',
    about: 'about',
    business: 'business',
    customer: 'customer',
    contact: 'contact',
};

const pageNames: Record<SeoPage, Record<string, string>> = {
    home: { ko: '조앤소프트', en: 'JO&SOFT', vi: 'JO&SOFT' },
    about: { ko: '회사소개', en: 'About Us', vi: 'Giới thiệu công ty' },
    business: { ko: '사업영역 및 솔루션', en: 'Business & Solutions', vi: 'Lĩnh vực kinh doanh & Giải pháp' },
    customer: { ko: '고객사 및 파트너', en: 'Customers & Partners', vi: 'Khách hàng & Đối tác' },
    contact: { ko: '문의 및 채용', en: 'Contact & Careers', vi: 'Liên hệ & Tuyển dụng' },
};

const homeTitles: Record<string, string> = {
    ko: '제조 AI·스마트팩토리 전문기업 | 조앤소프트',
    en: 'Manufacturing AI & Smart Factory Solutions | JO&SOFT',
    vi: 'Giải pháp AI sản xuất & Nhà máy thông minh | JO&SOFT',
};

const customerDescriptions: Record<string, string> = {
    ko: '삼성전기, KT, GS리테일, CJ대한통운 등 조앤소프트와 함께 디지털 전환과 스마트 제조 혁신을 추진한 주요 고객사와 파트너를 소개합니다.',
    en: 'Meet the customers and partners working with JO&SOFT on digital transformation and smart manufacturing innovation.',
    vi: 'Khám phá các khách hàng và đối tác đồng hành cùng JO&SOFT trong chuyển đổi số và đổi mới sản xuất thông minh.',
};

const contactDescriptions: Record<string, string> = {
    ko: '조앤소프트 본사 위치와 대표 연락처, 프로젝트 문의 이메일, 개발자·UX/UI 디자이너·프로젝트 PM 채용 정보를 확인하세요.',
    en: 'Find JO&SOFT headquarters, project inquiry contacts, and career information for developers, UX/UI designers, and project managers.',
    vi: 'Xem địa chỉ trụ sở JO&SOFT, thông tin liên hệ dự án và tuyển dụng lập trình viên, nhà thiết kế UX/UI và quản lý dự án.',
};

const localeCodes: Record<string, string> = {
    ko: 'ko_KR',
    en: 'en_US',
    vi: 'vi_VN',
};

const stripHtml = (value: string) =>
    value
        .replace(/<br\s*\/?>/gi, ' ')
        .replace(/<[^>]+>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&#64;/g, '@')
        .replace(/\s+/g, ' ')
        .trim();

export function usePageSeo(page: SeoPage) {
    const { t, locale } = useI18n();
    const runtimeConfig = useRuntimeConfig();
    const siteUrl = runtimeConfig.public.siteUrl.replace(/\/+$/, '');
    const baseUrl = runtimeConfig.app.baseURL.replace(/^\/+|\/+$/g, '');
    const absoluteUrl = (path = '') =>
        [siteUrl, baseUrl, path]
            .filter(Boolean)
            .join('/')
            .replace(/([^:]\/)\/+/, '$1');
    const canonical = computed(() => absoluteUrl(pagePaths[page]));
    const image = absoluteUrl('assets/images/banner/page-index.webp');
    const language = computed(() => locale.value);
    const pageName = computed(() => pageNames[page][language.value] || pageNames[page].ko);
    const title = computed(() => (page === 'home' ? homeTitles[language.value] || homeTitles.ko : `${pageName.value} | JO&SOFT`));
    const description = computed(() => {
        if (page === 'home') return stripHtml(t('index.banner.text.dscpt'));
        if (page === 'about') return stripHtml(t('about.module-text.overview.dscpt'));
        if (page === 'business') return stripHtml(t('business.module-text.overview.dscpt'));
        if (page === 'customer') return customerDescriptions[language.value] || customerDescriptions.ko;
        return contactDescriptions[language.value] || contactDescriptions.ko;
    });

    useSeoMeta({
        title,
        description,
        robots: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
        ogType: 'website',
        ogSiteName: 'JO&SOFT',
        ogTitle: title,
        ogDescription: description,
        ogUrl: canonical,
        ogImage: image,
        ogImageAlt: 'JO&SOFT',
        ogLocale: computed(() => localeCodes[language.value] || localeCodes.ko),
        twitterCard: 'summary_large_image',
        twitterTitle: title,
        twitterDescription: description,
        twitterImage: image,
    });

    const organizationId = `${absoluteUrl()}#organization`;
    const websiteId = `${absoluteUrl()}#website`;
    const pageId = computed(() => `${canonical.value}#webpage`);
    const organization = computed(() => ({
        '@type': 'Organization',
        '@id': organizationId,
        name: language.value === 'ko' ? '조앤소프트 주식회사' : 'JO&SOFT Co., Ltd.',
        alternateName: ['JO&SOFT', '조앤소프트'],
        url: absoluteUrl(),
        logo: absoluteUrl('assets/logos/logo.svg'),
        foundingDate: '2016-01',
        description: stripHtml(t('about.module-text.overview.dscpt')),
        address: {
            '@type': 'PostalAddress',
            streetAddress: '정자일로 248, 파크뷰타워 1204호',
            addressLocality: '성남시 분당구',
            addressRegion: '경기도',
            postalCode: '13554',
            addressCountry: 'KR',
        },
        telephone: '+82-31-717-8816',
        email: 'js.jung@jonsoft.co.kr',
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'sales',
            telephone: '+82-31-717-8816',
            email: 'js.jung@jonsoft.co.kr',
            availableLanguage: ['Korean', 'English', 'Vietnamese'],
        },
        knowsAbout: ['Manufacturing AI', 'Smart Factory', 'MES', 'APS', 'OMS', 'FEMS', 'SCM', 'CRM', 'WCS', 'TMS', 'WMS'],
    }));
    const webPage = computed(() => ({
        '@type': page === 'about' ? 'AboutPage' : page === 'contact' ? 'ContactPage' : page === 'customer' ? 'CollectionPage' : 'WebPage',
        '@id': pageId.value,
        url: canonical.value,
        name: title.value,
        description: description.value,
        inLanguage: language.value,
        isPartOf: { '@id': websiteId },
        about: { '@id': organizationId },
        breadcrumb:
            page === 'home'
                ? undefined
                : {
                      '@type': 'BreadcrumbList',
                      itemListElement: [
                          { '@type': 'ListItem', position: 1, name: 'JO&SOFT', item: absoluteUrl() },
                          { '@type': 'ListItem', position: 2, name: pageName.value, item: canonical.value },
                      ],
                  },
    }));
    const services = computed(() =>
        ['aps', 'oms', 'fems', 'scm', 'crm', 'mes', 'wcs', 'tms', 'ai', 'wms'].map((id, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'Service',
                name: stripHtml(t(`business.solutions.${id}.title`)),
                description: stripHtml(t(`business.solutions.${id}.dscpt`)),
                provider: { '@id': organizationId },
                areaServed: 'KR',
            },
        })),
    );
    const graph = computed(() => {
        const items: Record<string, unknown>[] = [
            organization.value,
            {
                '@type': 'WebSite',
                '@id': websiteId,
                url: absoluteUrl(),
                name: 'JO&SOFT',
                publisher: { '@id': organizationId },
                inLanguage: ['ko', 'en', 'vi'],
            },
            webPage.value,
        ];

        if (page === 'business') {
            items.push({
                '@type': 'ItemList',
                '@id': `${canonical.value}#solutions`,
                name: pageName.value,
                numberOfItems: services.value.length,
                itemListElement: services.value,
            });
        }

        return items;
    });

    useHead(() => ({
        htmlAttrs: { lang: language.value },
        link: [{ rel: 'canonical', href: canonical.value }],
        script: [
            {
                key: `seo-schema-${page}`,
                type: 'application/ld+json',
                innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph.value }).replace(/</g, '\\u003c'),
            },
        ],
    }));
}
