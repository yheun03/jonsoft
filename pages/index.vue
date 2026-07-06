<template>
    <section ref="root" class="legacy-section-root">
        <div class="banner">
            <div class="wrap">
                <h2 data-aos="fade-up" data-aos-delay="200" v-html="t('index.banner.main.title')"></h2>
                <h3 data-aos="fade-up" data-aos-delay="400" v-html="t('index.banner.main.dscpt')"></h3>
            </div>
            <img src="/assets/images/banner/page-index.webp" alt="메인 페이지의 배너 이미지 입니다. AI와 CPU로 형상화된 이미지입니다.">
        </div>
        <div class="banner type-title">
            <div class="wrap">
                <strong class="title" data-aos-delay="800" data-aos="fade-up"
                    v-html="t('index.banner.text.title')"></strong>
                <p data-aos="fade-up" data-aos-delay="1000" v-html="t('index.banner.text.dscpt')"></p>
            </div>
        </div>
        <div class="banner type-goto">
            <div class="wrap">
                <strong class="title" data-aos="fade-up" data-aos-delay="200"
                    v-html="t('index.banner.goto.title')"></strong>
                <NuxtLink to="/business" data-aos="fade-up" data-aos-delay="400" class="btn type-opacity">
                    <span data-aos="fade-up" data-aos-delay="600" v-html="t('index.banner.goto.button')"></span>
                </NuxtLink>
            </div>
            <img src="/assets/images/banner/goto.webp" alt="">
        </div>
        <PartnerLogoSection type="customer" />
        <PartnerLogoSection type="partner" />
        <CommonAskBanner />
    </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { getI18nNamespaces } from '~/utils/route-i18n'
import { useLegacySectionRoot } from '~/composables/useLegacySectionRoot'
import CommonAskBanner from '~/components/Section/CommonAskBanner.vue'
import PartnerLogoSection from '~/components/Section/PartnerLogoSection.vue'

definePageMeta({
    layout: 'default',
})

const locale = useLocaleStore()
const namespaces = getI18nNamespaces('/')
await useAsyncData('i18n-page-index', () => locale.loadBundles(namespaces))

const { t } = useI18n()
const root = ref<HTMLElement | null>(null)
useLegacySectionRoot(root, namespaces)
</script>
