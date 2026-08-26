<template>
    <section>
        <PageBanner src="/assets/images/banner/page-index.webp" alt="AI와 CPU를 형상화한 메인 페이지 배너 이미지입니다.">
            <div class="wrap">
                <h2 data-aos="fade-up" data-aos-delay="100" v-html="t('index.banner.main.title')"></h2>
                <h3 data-aos="fade-up" data-aos-delay="180" v-html="t('index.banner.main.dscpt')"></h3>
            </div>
        </PageBanner>
        <div class="banner type-title">
            <div class="wrap">
                <strong class="title" data-aos-delay="340" data-aos="fade-up" v-html="t('index.banner.text.title')"></strong>
                <p data-aos="fade-up" data-aos-delay="420" v-html="t('index.banner.text.dscpt')"></p>
            </div>
        </div>
        <div class="banner type-goto">
            <div class="wrap">
                <strong class="title" data-aos="fade-up" data-aos-delay="100" v-html="t('index.banner.goto.title')"></strong>
                <NuxtLink to="/business" data-aos="fade-up" data-aos-delay="180" class="btn type-opacity">
                    <span data-aos="fade-up" data-aos-delay="260" v-html="t('index.banner.goto.button')"></span>
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
</script>
