<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { localeDefinitions } from '~/constants/locale';

const localeStore = useLocaleStore();

useHead(() => ({
    htmlAttrs: {
        lang: localeDefinitions[localeStore.lang].htmlLang,
    },
}));
</script>
