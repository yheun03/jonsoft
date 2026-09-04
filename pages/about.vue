<template>
    <section class="about-page">
        <div class="navigator">
            <PageNavigator
                type="anchor"
                id-prefix="about"
                :items="aboutNavigatorItems"
                :label="t('about.tab.label')"
                :model-value="activeTab"
                @update:model-value="changeTab"
            />
        </div>

        <div id="about-panel-ceo" v-show="activeTab === 'ceo'" role="tabpanel" aria-labelledby="about-tab-ceo" class="about-panel">
            <PageBanner class="ceo-banner" src="/assets/images/ceo/page-ceo.png">
                <p class="ceo-banner__title" aria-hidden="true">Your<br />Best<br />Business<br />Partner</p>
            </PageBanner>

            <div class="ceo-message">
                <div class="wrap">
                    <div class="ceo-message__headline">
                        <p class="ceo-eyebrow">{{ t('about.ceo.eyebrow') }}</p>
                        <h1 v-html="t('about.ceo.headline')"></h1>
                    </div>
                </div>

                <div class="ceo-message__profile">
                    <div class="wrap ceo-message__profile-inner">
                        <div class="ceo-message__portrait">
                            <img :src="assetPath('/assets/images/ceo/ceo.png')" :alt="t('about.ceo.portrait-alt')" />
                        </div>
                        <div class="ceo-message__content">
                            <h2 v-html="t('about.ceo.greeting')"></h2>
                            <p v-for="paragraph in list('about.ceo.message')" :key="paragraph" v-html="paragraph"></p>
                            <strong>{{ t('about.ceo.signature') }}</strong>
                        </div>
                    </div>
                </div>
            </div>

            <div class="ceo-values">
                <div class="wrap">
                    <p class="ceo-eyebrow">{{ t('about.ceo.values.eyebrow') }}</p>
                    <h2>{{ t('about.ceo.values.title') }}</h2>
                    <p class="ceo-values__description" v-html="t('about.ceo.values.description')"></p>
                    <ul class="ceo-values__list">
                        <li v-for="value in ceoValues" :key="value.title" class="ceo-values__item">
                            <img :src="assetPath(value.image)" alt="" loading="lazy" decoding="async" />
                            <div class="ceo-values__content">
                                <h3>{{ value.title }}</h3>
                                <p>{{ value.description }}</p>
                            </div>
                        </li>
                    </ul>
                    <p class="ceo-values__closing">{{ t('about.ceo.closing') }}</p>
                </div>
            </div>
        </div>

        <div id="about-panel-company" v-show="activeTab === 'company'" role="tabpanel" aria-labelledby="about-tab-company" class="about-panel">
            <PageBanner src="/assets/images/banner/page-about.webp" bottom-aligned>
                <div class="module-text">
                    <div class="wrap">
                        <p class="title-sub">
                            <span class="gradient-text" data-aos="fade-up" data-aos-delay="100" v-html="t('about.banner.title-sub')"></span>
                        </p>
                        <h1 class="title" data-aos="fade-up" data-aos-delay="200" v-html="t('about.banner.title')"></h1>
                        <ul class="dscpt" data-aos="fade-up" data-aos-delay="300">
                            <li v-for="item in list('about.banner.dscpt')" :key="item">{{ item }}</li>
                        </ul>
                    </div>
                </div>
            </PageBanner>
            <div class="module-text">
                <div class="wrap">
                    <p class="title-sub" data-aos="fade-up" data-aos-delay="100">
                        <span class="gradient-text" v-html="t('about.module-text.overview.title-sub')"></span>
                    </p>
                    <h2 class="title" data-aos="fade-up" data-aos-delay="200" v-html="t('about.module-text.overview.title')"></h2>
                    <p class="dscpt" data-aos="fade-up" data-aos-delay="300" v-html="t('about.module-text.overview.dscpt')"></p>
                </div>
            </div>
            <div class="summary">
                <div class="wrap">
                    <ul>
                        <li data-aos="fade-up" data-aos-delay="100">
                            <img :src="assetPath('/assets/icons/120/ic-building.svg')" alt="" loading="lazy" decoding="async" />
                            <div class="content">
                                <p class="dscpt"><span>10+</span></p>
                                <p class="title" v-html="t('about.summary.item-01.title')"></p>
                                <span class="eyebrow" v-html="t('about.summary.item-01.standard')"></span>
                            </div>
                        </li>
                        <li data-aos="fade-up" data-aos-delay="200">
                            <img :src="assetPath('/assets/icons/120/ic-factory.svg')" alt="" loading="lazy" decoding="async" />
                            <div class="content">
                                <p class="dscpt"><span>71+</span></p>
                                <p class="title" v-html="t('about.summary.item-02.title')"></p>
                                <span class="eyebrow" v-html="t('about.summary.item-02.standard')"></span>
                            </div>
                        </li>
                        <li data-aos="fade-up" data-aos-delay="300">
                            <img :src="assetPath('/assets/icons/120/ic-partner.svg')" alt="" loading="lazy" decoding="async" />
                            <div class="content">
                                <p class="dscpt"><span>20</span></p>
                                <p class="title" v-html="t('about.summary.item-03.title')"></p>
                                <span class="eyebrow" v-html="t('about.summary.item-03.standard')"></span>
                            </div>
                        </li>
                        <li data-aos="fade-up" data-aos-delay="400">
                            <img :src="assetPath('/assets/icons/120/ic-hand.svg')" alt="" loading="lazy" decoding="async" />
                            <div class="content">
                                <p class="dscpt"><span>12</span></p>
                                <p class="title" v-html="t('about.summary.item-04.title')"></p>
                                <span class="eyebrow" v-html="t('about.summary.item-04.standard')"></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="awards">
                <h2 data-aos="fade-up" data-aos-delay="100" v-html="t('about.awards.title')" class="title"></h2>
                <p data-aos="fade-up" data-aos-delay="200" v-html="t('about.awards.dscpt')" class="title-sub"></p>
                <div class="list-awards" role="region" :aria-label="awardsCarouselLabel">
                    <div data-aos="fade-up" data-aos-delay="100" class="item item-01">
                        <div class="thumbnail">
                            <img :src="assetPath('/assets/images/awards/img01-1.webp')" alt="" loading="lazy" decoding="async" />
                            <img :src="assetPath('/assets/images/awards/img01-2.webp')" alt="" loading="lazy" decoding="async" />
                        </div>
                        <div class="content">
                            <p v-html="t('about.awards.item-01.title')"></p>
                        </div>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="200" class="item item-02">
                        <div class="thumbnail">
                            <img :src="assetPath('/assets/images/awards/img02-1.webp')" alt="" loading="lazy" decoding="async" />
                            <img :src="assetPath('/assets/images/awards/img02-2.webp')" alt="" loading="lazy" decoding="async" />
                        </div>
                        <div class="content">
                            <p v-html="t('about.awards.item-02.title')"></p>
                        </div>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="300" class="item item-03">
                        <div class="thumbnail">
                            <img :src="assetPath('/assets/images/awards/img03-1.webp')" alt="" loading="lazy" decoding="async" />
                            <img :src="assetPath('/assets/images/awards/img03-2.webp')" alt="" loading="lazy" decoding="async" />
                        </div>
                        <div class="content">
                            <p v-html="t('about.awards.item-03.title')"></p>
                        </div>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="400" class="item item-04">
                        <div class="thumbnail">
                            <img :src="assetPath('/assets/images/awards/img04-1.webp')" alt="" loading="lazy" decoding="async" />
                            <img :src="assetPath('/assets/images/awards/img04-2.webp')" alt="" loading="lazy" decoding="async" />
                        </div>
                        <div class="content">
                            <p v-html="t('about.awards.item-04.title')"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="module-text">
                <div class="wrap">
                    <h2 class="title-sub">
                        <span class="gradient-text" data-aos="fade-up" data-aos-delay="100" v-html="t('about.module-text.feature.title')"></span>
                    </h2>
                    <p class="title" data-aos="fade-up" data-aos-delay="200" v-html="t('about.module-text.feature.dscpt')"></p>
                </div>
            </div>
            <div class="feature">
                <div class="wrap">
                    <div class="list-feature">
                        <div data-aos="fade-up" data-aos-delay="100" class="item item-01">
                            <div class="front">
                                <h3 class="title" v-html="t('about.feature.item-01.title')"></h3>
                            </div>
                            <div class="back">
                                <ul>
                                    <li v-for="item in list('about.feature.item-01.content')" :key="item">{{ item }}</li>
                                </ul>
                                <NuxtLink to="/business#success" v-html="t('about.feature.button')"></NuxtLink>
                            </div>
                        </div>
                        <div data-aos="fade-up" data-aos-delay="200" class="item item-02">
                            <div class="front">
                                <h3 class="title" v-html="t('about.feature.item-02.title')"></h3>
                            </div>
                            <div class="back">
                                <ul>
                                    <li v-for="item in list('about.feature.item-02.content')" :key="item">{{ item }}</li>
                                </ul>
                                <NuxtLink to="/business#success" v-html="t('about.feature.button')"></NuxtLink>
                            </div>
                        </div>
                        <div data-aos="fade-up" data-aos-delay="300" class="item item-03">
                            <div class="front">
                                <h3 class="title" v-html="t('about.feature.item-03.title')"></h3>
                            </div>
                            <div class="back">
                                <ul>
                                    <li v-for="item in list('about.feature.item-03.content')" :key="item">{{ item }}</li>
                                </ul>
                                <NuxtLink to="/business#success" v-html="t('about.feature.button')"></NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div ref="historyRoot" class="history">
                <div class="wrap">
                    <h2 class="title" data-aos="fade-up" data-aos-delay="100" v-html="t('history.banner.title')"></h2>
                    <div class="history-timeline">
                        <div class="history-year">
                            <ul>
                                <li v-for="(year, index) in historyItems" :key="year.year" :class="{ active: index === activeHistoryIndex }">
                                    <button
                                        type="button"
                                        class="btn"
                                        :aria-current="index === activeHistoryIndex ? 'true' : undefined"
                                        :aria-controls="`history-${year.year}`"
                                        @click="scrollToHistory(index)"
                                        @keydown="handleHistoryKeydown($event, index)"
                                    >
                                        {{ year.year }}
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <ul class="history-content" data-aos="fade-up" data-aos-delay="200">
                            <li v-for="year in historyItems" :id="`history-${year.year}`" :key="`content-${year.year}`" tabindex="-1">
                                <ul>
                                    <li v-for="month in year.months" :key="`${year.year}-${month.label}`" class="month">
                                        <span class="month-label">{{ month.label }}</span>
                                        <ul>
                                            <li v-for="(item, index) in month.items" :key="`${month.label}-${index}`" class="item">
                                                {{ item }}
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <CommonPhilosophy />
            <CommonAskBanner />
        </div>
    </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import CommonAskBanner from '~/components/section/CommonAskBanner.vue';
