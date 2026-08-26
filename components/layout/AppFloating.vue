<template>
    <div class="floating">
        <div class="label">{{ t('common.floating') }}</div>
        <a :href="catalogPath" :aria-label="`${t('common.catalog.alt')} (${newWindowLabel})`" target="_blank" rel="noopener" />
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { assetPath } from '~/utils/assetPath';

const { t } = useI18n();
const locale = useLocaleStore();
const newWindowLabels = { ko: '새 창', en: 'opens in a new window', ja: '新しいウィンドウ', vi: 'mở trong cửa sổ mới' };
const newWindowLabel = computed(() => newWindowLabels[locale.lang]);
const catalogPath = computed(() => assetPath(t('common.catalog.src')));
</script>
