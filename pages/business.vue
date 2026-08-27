<template>
    <section>
        <PageBanner src="/assets/images/banner/page-business.webp" />
        <div class="module-text">
            <div class="wrap">
                <p class="title-sub" data-aos="fade-up" data-aos-delay="100">
                    <span class="gradient-text" v-html="t('business.module-text.overview.title-sub')"></span>
                </p>
                <h1 class="title" data-aos="fade-up" data-aos-delay="200" v-html="t('business.module-text.overview.title')"></h1>
                <p class="dscpt" data-aos="fade-up" data-aos-delay="300" v-html="t('business.module-text.overview.dscpt')"></p>
            </div>
        </div>
        <BusinessSolutionSection @open="openSolutionModal" />
        <BusinessSuccessSection @open="openSuccessModal" />
        <CommonAskBanner />
    </section>
    <BusinessContentModal v-if="activeModal" v-bind="activeModal" @close="closeModal" />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import BusinessContentModal from '~/components/business/BusinessContentModal.vue';
import BusinessSolutionSection from '~/components/business/BusinessSolutionSection.vue';
import BusinessSuccessSection from '~/components/business/BusinessSuccessSection.vue';
import PageBanner from '~/components/common/PageBanner.vue';
import CommonAskBanner from '~/components/section/CommonAskBanner.vue';
import type { ActiveBusinessModal, SolutionId, SuccessId } from '~/types/business';

definePageMeta({
    layout: 'default',
});

const { t } = useI18n();
usePageSeo('business');
const activeModal = ref<ActiveBusinessModal | null>(null);
const openSolutionModal = (id: SolutionId) => {
    activeModal.value = { type: 'solution', id };
};
const openSuccessModal = (id: SuccessId) => {
    activeModal.value = { type: 'success', id };
};
const closeModal = () => {
    activeModal.value = null;
};

watch(activeModal, (modal) => {
    if (import.meta.client) document.body.classList.toggle('modal-open', Boolean(modal));
});

onUnmounted(() => {
    document.body.classList.remove('modal-open');
});
</script>
