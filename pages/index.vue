<template>
    <section>
        <PageBanner src="/assets/images/banner/page-index.webp">
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
            <img src="/assets/images/banner/goto.webp" alt="" loading="lazy" decoding="async" />
        </div>
        <PartnerLogoSection type="customer" />
        <PartnerLogoSection type="partner" />
        <CommonAskBanner />
    </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import CommonAskBanner from '~/components/section/CommonAskBanner.vue';
import PartnerLogoSection from '~/components/section/PartnerLogoSection.vue';
import PageBanner from '~/components/common/PageBanner.vue';

definePageMeta({
    layout: 'default',
});

const { t } = useI18n();
usePageSeo('home');
</script>
