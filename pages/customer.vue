<template>
    <section>
        <PageBanner src="/assets/images/banner/page-customer.webp" alt="고객사 및 파트너 페이지의 배너 이미지입니다." />
        <PartnerLogoSection type="customer" />
        <PartnerLogoSection type="partner" />
        <CommonAskBanner />
    </section>
</template>

<script setup lang="ts">
import CommonAskBanner from '~/components/section/CommonAskBanner.vue';
import PartnerLogoSection from '~/components/section/PartnerLogoSection.vue';
import PageBanner from '~/components/common/PageBanner.vue';

definePageMeta({
    layout: 'default',
});
</script>
