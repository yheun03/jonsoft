<template>
    <div class="floating">
        <div class="label">{{ t('common.floating') }}</div>
        <a :href="catalogPath" target="_blank" rel="noopener" />
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const config = useRuntimeConfig();
const catalogPath = `${config.app.baseURL}assets/files/JO&SOFT catalog.pdf`;
</script>