import CommonPhilosophy from '~/components/section/CommonPhilosophy.vue';
import PageBanner from '~/components/common/PageBanner.vue';
import PageNavigator from '~/components/common/PageNavigator.vue';
import historyData from '~/i18n/data/history.json';
import type { LocaleCode } from '~/stores/locale';
import { assetPath } from '~/utils/assetPath';

type LocalizedHistoryText = Partial<Record<LocaleCode, string>>;

interface HistorySource {
    year: number;
    months: Array<{
        label: string;
        items: LocalizedHistoryText[];
    }>;
}

definePageMeta({
    layout: 'default',
});

const { t, tm, rt, locale } = useI18n();
type AboutTab = 'ceo' | 'company';

const activeTab = ref<AboutTab>('ceo');
const activeLang = computed(() => locale.value as LocaleCode);
const aboutNavigatorItems = computed(() => [
    { id: 'ceo', label: t('about.tab.ceo'), panelId: 'about-panel-ceo' },
    { id: 'company', label: t('about.tab.company'), panelId: 'about-panel-company' },
]);
const list = (key: string) => {
    const message = tm(key);
    return Array.isArray(message) ? message.map((item) => rt(item)) : [];
};
const awardsCarouselLabels = {
    ko: '인증 및 수상 목록',
    en: 'Certifications and awards',
    vi: 'Danh sách chứng nhận và giải thưởng',
};
const awardsCarouselLabel = computed(() => awardsCarouselLabels[activeLang.value]);
const ceoValueImages = ['/assets/images/ceo/ceo-1.png', '/assets/images/ceo/ceo-3.png', '/assets/images/ceo/ceo-2.png'];
const ceoValues = computed(() =>
    ceoValueImages.map((image, index) => ({
        title: t(`about.ceo.values.item-0${index + 1}.title`),
        description: t(`about.ceo.values.item-0${index + 1}.description`),
        image,
    })),
);
usePageSeo('about');

