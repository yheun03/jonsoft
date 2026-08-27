<template>
    <div id="success" class="success">
        <div class="wrap">
            <h2 data-aos="fade-up" data-aos-delay="100" v-html="t('business.success.title')"></h2>
            <ul class="list-case">
                <li v-for="successCase in successCases" :key="successCase.id" class="item" data-aos="fade-up" :data-aos-delay="successCase.delay">
                    <div class="content">
                        <h3 class="title" v-html="t(`business.success.${successCase.messageKey}.title`)"></h3>
                        <ul class="dscpt">
                            <li v-for="item in list(`business.success.${successCase.messageKey}.dscpt`)" :key="item">
                                {{ item }}
                            </li>
                        </ul>
                    </div>
                    <img :src="assetPath(successCase.image)" alt="" loading="lazy" decoding="async" />
                    <button
                        type="button"
                        class="success-trigger"
                        :aria-label="`${plainText(t(`business.success.${successCase.messageKey}.title`))} - ${detailLabel}`"
                        @click="emit('open', successCase.id)"
                    ></button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { assetPath } from '~/utils/assetPath';

type SuccessId = 'tailim' | 'kkleannara';

const emit = defineEmits<{
    open: [id: SuccessId];
}>();

const { t, tm, rt } = useI18n();
const locale = useLocaleStore();
const detailLabels = { ko: '자세히 보기', en: 'View details', vi: 'Xem chi tiết' };
const detailLabel = computed(() => detailLabels[locale.lang]);
const plainText = (value: string) =>
    value
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
const list = (key: string) => {
    const message = tm(key);
    return Array.isArray(message) ? message.map((item) => rt(item)) : [];
};

const successCases: Array<{
    id: SuccessId;
    messageKey: 'case1' | 'case2';
    image: string;
    delay: number;
}> = [
    { id: 'tailim', messageKey: 'case1', image: '/assets/images/success/tailm.webp', delay: 200 },
    { id: 'kkleannara', messageKey: 'case2', image: '/assets/images/success/kkleannara.webp', delay: 300 },
];
</script>
