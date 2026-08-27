<template>
    <div class="floating">
        <div v-if="isLabelVisible" class="label" @click="closeLabel">{{ t('common.floating') }}</div>
        <a :href="catalogPath" :aria-label="`${t('common.catalog.alt')} (${newWindowLabel})`" target="_blank" rel="noopener" />
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { assetPath } from '~/utils/assetPath';

const { t } = useI18n();
const locale = useLocaleStore();
const newWindowLabels = { ko: '새 창', en: 'opens in a new window', vi: 'mở trong cửa sổ mới' };
const newWindowLabel = computed(() => newWindowLabels[locale.lang]);
const catalogPath = computed(() => assetPath(t('common.catalog.src')));
const isLabelVisible = ref(true);
const labelStorageKey = 'floatingLabelClosed';

onMounted(() => {
    isLabelVisible.value = sessionStorage.getItem(labelStorageKey) !== '1';
});

const closeLabel = () => {
    isLabelVisible.value = false;
    sessionStorage.setItem(labelStorageKey, '1');
};
</script>
