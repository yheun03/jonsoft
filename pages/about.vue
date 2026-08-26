<template>
    <section>
        <PageBanner src="/assets/images/banner/page-about.webp" bottom-aligned>
            <div class="module-text">
                <div class="wrap">
                    <p class="title-sub">
                        <span class="gradient-text" data-aos="fade-up" data-aos-delay="100" v-html="t('about.banner.title-sub')"></span>
                    </p>
                    <h1 class="title" data-aos="fade-up" data-aos-delay="180" v-html="t('about.banner.title')"></h1>
                    <ul class="dscpt" data-aos="fade-up" data-aos-delay="260">
                        <li v-for="item in list('about.banner.dscpt')" :key="item">{{ item }}</li>
                    </ul>
                </div>
            </div>
        </PageBanner>
        <div class="module-text">
            <div class="wrap">
                <p class="title-sub" data-aos="fade-up" data-aos-delay="340">
                    <span class="gradient-text" v-html="t('about.module-text.overview.title-sub')"></span>
                </p>
                <h2 class="title" data-aos="fade-up" data-aos-delay="420" v-html="t('about.module-text.overview.title')"></h2>
                <p class="dscpt" data-aos="fade-up" data-aos-delay="500" v-html="t('about.module-text.overview.dscpt')"></p>
            </div>
        </div>
        <div class="summary">
            <div class="wrap">
                <ul>
                    <li data-aos="fade-up" data-aos-delay="100">
                        <img src="/assets/icons/120/ic-building.svg" alt="" loading="lazy" decoding="async" />
                        <div class="content">
                            <p class="dscpt"><span>10+</span></p>
                            <p class="title" v-html="t('about.summary.item-01.title')"></p>
                            <span class="eyebrow" v-html="t('about.summary.item-01.standard')"></span>
                        </div>
                    </li>
                    <li data-aos="fade-up" data-aos-delay="180">
                        <img src="/assets/icons/120/ic-factory.svg" alt="" loading="lazy" decoding="async" />
                        <div class="content">
                            <p class="dscpt"><span>71+</span></p>
                            <p class="title" v-html="t('about.summary.item-02.title')"></p>
                            <span class="eyebrow" v-html="t('about.summary.item-02.standard')"></span>
                        </div>
                    </li>
                    <li data-aos="fade-up" data-aos-delay="260">
                        <img src="/assets/icons/120/ic-partner.svg" alt="" loading="lazy" decoding="async" />
                        <div class="content">
                            <p class="dscpt"><span>20</span></p>
                            <p class="title" v-html="t('about.summary.item-03.title')"></p>
                            <span class="eyebrow" v-html="t('about.summary.item-03.standard')"></span>
                        </div>
                    </li>
                    <li data-aos="fade-up" data-aos-delay="340">
                        <img src="/assets/icons/120/ic-hand.svg" alt="" loading="lazy" decoding="async" />
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
            <p data-aos="fade-up" data-aos-delay="180" v-html="t('about.awards.dscpt')" class="title-sub"></p>
            <div class="list-awards" role="region" :aria-label="awardsCarouselLabel">
                <div data-aos="fade-up" data-aos-delay="260" class="item item-01">
                    <div class="thumbnail">
                        <img data-aos="fade-up" src="/assets/images/awards/img01-1.webp" alt="" loading="lazy" decoding="async" />
                        <img data-aos="fade-up" src="/assets/images/awards/img01-2.webp" alt="" loading="lazy" decoding="async" />
                    </div>
                    <div class="content">
                        <p data-aos="fade-up" v-html="t('about.awards.item-01.title')"></p>
                    </div>
                </div>
                <div data-aos="fade-up" data-aos-delay="340" class="item item-02">
                    <div class="thumbnail">
                        <img data-aos="fade-up" src="/assets/images/awards/img02-1.webp" alt="" loading="lazy" decoding="async" />
                        <img data-aos="fade-up" src="/assets/images/awards/img02-2.webp" alt="" loading="lazy" decoding="async" />
                    </div>
                    <div class="content">
                        <p data-aos="fade-up" v-html="t('about.awards.item-02.title')"></p>
                    </div>
                </div>
                <div data-aos="fade-up" data-aos-delay="500" class="item item-03">
                    <div class="thumbnail">
                        <img data-aos="fade-up" src="/assets/images/awards/img03-1.webp" alt="" loading="lazy" decoding="async" />
                        <img data-aos="fade-up" src="/assets/images/awards/img03-2.webp" alt="" loading="lazy" decoding="async" />
                    </div>
                    <div class="content">
                        <p data-aos="fade-up" v-html="t('about.awards.item-03.title')"></p>
                    </div>
                </div>
                <div data-aos="fade-up" data-aos-delay="420" class="item item-04">
                    <div class="thumbnail">
                        <img data-aos="fade-up" src="/assets/images/awards/img04-1.webp" alt="" loading="lazy" decoding="async" />
                        <img data-aos="fade-up" src="/assets/images/awards/img04-2.webp" alt="" loading="lazy" decoding="async" />
                    </div>
                    <div class="content">
                        <p data-aos="fade-up" v-html="t('about.awards.item-04.title')"></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="module-text">
            <div class="wrap">
                <h2 class="title-sub">
                    <span class="gradient-text" data-aos="fade-up" data-aos-delay="100" v-html="t('about.module-text.feature.title')"></span>
                </h2>
                <p class="title" data-aos="fade-up" data-aos-delay="180" v-html="t('about.module-text.feature.dscpt')"></p>
            </div>
        </div>
        <div class="feature">
            <div class="wrap">
                <div class="list-feature">
                    <div data-aos="fade-up" data-aos-delay="260" class="item item-01">
                        <div class="front">
                            <h3 class="title" data-aos="fade-up" data-aos-delay="320" v-html="t('about.feature.item-01.title')"></h3>
                        </div>
                        <div class="back">
                            <ul>
                                <li v-for="item in list('about.feature.item-01.content')" :key="item" data-aos="fade-up">{{ item }}</li>
                            </ul>
                            <NuxtLink to="/business#success" v-html="t('about.feature.button')"></NuxtLink>
                        </div>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="340" class="item item-02">
                        <div class="front">
                            <h3 class="title" data-aos="fade-up" data-aos-delay="380" v-html="t('about.feature.item-02.title')"></h3>
                        </div>
                        <div class="back">
                            <ul>
                                <li v-for="item in list('about.feature.item-02.content')" :key="item" data-aos="fade-up">{{ item }}</li>
                            </ul>
                            <NuxtLink to="/business#success" v-html="t('about.feature.button')"></NuxtLink>
                        </div>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="420" class="item item-03">
                        <div class="front">
                            <h3 class="title" data-aos="fade-up" data-aos-delay="460" v-html="t('about.feature.item-03.title')"></h3>
                        </div>
                        <div class="back">
                            <ul>
                                <li v-for="item in list('about.feature.item-03.content')" :key="item" data-aos="fade-up">{{ item }}</li>
                            </ul>
                            <NuxtLink to="/business#success" v-html="t('about.feature.button')"></NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="history">
            <div class="wrap">
                <h2 class="title" data-aos="fade-up" data-aos-delay="100" v-html="t('history.banner.title')"></h2>
                <div class="history-timeline">
                    <div class="history-year">
                        <ul>
                            <li
                                v-for="(year, index) in historyItems"
                                :key="year.year"
                                :class="{ active: index === activeHistoryIndex }"
                                data-aos="fade-up"
                                :data-aos-delay="Math.min(150 + index * 40, 430)"
                            >
                                <button
                                    type="button"
                                    class="btn"
                                    :aria-current="index === activeHistoryIndex ? 'true' : undefined"
                                    :aria-controls="`history-${year.year}`"
                                    @click="scrollToHistory(index)"
                                >
                                    {{ year.year }}
                                </button>
                            </li>
                        </ul>
                    </div>
                    <ul class="history-content" data-aos="fade-up" data-aos-delay="380">
                        <li
                            v-for="year in historyItems"
                            :id="`history-${year.year}`"
                            ref="historySections"
                            :key="`content-${year.year}`"
                            tabindex="-1"
                        >
                            <ul>
                                <li v-for="month in year.months" :key="`${year.year}-${month.label}`" class="month">
                                    <span class="month-label">{{ month.label }}</span>
                                    <ul>
                                        <li
                                            v-for="(item, index) in month.items"
                                            :key="`${month.label}-${index}`"
                                            class="item"
                                            v-html="localized(item)"
                                        ></li>
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
    </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import CommonAskBanner from '~/components/section/CommonAskBanner.vue';
