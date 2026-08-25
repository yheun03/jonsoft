<template>
    <section ref="root" class="legacy-section-root">
        <PageBanner src="/assets/images/banner/page-customer.webp" alt="고객사 및 파트너 페이지의 배너 이미지입니다." />
        <PartnerLogoSection type="customer" />
        <PartnerLogoSection type="partner" />
        <CommonAskBanner />
    </section>
</template>

<script setup lang="ts">
import { getI18nNamespaces } from '~/utils/route-i18n';
import { useLegacySectionRoot } from '~/composables/useLegacySectionRoot';
import CommonAskBanner from '~/components/section/CommonAskBanner.vue';
import PartnerLogoSection from '~/components/section/PartnerLogoSection.vue';
import PageBanner from '~/components/common/PageBanner.vue';

definePageMeta({
    layout: 'default',
});

const locale = useLocaleStore();
const namespaces = getI18nNamespaces('/customer');
await useAsyncData('i18n-page-customer', () => locale.loadBundles(namespaces));

const root = ref<HTMLElement | null>(null);
useLegacySectionRoot(root, namespaces);
</script>
