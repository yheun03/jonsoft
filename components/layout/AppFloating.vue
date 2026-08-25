<template>
    <div class="floating">
        <div class="label">{{ t('common.floating') }}</div>
        <a :href="catalogPath" :aria-label="t('common.catalog.alt')" target="_blank" rel="noopener" />
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { assetPath } from '~/utils/assetPath';

const { t } = useI18n();
const catalogPath = computed(() => assetPath(t('common.catalog.src')));
</script>