import CommonPhilosophy from '~/components/section/CommonPhilosophy.vue';
import PageBanner from '~/components/common/PageBanner.vue';
import historyItems from '~/i18n/data/history.json';

definePageMeta({
    layout: 'default',
});

const locale = useLocaleStore();
const { t, tm, rt } = useI18n();
const list = (key: string) => {
    const message = tm(key);
    return Array.isArray(message) ? message.map((item) => rt(item)) : [];
};
const localized = (item: Record<string, string>) => item[locale.lang] || item.ko || '';
const awardsCarouselLabels = {
    ko: '인증 및 수상 목록',
    en: 'Certifications and awards',
    ja: '認証・受賞一覧',
    vi: 'Danh sách chứng nhận và giải thưởng',
};
const awardsCarouselLabel = computed(() => awardsCarouselLabels[locale.lang]);
usePageSeo('about');

const activeHistoryIndex = ref(0);
const historySections = ref<HTMLElement[]>([]);
let historyFrame = 0;

const updateActiveHistory = () => {
    const viewportCenter = window.innerHeight / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    historySections.value.forEach((section, index) => {
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

const scrollToHistory = (index: number) => {
    const section = historySections.value[index];
    if (!section) return;

    window.scrollTo({
        top: window.scrollY + section.getBoundingClientRect().top - 100,
        behavior: 'smooth',
    });
    section.focus({ preventScroll: true });
};

onMounted(() => {
    updateActiveHistory();
    window.addEventListener('scroll', handleHistoryScroll, { passive: true });
});

onUnmounted(() => {
    cancelAnimationFrame(historyFrame);
    window.removeEventListener('scroll', handleHistoryScroll);
});
</script>