const changeTab = async (tab: string) => {
    if (tab !== 'ceo' && tab !== 'company') return;

    activeTab.value = tab;
    await nextTick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.dispatchEvent(new Event('resize'));
};

const historyItems = computed(() => {
    return (historyData as HistorySource[]).map((history) => ({
        year: history.year,
        months: history.months.map((month) => ({
            label: month.label,
            items: month.items.map((item) => getLocalizedHistoryText(item, activeLang.value)),
        })),
    }));
});

function getLocalizedHistoryText(item: LocalizedHistoryText, lang: LocaleCode) {
    return item[lang] || item.ko || item.en || item.vi || '';
}

const activeHistoryIndex = ref(0);
const historyRoot = ref<HTMLElement | null>(null);
let historyFrame = 0;

const getHistorySections = () => {
    return historyRoot.value?.querySelectorAll<HTMLElement>('.history-content > li') ?? [];
};

const updateActiveHistory = () => {
    const viewportCenter = window.innerHeight / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    getHistorySections().forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter);
        if (distance < closestDistance) {
            closestIndex = index;
            closestDistance = distance;
        }
    });

    activeHistoryIndex.value = closestIndex;
};

const handleHistoryScroll = () => {
    cancelAnimationFrame(historyFrame);
    historyFrame = requestAnimationFrame(updateActiveHistory);
};

const scrollToHistory = (index: number, focusContent = true) => {
    const section = getHistorySections()[index];
    if (!section) return;

    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (focusContent) section.focus({ preventScroll: true });
};

const handleHistoryKeydown = (event: KeyboardEvent, index: number) => {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) return;

    event.preventDefault();
    const direction = event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? -1 : 1;
    const nextIndex = Math.min(Math.max(index + direction, 0), historyItems.value.length - 1);
    const buttons = historyRoot.value?.querySelectorAll<HTMLButtonElement>('.history-year .btn');

    buttons?.[nextIndex]?.focus();
    scrollToHistory(nextIndex, false);
};

watch(activeLang, async () => {
    await nextTick();
    handleHistoryScroll();
});

onMounted(() => {
    updateActiveHistory();
    window.addEventListener('scroll', handleHistoryScroll, { passive: true });
    window.addEventListener('resize', handleHistoryScroll, { passive: true });
});

onUnmounted(() => {
    cancelAnimationFrame(historyFrame);
    window.removeEventListener('scroll', handleHistoryScroll);
    window.removeEventListener('resize', handleHistoryScroll);
});
</script>
