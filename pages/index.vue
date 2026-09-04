<template>
    <section>
        <PageBanner src="/assets/images/banner/page-index.webp" :alt="t('index.banner.main.alt')">
            <div class="wrap">
                <h1 data-aos="fade-up" data-aos-delay="100" v-html="t('index.banner.main.title')"></h1>
                <p class="hero-description" data-aos="fade-up" data-aos-delay="200" v-html="t('index.banner.main.dscpt')"></p>
            </div>
        </PageBanner>
        <div class="banner type-title">
            <div class="wrap">
                <h2 class="title" data-aos="fade-up" data-aos-delay="100" v-html="t('index.banner.text.title')"></h2>
                <p data-aos="fade-up" data-aos-delay="200" v-html="t('index.banner.text.dscpt')"></p>
            </div>
        </div>
        <div class="banner type-goto">
            <div class="wrap">
                <h2 class="title" data-aos="fade-up" data-aos-delay="100" v-html="t('index.banner.goto.title')"></h2>
                <NuxtLink to="/business" data-aos="fade-up" data-aos-delay="200" class="btn type-opacity">
                    <span v-html="t('index.banner.goto.button')"></span>
                </NuxtLink>
            </div>
            <img :src="assetPath('/assets/images/banner/goto.webp')" :alt="t('index.banner.goto.alt')" loading="lazy" decoding="async" />
        </div>
        <PartnerLogoSection type="customer" />
        <PartnerLogoSection type="partner" />
        <section class="home-faq" aria-labelledby="home-faq-title">
            <div class="wrap">
                <div class="home-faq__heading">
                    <p class="home-faq__eyebrow">FAQ</p>
                    <h2 id="home-faq-title">{{ t('index.faq.title') }}</h2>
                    <p>{{ t('index.faq.description') }}</p>
                </div>
                <div class="home-faq__list">
                    <article v-for="id in faqIds" :key="id" class="home-faq__item">
                        <h3>{{ t(`index.faq.items.${id}.question`) }}</h3>
                        <p>{{ t(`index.faq.items.${id}.answer`) }}</p>
                    </article>
                </div>
                <p class="home-faq__updated">{{ t('index.faq.updated') }}</p>
            </div>
        </section>
        <CommonAskBanner />
    </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import CommonAskBanner from '~/components/section/CommonAskBanner.vue';
import PartnerLogoSection from '~/components/section/PartnerLogoSection.vue';
import PageBanner from '~/components/common/PageBanner.vue';
import { assetPath } from '~/utils/assetPath';

definePageMeta({
    layout: 'default',
});

const { t } = useI18n();
const faqIds = ['item-01', 'item-02', 'item-03', 'item-04'];
usePageSeo('home');
</script>
