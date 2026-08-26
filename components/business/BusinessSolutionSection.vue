<template>
    <div class="solution">
        <div class="list-solution" role="region" :aria-label="carouselLabel">
            <div v-for="solution in solutions" :key="solution.id" class="item" data-aos="fade-up" :data-aos-delay="solution.delay">
                <div class="thumbnail">
                    <div class="dim">
                        <h2 class="title" v-html="t(`business.solutions.${solution.id}.title`)"></h2>
                        <p v-html="t(`business.solutions.${solution.id}.subtitle`)"></p>
                    </div>
                    <img
                        :src="assetPath(t(`business.solutions.${solution.id}.thumbnail`))"
                        :alt="t(`business.solutions.${solution.id}.alt`)"
                        loading="lazy"
                        decoding="async"
                    />
                </div>
                <div class="content">
                    <span class="badge" v-html="t(`business.solutions.${solution.id}.badge`)"></span>
                    <p v-html="t(`business.solutions.${solution.id}.dscpt`)"></p>
                    <span class="solution-link" aria-hidden="true">
                        <span v-html="t('business.solutions.button')"></span>
                    </span>
                </div>
                <button
                    type="button"
                    class="solution-trigger"
                    :aria-label="`${t(`business.solutions.${solution.id}.title`)} - ${t('business.solutions.button')}`"
                    @click="emit('open', solution.id)"
                ></button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { assetPath } from '~/utils/assetPath';

type SolutionId = 'aps' | 'oms' | 'fems' | 'scm' | 'crm' | 'mes' | 'wcs' | 'tms' | 'ai' | 'wms';

const emit = defineEmits<{
    open: [id: SolutionId];
}>();

const { t } = useI18n();
const locale = useLocaleStore();
const carouselLabels = { ko: '조앤소프트 솔루션 목록', en: 'JO&SOFT solutions', ja: 'JO&SOFTソリューション一覧', vi: 'Danh sách giải pháp JO&SOFT' };
const carouselLabel = computed(() => carouselLabels[locale.lang]);

const solutions: Array<{ id: SolutionId; delay: number }> = [
    { id: 'aps', delay: 340 },
    { id: 'oms', delay: 420 },
    { id: 'fems', delay: 560 },
    { id: 'scm', delay: 600 },
    { id: 'crm', delay: 600 },
    { id: 'mes', delay: 600 },
    { id: 'wcs', delay: 600 },
    { id: 'tms', delay: 600 },
    { id: 'ai', delay: 580 },
    { id: 'wms', delay: 500 },
];
</script>
