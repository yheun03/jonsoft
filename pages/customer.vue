<template>
    <section ref="root" class="legacy-section-root">
        <div class="banner">
            <img src="/assets/images/banner/page-customer.webp" alt="메인 페이지의 배너 이미지 입니다. AI와 CPU로 형상화된 이미지입니다." />
        </div>
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

definePageMeta({
    layout: 'default',
});

const locale = useLocaleStore();
const namespaces = getI18nNamespaces('/customer');
await useAsyncData('i18n-page-customer', () => locale.loadBundles(namespaces));

const root = ref<HTMLElement | null>(null);
useLegacySectionRoot(root, namespaces);
</script>
