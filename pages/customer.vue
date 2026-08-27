<template>
    <section>
        <h1 class="visually-hidden">{{ pageTitle }}</h1>
        <PageBanner src="/assets/images/banner/page-customer.webp" />
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

const { locale } = useI18n();
const pageTitles: Record<string, string> = {
    ko: '조앤소프트 고객사 및 파트너',
    en: 'JO&SOFT Customers and Partners',
    vi: 'Khách hàng và đối tác của JO&SOFT',
};
const pageTitle = computed(() => pageTitles[locale.value] || pageTitles.ko);
usePageSeo('customer');

definePageMeta({
    layout: 'default',
});
</script>
