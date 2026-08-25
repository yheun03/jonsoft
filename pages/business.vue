<template>
    <section ref="root" class="legacy-section-root">
        <PageBanner src="/assets/images/banner/page-business.webp" alt="비즈니스 및 솔루션 페이지의 배너 이미지입니다." />
        <div class="module-text">
            <div class="wrap">
                <p class="title-sub" data-aos="fade-up" data-aos-delay="100">
                    <span class="gradient-text" v-html="t('business.module-text.overview.title-sub')"></span>
                </p>
                <p class="title" data-aos="fade-up" data-aos-delay="180" v-html="t('business.module-text.overview.title')"></p>
                <p class="dscpt" data-aos="fade-up" data-aos-delay="260" v-html="t('business.module-text.overview.dscpt')"></p>
            </div>
        </div>
        <BusinessSolutionSection @open="openSolutionModal" />
        <BusinessSuccessSection @open="openSuccessModal" />
        <CommonAskBanner />
    </section>
    <BusinessContentModal v-if="activeModal" :type="activeModal.type" :id="activeModal.id" @close="closeModal" />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import BusinessContentModal from '~/components/business/BusinessContentModal.vue';
import BusinessSolutionSection from '~/components/business/BusinessSolutionSection.vue';
import BusinessSuccessSection from '~/components/business/BusinessSuccessSection.vue';
import PageBanner from '~/components/common/PageBanner.vue';
import CommonAskBanner from '~/components/section/CommonAskBanner.vue';
import { useLegacySectionRoot } from '~/composables/useLegacySectionRoot';
import { getI18nNamespaces } from '~/utils/route-i18n';

definePageMeta({
    layout: 'default',
});

type ActiveModal = { type: 'solution'; id: SolutionId } | { type: 'success'; id: SuccessId };
type SolutionId = 'aps' | 'oms' | 'fems' | 'scm' | 'crm' | 'mes' | 'wcs' | 'tms' | 'ai' | 'wms';
type SuccessId = 'tailim' | 'kkleannara';

const locale = useLocaleStore();
const namespaces = getI18nNamespaces('/business');
await useAsyncData('i18n-page-business', () => locale.loadBundles(namespaces));

const { t } = useI18n();
const activeModal = ref<ActiveModal | null>(null);
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

const root = ref<HTMLElement | null>(null);
useLegacySectionRoot(root, namespaces);
</script>
